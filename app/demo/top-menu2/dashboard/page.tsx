import { redirect } from "next/navigation"

export default function DashboardPage() {
  // This is just a redirect page - the middleware will handle showing the actual dashboard content
  redirect("/dashboard")
  return null
}
