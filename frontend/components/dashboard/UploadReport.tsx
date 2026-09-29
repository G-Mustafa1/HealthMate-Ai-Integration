"use client";

import { useRef } from "react";
import Link from "next/link";
import { Activity, Plus, Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

import { AppDispatch, RootState } from "@/redux/store";
import { uploadReport } from "@/redux/features/report/reportThunks";

const UploadReport = () => {
    const dispatch = useDispatch<AppDispatch>();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { uploadLoading } = useSelector(
        (state: RootState) => state.reports
    );

    const handleUploadClick = () => {
        if (uploadLoading) return;
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        // Allowed file types
        const allowedTypes = [
            "application/pdf",
            "image/png",
            "image/jpeg",
        ];

        if (!allowedTypes.includes(file.type)) {
            Swal.fire({
                icon: "error",
                title: "Invalid File",
                text: "Only PDF, PNG, JPG and JPEG files are allowed.",
                confirmButtonColor: "#2563eb",
                customClass: {
                    popup: "rounded-2xl",
                },
            });

            e.target.value = "";
            return;
        }

        try {
            await dispatch(uploadReport(file)).unwrap();

            Swal.fire({
                icon: "success",
                title: "Upload Successful",
                text: "Your medical report has been uploaded and analyzed successfully.",
                confirmButtonColor: "#2563eb",
                customClass: {
                    popup: "rounded-2xl",
                },
            });
        } catch (err: any) {
            const message = err?.message || "Unable to upload and analyze the report.";
            Swal.fire({
                icon: "error",
                title: "Upload Failed",
                text: message,
                confirmButtonColor: "#2563eb",
                customClass: {
                    popup: "rounded-2xl",
                },
            });
        } finally {
            e.target.value = "";
        }
    };

    return (
        <div className="grid gap-4 sm:grid-cols-2">

            {/* Upload Medical Report Card */}
            <Card
                className={`group relative overflow-hidden transition-all duration-200 hover:border-primary/40 hover:shadow-lg ${uploadLoading ? "opacity-90" : "cursor-pointer"
                    }`}
                onClick={handleUploadClick}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent pointer-events-none" />

                <CardHeader>
                    <CardTitle className="flex items-center gap-2.5 text-base sm:text-lg">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                            <Plus className="h-5 w-5" />
                        </span>
                        <span>Upload Medical Report</span>
                    </CardTitle>

                    <CardDescription>
                        Upload a medical report PDF or Image for AI analysis.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Button
                        className="w-full gap-2 rounded-xl font-medium shadow-sm transition-all group-hover:shadow"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleUploadClick();
                        }}
                        disabled={uploadLoading}
                    >
                        {uploadLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Analyzing Report...</span>
                            </>
                        ) : (
                            <>
                                <Plus className="h-4 w-4" />
                                <span>Upload PDF or Image</span>
                            </>
                        )}
                    </Button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={uploadLoading}
                    />
                </CardContent>
            </Card>

            {/* Add Vitals Card */}
            <Card className="group relative overflow-hidden transition-all duration-200 hover:border-emerald-500/40 hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.04] to-transparent pointer-events-none" />

                <CardHeader>
                    <CardTitle className="flex items-center gap-2.5 text-base sm:text-lg">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 transition-transform group-hover:scale-105">
                            <Activity className="h-5 w-5" />
                        </span>
                        <span>Record Vitals</span>
                    </CardTitle>

                    <CardDescription>
                        Track blood pressure, sugar, weight, and key vital signs.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Link href="/vitals" className="block w-full">
                        <Button
                            variant="outline"
                            className="w-full gap-2 rounded-xl border-border/80 font-medium transition-all group-hover:border-emerald-500/30 group-hover:bg-emerald-50/50 dark:group-hover:bg-emerald-950/20"
                        >
                            <Activity className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                            <span>Go to Vitals Tracker</span>
                        </Button>
                    </Link>
                </CardContent>
            </Card>

        </div>
    );
};

export default UploadReport;
