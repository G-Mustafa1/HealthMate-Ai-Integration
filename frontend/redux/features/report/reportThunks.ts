import axiosInstance from "@/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface Report {
  _id: string;
  filename: string;
  fileUrl: string;
  public_id?: string;
  title?: string;
  summary?: string;
  explanation_en?: string;
  explanation_ro?: string;
  suggested_questions?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Insight {
  _id: string;
  reportTitle: string;
  summary: string;
  explanation_en: string;
  explanation_ro: string;
}

// GET MY REPORTS
export const getMyReports = createAsyncThunk<
  Report[],
  void,
  { rejectValue: string }
>(
  "reports/getMyReports",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/report/myreports"
      );

      return response.data.reports || [];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error ||
          "Failed to fetch reports"
      );
    }
  }
);

// GET SINGLE REPORT
export const getSingleReport = createAsyncThunk<
  Report,
  string,
  { rejectValue: string }
>(
  "reports/getSingleReport",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/report/${id}`
      );

      return response.data.report;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error ||
          "Failed to fetch report"
      );
    }
  }
);

// GET INSIGHTS
export const getInsights = createAsyncThunk<
  Insight[],
  void,
  { rejectValue: string }
>(
  "reports/getInsights",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/report/insights"
      );

      return response.data.insights || [];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error ||
          "Failed to fetch insights"
      );
    }
  }
);

// UPLOAD REPORT
export const uploadReport = createAsyncThunk<
  Report,
  File,
  { rejectValue: string }
>(
  "reports/uploadReport",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await axiosInstance.post(
        "/report/upload",
        formData
      );

      return response.data.report;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error ||
          "Failed to upload report"
      );
    }
  }
);

// DELETE REPORT
export const deleteReport = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  "reports/deleteReport",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/report/${id}`);

      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error ||
          "Failed to delete report"
      );
    }
  }
);
