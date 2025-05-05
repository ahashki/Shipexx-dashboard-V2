"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Bell,
  Mail,
  MessageSquare,
  Package,
  Truck,
  Clock,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Trash2,
} from "lucide-react"

// Mock data for notifications
const initialNotifications = [
  {
    id: "notif-1",
    title: "Package Delivered",
    description: "Your package (SP123456789) has been delivered.",
    timestamp: "2 hours ago",
    read: false,
    type: "delivery",
    icon: <CheckCircle className="h-5 w-5 text-green-500" />,
  },
  {
    id: "notif-2",
    title: "Shipping Delay",
    description: "Your package (SP987654321) is experiencing a delay.",
    timestamp: "5 hours ago",
    read: false,
    type: "alert",
    icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
  },
  {
    id: "notif-3",
    title: "Package Shipped",
    description: "Your order (SP567891234) has been shipped.",
    timestamp: "1 day ago",
    read: true,
    type: "shipping",
    icon: <Truck className="h-5 w-5 text-blue-500" />,
  },
  {
    id: "notif-4",
    title: "Order Processed",
    description: "Your order (SP246813579) has been processed.",
    timestamp: "2 days ago",
    read: true,
    type: "order",
    icon: <Package className="h-5 w-5 text-purple-500" />,
  },
  {
    id: "notif-5",
    title: "Price Change Alert",
    description: "Shipping rates for international packages have been updated.",
    timestamp: "3 days ago",
    read: true,
    type: "alert",
    icon: <RefreshCw className="h-5 w-5 text-amber-500" />,
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [preferences, setPreferences] = useState({
    email: {
      orderUpdates: true,
      shippingUpdates: true,
      deliveryUpdates: true,
      priceChanges: false,
      promotions: false,
    },
    push: {
      orderUpdates: true,
      shippingUpdates: true,
      deliveryUpdates: true,
      priceChanges: true,
      promotions: false,
    },
    sms: {
      orderUpdates: false,
      shippingUpdates: false,
      deliveryUpdates: true,
      priceChanges: false,
      promotions: false,
    },
  })
  const [frequency, setFrequency] = useState("immediate")

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
  }

  const markAsRead = (id) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  const togglePreference = (channel, setting) => {
    setPreferences({
      ...preferences,
      [channel]: {
        ...preferences[channel],
        [setting]: !preferences[channel][setting],
      },
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Notifications</h1>
        <p className="text-muted-foreground mt-2">Manage your notification preferences and view recent alerts.</p>
      </div>

      <Tabs defaultValue="all">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Notifications</TabsTrigger>
            <TabsTrigger value="settings">Notification Settings</TabsTrigger>
          </TabsList>

          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              Mark All as Read
            </Button>
          )}
        </div>

        <TabsContent value="all" className="mt-6 space-y-4">
          {notifications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No notifications</p>
                <p className="text-muted-foreground text-center mt-1">
                  You're all caught up! New notifications will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Recent Notifications</h2>
                {notifications.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearAllNotifications} className="text-red-500">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                )}
              </div>

              <div className="space-y-3">
                {notifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`overflow-hidden ${!notification.read ? "border-l-4 border-l-primary" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="mt-1">{notification.icon}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{notification.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                              {!notification.read && <Badge className="bg-primary text-primary-foreground">New</Badge>}
                            </div>
                          </div>
                          <div className="flex justify-end mt-2 gap-2">
                            {!notification.read && (
                              <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                                Mark as Read
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="settings" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Channels</CardTitle>
              <CardDescription>Choose how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-medium">Email Notifications</h3>
                </div>
                <div className="grid gap-3 pl-9">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-order-updates" className="flex-1">
                      Order updates
                    </Label>
                    <Switch
                      id="email-order-updates"
                      checked={preferences.email.orderUpdates}
                      onCheckedChange={() => togglePreference("email", "orderUpdates")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-shipping-updates" className="flex-1">
                      Shipping updates
                    </Label>
                    <Switch
                      id="email-shipping-updates"
                      checked={preferences.email.shippingUpdates}
                      onCheckedChange={() => togglePreference("email", "shippingUpdates")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-delivery-updates" className="flex-1">
                      Delivery updates
                    </Label>
                    <Switch
                      id="email-delivery-updates"
                      checked={preferences.email.deliveryUpdates}
                      onCheckedChange={() => togglePreference("email", "deliveryUpdates")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-price-changes" className="flex-1">
                      Price changes
                    </Label>
                    <Switch
                      id="email-price-changes"
                      checked={preferences.email.priceChanges}
                      onCheckedChange={() => togglePreference("email", "priceChanges")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-promotions" className="flex-1">
                      Promotions and offers
                    </Label>
                    <Switch
                      id="email-promotions"
                      checked={preferences.email.promotions}
                      onCheckedChange={() => togglePreference("email", "promotions")}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-medium">Push Notifications</h3>
                </div>
                <div className="grid gap-3 pl-9">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-order-updates" className="flex-1">
                      Order updates
                    </Label>
                    <Switch
                      id="push-order-updates"
                      checked={preferences.push.orderUpdates}
                      onCheckedChange={() => togglePreference("push", "orderUpdates")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-shipping-updates" className="flex-1">
                      Shipping updates
                    </Label>
                    <Switch
                      id="push-shipping-updates"
                      checked={preferences.push.shippingUpdates}
                      onCheckedChange={() => togglePreference("push", "shippingUpdates")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-delivery-updates" className="flex-1">
                      Delivery updates
                    </Label>
                    <Switch
                      id="push-delivery-updates"
                      checked={preferences.push.deliveryUpdates}
                      onCheckedChange={() => togglePreference("push", "deliveryUpdates")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-price-changes" className="flex-1">
                      Price changes
                    </Label>
                    <Switch
                      id="push-price-changes"
                      checked={preferences.push.priceChanges}
                      onCheckedChange={() => togglePreference("push", "priceChanges")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-promotions" className="flex-1">
                      Promotions and offers
                    </Label>
                    <Switch
                      id="push-promotions"
                      checked={preferences.push.promotions}
                      onCheckedChange={() => togglePreference("push", "promotions")}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <MessageSquare className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-medium">SMS Notifications</h3>
                </div>
                <div className="grid gap-3 pl-9">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-order-updates" className="flex-1">
                      Order updates
                    </Label>
                    <Switch
                      id="sms-order-updates"
                      checked={preferences.sms.orderUpdates}
                      onCheckedChange={() => togglePreference("sms", "orderUpdates")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-shipping-updates" className="flex-1">
                      Shipping updates
                    </Label>
                    <Switch
                      id="sms-shipping-updates"
                      checked={preferences.sms.shippingUpdates}
                      onCheckedChange={() => togglePreference("sms", "shippingUpdates")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-delivery-updates" className="flex-1">
                      Delivery updates
                    </Label>
                    <Switch
                      id="sms-delivery-updates"
                      checked={preferences.sms.deliveryUpdates}
                      onCheckedChange={() => togglePreference("sms", "deliveryUpdates")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-price-changes" className="flex-1">
                      Price changes
                    </Label>
                    <Switch
                      id="sms-price-changes"
                      checked={preferences.sms.priceChanges}
                      onCheckedChange={() => togglePreference("sms", "priceChanges")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-promotions" className="flex-1">
                      Promotions and offers
                    </Label>
                    <Switch
                      id="sms-promotions"
                      checked={preferences.sms.promotions}
                      onCheckedChange={() => togglePreference("sms", "promotions")}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Frequency</CardTitle>
              <CardDescription>Choose how often you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center gap-4">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-medium">Delivery Frequency</h3>
                </div>
                <div className="pl-9">
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger className="w-full sm:w-[250px]">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate (as they happen)</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Summary</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-2">
                    {frequency === "immediate" && "You will receive notifications as events occur."}
                    {frequency === "daily" && "You will receive a daily summary of all notifications."}
                    {frequency === "weekly" && "You will receive a weekly summary of all notifications."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure additional notification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="quiet-hours">Quiet Hours</Label>
                  <p className="text-sm text-muted-foreground">Disable notifications during specific hours</p>
                </div>
                <Switch id="quiet-hours" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notification-sounds">Notification Sounds</Label>
                  <p className="text-sm text-muted-foreground">Play sounds for new notifications</p>
                </div>
                <Switch id="notification-sounds" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="archive-read">Auto-archive Read Notifications</Label>
                  <p className="text-sm text-muted-foreground">Automatically archive notifications after reading</p>
                </div>
                <Switch id="archive-read" />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
