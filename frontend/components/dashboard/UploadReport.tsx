"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";

import {
    Activity,
    Plus,
} from "lucide-react";

import { Button } from "../ui/button";
import { useRef } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

import {
    AppDispatch,
    RootState,
} from "@/redux/store";

import {
    uploadReport,
} from "@/redux/features/report/reportThunks";


const UploadReport = () => {
    const dispatch = useDispatch<AppDispatch>();

    const fileInputRef =
        useRef<HTMLInputElement>(null);

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
            });

            e.target.value = "";
            return;
        }


        try {
            await dispatch(
                uploadReport(file)
            ).unwrap();


            Swal.fire({
                icon: "success",
                title: "Upload Successful",
                text: "Your medical report has been uploaded and analyzed successfully.",
            });

        } catch (err: any) {
            console.error(
                "Upload Error:",
                err
            );


            // Backend error message
            const message =
                typeof err === "string"
                    ? err
                    : err?.message ||
                    "Unable to upload the report.";


            Swal.fire({
                icon: "error",
                title: "Upload Failed",
                text: message,
            });

        } finally {
            // Reset input so same file can be selected again
            e.target.value = "";
        }
    };


    return (
        <div className="grid md:grid-cols-2 gap-4 mb-8">

            {/* Upload Medical Report */}
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">

                <CardHeader>

                    <CardTitle className="flex items-center gap-2">

                        <Plus className="w-5 h-5 text-accent" />

                        Upload Medical Report

                    </CardTitle>


                    <CardDescription>
                        Upload a medical report for AI analysis
                    </CardDescription>

                </CardHeader>


                <CardContent>

                    <Button
                        className="w-full"
                        onClick={handleUploadClick}
                        disabled={uploadLoading}
                    >
                        {uploadLoading
                            ? "Analyzing..."
                            : "Upload PDF or Image"}
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


            {/* Add Vitals */}
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">

                <CardHeader>

                    <CardTitle className="flex items-center gap-2">

                        <Activity className="w-5 h-5 text-accent" />

                        Add Vitals

                    </CardTitle>


                    <CardDescription>
                        Manually track BP, Sugar, Weight, etc.
                    </CardDescription>

                </CardHeader>


                <CardContent>

                    <Button
                        className="w-full"
                        type="button"
                    >
                        Record Vitals
                    </Button>

                </CardContent>

            </Card>

        </div>
    );
};


export default UploadReport;
