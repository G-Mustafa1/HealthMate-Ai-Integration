import Link from 'next/link';
import { Button } from '../ui/button';
import { Activity, ArrowRight, CheckCircle2, FileText, Heart, Languages, Lock, ShieldCheck, Sparkles } from 'lucide-react';
import { features, steps } from '@/data/home';

const Hero = () => {
    return (
        <main>
            <section className="relative overflow-hidden">
                {/* Background */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[100px]" />

                    <div className="absolute -right-40 top-20 h-[450px] w-[450px] rounded-full bg-emerald-400/10 blur-[100px]" />

                    <div className="absolute bottom-0 left-1/2 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-primary/5 blur-[100px]" />
                </div>

                <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-16 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-20">
                    {/* LEFT */}
                    <div className="max-w-2xl">
                        {/* Badge */}
                        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3.5 py-2 text-xs font-semibold text-primary">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                            </span>

                            Your health, made easier
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl xl:text-7xl">
                            Apni report ko
                            <span className="block text-primary">
                                apni zubaan
                            </span>
                            mein samjhein.
                        </h1>

                        <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                            HealthMate helps you organize medical reports,
                            understand complex results and track your
                            vitals — all from one simple place.
                        </p>

                        {/* Trust */}
                        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                Privacy focused
                            </span>

                            <span className="flex items-center gap-2">
                                <Lock className="h-4 w-4 text-primary" />
                                Secure account
                            </span>

                            <span className="flex items-center gap-2">
                                <Languages className="h-4 w-4 text-primary" />
                                English + Roman Urdu
                            </span>
                        </div>
                    </div>

                    {/* RIGHT — MEDICAL VISUAL */}
                    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
                        {/* Glow */}
                        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[80px]" />

                        {/* Main dashboard */}
                        <div className="relative rounded-[2rem] border border-border/60 bg-background/80 p-3 shadow-2xl shadow-primary/10 backdrop-blur-xl sm:p-5">
                            {/* Top bar */}
                            <div className="flex items-center justify-between rounded-2xl bg-muted/50 px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                                        <Heart className="h-4 w-4 fill-current text-primary-foreground" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold">
                                            HealthMate
                                        </p>
                                        <p className="text-[10px] text-muted-foreground">
                                            Health overview
                                        </p>
                                    </div>
                                </div>

                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                </div>
                            </div>

                            {/* Report card */}
                            <div className="mt-4 rounded-2xl border border-border/60 bg-background p-5">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Latest report
                                        </p>

                                        <h3 className="mt-1 text-base font-semibold">
                                            Complete Blood Count
                                        </h3>
                                    </div>

                                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                        <FileText className="h-4 w-4" />
                                    </div>
                                </div>

                                {/* Metrics */}
                                <div className="mt-5 grid grid-cols-2 gap-3">
                                    <div className="rounded-xl bg-muted/50 p-3">
                                        <p className="text-[10px] text-muted-foreground">
                                            Hemoglobin
                                        </p>

                                        <div className="mt-1 flex items-end justify-between">
                                            <span className="text-lg font-bold">
                                                10.8
                                            </span>

                                            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-semibold text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                                                Low
                                            </span>
                                        </div>
                                    </div>

                                    <div className="rounded-xl bg-muted/50 p-3">
                                        <p className="text-[10px] text-muted-foreground">
                                            Blood Sugar
                                        </p>

                                        <div className="mt-1 flex items-end justify-between">
                                            <span className="text-lg font-bold">
                                                92
                                            </span>

                                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                                                Normal
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* AI summary */}
                            <div className="relative mt-4 overflow-hidden rounded-2xl bg-primary p-5 text-primary-foreground">
                                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10" />

                                <div className="relative">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15">
                                            <Sparkles className="h-3.5 w-3.5" />
                                        </div>

                                        <span className="text-xs font-semibold">
                                            AI Summary
                                        </span>
                                    </div>

                                    <p className="mt-3 text-sm leading-6 text-primary-foreground/90">
                                        Aapka hemoglobin thora kam hai.
                                        Blood sugar normal range mein hai.
                                    </p>

                                    <div className="mt-4 flex gap-2">
                                        <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-medium">
                                            Roman Urdu
                                        </span>

                                        <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px]">
                                            Easy to understand
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating vitals card */}
                        <div className="absolute -bottom-7 -left-4 hidden w-44 rounded-2xl border border-border/60 bg-background/90 p-4 shadow-xl backdrop-blur-xl sm:block lg:-left-10">
                            <div className="flex items-center justify-between">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">
                                    <Activity className="h-4 w-4 text-red-500" />
                                </div>

                                <span className="text-[10px] font-medium text-emerald-600">
                                    +2.4%
                                </span>
                            </div>

                            <p className="mt-3 text-[10px] text-muted-foreground">
                                Heart rate
                            </p>

                            <p className="text-xl font-bold">
                                72{" "}
                                <span className="text-xs font-normal text-muted-foreground">
                                    bpm
                                </span>
                            </p>

                            <div className="mt-2 flex h-6 items-center gap-0.5">
                                {[2, 4, 3, 7, 4, 8, 5, 10, 6, 8, 4, 6].map(
                                    (height, index) => (
                                        <span
                                            key={index}
                                            className="w-1 rounded-full bg-primary/50"
                                            style={{
                                                height: `${height * 2}px`,
                                            }}
                                        />
                                    )
                                )}
                            </div>
                        </div>

                        {/* Floating secure card */}
                        <div className="absolute -right-3 top-12 hidden w-40 rounded-2xl border border-border/60 bg-background/90 p-4 shadow-xl backdrop-blur-xl sm:block lg:-right-8">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10">
                                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                </div>

                                <div>
                                    <p className="text-[10px] text-muted-foreground">
                                        Account
                                    </p>
                                    <p className="text-xs font-semibold">
                                        Protected
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* LANGUAGE SECTION */}

            <section className="border-y border-border/60 bg-muted/[0.28]">
                <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
                    <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                        <div>
                            <div className="mb-4 inline-flex rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                                Understand better
                            </div>

                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                Medical information,
                                <span className="block text-primary">
                                    without the jargon.
                                </span>
                            </h2>

                            <p className="mt-5 max-w-md leading-7 text-muted-foreground">
                                HealthMate converts complicated findings
                                into short, clear explanations — in the
                                language that feels natural to you.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {/* English */}
                            <div className="rounded-3xl border border-border/60 bg-background p-6 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">
                                        English
                                    </span>

                                    <Languages className="h-4 w-4 text-muted-foreground" />
                                </div>

                                <p className="mt-6 text-sm leading-7 text-muted-foreground">
                                    Your hemoglobin is slightly below the
                                    usual range. Your fasting blood sugar
                                    is within the normal range.
                                </p>

                                <div className="mt-6 flex items-center gap-2 text-xs font-medium text-emerald-600">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Simple explanation
                                </div>
                            </div>

                            {/* Roman Urdu */}
                            <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/[0.05] p-6">
                                <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />

                                <div className="relative">
                                    <div className="flex items-center justify-between">
                                        <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                                            Roman Urdu
                                        </span>

                                        <Heart className="h-4 w-4 text-primary" />
                                    </div>

                                    <p className="mt-6 text-sm leading-7">
                                        Aapka hemoglobin thora kam hai,
                                        jabke fasting blood sugar normal
                                        range mein hai.
                                    </p>

                                    <div className="mt-6 flex items-center gap-2 text-xs font-medium text-primary">
                                        <Sparkles className="h-4 w-4" />
                                        Asaan alfaaz mein
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES */}

            <section>
                <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
                    <div className="max-w-2xl">
                        <div className="mb-4 inline-flex rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                            Everything in one place
                        </div>

                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            A simpler way to stay on top of your health.
                        </h2>

                        <p className="mt-4 leading-7 text-muted-foreground">
                            From your first upload to long-term tracking,
                            HealthMate keeps the important things close.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-3">
                        {features.map((feature) => {
                            const Icon = feature.icon;

                            return (
                                <div
                                    key={feature.title}
                                    className="group relative overflow-hidden rounded-3xl border border-border/60 bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
                                >
                                    <span className="absolute right-6 top-6 text-xs font-bold text-muted-foreground/40">
                                        {feature.number}
                                    </span>

                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <h3 className="mt-7 text-lg font-semibold">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                                        {feature.description}
                                    </p>

                                    <div className="mt-7 h-1 w-8 rounded-full bg-primary/30 transition-all duration-300 group-hover:w-14 group-hover:bg-primary" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}

            <section className="border-y border-border/60 bg-muted/[0.28]">
                <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
                    <div className="text-center">
                        <div className="mb-4 inline-flex rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                            Simple by design
                        </div>

                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            From report to understanding.
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl leading-7 text-muted-foreground">
                            No complicated setup. Just upload, understand
                            and keep track.
                        </p>
                    </div>

                    <div className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
                        {/* Connector */}
                        <div className="absolute left-[16.66%] right-[16.66%] top-8 hidden h-px bg-border md:block" />

                        {steps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <div
                                    key={step.title}
                                    className="relative z-10 text-center"
                                >
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-background bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    <span className="mt-4 block text-xs font-bold uppercase tracking-[0.18em] text-primary">
                                        Step {index + 1}
                                    </span>

                                    <h3 className="mt-2 text-lg font-semibold">
                                        {step.title}
                                    </h3>

                                    <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                                        {step.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}

            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                <div className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-16 text-center text-primary-foreground sm:px-12">
                    {/* Decorative circles */}
                    <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

                    <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-black/10 blur-2xl" />

                    {/* ECG */}
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 800 140"
                        preserveAspectRatio="none"
                        className="pointer-events-none absolute inset-x-0 bottom-4 h-24 w-full text-white/15"
                    >
                        <path
                            className="ecg-line"
                            pathLength={1}
                            d="M0 70 H160 L180 70 L200 25 L225 115 L250 48 L270 70 H420 L440 70 L460 18 L485 120 L510 45 L530 70 H800"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>

                    <div className="relative z-10 mx-auto max-w-2xl">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                            <Heart className="h-6 w-6 fill-current" />
                        </div>

                        <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
                            Apni sehat ka record,
                            <span className="block">
                                ek jagah rakhein.
                            </span>
                        </h2>

                        <p className="mx-auto mt-4 max-w-lg leading-7 text-primary-foreground/80">
                            Upload your first report, understand your
                            health information and start building your
                            health history.
                        </p>

                        <Link href="/auth">
                            <Button
                                size="lg"
                                className="group mt-8 h-12 rounded-xl bg-background px-7 font-semibold text-foreground shadow-xl hover:bg-background/90"
                            >
                                Get started
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Hero