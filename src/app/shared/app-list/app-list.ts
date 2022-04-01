export interface AppList {
  name: string;
  desc: string;
  img: string;
  link:string;
}

export const appItems = [
  {
    name: "在庫一覧",
    desc: "取り扱い商品の一覧",
    img: "assets/img/app_icons/inventory_list_white.png",
    link: "/inventory",
  },
  {
    name: "発注一覧",
    desc: "商品発注書一覧",
    img: "assets/img/app_icons/order_list_white.png",
    link: "/inventory",
  },
  {
    name: "店舗情報",
    desc: "店舗一覧",
    img: "assets/img/app_icons/stores_list_white.png",
    link: "/inventory",
  },
]
