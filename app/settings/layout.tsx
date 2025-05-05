import type React from "react"
import { ImprovedLayout } from "@/components/dashboard/improved-layout"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // In a real application, you would fetch the user data from your auth provider
  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  }

  return (
    <ImprovedLayout username={user.name} avatarUrl={user.avatarUrl}>
      {children}
    </ImprovedLayout>
  )
}
