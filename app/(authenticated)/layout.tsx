import type React from "react"
import { UserProvider } from "@/contexts/user-context"
import { ThemeProvider } from "@/components/theme-provider"

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <UserProvider>{children}</UserProvider>
    </ThemeProvider>
  )
}
