"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type User = {
  name: string
  email: string
  avatarUrl: string
}

type UserContextType = {
  user: User | null
  isLoading: boolean
}

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
})

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching user data
    setTimeout(() => {
      setUser({
        name: "Alex Johnson",
        email: "alex@example.com",
        avatarUrl: "/placeholder.svg?height=40&width=40",
      })
      setIsLoading(false)
    }, 500)
  }, [])

  return <UserContext.Provider value={{ user, isLoading }}>{children}</UserContext.Provider>
}

export function useUser() {
  return useContext(UserContext)
}
