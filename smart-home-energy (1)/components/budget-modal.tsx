"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface BudgetModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentBudget: number
  onBudgetSet: (budget: number) => void
}

export function BudgetModal({ open, onOpenChange, currentBudget, onBudgetSet }: BudgetModalProps) {
  const [budget, setBudget] = useState(currentBudget)

  const handleSliderChange = (value: number[]) => {
    setBudget(value[0])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value >= 0) {
      setBudget(value)
    }
  }

  const handleSubmit = () => {
    onBudgetSet(budget)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Energy Budget</DialogTitle>
          <DialogDescription>
            Set your monthly energy budget in kWh. You'll receive alerts when you approach your limit.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="budget" className="text-right">
              Budget (kWh)
            </Label>
            <Input
              id="budget"
              type="number"
              value={budget}
              onChange={handleInputChange}
              className="col-span-3"
              min={0}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Adjust</Label>
            <div className="col-span-3">
              <Slider value={[budget]} min={50} max={500} step={10} onValueChange={handleSliderChange} />
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>50 kWh</span>
                <span>500 kWh</span>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save Budget
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

