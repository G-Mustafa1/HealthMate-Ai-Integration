// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";

// import { HeartPulse } from "lucide-react";

// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// import { AppDispatch, RootState } from "@/redux/store";
// import { getUser } from "@/redux/features/auth/authThunks";

// export default function ProtectedLayout({
//     children,
// }: Readonly<{
//     children: React.ReactNode;
// }>) {
//     const router = useRouter();
//     const dispatch = useDispatch<AppDispatch>();

//     const {
//         user,
//         authChecked,
//         loading,
//     } = useSelector((state: RootState) => state.auth);

//     useEffect(() => {
//         if (!authChecked) {
//             dispatch(getUser());
//         }
//     }, [authChecked, dispatch]);

//     useEffect(() => {
//         if (authChecked && !user) {
//             router.replace("/auth");
//         }
//     }, [authChecked, user, router]);

//     if (!authChecked || loading) {
//         return (
//             <main className="flex min-h-screen items-center justify-center bg-background">
//                 <div className="flex flex-col items-center text-center">
//                     <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20">
//                         <HeartPulse className="h-7 w-7 animate-pulse text-primary-foreground" />
//                     </div>

//                     <h2 className="text-lg font-semibold">
//                         Checking your account
//                     </h2>

//                     <p className="mt-1 text-sm text-muted-foreground">
//                         Please wait a moment...
//                     </p>
//                 </div>
//             </main>
//         );
//     }

//     if (!user) {
//         return null;
//     }

//     return (
//         <div className="flex min-h-screen flex-col">
//             <Navbar />

//             <main className="flex-1">
//                 {children}
//             </main>

//             <Footer />
//         </div>
//     );
// }

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { HeartPulse } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { AppDispatch, RootState } from "@/redux/store";
import { getUser } from "@/redux/features/auth/authThunks";

export default function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const {
        user,
        authChecked,
        loading,
    } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!authChecked) {
            dispatch(getUser());
        }
    }, [authChecked, dispatch]);

    useEffect(() => {
        if (authChecked && !user) {
            router.replace("/auth");
        }
    }, [authChecked, user, router]);

    if (!authChecked || loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-background">
                <div className="flex flex-col items-center text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20">
                        <HeartPulse className="h-7 w-7 animate-pulse text-primary-foreground" />
                    </div>

                    <h2 className="text-lg font-semibold">
                        Checking your account
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Please wait a moment...
                    </p>
                </div>
            </main>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                {children}
            </main>

            <Footer />
        </div>
    );
}
