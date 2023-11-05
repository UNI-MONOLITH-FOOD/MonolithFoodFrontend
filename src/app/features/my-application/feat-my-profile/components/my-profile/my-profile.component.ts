import { MyProfileService } from './../../services/my-profile.service';
import { MyProfile } from './../../interfaces/my-profile';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from 'src/app/shared/services/global.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent {
  myForm!: FormGroup;  
  username!: string;
  email!: string;

  constructor(
    private globalService: GlobalService,
    private snackBar: MatSnackBar,
    private myProfileService: MyProfileService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    Promise.resolve().then(() => {
      this.globalService.setTitle('Mi Perfil');
    });
    this.reactiveForm();
    this.getMyProfile();
  }

  reactiveForm(): void {
    this.myForm = this.formBuilder.group({
      names: [""],
      gender: [""],
      borndate: [""],
      location: [""],
      weightKg: [""],
      heightCm: [""],
      imc: [""],
    })
  }

  openCustomSnackbar(msg: string, type: string): void {
    this.globalService.openCustomSnackbar(msg, type);
  }

  getMyProfile(): void {
    this.myProfileService.getPersonalInfo().subscribe(
      (data: MyProfile) => {
        this.myForm.get('names')?.setValue(data.names); 
        this.myForm.get('gender')?.setValue(data.gender); 
        const date = new Date(data.borndate);
        this.myForm.get('borndate')?.setValue(date.toISOString().substring(0, 10));
        this.myForm.get('location')?.setValue(data.location);
        this.myForm.get('weightKg')?.setValue(data.weightKg);
        this.myForm.get('heightCm')?.setValue(data.heightCm);
        this.myForm.get('imc')?.setValue(data.imc);
        this.username = data.username;
        this.email = data.email;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

 
  updateMyProfile(): void {
    console.log("actualizando datos");
    const data: any = {
      weightKg: this.myForm.get('weightKg')?.value,
      heightCm: this.myForm.get('heightCm')?.value,
    };
    this.myProfileService.updatePersonalInfo(data).subscribe(
      (data: MyProfile) => {
        this.openCustomSnackbar('Datos actualizados correctamente', 'success');
        this.getMyProfile();
      },
      (error:any) => {
        console.log(error);
      }
    );
  }







}
