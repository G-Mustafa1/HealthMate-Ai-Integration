"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, LockKeyhole, Mail, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { AppDispatch, RootState } from "@/redux/store";
import { allowResetOtp, clearError } from "@/redux/features/auth/authSlice";
import { forgotPassword } from "@/redux/features/auth/authThunks";

export default function ForgotPassword() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const { loading, error } = useSelector(
        (state: RootState) => state.auth
    );

    const [email, setEmail] = useState("");
    const [validationError, setValidationError] = useState("");

    const validateEmail = (value: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setValidationError("");

        if (error) {
            dispatch(clearError());
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setValidationError("");
        dispatch(clearError());

        const cleanEmail = email.trim();

        if (!cleanEmail) {
            setValidationError("Email address is required.");
            return;
        }

        if (!validateEmail(cleanEmail)) {
            setValidationError(
                "Please enter a valid email address."
            );
            return;
        }

        try {
            // Redux thunk connected to send the forgot password request:
            //
            await dispatch(forgotPassword({ email: cleanEmail })).unwrap();

            dispatch(allowResetOtp());
            
            toast.success("Verification code sent to your email.");

            router.replace(`/reset-otp?email=${encodeURIComponent(cleanEmail)}`);
        } catch {
            toast.error("Unable to send verification code. Please try again.");
        }
    };

    return (

        <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-16 sm:px-6">
            <div className="w-full max-w-md">
                {/* Brand */}
                <div className="mb-6 flex items-center justify-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                        <span className="text-lg">♥</span>
                    </div>

                    <span className="text-xl font-bold tracking-tight">
                        HealthMate
                    </span>
                </div>

                {/* Card */}
                <Card className="w-full overflow-hidden rounded-3xl border-border/60 bg-background/90 shadow-2xl shadow-primary/5 backdrop-blur-xl">
                    <CardHeader className="px-6 pb-4 pt-7 sm:px-8 sm:pt-8">
                        {/* Top status */}
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <LockKeyhole className="h-4 w-4" />
                                </span>

                                <span className="text-xs font-medium text-muted-foreground">
                                    Account recovery
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
                            Forgot your password?
                        </CardTitle>

                        <CardDescription className="mx-auto mt-2 max-w-sm text-center leading-6">
                            Enter your email address and we'll send you
                            a verification code to reset your password.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="px-6 pb-7 sm:px-8 sm:pb-8">
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >
                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email">
                                    Email address
                                </Label>

                                <div className="relative">
                                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        disabled={loading}
                                        autoFocus
                                        className="h-11 rounded-xl pl-10"
                                    />
                                </div>
                            </div>

                            {/* Error */}
                            {(validationError || error) && (
                                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
                                    {validationError || error}
                                </div>
                            )}

                            {/* Submit */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="h-11 w-full rounded-xl font-semibold shadow-lg shadow-primary/10 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/15"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Sending code...
                                    </span>
                                ) : (
                                    "Send verification code"
                                )}
                            </Button>
                        </form>

                        {/* Back to login */}
                        <div className="mt-6 text-center">
                            <Link
                                href="/auth"
                                className="text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                            >
                                ← Back to sign in
                            </Link>
                        </div>

                        {/* Bottom */}
                        <div className="mt-7 border-t border-border/60 pt-5 text-center">
                            <p className="text-xs leading-5 text-muted-foreground">
                                We'll send a secure verification code to
                                the email associated with your account.
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
    );
}
