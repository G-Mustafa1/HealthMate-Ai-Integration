"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
    CalendarDays,
    Camera,
    Globe2,
    HeartPulse,
    ImagePlus,
    Loader2,
    Lock,
    Mail,
    MapPin,
    Phone,
    Save,
    Trash2,
    User,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { RootState, AppDispatch } from "@/redux/store";
import { ALLOWED_IMAGE_TYPES, VALID_BLOOD_GROUPS, VALID_GENDERS } from "@/data/profile";
import {
    getProfile,
    getProfilePictureUrl,
    updateProfile,
} from "@/redux/features/profile/profileThunks";
import { useRouter } from "next/navigation";


interface ProfileFormData {
    firstname: string;
    lastname: string;
    phone: string;
    gender: string;
    dateOfBirth: string;
    country: string;
    city: string;
    bloodGroup: string;
}

interface FormErrors {
    firstname?: string;
    lastname?: string;
    phone?: string;
    gender?: string;
    dateOfBirth?: string;
    country?: string;
    city?: string;
    bloodGroup?: string;
    profilePicture?: string;
}

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

const PHONE_REGEX = /^\+?[0-9\-()\s]{7,20}$/;

const todayString = () => new Date().toISOString().slice(0, 10);

const initialForm: ProfileFormData = {
    firstname: "",
    lastname: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    country: "",
    city: "",
    bloodGroup: "",
};

const EditProfile = () => {
    const dispatch = useDispatch<AppDispatch>();

    const router = useRouter();

    const { user: authUser } = useSelector((state: RootState) => state.auth);
    const { user, profile, loading, error } = useSelector(
        (state: RootState) => state.profile
    );

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [formData, setFormData] = useState<ProfileFormData>(initialForm);

    const [errors, setErrors] = useState<FormErrors>({});

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [removePicture, setRemovePicture] = useState(false);

    useEffect(() => {
        if (authUser && !user) {
            dispatch(getProfile());
        }
    }, [dispatch, authUser, user]);

    useEffect(() => {
        const sourceUser = user ?? authUser;

        if (!sourceUser) return;

        setFormData({
            firstname: sourceUser.firstname ?? "",
            lastname: sourceUser.lastname ?? "",
            phone: profile?.phone ?? "",
            gender: profile?.gender ?? "",
            dateOfBirth: profile?.dateOfBirth
                ? profile.dateOfBirth.slice(0, 10)
                : "",
            country: profile?.country ?? "",
            city: profile?.city ?? "",
            bloodGroup: profile?.bloodGroup ?? "",
        });
    }, [user, authUser, profile]);

    // CLEANUP OBJECT URL
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: undefined,
        }));
    };

    // PROFILE IMAGE
    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        // FILE TYPE
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            setErrors((prev) => ({
                ...prev,
                profilePicture: "Only JPG, PNG and WEBP images are allowed.",
            }));

            e.target.value = "";
            return;
        }

        // FILE SIZE
        if (file.size > MAX_IMAGE_SIZE) {
            setErrors((prev) => ({
                ...prev,
                profilePicture: "Image size must be less than 2MB.",
            }));

            e.target.value = "";
            return;
        }

        // CLEAR ERROR
        setErrors((prev) => ({
            ...prev,
            profilePicture: undefined,
        }));

        // CLEAN OLD PREVIEW
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }

        const newPreviewUrl = URL.createObjectURL(file);

        setSelectedFile(file);
        setPreviewUrl(newPreviewUrl);
        setRemovePicture(false);
    };

    const removeSelectedImage = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }

        setSelectedFile(null);
        setPreviewUrl(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }

        setErrors((prev) => ({
            ...prev,
            profilePicture: undefined,
        }));
    };

    const removeSavedPicture = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }

        setSelectedFile(null);
        setPreviewUrl(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }

        setRemovePicture(true);

        setErrors((prev) => ({
            ...prev,
            profilePicture: undefined,
        }));
    };

    // VALIDATION
    const validateForm = () => {
        const newErrors: FormErrors = {};

        const firstname = formData.firstname.trim();
        const lastname = formData.lastname.trim();

        if (!firstname) {
            newErrors.firstname = "First name is required";
        } else if (firstname.length < 3) {
            newErrors.firstname = "First name must be at least 3 characters";
        } else if (firstname.length > 30) {
            newErrors.firstname = "First name must be at most 30 characters";
        }

        if (!lastname) {
            newErrors.lastname = "Last name is required";
        } else if (lastname.length < 3) {
            newErrors.lastname = "Last name must be at least 3 characters";
        } else if (lastname.length > 20) {
            newErrors.lastname = "Last name must be at most 20 characters";
        }

        if (formData.phone.trim() && !PHONE_REGEX.test(formData.phone.trim())) {
            newErrors.phone = "Enter a valid phone number (e.g. +92 300 1234567)";
        }

        if (formData.gender &&
            !VALID_GENDERS.includes(formData.gender)) {
            newErrors.gender = "Invalid gender";
        }

        if (formData.dateOfBirth) {
            const date = new Date(formData.dateOfBirth);

            if (isNaN(date.getTime())) {
                newErrors.dateOfBirth = "Invalid date of birth";
            } else if (date > new Date()) {
                newErrors.dateOfBirth = "Date of birth cannot be in the future";
            } else if (date.getFullYear() < 1900) {
                newErrors.dateOfBirth = "Please enter a valid date of birth";
            }
        }

        if (formData.country.trim().length > 50) {
            newErrors.country = "Country must be at most 50 characters";
        }

        if (formData.city.trim().length > 50) {
            newErrors.city = "City must be at most 50 characters";
        }

        if (formData.bloodGroup &&
            !VALID_BLOOD_GROUPS.includes(formData.bloodGroup)) {
            newErrors.bloodGroup = "Invalid blood group";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // SUBMIT
    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const isValid = validateForm();

        if (!isValid) {
            toast.error("Please fix the errors in the form.");
            return;
        }

        const data = new FormData();

        data.append("firstname", formData.firstname.trim());

        data.append("lastname", formData.lastname.trim());

        // Always send optional fields so cleared values reach the backend
        data.append("phone", formData.phone.trim());
        data.append("gender", formData.gender);
        data.append("dateOfBirth", formData.dateOfBirth);
        data.append("country", formData.country.trim());
        data.append("city", formData.city.trim());
        data.append("bloodGroup", formData.bloodGroup);

        if (selectedFile) {
            data.append("profilePicture", selectedFile);
        } else if (removePicture) {
            data.append("removeProfilePicture", "true");
        }

        try {
            await dispatch(updateProfile(data)).unwrap();

            toast.success("Profile updated successfully!");

            router.push("/profile");

            setSelectedFile(null);
            setRemovePicture(false);

            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }

            setPreviewUrl(null);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch (err) {
            toast.error(
                typeof err === "string"
                    ? err
                    : "Failed to update profile. Please try again."
            );
        }
    };

    // SKELETON (before profile data is fetched)
    if (!user && !error) {
        return (
            <div className="space-y-6">
                <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm backdrop-blur">
                    <div className="h-1 w-full bg-muted" />

                    <CardContent className="p-5 sm:p-6">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                            <div className="h-24 w-24 animate-pulse rounded-2xl bg-muted" />

                            <div className="flex-1 space-y-3">
                                <div className="h-5 w-36 animate-pulse rounded bg-muted" />
                                <div className="h-4 w-64 max-w-full animate-pulse rounded bg-muted" />

                                <div className="flex flex-wrap gap-2">
                                    <div className="h-10 w-36 animate-pulse rounded-xl bg-muted" />
                                    <div className="h-10 w-36 animate-pulse rounded-xl bg-muted" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm backdrop-blur">
                    <div className="h-1 w-full bg-muted" />

                    <CardContent className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="space-y-2">
                                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                                <div className="h-11 w-full animate-pulse rounded-xl bg-muted" />
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm backdrop-blur">
                    <div className="h-1 w-full bg-muted" />

                    <CardContent className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
                        {Array.from({ length: 2 }).map((_, index) => (
                            <div key={index} className="space-y-2">
                                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                                <div className="h-11 w-full animate-pulse rounded-xl bg-muted" />
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm backdrop-blur">
                    <div className="h-1 w-full bg-muted" />

                    <CardContent className="p-5 sm:p-6">
                        <div className="space-y-2">
                            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                            <div className="h-11 w-full animate-pulse rounded-xl bg-muted" />
                        </div>
                    </CardContent>
                </Card>

                <div className="sticky bottom-4 z-10 flex flex-col-reverse gap-3 rounded-2xl border border-border/60 bg-background/90 p-3 shadow-xl backdrop-blur sm:flex-row sm:justify-end">
                    <div className="h-10 w-full animate-pulse rounded-xl bg-muted sm:w-28" />
                    <div className="h-10 w-full animate-pulse rounded-xl bg-muted sm:w-40" />
                </div>
            </div>
        );
    }

    // USER SOURCES (profile state first, auth as fallback)
    const firstName = (user?.firstname ?? authUser?.firstname ?? "").trim();
    const lastName = (user?.lastname ?? authUser?.lastname ?? "").trim();
    const email = user?.email ?? authUser?.email ?? "";

    const fullName = `${firstName} ${lastName}`.trim() || "HealthMate User";

    const initials = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase() || "U";

    const savedPicture =
        getProfilePictureUrl(profile?.profilePicture) ??
        authUser?.profilePicture ??
        null;

    const currentPicture = previewUrl ?? (removePicture ? null : savedPicture);

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            {/* PROFILE PHOTO */}
            <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm backdrop-blur">
                <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/70 to-accent" />

                <CardContent className="p-5 sm:p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                        <div className="relative h-24 w-24 shrink-0">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={loading}
                                aria-label="Change profile picture"
                                className="group relative h-24 w-24 overflow-hidden rounded-2xl transition-all hover:ring-primary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            >
                                {currentPicture ? (
                                    <img
                                        src={currentPicture}
                                        alt={fullName}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-primary/70 text-2xl font-bold text-primary-foreground">
                                        {initials}
                                    </div>
                                )}

                                <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/55 text-white opacity-0 backdrop-blur-[1px] transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                                    <Camera className="h-5 w-5" />
                                    <span className="text-[11px] font-semibold">
                                        Change
                                    </span>
                                </span>
                            </button>

                            {previewUrl && (
                                <button
                                    type="button"
                                    onClick={removeSelectedImage}
                                    className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-destructive text-white shadow-md transition hover:bg-destructive/90"
                                    aria-label="Remove selected image"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </button>
                            )}
                        </div>

                        <div className="flex-1">
                            <h2 className="font-semibold">
                                Profile picture
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                JPG, PNG or WEBP. Maximum file
                                size is 2MB.
                            </p>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                className="hidden"
                                onChange={handleImageChange}
                            />

                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="gap-2 rounded-xl"
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    disabled={loading}
                                >
                                    <ImagePlus className="h-4 w-4" />
                                    {selectedFile
                                        ? "Change picture"
                                        : "Choose picture"}
                                </Button>

                                {savedPicture &&
                                    !previewUrl &&
                                    !removePicture && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="gap-2 rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                            onClick={removeSavedPicture}
                                            disabled={loading}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            Remove photo
                                        </Button>
                                    )}
                            </div>

                            {removePicture && (
                                <p className="mt-2 text-xs text-muted-foreground">
                                    Photo will be removed when you save.
                                </p>
                            )}

                            {selectedFile && (
                                <p className="mt-2 truncate text-xs text-muted-foreground">
                                    Selected: {selectedFile.name}
                                </p>
                            )}

                            {errors.profilePicture && (
                                <p className="mt-2 text-xs font-medium text-destructive">
                                    {errors.profilePicture}
                                </p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* PERSONAL INFORMATION */}
            <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm backdrop-blur">
                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/5 via-background to-accent/5">
                    <CardTitle className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <User className="h-5 w-5" />
                        </span>

                        <span>
                            <span className="block">
                                Personal Information
                            </span>

                            <CardDescription className="mt-1">
                                Your basic personal details.
                            </CardDescription>
                        </span>
                    </CardTitle>
                </CardHeader>

                <CardContent className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
                    <FormField
                        label="First name"
                        htmlFor="firstname"
                        error={errors.firstname}
                        required
                    >
                        <div className="relative">
                            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                id="firstname"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                placeholder="John"
                                maxLength={30}
                                autoComplete="given-name"
                                className={`h-11 rounded-xl pl-10 ${errors.firstname
                                    ? "border-destructive focus-visible:ring-destructive/30"
                                    : ""
                                    }`}
                            />
                        </div>
                    </FormField>

                    <FormField
                        label="Last name"
                        htmlFor="lastname"
                        error={errors.lastname}
                        required
                    >
                        <div className="relative">
                            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                id="lastname"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                placeholder="Doe"
                                maxLength={20}
                                autoComplete="family-name"
                                className={`h-11 rounded-xl pl-10 ${errors.lastname
                                    ? "border-destructive focus-visible:ring-destructive/30"
                                    : ""
                                    }`}
                            />
                        </div>
                    </FormField>

                    <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="email" className="flex items-center gap-1.5">
                            <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                            Email address
                        </Label>

                        <div
                            id="email"
                            className="flex h-11 items-center gap-2 rounded-xl border border-input bg-muted/50 px-3 text-sm text-muted-foreground"
                        >
                            <Mail className="h-4 w-4 shrink-0" />

                            <span className="truncate">
                                {email || "No email available"}
                            </span>
                        </div>

                        <p className="text-xs text-muted-foreground">
                            Email changes should be handled
                            through a separate email verification
                            flow.
                        </p>
                    </div>

                    <FormField
                        label="Phone number"
                        htmlFor="phone"
                        error={errors.phone}
                    >
                        <div className="relative">
                            <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+92 300 1234567"
                                maxLength={11}
                                autoComplete="tel"
                                className={`h-11 rounded-xl pl-10 ${errors.phone
                                    ? "border-destructive focus-visible:ring-destructive/30"
                                    : ""
                                    }`}
                            />
                        </div>
                    </FormField>

                    <FormField
                        label="Gender"
                        htmlFor="gender"
                        error={errors.gender}
                    >
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className={`h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-primary/20 ${errors.gender
                                ? "border-destructive"
                                : "border-input"
                                }`}
                        >
                            <option value="">
                                Select gender
                            </option>

                            {VALID_GENDERS.map((gender) => (
                                <option
                                    key={gender}
                                    value={gender}
                                >
                                    {gender}
                                </option>
                            ))}
                        </select>
                    </FormField>

                    <FormField
                        label="Date of birth"
                        htmlFor="dateOfBirth"
                        error={errors.dateOfBirth}
                    >
                        <div className="relative">
                            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                id="dateOfBirth"
                                name="dateOfBirth"
                                type="date"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                max={todayString()}
                                suppressHydrationWarning
                                className={`h-11 rounded-xl pl-10 ${errors.dateOfBirth
                                    ? "border-destructive focus-visible:ring-destructive/30"
                                    : ""
                                    }`}
                            />
                        </div>
                    </FormField>
                </CardContent>
            </Card>

            {/* LOCATION */}
            <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm backdrop-blur">
                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/5 via-background to-accent/5">
                    <CardTitle className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Globe2 className="h-5 w-5" />
                        </span>

                        <span>
                            <span className="block">
                                Location
                            </span>

                            <CardDescription className="mt-1">
                                Your current location information.
                            </CardDescription>
                        </span>
                    </CardTitle>
                </CardHeader>

                <CardContent className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
                    <FormField
                        label="Country"
                        htmlFor="country"
                        error={errors.country}
                    >
                        <div className="relative">
                            <Globe2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                placeholder="Pakistan"
                                maxLength={50}
                                autoComplete="country-name"
                                className={`h-11 rounded-xl pl-10 ${errors.country
                                    ? "border-destructive focus-visible:ring-destructive/30"
                                    : ""
                                    }`}
                            />
                        </div>
                    </FormField>

                    <FormField
                        label="City"
                        htmlFor="city"
                        error={errors.city}
                    >
                        <div className="relative">
                            <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="Karachi"
                                maxLength={50}
                                autoComplete="address-level2"
                                className={`h-11 rounded-xl pl-10 ${errors.city
                                    ? "border-destructive focus-visible:ring-destructive/30"
                                    : ""
                                    }`}
                            />
                        </div>
                    </FormField>
                </CardContent>
            </Card>

            {/* HEALTH */}
            <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm backdrop-blur">
                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-emerald-500/5 via-background to-primary/5">
                    <CardTitle className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
                            <HeartPulse className="h-5 w-5" />
                        </span>

                        <span>
                            <span className="block">
                                Health Information
                            </span>

                            <CardDescription className="mt-1">
                                Optional basic health information.
                            </CardDescription>
                        </span>
                    </CardTitle>
                </CardHeader>

                <CardContent className="p-5 sm:p-6">
                    <FormField
                        label="Blood group"
                        htmlFor="bloodGroup"
                        error={errors.bloodGroup}
                    >
                        <select
                            id="bloodGroup"
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleChange}
                            className={`h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-primary/20 ${errors.bloodGroup
                                ? "border-destructive"
                                : "border-input"
                                }`}
                        >
                            <option value="">
                                Select blood group
                            </option>

                            {VALID_BLOOD_GROUPS.map(
                                (bloodGroup) => (
                                    <option
                                        key={bloodGroup}
                                        value={bloodGroup}
                                    >
                                        {bloodGroup}
                                    </option>
                                )
                            )}
                        </select>
                    </FormField>
                </CardContent>
            </Card>

            {/* ACTIONS */}
            <div className="sticky bottom-4 z-10 flex flex-col-reverse gap-3 rounded-2xl border border-border/60 bg-background/90 p-3 shadow-xl backdrop-blur sm:flex-row sm:justify-end">
                <Link
                    href="/profile"
                    className="w-full sm:w-auto"
                >
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full rounded-xl sm:w-auto"
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                </Link>

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full gap-2 rounded-xl shadow-sm sm:w-auto"
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="h-4 w-4" />
                            Save changes
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
};

interface FormFieldProps {
    label: string;
    htmlFor: string;
    error?: string;
    required?: boolean;
    children: React.ReactNode;
}

const FormField = ({
    label,
    htmlFor,
    error,
    required,
    children,
}: FormFieldProps) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={htmlFor}>
                {label}

                {required && (
                    <span className="ml-1 text-destructive">
                        *
                    </span>
                )}
            </Label>

            {children}

            {error && (
                <p className="text-xs font-medium text-destructive">
                    • {error}
                </p>
            )}
        </div>
    );
};

export default EditProfile;
