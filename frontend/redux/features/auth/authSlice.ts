import { createSlice } from "@reduxjs/toolkit";

import {
  loginUser,
  signupUser,
  logoutUser,
  getUser,
  User,
} from "./authThunks";

interface AuthState {
  user: User | null;
  loading: boolean;
  authChecked: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  authChecked: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    resetAuth: (state) => {
      state.user = null;
      state.loading = false;
      state.authChecked = true;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.authChecked = true;
        state.error = null;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.authChecked = true;
        state.error = action.payload || "Login failed";
      })

      // SIGNUP
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Signup failed";
      })

      // LOGOUT
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.authChecked = true;
        state.error = null;
      })

      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Logout failed";
      })

      // GET USER
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.authChecked = false;
        state.error = null;
      })

      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.authChecked = true;
        state.error = null;
      })

      .addCase(getUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.authChecked = true;
        state.error = null;
      });
  },
});

export const {
  clearError,
  resetAuth,
} = authSlice.actions;

export default authSlice.reducer;
