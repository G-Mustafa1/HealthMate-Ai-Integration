"use client";

import Link from "next/link";
import {
    ArrowRight,
    CalendarDays,
    FileText,
    FileImage,
    FolderOpen,
} from "lucide-react";
import { useSelector } from "react-redux";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";

import { RootState } from "@/redux/store";

const ReportsList = () => {
    const { reports, loading } = useSelector(
        (state: RootState) => state.reports
    );

    // ---------------------------------------
    // Format date
    // ---------------------------------------
    const formatDate = (date?: string) => {
        if (!date) return "Date not available";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "Date not available";
        }

        return parsedDate.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    // ---------------------------------------
    // Get file type
    // ---------------------------------------
    const getFileType = (filename?: string) => {
        if (!filename) return "FILE";

        const extension = filename
            .split(".")
            .pop()
            ?.toUpperCase();

        return extension || "FILE";
    };

    // ---------------------------------------
    // Get title
    // ---------------------------------------
    const getReportTitle = (
        title?: string,
        filename?: string
    ) => {
        if (title?.trim()) {
            return title;
        }

        if (filename?.trim()) {
            return filename;
        }

        return "Medical Report";
    };

    return (
        <Card className="overflow-hidden border-border/60 bg-card shadow-sm">

            {/* ================================= */}
            {/* HEADER */}
            {/* ================================= */}
            <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/5 via-background to-accent/5 pb-5">
                <div className="flex items-center justify-between gap-4">

                    <div>
                        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <FileText className="h-5 w-5" />
                            </span>

                            Your Reports
                        </CardTitle>

                        <CardDescription className="mt-2">
                            All your uploaded medical reports in one place.
                        </CardDescription>
                    </div>

                    {reports.length > 0 && !loading && (
                        <div className="hidden rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary sm:block">
                            {reports.length}{" "}
                            {reports.length === 1
                                ? "Report"
                                : "Reports"}
                        </div>
                    )}
                </div>
            </CardHeader>

            <CardContent className="p-4 sm:p-6">

                {/* ================================= */}
                {/* LOADING */}
                {/* ================================= */}
                {loading ? (
                    <div className="space-y-3">

                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="flex items-center justify-between gap-4 rounded-xl border border-border/50 p-4"
                            >
                                <div className="flex min-w-0 flex-1 items-center gap-3">
                                    <div className="h-11 w-11 shrink-0 animate-pulse rounded-lg bg-muted" />

                                    <div className="min-w-0 flex-1 space-y-2">
                                        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                                        <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
                                    </div>
                                </div>

                                <div className="h-9 w-24 animate-pulse rounded-lg bg-muted" />
                            </div>
                        ))}
                    </div>
                ) : reports.length === 0 ? (

                    /* ================================= */
                    /* EMPTY STATE */
                    /* ================================= */
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/70 bg-muted/20 px-6 py-14 text-center">

                        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <FolderOpen className="h-8 w-8" />
                        </div>

                        <h3 className="text-base font-semibold text-foreground">
                            No reports yet
                        </h3>

                        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                            You haven't uploaded any medical reports yet.
                            Upload your first report to get AI-powered
                            health insights.
                        </p>

                        <Link
                            href="/dashboard"
                            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
                        >
                            <FileText className="h-4 w-4" />
                            Upload Report
                        </Link>
                    </div>

                ) : (

                    /* ================================= */
                    /* REPORT LIST */
                    /* ================================= */
                    <div className="space-y-3">

                        {reports.map((report) => {
                            const title = getReportTitle(
                                report.title,
                                report.filename
                            );

                            const fileType = getFileType(
                                report.filename
                            );

                            const isImage =
                                fileType === "PNG" ||
                                fileType === "JPG" ||
                                fileType === "JPEG";

                            return (
                                <div
                                    key={report._id}
                                    className="group flex flex-col gap-4 rounded-xl border border-border/60 bg-background p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/[0.02] hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                                >

                                    {/* Report Info */}
                                    <div className="flex min-w-0 items-center gap-3">

                                        {/* File Icon */}
                                        <div
                                            className={`
                                                flex h-11 w-11 shrink-0
                                                items-center justify-center
                                                rounded-lg
                                                ${isImage
                                                    ? "bg-purple-100 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400"
                                                    : "bg-primary/10 text-primary"
                                                }
                                            `}
                                        >
                                            {isImage ? (
                                                <FileImage className="h-5 w-5" />
                                            ) : (
                                                <FileText className="h-5 w-5" />
                                            )}
                                        </div>

                                        {/* Details */}
                                        <div className="min-w-0">

                                            <h3 className="truncate text-sm font-semibold text-foreground sm:text-base">
                                                {title}
                                            </h3>

                                            {report.filename &&
                                                report.title && (
                                                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                                                        {report.filename}
                                                    </p>
                                                )}

                                            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">

                                                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                                    <CalendarDays className="h-3.5 w-3.5" />
                                                    {formatDate(
                                                        report.createdAt
                                                    )}
                                                </span>

                                                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">
                                                    {fileType}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* View Button */}
                                    <Link
                                        href={`/dashboard/report-page/${report._id}`}
                                        className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm font-medium text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground sm:w-auto"
                                    >
                                        View Report

                                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ReportsList;
