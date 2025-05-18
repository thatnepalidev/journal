"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

export type JournalEntry = {
  date: string
  content: string
}

type JournalContextType = {
  userName: string
  setUserName: (name: string) => void
  entries: JournalEntry[]
  currentDate: string
  selectedDate: string
  setSelectedDate: (date: string) => void
  currentEntry: string
  setCurrentEntry: (content: string) => void
  saveEntry: () => void
  getEntryForDate: (date: string) => string
  hasEntryForDate: (date: string) => boolean
  exportData: () => void
  importData: (data: string) => void
}

const JournalContext = createContext<JournalContextType | undefined>(undefined)

export function JournalProvider({
  children,
  userName,
  setUserName,
}: {
  children: React.ReactNode
  userName: string
  setUserName: (name: string) => void
}) {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [currentDate, setCurrentDate] = useState<string>(formatDate(new Date()))
  const [selectedDate, setSelectedDate] = useState<string>(formatDate(new Date()))
  const [currentEntry, setCurrentEntry] = useState<string>("")

  useEffect(() => {
    const storedEntries = localStorage.getItem("journal-entries")
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries))
    }
  }, [])

  useEffect(() => {
    const entry = entries.find((e) => e.date === selectedDate)
    setCurrentEntry(entry?.content || "")
  }, [selectedDate, entries])

  function formatDate(date: Date): string {
    return date.toISOString().split("T")[0]
  }

  const saveEntry = () => {
    if (selectedDate !== currentDate) return // Don't allow editing past entries
    if (currentEntry.trim() === "") return // Don't save empty entries

    const newEntries = [...entries]
    const existingEntryIndex = newEntries.findIndex((e) => e.date === currentDate)

    // Check if content has actually changed before updating state
    if (existingEntryIndex >= 0) {
      if (newEntries[existingEntryIndex].content === currentEntry) {
        return // No changes, don't update state
      }
      newEntries[existingEntryIndex].content = currentEntry
    } else {
      newEntries.push({ date: currentDate, content: currentEntry })
    }

    setEntries(newEntries)
    localStorage.setItem("journal-entries", JSON.stringify(newEntries))
  }

  const getEntryForDate = (date: string): string => {
    const entry = entries.find((e) => e.date === date)
    return entry?.content || ""
  }

  const hasEntryForDate = (date: string): boolean => {
    return entries.some((e) => e.date === date)
  }

  const exportData = () => {
    const data = {
      userName,
      entries,
    }

    const dataStr = JSON.stringify(data)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

    const exportFileDefaultName = `journal-backup-${formatDate(new Date())}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const importData = (data: string) => {
    try {
      const parsedData = JSON.parse(data)

      if (parsedData.userName) {
        setUserName(parsedData.userName)
        localStorage.setItem("journal-user-name", parsedData.userName)
      }

      if (Array.isArray(parsedData.entries)) {
        setEntries(parsedData.entries)
        localStorage.setItem("journal-entries", JSON.stringify(parsedData.entries))
      }
    } catch (error) {
      console.error("Failed to import data:", error)
      alert("Failed to import data. Please check the file format.")
    }
  }

  return (
    <JournalContext.Provider
      value={{
        userName,
        setUserName,
        entries,
        currentDate,
        selectedDate,
        setSelectedDate,
        currentEntry,
        setCurrentEntry,
        saveEntry,
        getEntryForDate,
        hasEntryForDate,
        exportData,
        importData,
      }}
    >
      {children}
    </JournalContext.Provider>
  )
}

export function useJournal() {
  const context = useContext(JournalContext)
  if (context === undefined) {
    throw new Error("useJournal must be used within a JournalProvider")
  }
  return context
}
