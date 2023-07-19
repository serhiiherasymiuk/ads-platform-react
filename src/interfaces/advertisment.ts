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
  userId: string;
}

export interface IAdvertismentCreate {
  name: string;
  description: string;
  price: number;
  contactPerson: string;
  contactPhoneNumber: string;
  advertismentImages: File[];
  location: string;
  categoryId: number | null;
  userId: string;
}

export interface IAdvertismentEdit {
  name: string;
  description: string;
  price: number;
  contactPerson: string;
  contactPhoneNumber: string;
  advertismentImages: File[];
  location: string;
  categoryId: number | null;
  userId: string;
}
