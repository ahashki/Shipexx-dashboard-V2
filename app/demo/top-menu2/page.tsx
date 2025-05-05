import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TopMenu2DemoPage() {
  const mainPages = [
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
  ]

  const checkoutPages = [
    { name: "Add Funds", path: "/checkout/add-funds" },
    { name: "Subscription", path: "/checkout/subscription" },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-3">Top Menu Layout 2</h1>
        <p className="text-muted-foreground mb-6">
          This is an alternative layout with a mega menu navigation at the top. It features dropdown panels,
          mobile-responsive design, and a modern visual style.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>View Pages with Top Menu 2</CardTitle>
          <CardDescription>Click on any button below to view that page with the Top Menu 2 layout.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="main">
            <TabsList className="mb-4">
              <TabsTrigger value="main">Main Pages</TabsTrigger>
              <TabsTrigger value="checkout">Checkout Pages</TabsTrigger>
            </TabsList>

            <TabsContent value="main">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {mainPages.map((page) => (
                  <Button key={page.path} variant="outline" asChild className="justify-start">
                    <Link href={`/demo/top-menu2${page.path}`}>{page.name}</Link>
                  </Button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="checkout">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {checkoutPages.map((page) => (
                  <Button key={page.path} variant="outline" asChild className="justify-start">
                    <Link href={`/demo/top-menu2${page.path}`}>{page.name}</Link>
                  </Button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>For Developers</CardTitle>
          <CardDescription>How to implement this layout in your application</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>To use this layout for any page in your application, you can:</p>
            <ol className="list-decimal ml-6 space-y-2">
              <li>Import the TopMenu2Layout component</li>
              <li>Wrap your page content with the TopMenu2Layout component</li>
              <li>The layout will automatically handle navigation and responsiveness</li>
            </ol>
            <div className="bg-muted p-4 rounded-md">
              <pre className="text-sm">
                {`import TopMenu2Layout from "@/components/demo/top-menu2-layout";

export default function YourPage() {
  return (
    <TopMenu2Layout>
      <h1>Your Page Content</h1>
      {/* Your content here */}
    </TopMenu2Layout>
  );
}`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
