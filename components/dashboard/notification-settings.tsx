"use client"

import { useState } from "react"
import { Bell, Mail, Smartphone } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"

interface NotificationSettingsProps {
  defaultSettings?: NotificationSettings
  onSave?: (settings: NotificationSettings) => void
}

export interface NotificationSettings {
  incomingPackages: boolean
  packageShipped: boolean
  orderUpdates: boolean
  promotions: boolean
  emailNotifications: boolean
  pushNotifications: boolean
  smsNotifications: boolean
  notificationFrequency: "immediate" | "daily" | "weekly"
  emailAddress: string
  phoneNumber: string
}

export function NotificationSettings({ defaultSettings, onSave }: NotificationSettingsProps) {
  const [settings, setSettings] = useState<NotificationSettings>(
    defaultSettings || {
      incomingPackages: true,
      packageShipped: true,
      orderUpdates: true,
      promotions: false,
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      notificationFrequency: "immediate",
      emailAddress: "user@example.com",
      phoneNumber: "",
    },
  )

  const handleToggle = (key: keyof NotificationSettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleFrequencyChange = (value: "immediate" | "daily" | "weekly") => {
    setSettings((prev) => ({
      ...prev,
      notificationFrequency: value,
    }))
  }

  const handleInputChange = (key: keyof NotificationSettings, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSave = () => {
    if (onSave) {
      onSave(settings)
    }

    toast({
      title: "Settings Saved",
      description: "Your notification preferences have been updated.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2 h-5 w-5" />
          Notification Settings
        </CardTitle>
        <CardDescription>Configure how and when you want to be notified about your packages and orders</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Notification Types</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="incoming-packages">Incoming Packages</Label>
                <p className="text-sm text-muted-foreground">Get notified when a package arrives at our warehouse</p>
              </div>
              <Switch
                id="incoming-packages"
                checked={settings.incomingPackages}
                onCheckedChange={() => handleToggle("incomingPackages")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="package-shipped">Package Shipped</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when your package is shipped from our warehouse
                </p>
              </div>
              <Switch
                id="package-shipped"
                checked={settings.packageShipped}
                onCheckedChange={() => handleToggle("packageShipped")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="order-updates">Order Status Updates</Label>
                <p className="text-sm text-muted-foreground">Get notified about changes to your order status</p>
              </div>
              <Switch
                id="order-updates"
                checked={settings.orderUpdates}
                onCheckedChange={() => handleToggle("orderUpdates")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="promotions">Promotions & News</Label>
                <p className="text-sm text-muted-foreground">
                  Receive updates about promotions, new features, and news
                </p>
              </div>
              <Switch
                id="promotions"
                checked={settings.promotions}
                onCheckedChange={() => handleToggle("promotions")}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-medium mb-3">Notification Channels</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="email-notifications">Email Notifications</Label>
              </div>
              <Switch
                id="email-notifications"
                checked={settings.emailNotifications}
                onCheckedChange={() => handleToggle("emailNotifications")}
              />
            </div>

            {settings.emailNotifications && (
              <div className="ml-7">
                <Label htmlFor="email-address" className="text-sm mb-1 block">
                  Email Address
                </Label>
                <Input
                  id="email-address"
                  value={settings.emailAddress}
                  onChange={(e) => handleInputChange("emailAddress", e.target.value)}
                  placeholder="your@email.com"
                  className="max-w-md"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="push-notifications">Push Notifications</Label>
              </div>
              <Switch
                id="push-notifications"
                checked={settings.pushNotifications}
                onCheckedChange={() => handleToggle("pushNotifications")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
              </div>
              <Switch
                id="sms-notifications"
                checked={settings.smsNotifications}
                onCheckedChange={() => handleToggle("smsNotifications")}
              />
            </div>

            {settings.smsNotifications && (
              <div className="ml-7">
                <Label htmlFor="phone-number" className="text-sm mb-1 block">
                  Phone Number
                </Label>
                <Input
                  id="phone-number"
                  value={settings.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="max-w-md"
                />
              </div>
            )}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-medium mb-3">Notification Frequency</h3>
          <RadioGroup
            value={settings.notificationFrequency}
            onValueChange={(value) => handleFrequencyChange(value as "immediate" | "daily" | "weekly")}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="immediate" id="immediate" />
              <Label htmlFor="immediate">Immediate (send notifications as events occur)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="daily" id="daily" />
              <Label htmlFor="daily">Daily Digest (send a summary once per day)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="weekly" id="weekly" />
              <Label htmlFor="weekly">Weekly Summary (send a summary once per week)</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Preferences</Button>
        </div>
      </CardContent>
    </Card>
  )
}
