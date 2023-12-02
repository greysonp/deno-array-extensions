declare global {
  interface Array<T> {
    any(predicate: (element: T) => boolean): boolean
    none(predicate: (element: T) => boolean): boolean
    first(predicate?: (element: T) => boolean): T | undefined
    last(predicate?: (element: T) => boolean): T | undefined
    min(): number
    minOf(transform: (element: T) => any): number
    max(): number
    maxOf(transform: (element: T) => any): number
    sum(): number
    sumOf(transform: (element: T) => any): number
    distinct(): Array<any>
    distinctBy(transform: (element: T) => any): Array<T>
  }
}

Array.prototype.any = function <T>(predicate: (element: T) => boolean): boolean {
  return this.find(predicate) != null
}

Array.prototype.none = function <T>(predicate: (element: T) => boolean): boolean {
  return !this.any(predicate)
}

Array.prototype.first = function <T>(predicate?: (element: T) => boolean): T | undefined {
  return predicate ? this.find(predicate) : (this.length > 0 ? this[0] : undefined)
}

Array.prototype.last = function <T>(predicate?: (element: T) => boolean): T | undefined {
  return predicate ? this.findLast(predicate) : (this.length > 0 ? this[this.length - 1] : undefined)
}

Array.prototype.min = function (): number {
  if (this.length == 0) {
    throw new Error("Array is empty!")
  }
  return Math.min(...this)
}

Array.prototype.minOf = function <T>(transform: (element: T) => any): number {
  if (this.length == 0) {
    throw new Error("Array is empty!")
  }
  return this.map(transform).filter((it) => it !== undefined).min()
}

Array.prototype.max = function (): number {
  if (this.length == 0) {
    throw new Error("Array is empty!")
  }
  return Math.max(...this)
}

Array.prototype.maxOf = function <T>(transform: (element: T) => any): number {
  if (this.length == 0) {
    throw new Error("Array is empty!")
  }
  return this.map(transform).filter((it) => it !== undefined).max()
}

Array.prototype.sum = function (): number {
  return this.reduce((sum, value) => sum + value, 0)
}

Array.prototype.sumOf = function <T>(transform: (element: T) => any): number {
  return this.map(transform).filter((it) => it !== undefined).reduce((sum, value) => sum + value, 0)
}

Array.prototype.distinct = function (): Array<any> {
  return [...new Set(this)]
}

Array.prototype.distinctBy = function <T>(transform: (element: T) => any): Array<T> {
  const distinct: Set<any> = new Set()
  const out: Array<T> = []

  for (const element of this) {
    const transformed = transform(element)

    if (!distinct.has(transformed)) {
      distinct.add(transformed)
      out.push(element)
    }
  }

  return out
}
