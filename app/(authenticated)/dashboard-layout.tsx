"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ImprovedSidebar } from "@/components/dashboard/improved-sidebar"
import { Header } from "@/components/dashboard/header"
import { useMobile } from "@/hooks/use-mobile"
import { usePathname } from "next/navigation"

interface DashboardLayoutProps {
  children: React.ReactNode
  username?: string
  avatarUrl?: string
}

export function DashboardLayout({
  children,
  username = "Alex Johnson",
  avatarUrl = "/placeholder.svg?height=40&width=40",
}: DashboardLayoutProps) {
  const isMobile = useMobile()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile sidebar when route changes
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false)
    }
  }, [pathname, isMobile, sidebarOpen])

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar for desktop */}
      {!isMobile && (
        <ImprovedSidebar username={username} avatarUrl={avatarUrl} defaultCollapsed={false} activePath={pathname} />
      )}

      {/* Mobile sidebar overlay */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Mobile sidebar */}
      {isMobile && (
        <div
          className={`fixed inset-y-0 left-0 z-50 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <ImprovedSidebar username={username} avatarUrl={avatarUrl} defaultCollapsed={false} activePath={pathname} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          username={username}
          avatarUrl={avatarUrl}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          showMenuButton={isMobile}
        />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  )
}
