export const GRADIENTS = [
  "from-emerald-400 to-teal-500",
  "from-orange-400 to-red-500",
  "from-blue-400 to-indigo-500",
  "from-purple-400 to-pink-500",
  "from-amber-400 to-rose-500",
  "from-cyan-400 to-blue-500",
  "from-rose-400 to-pink-600",
  "from-indigo-400 to-violet-600",
];

export function getInitials(name: string): string {
  if (!name) return "CS";
  const clean = name.trim().replace(/^Dr\.\s*/i, "");
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "CS";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function getRandomGradient(index?: number): string {
  if (typeof index === "number" && index >= 0) {
    return GRADIENTS[index % GRADIENTS.length];
  }
  const randomIdx = Math.floor(Math.random() * GRADIENTS.length);
  return GRADIENTS[randomIdx];
}
