import type React from "react"
import { TopMenuLayout } from "@/components/demo/top-menu-layout"

export default function DemoTopMenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <TopMenuLayout>{children}</TopMenuLayout>
}
