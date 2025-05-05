"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Shipexx has been a game-changer for my online shopping. I can finally shop from US stores without worrying about shipping restrictions.",
      author: "Sarah J.",
      location: "London, UK",
      avatar: "/placeholder.svg?height=100&width=100&text=SJ",
      rating: 5,
    },
    {
      quote:
        "The package consolidation feature saved me hundreds of dollars on shipping costs. The customer service is also top-notch!",
      author: "Miguel R.",
      location: "Mexico City, Mexico",
      avatar: "/placeholder.svg?height=100&width=100&text=MR",
      rating: 5,
    },
    {
      quote:
        "As a small business owner, Shipexx helps me source products from the US efficiently. The business plan is worth every penny.",
      author: "Aisha T.",
      location: "Dubai, UAE",
      avatar: "/placeholder.svg?height=100&width=100&text=AT",
      rating: 4,
    },
  ]

  return (
    <section id="testimonials" className="relative py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
          >
            What Our Customers Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            Join thousands of satisfied customers shipping globally with Shipexx.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 relative group hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                <div className="text-6xl text-blue-500/20">"</div>
              </div>
              <p className="text-white/80 mb-6 relative z-10">{testimonial.quote}</p>

              <div className="flex items-center mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400" : "text-white/20"}`}
                    fill={i < testimonial.rating ? "currentColor" : "none"}
                  />
                ))}
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold">{testimonial.author}</div>
                  <div className="text-sm text-white/60">{testimonial.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-wrap justify-center gap-4 md:gap-8">
            {["Amazon", "eBay", "Walmart", "Target", "Best Buy"].map((company) => (
              <div key={company} className="text-white/40 font-medium text-lg md:text-xl">
                {company}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
