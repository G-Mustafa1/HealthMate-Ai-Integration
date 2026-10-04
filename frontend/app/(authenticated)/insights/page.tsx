"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Brain,
  FileText,
  Languages,
  Sparkles,
  AlertCircle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { AppDispatch, RootState } from "@/redux/store";
import { getInsights } from "@/redux/features/report/reportThunks";

export default function Insights() {
  const dispatch = useDispatch<AppDispatch>();

  const { insights, loading, error } = useSelector(
    (state: RootState) => state.reports
  );

  useEffect(() => {
    dispatch(getInsights());
  }, [dispatch]);

  // Loading State
  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />
            <div className="mt-3 h-4 w-80 max-w-full animate-pulse rounded bg-muted" />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden">
                <CardHeader>
                  <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="h-20 animate-pulse rounded-lg bg-muted" />
                  <div className="h-20 animate-pulse rounded-lg bg-muted" />
                  <div className="h-20 animate-pulse rounded-lg bg-muted" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    );


  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Brain className="h-6 w-6" />
                </div>

                <div>
                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    AI Insights
                  </h1>

                  <p className="text-sm text-muted-foreground">
                    Understand your health reports with AI-powered summaries.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-2 text-xs font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              AI Powered
            </div>
          </div>
        </div>

        {/* =========================
        Error
    ========================= */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-400">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

            <div>
              <p className="font-semibold">
                Unable to load insights
              </p>

              <p className="mt-1 text-sm">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* =========================
        Empty State
    ========================= */}
        {!error && insights.length === 0 && (
          <Card className="border-dashed shadow-sm">
            <CardContent className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Sparkles className="h-8 w-8" />
              </div>

              <h2 className="text-xl font-semibold">
                No AI insights yet
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Upload your medical reports from the dashboard to generate
                AI-powered summaries and explanations.
              </p>
            </CardContent>
          </Card>
        )}

        {/* =========================
        Insights Grid
    ========================= */}
        {insights.length > 0 && (
          <div className="grid gap-6 lg:grid-cols-2">
            {insights.map((insight) => (
              <Card
                key={insight._id}
                className="group overflow-hidden border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Top Accent */}
                <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/70 to-accent" />

                <CardHeader className="pb-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                      <FileText className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <CardTitle className="line-clamp-2 text-lg">
                        {insight.reportTitle || "Medical Report"}
                      </CardTitle>

                      <p className="mt-1 text-xs text-muted-foreground">
                        AI-generated health analysis
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">

                  {/* Summary */}
                  <div className="rounded-xl border border-primary/10 bg-primary/5 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Sparkles className="h-4 w-4" />
                      </div>

                      <h3 className="text-sm font-semibold">
                        Summary
                      </h3>
                    </div>

                    <p className="text-sm leading-6 text-muted-foreground">
                      {insight.summary || "No summary available."}
                    </p>
                  </div>

                  {/* English Explanation */}
                  <div className="rounded-xl border bg-muted/30 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        <Languages className="h-4 w-4" />
                      </div>

                      <h3 className="text-sm font-semibold">
                        Explanation — English
                      </h3>
                    </div>

                    <p className="whitespace-pre-line text-sm leading-6 text-muted-foreground">
                      {insight.explanation_en ||
                        "No English explanation available."}
                    </p>
                  </div>

                  {/* Roman Urdu Explanation */}
                  <div className="rounded-xl border bg-muted/30 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <Languages className="h-4 w-4" />
                      </div>

                      <h3 className="text-sm font-semibold">
                        Explanation — Roman Urdu
                      </h3>
                    </div>

                    <p className="whitespace-pre-line text-sm leading-6 text-muted-foreground">
                      {insight.explanation_ro ||
                        "No Roman Urdu explanation available."}
                    </p>
                  </div>

                  {/* Disclaimer */}
                  <div className="border-t pt-4">
                    <p className="text-[11px] leading-5 text-muted-foreground">
                      AI-generated information is for educational purposes
                      only and should not replace professional medical advice.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}