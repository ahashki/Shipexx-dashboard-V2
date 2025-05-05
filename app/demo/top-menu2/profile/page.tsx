import { redirect } from "next/navigation"

export default function ProfilePage() {
  // This is just a redirect page - the middleware will handle showing the actual profile content
  redirect("/profile")
  return null
}
