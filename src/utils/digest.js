const PREFIX = "jobTrackerDigest_";

function todayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${PREFIX}${y}-${m}-${day}`;
}

export function getTodayKey() {
  return todayKey();
}

export function getDigestForToday() {
  try {
    const raw = localStorage.getItem(todayKey());
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveDigestForToday(digestData) {
  const key = todayKey();
  localStorage.setItem(key, JSON.stringify(digestData));
  return key;
}
