import EditProfile from '@/components/user-profile/EditProfile'
import { ArrowLeft, CheckCircle2, User } from 'lucide-react'
import Link from 'next/link'

const Edit = () => {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-linear-to-b from-background via-background to-muted/30">
      <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        {/* BACK */}

        <Link
          href="/profile"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to profile
        </Link>

        {/* HEADER */}

        <section className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            <User className="h-3.5 w-3.5" />
            Profile settings
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Edit your profile
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Keep your personal information and basic
            health details accurate and up to date.
          </p>
        </section>

        {/* EDIT PROFILE */}

        <EditProfile />

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
          Your profile information is handled securely.
        </div>
      </div>
    </main >
  )
}

export default Edit