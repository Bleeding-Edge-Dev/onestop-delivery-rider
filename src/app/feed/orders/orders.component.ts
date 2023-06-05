import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewOrderModalComponent } from 'src/app/components/new-order-modal/new-order-modal.component';
import { NavigationExtras, Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { get, remove } from "../../services/storage";
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  stepText = {
    4: "1: Reach Restaurant",
    42: "2: pickup order",
    5: "3: deliver order",
  }

  orders: any = {
    ongoing: [],
    pending: []
  };
  isAuthenticated: boolean;

  showActiveOrders = true;
  token: any;
  ongoingInterval: any;

  filteredOrders(): any[] {
    const ongoingOrders = this.orders.ongoing;
    const pendingOrders = this.orders.pending;
    const allOrders = ongoingOrders.concat(pendingOrders);
    if (!this.showActiveOrders) {
      return allOrders.filter(order => parseInt(order.status) <= 3);

    }

    return allOrders.filter(order => parseInt(order.status) > 3);
  }
  
  constructor(
    private modalController: ModalController,
    private router: Router,
    private ordersService: OrdersService,
    private cdRef: ChangeDetectorRef,
    private authService: AuthService
  ) { }

  async openNewOrder(order) {
      const modal = await this.modalController.create({
        component: NewOrderModalComponent,
        animated: false,
        componentProps: {
          order: order
        }
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      if(data && data.role === 'confirm') {
        // this.isRiderOnline = true;
      }
  }
  expandOrder(order: any) {
    console.log(order);
    if (this.showActiveOrders) {
      this.router.navigate(['/tabs/order'], { queryParams: { orderId: JSON.stringify(order.id) } });
    } else {
      this.openNewOrder(order);
    }
    this.cdRef.detectChanges();
  }
  
  
  async ngOnInit() {
    this.token = await get("token");
    this.token = "Bearer " + this.token;

    this.authService.isAuthenticated.subscribe((res) => {
      this.isAuthenticated = res;
      if(res){
        this.getAllOrders();
        this.ongoingInterval = setInterval(() => {
          this.getAllOrders();
        }, 5000);
      }else{
        clearInterval(this.ongoingInterval);
      }
    })
  }

  getAllOrders() {
      this.ordersService.getOngoingOrders(this.token).subscribe((res: any) => {
        let pending = res.pending;
        let ongoing = res.ongoing;
        if (!pending) {
          pending = [];
        }
        if (!ongoing) {
          ongoing = [];
        }
        this.orders.pending.forEach((order, index) => {
          let present = false;
          pending.forEach((o) => {
            if (o.txnid == order.txnid) {
              present = true;
            }
          });
          if (!present) {
            this.orders.pending.splice(index, 1);
          }
        });
        pending.forEach((order: any) => {
          let present = false;
          this.orders.pending.forEach((o, index) => {
            if (o.txnid == order.txnid) {
              present = true;
            }
          });
    
          if (!present) {
            let ot = new Date(order.allot_time);
            let ct = new Date();
            order.timeLeft = Math.round(
              ot.getTime() / 1000 + 5 * 60 - ct.getTime() / 1000
            );
            this.orders.pending.push(order);
            this.openNewOrder(order);
          }
        });
    
        this.orders.ongoing.forEach((order, index) => {
          let present = false;
          ongoing.forEach((o) => {
            if (o.txnid == order.txnid) {
              present = true;
              this.orders.ongoing[index].status = o.status;
            }
          });
          if (present == false) {
            this.orders.ongoing.splice(index, 1);
          }
        });
        ongoing.forEach((order: any) => {
          let present = false;
          this.orders.ongoing.forEach((o, index) => {
            if (o.txnid == order.txnid) {
              present = true;
              this.orders.ongoing[index].status = o.status;
              this.orders.ongoing[index].prep = o.prep;
            }
          });
          if (!present) {
            order.menu = JSON.parse(order.menu);
            this.orders.ongoing.push(order);
  
          }
        });
      });
  }
  

}
