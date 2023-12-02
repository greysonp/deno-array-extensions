import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import "./mod.ts"

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
