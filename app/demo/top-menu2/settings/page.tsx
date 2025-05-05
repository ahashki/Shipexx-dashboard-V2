import { redirect } from "next/navigation"

export default function SettingsPage() {
  // This is just a redirect page - the middleware will handle showing the actual settings content
  redirect("/settings")
  return null
}
