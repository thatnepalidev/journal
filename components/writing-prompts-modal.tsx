"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WritingPromptsModalProps {
  onClose: () => void
  onSelectPrompt: (prompt: string) => void
}

export function WritingPromptsModal({ onClose, onSelectPrompt }: WritingPromptsModalProps) {
  const promptCategories = [
    {
      title: "Daily Reflections",
      description: "Reflect on your day and experiences.",
      examples: [
        "Today I felt…",
        "Something good that happened was…",
        "I learned that…",
        "A challenge I faced was…",
        "Tomorrow, I want to…",
      ],
    },
    {
      title: "Emotional Check-In",
      description: "Check in with your current emotional state.",
      examples: [
        "Right now, I feel…",
        "I am worried about…",
        "Something that made me happy today was…",
        "I feel calm when…",
        "I wish I could…",
      ],
    },
    {
      title: "Goal Setting",
      description: "Set and track your goals.",
      examples: [
        "One thing I want to achieve this week is…",
        "My main goal this month is…",
        "A habit I want to build is…",
        "One step I can take toward my goal is…",
        "I will reward myself when I…",
      ],
    },
    {
      title: "Creative Writing",
      description: "Express yourself through creative writing.",
      examples: [
        "Once upon a time…",
        "In a faraway place…",
        "I dreamed about…",
        "Suddenly, I found…",
        "If I could fly, I would…",
      ],
    },
    {
      title: "Personal Growth",
      description: "Reflect on your personal development.",
      examples: [
        "Today I learned…",
        "I want to become better at…",
        "I am proud of myself because…",
        "One thing I want to improve is…",
        "I admire people who…",
      ],
    },
    {
      title: "Mind Mapping and Brainstorming",
      description: "Explore ideas and possibilities.",
      examples: [
        "Ideas I want to explore are…",
        "My dream project would be…",
        "I could try learning…",
        "I wish I could create…",
        "I want to start…",
      ],
    },
    {
      title: "Gratitude Letters",
      description: "Express gratitude to yourself and others.",
      examples: [
        "Dear [Name], thank you for…",
        "Dear me, I'm proud of you because…",
        "Dear [Name], you helped me when…",
        "Dear [Name], you make me smile because…",
        "Dear future me, never forget…",
      ],
    },
    {
      title: "Travel and Experiences",
      description: "Reflect on past travels or dream destinations.",
      examples: [
        "A place I want to visit is…",
        "My favorite trip was…",
        "One thing I remember from my last vacation is…",
        "I want to try…",
        "If I could go anywhere right now, it would be…",
      ],
    },
    {
      title: "Reflection Prompts",
      description: "General reflections on life and experiences.",
      examples: [
        "If I could change one thing, it would be…",
        "Something I am proud of is…",
        "I feel happiest when…",
        "I wish I knew more about…",
        "One thing I want to remember is…",
      ],
    },
  ]

  const handleSelectPrompt = (example: string) => {
    onSelectPrompt(example)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-4xl p-6 rounded-lg bg-white border border-gray-200 max-h-[90vh] overflow-auto">
        <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-2 right-2 text-gray-800">
          <X className="h-4 w-4" />
        </Button>

        <h2 className="text-xl font-bold mb-6 text-gray-800">Writing Prompts</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {promptCategories.map((category, index) => (
            <div key={index} className="border border-gray-200 rounded-md p-4 flex flex-col h-full">
              <h3 className="font-medium text-gray-800 mb-1">{category.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{category.description}</p>
              <div className="space-y-2 flex-grow">
                {category.examples.map((example, exIndex) => (
                  <button
                    key={exIndex}
                    onClick={() => handleSelectPrompt(example)}
                    className="text-sm text-left w-full py-2 px-3 bg-gray-100 rounded text-gray-700 transition-colors block"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
