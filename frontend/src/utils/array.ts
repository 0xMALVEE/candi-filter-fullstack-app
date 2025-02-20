export function uniqueArrayValues<T>(arr: T[]): T[] {
  return [...new Set(arr)].sort();
} 