import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchFoodList = createAsyncThunk("food/getFoodList", async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/food`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
});
export const fetchAdminFoodList = createAsyncThunk(
  "food/getFoodList",
  async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/food`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addMeal = createAsyncThunk(
  "food/addMeal",
  async ({ food: foodName, calorie, price }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/food`,
        { foodName, calorie, price },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const AdminAddMeal = createAsyncThunk(
  "food/addMeal",
  async ({ user, food: foodName, calorie, price }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/food`,
        { user, foodName, calorie, price },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const AdminDeleteMeal = createAsyncThunk(
  "food/deleteMeal",
  async (id) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/admin/${id}`,

        { headers: { Authorization: `Bearer ${token}` } }
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const AdminUpdateMeal = createAsyncThunk(
  "food/updateMeal",
  async ({ food: foodName, price, calorie, id }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/admin/${id}`,
        { foodName, calorie, price },

        { headers: { Authorization: `Bearer ${token}` } }
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const searchByDate = createAsyncThunk(
  "food/searchByDate",
  async ({ from, to }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/food/search`,
        { from, to },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getSumCal = createAsyncThunk("food/getSumCal", async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/food/sumcal`,

      { headers: { Authorization: `Bearer ${token}` } }
    );

    return data.sumCal;
  } catch (error) {
    console.log(error);
  }
});
export const getmealsweek = createAsyncThunk("food/getmealsweek", async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/getmealsweek`,

      { headers: { Authorization: `Bearer ${token}` } }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
});
export const getmealsweekbefore = createAsyncThunk(
  "food/getmealsweekbefore",
  async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/getmealsweekbefore`,

        { headers: { Authorization: `Bearer ${token}` } }
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getavgCal = createAsyncThunk("food/avgCal", async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/avgCal`,

      { headers: { Authorization: `Bearer ${token}` } }
    );

    return data.calAvg;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  foodList: [],
  filteredFoodList: [],
  show: false,
  mealsweek: 0,
  mealsweekBefore: 0,
  avgCal: [],
  status: null,
  sumCal: null,
};

export const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    toggle: (state) => {
      state.show = !state.show;
    },
  },
  extraReducers: {
    [fetchFoodList.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchFoodList.fulfilled]: (state, action) => {
      state.status = "success";
      state.foodList = action.payload;
    },
    [fetchFoodList.rejected]: (state, action) => {
      state.status = "fail";
    },
    [fetchAdminFoodList.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchAdminFoodList.fulfilled]: (state, action) => {
      state.status = "success";
      state.foodList = action.payload;
    },
    [fetchAdminFoodList.rejected]: (state, action) => {
      state.status = "fail";
    },
    [addMeal.fulfilled]: (state, action) => {
      state.foodList = [...state.foodList, action.payload];
    },
    [getSumCal.fulfilled]: (state, action) => {
      state.sumCal = action.payload;
    },
    [searchByDate.fulfilled]: (state, action) => {
      state.filteredFoodList = action.payload;
    },
    [AdminAddMeal.fulfilled]: (state, action) => {
      state.foodList = [action.payload, ...state.foodList];
    },
    [AdminDeleteMeal.fulfilled]: (state, action) => {
      state.foodList = state.foodList.filter(
        (meal) => meal._id !== action.payload._id
      );
    },
    [AdminUpdateMeal.fulfilled]: (state, action) => {
      state.foodList = state.foodList.map((meal) =>
        meal._id === action.payload._id ? action.payload : meal
      );
    },
    [getmealsweek.fulfilled]: (state, action) => {
      state.mealsweek = action.payload;
    },
    [getmealsweekbefore.fulfilled]: (state, action) => {
      state.mealsweekBefore = action.payload;
    },
    [getavgCal.fulfilled]: (state, action) => {
      state.avgCal = action.payload;
    },
  },
});
export const { toggle, toggleDelete } = foodSlice.actions;
export default foodSlice.reducer;
