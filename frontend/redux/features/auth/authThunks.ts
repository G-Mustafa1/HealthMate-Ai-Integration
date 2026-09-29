import axiosInstance from "@/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface User {
  _id?: string;
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk<
  User,
  LoginData,
  { rejectValue: string }
>(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/auth/login",
        data
      );

      return response.data.user;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Login failed"
      );
    }
  }
);

export const signupUser = createAsyncThunk<
  User,
  SignupData,
  { rejectValue: string }
>(
  "auth/signupUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/auth/signup",
        data
      );

      return response.data.user;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Signup failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Logout failed"
      );
    }
  }
);

export const getUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/profile/getuser"
      );

      return response.data.user;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch user"
      );
    }
  }
);
