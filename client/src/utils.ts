
// Returns true if each element in array b is present in array a in the
// order they occur in.
//
// ```
// includes_in_order?([1,2], [1]) => true
// includes_in_order?([1,2], [2]) => true
// includes_in_order?([1,2], [1, 2]) => true
// includes_in_order?([1,2], [2, 1]) => false
// includes_in_order?([1,2,3], [1, 3]) => true
// includes_in_order?([1,2,3], [1, 3]) => false
// ```
export function includesInOrder<T>(haystack: T[], needles: T[]): boolean {
  if (needles.length === 0) return true

  let i = 0
  for (let straw of haystack){
    if (fancyEquals(straw, needles[i])) i += 1
    if (i === needles.length) return true
  }

  return false
}

export function fancyEquals(a: any, b: any) {
  if (typeof(a.equals) !== 'undefined') {
    return a.equals(b)
  } else {
    return a === b
  }
}

// Returns the cartesian product between the current array and the given
// array.
//
// ```
// const result = [1, 2, 3].product(['a', 'b'])
// result // # => [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b'], [3, 'a'], [3, 'b']]
// ```
export function product<X, Y>(a: X[], b: Y[]): [X, Y][] {
  return a.flatMap(x => (b.map(y => [x, y])))
}

export function isArray(x: any) {
  return Array.isArray(x)
}

export function isObject(x: any) {
  if (isArray(x)) return false

  return typeof(x) === 'object'
}

export function isString(x: any) {
  return typeof(x) === 'string'
}

export function isBool(x: any) {
  return typeof(x) === 'boolean'
}

export function isFunction(x: any) {
  return typeof(x) === 'function'
}

export function isNumber(x: any) {
  return typeof(x) === 'number'
}

export function isNull(x: any) {
  return x === undefined || x === null
}

// Returns a new array resulting from shifting all elements over n times.
//
// ```
// [1, 2, 3, 4].rotated()  // => [2, 3, 4, 1]
// [1, 2, 3, 4].rotated(2) // => [3, 4, 1, 2]
// ```
export function rotated<T>(array: T[], n = 1): T[] {
  return array.slice(n).concat(array.slice(0, n))
}
