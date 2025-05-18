"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface GreetingModalProps {
  userName: string
  onClose: () => void
}

export function GreetingModal({ userName, onClose }: GreetingModalProps) {
  const [greeting, setGreeting] = useState("")
  const [question, setQuestion] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()

    const morningGreetings = [
      `Good morning, ${userName}!`,
      `Rise and shine, ${userName}!`,
      `Hope you’re feeling refreshed, ${userName}.`,
      `Morning, ${userName}! Make it a great one.`,
      `Hello ${userName}, a fresh start awaits!`
    ];

    const afternoonGreetings = [
      `Good afternoon, ${userName}!`,
      `Hey ${userName}, hope your day’s going well!`,
      `Hello ${userName}, enjoying your day so far?`,
      `Afternoon, ${userName}! Keep up the great work.`,
      `Hi ${userName}, hope it’s a productive day!`
    ]

    const eveningGreetings = [
      `Good evening, ${userName}!`,
      `Hey ${userName}, how was your day?`,
      `Evening, ${userName}! Time to unwind.`,
      `Hello ${userName}, hope you had a good one!`,
      `Hi ${userName}, the evening is here.`
    ]

    const nightGreetings = [
      `Still awake, ${userName}?`,
      `Good night, ${userName}! Sweet dreams.`,
      `Hello night owl, ${userName}!`,
      `Burning the midnight oil, ${userName}? Don’t forget to rest.`,
      `Stars are out, ${userName}. Rest when you can.`
    ]

    let timeGreetings
    if (hour >= 5 && hour < 12) {
      timeGreetings = morningGreetings
    } else if (hour >= 12 && hour < 18) {
      timeGreetings = afternoonGreetings
    } else if (hour >= 18 && hour < 22) {
      timeGreetings = eveningGreetings
    } else {
      timeGreetings = nightGreetings
    }

    const randomGreeting = timeGreetings[Math.floor(Math.random() * timeGreetings.length)]

    setGreeting(randomGreeting)
  }, [userName])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md p-6 rounded-lg bg-white text-gray-800 shadow-lg">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:bg-gray-100"
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="text-center py-6">
          <h2 className="text-xl font-bold">{greeting}</h2>
        </div>
      </div>
    </div>
  )
}
