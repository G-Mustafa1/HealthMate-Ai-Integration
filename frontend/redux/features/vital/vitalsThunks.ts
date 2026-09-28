import axiosInstance from "@/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface Vital {
  _id: string;
  user: string;
  bp?: string;
  sugar?: number;
  weight?: number;
  note?: string;
  date: string;
}

export interface AddVitalData {
  bp?: string;
  sugar?: number;
  weight?: number;
  note?: string;
  date?: string;
}

// =========================
// ADD VITAL
// =========================

export const addVital = createAsyncThunk<
  Vital,
  AddVitalData,
  { rejectValue: string }
>(
  "vitals/addVital",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/vitals/add",
        data
      );

      return response.data.vitals;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to add vital"
      );
    }
  }
);

// =========================
// GET MY VITALS
// =========================

export const getMyVitals = createAsyncThunk<
  Vital[],
  void,
  { rejectValue: string }
>(
  "vitals/getMyVitals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/vitals/myvitals"
      );

      return response.data.vitals || [];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch vitals"
      );
    }
  }
);

// =========================
// DELETE VITAL
// =========================

export const deleteVital = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  "vitals/deleteVital",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(
        `/vitals/${id}`
      );

      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete vital"
      );
    }
  }
);
