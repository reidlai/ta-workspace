var dn = Object.defineProperty;
var Me = (e) => {
  throw TypeError(e);
};
var pn = (e, t, n) =>
  t in e
    ? dn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
    : (e[t] = n);
var J = (e, t, n) => pn(e, typeof t != "symbol" ? t + "" : t, n),
  Le = (e, t, n) => t.has(e) || Me("Cannot " + n);
var G = (e, t, n) => (
    Le(e, t, "read from private field"),
    n ? n.call(e) : t.get(e)
  ),
  ge = (e, t, n) =>
    t.has(e)
      ? Me("Cannot add the same private member more than once")
      : t instanceof WeakSet
        ? t.add(e)
        : t.set(e, n),
  be = (e, t, n, r) => (
    Le(e, t, "write to private field"),
    r ? r.call(e, n) : t.set(e, n),
    n
  );
import { f as fe, a as R, t as ye, s as hn } from "./render-DW8l5F5-.js";
import { i as mn } from "./lifecycle-kGLgCphG.js";
import {
  h as Ve,
  o as We,
  m as Be,
  F as Ge,
  a3 as _n,
  a4 as vn,
  k as Ke,
  s as ee,
  n as we,
  t as gn,
} from "./runtime-DPDnKgMN.js";
import {
  e as bn,
  C as yn,
  a as wn,
  b as zn,
  c as $n,
  d as kn,
  B as Sn,
} from "./card-title-BIJ0GckP.js";
import "./props-Ba6rMGFL.js";
import "./class-BLXIZATI.js";
var Se = function (e, t) {
  return (
    (Se =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (n, r) {
          n.__proto__ = r;
        }) ||
      function (n, r) {
        for (var o in r)
          Object.prototype.hasOwnProperty.call(r, o) && (n[o] = r[o]);
      }),
    Se(e, t)
  );
};
function H(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError(
      "Class extends value " + String(t) + " is not a constructor or null",
    );
  Se(e, t);
  function n() {
    this.constructor = e;
  }
  e.prototype =
    t === null ? Object.create(t) : ((n.prototype = t.prototype), new n());
}
function Ze(e) {
  var t = typeof Symbol == "function" && Symbol.iterator,
    n = t && e[t],
    r = 0;
  if (n) return n.call(e);
  if (e && typeof e.length == "number")
    return {
      next: function () {
        return (
          e && r >= e.length && (e = void 0),
          { value: e && e[r++], done: !e }
        );
      },
    };
  throw new TypeError(
    t ? "Object is not iterable." : "Symbol.iterator is not defined.",
  );
}
function Oe(e, t) {
  var n = typeof Symbol == "function" && e[Symbol.iterator];
  if (!n) return e;
  var r = n.call(e),
    o,
    i = [],
    s;
  try {
    for (; (t === void 0 || t-- > 0) && !(o = r.next()).done; ) i.push(o.value);
  } catch (c) {
    s = { error: c };
  } finally {
    try {
      o && !o.done && (n = r.return) && n.call(r);
    } finally {
      if (s) throw s.error;
    }
  }
  return i;
}
function Ee(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, o = t.length, i; r < o; r++)
      (i || !(r in t)) &&
        (i || (i = Array.prototype.slice.call(t, 0, r)), (i[r] = t[r]));
  return e.concat(i || Array.prototype.slice.call(t));
}
function j(e) {
  return typeof e == "function";
}
function Et(e) {
  var t = function (r) {
      (Error.call(r), (r.stack = new Error().stack));
    },
    n = e(t);
  return (
    (n.prototype = Object.create(Error.prototype)),
    (n.prototype.constructor = n),
    n
  );
}
var ze = Et(function (e) {
  return function (n) {
    (e(this),
      (this.message = n
        ? n.length +
          ` errors occurred during unsubscription:
` +
          n.map(function (r, o) {
            return o + 1 + ") " + r.toString();
          }).join(`
  `)
        : ""),
      (this.name = "UnsubscriptionError"),
      (this.errors = n));
  };
});
function Ie(e, t) {
  if (e) {
    var n = e.indexOf(t);
    0 <= n && e.splice(n, 1);
  }
}
var de = (function () {
    function e(t) {
      ((this.initialTeardown = t),
        (this.closed = !1),
        (this._parentage = null),
        (this._finalizers = null));
    }
    return (
      (e.prototype.unsubscribe = function () {
        var t, n, r, o, i;
        if (!this.closed) {
          this.closed = !0;
          var s = this._parentage;
          if (s)
            if (((this._parentage = null), Array.isArray(s)))
              try {
                for (var c = Ze(s), u = c.next(); !u.done; u = c.next()) {
                  var l = u.value;
                  l.remove(this);
                }
              } catch (_) {
                t = { error: _ };
              } finally {
                try {
                  u && !u.done && (n = c.return) && n.call(c);
                } finally {
                  if (t) throw t.error;
                }
              }
            else s.remove(this);
          var f = this.initialTeardown;
          if (j(f))
            try {
              f();
            } catch (_) {
              i = _ instanceof ze ? _.errors : [_];
            }
          var d = this._finalizers;
          if (d) {
            this._finalizers = null;
            try {
              for (var m = Ze(d), p = m.next(); !p.done; p = m.next()) {
                var v = p.value;
                try {
                  Ye(v);
                } catch (_) {
                  ((i = i ?? []),
                    _ instanceof ze
                      ? (i = Ee(Ee([], Oe(i)), Oe(_.errors)))
                      : i.push(_));
                }
              }
            } catch (_) {
              r = { error: _ };
            } finally {
              try {
                p && !p.done && (o = m.return) && o.call(m);
              } finally {
                if (r) throw r.error;
              }
            }
          }
          if (i) throw new ze(i);
        }
      }),
      (e.prototype.add = function (t) {
        var n;
        if (t && t !== this)
          if (this.closed) Ye(t);
          else {
            if (t instanceof e) {
              if (t.closed || t._hasParent(this)) return;
              t._addParent(this);
            }
            (this._finalizers =
              (n = this._finalizers) !== null && n !== void 0 ? n : []).push(t);
          }
      }),
      (e.prototype._hasParent = function (t) {
        var n = this._parentage;
        return n === t || (Array.isArray(n) && n.includes(t));
      }),
      (e.prototype._addParent = function (t) {
        var n = this._parentage;
        this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
      }),
      (e.prototype._removeParent = function (t) {
        var n = this._parentage;
        n === t ? (this._parentage = null) : Array.isArray(n) && Ie(n, t);
      }),
      (e.prototype.remove = function (t) {
        var n = this._finalizers;
        (n && Ie(n, t), t instanceof e && t._removeParent(this));
      }),
      (e.EMPTY = (function () {
        var t = new e();
        return ((t.closed = !0), t);
      })()),
      e
    );
  })(),
  It = de.EMPTY;
function Pt(e) {
  return (
    e instanceof de ||
    (e && "closed" in e && j(e.remove) && j(e.add) && j(e.unsubscribe))
  );
}
function Ye(e) {
  j(e) ? e() : e.unsubscribe();
}
var Zn = { Promise: void 0 },
  On = {
    setTimeout: function (e, t) {
      for (var n = [], r = 2; r < arguments.length; r++)
        n[r - 2] = arguments[r];
      return setTimeout.apply(void 0, Ee([e, t], Oe(n)));
    },
    clearTimeout: function (e) {
      return clearTimeout(e);
    },
    delegate: void 0,
  };
function En(e) {
  On.setTimeout(function () {
    throw e;
  });
}
function Xe() {}
function se(e) {
  e();
}
var Tt = (function (e) {
    H(t, e);
    function t(n) {
      var r = e.call(this) || this;
      return (
        (r.isStopped = !1),
        n ? ((r.destination = n), Pt(n) && n.add(r)) : (r.destination = Tn),
        r
      );
    }
    return (
      (t.create = function (n, r, o) {
        return new Pe(n, r, o);
      }),
      (t.prototype.next = function (n) {
        this.isStopped || this._next(n);
      }),
      (t.prototype.error = function (n) {
        this.isStopped || ((this.isStopped = !0), this._error(n));
      }),
      (t.prototype.complete = function () {
        this.isStopped || ((this.isStopped = !0), this._complete());
      }),
      (t.prototype.unsubscribe = function () {
        this.closed ||
          ((this.isStopped = !0),
          e.prototype.unsubscribe.call(this),
          (this.destination = null));
      }),
      (t.prototype._next = function (n) {
        this.destination.next(n);
      }),
      (t.prototype._error = function (n) {
        try {
          this.destination.error(n);
        } finally {
          this.unsubscribe();
        }
      }),
      (t.prototype._complete = function () {
        try {
          this.destination.complete();
        } finally {
          this.unsubscribe();
        }
      }),
      t
    );
  })(de),
  In = (function () {
    function e(t) {
      this.partialObserver = t;
    }
    return (
      (e.prototype.next = function (t) {
        var n = this.partialObserver;
        if (n.next)
          try {
            n.next(t);
          } catch (r) {
            te(r);
          }
      }),
      (e.prototype.error = function (t) {
        var n = this.partialObserver;
        if (n.error)
          try {
            n.error(t);
          } catch (r) {
            te(r);
          }
        else te(t);
      }),
      (e.prototype.complete = function () {
        var t = this.partialObserver;
        if (t.complete)
          try {
            t.complete();
          } catch (n) {
            te(n);
          }
      }),
      e
    );
  })(),
  Pe = (function (e) {
    H(t, e);
    function t(n, r, o) {
      var i = e.call(this) || this,
        s;
      return (
        j(n) || !n
          ? (s = {
              next: n ?? void 0,
              error: r ?? void 0,
              complete: o ?? void 0,
            })
          : (s = n),
        (i.destination = new In(s)),
        i
      );
    }
    return t;
  })(Tt);
function te(e) {
  En(e);
}
function Pn(e) {
  throw e;
}
var Tn = { closed: !0, next: Xe, error: Pn, complete: Xe },
  jn = (function () {
    return (typeof Symbol == "function" && Symbol.observable) || "@@observable";
  })();
function An(e) {
  return e;
}
function Nn(e) {
  return e.length === 0
    ? An
    : e.length === 1
      ? e[0]
      : function (n) {
          return e.reduce(function (r, o) {
            return o(r);
          }, n);
        };
}
var qe = (function () {
  function e(t) {
    t && (this._subscribe = t);
  }
  return (
    (e.prototype.lift = function (t) {
      var n = new e();
      return ((n.source = this), (n.operator = t), n);
    }),
    (e.prototype.subscribe = function (t, n, r) {
      var o = this,
        i = Rn(t) ? t : new Pe(t, n, r);
      return (
        se(function () {
          var s = o,
            c = s.operator,
            u = s.source;
          i.add(c ? c.call(i, u) : u ? o._subscribe(i) : o._trySubscribe(i));
        }),
        i
      );
    }),
    (e.prototype._trySubscribe = function (t) {
      try {
        return this._subscribe(t);
      } catch (n) {
        t.error(n);
      }
    }),
    (e.prototype.forEach = function (t, n) {
      var r = this;
      return (
        (n = He(n)),
        new n(function (o, i) {
          var s = new Pe({
            next: function (c) {
              try {
                t(c);
              } catch (u) {
                (i(u), s.unsubscribe());
              }
            },
            error: i,
            complete: o,
          });
          r.subscribe(s);
        })
      );
    }),
    (e.prototype._subscribe = function (t) {
      var n;
      return (n = this.source) === null || n === void 0
        ? void 0
        : n.subscribe(t);
    }),
    (e.prototype[jn] = function () {
      return this;
    }),
    (e.prototype.pipe = function () {
      for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
      return Nn(t)(this);
    }),
    (e.prototype.toPromise = function (t) {
      var n = this;
      return (
        (t = He(t)),
        new t(function (r, o) {
          var i;
          n.subscribe(
            function (s) {
              return (i = s);
            },
            function (s) {
              return o(s);
            },
            function () {
              return r(i);
            },
          );
        })
      );
    }),
    (e.create = function (t) {
      return new e(t);
    }),
    e
  );
})();
function He(e) {
  var t;
  return (t = e ?? Zn.Promise) !== null && t !== void 0 ? t : Promise;
}
function Cn(e) {
  return e && j(e.next) && j(e.error) && j(e.complete);
}
function Rn(e) {
  return (e && e instanceof Tt) || (Cn(e) && Pt(e));
}
var Dn = Et(function (e) {
    return function () {
      (e(this),
        (this.name = "ObjectUnsubscribedError"),
        (this.message = "object unsubscribed"));
    };
  }),
  jt = (function (e) {
    H(t, e);
    function t() {
      var n = e.call(this) || this;
      return (
        (n.closed = !1),
        (n.currentObservers = null),
        (n.observers = []),
        (n.isStopped = !1),
        (n.hasError = !1),
        (n.thrownError = null),
        n
      );
    }
    return (
      (t.prototype.lift = function (n) {
        var r = new Qe(this, this);
        return ((r.operator = n), r);
      }),
      (t.prototype._throwIfClosed = function () {
        if (this.closed) throw new Dn();
      }),
      (t.prototype.next = function (n) {
        var r = this;
        se(function () {
          var o, i;
          if ((r._throwIfClosed(), !r.isStopped)) {
            r.currentObservers ||
              (r.currentObservers = Array.from(r.observers));
            try {
              for (
                var s = Ze(r.currentObservers), c = s.next();
                !c.done;
                c = s.next()
              ) {
                var u = c.value;
                u.next(n);
              }
            } catch (l) {
              o = { error: l };
            } finally {
              try {
                c && !c.done && (i = s.return) && i.call(s);
              } finally {
                if (o) throw o.error;
              }
            }
          }
        });
      }),
      (t.prototype.error = function (n) {
        var r = this;
        se(function () {
          if ((r._throwIfClosed(), !r.isStopped)) {
            ((r.hasError = r.isStopped = !0), (r.thrownError = n));
            for (var o = r.observers; o.length; ) o.shift().error(n);
          }
        });
      }),
      (t.prototype.complete = function () {
        var n = this;
        se(function () {
          if ((n._throwIfClosed(), !n.isStopped)) {
            n.isStopped = !0;
            for (var r = n.observers; r.length; ) r.shift().complete();
          }
        });
      }),
      (t.prototype.unsubscribe = function () {
        ((this.isStopped = this.closed = !0),
          (this.observers = this.currentObservers = null));
      }),
      Object.defineProperty(t.prototype, "observed", {
        get: function () {
          var n;
          return (
            ((n = this.observers) === null || n === void 0
              ? void 0
              : n.length) > 0
          );
        },
        enumerable: !1,
        configurable: !0,
      }),
      (t.prototype._trySubscribe = function (n) {
        return (this._throwIfClosed(), e.prototype._trySubscribe.call(this, n));
      }),
      (t.prototype._subscribe = function (n) {
        return (
          this._throwIfClosed(),
          this._checkFinalizedStatuses(n),
          this._innerSubscribe(n)
        );
      }),
      (t.prototype._innerSubscribe = function (n) {
        var r = this,
          o = this,
          i = o.hasError,
          s = o.isStopped,
          c = o.observers;
        return i || s
          ? It
          : ((this.currentObservers = null),
            c.push(n),
            new de(function () {
              ((r.currentObservers = null), Ie(c, n));
            }));
      }),
      (t.prototype._checkFinalizedStatuses = function (n) {
        var r = this,
          o = r.hasError,
          i = r.thrownError,
          s = r.isStopped;
        o ? n.error(i) : s && n.complete();
      }),
      (t.prototype.asObservable = function () {
        var n = new qe();
        return ((n.source = this), n);
      }),
      (t.create = function (n, r) {
        return new Qe(n, r);
      }),
      t
    );
  })(qe),
  Qe = (function (e) {
    H(t, e);
    function t(n, r) {
      var o = e.call(this) || this;
      return ((o.destination = n), (o.source = r), o);
    }
    return (
      (t.prototype.next = function (n) {
        var r, o;
        (o =
          (r = this.destination) === null || r === void 0 ? void 0 : r.next) ===
          null ||
          o === void 0 ||
          o.call(r, n);
      }),
      (t.prototype.error = function (n) {
        var r, o;
        (o =
          (r = this.destination) === null || r === void 0
            ? void 0
            : r.error) === null ||
          o === void 0 ||
          o.call(r, n);
      }),
      (t.prototype.complete = function () {
        var n, r;
        (r =
          (n = this.destination) === null || n === void 0
            ? void 0
            : n.complete) === null ||
          r === void 0 ||
          r.call(n);
      }),
      (t.prototype._subscribe = function (n) {
        var r, o;
        return (o =
          (r = this.source) === null || r === void 0
            ? void 0
            : r.subscribe(n)) !== null && o !== void 0
          ? o
          : It;
      }),
      t
    );
  })(jt),
  et = (function (e) {
    H(t, e);
    function t(n) {
      var r = e.call(this) || this;
      return ((r._value = n), r);
    }
    return (
      Object.defineProperty(t.prototype, "value", {
        get: function () {
          return this.getValue();
        },
        enumerable: !1,
        configurable: !0,
      }),
      (t.prototype._subscribe = function (n) {
        var r = e.prototype._subscribe.call(this, n);
        return (!r.closed && n.next(this._value), r);
      }),
      (t.prototype.getValue = function () {
        var n = this,
          r = n.hasError,
          o = n.thrownError,
          i = n._value;
        if (r) throw o;
        return (this._throwIfClosed(), i);
      }),
      (t.prototype.next = function (n) {
        e.prototype.next.call(this, (this._value = n));
      }),
      t
    );
  })(jt);
const D = class D {
  constructor() {
    J(this, "_status$", new et("Demo service is running"));
    J(this, "_count$", new et(0));
    J(this, "status$", this._status$.asObservable());
    J(this, "count$", this._count$.asObservable());
  }
  static getInstance() {
    return (D.instance || (D.instance = new D()), D.instance);
  }
  subscribe(t) {
    const n = this._status$.subscribe(t);
    return () => n.unsubscribe();
  }
  getStatus() {
    return this._status$.getValue();
  }
  setStatus(t) {
    this._status$.next(t);
  }
  getCount() {
    return this._count$.getValue();
  }
  increment() {
    this._count$.next(this._count$.getValue() + 1);
  }
};
J(D, "instance");
let Te = D;
const K = Te.getInstance();
function a(e, t, n) {
  function r(c, u) {
    if (
      (c._zod ||
        Object.defineProperty(c, "_zod", {
          value: { def: u, constr: s, traits: new Set() },
          enumerable: !1,
        }),
      c._zod.traits.has(e))
    )
      return;
    (c._zod.traits.add(e), t(c, u));
    const l = s.prototype,
      f = Object.keys(l);
    for (let d = 0; d < f.length; d++) {
      const m = f[d];
      m in c || (c[m] = l[m].bind(c));
    }
  }
  const o = (n == null ? void 0 : n.Parent) ?? Object;
  class i extends o {}
  Object.defineProperty(i, "name", { value: e });
  function s(c) {
    var u;
    const l = n != null && n.Parent ? new i() : this;
    (r(l, c), (u = l._zod).deferred ?? (u.deferred = []));
    for (const f of l._zod.deferred) f();
    return l;
  }
  return (
    Object.defineProperty(s, "init", { value: r }),
    Object.defineProperty(s, Symbol.hasInstance, {
      value: (c) => {
        var u, l;
        return n != null && n.Parent && c instanceof n.Parent
          ? !0
          : (l =
                (u = c == null ? void 0 : c._zod) == null
                  ? void 0
                  : u.traits) == null
            ? void 0
            : l.has(e);
      },
    }),
    Object.defineProperty(s, "name", { value: e }),
    s
  );
}
class L extends Error {
  constructor() {
    super(
      "Encountered Promise during synchronous parse. Use .parseAsync() instead.",
    );
  }
}
class At extends Error {
  constructor(t) {
    (super(`Encountered unidirectional transform during encode: ${t}`),
      (this.name = "ZodEncodeError"));
  }
}
const Nt = {};
function x(e) {
  return Nt;
}
function Ct(e) {
  const t = Object.values(e).filter((r) => typeof r == "number");
  return Object.entries(e)
    .filter(([r, o]) => t.indexOf(+r) === -1)
    .map(([r, o]) => o);
}
function je(e, t) {
  return typeof t == "bigint" ? t.toString() : t;
}
function Ce(e) {
  return {
    get value() {
      {
        const t = e();
        return (Object.defineProperty(this, "value", { value: t }), t);
      }
    },
  };
}
function Re(e) {
  return e == null;
}
function De(e) {
  const t = e.startsWith("^") ? 1 : 0,
    n = e.endsWith("$") ? e.length - 1 : e.length;
  return e.slice(t, n);
}
function xn(e, t) {
  const n = (e.toString().split(".")[1] || "").length,
    r = t.toString();
  let o = (r.split(".")[1] || "").length;
  if (o === 0 && /\d?e-\d?/.test(r)) {
    const u = r.match(/\d?e-(\d?)/);
    u != null && u[1] && (o = Number.parseInt(u[1]));
  }
  const i = n > o ? n : o,
    s = Number.parseInt(e.toFixed(i).replace(".", "")),
    c = Number.parseInt(t.toFixed(i).replace(".", ""));
  return (s % c) / 10 ** i;
}
const tt = Symbol("evaluating");
function g(e, t, n) {
  let r;
  Object.defineProperty(e, t, {
    get() {
      if (r !== tt) return (r === void 0 && ((r = tt), (r = n())), r);
    },
    set(o) {
      Object.defineProperty(e, t, { value: o });
    },
    configurable: !0,
  });
}
function F(e, t, n) {
  Object.defineProperty(e, t, {
    value: n,
    writable: !0,
    enumerable: !0,
    configurable: !0,
  });
}
function A(...e) {
  const t = {};
  for (const n of e) {
    const r = Object.getOwnPropertyDescriptors(n);
    Object.assign(t, r);
  }
  return Object.defineProperties({}, t);
}
function nt(e) {
  return JSON.stringify(e);
}
function Un(e) {
  return e
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
const Rt =
  "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function ce(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
const Fn = Ce(() => {
  var e;
  if (
    typeof navigator < "u" &&
    (e = navigator == null ? void 0 : navigator.userAgent) != null &&
    e.includes("Cloudflare")
  )
    return !1;
  try {
    const t = Function;
    return (new t(""), !0);
  } catch {
    return !1;
  }
});
function X(e) {
  if (ce(e) === !1) return !1;
  const t = e.constructor;
  if (t === void 0 || typeof t != "function") return !0;
  const n = t.prototype;
  return !(
    ce(n) === !1 ||
    Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") === !1
  );
}
function Dt(e) {
  return X(e) ? { ...e } : Array.isArray(e) ? [...e] : e;
}
const Jn = new Set(["string", "number", "symbol"]);
function pe(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function N(e, t, n) {
  const r = new e._zod.constr(t ?? e._zod.def);
  return ((!t || (n != null && n.parent)) && (r._zod.parent = e), r);
}
function h(e) {
  const t = e;
  if (!t) return {};
  if (typeof t == "string") return { error: () => t };
  if ((t == null ? void 0 : t.message) !== void 0) {
    if ((t == null ? void 0 : t.error) !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    t.error = t.message;
  }
  return (
    delete t.message,
    typeof t.error == "string" ? { ...t, error: () => t.error } : t
  );
}
function Mn(e) {
  return Object.keys(e).filter(
    (t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional",
  );
}
const Ln = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
};
function Vn(e, t) {
  const n = e._zod.def,
    r = n.checks;
  if (r && r.length > 0)
    throw new Error(
      ".pick() cannot be used on object schemas containing refinements",
    );
  const i = A(e._zod.def, {
    get shape() {
      const s = {};
      for (const c in t) {
        if (!(c in n.shape)) throw new Error(`Unrecognized key: "${c}"`);
        t[c] && (s[c] = n.shape[c]);
      }
      return (F(this, "shape", s), s);
    },
    checks: [],
  });
  return N(e, i);
}
function Wn(e, t) {
  const n = e._zod.def,
    r = n.checks;
  if (r && r.length > 0)
    throw new Error(
      ".omit() cannot be used on object schemas containing refinements",
    );
  const i = A(e._zod.def, {
    get shape() {
      const s = { ...e._zod.def.shape };
      for (const c in t) {
        if (!(c in n.shape)) throw new Error(`Unrecognized key: "${c}"`);
        t[c] && delete s[c];
      }
      return (F(this, "shape", s), s);
    },
    checks: [],
  });
  return N(e, i);
}
function Bn(e, t) {
  if (!X(t))
    throw new Error("Invalid input to extend: expected a plain object");
  const n = e._zod.def.checks;
  if (n && n.length > 0) {
    const i = e._zod.def.shape;
    for (const s in t)
      if (Object.getOwnPropertyDescriptor(i, s) !== void 0)
        throw new Error(
          "Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.",
        );
  }
  const o = A(e._zod.def, {
    get shape() {
      const i = { ...e._zod.def.shape, ...t };
      return (F(this, "shape", i), i);
    },
  });
  return N(e, o);
}
function Gn(e, t) {
  if (!X(t))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  const n = A(e._zod.def, {
    get shape() {
      const r = { ...e._zod.def.shape, ...t };
      return (F(this, "shape", r), r);
    },
  });
  return N(e, n);
}
function Kn(e, t) {
  const n = A(e._zod.def, {
    get shape() {
      const r = { ...e._zod.def.shape, ...t._zod.def.shape };
      return (F(this, "shape", r), r);
    },
    get catchall() {
      return t._zod.def.catchall;
    },
    checks: [],
  });
  return N(e, n);
}
function Yn(e, t, n) {
  const o = t._zod.def.checks;
  if (o && o.length > 0)
    throw new Error(
      ".partial() cannot be used on object schemas containing refinements",
    );
  const s = A(t._zod.def, {
    get shape() {
      const c = t._zod.def.shape,
        u = { ...c };
      if (n)
        for (const l in n) {
          if (!(l in c)) throw new Error(`Unrecognized key: "${l}"`);
          n[l] &&
            (u[l] = e ? new e({ type: "optional", innerType: c[l] }) : c[l]);
        }
      else
        for (const l in c)
          u[l] = e ? new e({ type: "optional", innerType: c[l] }) : c[l];
      return (F(this, "shape", u), u);
    },
    checks: [],
  });
  return N(t, s);
}
function Xn(e, t, n) {
  const r = A(t._zod.def, {
    get shape() {
      const o = t._zod.def.shape,
        i = { ...o };
      if (n)
        for (const s in n) {
          if (!(s in i)) throw new Error(`Unrecognized key: "${s}"`);
          n[s] && (i[s] = new e({ type: "nonoptional", innerType: o[s] }));
        }
      else
        for (const s in o)
          i[s] = new e({ type: "nonoptional", innerType: o[s] });
      return (F(this, "shape", i), i);
    },
  });
  return N(t, r);
}
function M(e, t = 0) {
  var n;
  if (e.aborted === !0) return !0;
  for (let r = t; r < e.issues.length; r++)
    if (((n = e.issues[r]) == null ? void 0 : n.continue) !== !0) return !0;
  return !1;
}
function xt(e, t) {
  return t.map((n) => {
    var r;
    return ((r = n).path ?? (r.path = []), n.path.unshift(e), n);
  });
}
function ne(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.message;
}
function U(e, t, n) {
  var o, i, s, c, u, l;
  const r = { ...e, path: e.path ?? [] };
  if (!e.message) {
    const f =
      ne(
        (s =
          (i = (o = e.inst) == null ? void 0 : o._zod.def) == null
            ? void 0
            : i.error) == null
          ? void 0
          : s.call(i, e),
      ) ??
      ne((c = t == null ? void 0 : t.error) == null ? void 0 : c.call(t, e)) ??
      ne((u = n.customError) == null ? void 0 : u.call(n, e)) ??
      ne((l = n.localeError) == null ? void 0 : l.call(n, e)) ??
      "Invalid input";
    r.message = f;
  }
  return (
    delete r.inst,
    delete r.continue,
    (t != null && t.reportInput) || delete r.input,
    r
  );
}
function xe(e) {
  return Array.isArray(e)
    ? "array"
    : typeof e == "string"
      ? "string"
      : "unknown";
}
function q(...e) {
  const [t, n, r] = e;
  return typeof t == "string"
    ? { message: t, code: "custom", input: n, inst: r }
    : { ...t };
}
const Ut = (e, t) => {
    ((e.name = "$ZodError"),
      Object.defineProperty(e, "_zod", { value: e._zod, enumerable: !1 }),
      Object.defineProperty(e, "issues", { value: t, enumerable: !1 }),
      (e.message = JSON.stringify(t, je, 2)),
      Object.defineProperty(e, "toString", {
        value: () => e.message,
        enumerable: !1,
      }));
  },
  Ft = a("$ZodError", Ut),
  Jt = a("$ZodError", Ut, { Parent: Error });
function qn(e, t = (n) => n.message) {
  const n = {},
    r = [];
  for (const o of e.issues)
    o.path.length > 0
      ? ((n[o.path[0]] = n[o.path[0]] || []), n[o.path[0]].push(t(o)))
      : r.push(t(o));
  return { formErrors: r, fieldErrors: n };
}
function Hn(e, t = (n) => n.message) {
  const n = { _errors: [] },
    r = (o) => {
      for (const i of o.issues)
        if (i.code === "invalid_union" && i.errors.length)
          i.errors.map((s) => r({ issues: s }));
        else if (i.code === "invalid_key") r({ issues: i.issues });
        else if (i.code === "invalid_element") r({ issues: i.issues });
        else if (i.path.length === 0) n._errors.push(t(i));
        else {
          let s = n,
            c = 0;
          for (; c < i.path.length; ) {
            const u = i.path[c];
            (c === i.path.length - 1
              ? ((s[u] = s[u] || { _errors: [] }), s[u]._errors.push(t(i)))
              : (s[u] = s[u] || { _errors: [] }),
              (s = s[u]),
              c++);
          }
        }
    };
  return (r(e), n);
}
const Ue = (e) => (t, n, r, o) => {
    const i = r ? Object.assign(r, { async: !1 }) : { async: !1 },
      s = t._zod.run({ value: n, issues: [] }, i);
    if (s instanceof Promise) throw new L();
    if (s.issues.length) {
      const c = new ((o == null ? void 0 : o.Err) ?? e)(
        s.issues.map((u) => U(u, i, x())),
      );
      throw (Rt(c, o == null ? void 0 : o.callee), c);
    }
    return s.value;
  },
  Fe = (e) => async (t, n, r, o) => {
    const i = r ? Object.assign(r, { async: !0 }) : { async: !0 };
    let s = t._zod.run({ value: n, issues: [] }, i);
    if ((s instanceof Promise && (s = await s), s.issues.length)) {
      const c = new ((o == null ? void 0 : o.Err) ?? e)(
        s.issues.map((u) => U(u, i, x())),
      );
      throw (Rt(c, o == null ? void 0 : o.callee), c);
    }
    return s.value;
  },
  he = (e) => (t, n, r) => {
    const o = r ? { ...r, async: !1 } : { async: !1 },
      i = t._zod.run({ value: n, issues: [] }, o);
    if (i instanceof Promise) throw new L();
    return i.issues.length
      ? { success: !1, error: new (e ?? Ft)(i.issues.map((s) => U(s, o, x()))) }
      : { success: !0, data: i.value };
  },
  Qn = he(Jt),
  me = (e) => async (t, n, r) => {
    const o = r ? Object.assign(r, { async: !0 }) : { async: !0 };
    let i = t._zod.run({ value: n, issues: [] }, o);
    return (
      i instanceof Promise && (i = await i),
      i.issues.length
        ? { success: !1, error: new e(i.issues.map((s) => U(s, o, x()))) }
        : { success: !0, data: i.value }
    );
  },
  er = me(Jt),
  tr = (e) => (t, n, r) => {
    const o = r
      ? Object.assign(r, { direction: "backward" })
      : { direction: "backward" };
    return Ue(e)(t, n, o);
  },
  nr = (e) => (t, n, r) => Ue(e)(t, n, r),
  rr = (e) => async (t, n, r) => {
    const o = r
      ? Object.assign(r, { direction: "backward" })
      : { direction: "backward" };
    return Fe(e)(t, n, o);
  },
  or = (e) => async (t, n, r) => Fe(e)(t, n, r),
  ir = (e) => (t, n, r) => {
    const o = r
      ? Object.assign(r, { direction: "backward" })
      : { direction: "backward" };
    return he(e)(t, n, o);
  },
  sr = (e) => (t, n, r) => he(e)(t, n, r),
  cr = (e) => async (t, n, r) => {
    const o = r
      ? Object.assign(r, { direction: "backward" })
      : { direction: "backward" };
    return me(e)(t, n, o);
  },
  ur = (e) => async (t, n, r) => me(e)(t, n, r),
  ar = /^[cC][^\s-]{8,}$/,
  lr = /^[0-9a-z]+$/,
  fr = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,
  dr = /^[0-9a-vA-V]{20}$/,
  pr = /^[A-Za-z0-9]{27}$/,
  hr = /^[a-zA-Z0-9_-]{21}$/,
  mr =
    /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
  _r =
    /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
  rt = (e) =>
    e
      ? new RegExp(
          `^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`,
        )
      : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
  vr =
    /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
  gr = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function br() {
  return new RegExp(gr, "u");
}
const yr =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  wr =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,
  zr =
    /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
  $r =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  kr =
    /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
  Mt = /^[A-Za-z0-9_-]*$/,
  Sr = /^\+[1-9]\d{6,14}$/,
  Lt =
    "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))",
  Zr = new RegExp(`^${Lt}$`);
function Vt(e) {
  const t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof e.precision == "number"
    ? e.precision === -1
      ? `${t}`
      : e.precision === 0
        ? `${t}:[0-5]\\d`
        : `${t}:[0-5]\\d\\.\\d{${e.precision}}`
    : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function Or(e) {
  return new RegExp(`^${Vt(e)}$`);
}
function Er(e) {
  const t = Vt({ precision: e.precision }),
    n = ["Z"];
  (e.local && n.push(""),
    e.offset && n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)"));
  const r = `${t}(?:${n.join("|")})`;
  return new RegExp(`^${Lt}T(?:${r})$`);
}
const Ir = (e) => {
    const t = e
      ? `[\\s\\S]{${(e == null ? void 0 : e.minimum) ?? 0},${(e == null ? void 0 : e.maximum) ?? ""}}`
      : "[\\s\\S]*";
    return new RegExp(`^${t}$`);
  },
  Pr = /^-?\d+$/,
  Tr = /^-?\d+(?:\.\d+)?$/,
  jr = /^[^A-Z]*$/,
  Ar = /^[^a-z]*$/,
  E = a("$ZodCheck", (e, t) => {
    var n;
    (e._zod ?? (e._zod = {}),
      (e._zod.def = t),
      (n = e._zod).onattach ?? (n.onattach = []));
  }),
  Wt = { number: "number", bigint: "bigint", object: "date" },
  Bt = a("$ZodCheckLessThan", (e, t) => {
    E.init(e, t);
    const n = Wt[typeof t.value];
    (e._zod.onattach.push((r) => {
      const o = r._zod.bag,
        i =
          (t.inclusive ? o.maximum : o.exclusiveMaximum) ??
          Number.POSITIVE_INFINITY;
      t.value < i &&
        (t.inclusive ? (o.maximum = t.value) : (o.exclusiveMaximum = t.value));
    }),
      (e._zod.check = (r) => {
        (t.inclusive ? r.value <= t.value : r.value < t.value) ||
          r.issues.push({
            origin: n,
            code: "too_big",
            maximum: typeof t.value == "object" ? t.value.getTime() : t.value,
            input: r.value,
            inclusive: t.inclusive,
            inst: e,
            continue: !t.abort,
          });
      }));
  }),
  Gt = a("$ZodCheckGreaterThan", (e, t) => {
    E.init(e, t);
    const n = Wt[typeof t.value];
    (e._zod.onattach.push((r) => {
      const o = r._zod.bag,
        i =
          (t.inclusive ? o.minimum : o.exclusiveMinimum) ??
          Number.NEGATIVE_INFINITY;
      t.value > i &&
        (t.inclusive ? (o.minimum = t.value) : (o.exclusiveMinimum = t.value));
    }),
      (e._zod.check = (r) => {
        (t.inclusive ? r.value >= t.value : r.value > t.value) ||
          r.issues.push({
            origin: n,
            code: "too_small",
            minimum: typeof t.value == "object" ? t.value.getTime() : t.value,
            input: r.value,
            inclusive: t.inclusive,
            inst: e,
            continue: !t.abort,
          });
      }));
  }),
  Nr = a("$ZodCheckMultipleOf", (e, t) => {
    (E.init(e, t),
      e._zod.onattach.push((n) => {
        var r;
        (r = n._zod.bag).multipleOf ?? (r.multipleOf = t.value);
      }),
      (e._zod.check = (n) => {
        if (typeof n.value != typeof t.value)
          throw new Error("Cannot mix number and bigint in multiple_of check.");
        (typeof n.value == "bigint"
          ? n.value % t.value === BigInt(0)
          : xn(n.value, t.value) === 0) ||
          n.issues.push({
            origin: typeof n.value,
            code: "not_multiple_of",
            divisor: t.value,
            input: n.value,
            inst: e,
            continue: !t.abort,
          });
      }));
  }),
  Cr = a("$ZodCheckNumberFormat", (e, t) => {
    var s;
    (E.init(e, t), (t.format = t.format || "float64"));
    const n = (s = t.format) == null ? void 0 : s.includes("int"),
      r = n ? "int" : "number",
      [o, i] = Ln[t.format];
    (e._zod.onattach.push((c) => {
      const u = c._zod.bag;
      ((u.format = t.format),
        (u.minimum = o),
        (u.maximum = i),
        n && (u.pattern = Pr));
    }),
      (e._zod.check = (c) => {
        const u = c.value;
        if (n) {
          if (!Number.isInteger(u)) {
            c.issues.push({
              expected: r,
              format: t.format,
              code: "invalid_type",
              continue: !1,
              input: u,
              inst: e,
            });
            return;
          }
          if (!Number.isSafeInteger(u)) {
            u > 0
              ? c.issues.push({
                  input: u,
                  code: "too_big",
                  maximum: Number.MAX_SAFE_INTEGER,
                  note: "Integers must be within the safe integer range.",
                  inst: e,
                  origin: r,
                  inclusive: !0,
                  continue: !t.abort,
                })
              : c.issues.push({
                  input: u,
                  code: "too_small",
                  minimum: Number.MIN_SAFE_INTEGER,
                  note: "Integers must be within the safe integer range.",
                  inst: e,
                  origin: r,
                  inclusive: !0,
                  continue: !t.abort,
                });
            return;
          }
        }
        (u < o &&
          c.issues.push({
            origin: "number",
            input: u,
            code: "too_small",
            minimum: o,
            inclusive: !0,
            inst: e,
            continue: !t.abort,
          }),
          u > i &&
            c.issues.push({
              origin: "number",
              input: u,
              code: "too_big",
              maximum: i,
              inclusive: !0,
              inst: e,
              continue: !t.abort,
            }));
      }));
  }),
  Rr = a("$ZodCheckMaxLength", (e, t) => {
    var n;
    (E.init(e, t),
      (n = e._zod.def).when ??
        (n.when = (r) => {
          const o = r.value;
          return !Re(o) && o.length !== void 0;
        }),
      e._zod.onattach.push((r) => {
        const o = r._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
        t.maximum < o && (r._zod.bag.maximum = t.maximum);
      }),
      (e._zod.check = (r) => {
        const o = r.value;
        if (o.length <= t.maximum) return;
        const s = xe(o);
        r.issues.push({
          origin: s,
          code: "too_big",
          maximum: t.maximum,
          inclusive: !0,
          input: o,
          inst: e,
          continue: !t.abort,
        });
      }));
  }),
  Dr = a("$ZodCheckMinLength", (e, t) => {
    var n;
    (E.init(e, t),
      (n = e._zod.def).when ??
        (n.when = (r) => {
          const o = r.value;
          return !Re(o) && o.length !== void 0;
        }),
      e._zod.onattach.push((r) => {
        const o = r._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
        t.minimum > o && (r._zod.bag.minimum = t.minimum);
      }),
      (e._zod.check = (r) => {
        const o = r.value;
        if (o.length >= t.minimum) return;
        const s = xe(o);
        r.issues.push({
          origin: s,
          code: "too_small",
          minimum: t.minimum,
          inclusive: !0,
          input: o,
          inst: e,
          continue: !t.abort,
        });
      }));
  }),
  xr = a("$ZodCheckLengthEquals", (e, t) => {
    var n;
    (E.init(e, t),
      (n = e._zod.def).when ??
        (n.when = (r) => {
          const o = r.value;
          return !Re(o) && o.length !== void 0;
        }),
      e._zod.onattach.push((r) => {
        const o = r._zod.bag;
        ((o.minimum = t.length), (o.maximum = t.length), (o.length = t.length));
      }),
      (e._zod.check = (r) => {
        const o = r.value,
          i = o.length;
        if (i === t.length) return;
        const s = xe(o),
          c = i > t.length;
        r.issues.push({
          origin: s,
          ...(c
            ? { code: "too_big", maximum: t.length }
            : { code: "too_small", minimum: t.length }),
          inclusive: !0,
          exact: !0,
          input: r.value,
          inst: e,
          continue: !t.abort,
        });
      }));
  }),
  _e = a("$ZodCheckStringFormat", (e, t) => {
    var n, r;
    (E.init(e, t),
      e._zod.onattach.push((o) => {
        const i = o._zod.bag;
        ((i.format = t.format),
          t.pattern &&
            (i.patterns ?? (i.patterns = new Set()),
            i.patterns.add(t.pattern)));
      }),
      t.pattern
        ? ((n = e._zod).check ??
          (n.check = (o) => {
            ((t.pattern.lastIndex = 0),
              !t.pattern.test(o.value) &&
                o.issues.push({
                  origin: "string",
                  code: "invalid_format",
                  format: t.format,
                  input: o.value,
                  ...(t.pattern ? { pattern: t.pattern.toString() } : {}),
                  inst: e,
                  continue: !t.abort,
                }));
          }))
        : ((r = e._zod).check ?? (r.check = () => {})));
  }),
  Ur = a("$ZodCheckRegex", (e, t) => {
    (_e.init(e, t),
      (e._zod.check = (n) => {
        ((t.pattern.lastIndex = 0),
          !t.pattern.test(n.value) &&
            n.issues.push({
              origin: "string",
              code: "invalid_format",
              format: "regex",
              input: n.value,
              pattern: t.pattern.toString(),
              inst: e,
              continue: !t.abort,
            }));
      }));
  }),
  Fr = a("$ZodCheckLowerCase", (e, t) => {
    (t.pattern ?? (t.pattern = jr), _e.init(e, t));
  }),
  Jr = a("$ZodCheckUpperCase", (e, t) => {
    (t.pattern ?? (t.pattern = Ar), _e.init(e, t));
  }),
  Mr = a("$ZodCheckIncludes", (e, t) => {
    E.init(e, t);
    const n = pe(t.includes),
      r = new RegExp(
        typeof t.position == "number" ? `^.{${t.position}}${n}` : n,
      );
    ((t.pattern = r),
      e._zod.onattach.push((o) => {
        const i = o._zod.bag;
        (i.patterns ?? (i.patterns = new Set()), i.patterns.add(r));
      }),
      (e._zod.check = (o) => {
        o.value.includes(t.includes, t.position) ||
          o.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "includes",
            includes: t.includes,
            input: o.value,
            inst: e,
            continue: !t.abort,
          });
      }));
  }),
  Lr = a("$ZodCheckStartsWith", (e, t) => {
    E.init(e, t);
    const n = new RegExp(`^${pe(t.prefix)}.*`);
    (t.pattern ?? (t.pattern = n),
      e._zod.onattach.push((r) => {
        const o = r._zod.bag;
        (o.patterns ?? (o.patterns = new Set()), o.patterns.add(n));
      }),
      (e._zod.check = (r) => {
        r.value.startsWith(t.prefix) ||
          r.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "starts_with",
            prefix: t.prefix,
            input: r.value,
            inst: e,
            continue: !t.abort,
          });
      }));
  }),
  Vr = a("$ZodCheckEndsWith", (e, t) => {
    E.init(e, t);
    const n = new RegExp(`.*${pe(t.suffix)}$`);
    (t.pattern ?? (t.pattern = n),
      e._zod.onattach.push((r) => {
        const o = r._zod.bag;
        (o.patterns ?? (o.patterns = new Set()), o.patterns.add(n));
      }),
      (e._zod.check = (r) => {
        r.value.endsWith(t.suffix) ||
          r.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "ends_with",
            suffix: t.suffix,
            input: r.value,
            inst: e,
            continue: !t.abort,
          });
      }));
  }),
  Wr = a("$ZodCheckOverwrite", (e, t) => {
    (E.init(e, t),
      (e._zod.check = (n) => {
        n.value = t.tx(n.value);
      }));
  });
class Br {
  constructor(t = []) {
    ((this.content = []), (this.indent = 0), this && (this.args = t));
  }
  indented(t) {
    ((this.indent += 1), t(this), (this.indent -= 1));
  }
  write(t) {
    if (typeof t == "function") {
      (t(this, { execution: "sync" }), t(this, { execution: "async" }));
      return;
    }
    const r = t
        .split(
          `
`,
        )
        .filter((s) => s),
      o = Math.min(...r.map((s) => s.length - s.trimStart().length)),
      i = r.map((s) => s.slice(o)).map((s) => " ".repeat(this.indent * 2) + s);
    for (const s of i) this.content.push(s);
  }
  compile() {
    const t = Function,
      n = this == null ? void 0 : this.args,
      o = [
        ...((this == null ? void 0 : this.content) ?? [""]).map(
          (i) => `  ${i}`,
        ),
      ];
    return new t(
      ...n,
      o.join(`
`),
    );
  }
}
const Gr = { major: 4, minor: 3, patch: 5 },
  $ = a("$ZodType", (e, t) => {
    var o;
    var n;
    (e ?? (e = {}),
      (e._zod.def = t),
      (e._zod.bag = e._zod.bag || {}),
      (e._zod.version = Gr));
    const r = [...(e._zod.def.checks ?? [])];
    e._zod.traits.has("$ZodCheck") && r.unshift(e);
    for (const i of r) for (const s of i._zod.onattach) s(e);
    if (r.length === 0)
      ((n = e._zod).deferred ?? (n.deferred = []),
        (o = e._zod.deferred) == null ||
          o.push(() => {
            e._zod.run = e._zod.parse;
          }));
    else {
      const i = (c, u, l) => {
          let f = M(c),
            d;
          for (const m of u) {
            if (m._zod.def.when) {
              if (!m._zod.def.when(c)) continue;
            } else if (f) continue;
            const p = c.issues.length,
              v = m._zod.check(c);
            if (v instanceof Promise && (l == null ? void 0 : l.async) === !1)
              throw new L();
            if (d || v instanceof Promise)
              d = (d ?? Promise.resolve()).then(async () => {
                (await v, c.issues.length !== p && (f || (f = M(c, p))));
              });
            else {
              if (c.issues.length === p) continue;
              f || (f = M(c, p));
            }
          }
          return d ? d.then(() => c) : c;
        },
        s = (c, u, l) => {
          if (M(c)) return ((c.aborted = !0), c);
          const f = i(u, r, l);
          if (f instanceof Promise) {
            if (l.async === !1) throw new L();
            return f.then((d) => e._zod.parse(d, l));
          }
          return e._zod.parse(f, l);
        };
      e._zod.run = (c, u) => {
        if (u.skipChecks) return e._zod.parse(c, u);
        if (u.direction === "backward") {
          const f = e._zod.parse(
            { value: c.value, issues: [] },
            { ...u, skipChecks: !0 },
          );
          return f instanceof Promise ? f.then((d) => s(d, c, u)) : s(f, c, u);
        }
        const l = e._zod.parse(c, u);
        if (l instanceof Promise) {
          if (u.async === !1) throw new L();
          return l.then((f) => i(f, r, u));
        }
        return i(l, r, u);
      };
    }
    g(e, "~standard", () => ({
      validate: (i) => {
        var s;
        try {
          const c = Qn(e, i);
          return c.success
            ? { value: c.data }
            : { issues: (s = c.error) == null ? void 0 : s.issues };
        } catch {
          return er(e, i).then((u) => {
            var l;
            return u.success
              ? { value: u.data }
              : { issues: (l = u.error) == null ? void 0 : l.issues };
          });
        }
      },
      vendor: "zod",
      version: 1,
    }));
  }),
  Je = a("$ZodString", (e, t) => {
    var n;
    ($.init(e, t),
      (e._zod.pattern =
        [
          ...(((n = e == null ? void 0 : e._zod.bag) == null
            ? void 0
            : n.patterns) ?? []),
        ].pop() ?? Ir(e._zod.bag)),
      (e._zod.parse = (r, o) => {
        if (t.coerce)
          try {
            r.value = String(r.value);
          } catch {}
        return (
          typeof r.value == "string" ||
            r.issues.push({
              expected: "string",
              code: "invalid_type",
              input: r.value,
              inst: e,
            }),
          r
        );
      }));
  }),
  b = a("$ZodStringFormat", (e, t) => {
    (_e.init(e, t), Je.init(e, t));
  }),
  Kr = a("$ZodGUID", (e, t) => {
    (t.pattern ?? (t.pattern = _r), b.init(e, t));
  }),
  Yr = a("$ZodUUID", (e, t) => {
    if (t.version) {
      const r = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[
        t.version
      ];
      if (r === void 0) throw new Error(`Invalid UUID version: "${t.version}"`);
      t.pattern ?? (t.pattern = rt(r));
    } else t.pattern ?? (t.pattern = rt());
    b.init(e, t);
  }),
  Xr = a("$ZodEmail", (e, t) => {
    (t.pattern ?? (t.pattern = vr), b.init(e, t));
  }),
  qr = a("$ZodURL", (e, t) => {
    (b.init(e, t),
      (e._zod.check = (n) => {
        try {
          const r = n.value.trim(),
            o = new URL(r);
          (t.hostname &&
            ((t.hostname.lastIndex = 0),
            t.hostname.test(o.hostname) ||
              n.issues.push({
                code: "invalid_format",
                format: "url",
                note: "Invalid hostname",
                pattern: t.hostname.source,
                input: n.value,
                inst: e,
                continue: !t.abort,
              })),
            t.protocol &&
              ((t.protocol.lastIndex = 0),
              t.protocol.test(
                o.protocol.endsWith(":") ? o.protocol.slice(0, -1) : o.protocol,
              ) ||
                n.issues.push({
                  code: "invalid_format",
                  format: "url",
                  note: "Invalid protocol",
                  pattern: t.protocol.source,
                  input: n.value,
                  inst: e,
                  continue: !t.abort,
                })),
            t.normalize ? (n.value = o.href) : (n.value = r));
          return;
        } catch {
          n.issues.push({
            code: "invalid_format",
            format: "url",
            input: n.value,
            inst: e,
            continue: !t.abort,
          });
        }
      }));
  }),
  Hr = a("$ZodEmoji", (e, t) => {
    (t.pattern ?? (t.pattern = br()), b.init(e, t));
  }),
  Qr = a("$ZodNanoID", (e, t) => {
    (t.pattern ?? (t.pattern = hr), b.init(e, t));
  }),
  eo = a("$ZodCUID", (e, t) => {
    (t.pattern ?? (t.pattern = ar), b.init(e, t));
  }),
  to = a("$ZodCUID2", (e, t) => {
    (t.pattern ?? (t.pattern = lr), b.init(e, t));
  }),
  no = a("$ZodULID", (e, t) => {
    (t.pattern ?? (t.pattern = fr), b.init(e, t));
  }),
  ro = a("$ZodXID", (e, t) => {
    (t.pattern ?? (t.pattern = dr), b.init(e, t));
  }),
  oo = a("$ZodKSUID", (e, t) => {
    (t.pattern ?? (t.pattern = pr), b.init(e, t));
  }),
  io = a("$ZodISODateTime", (e, t) => {
    (t.pattern ?? (t.pattern = Er(t)), b.init(e, t));
  }),
  so = a("$ZodISODate", (e, t) => {
    (t.pattern ?? (t.pattern = Zr), b.init(e, t));
  }),
  co = a("$ZodISOTime", (e, t) => {
    (t.pattern ?? (t.pattern = Or(t)), b.init(e, t));
  }),
  uo = a("$ZodISODuration", (e, t) => {
    (t.pattern ?? (t.pattern = mr), b.init(e, t));
  }),
  ao = a("$ZodIPv4", (e, t) => {
    (t.pattern ?? (t.pattern = yr), b.init(e, t), (e._zod.bag.format = "ipv4"));
  }),
  lo = a("$ZodIPv6", (e, t) => {
    (t.pattern ?? (t.pattern = wr),
      b.init(e, t),
      (e._zod.bag.format = "ipv6"),
      (e._zod.check = (n) => {
        try {
          new URL(`http://[${n.value}]`);
        } catch {
          n.issues.push({
            code: "invalid_format",
            format: "ipv6",
            input: n.value,
            inst: e,
            continue: !t.abort,
          });
        }
      }));
  }),
  fo = a("$ZodCIDRv4", (e, t) => {
    (t.pattern ?? (t.pattern = zr), b.init(e, t));
  }),
  po = a("$ZodCIDRv6", (e, t) => {
    (t.pattern ?? (t.pattern = $r),
      b.init(e, t),
      (e._zod.check = (n) => {
        const r = n.value.split("/");
        try {
          if (r.length !== 2) throw new Error();
          const [o, i] = r;
          if (!i) throw new Error();
          const s = Number(i);
          if (`${s}` !== i) throw new Error();
          if (s < 0 || s > 128) throw new Error();
          new URL(`http://[${o}]`);
        } catch {
          n.issues.push({
            code: "invalid_format",
            format: "cidrv6",
            input: n.value,
            inst: e,
            continue: !t.abort,
          });
        }
      }));
  });
function Kt(e) {
  if (e === "") return !0;
  if (e.length % 4 !== 0) return !1;
  try {
    return (atob(e), !0);
  } catch {
    return !1;
  }
}
const ho = a("$ZodBase64", (e, t) => {
  (t.pattern ?? (t.pattern = kr),
    b.init(e, t),
    (e._zod.bag.contentEncoding = "base64"),
    (e._zod.check = (n) => {
      Kt(n.value) ||
        n.issues.push({
          code: "invalid_format",
          format: "base64",
          input: n.value,
          inst: e,
          continue: !t.abort,
        });
    }));
});
function mo(e) {
  if (!Mt.test(e)) return !1;
  const t = e.replace(/[-_]/g, (r) => (r === "-" ? "+" : "/")),
    n = t.padEnd(Math.ceil(t.length / 4) * 4, "=");
  return Kt(n);
}
const _o = a("$ZodBase64URL", (e, t) => {
    (t.pattern ?? (t.pattern = Mt),
      b.init(e, t),
      (e._zod.bag.contentEncoding = "base64url"),
      (e._zod.check = (n) => {
        mo(n.value) ||
          n.issues.push({
            code: "invalid_format",
            format: "base64url",
            input: n.value,
            inst: e,
            continue: !t.abort,
          });
      }));
  }),
  vo = a("$ZodE164", (e, t) => {
    (t.pattern ?? (t.pattern = Sr), b.init(e, t));
  });
function go(e, t = null) {
  try {
    const n = e.split(".");
    if (n.length !== 3) return !1;
    const [r] = n;
    if (!r) return !1;
    const o = JSON.parse(atob(r));
    return !(
      ("typ" in o && (o == null ? void 0 : o.typ) !== "JWT") ||
      !o.alg ||
      (t && (!("alg" in o) || o.alg !== t))
    );
  } catch {
    return !1;
  }
}
const bo = a("$ZodJWT", (e, t) => {
    (b.init(e, t),
      (e._zod.check = (n) => {
        go(n.value, t.alg) ||
          n.issues.push({
            code: "invalid_format",
            format: "jwt",
            input: n.value,
            inst: e,
            continue: !t.abort,
          });
      }));
  }),
  Yt = a("$ZodNumber", (e, t) => {
    ($.init(e, t),
      (e._zod.pattern = e._zod.bag.pattern ?? Tr),
      (e._zod.parse = (n, r) => {
        if (t.coerce)
          try {
            n.value = Number(n.value);
          } catch {}
        const o = n.value;
        if (typeof o == "number" && !Number.isNaN(o) && Number.isFinite(o))
          return n;
        const i =
          typeof o == "number"
            ? Number.isNaN(o)
              ? "NaN"
              : Number.isFinite(o)
                ? void 0
                : "Infinity"
            : void 0;
        return (
          n.issues.push({
            expected: "number",
            code: "invalid_type",
            input: o,
            inst: e,
            ...(i ? { received: i } : {}),
          }),
          n
        );
      }));
  }),
  yo = a("$ZodNumberFormat", (e, t) => {
    (Cr.init(e, t), Yt.init(e, t));
  }),
  wo = a("$ZodUnknown", (e, t) => {
    ($.init(e, t), (e._zod.parse = (n) => n));
  }),
  zo = a("$ZodNever", (e, t) => {
    ($.init(e, t),
      (e._zod.parse = (n, r) => (
        n.issues.push({
          expected: "never",
          code: "invalid_type",
          input: n.value,
          inst: e,
        }),
        n
      )));
  });
function ot(e, t, n) {
  (e.issues.length && t.issues.push(...xt(n, e.issues)),
    (t.value[n] = e.value));
}
const $o = a("$ZodArray", (e, t) => {
  ($.init(e, t),
    (e._zod.parse = (n, r) => {
      const o = n.value;
      if (!Array.isArray(o))
        return (
          n.issues.push({
            expected: "array",
            code: "invalid_type",
            input: o,
            inst: e,
          }),
          n
        );
      n.value = Array(o.length);
      const i = [];
      for (let s = 0; s < o.length; s++) {
        const c = o[s],
          u = t.element._zod.run({ value: c, issues: [] }, r);
        u instanceof Promise ? i.push(u.then((l) => ot(l, n, s))) : ot(u, n, s);
      }
      return i.length ? Promise.all(i).then(() => n) : n;
    }));
});
function ue(e, t, n, r, o) {
  if (e.issues.length) {
    if (o && !(n in r)) return;
    t.issues.push(...xt(n, e.issues));
  }
  e.value === void 0 ? n in r && (t.value[n] = void 0) : (t.value[n] = e.value);
}
function Xt(e) {
  var r, o, i, s;
  const t = Object.keys(e.shape);
  for (const c of t)
    if (
      !(
        (s =
          (i =
            (o = (r = e.shape) == null ? void 0 : r[c]) == null
              ? void 0
              : o._zod) == null
            ? void 0
            : i.traits) != null && s.has("$ZodType")
      )
    )
      throw new Error(`Invalid element at key "${c}": expected a Zod schema`);
  const n = Mn(e.shape);
  return {
    ...e,
    keys: t,
    keySet: new Set(t),
    numKeys: t.length,
    optionalKeys: new Set(n),
  };
}
function qt(e, t, n, r, o, i) {
  const s = [],
    c = o.keySet,
    u = o.catchall._zod,
    l = u.def.type,
    f = u.optout === "optional";
  for (const d in t) {
    if (c.has(d)) continue;
    if (l === "never") {
      s.push(d);
      continue;
    }
    const m = u.run({ value: t[d], issues: [] }, r);
    m instanceof Promise
      ? e.push(m.then((p) => ue(p, n, d, t, f)))
      : ue(m, n, d, t, f);
  }
  return (
    s.length &&
      n.issues.push({ code: "unrecognized_keys", keys: s, input: t, inst: i }),
    e.length ? Promise.all(e).then(() => n) : n
  );
}
const ko = a("$ZodObject", (e, t) => {
    $.init(e, t);
    const n = Object.getOwnPropertyDescriptor(t, "shape");
    if (!(n != null && n.get)) {
      const c = t.shape;
      Object.defineProperty(t, "shape", {
        get: () => {
          const u = { ...c };
          return (Object.defineProperty(t, "shape", { value: u }), u);
        },
      });
    }
    const r = Ce(() => Xt(t));
    g(e._zod, "propValues", () => {
      const c = t.shape,
        u = {};
      for (const l in c) {
        const f = c[l]._zod;
        if (f.values) {
          u[l] ?? (u[l] = new Set());
          for (const d of f.values) u[l].add(d);
        }
      }
      return u;
    });
    const o = ce,
      i = t.catchall;
    let s;
    e._zod.parse = (c, u) => {
      s ?? (s = r.value);
      const l = c.value;
      if (!o(l))
        return (
          c.issues.push({
            expected: "object",
            code: "invalid_type",
            input: l,
            inst: e,
          }),
          c
        );
      c.value = {};
      const f = [],
        d = s.shape;
      for (const m of s.keys) {
        const p = d[m],
          v = p._zod.optout === "optional",
          _ = p._zod.run({ value: l[m], issues: [] }, u);
        _ instanceof Promise
          ? f.push(_.then((y) => ue(y, c, m, l, v)))
          : ue(_, c, m, l, v);
      }
      return i
        ? qt(f, l, c, u, r.value, e)
        : f.length
          ? Promise.all(f).then(() => c)
          : c;
    };
  }),
  So = a("$ZodObjectJIT", (e, t) => {
    ko.init(e, t);
    const n = e._zod.parse,
      r = Ce(() => Xt(t)),
      o = (m) => {
        var Q;
        const p = new Br(["shape", "payload", "ctx"]),
          v = r.value,
          _ = (T) => {
            const O = nt(T);
            return `shape[${O}]._zod.run({ value: input[${O}], issues: [] }, ctx)`;
          };
        p.write("const input = payload.value;");
        const y = Object.create(null);
        let C = 0;
        for (const T of v.keys) y[T] = `key_${C++}`;
        p.write("const newResult = {};");
        for (const T of v.keys) {
          const O = y[T],
            P = nt(T),
            ve = m[T],
            fn =
              ((Q = ve == null ? void 0 : ve._zod) == null
                ? void 0
                : Q.optout) === "optional";
          (p.write(`const ${O} = ${_(T)};`),
            fn
              ? p.write(`
        if (${O}.issues.length) {
          if (${P} in input) {
            payload.issues = payload.issues.concat(${O}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${P}, ...iss.path] : [${P}]
            })));
          }
        }
        
        if (${O}.value === undefined) {
          if (${P} in input) {
            newResult[${P}] = undefined;
          }
        } else {
          newResult[${P}] = ${O}.value;
        }
        
      `)
              : p.write(`
        if (${O}.issues.length) {
          payload.issues = payload.issues.concat(${O}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${P}, ...iss.path] : [${P}]
          })));
        }
        
        if (${O}.value === undefined) {
          if (${P} in input) {
            newResult[${P}] = undefined;
          }
        } else {
          newResult[${P}] = ${O}.value;
        }
        
      `));
        }
        (p.write("payload.value = newResult;"), p.write("return payload;"));
        const z = p.compile();
        return (T, O) => z(m, T, O);
      };
    let i;
    const s = ce,
      c = !Nt.jitless,
      l = c && Fn.value,
      f = t.catchall;
    let d;
    e._zod.parse = (m, p) => {
      d ?? (d = r.value);
      const v = m.value;
      return s(v)
        ? c && l && (p == null ? void 0 : p.async) === !1 && p.jitless !== !0
          ? (i || (i = o(t.shape)),
            (m = i(m, p)),
            f ? qt([], v, m, p, d, e) : m)
          : n(m, p)
        : (m.issues.push({
            expected: "object",
            code: "invalid_type",
            input: v,
            inst: e,
          }),
          m);
    };
  });
function it(e, t, n, r) {
  for (const i of e) if (i.issues.length === 0) return ((t.value = i.value), t);
  const o = e.filter((i) => !M(i));
  return o.length === 1
    ? ((t.value = o[0].value), o[0])
    : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: n,
        errors: e.map((i) => i.issues.map((s) => U(s, r, x()))),
      }),
      t);
}
const Zo = a("$ZodUnion", (e, t) => {
    ($.init(e, t),
      g(e._zod, "optin", () =>
        t.options.some((o) => o._zod.optin === "optional")
          ? "optional"
          : void 0,
      ),
      g(e._zod, "optout", () =>
        t.options.some((o) => o._zod.optout === "optional")
          ? "optional"
          : void 0,
      ),
      g(e._zod, "values", () => {
        if (t.options.every((o) => o._zod.values))
          return new Set(t.options.flatMap((o) => Array.from(o._zod.values)));
      }),
      g(e._zod, "pattern", () => {
        if (t.options.every((o) => o._zod.pattern)) {
          const o = t.options.map((i) => i._zod.pattern);
          return new RegExp(`^(${o.map((i) => De(i.source)).join("|")})$`);
        }
      }));
    const n = t.options.length === 1,
      r = t.options[0]._zod.run;
    e._zod.parse = (o, i) => {
      if (n) return r(o, i);
      let s = !1;
      const c = [];
      for (const u of t.options) {
        const l = u._zod.run({ value: o.value, issues: [] }, i);
        if (l instanceof Promise) (c.push(l), (s = !0));
        else {
          if (l.issues.length === 0) return l;
          c.push(l);
        }
      }
      return s ? Promise.all(c).then((u) => it(u, o, e, i)) : it(c, o, e, i);
    };
  }),
  Oo = a("$ZodIntersection", (e, t) => {
    ($.init(e, t),
      (e._zod.parse = (n, r) => {
        const o = n.value,
          i = t.left._zod.run({ value: o, issues: [] }, r),
          s = t.right._zod.run({ value: o, issues: [] }, r);
        return i instanceof Promise || s instanceof Promise
          ? Promise.all([i, s]).then(([u, l]) => st(n, u, l))
          : st(n, i, s);
      }));
  });
function Ae(e, t) {
  if (e === t) return { valid: !0, data: e };
  if (e instanceof Date && t instanceof Date && +e == +t)
    return { valid: !0, data: e };
  if (X(e) && X(t)) {
    const n = Object.keys(t),
      r = Object.keys(e).filter((i) => n.indexOf(i) !== -1),
      o = { ...e, ...t };
    for (const i of r) {
      const s = Ae(e[i], t[i]);
      if (!s.valid)
        return { valid: !1, mergeErrorPath: [i, ...s.mergeErrorPath] };
      o[i] = s.data;
    }
    return { valid: !0, data: o };
  }
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length) return { valid: !1, mergeErrorPath: [] };
    const n = [];
    for (let r = 0; r < e.length; r++) {
      const o = e[r],
        i = t[r],
        s = Ae(o, i);
      if (!s.valid)
        return { valid: !1, mergeErrorPath: [r, ...s.mergeErrorPath] };
      n.push(s.data);
    }
    return { valid: !0, data: n };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function st(e, t, n) {
  const r = new Map();
  let o;
  for (const c of t.issues)
    if (c.code === "unrecognized_keys") {
      o ?? (o = c);
      for (const u of c.keys) (r.has(u) || r.set(u, {}), (r.get(u).l = !0));
    } else e.issues.push(c);
  for (const c of n.issues)
    if (c.code === "unrecognized_keys")
      for (const u of c.keys) (r.has(u) || r.set(u, {}), (r.get(u).r = !0));
    else e.issues.push(c);
  const i = [...r].filter(([, c]) => c.l && c.r).map(([c]) => c);
  if ((i.length && o && e.issues.push({ ...o, keys: i }), M(e))) return e;
  const s = Ae(t.value, n.value);
  if (!s.valid)
    throw new Error(
      `Unmergable intersection. Error path: ${JSON.stringify(s.mergeErrorPath)}`,
    );
  return ((e.value = s.data), e);
}
const Eo = a("$ZodEnum", (e, t) => {
    $.init(e, t);
    const n = Ct(t.entries),
      r = new Set(n);
    ((e._zod.values = r),
      (e._zod.pattern = new RegExp(
        `^(${n
          .filter((o) => Jn.has(typeof o))
          .map((o) => (typeof o == "string" ? pe(o) : o.toString()))
          .join("|")})$`,
      )),
      (e._zod.parse = (o, i) => {
        const s = o.value;
        return (
          r.has(s) ||
            o.issues.push({
              code: "invalid_value",
              values: n,
              input: s,
              inst: e,
            }),
          o
        );
      }));
  }),
  Io = a("$ZodTransform", (e, t) => {
    ($.init(e, t),
      (e._zod.parse = (n, r) => {
        if (r.direction === "backward") throw new At(e.constructor.name);
        const o = t.transform(n.value, n);
        if (r.async)
          return (o instanceof Promise ? o : Promise.resolve(o)).then(
            (s) => ((n.value = s), n),
          );
        if (o instanceof Promise) throw new L();
        return ((n.value = o), n);
      }));
  });
function ct(e, t) {
  return e.issues.length && t === void 0 ? { issues: [], value: void 0 } : e;
}
const Ht = a("$ZodOptional", (e, t) => {
    ($.init(e, t),
      (e._zod.optin = "optional"),
      (e._zod.optout = "optional"),
      g(e._zod, "values", () =>
        t.innerType._zod.values
          ? new Set([...t.innerType._zod.values, void 0])
          : void 0,
      ),
      g(e._zod, "pattern", () => {
        const n = t.innerType._zod.pattern;
        return n ? new RegExp(`^(${De(n.source)})?$`) : void 0;
      }),
      (e._zod.parse = (n, r) => {
        if (t.innerType._zod.optin === "optional") {
          const o = t.innerType._zod.run(n, r);
          return o instanceof Promise
            ? o.then((i) => ct(i, n.value))
            : ct(o, n.value);
        }
        return n.value === void 0 ? n : t.innerType._zod.run(n, r);
      }));
  }),
  Po = a("$ZodExactOptional", (e, t) => {
    (Ht.init(e, t),
      g(e._zod, "values", () => t.innerType._zod.values),
      g(e._zod, "pattern", () => t.innerType._zod.pattern),
      (e._zod.parse = (n, r) => t.innerType._zod.run(n, r)));
  }),
  To = a("$ZodNullable", (e, t) => {
    ($.init(e, t),
      g(e._zod, "optin", () => t.innerType._zod.optin),
      g(e._zod, "optout", () => t.innerType._zod.optout),
      g(e._zod, "pattern", () => {
        const n = t.innerType._zod.pattern;
        return n ? new RegExp(`^(${De(n.source)}|null)$`) : void 0;
      }),
      g(e._zod, "values", () =>
        t.innerType._zod.values
          ? new Set([...t.innerType._zod.values, null])
          : void 0,
      ),
      (e._zod.parse = (n, r) =>
        n.value === null ? n : t.innerType._zod.run(n, r)));
  }),
  jo = a("$ZodDefault", (e, t) => {
    ($.init(e, t),
      (e._zod.optin = "optional"),
      g(e._zod, "values", () => t.innerType._zod.values),
      (e._zod.parse = (n, r) => {
        if (r.direction === "backward") return t.innerType._zod.run(n, r);
        if (n.value === void 0) return ((n.value = t.defaultValue), n);
        const o = t.innerType._zod.run(n, r);
        return o instanceof Promise ? o.then((i) => ut(i, t)) : ut(o, t);
      }));
  });
function ut(e, t) {
  return (e.value === void 0 && (e.value = t.defaultValue), e);
}
const Ao = a("$ZodPrefault", (e, t) => {
    ($.init(e, t),
      (e._zod.optin = "optional"),
      g(e._zod, "values", () => t.innerType._zod.values),
      (e._zod.parse = (n, r) => (
        r.direction === "backward" ||
          (n.value === void 0 && (n.value = t.defaultValue)),
        t.innerType._zod.run(n, r)
      )));
  }),
  No = a("$ZodNonOptional", (e, t) => {
    ($.init(e, t),
      g(e._zod, "values", () => {
        const n = t.innerType._zod.values;
        return n ? new Set([...n].filter((r) => r !== void 0)) : void 0;
      }),
      (e._zod.parse = (n, r) => {
        const o = t.innerType._zod.run(n, r);
        return o instanceof Promise ? o.then((i) => at(i, e)) : at(o, e);
      }));
  });
function at(e, t) {
  return (
    !e.issues.length &&
      e.value === void 0 &&
      e.issues.push({
        code: "invalid_type",
        expected: "nonoptional",
        input: e.value,
        inst: t,
      }),
    e
  );
}
const Co = a("$ZodCatch", (e, t) => {
    ($.init(e, t),
      g(e._zod, "optin", () => t.innerType._zod.optin),
      g(e._zod, "optout", () => t.innerType._zod.optout),
      g(e._zod, "values", () => t.innerType._zod.values),
      (e._zod.parse = (n, r) => {
        if (r.direction === "backward") return t.innerType._zod.run(n, r);
        const o = t.innerType._zod.run(n, r);
        return o instanceof Promise
          ? o.then(
              (i) => (
                (n.value = i.value),
                i.issues.length &&
                  ((n.value = t.catchValue({
                    ...n,
                    error: { issues: i.issues.map((s) => U(s, r, x())) },
                    input: n.value,
                  })),
                  (n.issues = [])),
                n
              ),
            )
          : ((n.value = o.value),
            o.issues.length &&
              ((n.value = t.catchValue({
                ...n,
                error: { issues: o.issues.map((i) => U(i, r, x())) },
                input: n.value,
              })),
              (n.issues = [])),
            n);
      }));
  }),
  Ro = a("$ZodPipe", (e, t) => {
    ($.init(e, t),
      g(e._zod, "values", () => t.in._zod.values),
      g(e._zod, "optin", () => t.in._zod.optin),
      g(e._zod, "optout", () => t.out._zod.optout),
      g(e._zod, "propValues", () => t.in._zod.propValues),
      (e._zod.parse = (n, r) => {
        if (r.direction === "backward") {
          const i = t.out._zod.run(n, r);
          return i instanceof Promise
            ? i.then((s) => re(s, t.in, r))
            : re(i, t.in, r);
        }
        const o = t.in._zod.run(n, r);
        return o instanceof Promise
          ? o.then((i) => re(i, t.out, r))
          : re(o, t.out, r);
      }));
  });
function re(e, t, n) {
  return e.issues.length
    ? ((e.aborted = !0), e)
    : t._zod.run({ value: e.value, issues: e.issues }, n);
}
const Do = a("$ZodReadonly", (e, t) => {
  ($.init(e, t),
    g(e._zod, "propValues", () => t.innerType._zod.propValues),
    g(e._zod, "values", () => t.innerType._zod.values),
    g(e._zod, "optin", () => {
      var n, r;
      return (r = (n = t.innerType) == null ? void 0 : n._zod) == null
        ? void 0
        : r.optin;
    }),
    g(e._zod, "optout", () => {
      var n, r;
      return (r = (n = t.innerType) == null ? void 0 : n._zod) == null
        ? void 0
        : r.optout;
    }),
    (e._zod.parse = (n, r) => {
      if (r.direction === "backward") return t.innerType._zod.run(n, r);
      const o = t.innerType._zod.run(n, r);
      return o instanceof Promise ? o.then(lt) : lt(o);
    }));
});
function lt(e) {
  return ((e.value = Object.freeze(e.value)), e);
}
const xo = a("$ZodCustom", (e, t) => {
  (E.init(e, t),
    $.init(e, t),
    (e._zod.parse = (n, r) => n),
    (e._zod.check = (n) => {
      const r = n.value,
        o = t.fn(r);
      if (o instanceof Promise) return o.then((i) => ft(i, n, r, e));
      ft(o, n, r, e);
    }));
});
function ft(e, t, n, r) {
  if (!e) {
    const o = {
      code: "custom",
      input: n,
      inst: r,
      path: [...(r._zod.def.path ?? [])],
      continue: !r._zod.def.abort,
    };
    (r._zod.def.params && (o.params = r._zod.def.params), t.issues.push(q(o)));
  }
}
var dt;
class Uo {
  constructor() {
    ((this._map = new WeakMap()), (this._idmap = new Map()));
  }
  add(t, ...n) {
    const r = n[0];
    return (
      this._map.set(t, r),
      r && typeof r == "object" && "id" in r && this._idmap.set(r.id, t),
      this
    );
  }
  clear() {
    return ((this._map = new WeakMap()), (this._idmap = new Map()), this);
  }
  remove(t) {
    const n = this._map.get(t);
    return (
      n && typeof n == "object" && "id" in n && this._idmap.delete(n.id),
      this._map.delete(t),
      this
    );
  }
  get(t) {
    const n = t._zod.parent;
    if (n) {
      const r = { ...(this.get(n) ?? {}) };
      delete r.id;
      const o = { ...r, ...this._map.get(t) };
      return Object.keys(o).length ? o : void 0;
    }
    return this._map.get(t);
  }
  has(t) {
    return this._map.has(t);
  }
}
function Fo() {
  return new Uo();
}
(dt = globalThis).__zod_globalRegistry ?? (dt.__zod_globalRegistry = Fo());
const Y = globalThis.__zod_globalRegistry;
function Jo(e, t) {
  return new e({ type: "string", ...h(t) });
}
function Mo(e, t) {
  return new e({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...h(t),
  });
}
function pt(e, t) {
  return new e({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...h(t),
  });
}
function Lo(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...h(t),
  });
}
function Vo(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...h(t),
  });
}
function Wo(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...h(t),
  });
}
function Bo(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...h(t),
  });
}
function Go(e, t) {
  return new e({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...h(t),
  });
}
function Ko(e, t) {
  return new e({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...h(t),
  });
}
function Yo(e, t) {
  return new e({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...h(t),
  });
}
function Xo(e, t) {
  return new e({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...h(t),
  });
}
function qo(e, t) {
  return new e({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...h(t),
  });
}
function Ho(e, t) {
  return new e({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...h(t),
  });
}
function Qo(e, t) {
  return new e({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...h(t),
  });
}
function ei(e, t) {
  return new e({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...h(t),
  });
}
function ti(e, t) {
  return new e({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...h(t),
  });
}
function ni(e, t) {
  return new e({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...h(t),
  });
}
function ri(e, t) {
  return new e({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...h(t),
  });
}
function oi(e, t) {
  return new e({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...h(t),
  });
}
function ii(e, t) {
  return new e({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...h(t),
  });
}
function si(e, t) {
  return new e({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...h(t),
  });
}
function ci(e, t) {
  return new e({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...h(t),
  });
}
function ui(e, t) {
  return new e({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...h(t),
  });
}
function ai(e, t) {
  return new e({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...h(t),
  });
}
function li(e, t) {
  return new e({
    type: "string",
    format: "date",
    check: "string_format",
    ...h(t),
  });
}
function fi(e, t) {
  return new e({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...h(t),
  });
}
function di(e, t) {
  return new e({
    type: "string",
    format: "duration",
    check: "string_format",
    ...h(t),
  });
}
function pi(e, t) {
  return new e({ type: "number", checks: [], ...h(t) });
}
function hi(e, t) {
  return new e({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...h(t),
  });
}
function mi(e) {
  return new e({ type: "unknown" });
}
function _i(e, t) {
  return new e({ type: "never", ...h(t) });
}
function ht(e, t) {
  return new Bt({ check: "less_than", ...h(t), value: e, inclusive: !1 });
}
function $e(e, t) {
  return new Bt({ check: "less_than", ...h(t), value: e, inclusive: !0 });
}
function mt(e, t) {
  return new Gt({ check: "greater_than", ...h(t), value: e, inclusive: !1 });
}
function ke(e, t) {
  return new Gt({ check: "greater_than", ...h(t), value: e, inclusive: !0 });
}
function _t(e, t) {
  return new Nr({ check: "multiple_of", ...h(t), value: e });
}
function Qt(e, t) {
  return new Rr({ check: "max_length", ...h(t), maximum: e });
}
function ae(e, t) {
  return new Dr({ check: "min_length", ...h(t), minimum: e });
}
function en(e, t) {
  return new xr({ check: "length_equals", ...h(t), length: e });
}
function vi(e, t) {
  return new Ur({
    check: "string_format",
    format: "regex",
    ...h(t),
    pattern: e,
  });
}
function gi(e) {
  return new Fr({ check: "string_format", format: "lowercase", ...h(e) });
}
function bi(e) {
  return new Jr({ check: "string_format", format: "uppercase", ...h(e) });
}
function yi(e, t) {
  return new Mr({
    check: "string_format",
    format: "includes",
    ...h(t),
    includes: e,
  });
}
function wi(e, t) {
  return new Lr({
    check: "string_format",
    format: "starts_with",
    ...h(t),
    prefix: e,
  });
}
function zi(e, t) {
  return new Vr({
    check: "string_format",
    format: "ends_with",
    ...h(t),
    suffix: e,
  });
}
function B(e) {
  return new Wr({ check: "overwrite", tx: e });
}
function $i(e) {
  return B((t) => t.normalize(e));
}
function ki() {
  return B((e) => e.trim());
}
function Si() {
  return B((e) => e.toLowerCase());
}
function Zi() {
  return B((e) => e.toUpperCase());
}
function Oi() {
  return B((e) => Un(e));
}
function Ei(e, t, n) {
  return new e({ type: "array", element: t, ...h(n) });
}
function Ii(e, t, n) {
  return new e({ type: "custom", check: "custom", fn: t, ...h(n) });
}
function Pi(e) {
  const t = Ti(
    (n) => (
      (n.addIssue = (r) => {
        if (typeof r == "string") n.issues.push(q(r, n.value, t._zod.def));
        else {
          const o = r;
          (o.fatal && (o.continue = !1),
            o.code ?? (o.code = "custom"),
            o.input ?? (o.input = n.value),
            o.inst ?? (o.inst = t),
            o.continue ?? (o.continue = !t._zod.def.abort),
            n.issues.push(q(o)));
        }
      }),
      e(n.value, n)
    ),
  );
  return t;
}
function Ti(e, t) {
  const n = new E({ check: "custom", ...h(t) });
  return ((n._zod.check = e), n);
}
function tn(e) {
  let t = (e == null ? void 0 : e.target) ?? "draft-2020-12";
  return (
    t === "draft-4" && (t = "draft-04"),
    t === "draft-7" && (t = "draft-07"),
    {
      processors: e.processors ?? {},
      metadataRegistry: (e == null ? void 0 : e.metadata) ?? Y,
      target: t,
      unrepresentable: (e == null ? void 0 : e.unrepresentable) ?? "throw",
      override: (e == null ? void 0 : e.override) ?? (() => {}),
      io: (e == null ? void 0 : e.io) ?? "output",
      counter: 0,
      seen: new Map(),
      cycles: (e == null ? void 0 : e.cycles) ?? "ref",
      reused: (e == null ? void 0 : e.reused) ?? "inline",
      external: (e == null ? void 0 : e.external) ?? void 0,
    }
  );
}
function S(e, t, n = { path: [], schemaPath: [] }) {
  var f, d;
  var r;
  const o = e._zod.def,
    i = t.seen.get(e);
  if (i)
    return (
      i.count++,
      n.schemaPath.includes(e) && (i.cycle = n.path),
      i.schema
    );
  const s = { schema: {}, count: 1, cycle: void 0, path: n.path };
  t.seen.set(e, s);
  const c = (d = (f = e._zod).toJSONSchema) == null ? void 0 : d.call(f);
  if (c) s.schema = c;
  else {
    const m = { ...n, schemaPath: [...n.schemaPath, e], path: n.path };
    if (e._zod.processJSONSchema) e._zod.processJSONSchema(t, s.schema, m);
    else {
      const v = s.schema,
        _ = t.processors[o.type];
      if (!_)
        throw new Error(
          `[toJSONSchema]: Non-representable type encountered: ${o.type}`,
        );
      _(e, t, v, m);
    }
    const p = e._zod.parent;
    p && (s.ref || (s.ref = p), S(p, t, m), (t.seen.get(p).isParent = !0));
  }
  const u = t.metadataRegistry.get(e);
  return (
    u && Object.assign(s.schema, u),
    t.io === "input" &&
      Z(e) &&
      (delete s.schema.examples, delete s.schema.default),
    t.io === "input" &&
      s.schema._prefault &&
      ((r = s.schema).default ?? (r.default = s.schema._prefault)),
    delete s.schema._prefault,
    t.seen.get(e).schema
  );
}
function nn(e, t) {
  var s, c, u, l;
  const n = e.seen.get(t);
  if (!n) throw new Error("Unprocessed schema. This is a bug in Zod.");
  const r = new Map();
  for (const f of e.seen.entries()) {
    const d = (s = e.metadataRegistry.get(f[0])) == null ? void 0 : s.id;
    if (d) {
      const m = r.get(d);
      if (m && m !== f[0])
        throw new Error(
          `Duplicate schema id "${d}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`,
        );
      r.set(d, f[0]);
    }
  }
  const o = (f) => {
      var _;
      const d = e.target === "draft-2020-12" ? "$defs" : "definitions";
      if (e.external) {
        const y = (_ = e.external.registry.get(f[0])) == null ? void 0 : _.id,
          C = e.external.uri ?? ((Q) => Q);
        if (y) return { ref: C(y) };
        const z = f[1].defId ?? f[1].schema.id ?? `schema${e.counter++}`;
        return (
          (f[1].defId = z),
          { defId: z, ref: `${C("__shared")}#/${d}/${z}` }
        );
      }
      if (f[1] === n) return { ref: "#" };
      const p = `#/${d}/`,
        v = f[1].schema.id ?? `__schema${e.counter++}`;
      return { defId: v, ref: p + v };
    },
    i = (f) => {
      if (f[1].schema.$ref) return;
      const d = f[1],
        { ref: m, defId: p } = o(f);
      ((d.def = { ...d.schema }), p && (d.defId = p));
      const v = d.schema;
      for (const _ in v) delete v[_];
      v.$ref = m;
    };
  if (e.cycles === "throw")
    for (const f of e.seen.entries()) {
      const d = f[1];
      if (d.cycle)
        throw new Error(`Cycle detected: #/${(c = d.cycle) == null ? void 0 : c.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
    }
  for (const f of e.seen.entries()) {
    const d = f[1];
    if (t === f[0]) {
      i(f);
      continue;
    }
    if (e.external) {
      const p = (u = e.external.registry.get(f[0])) == null ? void 0 : u.id;
      if (t !== f[0] && p) {
        i(f);
        continue;
      }
    }
    if ((l = e.metadataRegistry.get(f[0])) == null ? void 0 : l.id) {
      i(f);
      continue;
    }
    if (d.cycle) {
      i(f);
      continue;
    }
    if (d.count > 1 && e.reused === "ref") {
      i(f);
      continue;
    }
  }
}
function rn(e, t) {
  var s, c, u;
  const n = e.seen.get(t);
  if (!n) throw new Error("Unprocessed schema. This is a bug in Zod.");
  const r = (l) => {
    const f = e.seen.get(l);
    if (f.ref === null) return;
    const d = f.def ?? f.schema,
      m = { ...d },
      p = f.ref;
    if (((f.ref = null), p)) {
      r(p);
      const _ = e.seen.get(p),
        y = _.schema;
      if (
        (y.$ref &&
        (e.target === "draft-07" ||
          e.target === "draft-04" ||
          e.target === "openapi-3.0")
          ? ((d.allOf = d.allOf ?? []), d.allOf.push(y))
          : Object.assign(d, y),
        Object.assign(d, m),
        l._zod.parent === p)
      )
        for (const z in d)
          z === "$ref" || z === "allOf" || z in m || delete d[z];
      if (y.$ref)
        for (const z in d)
          z === "$ref" ||
            z === "allOf" ||
            (z in _.def &&
              JSON.stringify(d[z]) === JSON.stringify(_.def[z]) &&
              delete d[z]);
    }
    const v = l._zod.parent;
    if (v && v !== p) {
      r(v);
      const _ = e.seen.get(v);
      if (_ != null && _.schema.$ref && ((d.$ref = _.schema.$ref), _.def))
        for (const y in d)
          y === "$ref" ||
            y === "allOf" ||
            (y in _.def &&
              JSON.stringify(d[y]) === JSON.stringify(_.def[y]) &&
              delete d[y]);
    }
    e.override({ zodSchema: l, jsonSchema: d, path: f.path ?? [] });
  };
  for (const l of [...e.seen.entries()].reverse()) r(l[0]);
  const o = {};
  if (
    (e.target === "draft-2020-12"
      ? (o.$schema = "https://json-schema.org/draft/2020-12/schema")
      : e.target === "draft-07"
        ? (o.$schema = "http://json-schema.org/draft-07/schema#")
        : e.target === "draft-04"
          ? (o.$schema = "http://json-schema.org/draft-04/schema#")
          : e.target,
    (s = e.external) != null && s.uri)
  ) {
    const l = (c = e.external.registry.get(t)) == null ? void 0 : c.id;
    if (!l) throw new Error("Schema is missing an `id` property");
    o.$id = e.external.uri(l);
  }
  Object.assign(o, n.def ?? n.schema);
  const i = ((u = e.external) == null ? void 0 : u.defs) ?? {};
  for (const l of e.seen.entries()) {
    const f = l[1];
    f.def && f.defId && (i[f.defId] = f.def);
  }
  e.external ||
    (Object.keys(i).length > 0 &&
      (e.target === "draft-2020-12" ? (o.$defs = i) : (o.definitions = i)));
  try {
    const l = JSON.parse(JSON.stringify(o));
    return (
      Object.defineProperty(l, "~standard", {
        value: {
          ...t["~standard"],
          jsonSchema: {
            input: le(t, "input", e.processors),
            output: le(t, "output", e.processors),
          },
        },
        enumerable: !1,
        writable: !1,
      }),
      l
    );
  } catch {
    throw new Error("Error converting schema to JSON.");
  }
}
function Z(e, t) {
  const n = t ?? { seen: new Set() };
  if (n.seen.has(e)) return !1;
  n.seen.add(e);
  const r = e._zod.def;
  if (r.type === "transform") return !0;
  if (r.type === "array") return Z(r.element, n);
  if (r.type === "set") return Z(r.valueType, n);
  if (r.type === "lazy") return Z(r.getter(), n);
  if (
    r.type === "promise" ||
    r.type === "optional" ||
    r.type === "nonoptional" ||
    r.type === "nullable" ||
    r.type === "readonly" ||
    r.type === "default" ||
    r.type === "prefault"
  )
    return Z(r.innerType, n);
  if (r.type === "intersection") return Z(r.left, n) || Z(r.right, n);
  if (r.type === "record" || r.type === "map")
    return Z(r.keyType, n) || Z(r.valueType, n);
  if (r.type === "pipe") return Z(r.in, n) || Z(r.out, n);
  if (r.type === "object") {
    for (const o in r.shape) if (Z(r.shape[o], n)) return !0;
    return !1;
  }
  if (r.type === "union") {
    for (const o of r.options) if (Z(o, n)) return !0;
    return !1;
  }
  if (r.type === "tuple") {
    for (const o of r.items) if (Z(o, n)) return !0;
    return !!(r.rest && Z(r.rest, n));
  }
  return !1;
}
const ji =
    (e, t = {}) =>
    (n) => {
      const r = tn({ ...n, processors: t });
      return (S(e, r), nn(r, e), rn(r, e));
    },
  le =
    (e, t, n = {}) =>
    (r) => {
      const { libraryOptions: o, target: i } = r ?? {},
        s = tn({ ...(o ?? {}), target: i, io: t, processors: n });
      return (S(e, s), nn(s, e), rn(s, e));
    },
  Ai = {
    guid: "uuid",
    url: "uri",
    datetime: "date-time",
    json_string: "json-string",
    regex: "",
  },
  Ni = (e, t, n, r) => {
    const o = n;
    o.type = "string";
    const {
      minimum: i,
      maximum: s,
      format: c,
      patterns: u,
      contentEncoding: l,
    } = e._zod.bag;
    if (
      (typeof i == "number" && (o.minLength = i),
      typeof s == "number" && (o.maxLength = s),
      c &&
        ((o.format = Ai[c] ?? c),
        o.format === "" && delete o.format,
        c === "time" && delete o.format),
      l && (o.contentEncoding = l),
      u && u.size > 0)
    ) {
      const f = [...u];
      f.length === 1
        ? (o.pattern = f[0].source)
        : f.length > 1 &&
          (o.allOf = [
            ...f.map((d) => ({
              ...(t.target === "draft-07" ||
              t.target === "draft-04" ||
              t.target === "openapi-3.0"
                ? { type: "string" }
                : {}),
              pattern: d.source,
            })),
          ]);
    }
  },
  Ci = (e, t, n, r) => {
    const o = n,
      {
        minimum: i,
        maximum: s,
        format: c,
        multipleOf: u,
        exclusiveMaximum: l,
        exclusiveMinimum: f,
      } = e._zod.bag;
    (typeof c == "string" && c.includes("int")
      ? (o.type = "integer")
      : (o.type = "number"),
      typeof f == "number" &&
        (t.target === "draft-04" || t.target === "openapi-3.0"
          ? ((o.minimum = f), (o.exclusiveMinimum = !0))
          : (o.exclusiveMinimum = f)),
      typeof i == "number" &&
        ((o.minimum = i),
        typeof f == "number" &&
          t.target !== "draft-04" &&
          (f >= i ? delete o.minimum : delete o.exclusiveMinimum)),
      typeof l == "number" &&
        (t.target === "draft-04" || t.target === "openapi-3.0"
          ? ((o.maximum = l), (o.exclusiveMaximum = !0))
          : (o.exclusiveMaximum = l)),
      typeof s == "number" &&
        ((o.maximum = s),
        typeof l == "number" &&
          t.target !== "draft-04" &&
          (l <= s ? delete o.maximum : delete o.exclusiveMaximum)),
      typeof u == "number" && (o.multipleOf = u));
  },
  Ri = (e, t, n, r) => {
    n.not = {};
  },
  Di = (e, t, n, r) => {},
  xi = (e, t, n, r) => {
    const o = e._zod.def,
      i = Ct(o.entries);
    (i.every((s) => typeof s == "number") && (n.type = "number"),
      i.every((s) => typeof s == "string") && (n.type = "string"),
      (n.enum = i));
  },
  Ui = (e, t, n, r) => {
    if (t.unrepresentable === "throw")
      throw new Error("Custom types cannot be represented in JSON Schema");
  },
  Fi = (e, t, n, r) => {
    if (t.unrepresentable === "throw")
      throw new Error("Transforms cannot be represented in JSON Schema");
  },
  Ji = (e, t, n, r) => {
    const o = n,
      i = e._zod.def,
      { minimum: s, maximum: c } = e._zod.bag;
    (typeof s == "number" && (o.minItems = s),
      typeof c == "number" && (o.maxItems = c),
      (o.type = "array"),
      (o.items = S(i.element, t, { ...r, path: [...r.path, "items"] })));
  },
  Mi = (e, t, n, r) => {
    var l;
    const o = n,
      i = e._zod.def;
    ((o.type = "object"), (o.properties = {}));
    const s = i.shape;
    for (const f in s)
      o.properties[f] = S(s[f], t, {
        ...r,
        path: [...r.path, "properties", f],
      });
    const c = new Set(Object.keys(s)),
      u = new Set(
        [...c].filter((f) => {
          const d = i.shape[f]._zod;
          return t.io === "input" ? d.optin === void 0 : d.optout === void 0;
        }),
      );
    (u.size > 0 && (o.required = Array.from(u)),
      ((l = i.catchall) == null ? void 0 : l._zod.def.type) === "never"
        ? (o.additionalProperties = !1)
        : i.catchall
          ? i.catchall &&
            (o.additionalProperties = S(i.catchall, t, {
              ...r,
              path: [...r.path, "additionalProperties"],
            }))
          : t.io === "output" && (o.additionalProperties = !1));
  },
  Li = (e, t, n, r) => {
    const o = e._zod.def,
      i = o.inclusive === !1,
      s = o.options.map((c, u) =>
        S(c, t, { ...r, path: [...r.path, i ? "oneOf" : "anyOf", u] }),
      );
    i ? (n.oneOf = s) : (n.anyOf = s);
  },
  Vi = (e, t, n, r) => {
    const o = e._zod.def,
      i = S(o.left, t, { ...r, path: [...r.path, "allOf", 0] }),
      s = S(o.right, t, { ...r, path: [...r.path, "allOf", 1] }),
      c = (l) => "allOf" in l && Object.keys(l).length === 1,
      u = [...(c(i) ? i.allOf : [i]), ...(c(s) ? s.allOf : [s])];
    n.allOf = u;
  },
  Wi = (e, t, n, r) => {
    const o = e._zod.def,
      i = S(o.innerType, t, r),
      s = t.seen.get(e);
    t.target === "openapi-3.0"
      ? ((s.ref = o.innerType), (n.nullable = !0))
      : (n.anyOf = [i, { type: "null" }]);
  },
  Bi = (e, t, n, r) => {
    const o = e._zod.def;
    S(o.innerType, t, r);
    const i = t.seen.get(e);
    i.ref = o.innerType;
  },
  Gi = (e, t, n, r) => {
    const o = e._zod.def;
    S(o.innerType, t, r);
    const i = t.seen.get(e);
    ((i.ref = o.innerType),
      (n.default = JSON.parse(JSON.stringify(o.defaultValue))));
  },
  Ki = (e, t, n, r) => {
    const o = e._zod.def;
    S(o.innerType, t, r);
    const i = t.seen.get(e);
    ((i.ref = o.innerType),
      t.io === "input" &&
        (n._prefault = JSON.parse(JSON.stringify(o.defaultValue))));
  },
  Yi = (e, t, n, r) => {
    const o = e._zod.def;
    S(o.innerType, t, r);
    const i = t.seen.get(e);
    i.ref = o.innerType;
    let s;
    try {
      s = o.catchValue(void 0);
    } catch {
      throw new Error("Dynamic catch values are not supported in JSON Schema");
    }
    n.default = s;
  },
  Xi = (e, t, n, r) => {
    const o = e._zod.def,
      i =
        t.io === "input"
          ? o.in._zod.def.type === "transform"
            ? o.out
            : o.in
          : o.out;
    S(i, t, r);
    const s = t.seen.get(e);
    s.ref = i;
  },
  qi = (e, t, n, r) => {
    const o = e._zod.def;
    S(o.innerType, t, r);
    const i = t.seen.get(e);
    ((i.ref = o.innerType), (n.readOnly = !0));
  },
  on = (e, t, n, r) => {
    const o = e._zod.def;
    S(o.innerType, t, r);
    const i = t.seen.get(e);
    i.ref = o.innerType;
  },
  Hi = a("ZodISODateTime", (e, t) => {
    (io.init(e, t), w.init(e, t));
  });
function Qi(e) {
  return ai(Hi, e);
}
const es = a("ZodISODate", (e, t) => {
  (so.init(e, t), w.init(e, t));
});
function ts(e) {
  return li(es, e);
}
const ns = a("ZodISOTime", (e, t) => {
  (co.init(e, t), w.init(e, t));
});
function rs(e) {
  return fi(ns, e);
}
const os = a("ZodISODuration", (e, t) => {
  (uo.init(e, t), w.init(e, t));
});
function is(e) {
  return di(os, e);
}
const ss = (e, t) => {
    (Ft.init(e, t),
      (e.name = "ZodError"),
      Object.defineProperties(e, {
        format: { value: (n) => Hn(e, n) },
        flatten: { value: (n) => qn(e, n) },
        addIssue: {
          value: (n) => {
            (e.issues.push(n), (e.message = JSON.stringify(e.issues, je, 2)));
          },
        },
        addIssues: {
          value: (n) => {
            (e.issues.push(...n),
              (e.message = JSON.stringify(e.issues, je, 2)));
          },
        },
        isEmpty: {
          get() {
            return e.issues.length === 0;
          },
        },
      }));
  },
  I = a("ZodError", ss, { Parent: Error }),
  cs = Ue(I),
  us = Fe(I),
  as = he(I),
  ls = me(I),
  fs = tr(I),
  ds = nr(I),
  ps = rr(I),
  hs = or(I),
  ms = ir(I),
  _s = sr(I),
  vs = cr(I),
  gs = ur(I),
  k = a(
    "ZodType",
    (e, t) => (
      $.init(e, t),
      Object.assign(e["~standard"], {
        jsonSchema: { input: le(e, "input"), output: le(e, "output") },
      }),
      (e.toJSONSchema = ji(e, {})),
      (e.def = t),
      (e.type = t.type),
      Object.defineProperty(e, "_def", { value: t }),
      (e.check = (...n) =>
        e.clone(
          A(t, {
            checks: [
              ...(t.checks ?? []),
              ...n.map((r) =>
                typeof r == "function"
                  ? {
                      _zod: {
                        check: r,
                        def: { check: "custom" },
                        onattach: [],
                      },
                    }
                  : r,
              ),
            ],
          }),
          { parent: !0 },
        )),
      (e.with = e.check),
      (e.clone = (n, r) => N(e, n, r)),
      (e.brand = () => e),
      (e.register = (n, r) => (n.add(e, r), e)),
      (e.parse = (n, r) => cs(e, n, r, { callee: e.parse })),
      (e.safeParse = (n, r) => as(e, n, r)),
      (e.parseAsync = async (n, r) => us(e, n, r, { callee: e.parseAsync })),
      (e.safeParseAsync = async (n, r) => ls(e, n, r)),
      (e.spa = e.safeParseAsync),
      (e.encode = (n, r) => fs(e, n, r)),
      (e.decode = (n, r) => ds(e, n, r)),
      (e.encodeAsync = async (n, r) => ps(e, n, r)),
      (e.decodeAsync = async (n, r) => hs(e, n, r)),
      (e.safeEncode = (n, r) => ms(e, n, r)),
      (e.safeDecode = (n, r) => _s(e, n, r)),
      (e.safeEncodeAsync = async (n, r) => vs(e, n, r)),
      (e.safeDecodeAsync = async (n, r) => gs(e, n, r)),
      (e.refine = (n, r) => e.check(hc(n, r))),
      (e.superRefine = (n) => e.check(mc(n))),
      (e.overwrite = (n) => e.check(B(n))),
      (e.optional = () => yt(e)),
      (e.exactOptional = () => tc(e)),
      (e.nullable = () => wt(e)),
      (e.nullish = () => yt(wt(e))),
      (e.nonoptional = (n) => cc(e, n)),
      (e.array = () => Vs(e)),
      (e.or = (n) => Ks([e, n])),
      (e.and = (n) => Xs(e, n)),
      (e.transform = (n) => zt(e, Qs(n))),
      (e.default = (n) => oc(e, n)),
      (e.prefault = (n) => sc(e, n)),
      (e.catch = (n) => ac(e, n)),
      (e.pipe = (n) => zt(e, n)),
      (e.readonly = () => dc(e)),
      (e.describe = (n) => {
        const r = e.clone();
        return (Y.add(r, { description: n }), r);
      }),
      Object.defineProperty(e, "description", {
        get() {
          var n;
          return (n = Y.get(e)) == null ? void 0 : n.description;
        },
        configurable: !0,
      }),
      (e.meta = (...n) => {
        if (n.length === 0) return Y.get(e);
        const r = e.clone();
        return (Y.add(r, n[0]), r);
      }),
      (e.isOptional = () => e.safeParse(void 0).success),
      (e.isNullable = () => e.safeParse(null).success),
      (e.apply = (n) => n(e)),
      e
    ),
  ),
  sn = a("_ZodString", (e, t) => {
    (Je.init(e, t),
      k.init(e, t),
      (e._zod.processJSONSchema = (r, o, i) => Ni(e, r, o)));
    const n = e._zod.bag;
    ((e.format = n.format ?? null),
      (e.minLength = n.minimum ?? null),
      (e.maxLength = n.maximum ?? null),
      (e.regex = (...r) => e.check(vi(...r))),
      (e.includes = (...r) => e.check(yi(...r))),
      (e.startsWith = (...r) => e.check(wi(...r))),
      (e.endsWith = (...r) => e.check(zi(...r))),
      (e.min = (...r) => e.check(ae(...r))),
      (e.max = (...r) => e.check(Qt(...r))),
      (e.length = (...r) => e.check(en(...r))),
      (e.nonempty = (...r) => e.check(ae(1, ...r))),
      (e.lowercase = (r) => e.check(gi(r))),
      (e.uppercase = (r) => e.check(bi(r))),
      (e.trim = () => e.check(ki())),
      (e.normalize = (...r) => e.check($i(...r))),
      (e.toLowerCase = () => e.check(Si())),
      (e.toUpperCase = () => e.check(Zi())),
      (e.slugify = () => e.check(Oi())));
  }),
  bs = a("ZodString", (e, t) => {
    (Je.init(e, t),
      sn.init(e, t),
      (e.email = (n) => e.check(Mo(ws, n))),
      (e.url = (n) => e.check(Go(zs, n))),
      (e.jwt = (n) => e.check(ui(Ds, n))),
      (e.emoji = (n) => e.check(Ko($s, n))),
      (e.guid = (n) => e.check(pt(vt, n))),
      (e.uuid = (n) => e.check(Lo(oe, n))),
      (e.uuidv4 = (n) => e.check(Vo(oe, n))),
      (e.uuidv6 = (n) => e.check(Wo(oe, n))),
      (e.uuidv7 = (n) => e.check(Bo(oe, n))),
      (e.nanoid = (n) => e.check(Yo(ks, n))),
      (e.guid = (n) => e.check(pt(vt, n))),
      (e.cuid = (n) => e.check(Xo(Ss, n))),
      (e.cuid2 = (n) => e.check(qo(Zs, n))),
      (e.ulid = (n) => e.check(Ho(Os, n))),
      (e.base64 = (n) => e.check(ii(Ns, n))),
      (e.base64url = (n) => e.check(si(Cs, n))),
      (e.xid = (n) => e.check(Qo(Es, n))),
      (e.ksuid = (n) => e.check(ei(Is, n))),
      (e.ipv4 = (n) => e.check(ti(Ps, n))),
      (e.ipv6 = (n) => e.check(ni(Ts, n))),
      (e.cidrv4 = (n) => e.check(ri(js, n))),
      (e.cidrv6 = (n) => e.check(oi(As, n))),
      (e.e164 = (n) => e.check(ci(Rs, n))),
      (e.datetime = (n) => e.check(Qi(n))),
      (e.date = (n) => e.check(ts(n))),
      (e.time = (n) => e.check(rs(n))),
      (e.duration = (n) => e.check(is(n))));
  });
function ys(e) {
  return Jo(bs, e);
}
const w = a("ZodStringFormat", (e, t) => {
    (b.init(e, t), sn.init(e, t));
  }),
  ws = a("ZodEmail", (e, t) => {
    (Xr.init(e, t), w.init(e, t));
  }),
  vt = a("ZodGUID", (e, t) => {
    (Kr.init(e, t), w.init(e, t));
  }),
  oe = a("ZodUUID", (e, t) => {
    (Yr.init(e, t), w.init(e, t));
  }),
  zs = a("ZodURL", (e, t) => {
    (qr.init(e, t), w.init(e, t));
  }),
  $s = a("ZodEmoji", (e, t) => {
    (Hr.init(e, t), w.init(e, t));
  }),
  ks = a("ZodNanoID", (e, t) => {
    (Qr.init(e, t), w.init(e, t));
  }),
  Ss = a("ZodCUID", (e, t) => {
    (eo.init(e, t), w.init(e, t));
  }),
  Zs = a("ZodCUID2", (e, t) => {
    (to.init(e, t), w.init(e, t));
  }),
  Os = a("ZodULID", (e, t) => {
    (no.init(e, t), w.init(e, t));
  }),
  Es = a("ZodXID", (e, t) => {
    (ro.init(e, t), w.init(e, t));
  }),
  Is = a("ZodKSUID", (e, t) => {
    (oo.init(e, t), w.init(e, t));
  }),
  Ps = a("ZodIPv4", (e, t) => {
    (ao.init(e, t), w.init(e, t));
  }),
  Ts = a("ZodIPv6", (e, t) => {
    (lo.init(e, t), w.init(e, t));
  }),
  js = a("ZodCIDRv4", (e, t) => {
    (fo.init(e, t), w.init(e, t));
  }),
  As = a("ZodCIDRv6", (e, t) => {
    (po.init(e, t), w.init(e, t));
  }),
  Ns = a("ZodBase64", (e, t) => {
    (ho.init(e, t), w.init(e, t));
  }),
  Cs = a("ZodBase64URL", (e, t) => {
    (_o.init(e, t), w.init(e, t));
  }),
  Rs = a("ZodE164", (e, t) => {
    (vo.init(e, t), w.init(e, t));
  }),
  Ds = a("ZodJWT", (e, t) => {
    (bo.init(e, t), w.init(e, t));
  }),
  cn = a("ZodNumber", (e, t) => {
    (Yt.init(e, t),
      k.init(e, t),
      (e._zod.processJSONSchema = (r, o, i) => Ci(e, r, o)),
      (e.gt = (r, o) => e.check(mt(r, o))),
      (e.gte = (r, o) => e.check(ke(r, o))),
      (e.min = (r, o) => e.check(ke(r, o))),
      (e.lt = (r, o) => e.check(ht(r, o))),
      (e.lte = (r, o) => e.check($e(r, o))),
      (e.max = (r, o) => e.check($e(r, o))),
      (e.int = (r) => e.check(gt(r))),
      (e.safe = (r) => e.check(gt(r))),
      (e.positive = (r) => e.check(mt(0, r))),
      (e.nonnegative = (r) => e.check(ke(0, r))),
      (e.negative = (r) => e.check(ht(0, r))),
      (e.nonpositive = (r) => e.check($e(0, r))),
      (e.multipleOf = (r, o) => e.check(_t(r, o))),
      (e.step = (r, o) => e.check(_t(r, o))),
      (e.finite = () => e));
    const n = e._zod.bag;
    ((e.minValue =
      Math.max(
        n.minimum ?? Number.NEGATIVE_INFINITY,
        n.exclusiveMinimum ?? Number.NEGATIVE_INFINITY,
      ) ?? null),
      (e.maxValue =
        Math.min(
          n.maximum ?? Number.POSITIVE_INFINITY,
          n.exclusiveMaximum ?? Number.POSITIVE_INFINITY,
        ) ?? null),
      (e.isInt =
        (n.format ?? "").includes("int") ||
        Number.isSafeInteger(n.multipleOf ?? 0.5)),
      (e.isFinite = !0),
      (e.format = n.format ?? null));
  });
function xs(e) {
  return pi(cn, e);
}
const Us = a("ZodNumberFormat", (e, t) => {
  (yo.init(e, t), cn.init(e, t));
});
function gt(e) {
  return hi(Us, e);
}
const Fs = a("ZodUnknown", (e, t) => {
  (wo.init(e, t), k.init(e, t), (e._zod.processJSONSchema = (n, r, o) => Di()));
});
function bt() {
  return mi(Fs);
}
const Js = a("ZodNever", (e, t) => {
  (zo.init(e, t),
    k.init(e, t),
    (e._zod.processJSONSchema = (n, r, o) => Ri(e, n, r)));
});
function Ms(e) {
  return _i(Js, e);
}
const Ls = a("ZodArray", (e, t) => {
  ($o.init(e, t),
    k.init(e, t),
    (e._zod.processJSONSchema = (n, r, o) => Ji(e, n, r, o)),
    (e.element = t.element),
    (e.min = (n, r) => e.check(ae(n, r))),
    (e.nonempty = (n) => e.check(ae(1, n))),
    (e.max = (n, r) => e.check(Qt(n, r))),
    (e.length = (n, r) => e.check(en(n, r))),
    (e.unwrap = () => e.element));
});
function Vs(e, t) {
  return Ei(Ls, e, t);
}
const Ws = a("ZodObject", (e, t) => {
  (So.init(e, t),
    k.init(e, t),
    (e._zod.processJSONSchema = (n, r, o) => Mi(e, n, r, o)),
    g(e, "shape", () => t.shape),
    (e.keyof = () => qs(Object.keys(e._zod.def.shape))),
    (e.catchall = (n) => e.clone({ ...e._zod.def, catchall: n })),
    (e.passthrough = () => e.clone({ ...e._zod.def, catchall: bt() })),
    (e.loose = () => e.clone({ ...e._zod.def, catchall: bt() })),
    (e.strict = () => e.clone({ ...e._zod.def, catchall: Ms() })),
    (e.strip = () => e.clone({ ...e._zod.def, catchall: void 0 })),
    (e.extend = (n) => Bn(e, n)),
    (e.safeExtend = (n) => Gn(e, n)),
    (e.merge = (n) => Kn(e, n)),
    (e.pick = (n) => Vn(e, n)),
    (e.omit = (n) => Wn(e, n)),
    (e.partial = (...n) => Yn(un, e, n[0])),
    (e.required = (...n) => Xn(an, e, n[0])));
});
function Bs(e, t) {
  const n = { type: "object", shape: e ?? {}, ...h(t) };
  return new Ws(n);
}
const Gs = a("ZodUnion", (e, t) => {
  (Zo.init(e, t),
    k.init(e, t),
    (e._zod.processJSONSchema = (n, r, o) => Li(e, n, r, o)),
    (e.options = t.options));
});
function Ks(e, t) {
  return new Gs({ type: "union", options: e, ...h(t) });
}
const Ys = a("ZodIntersection", (e, t) => {
  (Oo.init(e, t),
    k.init(e, t),
    (e._zod.processJSONSchema = (n, r, o) => Vi(e, n, r, o)));
});
function Xs(e, t) {
  return new Ys({ type: "intersection", left: e, right: t });
}
const Ne = a("ZodEnum", (e, t) => {
  (Eo.init(e, t),
    k.init(e, t),
    (e._zod.processJSONSchema = (r, o, i) => xi(e, r, o)),
    (e.enum = t.entries),
    (e.options = Object.values(t.entries)));
  const n = new Set(Object.keys(t.entries));
  ((e.extract = (r, o) => {
    const i = {};
    for (const s of r)
      if (n.has(s)) i[s] = t.entries[s];
      else throw new Error(`Key ${s} not found in enum`);
    return new Ne({ ...t, checks: [], ...h(o), entries: i });
  }),
    (e.exclude = (r, o) => {
      const i = { ...t.entries };
      for (const s of r)
        if (n.has(s)) delete i[s];
        else throw new Error(`Key ${s} not found in enum`);
      return new Ne({ ...t, checks: [], ...h(o), entries: i });
    }));
});
function qs(e, t) {
  const n = Array.isArray(e) ? Object.fromEntries(e.map((r) => [r, r])) : e;
  return new Ne({ type: "enum", entries: n, ...h(t) });
}
const Hs = a("ZodTransform", (e, t) => {
  (Io.init(e, t),
    k.init(e, t),
    (e._zod.processJSONSchema = (n, r, o) => Fi(e, n)),
    (e._zod.parse = (n, r) => {
      if (r.direction === "backward") throw new At(e.constructor.name);
      n.addIssue = (i) => {
        if (typeof i == "string") n.issues.push(q(i, n.value, t));
        else {
          const s = i;
          (s.fatal && (s.continue = !1),
            s.code ?? (s.code = "custom"),
            s.input ?? (s.input = n.value),
            s.inst ?? (s.inst = e),
            n.issues.push(q(s)));
        }
      };
      const o = t.transform(n.value, n);
      return o instanceof Promise
        ? o.then((i) => ((n.value = i), n))
        : ((n.value = o), n);
    }));
});
function Qs(e) {
  return new Hs({ type: "transform", transform: e });
}
const un = a("ZodOptional", (e, t) => {
  (Ht.init(e, t),
    k.init(e, t),
    (e._zod.processJSONSchema = (n, r, o) => on(e, n, r, o)),
    (e.unwrap = () => e._zod.def.innerType));
});
function yt(e) {
  return new un({ type: "optional", innerType: e });
}
const ec = a("ZodExactOptional", (e, t) => {
  (Po.init(e, t),
    k.init(e, t),
    (e._zod.processJSONSchema = (n, r, o) => on(e, n, r, o)),
    (e.unwrap = () => e._zod.def.innerType));
});
function tc(e) {
  return new ec({ type: "optional", innerType: e });
}
const nc = a("ZodNullable", (e, t) => {
  (To.init(e, t),
    k.init(e, t),
    (e._zod.processJSONSchema = (n, r, o) => Wi(e, n, r, o)),
    (e.unwrap = () => e._zod.def.innerType));
});
function wt(e) {
  return new nc({ type: "nullable", innerType: e });
}
const rc = a("ZodDefault", (e, t) => {
  (jo.init(e, t),
    k.init(e, t),
    (e._zod.processJSONSchema = (n, r, o) => Gi(e, n, r, o)),
    (e.unwrap = () => e._zod.def.innerType),
    (e.removeDefault = e.unwrap));
});
function oc(e, t) {
  return new rc({
    type: "default",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : Dt(t);
    },
  });
}
const ic = a("ZodPrefault", (e, t) => {
  (Ao.init(e, t),
    k.init(e, t),
    (e._zod.processJSONSchema = (n, r, o) => Ki(e, n, r, o)),
    (e.unwrap = () => e._zod.def.innerType));
});
function sc(e, t) {
  return new ic({
    type: "prefault",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : Dt(t);
    },
  });
}
const an = a("ZodNonOptional", (e, t) => {
  (No.init(e, t),
    k.init(e, t),
    (e._zod.processJSONSchema = (n, r, o) => Bi(e, n, r, o)),
    (e.unwrap = () => e._zod.def.innerType));
});
function cc(e, t) {
  return new an({ type: "nonoptional", innerType: e, ...h(t) });
}
const uc = a("ZodCatch", (e, t) => {
  (Co.init(e, t),
    k.init(e, t),
    (e._zod.processJSONSchema = (n, r, o) => Yi(e, n, r, o)),
    (e.unwrap = () => e._zod.def.innerType),
    (e.removeCatch = e.unwrap));
});
function ac(e, t) {
  return new uc({
    type: "catch",
    innerType: e,
    catchValue: typeof t == "function" ? t : () => t,
  });
}
const lc = a("ZodPipe", (e, t) => {
  (Ro.init(e, t),
    k.init(e, t),
    (e._zod.processJSONSchema = (n, r, o) => Xi(e, n, r, o)),
    (e.in = t.in),
    (e.out = t.out));
});
function zt(e, t) {
  return new lc({ type: "pipe", in: e, out: t });
}
const fc = a("ZodReadonly", (e, t) => {
  (Do.init(e, t),
    k.init(e, t),
    (e._zod.processJSONSchema = (n, r, o) => qi(e, n, r, o)),
    (e.unwrap = () => e._zod.def.innerType));
});
function dc(e) {
  return new fc({ type: "readonly", innerType: e });
}
const pc = a("ZodCustom", (e, t) => {
  (xo.init(e, t),
    k.init(e, t),
    (e._zod.processJSONSchema = (n, r, o) => Ui(e, n)));
});
function hc(e, t = {}) {
  return Ii(pc, e, t);
}
function mc(e) {
  return Pi(e);
}
const $t = Bs({ status: ys(), count: xs().min(0) });
var V, W;
class _c {
  constructor() {
    ge(this, V);
    ge(this, W);
    (be(this, V, Be(Ge(K.getStatus()))),
      be(this, W, Be(Ge(K.getCount()))),
      K.status$.subscribe((t) => {
        try {
          ($t.shape.status.parse(t), (this.status = t));
        } catch (n) {
          console.error("Invalid status update:", n);
        }
      }),
      K.count$.subscribe((t) => {
        try {
          ($t.shape.count.parse(t), (this.count = t));
        } catch (n) {
          console.error("Invalid count update:", n);
        }
      }));
  }
  get status() {
    return Ve(G(this, V));
  }
  set status(t) {
    We(G(this, V), t, !0);
  }
  get count() {
    return Ve(G(this, W));
  }
  set count(t) {
    We(G(this, W), t, !0);
  }
  increment() {
    K.increment();
  }
}
((V = new WeakMap()), (W = new WeakMap()));
const kt = new _c();
var vc = fe("<!> <!>", 1),
  gc = fe(
    '<p class="text-sm">Global Count: <span class="text-primary font-bold text-lg"> </span></p>',
  ),
  bc = fe("<!> <!> <!>", 1),
  yc = fe('<div class="p-4"><!></div>');
function ln(e, t) {
  vn(t, !1);
  function n() {
    kt.increment();
  }
  mn();
  var r = yc(),
    o = we(r);
  (bn(o, {
    children: (i, s) => {
      var c = bc(),
        u = Ke(c);
      yn(u, {
        children: (d, m) => {
          var p = vc(),
            v = Ke(p);
          wn(v, {
            children: (y, C) => {
              var z = ye("Shared State Demo");
              R(y, z);
            },
            $$slots: { default: !0 },
          });
          var _ = ee(v, 2);
          (zn(_, {
            children: (y, C) => {
              var z = ye(
                "Updates sync across all modules watching 'demoState.count'",
              );
              R(y, z);
            },
            $$slots: { default: !0 },
          }),
            R(d, p));
        },
        $$slots: { default: !0 },
      });
      var l = ee(u, 2);
      $n(l, {
        children: (d, m) => {
          var p = gc(),
            v = ee(we(p)),
            _ = we(v);
          (gn(() => hn(_, kt.count)), R(d, p));
        },
        $$slots: { default: !0 },
      });
      var f = ee(l, 2);
      (kn(f, {
        children: (d, m) => {
          Sn(d, {
            onclick: n,
            variant: "default",
            children: (p, v) => {
              var _ = ye("Increment Global Counter");
              R(p, _);
            },
            $$slots: { default: !0 },
          });
        },
        $$slots: { default: !0 },
      }),
        R(i, c));
    },
    $$slots: { default: !0 },
  }),
    R(e, r),
    _n());
}
ln.__docgen = {
  version: 3,
  name: "DemoWidget.svelte",
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
const Ec = {
    title: "Widgets/DemoWidget",
    component: ln,
    tags: ["autodocs"],
    parameters: { layout: "centered" },
  },
  ie = {};
var St, Zt, Ot;
ie.parameters = {
  ...ie.parameters,
  docs: {
    ...((St = ie.parameters) == null ? void 0 : St.docs),
    source: {
      originalSource: "{}",
      ...((Ot = (Zt = ie.parameters) == null ? void 0 : Zt.docs) == null
        ? void 0
        : Ot.source),
    },
  },
};
const Ic = ["Default"];
export { ie as Default, Ic as __namedExportsOrder, Ec as default };
