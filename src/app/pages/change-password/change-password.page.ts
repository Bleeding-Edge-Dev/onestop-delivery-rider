import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { PasswordService } from 'src/app/services/password.service';
import { get, remove } from 'src/app/services/storage';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  passwordGroup : FormGroup;
  inv: boolean;
token;
constructor(private formBuilder:FormBuilder,private passwordService:PasswordService,private loadingController:LoadingController,private alertController:AlertController,private router:Router) { 
  this.passwordGroup = this.formBuilder.group({
    currentPassword: new  FormControl('',[Validators.required]),
    newPassword : new FormControl('',[Validators.required,Validators.minLength(6)]),
    confirmNewPassword :new FormControl('',[Validators.required, this.matchValues('newPassword')])
  })
}
matchValues(matchTo: string) {
  return (control: FormGroup) => {
    return control?.value === control?.parent?.controls[matchTo].value
      ? null
      : { notMatching: true };
  }
}


  async ngOnInit() {
  this.token =await get('token');
  }
  async changePassword(){
    if(this.passwordGroup.valid){
      const lc = await this.loadingController.create({message:'Please Wait..',spinner:'bubbles'});
      await lc.present();
      this.token = 'Bearer '+this.token;
      this.passwordService.changepassword(this.token, this.passwordGroup.controls.currentPassword.value,this.passwordGroup.controls.newPassword.value,this.passwordGroup.controls.confirmPassword.value ).subscribe(
      async (res:any)=>{
        await lc.dismiss();
        const alert = await this.alertController.create({'message':res.message,buttons:['OK']});
        await alert.present();
        if(res.message == 'Password Changed'){
          alert.onDidDismiss().then(async ()=>{
            await remove('token');
            this.router.navigateByUrl('/login' ,{replaceUrl:true});
          })
        }
   
      }
      )
    }
    else{
      this.inv = true;
    }
  }
}
