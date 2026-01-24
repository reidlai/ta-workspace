import { f as Y, a as q, s as M, d as j } from "./render-DW8l5F5-.js";
import { i as ee } from "./lifecycle-kGLgCphG.js";
import {
  x as P,
  d as re,
  h as x,
  D as ne,
  T as B,
  p as te,
  U as k,
  y as z,
  A as ae,
  V as O,
  W as Z,
  X as V,
  Y as oe,
  Z as le,
  _ as ie,
  $ as se,
  q as G,
  w as K,
  a0 as R,
  a1 as fe,
  a2 as ue,
  v as de,
  n as A,
  s as D,
  t as U,
  a3 as ce,
  a4 as ve,
  a5 as W,
} from "./runtime-DPDnKgMN.js";
import { s as pe } from "./class-BLXIZATI.js";
function ge(e, o) {
  return o;
}
function me(e, o, n) {
  for (var i = [], m = o.length, l, f = o.length, t = 0; t < m; t++) {
    let s = o[t];
    K(
      s,
      () => {
        if (l) {
          if ((l.pending.delete(s), l.done.add(s), l.pending.size === 0)) {
            var c = e.outrogroups;
            (H(V(l.done)), c.delete(l), c.size === 0 && (e.outrogroups = null));
          }
        } else f -= 1;
      },
      !1,
    );
  }
  if (f === 0) {
    var u = i.length === 0 && n !== null;
    if (u) {
      var a = n,
        d = a.parentNode;
      (ue(d), d.append(a), e.items.clear());
    }
    H(o, !u);
  } else
    ((l = { pending: new Set(o), done: new Set() }),
      (e.outrogroups ?? (e.outrogroups = new Set())).add(l));
}
function H(e, o = !0) {
  for (var n = 0; n < e.length; n++) de(e[n], o);
}
var X;
function he(e, o, n, i, m, l = null) {
  var f = e,
    t = new Map();
  {
    var u = e;
    f = u.appendChild(P());
  }
  var a = null,
    d = ne(() => {
      var g = n();
      return oe(g) ? g : g == null ? [] : V(g);
    }),
    s,
    c = !0;
  function C() {
    ((p.fallback = a),
      _e(p, s, f, o, i),
      a !== null &&
        (s.length === 0
          ? (a.f & k) === 0
            ? G(a)
            : ((a.f ^= k), F(a, null, f))
          : K(a, () => {
              a = null;
            })));
  }
  var r = re(() => {
      s = x(d);
      for (
        var g = s.length, w = new Set(), v = te, T = ae(), h = 0;
        h < g;
        h += 1
      ) {
        var b = s[h],
          E = i(b, h),
          _ = c ? null : t.get(E);
        (_
          ? (_.v && B(_.v, b),
            _.i && B(_.i, h),
            T && v.skipped_effects.delete(_.e))
          : ((_ = be(t, c ? f : (X ?? (X = P())), b, E, h, m, o, n)),
            c || (_.e.f |= k),
            t.set(E, _)),
          w.add(E));
      }
      if (
        (g === 0 &&
          l &&
          !a &&
          (c
            ? (a = z(() => l(f)))
            : ((a = z(() => l(X ?? (X = P())))), (a.f |= k))),
        !c)
      )
        if (T) {
          for (const [I, y] of t) w.has(I) || v.skipped_effects.add(y.e);
          (v.oncommit(C), v.ondiscard(() => {}));
        } else C();
      x(d);
    }),
    p = { effect: r, items: t, outrogroups: null, fallback: a };
  c = !1;
}
function _e(e, o, n, i, m) {
  var I;
  var l = o.length,
    f = e.items,
    t = e.effect.first,
    u,
    a = null,
    d = [],
    s = [],
    c,
    C,
    r,
    p;
  for (p = 0; p < l; p += 1) {
    if (((c = o[p]), (C = m(c, p)), (r = f.get(C).e), e.outrogroups !== null))
      for (const y of e.outrogroups) (y.pending.delete(r), y.done.delete(r));
    if ((r.f & k) !== 0)
      if (((r.f ^= k), r === t)) F(r, null, n);
      else {
        var g = a ? a.next : t;
        (r === e.effect.last && (e.effect.last = r.prev),
          r.prev && (r.prev.next = r.next),
          r.next && (r.next.prev = r.prev),
          S(e, a, r),
          S(e, r, g),
          F(r, g, n),
          (a = r),
          (d = []),
          (s = []),
          (t = a.next));
        continue;
      }
    if (((r.f & R) !== 0 && G(r), r !== t)) {
      if (u !== void 0 && u.has(r)) {
        if (d.length < s.length) {
          var w = s[0],
            v;
          a = w.prev;
          var T = d[0],
            h = d[d.length - 1];
          for (v = 0; v < d.length; v += 1) F(d[v], w, n);
          for (v = 0; v < s.length; v += 1) u.delete(s[v]);
          (S(e, T.prev, h.next),
            S(e, a, T),
            S(e, h, w),
            (t = w),
            (a = h),
            (p -= 1),
            (d = []),
            (s = []));
        } else
          (u.delete(r),
            F(r, t, n),
            S(e, r.prev, r.next),
            S(e, r, a === null ? e.effect.first : a.next),
            S(e, a, r),
            (a = r));
        continue;
      }
      for (d = [], s = []; t !== null && t !== r; )
        ((u ?? (u = new Set())).add(t), s.push(t), (t = t.next));
      if (t === null) continue;
    }
    ((r.f & k) === 0 && d.push(r), (a = r), (t = r.next));
  }
  if (e.outrogroups !== null) {
    for (const y of e.outrogroups)
      y.pending.size === 0 &&
        (H(V(y.done)), (I = e.outrogroups) == null || I.delete(y));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (t !== null || u !== void 0) {
    var b = [];
    if (u !== void 0) for (r of u) (r.f & R) === 0 && b.push(r);
    for (; t !== null; )
      ((t.f & R) === 0 && t !== e.fallback && b.push(t), (t = t.next));
    var E = b.length;
    if (E > 0) {
      var _ = l === 0 ? n : null;
      me(e, b, _);
    }
  }
}
function be(e, o, n, i, m, l, f, t) {
  var u = (f & le) !== 0 ? ((f & ie) === 0 ? Z(n, !1, !1) : O(n)) : null,
    a = (f & se) !== 0 ? O(m) : null;
  return {
    v: u,
    i: a,
    e: z(
      () => (
        l(o, u ?? n, a ?? m, t),
        () => {
          e.delete(i);
        }
      ),
    ),
  };
}
function F(e, o, n) {
  if (e.nodes)
    for (
      var i = e.nodes.start,
        m = e.nodes.end,
        l = o && (o.f & k) === 0 ? o.nodes.start : n;
      i !== null;
    ) {
      var f = fe(i);
      if ((l.before(i), i === m)) return;
      i = f;
    }
}
function S(e, o, n) {
  (o === null ? (e.effect.first = n) : (o.next = n),
    n === null ? (e.effect.last = o) : (n.prev = o));
}
async function xe(...e) {
  const o = new CustomEvent("storybook:goto", { detail: e });
  window.dispatchEvent(o);
}
var we = Y("<div></div>"),
  Ee = Y(
    '<div class="container mx-auto p-8 max-w-2xl"><h1 class="text-4xl font-bold mb-2">Demo Feature - Multi-Step Journey</h1> <p class="text-muted-foreground mb-8">This page is loaded from a dynamic feature module.</p> <div class="border rounded p-6 shadow-sm"><h2 class="text-2xl font-semibold mb-2"> </h2> <p class="text-muted-foreground mb-4"> </p> <p class="text-lg leading-relaxed mb-6"> </p> <div class="flex justify-between"><button class="px-4 py-2 border rounded hover:bg-muted disabled:opacity-50">Previous</button> <button class="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90"> </button></div></div> <div class="flex justify-center gap-2 mt-8"></div></div>',
  );
function Q(e, o) {
  ve(o, !1);
  let n = Z(0);
  const i = [
    {
      title: "Welcome to AppShell",
      description: "This is a demonstration of the modular architecture.",
      content:
        "Features are injected dynamically at runtime, allowing for a truly scalable monorepo structure.",
    },
    {
      title: "Feature Modules",
      description: "Self-contained units of functionality.",
      content:
        "Each module bundles its own routes, services, and widgets, keeping concerns separated.",
    },
    {
      title: "Ready to Build",
      description: "Start creating your own modules.",
      content:
        "Check the documentation to learn how to create and register new features.",
    },
  ];
  function m() {
    x(n) < i.length - 1 ? W(n) : xe("/");
  }
  function l() {
    x(n) > 0 && W(n, -1);
  }
  ee();
  var f = Ee(),
    t = D(A(f), 4),
    u = A(t),
    a = A(u),
    d = D(u, 2),
    s = A(d),
    c = D(d, 2),
    C = A(c),
    r = D(c, 2),
    p = A(r);
  p.__click = l;
  var g = D(p, 2);
  g.__click = m;
  var w = A(g),
    v = D(t, 2);
  (he(
    v,
    5,
    () => i,
    ge,
    (T, h, b) => {
      var E = we();
      (U(() =>
        pe(
          E,
          1,
          `h-2 w-2 rounded-full transition-all duration-300 ${b === x(n) ? "bg-primary w-4" : "bg-muted"}`,
        ),
      ),
        q(T, E));
    },
  ),
    U(() => {
      (M(a, i[x(n)].title),
        M(s, i[x(n)].description),
        M(C, i[x(n)].content),
        (p.disabled = x(n) === 0),
        M(w, x(n) === i.length - 1 ? "Finish" : "Next"));
    }),
    q(e, f),
    ce());
}
j(["click"]);
Q.__docgen = {
  version: 3,
  name: "DemoPage.svelte",
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
const Te = {
    title: "Pages/DemoPage",
    component: Q,
    tags: ["autodocs"],
    parameters: { layout: "fullscreen" },
  },
  N = {};
var $, J, L;
N.parameters = {
  ...N.parameters,
  docs: {
    ...(($ = N.parameters) == null ? void 0 : $.docs),
    source: {
      originalSource: "{}",
      ...((L = (J = N.parameters) == null ? void 0 : J.docs) == null
        ? void 0
        : L.source),
    },
  },
};
const Ae = ["Default"];
export { N as Default, Ae as __namedExportsOrder, Te as default };
