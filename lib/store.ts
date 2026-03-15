import { create } from "zustand"

export type UserRole = "admin" | "doctor" | null

interface UserState {
  role: UserRole
  setRole: (role: UserRole) => void
  clearRole: () => void
}

export const useUserStore = create<UserState>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
  clearRole: () => set({ role: null }),
}))
