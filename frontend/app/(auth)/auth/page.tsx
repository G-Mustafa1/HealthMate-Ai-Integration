"use client";

import { useState } from "react";

import AuthFeatures from "@/components/auth/AuthFeatures";
import AuthForm from "@/components/auth/AuthForm";

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);

    return (
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

                    {/* Auth Form */}
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
    );
}
