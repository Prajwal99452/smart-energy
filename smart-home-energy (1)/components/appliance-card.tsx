import type { ReactNode } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, ArrowUp } from "lucide-react"

interface ApplianceCardProps {
  name: string
  icon: ReactNode
  usage: number
  status: string
  trend: string
}

export function ApplianceCard({ name, icon, usage, status, trend }: ApplianceCardProps) {
  const isIncreasing = trend.startsWith("+")

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{usage} kWh</div>
        <div className="flex items-center justify-between mt-2">
          <Badge variant={status === "On" ? "default" : "outline"}>{status}</Badge>
          <div className={`flex items-center text-xs ${isIncreasing ? "text-destructive" : "text-green-500"}`}>
            {isIncreasing ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
            {trend}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-2">
        <div className="text-xs text-muted-foreground">Last updated: Today at 10:45 AM</div>
      </CardFooter>
    </Card>
  )
}

