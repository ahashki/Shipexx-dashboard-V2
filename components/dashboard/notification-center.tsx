"use client"

import { useState } from "react"
import { Bell, Package, Truck, Info, Settings, CheckCircle } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface Notification {
  id: string
  type: "incoming_package" | "package_shipped" | "order_update" | "system"
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
  metadata?: {
    orderId?: string
    packageId?: string
    trackingNumber?: string
  }
}

interface NotificationCenterProps {
  notifications?: Notification[]
  onMarkAsRead?: (id: string) => void
  onMarkAllAsRead?: () => void
  onSettingsClick?: () => void
}

export function NotificationCenter({
  notifications: externalNotifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onSettingsClick,
}: NotificationCenterProps) {
  // If external notifications are not provided, use internal state
  const [notifications, setNotifications] = useState<Notification[]>(
    externalNotifications || [
      {
        id: "1",
        type: "incoming_package",
        title: "Package Arrived at Warehouse",
        message: "Your package from Amazon.com has arrived at our warehouse.",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        read: false,
        metadata: {
          orderId: "ORD1234",
          packageId: "PKG5678",
        },
      },
      {
        id: "2",
        type: "package_shipped",
        title: "Package Shipped",
        message: "Your package has been shipped and is on its way to you.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: false,
        metadata: {
          orderId: "ORD1235",
          packageId: "PKG5679",
          trackingNumber: "TRK123456789",
        },
      },
      {
        id: "3",
        type: "order_update",
        title: "Order Status Updated",
        message: "Your order status has been updated to 'Processing'.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        read: true,
        metadata: {
          orderId: "ORD1236",
        },
      },
      {
        id: "4",
        type: "system",
        title: "Welcome to Shipexx",
        message: "Thank you for choosing Shipexx for your shipping needs.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
        read: true,
      },
    ],
  )

  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleMarkAsRead = (id: string) => {
    if (onMarkAsRead) {
      onMarkAsRead(id)
    } else {
      setNotifications((prev) =>
        prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
      )
    }
  }

  const handleMarkAllAsRead = () => {
    if (onMarkAllAsRead) {
      onMarkAllAsRead()
    } else {
      setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    }
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "incoming_package":
        return <Package className="h-5 w-5 text-blue-500" />
      case "package_shipped":
        return <Truck className="h-5 w-5 text-green-500" />
      case "order_update":
        return <Info className="h-5 w-5 text-amber-500" />
      case "system":
        return <CheckCircle className="h-5 w-5 text-purple-500" />
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />
    }
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSecs = Math.floor(diffMs / 1000)
    const diffMins = Math.floor(diffSecs / 60)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffSecs < 60) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`

    return date.toLocaleDateString()
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-medium">Notifications</h3>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead} disabled={unreadCount === 0}>
              Mark all as read
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsOpen(false)
                if (onSettingsClick) onSettingsClick()
              }}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Separator />
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <Bell className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No notifications yet</p>
            </div>
          ) : (
            <div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex gap-3 p-4 hover:bg-muted/50 transition-colors",
                    !notification.read && "bg-muted/30",
                  )}
                >
                  <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-grow">
                    <div className="flex items-start justify-between">
                      <h4 className={cn("text-sm font-medium", !notification.read && "font-semibold")}>
                        {notification.title}
                      </h4>
                      <span className="text-xs text-muted-foreground">{formatTimestamp(notification.timestamp)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    {notification.metadata?.orderId && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Order: {notification.metadata.orderId}
                        {notification.metadata.trackingNumber && ` • Tracking: ${notification.metadata.trackingNumber}`}
                      </p>
                    )}
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 h-7 px-2 text-xs"
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        Mark as read
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Separator />
        <div className="p-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => {
              setIsOpen(false)
              if (onSettingsClick) onSettingsClick()
            }}
          >
            Notification Settings
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
