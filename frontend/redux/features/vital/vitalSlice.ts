import { createSlice } from "@reduxjs/toolkit";

import {
  addVital,
  getMyVitals,
  deleteVital,
  Vital,
} from "./vitalsThunks";

interface VitalsState {
  vitals: Vital[];
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: VitalsState = {
  vitals: [],
  loading: false,
  error: null,
  message: null,
};

const vitalsSlice = createSlice({
  name: "vitals",
  initialState,

  reducers: {
    clearVitalError: (state) => {
      state.error = null;
    },

    clearVitalMessage: (state) => {
      state.message = null;
    },

    clearVitals: (state) => {
      state.vitals = [];
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================
      // ADD VITAL
      // =========================

      .addCase(addVital.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })

      .addCase(addVital.fulfilled, (state, action) => {
        state.loading = false;

        state.vitals.unshift(action.payload);

        state.message = "Vital added successfully";
      })

      .addCase(addVital.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to add vital";
      })

      // =========================
      // GET MY VITALS
      // =========================

      .addCase(getMyVitals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getMyVitals.fulfilled, (state, action) => {
        state.loading = false;
        state.vitals = action.payload;
      })

      .addCase(getMyVitals.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to fetch vitals";
      })

      // =========================
      // DELETE VITAL
      // =========================

      .addCase(deleteVital.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })

      .addCase(deleteVital.fulfilled, (state, action) => {
        state.loading = false;

        state.vitals = state.vitals.filter(
          (vital) => vital._id !== action.payload
        );

        state.message = "Vital deleted successfully";
      })

      .addCase(deleteVital.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to delete vital";
      });
  },
});

export const {
  clearVitalError,
  clearVitalMessage,
  clearVitals,
} = vitalsSlice.actions;

export default vitalsSlice.reducer;
