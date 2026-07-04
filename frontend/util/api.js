// Thin fetch wrapper replacing jQuery $.ajax.
//
// Resolves to parsed JSON on 2xx (same shape jQuery resolved to).
// On non-2xx, throws an ApiError carrying `status` and `responseJSON`
// (named to match the jqXHR property existing error handlers read, so
// `err.responseJSON` keeps working).

export class ApiError extends Error {
  constructor(status, responseJSON, bodyText) {
    super(`API request failed with status ${status}`);
    this.name = "ApiError";
    this.status = status;
    // Parsed JSON error body (mirrors jqXHR.responseJSON), or null.
    this.responseJSON = responseJSON;
    // Raw text when the body was not JSON.
    this.bodyText = bodyText;
  }
}

const csrfToken = () => {
  if (typeof document === "undefined") return null;
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta ? meta.content : null;
};

// Parse a Response body as JSON, tolerating empty bodies.
const parseBody = async (response) => {
  const text = await response.text();
  if (!text) return { json: null, text: "" };
  try {
    return { json: JSON.parse(text), text };
  } catch (e) {
    return { json: null, text };
  }
};

export const apiFetch = async (url, { method = "GET", body } = {}) => {
  const headers = { Accept: "application/json" };

  const token = csrfToken();
  if (token) headers["X-CSRF-Token"] = token;

  let payload;
  if (body instanceof FormData) {
    // Pass FormData through untouched; let the browser set the
    // multipart/form-data Content-Type (with boundary).
    payload = body;
  } else if (body !== undefined && body !== null) {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }

  const response = await fetch(url, {
    method,
    credentials: "same-origin",
    headers,
    body: payload,
  });

  const { json, text } = await parseBody(response);

  if (!response.ok) {
    throw new ApiError(response.status, json, json === null ? text : null);
  }

  return json;
};

export const apiGet = (url) => apiFetch(url, { method: "GET" });

export const apiPost = (url, body) => apiFetch(url, { method: "POST", body });

export const apiPatch = (url, body) => apiFetch(url, { method: "PATCH", body });

export const apiDelete = (url, body) =>
  apiFetch(url, { method: "DELETE", body });
