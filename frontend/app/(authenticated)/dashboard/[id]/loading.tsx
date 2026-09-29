import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";

export default function ReportDetailLoading() {
    return (
        <main className="min-h-screen bg-muted/30 px-4 py-8">
            <div className="mx-auto max-w-5xl space-y-6">
                {/* Back link skeleton */}
                <div className="h-5 w-36 animate-pulse rounded bg-muted" />

                {/* Report Header Card Skeleton */}
                <Card className="overflow-hidden border-0 shadow-sm">
                    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 sm:p-8">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex gap-4">
                                <div className="h-14 w-14 shrink-0 animate-pulse rounded-xl bg-primary/20" />
                                <div className="space-y-2">
                                    <div className="h-4 w-28 animate-pulse rounded bg-muted" />
                                    <div className="h-8 w-60 max-w-full animate-pulse rounded-lg bg-muted" />
                                    <div className="h-4 w-40 animate-pulse rounded bg-muted" />
                                </div>
                            </div>
                            <div className="h-10 w-36 animate-pulse rounded-lg bg-muted" />
                        </div>
                    </div>
                    <div className="border-t bg-background px-6 py-4 sm:px-8">
                        <div className="h-4 w-44 animate-pulse rounded bg-muted" />
                    </div>
                </Card>

                {/* Summary Skeleton */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <div className="h-6 w-36 animate-pulse rounded bg-muted" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="h-4 w-full animate-pulse rounded bg-muted" />
                        <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
                        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                    </CardContent>
                </Card>

                {/* AI Insights Skeleton */}
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <div className="h-6 w-32 animate-pulse rounded bg-muted" />
                        <div className="h-4 w-48 animate-pulse rounded bg-muted" />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {[1, 2].map((i) => (
                            <Card key={i} className="shadow-sm">
                                <CardHeader className="space-y-2">
                                    <div className="h-5 w-28 animate-pulse rounded bg-muted" />
                                    <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="h-4 w-full animate-pulse rounded bg-muted" />
                                    <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
                                    <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Suggested Questions Skeleton */}
                <Card className="shadow-sm">
                    <CardHeader className="space-y-2">
                        <div className="h-5 w-44 animate-pulse rounded bg-muted" />
                        <div className="h-3 w-64 animate-pulse rounded bg-muted" />
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="h-12 w-full animate-pulse rounded-lg bg-muted" />
                        <div className="h-12 w-full animate-pulse rounded-lg bg-muted" />
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
