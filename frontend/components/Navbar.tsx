// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import Swal from "sweetalert2";
// import { useEffect, useState } from "react";

// import {
//     Menu,
//     X,
//     LogOut,
//     Heart,
//     FileText,
//     Activity,
//     TrendingUp,
//     UserPlus,
//     LogIn,
//     User,
// } from "lucide-react";

// import { useDispatch, useSelector } from "react-redux";

// import { Button } from "./ui/button";

// import { AppDispatch, RootState } from "@/redux/store";
// import { logoutUser } from "@/redux/features/authSlice";
// import toast from "react-hot-toast";

// const navLinks = [
//     {
//         name: "Dashboard",
//         href: "/dashboard",
//         icon: Activity,
//     },
//     {
//         name: "Vitals",
//         href: "/vitals",
//         icon: TrendingUp,
//     },
//     {
//         name: "AI Insights",
//         href: "/insights",
//         icon: Heart,
//     },
//     {
//         name: "Reports",
//         href: "/reports",
//         icon: FileText,
//     },
// ];

// export default function Navbar() {
//     const router = useRouter();
//     const pathname = usePathname();
//     const dispatch = useDispatch<AppDispatch>();

//     const [open, setOpen] = useState(false);
//     const [loggingOut, setLoggingOut] = useState(false);

//     const {
//         user,
//         loading: authLoading,
//     } = useSelector((state: RootState) => state.auth);

//     // ---------------------------------------
//     // Close mobile menu after route change
//     // ---------------------------------------

//     useEffect(() => {
//         setOpen(false);
//     }, [pathname]);

//     // ---------------------------------------
//     // Active route
//     // ---------------------------------------

//     const isActive = (href: string) => {
//         if (href === "/dashboard") {
//             return (
//                 pathname === "/dashboard" ||
//                 pathname.startsWith("/dashboard/")
//             );
//         }

//         return (
//             pathname === href ||
//             pathname.startsWith(`${href}/`)
//         );
//     };

//     // ---------------------------------------
//     // Logout
//     // ---------------------------------------

//     const handleLogout = async () => {
//         if (loggingOut) return;

//         const result = await Swal.fire({
//             title: "Logout?",
//             text: "Are you sure you want to logout from your account?",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonText: "Yes, Logout",
//             cancelButtonText: "Cancel",
//             confirmButtonColor: "#dc2626",
//             cancelButtonColor: "#64748b",
//             reverseButtons: true,
//             focusCancel: true,
//         });

//         if (!result.isConfirmed) return;

//         try {
//             setLoggingOut(true);
//             setOpen(false);

//             await dispatch(logoutUser()).unwrap();

//             await Swal.fire({
//                 title: "Logged Out",
//                 text: "You have been logged out successfully.",
//                 icon: "success",
//                 timer: 1400,
//                 timerProgressBar: true,
//                 showConfirmButton: false,
//             });
//         } catch (error: any) {
//             console.error("Logout failed:", error);

//             await Swal.fire({
//                 title: "Logout Failed",
//                 text:
//                     typeof error === "string"
//                         ? error
//                         : error?.message ||
//                           "Something went wrong while logging out.",
//                 icon: "error",
//                 confirmButtonColor: "#2563eb",
//             });
//         } finally {
//             setLoggingOut(false);
//             toast.success("You have been logged out successfully.");
//         }
//     };

//     // ---------------------------------------
//     // User information
//     // ---------------------------------------

//     const firstName = user?.firstname?.trim() || "User";
//     const lastName = user?.lastname?.trim() || "";

//     const fullName = `${firstName} ${lastName}`.trim();

//     const initials =
//         `${firstName.charAt(0)}${lastName.charAt(0)}`
//             .toUpperCase() || "U";

//     // ---------------------------------------
//     // Navigation links
//     // ---------------------------------------

//     const renderNavLinks = (mobile = false) => {
//         return navLinks.map((link) => {
//             const Icon = link.icon;
//             const active = isActive(link.href);

//             return (
//                 <Link
//                     key={link.href}
//                     href={link.href}
//                     onClick={() => setOpen(false)}
//                     className={`
//                         group relative flex items-center gap-2
//                         font-medium
//                         transition-colors duration-200

//                         ${
//                             mobile
//                                 ? "w-full px-3 py-3 text-sm"
//                                 : "px-3 py-2 text-sm"
//                         }

//                         ${
//                             active
//                                 ? "text-primary"
//                                 : "text-muted-foreground"
//                         }

//                         hover:text-primary
//                     `}
//                 >
//                     <Icon
//                         className="
//                             h-4 w-4 shrink-0
//                             transition-transform
//                             duration-200
//                             group-hover:scale-105
//                         "
//                     />

//                     <span>{link.name}</span>

//                     <span
//                         className="
//                             absolute
//                             bottom-0
//                             left-3
//                             h-0.5
//                             w-0
//                             rounded-full
//                             bg-primary
//                             opacity-0
//                             transition-all
//                             duration-300
//                             ease-out
//                             group-hover:w-[calc(90%-0.75rem)]
//                             group-hover:opacity-100
//                         "
//                     />
//                 </Link>
//             );
//         });
//     };

//     const isAuthenticated = !!user;

//     return (
//         <nav className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 shadow-sm backdrop-blur-xl">

//             {/* NAVBAR MAIN */}

//             <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

//                 {/* LOGO */}

//                 <Link
//                     href="/"
//                     onClick={() => setOpen(false)}
//                     className="group flex items-center gap-3"
//                 >
//                     <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-primary shadow-md shadow-primary/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
//                         <div className="absolute inset-0 bg-white/10" />

//                         <Heart className="relative h-5 w-5 text-primary-foreground" />
//                     </div>

//                     <div>
//                         <h1 className="text-xl font-bold tracking-tight text-foreground">
//                             HealthMate
//                         </h1>

//                         <p className="hidden text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground sm:block">
//                             Your Health Companion
//                         </p>
//                     </div>
//                 </Link>

//                 {/* DESKTOP NAV */}

//                 {isAuthenticated && (
//                     <div className="hidden items-center gap-1 md:flex">
//                         {renderNavLinks()}
//                     </div>
//                 )}

//                 {/* DESKTOP ACTIONS */}

//                 <div className="hidden items-center gap-3 md:flex">

//                     {authLoading ? (
//                         <div className="h-9 w-24 animate-pulse rounded-lg bg-muted" />
//                     ) : isAuthenticated ? (
//                         <>
//                             {/* User Profile */}

//                             <div className="flex items-center gap-2">

//                                 <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
//                                     {initials}
//                                 </div>

//                                 <div className="hidden lg:block">
//                                     <p className="max-w-[120px] truncate text-sm font-semibold text-foreground">
//                                         {fullName}
//                                     </p>

//                                     <p className="text-[10px] text-muted-foreground">
//                                         HealthMate User
//                                     </p>
//                                 </div>
//                             </div>

//                             {/* Logout */}

//                             <Button
//                                 type="button"
//                                 variant="outline"
//                                 size="sm"
//                                 disabled={loggingOut}
//                                 onClick={handleLogout}
//                                 className="gap-2 rounded-lg border-border/70 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20"
//                             >
//                                 <LogOut className="h-4 w-4" />

//                                 {loggingOut
//                                     ? "Logging out..."
//                                     : "Logout"}
//                             </Button>
//                         </>
//                     ) : (
//                         <>
//                             {/* Login */}

//                             <Link href="/login">
//                                 <Button
//                                     variant="ghost"
//                                     size="sm"
//                                     className="gap-2 rounded-lg"
//                                 >
//                                     <LogIn className="h-4 w-4" />
//                                     Login
//                                 </Button>
//                             </Link>

//                             {/* Register */}

//                             <Link href="/register">
//                                 <Button
//                                     size="sm"
//                                     className="gap-2 rounded-lg shadow-sm"
//                                 >
//                                     <UserPlus className="h-4 w-4" />
//                                     Register
//                                 </Button>
//                             </Link>
//                         </>
//                     )}
//                 </div>

//                 {/* MOBILE BUTTON */}

//                 <button
//                     type="button"
//                     onClick={() => setOpen((prev) => !prev)}
//                     aria-label={
//                         open
//                             ? "Close navigation menu"
//                             : "Open navigation menu"
//                     }
//                     aria-expanded={open}
//                     className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 transition-colors hover:bg-muted md:hidden"
//                 >
//                     {open ? (
//                         <X className="h-5 w-5" />
//                     ) : (
//                         <Menu className="h-5 w-5" />
//                     )}
//                 </button>
//             </div>

//             {/* MOBILE MENU */}

//             <div
//                 className={`
//                     overflow-hidden border-t border-border/60
//                     bg-background md:hidden
//                     transition-all duration-300 ease-in-out
//                     ${
//                         open
//                             ? "max-h-[700px] opacity-100"
//                             : "max-h-0 opacity-0"
//                     }
//                 `}
//             >
//                 <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">

//                     {isAuthenticated ? (
//                         <div className="space-y-4">

//                             {/* Mobile Profile */}

//                             <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/30 p-3">

//                                 <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
//                                     {initials || (
//                                         <User className="h-5 w-5" />
//                                     )}
//                                 </div>

//                                 <div className="min-w-0">
//                                     <p className="truncate font-semibold">
//                                         {fullName}
//                                     </p>

//                                     <p className="text-xs text-muted-foreground">
//                                         HealthMate User
//                                     </p>
//                                 </div>
//                             </div>

//                             {/* Mobile Navigation */}

//                             <div className="space-y-1">
//                                 {renderNavLinks(true)}
//                             </div>

//                             {/* Mobile Logout */}

//                             <Button
//                                 type="button"
//                                 variant="outline"
//                                 disabled={loggingOut}
//                                 onClick={handleLogout}
//                                 className="w-full gap-2 rounded-lg border-red-200 text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 dark:border-red-900/50 dark:hover:bg-red-950/20"
//                             >
//                                 <LogOut className="h-4 w-4" />

//                                 {loggingOut
//                                     ? "Logging out..."
//                                     : "Logout"}
//                             </Button>
//                         </div>
//                     ) : (
//                         <div className="grid grid-cols-2 gap-3">

//                             {/* Login */}

//                             <Link
//                                 href="/login"
//                                 onClick={() => setOpen(false)}
//                             >
//                                 <Button
//                                     variant="outline"
//                                     className="w-full gap-2 rounded-lg"
//                                 >
//                                     <LogIn className="h-4 w-4" />
//                                     Login
//                                 </Button>
//                             </Link>

//                             {/* Register */}

//                             <Link
//                                 href="/register"
//                                 onClick={() => setOpen(false)}
//                             >
//                                 <Button className="w-full gap-2 rounded-lg">
//                                     <UserPlus className="h-4 w-4" />
//                                     Register
//                                 </Button>
//                             </Link>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </nav>
//     );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import {
    Menu,
    X,
    LogOut,
    Heart,
    FileText,
    Activity,
    TrendingUp,
    UserPlus,
    LogIn,
    User,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "./ui/button";
import { AppDispatch, RootState } from "@/redux/store";
import { logoutUser } from "@/redux/features/auth/authThunks";

const navLinks = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: Activity,
    },
    {
        name: "Vitals",
        href: "/vitals",
        icon: TrendingUp,
    },
    {
        name: "AI Insights",
        href: "/insights",
        icon: Heart,
    },
    {
        name: "Reports",
        href: "/reports",
        icon: FileText,
    },
];

export default function Navbar() {
    const pathname = usePathname();
    const dispatch = useDispatch<AppDispatch>();

    const [open, setOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const { user, loading: authLoading } = useSelector(
        (state: RootState) => state.auth
    );

    // Close mobile menu whenever route changes
    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    // Check active route
    const isActive = (href: string) => {
        if (href === "/dashboard") {
            return (
                pathname === "/dashboard" ||
                pathname.startsWith("/dashboard/")
            );
        }

        return (
            pathname === href ||
            pathname.startsWith(`${href}/`)
        );
    };

    // Logout
    const handleLogout = async () => {
        if (loggingOut) return;

        const result = await Swal.fire({
            title: "Logout?",
            text: "Are you sure you want to logout from your account?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Logout",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#64748b",
            reverseButtons: true,
            focusCancel: true,
        });

        if (!result.isConfirmed) return;

        try {
            setLoggingOut(true);
            setOpen(false);

            await dispatch(logoutUser()).unwrap();

            await Swal.fire({
                title: "Logged Out",
                text: "You have been logged out successfully.",
                icon: "success",
                timer: 1400,
                timerProgressBar: true,
                showConfirmButton: false,
            });
        } catch (error: any) {
            console.error("Logout failed:", error);

            await Swal.fire({
                title: "Logout Failed",
                text:
                    typeof error === "string"
                        ? error
                        : error?.message ||
                          "Something went wrong while logging out.",
                icon: "error",
                confirmButtonColor: "#2563eb",
            });
        } finally {
            setLoggingOut(false);
        }
    };

    // User information
    const firstName = user?.firstname?.trim() || "User";
    const lastName = user?.lastname?.trim() || "";

    const fullName = `${firstName} ${lastName}`.trim();

    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`
        .trim()
        .toUpperCase() || "U";

    const isAuthenticated = Boolean(user);

    // Navigation links
    const renderNavLinks = (mobile = false) => {
        return navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);

            return (
                <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`
                        group relative flex items-center gap-2
                        font-medium
                        transition-colors duration-200
                        ${
                            mobile
                                ? "w-full px-3 py-2.5 text-sm"
                                : "px-3 py-2 text-sm"
                        }
                        ${
                            active
                                ? "text-primary"
                                : "text-muted-foreground"
                        }
                        hover:text-primary
                    `}
                >
                    <Icon
                        className="
                            h-4 w-4 shrink-0
                            transition-transform duration-200
                            group-hover:scale-105
                        "
                    />

                    <span>{link.name}</span>

                    {/* Bottom line - comes from left */}
                    <span
                        className="
                            absolute
                            bottom-0
                            left-3
                            h-0.5
                            w-0
                            rounded-full
                            bg-primary
                            transition-all
                            duration-300
                            ease-out
                            group-hover:w-[calc(100%-1.5rem)]
                        "
                    />
                </Link>
            );
        });
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 shadow-sm backdrop-blur-xl">
            {/* Desktop / Main Navbar */}
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-3"
                >
                    <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-primary shadow-md shadow-primary/20 transition-all duration-300 group-hover:scale-105">
                        <div className="absolute inset-0 bg-white/10" />

                        <Heart className="relative h-5 w-5 text-primary-foreground" />
                    </div>

                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-foreground">
                            HealthMate
                        </h1>

                        <p className="hidden text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground sm:block">
                            Your Health Companion
                        </p>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                {isAuthenticated && (
                    <div className="hidden items-center gap-1 md:flex">
                        {renderNavLinks()}
                    </div>
                )}

                {/* Desktop Actions */}
                <div className="hidden items-center gap-3 md:flex">
                    {authLoading ? (
                        <div className="h-9 w-24 animate-pulse rounded-lg bg-muted" />
                    ) : isAuthenticated ? (
                        <>
                            {/* Profile */}
                            <div className="flex items-center gap-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                                    {initials}
                                </div>

                                <div className="hidden lg:block">
                                    <p className="max-w-[120px] truncate text-sm font-semibold text-foreground">
                                        {fullName}
                                    </p>

                                    <p className="text-[10px] text-muted-foreground">
                                        HealthMate User
                                    </p>
                                </div>
                            </div>

                            {/* Logout */}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                disabled={loggingOut}
                                onClick={handleLogout}
                                className="
                                    gap-2 rounded-lg
                                    border-border/70
                                    transition-colors
                                    hover:border-red-200
                                    hover:bg-red-50
                                    hover:text-red-600
                                    dark:hover:bg-red-950/20
                                "
                            >
                                <LogOut className="h-4 w-4" />

                                {loggingOut
                                    ? "Logging out..."
                                    : "Logout"}
                            </Button>
                        </>
                    ) : (
                        <>
                            {/* Login */}
                            <Link href="/auth">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="gap-2 rounded-lg"
                                >
                                    <LogIn className="h-4 w-4" />
                                    Login
                                </Button>
                            </Link>

                            {/* Register */}
                            <Link href="/auth">
                                <Button
                                    size="sm"
                                    className="gap-2 rounded-lg shadow-sm"
                                >
                                    <UserPlus className="h-4 w-4" />
                                    Register
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Button */}
                <button
                    type="button"
                    onClick={() => setOpen((prev) => !prev)}
                    aria-label={
                        open
                            ? "Close navigation menu"
                            : "Open navigation menu"
                    }
                    aria-expanded={open}
                    className="
                        flex h-10 w-10 items-center justify-center
                        rounded-lg border border-border/60
                        transition-colors
                        hover:bg-muted
                        md:hidden
                    "
                >
                    {open ? (
                        <X className="h-5 w-5" />
                    ) : (
                        <Menu className="h-5 w-5" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`
                    overflow-hidden border-t border-border/60
                    bg-background md:hidden
                    transition-all duration-300 ease-in-out
                    ${
                        open
                            ? "max-h-[700px] opacity-100"
                            : "max-h-0 opacity-0"
                    }
                `}
            >
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
                    {isAuthenticated ? (
                        <div className="space-y-4">

                            {/* Mobile Profile */}
                            <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/30 p-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                                    {initials || (
                                        <User className="h-5 w-5" />
                                    )}
                                </div>

                                <div className="min-w-0">
                                    <p className="truncate font-semibold">
                                        {fullName}
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        HealthMate User
                                    </p>
                                </div>
                            </div>

                            {/* Mobile Navigation */}
                            <div className="space-y-1">
                                {renderNavLinks(true)}
                            </div>

                            {/* Mobile Logout */}
                            <Button
                                type="button"
                                variant="outline"
                                disabled={loggingOut}
                                onClick={handleLogout}
                                className="
                                    w-full gap-2 rounded-lg
                                    border-red-200
                                    text-red-600
                                    transition-colors
                                    hover:bg-red-50
                                    hover:text-red-700
                                    dark:border-red-900/50
                                    dark:hover:bg-red-950/20
                                "
                            >
                                <LogOut className="h-4 w-4" />

                                {loggingOut
                                    ? "Logging out..."
                                    : "Logout"}
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-3">

                            {/* Login */}
                            <Link
                                href="/auth"
                                onClick={() => setOpen(false)}
                            >
                                <Button
                                    variant="outline"
                                    className="w-full gap-2 rounded-lg"
                                >
                                    <LogIn className="h-4 w-4" />
                                    Login
                                </Button>
                            </Link>

                            {/* Register */}
                            <Link
                                href="/auth"
                                onClick={() => setOpen(false)}
                            >
                                <Button className="w-full gap-2 rounded-lg">
                                    <UserPlus className="h-4 w-4" />
                                    Register
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
