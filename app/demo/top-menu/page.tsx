import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TopMenuDemoPage() {
  // List of all main pages in the app
  const pages = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Orders", path: "/orders" },
    { name: "Wallet", path: "/wallet" },
    { name: "Estimates", path: "/estimates" },
    { name: "Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },
    { name: "Tracking", path: "/tracking" },
    { name: "Analytics", path: "/analytics" },
    { name: "Addresses", path: "/addresses" },
    { name: "Notifications", path: "/notifications" },
    { name: "Checkout - Add Funds", path: "/checkout/add-funds" },
    { name: "Checkout - Subscription", path: "/checkout/subscription" },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Top Menu Layout Demo</h1>
        <p className="text-muted-foreground mb-6">
          This page demonstrates an alternative layout with a top navigation menu and centered content.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>View Pages with Top Menu Layout</CardTitle>
          <CardDescription>Select any page to view it with the top menu layout</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pages.map((page) => (
              <Button key={page.path} variant="outline" className="justify-start h-auto py-3" asChild>
                <Link href={`/demo/top-menu${page.path}`}>{page.name}</Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Use This Layout</CardTitle>
          <CardDescription>Instructions for developers to implement this layout</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Option 1: Use the Demo Routes</h3>
            <p className="text-sm text-muted-foreground">
              Access any page with the top menu layout by prefixing the route with{" "}
              <code className="bg-muted px-1 py-0.5 rounded">/demo/top-menu</code>
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Option 2: Implement in Your Own Routes</h3>
            <p className="text-sm text-muted-foreground">
              Import the <code className="bg-muted px-1 py-0.5 rounded">TopMenuLayout</code> component and use it in
              your layout file:
            </p>
            <pre className="bg-muted p-4 rounded-md mt-2 text-xs overflow-x-auto">
              {`import { TopMenuLayout } from "@/components/demo/top-menu-layout"

export default function YourLayout({ children }) {
  return <TopMenuLayout>{children}</TopMenuLayout>
}`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
