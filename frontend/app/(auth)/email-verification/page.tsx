"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import AuthLayout from "../layout";
import EmailVerification from "@/components/verification/EmailVerification";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EmailVerificationPage() {
    const router = useRouter();
    const { emailVerificationAllowed } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!emailVerificationAllowed) {
            router.replace("/auth");
        }
    }, [emailVerificationAllowed, router]);

    if (!emailVerificationAllowed) {
        return null;
    }

    return (
        <AuthLayout>
            <EmailVerification />
        </AuthLayout>
    );
}
