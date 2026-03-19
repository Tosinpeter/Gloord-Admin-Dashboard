"use client"

import { useEffect, useRef } from "react"
import { useLocale, useTranslations } from "next-intl"
import { LOCALES } from "@/lib/i18n"
import { setLocale } from "@/app/actions"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

export default function LocaleSwitcher() {
  const t = useTranslations("common")
  const locale = useLocale()
  // Reset the select to the actual locale after a refresh/navigation.
  const selectRef = useRef<HTMLSelectElement | null>(null)
  useEffect(() => {
    if (selectRef.current) selectRef.current.value = locale
  }, [locale])

  const localeEnum = z.enum(LOCALES as unknown as [string, ...string[]])
  const schema = z.object({
    locale: localeEnum,
  })

  const { register, handleSubmit } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { locale },
    mode: "onChange",
  })

  const onValid = async (values: z.infer<typeof schema>) => {
    const formData = new FormData()
    formData.set("locale", values.locale)
    await setLocale(formData)
  }

  const submitValidated = () => {
    void handleSubmit(onValid)()
  }

  return (
    <form className="inline-flex items-center gap-2">
      <label className="text-sm text-gray-600" htmlFor="locale">
        {t("language")}
      </label>
      <select
        id="locale"
        name="locale"
        ref={(el) => {
          selectRef.current = el
          register("locale").ref(el)
        }}
        defaultValue={locale}
        onChange={() => submitValidated()}
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

