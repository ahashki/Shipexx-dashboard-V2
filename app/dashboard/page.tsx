"use client"

import { useState } from "react"
import {
  PackageIcon,
  Wallet,
  Truck,
  ArrowRight,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  ShoppingBag,
  Box,
  Send,
  CreditCard,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

// Import our custom components
import { WarehouseAddressCard } from "@/components/dashboard/warehouse-address-card"
import { RequestShippingCard } from "@/components/dashboard/request-shipping-card"
import { CheckoutPage } from "@/components/dashboard/checkout-page"

// Enum definitions
enum OrderStatus {
  Open = 0, // Order created, waiting for processing
  PartiallyReceived = 1, // Some items received, waiting for the rest  waiting for processing
  ReadyForPacking = 2, // All items received, ready to be packed
  PackingInProgress = 3, // Packing is happening
  ReadyToShip = 4, // Packing is done, waiting for shipment
  PartiallyShipped = 5, // Some packages shipped, others waiting
  Completed = 6, // All packages shipped, order is done
  Canceled = 7, // Order canceled
}

enum OrderItemStatus {
  Waiting = 0, // Item has not arrived yet
  Received = 1, // Item has been received at the warehouse
  Packing = 2, // Item is being packed
  Packed = 3, // Item is packed and ready for shipment
  Shipped = 4, // Item has been shipped
}

enum PackageStatus {
  Waiting = 0, // Package is waiting for items
  Packing = 1, // Package is currently being packed
  ReadyToShip = 2, // Package is packed and ready for shipment
  Shipped = 3, // Package has been shipped
  Delivered = 4, // Package has arrived at its destination
}

// Type definitions
interface OrderItem {
  id: number
  url: string
  quantity: number
  instructions: string
  name: string
  price: number
  image: string
  status?: OrderItemStatus
}

interface Order {
  id: string
  items: OrderItem[]
  status: OrderStatus
  total: number
  date: string
  trackingNumber?: string
  packages?: ShippingPackage[]
}

interface ShippingPackage {
  id: string
  items: OrderItem[]
  status: PackageStatus
  trackingNumber?: string
  estimatedDelivery?: string
}

export default function Dashboard() {
  const [walletBalance, setWalletBalance] = useState<number>(1234.56)
  const [showAddFundsDialog, setShowAddFundsDialog] = useState<boolean>(false)
  const [fundsToAdd, setFundsToAdd] = useState<number>(0)
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false)
  const [orderTotal, setOrderTotal] = useState<number>(0)
  const [currentOrderItems, setCurrentOrderItems] = useState<OrderItem[]>([])
  const [showCheckout, setShowCheckout] = useState<boolean>(false)
  const [showPackingOptionsDialog, setShowPackingOptionsDialog] = useState<boolean>(false)
  const [selectedCarrier, setSelectedCarrier] = useState<string>("standard")
  const [packingOptions, setPackingOptions] = useState({
    doublePacking: false,
    photoDocumentation: false,
    insuranceProtection: false,
  })
  const [extraServicesCost, setExtraServicesCost] = useState<number>(0)
  const router = useRouter()

  // Log that we've reached the dashboard page
  useEffect(() => {
    console.log("Dashboard page loaded")
  }, [])

  // Sample orders data
  const [recentOrders, setRecentOrders] = useState<Order[]>([
    {
      id: "ORD001",
      items: [
        {
          id: 1,
          url: "https://example.com/product1",
          quantity: 2,
          instructions: "Size M, Blue color",
          name: "Product from example.com",
          price: 45.99,
          image: "/placeholder.svg?height=200&width=200&text=Product1",
          status: OrderItemStatus.Received,
        },
        {
          id: 2,
          url: "https://example.com/product2",
          quantity: 1,
          instructions: "",
          name: "Another product from example.com",
          price: 32.5,
          image: "/placeholder.svg?height=200&width=200&text=Product2",
          status: OrderItemStatus.Waiting,
        },
      ],
      status: OrderStatus.PartiallyReceived,
      total: 124.48,
      date: "2023-06-10",
      packages: [],
    },
    {
      id: "ORD002",
      items: [
        {
          id: 3,
          url: "https://store.com/item1",
          quantity: 1,
          instructions: "",
          name: "Item from store.com",
          price: 75.5,
          image: "/placeholder.svg?height=200&width=200&text=Item1",
          status: OrderItemStatus.Packing,
        },
      ],
      status: OrderStatus.PackingInProgress,
      total: 75.5,
      date: "2023-06-12",
      packages: [
        {
          id: "PKG001",
          items: [
            {
              id: 3,
              url: "https://store.com/item1",
              quantity: 1,
              instructions: "",
              name: "Item from store.com",
              price: 75.5,
              image: "/placeholder.svg?height=200&width=200&text=Item1",
              status: OrderItemStatus.Packing,
            },
          ],
          status: PackageStatus.Packing,
        },
      ],
    },
    {
      id: "ORD003",
      items: [
        {
          id: 4,
          url: "https://shop.com/product1",
          quantity: 3,
          instructions: "Gift wrap please",
          name: "Product from shop.com",
          price: 65.0,
          image: "/placeholder.svg?height=200&width=200&text=ShopProduct",
          status: OrderItemStatus.Shipped,
        },
        {
          id: 5,
          url: "https://shop.com/product2",
          quantity: 1,
          instructions: "",
          name: "Another product from shop.com",
          price: 55.0,
          image: "/placeholder.svg?height=200&width=200&text=ShopProduct2",
          status: OrderItemStatus.Shipped,
        },
      ],
      status: OrderStatus.Completed,
      total: 250.0,
      date: "2023-06-05",
      trackingNumber: "TRK123456789",
      packages: [
        {
          id: "PKG002",
          items: [
            {
              id: 4,
              url: "https://shop.com/product1",
              quantity: 3,
              instructions: "Gift wrap please",
              name: "Product from shop.com",
              price: 65.0,
              image: "/placeholder.svg?height=200&width=200&text=ShopProduct",
              status: OrderItemStatus.Shipped,
            },
            {
              id: 5,
              url: "https://shop.com/product2",
              quantity: 1,
              instructions: "",
              name: "Another product from shop.com",
              price: 55.0,
              image: "/placeholder.svg?height=200&width=200&text=ShopProduct2",
              status: OrderItemStatus.Shipped,
            },
          ],
          status: PackageStatus.Delivered,
          trackingNumber: "TRK123456789",
          estimatedDelivery: "2023-06-15",
        },
      ],
    },
  ])

  const handleCreateOrder = (totalCost: number, items: OrderItem[]): void => {
    setOrderTotal(totalCost)
    setCurrentOrderItems(items)
    setShowCheckout(true)
  }

  const handleAddFunds = async (amount: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setWalletBalance((prev) => prev + amount)
        toast({
          title: "Funds Added",
          description: `$${amount.toFixed(2)} has been added to your wallet.`,
        })
        resolve()
      }, 2000) // Simulate network delay
    })
  }

  const handleCompleteOrder = (): void => {
    // Create the new order
    if (currentOrderItems.length > 0) {
      const newOrder: Order = {
        id: `ORD${Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0")}`,
        items: currentOrderItems.map((item) => ({ ...item, status: OrderItemStatus.Waiting })),
        status: OrderStatus.Open,
        total: orderTotal,
        date: new Date().toISOString().split("T")[0],
        packages: [],
      }

      // Deduct from wallet
      setWalletBalance((prev) => prev - orderTotal)

      // Add to recent orders
      setRecentOrders([newOrder, ...recentOrders])

      // Reset state
      setCurrentOrderItems([])
      setOrderTotal(0)
    }

    setShowCheckout(false)
  }

  const calculateExtraServicesCost = () => {
    let cost = 0
    if (packingOptions.doublePacking) cost += 15
    if (packingOptions.photoDocumentation) cost += 10
    if (packingOptions.insuranceProtection) cost += 20

    // Add carrier costs
    switch (selectedCarrier) {
      case "express":
        cost += 25
        break
      case "priority":
        cost += 15
        break
      case "standard":
      default:
        // No additional cost for standard
        break
    }

    return cost
  }

  const handlePackingOptionsSubmit = () => {
    const cost = calculateExtraServicesCost()

    // Set the state
    setExtraServicesCost(cost)

    // Deduct from wallet
    setWalletBalance((prev) => prev - cost)

    toast({
      title: "Extra Services Added",
      description: `$${cost.toFixed(2)} has been charged for your selected services.`,
    })

    setShowPackingOptionsDialog(false)
  }

  // Helper function to get status badge for orders
  const getOrderStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Open:
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Open
          </Badge>
        )
      case OrderStatus.PartiallyReceived:
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Partially Received
          </Badge>
        )
      case OrderStatus.ReadyForPacking:
        return (
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
            Ready For Packing
          </Badge>
        )
      case OrderStatus.PackingInProgress:
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Packing
          </Badge>
        )
      case OrderStatus.ReadyToShip:
        return (
          <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
            Ready To Ship
          </Badge>
        )
      case OrderStatus.PartiallyShipped:
        return (
          <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200">
            Partially Shipped
          </Badge>
        )
      case OrderStatus.Completed:
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Completed
          </Badge>
        )
      case OrderStatus.Canceled:
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Canceled
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Helper function to get status icon for orders
  const getOrderStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Open:
        return <Clock className="h-4 w-4 text-blue-500" />
      case OrderStatus.PartiallyReceived:
        return <ShoppingBag className="h-4 w-4 text-yellow-500" />
      case OrderStatus.ReadyForPacking:
        return <Box className="h-4 w-4 text-indigo-500" />
      case OrderStatus.PackingInProgress:
        return <PackageIcon className="h-4 w-4 text-purple-500" />
      case OrderStatus.ReadyToShip:
        return <Send className="h-4 w-4 text-teal-500" />
      case OrderStatus.PartiallyShipped:
        return <Truck className="h-4 w-4 text-cyan-500" />
      case OrderStatus.Completed:
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case OrderStatus.Canceled:
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  // Count orders by status for the shipment overview
  const countOrdersByStatus = () => {
    const counts = {
      inTransit: 0,
      delivered: 0,
      processing: 0,
      delayed: 0,
    }

    recentOrders.forEach((order) => {
      if (
        order.status === OrderStatus.PartiallyShipped ||
        (order.packages && order.packages.some((pkg) => pkg.status === PackageStatus.Shipped))
      ) {
        counts.inTransit++
      } else if (
        order.status === OrderStatus.Completed ||
        (order.packages && order.packages.every((pkg) => pkg.status === PackageStatus.Delivered))
      ) {
        counts.delivered++
      } else if (
        order.status === OrderStatus.Open ||
        order.status === OrderStatus.PartiallyReceived ||
        order.status === OrderStatus.ReadyForPacking ||
        order.status === OrderStatus.PackingInProgress ||
        order.status === OrderStatus.ReadyToShip
      ) {
        counts.processing++
      } else if (order.status === OrderStatus.Canceled) {
        counts.delayed++
      }
    })

    return counts
  }

  const orderCounts = countOrdersByStatus()
  const totalOrders = recentOrders.length

  // Get upcoming deliveries
  const getUpcomingDeliveries = () => {
    const deliveries: { id: string; date: string; address: string }[] = []

    recentOrders.forEach((order) => {
      if (order.packages) {
        order.packages.forEach((pkg) => {
          if (pkg.status === PackageStatus.Shipped && pkg.estimatedDelivery) {
            const date = new Date(pkg.estimatedDelivery)
            const formattedDate = `${date.toLocaleString("default", { month: "short" })} ${date.getDate()}`

            deliveries.push({
              id: order.id,
              date: formattedDate,
              address: "Your shipping address",
            })
          }
        })
      }
    })

    // Add some mock data if we don't have enough
    if (deliveries.length < 3) {
      const mockDeliveries = [
        { id: "ORD004", date: "Jun 18", address: "123 Main St, Anytown, USA" },
        { id: "ORD005", date: "Jun 20", address: "456 Elm St, Somewhere, USA" },
        { id: "ORD006", date: "Jun 22", address: "789 Oak St, Elsewhere, USA" },
      ]

      return [...deliveries, ...mockDeliveries.slice(0, 3 - deliveries.length)]
    }

    return deliveries
  }

  // If checkout is showing, render the checkout page instead of the dashboard
  if (showCheckout) {
    return (
      <CheckoutPage
        orderItems={currentOrderItems}
        totalCost={orderTotal}
        walletBalance={walletBalance}
        onAddFunds={handleAddFunds}
        onCompleteOrder={handleCompleteOrder}
        onCancel={() => setShowCheckout(false)}
      />
    )
  }

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      {/* Header */}

      <div className="flex flex-1">
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Welcome back, Anas</h1>
              <p className="text-muted-foreground">Here's what's happening with your shipments today.</p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {[
                { title: "Track Order", icon: PackageIcon, color: "bg-green-100 text-green-600" },
                {
                  title: "Wallet Balance",
                  icon: Wallet,
                  color: "bg-yellow-100 text-yellow-600",
                  value: `$${walletBalance.toFixed(2)}`,
                },
                { title: "Shipping Estimate", icon: Truck, color: "bg-purple-100 text-purple-600" },
              ].map((action) => (
                <Card key={action.title}>
                  <CardContent className="flex items-center p-6">
                    <div className={`rounded-full p-3 mr-4 ${action.color}`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                      {action.value && <p className="text-2xl font-bold">{action.value}</p>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Warehouse Address Card Component */}
            <WarehouseAddressCard />

            {/* Request Shipping Card Component */}
            <RequestShippingCard walletBalance={walletBalance} onCreateOrder={handleCreateOrder} />

            {/* Shipment Overview 
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Shipment Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Shipments</p>
                    <p className="text-2xl font-bold">{totalOrders}</p>
                  </div>
                  <Select defaultValue="thisMonth">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="thisWeek">This Week</SelectItem>
                      <SelectItem value="thisMonth">This Month</SelectItem>
                      <SelectItem value="lastMonth">Last Month</SelectItem>
                      <SelectItem value="lastQuarter">Last Quarter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  {[
                    { status: "In Transit", count: orderCounts.inTransit, color: "bg-blue-500" },
                    { status: "Delivered", count: orderCounts.delivered, color: "bg-green-500" },
                    { status: "Processing", count: orderCounts.processing, color: "bg-yellow-500" },
                    { status: "Delayed", count: orderCounts.delayed, color: "bg-red-500" },
                  ].map((item) => (
                    <div key={item.status}>
                      <div className="flex justify-between mb-1">
                        <span>{item.status}</span>
                        <span>{item.count}</span>
                      </div>
                      <Progress value={(item.count / totalOrders) * 100} className={item.color} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
*/}
            {/* Recent Orders and Upcoming Deliveries
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
           
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <table className="w-full">
                    <thead>
                      <tr className="text-left">
                        <th className="pb-4">Order ID</th>
                        <th className="pb-4">Status</th>
                        <th className="pb-4">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.slice(0, 3).map((order) => (
                        <tr key={order.id} className="border-t">
                          <td className="py-4">{order.id}</td>
                          <td className="py-4 flex items-center">
                            {getOrderStatusIcon(order.status)}
                            <span className="ml-2">{getOrderStatusBadge(order.status)}</span>
                          </td>
                          <td className="py-4">${order.total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Button variant="link" className="mt-4">
                    View all orders <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
 */}
              {/* Upcoming Deliveries
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Deliveries</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {getUpcomingDeliveries().map((delivery) => (
                      <li key={delivery.id} className="flex items-center space-x-4">
                        <div className="bg-muted rounded-full p-2">
                          <Calendar className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{delivery.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {delivery.date} - {delivery.address}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
 */}
            {/* Order Status Timeline */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Order Status Timeline</CardTitle>
                <CardDescription>Track your order's journey from purchase to delivery</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted"></div>
                  <ul className="space-y-6 relative">
                    {[
                      {
                        status: "Order Created",
                        description: "We've received your order",
                        icon: Clock,
                        color: "bg-blue-100 text-blue-600",
                        completed: true,
                        actionable: false,
                      },
                      {
                        status: "Items Purchased",
                        description: "We've bought your items",
                        icon: ShoppingBag,
                        color: "bg-indigo-100 text-indigo-600",
                        completed: true,
                        actionable: false,
                      },
                      {
                        status: "Items Received",
                        description: "Items arrived at our warehouse",
                        icon: Box,
                        color: "bg-purple-100 text-purple-600",
                        completed: false, // Changed to false to make it the current step where action is needed
                        actionable: true,
                      },
                      {
                        status: "Packing",
                        description: "Your items are being packed",
                        icon: PackageIcon,
                        color: "bg-amber-100 text-amber-600",
                        completed: false,
                        actionable: false, // Changed to false since action happens in previous step now
                      },
                      {
                        status: "Shipped",
                        description: "Your package is on the way",
                        icon: Truck,
                        color: "bg-teal-100 text-teal-600",
                        completed: false,
                        actionable: false,
                      },
                      {
                        status: "Delivered",
                        description: "Package delivered to your address",
                        icon: CheckCircle,
                        color: "bg-green-100 text-green-600",
                        completed: false,
                        actionable: false,
                      },
                    ].map((step, index) => (
                      <li key={index} className="pl-10 relative">
                        <div
                          className={`absolute left-0 rounded-full p-2 ${step.completed ? step.color : "bg-muted text-muted-foreground"}`}
                        >
                          <step.icon className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <h4 className="font-medium">{step.status}</h4>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                          </div>

                          {step.status === "Items Received" && !step.completed && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2 md:mt-0 bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                              onClick={() => router.push("/orders?configure=packing&orderId=ORD002")}
                            >
                              <PackageIcon className="mr-1 h-4 w-4" />
                              Configure Packing
                            </Button>
                          )}
                        </div>

                        {step.completed && index < 5 && (
                          <div className="absolute left-4 top-10 bottom-0 h-6 w-0.5 bg-gradient-to-b from-primary to-muted"></div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Spending Overview 
            <Card>
              <CardHeader>
                <CardTitle>Spending Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="thisMonth">
                  <TabsList>
                    <TabsTrigger value="thisWeek">This Week</TabsTrigger>
                    <TabsTrigger value="thisMonth">This Month</TabsTrigger>
                    <TabsTrigger value="lastMonth">Last Month</TabsTrigger>
                  </TabsList>
                  <TabsContent value="thisMonth" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Spent</p>
                        <p className="text-3xl font-bold">$1,234.56</p>
                      </div>
                      <Button>
                        <DollarSign className="mr-2 h-4 w-4" /> Add Funds
                      </Button>
                    </div>
                    <Progress value={75} className="w-full" />
                    <p className="text-sm text-muted-foreground">75% of your monthly budget</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>*/}
          </div>
        </main>
      </div>

      {/* Add Funds Dialog */}
      <Dialog open={showAddFundsDialog} onOpenChange={setShowAddFundsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Funds to Your Wallet</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Your wallet balance is insufficient for this order.</p>
            <div className="flex justify-between items-center">
              <span>Current Balance:</span>
              <span className="font-semibold">${walletBalance.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Order Total:</span>
              <span className="font-semibold">${orderTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-red-500">
              <span>Shortfall:</span>
              <span className="font-semibold">${(orderTotal - walletBalance).toFixed(2)}</span>
            </div>
            <div className="pt-2">
              <label htmlFor="funds" className="block text-sm font-medium mb-1">
                Amount to Add:
              </label>
              <Input
                id="funds"
                type="number"
                value={fundsToAdd}
                onChange={(e) => setFundsToAdd(Number(e.target.value))}
                min={orderTotal - walletBalance}
                className="mb-2"
              />
            </div>
            <Button onClick={() => handleAddFunds(fundsToAdd)} className="w-full">
              <DollarSign className="mr-2 h-4 w-4" /> Add Funds & Complete Order
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Packing Options Dialog */}
      <Dialog open={showPackingOptionsDialog} onOpenChange={setShowPackingOptionsDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Customize Packing Options</DialogTitle>
            <DialogDescription>Select additional services for your package before shipping</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <h4 className="font-medium">Additional Services</h4>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="double-packing"
                    checked={packingOptions.doublePacking}
                    onCheckedChange={(checked) =>
                      setPackingOptions({ ...packingOptions, doublePacking: checked === true })
                    }
                  />
                  <div className="space-y-1">
                    <Label htmlFor="double-packing" className="font-medium">
                      Double Packing Protection
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Extra layer of protection with double boxing and cushioning
                    </p>
                    <p className="text-sm font-medium">$15.00</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="photo-documentation"
                    checked={packingOptions.photoDocumentation}
                    onCheckedChange={(checked) =>
                      setPackingOptions({ ...packingOptions, photoDocumentation: checked === true })
                    }
                  />
                  <div className="space-y-1">
                    <Label htmlFor="photo-documentation" className="font-medium">
                      Photo Documentation
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive photos of your items before packing and after packing
                    </p>
                    <p className="text-sm font-medium">$10.00</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="insurance-protection"
                    checked={packingOptions.insuranceProtection}
                    onCheckedChange={(checked) =>
                      setPackingOptions({ ...packingOptions, insuranceProtection: checked === true })
                    }
                  />
                  <div className="space-y-1">
                    <Label htmlFor="insurance-protection" className="font-medium">
                      Insurance Protection
                    </Label>
                    <p className="text-sm text-muted-foreground">Additional insurance coverage up to $1000</p>
                    <p className="text-sm font-medium">$20.00</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium">Carrier Selection</h4>

              <RadioGroup value={selectedCarrier} onValueChange={setSelectedCarrier}>
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="standard" id="standard" />
                  <div className="space-y-1">
                    <Label htmlFor="standard" className="font-medium">
                      Standard Shipping
                    </Label>
                    <p className="text-sm text-muted-foreground">5-7 business days (included in base price)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 mt-3">
                  <RadioGroupItem value="priority" id="priority" />
                  <div className="space-y-1">
                    <Label htmlFor="priority" className="font-medium">
                      Priority Shipping
                    </Label>
                    <p className="text-sm text-muted-foreground">3-5 business days</p>
                    <p className="text-sm font-medium">+$15.00</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 mt-3">
                  <RadioGroupItem value="express" id="express" />
                  <div className="space-y-1">
                    <Label htmlFor="express" className="font-medium">
                      Express Shipping
                    </Label>
                    <p className="text-sm text-muted-foreground">1-2 business days</p>
                    <p className="text-sm font-medium">+$25.00</p>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row sm:justify-between items-center">
            <div className="mb-4 sm:mb-0">
              <p className="text-sm font-medium">Total Extra Services:</p>
              <p className="text-lg font-bold">${calculateExtraServicesCost().toFixed(2)}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowPackingOptionsDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handlePackingOptionsSubmit}>
                <CreditCard className="mr-2 h-4 w-4" />
                Pay & Apply
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
