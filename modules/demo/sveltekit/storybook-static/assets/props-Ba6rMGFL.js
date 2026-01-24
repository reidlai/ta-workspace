var H = Object.defineProperty;
var T = (t) => {
  throw TypeError(t);
};
var J = (t, e, r) =>
  e in t
    ? H(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r })
    : (t[e] = r);
var j = (t, e, r) => J(t, typeof e != "symbol" ? e + "" : e, r),
  K = (t, e, r) => e.has(t) || T("Cannot " + r);
var i = (t, e, r) => (
    K(t, e, "read from private field"),
    r ? r.call(t) : e.get(t)
  ),
  p = (t, e, r) =>
    e.has(t)
      ? T("Cannot add the same private member more than once")
      : e instanceof WeakSet
        ? e.add(t)
        : e.set(t, r),
  N = (t, e, r, s) => (
    K(t, e, "write to private field"),
    s ? s.call(t, r) : e.set(t, r),
    r
  );
import {
  p as Y,
  q as Z,
  v as D,
  w as Q,
  x as C,
  y as F,
  z as V,
  A as W,
  B as E,
  C as X,
  P as k,
  h as R,
  j as ee,
  D as te,
  F as re,
  o as se,
  G as ie,
  H as ne,
  I as fe,
  b as ae,
  J as oe,
  K as ue,
  L as ce,
  a as le,
  M as de,
  S as U,
  N as q,
  O as S,
} from "./runtime-DPDnKgMN.js";
var l, h, u, _, w, O, x;
class ge {
  constructor(e, r = !0) {
    j(this, "anchor");
    p(this, l, new Map());
    p(this, h, new Map());
    p(this, u, new Map());
    p(this, _, new Set());
    p(this, w, !0);
    p(this, O, () => {
      var e = Y;
      if (i(this, l).has(e)) {
        var r = i(this, l).get(e),
          s = i(this, h).get(r);
        if (s) (Z(s), i(this, _).delete(r));
        else {
          var n = i(this, u).get(r);
          n &&
            (i(this, h).set(r, n.effect),
            i(this, u).delete(r),
            n.fragment.lastChild.remove(),
            this.anchor.before(n.fragment),
            (s = n.effect));
        }
        for (const [f, c] of i(this, l)) {
          if ((i(this, l).delete(f), f === e)) break;
          const a = i(this, u).get(c);
          a && (D(a.effect), i(this, u).delete(c));
        }
        for (const [f, c] of i(this, h)) {
          if (f === r || i(this, _).has(f)) continue;
          const a = () => {
            if (Array.from(i(this, l).values()).includes(f)) {
              var v = document.createDocumentFragment();
              (V(c, v),
                v.append(C()),
                i(this, u).set(f, { effect: c, fragment: v }));
            } else D(c);
            (i(this, _).delete(f), i(this, h).delete(f));
          };
          i(this, w) || !s ? (i(this, _).add(f), Q(c, a, !1)) : a();
        }
      }
    });
    p(this, x, (e) => {
      i(this, l).delete(e);
      const r = Array.from(i(this, l).values());
      for (const [s, n] of i(this, u))
        r.includes(s) || (D(n.effect), i(this, u).delete(s));
    });
    ((this.anchor = e), N(this, w, r));
  }
  ensure(e, r) {
    var s = Y,
      n = W();
    if (r && !i(this, h).has(e) && !i(this, u).has(e))
      if (n) {
        var f = document.createDocumentFragment(),
          c = C();
        (f.append(c),
          i(this, u).set(e, { effect: F(() => r(c)), fragment: f }));
      } else
        i(this, h).set(
          e,
          F(() => r(this.anchor)),
        );
    if ((i(this, l).set(s, e), n)) {
      for (const [a, d] of i(this, h))
        a === e ? s.skipped_effects.delete(d) : s.skipped_effects.add(d);
      for (const [a, d] of i(this, u))
        a === e
          ? s.skipped_effects.delete(d.effect)
          : s.skipped_effects.add(d.effect);
      (s.oncommit(i(this, O)), s.ondiscard(i(this, x)));
    } else i(this, O).call(this);
  }
}
((l = new WeakMap()),
  (h = new WeakMap()),
  (u = new WeakMap()),
  (_ = new WeakMap()),
  (w = new WeakMap()),
  (O = new WeakMap()),
  (x = new WeakMap()));
let I = !1;
function he(t) {
  var e = I;
  try {
    return ((I = !1), [t(), I]);
  } finally {
    I = e;
  }
}
const pe = {
  get(t, e) {
    if (!t.exclude.includes(e)) return t.props[e];
  },
  set(t, e) {
    return !1;
  },
  getOwnPropertyDescriptor(t, e) {
    if (!t.exclude.includes(e) && e in t.props)
      return { enumerable: !0, configurable: !0, value: t.props[e] };
  },
  has(t, e) {
    return t.exclude.includes(e) ? !1 : e in t.props;
  },
  ownKeys(t) {
    return Reflect.ownKeys(t.props).filter((e) => !t.exclude.includes(e));
  },
};
function me(t, e, r) {
  return new Proxy({ props: t, exclude: e }, pe);
}
const _e = {
  get(t, e) {
    let r = t.props.length;
    for (; r--; ) {
      let s = t.props[r];
      if ((S(s) && (s = s()), typeof s == "object" && s !== null && e in s))
        return s[e];
    }
  },
  set(t, e, r) {
    let s = t.props.length;
    for (; s--; ) {
      let n = t.props[s];
      S(n) && (n = n());
      const f = E(n, e);
      if (f && f.set) return (f.set(r), !0);
    }
    return !1;
  },
  getOwnPropertyDescriptor(t, e) {
    let r = t.props.length;
    for (; r--; ) {
      let s = t.props[r];
      if ((S(s) && (s = s()), typeof s == "object" && s !== null && e in s)) {
        const n = E(s, e);
        return (n && !n.configurable && (n.configurable = !0), n);
      }
    }
  },
  has(t, e) {
    if (e === U || e === q) return !1;
    for (let r of t.props)
      if ((S(r) && (r = r()), r != null && e in r)) return !0;
    return !1;
  },
  ownKeys(t) {
    const e = [];
    for (let r of t.props)
      if ((S(r) && (r = r()), !!r)) {
        for (const s in r) e.includes(s) || e.push(s);
        for (const s of Object.getOwnPropertySymbols(r))
          e.includes(s) || e.push(s);
      }
    return e;
  },
};
function Pe(...t) {
  return new Proxy({ props: t }, _e);
}
function Se(t, e, r, s) {
  var B;
  var n = !le || (r & de) !== 0,
    f = (r & fe) !== 0,
    c = (r & ue) !== 0,
    a = s,
    d = !0,
    v = () => (d && ((d = !1), (a = c ? ae(s) : s)), a),
    g;
  if (f) {
    var z = U in t || q in t;
    g =
      ((B = E(t, e)) == null ? void 0 : B.set) ??
      (z && e in t ? (o) => (t[e] = o) : void 0);
  }
  var m,
    M = !1;
  (f ? ([m, M] = he(() => t[e])) : (m = t[e]),
    m === void 0 && s !== void 0 && ((m = v()), g && (n && X(), g(m))));
  var b;
  if (
    (n
      ? (b = () => {
          var o = t[e];
          return o === void 0 ? v() : ((d = !0), o);
        })
      : (b = () => {
          var o = t[e];
          return (o !== void 0 && (a = void 0), o === void 0 ? a : o);
        }),
    n && (r & k) === 0)
  )
    return b;
  if (g) {
    var G = t.$$legacy;
    return function (o, y) {
      return arguments.length > 0
        ? ((!n || !y || G || M) && g(y ? b() : o), o)
        : b();
    };
  }
  var A = !1,
    P = ((r & oe) !== 0 ? ee : te)(() => ((A = !1), b()));
  f && R(P);
  var $ = ie;
  return function (o, y) {
    if (arguments.length > 0) {
      const L = y ? R(P) : n && f ? re(o) : o;
      return (se(P, L), (A = !0), a !== void 0 && (a = L), o);
    }
    return (ce && A) || ($.f & ne) !== 0 ? P.v : R(P);
  };
}
export { ge as B, Se as p, me as r, Pe as s };
