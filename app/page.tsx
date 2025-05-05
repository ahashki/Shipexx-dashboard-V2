"use client"

import { useState, useEffect, useRef } from "react"
import { useMobile } from "@/hooks/use-mobile"
import { useMotionValue } from "framer-motion"

// Import components
import { Header } from "@/components/landing/header"
import NavigationDots from "@/components/landing/navigation-dots"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  const isMobile = useMobile()
  const [activeSection, setActiveSection] = useState("hero")

  // Mouse position for parallax effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Refs for sections
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const howItWorksRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const pricingRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  // Handle cursor effects
  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isMobile, mouseX, mouseY])

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight

      // Update active section based on scroll position
      const sections = [
        { ref: heroRef, id: "hero" },
        { ref: featuresRef, id: "features" },
        { ref: howItWorksRef, id: "how-it-works" },
        { ref: testimonialsRef, id: "testimonials" },
        { ref: pricingRef, id: "pricing" },
        { ref: ctaRef, id: "cta" },
      ]

      for (const section of sections) {
        if (!section.ref.current) continue
        const rect = section.ref.current.getBoundingClientRect()
        if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Navigation dots configuration
  const navigationDots = [
    { id: "hero", label: "Home" },
    { id: "features", label: "Features" },
    { id: "how-it-works", label: "How It Works" },
    { id: "testimonials", label: "Testimonials" },
    { id: "pricing", label: "Pricing" },
    { id: "cta", label: "Get Started" },
  ]

  // Scroll to section function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-950 via-indigo-950 to-slate-900 text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-transparent to-transparent opacity-40"></div>
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Header and Navigation */}
      <Header activeSection={activeSection} navigationDots={navigationDots} scrollToSection={scrollToSection} />

      <NavigationDots
        navigationDots={navigationDots}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        isMobile={isMobile}
      />

      {/* Main Content */}
      <main>
        <div ref={heroRef}>
          <HeroSection scrollToSection={scrollToSection} />
        </div>

        <div ref={featuresRef}>
          <FeaturesSection />
        </div>

        <div ref={howItWorksRef}>
          <HowItWorksSection />
        </div>

        <div ref={testimonialsRef}>
          <TestimonialsSection />
        </div>

        <div ref={pricingRef}>
          <PricingSection />
        </div>

        <div ref={ctaRef}>
          <CTASection />
        </div>
      </main>

      <Footer />
    </div>
  )
}
