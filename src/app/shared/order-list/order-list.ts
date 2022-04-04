export interface OrderList {
  orderID: Number;
  manu: string;
  orderTotal: Number;
  orderInfo: {
    itemCode: string;
    itemCount: Number;
    itemPrice: Number;
  };
  destShop: string;
  eta: Date;
  currentLoc: {
    lat: string;
    long: string;
  }
  orderStatus:string;
}

export const OrderItems = [
  {
    orderID: 90000,
    manu: "Carl Hansen & Son",
    orderTotal: 13000000,
    orderInfo: {
      0: {
        itemCode: "CH24",
        itemCount: 10,
        itemPrice: 500000,
      },
      1:{
        itemCode: "CH29P",
        itemCount: 10,
        itemPrice: 800000,
      },
    },
    destShop: "軽井沢店",
    eta: 1654279072,
    currentLoc: {
      lat: 55.3925554,
      long: 9.938649,
    },
  orderStatus:"発送準備中",
  },
  {
    orderID: 90001,
    manu: "Carl Hansen & Son",
    orderTotal: 13000000,
    orderInfo: {
      0: {
        itemCode: "CH24",
        itemCount: 10,
        itemPrice: 500000,
      },
      1:{
        itemCode: "CH29P",
        itemCount: 10,
        itemPrice: 800000,
      },
    },
    destShop: "軽井沢店",
    eta: 1654279072,
    currentLoc: {
      lat: 55.3925554,
      long: 9.938649,
    },
  orderStatus:"発送準備中",
  },


]

