import UserProfile from '@/components/user-profile/UserProfile'
import React from 'react'

const Profile = () => {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-linear-to-b from-background via-background to-muted/30 px-4 py-8 sm:px-6 lg:px-8">
      <UserProfile />
    </main>
  )
}

export default Profile