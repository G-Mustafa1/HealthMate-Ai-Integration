"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { RootState } from "@/redux/store";
import LoadingScreen from "@/components/LoadingScreen";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();

    const { user, authChecked, loading } = useSelector(
        (state: RootState) => state.auth
    );

    useEffect(() => {
        if (authChecked && user) {
            router.replace("/dashboard");
        }
    }, [authChecked, user, router]);

    if (!authChecked) {
        return (
            <LoadingScreen title="Checking your account" description="Preparing secure access..." />
        );
    }

    if (user) {
        return null;
    }

    return (
        <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-secondary/40 to-background">

            <div className="pointer-events-none absolute inset-0">
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />

                <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />

                <div className="absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-emerald-400/10 blur-3xl" />
            </div>

            <div className="absolute left-4 top-4 z-20 sm:left-6 sm:top-6 lg:left-8 lg:top-8">
                <button
                    type="button"
                    onClick={() => router.back()}
                    aria-label="Go back"
                    className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/85 px-4 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-xl transition-all duration-200 hover:-translate-x-0.5 hover:border-primary/30 hover:bg-primary/5 hover:text-primary hover:shadow-md sm:text-sm"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                    <span>Back</span>
                </button>
            </div>

            <div className="relative z-10 min-h-screen">
                {children}
            </div>
        </main>
    );
}
