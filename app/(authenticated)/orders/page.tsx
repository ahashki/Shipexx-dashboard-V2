"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Search,
  Filter,
  Package,
  FileText,
  Truck,
  Calendar,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Eye,
  Download,
} from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CreditCard } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { PackingCheckoutPage } from "@/components/dashboard/packing-checkout-page"

// Mock data for orders
const initialOrders = [
  {
    id: "SP123456789",
    date: "Mar 10, 2025",
    status: "In Transit",
    items: [
      { name: "Wireless Headphones", quantity: 1, price: 129.99 },
      { name: "Phone Case", quantity: 2, price: 19.99 },
    ],
    total: 169.97,
    shippingAddress: "123 Main St, New York, NY 10001",
    trackingNumber: "1Z999AA1234567890",
    carrier: "UPS",
    estimatedDelivery: "Mar 15, 2025",
  },
  {
    id: "SP987654321",
    date: "Mar 8, 2025",
    status: "Processing",
    items: [{ name: "Laptop", quantity: 1, price: 1299.99 }],
    total: 1299.99,
    shippingAddress: "456 Park Ave, Boston, MA 02108",
    trackingNumber: "",
    carrier: "",
    estimatedDelivery: "Mar 18, 2025",
  },
  {
    id: "SP567891234",
    date: "Mar 5, 2025",
    status: "Delivered",
    items: [
      { name: "Smart Watch", quantity: 1, price: 249.99 },
      { name: "Watch Band", quantity: 2, price: 29.99 },
    ],
    total: 309.97,
    shippingAddress: "789 Broadway, New York, NY 10003",
    trackingNumber: "7196361636363",
    carrier: "FedEx",
    estimatedDelivery: "Mar 5, 2025",
  },
  {
    id: "SP246813579",
    date: "Feb 28, 2025",
    status: "Delivered",
    items: [{ name: "Bluetooth Speaker", quantity: 1, price: 79.99 }],
    total: 79.99,
    shippingAddress: "321 Oak St, Chicago, IL 60007",
    trackingNumber: "9400111202555842761523",
    carrier: "USPS",
    estimatedDelivery: "Mar 3, 2025",
  },
  {
    id: "SP135792468",
    date: "Feb 25, 2025",
    status: "Delivered",
    items: [
      { name: "Tablet", quantity: 1, price: 499.99 },
      { name: "Tablet Case", quantity: 1, price: 39.99 },
      { name: "Screen Protector", quantity: 1, price: 19.99 },
    ],
    total: 559.97,
    shippingAddress: "555 Pine St, Seattle, WA 98101",
    trackingNumber: "1Z111222333444555",
    carrier: "UPS",
    estimatedDelivery: "Mar 1, 2025",
  },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [walletBalance, setWalletBalance] = useState(523.45) // Mock wallet balance

  const searchParams = useSearchParams()
  const configureMode = searchParams.get("configure")
  const configOrderId = searchParams.get("orderId")

  const [packingOptions, setPackingOptions] = useState({
    doubleBoxing: false,
    bubbleWrap: false,
    fragileStickers: false,
    photoDocumentation: false,
    insurance: false,
  })

  const [selectedCarrier, setSelectedCarrier] = useState("ups-ground")
  const [specialInstructions, setSpecialInstructions] = useState("")
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)

  // Find the order being configured
  const orderBeingConfigured = configOrderId ? orders.find((order) => order.id === configOrderId) : null

  const calculateExtraServicesCost = () => {
    let cost = 0
    if (packingOptions.doubleBoxing) cost += 5.99
    if (packingOptions.bubbleWrap) cost += 3.99
    if (packingOptions.fragileStickers) cost += 1.99
    if (packingOptions.photoDocumentation) cost += 4.99
    if (packingOptions.insurance) cost += 9.99

    // Add carrier costs based on selection
    switch (selectedCarrier) {
      // UPS
      case "ups-ground":
        // Included in base price
        break
      case "ups-3day":
        cost += 12.99
        break
      case "ups-2day":
        cost += 19.99
        break

      // FedEx
      case "fedex-ground":
        cost += 2.99
        break
      case "fedex-express":
        cost += 14.99
        break
      case "fedex-priority":
        cost += 29.99
        break

      // USPS
      case "usps-first":
        cost += 1.99
        break
      case "usps-priority":
        cost += 8.99
        break
      case "usps-express":
        cost += 24.99
        break
    }

    return cost
  }

  const handlePackingOptionsSubmit = () => {
    // Instead of processing directly, show the checkout page
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
    // Update the order status
    if (orderBeingConfigured) {
      const updatedOrders = orders.map((order) => {
        if (order.id === orderBeingConfigured.id) {
          return {
            ...order,
            status: "Processing",
            packingOptions,
            carrier: selectedCarrier,
            specialInstructions,
          }
        }
        return order
      })

      setOrders(updatedOrders)

      // Show success message
      toast({
        title: "Packing configuration complete",
        description: "Your package will be prepared according to your specifications.",
        variant: "default",
      })

      // Reset state and redirect
      setShowCheckout(false)
      router.push("/orders")
    }
  }

  const router = useRouter()

  // Debug information
  console.log("Query params:", {
    configureMode: configureMode,
    configOrderId: configOrderId,
    orderBeingConfigured: orderBeingConfigured,
  })

  // Add a visible debug element at the top of the component
  useEffect(() => {
    console.log("Orders page rendered with query params:", {
      configureMode,
      configOrderId,
      orderBeingConfigured: !!orderBeingConfigured,
    })
  }, [configureMode, configOrderId, orderBeingConfigured])

  const filteredOrders = orders.filter((order) => {
    // Search filter
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

    // Status filter
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase()

    // Date filter
    let matchesDate = true
    const orderDate = new Date(order.date)
    const now = new Date()

    if (dateFilter === "last7days") {
      const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7))
      matchesDate = orderDate >= sevenDaysAgo
    } else if (dateFilter === "last30days") {
      const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30))
      matchesDate = orderDate >= thirtyDaysAgo
    } else if (dateFilter === "last3months") {
      const threeMonthsAgo = new Date(now.setMonth(now.getMonth() - 3))
      matchesDate = orderDate >= threeMonthsAgo
    }

    return matchesSearch && matchesStatus && matchesDate
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "In Transit":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Processing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="h-4 w-4" />
      case "In Transit":
        return <Truck className="h-4 w-4" />
      case "Processing":
        return <RefreshCw className="h-4 w-4" />
      case "Cancelled":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const viewOrderDetails = (order) => {
    setSelectedOrder(order)
    setIsDetailsOpen(true)
  }

  // If checkout is showing, render the checkout page
  if (showCheckout && orderBeingConfigured) {
    return (
      <PackingCheckoutPage
        orderId={orderBeingConfigured.id}
        orderTotal={orderBeingConfigured.total}
        packingOptions={packingOptions}
        selectedCarrier={selectedCarrier}
        specialInstructions={specialInstructions}
        extraServicesCost={calculateExtraServicesCost()}
        walletBalance={walletBalance}
        onAddFunds={handleAddFunds}
        onCompleteOrder={handleCompleteOrder}
        onCancel={() => setShowCheckout(false)}
      />
    )
  }

  return (
    <>
      <div className="bg-red-500 p-2 text-white">Authenticated Orders Page</div>
      <div className="bg-yellow-100 p-4 border border-yellow-300 rounded-md mb-4">
        <h3 className="font-medium mb-2">Debug Tools</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => router.push("/orders?configure=packing&orderId=SP123456789")}
            variant="outline"
            size="sm"
          >
            Configure Order SP123456789
          </Button>
          <Button
            onClick={() => router.push("/orders?configure=packing&orderId=SP987654321")}
            variant="outline"
            size="sm"
          >
            Configure Order SP987654321
          </Button>
        </div>
        <p className="text-xs mt-2 text-muted-foreground">
          Current query params: configure={configureMode || "none"}, orderId={configOrderId || "none"}
        </p>
      </div>
      {configureMode === "packing" && orderBeingConfigured && (
        <div className="space-y-6 mb-8">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => router.push("/orders")}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Orders-100
            </Button>
            <h1 className="text-2xl font-bold">Configure Packing for Order {orderBeingConfigured.id}</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Packing Options
              </CardTitle>
              <CardDescription>Select additional packing services for your items</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="doubleBoxing"
                    checked={packingOptions.doubleBoxing}
                    onCheckedChange={(checked) =>
                      setPackingOptions({ ...packingOptions, doubleBoxing: checked === true })
                    }
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="doubleBoxing" className="text-sm font-medium">
                      Double Boxing (+$5.99)
                    </Label>
                    <p className="text-sm text-muted-foreground">Extra protection with a second outer box</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="bubbleWrap"
                    checked={packingOptions.bubbleWrap}
                    onCheckedChange={(checked) =>
                      setPackingOptions({ ...packingOptions, bubbleWrap: checked === true })
                    }
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="bubbleWrap" className="text-sm font-medium">
                      Bubble Wrap (+$3.99)
                    </Label>
                    <p className="text-sm text-muted-foreground">Cushioning for fragile items</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="fragileStickers"
                    checked={packingOptions.fragileStickers}
                    onCheckedChange={(checked) =>
                      setPackingOptions({ ...packingOptions, fragileStickers: checked === true })
                    }
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="fragileStickers" className="text-sm font-medium">
                      Fragile Stickers (+$1.99)
                    </Label>
                    <p className="text-sm text-muted-foreground">Alert handlers to handle with care</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="photoDocumentation"
                    checked={packingOptions.photoDocumentation}
                    onCheckedChange={(checked) =>
                      setPackingOptions({ ...packingOptions, photoDocumentation: checked === true })
                    }
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="photoDocumentation" className="text-sm font-medium">
                      Photo Documentation (+$4.99)
                    </Label>
                    <p className="text-sm text-muted-foreground">Photos of items before packing</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="insurance"
                    checked={packingOptions.insurance}
                    onCheckedChange={(checked) => setPackingOptions({ ...packingOptions, insurance: checked === true })}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="insurance" className="text-sm font-medium">
                      Shipping Insurance (+$9.99)
                    </Label>
                    <p className="text-sm text-muted-foreground">Coverage up to $500 for loss or damage</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-3">Carrier Selection</h3>
                <RadioGroup value={selectedCarrier} onValueChange={setSelectedCarrier} className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2 flex items-center">
                      <img src="/placeholder.svg?height=24&width=60" alt="UPS logo" className="mr-2 h-6" />
                      UPS
                    </h4>
                    <div className="space-y-3 ml-7">
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="ups-ground" id="ups-ground" />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor="ups-ground" className="text-sm font-medium">
                            UPS Ground (Included)
                          </Label>
                          <p className="text-sm text-muted-foreground">5-7 business days</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="ups-3day" id="ups-3day" />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor="ups-3day" className="text-sm font-medium">
                            UPS 3-Day Select (+$12.99)
                          </Label>
                          <p className="text-sm text-muted-foreground">3 business days</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="ups-2day" id="ups-2day" />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor="ups-2day" className="text-sm font-medium">
                            UPS 2nd Day Air (+$19.99)
                          </Label>
                          <p className="text-sm text-muted-foreground">2 business days</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2 flex items-center">
                      <img src="/placeholder.svg?height=24&width=60" alt="FedEx logo" className="mr-2 h-6" />
                      FedEx
                    </h4>
                    <div className="space-y-3 ml-7">
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="fedex-ground" id="fedex-ground" />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor="fedex-ground" className="text-sm font-medium">
                            FedEx Ground (+$2.99)
                          </Label>
                          <p className="text-sm text-muted-foreground">3-5 business days</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="fedex-express" id="fedex-express" />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor="fedex-express" className="text-sm font-medium">
                            FedEx Express Saver (+$14.99)
                          </Label>
                          <p className="text-sm text-muted-foreground">3 business days</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="fedex-priority" id="fedex-priority" />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor="fedex-priority" className="text-sm font-medium">
                            FedEx Priority Overnight (+$29.99)
                          </Label>
                          <p className="text-sm text-muted-foreground">Next business day</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2 flex items-center">
                      <img src="/placeholder.svg?height=24&width=60" alt="USPS logo" className="mr-2 h-6" />
                      USPS
                    </h4>
                    <div className="space-y-3 ml-7">
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="usps-first" id="usps-first" />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor="usps-first" className="text-sm font-medium">
                            USPS First Class (+$1.99)
                          </Label>
                          <p className="text-sm text-muted-foreground">3-5 business days</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="usps-priority" id="usps-priority" />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor="usps-priority" className="text-sm font-medium">
                            USPS Priority Mail (+$8.99)
                          </Label>
                          <p className="text-sm text-muted-foreground">1-3 business days</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="usps-express" id="usps-express" />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor="usps-express" className="text-sm font-medium">
                            USPS Priority Mail Express (+$24.99)
                          </Label>
                          <p className="text-sm text-muted-foreground">1-2 business days</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div>
                <Label htmlFor="specialInstructions" className="text-sm font-medium">
                  Special Instructions (Optional)
                </Label>
                <Textarea
                  id="specialInstructions"
                  placeholder="Add any special instructions for packing or shipping..."
                  className="mt-2"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="w-full p-4 bg-muted rounded-lg">
                <div className="flex justify-between mb-2">
                  <span>Base shipping cost:</span>
                  <span>${orderBeingConfigured.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Additional services:</span>
                  <span>${calculateExtraServicesCost().toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>New total:</span>
                  <span>${(orderBeingConfigured.total + calculateExtraServicesCost()).toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full" onClick={handlePackingOptionsSubmit}>
                <CreditCard className="mr-2 h-4 w-4" />
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground mt-2">View and manage your orders.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders by ID or item name..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Status</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="in transit">In Transit</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[130px]">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Date</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="last7days">Last 7 Days</SelectItem>
                <SelectItem value="last30days">Last 30 Days</SelectItem>
                <SelectItem value="last3months">Last 3 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="in-transit">In Transit</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {filteredOrders.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Package className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No orders found</p>
                  <p className="text-muted-foreground text-center mt-1">
                    {searchQuery || statusFilter !== "all" || dateFilter !== "all"
                      ? "Try adjusting your filters to see more results."
                      : "When you place orders, they will appear here."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader className="px-6">
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>
                    Showing {filteredOrders.length} {filteredOrders.length === 1 ? "order" : "orders"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Items</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>
                            <Badge className={`flex items-center gap-1 ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)}
                              <span>{order.status}</span>
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {order.items.length === 1
                              ? order.items[0].name
                              : `${order.items[0].name} +${order.items.length - 1} more`}
                          </TableCell>
                          <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => viewOrderDetails(order)}>
                              <Eye className="h-4 w-4 mr-1" />
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="processing" className="mt-6">
            <Card>
              <CardContent className="p-6">
                {filteredOrders.filter((order) => order.status === "Processing").length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10">
                    <RefreshCw className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">No processing orders</p>
                    <p className="text-muted-foreground text-center mt-1">
                      You don't have any orders currently being processed.
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="hidden md:table-cell">Items</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders
                        .filter((order) => order.status === "Processing")
                        .map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {order.items.length === 1
                                ? order.items[0].name
                                : `${order.items[0].name} +${order.items.length - 1} more`}
                            </TableCell>
                            <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" onClick={() => viewOrderDetails(order)}>
                                <Eye className="h-4 w-4 mr-1" />
                                Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="in-transit" className="mt-6">
            <Card>
              <CardContent className="p-6">
                {filteredOrders.filter((order) => order.status === "In Transit").length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10">
                    <Truck className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">No in-transit orders</p>
                    <p className="text-muted-foreground text-center mt-1">
                      You don't have any orders currently in transit.
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="hidden md:table-cell">Tracking</TableHead>
                        <TableHead className="hidden md:table-cell">Est. Delivery</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders
                        .filter((order) => order.status === "In Transit")
                        .map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {order.trackingNumber ? (
                                <div className="flex items-center gap-1">
                                  <span className="text-xs">{order.carrier}</span>
                                  <span className="text-xs text-muted-foreground">{order.trackingNumber}</span>
                                </div>
                              ) : (
                                <span className="text-xs text-muted-foreground">Not available</span>
                              )}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{order.estimatedDelivery}</TableCell>
                            <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" onClick={() => viewOrderDetails(order)}>
                                <Eye className="h-4 w-4 mr-1" />
                                Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="delivered" className="mt-6">
            <Card>
              <CardContent className="p-6">
                {filteredOrders.filter((order) => order.status === "Delivered").length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10">
                    <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">No delivered orders</p>
                    <p className="text-muted-foreground text-center mt-1">You don't have any delivered orders yet.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="hidden md:table-cell">Items</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders
                        .filter((order) => order.status === "Delivered")
                        .map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {order.items.length === 1
                                ? order.items[0].name
                                : `${order.items[0].name} +${order.items.length - 1} more`}
                            </TableCell>
                            <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" onClick={() => viewOrderDetails(order)}>
                                <Eye className="h-4 w-4 mr-1" />
                                Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Order Details Dialog */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            {selectedOrder && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center justify-between">
                    <span>Order {selectedOrder.id}</span>
                    <Badge className={getStatusColor(selectedOrder.status)}>
                      {getStatusIcon(selectedOrder.status)}
                      <span className="ml-1">{selectedOrder.status}</span>
                    </Badge>
                  </DialogTitle>
                  <DialogDescription>Placed on {selectedOrder.date}</DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Items</h3>
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Item</TableHead>
                            <TableHead className="text-right">Qty</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedOrder.items.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell className="text-right">{item.quantity}</TableCell>
                              <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                          <TableRow>
                            <TableCell colSpan={2} className="text-right font-medium">
                              Total
                            </TableCell>
                            <TableCell className="text-right font-medium">${selectedOrder.total.toFixed(2)}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Shipping Address</h3>
                      <p className="text-sm">{selectedOrder.shippingAddress}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Shipping Details</h3>
                      {selectedOrder.trackingNumber ? (
                        <div className="space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">Carrier:</span> {selectedOrder.carrier}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Tracking:</span> {selectedOrder.trackingNumber}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Est. Delivery:</span> {selectedOrder.estimatedDelivery}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">Tracking information not available yet.</p>
                      )}
                    </div>
                  </div>
                </div>

                <DialogFooter className="flex justify-between items-center">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Invoice
                  </Button>

                  <div className="flex gap-2">
                    {selectedOrder.trackingNumber && (
                      <Button variant="outline" size="sm">
                        <Truck className="h-4 w-4 mr-2" />
                        Track Package
                      </Button>
                    )}
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download Details
                    </Button>
                  </div>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
