"use server"

import { cookies } from "next/headers"
import { DEFAULT_LOCALE, isAppLocale } from "@/lib/i18n"

export async function setLocale(formData: FormData) {
  const next = formData.get("locale")
  const locale = typeof next === "string" && isAppLocale(next) ? next : DEFAULT_LOCALE

  const cookieStore = await cookies()
  cookieStore.set("NEXT_LOCALE", locale, {
    path: "/",
    sameSite: "lax"
  })
}

