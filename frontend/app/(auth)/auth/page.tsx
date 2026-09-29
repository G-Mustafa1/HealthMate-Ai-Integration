"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import AuthFeatures from "@/components/auth/AuthFeatures";
import AuthForm from "@/components/auth/AuthForm";

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-secondary/40 to-background">

            {/* Background decoration */}
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

            {/* Back to Home Link (Top Left) */}
            <div className="absolute left-4 top-4 z-20 sm:left-6 sm:top-6 lg:left-8 lg:top-8">
                <Link
                    href="/"
                    aria-label="Back to HealthMate home"
                    className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/85 px-4 py-2 text-xs sm:text-sm font-medium text-muted-foreground shadow-sm backdrop-blur-xl transition-all duration-200 hover:-translate-x-0.5 hover:border-primary/30 hover:bg-primary/5 hover:text-primary hover:shadow-md"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                    <span>Back to Home</span>
                </Link>
            </div>

            {/* Main Content */}
            <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">

                    {/* Left: Features */}
                    <div className="hidden lg:block">
                        <AuthFeatures />
                    </div>

                    {/* Right: Auth Form */}
                    <div className="flex w-full flex-col items-center">

                        {/* Mobile brand */}
                        <div className="mb-6 text-center lg:hidden">
                            <div className="mb-3 flex items-center justify-center gap-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                                    <span className="text-lg">♥</span>
                                </div>

                                <span className="text-xl font-bold tracking-tight">
                                    HealthMate
                                </span>
                            </div>

                            <p className="text-xs text-muted-foreground">
                                Your smart health companion
                            </p>
                        </div>

                        <div className="w-full max-w-md">
                            <AuthForm
                                isLogin={isLogin}
                                setIsLogin={setIsLogin}
                            />
                        </div>

                        {/* Mobile trust badge */}
                        <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground lg:hidden">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Your health information is handled securely.
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
