export interface OrderList {
  orderID: Number;
  manu: string;
  orderInfo
  itemCode: string;
  itemCount: Number;
  itemPrice: Number;
  destShop: string;
  eta: Date;
  currentLoc: {
    lat: string;
    long: string;
  }
  orderStatus: string;
}

export const OrderItems = [
  {
    orderID: 90000,
    manu: "Carl Hansen & Son",
    itemCode: "CH24",
    itemCount: 10,
    itemPrice: 500000,
    destShop: "軽井沢店",
    eta: 1654279072,
    currentLoc: {
      lat: 55.3925554,
      long: 9.938649,
    },
    orderStatus: "発送準備中",
  },
  {
    orderID: 90001,
    manu: "Carl Hansen & Son",
    itemCode: "CH24",
    itemCount: 10,
    itemPrice: 500000,
    destShop: "立科店",
    eta: 1654279072,
    currentLoc: {
      lat: 51.3085988,
      long: 7.2654144,
    },
    orderStatus: "輸送中",
  },
  {
    orderID: 90002,
    manu: "Carl Hansen & Son",
    itemCode: "CH24",
    itemCount: 10,
    itemPrice: 500000,
    destShop: "佐久店",
    eta: 1654279072,
    currentLoc: {
      lat: 30.5380077,
      long: 32.3173256,
    },
    orderStatus: "輸送中",
  },



]

