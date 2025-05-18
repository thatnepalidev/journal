"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useJournal } from "@/components/journal-provider"

export function Calendar() {
  const { currentDate, selectedDate, setSelectedDate, hasEntryForDate } = useJournal()

  const [currentMonth, setCurrentMonth] = useState(new Date())

  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(new Date(selectedDate))
    }
  }, [selectedDate])

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const firstDayOfWeek = firstDay.getDay()
    const daysInMonth = lastDay.getDate()
    const totalDays = firstDayOfWeek + daysInMonth
    const rows = Math.ceil(totalDays / 7)

    const days = []

    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null)
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      const dateString = date.toISOString().split("T")[0]

      days.push({
        date: i,
        dateString,
        isToday: dateString === currentDate,
        isSelected: dateString === selectedDate,
        hasEntry: hasEntryForDate(dateString),
        isPast: dateString < currentDate,
      })
    }

    const remainingCells = rows * 7 - days.length
    for (let i = 0; i < remainingCells; i++) {
      days.push(null)
    }

    return days
  }

  const days = generateCalendarDays()

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  return (
    <div className="w-full md:w-[300px] border-t md:border-t-0 md:border-l border-gray-200 p-4 overflow-auto">
      <div className="rounded-lg bg-white p-3">
        <div className="text-center mb-4">
          <div className="flex items-center justify-between mb-2">
            <Button variant="ghost" size="icon" onClick={prevMonth} className="h-7 w-7 text-gray-800">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-sm font-medium text-gray-800">
              {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </h2>
            <Button variant="ghost" size="icon" onClick={nextMonth} className="h-7 w-7 text-gray-800">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mb-1">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <div key={index} className="text-xs font-medium text-gray-600">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <div key={index} className="aspect-square flex items-center justify-center">
              {day ? (
                <button
                  onClick={() => setSelectedDate(day.dateString)}
                  disabled={day.dateString > currentDate}
                  className={`
                    w-8 h-8 rounded-md flex items-center justify-center text-xs relative
                    ${day.isSelected ? "font-bold bg-gray-200" : "text-gray-800"}
                    ${day.dateString > currentDate ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}
                  `}
                >
                  {day.date}
                  {day.hasEntry && (
                    <div className="absolute -top-1 -right-1 text-green-500">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                  {day.isPast && !day.hasEntry && (
                    <div className="absolute -top-1 -right-1 text-red-500">
                      <X className="h-3 w-3" />
                    </div>
                  )}
                </button>
              ) : (
                <div className="w-8 h-8"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
