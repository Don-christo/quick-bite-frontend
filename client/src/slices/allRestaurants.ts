// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../api/httpService";


export interface AllRestaurantDetails{
  id?: string;
  email?: string;
  restaurant_name?: string;
  name_of_owner?: string;
  company_name?: string;
  password?: string;
  address?: string;
  phone_no?: string;
  isAvailable?: boolean;
  earnings?: number;
  revenue?: number;
  role?: string;
  salt?: string;
  cover_image?: string;
  rating?: number;
  orders?: number
   
}
export interface InitialState {	
  allRestaurant:AllRestaurantDetails[];	
	isLoading: boolean
	error: string;
    message:string
  }
  const initialState:InitialState={
    allRestaurant:[],
     isLoading:false,
     error:"",
     message: ""
  } 
 
  
  export const getAllRestaurants = createAsyncThunk(
    "allRestaurant/getRestaurants",
    async (_, thunkAPI) => {
      try {
        const response = await axios.get("/user/getVendors");
        console.log(response)
        return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        if (error.response) {
            return thunkAPI.rejectWithValue(error.response.data.message);
          }
          if (error.request) {
            return thunkAPI.rejectWithValue("Network Error");
          }
          if (error.message) {
            return thunkAPI.rejectWithValue(error.message);
          }
      }
    }
  );
  
  export const allRestaurants = createSlice({
    name: "allRestaurant",
    initialState,
    reducers: {},
    extraReducers: (builder) => {  
     
      builder.addCase(getAllRestaurants.pending, (state) => {
        // Add user to the state array
        state.isLoading = true;
        state.message = ""
        state.error =""
      });
      builder.addCase(getAllRestaurants.fulfilled, (state, action) => {
        // Add user to the state array
         state.allRestaurant = action.payload.data
         state.message = action.payload.message
        state.error = "";
        toast.success(action.payload.message)

      });
  
      builder.addCase(getAllRestaurants.rejected, (state, action) => {
        // Add user to the state array
        state.isLoading = false;      
        state.error = action.payload as string;
        toast.error(action.payload as string) 
      });
    },
  });
  
  // Action creators are generated for each case reducer function
//   export const { logout, loginSuccess } = popularFoodSlice.actions;
  
  export default allRestaurants.reducer;
