"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, LockKeyhole, Mail, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { AppDispatch, RootState } from "@/redux/store";
import { clearError } from "@/redux/features/auth/authSlice";
// import {
//     verifyResetOtp,
//     resendResetOtp,
// } from "@/redux/features/auth/authThunks";

export default function OtpReset() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch<AppDispatch>();

    const { loading, error } = useSelector((state: RootState) => state.auth);

    const email = searchParams.get("email") || "your email";

    const [otp, setOtp] = useState(["", "", "", "", "", "",]);

    const [validationError, setValidationError] = useState("");
    const [resending, setResending] = useState(false);
    const [timer, setTimer] = useState(30);

    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const handleChange = (value: string, index: number) => {
        const digit = value.replace(/\D/g, "").slice(-1);

        const newOtp = [...otp];
        newOtp[index] = digit;

        setOtp(newOtp);
        setValidationError("");

        if (error) {
            dispatch(clearError());
        }

        if (digit && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        if (e.key === "ArrowRight" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();

        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);

        if (!pasted) return;

        const newOtp = ["", "", "", "", "", "",];

        pasted.split("").forEach((digit, index) => {
            newOtp[index] = digit;
        });

        setOtp(newOtp);
        setValidationError("");

        if (error) {
            dispatch(clearError());
        }

        inputRefs.current[Math.min(pasted.length, 5)]?.focus();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setValidationError("");
        dispatch(clearError());

        const code = otp.join("");

        if (code.length !== 6) {
            setValidationError("Please enter the complete 6-digit verification code.");
            return;
        }

        try {
            /*
             * Production:
             *
             * const result = await dispatch(
             *     verifyResetOtp({
             *         email,
             *         otp: code,
             *     })
             * ).unwrap();
             *
             * router.replace(
             *     `/reset-password?token=${result.resetToken}`
             * );
             */

            // Temporary simulation
            await new Promise((resolve) =>
                setTimeout(resolve, 1000)
            );

            toast.success("Code verified successfully.");

            router.replace(`/reset-password?email=${encodeURIComponent(email)}`);
        } catch {
            setValidationError("The verification code is invalid or has expired.");
        }
    };

    const handleResend = async () => {
        if (timer > 0 || resending) return;

        setResending(true);
        setValidationError("");
        dispatch(clearError());

        try {
            /*
             * Production:
             *
             * await dispatch(
             *     resendResetOtp({ email })
             * ).unwrap();
             */

            // Temporary simulation
            await new Promise((resolve) =>
                setTimeout(resolve, 800)
            );

            toast.success("A new verification code has been sent.");

            setTimer(30);

            const interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        return 0;
                    }

                    return prev - 1;
                });
            }, 1000);
        } catch {
            setValidationError("Unable to resend the verification code.");
        } finally {
            setResending(false);
        }
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-secondary/40 to-background">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0">
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage: "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />

                <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />

                <div className="absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-emerald-400/10 blur-3xl" />
            </div>

            {/* Back */}
            <div className="absolute left-4 top-4 z-20 sm:left-6 sm:top-6 lg:left-8 lg:top-8">
                <Link
                    href="/forgot-password"
                    className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/85 px-4 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-xl transition-all duration-200 hover:-translate-x-0.5 hover:border-primary/30 hover:bg-primary/5 hover:text-primary hover:shadow-md sm:text-sm"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                    Back
                </Link>
            </div>

            {/* Main */}
            <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-16 sm:px-6">
                <div className="w-full max-w-md">
                    {/* Brand */}
                    <div className="mb-6 flex items-center justify-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                            <span className="text-lg">
                                ♥
                            </span>
                        </div>

                        <span className="text-xl font-bold tracking-tight">
                            HealthMate
                        </span>
                    </div>

                    <Card className="w-full overflow-hidden rounded-3xl border-border/60 bg-background/90 shadow-2xl shadow-primary/5 backdrop-blur-xl">
                        <CardHeader className="px-6 pb-4 pt-7 sm:px-8 sm:pt-8">
                            {/* Status */}
                            <div className="mb-6 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <LockKeyhole className="h-4 w-4" />
                                    </span>

                                    <span className="text-xs font-medium text-muted-foreground">
                                        Secure verification
                                    </span>
                                </div>

                                <span className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    Protected
                                </span>
                            </div>

                            {/* Icon */}
                            <div className="mb-5 flex justify-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                    <Mail className="h-7 w-7" />
                                </div>
                            </div>

                            <CardTitle className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
                                Verify reset code
                            </CardTitle>

                            <CardDescription className="mx-auto mt-2 max-w-sm text-center leading-6">
                                Enter the 6-digit code we sent to
                                <span className="mt-1 block font-medium text-foreground">
                                    {email}
                                </span>
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="px-6 pb-7 sm:px-8 sm:pb-8">
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >
                                {/* OTP */}
                                <div className="space-y-3">
                                    <label className="text-sm font-medium">
                                        Verification code
                                    </label>

                                    <div className="flex justify-between gap-2 sm:gap-3">
                                        {otp.map(
                                            (
                                                digit,
                                                index
                                            ) => (
                                                <Input
                                                    key={index}
                                                    ref={(el) => {
                                                        inputRefs.current[
                                                            index
                                                        ] = el;
                                                    }}
                                                    value={
                                                        digit
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        handleChange(
                                                            e
                                                                .target
                                                                .value,
                                                            index
                                                        )
                                                    }
                                                    onKeyDown={(
                                                        e
                                                    ) =>
                                                        handleKeyDown(
                                                            e,
                                                            index
                                                        )
                                                    }
                                                    onPaste={
                                                        handlePaste
                                                    }
                                                    inputMode="numeric"
                                                    maxLength={
                                                        1
                                                    }
                                                    autoComplete={
                                                        index ===
                                                            0
                                                            ? "one-time-code"
                                                            : "off"
                                                    }
                                                    disabled={
                                                        loading
                                                    }
                                                    aria-label={`OTP digit ${index +
                                                        1
                                                        }`}
                                                    className="h-12 w-11 rounded-xl p-0 text-center text-lg font-semibold sm:h-14 sm:w-14"
                                                />
                                            )
                                        )}
                                    </div>
                                </div>

                                {/* Error */}
                                {(validationError ||
                                    error) && (
                                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
                                            {validationError ||
                                                error}
                                        </div>
                                    )}

                                {/* Verify */}
                                <Button
                                    type="submit"
                                    disabled={
                                        loading ||
                                        otp.join("")
                                            .length !== 6
                                    }
                                    className="h-11 w-full rounded-xl font-semibold shadow-lg shadow-primary/10 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/15"
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Verifying...
                                        </span>
                                    ) : (
                                        "Verify reset code"
                                    )}
                                </Button>
                            </form>

                            {/* Resend */}
                            <div className="mt-6 text-center">
                                <p className="text-xs text-muted-foreground">
                                    Didn't receive the
                                    code?
                                </p>

                                <button
                                    type="button"
                                    onClick={
                                        handleResend
                                    }
                                    disabled={
                                        timer > 0 ||
                                        resending
                                    }
                                    className="mt-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80 disabled:cursor-not-allowed disabled:text-muted-foreground"
                                >
                                    {resending
                                        ? "Sending..."
                                        : timer > 0
                                            ? `Resend code in ${timer}s`
                                            : "Resend verification code"}
                                </button>
                            </div>

                            {/* Success flow info */}
                            <div className="mt-6 flex items-start gap-2 rounded-xl border border-primary/10 bg-primary/5 px-4 py-3">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                                <p className="text-xs leading-5 text-muted-foreground">
                                    After verification, you'll
                                    be able to create a new
                                    password for your account.
                                </p>
                            </div>

                            {/* Bottom */}
                            <div className="mt-7 border-t border-border/60 pt-5 text-center">
                                <p className="text-xs leading-5 text-muted-foreground">
                                    Never share your verification
                                    code with anyone.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Trust */}
                    <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Your account information is handled securely.
                    </div>
                </div>
            </div>
        </main>
    );
}
