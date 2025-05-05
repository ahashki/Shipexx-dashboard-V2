"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { User, MapPin, Shield, Bell, CreditCard, Activity, HelpCircle, LogOut } from "lucide-react"

interface ProfileSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function ProfileSidebar({ activeTab, onTabChange }: ProfileSidebarProps) {
  const navItems = [
    { id: "details", label: "Personal Details", icon: User },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "security", label: "Security", icon: Shield },
    { id: "preferences", label: "Preferences", icon: Bell },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
    { id: "activity", label: "Account Activity", icon: Activity },
  ]

  return (
    <div className="w-full md:w-64 md:sticky md:top-20 space-y-6">
      <div className="space-y-1">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "secondary" : "ghost"}
            className={cn("w-full justify-start", activeTab === item.id && "font-medium")}
            onClick={() => onTabChange(item.id)}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </div>

      <div className="pt-6 border-t space-y-1">
        <Button variant="ghost" className="w-full justify-start">
          <HelpCircle className="mr-2 h-4 w-4" />
          Help & Support
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
