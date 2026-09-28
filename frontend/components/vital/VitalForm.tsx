import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Droplets, HeartPulse, Plus, Scale, StickyNote } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import Swal from 'sweetalert2'
import { addVital } from '@/redux/features/vital/vitalsThunks'

interface FormData {
    bp: string;
    sugar: string;
    weight: string;
    note: string;
}

const VitalForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        loading,
    } = useSelector((state: RootState) => state.vitals);

    const [form, setForm] = useState<FormData>({
        bp: "",
        sugar: "",
        weight: "",
        note: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAdd = async () => {
        if (
            !form.bp.trim() &&
            !form.sugar.trim() &&
            !form.weight.trim()
        ) {
            Swal.fire({
                title: "Missing information",
                text: "Please enter at least one vital: BP, Sugar, or Weight.",
                icon: "warning",
                confirmButtonColor: "#2563eb",
            });

            return;
        }

        // BP basic validation
        if (form.bp.trim()) {
            const bpPattern = /^\d{2,3}\/\d{2,3}$/;

            if (!bpPattern.test(form.bp.trim())) {
                Swal.fire({
                    title: "Invalid Blood Pressure",
                    text: "Please enter BP in this format: 120/80",
                    icon: "warning",
                    confirmButtonColor: "#2563eb",
                });

                return;
            }
        }

        // Number validation
        if (form.sugar && Number(form.sugar) <= 0) {
            Swal.fire({
                title: "Invalid Sugar",
                text: "Sugar must be greater than 0.",
                icon: "warning",
                confirmButtonColor: "#2563eb",
            });

            return;
        }

        if (form.weight && Number(form.weight) <= 0) {
            Swal.fire({
                title: "Invalid Weight",
                text: "Weight must be greater than 0.",
                icon: "warning",
                confirmButtonColor: "#2563eb",
            });

            return;
        }

        try {
            await dispatch(
                addVital({
                    bp: form.bp.trim() || undefined,
                    sugar: form.sugar
                        ? Number(form.sugar)
                        : undefined,
                    weight: form.weight
                        ? Number(form.weight)
                        : undefined,
                    note: form.note.trim() || undefined,
                })
            ).unwrap();

            setForm({
                bp: "",
                sugar: "",
                weight: "",
                note: "",
            });

            Swal.fire({
                title: "Vital Added!",
                text: "Your health data has been recorded successfully.",
                icon: "success",
                timer: 1600,
                showConfirmButton: false,
            });
        } catch (err: any) {
            Swal.fire({
                title: "Unable to Add Vital",
                text:
                    typeof err === "string"
                        ? err
                        : err?.message || "Something went wrong.",
                icon: "error",
                confirmButtonColor: "#2563eb",
            });
        }
    };
    return (
        <Card className="h-fit overflow-hidden border-border/60 shadow-sm">

            <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">

                <CardTitle className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Plus className="h-5 w-5" />
                    </span>

                    Add New Vital
                </CardTitle>

                <CardDescription>
                    Record your latest health measurements.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5 p-5">

                {/* Blood Pressure */}
                <div className="space-y-2">
                    <Label
                        htmlFor="bp"
                        className="flex items-center gap-2"
                    >
                        <HeartPulse className="h-4 w-4 text-red-500" />
                        Blood Pressure
                    </Label>

                    <Input
                        id="bp"
                        name="bp"
                        type="text"
                        placeholder="e.g. 120/80"
                        value={form.bp}
                        onChange={handleChange}
                        className="h-11"
                    />

                    <p className="text-[11px] text-muted-foreground">
                        Enter systolic/diastolic value.
                    </p>
                </div>

                {/* Sugar */}
                <div className="space-y-2">
                    <Label
                        htmlFor="sugar"
                        className="flex items-center gap-2"
                    >
                        <Droplets className="h-4 w-4 text-blue-500" />
                        Blood Sugar
                    </Label>

                    <div className="relative">
                        <Input
                            id="sugar"
                            name="sugar"
                            type="number"
                            min="0"
                            step="0.1"
                            placeholder="e.g. 100"
                            value={form.sugar}
                            onChange={handleChange}
                            className="h-11 pr-16"
                        />

                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                            mg/dL
                        </span>
                    </div>
                </div>

                {/* Weight */}
                <div className="space-y-2">
                    <Label
                        htmlFor="weight"
                        className="flex items-center gap-2"
                    >
                        <Scale className="h-4 w-4 text-purple-500" />
                        Weight
                    </Label>

                    <div className="relative">
                        <Input
                            id="weight"
                            name="weight"
                            type="number"
                            min="0"
                            step="0.1"
                            placeholder="e.g. 70"
                            value={form.weight}
                            onChange={handleChange}
                            className="h-11 pr-10"
                        />

                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                            kg
                        </span>
                    </div>
                </div>

                {/* Note */}
                <div className="space-y-2">
                    <Label
                        htmlFor="note"
                        className="flex items-center gap-2"
                    >
                        <StickyNote className="h-4 w-4 text-amber-500" />
                        Note
                    </Label>

                    <Input
                        id="note"
                        name="note"
                        type="text"
                        placeholder="Optional note..."
                        value={form.note}
                        onChange={handleChange}
                        className="h-11"
                    />
                </div>

                {/* Submit */}
                <Button
                    type="button"
                    className="h-11 w-full gap-2"
                    onClick={handleAdd}
                    disabled={loading}
                >
                    <Plus className="h-4 w-4" />

                    {loading
                        ? "Saving..."
                        : "Add Vital"}
                </Button>
            </CardContent>
        </Card>
    )
}

export default VitalForm