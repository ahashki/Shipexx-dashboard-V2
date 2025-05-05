import type { ReactNode } from "react"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar" // Using the shadcn sidebar [^1]
import { User, Shield, Bell, CreditCard, Globe, HelpCircle, Settings } from "lucide-react"

interface SettingsLayoutProps {
  children: ReactNode
  activeSection: string
}

export function SettingsLayout({ children, activeSection }: SettingsLayoutProps) {
  const menuItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security & Privacy", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
    { id: "preferences", label: "Preferences", icon: Settings },
    { id: "language", label: "Language & Region", icon: Globe },
    { id: "help", label: "Help & Support", icon: HelpCircle },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader>
            <h2 className="text-xl font-bold px-4 py-2">Settings</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild isActive={activeSection === item.id} tooltip={item.label}>
                    <a href={`/settings/${item.id}`}>
                      <item.icon />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </SidebarProvider>
  )
}
