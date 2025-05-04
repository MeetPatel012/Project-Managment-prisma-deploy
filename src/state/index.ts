import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface initialStateTypes {
  isSliderCollapsed: boolean;
  isDarkMode: boolean;
}

const initialState: initialStateTypes = {
  isSliderCollapsed: false,
  isDarkMode: false,
};

export const globalSlice = createSlice({
  name: "gloabal",
  initialState,
  reducers: {
    setIsSliderCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSliderCollapsed = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { setIsSliderCollapsed, setIsDarkMode } = globalSlice.actions;
export default globalSlice.reducer;
