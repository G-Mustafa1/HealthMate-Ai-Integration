"use client";

import Link from "next/link";
import {
    ArrowLeft,
    CalendarDays,
    Edit3,
    Globe2,
    HeartPulse,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
    User,
} from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { RootState, AppDispatch } from "@/redux/store";
import { getProfile, getProfilePictureUrl } from "@/redux/features/profile/profileThunks";

const UserProfile = () => {
    const dispatch = useDispatch<AppDispatch>();

    // AUTH STATE

    const { user: authUser, loading: authLoading, } = useSelector((state: RootState) => state.auth);

    // PROFILE STATE

    const { user: profileUser, profile, error: profileError, } = useSelector((state: RootState) => state.profile);

    const user = profileUser || authUser;

    // FETCH PROFILE

    useEffect(() => {
        if (authUser) {
            dispatch(getProfile());
        }
    }, [dispatch, authUser]);

    // Avoid full-page skeleton flash on re-visits when data already exists
    const loading = authLoading || (!profileUser && !profileError);

    // LOADING
    if (loading) {
        return (
            <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background via-background to-muted/30 px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl space-y-6">

                    <div className="space-y-3">
                        <div className="h-5 w-36 animate-pulse rounded bg-muted" />
                        <div className="h-9 w-56 animate-pulse rounded-lg bg-muted" />
                        <div className="h-5 w-80 max-w-full animate-pulse rounded bg-muted" />
                    </div>

                    <Card className="overflow-hidden border-border/60 shadow-sm">
                        <div className="h-1 w-full bg-muted" />

                        <CardContent className="p-6 sm:p-8">
                            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="h-20 w-20 animate-pulse rounded-2xl bg-muted" />

                                    <div className="space-y-3">
                                        <div className="h-7 w-48 animate-pulse rounded bg-muted" />
                                        <div className="h-4 w-64 animate-pulse rounded bg-muted" />
                                        <div className="h-4 w-72 animate-pulse rounded bg-muted" />
                                    </div>
                                </div>

                                <div className="h-10 w-32 animate-pulse rounded-xl bg-muted" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden border-border/60 shadow-sm">
                        <CardHeader>
                            <div className="h-6 w-52 animate-pulse rounded bg-muted" />
                            <div className="h-4 w-72 max-w-full animate-pulse rounded bg-muted" />
                        </CardHeader>

                        <CardContent className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 sm:p-6">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="h-20 animate-pulse rounded-xl bg-muted/70"
                                />
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden border-border/60 shadow-sm">
                        <CardHeader>
                            <div className="h-6 w-48 animate-pulse rounded bg-muted" />
                            <div className="h-4 w-64 max-w-full animate-pulse rounded bg-muted" />
                        </CardHeader>

                        <CardContent className="p-5 sm:p-6">
                            <div className="h-24 animate-pulse rounded-xl bg-muted/70" />
                        </CardContent>
                    </Card>
                </div>
            </main>
        );
    }

    // USER NOT AVAILABLE
    if (!user) {
        return (
            <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-b from-background to-muted/30 px-4">
                <Card className="w-full max-w-md overflow-hidden border-border/60 shadow-xl">
                    <div className="h-1 w-full bg-gradient-to-r from-primary to-accent" />

                    <CardContent className="p-8 text-center">
                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <User className="h-8 w-8" />
                        </div>

                        <h2 className="text-xl font-bold">
                            Profile unavailable
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            We couldn't load your account information.
                            Please login again.
                        </p>

                        <Link href="/login">
                            <Button className="mt-6 gap-2 rounded-xl px-6">
                                Go to Login
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </main>
        );
    }

    // USER DATA
    
    const firstName = user.firstname || "";
    const lastName = user.lastname || "";

    const fullName = `${firstName} ${lastName}`.trim() || "HealthMate User";

    const initials = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase() || "U";

    const profilePicture = getProfilePictureUrl(profile?.profilePicture) ??
        authUser?.profilePicture ??
        null;        

    const formattedDob = profile?.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })
        : null;

    return (
        <div className="mx-auto max-w-6xl">

            {/* HEADER */}

            <div className="mb-8">
                <Link
                    href="/dashboard"
                    className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Link>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                            <User className="h-3.5 w-3.5" />
                            My Profile
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Profile Overview
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                            Manage your personal information and basic
                            health details from one secure place.
                        </p>
                    </div>
                </div>
            </div>

            {/* PROFILE HERO */}

            <Card className="group relative mb-6 overflow-hidden border-border/60 bg-card/80 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg">
                <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/70 to-accent" />

                <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

                <CardContent className="relative p-6 sm:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                        {/* USER */}

                        <div className="flex min-w-0 items-center gap-4 sm:gap-5">

                            <div className="relative shrink-0">
                                {profilePicture ? (
                                    <img
                                        src={profilePicture}
                                        alt={fullName}
                                        className="h-20 w-20 rounded-2xl object-cover shadow-lg ring-4 ring-background"
                                    />
                                ) : (
                                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-2xl font-bold text-primary-foreground shadow-lg shadow-primary/20 ring-4 ring-background">
                                        {initials}
                                    </div>
                                )}

                                <span
                                    title={
                                        user.isEmailVerified
                                            ? "Email verified"
                                            : "Email not verified"
                                    }
                                    className={`absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background text-white shadow-sm ${user.isEmailVerified
                                        ? "bg-emerald-500"
                                        : "bg-amber-500"
                                        }`}
                                >
                                    <ShieldCheck className="h-3.5 w-3.5" />
                                </span>
                            </div>

                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h2 className="truncate text-2xl font-bold tracking-tight sm:text-3xl">
                                        {fullName}
                                    </h2>

                                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                                        <ShieldCheck className="h-3 w-3" />

                                        {user.isEmailVerified
                                            ? "Verified"
                                            : "Active"}
                                    </span>
                                </div>

                                <div className="mt-2 flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
                                    <Mail className="h-4 w-4 shrink-0 text-primary" />

                                    <span className="truncate">
                                        {user.email ||
                                            "No email available"}
                                    </span>
                                </div>

                                <p className="mt-2 text-sm text-muted-foreground">
                                    {profile
                                        ? "Your personal and health information is available below."
                                        : "Complete your profile to add your personal and health information."}
                                </p>
                            </div>
                        </div>

                        {/* EDIT */}

                        <Link
                            href="/profile/edit"
                            className="w-full lg:w-auto"
                        >
                            <Button className="w-full gap-2 rounded-xl px-6 shadow-sm sm:w-auto">
                                <Edit3 className="h-4 w-4" />

                                {profile
                                    ? "Edit Profile"
                                    : "Complete Profile"}
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>

            {/* PERSONAL INFORMATION */}

            <Card className="mb-6 overflow-hidden border-border/60 bg-card/80 shadow-sm backdrop-blur-sm">

                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/5 via-background to-accent/5">
                    <CardTitle className="flex items-center gap-3">

                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <User className="h-5 w-5" />
                        </span>

                        <span>
                            <span className="block">
                                Personal Information
                            </span>

                            <CardDescription className="mt-1 font-normal">
                                Your basic account and personal details.
                            </CardDescription>
                        </span>

                    </CardTitle>
                </CardHeader>

                <CardContent className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 sm:p-6">

                    <ProfileItem
                        icon={<User className="h-4 w-4" />}
                        label="First name"
                        value={user.firstname}
                    />

                    <ProfileItem
                        icon={<User className="h-4 w-4" />}
                        label="Last name"
                        value={user.lastname}
                    />

                    <ProfileItem
                        icon={<Mail className="h-4 w-4" />}
                        label="Email address"
                        value={user.email}
                    />

                    <ProfileItem
                        icon={<Phone className="h-4 w-4" />}
                        label="Phone number"
                        value={profile?.phone}
                    />

                    <ProfileItem
                        icon={<User className="h-4 w-4" />}
                        label="Gender"
                        value={profile?.gender}
                    />

                    <ProfileItem
                        icon={<CalendarDays className="h-4 w-4" />}
                        label="Date of birth"
                        value={formattedDob}
                    />

                    <ProfileItem
                        icon={<Globe2 className="h-4 w-4" />}
                        label="Country"
                        value={profile?.country}
                    />

                    <ProfileItem
                        icon={<MapPin className="h-4 w-4" />}
                        label="City"
                        value={profile?.city}
                    />

                    <ProfileItem
                        icon={<ShieldCheck className="h-4 w-4" />}
                        label="Account status"
                        value={user.isEmailVerified
                            ? "Email verified"
                            : "Email not verified"
                        }
                    />

                </CardContent>
            </Card>

            {/* HEALTH INFORMATION */}

            <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm backdrop-blur-sm">

                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-emerald-500/5 via-background to-primary/5">

                    <CardTitle className="flex items-center gap-3">

                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
                            <HeartPulse className="h-5 w-5" />
                        </span>

                        <span>
                            <span className="block">
                                Health Information
                            </span>

                            <CardDescription className="mt-1 font-normal">
                                Basic health information stored in your
                                profile.
                            </CardDescription>
                        </span>

                    </CardTitle>

                </CardHeader>

                <CardContent className="p-5 sm:p-6">

                    {profile ? (
                        <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-red-500/5 via-background to-emerald-500/5 p-5 transition-all duration-300 hover:border-red-500/20 hover:shadow-md sm:p-6">

                            <div className="relative flex items-center justify-between gap-5">

                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Blood Group
                                    </p>

                                    <p className="mt-2 text-3xl font-bold tracking-tight">
                                        {profile.bloodGroup || "Not added"}
                                    </p>

                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Your saved blood group information.
                                    </p>
                                </div>

                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-600 shadow-sm dark:bg-red-950/30 dark:text-red-400">
                                    <HeartPulse className="h-6 w-6" />
                                </div>

                            </div>

                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-border/70 bg-muted/20 p-8 text-center">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                <HeartPulse className="h-7 w-7" />
                            </div>

                            <h3 className="mt-4 text-base font-semibold">
                                No health information yet
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                                You haven't created your health profile
                                yet. Add your health information to keep
                                your records complete.
                            </p>

                            <Link href="/profile/edit">
                                <Button
                                    variant="outline"
                                    className="mt-5 gap-2 rounded-xl"
                                >
                                    <Edit3 className="h-4 w-4" />
                                    Add Health Information
                                </Button>
                            </Link>

                        </div>
                    )}

                </CardContent>
            </Card>

            {/* FOOTER */}

            <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                Your account information is stored securely.
            </div>

        </div>
    );
};

// PROFILE ITEM

interface ProfileItemProps {
    icon: React.ReactNode;
    label: string;
    value?: string | null;
}

const ProfileItem = ({ icon, label, value, }: ProfileItemProps) => {
    return (
        <div className="group rounded-xl border border-border/60 bg-background/70 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/[0.02] hover:shadow-md">

            <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-sm">
                    {icon}
                </div>

                <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        {label}
                    </p>

                    <p className="mt-1 truncate text-sm font-semibold">
                        {value || "Not added"}
                    </p>
                </div>

            </div>

        </div>
    );
};

export default UserProfile;
