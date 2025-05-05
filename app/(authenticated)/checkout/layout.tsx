import type React from "react"
import { UserProvider } from "@/contexts/user-context"
import { ImprovedSidebar } from "@/components/dashboard/improved-sidebar"
import { Header } from "@/components/dashboard/header"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserProvider>
      <div className="min-h-screen bg-background flex">
        <ImprovedSidebar />
        <div className="flex-1">
          <Header />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </UserProvider>
  )
}
