"use client";

import { useEffect } from "react";
import {
    Activity,
    FileCheck2,
    FileText,
    HeartPulse,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import UploadReport from "./UploadReport";
import ReportsList from "./ReportsList";

import { AppDispatch, RootState } from "@/redux/store";
import { getMyReports } from "@/redux/features/report/reportThunks";

const DashboardMain = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { user } = useSelector(
        (state: RootState) => state.auth
    );

    const {
        reports,
        loading: reportsLoading,
    } = useSelector(
        (state: RootState) => state.reports
    );

    useEffect(() => {
        dispatch(getMyReports());
    }, [dispatch]);

    const firstName = user?.firstname || "User";

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

            {/* WELCOME HEADER */}
            <section className="relative mb-8 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">

                <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

                <div className="relative flex flex-col gap-5 p-5 sm:p-7 md:flex-row md:items-center md:justify-between">

                    <div className="max-w-2xl">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                            <HeartPulse className="h-3.5 w-3.5" />
                            Health Dashboard
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                            Welcome back{" "}
                            <span className="text-primary">
                                {firstName}
                            </span>
                            !
                        </h1>

                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                            Manage your medical reports, track your health
                            data, and keep everything organized in one secure
                            place.
                        </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3 rounded-xl border border-border/60 bg-background/80 p-3 backdrop-blur-sm shadow-sm">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-400">
                            <Activity className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground">
                                Account Status
                            </p>

                            <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                                Active
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* QUICK STATS */}
            <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                {/* Total Reports */}
                <div className="group rounded-xl border border-border/60 bg-card p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Total Reports
                            </p>

                            {reportsLoading ? (
                                <div className="mt-2 h-8 w-14 animate-pulse rounded bg-muted" />
                            ) : (
                                <p className="mt-1 text-2xl font-bold text-foreground">
                                    {reports.length}
                                </p>
                            )}

                            <p className="mt-1 text-xs text-muted-foreground">
                                Uploaded medical files
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                            <FileText className="h-5 w-5" />
                        </div>
                    </div>
                </div>

                {/* Health Records */}
                <div className="group rounded-xl border border-border/60 bg-card p-5 shadow-sm transition-all hover:border-green-200 dark:hover:border-green-900/50 hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Health Records
                            </p>

                            {reportsLoading ? (
                                <div className="mt-2 h-8 w-14 animate-pulse rounded bg-muted" />
                            ) : (
                                <p className="mt-1 text-2xl font-bold text-foreground">
                                    {reports.length}
                                </p>
                            )}

                            <p className="mt-1 text-xs text-muted-foreground">
                                Available in your vault
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-400 transition-transform group-hover:scale-110">
                            <FileCheck2 className="h-5 w-5" />
                        </div>
                    </div>
                </div>

                {/* Health Tracking */}
                <div className="group rounded-xl border border-border/60 bg-card p-5 shadow-sm transition-all hover:border-red-200 dark:hover:border-red-900/50 hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Health Tracking
                            </p>

                            <p className="mt-1 text-2xl font-bold text-foreground">
                                Active
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Keep monitoring your vitals
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400 transition-transform group-hover:scale-110">
                            <HeartPulse className="h-5 w-5" />
                        </div>
                    </div>
                </div>

            </section>

            {/* QUICK ACTIONS */}
            <section className="mb-8">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-foreground sm:text-xl">
                        Quick Actions
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Upload a report or record your latest vitals.
                    </p>
                </div>

                <UploadReport />
            </section>

            {/* REPORTS LIST */}
            <section>
                <ReportsList />
            </section>

        </main>
    );
};

export default DashboardMain;
