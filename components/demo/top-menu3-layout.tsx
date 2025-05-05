"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  User,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  Home,
  Package,
  Wallet,
  Calculator,
  Map,
  BarChart2,
  Truck,
  LogOut,
  HelpCircle,
  Sun,
  Moon,
  Sparkles,
  Zap,
  ShieldCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Simulating framer-motion for the preview
const motionDiv = ({ children, ...props }) => <div {...props}>{children}</div>
const AnimatePresenceSimulated = ({ children }) => <>{children}</>

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home, color: "text-blue-500" },
  { name: "Orders", href: "/orders", icon: Package, color: "text-indigo-500" },
  { name: "Wallet", href: "/wallet", icon: Wallet, color: "text-green-500" },
  { name: "Estimates", href: "/estimates", icon: Calculator, color: "text-amber-500" },
  { name: "Tracking", href: "/tracking", icon: Truck, color: "text-purple-500" },
  { name: "Analytics", href: "/analytics", icon: BarChart2, color: "text-rose-500" },
  { name: "Addresses", href: "/addresses", icon: Map, color: "text-cyan-500" },
]

const TopMenu3Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeHover, setActiveHover] = useState(null)

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Check for dark mode preference
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark")
    setIsDarkMode(isDark)
  }, [])

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    document.documentElement.classList.toggle("dark", newMode)
  }

  // Function to get the base path for demo links
  const getDemoPath = (path: string) => {
    return `/demo/top-menu3${path}`
  }

  // Function to check if a nav item is active
  const isActive = (href: string) => {
    if (href === "/dashboard" && pathname === "/demo/top-menu3") return true
    return pathname.startsWith(href) || pathname.startsWith(`/demo/top-menu3${href}`)
  }

  // Sample notifications
  const notifications = [
    {
      id: 1,
      title: "New order received",
      description: "Order #12345 has been placed",
      time: "5 minutes ago",
      unread: true,
      icon: Package,
      color: "bg-blue-100 dark:bg-blue-900",
      iconColor: "text-blue-500",
    },
    {
      id: 2,
      title: "Package delivered",
      description: "Order #10987 has been delivered",
      time: "2 hours ago",
      unread: true,
      icon: Truck,
      color: "bg-green-100 dark:bg-green-900",
      iconColor: "text-green-500",
    },
    {
      id: 3,
      title: "Payment received",
      description: "$250.00 has been added to your wallet",
      time: "Yesterday",
      unread: true,
      icon: Wallet,
      color: "bg-purple-100 dark:bg-purple-900",
      iconColor: "text-purple-500",
    },
    {
      id: 4,
      title: "New feature available",
      description: "Check out our new tracking system",
      time: "3 days ago",
      unread: false,
      icon: Sparkles,
      color: "bg-amber-100 dark:bg-amber-900",
      iconColor: "text-amber-500",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="relative">
          {/* Decorative gradient line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

          <div className="container flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Link href={getDemoPath("/dashboard")} className="flex items-center gap-2 group">
                <div className="relative w-8 h-8 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-600 group-hover:from-purple-500 group-hover:to-blue-600 transition-all duration-300">
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                    <Zap className="h-5 w-5" />
                  </div>
                </div>
                <span className="font-bold text-xl hidden md:inline-block group-hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300">
                  Shipexx
                </span>
              </Link>
            </div>

            {/* Search - Desktop */}
            <div
              className={cn(
                "absolute top-0 bottom-0 flex items-center transition-all duration-300 z-20",
                isSearchOpen
                  ? "left-[290px] right-[490px] opacity-100 translate-x-0"
                  : "left-[290px] w-0 opacity-0 translate-x-[-50px] pointer-events-none",
              )}
            >
              <div className="relative w-full px-2">
                <div className="absolute inset-0 bg-background/95 backdrop-blur-sm rounded-full -z-10 shadow-md"></div>

                {/* Search Icon */}
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                {/* Search Input */}
                <Input
                  placeholder="Search..."
                  className="pl-9 pr-12 h-9 w-full rounded-full border-blue-200 dark:border-blue-800 focus-visible:ring-blue-500"
                  onBlur={() => setIsSearchOpen(false)}
                  autoFocus={isSearchOpen}
                />

                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 rounded-full text-muted-foreground hover:text-foreground"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center space-x-1">
              <TooltipProvider>
                {navItems.map((item) => (
                  <Tooltip key={item.name}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "h-9 px-3 text-sm relative overflow-hidden transition-all duration-200",
                          isActive(item.href) ? "bg-accent text-accent-foreground" : "",
                          "hover:bg-transparent",
                        )}
                        asChild
                        onMouseEnter={() => setActiveHover(item.name)}
                        onMouseLeave={() => setActiveHover(null)}
                      >
                        <Link href={getDemoPath(item.href)} className="flex items-center gap-2">
                          <div
                            className={cn(
                              "relative",
                              activeHover === item.name || isActive(item.href) ? item.color : "text-muted-foreground",
                            )}
                          >
                            <item.icon className="h-4 w-4" />
                          </div>
                          <span
                            className={cn(
                              activeHover === item.name || isActive(item.href)
                                ? "text-foreground"
                                : "text-muted-foreground",
                            )}
                          >
                            {item.name}
                          </span>
                          {activeHover === item.name && !isActive(item.href) && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                          )}
                          {isActive(item.href) && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                          )}
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-100 dark:border-blue-800"
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className={cn("h-4 w-4", item.color)} />
                        <span>Navigate to {item.name}</span>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Search trigger */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors relative z-30"
                      onClick={() => setIsSearchOpen(true)}
                    >
                      <Search className="h-5 w-5 text-muted-foreground hover:text-blue-500 transition-colors" />
                      <span className="sr-only">Search</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <span>Search</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Theme toggle */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full hover:bg-amber-50 dark:hover:bg-amber-900 transition-colors"
                      onClick={toggleDarkMode}
                    >
                      {isDarkMode ? (
                        <Sun className="h-5 w-5 text-amber-500" />
                      ) : (
                        <Moon className="h-5 w-5 text-muted-foreground hover:text-amber-500 transition-colors" />
                      )}
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <span>Toggle {isDarkMode ? "light" : "dark"} mode</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Notifications */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenu open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900 transition-colors relative"
                        >
                          <Bell className="h-5 w-5 text-muted-foreground hover:text-purple-500 transition-colors" />
                          {notificationCount > 0 && (
                            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-500 text-[10px] font-medium text-white">
                              {notificationCount}
                            </span>
                          )}
                          <span className="sr-only">Notifications</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-80 p-0 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">Notifications</h3>
                            <Badge variant="outline" className="text-xs border-white/30 text-white">
                              {notificationCount} new
                            </Badge>
                          </div>
                        </div>
                        <div className="max-h-[60vh] overflow-y-auto">
                          {notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={cn(
                                "p-4 border-b last:border-b-0 flex gap-3 hover:bg-muted/50 transition-colors cursor-pointer",
                                notification.unread ? "bg-blue-50/50 dark:bg-blue-950/50" : "",
                              )}
                              onClick={() => {
                                if (notification.unread) {
                                  setNotificationCount((prev) => prev - 1)
                                }
                              }}
                            >
                              <div
                                className={cn(
                                  "h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                                  notification.color,
                                )}
                              >
                                <notification.icon className={cn("h-5 w-5", notification.iconColor)} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <p className="font-medium text-sm">{notification.title}</p>
                                  {notification.unread && <div className="h-2 w-2 rounded-full bg-blue-500"></div>}
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2">{notification.description}</p>
                                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="p-2 border-t">
                          <Button variant="ghost" size="sm" className="w-full justify-center text-sm" asChild>
                            <Link href={getDemoPath("/notifications")}>View all notifications</Link>
                          </Button>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <span>Notifications</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* User dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 gap-2 px-2 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-full transition-colors"
                  >
                    <Avatar className="h-7 w-7 border-2 border-blue-200 dark:border-blue-800">
                      <AvatarImage src="https://media.licdn.com/dms/image/v2/D5603AQF1c8a1vAIGGw/profile-displayphoto-shrink_800_800/B56ZRElIwKHQAc-/0/1736317374303?e=1747872000&v=beta&t=D-cur2lRT0HW4JBgrcoeVB1C7n5dX3oEI7VsW-RpTzg" alt="User" />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline-block font-medium">Anas hashki</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-0 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-white/30">
                        <AvatarImage src="https://media.licdn.com/dms/image/v2/D5603AQF1c8a1vAIGGw/profile-displayphoto-shrink_800_800/B56ZRElIwKHQAc-/0/1736317374303?e=1747872000&v=beta&t=D-cur2lRT0HW4JBgrcoeVB1C7n5dX3oEI7VsW-RpTzg" alt="User" />
                        <AvatarFallback className="bg-white/20 text-white">AH</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">Ahashki</p>
                        <p className="text-xs text-white/80">ahashki@shipexx.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <DropdownMenuItem asChild className="flex items-center gap-2 p-2 cursor-pointer rounded-md">
                      <Link href={getDemoPath("/profile")}>
                        <User className="h-4 w-4 text-blue-500" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="flex items-center gap-2 p-2 cursor-pointer rounded-md">
                      <Link href={getDemoPath("/settings")}>
                        <Settings className="h-4 w-4 text-purple-500" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="flex items-center gap-2 p-2 cursor-pointer rounded-md">
                      <Link href="#">
                        <ShieldCheck className="h-4 w-4 text-green-500" />
                        <span>Privacy & Security</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="flex items-center gap-2 p-2 cursor-pointer rounded-md">
                      <Link href="#">
                        <HelpCircle className="h-4 w-4 text-amber-500" />
                        <span>Help & Support</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center gap-2 p-2 cursor-pointer rounded-md text-destructive focus:text-destructive">
                      <LogOut className="h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 lg:hidden rounded-full hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
                  >
                    <Menu className="h-5 w-5 text-muted-foreground hover:text-blue-500 transition-colors" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72 sm:w-80 p-0">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="relative w-10 h-10 overflow-hidden rounded-full bg-white/20">
                        <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                          <Zap className="h-6 w-6" />
                        </div>
                      </div>
                      <span className="font-bold text-xl">Shipexx</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-white/30">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                        <AvatarFallback className="bg-white/20 text-white">JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">John Doe</p>
                        <p className="text-xs text-white/80">john.doe@example.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search..."
                        className="pl-9 w-full rounded-full border-blue-200 dark:border-blue-800"
                      />
                    </div>

                    <div className="space-y-1 py-2">
                      {navItems.map((item) => (
                        <Button
                          key={item.name}
                          variant={isActive(item.href) ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-start",
                            isActive(item.href) ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" : "",
                          )}
                          size="sm"
                          asChild
                        >
                          <Link href={getDemoPath(item.href)}>
                            <item.icon
                              className={cn("h-4 w-4 mr-3", isActive(item.href) ? item.color : "text-muted-foreground")}
                            />
                            {item.name}
                          </Link>
                        </Button>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t">
                      <div className="space-y-1">
                        <Button variant="ghost" className="w-full justify-start" size="sm" asChild>
                          <Link href={getDemoPath("/profile")}>
                            <User className="h-4 w-4 mr-3 text-blue-500" />
                            Profile
                          </Link>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" size="sm" asChild>
                          <Link href={getDemoPath("/settings")}>
                            <Settings className="h-4 w-4 mr-3 text-purple-500" />
                            Settings
                          </Link>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" size="sm" asChild>
                          <Link href={getDemoPath("/notifications")}>
                            <Bell className="h-4 w-4 mr-3 text-pink-500" />
                            Notifications
                            {notificationCount > 0 && (
                              <Badge variant="destructive" className="ml-auto">
                                {notificationCount}
                              </Badge>
                            )}
                          </Link>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" size="sm" asChild>
                          <Link href="#">
                            <HelpCircle className="h-4 w-4 mr-3 text-amber-500" />
                            Help & Support
                          </Link>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-destructive" size="sm">
                          <LogOut className="h-4 w-4 mr-3" />
                          Log out
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container py-6">{children}</main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-14">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Shipexx. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-blue-500 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-blue-500 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-blue-500 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default TopMenu3Layout
