"use client"
import { useState } from "react"
import {
  Shield,
  Bell,
  Globe,
  Moon,
  Sun,
  Wallet,
  Lock,
  Mail,
  MessageSquare,
  BellRing,
  HelpCircle,
  User,
  CreditCard,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function Settings() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <a href="/profile">
            <User className="mr-2 h-4 w-4" /> View Profile
          </a>
        </Button>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 h-auto p-1 mb-4">
          <TabsTrigger value="account" className="flex items-center gap-2 py-2">
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2 py-2">
            <Sun className="h-4 w-4" />
            <span className="hidden md:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2 py-2">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2 py-2">
            <Wallet className="h-4 w-4" />
            <span className="hidden md:inline">Billing</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2 py-2">
            <Lock className="h-4 w-4" />
            <span className="hidden md:inline">Privacy</span>
          </TabsTrigger>
          <TabsTrigger value="help" className="flex items-center gap-2 py-2">
            <HelpCircle className="h-4 w-4" />
            <span className="hidden md:inline">Help</span>
          </TabsTrigger>
        </TabsList>

        {/* Account Settings */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>Manage your account security settings and connected devices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Password</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                <Button>Update Password</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch id="two-factor" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Active Sessions</h3>
                <div className="space-y-3">
                  {[
                    { device: "iPhone 13", location: "New York, USA", time: "Today, 10:30 AM", current: true },
                    {
                      device: "Chrome on Windows",
                      location: "Boston, USA",
                      time: "Yesterday, 3:15 PM",
                      current: false,
                    },
                    {
                      device: "Safari on MacBook",
                      location: "New York, USA",
                      time: "June 10, 2023, 9:45 AM",
                      current: false,
                    },
                  ].map((session, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <div className="font-medium">{session.device}</div>
                        <div className="text-sm text-muted-foreground">
                          {session.location} • {session.time}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {session.current && (
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-800"
                          >
                            Current
                          </Badge>
                        )}
                        <Button variant="outline" size="sm">
                          {session.current ? "Refresh" : "Revoke"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>Manage third-party services connected to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Google", connected: true, icon: "G" },
                  { name: "Apple", connected: false, icon: "A" },
                  { name: "Microsoft", connected: false, icon: "M" },
                ].map((account) => (
                  <div key={account.name} className="flex justify-between items-center p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-semibold">
                        {account.icon}
                      </div>
                      <div>
                        <div className="font-medium">{account.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {account.connected ? "Connected" : "Not connected"}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      {account.connected ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how Shipexx looks on your device</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: "light", label: "Light", icon: Sun },
                    { value: "dark", label: "Dark", icon: Moon },
                    { value: "system", label: "System", icon: Globe },
                  ].map((option) => (
                    <div
                      key={option.value}
                      className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${
                        theme === option.value
                          ? "border-primary bg-primary/5 text-primary"
                          : "hover:border-muted-foreground/25"
                      }`}
                      onClick={() => setTheme(option.value as "light" | "dark" | "system")}
                    >
                      <option.icon className="h-6 w-6 mb-2" />
                      <span>{option.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Language</h3>
                <div className="max-w-xs">
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Date & Time Format</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="date-format">Date Format</Label>
                    <Select defaultValue="mdy">
                      <SelectTrigger id="date-format">
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="time-format">Time Format</Label>
                    <Select defaultValue="12h">
                      <SelectTrigger id="time-format">
                        <SelectValue placeholder="Select time format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                        <SelectItem value="24h">24-hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Channels</h3>
                <div className="space-y-3">
                  {[
                    { id: "email", label: "Email Notifications", icon: Mail, description: "Receive updates via email" },
                    {
                      id: "sms",
                      label: "SMS Notifications",
                      icon: MessageSquare,
                      description: "Receive updates via text message",
                    },
                    {
                      id: "push",
                      label: "Push Notifications",
                      icon: BellRing,
                      description: "Receive updates on your mobile device",
                    },
                  ].map((channel) => (
                    <div key={channel.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <channel.icon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <Label htmlFor={channel.id}>{channel.label}</Label>
                          <p className="text-sm text-muted-foreground">{channel.description}</p>
                        </div>
                      </div>
                      <Switch id={channel.id} defaultChecked={channel.id === "email"} />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Types</h3>
                <div className="space-y-3">
                  {[
                    { id: "order-updates", label: "Order Updates", description: "When your order status changes" },
                    {
                      id: "shipping-updates",
                      label: "Shipping Updates",
                      description: "When your package ships or is delivered",
                    },
                    {
                      id: "delivery-confirmations",
                      label: "Delivery Confirmations",
                      description: "When your package is delivered",
                    },
                    {
                      id: "account-activity",
                      label: "Account Activity",
                      description: "Login attempts and security alerts",
                    },
                    { id: "promotions", label: "Promotional Offers", description: "Discounts and special offers" },
                    { id: "newsletter", label: "Newsletter", description: "Monthly shipping tips and updates" },
                  ].map((type) => (
                    <div key={type.id} className="flex items-center justify-between">
                      <div>
                        <Label htmlFor={type.id}>{type.label}</Label>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                      <Switch id={type.id} defaultChecked={!["promotions", "newsletter"].includes(type.id)} />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Frequency</h3>
                <div className="max-w-xs">
                  <Select defaultValue="important">
                    <SelectTrigger>
                      <SelectValue placeholder="Select email frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All updates (daily digest)</SelectItem>
                      <SelectItem value="important">Important updates only</SelectItem>
                      <SelectItem value="weekly">Weekly summary</SelectItem>
                      <SelectItem value="none">No promotional emails</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Settings */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>Manage your subscription and billing information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg flex items-center">
                      Premium Plan
                      <Badge className="ml-2 bg-amber-500 hover:bg-amber-600">Active</Badge>
                    </h3>
                    <p className="text-muted-foreground mt-1">Your subscription renews on December 15, 2023</p>
                  </div>
                  <Button>Manage Plan</Button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-black/20 p-3 rounded-md">
                    <p className="font-medium">Monthly Price</p>
                    <p className="text-2xl font-bold">$24.99</p>
                    <p className="text-sm text-muted-foreground">Billed monthly</p>
                  </div>
                  <div className="bg-white dark:bg-black/20 p-3 rounded-md">
                    <p className="font-medium">Next Billing Date</p>
                    <p className="text-2xl font-bold">Dec 15</p>
                    <p className="text-sm text-muted-foreground">Automatic renewal</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payment Methods</h3>
                <div className="space-y-3">
                  {[
                    {
                      type: "Credit Card",
                      details: "**** **** **** 4582",
                      expiry: "05/25",
                      isDefault: true,
                    },
                    {
                      type: "PayPal",
                      details: "john.doe@example.com",
                      expiry: "",
                      isDefault: false,
                    },
                  ].map((method, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{method.type}</div>
                          <div className="text-sm text-muted-foreground">
                            {method.details} {method.expiry && `• Expires ${method.expiry}`}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {method.isDefault && (
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-800"
                          >
                            Default
                          </Badge>
                        )}
                        <Button variant="outline" size="sm">
                          {method.isDefault ? "Edit" : "Set as Default"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline">
                  <CreditCard className="mr-2 h-4 w-4" /> Add Payment Method
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Billing History</h3>
                <div className="space-y-3">
                  {[
                    {
                      date: "Nov 15, 2023",
                      amount: "$24.99",
                      status: "Paid",
                      invoice: "INV-2023-11-001",
                    },
                    {
                      date: "Oct 15, 2023",
                      amount: "$24.99",
                      status: "Paid",
                      invoice: "INV-2023-10-001",
                    },
                    {
                      date: "Sep 15, 2023",
                      amount: "$24.99",
                      status: "Paid",
                      invoice: "INV-2023-09-001",
                    },
                  ].map((invoice, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <div className="font-medium">{invoice.date}</div>
                        <div className="text-sm text-muted-foreground">{invoice.invoice}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-medium">{invoice.amount}</div>
                          <div className="text-sm text-green-600">{invoice.status}</div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Manage your privacy preferences and data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Sharing</h3>
                <div className="space-y-3">
                  {[
                    {
                      id: "analytics",
                      label: "Usage Analytics",
                      description: "Allow us to collect anonymous usage data to improve our services",
                    },
                    {
                      id: "marketing",
                      label: "Marketing Preferences",
                      description: "Receive personalized marketing based on your activity",
                    },
                    {
                      id: "third-party",
                      label: "Third-Party Sharing",
                      description: "Allow sharing data with trusted partners",
                    },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div>
                        <Label htmlFor={item.id}>{item.label}</Label>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <Switch id={item.id} defaultChecked={item.id === "analytics"} />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Management</h3>
                <div className="space-y-3">
                  <Button variant="outline">Download My Data</Button>
                  <Button
                    variant="outline"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                  >
                    Delete My Account
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Deleting your account will permanently remove all your data from our systems. This action cannot be
                  undone.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Help Settings */}
        <TabsContent value="help" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Help & Support</CardTitle>
              <CardDescription>Get help with your account and shipping questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  {[
                    {
                      question: "How do I track my package?",
                      answer:
                        "You can track your package by going to the Tracking page and entering your tracking number, or by clicking on the order in your Orders page.",
                    },
                    {
                      question: "How do I change my shipping address?",
                      answer:
                        "You can update your shipping address in the Addresses section of your Profile page. Make sure to set your preferred address as the default.",
                    },
                    {
                      question: "What payment methods do you accept?",
                      answer:
                        "We accept all major credit cards, PayPal, and Apple Pay. You can manage your payment methods in the Billing section of Settings.",
                    },
                  ].map((faq, index) => (
                    <div key={index} className="border rounded-md p-4">
                      <h4 className="font-medium mb-2">{faq.question}</h4>
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Contact Support</h3>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="support-subject">Subject</Label>
                    <Input id="support-subject" placeholder="What do you need help with?" />
                  </div>
                  <div>
                    <Label htmlFor="support-message">Message</Label>
                    <Input id="support-message" placeholder="Describe your issue in detail" />
                  </div>
                  <Button>Submit Support Request</Button>
                </div>
                <div className="bg-muted p-4 rounded-md mt-4">
                  <h4 className="font-medium mb-2">Support Hours</h4>
                  <p className="text-sm">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                  <p className="text-sm">Saturday: 10:00 AM - 2:00 PM EST</p>
                  <p className="text-sm">Sunday: Closed</p>
                  <div className="mt-2">
                    <p className="text-sm font-medium">Email: support@shipexx.com</p>
                    <p className="text-sm font-medium">Phone: +1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
