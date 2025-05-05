import type { ReactNode } from "react"

interface PageLayoutProps {
  children: ReactNode
  title: string
  action?: ReactNode
}

export function PageLayout({ children, title, action }: PageLayoutProps) {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        {action}
      </div>
      {children}
    </div>
  )
}
