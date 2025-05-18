"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type ThemeMode = "light" | "dark"

type ThemeContextType = {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  toggleMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light")

  useEffect(() => {
    const storedMode = localStorage.getItem("theme-mode") as ThemeMode | null
    if (storedMode) {
      setMode(storedMode)
      document.documentElement.classList.toggle("dark", storedMode === "dark")
    }
  }, [])

  const toggleMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light"
      localStorage.setItem("theme-mode", newMode)
      document.documentElement.classList.toggle("dark", newMode === "dark")
      return newMode
    })
  }

  return <ThemeContext.Provider value={{ mode, setMode, toggleMode }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
