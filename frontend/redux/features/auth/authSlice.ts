import { createSlice } from "@reduxjs/toolkit";

import {
  loginUser,
  signupUser,
  logoutUser,
  getUser,
  User,
  verifyEmailOTP,
  forgotPassword,
  resetPassword,
  resendResetOTP,
  verifyResetOTP,
  resendEmailOTP,
} from "./authThunks";

interface AuthState {
  // Auth
  user: User | null;
  loading: boolean;         // for login / signup / OTP actions
  authChecked: boolean;
  error: string | null;

  // Auth check
  emailVerificationAllowed: boolean;
  forgotPasswordAllowed: boolean;
  resetOtpAllowed: boolean;
  resetPasswordAllowed: boolean;

}

const initialState: AuthState = {
  user: null,
  loading: false,
  authChecked: false,
  error: null,

  emailVerificationAllowed: false,
  forgotPasswordAllowed: false,
  resetOtpAllowed: false,
  resetPasswordAllowed: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    allowEmailVerification: (state) => {
      state.emailVerificationAllowed = true;
    },

    allowForgotPassword: (state) => {
      state.forgotPasswordAllowed = true;
    },

    allowResetOtp: (state) => {
      state.resetOtpAllowed = true;
    },

    allowResetPassword: (state) => {
      state.resetPasswordAllowed = true;
    },

    resetAuthFlow: (state) => {
      state.emailVerificationAllowed = false;
      state.forgotPasswordAllowed = false;
      state.resetOtpAllowed = false;
      state.resetPasswordAllowed = false;
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

      // EMAIL VERIFICATION
      .addCase(verifyEmailOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(verifyEmailOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(verifyEmailOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Email verification failed";
      })

      // RESEND EMAIL OTP

      .addCase(resendEmailOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(resendEmailOTP.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(resendEmailOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to resend email verification OTP";
      })

      // FORGOT PASSWORD
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to send reset OTP";
      })

      // RESET PASSWORD
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Password reset failed";
      })


      // RESEND RESET OTP
      .addCase(resendResetOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(resendResetOTP.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(resendResetOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to resend OTP";
      })

      // verify reset OTP
      .addCase(verifyResetOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(verifyResetOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(verifyResetOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to verify OTP";
      })

      // LOGOUT
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.authChecked = true;
        state.error = null;
      })

      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Logout failed";
      })

      // GET USER (initial session check only)
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
  allowEmailVerification,
  allowForgotPassword,
  allowResetOtp,
  allowResetPassword,
  resetAuthFlow,
} = authSlice.actions;

export default authSlice.reducer;
