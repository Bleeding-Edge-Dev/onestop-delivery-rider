import { Dish } from "./dish";

export interface Order{
    address:string;
    amount:string;
    menu:Dish[];
    msg:string;
    name:string;
    no:string;
    ptype:string;
    status:string;
    time:string;
    txnid:string;
    vadd:string;
    vname:string;
    longi:string;
    lati:string;
    deliverynumber:any;
    deliveryname:any;
    id:any;
    prep:any;
    manual:any;
    riderStatus:any;
}