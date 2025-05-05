"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts"
import { ArrowUpRight, ArrowDownRight, DollarSign, Package, Truck, Globe } from "lucide-react"

// Mock data for charts
const monthlySpendingData = [
  { name: "Jan", amount: 420 },
  { name: "Feb", amount: 380 },
  { name: "Mar", amount: 510 },
  { name: "Apr", amount: 350 },
  { name: "May", amount: 490 },
  { name: "Jun", amount: 600 },
  { name: "Jul", amount: 520 },
  { name: "Aug", amount: 480 },
  { name: "Sep", amount: 550 },
  { name: "Oct", amount: 470 },
  { name: "Nov", amount: 630 },
  { name: "Dec", amount: 580 },
]

const carrierData = [
  { name: "FedEx", value: 35 },
  { name: "UPS", value: 30 },
  { name: "USPS", value: 20 },
  { name: "DHL", value: 15 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const destinationData = [
  { name: "USA", value: 65 },
  { name: "Europe", value: 15 },
  { name: "Asia", value: 12 },
  { name: "Other", value: 8 },
]

const packageTypeData = [
  { name: "Small", value: 45 },
  { name: "Medium", value: 30 },
  { name: "Large", value: 15 },
  { name: "Extra Large", value: 10 },
]

const weightDistributionData = [
  { weight: "0-1 lb", count: 35 },
  { weight: "1-2 lbs", count: 28 },
  { weight: "2-5 lbs", count: 20 },
  { weight: "5-10 lbs", count: 12 },
  { weight: "10+ lbs", count: 5 },
]

const deliveryTimeData = [
  { name: "Jan", time: 3.2 },
  { name: "Feb", time: 3.5 },
  { name: "Mar", time: 3.1 },
  { name: "Apr", time: 2.9 },
  { name: "May", time: 3.3 },
  { name: "Jun", time: 3.0 },
  { name: "Jul", time: 2.8 },
  { name: "Aug", time: 2.7 },
  { name: "Sep", time: 2.9 },
  { name: "Oct", time: 3.1 },
  { name: "Nov", time: 3.2 },
  { name: "Dec", time: 3.4 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("year")

  // Stats for the summary cards
  const stats = {
    totalSpent: {
      value: "$5,980",
      change: "+12.5%",
      trend: "up",
    },
    totalShipments: {
      value: "142",
      change: "+8.3%",
      trend: "up",
    },
    avgDeliveryTime: {
      value: "3.1 days",
      change: "-5.2%",
      trend: "down", // Down is good for delivery time
    },
    internationalShipments: {
      value: "35%",
      change: "+3.8%",
      trend: "up",
    },
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-2">View insights about your shipping activity and spending.</p>
      </div>

      <div className="flex justify-between items-center">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="spending">Spending</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="ml-auto">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSpent.value}</div>
            <p
              className={`text-xs ${stats.totalSpent.trend === "up" ? "text-red-500" : "text-green-500"} flex items-center`}
            >
              {stats.totalSpent.trend === "up" ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              {stats.totalSpent.change} from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalShipments.value}</div>
            <p
              className={`text-xs ${stats.totalShipments.trend === "up" ? "text-green-500" : "text-red-500"} flex items-center`}
            >
              {stats.totalShipments.trend === "up" ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              {stats.totalShipments.change} from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Delivery Time</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgDeliveryTime.value}</div>
            <p
              className={`text-xs ${stats.avgDeliveryTime.trend === "down" ? "text-green-500" : "text-red-500"} flex items-center`}
            >
              {stats.avgDeliveryTime.trend === "down" ? (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              )}
              {stats.avgDeliveryTime.change} from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">International Shipments</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.internationalShipments.value}</div>
            <p
              className={`text-xs ${stats.internationalShipments.trend === "up" ? "text-green-500" : "text-red-500"} flex items-center`}
            >
              {stats.internationalShipments.trend === "up" ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              {stats.internationalShipments.change} from previous period
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Monthly Spending</CardTitle>
            <CardDescription>Your shipping expenses over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlySpendingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Carrier Distribution</CardTitle>
            <CardDescription>Shipments by carrier</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={carrierData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {carrierData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Destination Countries</CardTitle>
            <CardDescription>Where your packages are shipped to</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={destinationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {destinationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Package Types</CardTitle>
            <CardDescription>Distribution by package size</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={packageTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {packageTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weight Distribution</CardTitle>
            <CardDescription>Packages by weight range</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weightDistributionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="weight" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} packages`, "Count"]} />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Average Delivery Time</CardTitle>
          <CardDescription>Delivery performance over time (in days)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={deliveryTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} days`, "Avg. Delivery Time"]} />
                <Line type="monotone" dataKey="time" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
