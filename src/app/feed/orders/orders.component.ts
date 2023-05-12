import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewOrderModalComponent } from 'src/app/components/new-order-modal/new-order-modal.component';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { get, remove } from "../../services/storage";


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
  
  orders:any = {
    ongoing: [
      {
        id: "55997",
        txnid: "OSD55997",
        time: "2023-04-25 13:35:48",
        menu: [
          {
            vendorId: "13",
            dishId: "7915",
            dishName: "Veg Basic Pizza",
            dishPrice: "249",
            quantity: 1,
            variations: [],
            addOns: []
          },
          {
            vendorId: "13",
            dishId: "7918",
            dishName: "Nonveg Basic Pizza",
            dishPrice: "388",
            quantity: 2,
            variations: [],
            addOns: []
          },
          {
            vendorId: "13",
            dishId: "7904",
            dishName: "Onion Basic Pizza",
            dishPrice: "129",
            quantity: 5,
            variations: [],
            addOns: []
          }
        ],
        status: "4",
        vname: "Cafe Time",
        msg: "",
        amount: "766",
        ptype: "Cash",
        vadd: "31, Shreeraj Nagar, Uran, Navi Mumbai, Maharashtra 400702, India",
        address: "uran, navi mumbaishop no1 , pratik apt, uran mora road, beside samsung gallery, Kathe Aali, Nagaon, Uran, Navi Mumbai, Maharashtra 400702, India",
        name: "nishant",
        no: "7987482823",
        longi: "72.9283",
        lati: "18.8772",
        deliveryname: "Nishant Gupta",
        deliverynumber: "7987482823",
        vlat: "18.87722272916547",
        vlong: "72.93933826420574"
      },
      {
        id: "55998",
        txnid: "OSD55998",
        time: "2023-04-26 10:20:15",
        menu: [
          {
            vendorId: "8",
            dishId: "122",
            dishName: "Chicken Alfredo Pasta",
            dishPrice: "349",
            quantity: 1,
            variations: [],
            addOns: []
          },
          {
            vendorId: "8",
            dishId: "123",
            dishName: "Margherita Pizza",
            dishPrice: "259",
            quantity: 2,
            variations: [],
            addOns: []
          },
          {
            vendorId: "8",
            dishId: "125",
            dishName: "Garlic Bread",
            dishPrice: "99",
            quantity: 3,
            variations: [],
            addOns: []
          }
        ],
        status: "5",
        vname: "The Pasta Place",
        msg: "",
        amount: "1056",
        ptype: "Card",
        vadd: "20, Hill Road, Bandra West, Mumbai, Maharashtra 400050, India",
        address: "Bandra West, Mumbai - Shop no. 5, Palak Residency, Near Mehboob Studios, Mehboob Studio Lane, Mumbai, Maharashtra 400050, India",
        name: "Samantha",
        no: "9876543210",
        longi: "72.8258",
        lati: "19.0583",
        deliveryname: "Samantha Smith",
        deliverynumber: "9876543210",
        vlat: "19.068893988932034",
        vlong: "72.83179875185178"
      },
      {
        id: "55999",
        txnid: "OSD55999",
        time: "2023-04-26 14:45:30",
        menu: [
          {
            vendorId: "24",
            dishId: "162",
            dishName: "Chicken Fried Rice",
            dishPrice: "249",
            quantity: 1,
            variations: [],
            addOns: []
          },
          {
            vendorId: "24",
            dishId: "163",
            dishName: "Vegetable Hakka Noodles",
            dishPrice: "199",
            quantity: 1,
            variations: [],
            addOns: []
          },
          {
            vendorId: "24",
            dishId: "167",
            dishName: "Manchow Soup",
            dishPrice: "79",
            quantity: 2,
            variations: [],
            addOns: []
          }
        ],
        status: "42",
        vname: "China Town",
        msg: "",
        amount: "626",
        ptype: "Online",
        vadd: "Shop No 9, Sai Vihar CHS, Kalyan West, Mumbai, Maharashtra 421301, India",
        address: "Kalyan West, Mumbai - Flat no. 401, Jaya apartment, opposite to HDFC Bank, Khadakpada, Kalyan west, Mumbai, Maharashtra 421301, India",
        name: "David",
        no: "9865321470",
        longi: "73.1338",
        lati: "19.2437",
        deliveryname: "David Johnson",
        deliverynumber: "9865321470",
        vlat: "19.24777404725305",
        vlong: "73.13527029260334"
      }
      
    ],
    pending: [
      {
        id: "56001",
        txnid: "OSD56001",
        time: "2023-04-26 18:20:15",
        menu: [
          {
            vendorId: "6",
            dishId: "57",
            dishName: "Paneer Butter Masala",
            dishPrice: "249",
            quantity: 2,
            variations: [],
            addOns: []
          },
          {
            vendorId: "6",
            dishId: "70",
            dishName: "Butter Naan",
            dishPrice: "59",
            quantity: 4,
            variations: [],
            addOns: []
          },
          {
            vendorId: "6",
            dishId: "44",
            dishName: "Tandoori Chicken",
            dishPrice: "299",
            quantity: 1,
            variations: [],
            addOns: []
          }
        ],
        status: "3",
        vname: "Pind Balluchi",
        msg: "",
        amount: "1086",
        ptype: "Online",
        vadd: "3rd Floor, Inorbit Mall, Sector 30A, Vashi, Navi Mumbai, Maharashtra 400705, India",
        address: "Vashi, Navi Mumbai - D-303, 3rd Floor, Haware Fantasia Business Park, Near Inorbit Mall, Vashi, Navi Mumbai, Maharashtra 400705, India",
        name: "Rahul",
        no: "9865321450",
        longi: "72.9833",
        lati: "19.0760",
        deliveryname: "Rahul Sharma",
        deliverynumber: "9865321450",
        vlat: "19.085390549187453",
        vlong: "72.99815507747611"
      }
      
    ]
  };

  // orders: any = {
  //   ongoing: [],
  //   pending: []
  // };
  

  showActiveOrders = true;
  token: any;

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
    private cdRef: ChangeDetectorRef
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
    if (this.showActiveOrders) {
      
      this.router.navigate(['/tabs/order'], { state: { order: order } });

    } else {
      this.openNewOrder(order);
    }
    this.cdRef.detectChanges();
  }
  
  
  async ngOnInit() {
    this.token = await get("token");
    this.token = "Bearer " + this.token;
    this.getOrders();
  }
  getOrders(){
    this.ordersService.getOngoingOrders(this.token).subscribe((res)=>{
      console.log(res);
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
