import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { get } from 'src/app/services/storage';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.page.html',
  styleUrls: ['./manage-profile.page.scss'],
})
export class ManageProfilePage implements OnInit {
  token:string = '' ;
  profileData:any ={} ;
  isloading = false;

  constructor(
    private authService: AuthService,
    public loadingController: LoadingController
  ) { }

  async ngOnInit() {
    this.token = await get('token');
    this.token = "Bearer " + this.token;
  }
  async getProfile() {

    const loadingModal = await this.loadingController.create({
      spinner: 'lines-small',
      animated: true,
    });
    this.isloading = true;
  loadingModal.present();

    this.authService.getProfile(this.token).subscribe((res: any) => {

      this.profileData = res.details;
      this.isloading = false;
      loadingModal.dismiss();
    })
  }

  ionViewWillEnter() {
    this.getProfile();

  }

}
