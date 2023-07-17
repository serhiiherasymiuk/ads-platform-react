import { ICategory } from "./category";

export interface IAdvertisment {
    id: number;
    name: string;
    image: string;
    description: string;
    price:number;
    contactPerson:string;
    contactPhoneNumber:string;
    location:string;
    category?:ICategory;
  }
  
  export interface IAdvertismentCreate {
    name: string;
    image: File | null;
    description: string;
    price:number;
    contactPerson:string;
    contactPhoneNumber:string;
    location:string;
    categoryid?:number;
  }
  
  export interface IAdvertismentEdit {
    id:number;
    name: string;
    image: File | null;
    description: string;
    price:number;
    contactPerson:string;
    contactPhoneNumber:string;
    location:string;
    categoryid?:string;
  }
  