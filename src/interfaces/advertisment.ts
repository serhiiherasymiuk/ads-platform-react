import { ICategory } from "./category";

export interface IAdvertismentImage {
  id: number;
  image: string;
  advertismentId: number;
}

export interface IAdvertisment {
  id: number;
  name: string;
  description: string;
  price: number;
  contactPerson: string;
  contactPhoneNumber: string;
  advertismentImages: IAdvertismentImage[];
  location: string;
  categoryId: number;
}

export interface IAdvertismentCreate {
  name: string;
  image: File | null;
  description: string;
  price: number;
  contactPerson: string;
  contactPhoneNumber: string;
  location: string;
  categoryid?: number;
}

export interface IAdvertismentEdit {
  id: number;
  name: string;
  image: File | null;
  description: string;
  price: number;
  contactPerson: string;
  contactPhoneNumber: string;
  location: string;
  categoryid?: string;
}
