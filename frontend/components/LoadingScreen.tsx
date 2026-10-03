"use client";

import { HeartPulse } from "lucide-react";

interface AuthLoadingScreenProps {
    title?: string;
    description?: string;
}

export default function LoadingScreen({ title = "Checking your account", description = "Please wait a moment...", }: AuthLoadingScreenProps) {
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
                        {title}
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        {description}
                    </p>
                </div>
            </main>
    );


}