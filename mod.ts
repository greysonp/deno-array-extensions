declare global {
  interface Array<T> {
    any(predicate: (element: T) => boolean): boolean
    none(predicate: (element: T) => boolean): boolean
    first(predicate: (element: T) => boolean): T | undefined
    last(predicate: (element: T) => boolean): T | undefined
    min(): number
    minOf(transform: (element: T) => any): number
    max(): number
    maxOf(transform: (element: T) => any): number
    sum(): number
    sumOf(transform: (element: T) => any): number
  }
}

Array.prototype.any = function <T>(predicate: (element: T) => boolean): boolean {
  return this.find(predicate) != null
}

Array.prototype.none = function <T>(predicate: (element: T) => boolean): boolean {
  return !this.any(predicate)
}

Array.prototype.first = function <T>(predicate: (element: T) => boolean): T | undefined {
  return this.find(predicate)
}

Array.prototype.last = function <T>(predicate: (element: T) => boolean): T | undefined {
  return this.findLast(predicate)
}

Array.prototype.min = function (): number {
  return Math.min(...this)
}

Array.prototype.minOf = function <T>(transform: (element: T) => any): number {
  return this.map(transform).min()
}

Array.prototype.max = function (): number {
  return Math.max(...this)
}

Array.prototype.maxOf = function <T>(transform: (element: T) => any): number {
  return this.map(transform).max()
}

Array.prototype.sum = function (): number {
  return this.reduce((sum, value) => sum + value, 0)
}

Array.prototype.sumOf = function <T>(transform: (element: T) => any): number {
  return this.map(transform).reduce((sum, value) => sum + value, 0)
}
