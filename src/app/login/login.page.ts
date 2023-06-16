import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { set } from '../services/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  logingroup: FormGroup;
  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.logingroup = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {}

  async login() {
    if (
      this.logingroup.controls['username'].valid &&
      this.logingroup.controls['password'].valid
    ) {
      const lc = await this.loadingController.create({
        message: 'Signing In...',
        spinner: 'dots',
      });
      await lc.present();
      this.authService
        .login(
          this.logingroup.controls['username'].value,
          this.logingroup.controls['password'].value
        )
        .subscribe(async (res: any) => {
          if (res.token) {
            await set('token', res.token);
            await set('name', res.rider);
            await this.authService.checkLogin();
            this.logingroup.reset();
            this.router.navigateByUrl('/tabs', { replaceUrl: true });
          } else {
            const alert = await this.alertController.create({
              message: 'Username or Password is incorrect',
              buttons: ['Close'],
            });
            await alert.present();
            this.logingroup.reset();
          }
          await lc.dismiss();
        });
    }
  }
}
