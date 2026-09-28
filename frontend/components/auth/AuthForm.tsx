"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import {
    ArrowLeft,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    User,
    UserRound,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { AppDispatch, RootState } from "@/redux/store";
import { clearError } from "@/redux/features/auth/authSlice";
import {
    loginUser,
    signupUser,
} from "@/redux/features/auth/authThunks";

import toast from "react-hot-toast";
import Link from "next/link";

interface AuthFormProps {
    isLogin: boolean;
    setIsLogin: (value: boolean) => void;
}

export default function AuthForm({
    isLogin,
    setIsLogin,
}: AuthFormProps) {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const { loading, error, user } = useSelector(
        (state: RootState) => state.auth
    );

    const [validationError, setValidationError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        if (user) {
            router.replace("/dashboard");
        }
    }, [user, router]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
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

    const validateEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setValidationError("");
        dispatch(clearError());

        const firstname = form.firstname.trim();
        const lastname = form.lastname.trim();
        const email = form.email.trim();
        const password = form.password;

        if (!isLogin) {
            if (!firstname || firstname.length < 2) {
                setValidationError(
                    "Please enter a valid first name."
                );
                return;
            }

            if (!lastname || lastname.length < 2) {
                setValidationError(
                    "Please enter a valid last name."
                );
                return;
            }
        }

        if (!email) {
            setValidationError(
                "Email address is required."
            );
            return;
        }

        if (!validateEmail(email)) {
            setValidationError(
                "Please enter a valid email address."
            );
            return;
        }

        if (!password) {
            setValidationError(
                "Password is required."
            );
            return;
        }

        if (password.length < 8) {
            setValidationError(
                "Password must be at least 8 characters."
            );
            return;
        }

        try {
            if (isLogin) {
                await dispatch(
                    loginUser({
                        email,
                        password,
                    })
                ).unwrap();

                toast.success("Welcome back!");
                router.replace("/dashboard");
                return;
            }

            await dispatch(
                signupUser({
                    firstname,
                    lastname,
                    email,
                    password,
                })
            ).unwrap();

            toast.success("Account created successfully!");

            setIsLogin(true);

            setForm({
                firstname: "",
                lastname: "",
                email,
                password: "",
            });

            setShowPassword(false);
        } catch (err) {
            console.error("Authentication error:", err);
        }
    };

    const handleToggle = () => {
        setIsLogin(!isLogin);
        setValidationError("");
        dispatch(clearError());
        setShowPassword(false);
    };

    return (
        <Card className="w-full overflow-hidden rounded-3xl border-border/60 bg-background/90 shadow-2xl shadow-primary/5 backdrop-blur-xl">

            {/* Header */}
            <CardHeader className="px-6 pb-4 pt-7 sm:px-8 sm:pt-8">
                <div className=" flex items-center justify-center">
                    <Link
                        href="/"
                        aria-label="Back to HealthMate home"
                        className="
        group inline-flex items-center gap-1
        rounded-full
        border border-border/60
        bg-background/85
        px-4 py-2.5
        text-sm font-medium
        text-muted-foreground
        shadow-sm
        backdrop-blur-xl
        transition-all duration-200

        hover:-translate-x-0.5
        hover:border-primary/30
        hover:bg-primary/5
        hover:text-primary
        hover:shadow-md

        sm:left-6 sm:top-6
        lg:left-8 lg:top-8
    "
                    >
                        <ArrowLeft
                            className="
            h-4 w-4
            transition-transform duration-200
            group-hover:-translate-x-0.5
        "
                        />

                        <span>Back to Home</span>
                    </Link>
                </div>
                {/* Top status */}
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <LockKeyhole className="h-4 w-4" />
                        </span>

                        <span className="text-xs font-medium text-muted-foreground">
                            Secure access
                        </span>
                    </div>

                    <span className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Protected
                    </span>
                </div>

                <CardTitle className="text-2xl font-bold tracking-tight sm:text-3xl">
                    {isLogin
                        ? "Welcome back."
                        : "Start your journey."}
                </CardTitle>

                <CardDescription className="mt-2 max-w-sm leading-6">
                    {isLogin
                        ? "Sign in to continue managing your health in one place."
                        : "Create your HealthMate account and take control of your health records."}
                </CardDescription>
            </CardHeader>

            <CardContent className="px-6 pb-7 sm:px-8 sm:pb-8">

                {/* Auth mode switch */}
                <div className="mb-7 grid grid-cols-2 rounded-xl bg-muted/70 p-1">
                    <button
                        type="button"
                        onClick={() => {
                            if (!isLogin) handleToggle();
                        }}
                        className={`rounded-lg py-2.5 text-sm font-medium transition-all ${isLogin
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        Sign in
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            if (isLogin) handleToggle();
                        }}
                        className={`rounded-lg py-2.5 text-sm font-medium transition-all ${!isLogin
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        Create account
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    {/* Names */}
                    {!isLogin && (
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="firstname">
                                    First name
                                </Label>

                                <div className="relative">
                                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                    <Input
                                        id="firstname"
                                        value={form.firstname}
                                        onChange={handleChange}
                                        placeholder="John"
                                        autoComplete="given-name"
                                        disabled={loading}
                                        className="h-11 rounded-xl pl-10"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lastname">
                                    Last name
                                </Label>

                                <div className="relative">
                                    <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                    <Input
                                        id="lastname"
                                        value={form.lastname}
                                        onChange={handleChange}
                                        placeholder="Doe"
                                        autoComplete="family-name"
                                        disabled={loading}
                                        className="h-11 rounded-xl pl-10"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

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
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                autoComplete="email"
                                disabled={loading}
                                className="h-11 rounded-xl pl-10"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">
                                Password
                            </Label>

                            {isLogin && (
                                <button
                                    type="button"
                                    className="text-xs font-medium text-primary hover:underline"
                                >
                                    Forgot password?
                                </button>
                            )}
                        </div>

                        <div className="relative">
                            <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                id="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                value={form.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                autoComplete={
                                    isLogin
                                        ? "current-password"
                                        : "new-password"
                                }
                                disabled={loading}
                                className="h-11 rounded-xl px-10"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword((prev) => !prev)
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Errors */}
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
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                                {isLogin
                                    ? "Signing in..."
                                    : "Creating account..."}
                            </span>
                        ) : isLogin ? (
                            "Continue to HealthMate"
                        ) : (
                            "Create my account"
                        )}
                    </Button>
                </form>

                {/* Bottom */}
                <div className="mt-7 border-t border-border/60 pt-5 text-center">
                    <p className="text-xs leading-5 text-muted-foreground">
                        By continuing, you agree to use HealthMate
                        responsibly and keep your account credentials secure.
                    </p>
                </div>
            </CardContent>
        </Card >
    );
}
