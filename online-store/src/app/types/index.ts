export enum color {
  black = "черный",
  white = "белый",
  green = "зеленый",
  red = "красный",
}
export enum Manufacturer {
  PocketBook,
  Amazon,
  Onyx,
}

export interface ResponseProduct {
  name: string;
  image: string;
  count: number;
  year: number;
  color: keyof typeof color;
  manufacturer: keyof typeof Manufacturer;
  diagonal: number;
  popular: boolean;
}

export interface Product extends ResponseProduct {
  id: number;
  isShow: boolean;
  element: HTMLElement | null;
}

export type products = Array<Product>;

export interface productHTMLElement extends HTMLElement {
  productObj?: Product;
}

export type RangeFilterType = {
  from: number;
  to: number;
};
