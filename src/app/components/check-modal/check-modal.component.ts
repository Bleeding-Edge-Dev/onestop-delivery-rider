import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-check-modal',
  templateUrl: './check-modal.component.html',
  styleUrls: ['./check-modal.component.scss'],
})
export class CheckModalComponent implements OnInit {
  @Input() type: String;
  @Input() title: String;
  @Input() message: String;
  @Input() route: String;
  @Input() buttonText: String;

  constructor(private modalController: ModalController,private router:Router) { }
  getIcon(){
    if(this.type == "success"){
      return "../../../assets/icon/tick-success.svg"
    }
    else if(this.type == "failure"){
      return "../../../assets/icon/tick-failure.svg"

    }
    // else if(this.type == "warning"){
    //   return "alert-circle-outline"
    // }
    // else{
    //   return "information-circle-outline"
    // }
  }

  ngOnInit() {
    console.log(this.type)
  }
  onDismiss() {
    this.modalController.dismiss();
  }
  handleButton(){
    this.router.navigate([this.route]);
    this.modalController.dismiss();
  }


  

}
