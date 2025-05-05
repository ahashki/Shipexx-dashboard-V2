import { redirect } from "next/navigation"

export default function OrdersPage() {
  // This is just a redirect page - the middleware will handle showing the actual orders content
  redirect("/orders")
  return null
}
