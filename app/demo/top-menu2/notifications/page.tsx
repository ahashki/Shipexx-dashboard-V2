import { redirect } from "next/navigation"

export default function NotificationsPage() {
  // This is just a redirect page - the middleware will handle showing the actual notifications content
  redirect("/notifications")
  return null
}
