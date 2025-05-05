"use client"

import { useState } from "react"
import { Package, X, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface IncomingPackageAlertProps {
  packageId: string
  orderId: string
  arrivalTime: Date
  onDismiss?: (packageId: string) => void
  onViewDetails?: (packageId: string) => void
}

export function IncomingPackageAlert({
  packageId,
  orderId,
  arrivalTime,
  onDismiss,
  onViewDetails,
}: IncomingPackageAlertProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const handleDismiss = () => {
    setIsVisible(false)
    if (onDismiss) onDismiss(packageId)
  }

  const handleViewDetails = () => {
    if (onViewDetails) onViewDetails(packageId)
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 1000 / 60)

    if (diffMins < 60) return `${diffMins} minutes ago`
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hours ago`
    return `${Math.floor(diffMins / 1440)} days ago`
  }

  return (
    <Card className={cn("mb-6 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800", "animate-fadeIn")}>
      <CardContent className="p-4 flex items-center">
        <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-4">
          <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-grow">
          <h3 className="font-medium text-blue-800 dark:text-blue-300">New Package Arrived!</h3>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            A package for order #{orderId} has arrived at our warehouse {formatTime(arrivalTime)}.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-700 hover:text-blue-800 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900"
            onClick={handleViewDetails}
          >
            View Details <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-blue-700 hover:text-blue-800 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900"
            onClick={handleDismiss}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
