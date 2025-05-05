import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle, AlertCircle } from "lucide-react"

interface ProfileSection {
  name: string
  completed: boolean
  required: boolean
  action: string
  url: string
}

interface ProfileCompletenessProps {
  sections: ProfileSection[]
}

export function ProfileCompleteness({ sections }: ProfileCompletenessProps) {
  // Calculate completion percentage
  const completedSections = sections.filter((section) => section.completed).length
  const totalSections = sections.length
  const completionPercentage = Math.round((completedSections / totalSections) * 100)

  // Get incomplete required sections
  const incompleteRequired = sections.filter((section) => !section.completed && section.required)

  // Get incomplete optional sections
  const incompleteOptional = sections.filter((section) => !section.completed && !section.required)

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Profile Completeness</CardTitle>
        <CardDescription>Complete your profile to unlock all features</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Your profile is {completionPercentage}% complete</span>
              <span className="font-medium">
                {completedSections}/{totalSections}
              </span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>

          {incompleteRequired.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium flex items-center">
                <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                Required information
              </h4>
              <ul className="space-y-2">
                {incompleteRequired.map((section) => (
                  <li key={section.name} className="flex justify-between items-center text-sm">
                    <span className="flex items-center">
                      <Circle className="h-3 w-3 mr-2 text-muted-foreground" />
                      {section.name}
                    </span>
                    <Button variant="link" size="sm" className="h-auto p-0">
                      {section.action}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {incompleteOptional.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Recommended</h4>
              <ul className="space-y-2">
                {incompleteOptional.map((section) => (
                  <li key={section.name} className="flex justify-between items-center text-sm">
                    <span className="flex items-center">
                      <Circle className="h-3 w-3 mr-2 text-muted-foreground" />
                      {section.name}
                    </span>
                    <Button variant="link" size="sm" className="h-auto p-0">
                      {section.action}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {completionPercentage === 100 && (
            <div className="flex items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 rounded-md">
              <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
              <span className="text-sm font-medium">Your profile is complete!</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
