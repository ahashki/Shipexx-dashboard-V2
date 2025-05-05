"use client"

import { useState } from "react"
import { Search, Package, Truck, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [activeTab, setActiveTab] = useState("current")

  // Mock data for demonstration
  const currentPackages = [
    {
      id: "SP123456789",
      trackingNumber: "1Z999AA1234567890",
      carrier: "UPS",
      status: "In Transit",
      estimatedDelivery: "Mar 15, 2025",
      origin: "New York, NY",
      destination: "Los Angeles, CA",
      lastUpdate: "Mar 10, 2025 - 2:34 PM",
      events: [
        { date: "Mar 10, 2025", time: "2:34 PM", location: "Chicago, IL", description: "Departed UPS facility" },
        { date: "Mar 10, 2025", time: "9:21 AM", location: "Chicago, IL", description: "Arrived at UPS facility" },
        { date: "Mar 9, 2025", time: "6:45 PM", location: "New York, NY", description: "Departed UPS origin facility" },
        {
          date: "Mar 9, 2025",
          time: "11:32 AM",
          location: "New York, NY",
          description: "Package received for shipping",
        },
      ],
    },
    {
      id: "SP987654321",
      trackingNumber: "9400111202555842761523",
      carrier: "USPS",
      status: "Out for Delivery",
      estimatedDelivery: "Mar 11, 2025",
      origin: "Miami, FL",
      destination: "Atlanta, GA",
      lastUpdate: "Mar 10, 2025 - 8:12 AM",
      events: [
        { date: "Mar 10, 2025", time: "8:12 AM", location: "Atlanta, GA", description: "Out for delivery" },
        { date: "Mar 10, 2025", time: "6:30 AM", location: "Atlanta, GA", description: "Arrived at local facility" },
        { date: "Mar 9, 2025", time: "7:22 PM", location: "Jacksonville, FL", description: "In transit" },
        {
          date: "Mar 9, 2025",
          time: "10:15 AM",
          location: "Miami, FL",
          description: "Accepted at USPS origin facility",
        },
      ],
    },
  ]

  const deliveredPackages = [
    {
      id: "SP567891234",
      trackingNumber: "7196361636363",
      carrier: "FedEx",
      status: "Delivered",
      deliveredDate: "Mar 5, 2025",
      origin: "Seattle, WA",
      destination: "Portland, OR",
      lastUpdate: "Mar 5, 2025 - 3:45 PM",
      events: [
        {
          date: "Mar 5, 2025",
          time: "3:45 PM",
          location: "Portland, OR",
          description: "Delivered, left at front door",
        },
        { date: "Mar 5, 2025", time: "9:30 AM", location: "Portland, OR", description: "Out for delivery" },
        { date: "Mar 4, 2025", time: "8:22 PM", location: "Portland, OR", description: "Arrived at FedEx facility" },
        { date: "Mar 4, 2025", time: "11:45 AM", location: "Seattle, WA", description: "Picked up" },
      ],
    },
  ]

  const handleSearch = () => {
    if (!trackingNumber) return
    setIsSearching(true)
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false)
      // In a real app, this would update state with search results
    }, 1500)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Out for Delivery":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "In Transit":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Exception":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
      case "Out for Delivery":
        return <Truck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      case "In Transit":
        return <Truck className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
      case "Exception":
        return <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
      default:
        return <Package className="h-5 w-5 text-gray-600 dark:text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Package Tracking</h1>
        <p className="text-muted-foreground mt-2">Track your packages in real-time and view delivery status.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Track a Package</CardTitle>
          <CardDescription>Enter a tracking number or Shipexx ID to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Enter tracking number or Shipexx ID"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={isSearching || !trackingNumber}>
              {isSearching ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Searching...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Track Package
                </span>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="current" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="current">Current Shipments</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="mt-4 space-y-4">
          {currentPackages.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No current shipments</p>
                <p className="text-muted-foreground text-center mt-1">
                  When you have active shipments, they will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            currentPackages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {pkg.id}
                        <Badge variant="outline">{pkg.carrier}</Badge>
                      </CardTitle>
                      <CardDescription className="mt-1">Tracking: {pkg.trackingNumber}</CardDescription>
                    </div>
                    <Badge
                      className={`${getStatusColor(pkg.status)} flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium`}
                    >
                      {getStatusIcon(pkg.status)}
                      {pkg.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">From</p>
                        <p className="text-sm text-muted-foreground">{pkg.origin}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">To</p>
                        <p className="text-sm text-muted-foreground">{pkg.destination}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Estimated Delivery</p>
                        <p className="text-sm text-muted-foreground">{pkg.estimatedDelivery}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Last Update</p>
                        <p className="text-sm text-muted-foreground">{pkg.lastUpdate}</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Tracking History</h4>
                    <div className="space-y-3">
                      {pkg.events.map((event, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="relative flex flex-col items-center">
                            <div
                              className={`h-2.5 w-2.5 rounded-full ${index === 0 ? "bg-primary" : "bg-muted-foreground"}`}
                            />
                            {index < pkg.events.length - 1 && (
                              <div className="h-full w-px bg-border absolute top-2.5" />
                            )}
                          </div>
                          <div className="flex-1 pb-2">
                            <p className="text-sm font-medium">{event.description}</p>
                            <p className="text-xs text-muted-foreground">
                              {event.date} • {event.time} • {event.location}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 px-6 py-3">
                  <div className="flex justify-between items-center w-full">
                    <Button variant="ghost" size="sm">
                      Copy Tracking #
                    </Button>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="delivered" className="mt-4 space-y-4">
          {deliveredPackages.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No delivered packages</p>
                <p className="text-muted-foreground text-center mt-1">Your delivered packages will appear here.</p>
              </CardContent>
            </Card>
          ) : (
            deliveredPackages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {pkg.id}
                        <Badge variant="outline">{pkg.carrier}</Badge>
                      </CardTitle>
                      <CardDescription className="mt-1">Tracking: {pkg.trackingNumber}</CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      {pkg.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">From</p>
                        <p className="text-sm text-muted-foreground">{pkg.origin}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">To</p>
                        <p className="text-sm text-muted-foreground">{pkg.destination}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Delivered On</p>
                        <p className="text-sm text-muted-foreground">{pkg.deliveredDate}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Last Update</p>
                        <p className="text-sm text-muted-foreground">{pkg.lastUpdate}</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Delivery History</h4>
                    <div className="space-y-3">
                      {pkg.events.map((event, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="relative flex flex-col items-center">
                            <div
                              className={`h-2.5 w-2.5 rounded-full ${index === 0 ? "bg-primary" : "bg-muted-foreground"}`}
                            />
                            {index < pkg.events.length - 1 && (
                              <div className="h-full w-px bg-border absolute top-2.5" />
                            )}
                          </div>
                          <div className="flex-1 pb-2">
                            <p className="text-sm font-medium">{event.description}</p>
                            <p className="text-xs text-muted-foreground">
                              {event.date} • {event.time} • {event.location}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 px-6 py-3">
                  <div className="flex justify-between items-center w-full">
                    <Button variant="ghost" size="sm">
                      Copy Tracking #
                    </Button>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
