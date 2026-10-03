export default function DashboardLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* Welcome Banner Skeleton */}
      <div className="relative mb-8 overflow-hidden rounded-2xl border border-border/60 bg-card p-5 sm:p-7 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3 max-w-2xl">
            <div className="h-6 w-36 animate-pulse rounded-full bg-muted" />
            <div className="h-9 w-64 max-w-full animate-pulse rounded-lg bg-muted sm:w-80" />
            <div className="h-4 w-96 max-w-full animate-pulse rounded bg-muted" />
          </div>

          <div className="h-16 w-36 animate-pulse rounded-xl bg-muted" />
        </div>
      </div>

      {/* Stats Skeletons */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex items-center justify-between rounded-xl border border-border/60 bg-card p-5 shadow-sm"
          >
            <div className="space-y-2">
              <div className="h-4 w-24 animate-pulse rounded bg-muted" />
              <div className="h-7 w-12 animate-pulse rounded bg-muted" />
              <div className="h-3 w-32 animate-pulse rounded bg-muted" />
            </div>
            <div className="h-11 w-11 animate-pulse rounded-xl bg-muted" />
          </div>
        ))}
      </div>

      {/* Quick Action Skeletons */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 animate-pulse rounded-xl bg-muted" />
              <div className="space-y-1.5 flex-1">
                <div className="h-5 w-40 animate-pulse rounded bg-muted" />
                <div className="h-3.5 w-60 max-w-full animate-pulse rounded bg-muted" />
              </div>
            </div>
            <div className="h-10 w-full animate-pulse rounded-xl bg-muted" />
          </div>
        ))}
      </div>

      {/* Reports List Skeleton */}
      <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
        <div className="border-b border-border/50 p-6 space-y-2">
          <div className="h-6 w-36 animate-pulse rounded bg-muted" />
          <div className="h-4 w-64 max-w-full animate-pulse rounded bg-muted" />
        </div>

        <div className="p-6 space-y-3">
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
      </div>
    </main>
  );
}
