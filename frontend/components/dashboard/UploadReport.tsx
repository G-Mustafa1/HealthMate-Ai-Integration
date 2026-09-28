"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Activity, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useRef } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { uploadReport } from "@/redux/features/report/reportThunks";

const UploadReport = () => {
    const dispatch = useDispatch<AppDispatch>();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { uploadLoading } = useSelector(
        (state: RootState) => state.reports
    );

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) {
            return Swal.fire("Error", "No file selected", "error");
        }

        const allowed = [
            "application/pdf",
            "image/png",
            "image/jpeg",
        ];

        if (!allowed.includes(file.type)) {
            return Swal.fire(
                "Error",
                "Only PDF, PNG, JPG allowed!",
                "error"
            );
        }

        try {
            await dispatch(uploadReport(file)).unwrap();

            Swal.fire(
                "Success",
                "Report uploaded successfully!",
                "success"
            );
        } catch (err: any) {
            console.error(err);

            Swal.fire(
                "Error",
                err || "Error uploading file",
                "error"
            );
        }

        e.target.value = "";
    };

    return (
        <div className="grid md:grid-cols-2 gap-4 mb-8">

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Plus className="w-5 h-5 text-accent" />
                        Upload Report
                    </CardTitle>

                    <CardDescription>
                        Upload medical reports for AI analysis
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Button
                        className="w-full"
                        onClick={handleUploadClick}
                        disabled={uploadLoading}
                    >
                        {uploadLoading
                            ? "Uploading..."
                            : "Upload PDF or Image"}
                    </Button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </CardContent>
            </Card>

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
                    <Button className="w-full">
                        Record Vitals
                    </Button>
                </CardContent>
            </Card>

        </div>
    );
};

export default UploadReport;
