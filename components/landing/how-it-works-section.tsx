"use client"

import { motion } from "framer-motion"
import { ArrowRight, MapPin, Package, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Sign Up & Get Your Address",
      description: "Create an account and receive your personal US shipping address.",
      icon: MapPin,
      color: "from-blue-500 to-cyan-500",
      animation: {
        initial: { x: -50, opacity: 0 },
        whileInView: { x: 0, opacity: 1 },
        transition: { duration: 0.5, delay: 0.1 },
      },
    },
    {
      step: "02",
      title: "Shop & Ship to Your US Address",
      description: "Shop at any US store and use your Shipexx address at checkout.",
      icon: Package,
      color: "from-cyan-500 to-teal-500",
      animation: {
        initial: { y: 50, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        transition: { duration: 0.5, delay: 0.2 },
      },
    },
    {
      step: "03",
      title: "We Ship to Your Door",
      description: "We receive, process, and ship your packages to your international address.",
      icon: Truck,
      color: "from-teal-500 to-green-500",
      animation: {
        initial: { x: 50, opacity: 0 },
        whileInView: { x: 0, opacity: 1 },
        transition: { duration: 0.5, delay: 0.3 },
      },
    },
  ]

  return (
    <section
      id="how-it-works"
      className="relative py-20 md:py-32 bg-gradient-to-b from-slate-900 to-blue-950 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMiAyaDF2MWgtMXYtMXptLTItMmgxdjFoLTF2LTF6bTggMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMi0yaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0xMC02aDFWMjNoLTF2LTF6bS0yIDBoMVYyM2gtMXYtMXptLTIgMGgxVjIzaC0xdi0xem0tMiAwaDFWMjNoLTF2LTF6bS0yIDBoMVYyM2gtMXYtMXptLTIgMGgxVjIzaC0xdi0xem0tMiAwaDFWMjNoLTF2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500/5 to-cyan-500/5"
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

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <div className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 border border-white/20 backdrop-blur-sm">
              <span className="text-blue-400">🔄</span> Simple 3-Step Process
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
          >
            How Shipexx Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            Shipping internationally has never been easier. Just follow these simple steps.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={step.animation.initial}
              whileInView={step.animation.whileInView}
              viewport={{ once: true }}
              transition={step.animation.transition}
              className="relative z-10"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 h-full relative overflow-hidden group hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-2">
                {/* Animated background gradient */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${step.color.split(" ")[0].replace("from-", "")}, ${step.color.split(" ")[1].replace("to-", "")})`,
                  }}
                />

                <div className="text-center pt-2 pb-2">
                  <div
                    className="w-20 h-20 rounded-full bg-gradient-to-r mx-auto mb-6 flex items-center justify-center"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${step.color.split(" ")[0].replace("from-", "")}, ${step.color.split(" ")[1].replace("to-", "")})`,
                    }}
                  >
                    <div className="w-16 h-16 rounded-full bg-blue-950 flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-500">
                    {step.step}
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-300 transition-colors">{step.title}</h3>
                  <p className="text-white/70">{step.description}</p>
                </div>

                {/* Bottom border effect */}
                <div
                  className="absolute bottom-0 left-0 w-0 h-1 group-hover:w-full transition-all duration-500 ease-out"
                  style={{
                    background: `linear-gradient(to right, ${step.color.split(" ")[0].replace("from-", "")}, ${step.color.split(" ")[1].replace("to-", "")})`,
                  }}
                />

                {/* Animated arrow for desktop */}
                {index < 2 && (
                  <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 hidden md:block z-30">
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <ArrowRight className="w-8 h-8 text-cyan-500" />
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 group relative overflow-hidden"
            asChild
          >
            <Link href="/register">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center">
                Get Your US Address Now
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </Button>
        </motion.div>

        {/* Visual explanation */}
        {/*  <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-20 relative max-w-5xl mx-auto"
        >
          <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-cyan-500/5 opacity-0" />

            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-6 text-center">How Your Package Travels With Shipexx</h3>

              <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
                <div className="flex-1 bg-white/5 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-3 flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-medium mb-2">US Retailer</h4>
                  <p className="text-sm text-white/70">Your items are purchased and shipped to your US address</p>
                </div>

                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="text-cyan-500"
                >
                  <ArrowRight className="w-6 h-6 md:rotate-0 rotate-90" />
                </motion.div>

                <div className="flex-1 bg-white/5 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 mx-auto mb-3 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-medium mb-2">Shipexx Warehouse</h4>
                  <p className="text-sm text-white/70">
                    We receive, inspect, and prepare your package for international shipping
                  </p>
                </div>

                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="text-cyan-500"
                >
                  <ArrowRight className="w-6 h-6 md:rotate-0 rotate-90" />
                </motion.div>

                <div className="flex-1 bg-white/5 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-green-500 mx-auto mb-3 flex items-center justify-center">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-medium mb-2">Your Doorstep</h4>
                  <p className="text-sm text-white/70">Your package is delivered to your international address</p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white/5 p-3 rounded-lg">
                  <div className="text-white/60">Average Transit Time</div>
                  <div className="font-medium">5-7 business days</div>
                </div>
                <div className="bg-white/5 p-3 rounded-lg">
                  <div className="text-white/60">Countries Served</div>
                  <div className="font-medium">220+ worldwide</div>
                </div>
                <div className="bg-white/5 p-3 rounded-lg">
                  <div className="text-white/60">Satisfaction Rate</div>
                  <div className="font-medium">99.7% of shipments</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  )
}
