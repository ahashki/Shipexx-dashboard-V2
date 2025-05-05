import type React from "react"
import { ImprovedLayout } from "@/components/dashboard/improved-layout"
import { AuthProvider } from '@/app/auth/AuthContext'
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // In a real application, you would fetch the user data from your auth provider
  const user = {
    name: "Anas Alhashki",
    email: "Ahashki@example.com",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  }

  return (
    <ImprovedLayout username={user.name} avatarUrl={user.avatarUrl}>
      {children}
    </ImprovedLayout>
  )
}
