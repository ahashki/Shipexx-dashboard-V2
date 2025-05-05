import { redirect } from "next/navigation"

export default function EstimatesPage() {
  // This is just a redirect page - the middleware will handle showing the actual estimates content
  redirect("/estimates")
  return null
}
