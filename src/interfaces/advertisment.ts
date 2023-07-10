import { ICategory } from "./category";

export interface IAdvertisment {
    id: number;
    name: string;
    image: string;
    description: string;
    pirce:number;
    contactPerson:string;
    contactPhoneNumber:string;
    location:string;
    category?:ICategory[];
  }
  
  export interface IAdvertismentCreate {
    name: string;
    image: File | null;
    description: string;
    pirce:number;
    contactPerson:string;
    contactPhoneNumber:string;
    location:string;
    category?:ICategory[];
  }
  
  export interface IAdvertismentEdit {
    name: string;
    image: File | null;
    description: string;
    pirce:number;
    contactPerson:string;
    contactPhoneNumber:string;
    location:string;
    category?:ICategory[];
  }
  