"use client"

import { useEffect, useState } from "react"
import { WifiOff } from "lucide-react"

export default function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const syncStatus = () => setIsOnline(navigator.onLine)

    syncStatus()
    window.addEventListener("online", syncStatus)
    window.addEventListener("offline", syncStatus)

    return () => {
      window.removeEventListener("online", syncStatus)
      window.removeEventListener("offline", syncStatus)
    }
  }, [])

  if (isOnline) return null

  return (
    <div className="sticky top-0 z-[100] border-b border-[#FECACA] bg-[#FEF2F2]">
      <div className="mx-auto flex h-10 max-w-[1200px] items-center gap-2 px-4 text-sm text-[#991B1B]">
        <WifiOff size={16} />
        <span>You are offline. Some features are unavailable until connection is restored.</span>
      </div>
    </div>
  )
}
