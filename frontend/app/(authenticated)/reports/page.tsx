"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Swal from "sweetalert2";
import {
    FileText,
    Trash2,
    Eye,
    Download,
    CalendarDays,
    FolderOpen,
    Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { AppDispatch, RootState } from "@/redux/store";
import {
    getMyReports,
    deleteReport,
} from "@/redux/features/report/reportThunks";

const Reports = () => {
    const dispatch = useDispatch<AppDispatch>();

    const {
        reports,
        loading,
        deleteLoading,
        error,
    } = useSelector((state: RootState) => state.reports);

    useEffect(() => {
        dispatch(getMyReports());
    }, [dispatch]);

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: "Delete report?",
            text: "This report will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
            reverseButtons: true,
            customClass: {
                popup: "rounded-2xl",
                confirmButton: "rounded-lg",
                cancelButton: "rounded-lg",
            },
        });

        if (!result.isConfirmed) return;

        try {
            await dispatch(deleteReport(id)).unwrap();

            await Swal.fire({
                title: "Deleted!",
                text: "Your report has been deleted successfully.",
                icon: "success",
                confirmButtonColor: "#2563eb",
                timer: 1800,
                timerProgressBar: true,
                showConfirmButton: false,
            });
        } catch (err) {
            await Swal.fire({
                title: "Delete Failed",
                text:
                    typeof err === "string"
                        ? err
                        : "Failed to delete report. Please try again.",
                icon: "error",
                confirmButtonColor: "#2563eb",
            });
        }
    };

    const formatDate = (date?: string) => {
        if (!date) return "Date unavailable";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "Date unavailable";
        }

        return parsedDate.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const getFileExtension = (filename?: string) => {
        if (!filename) return "FILE";

        const extension = filename.split(".").pop();

        return extension ? extension.toUpperCase() : "FILE";
    };

    // Loading State
    if (loading) {
        return (
            <main className="min-h-[calc(100vh-4rem)] bg-muted/20 px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl space-y-6">
                    <div className="space-y-3">
                        <div className="h-9 w-48 animate-pulse rounded-lg bg-muted" />
                        <div className="h-5 w-80 max-w-full animate-pulse rounded bg-muted" />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((item) => (
                            <Card key={item} className="overflow-hidden">
                                <CardHeader className="space-y-3">
                                    <div className="h-10 w-10 animate-pulse rounded-xl bg-muted" />
                                    <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                                    <div className="h-4 w-full animate-pulse rounded bg-muted" />
                                </CardHeader>

                                <CardContent className="space-y-3">
                                    <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                                    <div className="h-10 w-full animate-pulse rounded-lg bg-muted" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background via-background to-muted/30 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">

                {/* ================= HEADER ================= */}
                <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                            <FolderOpen className="h-3.5 w-3.5" />
                            Health Records
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Your Reports
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                            Manage, view and download your uploaded medical
                            reports from one secure place.
                        </p>
                    </div>

                    <div className="flex h-11 items-center gap-2 rounded-xl border border-border/60 bg-card px-4 shadow-sm">
                        <FileText className="h-4 w-4 text-primary" />

                        <span className="text-sm font-medium">
                            {reports.length}{" "}
                            {reports.length === 1 ? "Report" : "Reports"}
                        </span>
                    </div>
                </div>

                {/* ================= ERROR ================= */}
                {error && (
                    <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-950/20">
                        <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />

                        <div>
                            <p className="font-semibold">
                                Something went wrong
                            </p>

                            <p className="mt-1">
                                {error}
                            </p>
                        </div>
                    </div>
                )}

                {/* ================= EMPTY STATE ================= */}
                {reports.length === 0 ? (
                    <Card className="overflow-hidden border-dashed shadow-sm">
                        <CardContent className="flex min-h-[380px] flex-col items-center justify-center px-6 text-center">
                            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
                                <FileText className="h-10 w-10 text-primary" />
                            </div>

                            <h2 className="text-xl font-semibold">
                                No reports yet
                            </h2>

                            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                                You haven't uploaded any medical reports yet.
                                Upload your first report from the dashboard
                                to start tracking your health records.
                            </p>

                            <Link
                                href="/dashboard"
                                className="mt-6"
                            >
                                <Button className="gap-2 rounded-xl px-6 shadow-sm">
                                    <Sparkles className="h-4 w-4" />
                                    Go to Dashboard
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    /* ================= REPORT GRID ================= */
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {reports.map((report) => (
                            <Card
                                key={report._id}
                                className="group overflow-hidden border-border/60 bg-card/80 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
                            >
                                {/* Top Accent */}
                                <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/70 to-accent" />

                                <CardHeader className="pb-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex min-w-0 items-center gap-3">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                                <FileText className="h-5 w-5" />
                                            </div>

                                            <div className="min-w-0">
                                                <CardTitle className="truncate text-base">
                                                    {report.title ||
                                                        report.filename ||
                                                        "Medical Report"}
                                                </CardTitle>

                                                <CardDescription className="mt-1 truncate text-xs">
                                                    {report.filename ||
                                                        "Unknown file"}
                                                </CardDescription>
                                            </div>
                                        </div>

                                        <span className="shrink-0 rounded-md bg-muted px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                                            {getFileExtension(
                                                report.filename
                                            )}
                                        </span>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    {/* Date */}
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <CalendarDays className="h-4 w-4 text-primary" />

                                        <span>
                                            Uploaded{" "}
                                            <span className="font-medium text-foreground">
                                                {formatDate(
                                                    report.createdAt
                                                )}
                                            </span>
                                        </span>
                                    </div>

                                    {/* Summary */}
                                    <div className="rounded-xl bg-muted/50 p-3.5">
                                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                            Summary
                                        </p>

                                        <p className="line-clamp-3 text-sm leading-6 text-foreground/80">
                                            {report.summary ||
                                                "No summary available for this report."}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 pt-1">
                                        <Link
                                            href={`/dashboard/${report._id}`}
                                            className="flex-1"
                                        >
                                            <Button
                                                variant="default"
                                                className="w-full gap-2 rounded-xl"
                                            >
                                                <Eye className="h-4 w-4" />
                                                View
                                            </Button>
                                        </Link>

                                        {report.fileUrl && (
                                            <a
                                                href={report.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1"
                                            >
                                                <Button
                                                    variant="outline"
                                                    className="w-full gap-2 rounded-xl"
                                                >
                                                    <Download className="h-4 w-4" />
                                                    Download
                                                </Button>
                                            </a>
                                        )}

                                        <Button
                                            variant="outline"
                                            size="icon"
                                            disabled={deleteLoading}
                                            onClick={() =>
                                                handleDelete(report._id)
                                            }
                                            className="shrink-0 rounded-xl border-red-200 text-red-500 hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:border-red-900/40 dark:hover:bg-red-950/30"
                                            aria-label="Delete report"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* ================= FOOTER INFO ================= */}
                {reports.length > 0 && (
                    <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                        Your uploaded reports are available for AI-powered
                        health insights.
                    </div>
                )}
            </div>
        </main>
    );
};

export default Reports;
