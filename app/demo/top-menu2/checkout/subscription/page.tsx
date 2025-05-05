import { redirect } from "next/navigation"

export default function SubscriptionPage() {
  // This is just a redirect page - the middleware will handle showing the actual subscription content
  redirect("/checkout/subscription")
  return null
}
