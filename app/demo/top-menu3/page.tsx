import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, ExternalLink, Palette, Sparkles, Bell } from "lucide-react"

export default function TopMenu3Demo() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight"> </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
         
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="developers">--  </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 pt-4">
 

          {/*<Card>
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
              <CardDescription>View any page with this layout by prefixing the URL</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                To view any page with this enhanced top menu layout, simply prefix the URL with{" "}
                <code className="bg-muted px-1 py-0.5 rounded">/demo/top-menu3</code>
              </p>
              <div className="bg-muted p-3 rounded-md text-sm font-mono">
                https://yourdomain.com/demo/top-menu3/dashboard
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/demo/top-menu3/dashboard">
                  View Dashboard Example <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>*/}
        </TabsContent>

        <TabsContent value="pages" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Pages</CardTitle>
              <CardDescription>View any of these pages with the enhanced top menu layout</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Button asChild variant="outline" className="justify-start h-auto py-3">
                  <Link href="/demo/top-menu3/dashboard">Dashboard</Link>
                </Button>
                <Button asChild variant="outline" className="justify-start h-auto py-3">
                  <Link href="/demo/top-menu3/orders">Orders</Link>
                </Button>
                <Button asChild variant="outline" className="justify-start h-auto py-3">
                  <Link href="/demo/top-menu3/wallet">Wallet</Link>
                </Button>
                <Button asChild variant="outline" className="justify-start h-auto py-3">
                  <Link href="/demo/top-menu3/estimates">Estimates</Link>
                </Button>
                <Button asChild variant="outline" className="justify-start h-auto py-3">
                  <Link href="/demo/top-menu3/profile">Profile</Link>
                </Button>
                <Button asChild variant="outline" className="justify-start h-auto py-3">
                  <Link href="/demo/top-menu3/settings">Settings</Link>
                </Button>
                <Button asChild variant="outline" className="justify-start h-auto py-3">
                  <Link href="/demo/top-menu3/tracking">Tracking</Link>
                </Button>
                <Button asChild variant="outline" className="justify-start h-auto py-3">
                  <Link href="/demo/top-menu3/analytics">Analytics</Link>
                </Button>
                <Button asChild variant="outline" className="justify-start h-auto py-3">
                  <Link href="/demo/top-menu3/addresses">Addresses</Link>
                </Button>
                <Button asChild variant="outline" className="justify-start h-auto py-3">
                  <Link href="/demo/top-menu3/notifications">Notifications</Link>
                </Button>
                <Button asChild variant="outline" className="justify-start h-auto py-3">
                  <Link href="/demo/top-menu3/checkout/add-funds">Add Funds</Link>
                </Button>
                <Button asChild variant="outline" className="justify-start h-auto py-3">
                  <Link href="/demo/top-menu3/checkout/subscription">Subscription</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="developers" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Implementation Details</CardTitle>
              <CardDescription>How to implement this layout in your project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Layout Structure</h3>
                  <p className="text-sm text-muted-foreground">
                    The layout features a gradient-accented header with interactive navigation elements, a dedicated
                    notifications dropdown, and a user profile menu.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Key Components</h3>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Enhanced TopMenu3Layout with interactive elements</li>
                    <li>Color-coded navigation with hover effects</li>
                    <li>Dedicated notifications system with rich previews</li>
                    <li>User profile dropdown with visual enhancements</li>
                    <li>Dark/light mode toggle with smooth transitions</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Usage in Next.js</h3>
                  <p className="text-sm text-muted-foreground">
                    Import the TopMenu3Layout component and wrap your page content with it. For route-based
                    implementation, create a layout.tsx file in your route folder.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2">
              <p className="text-sm text-muted-foreground">View the source code for this layout:</p>
              <Button variant="outline" className="w-full" asChild>
                <Link href="#" target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Source Code
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
