import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, CreditCard, LogIn, Settings, ShoppingCart } from "lucide-react"

interface ActivityItem {
  id: string
  type: "order" | "payment" | "login" | "settings" | "cart"
  description: string
  date: string
  time: string
  metadata?: Record<string, string>
}

interface ProfileActivityProps {
  activities: ActivityItem[]
}

export function ProfileActivity({ activities }: ProfileActivityProps) {
  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "order":
        return <Package className="h-4 w-4" />
      case "payment":
        return <CreditCard className="h-4 w-4" />
      case "login":
        return <LogIn className="h-4 w-4" />
      case "settings":
        return <Settings className="h-4 w-4" />
      case "cart":
        return <ShoppingCart className="h-4 w-4" />
    }
  }

  const getActivityColor = (type: ActivityItem["type"]) => {
    switch (type) {
      case "order":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      case "payment":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      case "login":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
      case "settings":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
      case "cart":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your recent account activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="relative pl-6 pb-8 last:pb-0">
              {/* Timeline connector */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-border"></div>

              {/* Timeline dot */}
              <div
                className={`absolute left-[-4px] top-1 w-2 h-2 rounded-full border-2 border-background ${getActivityColor(activity.type)}`}
              ></div>

              <div className="flex flex-col space-y-1.5">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`flex items-center gap-1 ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                    <span className="capitalize">{activity.type}</span>
                  </Badge>
                  <time className="text-xs text-muted-foreground">
                    {activity.date} at {activity.time}
                  </time>
                </div>
                <p className="text-sm">{activity.description}</p>

                {activity.metadata && (
                  <div className="mt-2 text-xs text-muted-foreground space-y-1">
                    {Object.entries(activity.metadata).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="capitalize">{key}:</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
