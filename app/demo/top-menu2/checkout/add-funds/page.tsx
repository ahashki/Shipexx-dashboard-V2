import { redirect } from "next/navigation"

export default function AddFundsPage() {
  // This is just a redirect page - the middleware will handle showing the actual add-funds content
  redirect("/checkout/add-funds")
  return null
}
