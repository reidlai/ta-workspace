import { f as l, a as e, t as f, s as q } from "./render-DW8l5F5-.js";
import {
  k as P,
  s as _,
  t as z,
  h as S,
  m as A,
  n as W,
  o as F,
} from "./runtime-DPDnKgMN.js";
import { c as r } from "./svelte-component-B4I-xnpj.js";
import {
  C as G,
  a as H,
  b as J,
  c as K,
  d as L,
  B as M,
  e as N,
} from "./card-title-BIJ0GckP.js";
import "./props-Ba6rMGFL.js";
import "./class-BLXIZATI.js";
var Q = l("<!> <!>", 1),
  R = l("<p> </p>"),
  V = l("<!> <!> <!>", 1),
  X = l('<div class="p-4"><!></div>');
function y(B) {
  let i = A(0);
  function I() {
    F(i, S(i) + 1);
  }
  var v = X(),
    w = W(v);
  (r(
    w,
    () => N,
    (E, O) => {
      O(E, {
        children: (T, Y) => {
          var g = V(),
            h = P(g);
          r(
            h,
            () => G,
            (o, s) => {
              s(o, {
                children: (a, C) => {
                  var t = Q(),
                    n = P(t);
                  r(
                    n,
                    () => H,
                    (p, m) => {
                      m(p, {
                        children: ($, j) => {
                          var u = f("Simple Debug Widget");
                          e($, u);
                        },
                        $$slots: { default: !0 },
                      });
                    },
                  );
                  var c = _(n, 2);
                  (r(
                    c,
                    () => J,
                    (p, m) => {
                      m(p, {
                        children: ($, j) => {
                          var u = f("Testing UI components only");
                          e($, u);
                        },
                        $$slots: { default: !0 },
                      });
                    },
                  ),
                    e(a, t));
                },
                $$slots: { default: !0 },
              });
            },
          );
          var x = _(h, 2);
          r(
            x,
            () => K,
            (o, s) => {
              s(o, {
                children: (a, C) => {
                  var t = R(),
                    n = W(t);
                  (z(() => q(n, `Count: ${S(i) ?? ""}`)), e(a, t));
                },
                $$slots: { default: !0 },
              });
            },
          );
          var U = _(x, 2);
          (r(
            U,
            () => L,
            (o, s) => {
              s(o, {
                children: (a, C) => {
                  M(a, {
                    onclick: I,
                    children: (t, n) => {
                      var c = f("Increment");
                      e(t, c);
                    },
                    $$slots: { default: !0 },
                  });
                },
                $$slots: { default: !0 },
              });
            },
          ),
            e(T, g));
        },
        $$slots: { default: !0 },
      });
    },
  ),
    e(B, v));
}
y.__docgen = {
  version: 3,
  name: "SimpleWidget.svelte",
  data: [],
  computed: [],
  methods: [],
  components: [],
  description: null,
  keywords: [],
  events: [],
  slots: [],
  refs: [],
};
const at = { title: "Widgets/SimpleWidget", component: y, tags: ["autodocs"] },
  d = {};
var b, k, D;
d.parameters = {
  ...d.parameters,
  docs: {
    ...((b = d.parameters) == null ? void 0 : b.docs),
    source: {
      originalSource: "{}",
      ...((D = (k = d.parameters) == null ? void 0 : k.docs) == null
        ? void 0
        : D.source),
    },
  },
};
const nt = ["Default"];
export { d as Default, nt as __namedExportsOrder, at as default };
