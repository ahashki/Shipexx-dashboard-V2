"use client"
import { NotificationSettings } from "@/components/dashboard/notification-settings"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NotificationsSettingsPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Settings
        </Button>
        <h1 className="text-3xl font-bold">Notification Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage how you receive notifications about your packages and orders
        </p>
      </div>

      <NotificationSettings
        onSave={(settings) => {
          console.log("Saved settings:", settings)
          // In a real app, you would save these settings to your backend
        }}
      />
    </div>
  )
}
