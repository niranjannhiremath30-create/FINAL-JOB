const STORAGE_KEY = "job-notification-saved";

export function getSavedJobIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveJob(id) {
  const ids = getSavedJobIds();
  if (ids.includes(id)) return ids;
  const next = [...ids, id];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function unsaveJob(id) {
  const ids = getSavedJobIds().filter((x) => x !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  return ids;
}

export function isJobSaved(id) {
  return getSavedJobIds().includes(id);
}
