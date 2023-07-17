import { createSlice } from "@reduxjs/toolkit";
import { ISubcategory } from "../../interfaces/subcategory";

interface CategoriesListInterface {
  subcategories: ISubcategory[];
}

const initialState: CategoriesListInterface = {
  subcategories: [],
};

export const subcategorySlice = createSlice({
  name: "subcategory",
  initialState,
  reducers: {
    setSubcategories: (state, action) => {
      state.subcategories = action.payload;
    },
    addSubcategory: (
      state,
      { payload: { id, name, description, categoryId } }
    ) => {
      state.subcategories.push({ id, name, description, categoryId });
    },
    deleteSubcategory: (state, action) => {
      state.subcategories = state.subcategories.filter(
        (category) => category.id !== action.payload
      );
    },
    editSubcategory: (state, action) => {
      const editedSubcategory = action.payload;
      state.subcategories = state.subcategories.map((subcategory) =>
        subcategory.id === editedSubcategory.id
          ? editedSubcategory
          : subcategory
      );
    },
  },
});

export const {
  addSubcategory,
  deleteSubcategory,
  editSubcategory,
  setSubcategories,
} = subcategorySlice.actions;

export default subcategorySlice.reducer;
