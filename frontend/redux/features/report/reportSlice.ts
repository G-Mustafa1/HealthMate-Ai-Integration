import { createSlice } from "@reduxjs/toolkit";

import {
  getMyReports,
  getSingleReport,
  getInsights,
  uploadReport,
  deleteReport,
  Report,
  Insight,
} from "./reportThunks";

interface ReportState {
  reports: Report[];
  report: Report | null;
  insights: Insight[];
  loading: boolean;
  uploadLoading: boolean;
  deleteLoading: boolean;
  error: string | null;
}

const initialState: ReportState = {
  reports: [],
  report: null,
  insights: [],
  loading: false,
  uploadLoading: false,
  deleteLoading: false,
  error: null,
};

const reportSlice = createSlice({
  name: "reports",
  initialState,

  reducers: {
    clearReportError: (state) => {
      state.error = null;
    },

    clearSingleReport: (state) => {
      state.report = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================
      // GET MY REPORTS
      // =========================

      .addCase(getMyReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getMyReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
      })

      .addCase(getMyReports.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to fetch reports";
      })

      // =========================
      // GET SINGLE REPORT
      // =========================

      .addCase(getSingleReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getSingleReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
      })

      .addCase(getSingleReport.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to fetch report";
      })

      // =========================
      // GET INSIGHTS
      // =========================

      .addCase(getInsights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getInsights.fulfilled, (state, action) => {
        state.loading = false;
        state.insights = action.payload;
      })

      .addCase(getInsights.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to fetch insights";
      })

      // =========================
      // UPLOAD REPORT
      // =========================

      .addCase(uploadReport.pending, (state) => {
        state.uploadLoading = true;
        state.error = null;
      })

      .addCase(uploadReport.fulfilled, (state, action) => {
        state.uploadLoading = false;

        state.reports = [
          action.payload,
          ...state.reports,
        ];
      })

      .addCase(uploadReport.rejected, (state, action) => {
        state.uploadLoading = false;
        state.error =
          action.payload || "Failed to upload report";
      })

      // =========================
      // DELETE REPORT
      // =========================

      .addCase(deleteReport.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })

      .addCase(deleteReport.fulfilled, (state, action) => {
        state.deleteLoading = false;

        state.reports = state.reports.filter(
          (report) => report._id !== action.payload
        );

        if (state.report?._id === action.payload) {
          state.report = null;
        }
      })

      .addCase(deleteReport.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error =
          action.payload || "Failed to delete report";
      });
  },
});

export const {
  clearReportError,
  clearSingleReport,
} = reportSlice.actions;

export default reportSlice.reducer;
