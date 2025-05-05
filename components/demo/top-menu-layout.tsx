"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Package,
  Wallet,
  Calculator,
  User,
  Settings,
  Map,
  BarChart2,
  MapPin,
  Bell,
  X,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Header } from "@/components/dashboard/header"
import { cn } from "@/lib/utils"

interface TopMenuLayoutProps {
  children: React.ReactNode
}

export function TopMenuLayout({ children }: TopMenuLayoutProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigationItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Orders", href: "/orders", icon: Package },
    { name: "Wallet", href: "/wallet", icon: Wallet },
    { name: "Estimates", href: "/estimates", icon: Calculator },
    { name: "Tracking", href: "/tracking", icon: Map },
    { name: "Analytics", href: "/analytics", icon: BarChart2 },
    { name: "Addresses", href: "/addresses", icon: MapPin },
    { name: "Notifications", href: "/notifications", icon: Bell },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Header */}
      <Header showMenuButton={true} onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />

      {/* Top Navigation */}
      <div className="border-b bg-background">
        <div className="container mx-auto px-4">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between h-14">
            <nav className="flex items-center space-x-1 overflow-x-auto pb-1 pt-1">
              {navigationItems.map((item) => {
                const isActive = pathname.includes(item.href)
                const Icon = item.icon

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent",
                    )}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Mobile Navigation Dropdown */}
          <div className="md:hidden flex items-center h-14">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <span>Navigation</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {navigationItems.map((item) => {
                  const isActive = pathname.includes(item.href)
                  const Icon = item.icon

                  return (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link
                        href={item.href}
                        className={cn("flex items-center w-full", isActive ? "text-primary" : "text-muted-foreground")}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-full bg-background p-6 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold">Navigation</h2>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="grid gap-2">
              {navigationItems.map((item) => {
                const isActive = pathname.includes(item.href)
                const Icon = item.icon

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center px-4 py-3 text-base font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent",
                    )}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-6xl">{children}</div>
      </main>
    </div>
  )
}
