import {
  ApiError,
  apiFetch,
  apiGet,
  apiPost,
  apiPatch,
  apiDelete,
} from "../api";

// Build a minimal Response-like object for global.fetch to resolve to.
const mockResponse = ({ ok = true, status = 200, body = "" } = {}) => ({
  ok,
  status,
  text: () => Promise.resolve(body),
});

const lastCall = () => global.fetch.mock.calls[global.fetch.mock.calls.length - 1];

describe("api wrapper", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve(mockResponse()));
    // Remove any csrf meta tag between tests.
    const meta = document.querySelector('meta[name="csrf-token"]');
    if (meta) meta.remove();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("apiPost with a JS object sets JSON content-type and stringifies body", async () => {
    global.fetch.mockResolvedValueOnce(
      mockResponse({ body: JSON.stringify({ id: 1 }) })
    );

    const result = await apiPost("/api/songs", { song: { title: "x" } });

    const [url, opts] = lastCall();
    expect(url).toBe("/api/songs");
    expect(opts.method).toBe("POST");
    expect(opts.headers["Content-Type"]).toBe("application/json");
    expect(opts.headers.Accept).toBe("application/json");
    expect(opts.body).toBe(JSON.stringify({ song: { title: "x" } }));
    expect(opts.credentials).toBe("same-origin");
    expect(result).toEqual({ id: 1 });
  });

  test("FormData body is passed through untouched and does NOT set Content-Type", async () => {
    const fd = new FormData();
    fd.append("song[title]", "hello");

    await apiPost("/api/songs", fd);

    const [, opts] = lastCall();
    expect(opts.body).toBe(fd);
    expect(opts.headers["Content-Type"]).toBeUndefined();
    // Accept header still present.
    expect(opts.headers.Accept).toBe("application/json");
  });

  test("apiGet issues a GET with no body", async () => {
    global.fetch.mockResolvedValueOnce(
      mockResponse({ body: JSON.stringify([{ id: 1 }]) })
    );

    const result = await apiGet("/api/songs");

    const [url, opts] = lastCall();
    expect(url).toBe("/api/songs");
    expect(opts.method).toBe("GET");
    expect(opts.body).toBeUndefined();
    expect(result).toEqual([{ id: 1 }]);
  });

  test("non-2xx throws ApiError with status and parsed responseJSON", async () => {
    global.fetch.mockResolvedValueOnce(
      mockResponse({
        ok: false,
        status: 422,
        body: JSON.stringify(["Title can't be blank"]),
      })
    );

    expect.assertions(4);
    try {
      await apiPost("/api/songs", { song: {} });
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError);
      expect(err.status).toBe(422);
      // Matches jqXHR.responseJSON so existing thunk error handlers work.
      expect(err.responseJSON).toEqual(["Title can't be blank"]);
      expect(err.bodyText).toBeNull();
    }
  });

  test("non-2xx with non-JSON body sets responseJSON null and keeps bodyText", async () => {
    global.fetch.mockResolvedValueOnce(
      mockResponse({ ok: false, status: 500, body: "Internal Server Error" })
    );

    expect.assertions(3);
    try {
      await apiGet("/api/songs/1");
    } catch (err) {
      expect(err.status).toBe(500);
      expect(err.responseJSON).toBeNull();
      expect(err.bodyText).toBe("Internal Server Error");
    }
  });

  test("CSRF token header attached when meta tag is present", async () => {
    const meta = document.createElement("meta");
    meta.name = "csrf-token";
    meta.content = "abc123";
    document.head.appendChild(meta);

    await apiPost("/api/session", { user: { email: "a@b.c" } });

    const [, opts] = lastCall();
    expect(opts.headers["X-CSRF-Token"]).toBe("abc123");
  });

  test("CSRF header omitted when meta tag is absent", async () => {
    await apiGet("/api/songs");

    const [, opts] = lastCall();
    expect(opts.headers["X-CSRF-Token"]).toBeUndefined();
  });

  test("empty response body resolves to null without crashing", async () => {
    global.fetch.mockResolvedValueOnce(mockResponse({ body: "" }));

    const result = await apiDelete("/api/songs/1");
    expect(result).toBeNull();
  });

  test("apiPatch sends PATCH with JSON body", async () => {
    global.fetch.mockResolvedValueOnce(
      mockResponse({ body: JSON.stringify({ id: 2 }) })
    );

    const result = await apiPatch("/api/playlists/2", {
      playlist: { name: "z" },
    });

    const [url, opts] = lastCall();
    expect(url).toBe("/api/playlists/2");
    expect(opts.method).toBe("PATCH");
    expect(opts.headers["Content-Type"]).toBe("application/json");
    expect(result).toEqual({ id: 2 });
  });

  test("apiDelete sends DELETE and can carry no body", async () => {
    await apiDelete("/api/songs/5/like");

    const [url, opts] = lastCall();
    expect(url).toBe("/api/songs/5/like");
    expect(opts.method).toBe("DELETE");
    expect(opts.body).toBeUndefined();
  });

  test("apiFetch defaults to GET when no options provided", async () => {
    global.fetch.mockResolvedValueOnce(
      mockResponse({ body: JSON.stringify({ ok: true }) })
    );

    const result = await apiFetch("/api/ping");

    const [url, opts] = lastCall();
    expect(url).toBe("/api/ping");
    expect(opts.method).toBe("GET");
    expect(result).toEqual({ ok: true });
  });

  test("2xx JSON response is parsed and returned", async () => {
    global.fetch.mockResolvedValueOnce(
      mockResponse({ status: 201, body: JSON.stringify({ created: true }) })
    );

    const result = await apiPost("/api/comments", { comment: { body: "hi" } });
    expect(result).toEqual({ created: true });
  });
});
