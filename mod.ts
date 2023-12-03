declare global {
  interface Array<T> {
    any(predicate: (element: T) => boolean): boolean
    none(predicate: (element: T) => boolean): boolean
    first(predicate?: (element: T) => boolean): T | undefined
    last(predicate?: (element: T) => boolean): T | undefined
    min(): number
    minOf(transform: (element: T) => any): number
    minBy(transform: (element: T) => any): T
    max(): number
    maxOf(transform: (element: T) => any): number
    maxBy(transform: (element: T) => any): T
    sum(): number
    sumOf(transform: (element: T) => any): number
    distinct(): Array<any>
    distinctBy(transform: (element: T) => any): Array<T>
    filterNotNull(): Array<NonNullable<T>>
    mapNotNull(transform: (element: T) => any): Array<NonNullable<any>>
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

Array.prototype.minBy = function <T>(transform: (element: T) => any): number {
  if (this.length == 0) {
    throw new Error("Array is empty!")
  }

  let candidate = this[0]
  let transformedCandidate = transform(this[0])

  for (let i = 1; i < this.length; i++) {
    const e = this[i]
    const transformed = transform(e)

    if (transformed < transformedCandidate) {
      candidate = e
      transformedCandidate = transformed
    }
  }

  return candidate
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

Array.prototype.maxBy = function <T>(transform: (element: T) => any): number {
  if (this.length == 0) {
    throw new Error("Array is empty!")
  }

  let candidate = this[0]
  let transformedCandidate = transform(this[0])

  for (let i = 1; i < this.length; i++) {
    const e = this[i]
    const transformed = transform(e)

    if (transformed > transformedCandidate) {
      candidate = e
      transformedCandidate = transformed
    }
  }

  return candidate
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

Array.prototype.filterNotNull = function <T>(): Array<NonNullable<T>> {
  return this.filter((it) => it != null)
}

Array.prototype.mapNotNull = function <T>(transform: (element: T) => any): Array<NonNullable<any>> {
  return this.map(transform).filterNotNull()
}
