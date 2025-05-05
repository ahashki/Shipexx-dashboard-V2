"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PricingSection() {
  const monthlyPlans = [
    {
      name: "Basic",
      price: "$9.99",
      description: "Perfect for occasional shoppers",
      features: [
        "US shipping address",
        "Package consolidation",
        "30-day storage",
        "Standard shipping rates",
        "Email support",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Premium",
      price: "$24.99",
      description: "Ideal for regular shoppers",
      features: [
        "Everything in Basic",
        "Priority processing",
        "60-day storage",
        "Discounted shipping rates",
        "Package photos",
        "24/7 support",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Business",
      price: "$99.99",
      description: "For high-volume shippers",
      features: [
        "Everything in Premium",
        "90-day storage",
        "Deeply discounted shipping",
        "Dedicated account manager",        
        "Custom packaging",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  const yearlyPlans = [
    {
      name: "Basic",
      price: "$95.90",
      description: "Perfect for occasional shoppers",
      features: [
        "US shipping address",
        "Package consolidation",
        "30-day storage",
        "Standard shipping rates",
        "Email support",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Premium",
      price: "$239.90",
      description: "Ideal for regular shoppers",
      features: [
        "Everything in Basic",
        "Priority processing",
        "60-day storage",
        "Discounted shipping rates",
        "Package photos",
        "24/7 support",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Business",
      price: "$999.90",
      description: "For high-volume shippers",
      features: [
        "Everything in Premium",
        "90-day storage",
        "Deeply discounted shipping",
        "Dedicated account manager",
        
        "Custom packaging",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="relative py-20 md:py-32 bg-gradient-to-b from-slate-900 to-blue-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            Choose the plan that fits your shipping needs. All plans include a 14-day free trial.
          </motion.p>
        </div>

        <Tabs defaultValue="monthly" className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-white/10">
              <TabsTrigger value="monthly" className="data-[state=active]:bg-blue-500">
                Monthly
              </TabsTrigger>
              <TabsTrigger value="yearly" className="data-[state=active]:bg-blue-500">
                Yearly (Save 20%)
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="monthly">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {monthlyPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className={cn(
                    "relative bg-white/5 backdrop-blur-sm border rounded-xl overflow-hidden group hover:bg-white/10 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1",
                    plan.popular ? "border-blue-500 shadow-lg shadow-blue-500/20" : "border-white/10",
                  )}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 transform translate-x-[30%] translate-y-[40%] rotate-45">
                      POPULAR
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-white/60">/month</span>
                    </div>
                    <p className="text-white/70 mb-6">{plan.description}</p>
                    <Button
                      className={cn(
                        "w-full mb-6 group",
                        plan.popular
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0"
                          : "bg-white/10 hover:bg-white/20 text-white",
                      )}
                    >
                      <span className="flex items-center">
                        {plan.cta}
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                            <svg
                              className="w-3 h-3 text-green-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-white/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="yearly">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {yearlyPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className={cn(
                    "relative bg-white/5 backdrop-blur-sm border rounded-xl overflow-hidden group hover:bg-white/10 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1",
                    plan.popular ? "border-blue-500 shadow-lg shadow-blue-500/20" : "border-white/10",
                  )}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 transform translate-x-[30%] translate-y-[40%] rotate-45">
                      POPULAR
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-white/60">/year</span>
                    </div>
                    <p className="text-white/70 mb-6">{plan.description}</p>
                    <Button
                      className={cn(
                        "w-full mb-6 group",
                        plan.popular
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0"
                          : "bg-white/10 hover:bg-white/20 text-white",
                      )}
                    >
                      <span className="flex items-center">
                        {plan.cta}
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                            <svg
                              className="w-3 h-3 text-green-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-white/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-white/60 mb-4">Need a custom plan for your specific shipping needs?</p>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 group">
            <span className="flex items-center">
              Contact Our Sales Team
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
