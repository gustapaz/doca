import { validateInput } from "./validator.mjs";
export const meta = {
  slug: "doca",
  title: "DOCA",
  engine: "hono-typanion-loading",
  default_input: {
    policy: "balanced",
    bays: 4,
    levels: 3,
    weight_limit: 18000,
    cargo: "coastal",
    count: 10,
  },
  presets: [
    {
      name: "Linha costeira",
      input: {
        policy: "balanced",
        bays: 4,
        levels: 3,
        weight_limit: 18000,
        cargo: "coastal",
        count: 10,
      },
    },
    {
      name: "Carga pesada",
      input: {
        policy: "compact",
        bays: 5,
        levels: 3,
        weight_limit: 22000,
        cargo: "heavy",
        count: 12,
      },
    },
    {
      name: "Pouco espaço",
      input: {
        policy: "compact",
        bays: 2,
        levels: 2,
        weight_limit: 8000,
        cargo: "mixed",
        count: 12,
      },
    },
  ],
  note: "Cargas e regras simplificadas são sintéticas. Não é plano de estivagem, engenharia naval, capacidade certificada ou orientação operacional real.",
};
export const validate = validateInput;
export function cargoList(kind, count) {
  const offset = kind === "heavy" ? 4 : kind === "mixed" ? 2 : 0;
  return Array.from({ length: count }, (_, i) => ({
    id: "DC" + String(i + 1).padStart(2, "0"),
    span: i % 5 === 0 ? 2 : 1,
    mass_kg: (2 + ((i * 3 + offset) % 8)) * 1000,
    fragile: i % 7 === 5,
    color: ["#e16d3f", "#d8bb60", "#456a70", "#b2b0a4"][i % 4],
  }));
}
export function compute(raw) {
  const p = validate(raw),
    cargo = cargoList(p.cargo, p.count),
    heights = Array(p.bays).fill(0),
    loads = Array(p.bays).fill(0),
    top = Array(p.bays).fill(null),
    placements = [],
    unplaced = [];
  const sorted = [...cargo].sort(
    (a, b) =>
      Number(a.fragile) - Number(b.fragile) ||
      b.mass_kg / b.span - a.mass_kg / a.span ||
      b.span - a.span ||
      a.id.localeCompare(b.id),
  );
  for (const box of sorted) {
    const unit = box.mass_kg / box.span,
      choices = [];
    for (let x = 0; x <= p.bays - box.span; x++) {
      const cols = Array.from({ length: box.span }, (_, i) => x + i),
        z = heights[x];
      if (
        z >= p.levels ||
        cols.some(
          (c) =>
            heights[c] !== z ||
            loads[c] + unit > p.weight_limit ||
            (top[c] && (top[c].fragile || top[c].unit_mass < unit)),
        )
      )
        continue;
      const candidateLoads = loads.map(
          (v, i) => v + (cols.includes(i) ? unit : 0),
        ),
        mean = candidateLoads.reduce((a, b) => a + b, 0) / p.bays,
        variance = candidateLoads.reduce((s, v) => s + (v - mean) ** 2, 0);
      choices.push({
        x,
        z,
        rank:
          p.policy === "balanced" ? variance + z * 1000000 : z * 100000000 + x,
      });
    }
    choices.sort((a, b) => a.rank - b.rank || a.x - b.x);
    if (!choices.length) {
      unplaced.push(box);
      continue;
    }
    const { x, z } = choices[0];
    placements.push({ ...box, x, z, unit_mass: unit });
    for (let i = x; i < x + box.span; i++) {
      heights[i]++;
      loads[i] += unit;
      top[i] = { fragile: box.fragile, unit_mass: unit };
    }
  }
  const mass = placements.reduce((s, b) => s + b.mass_kg, 0);
  return {
    placements,
    unplaced,
    bays: p.bays,
    levels: p.levels,
    column_loads: loads,
    loaded_kg: mass,
    total_kg: cargo.reduce((s, b) => s + b.mass_kg, 0),
    centroid: mass
      ? placements.reduce((s, b) => s + b.mass_kg * (b.x + b.span / 2), 0) /
        mass
      : 0,
    placed_count: placements.length,
    cargo_count: cargo.length,
    method: "bounded greedy, not global optimum",
  };
}
export function exportResult(input) {
  const r = compute(input);
  return {
    type: "text/csv; charset=utf-8",
    extension: "csv",
    text:
      "id,bay,level,span,mass_kg,status\n" +
      r.placements
        .map((b) =>
          [b.id, b.x + 1, b.z + 1, b.span, b.mass_kg, "loaded"].join(","),
        )
        .concat(
          r.unplaced.map((b) =>
            [b.id, "", "", b.span, b.mass_kg, "unplaced"].join(","),
          ),
        )
        .join("\n") +
      "\n",
  };
}
export const service = { meta, validate, compute, export: exportResult };
