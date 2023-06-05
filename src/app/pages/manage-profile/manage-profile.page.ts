import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { get } from 'src/app/services/storage';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.page.html',
  styleUrls: ['./manage-profile.page.scss'],
})
export class ManageProfilePage implements OnInit {
  token;
  profileData = {
    accountNumber: '',
    address: '',
    alternatePhone: '',
    bankName: '',
    drivingLicenseExpiry: '',
    drivingLicenseNumber: '',
    ifscCode: '',
    name: '',
    phone: '',
    profileImage: '',
    rating: '',
    totalDistance: '',
    totalEarnings: '',
    totalOrders: '',
    type: ''
  }

  constructor(
    private authService: AuthService,
  ) { }

  async ngOnInit() {
    this.token = await get('token');
    this.token = "Bearer " + this.token;
    this.getProfile();

  }
  async getProfile() {
    this.authService.getProfile(this.token).subscribe((res: any) => {
      console.log(res.details);
      this.profileData = res.details;
    })
  }

}
