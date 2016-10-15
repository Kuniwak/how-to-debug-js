export function sum(array: number[]): number {
  return array.reduce((prev, x) => prev + x, 0);
}
