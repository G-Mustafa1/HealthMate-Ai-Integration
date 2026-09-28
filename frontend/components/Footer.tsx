"use client";

import Link from "next/link";
import {
    Heart,
    Mail,
    Twitter,
    Github,
    Linkedin,
    ArrowRight,
    ShieldCheck,
} from "lucide-react";
import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const footerLinks = [
    {
        title: "Product",
        links: [
            { name: "Dashboard", href: "/dashboard" },
            { name: "Vitals", href: "/vitals" },
            { name: "Reports", href: "/reports" },
            { name: "AI Insights", href: "/insights" },
        ],
    },
];

export default function Footer() {
    const {
        user,
        authChecked,
    } = useSelector((state: RootState) => state.auth);

    const handleNewsletter = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        // Add newsletter API here when available.
    };

    return (
        <footer className="relative mt-16 overflow-hidden border-t border-border/60 bg-muted/30">

            {/* Background Decoration */}
            <div className="pointer-events-none absolute -left-32 top-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

            <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

                {/* Main Footer */}
                <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">

                    {/* ================= BRAND ================= */}
                    <div className="max-w-sm">

                        <Link
                            href="/"
                            className="group inline-flex items-center gap-3"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
                                <Heart className="h-5 w-5 text-primary-foreground" />
                            </div>

                            <div>
                                <h2 className="text-xl font-bold tracking-tight text-foreground">
                                    HealthMate
                                </h2>

                                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-primary">
                                    Smart Health Companion
                                </p>
                            </div>
                        </Link>

                        <p className="mt-5 text-sm leading-7 text-muted-foreground">
                            Your personal health companion for managing
                            medical reports, tracking vitals, and
                            understanding your health information with
                            AI-powered insights.
                        </p>

                        {/* Privacy Badge */}
                        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50/60 px-3 py-2 text-xs font-medium text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-400">
                            <ShieldCheck className="h-4 w-4" />
                            Your health matters
                        </div>
                    </div>

                    {/* ================= LINKS ================= */}
                    <div>
                        <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-foreground">
                            Quick Links
                        </h3>

                        <ul className="space-y-3">
                            {authChecked  && user ? (
                                footerLinks[0].links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                                        >
                                            {link.name}

                                            <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <>
                                    <li>
                                        <Link
                                            href="/auth"
                                            className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                                        >
                                            Login
                                            <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            href="/auth"
                                            className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                                        >
                                            Register
                                            <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                    {/* ================= CONTACT ================= */}
                    <div>
                        <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-foreground">
                            Contact Us
                        </h3>

                        <div className="space-y-4">
                            <a
                                href="mailto:support@healthmate.com"
                                className="group flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                            >
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                    <Mail className="h-4 w-4" />
                                </span>

                                <span className="pt-1">
                                    support@healthmate.com
                                </span>
                            </a>

                            {/* Social Links */}
                            <div className="flex items-center gap-2 pt-2">
                                <a
                                    href="#"
                                    aria-label="Twitter"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary/30 hover:bg-primary hover:text-primary-foreground"
                                >
                                    <Twitter className="h-4 w-4" />
                                </a>

                                <a
                                    href="#"
                                    aria-label="GitHub"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary/30 hover:bg-primary hover:text-primary-foreground"
                                >
                                    <Github className="h-4 w-4" />
                                </a>

                                <a
                                    href="#"
                                    aria-label="LinkedIn"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary/30 hover:bg-primary hover:text-primary-foreground"
                                >
                                    <Linkedin className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* ================= NEWSLETTER ================= */}
                    <div>
                        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-foreground">
                            Stay Updated
                        </h3>

                        <p className="mb-5 text-sm leading-6 text-muted-foreground">
                            Get useful health tips, product updates, and
                            HealthMate news directly in your inbox.
                        </p>

                        <form
                            onSubmit={handleNewsletter}
                            className="space-y-2"
                        >
                            <Input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                required
                                className="h-10 bg-background"
                            />

                            <Button
                                type="submit"
                                className="h-10 w-full gap-2"
                            >
                                Subscribe
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-10 h-px bg-border/60" />

                {/* ================= BOTTOM BAR ================= */}
                <div className="flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">

                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} HealthMate. All
                        rights reserved.
                    </p>

                    <div className="flex items-center justify-center gap-5 text-xs text-muted-foreground sm:justify-end">
                        <Link
                            href="/"
                            className="transition-colors hover:text-primary"
                        >
                            Privacy
                        </Link>

                        <Link
                            href="/"
                            className="transition-colors hover:text-primary"
                        >
                            Terms
                        </Link>

                        <Link
                            href="/"
                            className="transition-colors hover:text-primary"
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
