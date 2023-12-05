/*
 * Note: Typescript really doesn't like adding functions to prototypes, especially when it
 * comes to documentation.
 *
 * In order to get any documentation generation tools (including `deno doc`) to see the functions
 * and include them in documentation, they need to be exported functions in a namespace. This is
 * why every prototype function defers implementation to another function, which has the JSDoc.
 *
 * But of course in order to get the docs to appear in the editor (like VSCode) when you use the prototype
 * function, the docs need to be on the Array interface definitions. So we have to copy the JSDoc over there
 * as well.
 */

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
  return any(this, predicate)
}

Array.prototype.none = function <T>(predicate: (element: T) => boolean): boolean {
  return none(this, predicate)
}

Array.prototype.first = function <T>(predicate?: (element: T) => boolean): T | undefined {
  return first(this, predicate)
}

Array.prototype.last = function <T>(predicate?: (element: T) => boolean): T | undefined {
  return last(this, predicate)
}

Array.prototype.min = function (): number {
  return min(this)
}

Array.prototype.minOf = function <T>(transform: (element: T) => number | null | undefined): number {
  return minOf(this, transform)
}

Array.prototype.minBy = function <T>(transform: (element: T) => number | null | undefined): T {
  return minBy(this, transform)
}

Array.prototype.minByOrNull = function <T>(transform: (element: T) => number | null | undefined): T | null {
  return minByOrNull(this, transform)
}

Array.prototype.max = function (): number {
  return max(this)
}

Array.prototype.maxOf = function <T>(transform: (element: T) => number | null | undefined): number {
  return maxOf(this, transform)
}

Array.prototype.maxBy = function <T>(transform: (element: T) => number | null | undefined): T {
  return maxBy(this, transform)
}

Array.prototype.maxByOrNull = function <T>(transform: (element: T) => number | null | undefined): T | null {
  return maxByOrNull(this, transform)
}

Array.prototype.sum = function (): number {
  return sum(this)
}

Array.prototype.sumOf = function <T>(transform: (element: T) => number | null | undefined): number {
  return sumOf(this, transform)
}

Array.prototype.distinct = function (): Array<any> {
  return distinct(this)
}

Array.prototype.distinctBy = function <T>(transform: (element: T) => any): Array<T> {
  return distinctBy(this, transform)
}

Array.prototype.filterNotNull = function <T>(): Array<NonNullable<T>> {
  return filterNotNull(this)
}

Array.prototype.mapNotNull = function <T>(transform: (element: T) => any): Array<NonNullable<any>> {
  return mapNotNull(this, transform)
}

Array.prototype.associateBy = function <T>(keySelector: (element: T) => any): Map<any, T> {
  return associateBy(this, keySelector)
}

Array.prototype.toSet = function <T>(): Set<T> {
  return toSet(this)
}

/**
 * Returns true if any element in the array matches the provided predicate, otherwise false.
 */
export function any<T>(array: Array<T>, predicate: (element: T) => boolean): boolean {
  return array.find(predicate) != null
}

/**
 * Returns true if none of the elements in the array match the provided predicate, otherwise false.
 */
export function none<T>(array: Array<T>, predicate: (element: T) => boolean): boolean {
  return !array.any(predicate)
}

/**
 * If a predicate is specified, returns the first element in the array that matches the predicate, otherwise undefined.
 * If a predicate is not specified, returns the first element in the array, or undefined if the array is empty.
 */
export function first<T>(array: Array<T>, predicate?: (element: T) => boolean): T | undefined {
  return predicate ? array.find(predicate) : (array.length > 0 ? array[0] : undefined)
}

/**
 * If a predicate is specified, returns the last element in the array that matches the predicate, otherwise undefined.
 * If a predicate is not specified, returns the last element in the array, or undefined if the array is empty.
 */
export function last<T>(array: Array<T>, predicate?: (element: T) => boolean): T | undefined {
  return predicate ? array.findLast(predicate) : (array.length > 0 ? array[array.length - 1] : undefined)
}

/**
 * Returns the minimum value in the array.
 * Throws an Error if the array is empty.
 */
export function min(array: Array<number>): number {
  if (array.length == 0) {
    throw new Error("Array is empty!")
  }
  return Math.min(...array.filterNotNull())
}

/**
 * Performs the transform on each element in the array and returns the minimum value of the results.
 * Throws an Error if the array is empty.
 */
export function minOf<T>(array: Array<T>, transform: (element: T) => number | null | undefined): number {
  if (array.length == 0) {
    throw new Error("Array is empty!")
  }
  return array.map(transform).filterNotNull().min()
}

/**
 * Returns the element in the array that has the smallest transform result.
 * Throws an Error if the array is empty or the transform doesn't map to any non-null values.
 */
export function minBy<T>(array: Array<T>, transform: (element: T) => number | null | undefined): T {
  const result: T | null = array.minByOrNull(transform)

  if (result == null) {
    throw new Error("Empty or no non-null values!")
  }

  return result
}

/**
 * Returns the element in the array that has the smallest transform result.
 * Returns null if the array is empty or the transform doesn't map to any non-null values.
 */
export function minByOrNull<T>(array: Array<T>, transform: (element: T) => number | null | undefined): T | null {
  if (array.length == 0) {
    return null
  }

  const pairs: Array<Pair<T, number>> = array.mapNotNull((element) => {
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

/**
 * Returns the minimum value in the array.
 * Throws an Error if the array is empty.
 */
export function max(array: Array<number>): number {
  if (array.length == 0) {
    throw new Error("Array is empty!")
  }
  return Math.max(...array.filterNotNull())
}

/**
 * Performs the transform on each element in the array and returns the maximum value of the results.
 * Throws an Error if the array is empty.
 */
export function maxOf<T>(array: Array<T>, transform: (element: T) => number | null | undefined): number {
  if (array.length == 0) {
    throw new Error("Array is empty!")
  }
  return array.map(transform).filterNotNull().max()
}

/**
 * Returns the element in the array that has the largest transform result.
 * Throws an Error if the array is empty or the transform doesn't map to any non-null values.
 */
export function maxBy<T>(array: Array<T>, transform: (element: T) => number | null | undefined): T {
  const result: T | null = array.maxByOrNull(transform)

  if (result == null) {
    throw new Error("Empty or no non-null values!")
  }

  return result
}

/**
 * Returns the element in the array that has the smallest transform result.
 * Returns null if the array is empty or the transform doesn't map to any non-null values.
 */
export function maxByOrNull<T>(array: Array<T>, transform: (element: T) => number | null | undefined): T | null {
  if (array.length == 0) {
    return null
  }

  const pairs: Array<Pair<T, number>> = array.mapNotNull((element) => {
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

/**
 * Finds the sum of all elements in the array.
 */
export function sum(array: Array<number>): number {
  return array.reduce((sum, value) => sum + value, 0)
}

/**
 * Transforms each element of the array and then finds the sum of the results.
 */
export function sumOf<T>(array: Array<T>, transform: (element: T) => number | null | undefined): number {
  return array.map(transform).filterNotNull().reduce((sum, value) => sum + value, 0)
}

/**
 * Removes any duplicates from the array.
 */
export function distinct(array: Array<any>): Array<any> {
  return [...new Set(array)]
}

/**
 * Removes any duplicates from the array as determined by the result of the transform.
 */
export function distinctBy<T>(array: Array<T>, transform: (element: T) => any): Array<T> {
  const distinct: Set<any> = new Set()
  const out: Array<T> = []

  for (const element of array) {
    const transformed = transform(element)

    if (!distinct.has(transformed)) {
      distinct.add(transformed)
      out.push(element)
    }
  }

  return out
}

/**
 * Filters any null or undefined values from the array.
 */
export function filterNotNull<T>(array: Array<T>): Array<NonNullable<T>> {
  return array.filter((it) => it != null) as Array<NonNullable<T>>
}

/**
 * Returns an array with the results of the transform applied to each element, discarding any null values.
 */
export function mapNotNull<T>(array: Array<T>, transform: (element: T) => any): Array<NonNullable<any>> {
  return array.map(transform).filterNotNull()
}

/**
 * Returns a Map indexed by the result of the keySelector applied to each element.
 * If two elements map to the same key, the latest one is kept.
 */
export function associateBy<T>(array: Array<T>, keySelector: (element: T) => any): Map<any, T> {
  const out: Map<any, T> = new Map()

  for (const element of array) {
    out.set(keySelector(element), element)
  }

  return out
}

/**
 * Converts the array to a Set.
 */
export function toSet<T>(array: Array<T>): Set<T> {
  return new Set(array)
}

type Pair<A, B> = {
  first: A
  second: B
}
