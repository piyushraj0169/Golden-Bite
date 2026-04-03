export const API_BASE =
  import.meta.env.VITE_API_BASE || "http://192.168.1.2:3000";

function getAuthHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function postJSON(url, data) {
  const isFormData = data instanceof FormData;
  const headers = getAuthHeader();
  if (!isFormData) headers["Content-Type"] = "application/json";

  const r = await fetch(API_BASE + url, {
    method: "POST",
    headers,
    body: isFormData ? data : JSON.stringify(data),
  });

  if (!r.ok) {
    const err = await r.json().catch(() => ({}));
    throw new Error(err.message || "Request failed");
  }

  return r.json();
}

export async function getJSON(url) {
  const r = await fetch(API_BASE + url, {
    headers: {
      ...getAuthHeader(),
    },
  });

  if (!r.ok) {
    const err = await r.json().catch(() => ({}));
    throw new Error(err.message || "Request failed");
  }

  return r.json();
}

export async function deleteJSON(url) {
  const r = await fetch(API_BASE + url, {
    method: "DELETE",
    headers: {
      ...getAuthHeader(),
    },
  });

  if (!r.ok) {
    const err = await r.json().catch(() => ({}));
    throw new Error(err.message || "Request failed");
  }

  return r.json();
}

export async function putJSON(url, data) {
  const isFormData = data instanceof FormData;
  const headers = getAuthHeader();
  if (!isFormData) headers["Content-Type"] = "application/json";

  const r = await fetch(API_BASE + url, {
    method: "PUT",
    headers,
    body: isFormData ? data : JSON.stringify(data),
  });

  if (!r.ok) {
    const err = await r.json().catch(() => ({}));
    throw new Error(err.message || "Request failed");
  }

  return r.json();
}


























// export const API_BASE =
//   import.meta.env.VITE_API_BASE || "http://localhost:3000";

// export async function postJSON(url, data) {
//   const token = localStorage.getItem("token");

//   const r = await fetch(API_BASE + url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//     body: JSON.stringify(data),
//   });

//   if (!r.ok) {
//     throw new Error(await r.text());
//   }

//   return r.json();
// }


// export async function getJSON(url) {
//   const token = localStorage.getItem("token");

//   const r = await fetch(API_BASE + url, {
//     headers: {
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//   });

//   if (!r.ok) {
//     throw new Error(await r.text());
//   }

//   return r.json();
// }





// // export async function postJSON(url, data) {
// //   const token = localStorage.getItem("token");

// //   const r = await fetch(API_BASE + url, {
// //     method: "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //       Authorization: `Bearer ${token}`, // 🔥 THIS WAS MISSING
// //     },
// //     body: JSON.stringify(data),
// //   });

// //   if (!r.ok) {
// //     const err = await r.text();
// //     throw new Error(err);
// //   }

// //   return r.json();
// // }
