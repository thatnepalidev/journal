"use client"

import type React from "react"

import { useState, useRef } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useJournal } from "@/components/journal-provider"

interface SettingsModalProps {
  onClose: () => void
}

export function SettingsModal({ onClose }: SettingsModalProps) {
  const { userName, setUserName, exportData, importData } = useJournal()
  const [name, setName] = useState(userName)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleNameChange = () => {
    if (name.trim()) {
      setUserName(name)
      localStorage.setItem("journal-user-name", name)
    }
  }

  const handleImport = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        importData(event.target.result as string)
      }
    }
    reader.readAsText(file)

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md p-6 rounded-lg bg-white border border-gray-200">
        <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-2 right-2 text-gray-800">
          <X className="h-4 w-4" />
        </Button>

        <h2 className="text-xl font-bold mb-6 text-gray-800">Settings</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2 text-gray-800">Your Name</h3>
            <div className="flex gap-2">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white border-gray-200 text-gray-800"
              />
              <Button onClick={handleNameChange} className="bg-blue-600 hover:bg-blue-700 text-white">
                Save
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2 text-gray-800">Backup & Restore</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={exportData}
                className="flex-1 bg-gray-50 border-gray-200 text-gray-800"
              >
                Export Data
              </Button>
              <Button
                variant="outline"
                onClick={handleImport}
                className="flex-1 bg-gray-50 border-gray-200 text-gray-800"
              >
                Import Data
              </Button>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" className="hidden" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
