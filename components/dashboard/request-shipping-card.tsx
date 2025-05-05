"use client"

import { useState } from "react"
import { Trash2, ImageIcon, Loader2 } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

interface OrderItem {
  id: number
  url: string
  quantity: number
  instructions: string
  name: string
  price: number
  image: string
}

interface CurrentItem {
  url: string
  quantity: number
  instructions: string
}

interface ProductDetails {
  name: string
  price: number
  image: string
}

interface RequestShippingCardProps {
  walletBalance: number
  onCreateOrder: (totalCost: number, items: OrderItem[]) => void
}

export function RequestShippingCard({ walletBalance, onCreateOrder }: RequestShippingCardProps) {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [currentItem, setCurrentItem] = useState<CurrentItem>({ url: "", quantity: 1, instructions: "" })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userCountry, setUserCountry] = useState<string>("US")
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false)

  const calculateItemsTotal = (): number => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const calculateServiceFee = (): number => {
    // Example: 5% service fee
    return calculateItemsTotal() * 0.05
  }

  const calculateTax = (): number => {
    // Example: 8% tax rate (this should be based on the user's location)
    return calculateItemsTotal() * 0.08
  }

  const calculateShipping = (): number => {
    // This is a placeholder. In a real application, you would calculate this based on
    // the user's country, the items' weight, dimensions, and your shipping partners' rates.
    const baseRate = userCountry === "US" ? 10 : 30
    const itemCount = orderItems.reduce((total, item) => total + item.quantity, 0)
    return baseRate + (itemCount - 1) * 5
  }

  const calculateTotal = (): number => {
    return calculateItemsTotal() + calculateServiceFee() + calculateTax() + calculateShipping()
  }

  // Mock function to simulate fetching product details
  const mockFetchProductDetails = (url: string): ProductDetails => {
    // Extract domain name from URL for product name
    let domain = ""
    try {
      const urlObj = new URL(url)
      domain = urlObj.hostname.replace("www.", "")
    } catch (e) {
      domain = url.split("/")[0]
    }

    // Generate a random price between $10 and $100
    const price = Math.floor(Math.random() * 120) + 10

    // Create a product name based on the URL
    const productName = `Product from ${domain}`

    // Return mock product details
    return {
      name: productName,
      price: price,
      image: `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(domain)}`,
    }
  }

  const fetchProductDetails = async (url: string): Promise<ProductDetails | null> => {
    setIsLoading(true)
    try {
      // In a real application, this would be an API call to your backend
      // For now, we'll use a mock implementation to avoid the API error

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Use mock function to generate product details
      const productDetails = mockFetchProductDetails(url)

      return productDetails
    } catch (error) {
      console.error("Error fetching product details:", error)
      toast({
        title: "Error",
        description: `Failed to fetch product details: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddItem = async (): Promise<void> => {
    if (!currentItem.url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a product URL",
        variant: "destructive",
      })
      return
    }

    try {
      const productDetails = await fetchProductDetails(currentItem.url)
      if (productDetails) {
        const newItem: OrderItem = {
          ...currentItem,
          id: Date.now(),
          name: productDetails.name,
          price: productDetails.price,
          image: productDetails.image,
        }
        setOrderItems([...orderItems, newItem])
        setCurrentItem({ url: "", quantity: 1, instructions: "" })
        toast({
          title: "Item Added",
          description: `${productDetails.name} has been added to your order.`,
        })
      }
    } catch (error) {
      console.error("Error adding item:", error)
      toast({
        title: "Error",
        description: `Failed to add item: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      })
      return
    }
  }

  const handleRemoveItem = (id: number): void => {
    setOrderItems(orderItems.filter((item) => item.id !== id))
  }

  const handleCreateOrder = (): void => {
    const totalCost = calculateTotal()
    onCreateOrder(totalCost, orderItems)
    setShowConfirmDialog(false)
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Request Shipping</CardTitle>
        <CardDescription>Add items you want us to purchase and ship to you</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <Input
              placeholder="Paste product URL here"
              value={currentItem.url}
              onChange={(e) => setCurrentItem({ ...currentItem, url: e.target.value })}
              className="flex-grow"
            />
            <Input
              type="number"
              placeholder="Qty"
              value={currentItem.quantity}
              onChange={(e) => setCurrentItem({ ...currentItem, quantity: Number.parseInt(e.target.value) || 1 })}
              className="w-20"
            />
            <Button onClick={handleAddItem} disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Add Item"}
            </Button>
          </div>
          <Textarea
            placeholder="Additional instructions for this item"
            value={currentItem.instructions}
            onChange={(e) => setCurrentItem({ ...currentItem, instructions: e.target.value })}
          />
          {orderItems.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Order Items:</h4>
              <ul className="space-y-4">
                {orderItems.map((item) => (
                  <li key={item.id} className="flex items-start justify-between bg-muted p-4 rounded">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                        {item.image ? (
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold">${item.price.toFixed(2)} each</p>
                        {item.instructions && (
                          <p className="text-sm text-muted-foreground mt-1">Note: {item.instructions}</p>
                        )}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {orderItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Cost Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Items Total:</span>
                    <span>${calculateItemsTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Fee:</span>
                    <span>${calculateServiceFee().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>${calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Shipping:</span>
                    <span>${calculateShipping().toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
            <DialogTrigger asChild>
              <Button className="w-full" disabled={orderItems.length === 0}>
                Request Shipping
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Shipping Request</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p>Are you sure you want to request shipping for the following items?</p>
                <ul className="space-y-4">
                  {orderItems.map((item) => (
                    <li key={item.id} className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                        {item.image ? (
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <ImageIcon className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold">${item.price.toFixed(2)} each</p>
                        {item.instructions && (
                          <p className="text-sm text-muted-foreground mt-1">Note: {item.instructions}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="font-semibold">Total Cost: ${calculateTotal().toFixed(2)}</div>
                <Button onClick={handleCreateOrder} className="w-full">
                  Proceed to Checkout
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}
