import { assertEquals, assertThrows } from "https://deno.land/std@0.208.0/assert/mod.ts"
import "./mod.ts"

Deno.test("any - empty", () => {
  assertEquals(
    [].any((it) => it == "a"),
    false,
  )
})

Deno.test("any - found", () => {
  assertEquals(
    ["a", "b", "c"].any((it) => it == "b"),
    true,
  )
})

Deno.test("any - found by field", () => {
  assertEquals(
    [{ a: 1 }, { a: 2 }, { a: 3 }].any((it) => it.a == 2),
    true,
  )
})

Deno.test("any - not found", () => {
  assertEquals(
    ["a", "b", "c"].any((it) => it == "d"),
    false,
  )
})

Deno.test("none - empty", () => {
  assertEquals(
    [].none((it) => it == "a"),
    true,
  )
})

Deno.test("none - found", () => {
  assertEquals(
    ["a", "b", "c"].none((it) => it == "b"),
    false,
  )
})

Deno.test("none - found by field", () => {
  assertEquals(
    [{ a: 1 }, { a: 2 }, { a: 3 }].none((it) => it.a == 2),
    false,
  )
})

Deno.test("none - not found", () => {
  assertEquals(
    ["a", "b", "c"].none((it) => it == "d"),
    true,
  )
})

Deno.test("first - empty, no predicate", () => {
  assertEquals(
    [].first(),
    undefined,
  )
})

Deno.test("first - empty, with predicate", () => {
  assertEquals(
    [].first((it) => it == "a"),
    undefined,
  )
})

Deno.test("first - non-empty, no predicate", () => {
  assertEquals(
    ["a", "b", "c"].first(),
    "a",
  )
})

Deno.test("first - predicate, no match", () => {
  assertEquals(
    ["a", "b", "c"].first((it) => it == "d"),
    undefined,
  )
})

Deno.test("first - predicate, match", () => {
  assertEquals(
    [{ a: 1, b: 1 }, { a: 1, b: 2 }, { a: 1, b: 3 }].first((it) => it.a == 1),
    { a: 1, b: 1 },
  )
})

Deno.test("last - empty, no predicate", () => {
  assertEquals(
    [].last(),
    undefined,
  )
})

Deno.test("last - empty, with predicate", () => {
  assertEquals(
    [].last((it) => it == "a"),
    undefined,
  )
})

Deno.test("last - non-empty, no predicate", () => {
  assertEquals(
    ["a", "b", "c"].last(),
    "c",
  )
})

Deno.test("last - predicate, no match", () => {
  assertEquals(
    ["a", "b", "c"].last((it) => it == "d"),
    undefined,
  )
})

Deno.test("last - predicate, match", () => {
  assertEquals(
    [{ a: 1, b: 1 }, { a: 1, b: 2 }, { a: 1, b: 3 }].last((it) => it.a == 1),
    { a: 1, b: 3 },
  )
})

Deno.test("min - empty", () => {
  assertThrows(
    () => [].min(),
    Error,
  )
})

Deno.test("min - numbers, all positive", () => {
  assertEquals(
    [5, 4, 3, 1, 2].min(),
    1,
  )
})

Deno.test("min - numbers, with negatives", () => {
  assertEquals(
    [5, -4, -3, 1, 2].min(),
    -4,
  )
})

Deno.test("minOf - empty", () => {
  assertThrows(
    () => [].minOf((it) => it),
    Error,
  )
})

Deno.test("minOf - general", () => {
  assertEquals(
    [{ a: 5 }, { a: -4 }, { b: -3 }, { a: 1 }, { a: 2 }].minOf((it) => it.a),
    -4,
  )
})

Deno.test("minBy - empty", () => {
  assertThrows(
    () => [].minBy((it) => it),
    Error,
  )
})

Deno.test("minBy - general", () => {
  assertEquals(
    [{ b: 5 }, { a: -4 }, { b: -3 }, { a: 1 }, { a: 2 }].minBy((it) => it.a),
    { a: -4 },
  )
})

Deno.test("minByOrNull - empty ", () => {
  assertEquals(
    [].minByOrNull((it) => it),
    null,
  )
})

Deno.test("minByOrNull - general", () => {
  assertEquals(
    [{ b: 5 }, { a: -4 }, { b: -3 }, { a: 1 }, { a: 2 }].minByOrNull((it) => it.a),
    { a: -4 },
  )
})

Deno.test("minByOrNull - general, all undefined", () => {
  assertEquals(
    [{ b: 5 }, { b: -4 }, { b: -3 }, { b: 1 }, { a: undefined }].minByOrNull((it) => it.a),
    null,
  )
})

Deno.test("max - empty", () => {
  assertThrows(
    () => [].max(),
    Error,
  )
})

Deno.test("max - numbers", () => {
  assertEquals(
    [3, 4, 5, 1, 2].max(),
    5,
  )
})

Deno.test("maxOf - empty", () => {
  assertThrows(
    () => [].maxOf((it) => it),
    Error,
  )
})

Deno.test("maxOf - general", () => {
  assertEquals(
    [{ a: 3 }, { a: -4 }, { a: 5 }, { b: 1 }, { a: 2 }].maxOf((it) => it.a),
    5,
  )
})

Deno.test("maxBy - empty", () => {
  assertThrows(
    () => [].maxBy((it) => it),
    Error,
  )
})

Deno.test("maxBy - general", () => {
  assertEquals(
    [{ b: 5 }, { a: -4 }, { b: -3 }, { a: 1 }, { a: 2 }].maxBy((it) => it.a),
    { a: 2 },
  )
})

Deno.test("maxByOrNull - empty ", () => {
  assertEquals(
    [].maxByOrNull((it) => it),
    null,
  )
})

Deno.test("maxByOrNull - general", () => {
  assertEquals(
    [{ b: 5 }, { a: -4 }, { b: -3 }, { a: 1 }, { a: 2 }].maxByOrNull((it) => it.a),
    { a: 2 },
  )
})

Deno.test("maxByOrNull - general, all undefined", () => {
  assertEquals(
    [{ b: 5 }, { b: -4 }, { b: -3 }, { b: 1 }, { a: undefined }].maxByOrNull((it) => it.a),
    null,
  )
})

Deno.test("sum - empty", () => {
  assertEquals(
    [].sum(),
    0,
  )
})

Deno.test("sum - general", () => {
  assertEquals(
    [1, 2, 3, -1].sum(),
    5,
  )
})

Deno.test("sumOf - empty", () => {
  assertEquals(
    [].sumOf((it) => it),
    0,
  )
})

Deno.test("sumOf - general", () => {
  assertEquals(
    [{ a: 1 }, { b: 2 }, { a: 3 }, { a: -1 }].sumOf((it) => it.a),
    3,
  )
})

Deno.test("distinct - empty", () => {
  assertEquals(
    [].distinct(),
    [],
  )
})

Deno.test("distinct - no duplicates", () => {
  assertEquals(
    [1, 2, 3].distinct(),
    [1, 2, 3],
  )
})

Deno.test("distinct - duplicate numbers", () => {
  assertEquals(
    [1, 1, 2, 3, 3, 3].distinct(),
    [1, 2, 3],
  )
})

Deno.test("distinct - duplicate strings", () => {
  assertEquals(
    ["1", "1", "2", "3", "3", "3"].distinct(),
    ["1", "2", "3"],
  )
})

Deno.test("distinctBy - empty", () => {
  assertEquals(
    [].distinctBy((it) => it),
    [],
  )
})

Deno.test("distinctBy - no duplicates", () => {
  assertEquals(
    [{ a: 1 }, { a: 2 }, { a: 3 }].distinctBy((it) => it.a),
    [{ a: 1 }, { a: 2 }, { a: 3 }],
  )
})

Deno.test("distinctBy - duplicates", () => {
  assertEquals(
    [{ a: 1 }, { a: 1 }, { a: 2 }, { a: 3 }, { a: 3 }, { a: 3 }].distinctBy((it) => it.a),
    [{ a: 1 }, { a: 2 }, { a: 3 }],
  )
})

Deno.test("distinctBy - duplicates, takes first of each", () => {
  assertEquals(
    [{ a: 1, b: 1 }, { a: 1, b: 2 }, { a: 2 }, { a: 3, b: 1 }, { a: 3, b: 2 }].distinctBy((it) => it.a),
    [{ a: 1, b: 1 }, { a: 2 }, { a: 3, b: 1 }],
  )
})

Deno.test("filterNotNull - empty", () => {
  assertEquals(
    [].filterNotNull(),
    [],
  )
})

Deno.test("filterNotNull - general", () => {
  // Defining variables here to show typescript knows things aren't null
  const nullable: Array<string | null> = ["a", null, "b"]
  const nonnull: Array<string> = nullable.filterNotNull()

  assertEquals(
    nonnull,
    ["a", "b"],
  )
})

Deno.test("mapNotNull - empty", () => {
  assertEquals(
    [].mapNotNull((it) => it),
    [],
  )
})

Deno.test("mapNotNull - general", () => {
  // Defining variables here to show typescript knows things aren't null
  const nullable: Array<any | null> = [{ a: 1 }, { a: null }, { a: undefined }, { a: 2 }]
  const nonnull: Array<number> = nullable.mapNotNull((it) => it.a)

  assertEquals(
    nonnull,
    [1, 2],
  )
})

Deno.test("associateBy - empty", () => {
  assertEquals(
    [].associateBy((it) => it),
    new Map(),
  )
})

Deno.test("associateBy - general", () => {
  assertEquals(
    [{ a: "a" }, { a: "b" }, { a: "c" }, { a: "b", b: 1 }, { a: null }, {}].associateBy((it) => it.a),
    new Map([
      ["a", { a: "a" }],
      ["b", { a: "b", b: 1 }],
      ["c", { a: "c" }],
      [null, { a: null }],
      [undefined, {}],
    ]),
  )
})

Deno.test("toSet - empty", () => {
  assertEquals(
    [].toSet(),
    new Set(),
  )
})

Deno.test("toSet - general", () => {
  assertEquals(
    ["a", "a", "b", "c", "c", "c"].toSet(),
    new Set(["a", "b", "c"]),
  )
})
