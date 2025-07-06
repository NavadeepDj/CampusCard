export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  dataAiHint: string;
}

export interface Vendor {
  id: string;
  name: string;
  description: string;
  image: string;
  dataAiHint: string;
  products: Product[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Transaction {
  id: string;
  vendorName: string;
  date: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
}
