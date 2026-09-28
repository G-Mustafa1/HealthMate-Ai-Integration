"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
    ArrowLeft,
    CalendarDays,
    Download,
    FileText,
    Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { AppDispatch, RootState } from "@/redux/store";
import {
    getSingleReport,
} from "@/redux/features/report/reportThunks";
import {
    clearSingleReport,
} from "@/redux/features/report/reportSlice";

const ReportPage = () => {
    const params = useParams();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();


    const {
        report,
        loading,
        error,
    } = useSelector((state: RootState) => state.reports);

    const id = Array.isArray(params.id)
        ? params.id[0]
        : params.id;

    useEffect(() => {
        if (id) {
            dispatch(getSingleReport(id));
        }

        return () => {
            dispatch(clearSingleReport());
        };
    }, [id, dispatch]);

    if (loading) {
        return (
            <main className="min-h-screen bg-muted/30 px-4 py-10">
                <div className="mx-auto max-w-5xl">
                    <div className="animate-pulse space-y-6">
                        <div className="h-10 w-48 rounded-md bg-muted" />
                        <div className="h-32 rounded-xl bg-muted" />
                        <div className="h-48 rounded-xl bg-muted" />
                        <div className="h-48 rounded-xl bg-muted" />
                    </div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
                <Card className="w-full max-w-md">
                    <CardContent className="p-8 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                            <FileText className="h-6 w-6 text-red-600" />
                        </div>

                        <h2 className="text-xl font-semibold">
                            Unable to load report
                        </h2>

                        <p className="mt-2 text-sm text-muted-foreground">
                            {error}
                        </p>

                        <Button
                            className="mt-6"
                            onClick={() => router.back()}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go Back
                        </Button>
                    </CardContent>
                </Card>
            </main>
        );
    }

    if (!report) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
                <Card className="w-full max-w-md">
                    <CardContent className="p-8 text-center">
                        <FileText className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />

                        <h2 className="text-xl font-semibold">
                            Report not found
                        </h2>

                        <p className="mt-2 text-sm text-muted-foreground">
                            The report you are looking for does not exist
                            or is no longer available.
                        </p>

                        <Button
                            className="mt-6"
                            onClick={() => router.back()}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go Back
                        </Button>
                    </CardContent>
                </Card>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-muted/30 px-4 py-8">
            <div className="mx-auto max-w-5xl space-y-6">

                {/* Back Button */}
                <Link
                    href="/dashboard"
                    className="inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Link>

                {/* Report Header */}
                <Card className="overflow-hidden border-0 shadow-sm">
                    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
                        <CardHeader className="p-6 sm:p-8">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                                <div className="flex gap-4">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                                        <FileText className="h-7 w-7 text-primary" />
                                    </div>

                                    <div>
                                        <p className="mb-1 text-sm font-medium text-primary">
                                            Medical Report
                                        </p>

                                        <CardTitle className="text-2xl sm:text-3xl">
                                            {report.title ||
                                                report.filename ||
                                                "Untitled Report"}
                                        </CardTitle>

                                        {report.filename && (
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                {report.filename}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {report.fileUrl && (
                                    <a
                                        href={report.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button variant="outline">
                                            <Download className="mr-2 h-4 w-4" />
                                            Download Report
                                        </Button>
                                    </a>
                                )}
                            </div>
                        </CardHeader>
                    </div>

                    {report.createdAt && (
                        <CardContent className="border-t bg-background px-6 py-4 sm:px-8">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CalendarDays className="h-4 w-4" />

                                <span>
                                    Uploaded on{" "}
                                    {new Date(
                                        report.createdAt
                                    ).toLocaleDateString(undefined, {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>
                        </CardContent>
                    )}
                </Card>

                {/* Summary */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            Report Summary
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="leading-7 text-muted-foreground">
                            {report.summary ||
                                "No summary is available for this report."}
                        </p>
                    </CardContent>
                </Card>

                {/* AI Insights */}
                <div>
                    <div className="mb-4">
                        <h2 className="flex items-center gap-2 text-2xl font-bold">
                            <Sparkles className="h-6 w-6 text-primary" />
                            AI Insights
                        </h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                            AI-generated explanation of your report.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* English */}
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Explanation
                                </CardTitle>

                                <p className="text-sm text-muted-foreground">
                                    English
                                </p>
                            </CardHeader>

                            <CardContent>
                                <p className="whitespace-pre-line leading-7 text-muted-foreground">
                                    {report.explanation_en ||
                                        "No English explanation is available."}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Roman Urdu */}
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Tafseel
                                </CardTitle>

                                <p className="text-sm text-muted-foreground">
                                    Roman Urdu
                                </p>
                            </CardHeader>

                            <CardContent>
                                <p className="whitespace-pre-line leading-7 text-muted-foreground">
                                    {report.explanation_ro ||
                                        "Roman Urdu explanation is not available."}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Suggested Questions */}
                {report.suggested_questions &&
                    report.suggested_questions.length > 0 && (
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle>
                                    Suggested Questions
                                </CardTitle>

                                <p className="text-sm text-muted-foreground">
                                    Questions you may want to discuss with
                                    your doctor.
                                </p>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-3">
                                    {report.suggested_questions.map(
                                        (question, index) => (
                                            <div
                                                key={index}
                                                className="rounded-lg border bg-muted/30 p-4 text-sm leading-6"
                                            >
                                                {question}
                                            </div>
                                        )
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                {/* Footer Note */}
                <div className="rounded-lg border bg-background p-4 text-center">
                    <p className="text-xs leading-5 text-muted-foreground">
                        AI-generated information is for educational purposes
                        and should not replace professional medical advice.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default ReportPage;
