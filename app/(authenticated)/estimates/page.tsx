"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Calculator,
  Search,
  Filter,
  Download,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  Truck,
  RefreshCw,
} from "lucide-react"

// Mock data for estimates
const initialEstimates = [
  {
    id: "EST123456",
    date: "Mar 10, 2025",
    status: "Active",
    origin: "United States",
    destination: "Canada",
    items: [{ name: "Laptop", quantity: 1, weight: 2.5, dimensions: "15 x 10 x 1 in" }],
    shippingOptions: [
      { carrier: "UPS", service: "Express", price: 45.99, estimatedDelivery: "2-3 business days" },
      { carrier: "FedEx", service: "Standard", price: 32.5, estimatedDelivery: "4-5 business days" },
      { carrier: "USPS", service: "Priority", price: 28.75, estimatedDelivery: "3-4 business days" },
    ],
    expiresAt: "Mar 17, 2025",
  },
  {
    id: "EST789012",
    date: "Mar 8, 2025",
    status: "Converted",
    origin: "United States",
    destination: "United Kingdom",
    items: [
      { name: "Smartphone", quantity: 1, weight: 0.5, dimensions: "6 x 3 x 0.5 in" },
      { name: "Phone Accessories", quantity: 3, weight: 0.3, dimensions: "4 x 4 x 2 in" },
    ],
    shippingOptions: [
      { carrier: "DHL", service: "Express", price: 65.99, estimatedDelivery: "2-3 business days" },
      { carrier: "UPS", service: "Worldwide Expedited", price: 58.5, estimatedDelivery: "3-5 business days" },
    ],
    convertedToOrderId: "SP987654321",
    expiresAt: "Mar 15, 2025",
  },
  {
    id: "EST345678",
    date: "Mar 5, 2025",
    status: "Expired",
    origin: "United States",
    destination: "Germany",
    items: [
      { name: "Camera", quantity: 1, weight: 1.2, dimensions: "8 x 6 x 4 in" },
      { name: "Camera Lens", quantity: 2, weight: 0.8, dimensions: "4 x 4 x 6 in" },
    ],
    shippingOptions: [
      { carrier: "FedEx", service: "International Priority", price: 78.99, estimatedDelivery: "2-3 business days" },
      { carrier: "UPS", service: "Worldwide Expedited", price: 72.5, estimatedDelivery: "3-5 business days" },
      { carrier: "DHL", service: "Express", price: 75.25, estimatedDelivery: "2-3 business days" },
    ],
    expiresAt: "Mar 12, 2025",
  },
]

export default function EstimatesPage() {
  const [estimates, setEstimates] = useState(initialEstimates)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedEstimate, setSelectedEstimate] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isCreateEstimateOpen, setIsCreateEstimateOpen] = useState(false)

  // Form state for creating a new estimate
  const [newEstimate, setNewEstimate] = useState({
    origin: "United States",
    destination: "",
    items: [{ name: "", quantity: 1, weight: 0, dimensions: "" }],
  })

  const filteredEstimates = estimates.filter((estimate) => {
    // Search filter
    const matchesSearch =
      estimate.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      estimate.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

    // Status filter
    const matchesStatus = statusFilter === "all" || estimate.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Converted":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Expired":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="h-4 w-4" />
      case "Converted":
        return <Truck className="h-4 w-4" />
      case "Expired":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const viewEstimateDetails = (estimate) => {
    setSelectedEstimate(estimate)
    setIsDetailsOpen(true)
  }

  const handleAddItem = () => {
    setNewEstimate({
      ...newEstimate,
      items: [...newEstimate.items, { name: "", quantity: 1, weight: 0, dimensions: "" }],
    })
  }

  const handleRemoveItem = (index) => {
    const updatedItems = [...newEstimate.items]
    updatedItems.splice(index, 1)
    setNewEstimate({
      ...newEstimate,
      items: updatedItems,
    })
  }

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...newEstimate.items]
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    }
    setNewEstimate({
      ...newEstimate,
      items: updatedItems,
    })
  }

  const handleCreateEstimate = () => {
    // In a real app, this would call an API to create the estimate
    const newEstimateObj = {
      id: `EST${Math.floor(Math.random() * 1000000)}`,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      status: "Active",
      origin: newEstimate.origin,
      destination: newEstimate.destination,
      items: newEstimate.items,
      shippingOptions: [
        {
          carrier: "UPS",
          service: "Express",
          price: (Math.random() * 50 + 30).toFixed(2),
          estimatedDelivery: "2-3 business days",
        },
        {
          carrier: "FedEx",
          service: "Standard",
          price: (Math.random() * 40 + 25).toFixed(2),
          estimatedDelivery: "4-5 business days",
        },
      ],
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    }

    setEstimates([newEstimateObj, ...estimates])
    setIsCreateEstimateOpen(false)
    setNewEstimate({
      origin: "United States",
      destination: "",
      items: [{ name: "", quantity: 1, weight: 0, dimensions: "" }],
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Shipping Estimates</h1>
          <p className="text-muted-foreground mt-2">Get shipping quotes and compare rates.</p>
        </div>
        <Button onClick={() => setIsCreateEstimateOpen(true)}>
          <Calculator className="h-4 w-4 mr-2" />
          New Estimate
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search estimates..."
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="converted">Converted</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Estimates</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="converted">Converted</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {filteredEstimates.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Calculator className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No estimates found</p>
                <p className="text-muted-foreground text-center mt-1">
                  {searchQuery || statusFilter !== "all"
                    ? "Try adjusting your filters to see more results."
                    : "Create a new shipping estimate to get started."}
                </p>
                {!searchQuery && statusFilter === "all" && (
                  <Button className="mt-4" onClick={() => setIsCreateEstimateOpen(true)}>
                    <Calculator className="h-4 w-4 mr-2" />
                    New Estimate
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredEstimates.map((estimate) => (
                <Card key={estimate.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{estimate.id}</CardTitle>
                        <CardDescription>{estimate.date}</CardDescription>
                      </div>
                      <Badge className={`flex items-center gap-1 ${getStatusColor(estimate.status)}`}>
                        {getStatusIcon(estimate.status)}
                        <span>{estimate.status}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="font-medium">Origin:</div>
                        <div>{estimate.origin}</div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="font-medium">Destination:</div>
                        <div>{estimate.destination}</div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="font-medium">Items:</div>
                        <div>{estimate.items.length}</div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="font-medium">Options:</div>
                        <div>{estimate.shippingOptions.length}</div>
                      </div>
                      {estimate.status !== "Expired" && (
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">Expires:</div>
                          <div>{estimate.expiresAt}</div>
                        </div>
                      )}
                      {estimate.convertedToOrderId && (
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">Order ID:</div>
                          <div>{estimate.convertedToOrderId}</div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-3">
                    <Button variant="outline" className="w-full" onClick={() => viewEstimateDetails(estimate)}>
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredEstimates.filter((est) => est.status === "Active").length === 0 ? (
              <Card className="col-span-full">
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No active estimates</p>
                  <p className="text-muted-foreground text-center mt-1">
                    Create a new shipping estimate to get started.
                  </p>
                  <Button className="mt-4" onClick={() => setIsCreateEstimateOpen(true)}>
                    <Calculator className="h-4 w-4 mr-2" />
                    New Estimate
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredEstimates
                .filter((est) => est.status === "Active")
                .map((estimate) => (
                  <Card key={estimate.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{estimate.id}</CardTitle>
                          <CardDescription>{estimate.date}</CardDescription>
                        </div>
                        <Badge className={`flex items-center gap-1 ${getStatusColor(estimate.status)}`}>
                          {getStatusIcon(estimate.status)}
                          <span>{estimate.status}</span>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">Origin:</div>
                          <div>{estimate.origin}</div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">Destination:</div>
                          <div>{estimate.destination}</div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">Items:</div>
                          <div>{estimate.items.length}</div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">Options:</div>
                          <div>{estimate.shippingOptions.length}</div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">Expires:</div>
                          <div>{estimate.expiresAt}</div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-3">
                      <Button variant="outline" className="w-full" onClick={() => viewEstimateDetails(estimate)}>
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="converted" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredEstimates.filter((est) => est.status === "Converted").length === 0 ? (
              <Card className="col-span-full">
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Truck className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No converted estimates</p>
                  <p className="text-muted-foreground text-center mt-1">
                    Estimates that have been converted to orders will appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredEstimates
                .filter((est) => est.status === "Converted")
                .map((estimate) => (
                  <Card key={estimate.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{estimate.id}</CardTitle>
                          <CardDescription>{estimate.date}</CardDescription>
                        </div>
                        <Badge className={`flex items-center gap-1 ${getStatusColor(estimate.status)}`}>
                          {getStatusIcon(estimate.status)}
                          <span>{estimate.status}</span>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">Origin:</div>
                          <div>{estimate.origin}</div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">Destination:</div>
                          <div>{estimate.destination}</div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">Items:</div>
                          <div>{estimate.items.length}</div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">Order ID:</div>
                          <div>{estimate.convertedToOrderId}</div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-3">
                      <Button variant="outline" className="w-full" onClick={() => viewEstimateDetails(estimate)}>
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="expired" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredEstimates.filter((est) => est.status === "Expired").length === 0 ? (
              <Card className="col-span-full">
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <XCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No expired estimates</p>
                  <p className="text-muted-foreground text-center mt-1">
                    Estimates that have expired will appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredEstimates
                .filter((est) => est.status === "Expired")
                .map((estimate) => (
                  <Card key={estimate.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{estimate.id}</CardTitle>
                          <CardDescription>{estimate.date}</CardDescription>
                        </div>
                        <Badge className={`flex items-center gap-1 ${getStatusColor(estimate.status)}`}>
                          {getStatusIcon(estimate.status)}
                          <span>{estimate.status}</span>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">Origin:</div>
                          <div>{estimate.origin}</div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">Destination:</div>
                          <div>{estimate.destination}</div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">Items:</div>
                          <div>{estimate.items.length}</div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">Expired On:</div>
                          <div>{estimate.expiresAt}</div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-3 flex gap-2">
                      <Button variant="outline" className="flex-1" onClick={() => viewEstimateDetails(estimate)}>
                        View Details
                      </Button>
                      <Button className="flex-1">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Recreate
                      </Button>
                    </CardFooter>
                  </Card>
                ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Estimate Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedEstimate && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>Estimate {selectedEstimate.id}</span>
                  <Badge className={getStatusColor(selectedEstimate.status)}>
                    {getStatusIcon(selectedEstimate.status)}
                    <span className="ml-1">{selectedEstimate.status}</span>
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  Created on {selectedEstimate.date}
                  {selectedEstimate.status !== "Expired" && ` • Valid until ${selectedEstimate.expiresAt}`}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-center">
                    <p className="text-sm text-muted-foreground">From</p>
                    <p className="font-medium">{selectedEstimate.origin}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground mx-4" />
                  <div className="flex-1 text-center">
                    <p className="text-sm text-muted-foreground">To</p>
                    <p className="font-medium">{selectedEstimate.destination}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">Items</h3>
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead className="text-right">Qty</TableHead>
                          <TableHead className="text-right">Weight</TableHead>
                          <TableHead className="text-right">Dimensions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedEstimate.items.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell className="text-right">{item.quantity}</TableCell>
                            <TableCell className="text-right">{item.weight} kg</TableCell>
                            <TableCell className="text-right">{item.dimensions}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">Shipping Options</h3>
                  <div className="space-y-3">
                    {selectedEstimate.shippingOptions.map((option, index) => (
                      <Card key={index} className={index === 0 ? "border-primary" : ""}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">
                                {option.carrier} {option.service}
                              </p>
                              <p className="text-sm text-muted-foreground">{option.estimatedDelivery}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold">${option.price}</p>
                              {index === 0 && <Badge className="mt-1">Best Value</Badge>}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter className="flex justify-between items-center">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>

                <div className="flex gap-2">
                  {selectedEstimate.status === "Active" && (
                    <Button size="sm">
                      <Truck className="h-4 w-4 mr-2" />
                      Book Shipment
                    </Button>
                  )}
                  {selectedEstimate.status === "Expired" && (
                    <Button size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Recreate Estimate
                    </Button>
                  )}
                  {selectedEstimate.status === "Converted" && (
                    <Button size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View Order
                    </Button>
                  )}
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Estimate Dialog */}
      <Dialog open={isCreateEstimateOpen} onOpenChange={setIsCreateEstimateOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Shipping Estimate</DialogTitle>
            <DialogDescription>Enter the details of your shipment to get an estimate.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label htmlFor="origin" className="block text-sm font-medium text-gray-700">
                Origin
              </label>
              <Select
                defaultValue={newEstimate.origin}
                onValueChange={(value) => setNewEstimate({ ...newEstimate, origin: value })}
              >
                <SelectTrigger className="w-full">{newEstimate.origin}</SelectTrigger>
                <SelectContent>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="Germany">Germany</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
                Destination
              </label>
              <Input
                id="destination"
                value={newEstimate.destination}
                onChange={(e) => setNewEstimate({ ...newEstimate, destination: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Items</label>
              {newEstimate.items.map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    placeholder="Item Name"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, "name", e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, "quantity", Number.parseInt(e.target.value))}
                  />
                  <Input
                    type="number"
                    placeholder="Weight (kg)"
                    value={item.weight}
                    onChange={(e) => handleItemChange(index, "weight", Number.parseFloat(e.target.value))}
                  />
                  <Input
                    placeholder="Dimensions"
                    value={item.dimensions}
                    onChange={(e) => handleItemChange(index, "dimensions", e.target.value)}
                  />
                  {newEstimate.items.length > 1 && (
                    <Button variant="destructive" size="sm" onClick={() => handleRemoveItem(index)}>
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="secondary" size="sm" onClick={handleAddItem}>
                Add Item
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" onClick={handleCreateEstimate}>
              Create Estimate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
