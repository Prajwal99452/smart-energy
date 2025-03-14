"use client"

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  BarChart,
} from "recharts"

interface EnergyUsageChartProps {
  isMonthly?: boolean
}

export function EnergyUsageChart({ isMonthly = false }: EnergyUsageChartProps) {
  const dailyData = [
    { name: "Mon", usage: 95, cost: 7.6 },
    { name: "Tue", usage: 85, cost: 6.8 },
    { name: "Wed", usage: 110, cost: 8.8 },
    { name: "Thu", usage: 100, cost: 8.0 },
    { name: "Fri", usage: 120, cost: 9.6 },
    { name: "Sat", usage: 130, cost: 10.4 },
    { name: "Sun", usage: 90, cost: 7.2 },
  ]

  const monthlyData = [
    { name: "Jan", usage: 2800, cost: 224 },
    { name: "Feb", usage: 2500, cost: 200 },
    { name: "Mar", usage: 2300, cost: 184 },
    { name: "Apr", usage: 2100, cost: 168 },
    { name: "May", usage: 2400, cost: 192 },
    { name: "Jun", usage: 2700, cost: 216 },
    { name: "Jul", usage: 3100, cost: 248 },
    { name: "Aug", usage: 3300, cost: 264 },
    { name: "Sep", usage: 2900, cost: 232 },
    { name: "Oct", usage: 2600, cost: 208 },
    { name: "Nov", usage: 2800, cost: 224 },
    { name: "Dec", usage: 3000, cost: 240 },
  ]

  const data = isMonthly ? monthlyData : dailyData

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        {isMonthly ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar yAxisId="left" dataKey="usage" name="Usage (kWh)" fill="#8884d8" />
            <Bar yAxisId="right" dataKey="cost" name="Cost ($)" fill="#82ca9d" />
          </BarChart>
        ) : (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="usage"
              name="Usage (kWh)"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUsage)"
            />
            <Area
              type="monotone"
              dataKey="cost"
              name="Cost ($)"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorCost)"
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-md shadow-md p-2">
        <div className="font-medium">{label}</div>
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-[#8884d8] mr-1"></div>
          <span>Usage: {payload[0].value} kWh</span>
        </div>
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-[#82ca9d] mr-1"></div>
          <span>Cost: ${payload[1].value}</span>
        </div>
      </div>
    )
  }
  return null
}

