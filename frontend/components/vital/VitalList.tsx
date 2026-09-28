import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { CalendarDays, Droplets, HeartPulse, Scale, StickyNote, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { deleteVital } from '@/redux/features/vital/vitalsThunks'

const VitalList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { vitals } = useSelector((state: RootState) => state.vitals);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    // ==========================================
    // DELETE VITAL
    // ==========================================
    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: "Delete this vital?",
            text: "This health record will be permanently removed.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        });

        if (!result.isConfirmed) return;

        try {
            setDeletingId(id);

            await dispatch(deleteVital(id)).unwrap();

            Swal.fire({
                title: "Deleted!",
                text: "Vital has been deleted successfully.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (err: any) {
            Swal.fire({
                title: "Delete Failed",
                text:
                    typeof err === "string"
                        ? err
                        : err?.message || "Unable to delete vital.",
                icon: "error",
                confirmButtonColor: "#2563eb",
            });
        } finally {
            setDeletingId(null);
        }
    };

    // ==========================================
    // FORMAT DATE
    // ==========================================
    const formatDate = (date: string) => {
        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "Date unavailable";
        }

        return parsedDate.toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };
    return (
        <section>

            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">
                        Recent Vitals
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        {vitals.length}{" "}
                        {vitals.length === 1
                            ? "record"
                            : "records"}{" "}
                        available
                    </p>
                </div>
            </div>

            {vitals.length === 0 ? (
                <Card className="border-dashed border-border/70 bg-muted/20 shadow-none">
                    <CardContent className="flex flex-col items-center justify-center px-6 py-14 text-center">

                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <HeartPulse className="h-8 w-8" />
                        </div>

                        <h3 className="font-semibold">
                            No vitals recorded yet
                        </h3>

                        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                            Add your first blood pressure,
                            sugar, or weight reading to
                            start tracking your health.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">

                    {vitals.map((vital) => (
                        <Card
                            key={vital._id}
                            className="overflow-hidden border-border/60 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md"
                        >
                            <CardHeader className="border-b border-border/40 bg-muted/20 pb-4">

                                <div className="flex items-start justify-between gap-3">

                                    <div className="min-w-0">

                                        <CardTitle className="flex items-center gap-2 text-base">
                                            <CalendarDays className="h-4 w-4 text-primary" />

                                            {formatDate(
                                                vital.date
                                            )}
                                        </CardTitle>

                                        <CardDescription className="mt-1">
                                            Health measurement
                                            record
                                        </CardDescription>
                                    </div>

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() =>
                                            handleDelete(
                                                vital._id
                                            )
                                        }
                                        disabled={
                                            deletingId ===
                                            vital._id
                                        }
                                        className="h-9 w-9 shrink-0 text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                                        aria-label="Delete vital"
                                    >
                                        {deletingId ===
                                            vital._id ? (
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                                        ) : (
                                            <Trash2 className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </CardHeader>

                            <CardContent className="p-4">

                                {/* Measurements */}
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                                    {vital.bp && (
                                        <div className="rounded-xl border border-red-100 bg-red-50 p-3 dark:border-red-950/40 dark:bg-red-950/20">
                                            <div className="mb-1 flex items-center gap-2 text-xs font-medium text-red-600 dark:text-red-400">
                                                <HeartPulse className="h-3.5 w-3.5" />
                                                Blood Pressure
                                            </div>

                                            <p className="text-lg font-bold text-foreground">
                                                {vital.bp}
                                            </p>

                                            <p className="text-[11px] text-muted-foreground">
                                                mmHg
                                            </p>
                                        </div>
                                    )}

                                    {vital.sugar !==
                                        undefined && (
                                            <div className="rounded-xl border border-blue-100 bg-blue-50 p-3 dark:border-blue-950/40 dark:bg-blue-950/20">
                                                <div className="mb-1 flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400">
                                                    <Droplets className="h-3.5 w-3.5" />
                                                    Blood Sugar
                                                </div>

                                                <p className="text-lg font-bold text-foreground">
                                                    {
                                                        vital.sugar
                                                    }
                                                </p>

                                                <p className="text-[11px] text-muted-foreground">
                                                    mg/dL
                                                </p>
                                            </div>
                                        )}

                                    {vital.weight !==
                                        undefined && (
                                            <div className="rounded-xl border border-purple-100 bg-purple-50 p-3 dark:border-purple-950/40 dark:bg-purple-950/20">
                                                <div className="mb-1 flex items-center gap-2 text-xs font-medium text-purple-600 dark:text-purple-400">
                                                    <Scale className="h-3.5 w-3.5" />
                                                    Weight
                                                </div>

                                                <p className="text-lg font-bold text-foreground">
                                                    {
                                                        vital.weight
                                                    }
                                                </p>

                                                <p className="text-[11px] text-muted-foreground">
                                                    kg
                                                </p>
                                            </div>
                                        )}
                                </div>

                                {/* Note */}
                                {vital.note && (
                                    <div className="mt-4 flex gap-3 rounded-xl bg-muted/40 p-3">
                                        <StickyNote className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

                                        <div>
                                            <p className="text-xs font-semibold text-foreground">
                                                Note
                                            </p>

                                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                                {
                                                    vital.note
                                                }
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </section>
    )
}

export default VitalList