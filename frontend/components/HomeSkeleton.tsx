
"use client";

const HomeSkeleton = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        .skeleton {
          background: linear-gradient(
            90deg,
            rgba(148, 163, 184, 0.08) 25%,
            rgba(148, 163, 184, 0.2) 50%,
            rgba(148, 163, 184, 0.08) 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.8s ease-in-out infinite;
          border-radius: 12px;
        }

        @media (prefers-reduced-motion: reduce) {
          .skeleton {
            animation: none;
          }
        }
      `}</style>

      {/* Navbar Skeleton */}
      <header className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-border/40">
        <div className="skeleton h-9 w-32" />
        <div className="hidden md:flex gap-6">
          <div className="skeleton h-4 w-16" />
          <div className="skeleton h-4 w-20" />
          <div className="skeleton h-4 w-16" />
        </div>
        <div className="skeleton h-10 w-24 rounded-full" />
      </header>

      {/* Hero Skeleton */}
      <main className="mx-auto max-w-7xl px-6 py-16 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <div className="skeleton h-6 w-40 rounded-full" />

            <div className="space-y-3">
              <div className="skeleton h-10 md:h-14 w-full" />
              <div className="skeleton h-10 md:h-14 w-4/5" />
              <div className="skeleton h-10 md:h-14 w-3/5" />
            </div>

            <div className="skeleton h-5 w-full max-w-md" />
            <div className="skeleton h-5 w-4/5 max-w-sm" />

            <div className="flex gap-4 pt-3">
              <div className="skeleton h-12 w-36 rounded-full" />
              <div className="skeleton h-12 w-32 rounded-full" />
            </div>
          </div>

          <div className="skeleton aspect-square w-full max-w-lg justify-self-center rounded-3xl" />
        </div>

        {/* Lower content placeholders */}
        <div className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-border/40 p-5 space-y-4"
            >
              <div className="skeleton h-10 w-10 rounded-xl" />
              <div className="skeleton h-5 w-2/3" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-4/5" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomeSkeleton;
