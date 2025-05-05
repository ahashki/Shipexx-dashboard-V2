import { redirect } from "next/navigation"

export default function TrackingPage() {
  // This is just a redirect page - the middleware will handle showing the actual tracking content
  redirect("/tracking")
  return null
}
