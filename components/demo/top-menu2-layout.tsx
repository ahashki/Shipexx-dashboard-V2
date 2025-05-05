"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Package,
  Wallet,
  Calculator,
  User,
  Settings,
  Search,
  Bell,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  Map,
  BarChart2,
  MapPin,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const navigationItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
    color: "text-blue-500",
    megaMenu: [
      {
        title: "Overview",
        items: [
          { name: "Main Dashboard", href: "/dashboard", icon: LayoutDashboard },
          { name: "Analytics", href: "/analytics", icon: BarChart2 },
          { name: "Reports", href: "/reports", icon: BarChart2 },
        ],
      },
      {
        title: "Quick Actions",
        items: [
          { name: "Request Shipping", href: "/dashboard?action=request", icon: Package },
          { name: "Add Funds", href: "/checkout/add-funds", icon: Wallet },
          { name: "Track Package", href: "/tracking", icon: Map },
        ],
      },
    ],
  },
  {
    name: "Orders",
    href: "/orders",
    icon: Package,
    color: "text-purple-500",
    megaMenu: [
      {
        title: "Manage Orders",
        items: [
          { name: "All Orders", href: "/orders", icon: Package },
          { name: "Pending Orders", href: "/orders?status=pending", icon: Package },
          { name: "Completed Orders", href: "/orders?status=completed", icon: Package },
        ],
      },
      {
        title: "Order Actions",
        items: [
          { name: "Create Order", href: "/orders/create", icon: Package },
          { name: "Bulk Actions", href: "/orders/bulk", icon: Package },
          { name: "Order Templates", href: "/orders/templates", icon: Package },
        ],
      },
    ],
  },
  {
    name: "Wallet",
    href: "/wallet",
    icon: Wallet,
    color: "text-green-500",
    megaMenu: [
      {
        title: "Finances",
        items: [
          { name: "Wallet Overview", href: "/wallet", icon: Wallet },
          { name: "Transaction History", href: "/wallet/transactions", icon: Wallet },
          { name: "Add Funds", href: "/checkout/add-funds", icon: Wallet },
        ],
      },
      {
        title: "Payment Methods",
        items: [
          { name: "Manage Cards", href: "/wallet/payment-methods", icon: Wallet },
          { name: "Billing Address", href: "/wallet/billing", icon: MapPin },
          { name: "Invoices", href: "/wallet/invoices", icon: Wallet },
        ],
      },
    ],
  },
  {
    name: "Estimates",
    href: "/estimates",
    icon: Calculator,
    color: "text-yellow-500",
    megaMenu: [
      {
        title: "Shipping Estimates",
        items: [
          { name: "Calculate Shipping", href: "/estimates", icon: Calculator },
          { name: "Saved Estimates", href: "/estimates/saved", icon: Calculator },
          { name: "Compare Rates", href: "/estimates/compare", icon: Calculator },
        ],
      },
    ],
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
    color: "text-red-500",
    megaMenu: [
      {
        title: "Your Account",
        items: [
          { name: "Profile Overview", href: "/profile", icon: User },
          { name: "Account Security", href: "/profile/security", icon: User },
          { name: "Preferences", href: "/profile/preferences", icon: User },
        ],
      },
      {
        title: "Addresses",
        items: [
          { name: "Shipping Addresses", href: "/addresses", icon: MapPin },
          { name: "Add New Address", href: "/addresses/new", icon: MapPin },
        ],
      },
    ],
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    color: "text-indigo-500",
    megaMenu: [
      {
        title: "App Settings",
        items: [
          { name: "General Settings", href: "/settings", icon: Settings },
          { name: "Notifications", href: "/notifications", icon: Bell },
          { name: "Appearance", href: "/settings/appearance", icon: Settings },
        ],
      },
      {
        title: "Support",
        items: [
          { name: "Help Center", href: "/help", icon: MessageSquare },
          { name: "Contact Support", href: "/support", icon: MessageSquare },
          { name: "FAQs", href: "/faqs", icon: MessageSquare },
        ],
      },
    ],
  },
]

const TopMenu2Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
    // Implement search functionality
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header with Mega Menu */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-white",
        )}
      >
        <div className="container mx-auto">
          {/* Top Bar */}
          <div className="flex items-center justify-between h-16 px-4">
            {/* Logo and Mobile Menu */}
            <div className="flex items-center">
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] sm:w-[350px]">
                  <div className="py-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold">Shipexx</h2>
                      <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {navigationItems.map((item) => (
                        <div key={item.name} className="py-1">
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center px-3 py-2 rounded-md text-sm font-medium",
                              pathname === item.href ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100",
                            )}
                          >
                            <item.icon className={cn("h-5 w-5 mr-3", item.color)} />
                            {item.name}
                          </Link>
                          {item.megaMenu && (
                            <div className="ml-8 mt-1 space-y-1">
                              {item.megaMenu.map((section) => (
                                <div key={section.title} className="mb-2">
                                  <p className="text-xs font-semibold text-gray-500 px-3 py-1">{section.title}</p>
                                  {section.items.map((subItem) => (
                                    <Link
                                      key={subItem.name}
                                      href={subItem.href}
                                      className={cn(
                                        "flex items-center px-3 py-1.5 rounded-md text-sm",
                                        pathname === subItem.href
                                          ? "bg-primary/10 text-primary"
                                          : "text-gray-600 hover:bg-gray-100",
                                      )}
                                    >
                                      <subItem.icon className="h-4 w-4 mr-2" />
                                      {subItem.name}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Link href="/dashboard" className="flex items-center">
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Shipexx
                </span>
              </Link>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search orders, tracking numbers..."
                    className="pl-10 pr-4 py-2 w-full bg-gray-100 border-0 focus-visible:ring-1"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" className="text-gray-700">
                <Bell className="h-5 w-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-gray-500">john.doe@example.com</p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/login">Logout</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Main Navigation - Desktop */}
          <nav className="hidden lg:block border-t">
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="w-full h-12 bg-transparent justify-start rounded-none p-0 gap-1">
                {navigationItems.map((item) => (
                  <TabsTrigger
                    key={item.name}
                    value={item.name.toLowerCase()}
                    className={cn(
                      "h-full data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 relative group",
                      pathname.startsWith(item.href)
                        ? "data-[state=active]:border-b-2 data-[state=active]:border-primary"
                        : "",
                    )}
                    onMouseEnter={() => setActiveMegaMenu(item.name)}
                    onMouseLeave={() => setActiveMegaMenu(null)}
                    onClick={() => (window.location.href = item.href)}
                  >
                    <div className="flex items-center space-x-1">
                      <item.icon className={cn("h-4 w-4", item.color)} />
                      <span>{item.name}</span>
                      {item.megaMenu && <ChevronDown className="h-3 w-3 ml-1 opacity-60" />}
                    </div>

                    {/* Mega Menu Panel */}
                    {item.megaMenu && (
                      <div
                        className={cn(
                          "absolute top-full left-0 w-screen bg-white shadow-lg rounded-b-lg p-4 grid grid-cols-2 gap-6",
                          "opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200",
                          activeMegaMenu === item.name ? "opacity-100 visible" : "",
                        )}
                        style={{ maxWidth: "800px", transform: "translateX(-30%)" }}
                      >
                        {item.megaMenu.map((section) => (
                          <div key={section.title} className="space-y-2">
                            <h3 className="text-sm font-semibold text-gray-500">{section.title}</h3>
                            <ul className="space-y-1">
                              {section.items.map((subItem) => (
                                <li key={subItem.name}>
                                  <Link
                                    href={subItem.href}
                                    className={cn(
                                      "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
                                      pathname === subItem.href
                                        ? "bg-primary/10 text-primary"
                                        : "text-gray-700 hover:bg-gray-100",
                                    )}
                                  >
                                    <subItem.icon className="h-4 w-4 mr-2" />
                                    {subItem.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </nav>
        </div>
      </header>

      {/* Search Bar - Mobile */}
      <div className="lg:hidden p-2 bg-white border-t border-b">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full bg-gray-100 border-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto py-6 px-4">{children}</main>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-md z-40">
        <div className="grid grid-cols-5 h-16">
          {navigationItems.slice(0, 5).map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center",
                pathname === item.href ? "text-primary" : "text-gray-500",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TopMenu2Layout
