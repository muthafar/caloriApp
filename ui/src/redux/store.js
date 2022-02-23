import { configureStore } from "@reduxjs/toolkit";
import foodReducer from "./features/food/foodSlice";
import userReducer from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    food: foodReducer,
    user: userReducer,
  },
});

export default store;
