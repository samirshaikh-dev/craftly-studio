import { SITE_URL } from "./constants";

export const INDEXNOW_KEY = "c7490f23b7a840e6958a7e02e1bdfc54";

export interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

/**
 * Submits updated URLs to IndexNow (Bing, Seznam, Naver, Yandex).
 * Instant notification triggers indexing within seconds for AI models & Bing.
 */
export async function submitToIndexNow(urls: string[]): Promise<boolean> {
  if (!urls || urls.length === 0) return false;

  const host = new URL(SITE_URL).host;
  const keyLocation = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

  const payload: IndexNowPayload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation,
    urlList: urls.map((u) => (u.startsWith("http") ? u : `${SITE_URL}${u.startsWith("/") ? u : `/${u}`}`)),
  };

  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    return response.status === 200 || response.status === 202;
  } catch (error) {
    console.error("Failed to submit to IndexNow:", error);
    return false;
  }
}
