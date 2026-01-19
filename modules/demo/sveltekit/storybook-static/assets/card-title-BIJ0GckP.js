import {
  b as ht,
  i as vt,
  c as yt,
  d as wt,
  n as kt,
  e as xt,
  f as H,
  a as X,
} from "./render-DW8l5F5-.js";
import {
  a9 as Ct,
  d as _t,
  E as At,
  as as Ke,
  v as Te,
  y as qe,
  at as He,
  Y as St,
  au as Mt,
  av as zt,
  aw as Tt,
  h as Vt,
  ax as Gt,
  ay as Nt,
  az as Rt,
  aA as Et,
  aB as It,
  aC as Pt,
  a4 as J,
  aD as Z,
  n as Q,
  a3 as ee,
} from "./runtime-DPDnKgMN.js";
import { B as Ot, p as Oe, r as te } from "./props-Ba6rMGFL.js";
import { t as Lt, c as jt, s as Bt, a as Ft } from "./class-BLXIZATI.js";
function $t(e, t) {
  if (t) {
    const o = document.body;
    ((e.autofocus = !0),
      Ct(() => {
        document.activeElement === o && e.focus();
      }));
  }
}
function re(e, t, ...o) {
  var r = new Ot(e);
  _t(() => {
    const n = t() ?? null;
    r.ensure(n, n && ((s) => n(s, ...o)));
  }, At);
}
function Wt(e, t) {
  var o = void 0,
    r;
  Ke(() => {
    o !== (o = t()) &&
      (r && (Te(r), (r = null)),
      o &&
        (r = qe(() => {
          He(() => o(e));
        })));
  });
}
function Se(e, t = {}, o, r) {
  for (var n in o) {
    var s = o[n];
    t[n] !== s &&
      (o[n] == null ? e.style.removeProperty(n) : e.style.setProperty(n, s, r));
  }
}
function Ut(e, t, o, r) {
  var n = e.__style;
  if (n !== t) {
    var s = Lt(t, r);
    (s == null ? e.removeAttribute("style") : (e.style.cssText = s),
      (e.__style = t));
  } else
    r &&
      (Array.isArray(r)
        ? (Se(e, o == null ? void 0 : o[0], r[0]),
          Se(e, o == null ? void 0 : o[1], r[1], "important"))
        : Se(e, o, r));
  return r;
}
function Ve(e, t, o = !1) {
  if (e.multiple) {
    if (t == null) return;
    if (!St(t)) return ht();
    for (var r of e.options) r.selected = t.includes(Le(r));
    return;
  }
  for (r of e.options) {
    var n = Le(r);
    if (Mt(n, t)) {
      r.selected = !0;
      return;
    }
  }
  (!o || t !== void 0) && (e.selectedIndex = -1);
}
function Dt(e) {
  var t = new MutationObserver(() => {
    Ve(e, e.__value);
  });
  (t.observe(e, {
    childList: !0,
    subtree: !0,
    attributes: !0,
    attributeFilter: ["value"],
  }),
    zt(() => {
      t.disconnect();
    }));
}
function Le(e) {
  return "__value" in e ? e.__value : e.value;
}
const ue = Symbol("class"),
  fe = Symbol("style"),
  Xe = Symbol("is custom element"),
  Je = Symbol("is html");
function Yt(e, t) {
  t
    ? e.hasAttribute("selected") || e.setAttribute("selected", "")
    : e.removeAttribute("selected");
}
function je(e, t, o, r) {
  var n = Ze(e);
  n[t] !== (n[t] = o) &&
    (t === "loading" && (e[It] = o),
    o == null
      ? e.removeAttribute(t)
      : typeof o != "string" && Qe(e).includes(t)
        ? (e[t] = o)
        : e.setAttribute(t, o));
}
function Kt(e, t, o, r, n = !1, s = !1) {
  var a = Ze(e),
    m = a[Xe],
    d = !a[Je],
    u = t || {},
    C = e.tagName === "OPTION";
  for (var _ in t) _ in o || (o[_] = null);
  (o.class ? (o.class = jt(o.class)) : o[ue] && (o.class = null),
    o[fe] && (o.style ?? (o.style = null)));
  var R = Qe(e);
  for (const p in o) {
    let x = o[p];
    if (C && p === "value" && x == null) {
      ((e.value = e.__value = ""), (u[p] = x));
      continue;
    }
    if (p === "class") {
      var A = e.namespaceURI === "http://www.w3.org/1999/xhtml";
      (Bt(e, A, x, r, t == null ? void 0 : t[ue], o[ue]),
        (u[p] = x),
        (u[ue] = o[ue]));
      continue;
    }
    if (p === "style") {
      (Ut(e, x, t == null ? void 0 : t[fe], o[fe]),
        (u[p] = x),
        (u[fe] = o[fe]));
      continue;
    }
    var z = u[p];
    if (!(x === z && !(x === void 0 && e.hasAttribute(p)))) {
      u[p] = x;
      var V = p[0] + p[1];
      if (V !== "$$")
        if (V === "on") {
          const g = {},
            P = "$$" + p;
          let T = p.slice(2);
          var S = xt(T);
          if ((vt(T) && ((T = T.slice(0, -7)), (g.capture = !0)), !S && z)) {
            if (x != null) continue;
            (e.removeEventListener(T, u[P], g), (u[P] = null));
          }
          if (x != null)
            if (S) ((e[`__${T}`] = x), wt([T]));
            else {
              let f = function (B) {
                u[p].call(this, B);
              };
              u[P] = yt(T, e, f, g);
            }
          else S && (e[`__${T}`] = void 0);
        } else if (p === "style") je(e, p, x);
        else if (p === "autofocus") $t(e, !!x);
        else if (!m && (p === "__value" || (p === "value" && x != null)))
          e.value = e.__value = x;
        else if (p === "selected" && C) Yt(e, x);
        else {
          var b = p;
          d || (b = kt(b));
          var j = b === "defaultValue" || b === "defaultChecked";
          if (x == null && !m && !j)
            if (((a[p] = null), b === "value" || b === "checked")) {
              let g = e;
              const P = t === void 0;
              if (b === "value") {
                let T = g.defaultValue;
                (g.removeAttribute(b),
                  (g.defaultValue = T),
                  (g.value = g.__value = P ? T : null));
              } else {
                let T = g.defaultChecked;
                (g.removeAttribute(b),
                  (g.defaultChecked = T),
                  (g.checked = P ? T : !1));
              }
            } else e.removeAttribute(p);
          else
            j || (R.includes(b) && (m || typeof x != "string"))
              ? ((e[b] = x), b in a && (a[b] = Nt))
              : typeof x != "function" && je(e, b, x);
        }
    }
  }
  return u;
}
function oe(e, t, o = [], r = [], n = [], s, a = !1, m = !1) {
  Tt(n, o, r, (d) => {
    var u = void 0,
      C = {},
      _ = e.nodeName === "SELECT",
      R = !1;
    if (
      (Ke(() => {
        var z = t(...d.map(Vt)),
          V = Kt(e, u, z, s, a, m);
        R && _ && "value" in z && Ve(e, z.value);
        for (let b of Object.getOwnPropertySymbols(C)) z[b] || Te(C[b]);
        for (let b of Object.getOwnPropertySymbols(z)) {
          var S = z[b];
          (b.description === Gt &&
            (!u || S !== u[b]) &&
            (C[b] && Te(C[b]), (C[b] = qe(() => Wt(e, () => S)))),
            (V[b] = S));
        }
        u = V;
      }),
      _)
    ) {
      var A = e;
      He(() => {
        (Ve(A, u.value, !0), Dt(A));
      });
    }
    R = !0;
  });
}
function Ze(e) {
  return (
    e.__attributes ??
    (e.__attributes = {
      [Xe]: e.nodeName.includes("-"),
      [Je]: e.namespaceURI === Rt,
    })
  );
}
var Be = new Map();
function Qe(e) {
  var t = e.getAttribute("is") || e.nodeName,
    o = Be.get(t);
  if (o) return o;
  Be.set(t, (o = []));
  for (var r, n = e, s = Element.prototype; s !== n; ) {
    r = Pt(n);
    for (var a in r) r[a].set && o.push(a);
    n = Et(n);
  }
  return o;
}
var qt = /\s+/g,
  Ht = (e) => (typeof e != "string" || !e ? e : e.replace(qt, " ").trim()),
  Ce = (...e) => {
    const t = [],
      o = (r) => {
        if (!r && r !== 0 && r !== 0n) return;
        if (Array.isArray(r)) {
          for (let s = 0, a = r.length; s < a; s++) o(r[s]);
          return;
        }
        const n = typeof r;
        if (n === "string" || n === "number" || n === "bigint") {
          if (n === "number" && r !== r) return;
          t.push(String(r));
        } else if (n === "object") {
          const s = Object.keys(r);
          for (let a = 0, m = s.length; a < m; a++) {
            const d = s[a];
            r[d] && t.push(d);
          }
        }
      };
    for (let r = 0, n = e.length; r < n; r++) {
      const s = e[r];
      s != null && o(s);
    }
    return t.length > 0 ? Ht(t.join(" ")) : void 0;
  },
  Fe = (e) => (e === !1 ? "false" : e === !0 ? "true" : e === 0 ? "0" : e),
  $ = (e) => {
    if (!e || typeof e != "object") return !0;
    for (const t in e) return !1;
    return !0;
  },
  Xt = (e, t) => {
    if (e === t) return !0;
    if (!e || !t) return !1;
    const o = Object.keys(e),
      r = Object.keys(t);
    if (o.length !== r.length) return !1;
    for (let n = 0; n < o.length; n++) {
      const s = o[n];
      if (!r.includes(s) || e[s] !== t[s]) return !1;
    }
    return !0;
  },
  Jt = (e, t) => {
    for (const o in t)
      if (Object.prototype.hasOwnProperty.call(t, o)) {
        const r = t[o];
        o in e ? (e[o] = Ce(e[o], r)) : (e[o] = r);
      }
    return e;
  },
  et = (e, t) => {
    for (let o = 0; o < e.length; o++) {
      const r = e[o];
      Array.isArray(r) ? et(r, t) : r && t.push(r);
    }
  },
  tt = (...e) => {
    const t = [];
    et(e, t);
    const o = [];
    for (let r = 0; r < t.length; r++) t[r] && o.push(t[r]);
    return o;
  },
  Ge = (e, t) => {
    const o = {};
    for (const r in e) {
      const n = e[r];
      if (r in t) {
        const s = t[r];
        Array.isArray(n) || Array.isArray(s)
          ? (o[r] = tt(s, n))
          : typeof n == "object" && typeof s == "object" && n && s
            ? (o[r] = Ge(n, s))
            : (o[r] = s + " " + n);
      } else o[r] = n;
    }
    for (const r in t) r in e || (o[r] = t[r]);
    return o;
  },
  Zt = { twMerge: !0, twMergeConfig: {} };
function Qt() {
  let e = null,
    t = {},
    o = !1;
  return {
    get cachedTwMerge() {
      return e;
    },
    set cachedTwMerge(r) {
      e = r;
    },
    get cachedTwMergeConfig() {
      return t;
    },
    set cachedTwMergeConfig(r) {
      t = r;
    },
    get didTwMergeConfigChange() {
      return o;
    },
    set didTwMergeConfigChange(r) {
      o = r;
    },
    reset() {
      ((e = null), (t = {}), (o = !1));
    },
  };
}
var D = Qt(),
  er = (e) => {
    const t = (r, n) => {
      const {
          extend: s = null,
          slots: a = {},
          variants: m = {},
          compoundVariants: d = [],
          compoundSlots: u = [],
          defaultVariants: C = {},
        } = r,
        _ = { ...Zt, ...n },
        R =
          s != null && s.base
            ? Ce(s.base, r == null ? void 0 : r.base)
            : r == null
              ? void 0
              : r.base,
        A = s != null && s.variants && !$(s.variants) ? Ge(m, s.variants) : m,
        z =
          s != null && s.defaultVariants && !$(s.defaultVariants)
            ? { ...s.defaultVariants, ...C }
            : C;
      !$(_.twMergeConfig) &&
        !Xt(_.twMergeConfig, D.cachedTwMergeConfig) &&
        ((D.didTwMergeConfigChange = !0),
        (D.cachedTwMergeConfig = _.twMergeConfig));
      const V = $(s == null ? void 0 : s.slots),
        S = $(a)
          ? {}
          : {
              base: Ce(
                r == null ? void 0 : r.base,
                V && (s == null ? void 0 : s.base),
              ),
              ...a,
            },
        b = V
          ? S
          : Jt(
              { ...(s == null ? void 0 : s.slots) },
              $(S) ? { base: r == null ? void 0 : r.base } : S,
            ),
        j = $(s == null ? void 0 : s.compoundVariants)
          ? d
          : tt(s == null ? void 0 : s.compoundVariants, d),
        p = (g) => {
          if ($(A) && $(a) && V)
            return e(
              R,
              g == null ? void 0 : g.class,
              g == null ? void 0 : g.className,
            )(_);
          if (j && !Array.isArray(j))
            throw new TypeError(
              `The "compoundVariants" prop must be an array. Received: ${typeof j}`,
            );
          if (u && !Array.isArray(u))
            throw new TypeError(
              `The "compoundSlots" prop must be an array. Received: ${typeof u}`,
            );
          const P = (w, k = A, y = null, v = null) => {
              const i = k[w];
              if (!i || $(i)) return null;
              const G =
                (v == null ? void 0 : v[w]) ?? (g == null ? void 0 : g[w]);
              if (G === null) return null;
              const L = Fe(G);
              if (typeof L == "object") return null;
              const W = z == null ? void 0 : z[w],
                O = L ?? Fe(W);
              return i[O || "false"];
            },
            T = () => {
              if (!A) return null;
              const w = Object.keys(A),
                k = [];
              for (let y = 0; y < w.length; y++) {
                const v = P(w[y], A);
                v && k.push(v);
              }
              return k;
            },
            f = (w, k) => {
              if (!A || typeof A != "object") return null;
              const y = [];
              for (const v in A) {
                const i = P(v, A, w, k),
                  G = w === "base" && typeof i == "string" ? i : i && i[w];
                G && y.push(G);
              }
              return y;
            },
            B = {};
          for (const w in g) {
            const k = g[w];
            k !== void 0 && (B[w] = k);
          }
          const ce = (w, k) => {
              var v;
              const y =
                typeof (g == null ? void 0 : g[w]) == "object"
                  ? { [w]: (v = g[w]) == null ? void 0 : v.initial }
                  : {};
              return { ...z, ...B, ...y, ...k };
            },
            de = (w = [], k) => {
              const y = [],
                v = w.length;
              for (let i = 0; i < v; i++) {
                const { class: G, className: L, ...W } = w[i];
                let O = !0;
                const M = ce(null, k);
                for (const N in W) {
                  const F = W[N],
                    K = M[N];
                  if (Array.isArray(F)) {
                    if (!F.includes(K)) {
                      O = !1;
                      break;
                    }
                  } else {
                    if ((F == null || F === !1) && (K == null || K === !1))
                      continue;
                    if (K !== F) {
                      O = !1;
                      break;
                    }
                  }
                }
                O && (G && y.push(G), L && y.push(L));
              }
              return y;
            },
            ne = (w) => {
              const k = de(j, w);
              if (!Array.isArray(k)) return k;
              const y = {},
                v = e;
              for (let i = 0; i < k.length; i++) {
                const G = k[i];
                if (typeof G == "string") y.base = v(y.base, G)(_);
                else if (typeof G == "object")
                  for (const L in G) y[L] = v(y[L], G[L])(_);
              }
              return y;
            },
            pe = (w) => {
              if (u.length < 1) return null;
              const k = {},
                y = ce(null, w);
              for (let v = 0; v < u.length; v++) {
                const { slots: i = [], class: G, className: L, ...W } = u[v];
                if (!$(W)) {
                  let O = !0;
                  for (const M in W) {
                    const N = y[M],
                      F = W[M];
                    if (
                      N === void 0 ||
                      (Array.isArray(F) ? !F.includes(N) : F !== N)
                    ) {
                      O = !1;
                      break;
                    }
                  }
                  if (!O) continue;
                }
                for (let O = 0; O < i.length; O++) {
                  const M = i[O];
                  (k[M] || (k[M] = []), k[M].push([G, L]));
                }
              }
              return k;
            };
          if (!$(a) || !V) {
            const w = {};
            if (typeof b == "object" && !$(b)) {
              const k = e;
              for (const y in b)
                w[y] = (v) => {
                  const i = ne(v),
                    G = pe(v);
                  return k(
                    b[y],
                    f(y, v),
                    i ? i[y] : void 0,
                    G ? G[y] : void 0,
                    v == null ? void 0 : v.class,
                    v == null ? void 0 : v.className,
                  )(_);
                };
            }
            return w;
          }
          return e(
            R,
            T(),
            de(j),
            g == null ? void 0 : g.class,
            g == null ? void 0 : g.className,
          )(_);
        },
        x = () => {
          if (!(!A || typeof A != "object")) return Object.keys(A);
        };
      return (
        (p.variantKeys = x()),
        (p.extend = s),
        (p.base = R),
        (p.slots = b),
        (p.variants = A),
        (p.defaultVariants = z),
        (p.compoundSlots = u),
        (p.compoundVariants = j),
        p
      );
    };
    return { tv: t, createTV: (r) => (n, s) => t(n, s ? Ge(r, s) : r) };
  };
const tr = (e, t) => {
    const o = new Array(e.length + t.length);
    for (let r = 0; r < e.length; r++) o[r] = e[r];
    for (let r = 0; r < t.length; r++) o[e.length + r] = t[r];
    return o;
  },
  rr = (e, t) => ({ classGroupId: e, validator: t }),
  rt = (e = new Map(), t = null, o) => ({
    nextPart: e,
    validators: t,
    classGroupId: o,
  }),
  _e = "-",
  $e = [],
  or = "arbitrary..",
  sr = (e) => {
    const t = ar(e),
      { conflictingClassGroups: o, conflictingClassGroupModifiers: r } = e;
    return {
      getClassGroupId: (a) => {
        if (a.startsWith("[") && a.endsWith("]")) return nr(a);
        const m = a.split(_e),
          d = m[0] === "" && m.length > 1 ? 1 : 0;
        return ot(m, d, t);
      },
      getConflictingClassGroupIds: (a, m) => {
        if (m) {
          const d = r[a],
            u = o[a];
          return d ? (u ? tr(u, d) : d) : u || $e;
        }
        return o[a] || $e;
      },
    };
  },
  ot = (e, t, o) => {
    if (e.length - t === 0) return o.classGroupId;
    const n = e[t],
      s = o.nextPart.get(n);
    if (s) {
      const u = ot(e, t + 1, s);
      if (u) return u;
    }
    const a = o.validators;
    if (a === null) return;
    const m = t === 0 ? e.join(_e) : e.slice(t).join(_e),
      d = a.length;
    for (let u = 0; u < d; u++) {
      const C = a[u];
      if (C.validator(m)) return C.classGroupId;
    }
  },
  nr = (e) =>
    e.slice(1, -1).indexOf(":") === -1
      ? void 0
      : (() => {
          const t = e.slice(1, -1),
            o = t.indexOf(":"),
            r = t.slice(0, o);
          return r ? or + r : void 0;
        })(),
  ar = (e) => {
    const { theme: t, classGroups: o } = e;
    return ir(o, t);
  },
  ir = (e, t) => {
    const o = rt();
    for (const r in e) {
      const n = e[r];
      Ie(n, o, r, t);
    }
    return o;
  },
  Ie = (e, t, o, r) => {
    const n = e.length;
    for (let s = 0; s < n; s++) {
      const a = e[s];
      lr(a, t, o, r);
    }
  },
  lr = (e, t, o, r) => {
    if (typeof e == "string") {
      cr(e, t, o);
      return;
    }
    if (typeof e == "function") {
      dr(e, t, o, r);
      return;
    }
    ur(e, t, o, r);
  },
  cr = (e, t, o) => {
    const r = e === "" ? t : st(t, e);
    r.classGroupId = o;
  },
  dr = (e, t, o, r) => {
    if (fr(e)) {
      Ie(e(r), t, o, r);
      return;
    }
    (t.validators === null && (t.validators = []), t.validators.push(rr(o, e)));
  },
  ur = (e, t, o, r) => {
    const n = Object.entries(e),
      s = n.length;
    for (let a = 0; a < s; a++) {
      const [m, d] = n[a];
      Ie(d, st(t, m), o, r);
    }
  },
  st = (e, t) => {
    let o = e;
    const r = t.split(_e),
      n = r.length;
    for (let s = 0; s < n; s++) {
      const a = r[s];
      let m = o.nextPart.get(a);
      (m || ((m = rt()), o.nextPart.set(a, m)), (o = m));
    }
    return o;
  },
  fr = (e) => "isThemeGetter" in e && e.isThemeGetter === !0,
  mr = (e) => {
    if (e < 1) return { get: () => {}, set: () => {} };
    let t = 0,
      o = Object.create(null),
      r = Object.create(null);
    const n = (s, a) => {
      ((o[s] = a), t++, t > e && ((t = 0), (r = o), (o = Object.create(null))));
    };
    return {
      get(s) {
        let a = o[s];
        if (a !== void 0) return a;
        if ((a = r[s]) !== void 0) return (n(s, a), a);
      },
      set(s, a) {
        s in o ? (o[s] = a) : n(s, a);
      },
    };
  },
  Ne = "!",
  We = ":",
  gr = [],
  Ue = (e, t, o, r, n) => ({
    modifiers: e,
    hasImportantModifier: t,
    baseClassName: o,
    maybePostfixModifierPosition: r,
    isExternal: n,
  }),
  pr = (e) => {
    const { prefix: t, experimentalParseClassName: o } = e;
    let r = (n) => {
      const s = [];
      let a = 0,
        m = 0,
        d = 0,
        u;
      const C = n.length;
      for (let V = 0; V < C; V++) {
        const S = n[V];
        if (a === 0 && m === 0) {
          if (S === We) {
            (s.push(n.slice(d, V)), (d = V + 1));
            continue;
          }
          if (S === "/") {
            u = V;
            continue;
          }
        }
        S === "[" ? a++ : S === "]" ? a-- : S === "(" ? m++ : S === ")" && m--;
      }
      const _ = s.length === 0 ? n : n.slice(d);
      let R = _,
        A = !1;
      _.endsWith(Ne)
        ? ((R = _.slice(0, -1)), (A = !0))
        : _.startsWith(Ne) && ((R = _.slice(1)), (A = !0));
      const z = u && u > d ? u - d : void 0;
      return Ue(s, A, R, z);
    };
    if (t) {
      const n = t + We,
        s = r;
      r = (a) =>
        a.startsWith(n) ? s(a.slice(n.length)) : Ue(gr, !1, a, void 0, !0);
    }
    if (o) {
      const n = r;
      r = (s) => o({ className: s, parseClassName: n });
    }
    return r;
  },
  br = (e) => {
    const t = new Map();
    return (
      e.orderSensitiveModifiers.forEach((o, r) => {
        t.set(o, 1e6 + r);
      }),
      (o) => {
        const r = [];
        let n = [];
        for (let s = 0; s < o.length; s++) {
          const a = o[s],
            m = a[0] === "[",
            d = t.has(a);
          m || d
            ? (n.length > 0 && (n.sort(), r.push(...n), (n = [])), r.push(a))
            : n.push(a);
        }
        return (n.length > 0 && (n.sort(), r.push(...n)), r);
      }
    );
  },
  hr = (e) => ({
    cache: mr(e.cacheSize),
    parseClassName: pr(e),
    sortModifiers: br(e),
    ...sr(e),
  }),
  vr = /\s+/,
  yr = (e, t) => {
    const {
        parseClassName: o,
        getClassGroupId: r,
        getConflictingClassGroupIds: n,
        sortModifiers: s,
      } = t,
      a = [],
      m = e.trim().split(vr);
    let d = "";
    for (let u = m.length - 1; u >= 0; u -= 1) {
      const C = m[u],
        {
          isExternal: _,
          modifiers: R,
          hasImportantModifier: A,
          baseClassName: z,
          maybePostfixModifierPosition: V,
        } = o(C);
      if (_) {
        d = C + (d.length > 0 ? " " + d : d);
        continue;
      }
      let S = !!V,
        b = r(S ? z.substring(0, V) : z);
      if (!b) {
        if (!S) {
          d = C + (d.length > 0 ? " " + d : d);
          continue;
        }
        if (((b = r(z)), !b)) {
          d = C + (d.length > 0 ? " " + d : d);
          continue;
        }
        S = !1;
      }
      const j = R.length === 0 ? "" : R.length === 1 ? R[0] : s(R).join(":"),
        p = A ? j + Ne : j,
        x = p + b;
      if (a.indexOf(x) > -1) continue;
      a.push(x);
      const g = n(b, S);
      for (let P = 0; P < g.length; ++P) {
        const T = g[P];
        a.push(p + T);
      }
      d = C + (d.length > 0 ? " " + d : d);
    }
    return d;
  },
  wr = (...e) => {
    let t = 0,
      o,
      r,
      n = "";
    for (; t < e.length; )
      (o = e[t++]) && (r = nt(o)) && (n && (n += " "), (n += r));
    return n;
  },
  nt = (e) => {
    if (typeof e == "string") return e;
    let t,
      o = "";
    for (let r = 0; r < e.length; r++)
      e[r] && (t = nt(e[r])) && (o && (o += " "), (o += t));
    return o;
  },
  Re = (e, ...t) => {
    let o, r, n, s;
    const a = (d) => {
        const u = t.reduce((C, _) => _(C), e());
        return (
          (o = hr(u)),
          (r = o.cache.get),
          (n = o.cache.set),
          (s = m),
          m(d)
        );
      },
      m = (d) => {
        const u = r(d);
        if (u) return u;
        const C = yr(d, o);
        return (n(d, C), C);
      };
    return ((s = a), (...d) => s(wr(...d)));
  },
  kr = [],
  E = (e) => {
    const t = (o) => o[e] || kr;
    return ((t.isThemeGetter = !0), t);
  },
  at = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  it = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  xr = /^\d+\/\d+$/,
  Cr = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  _r =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  Ar = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  Sr = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  Mr =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  ae = (e) => xr.test(e),
  h = (e) => !!e && !Number.isNaN(Number(e)),
  Y = (e) => !!e && Number.isInteger(Number(e)),
  Me = (e) => e.endsWith("%") && h(e.slice(0, -1)),
  U = (e) => Cr.test(e),
  zr = () => !0,
  Tr = (e) => _r.test(e) && !Ar.test(e),
  lt = () => !1,
  Vr = (e) => Sr.test(e),
  Gr = (e) => Mr.test(e),
  Nr = (e) => !l(e) && !c(e),
  Rr = (e) => ie(e, ut, lt),
  l = (e) => at.test(e),
  q = (e) => ie(e, ft, Tr),
  ze = (e) => ie(e, Lr, h),
  De = (e) => ie(e, ct, lt),
  Er = (e) => ie(e, dt, Gr),
  ye = (e) => ie(e, mt, Vr),
  c = (e) => it.test(e),
  me = (e) => le(e, ft),
  Ir = (e) => le(e, jr),
  Ye = (e) => le(e, ct),
  Pr = (e) => le(e, ut),
  Or = (e) => le(e, dt),
  we = (e) => le(e, mt, !0),
  ie = (e, t, o) => {
    const r = at.exec(e);
    return r ? (r[1] ? t(r[1]) : o(r[2])) : !1;
  },
  le = (e, t, o = !1) => {
    const r = it.exec(e);
    return r ? (r[1] ? t(r[1]) : o) : !1;
  },
  ct = (e) => e === "position" || e === "percentage",
  dt = (e) => e === "image" || e === "url",
  ut = (e) => e === "length" || e === "size" || e === "bg-size",
  ft = (e) => e === "length",
  Lr = (e) => e === "number",
  jr = (e) => e === "family-name",
  mt = (e) => e === "shadow",
  Ee = () => {
    const e = E("color"),
      t = E("font"),
      o = E("text"),
      r = E("font-weight"),
      n = E("tracking"),
      s = E("leading"),
      a = E("breakpoint"),
      m = E("container"),
      d = E("spacing"),
      u = E("radius"),
      C = E("shadow"),
      _ = E("inset-shadow"),
      R = E("text-shadow"),
      A = E("drop-shadow"),
      z = E("blur"),
      V = E("perspective"),
      S = E("aspect"),
      b = E("ease"),
      j = E("animate"),
      p = () => [
        "auto",
        "avoid",
        "all",
        "avoid-page",
        "page",
        "left",
        "right",
        "column",
      ],
      x = () => [
        "center",
        "top",
        "bottom",
        "left",
        "right",
        "top-left",
        "left-top",
        "top-right",
        "right-top",
        "bottom-right",
        "right-bottom",
        "bottom-left",
        "left-bottom",
      ],
      g = () => [...x(), c, l],
      P = () => ["auto", "hidden", "clip", "visible", "scroll"],
      T = () => ["auto", "contain", "none"],
      f = () => [c, l, d],
      B = () => [ae, "full", "auto", ...f()],
      ce = () => [Y, "none", "subgrid", c, l],
      de = () => ["auto", { span: ["full", Y, c, l] }, Y, c, l],
      ne = () => [Y, "auto", c, l],
      pe = () => ["auto", "min", "max", "fr", c, l],
      w = () => [
        "start",
        "end",
        "center",
        "between",
        "around",
        "evenly",
        "stretch",
        "baseline",
        "center-safe",
        "end-safe",
      ],
      k = () => [
        "start",
        "end",
        "center",
        "stretch",
        "center-safe",
        "end-safe",
      ],
      y = () => ["auto", ...f()],
      v = () => [
        ae,
        "auto",
        "full",
        "dvw",
        "dvh",
        "lvw",
        "lvh",
        "svw",
        "svh",
        "min",
        "max",
        "fit",
        ...f(),
      ],
      i = () => [e, c, l],
      G = () => [...x(), Ye, De, { position: [c, l] }],
      L = () => ["no-repeat", { repeat: ["", "x", "y", "space", "round"] }],
      W = () => ["auto", "cover", "contain", Pr, Rr, { size: [c, l] }],
      O = () => [Me, me, q],
      M = () => ["", "none", "full", u, c, l],
      N = () => ["", h, me, q],
      F = () => ["solid", "dashed", "dotted", "double"],
      K = () => [
        "normal",
        "multiply",
        "screen",
        "overlay",
        "darken",
        "lighten",
        "color-dodge",
        "color-burn",
        "hard-light",
        "soft-light",
        "difference",
        "exclusion",
        "hue",
        "saturation",
        "color",
        "luminosity",
      ],
      I = () => [h, Me, Ye, De],
      Pe = () => ["", "none", z, c, l],
      be = () => ["none", h, c, l],
      he = () => ["none", h, c, l],
      Ae = () => [h, c, l],
      ve = () => [ae, "full", ...f()];
    return {
      cacheSize: 500,
      theme: {
        animate: ["spin", "ping", "pulse", "bounce"],
        aspect: ["video"],
        blur: [U],
        breakpoint: [U],
        color: [zr],
        container: [U],
        "drop-shadow": [U],
        ease: ["in", "out", "in-out"],
        font: [Nr],
        "font-weight": [
          "thin",
          "extralight",
          "light",
          "normal",
          "medium",
          "semibold",
          "bold",
          "extrabold",
          "black",
        ],
        "inset-shadow": [U],
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
        perspective: [
          "dramatic",
          "near",
          "normal",
          "midrange",
          "distant",
          "none",
        ],
        radius: [U],
        shadow: [U],
        spacing: ["px", h],
        text: [U],
        "text-shadow": [U],
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"],
      },
      classGroups: {
        aspect: [{ aspect: ["auto", "square", ae, l, c, S] }],
        container: ["container"],
        columns: [{ columns: [h, l, c, m] }],
        "break-after": [{ "break-after": p() }],
        "break-before": [{ "break-before": p() }],
        "break-inside": [
          { "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] },
        ],
        "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
        box: [{ box: ["border", "content"] }],
        display: [
          "block",
          "inline-block",
          "inline",
          "flex",
          "inline-flex",
          "table",
          "inline-table",
          "table-caption",
          "table-cell",
          "table-column",
          "table-column-group",
          "table-footer-group",
          "table-header-group",
          "table-row-group",
          "table-row",
          "flow-root",
          "grid",
          "inline-grid",
          "contents",
          "list-item",
          "hidden",
        ],
        sr: ["sr-only", "not-sr-only"],
        float: [{ float: ["right", "left", "none", "start", "end"] }],
        clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
        isolation: ["isolate", "isolation-auto"],
        "object-fit": [
          { object: ["contain", "cover", "fill", "none", "scale-down"] },
        ],
        "object-position": [{ object: g() }],
        overflow: [{ overflow: P() }],
        "overflow-x": [{ "overflow-x": P() }],
        "overflow-y": [{ "overflow-y": P() }],
        overscroll: [{ overscroll: T() }],
        "overscroll-x": [{ "overscroll-x": T() }],
        "overscroll-y": [{ "overscroll-y": T() }],
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        inset: [{ inset: B() }],
        "inset-x": [{ "inset-x": B() }],
        "inset-y": [{ "inset-y": B() }],
        start: [{ start: B() }],
        end: [{ end: B() }],
        top: [{ top: B() }],
        right: [{ right: B() }],
        bottom: [{ bottom: B() }],
        left: [{ left: B() }],
        visibility: ["visible", "invisible", "collapse"],
        z: [{ z: [Y, "auto", c, l] }],
        basis: [{ basis: [ae, "full", "auto", m, ...f()] }],
        "flex-direction": [
          { flex: ["row", "row-reverse", "col", "col-reverse"] },
        ],
        "flex-wrap": [{ flex: ["nowrap", "wrap", "wrap-reverse"] }],
        flex: [{ flex: [h, ae, "auto", "initial", "none", l] }],
        grow: [{ grow: ["", h, c, l] }],
        shrink: [{ shrink: ["", h, c, l] }],
        order: [{ order: [Y, "first", "last", "none", c, l] }],
        "grid-cols": [{ "grid-cols": ce() }],
        "col-start-end": [{ col: de() }],
        "col-start": [{ "col-start": ne() }],
        "col-end": [{ "col-end": ne() }],
        "grid-rows": [{ "grid-rows": ce() }],
        "row-start-end": [{ row: de() }],
        "row-start": [{ "row-start": ne() }],
        "row-end": [{ "row-end": ne() }],
        "grid-flow": [
          { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
        ],
        "auto-cols": [{ "auto-cols": pe() }],
        "auto-rows": [{ "auto-rows": pe() }],
        gap: [{ gap: f() }],
        "gap-x": [{ "gap-x": f() }],
        "gap-y": [{ "gap-y": f() }],
        "justify-content": [{ justify: [...w(), "normal"] }],
        "justify-items": [{ "justify-items": [...k(), "normal"] }],
        "justify-self": [{ "justify-self": ["auto", ...k()] }],
        "align-content": [{ content: ["normal", ...w()] }],
        "align-items": [{ items: [...k(), { baseline: ["", "last"] }] }],
        "align-self": [{ self: ["auto", ...k(), { baseline: ["", "last"] }] }],
        "place-content": [{ "place-content": w() }],
        "place-items": [{ "place-items": [...k(), "baseline"] }],
        "place-self": [{ "place-self": ["auto", ...k()] }],
        p: [{ p: f() }],
        px: [{ px: f() }],
        py: [{ py: f() }],
        ps: [{ ps: f() }],
        pe: [{ pe: f() }],
        pt: [{ pt: f() }],
        pr: [{ pr: f() }],
        pb: [{ pb: f() }],
        pl: [{ pl: f() }],
        m: [{ m: y() }],
        mx: [{ mx: y() }],
        my: [{ my: y() }],
        ms: [{ ms: y() }],
        me: [{ me: y() }],
        mt: [{ mt: y() }],
        mr: [{ mr: y() }],
        mb: [{ mb: y() }],
        ml: [{ ml: y() }],
        "space-x": [{ "space-x": f() }],
        "space-x-reverse": ["space-x-reverse"],
        "space-y": [{ "space-y": f() }],
        "space-y-reverse": ["space-y-reverse"],
        size: [{ size: v() }],
        w: [{ w: [m, "screen", ...v()] }],
        "min-w": [{ "min-w": [m, "screen", "none", ...v()] }],
        "max-w": [
          { "max-w": [m, "screen", "none", "prose", { screen: [a] }, ...v()] },
        ],
        h: [{ h: ["screen", "lh", ...v()] }],
        "min-h": [{ "min-h": ["screen", "lh", "none", ...v()] }],
        "max-h": [{ "max-h": ["screen", "lh", ...v()] }],
        "font-size": [{ text: ["base", o, me, q] }],
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        "font-style": ["italic", "not-italic"],
        "font-weight": [{ font: [r, c, ze] }],
        "font-stretch": [
          {
            "font-stretch": [
              "ultra-condensed",
              "extra-condensed",
              "condensed",
              "semi-condensed",
              "normal",
              "semi-expanded",
              "expanded",
              "extra-expanded",
              "ultra-expanded",
              Me,
              l,
            ],
          },
        ],
        "font-family": [{ font: [Ir, l, t] }],
        "fvn-normal": ["normal-nums"],
        "fvn-ordinal": ["ordinal"],
        "fvn-slashed-zero": ["slashed-zero"],
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        tracking: [{ tracking: [n, c, l] }],
        "line-clamp": [{ "line-clamp": [h, "none", c, ze] }],
        leading: [{ leading: [s, ...f()] }],
        "list-image": [{ "list-image": ["none", c, l] }],
        "list-style-position": [{ list: ["inside", "outside"] }],
        "list-style-type": [{ list: ["disc", "decimal", "none", c, l] }],
        "text-alignment": [
          { text: ["left", "center", "right", "justify", "start", "end"] },
        ],
        "placeholder-color": [{ placeholder: i() }],
        "text-color": [{ text: i() }],
        "text-decoration": [
          "underline",
          "overline",
          "line-through",
          "no-underline",
        ],
        "text-decoration-style": [{ decoration: [...F(), "wavy"] }],
        "text-decoration-thickness": [
          { decoration: [h, "from-font", "auto", c, q] },
        ],
        "text-decoration-color": [{ decoration: i() }],
        "underline-offset": [{ "underline-offset": [h, "auto", c, l] }],
        "text-transform": [
          "uppercase",
          "lowercase",
          "capitalize",
          "normal-case",
        ],
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
        indent: [{ indent: f() }],
        "vertical-align": [
          {
            align: [
              "baseline",
              "top",
              "middle",
              "bottom",
              "text-top",
              "text-bottom",
              "sub",
              "super",
              c,
              l,
            ],
          },
        ],
        whitespace: [
          {
            whitespace: [
              "normal",
              "nowrap",
              "pre",
              "pre-line",
              "pre-wrap",
              "break-spaces",
            ],
          },
        ],
        break: [{ break: ["normal", "words", "all", "keep"] }],
        wrap: [{ wrap: ["break-word", "anywhere", "normal"] }],
        hyphens: [{ hyphens: ["none", "manual", "auto"] }],
        content: [{ content: ["none", c, l] }],
        "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
        "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
        "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
        "bg-position": [{ bg: G() }],
        "bg-repeat": [{ bg: L() }],
        "bg-size": [{ bg: W() }],
        "bg-image": [
          {
            bg: [
              "none",
              {
                linear: [
                  { to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
                  Y,
                  c,
                  l,
                ],
                radial: ["", c, l],
                conic: [Y, c, l],
              },
              Or,
              Er,
            ],
          },
        ],
        "bg-color": [{ bg: i() }],
        "gradient-from-pos": [{ from: O() }],
        "gradient-via-pos": [{ via: O() }],
        "gradient-to-pos": [{ to: O() }],
        "gradient-from": [{ from: i() }],
        "gradient-via": [{ via: i() }],
        "gradient-to": [{ to: i() }],
        rounded: [{ rounded: M() }],
        "rounded-s": [{ "rounded-s": M() }],
        "rounded-e": [{ "rounded-e": M() }],
        "rounded-t": [{ "rounded-t": M() }],
        "rounded-r": [{ "rounded-r": M() }],
        "rounded-b": [{ "rounded-b": M() }],
        "rounded-l": [{ "rounded-l": M() }],
        "rounded-ss": [{ "rounded-ss": M() }],
        "rounded-se": [{ "rounded-se": M() }],
        "rounded-ee": [{ "rounded-ee": M() }],
        "rounded-es": [{ "rounded-es": M() }],
        "rounded-tl": [{ "rounded-tl": M() }],
        "rounded-tr": [{ "rounded-tr": M() }],
        "rounded-br": [{ "rounded-br": M() }],
        "rounded-bl": [{ "rounded-bl": M() }],
        "border-w": [{ border: N() }],
        "border-w-x": [{ "border-x": N() }],
        "border-w-y": [{ "border-y": N() }],
        "border-w-s": [{ "border-s": N() }],
        "border-w-e": [{ "border-e": N() }],
        "border-w-t": [{ "border-t": N() }],
        "border-w-r": [{ "border-r": N() }],
        "border-w-b": [{ "border-b": N() }],
        "border-w-l": [{ "border-l": N() }],
        "divide-x": [{ "divide-x": N() }],
        "divide-x-reverse": ["divide-x-reverse"],
        "divide-y": [{ "divide-y": N() }],
        "divide-y-reverse": ["divide-y-reverse"],
        "border-style": [{ border: [...F(), "hidden", "none"] }],
        "divide-style": [{ divide: [...F(), "hidden", "none"] }],
        "border-color": [{ border: i() }],
        "border-color-x": [{ "border-x": i() }],
        "border-color-y": [{ "border-y": i() }],
        "border-color-s": [{ "border-s": i() }],
        "border-color-e": [{ "border-e": i() }],
        "border-color-t": [{ "border-t": i() }],
        "border-color-r": [{ "border-r": i() }],
        "border-color-b": [{ "border-b": i() }],
        "border-color-l": [{ "border-l": i() }],
        "divide-color": [{ divide: i() }],
        "outline-style": [{ outline: [...F(), "none", "hidden"] }],
        "outline-offset": [{ "outline-offset": [h, c, l] }],
        "outline-w": [{ outline: ["", h, me, q] }],
        "outline-color": [{ outline: i() }],
        shadow: [{ shadow: ["", "none", C, we, ye] }],
        "shadow-color": [{ shadow: i() }],
        "inset-shadow": [{ "inset-shadow": ["none", _, we, ye] }],
        "inset-shadow-color": [{ "inset-shadow": i() }],
        "ring-w": [{ ring: N() }],
        "ring-w-inset": ["ring-inset"],
        "ring-color": [{ ring: i() }],
        "ring-offset-w": [{ "ring-offset": [h, q] }],
        "ring-offset-color": [{ "ring-offset": i() }],
        "inset-ring-w": [{ "inset-ring": N() }],
        "inset-ring-color": [{ "inset-ring": i() }],
        "text-shadow": [{ "text-shadow": ["none", R, we, ye] }],
        "text-shadow-color": [{ "text-shadow": i() }],
        opacity: [{ opacity: [h, c, l] }],
        "mix-blend": [{ "mix-blend": [...K(), "plus-darker", "plus-lighter"] }],
        "bg-blend": [{ "bg-blend": K() }],
        "mask-clip": [
          {
            "mask-clip": [
              "border",
              "padding",
              "content",
              "fill",
              "stroke",
              "view",
            ],
          },
          "mask-no-clip",
        ],
        "mask-composite": [
          { mask: ["add", "subtract", "intersect", "exclude"] },
        ],
        "mask-image-linear-pos": [{ "mask-linear": [h] }],
        "mask-image-linear-from-pos": [{ "mask-linear-from": I() }],
        "mask-image-linear-to-pos": [{ "mask-linear-to": I() }],
        "mask-image-linear-from-color": [{ "mask-linear-from": i() }],
        "mask-image-linear-to-color": [{ "mask-linear-to": i() }],
        "mask-image-t-from-pos": [{ "mask-t-from": I() }],
        "mask-image-t-to-pos": [{ "mask-t-to": I() }],
        "mask-image-t-from-color": [{ "mask-t-from": i() }],
        "mask-image-t-to-color": [{ "mask-t-to": i() }],
        "mask-image-r-from-pos": [{ "mask-r-from": I() }],
        "mask-image-r-to-pos": [{ "mask-r-to": I() }],
        "mask-image-r-from-color": [{ "mask-r-from": i() }],
        "mask-image-r-to-color": [{ "mask-r-to": i() }],
        "mask-image-b-from-pos": [{ "mask-b-from": I() }],
        "mask-image-b-to-pos": [{ "mask-b-to": I() }],
        "mask-image-b-from-color": [{ "mask-b-from": i() }],
        "mask-image-b-to-color": [{ "mask-b-to": i() }],
        "mask-image-l-from-pos": [{ "mask-l-from": I() }],
        "mask-image-l-to-pos": [{ "mask-l-to": I() }],
        "mask-image-l-from-color": [{ "mask-l-from": i() }],
        "mask-image-l-to-color": [{ "mask-l-to": i() }],
        "mask-image-x-from-pos": [{ "mask-x-from": I() }],
        "mask-image-x-to-pos": [{ "mask-x-to": I() }],
        "mask-image-x-from-color": [{ "mask-x-from": i() }],
        "mask-image-x-to-color": [{ "mask-x-to": i() }],
        "mask-image-y-from-pos": [{ "mask-y-from": I() }],
        "mask-image-y-to-pos": [{ "mask-y-to": I() }],
        "mask-image-y-from-color": [{ "mask-y-from": i() }],
        "mask-image-y-to-color": [{ "mask-y-to": i() }],
        "mask-image-radial": [{ "mask-radial": [c, l] }],
        "mask-image-radial-from-pos": [{ "mask-radial-from": I() }],
        "mask-image-radial-to-pos": [{ "mask-radial-to": I() }],
        "mask-image-radial-from-color": [{ "mask-radial-from": i() }],
        "mask-image-radial-to-color": [{ "mask-radial-to": i() }],
        "mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
        "mask-image-radial-size": [
          {
            "mask-radial": [
              { closest: ["side", "corner"], farthest: ["side", "corner"] },
            ],
          },
        ],
        "mask-image-radial-pos": [{ "mask-radial-at": x() }],
        "mask-image-conic-pos": [{ "mask-conic": [h] }],
        "mask-image-conic-from-pos": [{ "mask-conic-from": I() }],
        "mask-image-conic-to-pos": [{ "mask-conic-to": I() }],
        "mask-image-conic-from-color": [{ "mask-conic-from": i() }],
        "mask-image-conic-to-color": [{ "mask-conic-to": i() }],
        "mask-mode": [{ mask: ["alpha", "luminance", "match"] }],
        "mask-origin": [
          {
            "mask-origin": [
              "border",
              "padding",
              "content",
              "fill",
              "stroke",
              "view",
            ],
          },
        ],
        "mask-position": [{ mask: G() }],
        "mask-repeat": [{ mask: L() }],
        "mask-size": [{ mask: W() }],
        "mask-type": [{ "mask-type": ["alpha", "luminance"] }],
        "mask-image": [{ mask: ["none", c, l] }],
        filter: [{ filter: ["", "none", c, l] }],
        blur: [{ blur: Pe() }],
        brightness: [{ brightness: [h, c, l] }],
        contrast: [{ contrast: [h, c, l] }],
        "drop-shadow": [{ "drop-shadow": ["", "none", A, we, ye] }],
        "drop-shadow-color": [{ "drop-shadow": i() }],
        grayscale: [{ grayscale: ["", h, c, l] }],
        "hue-rotate": [{ "hue-rotate": [h, c, l] }],
        invert: [{ invert: ["", h, c, l] }],
        saturate: [{ saturate: [h, c, l] }],
        sepia: [{ sepia: ["", h, c, l] }],
        "backdrop-filter": [{ "backdrop-filter": ["", "none", c, l] }],
        "backdrop-blur": [{ "backdrop-blur": Pe() }],
        "backdrop-brightness": [{ "backdrop-brightness": [h, c, l] }],
        "backdrop-contrast": [{ "backdrop-contrast": [h, c, l] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": ["", h, c, l] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [h, c, l] }],
        "backdrop-invert": [{ "backdrop-invert": ["", h, c, l] }],
        "backdrop-opacity": [{ "backdrop-opacity": [h, c, l] }],
        "backdrop-saturate": [{ "backdrop-saturate": [h, c, l] }],
        "backdrop-sepia": [{ "backdrop-sepia": ["", h, c, l] }],
        "border-collapse": [{ border: ["collapse", "separate"] }],
        "border-spacing": [{ "border-spacing": f() }],
        "border-spacing-x": [{ "border-spacing-x": f() }],
        "border-spacing-y": [{ "border-spacing-y": f() }],
        "table-layout": [{ table: ["auto", "fixed"] }],
        caption: [{ caption: ["top", "bottom"] }],
        transition: [
          {
            transition: [
              "",
              "all",
              "colors",
              "opacity",
              "shadow",
              "transform",
              "none",
              c,
              l,
            ],
          },
        ],
        "transition-behavior": [{ transition: ["normal", "discrete"] }],
        duration: [{ duration: [h, "initial", c, l] }],
        ease: [{ ease: ["linear", "initial", b, c, l] }],
        delay: [{ delay: [h, c, l] }],
        animate: [{ animate: ["none", j, c, l] }],
        backface: [{ backface: ["hidden", "visible"] }],
        perspective: [{ perspective: [V, c, l] }],
        "perspective-origin": [{ "perspective-origin": g() }],
        rotate: [{ rotate: be() }],
        "rotate-x": [{ "rotate-x": be() }],
        "rotate-y": [{ "rotate-y": be() }],
        "rotate-z": [{ "rotate-z": be() }],
        scale: [{ scale: he() }],
        "scale-x": [{ "scale-x": he() }],
        "scale-y": [{ "scale-y": he() }],
        "scale-z": [{ "scale-z": he() }],
        "scale-3d": ["scale-3d"],
        skew: [{ skew: Ae() }],
        "skew-x": [{ "skew-x": Ae() }],
        "skew-y": [{ "skew-y": Ae() }],
        transform: [{ transform: [c, l, "", "none", "gpu", "cpu"] }],
        "transform-origin": [{ origin: g() }],
        "transform-style": [{ transform: ["3d", "flat"] }],
        translate: [{ translate: ve() }],
        "translate-x": [{ "translate-x": ve() }],
        "translate-y": [{ "translate-y": ve() }],
        "translate-z": [{ "translate-z": ve() }],
        "translate-none": ["translate-none"],
        accent: [{ accent: i() }],
        appearance: [{ appearance: ["none", "auto"] }],
        "caret-color": [{ caret: i() }],
        "color-scheme": [
          {
            scheme: [
              "normal",
              "dark",
              "light",
              "light-dark",
              "only-dark",
              "only-light",
            ],
          },
        ],
        cursor: [
          {
            cursor: [
              "auto",
              "default",
              "pointer",
              "wait",
              "text",
              "move",
              "help",
              "not-allowed",
              "none",
              "context-menu",
              "progress",
              "cell",
              "crosshair",
              "vertical-text",
              "alias",
              "copy",
              "no-drop",
              "grab",
              "grabbing",
              "all-scroll",
              "col-resize",
              "row-resize",
              "n-resize",
              "e-resize",
              "s-resize",
              "w-resize",
              "ne-resize",
              "nw-resize",
              "se-resize",
              "sw-resize",
              "ew-resize",
              "ns-resize",
              "nesw-resize",
              "nwse-resize",
              "zoom-in",
              "zoom-out",
              c,
              l,
            ],
          },
        ],
        "field-sizing": [{ "field-sizing": ["fixed", "content"] }],
        "pointer-events": [{ "pointer-events": ["auto", "none"] }],
        resize: [{ resize: ["none", "", "y", "x"] }],
        "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
        "scroll-m": [{ "scroll-m": f() }],
        "scroll-mx": [{ "scroll-mx": f() }],
        "scroll-my": [{ "scroll-my": f() }],
        "scroll-ms": [{ "scroll-ms": f() }],
        "scroll-me": [{ "scroll-me": f() }],
        "scroll-mt": [{ "scroll-mt": f() }],
        "scroll-mr": [{ "scroll-mr": f() }],
        "scroll-mb": [{ "scroll-mb": f() }],
        "scroll-ml": [{ "scroll-ml": f() }],
        "scroll-p": [{ "scroll-p": f() }],
        "scroll-px": [{ "scroll-px": f() }],
        "scroll-py": [{ "scroll-py": f() }],
        "scroll-ps": [{ "scroll-ps": f() }],
        "scroll-pe": [{ "scroll-pe": f() }],
        "scroll-pt": [{ "scroll-pt": f() }],
        "scroll-pr": [{ "scroll-pr": f() }],
        "scroll-pb": [{ "scroll-pb": f() }],
        "scroll-pl": [{ "scroll-pl": f() }],
        "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
        "snap-stop": [{ snap: ["normal", "always"] }],
        "snap-type": [{ snap: ["none", "x", "y", "both"] }],
        "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
        touch: [{ touch: ["auto", "none", "manipulation"] }],
        "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
        "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
        "touch-pz": ["touch-pinch-zoom"],
        select: [{ select: ["none", "text", "all", "auto"] }],
        "will-change": [
          { "will-change": ["auto", "scroll", "contents", "transform", c, l] },
        ],
        fill: [{ fill: ["none", ...i()] }],
        "stroke-w": [{ stroke: [h, me, q, ze] }],
        stroke: [{ stroke: ["none", ...i()] }],
        "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
      },
      conflictingClassGroups: {
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: [
          "inset-x",
          "inset-y",
          "start",
          "end",
          "top",
          "right",
          "bottom",
          "left",
        ],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        size: ["w", "h"],
        "font-size": ["leading"],
        "fvn-normal": [
          "fvn-ordinal",
          "fvn-slashed-zero",
          "fvn-figure",
          "fvn-spacing",
          "fvn-fraction",
        ],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        "line-clamp": ["display", "overflow"],
        rounded: [
          "rounded-s",
          "rounded-e",
          "rounded-t",
          "rounded-r",
          "rounded-b",
          "rounded-l",
          "rounded-ss",
          "rounded-se",
          "rounded-ee",
          "rounded-es",
          "rounded-tl",
          "rounded-tr",
          "rounded-br",
          "rounded-bl",
        ],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": [
          "border-w-x",
          "border-w-y",
          "border-w-s",
          "border-w-e",
          "border-w-t",
          "border-w-r",
          "border-w-b",
          "border-w-l",
        ],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": [
          "border-color-x",
          "border-color-y",
          "border-color-s",
          "border-color-e",
          "border-color-t",
          "border-color-r",
          "border-color-b",
          "border-color-l",
        ],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        translate: ["translate-x", "translate-y", "translate-none"],
        "translate-none": [
          "translate",
          "translate-x",
          "translate-y",
          "translate-z",
        ],
        "scroll-m": [
          "scroll-mx",
          "scroll-my",
          "scroll-ms",
          "scroll-me",
          "scroll-mt",
          "scroll-mr",
          "scroll-mb",
          "scroll-ml",
        ],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": [
          "scroll-px",
          "scroll-py",
          "scroll-ps",
          "scroll-pe",
          "scroll-pt",
          "scroll-pr",
          "scroll-pb",
          "scroll-pl",
        ],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"],
      },
      conflictingClassGroupModifiers: { "font-size": ["leading"] },
      orderSensitiveModifiers: [
        "*",
        "**",
        "after",
        "backdrop",
        "before",
        "details-content",
        "file",
        "first-letter",
        "first-line",
        "marker",
        "placeholder",
        "selection",
      ],
    };
  },
  Br = (
    e,
    {
      cacheSize: t,
      prefix: o,
      experimentalParseClassName: r,
      extend: n = {},
      override: s = {},
    },
  ) => (
    ge(e, "cacheSize", t),
    ge(e, "prefix", o),
    ge(e, "experimentalParseClassName", r),
    ke(e.theme, s.theme),
    ke(e.classGroups, s.classGroups),
    ke(e.conflictingClassGroups, s.conflictingClassGroups),
    ke(e.conflictingClassGroupModifiers, s.conflictingClassGroupModifiers),
    ge(e, "orderSensitiveModifiers", s.orderSensitiveModifiers),
    xe(e.theme, n.theme),
    xe(e.classGroups, n.classGroups),
    xe(e.conflictingClassGroups, n.conflictingClassGroups),
    xe(e.conflictingClassGroupModifiers, n.conflictingClassGroupModifiers),
    gt(e, n, "orderSensitiveModifiers"),
    e
  ),
  ge = (e, t, o) => {
    o !== void 0 && (e[t] = o);
  },
  ke = (e, t) => {
    if (t) for (const o in t) ge(e, o, t[o]);
  },
  xe = (e, t) => {
    if (t) for (const o in t) gt(e, t, o);
  },
  gt = (e, t, o) => {
    const r = t[o];
    r !== void 0 && (e[o] = e[o] ? e[o].concat(r) : r);
  },
  Fr = (e, ...t) =>
    typeof e == "function" ? Re(Ee, e, ...t) : Re(() => Br(Ee(), e), ...t),
  pt = Re(Ee);
var $r = (e) =>
    $(e)
      ? pt
      : Fr({
          ...e,
          extend: {
            theme: e.theme,
            classGroups: e.classGroups,
            conflictingClassGroupModifiers: e.conflictingClassGroupModifiers,
            conflictingClassGroups: e.conflictingClassGroups,
            ...e.extend,
          },
        }),
  Wr = (e, t) => {
    const o = Ce(e);
    return !o || !((t == null ? void 0 : t.twMerge) ?? !0)
      ? o
      : ((!D.cachedTwMerge || D.didTwMergeConfigChange) &&
          ((D.didTwMergeConfigChange = !1),
          (D.cachedTwMerge = $r(D.cachedTwMergeConfig))),
        D.cachedTwMerge(o) || void 0);
  },
  Ur =
    (...e) =>
    (t) =>
      Wr(e, t),
  { tv: bt } = er(Ur);
function se(...e) {
  return pt(Ft(e));
}
var Dr = H("<button><!></button>");
function Yr(e, t) {
  J(t, !0);
  const o = bt({
    base: "inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  });
  let r = Oe(t, "variant", 3, "default"),
    n = Oe(t, "size", 3, "default"),
    s = te(t, [
      "$$slots",
      "$$events",
      "$$legacy",
      "class",
      "variant",
      "size",
      "children",
    ]);
  var a = Dr();
  oe(a, (d) => ({ class: d, ...s }), [
    () => se(o({ variant: r(), size: n(), className: t.class })),
  ]);
  var m = Q(a);
  (re(m, () => t.children ?? Z), X(e, a), ee());
}
Yr.__docgen = {
  data: [
    {
      name: "variant",
      visibility: "public",
      keywords: [],
      kind: "let",
      type: {
        kind: "union",
        type: [
          {
            kind: "const",
            type: "string",
            value: "default",
            text: '"default"',
          },
          {
            kind: "const",
            type: "string",
            value: "destructive",
            text: '"destructive"',
          },
          {
            kind: "const",
            type: "string",
            value: "outline",
            text: '"outline"',
          },
          {
            kind: "const",
            type: "string",
            value: "secondary",
            text: '"secondary"',
          },
          { kind: "const", type: "string", value: "ghost", text: '"ghost"' },
          { kind: "const", type: "string", value: "link", text: '"link"' },
        ],
        text: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
      },
      static: !1,
      readonly: !1,
      defaultValue: '"default"',
    },
    {
      name: "size",
      visibility: "public",
      keywords: [],
      kind: "let",
      type: {
        kind: "union",
        type: [
          {
            kind: "const",
            type: "string",
            value: "default",
            text: '"default"',
          },
          { kind: "const", type: "string", value: "sm", text: '"sm"' },
          { kind: "const", type: "string", value: "lg", text: '"lg"' },
          { kind: "const", type: "string", value: "icon", text: '"icon"' },
        ],
        text: '"default" | "sm" | "lg" | "icon"',
      },
      static: !1,
      readonly: !1,
      defaultValue: '"default"',
    },
  ],
  name: "button.svelte",
};
bt({
  base: "inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
});
var Kr = H("<div><!></div>");
function qr(e, t) {
  J(t, !0);
  let o = te(t, ["$$slots", "$$events", "$$legacy", "class", "children"]);
  var r = Kr();
  oe(r, (s) => ({ class: s, ...o }), [
    () => se("bg-card text-card-foreground rounded-xl border shadow", t.class),
  ]);
  var n = Q(r);
  (re(n, () => t.children ?? Z), X(e, r), ee());
}
qr.__docgen = { data: [], name: "card.svelte" };
var Hr = H("<div><!></div>");
function Xr(e, t) {
  J(t, !0);
  let o = te(t, ["$$slots", "$$events", "$$legacy", "class", "children"]);
  var r = Hr();
  oe(r, (s) => ({ class: s, ...o }), [() => se("p-6 pt-0", t.class)]);
  var n = Q(r);
  (re(n, () => t.children ?? Z), X(e, r), ee());
}
Xr.__docgen = { data: [], name: "card-content.svelte" };
var Jr = H("<p><!></p>");
function Zr(e, t) {
  J(t, !0);
  let o = te(t, ["$$slots", "$$events", "$$legacy", "class", "children"]);
  var r = Jr();
  oe(r, (s) => ({ class: s, ...o }), [
    () => se("text-muted-foreground text-sm", t.class),
  ]);
  var n = Q(r);
  (re(n, () => t.children ?? Z), X(e, r), ee());
}
Zr.__docgen = { data: [], name: "card-description.svelte" };
var Qr = H("<div><!></div>");
function eo(e, t) {
  J(t, !0);
  let o = te(t, ["$$slots", "$$events", "$$legacy", "class", "children"]);
  var r = Qr();
  oe(r, (s) => ({ class: s, ...o }), [
    () => se("flex items-center p-6 pt-0", t.class),
  ]);
  var n = Q(r);
  (re(n, () => t.children ?? Z), X(e, r), ee());
}
eo.__docgen = { data: [], name: "card-footer.svelte" };
var to = H("<div><!></div>");
function ro(e, t) {
  J(t, !0);
  let o = te(t, ["$$slots", "$$events", "$$legacy", "class", "children"]);
  var r = to();
  oe(r, (s) => ({ class: s, ...o }), [
    () => se("flex flex-col space-y-1.5 p-6", t.class),
  ]);
  var n = Q(r);
  (re(n, () => t.children ?? Z), X(e, r), ee());
}
ro.__docgen = { data: [], name: "card-header.svelte" };
var oo = H("<h3><!></h3>");
function so(e, t) {
  J(t, !0);
  let o = te(t, ["$$slots", "$$events", "$$legacy", "class", "children"]);
  var r = oo();
  oe(r, (s) => ({ class: s, ...o }), [
    () => se("font-semibold leading-none tracking-tight", t.class),
  ]);
  var n = Q(r);
  (re(n, () => t.children ?? Z), X(e, r), ee());
}
so.__docgen = { data: [], name: "card-title.svelte" };
export { Yr as B, ro as C, so as a, Zr as b, Xr as c, eo as d, qr as e };
