"use client";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, LockKeyhole, Mail, Loader2 } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { resendEmailOTP, verifyEmailOTP } from "@/redux/features/auth/authThunks";
import toast from "react-hot-toast";
import { clearError } from "@/redux/features/auth/authSlice";

const EmailVerification = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch<AppDispatch>();
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState("");
    const [timer, setTimer] = useState(0);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const email = searchParams.get("email") || "";

    useEffect(() => {
        if (timer <= 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (value: string, index: number) => {
        const cleanValue = value.replace(/\D/g, "").slice(-1);

        const newOtp = [...otp];
        newOtp[index] = cleanValue;

        setOtp(newOtp);
        setError("");

        if (cleanValue && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
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

        const newOtp = [...otp];

        pasted.split("").forEach((digit, index) => { newOtp[index] = digit; });

        setOtp(newOtp);
        setError("");

        const nextIndex = Math.min(pasted.length, 5);
        inputRefs.current[nextIndex]?.focus();
    };

    const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const code = otp.join("");

        if (code.length !== 6) {
            setError("Please enter the complete 6-digit verification code.");
            return;
        }

        if (!email) {
            setError("Email address is required.");
            return
        }

        setLoading(true);
        setError("");

        try {
            await dispatch(verifyEmailOTP({ email, otp: code })).unwrap();

            router.replace("/auth")

            toast.success("Verification successful!");
        } catch {
            setError(
                "The verification code is invalid or has expired."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (timer > 0 || resending) return;

        setResending(true);
        setError("")
        dispatch(clearError());

        try {
            await dispatch(resendEmailOTP({ email })).unwrap();

            toast.success("A new verification code has been sent.");

            setTimer(40);

            const interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        return 0;
                    }

                    return prev - 1;
                });
            }, 1000);
        } catch (error: any) {
            const message = error?.message || "Failed to resend verification code. Please try again.";
            setError(message);
            toast.error(message);
        }
        finally {
            setResending(false);
        }
    };
    return (
        <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-16 sm:px-6">
            <div className="w-full max-w-md">
                {/* Mobile brand */}
                <div className="mb-6 flex items-center justify-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                        <span className="text-lg">♥</span>
                    </div>

                    <span className="text-xl font-bold tracking-tight">
                        HealthMate
                    </span>
                </div>

                <Card className="w-full overflow-hidden rounded-3xl border-border/60 bg-background/90 shadow-2xl shadow-primary/5 backdrop-blur-xl">
                    <CardHeader className="px-6 pb-4 pt-7 sm:px-8 sm:pt-8">
                        {/* Top status */}
                        <div className="mb-5 flex items-center justify-between">
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

                        <div className="flex justify-center pb-2">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <Mail className="h-7 w-7" />
                            </div>
                        </div>

                        <CardTitle className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
                            Verify your email
                        </CardTitle>

                        <CardDescription className="mx-auto mt-2 max-w-sm text-center leading-6">
                            We sent a 6-digit verification code to
                            <span className="block font-medium text-foreground">
                                {email}
                            </span>
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="px-6 pb-7 sm:px-8 sm:pb-8">
                        <form
                            onSubmit={handleVerify}
                            className="space-y-5"
                        >
                            {/* OTP */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium">
                                    Verification code
                                </label>

                                <div className="flex justify-between gap-2 sm:gap-3">
                                    {otp.map((digit, index) => (
                                        <Input
                                            key={index}
                                            ref={(el) => {
                                                inputRefs.current[index] =
                                                    el;
                                            }}
                                            value={digit}
                                            onChange={(e) =>
                                                handleChange(
                                                    e.target.value,
                                                    index
                                                )
                                            }
                                            onKeyDown={(e) =>
                                                handleKeyDown(
                                                    e,
                                                    index
                                                )
                                            }
                                            onPaste={handlePaste}
                                            inputMode="numeric"
                                            maxLength={1}
                                            autoComplete={
                                                index === 0
                                                    ? "one-time-code"
                                                    : "off"
                                            }
                                            disabled={loading}
                                            aria-label={`OTP digit ${index + 1
                                                }`}
                                            className="h-12 w-11 rounded-xl p-0 text-center text-lg font-semibold sm:h-14 sm:w-14"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
                                    {error}
                                </div>
                            )}

                            {/* Success */}
                            {/* {message && (
                                <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-950/20 dark:text-emerald-400">
                                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                                    {message}
                                </div>
                            )} */}

                            {/* Verify */}
                            <Button
                                type="submit"
                                disabled={loading || otp.join("").length !== 6}
                                className="h-11 w-full rounded-xl font-semibold shadow-lg shadow-primary/10 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/15"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Verifying...
                                    </span>
                                ) : (
                                    "Verify email"
                                )}
                            </Button>
                        </form>

                        {/* Resend */}
                        <div className="mt-6 text-center">
                            <p className="text-xs text-muted-foreground">
                                Didn't receive the code?
                            </p>

                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={
                                    timer > 0 || resending
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

                        {/* Bottom */}
                        <div className="mt-7 border-t border-border/60 pt-5 text-center">
                            <p className="text-xs leading-5 text-muted-foreground">
                                The verification code will expire
                                after a short period. Never share
                                your code with anyone.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Trust badge */}
                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Your health information is handled securely.
                </div>
            </div>
        </div>
    )
}

export default EmailVerification