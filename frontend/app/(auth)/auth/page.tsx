"use client";

import { useState } from "react";

import AuthFeatures from "@/components/auth/AuthFeatures";
import AuthForm from "@/components/auth/AuthForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-secondary/40 to-background">

            {/* Background */}
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

            {/* Main */}
            <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8">

                <div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">

                    {/* Left */}
                    <div className="hidden lg:block">
                        <AuthFeatures />
                    </div>

                    {/* Right */}
                    <div className="flex w-full flex-col items-center">

                        {/* Mobile brand */}
                        <div className="mb-6 text-center lg:hidden">
                            <div className="mb-3 flex items-center justify-center gap-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                                    <span className="text-lg">
                                        ♥
                                    </span>
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

                        {/* Mobile trust */}
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
