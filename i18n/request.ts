import { cookies } from "next/headers"
import { getRequestConfig } from "next-intl/server"
import { DEFAULT_LOCALE, isAppLocale } from "@/lib/i18n"

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value
  const locale = isAppLocale(cookieLocale) ? cookieLocale : DEFAULT_LOCALE

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  }
})

