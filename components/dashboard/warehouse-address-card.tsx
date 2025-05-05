"use client"

import { useState, useEffect } from "react"
import { Truck, User, Copy, Bell, Package, ChevronDown, ChevronUp, MapPin, ExternalLink } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { NotifyIncomingPackageModal } from "./notify-incoming-package-modal"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export function WarehouseAddressCard() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [notifyModalOpen, setNotifyModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"card" | "compact" | "hidden">("card")

  // Load view mode from localStorage on component mount
  useEffect(() => {
    const savedViewMode = localStorage.getItem("warehouseAddressViewMode")
    if (savedViewMode) {
      setViewMode(savedViewMode as "card" | "compact" | "hidden")
    }
  }, [])

  // Save view mode to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("warehouseAddressViewMode", viewMode)
  }, [viewMode])

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const cycleViewMode = () => {
    if (viewMode === "card") setViewMode("compact")
    else if (viewMode === "compact") setViewMode("hidden")
    else setViewMode("card")
  }

  // If hidden, render a floating action button
  if (viewMode === "hidden") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="fixed bottom-6 right-6 rounded-full shadow-lg z-10 h-14 w-14"
              onClick={() => setViewMode("card")}
            >
              <MapPin className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Show Warehouse Address</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  // If compact, render a minimal version
  if (viewMode === "compact") {
    return (
      <Card className="mb-6 bg-primary/5 hover:bg-primary/10 transition-colors">
        <CardHeader className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-primary" />
              <span className="font-medium">US Warehouse: SHX-12345</span>
            </div>
            <div className="flex items-center space-x-2">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Your Shipexx Warehouse Address</DrawerTitle>
                    <DrawerDescription>Use this address when shipping items to our warehouse</DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4 space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="rounded-full p-3 bg-primary/10">
                        <Truck className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">US Warehouse</h3>
                          <Badge variant="outline" className="text-xs bg-primary/5 border-primary/20">
                            Customer ID: SHX-12345
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mt-1">Anas hashki, 430 sonora cir redlands ca ,USA</p>
                        <div className="flex items-center mt-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4 mr-1" />
                          <span className="mr-3">Anas hashki</span>
                          <span>•</span>
                          <span className="mx-3">+1 (555) 123-4567</span>
                          <Button variant="ghost" size="sm" className="h-6 p-0 ml-auto">
                            <Copy className="h-3.5 w-3.5 mr-1" /> Copy Address
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Instructions for Shipping to Our Warehouse:</h4>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                        <li>Include your Customer ID (SHX-12345) on all packages</li>
                        <li>Notify us of incoming shipments through the dashboard</li>
                        <li>Ensure all items are properly packaged to prevent damage</li>
                        <li>For large shipments, contact customer support in advance</li>
                      </ol>
                    </div>
                  </div>
                  <DrawerFooter className="flex flex-row justify-between">
                    <Button variant="outline" onClick={() => setNotifyModalOpen(true)}>
                      <Bell className="mr-2 h-4 w-4" /> Notify of Incoming Package
                    </Button>
                    <DrawerClose asChild>
                      <Button>Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={cycleViewMode}>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
    )
  }

  // Default card view
  return (
    <Card className="mb-6 transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center">
          <CardTitle>Your Shipexx Warehouse Address</CardTitle>
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="sm" className="text-xs" onClick={cycleViewMode}>
            Compact View
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={toggleExpand}
            title={isExpanded ? "Hide details" : "Show details"}
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <div className={cn("transition-all duration-300", !isExpanded && "opacity-0 max-h-0")}>
        <CardHeader className="pt-0 pb-2">
          <CardDescription>Use this address when shipping items to our warehouse</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="rounded-full p-3 bg-primary/10">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">US Warehouse</h3>
                  <Badge variant="outline" className="text-xs bg-primary/5 border-primary/20">
                    Customer ID: SHX-12345
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-1">Anas hashki, 430 sonora cir redlands ca ,USA</p>
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4 mr-1" />
                  <span className="mr-3">Anas hashki</span>
                  <span>•</span>
                  <span className="mx-3">+1 (555) 123-4567</span>
                  <Button variant="ghost" size="sm" className="h-6 p-0 ml-auto">
                    <Copy className="h-3.5 w-3.5 mr-1" /> Copy Address
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">Instructions for Shipping to Our Warehouse:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Include your Customer ID (SHX-12345) on all packages</li>
                <li>Notify us of incoming shipments through the dashboard</li>
                <li>Ensure all items are properly packaged to prevent damage</li>
                <li>For large shipments, contact customer support in advance</li>
              </ol>
            </div>

            <div className="flex justify-between items-center">
              <Button variant="outline" onClick={() => setNotifyModalOpen(true)}>
                <Bell className="mr-2 h-4 w-4" /> Notify of Incoming Package
              </Button>             
            </div>
          </div>
        </CardContent>
      </div>
      <NotifyIncomingPackageModal open={notifyModalOpen} onOpenChange={setNotifyModalOpen} />
    </Card>
  )
}
