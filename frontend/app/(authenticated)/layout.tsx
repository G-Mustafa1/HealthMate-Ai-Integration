"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { HeartPulse } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { AppDispatch, RootState } from "@/redux/store";
import { getUser } from "@/redux/features/auth/authThunks";

export default function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const {
        user,
        authChecked,
        loading,
    } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!authChecked && !loading) {
            dispatch(getUser());
        }
    }, [authChecked, loading, dispatch]);

    useEffect(() => {
        if (authChecked && !user) {
            router.replace("/auth");
        }
    }, [authChecked, user, router]);

    // Account verification loading state
    if (!authChecked || (loading && !user)) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-background px-4">
                <div className="relative flex flex-col items-center text-center">
                    {/* Glowing pulse ring */}
                    <div className="relative mb-5 flex h-16 w-16 items-center justify-center">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-2xl bg-primary/20 opacity-75" />
                        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-xl shadow-primary/25">
                            <HeartPulse className="h-7 w-7 animate-pulse text-primary-foreground" />
                        </div>
                    </div>

                    <h2 className="text-lg font-semibold tracking-tight text-foreground">
                        Checking your account
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Please wait a moment...
                    </p>
                </div>
            </main>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                {children}
            </main>

            <Footer />
        </div>
    );
}
