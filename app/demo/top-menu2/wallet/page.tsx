import { redirect } from "next/navigation"

export default function WalletPage() {
  // This is just a redirect page - the middleware will handle showing the actual wallet content
  redirect("/wallet")
  return null
}
