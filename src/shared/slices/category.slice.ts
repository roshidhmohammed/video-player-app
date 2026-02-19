import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
  categories: string[];
  selectedCategory: string;
}

const initialState: CategoryState = {
  categories: [],
  selectedCategory: "All",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string | undefined>) => {
      state.selectedCategory = action.payload || "All";
    },
  },
});

export const { setCategories, setSelectedCategory } = categorySlice.actions;

export default categorySlice.reducer;
