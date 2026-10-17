"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { RootState } from "@/redux/store";
import LoadingScreen from "@/components/LoadingScreen";

export default function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();

    const { user, authChecked } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (authChecked && !user) {
            router.replace("/auth");
        }
    }, [authChecked, user, router]);

    // Account verification loading state
    if (!authChecked) {
        return (
            <LoadingScreen
                title="Checking your account"
                description="Getting everything ready for you..."
            />
        );
    }

    // Not logged in — redirect is in progress, show loader instead of a blank screen
    if (!user) {
        return (
            <LoadingScreen
                title="Redirecting you to login"
                description="Please wait a moment..."
            />
        );
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