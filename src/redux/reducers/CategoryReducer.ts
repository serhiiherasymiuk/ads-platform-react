import { createSlice } from "@reduxjs/toolkit";
import { ICategory } from "../../interfaces/category";

interface CategoriesListInterface {
  categories: ICategory[];
}

const initialState: CategoriesListInterface = {
  categories: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    addCategory: (
      state,
      { payload: { id, name, description, image, parentId } }
    ) => {
      state.categories.push({ id, name, description, image, parentId });
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
    editCategory: (state, action) => {
      const editedCategory = action.payload;
      state.categories = state.categories.map((category) =>
        category.id === editedCategory.id ? editedCategory : category
      );
    },
  },
});

export const { addCategory, deleteCategory, editCategory, setCategories } =
  categorySlice.actions;

export default categorySlice.reducer;
