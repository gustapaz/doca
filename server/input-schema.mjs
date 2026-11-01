export const inputSchema = {
  type: "object",
  additionalProperties: false,
  required: ["policy", "bays", "levels", "weight_limit", "cargo", "count"],
  properties: {
    policy: { type: "string", enum: ["compact", "balanced"] },
    bays: { type: "integer", minimum: 2, maximum: 6 },
    levels: { type: "integer", minimum: 1, maximum: 4 },
    weight_limit: { type: "integer", minimum: 6000, maximum: 24000 },
    cargo: { type: "string", enum: ["coastal", "mixed", "heavy"] },
    count: { type: "integer", minimum: 4, maximum: 18 },
  },
};
