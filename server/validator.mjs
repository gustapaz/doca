import { inputSchema } from "./input-schema.mjs";
import { fail } from "./errors.mjs";
import * as t from "typanion";
function convert(s) {
  if (s.enum) return t.isOneOf(s.enum.map((x) => t.isLiteral(x)));
  if (s.type === "object")
    return t.isObject(
      Object.fromEntries(
        Object.entries(s.properties).map(([k, v]) => [k, convert(v)]),
      ),
    );
  if (s.type === "boolean") return t.isBoolean();
  if (s.type === "integer")
    return t.applyCascade(t.isNumber(), [
      t.isInteger(),
      t.isInInclusiveRange(s.minimum, s.maximum),
    ]);
  return t.isUnknown();
}
const check = convert(inputSchema);
export function validateInput(input) {
  if (!check(input))
    fail("invalid_input", "Confira tipos, limites e campos da carga.");
  return input;
}
