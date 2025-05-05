import { redirect } from "next/navigation"

export default function AddressesPage() {
  // This is just a redirect page - the middleware will handle showing the actual addresses content
  redirect("/addresses")
  return null
}
