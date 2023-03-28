import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import {set} from '../services/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private loginGroup:FormGroup;
  constructor(private router:Router,
    private alertController:AlertController, private loadingController:LoadingController,
    private formBuilder:FormBuilder,private authService:AuthService) {
    this.loginGroup = this.formBuilder.group({
      
    username:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required])
    });

  }
  ngOnInit() {
  }

async login(){
  if (this.loginGroup.controls.username.valid && this.loginGroup.controls.password.valid){
    const lc = await this.loadingController.create({message:'Signing In...',spinner:'dots'});
    await lc.present();
    this.authService.login(this.loginGroup.controls.username.value,this.loginGroup.controls.password.value).subscribe(
     async  (res:any)=>{
          if(res.token){
            
            await set('token',res.token);
            await set ('name',res.rider);
            await this.authService.checkLogin();
            this.loginGroup.reset();
            this.router.navigateByUrl('/tabs',{replaceUrl:true});
          }
          else{
        
            const alert = await this.alertController.create({
              message:"Username or Password is incorrect",
              buttons:['OK']
            });
            await alert.present();
            this.loginGroup.reset();
          }
        await lc.dismiss();
      }
    )

  }
}

}
