import { d as m, E as s } from "./runtime-DPDnKgMN.js";
import { B as t } from "./props-Ba6rMGFL.js";
function f(o, r, a) {
  var e = new t(o);
  m(() => {
    var n = r() ?? null;
    e.ensure(n, n && ((c) => a(c, n)));
  }, s);
}
export { f as c };
