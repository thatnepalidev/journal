"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface NameModalProps {
  onSubmit: (name: string) => void
}

export function NameModal({ onSubmit }: NameModalProps) {
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setError("Please enter your name")
      return
    }

    onSubmit(name)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md p-6 rounded-lg bg-black text-white">
        <h2 className="text-xl font-bold text-center mb-6">
          Before you start writing lets know eachother I am the all mighty Journal, what is your name?
        </h2>

        <form onSubmit={handleSubmit}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="mb-4 bg-neutral-800 border-neutral-700 text-white"
          />

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <Button type="submit" className="w-full bg-accent-600 hover:bg-accent-700 text-white">
            Continue
          </Button>
        </form>
      </div>
    </div>
  )
}
