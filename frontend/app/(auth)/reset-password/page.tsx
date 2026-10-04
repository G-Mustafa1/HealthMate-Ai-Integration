"use client";
import { useEffect } from 'react'
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
        <ChangePassword />
    )
}

export default ResetPassword