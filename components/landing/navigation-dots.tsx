"use client"

import { cn } from "@/lib/utils"

interface NavigationDotsProps {
  navigationDots: Array<{ id: string; label: string }>
  activeSection: string
  scrollToSection: (id: string) => void
  isMobile: boolean
}

export default function NavigationDots({
  navigationDots,
  activeSection,
  scrollToSection,
  isMobile,
}: NavigationDotsProps) {
  if (isMobile) return null

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40">
      <div className="flex flex-col items-center space-y-6">
        {navigationDots.map((dot) => (
          <div key={dot.id} className="relative group">
            <button
              onClick={() => scrollToSection(dot.id)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                activeSection === dot.id ? "bg-white scale-125" : "bg-white/30 hover:bg-white/50",
              )}
              aria-label={`Navigate to ${dot.label}`}
            />
            <span className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm text-white/70">
              {dot.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
