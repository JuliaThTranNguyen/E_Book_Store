import axios, { AxiosError } from "axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootStateType } from "../store";
import {
  LoginPayload,
  LoginResponse,
  User,
  UserReducerState,
} from "../../types/User";

const accessToken = localStorage.getItem("accessToken");

export const initialState: UserReducerState = {
  user: null,
  loading: false,
  isLoggedIn: false,
  access_Token: accessToken ? accessToken : null,
  error: null,
};

export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://nodejs-server-thjulia.vercel.app/api/v1/auth/login",
        payload
      );

      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || "An error occurred");
    }
  }
);

export const getUserProfile = createAsyncThunk<User, void>(
  "auth/getUserProfile",
  async (_, thunkAPI) => {
    const access_token = (thunkAPI.getState() as RootStateType).auth
      .access_Token;

    if (!access_token) {
      console.error("Token is missing!");
      return thunkAPI.rejectWithValue("Token is missing !");
    }

    try {
      const response = await axios.get(
        "https://nodejs-server-thjulia.vercel.app/api/v1/auth/me",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      return response.data.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /* HANDLE LOGOUT */
    UserLogout: (state) => {
      // Clear user-related state
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;

      // Clear access token
      state.access_Token = null;

      return state;
    },
  },
  extraReducers: (builder) => {
    /* LOGIN USER*/
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(
        userLogin.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          if (action.payload === undefined) {
            state.error = "Unable to identify logged in payload";
          } else {
            state.loading = false;
            state.isLoggedIn = true;
            state.access_Token = action.payload?.accessToken || null; // Ensure it's correctly accessed
          }
        }
      )
      .addCase(userLogin.rejected, (state, action) => {
        state.error = `Invalid credentials, please check your inputs.`;
        state.loading = false;
        state.isLoggedIn = false;
      });
    /*GET USER PROFILE*/
    builder
      .addCase(
        getUserProfile.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload;
          state.loading = false;
        }
      )
      .addCase(getUserProfile.rejected, (state) => {
        console.error("Error fetching user profile");
        localStorage.removeItem("accessToken");
        state.user = null;
      });
  },
});

const authReducer = authSlice.reducer;
export const { UserLogout } = authSlice.actions;
export const isUserLoggedIn = (state: RootStateType) => state.auth.isLoggedIn;
export const currentAccessToken = (state: RootStateType) =>
  state.auth.access_Token;
export const currentUser = (state: RootStateType) => state.auth.user;
export const errorResponse = (state: RootStateType) => state.auth.error;
export default authReducer;
