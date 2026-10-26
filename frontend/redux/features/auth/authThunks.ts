import axiosInstance from "@/services/api";
import { getApiErrorMessage } from "@/services/apiError";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface User {
  _id?: string;
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  isEmailVerified?: boolean;
  profilePicture?: string | null;
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

interface VerifyEmailOTPData {
  email: string;
  otp: string;
}

interface ForgotPasswordData {
  email: string;
}

interface VerifyResetOTPData {
  email: string;
  otp: string;
}

interface ResetPasswordData {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

interface ResendEmailOTPData {
  email: string;
}

interface ResendResetOTPData {
  email: string;
}

// Login user
export const loginUser = createAsyncThunk<User, LoginData, { rejectValue: string }>(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/auth/login",
        data,
        { timeout: 20000 } // hung request kabhi infinite pending na rahe
      );

      return response.data.user;
    } catch (err) {
      return rejectWithValue(getApiErrorMessage(err, "Login failed"));
    }
  }
);

// Signup user
export const signupUser = createAsyncThunk<User, SignupData, { rejectValue: string }>(
  "auth/signupUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/auth/signup",
        data
      );

      return response.data.user;
    } catch (err) {
      return rejectWithValue(getApiErrorMessage(err, "Signup failed"));
    }
  }
);


// Logout user
export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (err) {
      return rejectWithValue(getApiErrorMessage(err, "Logout failed"));
    }
  }
);


// Verify email OTP
export const verifyEmailOTP = createAsyncThunk<User, VerifyEmailOTPData, { rejectValue: string }>(
  "auth/verifyEmailOTP",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/verify-email-otp", data);
      return response.data.user;
    } catch (err) {
      return rejectWithValue(getApiErrorMessage(err, "Failed to verify email"));
    }
  }
)

// Resend email OTP
export const resendEmailOTP = createAsyncThunk<User, ResendEmailOTPData, { rejectValue: string }>(
  "auth/resendEmailOTP",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/resend-email-otp", data);
      return response.data.user;
    } catch (err) {
      return rejectWithValue(getApiErrorMessage(err, "Failed to resend email"));
    }
  }
)


// forgot password
export const forgotPassword = createAsyncThunk<User, ForgotPasswordData, { rejectValue: string }>(
  "auth/forgotPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/forgot-password", data);
      return response.data.user;
    } catch (err) {
      return rejectWithValue(getApiErrorMessage(err, "Failed to forgot password"));
    }
  }
)

// reset password
export const resetPassword = createAsyncThunk<User, ResetPasswordData, { rejectValue: string }>(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/reset-password", data);
      return response.data.user;
    } catch (err) {
      return rejectWithValue(getApiErrorMessage(err, "Password reset failed"));
    }
  }
);


// Resend reset otp
export const resendResetOTP = createAsyncThunk<User, ResendResetOTPData, { rejectValue: string }>(
  "auth/resendResetOTP",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/resend-reset-otp", data);
      return response.data.user;
    } catch (err) {
      return rejectWithValue(getApiErrorMessage(err, "Failed to resend reset otp"));
    }
  }
);

// verify reset otp
export const verifyResetOTP = createAsyncThunk<User, VerifyResetOTPData, { rejectValue: string }>(
  "auth/verifyResetOTP",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/verify-reset-otp", data);
      return response.data.user;
    } catch (err) {
      return rejectWithValue(getApiErrorMessage(err, "Failed to verify reset otp"));
    }
  }
);

// Get user (session check on app load)
export const getUser = createAsyncThunk<User, void, { rejectValue: string }>(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/profile/getuser");

      if (!response.data?.success || !response.data?.user) {
        return rejectWithValue("Invalid user response");
      }

      return response.data.user;
    } catch (err: unknown) {
      return rejectWithValue(getApiErrorMessage(err, "Failed to fetch user"));
    }
  }
);
