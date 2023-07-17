export interface ICategory {
  id: number;
  name: string;
  image: string;
  description: string;
  parentId: number | null;
}

export interface ICategoryCreate {
  name: string;
  image: File | null;
  description: string;
  parentId: number | null;
}

export interface ICategoryEdit {
  name: string;
  image: File | null;
  description: string;
  parentId: number | null;
}
