"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useTranslations } from "next-intl"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations("errors")
  useEffect(() => {
    console.error("Route error boundary caught an error:", error)
  }, [error])

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-[720px] flex-col items-start justify-center gap-4 px-6">
      <h1 className="text-2xl font-semibold text-tet">{t("somethingWentWrong")}</h1>
      <p className="text-sm text-gray-600">
        {t("routeErrorBody", { digest: error.digest ?? "N/A" })}
      </p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-pry px-5 py-2 text-sm text-white transition-opacity hover:opacity-90"
        >
          {t("tryAgain")}
        </button>
        <Link
          href="/"
          className="rounded-full border border-gray-300 px-5 py-2 text-sm text-tet transition-colors hover:bg-gray-50"
        >
          {t("goHome")}
        </Link>
      </div>
    </div>
  )
}
