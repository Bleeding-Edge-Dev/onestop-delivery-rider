export interface IRiderReport {
  earningTransactions: IOrderTransaction[];
  orderPay: string;
  rewardTransactions: IRewardTransaction[];
  rewards: string;
  totalEarning: string;
  totalHours: string;
  totalTrips: string;
}

export interface IOrderTransaction {
  dcharge: string;
  time: string;
  txnid: string;
}
export interface IRewardTransaction {
  amount: string;
  completionTime: string;
  noOfOrders: string;
}
