export interface ISubcategory {
  id: number;
  name: string;
  description: string;
  categoryId: number;
}

export interface ISubcategoryCreate {
  name: string;
  description: string;
  categoryId: number | null;
}

export interface ISubcategoryEdit {
  name: string;
  description: string;
  categoryId: number | null;
}
