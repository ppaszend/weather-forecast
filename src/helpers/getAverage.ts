export default function getAverage(items: number[]) {
  return items.reduce((a, b) => a + b) / items.length;
}
