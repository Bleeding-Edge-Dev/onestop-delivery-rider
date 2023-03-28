import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { PasswordService } from '../services/password.service';
import { get, remove } from '../services/storage';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
passwordGroup : FormGroup;
  inv: boolean;
  constructor(private formBuilder:FormBuilder,private passwordService:PasswordService,private loadingController:LoadingController,private alertController:AlertController,private router:Router) { 
    this.passwordGroup = this.formBuilder.group({
      currentPassword: new  FormControl('',[Validators.required]),
      newPassword : new FormControl('',[Validators.required]),
      confirmPassword :new FormControl('',[Validators.required])
    })
  }

  ngOnInit() {
  }

  async changePassword(){
    if(this.passwordGroup.valid){
      const lc = await this.loadingController.create({message:'Please Wait..',spinner:'bubbles'});
      await lc.present();
      let token =await get('token');
      token = 'Bearer '+token;
      this.passwordService.changepassword(token, this.passwordGroup.controls.currentPassword.value,this.passwordGroup.controls.newPassword.value,this.passwordGroup.controls.confirmPassword.value ).subscribe(
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
