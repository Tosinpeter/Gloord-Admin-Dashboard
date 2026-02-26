export const LOCALES = ["en", "fr", "ar"] as const
export type AppLocale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: AppLocale = "en"

export function isAppLocale(value: string | undefined | null): value is AppLocale {
  return !!value && (LOCALES as readonly string[]).includes(value)
}

const RTL_LOCALES: readonly AppLocale[] = ["ar"]

export function isRtlLocale(locale: AppLocale): boolean {
  return (RTL_LOCALES as readonly string[]).includes(locale)
}

export function getLocaleDir(locale: AppLocale): "ltr" | "rtl" {
  return isRtlLocale(locale) ? "rtl" : "ltr"
}

