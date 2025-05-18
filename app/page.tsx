"use client"

import { useEffect, useState } from "react"
import { JournalLayout } from "@/components/journal-layout"
import { NameModal } from "@/components/name-modal"
import { GreetingModal } from "@/components/greeting-modal"
import { JournalProvider } from "@/components/journal-provider"

export default function Home() {
  const [userName, setUserName] = useState<string>("")
  const [showNameModal, setShowNameModal] = useState(false)
  const [showGreetingModal, setShowGreetingModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedName = localStorage.getItem("journal-user-name")

    if (storedName) {
      setUserName(storedName)
      setShowGreetingModal(true)
    } else {
      setShowNameModal(true)
    }

    setIsLoading(false)
  }, [])

  const handleNameSubmit = (name: string) => {
    setUserName(name)
    localStorage.setItem("journal-user-name", name)
    setShowNameModal(false)
    setShowGreetingModal(true)
  }

  const handleGreetingClose = () => {
    setShowGreetingModal(false)
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <JournalProvider userName={userName} setUserName={setUserName}>
      <JournalLayout />

      {showNameModal && <NameModal onSubmit={handleNameSubmit} />}

      {showGreetingModal && <GreetingModal userName={userName} onClose={handleGreetingClose} />}
    </JournalProvider>
  )
}
