import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CheckCircle, AlertCircle, Clock } from "lucide-react"

type VerificationStatus = "verified" | "unverified" | "pending"

interface VerificationBadgeProps {
  status: VerificationStatus
  type: string
}

export function VerificationBadge({ status, type }: VerificationBadgeProps) {
  const getStatusDetails = () => {
    switch (status) {
      case "verified":
        return {
          icon: CheckCircle,
          text: "Verified",
          variant: "outline",
          className: "text-green-500 border-green-200 bg-green-50 dark:bg-green-900/20",
          tooltip: `Your ${type} has been verified`,
        }
      case "unverified":
        return {
          icon: AlertCircle,
          text: "Unverified",
          variant: "outline",
          className: "text-red-500 border-red-200 bg-red-50 dark:bg-red-900/20",
          tooltip: `Please verify your ${type} to unlock all features`,
        }
      case "pending":
        return {
          icon: Clock,
          text: "Pending",
          variant: "outline",
          className: "text-amber-500 border-amber-200 bg-amber-50 dark:bg-amber-900/20",
          tooltip: `Your ${type} verification is in progress`,
        }
    }
  }

  const { icon: Icon, text, className, tooltip } = getStatusDetails()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className={`flex items-center gap-1 ${className}`}>
            <Icon className="h-3 w-3" />
            {text}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
