"use client"

import type React from "react"

import { useState } from "react"
import {
  Clock,
  ShoppingBag,
  Box,
  PackageIcon,
  Truck,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define the types for our component
export enum OrderStatus {
  Open = 0,
  PartiallyReceived = 1,
  ReadyForPacking = 2,
  PackingInProgress = 3,
  ReadyToShip = 4,
  PartiallyShipped = 5,
  Completed = 6,
  Canceled = 7,
}

export interface OrderTimelineStep {
  status: string
  description: string
  icon: React.ElementType
  color: string
  completed: boolean
}

export interface OrderTimelineData {
  id: string
  name: string
  date: string
  status: OrderStatus
  steps: OrderTimelineStep[]
}

interface MultiOrderTimelineProps {
  orders: OrderTimelineData[]
  className?: string
}

export const MultiOrderTimeline: React.FC<MultiOrderTimelineProps> = ({ orders, className = "" }) => {
  const [activeOrderIndex, setActiveOrderIndex] = useState(0)
  const activeOrder = orders[activeOrderIndex]

  // Handle navigation between orders
  const goToPreviousOrder = () => {
    if (activeOrderIndex > 0) {
      setActiveOrderIndex(activeOrderIndex - 1)
    }
  }

  const goToNextOrder = () => {
    if (activeOrderIndex < orders.length - 1) {
      setActiveOrderIndex(activeOrderIndex + 1)
    }
  }

  // If no orders, show a message
  if (orders.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Order Status Timeline</CardTitle>
          <CardDescription>Track your order's journey from purchase to delivery</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>No orders to display</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Order Status Timeline</CardTitle>
            <CardDescription>Track your order's journey from purchase to delivery</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={goToPreviousOrder} disabled={activeOrderIndex === 0}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous order</span>
            </Button>
            <Badge variant="outline" className="px-3 py-1">
              {activeOrderIndex + 1} of {orders.length}
            </Badge>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNextOrder}
              disabled={activeOrderIndex === orders.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next order</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue={orders[0].id}
          value={activeOrder.id}
          onValueChange={(value) => {
            const index = orders.findIndex((order) => order.id === value)
            if (index !== -1) {
              setActiveOrderIndex(index)
            }
          }}
          className="w-full"
        >
          <TabsList className="mb-4 w-full h-auto flex flex-wrap">
            {orders.map((order, index) => (
              <TabsTrigger key={order.id} value={order.id} className="flex-grow">
                {order.id}
              </TabsTrigger>
            ))}
          </TabsList>

          {orders.map((order) => (
            <TabsContent key={order.id} value={order.id} className="mt-0">
              <div className="flex items-center justify-between mb-4 border-b pb-3">
                <div>
                  <h3 className="font-medium text-lg">{order.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-3.5 w-3.5" />
                    <span>{formatDate(order.date)}</span>
                  </div>
                </div>
                <Badge className="ml-2">{OrderStatus[order.status]}</Badge>
              </div>

              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted"></div>
                <ul className="space-y-6 relative">
                  {order.steps.map((step, index) => (
                    <li key={index} className="pl-10 relative">
                      <div
                        className={`absolute left-0 rounded-full p-2 ${
                          step.completed ? step.color : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <step.icon className="h-4 w-4" />
                      </div>
                      <h4 className="font-medium">{step.status}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                      {step.completed && index < order.steps.length - 1 && (
                        <div className="absolute left-4 top-10 bottom-0 h-6 w-0.5 bg-gradient-to-b from-primary to-muted"></div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

// Helper function to generate timeline steps based on order status
export const generateOrderTimelineSteps = (orderStatus: OrderStatus): OrderTimelineStep[] => {
  // Define all possible steps
  const allSteps: OrderTimelineStep[] = [
    {
      status: "Order Created",
      description: "We've received your order",
      icon: Clock,
      color: "bg-blue-100 text-blue-600",
      completed: orderStatus >= OrderStatus.Open,
    },
    {
      status: "Items Purchased",
      description: "We've bought your items",
      icon: ShoppingBag,
      color: "bg-indigo-100 text-indigo-600",
      completed: orderStatus >= OrderStatus.PartiallyReceived,
    },
    {
      status: "Items Received",
      description: "Items arrived at our warehouse",
      icon: Box,
      color: "bg-purple-100 text-purple-600",
      completed: orderStatus >= OrderStatus.ReadyForPacking,
    },
    {
      status: "Packing",
      description: "Your items are being packed",
      icon: PackageIcon,
      color: "bg-amber-100 text-amber-600",
      completed: orderStatus >= OrderStatus.PackingInProgress,
    },
    {
      status: "Shipped",
      description: "Your package is on the way",
      icon: Truck,
      color: "bg-teal-100 text-teal-600",
      completed: orderStatus >= OrderStatus.PartiallyShipped,
    },
    {
      status: "Delivered",
      description: "Package delivered to your address",
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
      completed: orderStatus >= OrderStatus.Completed,
    },
  ]

  return allSteps
}

// Default export for the component
export default MultiOrderTimeline
