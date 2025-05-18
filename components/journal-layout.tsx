"use client"

import { useState } from "react"
import { useJournal } from "@/components/journal-provider"
import { UserAvatar } from "@/components/user-avatar"
import { JournalEditor } from "@/components/journal-editor"
import { Calendar } from "@/components/calendar"
import { SettingsModal } from "@/components/settings-modal"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export function JournalLayout() {
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const { userName } = useJournal()

  return (
    <div className="flex h-screen bg-white">
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettingsModal(true)}
              className="h-8 w-8 text-gray-800"
            >
              <Settings className="h-5 w-5" />
            </Button>
            <div className="text-sm text-gray-800">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
          <div className="flex items-center">{userName && <UserAvatar name={userName} />}</div>
        </header>

        <div className="flex flex-1 overflow-hidden max-w-full flex-col md:flex-row">
          <JournalEditor />
          <Calendar />
        </div>
      </div>

      {showSettingsModal && <SettingsModal onClose={() => setShowSettingsModal(false)} />}
    </div>
  )
}
