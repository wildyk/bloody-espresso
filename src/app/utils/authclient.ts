export function isUserLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return document.cookie.includes("token=");
}
