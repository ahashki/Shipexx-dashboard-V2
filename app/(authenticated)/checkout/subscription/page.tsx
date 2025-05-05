"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Shield, Zap, Gift, Crown, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Define subscription plan types
interface SubscriptionPlan {
  id: string
  name: string
  price: number
  period: "monthly" | "yearly"
  features: string[]
  recommended: boolean
  description: string
}

export default function SubscriptionCheckoutPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<string>("premium-monthly")
  const [currentPlan, setCurrentPlan] = useState<string>("basic-monthly")
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly")
  const [isProcessing, setIsProcessing] = useState(false)

  // Define subscription plans
  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: "basic-monthly",
      name: "Basic",
      price: 9.99,
      period: "monthly",
      features: [
        "Standard Shipping",
        "Basic Support (Email)",
        "Up to 10 shipments/month",
        "Address Book (5 addresses)",
        "Basic Tracking",
      ],
      recommended: false,
      description: "Perfect for occasional shippers",
    },
    {
      id: "premium-monthly",
      name: "Premium",
      price: 24.99,
      period: "monthly",
      features: [
        "Priority Shipping",
        "24/7 Support",
        "Unlimited shipments",
        "Address Book (Unlimited)",
        "Advanced Tracking",
        "Insurance up to $1,000",
        "Discounted Rates",
      ],
      recommended: true,
      description: "Our most popular plan for regular shippers",
    },
    {
      id: "enterprise-monthly",
      name: "Enterprise",
      price: 99.99,
      period: "monthly",
      features: [
        "All Premium features",
        "Custom Packaging", 
        "Dedicated Account Manager",
        "Insurance up to $5,000",
        "Premium Analytics",
        "Bulk Shipping Tools",
      ],
      recommended: false,
      description: "For businesses with high volume shipping needs",
    },
    {
      id: "basic-yearly",
      name: "Basic",
      price: 99.99,
      period: "yearly",
      features: [
        "Standard Shipping",
        "Basic Support (Email)",
        "Up to 10 shipments/month",
        "Address Book (5 addresses)",
        "Basic Tracking",
      ],
      recommended: false,
      description: "Perfect for occasional shippers",
    },
    {
      id: "premium-yearly",
      name: "Premium",
      price: 999.99,
      period: "yearly",
      features: [
        "Priority Shipping",
        "24/7 Support",
        "Unlimited shipments",
        "Address Book (Unlimited)",
        "Advanced Tracking",
        "Insurance up to $1,000",
        "Discounted Rates",
      ],
      recommended: true,
      description: "Our most popular plan for regular shippers",
    },
    {
      id: "enterprise-yearly",
      name: "Enterprise",
      price: 499.99,
      period: "yearly",
      features: [
        "All Premium features",
        "Custom Packaging",
      
        "Dedicated Account Manager",
        "Insurance up to $5,000",
        "Premium Analytics",
        "Bulk Shipping Tools",
      ],
      recommended: false,
      description: "For businesses with high volume shipping needs",
    },
  ]

  // Filter plans based on billing period
  const filteredPlans = subscriptionPlans.filter((plan) => plan.period === billingPeriod)

  // Handle subscription purchase
  const handleSubscribe = () => {
    setIsProcessing(true)

    // Simulate API call to update subscription
    setTimeout(() => {
      // Store the selected plan in localStorage to simulate a backend
      localStorage.setItem("currentSubscriptionPlan", selectedPlan)
      setIsProcessing(false)

      // Redirect back to profile page
      router.push("/profile")
    }, 1500)
  }

  // Load current plan from localStorage on component mount
  useEffect(() => {
    const savedPlan = localStorage.getItem("currentSubscriptionPlan")
    if (savedPlan) {
      setCurrentPlan(savedPlan)

      // Set the selected plan to the current plan initially
      setSelectedPlan(savedPlan)

      // Set billing period based on the current plan
      if (savedPlan.includes("yearly")) {
        setBillingPeriod("yearly")
      } else {
        setBillingPeriod("monthly")
      }
    }
  }, [])

  return (
    <div className="container max-w-5xl mx-auto py-8">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Choose Your Subscription Plan</h1>
          <p className="text-muted-foreground mt-2">Select the plan that best fits your shipping needs</p>
        </div>

        {/* Billing Period Toggle */}
        <div className="flex justify-center mb-6">
          <Tabs
            value={billingPeriod}
            onValueChange={(value) => {
              setBillingPeriod(value as "monthly" | "yearly")
              // Update selected plan when changing billing period
              const currentPlanName = selectedPlan.split("-")[0]
              setSelectedPlan(`${currentPlanName}-${value}`)
            }}
            className="w-[400px]"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
              <TabsTrigger value="yearly">
                Yearly Billing
                <Badge
                  variant="secondary"
                  className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                >
                  Save 15%
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Subscription Plans */}
        <RadioGroup
          value={selectedPlan}
          onValueChange={setSelectedPlan}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {filteredPlans.map((plan) => {
            const isCurrent = plan.id === currentPlan

            return (
              <div key={plan.id} className="relative">
                {plan.recommended && (
                  <div className="absolute -top-3 left-0 right-0 flex justify-center">
                    <Badge className="bg-blue-500 text-white hover:bg-blue-600">Recommended</Badge>
                  </div>
                )}
                {isCurrent && (
                  <div className="absolute -top-3 left-0 right-0 flex justify-center">
                    <Badge className="bg-amber-500 text-white hover:bg-amber-600">Current Plan</Badge>
                  </div>
                )}

                <Label
                  htmlFor={plan.id}
                  className={`flex flex-col h-full rounded-lg border p-0 cursor-pointer overflow-hidden ${
                    selectedPlan === plan.id
                      ? "border-primary ring-2 ring-primary ring-offset-2"
                      : isCurrent
                        ? "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20"
                        : "border-border"
                  }`}
                >
                  <div className="flex items-start p-4">
                    <RadioGroupItem value={plan.id} id={plan.id} className="mt-1" />
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold text-lg flex items-center">
                            {plan.name}
                            {plan.name === "Premium" && <Crown className="h-4 w-4 text-amber-500 ml-1" />}
                          </h3>
                          <p className="text-sm text-muted-foreground">{plan.description}</p>
                        </div>
                      </div>

                      <div className="mt-2">
                        <span className="text-2xl font-bold">${plan.price}</span>
                        <span className="text-muted-foreground">/{plan.period === "monthly" ? "month" : "year"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t p-4 bg-muted/40 flex-grow">
                    <ul className="space-y-2 text-sm">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Label>
              </div>
            )
          })}
        </RadioGroup>

        {/* Payment Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Select your preferred payment method for your subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="card" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="card">Stripe</TabsTrigger>
                <TabsTrigger value="paypal">PayPal</TabsTrigger>
                <TabsTrigger value="wallet">Wallet Balance</TabsTrigger>
              </TabsList>

              <TabsContent value="card" className="space-y-4 pt-4">
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="mb-6 text-center">
                    <div className="flex items-center justify-center mb-4">
                      <svg
                        className="h-10 w-10 text-blue-500"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="40" height="40" rx="8" fill="#635BFF" />
                        <path d="M16.5 20.5H23.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        <path d="M20 17V24" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Pay with Stripe</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Secure payment processing by Stripe. Your card details are never stored on our servers and are
                      processed securely.
                    </p>
                  </div>

                  <Button className="bg-[#635BFF] hover:bg-[#4F46E5] text-white w-full max-w-md">
                    Proceed with Stripe Payment
                  </Button>

                  <div className="flex items-center space-x-2 mt-4">
                    <input type="checkbox" id="auto-charge-card" className="rounded border-gray-300" />
                    <Label htmlFor="auto-charge-card" className="text-sm font-normal">
                      Automatically charge via Stripe for future subscription renewals
                    </Label>
                  </div>

                  <div className="mt-6 flex items-center justify-center">
                    <div className="flex space-x-2">
                      <svg className="h-6 w-auto" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="36" height="24" rx="4" fill="#F7FAFC" />
                        <path d="M10 7H26V9H10V7Z" fill="#3182CE" />
                        <path d="M10 11H26V13H10V11Z" fill="#3182CE" />
                        <path d="M10 15H26V17H10V15Z" fill="#3182CE" />
                      </svg>
                      <svg className="h-6 w-auto" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="36" height="24" rx="4" fill="#F7FAFC" />
                        <circle cx="13" cy="12" r="5" fill="#E53E3E" />
                        <circle cx="23" cy="12" r="5" fill="#F6AD55" />
                      </svg>
                      <svg className="h-6 w-auto" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="36" height="24" rx="4" fill="#F7FAFC" />
                        <path d="M18 7L23 17H13L18 7Z" fill="#805AD5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="paypal" className="pt-4">
                <div className="text-center py-6">
                  <p className="mb-4">You'll be redirected to PayPal to complete your subscription payment.</p>
                  <Button className="bg-[#0070ba] hover:bg-[#005ea6]">Continue with PayPal</Button>
                  <div className="flex items-center justify-center space-x-2 mt-4">
                    <input type="checkbox" id="auto-charge-paypal" className="rounded border-gray-300" />
                    <Label htmlFor="auto-charge-paypal" className="text-sm font-normal">
                      Automatically charge PayPal for future subscription renewals
                    </Label>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="wallet" className="pt-4">
                <div className="text-center py-6">
                  <div className="mb-4">
                    <p className="text-lg font-medium">Current Wallet Balance</p>
                    <p className="text-3xl font-bold">$250.00</p>
                    {selectedPlan && (
                      <p className="text-sm mt-2">
                        {filteredPlans.find((p) => p.id === selectedPlan)?.price &&
                        250 >= filteredPlans.find((p) => p.id === selectedPlan)?.price! ? (
                          <span className="text-green-600">
                            Your wallet has sufficient funds for this subscription.
                          </span>
                        ) : (
                          <span className="text-red-600">
                            Your wallet balance is insufficient for this subscription.
                          </span>
                        )}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground mt-1">
                      Your subscription payment will be automatically deducted from your wallet balance.
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-2 mt-4">
                    <input type="checkbox" id="auto-charge-wallet" className="rounded border-gray-300" />
                    <Label htmlFor="auto-charge-wallet" className="text-sm font-normal">
                      Automatically use wallet balance for future renewals when sufficient
                    </Label>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Secure payment processing
            </div>
            <Button onClick={handleSubscribe} disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Subscribe Now"}
            </Button>
          </CardFooter>
        </Card>

        {/* Subscription Benefits */}
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>All Plans Include</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: Zap,
                  title: "Fast Processing",
                  description: "All shipments are processed within 24 hours of receipt",
                },
                {
                  icon: Shield,
                  title: "Secure Handling",
                  description: "Your packages are handled with care and security",
                },
                {
                  icon: Gift,
                  title: "Special Offers",
                  description: "Exclusive deals and promotions for subscribers",
                },
              ].map((benefit, index) => (
                <div key={index} className="flex items-start p-4 border rounded-lg">
                  <div className="mr-4 bg-primary/10 p-2 rounded-full">
                    <benefit.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
