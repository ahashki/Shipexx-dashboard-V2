"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Home, Building, MapPin, Plus, Edit, Trash2, Check } from "lucide-react"

// Mock data for addresses
const initialAddresses = {
  shipping: [
    {
      id: "addr-1",
      name: "John Doe",
      line1: "123 Main Street",
      line2: "Apt 4B",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "United States",
      phone: "+1 (555) 123-4567",
      isDefault: true,
      type: "residential",
    },
    {
      id: "addr-2",
      name: "John Doe",
      line1: "456 Park Avenue",
      line2: "",
      city: "Boston",
      state: "MA",
      postalCode: "02108",
      country: "United States",
      phone: "+1 (555) 987-6543",
      isDefault: false,
      type: "residential",
    },
  ],
  billing: [
    {
      id: "addr-3",
      name: "John Doe",
      line1: "789 Broadway",
      line2: "Suite 500",
      city: "New York",
      state: "NY",
      postalCode: "10003",
      country: "United States",
      phone: "+1 (555) 246-8101",
      isDefault: true,
      type: "business",
    },
  ],
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(initialAddresses)
  const [activeTab, setActiveTab] = useState("shipping")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentAddress, setCurrentAddress] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
    phone: "",
    isDefault: false,
    type: "residential",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCheckboxChange = (checked) => {
    setFormData({
      ...formData,
      isDefault: checked,
    })
  }

  const handleRadioChange = (value) => {
    setFormData({
      ...formData,
      type: value,
    })
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const resetForm = () => {
    setFormData({
      name: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "United States",
      phone: "",
      isDefault: false,
      type: "residential",
    })
  }

  const openAddDialog = () => {
    resetForm()
    setIsAddDialogOpen(true)
  }

  const openEditDialog = (address) => {
    setCurrentAddress(address)
    setFormData({
      name: address.name,
      line1: address.line1,
      line2: address.line2 || "",
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
      phone: address.phone,
      isDefault: address.isDefault,
      type: address.type,
    })
    setIsEditDialogOpen(true)
  }

  const handleAddAddress = () => {
    const newAddress = {
      id: `addr-${Date.now()}`,
      ...formData,
    }

    // If this is set as default, update other addresses
    const updatedAddresses = { ...addresses }
    if (newAddress.isDefault) {
      updatedAddresses[activeTab] = updatedAddresses[activeTab].map((addr) => ({
        ...addr,
        isDefault: false,
      }))
    }

    updatedAddresses[activeTab] = [...updatedAddresses[activeTab], newAddress]
    setAddresses(updatedAddresses)
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleEditAddress = () => {
    const updatedAddress = {
      ...currentAddress,
      ...formData,
    }

    // If this is set as default, update other addresses
    const updatedAddresses = { ...addresses }
    if (updatedAddress.isDefault) {
      updatedAddresses[activeTab] = updatedAddresses[activeTab].map((addr) => ({
        ...addr,
        isDefault: addr.id === updatedAddress.id ? true : false,
      }))
    } else {
      updatedAddresses[activeTab] = updatedAddresses[activeTab].map((addr) =>
        addr.id === updatedAddress.id ? updatedAddress : addr,
      )
    }

    setAddresses(updatedAddresses)
    setIsEditDialogOpen(false)
    setCurrentAddress(null)
    resetForm()
  }

  const handleDeleteAddress = (addressId) => {
    const updatedAddresses = { ...addresses }
    updatedAddresses[activeTab] = updatedAddresses[activeTab].filter((addr) => addr.id !== addressId)
    setAddresses(updatedAddresses)
  }

  const handleSetDefault = (addressId) => {
    const updatedAddresses = { ...addresses }
    updatedAddresses[activeTab] = updatedAddresses[activeTab].map((addr) => ({
      ...addr,
      isDefault: addr.id === addressId,
    }))
    setAddresses(updatedAddresses)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Addresses</h1>
        <p className="text-muted-foreground mt-2">Manage your shipping and billing addresses.</p>
      </div>

      <Tabs defaultValue="shipping" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="shipping">Shipping Addresses</TabsTrigger>
            <TabsTrigger value="billing">Billing Addresses</TabsTrigger>
          </TabsList>

          <Button onClick={openAddDialog}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Address
          </Button>
        </div>

        <TabsContent value="shipping" className="mt-6">
          {addresses.shipping.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No shipping addresses</p>
                <p className="text-muted-foreground text-center mt-1 mb-4">Add a shipping address to get started.</p>
                <Button onClick={openAddDialog}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Shipping Address
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {addresses.shipping.map((address) => (
                <Card key={address.id} className="relative">
                  {address.isDefault && (
                    <Badge className="absolute top-2 right-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Default
                    </Badge>
                  )}
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      {address.type === "residential" ? (
                        <Home className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Building className="h-4 w-4 text-muted-foreground" />
                      )}
                      <CardTitle className="text-lg">{address.name}</CardTitle>
                    </div>
                    <CardDescription>
                      {address.type === "residential" ? "Residential" : "Business"} Address
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 text-sm">
                      <p>{address.line1}</p>
                      {address.line2 && <p>{address.line2}</p>}
                      <p>
                        {address.city}, {address.state} {address.postalCode}
                      </p>
                      <p>{address.country}</p>
                      <p className="pt-2">{address.phone}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(address)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500"
                        onClick={() => handleDeleteAddress(address.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                    {!address.isDefault && (
                      <Button variant="ghost" size="sm" onClick={() => handleSetDefault(address.id)}>
                        <Check className="h-4 w-4 mr-1" />
                        Set as Default
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          {addresses.billing.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No billing addresses</p>
                <p className="text-muted-foreground text-center mt-1 mb-4">Add a billing address to get started.</p>
                <Button onClick={openAddDialog}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Billing Address
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {addresses.billing.map((address) => (
                <Card key={address.id} className="relative">
                  {address.isDefault && (
                    <Badge className="absolute top-2 right-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Default
                    </Badge>
                  )}
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      {address.type === "residential" ? (
                        <Home className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Building className="h-4 w-4 text-muted-foreground" />
                      )}
                      <CardTitle className="text-lg">{address.name}</CardTitle>
                    </div>
                    <CardDescription>
                      {address.type === "residential" ? "Residential" : "Business"} Address
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 text-sm">
                      <p>{address.line1}</p>
                      {address.line2 && <p>{address.line2}</p>}
                      <p>
                        {address.city}, {address.state} {address.postalCode}
                      </p>
                      <p>{address.country}</p>
                      <p className="pt-2">{address.phone}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(address)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500"
                        onClick={() => handleDeleteAddress(address.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                    {!address.isDefault && (
                      <Button variant="ghost" size="sm" onClick={() => handleSetDefault(address.id)}>
                        <Check className="h-4 w-4 mr-1" />
                        Set as Default
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Add Address Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New {activeTab === "shipping" ? "Shipping" : "Billing"} Address</DialogTitle>
            <DialogDescription>Enter the details for your new address. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="line1">Address Line 1</Label>
              <Input
                id="line1"
                name="line1"
                value={formData.line1}
                onChange={handleInputChange}
                placeholder="123 Main St"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="line2">Address Line 2 (Optional)</Label>
              <Input id="line2" name="line2" value={formData.line2} onChange={handleInputChange} placeholder="Apt 4B" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="New York"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="state">State/Province</Label>
                <Input id="state" name="state" value={formData.state} onChange={handleInputChange} placeholder="NY" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="10001"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Select value={formData.country} onValueChange={(value) => handleSelectChange("country", value)}>
                  <SelectTrigger id="country">
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
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="grid gap-2">
              <Label>Address Type</Label>
              <RadioGroup value={formData.type} onValueChange={handleRadioChange} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="residential" id="residential" />
                  <Label htmlFor="residential" className="cursor-pointer">
                    Residential
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="business" id="business" />
                  <Label htmlFor="business" className="cursor-pointer">
                    Business
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="isDefault" checked={formData.isDefault} onCheckedChange={handleCheckboxChange} />
              <Label htmlFor="isDefault" className="cursor-pointer">
                Set as default {activeTab === "shipping" ? "shipping" : "billing"} address
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddAddress}>Save Address</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Address Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit {activeTab === "shipping" ? "Shipping" : "Billing"} Address</DialogTitle>
            <DialogDescription>Update your address details. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-line1">Address Line 1</Label>
              <Input
                id="edit-line1"
                name="line1"
                value={formData.line1}
                onChange={handleInputChange}
                placeholder="123 Main St"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-line2">Address Line 2 (Optional)</Label>
              <Input
                id="edit-line2"
                name="line2"
                value={formData.line2}
                onChange={handleInputChange}
                placeholder="Apt 4B"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-city">City</Label>
                <Input
                  id="edit-city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="New York"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-state">State/Province</Label>
                <Input
                  id="edit-state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="NY"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-postalCode">Postal Code</Label>
                <Input
                  id="edit-postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="10001"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-country">Country</Label>
                <Select value={formData.country} onValueChange={(value) => handleSelectChange("country", value)}>
                  <SelectTrigger id="edit-country">
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
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-phone">Phone Number</Label>
              <Input
                id="edit-phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="grid gap-2">
              <Label>Address Type</Label>
              <RadioGroup value={formData.type} onValueChange={handleRadioChange} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="residential" id="edit-residential" />
                  <Label htmlFor="edit-residential" className="cursor-pointer">
                    Residential
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="business" id="edit-business" />
                  <Label htmlFor="edit-business" className="cursor-pointer">
                    Business
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="edit-isDefault"
                checked={formData.isDefault}
                onCheckedChange={handleCheckboxChange}
                disabled={formData.isDefault}
              />
              <Label htmlFor="edit-isDefault" className="cursor-pointer">
                Set as default {activeTab === "shipping" ? "shipping" : "billing"} address
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditAddress}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
