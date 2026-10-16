import { createSlice } from "@reduxjs/toolkit";
import { getProfile, Profile, updateProfile, User } from "./profileThunks";


interface ProfileState {
    user: User | null;
    profile: Profile | null;
    loading: boolean;
    error: string | null;
}

const initialState: ProfileState = {
    user: null,
    profile: null,
    loading: false,
    error: null,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,

    reducers: {
        resetProfile: (state) => {
            state.user = null;
            state.profile = null;
            state.loading = false;
            state.error = null;
        },

        clearProfileError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.profile = action.payload.profile;
                state.error = null;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch profile";
            })
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.profile = action.payload.profile;
                state.error = null;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to update profile";
            })
    },
});

export const { resetProfile, clearProfileError } = profileSlice.actions;
export default profileSlice.reducer;