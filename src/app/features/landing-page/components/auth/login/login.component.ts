// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequestDTO } from 'src/app/core/interfaces/LoginRequestDTO';
import { ResponseType } from 'src/app/core/interfaces/ResponseType';
import { AuthService } from 'src/app/core/services/auth.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  private oauthUrl: string = environment.oauthUrl;
  disabled: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.reactiveForm();
  }

  reactiveForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const loginData: LoginRequestDTO = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };
      this.authService.login(loginData).subscribe({
        next: (response) => {
          console.log(response);
          this.globalService.openCustomSnackbar(
            'Sesión iniciada correctamente',
            ResponseType.SUCCESS
          );
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  googleOauth2(): void {
    window.location.href = this.oauthUrl + '/google';
  }
  microsoftOauth2(): void {
    window.location.href = this.oauthUrl + '/microsoft';
  }
  githubOauth2(): void {
    window.location.href = this.oauthUrl + '/github';
  }
}
