export interface StoreList {
  name: string;
  location: {
    lat: string,
    long: string,
  },
  tel:string,
  address:string,
}

export const StoreItems = [
  {
    name: "軽井沢店",
    location: {
      lat: 36.3487656,
      long: 138.6316955,
    },
    tel:"0267-45-2374",
    address:"長野県北佐久郡軽井沢町大字長倉2381",
  },
  {
    name: "佐久店",
    location: {
      lat: 36.2875121,
      long: 138.4860556,
    },
    tel:"0267-44-4174",
    address:"長野県佐久市中込3056",
  },
  {
    name: "立科店",
    location: {
      lat: 36.1298361,
      long: 138.2711858,
    },
    tel:"0267-43-4654",
    address:"長野県北佐久郡立科町大字芦田2532",
  },
  {
    name: "上田店",
    location: {
      lat: 36.4013191,
      long: 138.2422258,
    },
    tel:"0267-49-6733",
    address:"長野県上田市大手1-11-16",
  },
  {
    name: "小諸店",
    location: {
      lat: 36.3279875,
      long: 138.4202032,
    },
    tel:"0267-41-3590",
    address:"長野県小諸市相生町3-3-3",
  },
  {
    name: "安曇野店",
    location: {
      lat: 36.2929735,
      long: 137.8772476,
    },
    tel:"0267-42-5462",
    address:"長野県安曇野市豊科6000",
  },
  {
    name: "茅野店",
    location: {
      lat: 36.0030628,
      long: 138.1724738,
    },
    tel:"0267-45-5721",
    address:" 長野県茅野市塚原2-6-1"
  },
  {
    name: "松本店",
    location: {
      lat: 36.2369651,
      long: 137.9689276,
    },
    tel:"0267-40-4561",
    address:"長野県松本市丸の内3-7"
  },
  {
    name: "長野店",
    location: {
      lat: 36.5648708,
      long: 138.195151,
    },
    tel:"0267-48-3472",
    address:"長野市大字鶴賀緑町1613"
  },
]


