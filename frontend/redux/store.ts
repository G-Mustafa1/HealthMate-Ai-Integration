import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import reportSlice from "./features/report/reportSlice";
import vitalsSlice from "./features/vital/vitalSlice";
import profileSlice from "./features/profile/profileSlice"

export const store = configureStore({
    reducer: {
        auth: authSlice,
        reports: reportSlice,
        vitals:  vitalsSlice,
        profile: profileSlice

    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;