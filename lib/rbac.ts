export const APP_ROLES = ["admin", "doctor"] as const;

export type AppRole = (typeof APP_ROLES)[number];

export type AppRouteArea = "admin" | "doctor" | "public";

export function isAppRole(value: string | undefined | null): value is AppRole {
  return !!value && (APP_ROLES as readonly string[]).includes(value);
}

export function getRouteArea(pathname: string): AppRouteArea {
  if (pathname.startsWith("/admin")) return "admin";
  if (pathname.startsWith("/doctor")) return "doctor";
  return "public";
}

export function canAccessPath(pathname: string, role: AppRole | null): boolean {
  const area = getRouteArea(pathname);
  if (area === "public") return true;
  if (area === "admin") return role === "admin";
  if (area === "doctor") return role === "doctor";
  return false;
}

export function getRoleFromCookieString(cookieString: string): AppRole | null {
  const roleCookie = cookieString
    .split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith("APP_ROLE="));

  if (!roleCookie) return null;

  const value = roleCookie.slice("APP_ROLE=".length);
  return isAppRole(value) ? value : null;
}
