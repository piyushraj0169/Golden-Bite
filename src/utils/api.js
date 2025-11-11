export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

export async function postJSON(url, data) {
  const r = await fetch(API_BASE + url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}
