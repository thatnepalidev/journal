"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface UserAvatarProps {
  name: string
}

// Google-like avatar colors - vibrant and saturated for good contrast with white text
const AVATAR_COLORS = [
  "#EA4335",
  "#4285F4",
  "#FBBC05",
  "#34A853",
  "#5F6368",
  "#1A73E8",
  "#D93025",
  "#188038",
  "#F9AB00",
  "#8430CE",
  "#F25C00",
  "#00A9A0",
  "#E52592",
]

export function UserAvatar({ name }: UserAvatarProps) {
  const [avatarColor, setAvatarColor] = useState<string>("#4285F4") // Default to Google Blue

  const getInitials = (name: string): string => {
    if (!name || typeof name !== "string" || name.trim() === "") {
      return "?"
    }

    return name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .join("")
      .substring(0, 2)
  }

  // Ensures the same name always gets the same color without needing localStorage
  const getColorForName = (name: string): string => {
    if (!name || typeof name !== "string" || name.trim() === "") {
      return AVATAR_COLORS[0]
    }

    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }

    const index = Math.abs(hash) % AVATAR_COLORS.length
    return AVATAR_COLORS[index]
  }

  useEffect(() => {
    // Set the color based on the name
    const color = getColorForName(name)
    setAvatarColor(color)
  }, [name])

  const initials = getInitials(name)

  return (
    <Avatar className="text-white h-9 w-9 text-sm font-medium" style={{ backgroundColor: avatarColor }}>
      <AvatarFallback className="bg-transparent">{initials}</AvatarFallback>
    </Avatar>
  )
}
