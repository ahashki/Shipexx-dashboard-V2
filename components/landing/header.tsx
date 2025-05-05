"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Truck, Menu, X } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Truck className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Shipexx</span>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#features" className="text-sm font-medium hover:text-primary">
            Features
          </Link>
          <Link href="/#how-it-works" className="text-sm font-medium hover:text-primary">
            How It Works
          </Link>
          <Link href="/#pricing" className="text-sm font-medium hover:text-primary">
            Pricing
          </Link>
          <Link href="/#testimonials" className="text-sm font-medium hover:text-primary">
            Testimonials
          </Link>
        </nav>

        {/* Desktop auth buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" passHref>
            <Button variant="ghost">Log In</Button>
          </Link>
          <Link href="/register" passHref>
            <Button>Sign Up</Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 px-4 border-t">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/#features"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/#pricing"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/#testimonials"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <div className="pt-4 flex flex-col space-y-2">
              <Link href="/login" passHref>
                <Button variant="outline" className="w-full">
                  Log In
                </Button>
              </Link>
              <Link href="/register" passHref>
                <Button className="w-full">Sign Up</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
