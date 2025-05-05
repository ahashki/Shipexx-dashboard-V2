"use client"
import { useState } from "react"
import {
  Edit2,
  Plus,
  MapPin,
  Trash2,
  CheckCircle,
  Crown,
  ChevronRight,
  Gift,
  Award,
  Shield,
  Zap,
  Camera,
  Mail,
  Phone,
  UserIcon,
  Calendar,
  Building,
  FileText,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ProfileCompleteness } from "@/components/profile-completeness"
import { ProfileActivity } from "@/components/profile-activity"
import { VerificationBadge } from "@/components/verification-badge"

interface Address {
  id: string
  type: string
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  isDefault: boolean
}

export default function ProfilePage() {
  // Sample addresses data
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "addr1",
      type: "Home",
      name: "John Doe",
      street: "123 Shipping Lane",
      city: "Parcel City",
      state: "CA",
      zipCode: "12345",
      country: "United States",
      phone: "+1 (555) 123-4567",
      isDefault: true,
    },
    {
      id: "addr2",
      type: "Office",
      name: "John Doe",
      street: "456 Business Ave, Suite 200",
      city: "Commerce Town",
      state: "NY",
      zipCode: "67890",
      country: "United States",
      phone: "+1 (555) 987-6543",
      isDefault: false,
    },
  ])

  // New address form state
  const [newAddress, setNewAddress] = useState<Omit<Address, "id" | "isDefault">>({
    type: "Home",
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
  })

  // Edit address state
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [showAddressDialog, setShowAddressDialog] = useState(false)

  // Subscription level data
  const subscriptionLevel = {
    name: "Premium",
    tier: 2, // 0: Free, 1: Basic, 2: Premium, 3: Enterprise
    renewalDate: "2023-12-15",
    features: [
      { name: "Priority Shipping", included: true },
      { name: "Discounted Rates", included: true },
      { name: "Dedicated Support", included: true },
      { name: "Insurance Coverage", included: true },
      { name: "International Shipping", included: true },
      { name: "Custom Packaging", included: false },
   
    ],
  }

  // Profile edit state
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    birthdate: "1990-01-01",
    company: "",
    taxId: "",
  })

  // Handle adding a new address
  const handleAddAddress = () => {
    const addressToAdd = {
      ...newAddress,
      id: `addr${Date.now()}`,
      isDefault: addresses.length === 0, // Make default if it's the first address
    }

    setAddresses([...addresses, addressToAdd])
    setNewAddress({
      type: "Home",
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      phone: "",
    })
    setShowAddressDialog(false)
  }

  // Handle editing an address
  const handleEditAddress = () => {
    if (!editingAddress) return

    setAddresses(addresses.map((addr) => (addr.id === editingAddress.id ? editingAddress : addr)))
    setEditingAddress(null)
    setShowAddressDialog(false)
  }

  // Handle deleting an address
  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id))
  }

  // Handle setting an address as default
  const handleSetDefaultAddress = (id: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    )
  }

  // Open dialog for adding a new address
  const openAddAddressDialog = () => {
    setEditingAddress(null)
    setShowAddressDialog(true)
  }

  // Open dialog for editing an existing address
  const openEditAddressDialog = (address: Address) => {
    setEditingAddress(address)
    setShowAddressDialog(true)
  }

  // Handle profile edit
  const handleProfileEdit = () => {
    setIsEditingProfile(!isEditingProfile)
  }

  // Handle profile save
  const handleProfileSave = () => {
    // In a real app, you would save the profile data to the server here
    setIsEditingProfile(false)
  }

  // Sample profile sections for completeness indicator
  const profileSections = [
    { name: "Personal Information", completed: true, required: true, action: "Edit", url: "#details" },
    { name: "Profile Picture", completed: true, required: false, action: "Change", url: "#" },
    { name: "Email Verification", completed: true, required: true, action: "Verify", url: "#" },
    { name: "Phone Verification", completed: false, required: true, action: "Verify", url: "#" },
    { name: "Shipping Address", completed: true, required: true, action: "Edit", url: "#addresses" },
    { name: "Billing Address", completed: false, required: false, action: "Add", url: "#addresses" },
    { name: "Payment Method", completed: false, required: false, action: "Add", url: "#" },
    { name: "Notification Preferences", completed: false, required: false, action: "Set up", url: "#preferences" },
  ]

  // Sample activity data
  const recentActivities = [
    {
      id: "act1",
      type: "order",
      description: "Placed order #ORD12345",
      date: "2023-06-15",
      time: "14:30",
      metadata: {
        "order id": "ORD12345",
        amount: "$125.00",
        status: "Processing",
      },
    },
    {
      id: "act2",
      type: "payment",
      description: "Added $500.00 to wallet",
      date: "2023-06-14",
      time: "10:15",
      metadata: {
        "payment method": "Credit Card (****4582)",
        "transaction id": "TRX002",
      },
    },
    {
      id: "act3",
      type: "login",
      description: "Logged in from new device",
      date: "2023-06-13",
      time: "08:45",
      metadata: {
        device: "iPhone 13",
        location: "New York, USA",
      },
    },
    {
      id: "act4",
      type: "settings",
      description: "Updated password",
      date: "2023-06-10",
      time: "16:20",
    },
  ]

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">Manage your personal details and preferences</p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <a href="/settings">
            <Edit2 className="mr-2 h-4 w-4" /> Settings
          </a>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        {/* Profile Sidebar */}
        <Card>
          <CardContent className="p-6 flex flex-col items-center">
            <div className="relative">
              <Avatar className="w-32 h-32 mb-4">
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile picture" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button
                variant="secondary"
                size="icon"
                className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                onClick={() => alert("Upload profile picture")}
              >
                <Camera className="h-4 w-4" />
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white p-2 rounded-full shadow-md">
                      <Crown className="h-5 w-5" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p className="font-medium">Premium Member</p>
                    <p className="text-xs">Renews on {subscriptionLevel.renewalDate}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <h2 className="text-2xl font-bold">John Doe</h2>
            <div className="flex items-center mt-1 mb-2">
              <Badge
                variant="outline"
                className="bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border-amber-200 dark:from-amber-950/20 dark:to-yellow-950/20 dark:text-amber-400 dark:border-amber-800"
              >
                <Crown className="h-3 w-3 mr-1 text-amber-500" /> Premium Member
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm text-center">Member since January 2023</p>
            <Button className="mt-4" variant="outline" onClick={handleProfileEdit}>
              <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
            </Button>

            {/* Verification Status */}
            <div className="w-full mt-6 space-y-3">
              <h3 className="text-sm font-medium">Verification Status</h3>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Email</span>
                  <VerificationBadge status="verified" type="email" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Phone</span>
                  <VerificationBadge status="unverified" type="phone" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Identity</span>
                  <VerificationBadge status="pending" type="identity" />
                </div>
              </div>
            </div>

            {/* Subscription Benefits Card */}
            <Card className="w-full mt-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Premium Benefits</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 text-sm">
                  {subscriptionLevel.features
                    .filter((f) => f.included)
                    .map((feature, index) => (
                      <li key={index} className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                        {feature.name}
                      </li>
                    ))}
                </ul>
                <Button
                  variant="link"
                  size="sm"
                  className="mt-2 p-0 h-auto text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
                  asChild
                >
                  {/*
                  <a href="/settings/billing">
                    View all benefits <ChevronRight className="h-3 w-3 ml-1" />
                  </a>*/}
                </Button>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Manage your personal details and shipping addresses</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="details">
              <TabsList className="mb-4">
                <TabsTrigger value="details">Personal Details</TabsTrigger>
                <TabsTrigger value="addresses">Shipping Addresses</TabsTrigger>
                <TabsTrigger value="subscription">Subscription</TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <form className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <div className="flex items-center">
                        <UserIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Input
                          id="fullName"
                          value={profileData.fullName}
                          onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                          disabled={!isEditingProfile}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          disabled={!isEditingProfile}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          disabled={!isEditingProfile}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="birthdate">Date of Birth</Label>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Input
                          id="birthdate"
                          type="date"
                          value={profileData.birthdate}
                          onChange={(e) => setProfileData({ ...profileData, birthdate: e.target.value })}
                          disabled={!isEditingProfile}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="company">Company (Optional)</Label>
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Input
                          id="company"
                          placeholder="Enter your company name"
                          value={profileData.company}
                          onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                          disabled={!isEditingProfile}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="taxId">Tax ID (Optional)</Label>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Input
                          id="taxId"
                          placeholder="For business accounts"
                          value={profileData.taxId}
                          onChange={(e) => setProfileData({ ...profileData, taxId: e.target.value })}
                          disabled={!isEditingProfile}
                        />
                      </div>
                    </div>
                  </div>
                  {isEditingProfile ? (
                    <div className="flex gap-2">
                      <Button onClick={handleProfileSave}>Save Changes</Button>
                      <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={handleProfileEdit}>Edit Profile</Button>
                  )}
                </form>
              </TabsContent>

              <TabsContent value="addresses">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Shipping & Billing Addresses</h3>
                    <Button onClick={openAddAddressDialog}>
                      <Plus className="mr-2 h-4 w-4" /> Add Address
                    </Button>
                  </div>

                  {addresses.length === 0 ? (
                    <div className="text-center p-8 border rounded-lg">
                      <MapPin className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <h3 className="font-medium mb-1">No addresses yet</h3>
                      <p className="text-sm text-muted-foreground mb-4">Add your first shipping or billing address</p>
                      <Button onClick={openAddAddressDialog}>Add Address</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {addresses.map((address) => (
                        <div key={address.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <span className="font-medium">{address.type}</span>
                              {address.isDefault && (
                                <Badge variant="secondary" className="ml-2">
                                  Default
                                </Badge>
                              )}
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => openEditAddressDialog(address)}>
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              {!address.isDefault && (
                                <Button variant="ghost" size="sm" onClick={() => handleDeleteAddress(address.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                          <div className="text-sm space-y-1">
                            <p>{address.name}</p>
                            <p>{address.street}</p>
                            <p>
                              {address.city}, {address.state} {address.zipCode}
                            </p>
                            <p>{address.country}</p>
                            <p>{address.phone}</p>
                          </div>
                          {!address.isDefault && (
                            <Button
                              variant="link"
                              size="sm"
                              className="mt-2 p-0 h-auto"
                              onClick={() => handleSetDefaultAddress(address.id)}
                            >
                              Set as default
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="subscription">
                <div className="space-y-6">
                  {/* Current Plan */}
                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <Crown className="h-5 w-5 text-amber-500 mr-2" />
                          <h3 className="font-bold text-lg">Premium Plan</h3>
                        </div>
                        <p className="text-muted-foreground mt-1">
                          Your subscription renews on {subscriptionLevel.renewalDate}
                        </p>
                      </div>
                      <Button asChild>
                        <a href="/checkout/subscription">Manage Subscription</a>
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      {[
                        { icon: Zap, label: "Priority Shipping", description: "Get your items faster" },
                        { icon: Shield, label: "Insurance Coverage", description: "Up to $5,000 per shipment" },
                        { icon: Gift, label: "Discounted Rates", description: "Save up to 25% on shipping" },
                        { icon: Award, label: "Dedicated Support", description: "24/7 premium assistance" },
                      ].map((benefit, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center text-center p-3 bg-white dark:bg-black/20 rounded-md"
                        >
                          <benefit.icon className="h-8 w-8 text-amber-500 mb-2" />
                          <h4 className="font-medium text-sm">{benefit.label}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{benefit.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Available Plans */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Available Plans</h3>
                      {/* Temporarily hidden - might need later
                      <Button variant="outline" size="sm" asChild>
                        <a href="/checkout/subscription">
                          <ExternalLink className="h-4 w-4 mr-2" /> View All Plans
                        </a>
                      </Button>
                      */}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        {
                          name: "Basic",
                          price: "$9.99",
                          period: "monthly",
                          features: ["Standard Shipping", "Basic Support", "Up to 10 shipments/month"],
                          recommended: false,
                          current: false,
                        },
                        {
                          name: "Premium",
                          price: "$24.99",
                          period: "monthly",
                          features: ["Priority Shipping", "24/7 Support", "Unlimited shipments"],
                          recommended: false,
                          current: true,
                        },
                        {
                          name: "Enterprise",
                          price: "$99.99",
                          period: "monthly",
                          features: ["All Premium features", "Custom Packaging"],
                          recommended: true,
                          current: false,
                        },
                      ].map((plan, index) => (
                        <div
                          key={index}
                          className={`flex flex-col h-full rounded-lg border relative ${
                            plan.current
                              ? "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20"
                              : plan.recommended
                                ? "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20"
                                : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950/20"
                          }`}
                        >
                          {plan.recommended && (
                            <div className="absolute -top-3 left-0 right-0 flex justify-center">
                              <Badge className="bg-blue-500 text-white hover:bg-blue-600">Recommended</Badge>
                            </div>
                          )}
                          {plan.current && (
                            <div className="absolute -top-3 left-0 right-0 flex justify-center">
                              <Badge className="bg-amber-500 text-white hover:bg-amber-600">Current Plan</Badge>
                            </div>
                          )}
                          <div className="p-4 text-center border-b">
                            <h4 className="text-lg font-bold">{plan.name}</h4>
                            <div className="mt-2">
                              <span className="text-2xl font-bold">{plan.price}</span>
                              <span className="text-muted-foreground">/{plan.period}</span>
                            </div>
                          </div>
                          <div className="p-4 flex-grow">
                            <ul className="space-y-2">
                              {plan.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-start text-sm">
                                  <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Address Dialog */}
      <Dialog open={showAddressDialog} onOpenChange={setShowAddressDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="address-type">Address Type</Label>
                <Select
                  value={editingAddress ? editingAddress.type : newAddress.type}
                  onValueChange={(value) => {
                    if (editingAddress) {
                      setEditingAddress({ ...editingAddress, type: value })
                    } else {
                      setNewAddress({ ...newAddress, type: value })
                    }
                  }}
                >
                  <SelectTrigger id="address-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Home">Home</SelectItem>
                    <SelectItem value="Office">Office</SelectItem>
                    <SelectItem value="Shipping">Shipping</SelectItem>
                    <SelectItem value="Billing">Billing</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Label htmlFor="address-name">Full Name</Label>
                <Input
                  id="address-name"
                  value={editingAddress ? editingAddress.name : newAddress.name}
                  onChange={(e) => {
                    if (editingAddress) {
                      setEditingAddress({ ...editingAddress, name: e.target.value })
                    } else {
                      setNewAddress({ ...newAddress, name: e.target.value })
                    }
                  }}
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="address-street">Street Address</Label>
                <Textarea
                  id="address-street"
                  value={editingAddress ? editingAddress.street : newAddress.street}
                  onChange={(e) => {
                    if (editingAddress) {
                      setEditingAddress({ ...editingAddress, street: e.target.value })
                    } else {
                      setNewAddress({ ...newAddress, street: e.target.value })
                    }
                  }}
                />
              </div>

              <div>
                <Label htmlFor="address-city">City</Label>
                <Input
                  id="address-city"
                  value={editingAddress ? editingAddress.city : newAddress.city}
                  onChange={(e) => {
                    if (editingAddress) {
                      setEditingAddress({ ...editingAddress, city: e.target.value })
                    } else {
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                  }}
                />
              </div>

              <div>
                <Label htmlFor="address-state">State/Province</Label>
                <Input
                  id="address-state"
                  value={editingAddress ? editingAddress.state : newAddress.state}
                  onChange={(e) => {
                    if (editingAddress) {
                      setEditingAddress({ ...editingAddress, state: e.target.value })
                    } else {
                      setNewAddress({ ...newAddress, state: e.target.value })
                    }
                  }}
                />
              </div>

              <div>
                <Label htmlFor="address-zip">ZIP/Postal Code</Label>
                <Input
                  id="address-zip"
                  value={editingAddress ? editingAddress.zipCode : newAddress.zipCode}
                  onChange={(e) => {
                    if (editingAddress) {
                      setEditingAddress({ ...editingAddress, zipCode: e.target.value })
                    } else {
                      setNewAddress({ ...newAddress, zipCode: e.target.value })
                    }
                  }}
                />
              </div>

              <div>
                <Label htmlFor="address-country">Country</Label>
                <Select
                  value={editingAddress ? editingAddress.country : newAddress.country}
                  onValueChange={(value) => {
                    if (editingAddress) {
                      setEditingAddress({ ...editingAddress, country: value })
                    } else {
                      setNewAddress({ ...newAddress, country: value })
                    }
                  }}
                >
                  <SelectTrigger id="address-country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="Germany">Germany</SelectItem>
                    <SelectItem value="France">France</SelectItem>
                    <SelectItem value="Japan">Japan</SelectItem>
                    <SelectItem value="China">China</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Label htmlFor="address-phone">Phone Number</Label>
                <Input
                  id="address-phone"
                  value={editingAddress ? editingAddress.phone : newAddress.phone}
                  onChange={(e) => {
                    if (editingAddress) {
                      setEditingAddress({ ...editingAddress, phone: e.target.value })
                    } else {
                      setNewAddress({ ...newAddress, phone: e.target.value })
                    }
                  }}
                />
              </div>

              {editingAddress && (
                <div className="col-span-2 flex items-center space-x-2">
                  <Switch
                    id="address-default"
                    checked={editingAddress.isDefault}
                    onCheckedChange={(checked) => {
                      setEditingAddress({ ...editingAddress, isDefault: checked })
                    }}
                  />
                  <Label htmlFor="address-default">Set as default address</Label>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddressDialog(false)}>
              Cancel
            </Button>
            <Button onClick={editingAddress ? handleEditAddress : handleAddAddress}>
              {editingAddress ? "Save Changes" : "Add Address"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
{/*
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <ProfileCompleteness sections={profileSections} />
        <ProfileActivity activities={recentActivities} />
      </div>*/}
    </div>
  )
}
