"use client"

import { useState } from "react"
import { ImprovedLayout } from "@/components/dashboard/improved-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ImprovedLayoutDemo() {
  const [username, setUsername] = useState("John Doe")
  const [avatarUrl, setAvatarUrl] = useState("/placeholder.svg?height=64&width=64")

  return (
    <ImprovedLayout username={username} avatarUrl={avatarUrl}>
      <div className="max-w-5xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Improved Shipexx Dashboard Layout</CardTitle>
            <CardDescription>
              This demo showcases the new collapsible sidebar with dark/light mode toggle and improved user profile
              display.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">The new sidebar design includes:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Collapsible sidebar that remembers your preference</li>
              <li>Dark/light mode toggle with system preference detection</li>
              <li>User profile with name display</li>
              <li>Tooltips for collapsed navigation items</li>
              <li>Responsive design that works on mobile and desktop</li>
              <li>Improved organization of navigation items</li>
            </ul>

            <div className="space-y-4 border-t pt-4">
              <h3 className="text-lg font-medium">Customize Demo</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avatar">Avatar URL</Label>
                  <Input
                    id="avatar"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder="Enter avatar URL"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setUsername("John Doe")
                    setAvatarUrl("/placeholder.svg?height=64&width=64")
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Try clicking the collapse button in the sidebar to toggle between expanded and collapsed views. The
                sidebar will remember your preference even if you refresh the page.
              </p>
              <p className="mt-4">
                The dark/light mode toggle affects the entire application and persists between sessions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mobile Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                On mobile devices, the sidebar transforms into a slide-out menu accessible via the hamburger icon in the
                header. This preserves screen space while maintaining all navigation options.
              </p>
              <p className="mt-4">
                Try resizing your browser window to see how the layout adapts to different screen sizes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ImprovedLayout>
  )
}
