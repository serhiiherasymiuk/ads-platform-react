export interface IAdvertisementImage {
  id: number;
  image: string;
  advertisementId: number;
}

export interface IAdvertisement {
  id: number;
  name: string;
  description: string;
  price: number;
  contactPerson: string;
  contactPhoneNumber: string;
  advertisementImages: IAdvertisementImage[];
  location: string;
  categoryId: number;
  creationDate: Date;
  userId: string;
}

export interface IAdvertisementCreate {
  name: string;
  description: string;
  price: number;
  contactPerson: string;
  contactPhoneNumber: string;
  advertisementImages: File[];
  location: string;
  categoryId: number | null;
  userId: string;
}

export interface IAdvertisementEdit {
  name: string;
  description: string;
  price: number;
  contactPerson: string;
  contactPhoneNumber: string;
  advertisementImages: File[];
  location: string;
  categoryId: number | null;
  userId: string;
}
