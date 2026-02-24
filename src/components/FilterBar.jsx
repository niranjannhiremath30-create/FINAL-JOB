import React from 'react';

const LOCATIONS = ["All", "Bangalore", "Mumbai", "Chennai", "Hyderabad", "Delhi NCR", "Pune", "Noida", "Gurgaon"];
const MODES = ["All", "Remote", "Hybrid", "Onsite"];
const EXPERIENCES = ["All", "Fresher", "0-1", "1-3", "3-5"];
const SOURCES = ["All", "LinkedIn", "Naukri", "Indeed"];
const STATUSES = ["All", "Not Applied", "Applied", "Rejected", "Selected"];
const SORTS = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
  { value: "matchScore", label: "Match Score" },
  { value: "salary", label: "Salary" },
];

export default function FilterBar({ filters, onFilterChange }) {
  const { keyword, location, mode, experience, source, status, sort } = filters;

  return (
    <div className="filter-bar">
      <div className="filter-bar__row">
        <input
          type="text"
          className="input filter-bar__search"
          placeholder="Search title or company..."
          value={keyword}
          onChange={(e) => onFilterChange({ ...filters, keyword: e.target.value })}
        />
        <select
          className="filter-bar__select"
          value={location}
          onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
        >
          {LOCATIONS.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
        <select
          className="filter-bar__select"
          value={mode}
          onChange={(e) => onFilterChange({ ...filters, mode: e.target.value })}
        >
          {MODES.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <select
          className="filter-bar__select"
          value={experience}
          onChange={(e) => onFilterChange({ ...filters, experience: e.target.value })}
        >
          {EXPERIENCES.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <select
          className="filter-bar__select"
          value={source}
          onChange={(e) => onFilterChange({ ...filters, source: e.target.value })}
        >
          {SOURCES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          className="filter-bar__select"
          value={status ?? "All"}
          onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
        >
          {STATUSES.map((st) => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>
        <select
          className="filter-bar__select"
          value={sort}
          onChange={(e) => onFilterChange({ ...filters, sort: e.target.value })}
        >
          {SORTS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
