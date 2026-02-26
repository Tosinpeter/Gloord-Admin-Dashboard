"use client"

import { useEffect, useRef } from "react"
import { useLocale, useTranslations } from "next-intl"
import { LOCALES } from "@/lib/i18n"
import { setLocale } from "@/app/actions"

export default function LocaleSwitcher() {
  const t = useTranslations("common")
  const locale = useLocale()
  const formRef = useRef<HTMLFormElement | null>(null)

  // Reset the select to the actual locale after a refresh/navigation.
  const selectRef = useRef<HTMLSelectElement | null>(null)
  useEffect(() => {
    if (selectRef.current) selectRef.current.value = locale
  }, [locale])

  return (
    <form ref={formRef} action={setLocale} className="inline-flex items-center gap-2">
      <label className="text-sm text-gray-600" htmlFor="locale">
        {t("language")}
      </label>
      <select
        id="locale"
        name="locale"
        ref={selectRef}
        defaultValue={locale}
        onChange={() => formRef.current?.requestSubmit()}
        className="h-9 rounded-md border border-gray-200 bg-white px-2 text-sm"
        aria-label={t("language")}
      >
        {LOCALES.map((l) => (
          <option key={l} value={l}>
            {l.toUpperCase()}
          </option>
        ))}
      </select>
    </form>
  )
}

