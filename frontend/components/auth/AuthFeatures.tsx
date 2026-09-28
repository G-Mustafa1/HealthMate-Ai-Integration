"use client";

import { features } from "@/data/auth";
import {
    Activity,
    ArrowUpRight,
    FileText,
    Heart,
    Languages,
    ShieldCheck,
    Sparkles,
    TrendingUp,
} from "lucide-react";


export default function AuthFeatures() {
    return (
        <div className="relative flex min-h-[680px] flex-col justify-center overflow-hidden pr-4">

            {/* Decorative medical grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{
                    backgroundImage:
                        "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            {/* Ambient circles */}
            <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

            <div className="relative z-10 max-w-xl">

                {/* Brand badge */}
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                        <Heart className="h-3 w-3 fill-primary text-primary" />
                    </span>

                    HealthMate
                    <span className="mx-1 text-border">•</span>
                    <span className="text-emerald-600 dark:text-emerald-400">
                        Your health companion
                    </span>
                </div>

                {/* Heading */}
                <div className="max-w-lg">
                    <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
                        Understand your health.
                        <span className="mt-1 block text-primary">
                            Without the confusion.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
                        HealthMate brings your reports, AI explanations and
                        health tracking together in one simple place.
                    </p>
                </div>

                {/* Feature cards */}
                <div className="mt-10 space-y-3">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className="group flex items-center gap-4 rounded-2xl border border-border/50 bg-background/65 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-background/90"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                                    <Icon className="h-5 w-5" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-sm font-semibold">
                                            {feature.title}
                                        </h3>

                                        <span className="text-[10px] font-medium text-muted-foreground">
                                            0{index + 1}
                                        </span>
                                    </div>

                                    <p className="mt-0.5 text-sm text-muted-foreground">
                                        {feature.description}
                                    </p>
                                </div>

                                <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                            </div>
                        );
                    })}
                </div>

                {/* Bottom visual */}
                <div className="mt-8 grid grid-cols-[1fr_auto] gap-3">

                    {/* ECG card */}
                    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/60 p-4 backdrop-blur-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-muted-foreground">
                                    HEALTH OVERVIEW
                                </p>

                                <p className="mt-1 text-sm font-semibold">
                                    One place. Clearer picture.
                                </p>
                            </div>

                            <Activity className="h-5 w-5 text-primary" />
                        </div>

                        <svg
                            viewBox="0 0 420 70"
                            className="mt-3 h-12 w-full"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0 38 H75 L88 38 L100 15 L114 58 L128 29 L140 38 H205 L220 38 L232 10 L248 62 L264 31 L278 38 H350 L365 38 L377 19 L391 53 L404 38 H420"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-primary"
                            />
                        </svg>
                    </div>

                    {/* Trust */}
                    <div className="flex w-28 flex-col justify-between rounded-2xl border border-emerald-200/60 bg-emerald-50/60 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                        <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />

                        <div>
                            <p className="text-xs font-semibold">
                                Privacy first
                            </p>

                            <p className="mt-1 text-[10px] leading-4 text-muted-foreground">
                                Your health data stays protected.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Language hint */}
                <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                    <Languages className="h-4 w-4 text-primary" />
                    <span>Understand reports in English or Roman Urdu.</span>
                </div>
            </div>
        </div>
    );
}
