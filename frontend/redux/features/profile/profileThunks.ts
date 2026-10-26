import axiosInstance from "@/services/api";
import { getApiErrorMessage } from "@/services/apiError";
import { createAsyncThunk } from "@reduxjs/toolkit";


export interface Profile {
    _id?: string;
    user?: string;
    profilePicture?: string | { url?: string | null; publicId?: string | null } | null;
    phone?: string;
    gender?: string;
    dateOfBirth?: string;
    country?: string;
    city?: string;
    bloodGroup?: string;
}

export interface User {
    _id?: string;
    id?: string;
    firstname: string;
    lastname: string;
    email: string;
    isEmailVerified?: boolean;
    profilePicture?: string | null;
}

interface GetProfileResponse {
    user: User;
    profile: Profile | null;
}

export const getProfilePictureUrl = (
    picture?: Profile["profilePicture"]
): string | null => {
    if (!picture) return null;

    if (typeof picture === "string") {
        return picture || null;
    }

    return picture.url || null;
};

const normalizeProfile = (profile: Profile | null): Profile | null => {
    if (!profile) return null;

    return {
        ...profile,
        profilePicture: getProfilePictureUrl(profile.profilePicture),
    };
};

export const getProfile = createAsyncThunk<GetProfileResponse, void, { rejectValue: string }>(
    "profile/getProfile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/profile/user");
            return {
                user: response.data.user,
                profile: normalizeProfile(response.data.profile ?? null),
            };
        } catch (err) {
            return rejectWithValue(getApiErrorMessage(err, "Failed to fetch profile"));
        }
    }
);

export const updateProfile = createAsyncThunk<GetProfileResponse, FormData, { rejectValue: string }>(
    "profile/updateProfile",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put("/profile/edituser", data);
            return {
                user: response.data.user,
                profile: normalizeProfile(response.data.profile ?? null)
            }

        } catch (err) {
            return rejectWithValue(getApiErrorMessage(err, "Failed to update profile"));
        }
    }
)
