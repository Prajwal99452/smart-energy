"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

export function EnergyDistributionChart() {
  const data = [
    { name: "HVAC", value: 45, color: "#8884d8" },
    { name: "Refrigerator", value: 32, color: "#82ca9d" },
    { name: "Lighting", value: 24, color: "#ffc658" },
    { name: "Other Devices", value: 22, color: "#ff8042" },
    { name: "Washing Machine", value: 18, color: "#0088fe" },
    { name: "Television", value: 15, color: "#00C49F" },
  ]

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-md shadow-md p-2">
        <div className="font-medium">{payload[0].name}</div>
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full mr-1" style={{ backgroundColor: payload[0].payload.color }}></div>
          <span>{payload[0].value} kWh</span>
        </div>
      </div>
    )
  }
  return null
}

