"use client"

import Link from "next/link"
import { useMemo } from "react"
import { canAccessPath, getRoleFromCookieString, type AppRole } from "@/lib/rbac"

type AccessGateProps = {
  pathname: string
  allowedRole: AppRole
  children: React.ReactNode
}

export default function AccessGate({ pathname, allowedRole, children }: AccessGateProps) {
  const role = useMemo(() => {
    if (typeof document === "undefined") return null
    return getRoleFromCookieString(document.cookie)
  }, [])

  const hasAccess = canAccessPath(pathname, role) && role === allowedRole

  if (!hasAccess) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-[760px] flex-col justify-center gap-4 px-6">
        <h1 className="text-2xl font-semibold text-[#111827]">No access</h1>
        <p className="text-sm text-[#4B5563]">
          You do not have permission to view this page. Switch to the correct account or go back to
          a permitted area.
        </p>
        <Link
          href="/"
          className="w-fit rounded-full border border-[#D1D5DB] px-5 py-2 text-sm text-[#111827] hover:bg-[#F9FAFB]"
        >
          Return to login
        </Link>
      </div>
    )
  }

  return <>{children}</>
}
