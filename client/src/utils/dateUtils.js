export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("uk-UA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
