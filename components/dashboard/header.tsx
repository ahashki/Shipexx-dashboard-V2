"use client"
import { Search, Menu, Globe } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { NotificationCenter } from "@/components/dashboard/notification-center"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface HeaderProps {
  username?: string
  avatarUrl?: string
  onMenuClick?: () => void
  showMenuButton?: boolean
}

export function Header({ username = "User", avatarUrl, onMenuClick, showMenuButton = false }: HeaderProps) {
  const router = useRouter()
  const [language, setLanguage] = useState("English")

  const languages = [
    { name: "English", code: "en" },
    { name: "Spanish", code: "es" },
    { name: "French", code: "fr" },
    { name: "German", code: "de" },
    { name: "Chinese", code: "zh" },
    { name: "Japanese", code: "ja" },
    { name: "Arabic", code: "ar" },
  ]

  return (
    <header className="border-b sticky top-0 z-40 bg-background">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {showMenuButton && (
            <Button variant="ghost" size="icon" onClick={onMenuClick} className="mr-2">
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <NotificationCenter onSettingsClick={() => router.push("/settings/notifications")} />
{/*
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Globe className="h-4 w-4 mr-1" />
                <span className="text-sm">{language}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.name)}
                  className={language === lang.name ? "bg-muted" : ""}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </div>
    </header>
  )
}
