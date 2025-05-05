"use client"

import { Checkbox } from "@/components/ui/checkbox"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DollarSign,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Calendar,
  Download,
  Filter,
  Search,
  CreditCardIcon,
  BanknoteIcon as Bank,
  RefreshCw,
} from "lucide-react"

import { useRouter } from "next/navigation"

// Mock data for wallet
const initialWalletData = {
  balance: 523.45,
  pendingBalance: 75.0,
  currency: "USD",
  transactions: [
    {
      id: "tx-1",
      date: "Mar 10, 2025",
      description: "Order Payment",
      amount: -169.97,
      status: "completed",
      orderId: "SP123456789",
      type: "payment",
    },
    {
      id: "tx-2",
      date: "Mar 9, 2025",
      description: "Wallet Top-up",
      amount: 500.0,
      status: "completed",
      paymentMethod: "Credit Card (**** 4242)",
      type: "deposit",
    },
    {
      id: "tx-3",
      date: "Mar 5, 2025",
      description: "Order Payment",
      amount: -309.97,
      status: "completed",
      orderId: "SP567891234",
      type: "payment",
    },
    {
      id: "tx-4",
      date: "Mar 1, 2025",
      description: "Refund",
      amount: 79.99,
      status: "completed",
      orderId: "SP246813579",
      type: "refund",
    },
    {
      id: "tx-5",
      date: "Feb 28, 2025",
      description: "Order Payment",
      amount: -79.99,
      status: "completed",
      orderId: "SP246813579",
      type: "payment",
    },
    {
      id: "tx-6",
      date: "Feb 25, 2025",
      description: "Order Payment",
      amount: -559.97,
      status: "completed",
      orderId: "SP135792468",
      type: "payment",
    },
    {
      id: "tx-7",
      date: "Feb 20, 2025",
      description: "Wallet Top-up",
      amount: 1000.0,
      status: "completed",
      paymentMethod: "Bank Transfer",
      type: "deposit",
    },
  ],
  paymentMethods: [
    {
      id: "pm-1",
      type: "card",
      brand: "Visa",
      last4: "4242",
      expMonth: 12,
      expYear: 2026,
      isDefault: true,
    },
    {
      id: "pm-2",
      type: "bank",
      bankName: "Chase",
      accountLast4: "9876",
      isDefault: false,
    },
  ],
  pendingTransactions: [
    {
      id: "ptx-1",
      date: "Mar 11, 2025",
      description: "Wallet Top-up",
      amount: 75.0,
      status: "pending",
      paymentMethod: "Bank Transfer",
      type: "deposit",
      estimatedCompletion: "Mar 14, 2025",
    },
  ],
}

export default function WalletPage() {
  const [walletData, setWalletData] = useState(initialWalletData)
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false)
  const [isAddPaymentMethodOpen, setIsAddPaymentMethodOpen] = useState(false)
  const [addFundsAmount, setAddFundsAmount] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const [transactionFilter, setTransactionFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const filteredTransactions = [...walletData.transactions, ...walletData.pendingTransactions]
    .filter((tx) => {
      // Search filter
      const matchesSearch =
        tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tx.orderId && tx.orderId.toLowerCase().includes(searchQuery.toLowerCase()))

      // Type filter
      const matchesType = transactionFilter === "all" || tx.type === transactionFilter

      return matchesSearch && matchesType
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const handleAddFunds = () => {
    if (!addFundsAmount || !selectedPaymentMethod) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const amount = Number.parseFloat(addFundsAmount)
      const paymentMethod = walletData.paymentMethods.find((pm) => pm.id === selectedPaymentMethod)

      const newTransaction = {
        id: `ptx-${Date.now()}`,
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
        description: "Wallet Top-up",
        amount: amount,
        status: "pending",
        paymentMethod:
          paymentMethod.type === "card"
            ? `Credit Card (**** ${paymentMethod.last4})`
            : `Bank Account (**** ${paymentMethod.accountLast4})`,
        type: "deposit",
        estimatedCompletion: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      }

      setWalletData({
        ...walletData,
        pendingBalance: walletData.pendingBalance + amount,
        pendingTransactions: [...walletData.pendingTransactions, newTransaction],
      })

      setIsLoading(false)
      setIsAddFundsOpen(false)
      setAddFundsAmount("")
      setSelectedPaymentMethod("")
    }, 1500)
  }

  const getTransactionIcon = (type, status) => {
    if (status === "pending") return <Clock className="h-4 w-4 text-amber-500" />

    switch (type) {
      case "deposit":
        return <ArrowUpRight className="h-4 w-4 text-green-500" />
      case "payment":
        return <ArrowDownRight className="h-4 w-4 text-red-500" />
      case "refund":
        return <ArrowUpRight className="h-4 w-4 text-green-500" />
      default:
        return <DollarSign className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
            Failed
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Wallet</h1>
        <p className="text-muted-foreground mt-2">Manage your balance and payment methods.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${walletData.balance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">{walletData.currency}</p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button onClick={() => router.push("/checkout/add-funds")}>
              <Plus className="h-4 w-4 mr-2" />
              Add Funds
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${walletData.pendingBalance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {walletData.pendingTransactions.length > 0
                ? `${walletData.pendingTransactions.length} pending transaction${walletData.pendingTransactions.length > 1 ? "s" : ""}`
                : "No pending transactions"}
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" disabled={walletData.pendingTransactions.length === 0}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Check Status
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{walletData.paymentMethods.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {walletData.paymentMethods.filter((pm) => pm.type === "card").length} card(s),{" "}
              {walletData.paymentMethods.filter((pm) => pm.type === "bank").length} bank account(s)
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" onClick={() => setIsAddPaymentMethodOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Method
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="mt-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={transactionFilter} onValueChange={setTransactionFilter}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="deposit">Deposits</SelectItem>
                <SelectItem value="payment">Payments</SelectItem>
                <SelectItem value="refund">Refunds</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>View your recent transactions</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredTransactions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <DollarSign className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No transactions found</p>
                  <p className="text-muted-foreground text-center mt-1">
                    {searchQuery || transactionFilter !== "all"
                      ? "Try adjusting your filters to see more results."
                      : "When you make transactions, they will appear here."}
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>
                          <div className="flex items-start gap-2">
                            <span className="mt-0.5">{getTransactionIcon(transaction.type, transaction.status)}</span>
                            <div>
                              <div className="font-medium">{transaction.description}</div>
                              <div className="text-xs text-muted-foreground">
                                {transaction.orderId && `Order: ${transaction.orderId}`}
                                {transaction.paymentMethod && `Via: ${transaction.paymentMethod}`}
                              </div>
                              {transaction.estimatedCompletion && (
                                <div className="text-xs text-muted-foreground">
                                  Est. completion: {transaction.estimatedCompletion}
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                        <TableCell
                          className={`text-right font-medium ${transaction.amount > 0 ? "text-green-600 dark:text-green-400" : ""}`}
                        >
                          {transaction.amount > 0 ? "+" : ""}
                          {transaction.amount.toFixed(2)} {walletData.currency}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Filter by Date
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
{/*
        <TabsContent value="payment-methods" className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Your Payment Methods</h2>
            <Button onClick={() => setIsAddPaymentMethodOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {walletData.paymentMethods.map((method) => (
              <Card key={method.id} className="relative overflow-hidden">
                {method.isDefault && (
                  <div className="absolute top-0 right-0">
                    <Badge className="rounded-bl-md rounded-tr-md rounded-br-none rounded-tl-none bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Default
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {method.type === "card" ? (
                      <CreditCardIcon className="h-8 w-8 text-primary" />
                    ) : (
                      <Bank className="h-8 w-8 text-primary" />
                    )}
                    <div>
                      <CardTitle>{method.type === "card" ? method.brand : method.bankName}</CardTitle>
                      <CardDescription>
                        {method.type === "card"
                          ? `**** **** **** ${method.last4}`
                          : `Account ending in ${method.accountLast4}`}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {method.type === "card" && (
                    <p className="text-sm text-muted-foreground">
                      Expires: {method.expMonth.toString().padStart(2, "0")}/{method.expYear}
                    </p>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  {!method.isDefault && (
                    <Button variant="outline" size="sm">
                      Set as Default
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="text-red-500">
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent> */}
      </Tabs>

      {/* Add Funds Dialog */}
      <Dialog open={isAddFundsOpen} onOpenChange={setIsAddFundsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Funds to Wallet</DialogTitle>
            <DialogDescription>Enter the amount you want to add to your wallet balance.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount ({walletData.currency})</Label>
              <Input
                id="amount"
                type="number"
                min="1"
                step="0.01"
                placeholder="0.00"
                value={addFundsAmount}
                onChange={(e) => setAddFundsAmount(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                <SelectTrigger id="payment-method">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  {walletData.paymentMethods.map((method) => (
                    <SelectItem key={method.id} value={method.id}>
                      {method.type === "card"
                        ? `${method.brand} (**** ${method.last4})`
                        : `${method.bankName} (**** ${method.accountLast4})`}
                      {method.isDefault && " (Default)"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddFundsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddFunds} disabled={!addFundsAmount || !selectedPaymentMethod || isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Funds
                </span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Payment Method Dialog */}
      <Dialog open={isAddPaymentMethodOpen} onOpenChange={setIsAddPaymentMethodOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>Add a new payment method to your wallet.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Payment Method Type</Label>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Button variant="outline" className="w-full h-24 flex flex-col gap-2">
                    <CreditCardIcon className="h-8 w-8" />
                    <span>Credit/Debit Card</span>
                  </Button>
                </div>
                <div className="flex-1">
                  <Button variant="outline" className="w-full h-24 flex flex-col gap-2">
                    <Bank className="h-8 w-8" />
                    <span>Bank Account</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input id="card-number" placeholder="1234 5678 9012 3456" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="name">Name on Card</Label>
              <Input id="name" placeholder="John Doe" />
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="default" />
              <Label htmlFor="default" className="cursor-pointer">
                Set as default payment method
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddPaymentMethodOpen(false)}>
              Cancel
            </Button>
            <Button>Add Payment Method</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
