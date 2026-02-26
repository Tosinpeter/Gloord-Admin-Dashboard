"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  console.error("Global application error:", error)

  return (
    <html>
      <body>
        <div className="mx-auto flex min-h-screen max-w-[720px] flex-col items-start justify-center gap-4 px-6">
          <h1 className="text-2xl font-semibold text-[#111827]">Application error</h1>
          <p className="text-sm text-[#4B5563]">
            The app encountered an unexpected error. Try again. If the problem continues, contact
            support with reference: {error.digest ?? "N/A"}.
          </p>
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-pry px-5 py-2 text-sm text-white transition-opacity hover:opacity-90"
          >
            Reload app state
          </button>
        </div>
      </body>
    </html>
  )
}
