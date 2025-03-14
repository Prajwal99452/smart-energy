import { Suspense } from "react"
import { EnergyDashboard } from "@/components/energy-dashboard"
import { DashboardSkeleton } from "@/components/dashboard-skeleton"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={<DashboardSkeleton />}>
        <EnergyDashboard />
      </Suspense>
    </main>
  )
}

