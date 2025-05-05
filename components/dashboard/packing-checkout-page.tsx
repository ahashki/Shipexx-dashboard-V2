"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, DollarSign, CheckCircle, AlertTriangle, Loader2, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface PackingOption {
  name: string
  price: number
  selected: boolean
}

interface PackingCheckoutPageProps {
  orderId: string
  orderTotal: number
  packingOptions: {
    doubleBoxing: boolean
    bubbleWrap: boolean
    fragileStickers: boolean
    photoDocumentation: boolean
    insurance: boolean
  }
  selectedCarrier: string
  specialInstructions: string
  extraServicesCost: number
  walletBalance: number
  onAddFunds: (amount: number) => Promise<void>
  onCompleteOrder: () => void
  onCancel: () => void
}

export function PackingCheckoutPage({
  orderId,
  orderTotal,
  packingOptions,
  selectedCarrier,
  specialInstructions,
  extraServicesCost,
  walletBalance,
  onAddFunds,
  onCompleteOrder,
  onCancel,
}: PackingCheckoutPageProps) {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<string>("wallet")
  const [fundsToAdd, setFundsToAdd] = useState<number>(
    walletBalance < extraServicesCost ? Math.ceil(extraServicesCost - walletBalance) : 0,
  )
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [processingProgress, setProcessingProgress] = useState<number>(0)

  const hasSufficientFunds = walletBalance >= extraServicesCost
  const shortfall = extraServicesCost - walletBalance

  // Get carrier name from ID
  const getCarrierName = (carrierId: string) => {
    const carrierMap = {
      "ups-ground": "UPS Ground",
      "ups-3day": "UPS 3-Day Select",
      "ups-2day": "UPS 2nd Day Air",
      "fedex-ground": "FedEx Ground",
      "fedex-express": "FedEx Express Saver",
      "fedex-priority": "FedEx Priority Overnight",
      "usps-first": "USPS First Class",
      "usps-priority": "USPS Priority Mail",
      "usps-express": "USPS Priority Mail Express",
    }
    return carrierMap[carrierId] || carrierId
  }

  // Get carrier logo
  const getCarrierLogo = (carrierId: string) => {
    if (carrierId.startsWith("ups")) return "/placeholder.svg?height=24&width=60&text=UPS"
    if (carrierId.startsWith("fedex")) return "/placeholder.svg?height=24&width=60&text=FedEx"
    if (carrierId.startsWith("usps")) return "/placeholder.svg?height=24&width=60&text=USPS"
    return "/placeholder.svg?height=24&width=60"
  }

  // Convert packing options to array for display
  const packingOptionsArray = Object.entries(packingOptions)
    .filter(([_, selected]) => selected)
    .map(([key, _]) => {
      const optionMap = {
        doubleBoxing: { name: "Double Boxing", price: 5.99 },
        bubbleWrap: { name: "Bubble Wrap", price: 3.99 },
        fragileStickers: { name: "Fragile Stickers", price: 1.99 },
        photoDocumentation: { name: "Photo Documentation", price: 4.99 },
        insurance: { name: "Shipping Insurance", price: 9.99 },
      }
      return { name: optionMap[key].name, price: optionMap[key].price }
    })

  // Get carrier price
  const getCarrierPrice = (carrierId: string) => {
    const priceMap = {
      "ups-ground": 0,
      "ups-3day": 12.99,
      "ups-2day": 19.99,
      "fedex-ground": 2.99,
      "fedex-express": 14.99,
      "fedex-priority": 29.99,
      "usps-first": 1.99,
      "usps-priority": 8.99,
      "usps-express": 24.99,
    }
    return priceMap[carrierId] || 0
  }

  // Simulate processing steps
  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProcessingProgress((prev) => {
          const newProgress = prev + 5
          if (newProgress >= 100) {
            clearInterval(interval)
            setTimeout(() => {
              setCurrentStep(3) // Move to completion step
            }, 500)
            return 100
          }
          return newProgress
        })
      }, 150)

      return () => clearInterval(interval)
    }
  }, [isProcessing])

  const handleAddFunds = async () => {
    if (fundsToAdd <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount to add",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    setCurrentStep(2) // Move to processing step

    try {
      await onAddFunds(fundsToAdd)
      // The processing animation will continue and eventually move to step 3
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add funds. Please try again.",
        variant: "destructive",
      })
      setIsProcessing(false)
      setCurrentStep(1)
    }
  }

  const handleCompleteOrder = () => {
    if (paymentMethod === "wallet" && !hasSufficientFunds) {
      toast({
        title: "Insufficient Funds",
        description: "Please add funds to your wallet or choose another payment method.",
        variant: "destructive",
      })
      return
    }

    // For Stripe and PayPal, in a real app we would integrate with their APIs here
    if (paymentMethod === "stripe" || paymentMethod === "paypal") {
      toast({
        title: "External Payment",
        description: `Redirecting to ${paymentMethod === "stripe" ? "Stripe" : "PayPal"} for payment processing...`,
      })
      // In a real implementation, we would redirect to their checkout or open a modal
    }

    setIsProcessing(true)
    setCurrentStep(2) // Move to processing step

    // The processing animation will continue and eventually move to step 3
    // which will trigger onCompleteOrder via the useEffect
  }

  // When processing is complete and we're at step 3, complete the order
  useEffect(() => {
    if (currentStep === 3 && processingProgress === 100) {
      setTimeout(() => {
        onCompleteOrder()
      }, 1500)
    }
  }, [currentStep, processingProgress, onCompleteOrder])

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Checkout Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              1
            </div>
            <div className="ml-2 font-medium">Review & Pay</div>
          </div>
          <div className="h-1 flex-1 mx-4 bg-muted">
            <div
              className={`h-full bg-primary transition-all duration-300`}
              style={{ width: currentStep >= 2 ? "100%" : "0%" }}
            />
          </div>
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              2
            </div>
            <div className="ml-2 font-medium">Processing</div>
          </div>
          <div className="h-1 flex-1 mx-4 bg-muted">
            <div
              className={`h-full bg-primary transition-all duration-300`}
              style={{ width: currentStep >= 3 ? "100%" : "0%" }}
            />
          </div>
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              3
            </div>
            <div className="ml-2 font-medium">Complete</div>
          </div>
        </div>
      </div>

      {/* Step 1: Review & Pay */}
      {currentStep === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Packing Configuration</CardTitle>
                <CardDescription>Review your packing and shipping options for order {orderId}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Selected Packing Options */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Selected Packing Options</h3>
                    {packingOptionsArray.length > 0 ? (
                      <div className="space-y-2">
                        {packingOptionsArray.map((option, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b">
                            <div className="flex items-center">
                              <Package className="h-4 w-4 mr-2 text-primary" />
                              <span>{option.name}</span>
                            </div>
                            <span className="font-medium">${option.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No additional packing options selected</p>
                    )}
                  </div>

                  {/* Selected Carrier */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Selected Carrier</h3>
                    <div className="flex justify-between items-center py-2 border-b">
                      <div className="flex items-center">
                        <img
                          src={getCarrierLogo(selectedCarrier) || "/placeholder.svg"}
                          alt="Carrier logo"
                          className="h-5 mr-2"
                        />
                        <span>{getCarrierName(selectedCarrier)}</span>
                      </div>
                      <span className="font-medium">${getCarrierPrice(selectedCarrier).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Special Instructions */}
                  {specialInstructions && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">Special Instructions</h3>
                      <div className="bg-muted p-3 rounded-md text-sm">{specialInstructions}</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Choose how you want to pay</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <div
                    className={`flex items-start space-x-3 border rounded-lg p-4 ${paymentMethod === "wallet" ? "border-primary bg-primary/5" : "border-muted"}`}
                  >
                    <RadioGroupItem value="wallet" id="wallet" />
                    <div className="flex-1">
                      <Label htmlFor="wallet" className="flex items-center">
                        <DollarSign className="h-5 w-5 mr-2 text-primary" />
                        <span className="font-medium">Wallet Balance</span>
                        <Badge className="ml-2" variant={hasSufficientFunds ? "outline" : "destructive"}>
                          ${walletBalance.toFixed(2)}
                        </Badge>
                      </Label>
                      {!hasSufficientFunds && (
                        <div className="mt-2 text-sm text-destructive flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          <span>Insufficient funds. You need ${shortfall.toFixed(2)} more.</span>
                        </div>
                      )}
                      {!hasSufficientFunds && (
                        <div className="mt-3">
                          <div className="flex items-center mb-2">
                            <Label htmlFor="add-funds" className="mr-2">
                              Amount to add:
                            </Label>
                            <Input
                              id="add-funds"
                              type="number"
                              value={fundsToAdd}
                              onChange={(e) => setFundsToAdd(Number(e.target.value))}
                              min={shortfall}
                              className="w-32"
                            />
                          </div>
                          <Button size="sm" onClick={handleAddFunds}>
                            Add Funds
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    className={`flex items-start space-x-3 border rounded-lg p-4 ${paymentMethod === "stripe" ? "border-primary bg-primary/5" : "border-muted"}`}
                  >
                    <RadioGroupItem value="stripe" id="stripe" />
                    <div className="flex-1">
                      <Label htmlFor="stripe" className="flex items-center">
                        <div className="h-5 w-8 mr-2 relative">
                          <svg
                            viewBox="0 0 60 25"
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            preserveAspectRatio="xMidYMid"
                          >
                            <path
                              d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.88zm-4.32 9.35v9.79H19.8V5.57h3.7l.12 1.22c1-1.77 3.07-1.41 3.62-1.22v3.79c-.52-.17-2.29-.43-3.32.86zm-8.55 4.72c0 2.43 2.6 1.68 3.12 1.46v3.36c-.55.3-1.54.54-2.89.54a4.15 4.15 0 0 1-4.27-4.24l.02-13.17 4.02-.86v3.54h3.14V9.1h-3.14v5.85zm-4.91.7c0 2.97-2.31 4.66-5.73 4.66a11.2 11.2 0 0 1-4.46-.93v-3.93c1.38.75 3.1 1.31 4.46 1.31.92 0 1.53-.24 1.53-1C6.26 13.77 0 14.51 0 9.95 0 7.04 2.28 5.3 5.62 5.3c1.36 0 2.72.2 4.09.75v3.88a9.23 9.23 0 0 0-4.1-1.06c-.86 0-1.44.25-1.44.9 0 1.85 6.29.97 6.29 5.88z"
                              fill="#6772e5"
                              fillRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="font-medium">Stripe</span>
                      </Label>
                      <div className="mt-2 text-sm text-muted-foreground">Pay with credit/debit card via Stripe</div>
                    </div>
                  </div>

                  <div
                    className={`flex items-start space-x-3 border rounded-lg p-4 ${paymentMethod === "paypal" ? "border-primary bg-primary/5" : "border-muted"}`}
                  >
                    <RadioGroupItem value="paypal" id="paypal" />
                    <div className="flex-1">
                      <Label htmlFor="paypal" className="flex items-center">
                        <div className="h-5 w-8 mr-2 relative">
                          <svg
                            viewBox="0 0 101 32"
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            preserveAspectRatio="xMidYMid"
                          >
                            <path
                              d="M 12.237 2.8 L 4.437 2.8 C 3.937 2.8 3.437 3.2 3.337 3.7 L 0.237 23.7 C 0.137 24.1 0.437 24.4 0.837 24.4 L 4.537 24.4 C 5.037 24.4 5.537 24 5.637 23.5 L 6.437 18.1 C 6.537 17.6 6.937 17.2 7.537 17.2 L 10.037 17.2 C 15.137 17.2 18.137 14.7 18.937 9.8 C 19.237 7.7 18.937 6 17.937 4.8 C 16.837 3.5 14.837 2.8 12.237 2.8 Z M 13.137 10.1 C 12.737 12.9 10.537 12.9 8.537 12.9 L 7.337 12.9 L 8.137 7.7 C 8.137 7.4 8.437 7.2 8.737 7.2 L 9.237 7.2 C 10.637 7.2 11.937 7.2 12.637 8 C 13.137 8.4 13.337 9.1 13.137 10.1 Z"
                              fill="#009cde"
                            />
                            <path
                              d="M 35.437 10 L 31.737 10 C 31.437 10 31.137 10.2 31.137 10.5 L 30.937 11.5 L 30.637 11.1 C 29.837 9.9 28.037 9.5 26.237 9.5 C 22.137 9.5 18.637 12.6 17.937 17 C 17.537 19.2 18.037 21.3 19.337 22.7 C 20.437 24 22.137 24.6 24.037 24.6 C 27.337 24.6 29.237 22.5 29.237 22.5 L 29.037 23.5 C 28.937 23.9 29.237 24.3 29.637 24.3 L 33.037 24.3 C 33.537 24.3 34.037 23.9 34.137 23.4 L 36.137 10.7 C 36.237 10.4 35.837 10 35.437 10 Z M 30.337 17.2 C 29.937 19.3 28.337 20.8 26.137 20.8 C 25.037 20.8 24.237 20.5 23.637 19.8 C 23.037 19.1 22.837 18.2 23.037 17.2 C 23.337 15.1 25.137 13.6 27.237 13.6 C 28.337 13.6 29.137 14 29.737 14.6 C 30.237 15.3 30.437 16.2 30.337 17.2 Z"
                              fill="#009cde"
                            />
                            <path
                              d="M 55.337 10 L 51.637 10 C 51.237 10 50.937 10.2 50.737 10.5 L 45.537 18.1 L 43.337 10.8 C 43.237 10.3 42.737 10 42.337 10 L 38.637 10 C 38.237 10 37.837 10.4 38.037 10.9 L 42.137 23 L 38.237 28.4 C 37.937 28.8 38.237 29.4 38.737 29.4 L 42.437 29.4 C 42.837 29.4 43.137 29.2 43.337 28.9 L 55.837 10.9 C 56.137 10.6 55.837 10 55.337 10 Z"
                              fill="#009cde"
                            />
                            <path
                              d="M 67.737 2.8 L 59.937 2.8 C 59.437 2.8 58.937 3.2 58.837 3.7 L 55.737 23.6 C 55.637 24 55.937 24.3 56.337 24.3 L 60.337 24.3 C 60.737 24.3 61.037 24 61.137 23.7 L 61.937 18.1 C 62.037 17.6 62.437 17.2 63.037 17.2 L 65.537 17.2 C 70.637 17.2 73.637 14.7 74.437 9.8 C 74.737 7.7 74.437 6 73.437 4.8 C 72.237 3.5 70.337 2.8 67.737 2.8 Z M 68.637 10.1 C 68.237 12.9 66.037 12.9 64.037 12.9 L 62.837 12.9 L 63.637 7.7 C 63.637 7.4 63.937 7.2 64.237 7.2 L 64.737 7.2 C 66.137 7.2 67.437 7.2 68.137 8 C 68.637 8.4 68.837 9.1 68.637 10.1 Z"
                              fill="#003087"
                            />
                            <path
                              d="M 90.937 10 L 87.237 10 C 86.937 10 86.637 10.2 86.637 10.5 L 86.437 11.5 L 86.137 11.1 C 85.337 9.9 83.537 9.5 81.737 9.5 C 77.637 9.5 74.137 12.6 73.437 17 C 73.037 19.2 73.537 21.3 74.837 22.7 C 75.937 24 77.637 24.6 79.537 24.6 C 82.837 24.6 84.737 22.5 84.737 22.5 L 84.537 23.5 C 84.437 23.9 84.737 24.3 85.137 24.3 L 88.537 24.3 C 89.037 24.3 89.537 23.9 89.637 23.4 L 91.637 10.7 C 91.737 10.4 91.337 10 90.937 10 Z M 85.737 17.2 C 85.337 19.3 83.737 20.8 81.537 20.8 C 80.437 20.8 79.637 20.5 79.037 19.8 C 78.437 19.1 78.237 18.2 78.437 17.2 C 78.737 15.1 80.537 13.6 82.637 13.6 C 83.737 13.6 84.537 14 85.137 14.6 C 85.737 15.3 85.937 16.2 85.737 17.2 Z"
                              fill="#003087"
                            />
                            <path
                              d="M 95.337 3.3 L 92.137 23.6 C 92.037 24 92.337 24.3 92.737 24.3 L 96.037 24.3 C 96.537 24.3 97.037 23.9 97.137 23.4 L 100.237 3.5 C 100.337 3.1 100.037 2.8 99.637 2.8 L 95.937 2.8 C 95.637 2.8 95.437 3 95.337 3.3 Z"
                              fill="#003087"
                            />
                          </svg>
                        </div>
                        <span className="font-medium">PayPal</span>
                      </Label>
                      <div className="mt-2 text-sm text-muted-foreground">Pay with your PayPal account</div>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Base Order Total:</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Packing Options:</span>
                    <span>${packingOptionsArray.reduce((sum, option) => sum + option.price, 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Carrier Fee:</span>
                    <span>${getCarrierPrice(selectedCarrier).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Additional Cost:</span>
                    <span>${extraServicesCost.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-3">
                <Button
                  className="w-full"
                  onClick={handleCompleteOrder}
                  disabled={paymentMethod === "wallet" && !hasSufficientFunds}
                >
                  Complete Payment
                </Button>
                <Button variant="outline" className="w-full" onClick={onCancel}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}

      {/* Step 2: Processing */}
      {currentStep === 2 && (
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Processing Your Payment</CardTitle>
            <CardDescription>Please wait while we process your request</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <Loader2 className="h-16 w-16 animate-spin text-primary" />
            </div>
            <Progress value={processingProgress} className="w-full" />
            <div className="text-center text-sm text-muted-foreground">
              {processingProgress < 100 ? `Processing... ${processingProgress}%` : "Finalizing Configuration..."}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Complete */}
      {currentStep === 3 && (
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Configuration Complete!</CardTitle>
            <CardDescription>Your packing options have been applied</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <div className="text-center text-sm text-muted-foreground">
              Your order has been successfully configured with your selected packing options and carrier preferences.
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => router.push("/orders")}>Go to Orders</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
