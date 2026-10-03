"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, LockKeyhole, Loader2 } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { AppDispatch, RootState } from "@/redux/store";
import { clearError } from "@/redux/features/auth/authSlice";
import { resetPassword } from "@/redux/features/auth/authThunks";

export default function ChangePassword() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const { loading, error } = useSelector(
        (state: RootState) => state.auth
    );

    const [form, setForm] = useState({
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [validationError, setValidationError] = useState("");
    const searchParams = useSearchParams();

    const email = searchParams.get("email") || "your email";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [id]: value,
        }));

        setValidationError("");

        if (error) {
            dispatch(clearError());
        }
    };

    const validatePassword = (password: string) => {
        return (
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[^A-Za-z0-9]/.test(password)
        );
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setValidationError("");
        dispatch(clearError());

        const password = form.password;
        const confirmPassword = form.confirmPassword;

        if (!password) {
            setValidationError("New password is required.");
            return;
        }

        if (!validatePassword(password)) {
            setValidationError(
                "Password must be at least 8 characters and include 1 uppercase letter, 1 number, and 1 symbol."
            );
            return;
        }

        if (!confirmPassword) {
            setValidationError("Please confirm your new password.");
            return;
        }

        if (password !== confirmPassword) {
            setValidationError("Passwords do not match.");
            return;
        }

        try {

            await dispatch(
                resetPassword({ email, newPassword: password, confirmPassword })
            ).unwrap();

            toast.success("Password reset successfully.");

            router.replace("/auth");
        } catch {
            toast.error("Unable to reset your password. Please try again.");
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
                                    Secure password reset
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
                                <LockKeyhole className="h-7 w-7" />
                            </div>
                        </div>

                        <CardTitle className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
                            Create new password
                        </CardTitle>

                        <CardDescription className="mx-auto mt-2 max-w-sm text-center leading-6">
                            Choose a strong password to keep your
                            HealthMate account secure.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="px-6 pb-7 sm:px-8 sm:pb-8">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* New Password */}
                            <div className="space-y-2">
                                <Label htmlFor="password">
                                    New password
                                </Label>

                                <div className="relative">
                                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                        disabled={loading}
                                        className="h-11 rounded-xl px-10"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>

                                <p className="text-[11px] leading-5 text-muted-foreground">
                                    Minimum 8 characters, 1 uppercase
                                    letter, 1 number and 1 symbol.
                                </p>
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">
                                    Confirm new password
                                </Label>

                                <div className="relative">
                                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                    <Input
                                        id="confirmPassword"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={
                                            form.confirmPassword
                                        }
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                        disabled={loading}
                                        className="h-11 rounded-xl px-10"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                (prev) => !prev
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                                        aria-label={
                                            showConfirmPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
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
                                className="mt-2 h-11 w-full rounded-xl font-semibold shadow-lg shadow-primary/10 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/15"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Updating password...
                                    </span>
                                ) : (
                                    "Reset password"
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
                                After resetting your password, you'll
                                need to sign in again with your new
                                credentials.
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
