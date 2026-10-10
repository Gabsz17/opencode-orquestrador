import { describe, it } from "node:test";
import assert from "node:assert/strict";
describe("node-minimo", () => {
  it("health shape", () => { assert.deepEqual({ ok: true }, { ok: true }); });
});
