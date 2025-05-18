"use client"

import { useEffect, useRef, useState } from "react"
import { useJournal } from "@/components/journal-provider"
import { WritingPromptsModal } from "@/components/writing-prompts-modal"

export function JournalEditor() {
  const { currentDate, selectedDate, currentEntry, setCurrentEntry, saveEntry } = useJournal()
  const prevEntryRef = useRef(currentEntry)
  const [showPromptsModal, setShowPromptsModal] = useState(false)

  useEffect(() => {
    if (prevEntryRef.current === currentEntry) return

    prevEntryRef.current = currentEntry

    if (selectedDate === currentDate && currentEntry.trim() !== "") {
      const saveTimeout = setTimeout(() => {
        saveEntry()
      }, 1000)

      return () => clearTimeout(saveTimeout)
    }
  }, [currentEntry, saveEntry, selectedDate, currentDate])

  const isEditable = selectedDate === currentDate

  const handleSelectPrompt = (prompt: string) => {
    if (isEditable) {
      setCurrentEntry((prev) => {
        if (prev.trim()) {
          return `${prev}\n\n${prompt}\n`
        }
        return `${prompt}\n`
      })
    }
  }

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          {!isEditable && <div className="absolute inset-0 bg-transparent z-10" />}
          <div className="mb-4 flex justify-between items-center">
            <div className="text-lg font-medium text-gray-800">
              {selectedDate === currentDate
                ? "Today's Entry"
                : `Entry for ${new Date(selectedDate).toLocaleDateString()}`}
            </div>
            {isEditable && (
              <button
                onClick={() => setShowPromptsModal(true)}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Don't know what to write?
              </button>
            )}
          </div>
          <div className="relative">
            <textarea
              value={currentEntry}
              onChange={(e) => isEditable && setCurrentEntry(e.target.value)}
              placeholder={isEditable ? "Write your thoughts here..." : "No entry for this date"}
              className={`w-full min-h-[500px] p-4 bg-white rounded-md text-gray-800 resize-none
                ${!isEditable ? "cursor-not-allowed opacity-80" : ""}
                bg-[linear-gradient(transparent,transparent_calc(1.5rem_-_1px),#e0e0e0_calc(1.5rem_-_1px),#e0e0e0_1.5rem,transparent_1.5rem)] 
                bg-size-[100%_1.5rem] 
                leading-[1.5rem]
                pt-[1.5rem]
              `}
              style={{ lineHeight: "1.5rem" }}
              disabled={!isEditable}
            />
            {!isEditable && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Read Only</div>
            )}
          </div>
        </div>
      </div>

      {showPromptsModal && (
        <WritingPromptsModal onClose={() => setShowPromptsModal(false)} onSelectPrompt={handleSelectPrompt} />
      )}
    </div>
  )
}
