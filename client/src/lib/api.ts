export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const TOKEN_KEY = "portfolio_auth_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token: string) =>
  localStorage.setItem(TOKEN_KEY, token);

export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export async function apiFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const headers = new Headers(options.headers);

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const token = getToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(`${API_URL}${path}`, { ...options, headers });
}
