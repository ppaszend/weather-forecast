export default function getAverage(items: number[]) {
  if (items.length === 0) return 0;
  return items.reduce((a, b) => a + b) / items.length;
}
