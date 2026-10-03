"use client";
import React, { useEffect } from 'react'
import AuthLayout from '../layout'
import ChangePassword from '@/components/change-password/ChangePassword'
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const ResetPassword = () => {
    const router = useRouter();
    const { resetPasswordAllowed } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!resetPasswordAllowed) {
            router.replace("/auth");
        }
    }, [resetPasswordAllowed, router]);

    if (!resetPasswordAllowed) {
        return null;
    }
    return (
        <AuthLayout>
            <ChangePassword />
        </AuthLayout>
    )
}

export default ResetPassword