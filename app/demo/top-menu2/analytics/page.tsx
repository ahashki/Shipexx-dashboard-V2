import { redirect } from "next/navigation"

export default function AnalyticsPage() {
  // This is just a redirect page - the middleware will handle showing the actual analytics content
  redirect("/analytics")
  return null
}
