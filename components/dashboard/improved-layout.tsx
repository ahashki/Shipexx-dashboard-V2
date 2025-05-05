"use client"

import type React from "react"

import { useState } from "react"
import { ImprovedSidebar } from "@/components/dashboard/improved-sidebar"
import { Header } from "@/components/dashboard/header"
import { useMobile } from "@/hooks/use-mobile"
import { useUser } from "@/contexts/user-context"

interface ImprovedLayoutProps {
  children: React.ReactNode
  username?: string
  avatarUrl?: string
}

export function ImprovedLayout({ children, username, avatarUrl }: ImprovedLayoutProps) {
  const isMobile = useMobile()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, isLoading } = useUser()

  // Use provided username/avatar or fall back to user context
  const displayName = username || user?.name || "User"
  const displayAvatar = avatarUrl || user?.avatarUrl

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar for desktop */}
      {!isMobile && <ImprovedSidebar username={displayName} avatarUrl={displayAvatar} defaultCollapsed={false} />}

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
          <ImprovedSidebar username={displayName} avatarUrl={displayAvatar} defaultCollapsed={false} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          username={displayName}
          avatarUrl={displayAvatar}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          showMenuButton={isMobile}
        />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  )
}
