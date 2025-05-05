"use client"

import { useState } from "react"
import MultiOrderTimeline, {
  OrderStatus,
  type OrderTimelineData,
  generateOrderTimelineSteps,
} from "@/components/dashboard/multi-order-timeline"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function OrderTimelineDemoPage() {
  // Sample order data
  const sampleOrders: OrderTimelineData[] = [
    {
      id: "ORD001",
      name: "Example.com Order",
      date: "2023-06-10",
      status: OrderStatus.PartiallyReceived,
      steps: generateOrderTimelineSteps(OrderStatus.PartiallyReceived),
    },
    {
      id: "ORD002",
      name: "Store.com Purchase",
      date: "2023-06-12",
      status: OrderStatus.PackingInProgress,
      steps: generateOrderTimelineSteps(OrderStatus.PackingInProgress),
    },
    {
      id: "ORD003",
      name: ".com Items",
      date: "2023-06-05",
      status: OrderStatus.Completed,
      steps: generateOrderTimelineSteps(OrderStatus.Completed),
    },
    {
      id: "ORD004",
      name: "New Electronics Order",
      date: "2023-06-18",
      status: OrderStatus.Open,
      steps: generateOrderTimelineSteps(OrderStatus.Open),
    },
  ]

  const [orders, setOrders] = useState<OrderTimelineData[]>(sampleOrders)
  const [showInstructions, setShowInstructions] = useState(true)

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Multi-Order Timeline  </h1>
{/*
      {showInstructions && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Integration Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              This component allows users to track multiple orders in a single timeline view. To integrate this into the
              dashboard:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                Import the <code className="bg-muted px-1 py-0.5 rounded">MultiOrderTimeline</code> component from{" "}
                <code className="bg-muted px-1 py-0.5 rounded">@/components/dashboard/multi-order-timeline</code>
              </li>
              <li>Replace the existing Order Status Timeline card in the dashboard with this component</li>
              <li>
                Pass your orders data to the component using the{" "}
                <code className="bg-muted px-1 py-0.5 rounded">orders</code> prop
              </li>
              <li>
                Use the <code className="bg-muted px-1 py-0.5 rounded">generateOrderTimelineSteps</code> helper function
                to create timeline steps based on order status
              </li>
            </ol>
            <Button onClick={() => setShowInstructions(false)} variant="outline" className="mt-2">
              Hide Instructions
            </Button>
          </CardContent>
        </Card>
      )}
*/}
      <MultiOrderTimeline orders={orders} className="mb-6" />

      <div className="flex flex-wrap gap-4 mt-8">
        <Button
          onClick={() => {
            const newOrder: OrderTimelineData = {
              id: `ORD${Math.floor(1000 + Math.random() * 9000)}`,
              name: `Random Order ${Math.floor(Math.random() * 100)}`,
              date: new Date().toISOString().split("T")[0],
              status: Math.floor(Math.random() * 7) as OrderStatus,
              steps: [],
            }
            newOrder.steps = generateOrderTimelineSteps(newOrder.status)
            setOrders([...orders, newOrder])
          }}
        >
          Add Random Order
        </Button>

        <Button
          variant="destructive"
          onClick={() => {
            if (orders.length > 0) {
              setOrders(orders.slice(0, -1))
            }
          }}
          disabled={orders.length === 0}
        >
          Remove Last Order
        </Button>

        <Button variant="outline" onClick={() => setOrders(sampleOrders)}>
          Reset Orders
        </Button>

        {!showInstructions && (
          <Button variant="ghost" onClick={() => setShowInstructions(true)}>
            Show Instructions
          </Button>
        )}
      </div>
    </div>
  )
}
