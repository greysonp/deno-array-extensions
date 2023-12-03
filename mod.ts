declare global {
  interface Array<T> {
    /**
     * Returns true if any element in the array matches the provided predicate, otherwise false.
     */
    any(predicate: (element: T) => boolean): boolean

    /**
     * Returns true if none of the elements in the array match the provided predicate, otherwise false.
     */
    none(predicate: (element: T) => boolean): boolean

    /**
     * If a predicate is specified, returns the first element in the array that matches the predicate, otherwise undefined.
     * If a predicate is not specified, returns the first element in the array, or undefined if the array is empty.
     */
    first(predicate?: (element: T) => boolean): T | undefined

    /**
     * If a predicate is specified, returns the last element in the array that matches the predicate, otherwise undefined.
     * If a predicate is not specified, returns the last element in the array, or undefined if the array is empty.
     */
    last(predicate?: (element: T) => boolean): T | undefined

    /**
     * Returns the minimum value in the array.
     * Throws an Error if the array is empty.
     */
    min(): number

    /**
     * Performs the transform on each element in the array and returns the minimum value of the results.
     * Throws an Error if the array is empty.
     */
    minOf(transform: (element: T) => number | null | undefined): number

    /**
     * Returns the element in the array that has the smallest transform result.
     * Throws an Error if the array is empty or the transform doesn't map to any non-null values.
     */
    minBy(transform: (element: T) => number | null | undefined): T

    /**
     * Returns the element in the array that has the smallest transform result.
     * Returns null if the array is empty or the transform doesn't map to any non-null values.
     */
    minByOrNull(transform: (element: T) => number | null | undefined): T | null

    /**
     * Returns the minimum value in the array.
     * Throws an Error if the array is empty.
     */
    max(): number

    /**
     * Performs the transform on each element in the array and returns the maximum value of the results.
     * Throws an Error if the array is empty.
     */
    maxOf(transform: (element: T) => number | null | undefined): number

    /**
     * Returns the element in the array that has the largest transform result.
     * Throws an Error if the array is empty or the transform doesn't map to any non-null values.
     */
    maxBy(transform: (element: T) => number | null | undefined): T

    /**
     * Returns the element in the array that has the smallest transform result.
     * Returns null if the array is empty or the transform doesn't map to any non-null values.
     */
    maxByOrNull(transform: (element: T) => number | null | undefined): T | null

    /**
     * Finds the sum of all elements in the array.
     */
    sum(): number

    /**
     * Transforms each element of the array and then finds the sum of the results.
     */
    sumOf(transform: (element: T) => number | null | undefined): number

    /**
     * Removes any duplicates from the array.
     */
    distinct(): Array<any>

    /**
     * Removes any duplicates from the array as determined by the result of the transform.
     */
    distinctBy(transform: (element: T) => any): Array<T>

    /**
     * Filters any null or undefined values from the array.
     */
    filterNotNull(): Array<NonNullable<T>>

    /**
     * Returns an array with the results of the transform applied to each element, discarding any null values.
     */
    mapNotNull(transform: (element: T) => any): Array<NonNullable<any>>

    /**
     * Returns a Map indexed by the result of the keySelector applied to each element.
     * If two elements map to the same key, the latest one is kept.
     */
    associateBy(keySelector: (element: T) => any): Map<any, T>

    /**
     * Converts the array to a Set.
     */
    toSet(): Set<T>
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
  return Math.min(...this.filterNotNull())
}

Array.prototype.minOf = function <T>(transform: (element: T) => number | null | undefined): number {
  if (this.length == 0) {
    throw new Error("Array is empty!")
  }
  return this.map(transform).filterNotNull().min()
}

Array.prototype.minBy = function <T>(transform: (element: T) => number | null | undefined): T {
  const result: T | null = this.minByOrNull(transform)

  if (result == null) {
    throw new Error("Empty or no non-null values!")
  }

  return result
}

Array.prototype.minByOrNull = function <T>(transform: (element: T) => number | null | undefined): T | null {
  if (this.length == 0) {
    return null
  }

  const pairs: Array<Pair<T, number>> = this.mapNotNull((element) => {
    const transformed = transform(element)
    return transformed != null ? { first: element, second: transformed } : null
  })

  if (pairs.length == 0) {
    return null
  }

  let candidate: Pair<T, number> = pairs[0]

  for (let i = 1; i < pairs.length; i++) {
    if (pairs[i].second < candidate.second) {
      candidate = pairs[i]
    }
  }

  return candidate.first
}

Array.prototype.max = function (): number {
  if (this.length == 0) {
    throw new Error("Array is empty!")
  }
  return Math.max(...this.filterNotNull())
}

Array.prototype.maxOf = function <T>(transform: (element: T) => number | null | undefined): number {
  if (this.length == 0) {
    throw new Error("Array is empty!")
  }
  return this.map(transform).filterNotNull().max()
}

Array.prototype.maxBy = function <T>(transform: (element: T) => number | null | undefined): T {
  const result: T | null = this.maxByOrNull(transform)

  if (result == null) {
    throw new Error("Empty or no non-null values!")
  }

  return result
}

Array.prototype.maxByOrNull = function <T>(transform: (element: T) => number | null | undefined): T | null {
  if (this.length == 0) {
    return null
  }

  const pairs: Array<Pair<T, number>> = this.mapNotNull((element) => {
    const transformed = transform(element)
    return transformed != null ? { first: element, second: transformed } : null
  })

  if (pairs.length == 0) {
    return null
  }

  let candidate: Pair<T, number> = pairs[0]

  for (let i = 1; i < pairs.length; i++) {
    if (pairs[i].second > candidate.second) {
      candidate = pairs[i]
    }
  }

  return candidate.first
}

Array.prototype.sum = function (): number {
  return this.reduce((sum, value) => sum + value, 0)
}

Array.prototype.sumOf = function <T>(transform: (element: T) => number | null | undefined): number {
  return this.map(transform).filterNotNull().reduce((sum, value) => sum + value, 0)
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

Array.prototype.associateBy = function <T>(keySelector: (element: T) => any): Map<any, T> {
  const out: Map<any, T> = new Map()

  for (const element of this) {
    out.set(keySelector(element), element)
  }

  return out
}

Array.prototype.toSet = function <T>(): Set<T> {
  return new Set(this)
}

type Pair<A, B> = {
  first: A
  second: B
}
