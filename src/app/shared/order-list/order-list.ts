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
    eta: 1649238348,
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
    eta: 1649238348,
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
    eta: 1649238348,
    currentLoc: {
      lat: 30.5380077,
      long: 32.3173256,
    },
    orderStatus: "輸送中",
  },
  {
    orderID: 90003,
    manu: "Carl Hansen & Son",
    itemCode: "CH162",
    itemCount: 10,
    itemPrice: 2996000,
    destShop: "茅野店",
    eta: 1659941189,
    currentLoc: {
      lat: 13.4335422,
      long: 51.5538883,
    },
    orderStatus: "輸送中",
  },
  {
    orderID: 90004,
    manu: "Carl Hansen & Son",
    itemCode: "TK8",
    itemCount: 5,
    itemPrice: 1996000,
    destShop: "長野店",
    eta: 1657262789,
    currentLoc: {
      lat: -15.3325458,
      long: 115.6548863,
    },
    orderStatus: "輸送中",
  },
  {
    orderID: 90005,
    manu: "Carl Hansen & Son",
    itemCode: "E005",
    itemCount: 15,
    itemPrice: 960000,
    destShop: "上田店",
    eta: 1654670789,
    currentLoc: {
      lat: 19.797944,
      long: 149.6986853,
    },
    orderStatus: "輸送中",
  },

]

