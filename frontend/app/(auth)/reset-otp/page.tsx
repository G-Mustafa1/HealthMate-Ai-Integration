"use client";
import React, { useEffect } from 'react'
import AuthLayout from '../layout'
import OtpVerification from '@/components/verification/OtpVerification'
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const ResetOtp = () => {
  const router = useRouter();
  const { resetOtpAllowed } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!resetOtpAllowed) {
      router.replace("/auth");
    }
  }, [resetOtpAllowed, router]);

  if (!resetOtpAllowed) {
    return null;
  }

  return (
    <AuthLayout>
      <OtpVerification />
    </AuthLayout>
  )
}

export default ResetOtp