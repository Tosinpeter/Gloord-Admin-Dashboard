"use client"

import Link from "next/link"
import { useMemo } from "react"
import { useTranslations } from "next-intl"
import { canAccessPath, getRoleFromCookieString, type AppRole } from "@/lib/rbac"

type AccessGateProps = {
  pathname: string
  allowedRole: AppRole
  children: React.ReactNode
}

export default function AccessGate({ pathname, allowedRole, children }: AccessGateProps) {
  const t = useTranslations("errors")
  const role = useMemo(() => {
    if (typeof document === "undefined") return null
    return getRoleFromCookieString(document.cookie)
  }, [])

  const hasAccess = canAccessPath(pathname, role) && role === allowedRole

  if (!hasAccess) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-[760px] flex-col justify-center gap-4 px-6">
        <h1 className="text-2xl font-semibold text-tet">{t("noAccessTitle")}</h1>
        <p className="text-sm text-gray-600">
          {t("noAccessBody")}
        </p>
        <Link
          href="/"
          className="w-fit rounded-full border border-gray-300 px-5 py-2 text-sm text-tet hover:bg-gray-50"
        >
          {t("returnToLogin")}
        </Link>
      </div>
    )
  }

  return <>{children}</>
}
