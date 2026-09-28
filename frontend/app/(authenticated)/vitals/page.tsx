"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Activity,
} from "lucide-react";
import Swal from "sweetalert2";

import { AppDispatch, RootState } from "@/redux/store";
import {
  addVital,
  deleteVital,
  getMyVitals,
} from "@/redux/features/vital/vitalsThunks";
import {
  clearVitalError,
} from "@/redux/features/vital/vitalSlice";
import VitalList from "@/components/vital/VitalList";
import VitalForm from "@/components/vital/VitalForm";

interface FormData {
  bp: string;
  sugar: string;
  weight: string;
  note: string;
}

export default function Vitals() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    vitals,
    loading,
    error,
  } = useSelector((state: RootState) => state.vitals);

  // GET VITALS
  useEffect(() => {
    dispatch(getMyVitals());
  }, [dispatch]);

  // REDUX ERROR
  useEffect(() => {
    if (!error) return;

    Swal.fire({
      title: "Something went wrong",
      text: error,
      icon: "error",
      confirmButtonColor: "#2563eb",
    });

    dispatch(clearVitalError());
  }, [error, dispatch]);


  // INITIAL LOADING
  if (loading && vitals.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-primary/[0.03] to-background">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

          <div className="mb-8 space-y-3">
            <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
            <div className="h-4 w-80 max-w-full animate-pulse rounded bg-muted" />
          </div>

          <div className="grid gap-5 lg:grid-cols-[380px_1fr]">
            <div className="h-[400px] animate-pulse rounded-2xl bg-muted" />

            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-32 animate-pulse rounded-2xl bg-muted"
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary/[0.03] via-background to-background">

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        {/* ================================= */}
        {/* PAGE HEADER */}
        {/* ================================= */}
        <section className="mb-8">

          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            <Activity className="h-3.5 w-3.5" />
            Health Tracking
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Your Vitals
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Keep track of your blood pressure, blood sugar,
            weight, and other important health information.
          </p>
        </section>

        {/* ================================= */}
        {/* CONTENT GRID */}
        {/* ================================= */}
        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">

          {/* ADD VITAL FORM */}
          <VitalForm />

          {/* VITALS LIST */}
          <VitalList />
        </div>
      </div>
    </main>
  );
}
