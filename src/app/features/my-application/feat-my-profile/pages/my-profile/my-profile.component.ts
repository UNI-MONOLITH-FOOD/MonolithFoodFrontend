import { MyProfileService } from './../../services/my-profile.service';
import {
  HeightAndWeight,
  MyProfile,
  PutMyProfile,
} from './../../interfaces/my-profile';
import { Component } from '@angular/core';
import { ResponseType } from 'src/app/core/interfaces/ResponseType';
import { GlobalService } from 'src/app/shared/services/global.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent {
  myForm!: FormGroup;
  data!: MyProfile;

  constructor(
    private globalService: GlobalService,
    private myProfileService: MyProfileService,
    private formBuilder: FormBuilder
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
      names: [''],
      gender: [''],
      borndate: [''],
      location: [{ value: '', disabled: true }],
      weightKg: [''],
      heightCm: [''],
      imc: [{ value: '', disabled: true }],
    });
  }

  getMyProfile(): void {
    this.myProfileService.getPersonalInfo().subscribe(
      (data: MyProfile) => {
        this.data = data;
        this.myForm.get('names')?.setValue(data.names);
        this.myForm.get('gender')?.setValue(data.gender);
        const date = new Date(data.borndate);
        this.myForm
          .get('borndate')
          ?.setValue(date.toISOString().substring(0, 10));
        this.myForm.get('location')?.setValue(data.location);
        this.myForm.get('weightKg')?.setValue(data.weightKg);
        this.myForm.get('heightCm')?.setValue(data.heightCm);
        this.myForm.get('imc')?.setValue(data.imc);
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateMyProfile(): void {
    const data: PutMyProfile = {
      names: this.myForm.get('names')?.value,
      gender: this.myForm.get('gender')?.value,
      borndate: this.myForm.get('borndate')?.value,
    };
    this.myProfileService.updatePersonalInfo(data).subscribe((error: any) => {
      console.log(error);
    });
  }

  updateHeightAndWeight() {
    let data: HeightAndWeight = {
      weightKg: this.myForm.get('weightKg')?.value,
      heightCm: this.myForm.get('heightCm')?.value,
    };
    this.myProfileService
      .updateHeightAndWeight(data)
      .subscribe((error: any) => {
        console.log(error);
      });
  }

  openCustomSnackbar(msg: string, type: ResponseType): void {
    this.globalService.openCustomSnackbar(msg, type);
  }
}
