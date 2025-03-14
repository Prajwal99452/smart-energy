"use client"

import { useState } from "react"
import { Battery, Home, Lightbulb, Refrigerator, Tv, WashingMachine, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { EnergyUsageChart } from "@/components/energy-usage-chart"
import { EnergyDistributionChart } from "@/components/energy-distribution-chart"
import { ApplianceCard } from "@/components/appliance-card"
import { BudgetModal } from "@/components/budget-modal"

export function EnergyDashboard() {
  const [showBudgetModal, setShowBudgetModal] = useState(false)
  const [currentBudget, setCurrentBudget] = useState(150)
  const [currentUsage, setCurrentUsage] = useState(112)
  const usagePercentage = (currentUsage / currentBudget) * 100

  const handleBudgetSet = (budget: number) => {
    setCurrentBudget(budget)
    setShowBudgetModal(false)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Energy Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage your home energy consumption</p>
        </div>
        <Button onClick={() => setShowBudgetModal(true)}>Set Energy Budget</Button>
      </div>

      {usagePercentage > 80 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Energy Budget Alert</AlertTitle>
          <AlertDescription>
            You've used {usagePercentage.toFixed(0)}% of your monthly energy budget. Consider reducing usage.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Usage</CardTitle>
            <Battery className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUsage} kWh</div>
            <p className="text-xs text-muted-foreground">Today's consumption</p>
            <Progress
              value={usagePercentage}
              className="mt-2"
              indicatorClassName={usagePercentage > 80 ? "bg-destructive" : ""}
            />
            <p className="text-xs mt-1">
              {currentUsage} kWh of {currentBudget} kWh budget
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Hours</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6PM - 9PM</div>
            <p className="text-xs text-muted-foreground">Highest energy consumption</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Cost</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$87.50</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carbon Footprint</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42 kg CO₂</div>
            <p className="text-xs text-muted-foreground">-5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="appliances">Appliances</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Energy Usage Trend</CardTitle>
                <CardDescription>Daily consumption over the past week</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <EnergyUsageChart />
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Energy Distribution</CardTitle>
                <CardDescription>Consumption by appliance type</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <EnergyDistributionChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appliances" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ApplianceCard
              name="Refrigerator"
              icon={<Refrigerator className="h-5 w-5" />}
              usage={32}
              status="On"
              trend="+2%"
            />
            <ApplianceCard
              name="Washing Machine"
              icon={<WashingMachine className="h-5 w-5" />}
              usage={18}
              status="Off"
              trend="-5%"
            />
            <ApplianceCard name="Television" icon={<Tv className="h-5 w-5" />} usage={15} status="Off" trend="+8%" />
            <ApplianceCard
              name="Lighting"
              icon={<Lightbulb className="h-5 w-5" />}
              usage={24}
              status="On"
              trend="-3%"
            />
            <ApplianceCard name="HVAC System" icon={<Home className="h-5 w-5" />} usage={45} status="On" trend="+12%" />
            <ApplianceCard
              name="Other Devices"
              icon={<Battery className="h-5 w-5" />}
              usage={22}
              status="Various"
              trend="-1%"
            />
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Energy History</CardTitle>
              <CardDescription>Compare your energy usage over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <EnergyUsageChart isMonthly={true} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <BudgetModal
        open={showBudgetModal}
        onOpenChange={setShowBudgetModal}
        currentBudget={currentBudget}
        onBudgetSet={handleBudgetSet}
      />
    </div>
  )
}

