import { createApp, reactive } from "petite-vue";
import template from "./view.html?raw";
import { model } from "./model";
import { motionToggle } from "./client";
let paused = false;
const ns = "http://www.w3.org/2000/svg",
  vm: any = reactive({
    d: { catalog: null, archive: [], status: "Preparando o terminal…" },
    a: null,
  });
const a = model("doca", () => (vm.d = { ...a.d }), paint);
vm.a = a;
const host = document.querySelector("#app-root")!;
host.innerHTML = template;
createApp(vm).mount(host);
motionToggle((v) => {
  paused = v;
  document
    .querySelectorAll("#cargo-boxes g")
    .forEach((el) => el.getAnimations().forEach((a) => a.finish()));
});
a.init();
function element(tag: string, attrs: any, parent: Element, text?: string) {
  const el = document.createElementNS(ns, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
  if (text) el.textContent = text;
  parent.append(el);
  return el;
}
function paint(r: any) {
  const boxes = document.querySelector("#cargo-boxes")!,
    ground = document.querySelector("#cargo-ground")!,
    measure = document.querySelector("#cargo-measures")!;
  boxes.replaceChildren();
  ground.replaceChildren();
  measure.replaceChildren();
  if (!r) return;
  const unit = Math.min(125, 740 / r.bays),
    origin = 190 + (740 - r.bays * unit) / 2,
    base = 480;
  for (let x = 0; x < r.bays; x++) {
    element(
      "path",
      {
        d: `M${origin + x * unit} ${base + 8}h${unit - 7}l28 -20h-${unit - 7}z`,
        fill: "#8f9b9e",
        stroke: "#dbe2dc",
        "stroke-width": 1,
      },
      ground,
    );
    element(
      "text",
      {
        x: origin + (x + 0.5) * unit,
        y: base + 37,
        "text-anchor": "middle",
        fill: "#26383d",
        "font-size": 14,
        "font-family": "monospace",
      },
      measure,
      String(x + 1),
    );
    element(
      "text",
      {
        x: origin + (x + 0.5) * unit,
        y: base + 61,
        "text-anchor": "middle",
        fill: "#26383d",
        "font-size": 11,
        "font-family": "monospace",
      },
      measure,
      (r.column_loads[x] / 1000).toFixed(1) + " t",
    );
  }
  for (const [order, b] of [...r.placements]
    .sort((a, b) => a.z - b.z || a.x - b.x)
    .entries()) {
    const x = origin + b.x * unit,
      y = base - b.z * 80,
      w = b.span * unit - 7,
      h = 72,
      g = element("g", { "data-cargo": b.id }, boxes);
    element(
      "path",
      {
        d: `M${x} ${y - h}l26 -19h${w}l-26 19z`,
        fill: b.color,
        stroke: "#26383d44",
      },
      g,
    );
    element(
      "path",
      {
        d: `M${x + w} ${y - h}l26 -19v${h}l-26 19z`,
        fill: b.color,
        stroke: "#26383d88",
      },
      g,
    );
    element(
      "path",
      { d: `M${x + w} ${y - h}l26 -19v${h}l-26 19z`, fill: "#0003" },
      g,
    );
    element(
      "rect",
      {
        x,
        y: y - h,
        width: w,
        height: h,
        rx: 2,
        fill: b.color,
        stroke: "#26383d77",
      },
      g,
    );
    for (let rib = 8; rib < w - 4; rib += 12)
      element(
        "path",
        {
          d: `M${x + rib} ${y - h + 5}v${h - 10}`,
          stroke: "#0003",
          "stroke-width": 3,
        },
        g,
      );
    element(
      "text",
      {
        x: x + 10,
        y: y - 17,
        fill: "#f5efe5",
        "font-family": "monospace",
        "font-size": 13,
        "font-weight": "bold",
      },
      g,
      b.id,
    );
    element(
      "text",
      {
        x: x + w - 12,
        y: y - 17,
        fill: "#f5efe5",
        "font-family": "monospace",
        "font-size": 10,
        "text-anchor": "end",
      },
      g,
      b.fragile ? "◇ FRÁGIL" : b.mass_kg / 1000 + " t",
    );
    if (!paused)
      g.animate(
        [
          { transform: "translate(0,-200px)", opacity: 0 },
          { transform: "translate(0,0)", opacity: 1 },
        ],
        {
          duration: 850,
          delay: order * 65,
          easing: "cubic-bezier(.2,.8,.1,1)",
          fill: "backwards",
        },
      );
  }
}
if (new URL(location.href).searchParams.has("record"))
  document.querySelector("#commands")?.scrollIntoView();
