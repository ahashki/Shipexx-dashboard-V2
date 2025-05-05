"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTheme } from "next-themes"
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Package,
  Wallet,
  Calculator,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Truck,
  LineChart,
  Bell,
  MapPin,
} from "lucide-react"

interface ImprovedSidebarProps {
  defaultCollapsed?: boolean
  username?: string
  avatarUrl?: string
  activePath?: string
}

export function ImprovedSidebar({
  defaultCollapsed = false,
  username = "User",
  avatarUrl,
  activePath = "",
}: ImprovedSidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const { theme, setTheme } = useTheme()

  // Load collapsed state from localStorage on mount
  useEffect(() => {
    const savedCollapsed = localStorage.getItem("sidebarCollapsed")
    if (savedCollapsed !== null) {
      setCollapsed(savedCollapsed === "true")
    }
  }, [])

  // Save collapsed state to localStorage
  const toggleCollapsed = () => {
    const newCollapsed = !collapsed
    setCollapsed(newCollapsed)
    localStorage.setItem("sidebarCollapsed", String(newCollapsed))
  }
{/*  
    { href: "/analytics", label: "Analytics", icon: LineChart },*/}
  const mainNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/orders", label: "Orders", icon: Package },
    { href: "/tracking", label: "Tracking", icon: Truck },
    { href: "/wallet", label: "Wallet", icon: Wallet },
    { href: "/estimates", label: "Estimates", icon: Calculator },
   
  ]

  const secondaryNavItems = [
    { href: "/profile", label: "Profile", icon: User },
 
    { href: "/notifications", label: "Notifications", icon: Bell },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  const isActive = (path: string) => {
    if (path === "/dashboard" && activePath === "/dashboard") {
      return true
    }
    // Handle exact matches for profile and other secondary nav items
    if (
      (path === "/profile" || path === "/addresses" || path === "/notifications" || path === "/settings") &&
      activePath === path
    ) {
      return true
    }
    return activePath.startsWith(path) && path !== "/dashboard"
  }

  return (
    <div
      className={cn(
        "h-screen bg-background border-r flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo and collapse button */}
      <div className="h-16 border-b flex items-center justify-between px-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <Truck className="h-6 w-6 text-primary flex-shrink-0" />
          {!collapsed && <span className="text-xl font-bold">Shipexx</span>}
        </div>
        <Button variant="ghost" size="icon" onClick={toggleCollapsed} className="h-8 w-8">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Main navigation */}
      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="space-y-1 px-2">
          <TooltipProvider>
            {mainNavItems.map((item) => (
              <Tooltip key={item.href} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    variant={isActive(item.href) ? "secondary" : "ghost"}
                    className={cn("w-full justify-start", collapsed && "justify-center px-2")}
                    asChild
                  >
                    <Link href={item.href}>
                      <item.icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")} />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </Button>
                </TooltipTrigger>
                {collapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>

        {/* Secondary navigation */}
        <div className="mt-6 pt-6 border-t mx-2">
          <nav className="space-y-1 px-2">
            <TooltipProvider>
              {secondaryNavItems.map((item) => (
                <Tooltip key={item.href} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive(item.href) ? "secondary" : "ghost"}
                      className={cn("w-full justify-start", collapsed && "justify-center px-2")}
                      asChild
                    >
                      <Link href={item.href}>
                        <item.icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")} />
                        {!collapsed && <span>{item.label}</span>}
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  {collapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
                </Tooltip>
              ))}
            </TooltipProvider>
          </nav>
        </div>
      </div>

      {/* User and help section */}
      <div className="border-t p-4">


        {/* User info and logout */}
        <div className={cn("flex items-center", collapsed ? "flex-col" : "justify-between")}>
          <div className={cn("flex items-center", collapsed ? "flex-col" : "gap-2")}>
            <Avatar className="h-8 w-8">
              <AvatarImage src={avatarUrl || "/placeholder.svg?height=32&width=32"} alt={username} />
              <AvatarFallback>{username.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            {!collapsed && <span className="text-sm font-medium">{username}</span>}
          </div>

          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size={collapsed ? "icon" : "default"}
                  className={cn(
                    "text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20",
                    collapsed ? "mt-4" : "",
                  )}
                >
                  <LogOut className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")} />
                  {!collapsed && <span>Sign Out</span>}
                </Button>
              </TooltipTrigger>
              {collapsed && <TooltipContent side="right">Sign Out</TooltipContent>}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}
