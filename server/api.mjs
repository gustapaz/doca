import { routeTable, simpleDispatch } from "./routes.mjs";
import { service } from "./service.mjs";
import { guarded, errorResponse, readJson } from "./transport.mjs";
import { fail } from "./errors.mjs";
import { Hono } from "hono";
export function createApi(db, clock) {
  const app = new Hono();
  app.onError((e) => errorResponse(e, crypto.randomUUID()));
  app.notFound(() =>
    Response.json(
      { code: "not_found", message: "Endpoint não encontrado." },
      { status: 404 },
    ),
  );
  for (const [method, path, handler] of routeTable(db, service, clock))
    app.on(method, path, (c) => handler(c.req.raw, c.req.param()));
  return guarded((req) => {
    if (new URL(req.url).search)
      fail("invalid_query", "Parâmetros de URL não são aceitos.", 400);
    return app.fetch(req);
  });
}
