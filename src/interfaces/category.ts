export interface ICategory {
  id: number;
  name: string;
  image: string;
  description: string;
}

export interface ICategoryCreate {
  name: string;
  image: File | null;
  description: string;
}

export interface ICategoryEdit {
  name: string;
  image: File | null;
  description: string;
}
