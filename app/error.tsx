"use client"

import Link from "next/link"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Route error boundary caught an error:", error)
  }, [error])

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-[720px] flex-col items-start justify-center gap-4 px-6">
      <h1 className="text-2xl font-semibold text-[#111827]">Something went wrong</h1>
      <p className="text-sm text-[#4B5563]">
        We could not complete this action. Please try again. If this continues, refresh the page
        and contact support with this reference: {error.digest ?? "N/A"}.
      </p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-pry px-5 py-2 text-sm text-white transition-opacity hover:opacity-90"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-[#D1D5DB] px-5 py-2 text-sm text-[#111827] transition-colors hover:bg-[#F9FAFB]"
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
