"use client"

import { motion } from "framer-motion"
import { ArrowRight, Globe, ShieldCheck, CreditCard, Package, Clock, MapPin } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Globe,
      title: "Global Reach",
      description: "Ship to over 220 countries and territories worldwide with reliable tracking.",
      color: "from-blue-500 to-cyan-500",
      delay: 0,
    },
    {
      icon: ShieldCheck,
      title: "Secure & Protected",
      description: "Your packages are fully insured and protected against loss or damage.",
      color: "from-green-500 to-emerald-500",
      delay: 0.1,
    },
    {
      icon: CreditCard,
      title: "Transparent Pricing",
      description: "No hidden fees. Pay only for what you ship with clear, upfront pricing.",
      color: "from-amber-500 to-orange-500",
      delay: 0.2,
    },
    {
      icon: Package,
      title: "Package Consolidation",
      description: "Combine multiple purchases into one shipment to save on shipping costs.",
      color: "from-indigo-500 to-blue-500",
      delay: 0.3,
    },
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Express shipping options available for when you need your items quickly.",
      color: "from-rose-500 to-pink-500",
      delay: 0.4,
    },
    {
      icon: MapPin,
      title: "Virtual Mailbox",
      description: "Get a US address to shop from stores that don't ship internationally.",
      color: "from-violet-500 to-purple-500",
      delay: 0.5,
    },
  ]

  return (
    <section id="features" className="relative py-20 md:py-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-40"></div>
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 rounded-full bg-blue-500/5"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-cyan-500/5"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
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
              <span className="text-blue-400">✨</span> Unmatched Benefits
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
          >
            Why Choose Shipexx
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            We make international shipping simple, affordable, and reliable.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: feature.delay }}
              className="relative group"
            >
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-2">
                {/* Background gradient */}
                <div
                  className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{
                    backgroundImage: `linear-gradient(to bottom right, ${feature.color.split(" ")[0].replace("from-", "")}, ${feature.color.split(" ")[1].replace("to-", "")})`,
                  }}
                />

                <div
                  className={`w-16 h-16 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-300 transition-colors">{feature.title}</h3>
                <p className="text-white/70 mb-4">{feature.description}</p>

                <div className="flex items-center text-sm text-white/50 group-hover:text-white/70 transition-colors">
                  <span>Learn more</span>
                  <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Hover effect */}
                <div
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${feature.color.split(" ")[0].replace("from-", "")}, ${feature.color.split(" ")[1].replace("to-", "")})`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 relative"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-cyan-500/5" />

            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-8 text-center">Trusted by Thousands Worldwide</h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                    220+
                  </div>
                  <div className="text-white/70">Countries Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                    1M+
                  </div>
                  <div className="text-white/70">Packages Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                    99.7%
                  </div>
                  <div className="text-white/70">Delivery Success</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                    24/7
                  </div>
                  <div className="text-white/70">Customer Support</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
