const STATUS_KEY = "jobTrackerStatus";
const UPDATES_KEY = "jobTrackerUpdates";

const VALID_STATUSES = ["Not Applied", "Applied", "Rejected", "Selected"];
const DEFAULT_STATUS = "Not Applied";

export function getJobStatus(jobId) {
  try {
    const raw = localStorage.getItem(STATUS_KEY);
    const map = raw ? JSON.parse(raw) : {};
    const s = map[jobId];
    return VALID_STATUSES.includes(s) ? s : DEFAULT_STATUS;
  } catch {
    return DEFAULT_STATUS;
  }
}

export function getAllStatuses() {
  try {
    const raw = localStorage.getItem(STATUS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function setJobStatus(jobId, status) {
  if (!VALID_STATUSES.includes(status)) status = DEFAULT_STATUS;
  try {
    const map = getAllStatuses();
    map[jobId] = status;
    localStorage.setItem(STATUS_KEY, JSON.stringify(map));
    return map[jobId];
  } catch {
    return DEFAULT_STATUS;
  }
}

export function addStatusUpdate(jobId, status, title, company) {
  if (status === "Not Applied") return;
  try {
    const raw = localStorage.getItem(UPDATES_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    arr.unshift({
      jobId,
      status,
      title: title || "",
      company: company || "",
      updatedAt: new Date().toISOString(),
    });
    localStorage.setItem(UPDATES_KEY, JSON.stringify(arr.slice(0, 50)));
  } catch {
    // ignore
  }
}

export function getStatusUpdates() {
  try {
    const raw = localStorage.getItem(UPDATES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
