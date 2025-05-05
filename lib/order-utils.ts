import { OrderStatus } from "@/components/dashboard/multi-order-timeline"

// Map order status to human-readable text
export const getOrderStatusText = (status: OrderStatus): string => {
  const statusMap: Record<OrderStatus, string> = {
    [OrderStatus.Open]: "Open",
    [OrderStatus.PartiallyReceived]: "Partially Received",
    [OrderStatus.ReadyForPacking]: "Ready For Packing",
    [OrderStatus.PackingInProgress]: "Packing In Progress",
    [OrderStatus.ReadyToShip]: "Ready To Ship",
    [OrderStatus.PartiallyShipped]: "Partially Shipped",
    [OrderStatus.Completed]: "Completed",
    [OrderStatus.Canceled]: "Canceled",
  }

  return statusMap[status] || "Unknown"
}

// Get appropriate color for order status
export const getOrderStatusColor = (status: OrderStatus): string => {
  const colorMap: Record<OrderStatus, string> = {
    [OrderStatus.Open]: "bg-blue-50 text-blue-700 border-blue-200",
    [OrderStatus.PartiallyReceived]: "bg-yellow-50 text-yellow-700 border-yellow-200",
    [OrderStatus.ReadyForPacking]: "bg-indigo-50 text-indigo-700 border-indigo-200",
    [OrderStatus.PackingInProgress]: "bg-purple-50 text-purple-700 border-purple-200",
    [OrderStatus.ReadyToShip]: "bg-teal-50 text-teal-700 border-teal-200",
    [OrderStatus.PartiallyShipped]: "bg-cyan-50 text-cyan-700 border-cyan-200",
    [OrderStatus.Completed]: "bg-green-50 text-green-700 border-green-200",
    [OrderStatus.Canceled]: "bg-red-50 text-red-700 border-red-200",
  }

  return colorMap[status] || "bg-gray-50 text-gray-700 border-gray-200"
}

// Get icon color for timeline steps
export const getTimelineStepColor = (status: OrderStatus, stepIndex: number): string => {
  const completedStepIndex = status

  if (stepIndex <= completedStepIndex) {
    const colors = [
      "bg-blue-100 text-blue-600", // Open
      "bg-yellow-100 text-yellow-600", // PartiallyReceived
      "bg-indigo-100 text-indigo-600", // ReadyForPacking
      "bg-purple-100 text-purple-600", // PackingInProgress
      "bg-teal-100 text-teal-600", // ReadyToShip
      "bg-cyan-100 text-cyan-600", // PartiallyShipped
      "bg-green-100 text-green-600", // Completed
    ]

    return colors[stepIndex] || colors[0]
  }

  return "bg-muted text-muted-foreground"
}
