import { test } from "node:test";
import assert from "node:assert/strict";
import { service } from "../server/service.mjs";

test("mass conserved between loaded and unplaced cargo", () => {
  for (const p of service.meta.presets) {
    const r = service.compute(p.input);
    assert.equal(
      r.loaded_kg + r.unplaced.reduce((s, b) => s + b.mass_kg, 0),
      r.total_kg,
    );
    assert.equal(r.placements.length + r.unplaced.length, p.input.count);
  }
});
test("every container is in bounds with no spatial overlap", () => {
  for (const p of service.meta.presets) {
    const r = service.compute(p.input);
    for (const a of r.placements) {
      assert.ok(
        a.x >= 0 &&
          a.x + a.span <= p.input.bays &&
          a.z >= 0 &&
          a.z < p.input.levels,
      );
      for (const b of r.placements)
        if (a.id !== b.id)
          assert.ok(a.z !== b.z || a.x + a.span <= b.x || b.x + b.span <= a.x);
    }
  }
});
test("column weights reconstructed independently respect capacity", () => {
  for (const p of service.meta.presets) {
    const r = service.compute(p.input),
      loads = Array(p.input.bays).fill(0);
    for (const b of r.placements)
      for (let x = b.x; x < b.x + b.span; x++) loads[x] += b.mass_kg / b.span;
    assert.deepEqual(loads, r.column_loads);
    assert.ok(loads.every((x) => x <= p.input.weight_limit));
  }
});
test("no unsupported spans or load above fragile cargo", () => {
  const r = service.compute(service.meta.default_input);
  for (const b of r.placements)
    if (b.z)
      for (let x = b.x; x < b.x + b.span; x++) {
        const under = r.placements.find(
          (a) => a.z === b.z - 1 && a.x <= x && a.x + a.span > x,
        );
        assert.ok(
          under &&
            !under.fragile &&
            under.mass_kg / under.span >= b.mass_kg / b.span,
        );
      }
});
test("limited capacity produces honest remainder and export lists all cargo", () => {
  const p = { ...service.meta.default_input, bays: 2, levels: 1, count: 18 },
    r = service.compute(p);
  assert.ok(r.unplaced.length);
  assert.equal(service.export(p).text.trim().split("\n").length, 19);
});
test("invalid cargo fields limits and fractional bay rejected", () => {
  for (const x of [
    { bays: 2.5 },
    { weight_limit: 0 },
    { cargo: "real" },
    { count: 19 },
    { extra: 1 },
  ])
    assert.throws(() =>
      service.compute({ ...service.meta.default_input, ...x }),
    );
});
