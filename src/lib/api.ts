const API_BASE = (process.env.NEXT_PUBLIC_MEDDY_API_BASE_URL ?? "").replace(/\/+$/, "");

type Envelope<T> = {
  status: boolean;
  statusCode: number;
  data: T;
};

/**
 * Thin fetch wrapper for the Meddy backend.
 *
 * The backend wraps every JSON response in `{ status, statusCode, data }`
 * (see `HttpInterceptor`), so `apiRequest` unwraps `data` and turns any
 * non-2xx / `status: false` response into an `Error` carrying the backend
 * `message`.
 */
export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;

  let res: Response;
  try {
    res = await fetch(url, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
      cache: "no-store",
    });
  } catch {
    throw new Error("We couldn't reach the server. Please check your connection and try again.");
  }

  let payload: Envelope<T> | null = null;
  try {
    payload = (await res.json()) as Envelope<T>;
  } catch {
    payload = null;
  }

  if (!res.ok || !payload || payload.status === false) {
    const message =
      (payload?.data as { message?: string } | undefined)?.message ||
      "Something went wrong. Please try again.";
    throw new Error(message);
  }

  return payload.data;
}
