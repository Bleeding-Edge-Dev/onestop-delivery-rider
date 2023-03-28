import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { get } from 'src/app/services/storage';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {

  constructor(private popoverController:PopoverController,private router:Router , private authService:AuthService) { }
token
  ngOnInit() {}
async logout(){
  this.token = await get('token');
  this.token = "Bearer "+this.token;
  this.authService.logout(this.token);
  this.popoverController.dismiss();
}
change(){
this.router.navigateByUrl('/change-password');
this.popoverController.dismiss();
}
}
