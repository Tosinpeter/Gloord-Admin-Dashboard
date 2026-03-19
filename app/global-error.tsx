"use client"

import { useTranslations } from "next-intl"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations("errors")
  console.error("Global application error:", error)

  return (
    <html>
      <body>
        <div className="mx-auto flex min-h-screen max-w-[720px] flex-col items-start justify-center gap-4 px-6">
          <h1 className="text-2xl font-semibold text-tet">{t("applicationErrorTitle")}</h1>
          <p className="text-sm text-gray-600">
            {t("applicationErrorBody", { digest: error.digest ?? "N/A" })}
          </p>
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-pry px-5 py-2 text-sm text-white transition-opacity hover:opacity-90"
          >
            {t("reloadAppState")}
          </button>
        </div>
      </body>
    </html>
  )
}
