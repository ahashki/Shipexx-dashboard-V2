"use client"

import type React from "react"

import { motion, useTransform, useMotionValue, useSpring } from "framer-motion"
import { ArrowRight, Package, Globe, ShieldCheck, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useMobile } from "@/hooks/use-mobile"

interface HeroSectionProps {
  scrollToSection: (id: string) => void
}

export function HeroSection({ scrollToSection }: HeroSectionProps) {
  const isMobile = useMobile()

  // Mouse position for parallax effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 30 })

  // 3D card tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 15
    const rotateY = (centerX - x) / 15

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Floating packages */}
      <motion.div
        className="absolute w-16 h-16 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg"
        style={{
          x: useTransform(smoothMouseX, [0, window.innerWidth], [-20, 20]),
          y: useTransform(smoothMouseY, [0, window.innerHeight], [-20, 20]),
          rotate: useTransform(smoothMouseX, [0, window.innerWidth], [-5, 5]),
          left: "20%",
          top: "30%",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Package className="w-8 h-8 text-white" />
        </div>
      </motion.div>

      <motion.div
        className="absolute w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 shadow-lg"
        style={{
          x: useTransform(smoothMouseX, [0, window.innerWidth], [20, -20]),
          y: useTransform(smoothMouseY, [0, window.innerHeight], [20, -20]),
          rotate: useTransform(smoothMouseX, [0, window.innerWidth], [5, -5]),
          right: "25%",
          top: "25%",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Package className="w-6 h-6 text-white" />
        </div>
      </motion.div>

      <motion.div
        className="absolute w-14 h-14 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg"
        style={{
          x: useTransform(smoothMouseX, [0, window.innerWidth], [-15, 15]),
          y: useTransform(smoothMouseY, [0, window.innerHeight], [15, -15]),
          rotate: useTransform(smoothMouseX, [0, window.innerWidth], [-10, 10]),
          right: "20%",
          bottom: "30%",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Package className="w-7 h-7 text-white" />
        </div>
      </motion.div>

      <div className="container mx-auto px-6 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 inline-block"
        >
          <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 border border-white/20 backdrop-blur-sm">
            <span className="text-blue-400">🌎</span> International Shipping Made Easy
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-cyan-200"
        >
          Your Global Shipping
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Solution</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-10"
        >
          Shop from any US store and we'll ship it to your doorstep anywhere in the world. Save up to 70% on
          international shipping costs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 min-w-[180px] relative overflow-hidden group"
            asChild
          >
            <Link href="/register">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center">
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 min-w-[180px] group"
            onClick={() => scrollToSection("how-it-works")}
          >
            <span className="flex items-center">
              How It Works
              <ChevronDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </span>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-20 relative"
        >
          {/* 3D App Preview */}
          <div
            className="relative mx-auto max-w-4xl rounded-xl overflow-hidden shadow-2xl border border-white/10 transform perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 backdrop-blur-sm z-10 pointer-events-none" />
            <img
              src="/placeholder.svg?height=800&width=1200&text=Shipexx+Dashboard"
              alt="Shipexx Dashboard Interface"
              className="w-full h-auto"
            />

            {/* Interactive elements overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              <motion.div
                className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-blue-500/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute top-1/3 right-1/3 w-12 h-12 rounded-full bg-cyan-500/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
              <motion.div
                className="absolute bottom-1/4 right-1/4 w-20 h-20 rounded-full bg-green-500/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 2,
                }}
              />
            </div>
          </div>

          {/* Floating badges */}
          <motion.div
            className="absolute -left-4 top-1/4 bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20 shadow-xl"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.9, type: "spring" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xs font-semibold">Global Shipping</div>
                <div className="text-xs text-white/70">220+ countries</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute -right-4 top-1/3 bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20 shadow-xl"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.1, type: "spring" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center">
                <Package className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xs font-semibold">Package Tracking</div>
                <div className="text-xs text-white/70">Real-time updates</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute -left-4 bottom-1/4 bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20 shadow-xl"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.3, type: "spring" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xs font-semibold">Secure Shipping</div>
                <div className="text-xs text-white/70">Fully insured packages</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <button
            onClick={() => scrollToSection("features")}
            className="flex flex-col items-center text-white/50 hover:text-white transition-colors"
            aria-label="Scroll to features"
          >
            <span className="text-sm mb-2">Discover More</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
