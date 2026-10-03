import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import AuthLayout from '../layout'
import ForgotPassword from '@/components/forgot-password/ForgotPassword'

const Forgot = () => {
    return (
        <AuthLayout>
            <ForgotPassword />
        </AuthLayout>
    )
}

export default Forgot