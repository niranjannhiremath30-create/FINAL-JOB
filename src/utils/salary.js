/**
 * Extract numeric value from salary range for sorting.
 * "3–5 LPA" -> 3, "₹30k–₹50k/month" -> 30
 */
export function extractSalaryValue(salaryRange) {
  if (!salaryRange || typeof salaryRange !== "string") return 0;
  const str = salaryRange.trim();
  const lpaMatch = str.match(/^(\d+)/);
  if (lpaMatch) return Number(lpaMatch[1]);
  const kMatch = str.match(/₹(\d+)k/i);
  if (kMatch) return Number(kMatch[1]);
  const anyNum = str.match(/(\d+)/);
  return anyNum ? Number(anyNum[1]) : 0;
}
