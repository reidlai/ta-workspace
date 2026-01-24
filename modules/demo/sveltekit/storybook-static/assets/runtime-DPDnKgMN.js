var $t = Object.defineProperty;
var ft = (e) => {
  throw TypeError(e);
};
var zt = (e, t, n) =>
  t in e
    ? $t(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
    : (e[t] = n);
var G = (e, t, n) => zt(e, typeof t != "symbol" ? t + "" : t, n),
  qe = (e, t, n) => t.has(e) || ft("Cannot " + n);
var w = (e, t, n) => (
    qe(e, t, "read from private field"),
    n ? n.call(e) : t.get(e)
  ),
  q = (e, t, n) =>
    t.has(e)
      ? ft("Cannot add the same private member more than once")
      : t instanceof WeakSet
        ? t.add(e)
        : t.set(e, n),
  ie = (e, t, n, r) => (
    qe(e, t, "write to private field"),
    r ? r.call(e, n) : t.set(e, n),
    n
  ),
  k = (e, t, n) => (qe(e, t, "access private method"), n);
let De = !1,
  Zt = !1;
function Ln() {
  De = !0;
}
const qn = 1,
  Un = 2,
  Yn = 16,
  Bn = 1,
  Gn = 2,
  Hn = 4,
  Kn = 8,
  Vn = 16,
  $n = 1,
  zn = 2,
  A = Symbol(),
  Zn = "http://www.w3.org/1999/xhtml",
  Wn = "@attach",
  Ye = !1;
var Wt = Array.isArray,
  Xt = Array.prototype.indexOf,
  Xn = Array.from,
  Jn = Object.defineProperty,
  me = Object.getOwnPropertyDescriptor,
  Jt = Object.getOwnPropertyDescriptors,
  Qt = Object.prototype,
  en = Array.prototype,
  _t = Object.getPrototypeOf,
  st = Object.isExtensible;
function Qn(e) {
  return typeof e == "function";
}
const er = () => {};
function tr(e) {
  return e();
}
function tn(e) {
  for (var t = 0; t < e.length; t++) e[t]();
}
function vt() {
  var e,
    t,
    n = new Promise((r, f) => {
      ((e = r), (t = f));
    });
  return { promise: n, resolve: e, reject: t };
}
function nr(e, t, n = !1) {
  return e === void 0 ? (n ? t() : t) : e;
}
const T = 2,
  Ze = 4,
  Me = 8,
  dt = 1 << 24,
  U = 16,
  Y = 32,
  fe = 64,
  We = 128,
  N = 512,
  m = 1024,
  C = 2048,
  I = 4096,
  L = 8192,
  V = 16384,
  Xe = 32768,
  Re = 65536,
  it = 1 << 17,
  pt = 1 << 18,
  Ae = 1 << 19,
  ht = 1 << 20,
  rr = 1 << 25,
  te = 32768,
  Be = 1 << 21,
  Je = 1 << 22,
  $ = 1 << 23,
  J = Symbol("$state"),
  fr = Symbol("legacy props"),
  sr = Symbol(""),
  le = new (class extends Error {
    constructor() {
      super(...arguments);
      G(this, "name", "StaleReactionError");
      G(
        this,
        "message",
        "The reaction that called `getAbortSignal()` was re-run or destroyed",
      );
    }
  })();
function nn(e) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function rn() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function fn(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function sn() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function ln(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function an() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function lr(e) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function un() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function on() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function cn() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function ar() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
function wt(e) {
  return e === this.v;
}
function _n(e, t) {
  return e != e
    ? t == t
    : e !== t || (e !== null && typeof e == "object") || typeof e == "function";
}
function yt(e) {
  return !_n(e, this.v);
}
let y = null;
function Ce(e) {
  y = e;
}
function ur(e) {
  return Et().get(e);
}
function or(e, t) {
  return (Et().set(e, t), t);
}
function cr(e, t = !1, n) {
  y = {
    p: y,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    l: De && !t ? { s: null, u: null, $: [] } : null,
  };
}
function _r(e) {
  var t = y,
    n = t.e;
  if (n !== null) {
    t.e = null;
    for (var r of n) It(r);
  }
  return ((t.i = !0), (y = t.p), {});
}
function Se() {
  return !De || (y !== null && y.l === null);
}
function Et(e) {
  return (y === null && nn(), y.c ?? (y.c = new Map(vn(y) || void 0)));
}
function vn(e) {
  let t = e.p;
  for (; t !== null; ) {
    const n = t.c;
    if (n !== null) return n;
    t = t.p;
  }
  return null;
}
let ae = [];
function dn() {
  var e = ae;
  ((ae = []), tn(e));
}
function pn(e) {
  if (ae.length === 0) {
    var t = ae;
    queueMicrotask(() => {
      t === ae && dn();
    });
  }
  ae.push(e);
}
function hn(e) {
  var t = h;
  if (t === null) return ((_.f |= $), e);
  if ((t.f & Xe) === 0) {
    if ((t.f & We) === 0) throw e;
    t.b.error(e);
  } else Oe(e, t);
}
function Oe(e, t) {
  for (; t !== null; ) {
    if ((t.f & We) !== 0)
      try {
        t.b.error(e);
        return;
      } catch (n) {
        e = n;
      }
    t = t.parent;
  }
  throw e;
}
const be = new Set();
let p = null,
  E = null,
  M = [],
  Qe = null,
  Ge = !1;
var oe, ce, W, X, Te, _e, ve, g, He, ye, Ke, mt, gt;
const Ie = class Ie {
  constructor() {
    q(this, g);
    G(this, "committed", !1);
    G(this, "current", new Map());
    G(this, "previous", new Map());
    q(this, oe, new Set());
    q(this, ce, new Set());
    q(this, W, 0);
    q(this, X, 0);
    q(this, Te, null);
    q(this, _e, new Set());
    q(this, ve, new Set());
    G(this, "skipped_effects", new Set());
    G(this, "is_fork", !1);
  }
  is_deferred() {
    return this.is_fork || w(this, X) > 0;
  }
  process(t) {
    var r;
    ((M = []), this.apply());
    var n = { parent: null, effect: null, effects: [], render_effects: [] };
    for (const f of t) k(this, g, He).call(this, f, n);
    (this.is_fork || k(this, g, mt).call(this),
      this.is_deferred()
        ? (k(this, g, ye).call(this, n.effects),
          k(this, g, ye).call(this, n.render_effects))
        : ((p = null),
          lt(n.render_effects),
          lt(n.effects),
          (r = w(this, Te)) == null || r.resolve()),
      (E = null));
  }
  capture(t, n) {
    (this.previous.has(t) || this.previous.set(t, n),
      (t.f & $) === 0 &&
        (this.current.set(t, t.v), E == null || E.set(t, t.v)));
  }
  activate() {
    ((p = this), this.apply());
  }
  deactivate() {
    p === this && ((p = null), (E = null));
  }
  flush() {
    if ((this.activate(), M.length > 0)) {
      if ((wn(), p !== null && p !== this)) return;
    } else w(this, W) === 0 && this.process([]);
    this.deactivate();
  }
  discard() {
    for (const t of w(this, ce)) t(this);
    w(this, ce).clear();
  }
  increment(t) {
    (ie(this, W, w(this, W) + 1), t && ie(this, X, w(this, X) + 1));
  }
  decrement(t) {
    (ie(this, W, w(this, W) - 1),
      t && ie(this, X, w(this, X) - 1),
      this.revive());
  }
  revive() {
    for (const t of w(this, _e)) (w(this, ve).delete(t), x(t, C), ne(t));
    for (const t of w(this, ve)) (x(t, I), ne(t));
    this.flush();
  }
  oncommit(t) {
    w(this, oe).add(t);
  }
  ondiscard(t) {
    w(this, ce).add(t);
  }
  settled() {
    return (w(this, Te) ?? ie(this, Te, vt())).promise;
  }
  static ensure() {
    if (p === null) {
      const t = (p = new Ie());
      (be.add(p),
        Ie.enqueue(() => {
          p === t && t.flush();
        }));
    }
    return p;
  }
  static enqueue(t) {
    pn(t);
  }
  apply() {}
};
((oe = new WeakMap()),
  (ce = new WeakMap()),
  (W = new WeakMap()),
  (X = new WeakMap()),
  (Te = new WeakMap()),
  (_e = new WeakMap()),
  (ve = new WeakMap()),
  (g = new WeakSet()),
  (He = function (t, n) {
    var o;
    t.f ^= m;
    for (var r = t.first; r !== null; ) {
      var f = r.f,
        s = (f & (Y | fe)) !== 0,
        l = s && (f & m) !== 0,
        u = l || (f & L) !== 0 || this.skipped_effects.has(r);
      if (
        ((r.f & We) !== 0 &&
          (o = r.b) != null &&
          o.is_pending() &&
          (n = { parent: n, effect: r, effects: [], render_effects: [] }),
        !u && r.fn !== null)
      ) {
        s
          ? (r.f ^= m)
          : (f & Ze) !== 0
            ? n.effects.push(r)
            : we(r) && ((r.f & U) !== 0 && w(this, _e).add(r), pe(r));
        var a = r.first;
        if (a !== null) {
          r = a;
          continue;
        }
      }
      var i = r.parent;
      for (r = r.next; r === null && i !== null; )
        (i === n.effect &&
          (k(this, g, ye).call(this, n.effects),
          k(this, g, ye).call(this, n.render_effects),
          (n = n.parent)),
          (r = i.next),
          (i = i.parent));
    }
  }),
  (ye = function (t) {
    for (const n of t)
      ((n.f & C) !== 0
        ? w(this, _e).add(n)
        : (n.f & I) !== 0 && w(this, ve).add(n),
        k(this, g, Ke).call(this, n.deps),
        x(n, m));
  }),
  (Ke = function (t) {
    if (t !== null)
      for (const n of t)
        (n.f & T) === 0 ||
          (n.f & te) === 0 ||
          ((n.f ^= te), k(this, g, Ke).call(this, n.deps));
  }),
  (mt = function () {
    if (w(this, X) === 0) {
      for (const t of w(this, oe)) t();
      w(this, oe).clear();
    }
    w(this, W) === 0 && k(this, g, gt).call(this);
  }),
  (gt = function () {
    var s;
    if (be.size > 1) {
      this.previous.clear();
      var t = E,
        n = !0,
        r = { parent: null, effect: null, effects: [], render_effects: [] };
      for (const l of be) {
        if (l === this) {
          n = !1;
          continue;
        }
        const u = [];
        for (const [i, o] of this.current) {
          if (l.current.has(i))
            if (n && o !== l.current.get(i)) l.current.set(i, o);
            else continue;
          u.push(i);
        }
        if (u.length === 0) continue;
        const a = [...l.current.keys()].filter((i) => !this.current.has(i));
        if (a.length > 0) {
          var f = M;
          M = [];
          const i = new Set(),
            o = new Map();
          for (const c of u) xt(c, a, i, o);
          if (M.length > 0) {
            ((p = l), l.apply());
            for (const c of M) k((s = l), g, He).call(s, c, r);
            l.deactivate();
          }
          M = f;
        }
      }
      ((p = null), (E = t));
    }
    ((this.committed = !0), be.delete(this));
  }));
let ge = Ie;
function wn() {
  var e = Q;
  Ge = !0;
  var t = null;
  try {
    var n = 0;
    for (Fe(!0); M.length > 0; ) {
      var r = ge.ensure();
      if (n++ > 1e3) {
        var f, s;
        yn();
      }
      (r.process(M), z.clear());
    }
  } finally {
    ((Ge = !1), Fe(e), (Qe = null));
  }
}
function yn() {
  try {
    an();
  } catch (e) {
    Oe(e, Qe);
  }
}
let F = null;
function lt(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if (
        (r.f & (V | L)) === 0 &&
        we(r) &&
        ((F = new Set()),
        pe(r),
        r.deps === null &&
          r.first === null &&
          r.nodes === null &&
          (r.teardown === null && r.ac === null ? Lt(r) : (r.fn = null)),
        (F == null ? void 0 : F.size) > 0)
      ) {
        z.clear();
        for (const f of F) {
          if ((f.f & (V | L)) !== 0) continue;
          const s = [f];
          let l = f.parent;
          for (; l !== null; )
            (F.has(l) && (F.delete(l), s.push(l)), (l = l.parent));
          for (let u = s.length - 1; u >= 0; u--) {
            const a = s[u];
            (a.f & (V | L)) === 0 && pe(a);
          }
        }
        F.clear();
      }
    }
    F = null;
  }
}
function xt(e, t, n, r) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const f of e.reactions) {
      const s = f.f;
      (s & T) !== 0
        ? xt(f, t, n, r)
        : (s & (Je | U)) !== 0 &&
          (s & C) === 0 &&
          Tt(f, t, r) &&
          (x(f, C), ne(f));
    }
}
function Tt(e, t, n) {
  const r = n.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const f of e.deps) {
      if (t.includes(f)) return !0;
      if ((f.f & T) !== 0 && Tt(f, t, n)) return (n.set(f, !0), !0);
    }
  return (n.set(e, !1), !1);
}
function ne(e) {
  for (var t = (Qe = e); t.parent !== null; ) {
    t = t.parent;
    var n = t.f;
    if (Ge && t === h && (n & U) !== 0 && (n & pt) === 0) return;
    if ((n & (fe | Y)) !== 0) {
      if ((n & m) === 0) return;
      t.f ^= m;
    }
  }
  M.push(t);
}
function En(e, t, n, r) {
  const f = Se() ? At : xn;
  if (n.length === 0 && e.length === 0) {
    r(t.map(f));
    return;
  }
  var s = p,
    l = h,
    u = mn();
  function a() {
    Promise.all(n.map((i) => gn(i)))
      .then((i) => {
        u();
        try {
          r([...t.map(f), ...i]);
        } catch (o) {
          (l.f & V) === 0 && Oe(o, l);
        }
        (s == null || s.deactivate(), Pe());
      })
      .catch((i) => {
        Oe(i, l);
      });
  }
  e.length > 0
    ? Promise.all(e).then(() => {
        u();
        try {
          return a();
        } finally {
          (s == null || s.deactivate(), Pe());
        }
      })
    : a();
}
function mn() {
  var e = h,
    t = _,
    n = y,
    r = p;
  return function (s = !0) {
    (de(e), Z(t), Ce(n), s && (r == null || r.activate()));
  };
}
function Pe() {
  (de(null), Z(null), Ce(null));
}
function At(e) {
  var t = T | C,
    n = _ !== null && (_.f & T) !== 0 ? _ : null;
  return (
    h !== null && (h.f |= Ae),
    {
      ctx: y,
      deps: null,
      effects: null,
      equals: wt,
      f: t,
      fn: e,
      reactions: null,
      rv: 0,
      v: A,
      wv: 0,
      parent: n ?? h,
      ac: null,
    }
  );
}
function gn(e, t) {
  let n = h;
  n === null && rn();
  var r = n.b,
    f = void 0,
    s = tt(A),
    l = !_,
    u = new Map();
  return (
    Cn(() => {
      var d;
      var a = vt();
      f = a.promise;
      try {
        Promise.resolve(e())
          .then(a.resolve, a.reject)
          .then(() => {
            (i === p && i.committed && i.deactivate(), Pe());
          });
      } catch (v) {
        (a.reject(v), Pe());
      }
      var i = p;
      if (l) {
        var o = !r.is_pending();
        (r.update_pending_count(1),
          i.increment(o),
          (d = u.get(i)) == null || d.reject(le),
          u.delete(i),
          u.set(i, a));
      }
      const c = (v, S = void 0) => {
        if ((i.activate(), S)) S !== le && ((s.f |= $), $e(s, S));
        else {
          ((s.f & $) !== 0 && (s.f ^= $), $e(s, v));
          for (const [B, se] of u) {
            if ((u.delete(B), B === i)) break;
            se.reject(le);
          }
        }
        l && (r.update_pending_count(-1), i.decrement(o));
      };
      a.promise.then(c, (v) => c(null, v || "unknown"));
    }),
    Rn(() => {
      for (const a of u.values()) a.reject(le);
    }),
    new Promise((a) => {
      function i(o) {
        function c() {
          o === f ? a(s) : i(f);
        }
        o.then(c, c);
      }
      i(f);
    })
  );
}
function xn(e) {
  const t = At(e);
  return ((t.equals = yt), t);
}
function St(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1) re(t[n]);
  }
}
function Tn(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & T) === 0) return (t.f & V) === 0 ? t : null;
    t = t.parent;
  }
  return null;
}
function et(e) {
  var t,
    n = h;
  de(Tn(e));
  try {
    ((e.f &= ~te), St(e), (t = Ht(e)));
  } finally {
    de(n);
  }
  return t;
}
function bt(e) {
  var t = et(e);
  if (
    (e.equals(t) || ((p != null && p.is_fork) || (e.v = t), (e.wv = Bt())), !he)
  )
    if (E !== null) (ke() || (p != null && p.is_fork)) && E.set(e, t);
    else {
      var n = (e.f & N) === 0 ? I : m;
      x(e, n);
    }
}
let Ve = new Set();
const z = new Map();
let Rt = !1;
function tt(e, t) {
  var n = { f: 0, v: e, reactions: null, equals: wt, rv: 0, wv: 0 };
  return n;
}
function H(e, t) {
  const n = tt(e);
  return (Fn(n), n);
}
function vr(e, t = !1, n = !0) {
  var f;
  const r = tt(e);
  return (
    t || (r.equals = yt),
    De &&
      n &&
      y !== null &&
      y.l !== null &&
      ((f = y.l).s ?? (f.s = [])).push(r),
    r
  );
}
function K(e, t, n = !1) {
  _ !== null &&
    (!j || (_.f & it) !== 0) &&
    Se() &&
    (_.f & (T | U | Je | it)) !== 0 &&
    !(R != null && R.includes(e)) &&
    cn();
  let r = n ? Ee(t) : t;
  return $e(e, r);
}
function $e(e, t) {
  if (!e.equals(t)) {
    var n = e.v;
    (he ? z.set(e, t) : z.set(e, n), (e.v = t));
    var r = ge.ensure();
    (r.capture(e, n),
      (e.f & T) !== 0 &&
        ((e.f & C) !== 0 && et(e), x(e, (e.f & N) !== 0 ? m : I)),
      (e.wv = Bt()),
      Ct(e, C),
      Se() &&
        h !== null &&
        (h.f & m) !== 0 &&
        (h.f & (Y | fe)) === 0 &&
        (P === null ? Nn([e]) : P.push(e)),
      !r.is_fork && Ve.size > 0 && !Rt && An());
  }
  return t;
}
function An() {
  Rt = !1;
  var e = Q;
  Fe(!0);
  const t = Array.from(Ve);
  try {
    for (const n of t) ((n.f & m) !== 0 && x(n, I), we(n) && pe(n));
  } finally {
    Fe(e);
  }
  Ve.clear();
}
function dr(e, t = 1) {
  var n = ue(e),
    r = t === 1 ? n++ : n--;
  return (K(e, n), r);
}
function Ue(e) {
  K(e, e.v + 1);
}
function Ct(e, t) {
  var n = e.reactions;
  if (n !== null)
    for (var r = Se(), f = n.length, s = 0; s < f; s++) {
      var l = n[s],
        u = l.f;
      if (!(!r && l === h)) {
        var a = (u & C) === 0;
        if ((a && x(l, t), (u & T) !== 0)) {
          var i = l;
          (E == null || E.delete(i),
            (u & te) === 0 && (u & N && (l.f |= te), Ct(i, I)));
        } else a && ((u & U) !== 0 && F !== null && F.add(l), ne(l));
      }
    }
}
function Ee(e) {
  if (typeof e != "object" || e === null || J in e) return e;
  const t = _t(e);
  if (t !== Qt && t !== en) return e;
  var n = new Map(),
    r = Wt(e),
    f = H(0),
    s = ee,
    l = (u) => {
      if (ee === s) return u();
      var a = _,
        i = ee;
      (Z(null), ct(s));
      var o = u();
      return (Z(a), ct(i), o);
    };
  return (
    r && n.set("length", H(e.length)),
    new Proxy(e, {
      defineProperty(u, a, i) {
        (!("value" in i) ||
          i.configurable === !1 ||
          i.enumerable === !1 ||
          i.writable === !1) &&
          un();
        var o = n.get(a);
        return (
          o === void 0
            ? (o = l(() => {
                var c = H(i.value);
                return (n.set(a, c), c);
              }))
            : K(o, i.value, !0),
          !0
        );
      },
      deleteProperty(u, a) {
        var i = n.get(a);
        if (i === void 0) {
          if (a in u) {
            const o = l(() => H(A));
            (n.set(a, o), Ue(f));
          }
        } else (K(i, A), Ue(f));
        return !0;
      },
      get(u, a, i) {
        var v;
        if (a === J) return e;
        var o = n.get(a),
          c = a in u;
        if (
          (o === void 0 &&
            (!c || ((v = me(u, a)) != null && v.writable)) &&
            ((o = l(() => {
              var S = Ee(c ? u[a] : A),
                B = H(S);
              return B;
            })),
            n.set(a, o)),
          o !== void 0)
        ) {
          var d = ue(o);
          return d === A ? void 0 : d;
        }
        return Reflect.get(u, a, i);
      },
      getOwnPropertyDescriptor(u, a) {
        var i = Reflect.getOwnPropertyDescriptor(u, a);
        if (i && "value" in i) {
          var o = n.get(a);
          o && (i.value = ue(o));
        } else if (i === void 0) {
          var c = n.get(a),
            d = c == null ? void 0 : c.v;
          if (c !== void 0 && d !== A)
            return { enumerable: !0, configurable: !0, value: d, writable: !0 };
        }
        return i;
      },
      has(u, a) {
        var d;
        if (a === J) return !0;
        var i = n.get(a),
          o = (i !== void 0 && i.v !== A) || Reflect.has(u, a);
        if (
          i !== void 0 ||
          (h !== null && (!o || ((d = me(u, a)) != null && d.writable)))
        ) {
          i === void 0 &&
            ((i = l(() => {
              var v = o ? Ee(u[a]) : A,
                S = H(v);
              return S;
            })),
            n.set(a, i));
          var c = ue(i);
          if (c === A) return !1;
        }
        return o;
      },
      set(u, a, i, o) {
        var rt;
        var c = n.get(a),
          d = a in u;
        if (r && a === "length")
          for (var v = i; v < c.v; v += 1) {
            var S = n.get(v + "");
            S !== void 0
              ? K(S, A)
              : v in u && ((S = l(() => H(A))), n.set(v + "", S));
          }
        if (c === void 0)
          (!d || ((rt = me(u, a)) != null && rt.writable)) &&
            ((c = l(() => H(void 0))), K(c, Ee(i)), n.set(a, c));
        else {
          d = c.v !== A;
          var B = l(() => Ee(i));
          K(c, B);
        }
        var se = Reflect.getOwnPropertyDescriptor(u, a);
        if ((se != null && se.set && se.set.call(o, i), !d)) {
          if (r && typeof a == "string") {
            var nt = n.get("length"),
              Le = Number(a);
            Number.isInteger(Le) && Le >= nt.v && K(nt, Le + 1);
          }
          Ue(f);
        }
        return !0;
      },
      ownKeys(u) {
        ue(f);
        var a = Reflect.ownKeys(u).filter((c) => {
          var d = n.get(c);
          return d === void 0 || d.v !== A;
        });
        for (var [i, o] of n) o.v !== A && !(i in u) && a.push(i);
        return a;
      },
      setPrototypeOf() {
        on();
      },
    })
  );
}
function at(e) {
  try {
    if (e !== null && typeof e == "object" && J in e) return e[J];
  } catch {}
  return e;
}
function pr(e, t) {
  return Object.is(at(e), at(t));
}
var ut, Sn, Ot, Pt;
function hr() {
  if (ut === void 0) {
    ((ut = window), (Sn = /Firefox/.test(navigator.userAgent)));
    var e = Element.prototype,
      t = Node.prototype,
      n = Text.prototype;
    ((Ot = me(t, "firstChild").get),
      (Pt = me(t, "nextSibling").get),
      st(e) &&
        ((e.__click = void 0),
        (e.__className = void 0),
        (e.__attributes = null),
        (e.__style = void 0),
        (e.__e = void 0)),
      st(n) && (n.__t = void 0));
  }
}
function wr(e = "") {
  return document.createTextNode(e);
}
function kt(e) {
  return Ot.call(e);
}
function je(e) {
  return Pt.call(e);
}
function yr(e, t) {
  return kt(e);
}
function Er(e, t = !1) {
  {
    var n = kt(e);
    return n instanceof Comment && n.data === "" ? je(n) : n;
  }
}
function mr(e, t = 1, n = !1) {
  let r = e;
  for (; t--; ) r = je(r);
  return r;
}
function gr(e) {
  e.textContent = "";
}
function xr() {
  return !1;
}
function Ft(e) {
  var t = _,
    n = h;
  (Z(null), de(null));
  try {
    return e();
  } finally {
    (Z(t), de(n));
  }
}
function Nt(e) {
  (h === null && (_ === null && ln(), sn()), he && fn());
}
function bn(e, t) {
  var n = t.last;
  n === null
    ? (t.last = t.first = e)
    : ((n.next = e), (e.prev = n), (t.last = e));
}
function D(e, t, n) {
  var r = h;
  r !== null && (r.f & L) !== 0 && (e |= L);
  var f = {
    ctx: y,
    deps: null,
    nodes: null,
    f: e | C | N,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: r,
    b: r && r.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null,
  };
  if (n)
    try {
      (pe(f), (f.f |= Xe));
    } catch (u) {
      throw (re(f), u);
    }
  else t !== null && ne(f);
  var s = f;
  if (
    (n &&
      s.deps === null &&
      s.teardown === null &&
      s.nodes === null &&
      s.first === s.last &&
      (s.f & Ae) === 0 &&
      ((s = s.first),
      (e & U) !== 0 && (e & Re) !== 0 && s !== null && (s.f |= Re)),
    s !== null &&
      ((s.parent = r),
      r !== null && bn(s, r),
      _ !== null && (_.f & T) !== 0 && (e & fe) === 0))
  ) {
    var l = _;
    (l.effects ?? (l.effects = [])).push(s);
  }
  return f;
}
function ke() {
  return _ !== null && !j;
}
function Rn(e) {
  const t = D(Me, null, !1);
  return (x(t, m), (t.teardown = e), t);
}
function Tr(e) {
  Nt();
  var t = h.f,
    n = !_ && (t & Y) !== 0 && (t & Xe) === 0;
  if (n) {
    var r = y;
    (r.e ?? (r.e = [])).push(e);
  } else return It(e);
}
function It(e) {
  return D(Ze | ht, e, !1);
}
function Ar(e) {
  return (Nt(), D(Me | ht, e, !0));
}
function Sr(e) {
  ge.ensure();
  const t = D(fe | Ae, e, !0);
  return (n = {}) =>
    new Promise((r) => {
      n.outro
        ? kn(t, () => {
            (re(t), r(void 0));
          })
        : (re(t), r(void 0));
    });
}
function br(e) {
  return D(Ze, e, !1);
}
function Rr(e, t) {
  var n = y,
    r = { effect: null, ran: !1, deps: e };
  (n.l.$.push(r),
    (r.effect = Dt(() => {
      (e(), !r.ran && ((r.ran = !0), Dn(t)));
    })));
}
function Cr() {
  var e = y;
  Dt(() => {
    for (var t of e.l.$) {
      t.deps();
      var n = t.effect;
      ((n.f & m) !== 0 && x(n, I), we(n) && pe(n), (t.ran = !1));
    }
  });
}
function Cn(e) {
  return D(Je | Ae, e, !0);
}
function Dt(e, t = 0) {
  return D(Me | t, e, !0);
}
function Or(e, t = [], n = [], r = []) {
  En(r, t, n, (f) => {
    D(Me, () => e(...f.map(ue)), !0);
  });
}
function Pr(e, t = 0) {
  var n = D(U | t, e, !0);
  return n;
}
function kr(e, t = 0) {
  var n = D(dt | t, e, !0);
  return n;
}
function Fr(e) {
  return D(Y | Ae, e, !0);
}
function Mt(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = he,
      r = _;
    (ot(!0), Z(null));
    try {
      t.call(null);
    } finally {
      (ot(n), Z(r));
    }
  }
}
function jt(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const f = n.ac;
    f !== null &&
      Ft(() => {
        f.abort(le);
      });
    var r = n.next;
    ((n.f & fe) !== 0 ? (n.parent = null) : re(n, t), (n = r));
  }
}
function On(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    ((t.f & Y) === 0 && re(t), (t = n));
  }
}
function re(e, t = !0) {
  var n = !1;
  ((t || (e.f & pt) !== 0) &&
    e.nodes !== null &&
    e.nodes.end !== null &&
    (Pn(e.nodes.start, e.nodes.end), (n = !0)),
    jt(e, t && !n),
    Ne(e, 0),
    x(e, V));
  var r = e.nodes && e.nodes.t;
  if (r !== null) for (const s of r) s.stop();
  Mt(e);
  var f = e.parent;
  (f !== null && f.first !== null && Lt(e),
    (e.next =
      e.prev =
      e.teardown =
      e.ctx =
      e.deps =
      e.fn =
      e.nodes =
      e.ac =
        null));
}
function Pn(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : je(e);
    (e.remove(), (e = n));
  }
}
function Lt(e) {
  var t = e.parent,
    n = e.prev,
    r = e.next;
  (n !== null && (n.next = r),
    r !== null && (r.prev = n),
    t !== null &&
      (t.first === e && (t.first = r), t.last === e && (t.last = n)));
}
function kn(e, t, n = !0) {
  var r = [];
  qt(e, r, !0);
  var f = () => {
      (n && re(e), t && t());
    },
    s = r.length;
  if (s > 0) {
    var l = () => --s || f();
    for (var u of r) u.out(l);
  } else f();
}
function qt(e, t, n) {
  if ((e.f & L) === 0) {
    e.f ^= L;
    var r = e.nodes && e.nodes.t;
    if (r !== null) for (const u of r) (u.is_global || n) && t.push(u);
    for (var f = e.first; f !== null; ) {
      var s = f.next,
        l = (f.f & Re) !== 0 || ((f.f & Y) !== 0 && (e.f & U) !== 0);
      (qt(f, t, l ? n : !1), (f = s));
    }
  }
}
function Nr(e) {
  Ut(e, !0);
}
function Ut(e, t) {
  if ((e.f & L) !== 0) {
    ((e.f ^= L), (e.f & m) === 0 && (x(e, C), ne(e)));
    for (var n = e.first; n !== null; ) {
      var r = n.next,
        f = (n.f & Re) !== 0 || (n.f & Y) !== 0;
      (Ut(n, f ? t : !1), (n = r));
    }
    var s = e.nodes && e.nodes.t;
    if (s !== null) for (const l of s) (l.is_global || t) && l.in();
  }
}
function Ir(e, t) {
  if (e.nodes)
    for (var n = e.nodes.start, r = e.nodes.end; n !== null; ) {
      var f = n === r ? null : je(n);
      (t.append(n), (n = f));
    }
}
let Q = !1;
function Fe(e) {
  Q = e;
}
let he = !1;
function ot(e) {
  he = e;
}
let _ = null,
  j = !1;
function Z(e) {
  _ = e;
}
let h = null;
function de(e) {
  h = e;
}
let R = null;
function Fn(e) {
  _ !== null && (R === null ? (R = [e]) : R.push(e));
}
let b = null,
  O = 0,
  P = null;
function Nn(e) {
  P = e;
}
let Yt = 1,
  xe = 0,
  ee = xe;
function ct(e) {
  ee = e;
}
function Bt() {
  return ++Yt;
}
function we(e) {
  var t = e.f;
  if ((t & C) !== 0) return !0;
  if ((t & T && (e.f &= ~te), (t & I) !== 0)) {
    var n = e.deps;
    if (n !== null)
      for (var r = n.length, f = 0; f < r; f++) {
        var s = n[f];
        if ((we(s) && bt(s), s.wv > e.wv)) return !0;
      }
    (t & N) !== 0 && E === null && x(e, m);
  }
  return !1;
}
function Gt(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !(R != null && R.includes(e)))
    for (var f = 0; f < r.length; f++) {
      var s = r[f];
      (s.f & T) !== 0
        ? Gt(s, t, !1)
        : t === s && (n ? x(s, C) : (s.f & m) !== 0 && x(s, I), ne(s));
    }
}
function Ht(e) {
  var S;
  var t = b,
    n = O,
    r = P,
    f = _,
    s = R,
    l = y,
    u = j,
    a = ee,
    i = e.f;
  ((b = null),
    (O = 0),
    (P = null),
    (_ = (i & (Y | fe)) === 0 ? e : null),
    (R = null),
    Ce(e.ctx),
    (j = !1),
    (ee = ++xe),
    e.ac !== null &&
      (Ft(() => {
        e.ac.abort(le);
      }),
      (e.ac = null)));
  try {
    e.f |= Be;
    var o = e.fn,
      c = o(),
      d = e.deps;
    if (b !== null) {
      var v;
      if ((Ne(e, O), d !== null && O > 0))
        for (d.length = O + b.length, v = 0; v < b.length; v++) d[O + v] = b[v];
      else e.deps = d = b;
      if (ke() && (e.f & N) !== 0)
        for (v = O; v < d.length; v++)
          ((S = d[v]).reactions ?? (S.reactions = [])).push(e);
    } else d !== null && O < d.length && (Ne(e, O), (d.length = O));
    if (Se() && P !== null && !j && d !== null && (e.f & (T | I | C)) === 0)
      for (v = 0; v < P.length; v++) Gt(P[v], e);
    return (
      f !== null &&
        f !== e &&
        (xe++, P !== null && (r === null ? (r = P) : r.push(...P))),
      (e.f & $) !== 0 && (e.f ^= $),
      c
    );
  } catch (B) {
    return hn(B);
  } finally {
    ((e.f ^= Be),
      (b = t),
      (O = n),
      (P = r),
      (_ = f),
      (R = s),
      Ce(l),
      (j = u),
      (ee = a));
  }
}
function In(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = Xt.call(n, e);
    if (r !== -1) {
      var f = n.length - 1;
      f === 0 ? (n = t.reactions = null) : ((n[r] = n[f]), n.pop());
    }
  }
  n === null &&
    (t.f & T) !== 0 &&
    (b === null || !b.includes(t)) &&
    (x(t, I), (t.f & N) !== 0 && ((t.f ^= N), (t.f &= ~te)), St(t), Ne(t, 0));
}
function Ne(e, t) {
  var n = e.deps;
  if (n !== null) for (var r = t; r < n.length; r++) In(e, n[r]);
}
function pe(e) {
  var t = e.f;
  if ((t & V) === 0) {
    x(e, m);
    var n = h,
      r = Q;
    ((h = e), (Q = !0));
    try {
      ((t & (U | dt)) !== 0 ? On(e) : jt(e), Mt(e));
      var f = Ht(e);
      ((e.teardown = typeof f == "function" ? f : null), (e.wv = Yt));
      var s;
      Ye && Zt && (e.f & C) !== 0 && e.deps;
    } finally {
      ((Q = r), (h = n));
    }
  }
}
function ue(e) {
  var t = e.f,
    n = (t & T) !== 0;
  if (_ !== null && !j) {
    var r = h !== null && (h.f & V) !== 0;
    if (!r && !(R != null && R.includes(e))) {
      var f = _.deps;
      if ((_.f & Be) !== 0)
        e.rv < xe &&
          ((e.rv = xe),
          b === null && f !== null && f[O] === e
            ? O++
            : b === null
              ? (b = [e])
              : b.includes(e) || b.push(e));
      else {
        (_.deps ?? (_.deps = [])).push(e);
        var s = e.reactions;
        s === null ? (e.reactions = [_]) : s.includes(_) || s.push(_);
      }
    }
  }
  if (he) {
    if (z.has(e)) return z.get(e);
    if (n) {
      var l = e,
        u = l.v;
      return (
        (((l.f & m) === 0 && l.reactions !== null) || Vt(l)) && (u = et(l)),
        z.set(l, u),
        u
      );
    }
  } else
    n &&
      (!(E != null && E.has(e)) || (p != null && p.is_fork && !ke())) &&
      ((l = e), we(l) && bt(l), Q && ke() && (l.f & N) === 0 && Kt(l));
  if (E != null && E.has(e)) return E.get(e);
  if ((e.f & $) !== 0) throw e.v;
  return e.v;
}
function Kt(e) {
  if (e.deps !== null) {
    e.f ^= N;
    for (const t of e.deps)
      ((t.reactions ?? (t.reactions = [])).push(e),
        (t.f & T) !== 0 && (t.f & N) === 0 && Kt(t));
  }
}
function Vt(e) {
  if (e.v === A) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps) if (z.has(t) || ((t.f & T) !== 0 && Vt(t))) return !0;
  return !1;
}
function Dn(e) {
  var t = j;
  try {
    return ((j = !0), e());
  } finally {
    j = t;
  }
}
const Mn = -7169;
function x(e, t) {
  e.f = (e.f & Mn) | t;
}
function Dr(e) {
  if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
    if (J in e) ze(e);
    else if (!Array.isArray(e))
      for (let t in e) {
        const n = e[t];
        typeof n == "object" && n && J in n && ze(n);
      }
  }
}
function ze(e, t = new Set()) {
  if (
    typeof e == "object" &&
    e !== null &&
    !(e instanceof EventTarget) &&
    !t.has(e)
  ) {
    (t.add(e), e instanceof Date && e.getTime());
    for (let r in e)
      try {
        ze(e[r], t);
      } catch {}
    const n = _t(e);
    if (
      n !== Object.prototype &&
      n !== Array.prototype &&
      n !== Map.prototype &&
      n !== Set.prototype &&
      n !== Date.prototype
    ) {
      const r = Jt(n);
      for (let f in r) {
        const s = r[f].get;
        if (s)
          try {
            s.call(e);
          } catch {}
      }
    }
  }
}
export {
  Un as $,
  xr as A,
  me as B,
  lr as C,
  xn as D,
  Re as E,
  Ee as F,
  h as G,
  V as H,
  Kn as I,
  Bn as J,
  Vn as K,
  he as L,
  Gn as M,
  fr as N,
  Qn as O,
  Hn as P,
  ur as Q,
  or as R,
  J as S,
  $e as T,
  rr as U,
  tt as V,
  vr as W,
  Xn as X,
  Wt as Y,
  qn as Z,
  Yn as _,
  De as a,
  L as a0,
  je as a1,
  gr as a2,
  _r as a3,
  cr as a4,
  dr as a5,
  ke as a6,
  Dt as a7,
  Ue as a8,
  pn as a9,
  _t as aA,
  sr as aB,
  Jt as aC,
  er as aD,
  Rr as aE,
  Cr as aF,
  nr as aG,
  ge as aa,
  de as ab,
  Z as ac,
  Ce as ad,
  hn as ae,
  _ as af,
  Oe as ag,
  ar as ah,
  Ae as ai,
  We as aj,
  Jn as ak,
  Ft as al,
  kt as am,
  Sn as an,
  zn as ao,
  $n as ap,
  hr as aq,
  Sr as ar,
  kr as as,
  br as at,
  pr as au,
  Rn as av,
  En as aw,
  Wn as ax,
  A as ay,
  Zn as az,
  Dn as b,
  y as c,
  Pr as d,
  Ln as e,
  Ar as f,
  tr as g,
  ue as h,
  Dr as i,
  At as j,
  Er as k,
  nn as l,
  H as m,
  yr as n,
  K as o,
  p,
  Nr as q,
  tn as r,
  mr as s,
  Or as t,
  Tr as u,
  re as v,
  kn as w,
  wr as x,
  Fr as y,
  Ir as z,
};
