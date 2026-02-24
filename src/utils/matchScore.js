/**
 * Match score engine - exact rules per spec
 * Cap at 100.
 */

export function computeMatchScore(job, preferences) {
  if (!preferences) return 0;

  let score = 0;

  const roleKeywords = parseCommaList(preferences.roleKeywords);
  const userSkills = parseCommaList(preferences.skills);

  // +25 if any roleKeyword appears in job.title (case-insensitive)
  if (roleKeywords.length) {
    const titleLower = (job.title || "").toLowerCase();
    if (roleKeywords.some((kw) => titleLower.includes(kw.toLowerCase()))) {
      score += 25;
    }
  }

  // +15 if any roleKeyword appears in job.description
  if (roleKeywords.length && job.description) {
    const descLower = job.description.toLowerCase();
    if (roleKeywords.some((kw) => descLower.includes(kw.toLowerCase()))) {
      score += 15;
    }
  }

  // +15 if job.location matches preferredLocations
  const locs = preferences.preferredLocations || [];
  if (locs.length && locs.includes(job.location)) {
    score += 15;
  }

  // +10 if job.mode matches preferredMode
  const modes = preferences.preferredMode || [];
  if (modes.length && modes.includes(job.mode)) {
    score += 10;
  }

  // +10 if job.experience matches experienceLevel
  if (preferences.experienceLevel && job.experience === preferences.experienceLevel) {
    score += 10;
  }

  // +15 if overlap between job.skills and user.skills (any match)
  if (userSkills.length && job.skills && Array.isArray(job.skills)) {
    const jobSkillsLower = job.skills.map((s) => String(s).toLowerCase());
    if (userSkills.some((us) => jobSkillsLower.includes(us.toLowerCase()))) {
      score += 15;
    }
  }

  // +5 if postedDaysAgo <= 2
  if (typeof job.postedDaysAgo === "number" && job.postedDaysAgo <= 2) {
    score += 5;
  }

  // +5 if source is LinkedIn
  if (job.source === "LinkedIn") {
    score += 5;
  }

  return Math.min(100, score);
}

function parseCommaList(str) {
  if (!str || typeof str !== "string") return [];
  return str
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
