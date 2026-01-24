var Im = Object.defineProperty;
var sl = (e) => {
  throw TypeError(e);
};
var Mm = (e, t, a) =>
  t in e
    ? Im(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a })
    : (e[t] = a);
var gn = (e, t, a) => Mm(e, typeof t != "symbol" ? t + "" : t, a),
  nl = (e, t, a) => t.has(e) || sl("Cannot " + a);
var xn = (e, t, a) => (
    nl(e, t, "read from private field"),
    a ? a.call(e) : t.get(e)
  ),
  ol = (e, t, a) =>
    t.has(e)
      ? sl("Cannot add the same private member more than once")
      : t instanceof WeakSet
        ? t.add(e)
        : t.set(e, a),
  ll = (e, t, a, s) => (
    nl(e, t, "write to private field"),
    s ? s.call(e, a) : t.set(e, a),
    a
  );
import {
  g as Cn,
  a as _n,
  V as Hh,
  m as Lm,
  u as Om,
} from "./render-DW8l5F5-.js";
import { i as Uh } from "./lifecycle-kGLgCphG.js";
import {
  d as Nm,
  E as Dm,
  at as Bm,
  a7 as Fm,
  b as jm,
  a9 as Vm,
  S as $m,
  a4 as Gh,
  aE as Wh,
  aF as zh,
  k as Pn,
  a3 as Kh,
  h as re,
  W as Le,
  o as Ee,
  i as Xh,
  aG as ul,
  F as Hm,
} from "./runtime-DPDnKgMN.js";
import { B as Um, p as _e, s as Mo } from "./props-Ba6rMGFL.js";
import { o as Gm } from "./index-client-D2IMf99O.js";
import { c as Lo } from "./svelte-component-B4I-xnpj.js";
import { d as Wm } from "./index-DrFu-skq.js";
function zm(e, t, a = !1) {
  var s = new Um(e),
    o = a ? Dm : 0;
  function c(n, b) {
    s.ensure(n, b);
  }
  Nm(() => {
    var n = !1;
    (t((b, g = !0) => {
      ((n = !0), c(g, b));
    }),
      n || c(!1, null));
  }, o);
}
function cl(e, t) {
  return e === t || (e == null ? void 0 : e[$m]) === t;
}
function Oo(e = {}, t, a, s) {
  return (
    Bm(() => {
      var o, c;
      return (
        Fm(() => {
          ((o = c),
            (c = []),
            jm(() => {
              e !== a(...c) &&
                (t(e, ...c), o && cl(a(...o), e) && t(null, ...o));
            }));
        }),
        () => {
          Vm(() => {
            c && cl(a(...c), e) && t(null, ...c);
          });
        }
      );
    }),
    e
  );
}
var Km = Object.defineProperty,
  Xm = (e, t) => {
    for (var a in t) Km(e, a, { get: t[a], enumerable: !0 });
  };
let Ym,
  Qm,
  dl,
  Jm,
  pl = [],
  Zm = new Map();
const ev = /^\t+/;
function No(e) {
  return e.replace(ev, (t) => t.split("	").join("  "));
}
function tv(e, t, a) {
  const s = e.split(`
`),
    o = Math.max(0, t - 2),
    c = Math.min(t + 3, s.length),
    n = String(c + 1).length;
  return s.slice(o, c).map((b, g) => {
    const q = o + g === t,
      f = String(g + o + 1).padStart(n, " ");
    if (q) {
      const T = " ".repeat(n + 2 + No(b.slice(0, a)).length) + "^";
      return `${f}: ${No(b)}
${T}`;
    }
    return `${f}: ${No(b)}`;
  }).join(`
`);
}
class Yh {
  constructor(t, a, s) {
    gn(this, "name", "CompileDiagnostic");
    ((this.code = t),
      (this.message = a),
      (this.filename = Ym),
      s &&
        ((this.position = s),
        (this.start = dl(s[0])),
        (this.end = dl(s[1])),
        this.start &&
          this.end &&
          (this.frame = tv(Qm, this.start.line - 1, this.end.column))));
  }
  toString() {
    let t = `${this.code}: ${this.message}`;
    return (
      this.filename &&
        ((t += `
${this.filename}`),
        this.start && (t += `:${this.start.line}:${this.start.column}`)),
      this.frame &&
        (t += `
${this.frame}`),
      t
    );
  }
  toJSON() {
    return {
      code: this.code,
      message: this.message,
      filename: this.filename,
      start: this.start,
      end: this.end,
      position: this.position,
      frame: this.frame,
    };
  }
}
class rv extends Yh {
  constructor(a, s, o) {
    super(a, s, o);
    gn(this, "name", "CompileWarning");
  }
}
function Ue(e, t, a) {
  var c;
  let s = pl;
  if ((e && (s = Zm.get(e) ?? pl), s && (c = s.at(-1)) != null && c.has(t)))
    return;
  const o = new rv(
    t,
    a,
    e && e.start !== void 0 ? [e.start, e.end ?? e.start] : void 0,
  );
  Jm(o);
}
function av(e) {
  Ue(
    e,
    "options_deprecated_accessors",
    "The `accessors` option has been deprecated. It will have no effect in runes mode\nhttps://svelte.dev/e/options_deprecated_accessors",
  );
}
function iv(e) {
  Ue(
    e,
    "options_deprecated_immutable",
    "The `immutable` option has been deprecated. It will have no effect in runes mode\nhttps://svelte.dev/e/options_deprecated_immutable",
  );
}
function sv(e) {
  Ue(
    e,
    "options_removed_enable_sourcemap",
    "The `enableSourcemap` option has been removed. Source maps are always generated now, and tooling can choose to ignore them\nhttps://svelte.dev/e/options_removed_enable_sourcemap",
  );
}
function nv(e) {
  Ue(
    e,
    "options_removed_hydratable",
    "The `hydratable` option has been removed. Svelte components are always hydratable now\nhttps://svelte.dev/e/options_removed_hydratable",
  );
}
function ov(e) {
  Ue(
    e,
    "options_removed_loop_guard_timeout",
    "The `loopGuardTimeout` option has been removed\nhttps://svelte.dev/e/options_removed_loop_guard_timeout",
  );
}
function lv(e) {
  Ue(
    e,
    "options_renamed_ssr_dom",
    '`generate: "dom"` and `generate: "ssr"` options have been renamed to "client" and "server" respectively\nhttps://svelte.dev/e/options_renamed_ssr_dom',
  );
}
var uv = [
    509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1,
    574, 3, 9, 9, 7, 9, 32, 4, 318, 1, 80, 3, 71, 10, 50, 3, 123, 2, 54, 14, 32,
    10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13,
    2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2,
    6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 68, 8, 2, 0, 3, 0, 2, 3, 2, 4, 2,
    0, 15, 1, 83, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16,
    16, 9, 82, 12, 9, 9, 7, 19, 58, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3,
    3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10,
    47, 15, 343, 9, 54, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6,
    2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14,
    10, 5350, 0, 7, 14, 11465, 27, 2343, 9, 87, 9, 39, 4, 60, 6, 26, 9, 535, 9,
    470, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4178, 9, 519, 45, 3, 22, 543,
    4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0,
    23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357,
    0, 62, 13, 499, 13, 245, 1, 2, 9, 726, 6, 110, 6, 6, 9, 4759, 9, 787719,
    239,
  ],
  Qh = [
    0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48,
    48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5,
    39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 4, 51, 13,
    310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3,
    22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16,
    3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17,
    111, 72, 56, 50, 14, 50, 14, 35, 39, 27, 10, 22, 251, 41, 7, 1, 17, 2, 60,
    28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33,
    24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2,
    24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6,
    2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 31, 9, 2, 0, 3, 0, 2, 37, 2, 0, 26, 0, 2, 0,
    45, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0,
    60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2,
    23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12,
    45, 20, 0, 19, 72, 200, 32, 32, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2,
    37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 16, 0, 2, 12, 2, 33, 125, 0,
    80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 26, 3994, 6, 582,
    6842, 29, 1763, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18,
    433, 44, 212, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 42,
    9, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309,
    106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2,
    0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3,
    24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7,
    1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27,
    229, 29, 3, 0, 496, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2,
    26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2,
    2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2,
    3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221, 3,
    5761, 15, 7472, 16, 621, 2467, 541, 1507, 4938, 6, 4191,
  ],
  cv =
    "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࢗ-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ೳഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-໎໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-ᫎᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‌‍‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯・꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿･",
  Jh =
    "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-ࢎࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೝೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲊᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꟍꟐꟑꟓꟕ-Ƛꟲ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",
  Do = {
    3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
    5: "class enum extends super const export import",
    6: "enum",
    strict:
      "implements interface let package private protected public static yield",
    strictBind: "eval arguments",
  },
  Bo =
    "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this",
  dv = {
    5: Bo,
    "5module": Bo + " export import",
    6: Bo + " const class extends export import super",
  },
  pv = /^in(stanceof)?$/,
  hv = new RegExp("[" + Jh + "]"),
  fv = new RegExp("[" + Jh + cv + "]");
function Uo(e, t) {
  for (var a = 65536, s = 0; s < t.length; s += 2) {
    if (((a += t[s]), a > e)) return !1;
    if (((a += t[s + 1]), a >= e)) return !0;
  }
  return !1;
}
function Ce(e, t) {
  return e < 65
    ? e === 36
    : e < 91
      ? !0
      : e < 97
        ? e === 95
        : e < 123
          ? !0
          : e <= 65535
            ? e >= 170 && hv.test(String.fromCharCode(e))
            : t === !1
              ? !1
              : Uo(e, Qh);
}
function Ae(e, t) {
  return e < 48
    ? e === 36
    : e < 58
      ? !0
      : e < 65
        ? !1
        : e < 91
          ? !0
          : e < 97
            ? e === 95
            : e < 123
              ? !0
              : e <= 65535
                ? e >= 170 && fv.test(String.fromCharCode(e))
                : t === !1
                  ? !1
                  : Uo(e, Qh) || Uo(e, uv);
}
var U = function (t, a) {
  (a === void 0 && (a = {}),
    (this.label = t),
    (this.keyword = a.keyword),
    (this.beforeExpr = !!a.beforeExpr),
    (this.startsExpr = !!a.startsExpr),
    (this.isLoop = !!a.isLoop),
    (this.isAssign = !!a.isAssign),
    (this.prefix = !!a.prefix),
    (this.postfix = !!a.postfix),
    (this.binop = a.binop || null),
    (this.updateContext = null));
};
function ve(e, t) {
  return new U(e, { beforeExpr: !0, binop: t });
}
var be = { beforeExpr: !0 },
  pe = { startsExpr: !0 },
  pn = {};
function z(e, t) {
  return (t === void 0 && (t = {}), (t.keyword = e), (pn[e] = new U(e, t)));
}
var u = {
    num: new U("num", pe),
    regexp: new U("regexp", pe),
    string: new U("string", pe),
    name: new U("name", pe),
    privateId: new U("privateId", pe),
    eof: new U("eof"),
    bracketL: new U("[", { beforeExpr: !0, startsExpr: !0 }),
    bracketR: new U("]"),
    braceL: new U("{", { beforeExpr: !0, startsExpr: !0 }),
    braceR: new U("}"),
    parenL: new U("(", { beforeExpr: !0, startsExpr: !0 }),
    parenR: new U(")"),
    comma: new U(",", be),
    semi: new U(";", be),
    colon: new U(":", be),
    dot: new U("."),
    question: new U("?", be),
    questionDot: new U("?."),
    arrow: new U("=>", be),
    template: new U("template"),
    invalidTemplate: new U("invalidTemplate"),
    ellipsis: new U("...", be),
    backQuote: new U("`", pe),
    dollarBraceL: new U("${", { beforeExpr: !0, startsExpr: !0 }),
    eq: new U("=", { beforeExpr: !0, isAssign: !0 }),
    assign: new U("_=", { beforeExpr: !0, isAssign: !0 }),
    incDec: new U("++/--", { prefix: !0, postfix: !0, startsExpr: !0 }),
    prefix: new U("!/~", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
    logicalOR: ve("||", 1),
    logicalAND: ve("&&", 2),
    bitwiseOR: ve("|", 3),
    bitwiseXOR: ve("^", 4),
    bitwiseAND: ve("&", 5),
    equality: ve("==/!=/===/!==", 6),
    relational: ve("</>/<=/>=", 7),
    bitShift: ve("<</>>/>>>", 8),
    plusMin: new U("+/-", {
      beforeExpr: !0,
      binop: 9,
      prefix: !0,
      startsExpr: !0,
    }),
    modulo: ve("%", 10),
    star: ve("*", 10),
    slash: ve("/", 10),
    starstar: new U("**", { beforeExpr: !0 }),
    coalesce: ve("??", 1),
    _break: z("break"),
    _case: z("case", be),
    _catch: z("catch"),
    _continue: z("continue"),
    _debugger: z("debugger"),
    _default: z("default", be),
    _do: z("do", { isLoop: !0, beforeExpr: !0 }),
    _else: z("else", be),
    _finally: z("finally"),
    _for: z("for", { isLoop: !0 }),
    _function: z("function", pe),
    _if: z("if"),
    _return: z("return", be),
    _switch: z("switch"),
    _throw: z("throw", be),
    _try: z("try"),
    _var: z("var"),
    _const: z("const"),
    _while: z("while", { isLoop: !0 }),
    _with: z("with"),
    _new: z("new", { beforeExpr: !0, startsExpr: !0 }),
    _this: z("this", pe),
    _super: z("super", pe),
    _class: z("class", pe),
    _extends: z("extends", be),
    _export: z("export"),
    _import: z("import", pe),
    _null: z("null", pe),
    _true: z("true", pe),
    _false: z("false", pe),
    _in: z("in", { beforeExpr: !0, binop: 7 }),
    _instanceof: z("instanceof", { beforeExpr: !0, binop: 7 }),
    _typeof: z("typeof", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
    _void: z("void", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
    _delete: z("delete", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
  },
  ce = /\r\n?|\n|\u2028|\u2029/,
  Zh = new RegExp(ce.source, "g");
function De(e) {
  return e === 10 || e === 13 || e === 8232 || e === 8233;
}
function ef(e, t, a) {
  a === void 0 && (a = e.length);
  for (var s = t; s < a; s++) {
    var o = e.charCodeAt(s);
    if (De(o))
      return s < a - 1 && o === 13 && e.charCodeAt(s + 1) === 10
        ? s + 2
        : s + 1;
  }
  return -1;
}
var zo = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/,
  le = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,
  tf = Object.prototype,
  mv = tf.hasOwnProperty,
  vv = tf.toString,
  Ge =
    Object.hasOwn ||
    function (e, t) {
      return mv.call(e, t);
    },
  hl =
    Array.isArray ||
    function (e) {
      return vv.call(e) === "[object Array]";
    },
  fl = Object.create(null);
function Ie(e) {
  return fl[e] || (fl[e] = new RegExp("^(?:" + e.replace(/ /g, "|") + ")$"));
}
function we(e) {
  return e <= 65535
    ? String.fromCharCode(e)
    : ((e -= 65536),
      String.fromCharCode((e >> 10) + 55296, (e & 1023) + 56320));
}
var bv =
    /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/,
  He = function (t, a) {
    ((this.line = t), (this.column = a));
  };
He.prototype.offset = function (t) {
  return new He(this.line, this.column + t);
};
var hn = function (t, a, s) {
  ((this.start = a),
    (this.end = s),
    t.sourceFile !== null && (this.source = t.sourceFile));
};
function Ko(e, t) {
  for (var a = 1, s = 0; ; ) {
    var o = ef(e, s, t);
    if (o < 0) return new He(a, t - s);
    (++a, (s = o));
  }
}
var En = {
    ecmaVersion: null,
    sourceType: "script",
    onInsertedSemicolon: null,
    onTrailingComma: null,
    allowReserved: null,
    allowReturnOutsideFunction: !1,
    allowImportExportEverywhere: !1,
    allowAwaitOutsideFunction: null,
    allowSuperOutsideMethod: null,
    allowHashBang: !1,
    checkPrivateFields: !0,
    locations: !1,
    onToken: null,
    onComment: null,
    ranges: !1,
    program: null,
    sourceFile: null,
    directSourceFile: null,
    preserveParens: !1,
  },
  ml = !1;
function yv(e) {
  var t = {};
  for (var a in En) t[a] = e && Ge(e, a) ? e[a] : En[a];
  if (
    (t.ecmaVersion === "latest"
      ? (t.ecmaVersion = 1e8)
      : t.ecmaVersion == null
        ? (!ml &&
            typeof console == "object" &&
            console.warn &&
            ((ml = !0),
            console.warn(`Since Acorn 8.0.0, options.ecmaVersion is required.
Defaulting to 2020, but this will stop working in the future.`)),
          (t.ecmaVersion = 11))
        : t.ecmaVersion >= 2015 && (t.ecmaVersion -= 2009),
    t.allowReserved == null && (t.allowReserved = t.ecmaVersion < 5),
    (!e || e.allowHashBang == null) && (t.allowHashBang = t.ecmaVersion >= 14),
    hl(t.onToken))
  ) {
    var s = t.onToken;
    t.onToken = function (o) {
      return s.push(o);
    };
  }
  return (hl(t.onComment) && (t.onComment = Rv(t, t.onComment)), t);
}
function Rv(e, t) {
  return function (a, s, o, c, n, b) {
    var g = { type: a ? "Block" : "Line", value: s, start: o, end: c };
    (e.locations && (g.loc = new hn(this, n, b)),
      e.ranges && (g.range = [o, c]),
      t.push(g));
  };
}
var un = 1,
  We = 2,
  Xo = 4,
  rf = 8,
  Yo = 16,
  af = 32,
  Nn = 64,
  sf = 128,
  Be = 256,
  fn = 512,
  Dn = un | We | Be;
function Qo(e, t) {
  return We | (e ? Xo : 0) | (t ? rf : 0);
}
var In = 0,
  Jo = 1,
  ke = 2,
  nf = 3,
  of = 4,
  lf = 5,
  ee = function (t, a, s) {
    ((this.options = t = yv(t)),
      (this.sourceFile = t.sourceFile),
      (this.keywords = Ie(
        dv[t.ecmaVersion >= 6 ? 6 : t.sourceType === "module" ? "5module" : 5],
      )));
    var o = "";
    (t.allowReserved !== !0 &&
      ((o = Do[t.ecmaVersion >= 6 ? 6 : t.ecmaVersion === 5 ? 5 : 3]),
      t.sourceType === "module" && (o += " await")),
      (this.reservedWords = Ie(o)));
    var c = (o ? o + " " : "") + Do.strict;
    ((this.reservedWordsStrict = Ie(c)),
      (this.reservedWordsStrictBind = Ie(c + " " + Do.strictBind)),
      (this.input = String(a)),
      (this.containsEsc = !1),
      s
        ? ((this.pos = s),
          (this.lineStart =
            this.input.lastIndexOf(
              `
`,
              s - 1,
            ) + 1),
          (this.curLine = this.input.slice(0, this.lineStart).split(ce).length))
        : ((this.pos = this.lineStart = 0), (this.curLine = 1)),
      (this.type = u.eof),
      (this.value = null),
      (this.start = this.end = this.pos),
      (this.startLoc = this.endLoc = this.curPosition()),
      (this.lastTokEndLoc = this.lastTokStartLoc = null),
      (this.lastTokStart = this.lastTokEnd = this.pos),
      (this.context = this.initialContext()),
      (this.exprAllowed = !0),
      (this.inModule = t.sourceType === "module"),
      (this.strict = this.inModule || this.strictDirective(this.pos)),
      (this.potentialArrowAt = -1),
      (this.potentialArrowInForAwait = !1),
      (this.yieldPos = this.awaitPos = this.awaitIdentPos = 0),
      (this.labels = []),
      (this.undefinedExports = Object.create(null)),
      this.pos === 0 &&
        t.allowHashBang &&
        this.input.slice(0, 2) === "#!" &&
        this.skipLineComment(2),
      (this.scopeStack = []),
      this.enterScope(un),
      (this.regexpState = null),
      (this.privateNameStack = []));
  },
  qe = {
    inFunction: { configurable: !0 },
    inGenerator: { configurable: !0 },
    inAsync: { configurable: !0 },
    canAwait: { configurable: !0 },
    allowSuper: { configurable: !0 },
    allowDirectSuper: { configurable: !0 },
    treatFunctionsAsVar: { configurable: !0 },
    allowNewDotTarget: { configurable: !0 },
    inClassStaticBlock: { configurable: !0 },
  };
ee.prototype.parse = function () {
  var t = this.options.program || this.startNode();
  return (this.nextToken(), this.parseTopLevel(t));
};
qe.inFunction.get = function () {
  return (this.currentVarScope().flags & We) > 0;
};
qe.inGenerator.get = function () {
  return (this.currentVarScope().flags & rf) > 0;
};
qe.inAsync.get = function () {
  return (this.currentVarScope().flags & Xo) > 0;
};
qe.canAwait.get = function () {
  for (var e = this.scopeStack.length - 1; e >= 0; e--) {
    var t = this.scopeStack[e],
      a = t.flags;
    if (a & (Be | fn)) return !1;
    if (a & We) return (a & Xo) > 0;
  }
  return (
    (this.inModule && this.options.ecmaVersion >= 13) ||
    this.options.allowAwaitOutsideFunction
  );
};
qe.allowSuper.get = function () {
  var e = this.currentThisScope(),
    t = e.flags;
  return (t & Nn) > 0 || this.options.allowSuperOutsideMethod;
};
qe.allowDirectSuper.get = function () {
  return (this.currentThisScope().flags & sf) > 0;
};
qe.treatFunctionsAsVar.get = function () {
  return this.treatFunctionsAsVarInScope(this.currentScope());
};
qe.allowNewDotTarget.get = function () {
  for (var e = this.scopeStack.length - 1; e >= 0; e--) {
    var t = this.scopeStack[e],
      a = t.flags;
    if (a & (Be | fn) || (a & We && !(a & Yo))) return !0;
  }
  return !1;
};
qe.inClassStaticBlock.get = function () {
  return (this.currentVarScope().flags & Be) > 0;
};
ee.extend = function () {
  for (var t = [], a = arguments.length; a--; ) t[a] = arguments[a];
  for (var s = this, o = 0; o < t.length; o++) s = t[o](s);
  return s;
};
ee.parse = function (t, a) {
  return new this(a, t).parse();
};
ee.parseExpressionAt = function (t, a, s) {
  var o = new this(s, t, a);
  return (o.nextToken(), o.parseExpression());
};
ee.tokenizer = function (t, a) {
  return new this(a, t);
};
Object.defineProperties(ee.prototype, qe);
var de = ee.prototype,
  gv = /^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;
de.strictDirective = function (e) {
  if (this.options.ecmaVersion < 5) return !1;
  for (;;) {
    ((le.lastIndex = e), (e += le.exec(this.input)[0].length));
    var t = gv.exec(this.input.slice(e));
    if (!t) return !1;
    if ((t[1] || t[2]) === "use strict") {
      le.lastIndex = e + t[0].length;
      var a = le.exec(this.input),
        s = a.index + a[0].length,
        o = this.input.charAt(s);
      return (
        o === ";" ||
        o === "}" ||
        (ce.test(a[0]) &&
          !(
            /[(`.[+\-/*%<>=,?^&]/.test(o) ||
            (o === "!" && this.input.charAt(s + 1) === "=")
          ))
      );
    }
    ((e += t[0].length),
      (le.lastIndex = e),
      (e += le.exec(this.input)[0].length),
      this.input[e] === ";" && e++);
  }
};
de.eat = function (e) {
  return this.type === e ? (this.next(), !0) : !1;
};
de.isContextual = function (e) {
  return this.type === u.name && this.value === e && !this.containsEsc;
};
de.eatContextual = function (e) {
  return this.isContextual(e) ? (this.next(), !0) : !1;
};
de.expectContextual = function (e) {
  this.eatContextual(e) || this.unexpected();
};
de.canInsertSemicolon = function () {
  return (
    this.type === u.eof ||
    this.type === u.braceR ||
    ce.test(this.input.slice(this.lastTokEnd, this.start))
  );
};
de.insertSemicolon = function () {
  if (this.canInsertSemicolon())
    return (
      this.options.onInsertedSemicolon &&
        this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc),
      !0
    );
};
de.semicolon = function () {
  !this.eat(u.semi) && !this.insertSemicolon() && this.unexpected();
};
de.afterTrailingComma = function (e, t) {
  if (this.type === e)
    return (
      this.options.onTrailingComma &&
        this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc),
      t || this.next(),
      !0
    );
};
de.expect = function (e) {
  this.eat(e) || this.unexpected();
};
de.unexpected = function (e) {
  this.raise(e ?? this.start, "Unexpected token");
};
var Bn = function () {
  this.shorthandAssign =
    this.trailingComma =
    this.parenthesizedAssign =
    this.parenthesizedBind =
    this.doubleProto =
      -1;
};
de.checkPatternErrors = function (e, t) {
  if (e) {
    e.trailingComma > -1 &&
      this.raiseRecoverable(
        e.trailingComma,
        "Comma is not permitted after the rest element",
      );
    var a = t ? e.parenthesizedAssign : e.parenthesizedBind;
    a > -1 &&
      this.raiseRecoverable(
        a,
        t ? "Assigning to rvalue" : "Parenthesized pattern",
      );
  }
};
de.checkExpressionErrors = function (e, t) {
  if (!e) return !1;
  var a = e.shorthandAssign,
    s = e.doubleProto;
  if (!t) return a >= 0 || s >= 0;
  (a >= 0 &&
    this.raise(
      a,
      "Shorthand property assignments are valid only in destructuring patterns",
    ),
    s >= 0 && this.raiseRecoverable(s, "Redefinition of __proto__ property"));
};
de.checkYieldAwaitInDefaultParams = function () {
  (this.yieldPos &&
    (!this.awaitPos || this.yieldPos < this.awaitPos) &&
    this.raise(this.yieldPos, "Yield expression cannot be a default value"),
    this.awaitPos &&
      this.raise(this.awaitPos, "Await expression cannot be a default value"));
};
de.isSimpleAssignTarget = function (e) {
  return e.type === "ParenthesizedExpression"
    ? this.isSimpleAssignTarget(e.expression)
    : e.type === "Identifier" || e.type === "MemberExpression";
};
var F = ee.prototype;
F.parseTopLevel = function (e) {
  var t = Object.create(null);
  for (e.body || (e.body = []); this.type !== u.eof; ) {
    var a = this.parseStatement(null, !0, t);
    e.body.push(a);
  }
  if (this.inModule)
    for (
      var s = 0, o = Object.keys(this.undefinedExports);
      s < o.length;
      s += 1
    ) {
      var c = o[s];
      this.raiseRecoverable(
        this.undefinedExports[c].start,
        "Export '" + c + "' is not defined",
      );
    }
  return (
    this.adaptDirectivePrologue(e.body),
    this.next(),
    (e.sourceType = this.options.sourceType),
    this.finishNode(e, "Program")
  );
};
var Zo = { kind: "loop" },
  xv = { kind: "switch" };
F.isLet = function (e) {
  if (this.options.ecmaVersion < 6 || !this.isContextual("let")) return !1;
  le.lastIndex = this.pos;
  var t = le.exec(this.input),
    a = this.pos + t[0].length,
    s = this.input.charCodeAt(a);
  if (s === 91 || s === 92) return !0;
  if (e) return !1;
  if (s === 123 || (s > 55295 && s < 56320)) return !0;
  if (Ce(s, !0)) {
    for (var o = a + 1; Ae((s = this.input.charCodeAt(o)), !0); ) ++o;
    if (s === 92 || (s > 55295 && s < 56320)) return !0;
    var c = this.input.slice(a, o);
    if (!pv.test(c)) return !0;
  }
  return !1;
};
F.isAsyncFunction = function () {
  if (this.options.ecmaVersion < 8 || !this.isContextual("async")) return !1;
  le.lastIndex = this.pos;
  var e = le.exec(this.input),
    t = this.pos + e[0].length,
    a;
  return (
    !ce.test(this.input.slice(this.pos, t)) &&
    this.input.slice(t, t + 8) === "function" &&
    (t + 8 === this.input.length ||
      !(Ae((a = this.input.charCodeAt(t + 8))) || (a > 55295 && a < 56320)))
  );
};
F.isUsingKeyword = function (e, t) {
  if (
    this.options.ecmaVersion < 17 ||
    !this.isContextual(e ? "await" : "using")
  )
    return !1;
  le.lastIndex = this.pos;
  var a = le.exec(this.input),
    s = this.pos + a[0].length;
  if (ce.test(this.input.slice(this.pos, s))) return !1;
  if (e) {
    var o = s + 5,
      c;
    if (
      this.input.slice(s, o) !== "using" ||
      o === this.input.length ||
      Ae((c = this.input.charCodeAt(o))) ||
      (c > 55295 && c < 56320)
    )
      return !1;
    le.lastIndex = o;
    var n = le.exec(this.input);
    if (n && ce.test(this.input.slice(o, o + n[0].length))) return !1;
  }
  if (t) {
    var b = s + 2,
      g;
    if (
      this.input.slice(s, b) === "of" &&
      (b === this.input.length ||
        (!Ae((g = this.input.charCodeAt(b))) && !(g > 55295 && g < 56320)))
    )
      return !1;
  }
  var q = this.input.charCodeAt(s);
  return Ce(q, !0) || q === 92;
};
F.isAwaitUsing = function (e) {
  return this.isUsingKeyword(!0, e);
};
F.isUsing = function (e) {
  return this.isUsingKeyword(!1, e);
};
F.parseStatement = function (e, t, a) {
  var s = this.type,
    o = this.startNode(),
    c;
  switch ((this.isLet(e) && ((s = u._var), (c = "let")), s)) {
    case u._break:
    case u._continue:
      return this.parseBreakContinueStatement(o, s.keyword);
    case u._debugger:
      return this.parseDebuggerStatement(o);
    case u._do:
      return this.parseDoStatement(o);
    case u._for:
      return this.parseForStatement(o);
    case u._function:
      return (
        e &&
          (this.strict || (e !== "if" && e !== "label")) &&
          this.options.ecmaVersion >= 6 &&
          this.unexpected(),
        this.parseFunctionStatement(o, !1, !e)
      );
    case u._class:
      return (e && this.unexpected(), this.parseClass(o, !0));
    case u._if:
      return this.parseIfStatement(o);
    case u._return:
      return this.parseReturnStatement(o);
    case u._switch:
      return this.parseSwitchStatement(o);
    case u._throw:
      return this.parseThrowStatement(o);
    case u._try:
      return this.parseTryStatement(o);
    case u._const:
    case u._var:
      return (
        (c = c || this.value),
        e && c !== "var" && this.unexpected(),
        this.parseVarStatement(o, c)
      );
    case u._while:
      return this.parseWhileStatement(o);
    case u._with:
      return this.parseWithStatement(o);
    case u.braceL:
      return this.parseBlock(!0, o);
    case u.semi:
      return this.parseEmptyStatement(o);
    case u._export:
    case u._import:
      if (this.options.ecmaVersion > 10 && s === u._import) {
        le.lastIndex = this.pos;
        var n = le.exec(this.input),
          b = this.pos + n[0].length,
          g = this.input.charCodeAt(b);
        if (g === 40 || g === 46)
          return this.parseExpressionStatement(o, this.parseExpression());
      }
      return (
        this.options.allowImportExportEverywhere ||
          (t ||
            this.raise(
              this.start,
              "'import' and 'export' may only appear at the top level",
            ),
          this.inModule ||
            this.raise(
              this.start,
              "'import' and 'export' may appear only with 'sourceType: module'",
            )),
        s === u._import ? this.parseImport(o) : this.parseExport(o, a)
      );
    default:
      if (this.isAsyncFunction())
        return (
          e && this.unexpected(),
          this.next(),
          this.parseFunctionStatement(o, !0, !e)
        );
      var q = this.isAwaitUsing(!1)
        ? "await using"
        : this.isUsing(!1)
          ? "using"
          : null;
      if (q)
        return (
          t &&
            this.options.sourceType === "script" &&
            this.raise(
              this.start,
              "Using declaration cannot appear in the top level when source type is `script`",
            ),
          q === "await using" &&
            (this.canAwait ||
              this.raise(
                this.start,
                "Await using cannot appear outside of async function",
              ),
            this.next()),
          this.next(),
          this.parseVar(o, !1, q),
          this.semicolon(),
          this.finishNode(o, "VariableDeclaration")
        );
      var f = this.value,
        T = this.parseExpression();
      return s === u.name && T.type === "Identifier" && this.eat(u.colon)
        ? this.parseLabeledStatement(o, f, T, e)
        : this.parseExpressionStatement(o, T);
  }
};
F.parseBreakContinueStatement = function (e, t) {
  var a = t === "break";
  (this.next(),
    this.eat(u.semi) || this.insertSemicolon()
      ? (e.label = null)
      : this.type !== u.name
        ? this.unexpected()
        : ((e.label = this.parseIdent()), this.semicolon()));
  for (var s = 0; s < this.labels.length; ++s) {
    var o = this.labels[s];
    if (
      (e.label == null || o.name === e.label.name) &&
      ((o.kind != null && (a || o.kind === "loop")) || (e.label && a))
    )
      break;
  }
  return (
    s === this.labels.length && this.raise(e.start, "Unsyntactic " + t),
    this.finishNode(e, a ? "BreakStatement" : "ContinueStatement")
  );
};
F.parseDebuggerStatement = function (e) {
  return (
    this.next(),
    this.semicolon(),
    this.finishNode(e, "DebuggerStatement")
  );
};
F.parseDoStatement = function (e) {
  return (
    this.next(),
    this.labels.push(Zo),
    (e.body = this.parseStatement("do")),
    this.labels.pop(),
    this.expect(u._while),
    (e.test = this.parseParenExpression()),
    this.options.ecmaVersion >= 6 ? this.eat(u.semi) : this.semicolon(),
    this.finishNode(e, "DoWhileStatement")
  );
};
F.parseForStatement = function (e) {
  this.next();
  var t =
    this.options.ecmaVersion >= 9 &&
    this.canAwait &&
    this.eatContextual("await")
      ? this.lastTokStart
      : -1;
  if (
    (this.labels.push(Zo),
    this.enterScope(0),
    this.expect(u.parenL),
    this.type === u.semi)
  )
    return (t > -1 && this.unexpected(t), this.parseFor(e, null));
  var a = this.isLet();
  if (this.type === u._var || this.type === u._const || a) {
    var s = this.startNode(),
      o = a ? "let" : this.value;
    return (
      this.next(),
      this.parseVar(s, !0, o),
      this.finishNode(s, "VariableDeclaration"),
      this.parseForAfterInit(e, s, t)
    );
  }
  var c = this.isContextual("let"),
    n = !1,
    b = this.isUsing(!0)
      ? "using"
      : this.isAwaitUsing(!0)
        ? "await using"
        : null;
  if (b) {
    var g = this.startNode();
    return (
      this.next(),
      b === "await using" && this.next(),
      this.parseVar(g, !0, b),
      this.finishNode(g, "VariableDeclaration"),
      this.parseForAfterInit(e, g, t)
    );
  }
  var q = this.containsEsc,
    f = new Bn(),
    T = this.start,
    A =
      t > -1
        ? this.parseExprSubscripts(f, "await")
        : this.parseExpression(!0, f);
  return this.type === u._in ||
    (n = this.options.ecmaVersion >= 6 && this.isContextual("of"))
    ? (t > -1
        ? (this.type === u._in && this.unexpected(t), (e.await = !0))
        : n &&
          this.options.ecmaVersion >= 8 &&
          (A.start === T && !q && A.type === "Identifier" && A.name === "async"
            ? this.unexpected()
            : this.options.ecmaVersion >= 9 && (e.await = !1)),
      c &&
        n &&
        this.raise(
          A.start,
          "The left-hand side of a for-of loop may not start with 'let'.",
        ),
      this.toAssignable(A, !1, f),
      this.checkLValPattern(A),
      this.parseForIn(e, A))
    : (this.checkExpressionErrors(f, !0),
      t > -1 && this.unexpected(t),
      this.parseFor(e, A));
};
F.parseForAfterInit = function (e, t, a) {
  return (this.type === u._in ||
    (this.options.ecmaVersion >= 6 && this.isContextual("of"))) &&
    t.declarations.length === 1
    ? (this.options.ecmaVersion >= 9 &&
        (this.type === u._in
          ? a > -1 && this.unexpected(a)
          : (e.await = a > -1)),
      this.parseForIn(e, t))
    : (a > -1 && this.unexpected(a), this.parseFor(e, t));
};
F.parseFunctionStatement = function (e, t, a) {
  return (this.next(), this.parseFunction(e, on | (a ? 0 : Go), !1, t));
};
F.parseIfStatement = function (e) {
  return (
    this.next(),
    (e.test = this.parseParenExpression()),
    (e.consequent = this.parseStatement("if")),
    (e.alternate = this.eat(u._else) ? this.parseStatement("if") : null),
    this.finishNode(e, "IfStatement")
  );
};
F.parseReturnStatement = function (e) {
  return (
    !this.inFunction &&
      !this.options.allowReturnOutsideFunction &&
      this.raise(this.start, "'return' outside of function"),
    this.next(),
    this.eat(u.semi) || this.insertSemicolon()
      ? (e.argument = null)
      : ((e.argument = this.parseExpression()), this.semicolon()),
    this.finishNode(e, "ReturnStatement")
  );
};
F.parseSwitchStatement = function (e) {
  (this.next(),
    (e.discriminant = this.parseParenExpression()),
    (e.cases = []),
    this.expect(u.braceL),
    this.labels.push(xv),
    this.enterScope(0));
  for (var t, a = !1; this.type !== u.braceR; )
    if (this.type === u._case || this.type === u._default) {
      var s = this.type === u._case;
      (t && this.finishNode(t, "SwitchCase"),
        e.cases.push((t = this.startNode())),
        (t.consequent = []),
        this.next(),
        s
          ? (t.test = this.parseExpression())
          : (a &&
              this.raiseRecoverable(
                this.lastTokStart,
                "Multiple default clauses",
              ),
            (a = !0),
            (t.test = null)),
        this.expect(u.colon));
    } else
      (t || this.unexpected(), t.consequent.push(this.parseStatement(null)));
  return (
    this.exitScope(),
    t && this.finishNode(t, "SwitchCase"),
    this.next(),
    this.labels.pop(),
    this.finishNode(e, "SwitchStatement")
  );
};
F.parseThrowStatement = function (e) {
  return (
    this.next(),
    ce.test(this.input.slice(this.lastTokEnd, this.start)) &&
      this.raise(this.lastTokEnd, "Illegal newline after throw"),
    (e.argument = this.parseExpression()),
    this.semicolon(),
    this.finishNode(e, "ThrowStatement")
  );
};
var Cv = [];
F.parseCatchClauseParam = function () {
  var e = this.parseBindingAtom(),
    t = e.type === "Identifier";
  return (
    this.enterScope(t ? af : 0),
    this.checkLValPattern(e, t ? of : ke),
    this.expect(u.parenR),
    e
  );
};
F.parseTryStatement = function (e) {
  if (
    (this.next(),
    (e.block = this.parseBlock()),
    (e.handler = null),
    this.type === u._catch)
  ) {
    var t = this.startNode();
    (this.next(),
      this.eat(u.parenL)
        ? (t.param = this.parseCatchClauseParam())
        : (this.options.ecmaVersion < 10 && this.unexpected(),
          (t.param = null),
          this.enterScope(0)),
      (t.body = this.parseBlock(!1)),
      this.exitScope(),
      (e.handler = this.finishNode(t, "CatchClause")));
  }
  return (
    (e.finalizer = this.eat(u._finally) ? this.parseBlock() : null),
    !e.handler &&
      !e.finalizer &&
      this.raise(e.start, "Missing catch or finally clause"),
    this.finishNode(e, "TryStatement")
  );
};
F.parseVarStatement = function (e, t, a) {
  return (
    this.next(),
    this.parseVar(e, !1, t, a),
    this.semicolon(),
    this.finishNode(e, "VariableDeclaration")
  );
};
F.parseWhileStatement = function (e) {
  return (
    this.next(),
    (e.test = this.parseParenExpression()),
    this.labels.push(Zo),
    (e.body = this.parseStatement("while")),
    this.labels.pop(),
    this.finishNode(e, "WhileStatement")
  );
};
F.parseWithStatement = function (e) {
  return (
    this.strict && this.raise(this.start, "'with' in strict mode"),
    this.next(),
    (e.object = this.parseParenExpression()),
    (e.body = this.parseStatement("with")),
    this.finishNode(e, "WithStatement")
  );
};
F.parseEmptyStatement = function (e) {
  return (this.next(), this.finishNode(e, "EmptyStatement"));
};
F.parseLabeledStatement = function (e, t, a, s) {
  for (var o = 0, c = this.labels; o < c.length; o += 1) {
    var n = c[o];
    n.name === t &&
      this.raise(a.start, "Label '" + t + "' is already declared");
  }
  for (
    var b = this.type.isLoop
        ? "loop"
        : this.type === u._switch
          ? "switch"
          : null,
      g = this.labels.length - 1;
    g >= 0;
    g--
  ) {
    var q = this.labels[g];
    if (q.statementStart === e.start)
      ((q.statementStart = this.start), (q.kind = b));
    else break;
  }
  return (
    this.labels.push({ name: t, kind: b, statementStart: this.start }),
    (e.body = this.parseStatement(
      s ? (s.indexOf("label") === -1 ? s + "label" : s) : "label",
    )),
    this.labels.pop(),
    (e.label = a),
    this.finishNode(e, "LabeledStatement")
  );
};
F.parseExpressionStatement = function (e, t) {
  return (
    (e.expression = t),
    this.semicolon(),
    this.finishNode(e, "ExpressionStatement")
  );
};
F.parseBlock = function (e, t, a) {
  for (
    e === void 0 && (e = !0),
      t === void 0 && (t = this.startNode()),
      t.body = [],
      this.expect(u.braceL),
      e && this.enterScope(0);
    this.type !== u.braceR;
  ) {
    var s = this.parseStatement(null);
    t.body.push(s);
  }
  return (
    a && (this.strict = !1),
    this.next(),
    e && this.exitScope(),
    this.finishNode(t, "BlockStatement")
  );
};
F.parseFor = function (e, t) {
  return (
    (e.init = t),
    this.expect(u.semi),
    (e.test = this.type === u.semi ? null : this.parseExpression()),
    this.expect(u.semi),
    (e.update = this.type === u.parenR ? null : this.parseExpression()),
    this.expect(u.parenR),
    (e.body = this.parseStatement("for")),
    this.exitScope(),
    this.labels.pop(),
    this.finishNode(e, "ForStatement")
  );
};
F.parseForIn = function (e, t) {
  var a = this.type === u._in;
  return (
    this.next(),
    t.type === "VariableDeclaration" &&
      t.declarations[0].init != null &&
      (!a ||
        this.options.ecmaVersion < 8 ||
        this.strict ||
        t.kind !== "var" ||
        t.declarations[0].id.type !== "Identifier") &&
      this.raise(
        t.start,
        (a ? "for-in" : "for-of") +
          " loop variable declaration may not have an initializer",
      ),
    (e.left = t),
    (e.right = a ? this.parseExpression() : this.parseMaybeAssign()),
    this.expect(u.parenR),
    (e.body = this.parseStatement("for")),
    this.exitScope(),
    this.labels.pop(),
    this.finishNode(e, a ? "ForInStatement" : "ForOfStatement")
  );
};
F.parseVar = function (e, t, a, s) {
  for (e.declarations = [], e.kind = a; ; ) {
    var o = this.startNode();
    if (
      (this.parseVarId(o, a),
      this.eat(u.eq)
        ? (o.init = this.parseMaybeAssign(t))
        : !s &&
            a === "const" &&
            !(
              this.type === u._in ||
              (this.options.ecmaVersion >= 6 && this.isContextual("of"))
            )
          ? this.unexpected()
          : !s &&
              (a === "using" || a === "await using") &&
              this.options.ecmaVersion >= 17 &&
              this.type !== u._in &&
              !this.isContextual("of")
            ? this.raise(
                this.lastTokEnd,
                "Missing initializer in " + a + " declaration",
              )
            : !s &&
                o.id.type !== "Identifier" &&
                !(t && (this.type === u._in || this.isContextual("of")))
              ? this.raise(
                  this.lastTokEnd,
                  "Complex binding patterns require an initialization value",
                )
              : (o.init = null),
      e.declarations.push(this.finishNode(o, "VariableDeclarator")),
      !this.eat(u.comma))
    )
      break;
  }
  return e;
};
F.parseVarId = function (e, t) {
  ((e.id =
    t === "using" || t === "await using"
      ? this.parseIdent()
      : this.parseBindingAtom()),
    this.checkLValPattern(e.id, t === "var" ? Jo : ke, !1));
};
var on = 1,
  Go = 2,
  uf = 4;
F.parseFunction = function (e, t, a, s, o) {
  (this.initFunction(e),
    (this.options.ecmaVersion >= 9 || (this.options.ecmaVersion >= 6 && !s)) &&
      (this.type === u.star && t & Go && this.unexpected(),
      (e.generator = this.eat(u.star))),
    this.options.ecmaVersion >= 8 && (e.async = !!s),
    t & on &&
      ((e.id = t & uf && this.type !== u.name ? null : this.parseIdent()),
      e.id &&
        !(t & Go) &&
        this.checkLValSimple(
          e.id,
          this.strict || e.generator || e.async
            ? this.treatFunctionsAsVar
              ? Jo
              : ke
            : nf,
        )));
  var c = this.yieldPos,
    n = this.awaitPos,
    b = this.awaitIdentPos;
  return (
    (this.yieldPos = 0),
    (this.awaitPos = 0),
    (this.awaitIdentPos = 0),
    this.enterScope(Qo(e.async, e.generator)),
    t & on || (e.id = this.type === u.name ? this.parseIdent() : null),
    this.parseFunctionParams(e),
    this.parseFunctionBody(e, a, !1, o),
    (this.yieldPos = c),
    (this.awaitPos = n),
    (this.awaitIdentPos = b),
    this.finishNode(e, t & on ? "FunctionDeclaration" : "FunctionExpression")
  );
};
F.parseFunctionParams = function (e) {
  (this.expect(u.parenL),
    (e.params = this.parseBindingList(
      u.parenR,
      !1,
      this.options.ecmaVersion >= 8,
    )),
    this.checkYieldAwaitInDefaultParams());
};
F.parseClass = function (e, t) {
  this.next();
  var a = this.strict;
  ((this.strict = !0), this.parseClassId(e, t), this.parseClassSuper(e));
  var s = this.enterClassBody(),
    o = this.startNode(),
    c = !1;
  for (o.body = [], this.expect(u.braceL); this.type !== u.braceR; ) {
    var n = this.parseClassElement(e.superClass !== null);
    n &&
      (o.body.push(n),
      n.type === "MethodDefinition" && n.kind === "constructor"
        ? (c &&
            this.raiseRecoverable(
              n.start,
              "Duplicate constructor in the same class",
            ),
          (c = !0))
        : n.key &&
          n.key.type === "PrivateIdentifier" &&
          _v(s, n) &&
          this.raiseRecoverable(
            n.key.start,
            "Identifier '#" + n.key.name + "' has already been declared",
          ));
  }
  return (
    (this.strict = a),
    this.next(),
    (e.body = this.finishNode(o, "ClassBody")),
    this.exitClassBody(),
    this.finishNode(e, t ? "ClassDeclaration" : "ClassExpression")
  );
};
F.parseClassElement = function (e) {
  if (this.eat(u.semi)) return null;
  var t = this.options.ecmaVersion,
    a = this.startNode(),
    s = "",
    o = !1,
    c = !1,
    n = "method",
    b = !1;
  if (this.eatContextual("static")) {
    if (t >= 13 && this.eat(u.braceL))
      return (this.parseClassStaticBlock(a), a);
    this.isClassElementNameStart() || this.type === u.star
      ? (b = !0)
      : (s = "static");
  }
  if (
    ((a.static = b),
    !s &&
      t >= 8 &&
      this.eatContextual("async") &&
      ((this.isClassElementNameStart() || this.type === u.star) &&
      !this.canInsertSemicolon()
        ? (c = !0)
        : (s = "async")),
    !s && (t >= 9 || !c) && this.eat(u.star) && (o = !0),
    !s && !c && !o)
  ) {
    var g = this.value;
    (this.eatContextual("get") || this.eatContextual("set")) &&
      (this.isClassElementNameStart() ? (n = g) : (s = g));
  }
  if (
    (s
      ? ((a.computed = !1),
        (a.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc)),
        (a.key.name = s),
        this.finishNode(a.key, "Identifier"))
      : this.parseClassElementName(a),
    t < 13 || this.type === u.parenL || n !== "method" || o || c)
  ) {
    var q = !a.static && Mn(a, "constructor"),
      f = q && e;
    (q &&
      n !== "method" &&
      this.raise(a.key.start, "Constructor can't have get/set modifier"),
      (a.kind = q ? "constructor" : n),
      this.parseClassMethod(a, o, c, f));
  } else this.parseClassField(a);
  return a;
};
F.isClassElementNameStart = function () {
  return (
    this.type === u.name ||
    this.type === u.privateId ||
    this.type === u.num ||
    this.type === u.string ||
    this.type === u.bracketL ||
    this.type.keyword
  );
};
F.parseClassElementName = function (e) {
  this.type === u.privateId
    ? (this.value === "constructor" &&
        this.raise(
          this.start,
          "Classes can't have an element named '#constructor'",
        ),
      (e.computed = !1),
      (e.key = this.parsePrivateIdent()))
    : this.parsePropertyName(e);
};
F.parseClassMethod = function (e, t, a, s) {
  var o = e.key;
  e.kind === "constructor"
    ? (t && this.raise(o.start, "Constructor can't be a generator"),
      a && this.raise(o.start, "Constructor can't be an async method"))
    : e.static &&
      Mn(e, "prototype") &&
      this.raise(
        o.start,
        "Classes may not have a static property named prototype",
      );
  var c = (e.value = this.parseMethod(t, a, s));
  return (
    e.kind === "get" &&
      c.params.length !== 0 &&
      this.raiseRecoverable(c.start, "getter should have no params"),
    e.kind === "set" &&
      c.params.length !== 1 &&
      this.raiseRecoverable(c.start, "setter should have exactly one param"),
    e.kind === "set" &&
      c.params[0].type === "RestElement" &&
      this.raiseRecoverable(c.params[0].start, "Setter cannot use rest params"),
    this.finishNode(e, "MethodDefinition")
  );
};
F.parseClassField = function (e) {
  return (
    Mn(e, "constructor")
      ? this.raise(
          e.key.start,
          "Classes can't have a field named 'constructor'",
        )
      : e.static &&
        Mn(e, "prototype") &&
        this.raise(
          e.key.start,
          "Classes can't have a static field named 'prototype'",
        ),
    this.eat(u.eq)
      ? (this.enterScope(fn | Nn),
        (e.value = this.parseMaybeAssign()),
        this.exitScope())
      : (e.value = null),
    this.semicolon(),
    this.finishNode(e, "PropertyDefinition")
  );
};
F.parseClassStaticBlock = function (e) {
  e.body = [];
  var t = this.labels;
  for (this.labels = [], this.enterScope(Be | Nn); this.type !== u.braceR; ) {
    var a = this.parseStatement(null);
    e.body.push(a);
  }
  return (
    this.next(),
    this.exitScope(),
    (this.labels = t),
    this.finishNode(e, "StaticBlock")
  );
};
F.parseClassId = function (e, t) {
  this.type === u.name
    ? ((e.id = this.parseIdent()), t && this.checkLValSimple(e.id, ke, !1))
    : (t === !0 && this.unexpected(), (e.id = null));
};
F.parseClassSuper = function (e) {
  e.superClass = this.eat(u._extends)
    ? this.parseExprSubscripts(null, !1)
    : null;
};
F.enterClassBody = function () {
  var e = { declared: Object.create(null), used: [] };
  return (this.privateNameStack.push(e), e.declared);
};
F.exitClassBody = function () {
  var e = this.privateNameStack.pop(),
    t = e.declared,
    a = e.used;
  if (this.options.checkPrivateFields)
    for (
      var s = this.privateNameStack.length,
        o = s === 0 ? null : this.privateNameStack[s - 1],
        c = 0;
      c < a.length;
      ++c
    ) {
      var n = a[c];
      Ge(t, n.name) ||
        (o
          ? o.used.push(n)
          : this.raiseRecoverable(
              n.start,
              "Private field '#" +
                n.name +
                "' must be declared in an enclosing class",
            ));
    }
};
function _v(e, t) {
  var a = t.key.name,
    s = e[a],
    o = "true";
  return (
    t.type === "MethodDefinition" &&
      (t.kind === "get" || t.kind === "set") &&
      (o = (t.static ? "s" : "i") + t.kind),
    (s === "iget" && o === "iset") ||
    (s === "iset" && o === "iget") ||
    (s === "sget" && o === "sset") ||
    (s === "sset" && o === "sget")
      ? ((e[a] = "true"), !1)
      : s
        ? !0
        : ((e[a] = o), !1)
  );
}
function Mn(e, t) {
  var a = e.computed,
    s = e.key;
  return (
    !a &&
    ((s.type === "Identifier" && s.name === t) ||
      (s.type === "Literal" && s.value === t))
  );
}
F.parseExportAllDeclaration = function (e, t) {
  return (
    this.options.ecmaVersion >= 11 &&
      (this.eatContextual("as")
        ? ((e.exported = this.parseModuleExportName()),
          this.checkExport(t, e.exported, this.lastTokStart))
        : (e.exported = null)),
    this.expectContextual("from"),
    this.type !== u.string && this.unexpected(),
    (e.source = this.parseExprAtom()),
    this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause()),
    this.semicolon(),
    this.finishNode(e, "ExportAllDeclaration")
  );
};
F.parseExport = function (e, t) {
  if ((this.next(), this.eat(u.star)))
    return this.parseExportAllDeclaration(e, t);
  if (this.eat(u._default))
    return (
      this.checkExport(t, "default", this.lastTokStart),
      (e.declaration = this.parseExportDefaultDeclaration()),
      this.finishNode(e, "ExportDefaultDeclaration")
    );
  if (this.shouldParseExportStatement())
    ((e.declaration = this.parseExportDeclaration(e)),
      e.declaration.type === "VariableDeclaration"
        ? this.checkVariableExport(t, e.declaration.declarations)
        : this.checkExport(t, e.declaration.id, e.declaration.id.start),
      (e.specifiers = []),
      (e.source = null),
      this.options.ecmaVersion >= 16 && (e.attributes = []));
  else {
    if (
      ((e.declaration = null),
      (e.specifiers = this.parseExportSpecifiers(t)),
      this.eatContextual("from"))
    )
      (this.type !== u.string && this.unexpected(),
        (e.source = this.parseExprAtom()),
        this.options.ecmaVersion >= 16 &&
          (e.attributes = this.parseWithClause()));
    else {
      for (var a = 0, s = e.specifiers; a < s.length; a += 1) {
        var o = s[a];
        (this.checkUnreserved(o.local),
          this.checkLocalExport(o.local),
          o.local.type === "Literal" &&
            this.raise(
              o.local.start,
              "A string literal cannot be used as an exported binding without `from`.",
            ));
      }
      ((e.source = null),
        this.options.ecmaVersion >= 16 && (e.attributes = []));
    }
    this.semicolon();
  }
  return this.finishNode(e, "ExportNamedDeclaration");
};
F.parseExportDeclaration = function (e) {
  return this.parseStatement(null);
};
F.parseExportDefaultDeclaration = function () {
  var e;
  if (this.type === u._function || (e = this.isAsyncFunction())) {
    var t = this.startNode();
    return (
      this.next(),
      e && this.next(),
      this.parseFunction(t, on | uf, !1, e)
    );
  } else if (this.type === u._class) {
    var a = this.startNode();
    return this.parseClass(a, "nullableID");
  } else {
    var s = this.parseMaybeAssign();
    return (this.semicolon(), s);
  }
};
F.checkExport = function (e, t, a) {
  e &&
    (typeof t != "string" && (t = t.type === "Identifier" ? t.name : t.value),
    Ge(e, t) && this.raiseRecoverable(a, "Duplicate export '" + t + "'"),
    (e[t] = !0));
};
F.checkPatternExport = function (e, t) {
  var a = t.type;
  if (a === "Identifier") this.checkExport(e, t, t.start);
  else if (a === "ObjectPattern")
    for (var s = 0, o = t.properties; s < o.length; s += 1) {
      var c = o[s];
      this.checkPatternExport(e, c);
    }
  else if (a === "ArrayPattern")
    for (var n = 0, b = t.elements; n < b.length; n += 1) {
      var g = b[n];
      g && this.checkPatternExport(e, g);
    }
  else
    a === "Property"
      ? this.checkPatternExport(e, t.value)
      : a === "AssignmentPattern"
        ? this.checkPatternExport(e, t.left)
        : a === "RestElement" && this.checkPatternExport(e, t.argument);
};
F.checkVariableExport = function (e, t) {
  if (e)
    for (var a = 0, s = t; a < s.length; a += 1) {
      var o = s[a];
      this.checkPatternExport(e, o.id);
    }
};
F.shouldParseExportStatement = function () {
  return (
    this.type.keyword === "var" ||
    this.type.keyword === "const" ||
    this.type.keyword === "class" ||
    this.type.keyword === "function" ||
    this.isLet() ||
    this.isAsyncFunction()
  );
};
F.parseExportSpecifier = function (e) {
  var t = this.startNode();
  return (
    (t.local = this.parseModuleExportName()),
    (t.exported = this.eatContextual("as")
      ? this.parseModuleExportName()
      : t.local),
    this.checkExport(e, t.exported, t.exported.start),
    this.finishNode(t, "ExportSpecifier")
  );
};
F.parseExportSpecifiers = function (e) {
  var t = [],
    a = !0;
  for (this.expect(u.braceL); !this.eat(u.braceR); ) {
    if (a) a = !1;
    else if ((this.expect(u.comma), this.afterTrailingComma(u.braceR))) break;
    t.push(this.parseExportSpecifier(e));
  }
  return t;
};
F.parseImport = function (e) {
  return (
    this.next(),
    this.type === u.string
      ? ((e.specifiers = Cv), (e.source = this.parseExprAtom()))
      : ((e.specifiers = this.parseImportSpecifiers()),
        this.expectContextual("from"),
        (e.source =
          this.type === u.string ? this.parseExprAtom() : this.unexpected())),
    this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause()),
    this.semicolon(),
    this.finishNode(e, "ImportDeclaration")
  );
};
F.parseImportSpecifier = function () {
  var e = this.startNode();
  return (
    (e.imported = this.parseModuleExportName()),
    this.eatContextual("as")
      ? (e.local = this.parseIdent())
      : (this.checkUnreserved(e.imported), (e.local = e.imported)),
    this.checkLValSimple(e.local, ke),
    this.finishNode(e, "ImportSpecifier")
  );
};
F.parseImportDefaultSpecifier = function () {
  var e = this.startNode();
  return (
    (e.local = this.parseIdent()),
    this.checkLValSimple(e.local, ke),
    this.finishNode(e, "ImportDefaultSpecifier")
  );
};
F.parseImportNamespaceSpecifier = function () {
  var e = this.startNode();
  return (
    this.next(),
    this.expectContextual("as"),
    (e.local = this.parseIdent()),
    this.checkLValSimple(e.local, ke),
    this.finishNode(e, "ImportNamespaceSpecifier")
  );
};
F.parseImportSpecifiers = function () {
  var e = [],
    t = !0;
  if (
    this.type === u.name &&
    (e.push(this.parseImportDefaultSpecifier()), !this.eat(u.comma))
  )
    return e;
  if (this.type === u.star)
    return (e.push(this.parseImportNamespaceSpecifier()), e);
  for (this.expect(u.braceL); !this.eat(u.braceR); ) {
    if (t) t = !1;
    else if ((this.expect(u.comma), this.afterTrailingComma(u.braceR))) break;
    e.push(this.parseImportSpecifier());
  }
  return e;
};
F.parseWithClause = function () {
  var e = [];
  if (!this.eat(u._with)) return e;
  this.expect(u.braceL);
  for (var t = {}, a = !0; !this.eat(u.braceR); ) {
    if (a) a = !1;
    else if ((this.expect(u.comma), this.afterTrailingComma(u.braceR))) break;
    var s = this.parseImportAttribute(),
      o = s.key.type === "Identifier" ? s.key.name : s.key.value;
    (Ge(t, o) &&
      this.raiseRecoverable(s.key.start, "Duplicate attribute key '" + o + "'"),
      (t[o] = !0),
      e.push(s));
  }
  return e;
};
F.parseImportAttribute = function () {
  var e = this.startNode();
  return (
    (e.key =
      this.type === u.string
        ? this.parseExprAtom()
        : this.parseIdent(this.options.allowReserved !== "never")),
    this.expect(u.colon),
    this.type !== u.string && this.unexpected(),
    (e.value = this.parseExprAtom()),
    this.finishNode(e, "ImportAttribute")
  );
};
F.parseModuleExportName = function () {
  if (this.options.ecmaVersion >= 13 && this.type === u.string) {
    var e = this.parseLiteral(this.value);
    return (
      bv.test(e.value) &&
        this.raise(e.start, "An export name cannot include a lone surrogate."),
      e
    );
  }
  return this.parseIdent(!0);
};
F.adaptDirectivePrologue = function (e) {
  for (var t = 0; t < e.length && this.isDirectiveCandidate(e[t]); ++t)
    e[t].directive = e[t].expression.raw.slice(1, -1);
};
F.isDirectiveCandidate = function (e) {
  return (
    this.options.ecmaVersion >= 5 &&
    e.type === "ExpressionStatement" &&
    e.expression.type === "Literal" &&
    typeof e.expression.value == "string" &&
    (this.input[e.start] === '"' || this.input[e.start] === "'")
  );
};
var Re = ee.prototype;
Re.toAssignable = function (e, t, a) {
  if (this.options.ecmaVersion >= 6 && e)
    switch (e.type) {
      case "Identifier":
        this.inAsync &&
          e.name === "await" &&
          this.raise(
            e.start,
            "Cannot use 'await' as identifier inside an async function",
          );
        break;
      case "ObjectPattern":
      case "ArrayPattern":
      case "AssignmentPattern":
      case "RestElement":
        break;
      case "ObjectExpression":
        ((e.type = "ObjectPattern"), a && this.checkPatternErrors(a, !0));
        for (var s = 0, o = e.properties; s < o.length; s += 1) {
          var c = o[s];
          (this.toAssignable(c, t),
            c.type === "RestElement" &&
              (c.argument.type === "ArrayPattern" ||
                c.argument.type === "ObjectPattern") &&
              this.raise(c.argument.start, "Unexpected token"));
        }
        break;
      case "Property":
        (e.kind !== "init" &&
          this.raise(
            e.key.start,
            "Object pattern can't contain getter or setter",
          ),
          this.toAssignable(e.value, t));
        break;
      case "ArrayExpression":
        ((e.type = "ArrayPattern"),
          a && this.checkPatternErrors(a, !0),
          this.toAssignableList(e.elements, t));
        break;
      case "SpreadElement":
        ((e.type = "RestElement"),
          this.toAssignable(e.argument, t),
          e.argument.type === "AssignmentPattern" &&
            this.raise(
              e.argument.start,
              "Rest elements cannot have a default value",
            ));
        break;
      case "AssignmentExpression":
        (e.operator !== "=" &&
          this.raise(
            e.left.end,
            "Only '=' operator can be used for specifying default value.",
          ),
          (e.type = "AssignmentPattern"),
          delete e.operator,
          this.toAssignable(e.left, t));
        break;
      case "ParenthesizedExpression":
        this.toAssignable(e.expression, t, a);
        break;
      case "ChainExpression":
        this.raiseRecoverable(
          e.start,
          "Optional chaining cannot appear in left-hand side",
        );
        break;
      case "MemberExpression":
        if (!t) break;
      default:
        this.raise(e.start, "Assigning to rvalue");
    }
  else a && this.checkPatternErrors(a, !0);
  return e;
};
Re.toAssignableList = function (e, t) {
  for (var a = e.length, s = 0; s < a; s++) {
    var o = e[s];
    o && this.toAssignable(o, t);
  }
  if (a) {
    var c = e[a - 1];
    this.options.ecmaVersion === 6 &&
      t &&
      c &&
      c.type === "RestElement" &&
      c.argument.type !== "Identifier" &&
      this.unexpected(c.argument.start);
  }
  return e;
};
Re.parseSpread = function (e) {
  var t = this.startNode();
  return (
    this.next(),
    (t.argument = this.parseMaybeAssign(!1, e)),
    this.finishNode(t, "SpreadElement")
  );
};
Re.parseRestBinding = function () {
  var e = this.startNode();
  return (
    this.next(),
    this.options.ecmaVersion === 6 && this.type !== u.name && this.unexpected(),
    (e.argument = this.parseBindingAtom()),
    this.finishNode(e, "RestElement")
  );
};
Re.parseBindingAtom = function () {
  if (this.options.ecmaVersion >= 6)
    switch (this.type) {
      case u.bracketL:
        var e = this.startNode();
        return (
          this.next(),
          (e.elements = this.parseBindingList(u.bracketR, !0, !0)),
          this.finishNode(e, "ArrayPattern")
        );
      case u.braceL:
        return this.parseObj(!0);
    }
  return this.parseIdent();
};
Re.parseBindingList = function (e, t, a, s) {
  for (var o = [], c = !0; !this.eat(e); )
    if ((c ? (c = !1) : this.expect(u.comma), t && this.type === u.comma))
      o.push(null);
    else {
      if (a && this.afterTrailingComma(e)) break;
      if (this.type === u.ellipsis) {
        var n = this.parseRestBinding();
        (this.parseBindingListItem(n),
          o.push(n),
          this.type === u.comma &&
            this.raiseRecoverable(
              this.start,
              "Comma is not permitted after the rest element",
            ),
          this.expect(e));
        break;
      } else o.push(this.parseAssignableListItem(s));
    }
  return o;
};
Re.parseAssignableListItem = function (e) {
  var t = this.parseMaybeDefault(this.start, this.startLoc);
  return (this.parseBindingListItem(t), t);
};
Re.parseBindingListItem = function (e) {
  return e;
};
Re.parseMaybeDefault = function (e, t, a) {
  if (
    ((a = a || this.parseBindingAtom()),
    this.options.ecmaVersion < 6 || !this.eat(u.eq))
  )
    return a;
  var s = this.startNodeAt(e, t);
  return (
    (s.left = a),
    (s.right = this.parseMaybeAssign()),
    this.finishNode(s, "AssignmentPattern")
  );
};
Re.checkLValSimple = function (e, t, a) {
  t === void 0 && (t = In);
  var s = t !== In;
  switch (e.type) {
    case "Identifier":
      (this.strict &&
        this.reservedWordsStrictBind.test(e.name) &&
        this.raiseRecoverable(
          e.start,
          (s ? "Binding " : "Assigning to ") + e.name + " in strict mode",
        ),
        s &&
          (t === ke &&
            e.name === "let" &&
            this.raiseRecoverable(
              e.start,
              "let is disallowed as a lexically bound name",
            ),
          a &&
            (Ge(a, e.name) &&
              this.raiseRecoverable(e.start, "Argument name clash"),
            (a[e.name] = !0)),
          t !== lf && this.declareName(e.name, t, e.start)));
      break;
    case "ChainExpression":
      this.raiseRecoverable(
        e.start,
        "Optional chaining cannot appear in left-hand side",
      );
      break;
    case "MemberExpression":
      s && this.raiseRecoverable(e.start, "Binding member expression");
      break;
    case "ParenthesizedExpression":
      return (
        s && this.raiseRecoverable(e.start, "Binding parenthesized expression"),
        this.checkLValSimple(e.expression, t, a)
      );
    default:
      this.raise(e.start, (s ? "Binding" : "Assigning to") + " rvalue");
  }
};
Re.checkLValPattern = function (e, t, a) {
  switch ((t === void 0 && (t = In), e.type)) {
    case "ObjectPattern":
      for (var s = 0, o = e.properties; s < o.length; s += 1) {
        var c = o[s];
        this.checkLValInnerPattern(c, t, a);
      }
      break;
    case "ArrayPattern":
      for (var n = 0, b = e.elements; n < b.length; n += 1) {
        var g = b[n];
        g && this.checkLValInnerPattern(g, t, a);
      }
      break;
    default:
      this.checkLValSimple(e, t, a);
  }
};
Re.checkLValInnerPattern = function (e, t, a) {
  switch ((t === void 0 && (t = In), e.type)) {
    case "Property":
      this.checkLValInnerPattern(e.value, t, a);
      break;
    case "AssignmentPattern":
      this.checkLValPattern(e.left, t, a);
      break;
    case "RestElement":
      this.checkLValPattern(e.argument, t, a);
      break;
    default:
      this.checkLValPattern(e, t, a);
  }
};
var ue = function (t, a, s, o, c) {
    ((this.token = t),
      (this.isExpr = !!a),
      (this.preserveSpace = !!s),
      (this.override = o),
      (this.generator = !!c));
  },
  J = {
    b_stat: new ue("{", !1),
    b_expr: new ue("{", !0),
    b_tmpl: new ue("${", !1),
    p_stat: new ue("(", !1),
    p_expr: new ue("(", !0),
    q_tmpl: new ue("`", !0, !0, function (e) {
      return e.tryReadTemplateToken();
    }),
    f_stat: new ue("function", !1),
    f_expr: new ue("function", !0),
    f_expr_gen: new ue("function", !0, !1, null, !0),
    f_gen: new ue("function", !1, !1, null, !0),
  },
  ze = ee.prototype;
ze.initialContext = function () {
  return [J.b_stat];
};
ze.curContext = function () {
  return this.context[this.context.length - 1];
};
ze.braceIsBlock = function (e) {
  var t = this.curContext();
  return t === J.f_expr || t === J.f_stat
    ? !0
    : e === u.colon && (t === J.b_stat || t === J.b_expr)
      ? !t.isExpr
      : e === u._return || (e === u.name && this.exprAllowed)
        ? ce.test(this.input.slice(this.lastTokEnd, this.start))
        : e === u._else ||
            e === u.semi ||
            e === u.eof ||
            e === u.parenR ||
            e === u.arrow
          ? !0
          : e === u.braceL
            ? t === J.b_stat
            : e === u._var || e === u._const || e === u.name
              ? !1
              : !this.exprAllowed;
};
ze.inGeneratorContext = function () {
  for (var e = this.context.length - 1; e >= 1; e--) {
    var t = this.context[e];
    if (t.token === "function") return t.generator;
  }
  return !1;
};
ze.updateContext = function (e) {
  var t,
    a = this.type;
  a.keyword && e === u.dot
    ? (this.exprAllowed = !1)
    : (t = a.updateContext)
      ? t.call(this, e)
      : (this.exprAllowed = a.beforeExpr);
};
ze.overrideContext = function (e) {
  this.curContext() !== e && (this.context[this.context.length - 1] = e);
};
u.parenR.updateContext = u.braceR.updateContext = function () {
  if (this.context.length === 1) {
    this.exprAllowed = !0;
    return;
  }
  var e = this.context.pop();
  (e === J.b_stat &&
    this.curContext().token === "function" &&
    (e = this.context.pop()),
    (this.exprAllowed = !e.isExpr));
};
u.braceL.updateContext = function (e) {
  (this.context.push(this.braceIsBlock(e) ? J.b_stat : J.b_expr),
    (this.exprAllowed = !0));
};
u.dollarBraceL.updateContext = function () {
  (this.context.push(J.b_tmpl), (this.exprAllowed = !0));
};
u.parenL.updateContext = function (e) {
  var t = e === u._if || e === u._for || e === u._with || e === u._while;
  (this.context.push(t ? J.p_stat : J.p_expr), (this.exprAllowed = !0));
};
u.incDec.updateContext = function () {};
u._function.updateContext = u._class.updateContext = function (e) {
  (e.beforeExpr &&
  e !== u._else &&
  !(e === u.semi && this.curContext() !== J.p_stat) &&
  !(
    e === u._return && ce.test(this.input.slice(this.lastTokEnd, this.start))
  ) &&
  !((e === u.colon || e === u.braceL) && this.curContext() === J.b_stat)
    ? this.context.push(J.f_expr)
    : this.context.push(J.f_stat),
    (this.exprAllowed = !1));
};
u.colon.updateContext = function () {
  (this.curContext().token === "function" && this.context.pop(),
    (this.exprAllowed = !0));
};
u.backQuote.updateContext = function () {
  (this.curContext() === J.q_tmpl
    ? this.context.pop()
    : this.context.push(J.q_tmpl),
    (this.exprAllowed = !1));
};
u.star.updateContext = function (e) {
  if (e === u._function) {
    var t = this.context.length - 1;
    this.context[t] === J.f_expr
      ? (this.context[t] = J.f_expr_gen)
      : (this.context[t] = J.f_gen);
  }
  this.exprAllowed = !0;
};
u.name.updateContext = function (e) {
  var t = !1;
  (this.options.ecmaVersion >= 6 &&
    e !== u.dot &&
    ((this.value === "of" && !this.exprAllowed) ||
      (this.value === "yield" && this.inGeneratorContext())) &&
    (t = !0),
    (this.exprAllowed = t));
};
var $ = ee.prototype;
$.checkPropClash = function (e, t, a) {
  if (
    !(this.options.ecmaVersion >= 9 && e.type === "SpreadElement") &&
    !(this.options.ecmaVersion >= 6 && (e.computed || e.method || e.shorthand))
  ) {
    var s = e.key,
      o;
    switch (s.type) {
      case "Identifier":
        o = s.name;
        break;
      case "Literal":
        o = String(s.value);
        break;
      default:
        return;
    }
    var c = e.kind;
    if (this.options.ecmaVersion >= 6) {
      o === "__proto__" &&
        c === "init" &&
        (t.proto &&
          (a
            ? a.doubleProto < 0 && (a.doubleProto = s.start)
            : this.raiseRecoverable(
                s.start,
                "Redefinition of __proto__ property",
              )),
        (t.proto = !0));
      return;
    }
    o = "$" + o;
    var n = t[o];
    if (n) {
      var b;
      (c === "init"
        ? (b = (this.strict && n.init) || n.get || n.set)
        : (b = n.init || n[c]),
        b && this.raiseRecoverable(s.start, "Redefinition of property"));
    } else n = t[o] = { init: !1, get: !1, set: !1 };
    n[c] = !0;
  }
};
$.parseExpression = function (e, t) {
  var a = this.start,
    s = this.startLoc,
    o = this.parseMaybeAssign(e, t);
  if (this.type === u.comma) {
    var c = this.startNodeAt(a, s);
    for (c.expressions = [o]; this.eat(u.comma); )
      c.expressions.push(this.parseMaybeAssign(e, t));
    return this.finishNode(c, "SequenceExpression");
  }
  return o;
};
$.parseMaybeAssign = function (e, t, a) {
  if (this.isContextual("yield")) {
    if (this.inGenerator) return this.parseYield(e);
    this.exprAllowed = !1;
  }
  var s = !1,
    o = -1,
    c = -1,
    n = -1;
  t
    ? ((o = t.parenthesizedAssign),
      (c = t.trailingComma),
      (n = t.doubleProto),
      (t.parenthesizedAssign = t.trailingComma = -1))
    : ((t = new Bn()), (s = !0));
  var b = this.start,
    g = this.startLoc;
  (this.type === u.parenL || this.type === u.name) &&
    ((this.potentialArrowAt = this.start),
    (this.potentialArrowInForAwait = e === "await"));
  var q = this.parseMaybeConditional(e, t);
  if ((a && (q = a.call(this, q, b, g)), this.type.isAssign)) {
    var f = this.startNodeAt(b, g);
    return (
      (f.operator = this.value),
      this.type === u.eq && (q = this.toAssignable(q, !1, t)),
      s || (t.parenthesizedAssign = t.trailingComma = t.doubleProto = -1),
      t.shorthandAssign >= q.start && (t.shorthandAssign = -1),
      this.type === u.eq ? this.checkLValPattern(q) : this.checkLValSimple(q),
      (f.left = q),
      this.next(),
      (f.right = this.parseMaybeAssign(e)),
      n > -1 && (t.doubleProto = n),
      this.finishNode(f, "AssignmentExpression")
    );
  } else s && this.checkExpressionErrors(t, !0);
  return (
    o > -1 && (t.parenthesizedAssign = o),
    c > -1 && (t.trailingComma = c),
    q
  );
};
$.parseMaybeConditional = function (e, t) {
  var a = this.start,
    s = this.startLoc,
    o = this.parseExprOps(e, t);
  if (this.checkExpressionErrors(t)) return o;
  if (this.eat(u.question)) {
    var c = this.startNodeAt(a, s);
    return (
      (c.test = o),
      (c.consequent = this.parseMaybeAssign()),
      this.expect(u.colon),
      (c.alternate = this.parseMaybeAssign(e)),
      this.finishNode(c, "ConditionalExpression")
    );
  }
  return o;
};
$.parseExprOps = function (e, t) {
  var a = this.start,
    s = this.startLoc,
    o = this.parseMaybeUnary(t, !1, !1, e);
  return this.checkExpressionErrors(t) ||
    (o.start === a && o.type === "ArrowFunctionExpression")
    ? o
    : this.parseExprOp(o, a, s, -1, e);
};
$.parseExprOp = function (e, t, a, s, o) {
  var c = this.type.binop;
  if (c != null && (!o || this.type !== u._in) && c > s) {
    var n = this.type === u.logicalOR || this.type === u.logicalAND,
      b = this.type === u.coalesce;
    b && (c = u.logicalAND.binop);
    var g = this.value;
    this.next();
    var q = this.start,
      f = this.startLoc,
      T = this.parseExprOp(this.parseMaybeUnary(null, !1, !1, o), q, f, c, o),
      A = this.buildBinary(t, a, e, T, g, n || b);
    return (
      ((n && this.type === u.coalesce) ||
        (b && (this.type === u.logicalOR || this.type === u.logicalAND))) &&
        this.raiseRecoverable(
          this.start,
          "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses",
        ),
      this.parseExprOp(A, t, a, s, o)
    );
  }
  return e;
};
$.buildBinary = function (e, t, a, s, o, c) {
  s.type === "PrivateIdentifier" &&
    this.raise(
      s.start,
      "Private identifier can only be left side of binary expression",
    );
  var n = this.startNodeAt(e, t);
  return (
    (n.left = a),
    (n.operator = o),
    (n.right = s),
    this.finishNode(n, c ? "LogicalExpression" : "BinaryExpression")
  );
};
$.parseMaybeUnary = function (e, t, a, s) {
  var o = this.start,
    c = this.startLoc,
    n;
  if (this.isContextual("await") && this.canAwait)
    ((n = this.parseAwait(s)), (t = !0));
  else if (this.type.prefix) {
    var b = this.startNode(),
      g = this.type === u.incDec;
    ((b.operator = this.value),
      (b.prefix = !0),
      this.next(),
      (b.argument = this.parseMaybeUnary(null, !0, g, s)),
      this.checkExpressionErrors(e, !0),
      g
        ? this.checkLValSimple(b.argument)
        : this.strict && b.operator === "delete" && cf(b.argument)
          ? this.raiseRecoverable(
              b.start,
              "Deleting local variable in strict mode",
            )
          : b.operator === "delete" && Wo(b.argument)
            ? this.raiseRecoverable(
                b.start,
                "Private fields can not be deleted",
              )
            : (t = !0),
      (n = this.finishNode(b, g ? "UpdateExpression" : "UnaryExpression")));
  } else if (!t && this.type === u.privateId)
    ((s || this.privateNameStack.length === 0) &&
      this.options.checkPrivateFields &&
      this.unexpected(),
      (n = this.parsePrivateIdent()),
      this.type !== u._in && this.unexpected());
  else {
    if (((n = this.parseExprSubscripts(e, s)), this.checkExpressionErrors(e)))
      return n;
    for (; this.type.postfix && !this.canInsertSemicolon(); ) {
      var q = this.startNodeAt(o, c);
      ((q.operator = this.value),
        (q.prefix = !1),
        (q.argument = n),
        this.checkLValSimple(n),
        this.next(),
        (n = this.finishNode(q, "UpdateExpression")));
    }
  }
  if (!a && this.eat(u.starstar))
    if (t) this.unexpected(this.lastTokStart);
    else
      return this.buildBinary(
        o,
        c,
        n,
        this.parseMaybeUnary(null, !1, !1, s),
        "**",
        !1,
      );
  else return n;
};
function cf(e) {
  return (
    e.type === "Identifier" ||
    (e.type === "ParenthesizedExpression" && cf(e.expression))
  );
}
function Wo(e) {
  return (
    (e.type === "MemberExpression" &&
      e.property.type === "PrivateIdentifier") ||
    (e.type === "ChainExpression" && Wo(e.expression)) ||
    (e.type === "ParenthesizedExpression" && Wo(e.expression))
  );
}
$.parseExprSubscripts = function (e, t) {
  var a = this.start,
    s = this.startLoc,
    o = this.parseExprAtom(e, t);
  if (
    o.type === "ArrowFunctionExpression" &&
    this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")"
  )
    return o;
  var c = this.parseSubscripts(o, a, s, !1, t);
  return (
    e &&
      c.type === "MemberExpression" &&
      (e.parenthesizedAssign >= c.start && (e.parenthesizedAssign = -1),
      e.parenthesizedBind >= c.start && (e.parenthesizedBind = -1),
      e.trailingComma >= c.start && (e.trailingComma = -1)),
    c
  );
};
$.parseSubscripts = function (e, t, a, s, o) {
  for (
    var c =
        this.options.ecmaVersion >= 8 &&
        e.type === "Identifier" &&
        e.name === "async" &&
        this.lastTokEnd === e.end &&
        !this.canInsertSemicolon() &&
        e.end - e.start === 5 &&
        this.potentialArrowAt === e.start,
      n = !1;
    ;
  ) {
    var b = this.parseSubscript(e, t, a, s, c, n, o);
    if (
      (b.optional && (n = !0), b === e || b.type === "ArrowFunctionExpression")
    ) {
      if (n) {
        var g = this.startNodeAt(t, a);
        ((g.expression = b), (b = this.finishNode(g, "ChainExpression")));
      }
      return b;
    }
    e = b;
  }
};
$.shouldParseAsyncArrow = function () {
  return !this.canInsertSemicolon() && this.eat(u.arrow);
};
$.parseSubscriptAsyncArrow = function (e, t, a, s) {
  return this.parseArrowExpression(this.startNodeAt(e, t), a, !0, s);
};
$.parseSubscript = function (e, t, a, s, o, c, n) {
  var b = this.options.ecmaVersion >= 11,
    g = b && this.eat(u.questionDot);
  s &&
    g &&
    this.raise(
      this.lastTokStart,
      "Optional chaining cannot appear in the callee of new expressions",
    );
  var q = this.eat(u.bracketL);
  if (
    q ||
    (g && this.type !== u.parenL && this.type !== u.backQuote) ||
    this.eat(u.dot)
  ) {
    var f = this.startNodeAt(t, a);
    ((f.object = e),
      q
        ? ((f.property = this.parseExpression()), this.expect(u.bracketR))
        : this.type === u.privateId && e.type !== "Super"
          ? (f.property = this.parsePrivateIdent())
          : (f.property = this.parseIdent(
              this.options.allowReserved !== "never",
            )),
      (f.computed = !!q),
      b && (f.optional = g),
      (e = this.finishNode(f, "MemberExpression")));
  } else if (!s && this.eat(u.parenL)) {
    var T = new Bn(),
      A = this.yieldPos,
      k = this.awaitPos,
      L = this.awaitIdentPos;
    ((this.yieldPos = 0), (this.awaitPos = 0), (this.awaitIdentPos = 0));
    var I = this.parseExprList(u.parenR, this.options.ecmaVersion >= 8, !1, T);
    if (o && !g && this.shouldParseAsyncArrow())
      return (
        this.checkPatternErrors(T, !1),
        this.checkYieldAwaitInDefaultParams(),
        this.awaitIdentPos > 0 &&
          this.raise(
            this.awaitIdentPos,
            "Cannot use 'await' as identifier inside an async function",
          ),
        (this.yieldPos = A),
        (this.awaitPos = k),
        (this.awaitIdentPos = L),
        this.parseSubscriptAsyncArrow(t, a, I, n)
      );
    (this.checkExpressionErrors(T, !0),
      (this.yieldPos = A || this.yieldPos),
      (this.awaitPos = k || this.awaitPos),
      (this.awaitIdentPos = L || this.awaitIdentPos));
    var y = this.startNodeAt(t, a);
    ((y.callee = e),
      (y.arguments = I),
      b && (y.optional = g),
      (e = this.finishNode(y, "CallExpression")));
  } else if (this.type === u.backQuote) {
    (g || c) &&
      this.raise(
        this.start,
        "Optional chaining cannot appear in the tag of tagged template expressions",
      );
    var h = this.startNodeAt(t, a);
    ((h.tag = e),
      (h.quasi = this.parseTemplate({ isTagged: !0 })),
      (e = this.finishNode(h, "TaggedTemplateExpression")));
  }
  return e;
};
$.parseExprAtom = function (e, t, a) {
  this.type === u.slash && this.readRegexp();
  var s,
    o = this.potentialArrowAt === this.start;
  switch (this.type) {
    case u._super:
      return (
        this.allowSuper ||
          this.raise(this.start, "'super' keyword outside a method"),
        (s = this.startNode()),
        this.next(),
        this.type === u.parenL &&
          !this.allowDirectSuper &&
          this.raise(s.start, "super() call outside constructor of a subclass"),
        this.type !== u.dot &&
          this.type !== u.bracketL &&
          this.type !== u.parenL &&
          this.unexpected(),
        this.finishNode(s, "Super")
      );
    case u._this:
      return (
        (s = this.startNode()),
        this.next(),
        this.finishNode(s, "ThisExpression")
      );
    case u.name:
      var c = this.start,
        n = this.startLoc,
        b = this.containsEsc,
        g = this.parseIdent(!1);
      if (
        this.options.ecmaVersion >= 8 &&
        !b &&
        g.name === "async" &&
        !this.canInsertSemicolon() &&
        this.eat(u._function)
      )
        return (
          this.overrideContext(J.f_expr),
          this.parseFunction(this.startNodeAt(c, n), 0, !1, !0, t)
        );
      if (o && !this.canInsertSemicolon()) {
        if (this.eat(u.arrow))
          return this.parseArrowExpression(this.startNodeAt(c, n), [g], !1, t);
        if (
          this.options.ecmaVersion >= 8 &&
          g.name === "async" &&
          this.type === u.name &&
          !b &&
          (!this.potentialArrowInForAwait ||
            this.value !== "of" ||
            this.containsEsc)
        )
          return (
            (g = this.parseIdent(!1)),
            (this.canInsertSemicolon() || !this.eat(u.arrow)) &&
              this.unexpected(),
            this.parseArrowExpression(this.startNodeAt(c, n), [g], !0, t)
          );
      }
      return g;
    case u.regexp:
      var q = this.value;
      return (
        (s = this.parseLiteral(q.value)),
        (s.regex = { pattern: q.pattern, flags: q.flags }),
        s
      );
    case u.num:
    case u.string:
      return this.parseLiteral(this.value);
    case u._null:
    case u._true:
    case u._false:
      return (
        (s = this.startNode()),
        (s.value = this.type === u._null ? null : this.type === u._true),
        (s.raw = this.type.keyword),
        this.next(),
        this.finishNode(s, "Literal")
      );
    case u.parenL:
      var f = this.start,
        T = this.parseParenAndDistinguishExpression(o, t);
      return (
        e &&
          (e.parenthesizedAssign < 0 &&
            !this.isSimpleAssignTarget(T) &&
            (e.parenthesizedAssign = f),
          e.parenthesizedBind < 0 && (e.parenthesizedBind = f)),
        T
      );
    case u.bracketL:
      return (
        (s = this.startNode()),
        this.next(),
        (s.elements = this.parseExprList(u.bracketR, !0, !0, e)),
        this.finishNode(s, "ArrayExpression")
      );
    case u.braceL:
      return (this.overrideContext(J.b_expr), this.parseObj(!1, e));
    case u._function:
      return ((s = this.startNode()), this.next(), this.parseFunction(s, 0));
    case u._class:
      return this.parseClass(this.startNode(), !1);
    case u._new:
      return this.parseNew();
    case u.backQuote:
      return this.parseTemplate();
    case u._import:
      return this.options.ecmaVersion >= 11
        ? this.parseExprImport(a)
        : this.unexpected();
    default:
      return this.parseExprAtomDefault();
  }
};
$.parseExprAtomDefault = function () {
  this.unexpected();
};
$.parseExprImport = function (e) {
  var t = this.startNode();
  if (
    (this.containsEsc &&
      this.raiseRecoverable(this.start, "Escape sequence in keyword import"),
    this.next(),
    this.type === u.parenL && !e)
  )
    return this.parseDynamicImport(t);
  if (this.type === u.dot) {
    var a = this.startNodeAt(t.start, t.loc && t.loc.start);
    return (
      (a.name = "import"),
      (t.meta = this.finishNode(a, "Identifier")),
      this.parseImportMeta(t)
    );
  } else this.unexpected();
};
$.parseDynamicImport = function (e) {
  if (
    (this.next(),
    (e.source = this.parseMaybeAssign()),
    this.options.ecmaVersion >= 16)
  )
    this.eat(u.parenR)
      ? (e.options = null)
      : (this.expect(u.comma),
        this.afterTrailingComma(u.parenR)
          ? (e.options = null)
          : ((e.options = this.parseMaybeAssign()),
            this.eat(u.parenR) ||
              (this.expect(u.comma),
              this.afterTrailingComma(u.parenR) || this.unexpected())));
  else if (!this.eat(u.parenR)) {
    var t = this.start;
    this.eat(u.comma) && this.eat(u.parenR)
      ? this.raiseRecoverable(t, "Trailing comma is not allowed in import()")
      : this.unexpected(t);
  }
  return this.finishNode(e, "ImportExpression");
};
$.parseImportMeta = function (e) {
  this.next();
  var t = this.containsEsc;
  return (
    (e.property = this.parseIdent(!0)),
    e.property.name !== "meta" &&
      this.raiseRecoverable(
        e.property.start,
        "The only valid meta property for import is 'import.meta'",
      ),
    t &&
      this.raiseRecoverable(
        e.start,
        "'import.meta' must not contain escaped characters",
      ),
    this.options.sourceType !== "module" &&
      !this.options.allowImportExportEverywhere &&
      this.raiseRecoverable(
        e.start,
        "Cannot use 'import.meta' outside a module",
      ),
    this.finishNode(e, "MetaProperty")
  );
};
$.parseLiteral = function (e) {
  var t = this.startNode();
  return (
    (t.value = e),
    (t.raw = this.input.slice(this.start, this.end)),
    t.raw.charCodeAt(t.raw.length - 1) === 110 &&
      (t.bigint =
        t.value != null
          ? t.value.toString()
          : t.raw.slice(0, -1).replace(/_/g, "")),
    this.next(),
    this.finishNode(t, "Literal")
  );
};
$.parseParenExpression = function () {
  this.expect(u.parenL);
  var e = this.parseExpression();
  return (this.expect(u.parenR), e);
};
$.shouldParseArrow = function (e) {
  return !this.canInsertSemicolon();
};
$.parseParenAndDistinguishExpression = function (e, t) {
  var a = this.start,
    s = this.startLoc,
    o,
    c = this.options.ecmaVersion >= 8;
  if (this.options.ecmaVersion >= 6) {
    this.next();
    var n = this.start,
      b = this.startLoc,
      g = [],
      q = !0,
      f = !1,
      T = new Bn(),
      A = this.yieldPos,
      k = this.awaitPos,
      L;
    for (this.yieldPos = 0, this.awaitPos = 0; this.type !== u.parenR; )
      if (
        (q ? (q = !1) : this.expect(u.comma),
        c && this.afterTrailingComma(u.parenR, !0))
      ) {
        f = !0;
        break;
      } else if (this.type === u.ellipsis) {
        ((L = this.start),
          g.push(this.parseParenItem(this.parseRestBinding())),
          this.type === u.comma &&
            this.raiseRecoverable(
              this.start,
              "Comma is not permitted after the rest element",
            ));
        break;
      } else g.push(this.parseMaybeAssign(!1, T, this.parseParenItem));
    var I = this.lastTokEnd,
      y = this.lastTokEndLoc;
    if (
      (this.expect(u.parenR),
      e && this.shouldParseArrow(g) && this.eat(u.arrow))
    )
      return (
        this.checkPatternErrors(T, !1),
        this.checkYieldAwaitInDefaultParams(),
        (this.yieldPos = A),
        (this.awaitPos = k),
        this.parseParenArrowList(a, s, g, t)
      );
    ((!g.length || f) && this.unexpected(this.lastTokStart),
      L && this.unexpected(L),
      this.checkExpressionErrors(T, !0),
      (this.yieldPos = A || this.yieldPos),
      (this.awaitPos = k || this.awaitPos),
      g.length > 1
        ? ((o = this.startNodeAt(n, b)),
          (o.expressions = g),
          this.finishNodeAt(o, "SequenceExpression", I, y))
        : (o = g[0]));
  } else o = this.parseParenExpression();
  if (this.options.preserveParens) {
    var h = this.startNodeAt(a, s);
    return ((h.expression = o), this.finishNode(h, "ParenthesizedExpression"));
  } else return o;
};
$.parseParenItem = function (e) {
  return e;
};
$.parseParenArrowList = function (e, t, a, s) {
  return this.parseArrowExpression(this.startNodeAt(e, t), a, !1, s);
};
var Pv = [];
$.parseNew = function () {
  this.containsEsc &&
    this.raiseRecoverable(this.start, "Escape sequence in keyword new");
  var e = this.startNode();
  if ((this.next(), this.options.ecmaVersion >= 6 && this.type === u.dot)) {
    var t = this.startNodeAt(e.start, e.loc && e.loc.start);
    ((t.name = "new"),
      (e.meta = this.finishNode(t, "Identifier")),
      this.next());
    var a = this.containsEsc;
    return (
      (e.property = this.parseIdent(!0)),
      e.property.name !== "target" &&
        this.raiseRecoverable(
          e.property.start,
          "The only valid meta property for new is 'new.target'",
        ),
      a &&
        this.raiseRecoverable(
          e.start,
          "'new.target' must not contain escaped characters",
        ),
      this.allowNewDotTarget ||
        this.raiseRecoverable(
          e.start,
          "'new.target' can only be used in functions and class static block",
        ),
      this.finishNode(e, "MetaProperty")
    );
  }
  var s = this.start,
    o = this.startLoc;
  return (
    (e.callee = this.parseSubscripts(
      this.parseExprAtom(null, !1, !0),
      s,
      o,
      !0,
      !1,
    )),
    this.eat(u.parenL)
      ? (e.arguments = this.parseExprList(
          u.parenR,
          this.options.ecmaVersion >= 8,
          !1,
        ))
      : (e.arguments = Pv),
    this.finishNode(e, "NewExpression")
  );
};
$.parseTemplateElement = function (e) {
  var t = e.isTagged,
    a = this.startNode();
  return (
    this.type === u.invalidTemplate
      ? (t ||
          this.raiseRecoverable(
            this.start,
            "Bad escape sequence in untagged template literal",
          ),
        (a.value = {
          raw: this.value.replace(
            /\r\n?/g,
            `
`,
          ),
          cooked: null,
        }))
      : (a.value = {
          raw: this.input.slice(this.start, this.end).replace(
            /\r\n?/g,
            `
`,
          ),
          cooked: this.value,
        }),
    this.next(),
    (a.tail = this.type === u.backQuote),
    this.finishNode(a, "TemplateElement")
  );
};
$.parseTemplate = function (e) {
  e === void 0 && (e = {});
  var t = e.isTagged;
  t === void 0 && (t = !1);
  var a = this.startNode();
  (this.next(), (a.expressions = []));
  var s = this.parseTemplateElement({ isTagged: t });
  for (a.quasis = [s]; !s.tail; )
    (this.type === u.eof &&
      this.raise(this.pos, "Unterminated template literal"),
      this.expect(u.dollarBraceL),
      a.expressions.push(this.parseExpression()),
      this.expect(u.braceR),
      a.quasis.push((s = this.parseTemplateElement({ isTagged: t }))));
  return (this.next(), this.finishNode(a, "TemplateLiteral"));
};
$.isAsyncProp = function (e) {
  return (
    !e.computed &&
    e.key.type === "Identifier" &&
    e.key.name === "async" &&
    (this.type === u.name ||
      this.type === u.num ||
      this.type === u.string ||
      this.type === u.bracketL ||
      this.type.keyword ||
      (this.options.ecmaVersion >= 9 && this.type === u.star)) &&
    !ce.test(this.input.slice(this.lastTokEnd, this.start))
  );
};
$.parseObj = function (e, t) {
  var a = this.startNode(),
    s = !0,
    o = {};
  for (a.properties = [], this.next(); !this.eat(u.braceR); ) {
    if (s) s = !1;
    else if (
      (this.expect(u.comma),
      this.options.ecmaVersion >= 5 && this.afterTrailingComma(u.braceR))
    )
      break;
    var c = this.parseProperty(e, t);
    (e || this.checkPropClash(c, o, t), a.properties.push(c));
  }
  return this.finishNode(a, e ? "ObjectPattern" : "ObjectExpression");
};
$.parseProperty = function (e, t) {
  var a = this.startNode(),
    s,
    o,
    c,
    n;
  if (this.options.ecmaVersion >= 9 && this.eat(u.ellipsis))
    return e
      ? ((a.argument = this.parseIdent(!1)),
        this.type === u.comma &&
          this.raiseRecoverable(
            this.start,
            "Comma is not permitted after the rest element",
          ),
        this.finishNode(a, "RestElement"))
      : ((a.argument = this.parseMaybeAssign(!1, t)),
        this.type === u.comma &&
          t &&
          t.trailingComma < 0 &&
          (t.trailingComma = this.start),
        this.finishNode(a, "SpreadElement"));
  this.options.ecmaVersion >= 6 &&
    ((a.method = !1),
    (a.shorthand = !1),
    (e || t) && ((c = this.start), (n = this.startLoc)),
    e || (s = this.eat(u.star)));
  var b = this.containsEsc;
  return (
    this.parsePropertyName(a),
    !e && !b && this.options.ecmaVersion >= 8 && !s && this.isAsyncProp(a)
      ? ((o = !0),
        (s = this.options.ecmaVersion >= 9 && this.eat(u.star)),
        this.parsePropertyName(a))
      : (o = !1),
    this.parsePropertyValue(a, e, s, o, c, n, t, b),
    this.finishNode(a, "Property")
  );
};
$.parseGetterSetter = function (e) {
  var t = e.key.name;
  (this.parsePropertyName(e), (e.value = this.parseMethod(!1)), (e.kind = t));
  var a = e.kind === "get" ? 0 : 1;
  if (e.value.params.length !== a) {
    var s = e.value.start;
    e.kind === "get"
      ? this.raiseRecoverable(s, "getter should have no params")
      : this.raiseRecoverable(s, "setter should have exactly one param");
  } else
    e.kind === "set" &&
      e.value.params[0].type === "RestElement" &&
      this.raiseRecoverable(
        e.value.params[0].start,
        "Setter cannot use rest params",
      );
};
$.parsePropertyValue = function (e, t, a, s, o, c, n, b) {
  ((a || s) && this.type === u.colon && this.unexpected(),
    this.eat(u.colon)
      ? ((e.value = t
          ? this.parseMaybeDefault(this.start, this.startLoc)
          : this.parseMaybeAssign(!1, n)),
        (e.kind = "init"))
      : this.options.ecmaVersion >= 6 && this.type === u.parenL
        ? (t && this.unexpected(),
          (e.method = !0),
          (e.value = this.parseMethod(a, s)),
          (e.kind = "init"))
        : !t &&
            !b &&
            this.options.ecmaVersion >= 5 &&
            !e.computed &&
            e.key.type === "Identifier" &&
            (e.key.name === "get" || e.key.name === "set") &&
            this.type !== u.comma &&
            this.type !== u.braceR &&
            this.type !== u.eq
          ? ((a || s) && this.unexpected(), this.parseGetterSetter(e))
          : this.options.ecmaVersion >= 6 &&
              !e.computed &&
              e.key.type === "Identifier"
            ? ((a || s) && this.unexpected(),
              this.checkUnreserved(e.key),
              e.key.name === "await" &&
                !this.awaitIdentPos &&
                (this.awaitIdentPos = o),
              t
                ? (e.value = this.parseMaybeDefault(o, c, this.copyNode(e.key)))
                : this.type === u.eq && n
                  ? (n.shorthandAssign < 0 && (n.shorthandAssign = this.start),
                    (e.value = this.parseMaybeDefault(
                      o,
                      c,
                      this.copyNode(e.key),
                    )))
                  : (e.value = this.copyNode(e.key)),
              (e.kind = "init"),
              (e.shorthand = !0))
            : this.unexpected());
};
$.parsePropertyName = function (e) {
  if (this.options.ecmaVersion >= 6) {
    if (this.eat(u.bracketL))
      return (
        (e.computed = !0),
        (e.key = this.parseMaybeAssign()),
        this.expect(u.bracketR),
        e.key
      );
    e.computed = !1;
  }
  return (e.key =
    this.type === u.num || this.type === u.string
      ? this.parseExprAtom()
      : this.parseIdent(this.options.allowReserved !== "never"));
};
$.initFunction = function (e) {
  ((e.id = null),
    this.options.ecmaVersion >= 6 && (e.generator = e.expression = !1),
    this.options.ecmaVersion >= 8 && (e.async = !1));
};
$.parseMethod = function (e, t, a) {
  var s = this.startNode(),
    o = this.yieldPos,
    c = this.awaitPos,
    n = this.awaitIdentPos;
  return (
    this.initFunction(s),
    this.options.ecmaVersion >= 6 && (s.generator = e),
    this.options.ecmaVersion >= 8 && (s.async = !!t),
    (this.yieldPos = 0),
    (this.awaitPos = 0),
    (this.awaitIdentPos = 0),
    this.enterScope(Qo(t, s.generator) | Nn | (a ? sf : 0)),
    this.expect(u.parenL),
    (s.params = this.parseBindingList(
      u.parenR,
      !1,
      this.options.ecmaVersion >= 8,
    )),
    this.checkYieldAwaitInDefaultParams(),
    this.parseFunctionBody(s, !1, !0, !1),
    (this.yieldPos = o),
    (this.awaitPos = c),
    (this.awaitIdentPos = n),
    this.finishNode(s, "FunctionExpression")
  );
};
$.parseArrowExpression = function (e, t, a, s) {
  var o = this.yieldPos,
    c = this.awaitPos,
    n = this.awaitIdentPos;
  return (
    this.enterScope(Qo(a, !1) | Yo),
    this.initFunction(e),
    this.options.ecmaVersion >= 8 && (e.async = !!a),
    (this.yieldPos = 0),
    (this.awaitPos = 0),
    (this.awaitIdentPos = 0),
    (e.params = this.toAssignableList(t, !0)),
    this.parseFunctionBody(e, !0, !1, s),
    (this.yieldPos = o),
    (this.awaitPos = c),
    (this.awaitIdentPos = n),
    this.finishNode(e, "ArrowFunctionExpression")
  );
};
$.parseFunctionBody = function (e, t, a, s) {
  var o = t && this.type !== u.braceL,
    c = this.strict,
    n = !1;
  if (o)
    ((e.body = this.parseMaybeAssign(s)),
      (e.expression = !0),
      this.checkParams(e, !1));
  else {
    var b = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(e.params);
    (!c || b) &&
      ((n = this.strictDirective(this.end)),
      n &&
        b &&
        this.raiseRecoverable(
          e.start,
          "Illegal 'use strict' directive in function with non-simple parameter list",
        ));
    var g = this.labels;
    ((this.labels = []),
      n && (this.strict = !0),
      this.checkParams(
        e,
        !c && !n && !t && !a && this.isSimpleParamList(e.params),
      ),
      this.strict && e.id && this.checkLValSimple(e.id, lf),
      (e.body = this.parseBlock(!1, void 0, n && !c)),
      (e.expression = !1),
      this.adaptDirectivePrologue(e.body.body),
      (this.labels = g));
  }
  this.exitScope();
};
$.isSimpleParamList = function (e) {
  for (var t = 0, a = e; t < a.length; t += 1) {
    var s = a[t];
    if (s.type !== "Identifier") return !1;
  }
  return !0;
};
$.checkParams = function (e, t) {
  for (var a = Object.create(null), s = 0, o = e.params; s < o.length; s += 1) {
    var c = o[s];
    this.checkLValInnerPattern(c, Jo, t ? null : a);
  }
};
$.parseExprList = function (e, t, a, s) {
  for (var o = [], c = !0; !this.eat(e); ) {
    if (c) c = !1;
    else if ((this.expect(u.comma), t && this.afterTrailingComma(e))) break;
    var n = void 0;
    (a && this.type === u.comma
      ? (n = null)
      : this.type === u.ellipsis
        ? ((n = this.parseSpread(s)),
          s &&
            this.type === u.comma &&
            s.trailingComma < 0 &&
            (s.trailingComma = this.start))
        : (n = this.parseMaybeAssign(!1, s)),
      o.push(n));
  }
  return o;
};
$.checkUnreserved = function (e) {
  var t = e.start,
    a = e.end,
    s = e.name;
  if (
    (this.inGenerator &&
      s === "yield" &&
      this.raiseRecoverable(
        t,
        "Cannot use 'yield' as identifier inside a generator",
      ),
    this.inAsync &&
      s === "await" &&
      this.raiseRecoverable(
        t,
        "Cannot use 'await' as identifier inside an async function",
      ),
    !(this.currentThisScope().flags & Dn) &&
      s === "arguments" &&
      this.raiseRecoverable(
        t,
        "Cannot use 'arguments' in class field initializer",
      ),
    this.inClassStaticBlock &&
      (s === "arguments" || s === "await") &&
      this.raise(
        t,
        "Cannot use " + s + " in class static initialization block",
      ),
    this.keywords.test(s) && this.raise(t, "Unexpected keyword '" + s + "'"),
    !(
      this.options.ecmaVersion < 6 &&
      this.input.slice(t, a).indexOf("\\") !== -1
    ))
  ) {
    var o = this.strict ? this.reservedWordsStrict : this.reservedWords;
    o.test(s) &&
      (!this.inAsync &&
        s === "await" &&
        this.raiseRecoverable(
          t,
          "Cannot use keyword 'await' outside an async function",
        ),
      this.raiseRecoverable(t, "The keyword '" + s + "' is reserved"));
  }
};
$.parseIdent = function (e) {
  var t = this.parseIdentNode();
  return (
    this.next(!!e),
    this.finishNode(t, "Identifier"),
    e ||
      (this.checkUnreserved(t),
      t.name === "await" &&
        !this.awaitIdentPos &&
        (this.awaitIdentPos = t.start)),
    t
  );
};
$.parseIdentNode = function () {
  var e = this.startNode();
  return (
    this.type === u.name
      ? (e.name = this.value)
      : this.type.keyword
        ? ((e.name = this.type.keyword),
          (e.name === "class" || e.name === "function") &&
            (this.lastTokEnd !== this.lastTokStart + 1 ||
              this.input.charCodeAt(this.lastTokStart) !== 46) &&
            this.context.pop(),
          (this.type = u.name))
        : this.unexpected(),
    e
  );
};
$.parsePrivateIdent = function () {
  var e = this.startNode();
  return (
    this.type === u.privateId ? (e.name = this.value) : this.unexpected(),
    this.next(),
    this.finishNode(e, "PrivateIdentifier"),
    this.options.checkPrivateFields &&
      (this.privateNameStack.length === 0
        ? this.raise(
            e.start,
            "Private field '#" +
              e.name +
              "' must be declared in an enclosing class",
          )
        : this.privateNameStack[this.privateNameStack.length - 1].used.push(e)),
    e
  );
};
$.parseYield = function (e) {
  this.yieldPos || (this.yieldPos = this.start);
  var t = this.startNode();
  return (
    this.next(),
    this.type === u.semi ||
    this.canInsertSemicolon() ||
    (this.type !== u.star && !this.type.startsExpr)
      ? ((t.delegate = !1), (t.argument = null))
      : ((t.delegate = this.eat(u.star)),
        (t.argument = this.parseMaybeAssign(e))),
    this.finishNode(t, "YieldExpression")
  );
};
$.parseAwait = function (e) {
  this.awaitPos || (this.awaitPos = this.start);
  var t = this.startNode();
  return (
    this.next(),
    (t.argument = this.parseMaybeUnary(null, !0, !1, e)),
    this.finishNode(t, "AwaitExpression")
  );
};
var Ln = ee.prototype;
Ln.raise = function (e, t) {
  var a = Ko(this.input, e);
  ((t += " (" + a.line + ":" + a.column + ")"),
    this.sourceFile && (t += " in " + this.sourceFile));
  var s = new SyntaxError(t);
  throw ((s.pos = e), (s.loc = a), (s.raisedAt = this.pos), s);
};
Ln.raiseRecoverable = Ln.raise;
Ln.curPosition = function () {
  if (this.options.locations)
    return new He(this.curLine, this.pos - this.lineStart);
};
var Me = ee.prototype,
  qv = function (t) {
    ((this.flags = t),
      (this.var = []),
      (this.lexical = []),
      (this.functions = []));
  };
Me.enterScope = function (e) {
  this.scopeStack.push(new qv(e));
};
Me.exitScope = function () {
  this.scopeStack.pop();
};
Me.treatFunctionsAsVarInScope = function (e) {
  return e.flags & We || (!this.inModule && e.flags & un);
};
Me.declareName = function (e, t, a) {
  var s = !1;
  if (t === ke) {
    var o = this.currentScope();
    ((s =
      o.lexical.indexOf(e) > -1 ||
      o.functions.indexOf(e) > -1 ||
      o.var.indexOf(e) > -1),
      o.lexical.push(e),
      this.inModule && o.flags & un && delete this.undefinedExports[e]);
  } else if (t === of) {
    var c = this.currentScope();
    c.lexical.push(e);
  } else if (t === nf) {
    var n = this.currentScope();
    (this.treatFunctionsAsVar
      ? (s = n.lexical.indexOf(e) > -1)
      : (s = n.lexical.indexOf(e) > -1 || n.var.indexOf(e) > -1),
      n.functions.push(e));
  } else
    for (var b = this.scopeStack.length - 1; b >= 0; --b) {
      var g = this.scopeStack[b];
      if (
        (g.lexical.indexOf(e) > -1 && !(g.flags & af && g.lexical[0] === e)) ||
        (!this.treatFunctionsAsVarInScope(g) && g.functions.indexOf(e) > -1)
      ) {
        s = !0;
        break;
      }
      if (
        (g.var.push(e),
        this.inModule && g.flags & un && delete this.undefinedExports[e],
        g.flags & Dn)
      )
        break;
    }
  s &&
    this.raiseRecoverable(
      a,
      "Identifier '" + e + "' has already been declared",
    );
};
Me.checkLocalExport = function (e) {
  this.scopeStack[0].lexical.indexOf(e.name) === -1 &&
    this.scopeStack[0].var.indexOf(e.name) === -1 &&
    (this.undefinedExports[e.name] = e);
};
Me.currentScope = function () {
  return this.scopeStack[this.scopeStack.length - 1];
};
Me.currentVarScope = function () {
  for (var e = this.scopeStack.length - 1; ; e--) {
    var t = this.scopeStack[e];
    if (t.flags & (Dn | fn | Be)) return t;
  }
};
Me.currentThisScope = function () {
  for (var e = this.scopeStack.length - 1; ; e--) {
    var t = this.scopeStack[e];
    if (t.flags & (Dn | fn | Be) && !(t.flags & Yo)) return t;
  }
};
var mn = function (t, a, s) {
    ((this.type = ""),
      (this.start = a),
      (this.end = 0),
      t.options.locations && (this.loc = new hn(t, s)),
      t.options.directSourceFile &&
        (this.sourceFile = t.options.directSourceFile),
      t.options.ranges && (this.range = [a, 0]));
  },
  vn = ee.prototype;
vn.startNode = function () {
  return new mn(this, this.start, this.startLoc);
};
vn.startNodeAt = function (e, t) {
  return new mn(this, e, t);
};
function df(e, t, a, s) {
  return (
    (e.type = t),
    (e.end = a),
    this.options.locations && (e.loc.end = s),
    this.options.ranges && (e.range[1] = a),
    e
  );
}
vn.finishNode = function (e, t) {
  return df.call(this, e, t, this.lastTokEnd, this.lastTokEndLoc);
};
vn.finishNodeAt = function (e, t, a, s) {
  return df.call(this, e, t, a, s);
};
vn.copyNode = function (e) {
  var t = new mn(this, e.start, this.startLoc);
  for (var a in e) t[a] = e[a];
  return t;
};
var Tv =
    "Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sunu Sunuwar Todhri Todr Tulu_Tigalari Tutg Unknown Zzzz",
  pf =
    "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS",
  hf = pf + " Extended_Pictographic",
  ff = hf,
  mf = ff + " EBase EComp EMod EPres ExtPict",
  vf = mf,
  Av = vf,
  wv = { 9: pf, 10: hf, 11: ff, 12: mf, 13: vf, 14: Av },
  Sv =
    "Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji",
  kv = { 9: "", 10: "", 11: "", 12: "", 13: "", 14: Sv },
  vl =
    "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu",
  bf =
    "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb",
  yf =
    bf +
    " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd",
  Rf =
    yf +
    " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho",
  gf =
    Rf +
    " Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi",
  xf = gf + " Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith",
  Ev = xf + " " + Tv,
  Iv = { 9: bf, 10: yf, 11: Rf, 12: gf, 13: xf, 14: Ev },
  Cf = {};
function Mv(e) {
  var t = (Cf[e] = {
    binary: Ie(wv[e] + " " + vl),
    binaryOfStrings: Ie(kv[e]),
    nonBinary: { General_Category: Ie(vl), Script: Ie(Iv[e]) },
  });
  ((t.nonBinary.Script_Extensions = t.nonBinary.Script),
    (t.nonBinary.gc = t.nonBinary.General_Category),
    (t.nonBinary.sc = t.nonBinary.Script),
    (t.nonBinary.scx = t.nonBinary.Script_Extensions));
}
for (var Fo = 0, bl = [9, 10, 11, 12, 13, 14]; Fo < bl.length; Fo += 1) {
  var Lv = bl[Fo];
  Mv(Lv);
}
var B = ee.prototype,
  On = function (t, a) {
    ((this.parent = t), (this.base = a || this));
  };
On.prototype.separatedFrom = function (t) {
  for (var a = this; a; a = a.parent)
    for (var s = t; s; s = s.parent)
      if (a.base === s.base && a !== s) return !0;
  return !1;
};
On.prototype.sibling = function () {
  return new On(this.parent, this.base);
};
var Te = function (t) {
  ((this.parser = t),
    (this.validFlags =
      "gim" +
      (t.options.ecmaVersion >= 6 ? "uy" : "") +
      (t.options.ecmaVersion >= 9 ? "s" : "") +
      (t.options.ecmaVersion >= 13 ? "d" : "") +
      (t.options.ecmaVersion >= 15 ? "v" : "")),
    (this.unicodeProperties =
      Cf[t.options.ecmaVersion >= 14 ? 14 : t.options.ecmaVersion]),
    (this.source = ""),
    (this.flags = ""),
    (this.start = 0),
    (this.switchU = !1),
    (this.switchV = !1),
    (this.switchN = !1),
    (this.pos = 0),
    (this.lastIntValue = 0),
    (this.lastStringValue = ""),
    (this.lastAssertionIsQuantifiable = !1),
    (this.numCapturingParens = 0),
    (this.maxBackReference = 0),
    (this.groupNames = Object.create(null)),
    (this.backReferenceNames = []),
    (this.branchID = null));
};
Te.prototype.reset = function (t, a, s) {
  var o = s.indexOf("v") !== -1,
    c = s.indexOf("u") !== -1;
  ((this.start = t | 0),
    (this.source = a + ""),
    (this.flags = s),
    o && this.parser.options.ecmaVersion >= 15
      ? ((this.switchU = !0), (this.switchV = !0), (this.switchN = !0))
      : ((this.switchU = c && this.parser.options.ecmaVersion >= 6),
        (this.switchV = !1),
        (this.switchN = c && this.parser.options.ecmaVersion >= 9)));
};
Te.prototype.raise = function (t) {
  this.parser.raiseRecoverable(
    this.start,
    "Invalid regular expression: /" + this.source + "/: " + t,
  );
};
Te.prototype.at = function (t, a) {
  a === void 0 && (a = !1);
  var s = this.source,
    o = s.length;
  if (t >= o) return -1;
  var c = s.charCodeAt(t);
  if (!(a || this.switchU) || c <= 55295 || c >= 57344 || t + 1 >= o) return c;
  var n = s.charCodeAt(t + 1);
  return n >= 56320 && n <= 57343 ? (c << 10) + n - 56613888 : c;
};
Te.prototype.nextIndex = function (t, a) {
  a === void 0 && (a = !1);
  var s = this.source,
    o = s.length;
  if (t >= o) return o;
  var c = s.charCodeAt(t),
    n;
  return !(a || this.switchU) ||
    c <= 55295 ||
    c >= 57344 ||
    t + 1 >= o ||
    (n = s.charCodeAt(t + 1)) < 56320 ||
    n > 57343
    ? t + 1
    : t + 2;
};
Te.prototype.current = function (t) {
  return (t === void 0 && (t = !1), this.at(this.pos, t));
};
Te.prototype.lookahead = function (t) {
  return (t === void 0 && (t = !1), this.at(this.nextIndex(this.pos, t), t));
};
Te.prototype.advance = function (t) {
  (t === void 0 && (t = !1), (this.pos = this.nextIndex(this.pos, t)));
};
Te.prototype.eat = function (t, a) {
  return (
    a === void 0 && (a = !1),
    this.current(a) === t ? (this.advance(a), !0) : !1
  );
};
Te.prototype.eatChars = function (t, a) {
  a === void 0 && (a = !1);
  for (var s = this.pos, o = 0, c = t; o < c.length; o += 1) {
    var n = c[o],
      b = this.at(s, a);
    if (b === -1 || b !== n) return !1;
    s = this.nextIndex(s, a);
  }
  return ((this.pos = s), !0);
};
B.validateRegExpFlags = function (e) {
  for (
    var t = e.validFlags, a = e.flags, s = !1, o = !1, c = 0;
    c < a.length;
    c++
  ) {
    var n = a.charAt(c);
    (t.indexOf(n) === -1 &&
      this.raise(e.start, "Invalid regular expression flag"),
      a.indexOf(n, c + 1) > -1 &&
        this.raise(e.start, "Duplicate regular expression flag"),
      n === "u" && (s = !0),
      n === "v" && (o = !0));
  }
  this.options.ecmaVersion >= 15 &&
    s &&
    o &&
    this.raise(e.start, "Invalid regular expression flag");
};
function Ov(e) {
  for (var t in e) return !0;
  return !1;
}
B.validateRegExpPattern = function (e) {
  (this.regexp_pattern(e),
    !e.switchN &&
      this.options.ecmaVersion >= 9 &&
      Ov(e.groupNames) &&
      ((e.switchN = !0), this.regexp_pattern(e)));
};
B.regexp_pattern = function (e) {
  ((e.pos = 0),
    (e.lastIntValue = 0),
    (e.lastStringValue = ""),
    (e.lastAssertionIsQuantifiable = !1),
    (e.numCapturingParens = 0),
    (e.maxBackReference = 0),
    (e.groupNames = Object.create(null)),
    (e.backReferenceNames.length = 0),
    (e.branchID = null),
    this.regexp_disjunction(e),
    e.pos !== e.source.length &&
      (e.eat(41) && e.raise("Unmatched ')'"),
      (e.eat(93) || e.eat(125)) && e.raise("Lone quantifier brackets")),
    e.maxBackReference > e.numCapturingParens && e.raise("Invalid escape"));
  for (var t = 0, a = e.backReferenceNames; t < a.length; t += 1) {
    var s = a[t];
    e.groupNames[s] || e.raise("Invalid named capture referenced");
  }
};
B.regexp_disjunction = function (e) {
  var t = this.options.ecmaVersion >= 16;
  for (
    t && (e.branchID = new On(e.branchID, null)), this.regexp_alternative(e);
    e.eat(124);
  )
    (t && (e.branchID = e.branchID.sibling()), this.regexp_alternative(e));
  (t && (e.branchID = e.branchID.parent),
    this.regexp_eatQuantifier(e, !0) && e.raise("Nothing to repeat"),
    e.eat(123) && e.raise("Lone quantifier brackets"));
};
B.regexp_alternative = function (e) {
  for (; e.pos < e.source.length && this.regexp_eatTerm(e); );
};
B.regexp_eatTerm = function (e) {
  return this.regexp_eatAssertion(e)
    ? (e.lastAssertionIsQuantifiable &&
        this.regexp_eatQuantifier(e) &&
        e.switchU &&
        e.raise("Invalid quantifier"),
      !0)
    : (e.switchU ? this.regexp_eatAtom(e) : this.regexp_eatExtendedAtom(e))
      ? (this.regexp_eatQuantifier(e), !0)
      : !1;
};
B.regexp_eatAssertion = function (e) {
  var t = e.pos;
  if (((e.lastAssertionIsQuantifiable = !1), e.eat(94) || e.eat(36))) return !0;
  if (e.eat(92)) {
    if (e.eat(66) || e.eat(98)) return !0;
    e.pos = t;
  }
  if (e.eat(40) && e.eat(63)) {
    var a = !1;
    if (
      (this.options.ecmaVersion >= 9 && (a = e.eat(60)), e.eat(61) || e.eat(33))
    )
      return (
        this.regexp_disjunction(e),
        e.eat(41) || e.raise("Unterminated group"),
        (e.lastAssertionIsQuantifiable = !a),
        !0
      );
  }
  return ((e.pos = t), !1);
};
B.regexp_eatQuantifier = function (e, t) {
  return (
    t === void 0 && (t = !1),
    this.regexp_eatQuantifierPrefix(e, t) ? (e.eat(63), !0) : !1
  );
};
B.regexp_eatQuantifierPrefix = function (e, t) {
  return (
    e.eat(42) || e.eat(43) || e.eat(63) || this.regexp_eatBracedQuantifier(e, t)
  );
};
B.regexp_eatBracedQuantifier = function (e, t) {
  var a = e.pos;
  if (e.eat(123)) {
    var s = 0,
      o = -1;
    if (
      this.regexp_eatDecimalDigits(e) &&
      ((s = e.lastIntValue),
      e.eat(44) && this.regexp_eatDecimalDigits(e) && (o = e.lastIntValue),
      e.eat(125))
    )
      return (
        o !== -1 &&
          o < s &&
          !t &&
          e.raise("numbers out of order in {} quantifier"),
        !0
      );
    (e.switchU && !t && e.raise("Incomplete quantifier"), (e.pos = a));
  }
  return !1;
};
B.regexp_eatAtom = function (e) {
  return (
    this.regexp_eatPatternCharacters(e) ||
    e.eat(46) ||
    this.regexp_eatReverseSolidusAtomEscape(e) ||
    this.regexp_eatCharacterClass(e) ||
    this.regexp_eatUncapturingGroup(e) ||
    this.regexp_eatCapturingGroup(e)
  );
};
B.regexp_eatReverseSolidusAtomEscape = function (e) {
  var t = e.pos;
  if (e.eat(92)) {
    if (this.regexp_eatAtomEscape(e)) return !0;
    e.pos = t;
  }
  return !1;
};
B.regexp_eatUncapturingGroup = function (e) {
  var t = e.pos;
  if (e.eat(40)) {
    if (e.eat(63)) {
      if (this.options.ecmaVersion >= 16) {
        var a = this.regexp_eatModifiers(e),
          s = e.eat(45);
        if (a || s) {
          for (var o = 0; o < a.length; o++) {
            var c = a.charAt(o);
            a.indexOf(c, o + 1) > -1 &&
              e.raise("Duplicate regular expression modifiers");
          }
          if (s) {
            var n = this.regexp_eatModifiers(e);
            !a &&
              !n &&
              e.current() === 58 &&
              e.raise("Invalid regular expression modifiers");
            for (var b = 0; b < n.length; b++) {
              var g = n.charAt(b);
              (n.indexOf(g, b + 1) > -1 || a.indexOf(g) > -1) &&
                e.raise("Duplicate regular expression modifiers");
            }
          }
        }
      }
      if (e.eat(58)) {
        if ((this.regexp_disjunction(e), e.eat(41))) return !0;
        e.raise("Unterminated group");
      }
    }
    e.pos = t;
  }
  return !1;
};
B.regexp_eatCapturingGroup = function (e) {
  if (e.eat(40)) {
    if (
      (this.options.ecmaVersion >= 9
        ? this.regexp_groupSpecifier(e)
        : e.current() === 63 && e.raise("Invalid group"),
      this.regexp_disjunction(e),
      e.eat(41))
    )
      return ((e.numCapturingParens += 1), !0);
    e.raise("Unterminated group");
  }
  return !1;
};
B.regexp_eatModifiers = function (e) {
  for (var t = "", a = 0; (a = e.current()) !== -1 && Nv(a); )
    ((t += we(a)), e.advance());
  return t;
};
function Nv(e) {
  return e === 105 || e === 109 || e === 115;
}
B.regexp_eatExtendedAtom = function (e) {
  return (
    e.eat(46) ||
    this.regexp_eatReverseSolidusAtomEscape(e) ||
    this.regexp_eatCharacterClass(e) ||
    this.regexp_eatUncapturingGroup(e) ||
    this.regexp_eatCapturingGroup(e) ||
    this.regexp_eatInvalidBracedQuantifier(e) ||
    this.regexp_eatExtendedPatternCharacter(e)
  );
};
B.regexp_eatInvalidBracedQuantifier = function (e) {
  return (
    this.regexp_eatBracedQuantifier(e, !0) && e.raise("Nothing to repeat"),
    !1
  );
};
B.regexp_eatSyntaxCharacter = function (e) {
  var t = e.current();
  return _f(t) ? ((e.lastIntValue = t), e.advance(), !0) : !1;
};
function _f(e) {
  return (
    e === 36 ||
    (e >= 40 && e <= 43) ||
    e === 46 ||
    e === 63 ||
    (e >= 91 && e <= 94) ||
    (e >= 123 && e <= 125)
  );
}
B.regexp_eatPatternCharacters = function (e) {
  for (var t = e.pos, a = 0; (a = e.current()) !== -1 && !_f(a); ) e.advance();
  return e.pos !== t;
};
B.regexp_eatExtendedPatternCharacter = function (e) {
  var t = e.current();
  return t !== -1 &&
    t !== 36 &&
    !(t >= 40 && t <= 43) &&
    t !== 46 &&
    t !== 63 &&
    t !== 91 &&
    t !== 94 &&
    t !== 124
    ? (e.advance(), !0)
    : !1;
};
B.regexp_groupSpecifier = function (e) {
  if (e.eat(63)) {
    this.regexp_eatGroupName(e) || e.raise("Invalid group");
    var t = this.options.ecmaVersion >= 16,
      a = e.groupNames[e.lastStringValue];
    if (a)
      if (t)
        for (var s = 0, o = a; s < o.length; s += 1) {
          var c = o[s];
          c.separatedFrom(e.branchID) ||
            e.raise("Duplicate capture group name");
        }
      else e.raise("Duplicate capture group name");
    t
      ? (a || (e.groupNames[e.lastStringValue] = [])).push(e.branchID)
      : (e.groupNames[e.lastStringValue] = !0);
  }
};
B.regexp_eatGroupName = function (e) {
  if (((e.lastStringValue = ""), e.eat(60))) {
    if (this.regexp_eatRegExpIdentifierName(e) && e.eat(62)) return !0;
    e.raise("Invalid capture group name");
  }
  return !1;
};
B.regexp_eatRegExpIdentifierName = function (e) {
  if (((e.lastStringValue = ""), this.regexp_eatRegExpIdentifierStart(e))) {
    for (
      e.lastStringValue += we(e.lastIntValue);
      this.regexp_eatRegExpIdentifierPart(e);
    )
      e.lastStringValue += we(e.lastIntValue);
    return !0;
  }
  return !1;
};
B.regexp_eatRegExpIdentifierStart = function (e) {
  var t = e.pos,
    a = this.options.ecmaVersion >= 11,
    s = e.current(a);
  return (
    e.advance(a),
    s === 92 &&
      this.regexp_eatRegExpUnicodeEscapeSequence(e, a) &&
      (s = e.lastIntValue),
    Dv(s) ? ((e.lastIntValue = s), !0) : ((e.pos = t), !1)
  );
};
function Dv(e) {
  return Ce(e, !0) || e === 36 || e === 95;
}
B.regexp_eatRegExpIdentifierPart = function (e) {
  var t = e.pos,
    a = this.options.ecmaVersion >= 11,
    s = e.current(a);
  return (
    e.advance(a),
    s === 92 &&
      this.regexp_eatRegExpUnicodeEscapeSequence(e, a) &&
      (s = e.lastIntValue),
    Bv(s) ? ((e.lastIntValue = s), !0) : ((e.pos = t), !1)
  );
};
function Bv(e) {
  return Ae(e, !0) || e === 36 || e === 95 || e === 8204 || e === 8205;
}
B.regexp_eatAtomEscape = function (e) {
  return this.regexp_eatBackReference(e) ||
    this.regexp_eatCharacterClassEscape(e) ||
    this.regexp_eatCharacterEscape(e) ||
    (e.switchN && this.regexp_eatKGroupName(e))
    ? !0
    : (e.switchU &&
        (e.current() === 99 && e.raise("Invalid unicode escape"),
        e.raise("Invalid escape")),
      !1);
};
B.regexp_eatBackReference = function (e) {
  var t = e.pos;
  if (this.regexp_eatDecimalEscape(e)) {
    var a = e.lastIntValue;
    if (e.switchU)
      return (a > e.maxBackReference && (e.maxBackReference = a), !0);
    if (a <= e.numCapturingParens) return !0;
    e.pos = t;
  }
  return !1;
};
B.regexp_eatKGroupName = function (e) {
  if (e.eat(107)) {
    if (this.regexp_eatGroupName(e))
      return (e.backReferenceNames.push(e.lastStringValue), !0);
    e.raise("Invalid named reference");
  }
  return !1;
};
B.regexp_eatCharacterEscape = function (e) {
  return (
    this.regexp_eatControlEscape(e) ||
    this.regexp_eatCControlLetter(e) ||
    this.regexp_eatZero(e) ||
    this.regexp_eatHexEscapeSequence(e) ||
    this.regexp_eatRegExpUnicodeEscapeSequence(e, !1) ||
    (!e.switchU && this.regexp_eatLegacyOctalEscapeSequence(e)) ||
    this.regexp_eatIdentityEscape(e)
  );
};
B.regexp_eatCControlLetter = function (e) {
  var t = e.pos;
  if (e.eat(99)) {
    if (this.regexp_eatControlLetter(e)) return !0;
    e.pos = t;
  }
  return !1;
};
B.regexp_eatZero = function (e) {
  return e.current() === 48 && !Fn(e.lookahead())
    ? ((e.lastIntValue = 0), e.advance(), !0)
    : !1;
};
B.regexp_eatControlEscape = function (e) {
  var t = e.current();
  return t === 116
    ? ((e.lastIntValue = 9), e.advance(), !0)
    : t === 110
      ? ((e.lastIntValue = 10), e.advance(), !0)
      : t === 118
        ? ((e.lastIntValue = 11), e.advance(), !0)
        : t === 102
          ? ((e.lastIntValue = 12), e.advance(), !0)
          : t === 114
            ? ((e.lastIntValue = 13), e.advance(), !0)
            : !1;
};
B.regexp_eatControlLetter = function (e) {
  var t = e.current();
  return Pf(t) ? ((e.lastIntValue = t % 32), e.advance(), !0) : !1;
};
function Pf(e) {
  return (e >= 65 && e <= 90) || (e >= 97 && e <= 122);
}
B.regexp_eatRegExpUnicodeEscapeSequence = function (e, t) {
  t === void 0 && (t = !1);
  var a = e.pos,
    s = t || e.switchU;
  if (e.eat(117)) {
    if (this.regexp_eatFixedHexDigits(e, 4)) {
      var o = e.lastIntValue;
      if (s && o >= 55296 && o <= 56319) {
        var c = e.pos;
        if (e.eat(92) && e.eat(117) && this.regexp_eatFixedHexDigits(e, 4)) {
          var n = e.lastIntValue;
          if (n >= 56320 && n <= 57343)
            return (
              (e.lastIntValue = (o - 55296) * 1024 + (n - 56320) + 65536),
              !0
            );
        }
        ((e.pos = c), (e.lastIntValue = o));
      }
      return !0;
    }
    if (
      s &&
      e.eat(123) &&
      this.regexp_eatHexDigits(e) &&
      e.eat(125) &&
      Fv(e.lastIntValue)
    )
      return !0;
    (s && e.raise("Invalid unicode escape"), (e.pos = a));
  }
  return !1;
};
function Fv(e) {
  return e >= 0 && e <= 1114111;
}
B.regexp_eatIdentityEscape = function (e) {
  if (e.switchU)
    return this.regexp_eatSyntaxCharacter(e)
      ? !0
      : e.eat(47)
        ? ((e.lastIntValue = 47), !0)
        : !1;
  var t = e.current();
  return t !== 99 && (!e.switchN || t !== 107)
    ? ((e.lastIntValue = t), e.advance(), !0)
    : !1;
};
B.regexp_eatDecimalEscape = function (e) {
  e.lastIntValue = 0;
  var t = e.current();
  if (t >= 49 && t <= 57) {
    do ((e.lastIntValue = 10 * e.lastIntValue + (t - 48)), e.advance());
    while ((t = e.current()) >= 48 && t <= 57);
    return !0;
  }
  return !1;
};
var qf = 0,
  Se = 1,
  ye = 2;
B.regexp_eatCharacterClassEscape = function (e) {
  var t = e.current();
  if (jv(t)) return ((e.lastIntValue = -1), e.advance(), Se);
  var a = !1;
  if (
    e.switchU &&
    this.options.ecmaVersion >= 9 &&
    ((a = t === 80) || t === 112)
  ) {
    ((e.lastIntValue = -1), e.advance());
    var s;
    if (
      e.eat(123) &&
      (s = this.regexp_eatUnicodePropertyValueExpression(e)) &&
      e.eat(125)
    )
      return (a && s === ye && e.raise("Invalid property name"), s);
    e.raise("Invalid property name");
  }
  return qf;
};
function jv(e) {
  return (
    e === 100 || e === 68 || e === 115 || e === 83 || e === 119 || e === 87
  );
}
B.regexp_eatUnicodePropertyValueExpression = function (e) {
  var t = e.pos;
  if (this.regexp_eatUnicodePropertyName(e) && e.eat(61)) {
    var a = e.lastStringValue;
    if (this.regexp_eatUnicodePropertyValue(e)) {
      var s = e.lastStringValue;
      return (this.regexp_validateUnicodePropertyNameAndValue(e, a, s), Se);
    }
  }
  if (((e.pos = t), this.regexp_eatLoneUnicodePropertyNameOrValue(e))) {
    var o = e.lastStringValue;
    return this.regexp_validateUnicodePropertyNameOrValue(e, o);
  }
  return qf;
};
B.regexp_validateUnicodePropertyNameAndValue = function (e, t, a) {
  (Ge(e.unicodeProperties.nonBinary, t) || e.raise("Invalid property name"),
    e.unicodeProperties.nonBinary[t].test(a) ||
      e.raise("Invalid property value"));
};
B.regexp_validateUnicodePropertyNameOrValue = function (e, t) {
  if (e.unicodeProperties.binary.test(t)) return Se;
  if (e.switchV && e.unicodeProperties.binaryOfStrings.test(t)) return ye;
  e.raise("Invalid property name");
};
B.regexp_eatUnicodePropertyName = function (e) {
  var t = 0;
  for (e.lastStringValue = ""; Tf((t = e.current())); )
    ((e.lastStringValue += we(t)), e.advance());
  return e.lastStringValue !== "";
};
function Tf(e) {
  return Pf(e) || e === 95;
}
B.regexp_eatUnicodePropertyValue = function (e) {
  var t = 0;
  for (e.lastStringValue = ""; Vv((t = e.current())); )
    ((e.lastStringValue += we(t)), e.advance());
  return e.lastStringValue !== "";
};
function Vv(e) {
  return Tf(e) || Fn(e);
}
B.regexp_eatLoneUnicodePropertyNameOrValue = function (e) {
  return this.regexp_eatUnicodePropertyValue(e);
};
B.regexp_eatCharacterClass = function (e) {
  if (e.eat(91)) {
    var t = e.eat(94),
      a = this.regexp_classContents(e);
    return (
      e.eat(93) || e.raise("Unterminated character class"),
      t && a === ye && e.raise("Negated character class may contain strings"),
      !0
    );
  }
  return !1;
};
B.regexp_classContents = function (e) {
  return e.current() === 93
    ? Se
    : e.switchV
      ? this.regexp_classSetExpression(e)
      : (this.regexp_nonEmptyClassRanges(e), Se);
};
B.regexp_nonEmptyClassRanges = function (e) {
  for (; this.regexp_eatClassAtom(e); ) {
    var t = e.lastIntValue;
    if (e.eat(45) && this.regexp_eatClassAtom(e)) {
      var a = e.lastIntValue;
      (e.switchU &&
        (t === -1 || a === -1) &&
        e.raise("Invalid character class"),
        t !== -1 &&
          a !== -1 &&
          t > a &&
          e.raise("Range out of order in character class"));
    }
  }
};
B.regexp_eatClassAtom = function (e) {
  var t = e.pos;
  if (e.eat(92)) {
    if (this.regexp_eatClassEscape(e)) return !0;
    if (e.switchU) {
      var a = e.current();
      ((a === 99 || Sf(a)) && e.raise("Invalid class escape"),
        e.raise("Invalid escape"));
    }
    e.pos = t;
  }
  var s = e.current();
  return s !== 93 ? ((e.lastIntValue = s), e.advance(), !0) : !1;
};
B.regexp_eatClassEscape = function (e) {
  var t = e.pos;
  if (e.eat(98)) return ((e.lastIntValue = 8), !0);
  if (e.switchU && e.eat(45)) return ((e.lastIntValue = 45), !0);
  if (!e.switchU && e.eat(99)) {
    if (this.regexp_eatClassControlLetter(e)) return !0;
    e.pos = t;
  }
  return (
    this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e)
  );
};
B.regexp_classSetExpression = function (e) {
  var t = Se,
    a;
  if (!this.regexp_eatClassSetRange(e))
    if ((a = this.regexp_eatClassSetOperand(e))) {
      a === ye && (t = ye);
      for (var s = e.pos; e.eatChars([38, 38]); ) {
        if (e.current() !== 38 && (a = this.regexp_eatClassSetOperand(e))) {
          a !== ye && (t = Se);
          continue;
        }
        e.raise("Invalid character in character class");
      }
      if (s !== e.pos) return t;
      for (; e.eatChars([45, 45]); )
        this.regexp_eatClassSetOperand(e) ||
          e.raise("Invalid character in character class");
      if (s !== e.pos) return t;
    } else e.raise("Invalid character in character class");
  for (;;)
    if (!this.regexp_eatClassSetRange(e)) {
      if (((a = this.regexp_eatClassSetOperand(e)), !a)) return t;
      a === ye && (t = ye);
    }
};
B.regexp_eatClassSetRange = function (e) {
  var t = e.pos;
  if (this.regexp_eatClassSetCharacter(e)) {
    var a = e.lastIntValue;
    if (e.eat(45) && this.regexp_eatClassSetCharacter(e)) {
      var s = e.lastIntValue;
      return (
        a !== -1 &&
          s !== -1 &&
          a > s &&
          e.raise("Range out of order in character class"),
        !0
      );
    }
    e.pos = t;
  }
  return !1;
};
B.regexp_eatClassSetOperand = function (e) {
  return this.regexp_eatClassSetCharacter(e)
    ? Se
    : this.regexp_eatClassStringDisjunction(e) || this.regexp_eatNestedClass(e);
};
B.regexp_eatNestedClass = function (e) {
  var t = e.pos;
  if (e.eat(91)) {
    var a = e.eat(94),
      s = this.regexp_classContents(e);
    if (e.eat(93))
      return (
        a && s === ye && e.raise("Negated character class may contain strings"),
        s
      );
    e.pos = t;
  }
  if (e.eat(92)) {
    var o = this.regexp_eatCharacterClassEscape(e);
    if (o) return o;
    e.pos = t;
  }
  return null;
};
B.regexp_eatClassStringDisjunction = function (e) {
  var t = e.pos;
  if (e.eatChars([92, 113])) {
    if (e.eat(123)) {
      var a = this.regexp_classStringDisjunctionContents(e);
      if (e.eat(125)) return a;
    } else e.raise("Invalid escape");
    e.pos = t;
  }
  return null;
};
B.regexp_classStringDisjunctionContents = function (e) {
  for (var t = this.regexp_classString(e); e.eat(124); )
    this.regexp_classString(e) === ye && (t = ye);
  return t;
};
B.regexp_classString = function (e) {
  for (var t = 0; this.regexp_eatClassSetCharacter(e); ) t++;
  return t === 1 ? Se : ye;
};
B.regexp_eatClassSetCharacter = function (e) {
  var t = e.pos;
  if (e.eat(92))
    return this.regexp_eatCharacterEscape(e) ||
      this.regexp_eatClassSetReservedPunctuator(e)
      ? !0
      : e.eat(98)
        ? ((e.lastIntValue = 8), !0)
        : ((e.pos = t), !1);
  var a = e.current();
  return a < 0 || (a === e.lookahead() && $v(a)) || Hv(a)
    ? !1
    : (e.advance(), (e.lastIntValue = a), !0);
};
function $v(e) {
  return (
    e === 33 ||
    (e >= 35 && e <= 38) ||
    (e >= 42 && e <= 44) ||
    e === 46 ||
    (e >= 58 && e <= 64) ||
    e === 94 ||
    e === 96 ||
    e === 126
  );
}
function Hv(e) {
  return (
    e === 40 ||
    e === 41 ||
    e === 45 ||
    e === 47 ||
    (e >= 91 && e <= 93) ||
    (e >= 123 && e <= 125)
  );
}
B.regexp_eatClassSetReservedPunctuator = function (e) {
  var t = e.current();
  return Uv(t) ? ((e.lastIntValue = t), e.advance(), !0) : !1;
};
function Uv(e) {
  return (
    e === 33 ||
    e === 35 ||
    e === 37 ||
    e === 38 ||
    e === 44 ||
    e === 45 ||
    (e >= 58 && e <= 62) ||
    e === 64 ||
    e === 96 ||
    e === 126
  );
}
B.regexp_eatClassControlLetter = function (e) {
  var t = e.current();
  return Fn(t) || t === 95 ? ((e.lastIntValue = t % 32), e.advance(), !0) : !1;
};
B.regexp_eatHexEscapeSequence = function (e) {
  var t = e.pos;
  if (e.eat(120)) {
    if (this.regexp_eatFixedHexDigits(e, 2)) return !0;
    (e.switchU && e.raise("Invalid escape"), (e.pos = t));
  }
  return !1;
};
B.regexp_eatDecimalDigits = function (e) {
  var t = e.pos,
    a = 0;
  for (e.lastIntValue = 0; Fn((a = e.current())); )
    ((e.lastIntValue = 10 * e.lastIntValue + (a - 48)), e.advance());
  return e.pos !== t;
};
function Fn(e) {
  return e >= 48 && e <= 57;
}
B.regexp_eatHexDigits = function (e) {
  var t = e.pos,
    a = 0;
  for (e.lastIntValue = 0; Af((a = e.current())); )
    ((e.lastIntValue = 16 * e.lastIntValue + wf(a)), e.advance());
  return e.pos !== t;
};
function Af(e) {
  return (e >= 48 && e <= 57) || (e >= 65 && e <= 70) || (e >= 97 && e <= 102);
}
function wf(e) {
  return e >= 65 && e <= 70
    ? 10 + (e - 65)
    : e >= 97 && e <= 102
      ? 10 + (e - 97)
      : e - 48;
}
B.regexp_eatLegacyOctalEscapeSequence = function (e) {
  if (this.regexp_eatOctalDigit(e)) {
    var t = e.lastIntValue;
    if (this.regexp_eatOctalDigit(e)) {
      var a = e.lastIntValue;
      t <= 3 && this.regexp_eatOctalDigit(e)
        ? (e.lastIntValue = t * 64 + a * 8 + e.lastIntValue)
        : (e.lastIntValue = t * 8 + a);
    } else e.lastIntValue = t;
    return !0;
  }
  return !1;
};
B.regexp_eatOctalDigit = function (e) {
  var t = e.current();
  return Sf(t)
    ? ((e.lastIntValue = t - 48), e.advance(), !0)
    : ((e.lastIntValue = 0), !1);
};
function Sf(e) {
  return e >= 48 && e <= 55;
}
B.regexp_eatFixedHexDigits = function (e, t) {
  var a = e.pos;
  e.lastIntValue = 0;
  for (var s = 0; s < t; ++s) {
    var o = e.current();
    if (!Af(o)) return ((e.pos = a), !1);
    ((e.lastIntValue = 16 * e.lastIntValue + wf(o)), e.advance());
  }
  return !0;
};
var jn = function (t) {
    ((this.type = t.type),
      (this.value = t.value),
      (this.start = t.start),
      (this.end = t.end),
      t.options.locations && (this.loc = new hn(t, t.startLoc, t.endLoc)),
      t.options.ranges && (this.range = [t.start, t.end]));
  },
  G = ee.prototype;
G.next = function (e) {
  (!e &&
    this.type.keyword &&
    this.containsEsc &&
    this.raiseRecoverable(
      this.start,
      "Escape sequence in keyword " + this.type.keyword,
    ),
    this.options.onToken && this.options.onToken(new jn(this)),
    (this.lastTokEnd = this.end),
    (this.lastTokStart = this.start),
    (this.lastTokEndLoc = this.endLoc),
    (this.lastTokStartLoc = this.startLoc),
    this.nextToken());
};
G.getToken = function () {
  return (this.next(), new jn(this));
};
typeof Symbol < "u" &&
  (G[Symbol.iterator] = function () {
    var e = this;
    return {
      next: function () {
        var t = e.getToken();
        return { done: t.type === u.eof, value: t };
      },
    };
  });
G.nextToken = function () {
  var e = this.curContext();
  if (
    ((!e || !e.preserveSpace) && this.skipSpace(),
    (this.start = this.pos),
    this.options.locations && (this.startLoc = this.curPosition()),
    this.pos >= this.input.length)
  )
    return this.finishToken(u.eof);
  if (e.override) return e.override(this);
  this.readToken(this.fullCharCodeAtPos());
};
G.readToken = function (e) {
  return Ce(e, this.options.ecmaVersion >= 6) || e === 92
    ? this.readWord()
    : this.getTokenFromCode(e);
};
G.fullCharCodeAtPos = function () {
  var e = this.input.charCodeAt(this.pos);
  if (e <= 55295 || e >= 56320) return e;
  var t = this.input.charCodeAt(this.pos + 1);
  return t <= 56319 || t >= 57344 ? e : (e << 10) + t - 56613888;
};
G.skipBlockComment = function () {
  var e = this.options.onComment && this.curPosition(),
    t = this.pos,
    a = this.input.indexOf("*/", (this.pos += 2));
  if (
    (a === -1 && this.raise(this.pos - 2, "Unterminated comment"),
    (this.pos = a + 2),
    this.options.locations)
  )
    for (var s = void 0, o = t; (s = ef(this.input, o, this.pos)) > -1; )
      (++this.curLine, (o = this.lineStart = s));
  this.options.onComment &&
    this.options.onComment(
      !0,
      this.input.slice(t + 2, a),
      t,
      this.pos,
      e,
      this.curPosition(),
    );
};
G.skipLineComment = function (e) {
  for (
    var t = this.pos,
      a = this.options.onComment && this.curPosition(),
      s = this.input.charCodeAt((this.pos += e));
    this.pos < this.input.length && !De(s);
  )
    s = this.input.charCodeAt(++this.pos);
  this.options.onComment &&
    this.options.onComment(
      !1,
      this.input.slice(t + e, this.pos),
      t,
      this.pos,
      a,
      this.curPosition(),
    );
};
G.skipSpace = function () {
  e: for (; this.pos < this.input.length; ) {
    var e = this.input.charCodeAt(this.pos);
    switch (e) {
      case 32:
      case 160:
        ++this.pos;
        break;
      case 13:
        this.input.charCodeAt(this.pos + 1) === 10 && ++this.pos;
      case 10:
      case 8232:
      case 8233:
        (++this.pos,
          this.options.locations &&
            (++this.curLine, (this.lineStart = this.pos)));
        break;
      case 47:
        switch (this.input.charCodeAt(this.pos + 1)) {
          case 42:
            this.skipBlockComment();
            break;
          case 47:
            this.skipLineComment(2);
            break;
          default:
            break e;
        }
        break;
      default:
        if ((e > 8 && e < 14) || (e >= 5760 && zo.test(String.fromCharCode(e))))
          ++this.pos;
        else break e;
    }
  }
};
G.finishToken = function (e, t) {
  ((this.end = this.pos),
    this.options.locations && (this.endLoc = this.curPosition()));
  var a = this.type;
  ((this.type = e), (this.value = t), this.updateContext(a));
};
G.readToken_dot = function () {
  var e = this.input.charCodeAt(this.pos + 1);
  if (e >= 48 && e <= 57) return this.readNumber(!0);
  var t = this.input.charCodeAt(this.pos + 2);
  return this.options.ecmaVersion >= 6 && e === 46 && t === 46
    ? ((this.pos += 3), this.finishToken(u.ellipsis))
    : (++this.pos, this.finishToken(u.dot));
};
G.readToken_slash = function () {
  var e = this.input.charCodeAt(this.pos + 1);
  return this.exprAllowed
    ? (++this.pos, this.readRegexp())
    : e === 61
      ? this.finishOp(u.assign, 2)
      : this.finishOp(u.slash, 1);
};
G.readToken_mult_modulo_exp = function (e) {
  var t = this.input.charCodeAt(this.pos + 1),
    a = 1,
    s = e === 42 ? u.star : u.modulo;
  return (
    this.options.ecmaVersion >= 7 &&
      e === 42 &&
      t === 42 &&
      (++a, (s = u.starstar), (t = this.input.charCodeAt(this.pos + 2))),
    t === 61 ? this.finishOp(u.assign, a + 1) : this.finishOp(s, a)
  );
};
G.readToken_pipe_amp = function (e) {
  var t = this.input.charCodeAt(this.pos + 1);
  if (t === e) {
    if (this.options.ecmaVersion >= 12) {
      var a = this.input.charCodeAt(this.pos + 2);
      if (a === 61) return this.finishOp(u.assign, 3);
    }
    return this.finishOp(e === 124 ? u.logicalOR : u.logicalAND, 2);
  }
  return t === 61
    ? this.finishOp(u.assign, 2)
    : this.finishOp(e === 124 ? u.bitwiseOR : u.bitwiseAND, 1);
};
G.readToken_caret = function () {
  var e = this.input.charCodeAt(this.pos + 1);
  return e === 61 ? this.finishOp(u.assign, 2) : this.finishOp(u.bitwiseXOR, 1);
};
G.readToken_plus_min = function (e) {
  var t = this.input.charCodeAt(this.pos + 1);
  return t === e
    ? t === 45 &&
      !this.inModule &&
      this.input.charCodeAt(this.pos + 2) === 62 &&
      (this.lastTokEnd === 0 ||
        ce.test(this.input.slice(this.lastTokEnd, this.pos)))
      ? (this.skipLineComment(3), this.skipSpace(), this.nextToken())
      : this.finishOp(u.incDec, 2)
    : t === 61
      ? this.finishOp(u.assign, 2)
      : this.finishOp(u.plusMin, 1);
};
G.readToken_lt_gt = function (e) {
  var t = this.input.charCodeAt(this.pos + 1),
    a = 1;
  return t === e
    ? ((a = e === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2),
      this.input.charCodeAt(this.pos + a) === 61
        ? this.finishOp(u.assign, a + 1)
        : this.finishOp(u.bitShift, a))
    : t === 33 &&
        e === 60 &&
        !this.inModule &&
        this.input.charCodeAt(this.pos + 2) === 45 &&
        this.input.charCodeAt(this.pos + 3) === 45
      ? (this.skipLineComment(4), this.skipSpace(), this.nextToken())
      : (t === 61 && (a = 2), this.finishOp(u.relational, a));
};
G.readToken_eq_excl = function (e) {
  var t = this.input.charCodeAt(this.pos + 1);
  return t === 61
    ? this.finishOp(
        u.equality,
        this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2,
      )
    : e === 61 && t === 62 && this.options.ecmaVersion >= 6
      ? ((this.pos += 2), this.finishToken(u.arrow))
      : this.finishOp(e === 61 ? u.eq : u.prefix, 1);
};
G.readToken_question = function () {
  var e = this.options.ecmaVersion;
  if (e >= 11) {
    var t = this.input.charCodeAt(this.pos + 1);
    if (t === 46) {
      var a = this.input.charCodeAt(this.pos + 2);
      if (a < 48 || a > 57) return this.finishOp(u.questionDot, 2);
    }
    if (t === 63) {
      if (e >= 12) {
        var s = this.input.charCodeAt(this.pos + 2);
        if (s === 61) return this.finishOp(u.assign, 3);
      }
      return this.finishOp(u.coalesce, 2);
    }
  }
  return this.finishOp(u.question, 1);
};
G.readToken_numberSign = function () {
  var e = this.options.ecmaVersion,
    t = 35;
  if (
    e >= 13 &&
    (++this.pos, (t = this.fullCharCodeAtPos()), Ce(t, !0) || t === 92)
  )
    return this.finishToken(u.privateId, this.readWord1());
  this.raise(this.pos, "Unexpected character '" + we(t) + "'");
};
G.getTokenFromCode = function (e) {
  switch (e) {
    case 46:
      return this.readToken_dot();
    case 40:
      return (++this.pos, this.finishToken(u.parenL));
    case 41:
      return (++this.pos, this.finishToken(u.parenR));
    case 59:
      return (++this.pos, this.finishToken(u.semi));
    case 44:
      return (++this.pos, this.finishToken(u.comma));
    case 91:
      return (++this.pos, this.finishToken(u.bracketL));
    case 93:
      return (++this.pos, this.finishToken(u.bracketR));
    case 123:
      return (++this.pos, this.finishToken(u.braceL));
    case 125:
      return (++this.pos, this.finishToken(u.braceR));
    case 58:
      return (++this.pos, this.finishToken(u.colon));
    case 96:
      if (this.options.ecmaVersion < 6) break;
      return (++this.pos, this.finishToken(u.backQuote));
    case 48:
      var t = this.input.charCodeAt(this.pos + 1);
      if (t === 120 || t === 88) return this.readRadixNumber(16);
      if (this.options.ecmaVersion >= 6) {
        if (t === 111 || t === 79) return this.readRadixNumber(8);
        if (t === 98 || t === 66) return this.readRadixNumber(2);
      }
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
      return this.readNumber(!1);
    case 34:
    case 39:
      return this.readString(e);
    case 47:
      return this.readToken_slash();
    case 37:
    case 42:
      return this.readToken_mult_modulo_exp(e);
    case 124:
    case 38:
      return this.readToken_pipe_amp(e);
    case 94:
      return this.readToken_caret();
    case 43:
    case 45:
      return this.readToken_plus_min(e);
    case 60:
    case 62:
      return this.readToken_lt_gt(e);
    case 61:
    case 33:
      return this.readToken_eq_excl(e);
    case 63:
      return this.readToken_question();
    case 126:
      return this.finishOp(u.prefix, 1);
    case 35:
      return this.readToken_numberSign();
  }
  this.raise(this.pos, "Unexpected character '" + we(e) + "'");
};
G.finishOp = function (e, t) {
  var a = this.input.slice(this.pos, this.pos + t);
  return ((this.pos += t), this.finishToken(e, a));
};
G.readRegexp = function () {
  for (var e, t, a = this.pos; ; ) {
    this.pos >= this.input.length &&
      this.raise(a, "Unterminated regular expression");
    var s = this.input.charAt(this.pos);
    if ((ce.test(s) && this.raise(a, "Unterminated regular expression"), e))
      e = !1;
    else {
      if (s === "[") t = !0;
      else if (s === "]" && t) t = !1;
      else if (s === "/" && !t) break;
      e = s === "\\";
    }
    ++this.pos;
  }
  var o = this.input.slice(a, this.pos);
  ++this.pos;
  var c = this.pos,
    n = this.readWord1();
  this.containsEsc && this.unexpected(c);
  var b = this.regexpState || (this.regexpState = new Te(this));
  (b.reset(a, o, n),
    this.validateRegExpFlags(b),
    this.validateRegExpPattern(b));
  var g = null;
  try {
    g = new RegExp(o, n);
  } catch {}
  return this.finishToken(u.regexp, { pattern: o, flags: n, value: g });
};
G.readInt = function (e, t, a) {
  for (
    var s = this.options.ecmaVersion >= 12 && t === void 0,
      o = a && this.input.charCodeAt(this.pos) === 48,
      c = this.pos,
      n = 0,
      b = 0,
      g = 0,
      q = t ?? 1 / 0;
    g < q;
    ++g, ++this.pos
  ) {
    var f = this.input.charCodeAt(this.pos),
      T = void 0;
    if (s && f === 95) {
      (o &&
        this.raiseRecoverable(
          this.pos,
          "Numeric separator is not allowed in legacy octal numeric literals",
        ),
        b === 95 &&
          this.raiseRecoverable(
            this.pos,
            "Numeric separator must be exactly one underscore",
          ),
        g === 0 &&
          this.raiseRecoverable(
            this.pos,
            "Numeric separator is not allowed at the first of digits",
          ),
        (b = f));
      continue;
    }
    if (
      (f >= 97
        ? (T = f - 97 + 10)
        : f >= 65
          ? (T = f - 65 + 10)
          : f >= 48 && f <= 57
            ? (T = f - 48)
            : (T = 1 / 0),
      T >= e)
    )
      break;
    ((b = f), (n = n * e + T));
  }
  return (
    s &&
      b === 95 &&
      this.raiseRecoverable(
        this.pos - 1,
        "Numeric separator is not allowed at the last of digits",
      ),
    this.pos === c || (t != null && this.pos - c !== t) ? null : n
  );
};
function Gv(e, t) {
  return t ? parseInt(e, 8) : parseFloat(e.replace(/_/g, ""));
}
function kf(e) {
  return typeof BigInt != "function" ? null : BigInt(e.replace(/_/g, ""));
}
G.readRadixNumber = function (e) {
  var t = this.pos;
  this.pos += 2;
  var a = this.readInt(e);
  return (
    a == null && this.raise(this.start + 2, "Expected number in radix " + e),
    this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110
      ? ((a = kf(this.input.slice(t, this.pos))), ++this.pos)
      : Ce(this.fullCharCodeAtPos()) &&
        this.raise(this.pos, "Identifier directly after number"),
    this.finishToken(u.num, a)
  );
};
G.readNumber = function (e) {
  var t = this.pos;
  !e &&
    this.readInt(10, void 0, !0) === null &&
    this.raise(t, "Invalid number");
  var a = this.pos - t >= 2 && this.input.charCodeAt(t) === 48;
  a && this.strict && this.raise(t, "Invalid number");
  var s = this.input.charCodeAt(this.pos);
  if (!a && !e && this.options.ecmaVersion >= 11 && s === 110) {
    var o = kf(this.input.slice(t, this.pos));
    return (
      ++this.pos,
      Ce(this.fullCharCodeAtPos()) &&
        this.raise(this.pos, "Identifier directly after number"),
      this.finishToken(u.num, o)
    );
  }
  (a && /[89]/.test(this.input.slice(t, this.pos)) && (a = !1),
    s === 46 &&
      !a &&
      (++this.pos, this.readInt(10), (s = this.input.charCodeAt(this.pos))),
    (s === 69 || s === 101) &&
      !a &&
      ((s = this.input.charCodeAt(++this.pos)),
      (s === 43 || s === 45) && ++this.pos,
      this.readInt(10) === null && this.raise(t, "Invalid number")),
    Ce(this.fullCharCodeAtPos()) &&
      this.raise(this.pos, "Identifier directly after number"));
  var c = Gv(this.input.slice(t, this.pos), a);
  return this.finishToken(u.num, c);
};
G.readCodePoint = function () {
  var e = this.input.charCodeAt(this.pos),
    t;
  if (e === 123) {
    this.options.ecmaVersion < 6 && this.unexpected();
    var a = ++this.pos;
    ((t = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos)),
      ++this.pos,
      t > 1114111 && this.invalidStringToken(a, "Code point out of bounds"));
  } else t = this.readHexChar(4);
  return t;
};
G.readString = function (e) {
  for (var t = "", a = ++this.pos; ; ) {
    this.pos >= this.input.length &&
      this.raise(this.start, "Unterminated string constant");
    var s = this.input.charCodeAt(this.pos);
    if (s === e) break;
    s === 92
      ? ((t += this.input.slice(a, this.pos)),
        (t += this.readEscapedChar(!1)),
        (a = this.pos))
      : s === 8232 || s === 8233
        ? (this.options.ecmaVersion < 10 &&
            this.raise(this.start, "Unterminated string constant"),
          ++this.pos,
          this.options.locations &&
            (this.curLine++, (this.lineStart = this.pos)))
        : (De(s) && this.raise(this.start, "Unterminated string constant"),
          ++this.pos);
  }
  return (
    (t += this.input.slice(a, this.pos++)),
    this.finishToken(u.string, t)
  );
};
var Ef = {};
G.tryReadTemplateToken = function () {
  this.inTemplateElement = !0;
  try {
    this.readTmplToken();
  } catch (e) {
    if (e === Ef) this.readInvalidTemplateToken();
    else throw e;
  }
  this.inTemplateElement = !1;
};
G.invalidStringToken = function (e, t) {
  if (this.inTemplateElement && this.options.ecmaVersion >= 9) throw Ef;
  this.raise(e, t);
};
G.readTmplToken = function () {
  for (var e = "", t = this.pos; ; ) {
    this.pos >= this.input.length &&
      this.raise(this.start, "Unterminated template");
    var a = this.input.charCodeAt(this.pos);
    if (a === 96 || (a === 36 && this.input.charCodeAt(this.pos + 1) === 123))
      return this.pos === this.start &&
        (this.type === u.template || this.type === u.invalidTemplate)
        ? a === 36
          ? ((this.pos += 2), this.finishToken(u.dollarBraceL))
          : (++this.pos, this.finishToken(u.backQuote))
        : ((e += this.input.slice(t, this.pos)),
          this.finishToken(u.template, e));
    if (a === 92)
      ((e += this.input.slice(t, this.pos)),
        (e += this.readEscapedChar(!0)),
        (t = this.pos));
    else if (De(a)) {
      switch (((e += this.input.slice(t, this.pos)), ++this.pos, a)) {
        case 13:
          this.input.charCodeAt(this.pos) === 10 && ++this.pos;
        case 10:
          e += `
`;
          break;
        default:
          e += String.fromCharCode(a);
          break;
      }
      (this.options.locations && (++this.curLine, (this.lineStart = this.pos)),
        (t = this.pos));
    } else ++this.pos;
  }
};
G.readInvalidTemplateToken = function () {
  for (; this.pos < this.input.length; this.pos++)
    switch (this.input[this.pos]) {
      case "\\":
        ++this.pos;
        break;
      case "$":
        if (this.input[this.pos + 1] !== "{") break;
      case "`":
        return this.finishToken(
          u.invalidTemplate,
          this.input.slice(this.start, this.pos),
        );
      case "\r":
        this.input[this.pos + 1] ===
          `
` && ++this.pos;
      case `
`:
      case "\u2028":
      case "\u2029":
        (++this.curLine, (this.lineStart = this.pos + 1));
        break;
    }
  this.raise(this.start, "Unterminated template");
};
G.readEscapedChar = function (e) {
  var t = this.input.charCodeAt(++this.pos);
  switch ((++this.pos, t)) {
    case 110:
      return `
`;
    case 114:
      return "\r";
    case 120:
      return String.fromCharCode(this.readHexChar(2));
    case 117:
      return we(this.readCodePoint());
    case 116:
      return "	";
    case 98:
      return "\b";
    case 118:
      return "\v";
    case 102:
      return "\f";
    case 13:
      this.input.charCodeAt(this.pos) === 10 && ++this.pos;
    case 10:
      return (
        this.options.locations && ((this.lineStart = this.pos), ++this.curLine),
        ""
      );
    case 56:
    case 57:
      if (
        (this.strict &&
          this.invalidStringToken(this.pos - 1, "Invalid escape sequence"),
        e)
      ) {
        var a = this.pos - 1;
        this.invalidStringToken(
          a,
          "Invalid escape sequence in template string",
        );
      }
    default:
      if (t >= 48 && t <= 55) {
        var s = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0],
          o = parseInt(s, 8);
        return (
          o > 255 && ((s = s.slice(0, -1)), (o = parseInt(s, 8))),
          (this.pos += s.length - 1),
          (t = this.input.charCodeAt(this.pos)),
          (s !== "0" || t === 56 || t === 57) &&
            (this.strict || e) &&
            this.invalidStringToken(
              this.pos - 1 - s.length,
              e
                ? "Octal literal in template string"
                : "Octal literal in strict mode",
            ),
          String.fromCharCode(o)
        );
      }
      return De(t)
        ? (this.options.locations &&
            ((this.lineStart = this.pos), ++this.curLine),
          "")
        : String.fromCharCode(t);
  }
};
G.readHexChar = function (e) {
  var t = this.pos,
    a = this.readInt(16, e);
  return (
    a === null && this.invalidStringToken(t, "Bad character escape sequence"),
    a
  );
};
G.readWord1 = function () {
  this.containsEsc = !1;
  for (
    var e = "", t = !0, a = this.pos, s = this.options.ecmaVersion >= 6;
    this.pos < this.input.length;
  ) {
    var o = this.fullCharCodeAtPos();
    if (Ae(o, s)) this.pos += o <= 65535 ? 1 : 2;
    else if (o === 92) {
      ((this.containsEsc = !0), (e += this.input.slice(a, this.pos)));
      var c = this.pos;
      (this.input.charCodeAt(++this.pos) !== 117 &&
        this.invalidStringToken(
          this.pos,
          "Expecting Unicode escape sequence \\uXXXX",
        ),
        ++this.pos);
      var n = this.readCodePoint();
      ((t ? Ce : Ae)(n, s) ||
        this.invalidStringToken(c, "Invalid Unicode escape"),
        (e += we(n)),
        (a = this.pos));
    } else break;
    t = !1;
  }
  return e + this.input.slice(a, this.pos);
};
G.readWord = function () {
  var e = this.readWord1(),
    t = u.name;
  return (this.keywords.test(e) && (t = pn[e]), this.finishToken(t, e));
};
var If = "8.15.0";
ee.acorn = {
  Parser: ee,
  version: If,
  defaultOptions: En,
  Position: He,
  SourceLocation: hn,
  getLineInfo: Ko,
  Node: mn,
  TokenType: U,
  tokTypes: u,
  keywordTypes: pn,
  TokContext: ue,
  tokContexts: J,
  isIdentifierChar: Ae,
  isIdentifierStart: Ce,
  Token: jn,
  isNewLine: De,
  lineBreak: ce,
  lineBreakG: Zh,
  nonASCIIwhitespace: zo,
};
function Wv(e, t) {
  return ee.parse(e, t);
}
function zv(e, t, a) {
  return ee.parseExpressionAt(e, t, a);
}
function Kv(e, t) {
  return ee.tokenizer(e, t);
}
const Xv = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      Node: mn,
      Parser: ee,
      Position: He,
      SourceLocation: hn,
      TokContext: ue,
      Token: jn,
      TokenType: U,
      defaultOptions: En,
      getLineInfo: Ko,
      isIdentifierChar: Ae,
      isIdentifierStart: Ce,
      isNewLine: De,
      keywordTypes: pn,
      lineBreak: ce,
      lineBreakG: Zh,
      nonASCIIwhitespace: zo,
      parse: Wv,
      parseExpressionAt: zv,
      tokContexts: J,
      tokTypes: u,
      tokenizer: Kv,
      version: If,
    },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var he = !0;
function fe(e, t = {}) {
  return new U("name", t);
}
var Yv = new WeakMap(),
  yl = Object.values(pn);
function Qv(e) {
  const t = e.Parser.acorn || e;
  let a = Yv.get(t);
  if (!a) {
    let s = function (L) {
        return (
          L === u.name ||
          L === u.string ||
          L === u.num ||
          yl.includes(L) ||
          f.includes(L)
        );
      },
      o = function (L) {
        return L === u.name || yl.includes(L) || f.includes(L);
      },
      c = function (L) {
        return L === u.name || f.includes(L);
      },
      n = function (L) {
        return (
          L === q.abstract ||
          L === q.declare ||
          L === q.enum ||
          L === q.module ||
          L === q.namespace ||
          L === q.interface ||
          L === q.type
        );
      },
      b = function (L) {
        return L === q.keyof || L === q.readonly || L === q.unique;
      },
      g = function (L) {
        return L === u.invalidTemplate;
      };
    const q = e1(),
      f = Object.values(q),
      T = Zv(),
      A = Jv(),
      k = new RegExp(`^(?:${Object.keys(q).join("|")})$`);
    ((T.jsxTagStart.updateContext = function () {
      (this.context.push(A.tc_expr),
        this.context.push(A.tc_oTag),
        (this.exprAllowed = !1));
    }),
      (T.jsxTagEnd.updateContext = function (L) {
        let I = this.context.pop();
        (I === A.tc_oTag && L === u.slash) || I === A.tc_cTag
          ? (this.context.pop(),
            (this.exprAllowed = this.curContext() === A.tc_expr))
          : (this.exprAllowed = !0);
      }),
      (a = {
        tokTypes: { ...q, ...T },
        tokContexts: { ...A },
        keywordsRegExp: k,
        tokenIsLiteralPropertyName: s,
        tokenIsKeywordOrIdentifier: o,
        tokenIsIdentifier: c,
        tokenIsTSDeclarationStart: n,
        tokenIsTSTypeOperator: b,
        tokenIsTemplate: g,
      }));
  }
  return a;
}
function Jv() {
  return {
    tc_oTag: new ue("<tag", !1, !1),
    tc_cTag: new ue("</tag", !1, !1),
    tc_expr: new ue("<tag>...</tag>", !0, !0),
  };
}
function Zv() {
  return {
    at: new U("@"),
    jsxName: new U("jsxName"),
    jsxText: new U("jsxText", { beforeExpr: !0 }),
    jsxTagStart: new U("jsxTagStart", { startsExpr: !0 }),
    jsxTagEnd: new U("jsxTagEnd"),
  };
}
function e1() {
  return {
    assert: fe("assert", { startsExpr: he }),
    asserts: fe("asserts", { startsExpr: he }),
    global: fe("global", { startsExpr: he }),
    keyof: fe("keyof", { startsExpr: he }),
    readonly: fe("readonly", { startsExpr: he }),
    unique: fe("unique", { startsExpr: he }),
    abstract: fe("abstract", { startsExpr: he }),
    declare: fe("declare", { startsExpr: he }),
    enum: fe("enum", { startsExpr: he }),
    module: fe("module", { startsExpr: he }),
    namespace: fe("namespace", { startsExpr: he }),
    interface: fe("interface", { startsExpr: he }),
    type: fe("type", { startsExpr: he }),
  };
}
var t1 = 512,
  Xe = 1024,
  r1 = /(?:[^\S\n\r\u2028\u2029]|\/\/.*|\/\*.*?\*\/)*/y,
  Rl = new RegExp(
    "(?=(" +
      r1.source +
      "))\\1" +
      /(?=[\n\r\u2028\u2029]|\/\*(?!.*?\*\/)|$)/.source,
    "y",
  ),
  Ye = class {
    constructor() {
      this.shorthandAssign =
        this.trailingComma =
        this.parenthesizedAssign =
        this.parenthesizedBind =
        this.doubleProto =
          -1;
    }
  };
function a1(e, t) {
  const a = t.key.name,
    s = e[a];
  let o = "true";
  return (
    t.type === "MethodDefinition" &&
      (t.kind === "get" || t.kind === "set") &&
      (o = (t.static ? "s" : "i") + t.kind),
    (s === "iget" && o === "iset") ||
    (s === "iset" && o === "iget") ||
    (s === "sget" && o === "sset") ||
    (s === "sset" && o === "sget")
      ? ((e[a] = "true"), !1)
      : s
        ? !0
        : ((e[a] = o), !1)
  );
}
function gl(e, t) {
  const { computed: a, key: s } = e;
  return (
    !a &&
    ((s.type === "Identifier" && s.name === t) ||
      (s.type === "Literal" && s.value === t))
  );
}
var j = {
    AbstractMethodHasImplementation: ({ methodName: e }) =>
      `Method '${e}' cannot have an implementation because it is marked abstract.`,
    AbstractPropertyHasInitializer: ({ propertyName: e }) =>
      `Property '${e}' cannot have an initializer because it is marked abstract.`,
    AccesorCannotDeclareThisParameter:
      "'get' and 'set' accessors cannot declare 'this' parameters.",
    AccesorCannotHaveTypeParameters: "An accessor cannot have type parameters.",
    CannotFindName: ({ name: e }) => `Cannot find name '${e}'.`,
    ClassMethodHasDeclare: "Class methods cannot have the 'declare' modifier.",
    ClassMethodHasReadonly:
      "Class methods cannot have the 'readonly' modifier.",
    ConstInitiailizerMustBeStringOrNumericLiteralOrLiteralEnumReference:
      "A 'const' initializer in an ambient context must be a string or numeric literal or literal enum reference.",
    ConstructorHasTypeParameters:
      "Type parameters cannot appear on a constructor declaration.",
    DeclareAccessor: ({ kind: e }) => `'declare' is not allowed in ${e}ters.`,
    DeclareClassFieldHasInitializer:
      "Initializers are not allowed in ambient contexts.",
    DeclareFunctionHasImplementation:
      "An implementation cannot be declared in ambient contexts.",
    DuplicateAccessibilityModifier: () =>
      "Accessibility modifier already seen.",
    DuplicateModifier: ({ modifier: e }) => `Duplicate modifier: '${e}'.`,
    EmptyHeritageClauseType: ({ token: e }) => `'${e}' list cannot be empty.`,
    EmptyTypeArguments: "Type argument list cannot be empty.",
    EmptyTypeParameters: "Type parameter list cannot be empty.",
    ExpectedAmbientAfterExportDeclare:
      "'export declare' must be followed by an ambient declaration.",
    ImportAliasHasImportType: "An import alias can not use 'import type'.",
    IncompatibleModifiers: ({ modifiers: e }) =>
      `'${e[0]}' modifier cannot be used with '${e[1]}' modifier.`,
    IndexSignatureHasAbstract:
      "Index signatures cannot have the 'abstract' modifier.",
    IndexSignatureHasAccessibility: ({ modifier: e }) =>
      `Index signatures cannot have an accessibility modifier ('${e}').`,
    IndexSignatureHasDeclare:
      "Index signatures cannot have the 'declare' modifier.",
    IndexSignatureHasOverride:
      "'override' modifier cannot appear on an index signature.",
    IndexSignatureHasStatic:
      "Index signatures cannot have the 'static' modifier.",
    InitializerNotAllowedInAmbientContext:
      "Initializers are not allowed in ambient contexts.",
    InvalidModifierOnTypeMember: ({ modifier: e }) =>
      `'${e}' modifier cannot appear on a type member.`,
    InvalidModifierOnTypeParameter: ({ modifier: e }) =>
      `'${e}' modifier cannot appear on a type parameter.`,
    InvalidModifierOnTypeParameterPositions: ({ modifier: e }) =>
      `'${e}' modifier can only appear on a type parameter of a class, interface or type alias.`,
    InvalidModifiersOrder: ({ orderedModifiers: e }) =>
      `'${e[0]}' modifier must precede '${e[1]}' modifier.`,
    InvalidPropertyAccessAfterInstantiationExpression:
      "Invalid property access after an instantiation expression. You can either wrap the instantiation expression in parentheses, or delete the type arguments.",
    InvalidTupleMemberLabel:
      "Tuple members must be labeled with a simple identifier.",
    MissingInterfaceName:
      "'interface' declarations must be followed by an identifier.",
    NonAbstractClassHasAbstractMethod:
      "Abstract methods can only appear within an abstract class.",
    NonClassMethodPropertyHasAbstractModifer:
      "'abstract' modifier can only appear on a class, method, or property declaration.",
    OptionalTypeBeforeRequired:
      "A required element cannot follow an optional element.",
    OverrideNotInSubClass:
      "This member cannot have an 'override' modifier because its containing class does not extend another class.",
    PatternIsOptional:
      "A binding pattern parameter cannot be optional in an implementation signature.",
    PrivateElementHasAbstract:
      "Private elements cannot have the 'abstract' modifier.",
    PrivateElementHasAccessibility: ({ modifier: e }) =>
      `Private elements cannot have an accessibility modifier ('${e}').`,
    PrivateMethodsHasAccessibility: ({ modifier: e }) =>
      `Private methods cannot have an accessibility modifier ('${e}').`,
    ReadonlyForMethodSignature:
      "'readonly' modifier can only appear on a property declaration or index signature.",
    ReservedArrowTypeParam:
      "This syntax is reserved in files with the .mts or .cts extension. Add a trailing comma, as in `<T,>() => ...`.",
    ReservedTypeAssertion:
      "This syntax is reserved in files with the .mts or .cts extension. Use an `as` expression instead.",
    SetAccesorCannotHaveOptionalParameter:
      "A 'set' accessor cannot have an optional parameter.",
    SetAccesorCannotHaveRestParameter:
      "A 'set' accessor cannot have rest parameter.",
    SetAccesorCannotHaveReturnType:
      "A 'set' accessor cannot have a return type annotation.",
    SingleTypeParameterWithoutTrailingComma: ({ typeParameterName: e }) =>
      `Single type parameter ${e} should have a trailing comma. Example usage: <${e},>.`,
    StaticBlockCannotHaveModifier:
      "Static class blocks cannot have any modifier.",
    TypeAnnotationAfterAssign:
      "Type annotations must come before default assignments, e.g. instead of `age = 25: number` use `age: number = 25`.",
    TypeImportCannotSpecifyDefaultAndNamed:
      "A type-only import can specify a default import or named bindings, but not both.",
    TypeModifierIsUsedInTypeExports:
      "The 'type' modifier cannot be used on a named export when 'export type' is used on its export statement.",
    TypeModifierIsUsedInTypeImports:
      "The 'type' modifier cannot be used on a named import when 'import type' is used on its import statement.",
    UnexpectedParameterModifier:
      "A parameter property is only allowed in a constructor implementation.",
    UnexpectedReadonly:
      "'readonly' type modifier is only permitted on array and tuple literal types.",
    GenericsEndWithComma:
      "Trailing comma is not allowed at the end of generics.",
    UnexpectedTypeAnnotation: "Did not expect a type annotation here.",
    UnexpectedTypeCastInParameter:
      "Unexpected type cast in parameter position.",
    UnsupportedImportTypeArgument:
      "Argument in a type import must be a string literal.",
    UnsupportedParameterPropertyKind:
      "A parameter property may not be declared using a binding pattern.",
    UnsupportedSignatureParameterKind: ({ type: e }) =>
      `Name in a signature must be an Identifier, ObjectPattern or ArrayPattern, instead got ${e}.`,
    LetInLexicalBinding:
      "'let' is not allowed to be used as a name in 'let' or 'const' declarations.",
  },
  Sn = {
    UnexpectedLeadingDecorator:
      "Leading decorators must be attached to a class declaration.",
    DecoratorConstructor:
      "Decorators can't be used with a constructor. Did you mean '@dec class { ... }'?",
    TrailingDecorator: "Decorators must be attached to a class element.",
    SpreadElementDecorator: "Decorators can't be used with SpreadElement",
  };
function i1(e, t, a) {
  const { tokTypes: s } = a,
    { tokTypes: o } = t;
  return class extends e {
    takeDecorators(n) {
      const b = this.decoratorStack[this.decoratorStack.length - 1];
      b.length &&
        ((n.decorators = b),
        this.resetStartLocationFromNode(n, b[0]),
        (this.decoratorStack[this.decoratorStack.length - 1] = []));
    }
    parseDecorators(n) {
      const b = this.decoratorStack[this.decoratorStack.length - 1];
      for (; this.match(o.at); ) {
        const g = this.parseDecorator();
        b.push(g);
      }
      this.match(s._export)
        ? n || this.unexpected()
        : this.canHaveLeadingDecorator() ||
          this.raise(this.start, Sn.UnexpectedLeadingDecorator);
    }
    parseDecorator() {
      const n = this.startNode();
      (this.next(), this.decoratorStack.push([]));
      const b = this.start,
        g = this.startLoc;
      let q;
      if (this.match(s.parenL)) {
        const f = this.start,
          T = this.startLoc;
        if (
          (this.next(),
          (q = this.parseExpression()),
          this.expect(s.parenR),
          this.options.preserveParens)
        ) {
          let A = this.startNodeAt(f, T);
          ((A.expression = q),
            (q = this.finishNode(A, "ParenthesizedExpression")));
        }
      } else
        for (q = this.parseIdent(!1); this.eat(s.dot); ) {
          const f = this.startNodeAt(b, g);
          ((f.object = q),
            (f.property = this.parseIdent(!0)),
            (f.computed = !1),
            (q = this.finishNode(f, "MemberExpression")));
        }
      return (
        (n.expression = this.parseMaybeDecoratorArguments(q)),
        this.decoratorStack.pop(),
        this.finishNode(n, "Decorator")
      );
    }
    parseMaybeDecoratorArguments(n) {
      if (this.eat(s.parenL)) {
        const b = this.startNodeAtNode(n);
        return (
          (b.callee = n),
          (b.arguments = this.parseExprList(s.parenR, !1)),
          this.finishNode(b, "CallExpression")
        );
      }
      return n;
    }
  };
}
function s1(e, t, a) {
  const { tokTypes: s } = t,
    { tokTypes: o } = a;
  return class extends e {
    parseMaybeImportAttributes(n) {
      if (this.type === o._with || this.type === s.assert) {
        this.next();
        const b = this.parseImportAttributes();
        b && (n.attributes = b);
      }
    }
    parseImportAttributes() {
      this.expect(o.braceL);
      const n = this.parseWithEntries();
      return (this.expect(o.braceR), n);
    }
    parseWithEntries() {
      const n = [],
        b = new Set();
      do {
        if (this.type === o.braceR) break;
        const g = this.startNode();
        let q;
        (this.type === o.string
          ? (q = this.parseLiteral(this.value))
          : (q = this.parseIdent(!0)),
          this.next(),
          (g.key = q),
          b.has(g.key.name) &&
            this.raise(this.pos, "Duplicated key in attributes"),
          b.add(g.key.name),
          this.type !== o.string &&
            this.raise(
              this.pos,
              "Only string is supported as an attribute value",
            ),
          (g.value = this.parseLiteral(this.value)),
          n.push(this.finishNode(g, "ImportAttribute")));
      } while (this.eat(o.comma));
      return n;
    }
  };
}
var jo = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;
function xl(e) {
  if (!e) throw new Error("Assert fail");
}
function n1(e) {
  return e === "accessor";
}
function o1(e) {
  return e === "in" || e === "out";
}
var qn = 1,
  Cl = 2,
  l1 = 4,
  Y = {
    SCOPE_TOP: 1,
    SCOPE_FUNCTION: 2,
    SCOPE_ASYNC: 4,
    SCOPE_GENERATOR: 8,
    SCOPE_ARROW: 16,
    SCOPE_SIMPLE_CATCH: 32,
    SCOPE_SUPER: 64,
    SCOPE_DIRECT_SUPER: 128,
    BIND_NONE: 0,
    BIND_VAR: 1,
    BIND_LEXICAL: 2,
    BIND_FUNCTION: 3,
    BIND_SIMPLE_CATCH: 4,
    BIND_TS_TYPE: 6,
    BIND_TS_INTERFACE: 7,
    BIND_TS_NAMESPACE: 8,
    BIND_FLAGS_TS_EXPORT_ONLY: 1024,
    BIND_FLAGS_TS_IMPORT: 4096,
    BIND_FLAGS_TS_ENUM: 256,
    BIND_FLAGS_TS_CONST_ENUM: 512,
    BIND_FLAGS_CLASS: 128,
  };
function Vo(e, t) {
  return (
    Y.SCOPE_FUNCTION | (e ? Y.SCOPE_ASYNC : 0) | (t ? Y.SCOPE_GENERATOR : 0)
  );
}
function u1(e) {
  if (e.type !== "MemberExpression") return !1;
  const { computed: t, property: a } = e;
  return t && (a.type !== "TemplateLiteral" || a.expressions.length > 0)
    ? !1
    : Mf(e.object);
}
function Mf(e) {
  return e.type === "Identifier"
    ? !0
    : e.type !== "MemberExpression" || e.computed
      ? !1
      : Mf(e.object);
}
function _l(e) {
  return e === "private" || e === "public" || e === "protected";
}
function c1(e) {
  return !!e.startsExpr;
}
function d1(e) {
  if (e == null) throw new Error(`Unexpected ${e} value.`);
  return e;
}
function p1(e) {
  switch (e) {
    case "any":
      return "TSAnyKeyword";
    case "boolean":
      return "TSBooleanKeyword";
    case "bigint":
      return "TSBigIntKeyword";
    case "never":
      return "TSNeverKeyword";
    case "number":
      return "TSNumberKeyword";
    case "object":
      return "TSObjectKeyword";
    case "string":
      return "TSStringKeyword";
    case "symbol":
      return "TSSymbolKeyword";
    case "undefined":
      return "TSUndefinedKeyword";
    case "unknown":
      return "TSUnknownKeyword";
    default:
      return;
  }
}
function h1(e) {
  const { dts: t = !1 } = {},
    a = !1;
  return function (s) {
    const o = s.acorn || Xv,
      c = Qv(o),
      n = o.tokTypes,
      b = o.keywordTypes,
      g = o.isIdentifierStart,
      q = o.lineBreak,
      f = o.isNewLine,
      T = o.tokContexts,
      A = o.isIdentifierChar,
      {
        tokTypes: k,
        tokContexts: L,
        keywordsRegExp: I,
        tokenIsLiteralPropertyName: y,
        tokenIsTemplate: h,
        tokenIsTSDeclarationStart: p,
        tokenIsIdentifier: m,
        tokenIsKeywordOrIdentifier: x,
        tokenIsTSTypeOperator: R,
      } = c;
    function _(M, r, i = M.length) {
      for (let l = r; l < i; l++) {
        let d = M.charCodeAt(l);
        if (f(d))
          return l < i - 1 && d === 13 && M.charCodeAt(l + 1) === 10
            ? l + 2
            : l + 1;
      }
      return -1;
    }
    ((s = i1(s, c, o)), (s = s1(s, c, o)));
    class C extends s {
      constructor(r, i, l) {
        (super(r, i, l),
          (this.preValue = null),
          (this.preToken = null),
          (this.isLookahead = !1),
          (this.isAmbientContext = !1),
          (this.inAbstractClass = !1),
          (this.inType = !1),
          (this.inDisallowConditionalTypesContext = !1),
          (this.maybeInArrowParameters = !1),
          (this.shouldParseArrowReturnType = void 0),
          (this.shouldParseAsyncArrowReturnType = void 0),
          (this.decoratorStack = [[]]),
          (this.importsStack = [[]]),
          (this.importOrExportOuterKind = void 0),
          (this.tsParseConstModifier = (d) => {
            this.tsParseModifiers({
              modified: d,
              allowedModifiers: ["const"],
              disallowedModifiers: ["in", "out"],
              errorTemplate: j.InvalidModifierOnTypeParameterPositions,
            });
          }),
          (this.ecmaVersion = this.options.ecmaVersion));
      }
      static get acornTypeScript() {
        return c;
      }
      get acornTypeScript() {
        return c;
      }
      getTokenFromCodeInType(r) {
        return r === 62
          ? this.finishOp(n.relational, 1)
          : r === 60
            ? this.finishOp(n.relational, 1)
            : super.getTokenFromCode(r);
      }
      readToken(r) {
        if (!this.inType) {
          let i = this.curContext();
          if (i === L.tc_expr) return this.jsx_readToken();
          if (i === L.tc_oTag || i === L.tc_cTag) {
            if (g(r)) return this.jsx_readWord();
            if (r == 62) return (++this.pos, this.finishToken(k.jsxTagEnd));
            if ((r === 34 || r === 39) && i == L.tc_oTag)
              return this.jsx_readString(r);
          }
          if (
            r === 60 &&
            this.exprAllowed &&
            this.input.charCodeAt(this.pos + 1) !== 33
          )
            return (++this.pos, this.finishToken(n.relational, "<"));
        }
        return super.readToken(r);
      }
      getTokenFromCode(r) {
        return this.inType
          ? this.getTokenFromCodeInType(r)
          : r === 64
            ? (++this.pos, this.finishToken(k.at))
            : super.getTokenFromCode(r);
      }
      isAbstractClass() {
        return (
          this.ts_isContextual(k.abstract) && this.lookahead().type === n._class
        );
      }
      finishNode(r, i) {
        return r.type !== "" && r.end !== 0 ? r : super.finishNode(r, i);
      }
      tryParse(r, i = this.cloneCurLookaheadState()) {
        const l = { node: null };
        try {
          return {
            node: r((v = null) => {
              throw ((l.node = v), l);
            }),
            error: null,
            thrown: !1,
            aborted: !1,
            failState: null,
          };
        } catch (d) {
          const v = this.getCurLookaheadState();
          if ((this.setLookaheadState(i), d instanceof SyntaxError))
            return {
              node: null,
              error: d,
              thrown: !0,
              aborted: !1,
              failState: v,
            };
          if (d === l)
            return {
              node: l.node,
              error: null,
              thrown: !1,
              aborted: !0,
              failState: v,
            };
          throw d;
        }
      }
      setOptionalParametersError(r, i) {
        r.optionalParametersLoc = (i == null ? void 0 : i.loc) ?? this.startLoc;
      }
      reScan_lt_gt() {
        this.type === n.relational &&
          ((this.pos -= 1), this.readToken_lt_gt(this.fullCharCodeAtPos()));
      }
      reScan_lt() {
        const { type: r } = this;
        return r === n.bitShift
          ? ((this.pos -= 2), this.finishOp(n.relational, 1), n.relational)
          : r;
      }
      resetEndLocation(r, i = this.lastTokEnd, l = this.lastTokEndLoc) {
        ((r.end = i), (r.loc.end = l), this.options.ranges && (r.range[1] = i));
      }
      startNodeAtNode(r) {
        return super.startNodeAt(r.start, r.loc.start);
      }
      nextTokenStart() {
        return this.nextTokenStartSince(this.pos);
      }
      tsHasSomeModifiers(r, i) {
        return i.some((l) => (_l(l) ? r.accessibility === l : !!r[l]));
      }
      tsIsStartOfStaticBlocks() {
        return this.isContextual("static") && this.lookaheadCharCode() === 123;
      }
      tsCheckForInvalidTypeCasts(r) {
        r.forEach((i) => {
          (i == null ? void 0 : i.type) === "TSTypeCastExpression" &&
            this.raise(i.typeAnnotation.start, j.UnexpectedTypeAnnotation);
        });
      }
      atPossibleAsyncArrow(r) {
        return (
          r.type === "Identifier" &&
          r.name === "async" &&
          this.lastTokEnd === r.end &&
          !this.canInsertSemicolon() &&
          r.end - r.start === 5 &&
          r.start === this.potentialArrowAt
        );
      }
      tsIsIdentifier() {
        return m(this.type);
      }
      tsTryParseTypeOrTypePredicateAnnotation() {
        return this.match(n.colon)
          ? this.tsParseTypeOrTypePredicateAnnotation(n.colon)
          : void 0;
      }
      tsTryParseGenericAsyncArrowFunction(r, i, l) {
        if (!this.tsMatchLeftRelational()) return;
        const d = this.maybeInArrowParameters;
        this.maybeInArrowParameters = !0;
        const v = this.tsTryParseAndCatch(() => {
          const P = this.startNodeAt(r, i);
          return (
            (P.typeParameters = this.tsParseTypeParameters(
              this.tsParseConstModifier,
            )),
            super.parseFunctionParams(P),
            (P.returnType = this.tsTryParseTypeOrTypePredicateAnnotation()),
            this.expect(n.arrow),
            P
          );
        });
        if (((this.maybeInArrowParameters = d), !!v))
          return super.parseArrowExpression(v, null, !0, l);
      }
      tsParseTypeArgumentsInExpression() {
        if (this.reScan_lt() === n.relational)
          return this.tsParseTypeArguments();
      }
      tsInNoContext(r) {
        const i = this.context;
        this.context = [i[0]];
        try {
          return r();
        } finally {
          this.context = i;
        }
      }
      tsTryParseTypeAnnotation() {
        return this.match(n.colon) ? this.tsParseTypeAnnotation() : void 0;
      }
      isUnparsedContextual(r, i) {
        const l = r + i.length;
        if (this.input.slice(r, l) === i) {
          const d = this.input.charCodeAt(l);
          return !(A(d) || (d & 64512) === 55296);
        }
        return !1;
      }
      isAbstractConstructorSignature() {
        return (
          this.ts_isContextual(k.abstract) && this.lookahead().type === n._new
        );
      }
      nextTokenStartSince(r) {
        return ((jo.lastIndex = r), jo.test(this.input) ? jo.lastIndex : r);
      }
      lookaheadCharCode() {
        return this.input.charCodeAt(this.nextTokenStart());
      }
      compareLookaheadState(r, i) {
        for (const l of Object.keys(r)) if (r[l] !== i[l]) return !1;
        return !0;
      }
      createLookaheadState() {
        ((this.value = null), (this.context = [this.curContext()]));
      }
      getCurLookaheadState() {
        return {
          endLoc: this.endLoc,
          lastTokEnd: this.lastTokEnd,
          lastTokStart: this.lastTokStart,
          lastTokStartLoc: this.lastTokStartLoc,
          pos: this.pos,
          value: this.value,
          type: this.type,
          start: this.start,
          end: this.end,
          context: this.context,
          startLoc: this.startLoc,
          lastTokEndLoc: this.lastTokEndLoc,
          curLine: this.curLine,
          lineStart: this.lineStart,
          curPosition: this.curPosition,
          containsEsc: this.containsEsc,
        };
      }
      cloneCurLookaheadState() {
        return {
          pos: this.pos,
          value: this.value,
          type: this.type,
          start: this.start,
          end: this.end,
          context: this.context && this.context.slice(),
          startLoc: this.startLoc,
          lastTokEndLoc: this.lastTokEndLoc,
          endLoc: this.endLoc,
          lastTokEnd: this.lastTokEnd,
          lastTokStart: this.lastTokStart,
          lastTokStartLoc: this.lastTokStartLoc,
          curLine: this.curLine,
          lineStart: this.lineStart,
          curPosition: this.curPosition,
          containsEsc: this.containsEsc,
        };
      }
      setLookaheadState(r) {
        ((this.pos = r.pos),
          (this.value = r.value),
          (this.endLoc = r.endLoc),
          (this.lastTokEnd = r.lastTokEnd),
          (this.lastTokStart = r.lastTokStart),
          (this.lastTokStartLoc = r.lastTokStartLoc),
          (this.type = r.type),
          (this.start = r.start),
          (this.end = r.end),
          (this.context = r.context),
          (this.startLoc = r.startLoc),
          (this.lastTokEndLoc = r.lastTokEndLoc),
          (this.curLine = r.curLine),
          (this.lineStart = r.lineStart),
          (this.curPosition = r.curPosition),
          (this.containsEsc = r.containsEsc));
      }
      tsLookAhead(r) {
        const i = this.getCurLookaheadState(),
          l = r();
        return (this.setLookaheadState(i), l);
      }
      lookahead(r) {
        const i = this.getCurLookaheadState();
        if (
          (this.createLookaheadState(), (this.isLookahead = !0), r !== void 0)
        )
          for (let d = 0; d < r; d++) this.nextToken();
        else this.nextToken();
        this.isLookahead = !1;
        const l = this.getCurLookaheadState();
        return (this.setLookaheadState(i), l);
      }
      readWord() {
        let r = this.readWord1(),
          i = n.name;
        return (
          this.keywords.test(r)
            ? (i = b[r])
            : new RegExp(I).test(r) && (i = k[r]),
          this.finishToken(i, r)
        );
      }
      skipBlockComment() {
        let r;
        this.isLookahead || (r = this.options.onComment && this.curPosition());
        let i = this.pos,
          l = this.input.indexOf("*/", (this.pos += 2));
        if (
          (l === -1 && this.raise(this.pos - 2, "Unterminated comment"),
          (this.pos = l + 2),
          this.options.locations)
        )
          for (let d, v = i; (d = _(this.input, v, this.pos)) > -1; )
            (++this.curLine, (v = this.lineStart = d));
        this.isLookahead ||
          (this.options.onComment &&
            this.options.onComment(
              !0,
              this.input.slice(i + 2, l),
              i,
              this.pos,
              r,
              this.curPosition(),
            ));
      }
      skipLineComment(r) {
        let i = this.pos,
          l;
        this.isLookahead || (l = this.options.onComment && this.curPosition());
        let d = this.input.charCodeAt((this.pos += r));
        for (; this.pos < this.input.length && !f(d); )
          d = this.input.charCodeAt(++this.pos);
        this.isLookahead ||
          (this.options.onComment &&
            this.options.onComment(
              !1,
              this.input.slice(i + r, this.pos),
              i,
              this.pos,
              l,
              this.curPosition(),
            ));
      }
      finishToken(r, i) {
        ((this.preValue = this.value),
          (this.preToken = this.type),
          (this.end = this.pos),
          this.options.locations && (this.endLoc = this.curPosition()));
        let l = this.type;
        ((this.type = r),
          (this.value = i),
          this.isLookahead || this.updateContext(l));
      }
      resetStartLocation(r, i, l) {
        ((r.start = i),
          (r.loc.start = l),
          this.options.ranges && (r.range[0] = i));
      }
      isLineTerminator() {
        return this.eat(n.semi) || super.canInsertSemicolon();
      }
      hasFollowingLineBreak() {
        return ((Rl.lastIndex = this.end), Rl.test(this.input));
      }
      addExtra(r, i, l, d = !0) {
        if (!r) return;
        const v = (r.extra = r.extra || {});
        d
          ? (v[i] = l)
          : Object.defineProperty(v, i, { enumerable: d, value: l });
      }
      isLiteralPropertyName() {
        return y(this.type);
      }
      hasPrecedingLineBreak() {
        return q.test(this.input.slice(this.lastTokEnd, this.start));
      }
      createIdentifier(r, i) {
        return ((r.name = i), this.finishNode(r, "Identifier"));
      }
      resetStartLocationFromNode(r, i) {
        this.resetStartLocation(r, i.start, i.loc.start);
      }
      isThisParam(r) {
        return r.type === "Identifier" && r.name === "this";
      }
      isLookaheadContextual(r) {
        const i = this.nextTokenStart();
        return this.isUnparsedContextual(i, r);
      }
      ts_type_isContextual(r, i) {
        return r === i && !this.containsEsc;
      }
      ts_isContextual(r) {
        return this.type === r && !this.containsEsc;
      }
      ts_isContextualWithState(r, i) {
        return r.type === i && !r.containsEsc;
      }
      isContextualWithState(r, i) {
        return i.type === n.name && i.value === r && !i.containsEsc;
      }
      tsIsStartOfMappedType() {
        return (
          this.next(),
          this.eat(n.plusMin)
            ? this.ts_isContextual(k.readonly)
            : (this.ts_isContextual(k.readonly) && this.next(),
              !this.match(n.bracketL) || (this.next(), !this.tsIsIdentifier())
                ? !1
                : (this.next(), this.match(n._in)))
        );
      }
      tsInDisallowConditionalTypesContext(r) {
        const i = this.inDisallowConditionalTypesContext;
        this.inDisallowConditionalTypesContext = !0;
        try {
          return r();
        } finally {
          this.inDisallowConditionalTypesContext = i;
        }
      }
      tsTryParseType() {
        return this.tsEatThenParseType(n.colon);
      }
      match(r) {
        return this.type === r;
      }
      matchJsx(r) {
        return this.type === c.tokTypes[r];
      }
      ts_eatWithState(r, i, l) {
        const d = l.type;
        if (r === d) {
          for (let v = 0; v < i; v++) this.next();
          return !0;
        } else return !1;
      }
      ts_eatContextualWithState(r, i, l) {
        if (I.test(r)) {
          if (this.ts_isContextualWithState(l, k[r])) {
            for (let d = 0; d < i; d++) this.next();
            return !0;
          }
          return !1;
        } else {
          if (!this.isContextualWithState(r, l)) return !1;
          for (let d = 0; d < i; d++) this.next();
          return !0;
        }
      }
      canHaveLeadingDecorator() {
        return this.match(n._class);
      }
      eatContextual(r) {
        return I.test(r)
          ? this.ts_isContextual(k[r])
            ? (this.next(), !0)
            : !1
          : super.eatContextual(r);
      }
      tsIsExternalModuleReference() {
        return this.isContextual("require") && this.lookaheadCharCode() === 40;
      }
      tsParseExternalModuleReference() {
        const r = this.startNode();
        return (
          this.expectContextual("require"),
          this.expect(n.parenL),
          this.match(n.string) || this.unexpected(),
          (r.expression = this.parseExprAtom()),
          this.expect(n.parenR),
          this.finishNode(r, "TSExternalModuleReference")
        );
      }
      tsParseEntityName(r = !0) {
        let i = this.parseIdent(r);
        for (; this.eat(n.dot); ) {
          const l = this.startNodeAtNode(i);
          ((l.left = i),
            (l.right = this.parseIdent(r)),
            (i = this.finishNode(l, "TSQualifiedName")));
        }
        return i;
      }
      tsParseEnumMember() {
        const r = this.startNode();
        return (
          (r.id = this.match(n.string)
            ? this.parseLiteral(this.value)
            : this.parseIdent(!0)),
          this.eat(n.eq) && (r.initializer = this.parseMaybeAssign()),
          this.finishNode(r, "TSEnumMember")
        );
      }
      tsParseEnumDeclaration(r, i = {}) {
        return (
          i.const && (r.const = !0),
          i.declare && (r.declare = !0),
          this.expectContextual("enum"),
          (r.id = this.parseIdent()),
          this.checkLValSimple(r.id),
          this.expect(n.braceL),
          (r.members = this.tsParseDelimitedList(
            "EnumMembers",
            this.tsParseEnumMember.bind(this),
          )),
          this.expect(n.braceR),
          this.finishNode(r, "TSEnumDeclaration")
        );
      }
      tsParseModuleBlock() {
        const r = this.startNode();
        for (
          this.enterScope(t1), this.expect(n.braceL), r.body = [];
          this.type !== n.braceR;
        ) {
          let i = this.parseStatement(null, !0);
          r.body.push(i);
        }
        return (
          this.next(),
          super.exitScope(),
          this.finishNode(r, "TSModuleBlock")
        );
      }
      tsParseAmbientExternalModuleDeclaration(r) {
        return (
          this.ts_isContextual(k.global)
            ? ((r.global = !0), (r.id = this.parseIdent()))
            : this.match(n.string)
              ? (r.id = this.parseLiteral(this.value))
              : this.unexpected(),
          this.match(n.braceL)
            ? (this.enterScope(Xe),
              (r.body = this.tsParseModuleBlock()),
              super.exitScope())
            : super.semicolon(),
          this.finishNode(r, "TSModuleDeclaration")
        );
      }
      tsTryParseDeclare(r) {
        if (this.isLineTerminator()) return;
        let i = this.type,
          l;
        return (
          this.isContextual("let") && ((i = n._var), (l = "let")),
          this.tsInAmbientContext(() => {
            if (i === n._function)
              return ((r.declare = !0), this.parseFunctionStatement(r, !1, !0));
            if (i === n._class)
              return ((r.declare = !0), this.parseClass(r, !0));
            if (i === k.enum)
              return this.tsParseEnumDeclaration(r, { declare: !0 });
            if (i === k.global)
              return this.tsParseAmbientExternalModuleDeclaration(r);
            if (i === n._const || i === n._var)
              return !this.match(n._const) ||
                !this.isLookaheadContextual("enum")
                ? ((r.declare = !0),
                  this.parseVarStatement(r, l || this.value, !0))
                : (this.expect(n._const),
                  this.tsParseEnumDeclaration(r, { const: !0, declare: !0 }));
            if (i === k.interface) {
              const d = this.tsParseInterfaceDeclaration(r, { declare: !0 });
              if (d) return d;
            }
            if (m(i)) return this.tsParseDeclaration(r, this.value, !0);
          })
        );
      }
      tsIsListTerminator(r) {
        switch (r) {
          case "EnumMembers":
          case "TypeMembers":
            return this.match(n.braceR);
          case "HeritageClauseElement":
            return this.match(n.braceL);
          case "TupleElementTypes":
            return this.match(n.bracketR);
          case "TypeParametersOrArguments":
            return this.tsMatchRightRelational();
        }
      }
      tsParseDelimitedListWorker(r, i, l, d) {
        const v = [];
        let P = -1;
        for (; !this.tsIsListTerminator(r); ) {
          P = -1;
          const w = i();
          if (w == null) return;
          if ((v.push(w), this.eat(n.comma))) {
            P = this.lastTokStart;
            continue;
          }
          if (this.tsIsListTerminator(r)) break;
          l && this.expect(n.comma);
          return;
        }
        return (d && (d.value = P), v);
      }
      tsParseDelimitedList(r, i, l) {
        return d1(this.tsParseDelimitedListWorker(r, i, !0, l));
      }
      tsParseBracketedList(r, i, l, d, v) {
        d || (l ? this.expect(n.bracketL) : this.expect(n.relational));
        const P = this.tsParseDelimitedList(r, i, v);
        return (l ? this.expect(n.bracketR) : this.expect(n.relational), P);
      }
      tsParseTypeParameterName() {
        return this.parseIdent().name;
      }
      tsEatThenParseType(r) {
        return this.match(r) ? this.tsNextThenParseType() : void 0;
      }
      tsExpectThenParseType(r) {
        return this.tsDoThenParseType(() => this.expect(r));
      }
      tsNextThenParseType() {
        return this.tsDoThenParseType(() => this.next());
      }
      tsDoThenParseType(r) {
        return this.tsInType(() => (r(), this.tsParseType()));
      }
      tsSkipParameterStart() {
        if (m(this.type) || this.match(n._this)) return (this.next(), !0);
        if (this.match(n.braceL))
          try {
            return (this.parseObj(!0), !0);
          } catch {
            return !1;
          }
        if (this.match(n.bracketL)) {
          this.next();
          try {
            return (this.parseBindingList(n.bracketR, !0, !0), !0);
          } catch {
            return !1;
          }
        }
        return !1;
      }
      tsIsUnambiguouslyStartOfFunctionType() {
        return (
          this.next(),
          !!(
            this.match(n.parenR) ||
            this.match(n.ellipsis) ||
            (this.tsSkipParameterStart() &&
              (this.match(n.colon) ||
                this.match(n.comma) ||
                this.match(n.question) ||
                this.match(n.eq) ||
                (this.match(n.parenR) && (this.next(), this.match(n.arrow)))))
          )
        );
      }
      tsIsStartOfFunctionType() {
        return this.tsMatchLeftRelational()
          ? !0
          : this.match(n.parenL) &&
              this.tsLookAhead(
                this.tsIsUnambiguouslyStartOfFunctionType.bind(this),
              );
      }
      tsInAllowConditionalTypesContext(r) {
        const i = this.inDisallowConditionalTypesContext;
        this.inDisallowConditionalTypesContext = !1;
        try {
          return r();
        } finally {
          this.inDisallowConditionalTypesContext = i;
        }
      }
      tsParseBindingListForSignature() {
        return super
          .parseBindingList(n.parenR, !0, !0)
          .map(
            (r) => (
              r.type !== "Identifier" &&
                r.type !== "RestElement" &&
                r.type !== "ObjectPattern" &&
                r.type !== "ArrayPattern" &&
                this.raise(
                  r.start,
                  j.UnsupportedSignatureParameterKind({ type: r.type }),
                ),
              r
            ),
          );
      }
      tsParseTypePredicateAsserts() {
        if (this.type !== k.asserts) return !1;
        const r = this.containsEsc;
        return (
          this.next(),
          !m(this.type) && !this.match(n._this)
            ? !1
            : (r &&
                this.raise(
                  this.lastTokStart,
                  "Escape sequence in keyword asserts",
                ),
              !0)
        );
      }
      tsParseThisTypeNode() {
        const r = this.startNode();
        return (this.next(), this.finishNode(r, "TSThisType"));
      }
      tsParseTypeAnnotation(r = !0, i = this.startNode()) {
        return (
          this.tsInType(() => {
            (r && this.expect(n.colon),
              (i.typeAnnotation = this.tsParseType()));
          }),
          this.finishNode(i, "TSTypeAnnotation")
        );
      }
      tsParseThisTypePredicate(r) {
        this.next();
        const i = this.startNodeAtNode(r);
        return (
          (i.parameterName = r),
          (i.typeAnnotation = this.tsParseTypeAnnotation(!1)),
          (i.asserts = !1),
          this.finishNode(i, "TSTypePredicate")
        );
      }
      tsParseThisTypeOrThisTypePredicate() {
        const r = this.tsParseThisTypeNode();
        return this.isContextual("is") && !this.hasPrecedingLineBreak()
          ? this.tsParseThisTypePredicate(r)
          : r;
      }
      tsParseTypePredicatePrefix() {
        const r = this.parseIdent();
        if (this.isContextual("is") && !this.hasPrecedingLineBreak())
          return (this.next(), r);
      }
      tsParseTypeOrTypePredicateAnnotation(r) {
        return this.tsInType(() => {
          const i = this.startNode();
          this.expect(r);
          const l = this.startNode(),
            d = !!this.tsTryParse(this.tsParseTypePredicateAsserts.bind(this));
          if (d && this.match(n._this)) {
            let w = this.tsParseThisTypeOrThisTypePredicate();
            return (
              w.type === "TSThisType"
                ? ((l.parameterName = w),
                  (l.asserts = !0),
                  (l.typeAnnotation = null),
                  (w = this.finishNode(l, "TSTypePredicate")))
                : (this.resetStartLocationFromNode(w, l), (w.asserts = !0)),
              (i.typeAnnotation = w),
              this.finishNode(i, "TSTypeAnnotation")
            );
          }
          const v =
            this.tsIsIdentifier() &&
            this.tsTryParse(this.tsParseTypePredicatePrefix.bind(this));
          if (!v)
            return d
              ? ((l.parameterName = this.parseIdent()),
                (l.asserts = d),
                (l.typeAnnotation = null),
                (i.typeAnnotation = this.finishNode(l, "TSTypePredicate")),
                this.finishNode(i, "TSTypeAnnotation"))
              : this.tsParseTypeAnnotation(!1, i);
          const P = this.tsParseTypeAnnotation(!1);
          return (
            (l.parameterName = v),
            (l.typeAnnotation = P),
            (l.asserts = d),
            (i.typeAnnotation = this.finishNode(l, "TSTypePredicate")),
            this.finishNode(i, "TSTypeAnnotation")
          );
        });
      }
      tsFillSignature(r, i) {
        const l = r === n.arrow,
          d = "parameters",
          v = "typeAnnotation";
        ((i.typeParameters = this.tsTryParseTypeParameters()),
          this.expect(n.parenL),
          (i[d] = this.tsParseBindingListForSignature()),
          l
            ? (i[v] = this.tsParseTypeOrTypePredicateAnnotation(r))
            : this.match(r) &&
              (i[v] = this.tsParseTypeOrTypePredicateAnnotation(r)));
      }
      tsTryNextParseConstantContext() {
        if (this.lookahead().type !== n._const) return null;
        this.next();
        const r = this.tsParseTypeReference();
        return (
          (r.typeParameters || r.typeArguments) &&
            this.raise(r.typeName.start, j.CannotFindName({ name: "const" })),
          r
        );
      }
      tsParseFunctionOrConstructorType(r, i) {
        const l = this.startNode();
        return (
          r === "TSConstructorType" &&
            ((l.abstract = !!i), i && this.next(), this.next()),
          this.tsInAllowConditionalTypesContext(() =>
            this.tsFillSignature(n.arrow, l),
          ),
          this.finishNode(l, r)
        );
      }
      tsParseUnionOrIntersectionType(r, i, l) {
        const d = this.startNode(),
          v = this.eat(l),
          P = [];
        do P.push(i());
        while (this.eat(l));
        return P.length === 1 && !v
          ? P[0]
          : ((d.types = P), this.finishNode(d, r));
      }
      tsCheckTypeAnnotationForReadOnly(r) {
        switch (r.typeAnnotation.type) {
          case "TSTupleType":
          case "TSArrayType":
            return;
          default:
            this.raise(r.start, j.UnexpectedReadonly);
        }
      }
      tsParseTypeOperator() {
        const r = this.startNode(),
          i = this.value;
        return (
          this.next(),
          (r.operator = i),
          (r.typeAnnotation = this.tsParseTypeOperatorOrHigher()),
          i === "readonly" && this.tsCheckTypeAnnotationForReadOnly(r),
          this.finishNode(r, "TSTypeOperator")
        );
      }
      tsParseConstraintForInferType() {
        if (this.eat(n._extends)) {
          const r = this.tsInDisallowConditionalTypesContext(() =>
            this.tsParseType(),
          );
          if (this.inDisallowConditionalTypesContext || !this.match(n.question))
            return r;
        }
      }
      tsParseInferType() {
        const r = this.startNode();
        this.expectContextual("infer");
        const i = this.startNode();
        return (
          (i.name = this.tsParseTypeParameterName()),
          (i.constraint = this.tsTryParse(() =>
            this.tsParseConstraintForInferType(),
          )),
          (r.typeParameter = this.finishNode(i, "TSTypeParameter")),
          this.finishNode(r, "TSInferType")
        );
      }
      tsParseLiteralTypeNode() {
        const r = this.startNode();
        return (
          (r.literal = (() => {
            switch (this.type) {
              case n.num:
              case n.string:
              case n._true:
              case n._false:
                return this.parseExprAtom();
              default:
                this.unexpected();
            }
          })()),
          this.finishNode(r, "TSLiteralType")
        );
      }
      tsParseImportType() {
        const r = this.startNode();
        return (
          this.expect(n._import),
          this.expect(n.parenL),
          this.match(n.string) ||
            this.raise(this.start, j.UnsupportedImportTypeArgument),
          (r.argument = this.parseExprAtom()),
          this.expect(n.parenR),
          this.eat(n.dot) && (r.qualifier = this.tsParseEntityName()),
          this.tsMatchLeftRelational() &&
            (r.typeArguments = this.tsParseTypeArguments()),
          this.finishNode(r, "TSImportType")
        );
      }
      tsParseTypeQuery() {
        const r = this.startNode();
        return (
          this.expect(n._typeof),
          this.match(n._import)
            ? (r.exprName = this.tsParseImportType())
            : (r.exprName = this.tsParseEntityName()),
          !this.hasPrecedingLineBreak() &&
            this.tsMatchLeftRelational() &&
            (r.typeArguments = this.tsParseTypeArguments()),
          this.finishNode(r, "TSTypeQuery")
        );
      }
      tsParseMappedTypeParameter() {
        const r = this.startNode();
        return (
          (r.name = this.tsParseTypeParameterName()),
          (r.constraint = this.tsExpectThenParseType(n._in)),
          this.finishNode(r, "TSTypeParameter")
        );
      }
      tsParseMappedType() {
        const r = this.startNode();
        return (
          this.expect(n.braceL),
          this.match(n.plusMin)
            ? ((r.readonly = this.value),
              this.next(),
              this.expectContextual("readonly"))
            : this.eatContextual("readonly") && (r.readonly = !0),
          this.expect(n.bracketL),
          (r.typeParameter = this.tsParseMappedTypeParameter()),
          (r.nameType = this.eatContextual("as") ? this.tsParseType() : null),
          this.expect(n.bracketR),
          this.match(n.plusMin)
            ? ((r.optional = this.value), this.next(), this.expect(n.question))
            : this.eat(n.question) && (r.optional = !0),
          (r.typeAnnotation = this.tsTryParseType()),
          this.semicolon(),
          this.expect(n.braceR),
          this.finishNode(r, "TSMappedType")
        );
      }
      tsParseTypeLiteral() {
        const r = this.startNode();
        return (
          (r.members = this.tsParseObjectTypeMembers()),
          this.finishNode(r, "TSTypeLiteral")
        );
      }
      tsParseTupleElementType() {
        const r = this.startLoc,
          i = this.start,
          l = this.eat(n.ellipsis);
        let d = this.tsParseType();
        const v = this.eat(n.question);
        if (this.eat(n.colon)) {
          const w = this.startNodeAtNode(d);
          ((w.optional = v),
            d.type === "TSTypeReference" &&
            !d.typeArguments &&
            d.typeName.type === "Identifier"
              ? (w.label = d.typeName)
              : (this.raise(d.start, j.InvalidTupleMemberLabel), (w.label = d)),
            (w.elementType = this.tsParseType()),
            (d = this.finishNode(w, "TSNamedTupleMember")));
        } else if (v) {
          const w = this.startNodeAtNode(d);
          ((w.typeAnnotation = d), (d = this.finishNode(w, "TSOptionalType")));
        }
        if (l) {
          const w = this.startNodeAt(i, r);
          ((w.typeAnnotation = d), (d = this.finishNode(w, "TSRestType")));
        }
        return d;
      }
      tsParseTupleType() {
        const r = this.startNode();
        r.elementTypes = this.tsParseBracketedList(
          "TupleElementTypes",
          this.tsParseTupleElementType.bind(this),
          !0,
          !1,
        );
        let i = !1;
        return (
          r.elementTypes.forEach((l) => {
            const { type: d } = l;
            (i &&
              d !== "TSRestType" &&
              d !== "TSOptionalType" &&
              !(d === "TSNamedTupleMember" && l.optional) &&
              this.raise(l.start, j.OptionalTypeBeforeRequired),
              i ||
                (i =
                  (d === "TSNamedTupleMember" && l.optional) ||
                  d === "TSOptionalType"),
              d === "TSRestType" && (l = l.typeAnnotation));
          }),
          this.finishNode(r, "TSTupleType")
        );
      }
      tsParseTemplateLiteralType() {
        const r = this.startNode();
        return (
          (r.literal = this.parseTemplate({ isTagged: !1 })),
          this.finishNode(r, "TSLiteralType")
        );
      }
      tsParseTypeReference() {
        const r = this.startNode();
        return (
          (r.typeName = this.tsParseEntityName()),
          !this.hasPrecedingLineBreak() &&
            this.tsMatchLeftRelational() &&
            (r.typeArguments = this.tsParseTypeArguments()),
          this.finishNode(r, "TSTypeReference")
        );
      }
      tsMatchLeftRelational() {
        return this.match(n.relational) && this.value === "<";
      }
      tsMatchRightRelational() {
        return this.match(n.relational) && this.value === ">";
      }
      tsParseParenthesizedType() {
        const r = this.startNode();
        return (
          this.expect(n.parenL),
          (r.typeAnnotation = this.tsParseType()),
          this.expect(n.parenR),
          this.finishNode(r, "TSParenthesizedType")
        );
      }
      tsParseNonArrayType() {
        switch (this.type) {
          case n.string:
          case n.num:
          case n._true:
          case n._false:
            return this.tsParseLiteralTypeNode();
          case n.plusMin:
            if (this.value === "-") {
              const r = this.startNode();
              return (
                this.lookahead().type !== n.num && this.unexpected(),
                (r.literal = this.parseMaybeUnary()),
                this.finishNode(r, "TSLiteralType")
              );
            }
            break;
          case n._this:
            return this.tsParseThisTypeOrThisTypePredicate();
          case n._typeof:
            return this.tsParseTypeQuery();
          case n._import:
            return this.tsParseImportType();
          case n.braceL:
            return this.tsLookAhead(this.tsIsStartOfMappedType.bind(this))
              ? this.tsParseMappedType()
              : this.tsParseTypeLiteral();
          case n.bracketL:
            return this.tsParseTupleType();
          case n.parenL:
            return this.tsParseParenthesizedType();
          case n.backQuote:
          case n.dollarBraceL:
            return this.tsParseTemplateLiteralType();
          default: {
            const { type: r } = this;
            if (m(r) || r === n._void || r === n._null) {
              const i =
                r === n._void
                  ? "TSVoidKeyword"
                  : r === n._null
                    ? "TSNullKeyword"
                    : p1(this.value);
              if (i !== void 0 && this.lookaheadCharCode() !== 46) {
                const l = this.startNode();
                return (this.next(), this.finishNode(l, i));
              }
              return this.tsParseTypeReference();
            }
          }
        }
        this.unexpected();
      }
      tsParseArrayTypeOrHigher() {
        let r = this.tsParseNonArrayType();
        for (; !this.hasPrecedingLineBreak() && this.eat(n.bracketL); )
          if (this.match(n.bracketR)) {
            const i = this.startNodeAtNode(r);
            ((i.elementType = r),
              this.expect(n.bracketR),
              (r = this.finishNode(i, "TSArrayType")));
          } else {
            const i = this.startNodeAtNode(r);
            ((i.objectType = r),
              (i.indexType = this.tsParseType()),
              this.expect(n.bracketR),
              (r = this.finishNode(i, "TSIndexedAccessType")));
          }
        return r;
      }
      tsParseTypeOperatorOrHigher() {
        return R(this.type) && !this.containsEsc
          ? this.tsParseTypeOperator()
          : this.isContextual("infer")
            ? this.tsParseInferType()
            : this.tsInAllowConditionalTypesContext(() =>
                this.tsParseArrayTypeOrHigher(),
              );
      }
      tsParseIntersectionTypeOrHigher() {
        return this.tsParseUnionOrIntersectionType(
          "TSIntersectionType",
          this.tsParseTypeOperatorOrHigher.bind(this),
          n.bitwiseAND,
        );
      }
      tsParseUnionTypeOrHigher() {
        return this.tsParseUnionOrIntersectionType(
          "TSUnionType",
          this.tsParseIntersectionTypeOrHigher.bind(this),
          n.bitwiseOR,
        );
      }
      tsParseNonConditionalType() {
        return this.tsIsStartOfFunctionType()
          ? this.tsParseFunctionOrConstructorType("TSFunctionType")
          : this.match(n._new)
            ? this.tsParseFunctionOrConstructorType("TSConstructorType")
            : this.isAbstractConstructorSignature()
              ? this.tsParseFunctionOrConstructorType("TSConstructorType", !0)
              : this.tsParseUnionTypeOrHigher();
      }
      tsParseType() {
        xl(this.inType);
        const r = this.tsParseNonConditionalType();
        if (
          this.inDisallowConditionalTypesContext ||
          this.hasPrecedingLineBreak() ||
          !this.eat(n._extends)
        )
          return r;
        const i = this.startNodeAtNode(r);
        return (
          (i.checkType = r),
          (i.extendsType = this.tsInDisallowConditionalTypesContext(() =>
            this.tsParseNonConditionalType(),
          )),
          this.expect(n.question),
          (i.trueType = this.tsInAllowConditionalTypesContext(() =>
            this.tsParseType(),
          )),
          this.expect(n.colon),
          (i.falseType = this.tsInAllowConditionalTypesContext(() =>
            this.tsParseType(),
          )),
          this.finishNode(i, "TSConditionalType")
        );
      }
      tsIsUnambiguouslyIndexSignature() {
        return (
          this.next(),
          m(this.type) ? (this.next(), this.match(n.colon)) : !1
        );
      }
      tsInType(r) {
        const i = this.inType;
        this.inType = !0;
        try {
          return r();
        } finally {
          this.inType = i;
        }
      }
      tsTryParseIndexSignature(r) {
        if (
          !(
            this.match(n.bracketL) &&
            this.tsLookAhead(this.tsIsUnambiguouslyIndexSignature.bind(this))
          )
        )
          return;
        this.expect(n.bracketL);
        const i = this.parseIdent();
        ((i.typeAnnotation = this.tsParseTypeAnnotation()),
          this.resetEndLocation(i),
          this.expect(n.bracketR),
          (r.parameters = [i]));
        const l = this.tsTryParseTypeAnnotation();
        return (
          l && (r.typeAnnotation = l),
          this.tsParseTypeMemberSemicolon(),
          this.finishNode(r, "TSIndexSignature")
        );
      }
      tsParseNoneModifiers(r) {
        this.tsParseModifiers({
          modified: r,
          allowedModifiers: [],
          disallowedModifiers: ["in", "out"],
          errorTemplate: j.InvalidModifierOnTypeParameterPositions,
        });
      }
      tsParseTypeParameter(r = this.tsParseNoneModifiers.bind(this)) {
        const i = this.startNode();
        return (
          r(i),
          (i.name = this.tsParseTypeParameterName()),
          (i.constraint = this.tsEatThenParseType(n._extends)),
          (i.default = this.tsEatThenParseType(n.eq)),
          this.finishNode(i, "TSTypeParameter")
        );
      }
      tsParseTypeParameters(r) {
        const i = this.startNode();
        this.tsMatchLeftRelational() || this.matchJsx("jsxTagStart")
          ? this.next()
          : this.unexpected();
        const l = { value: -1 };
        return (
          (i.params = this.tsParseBracketedList(
            "TypeParametersOrArguments",
            this.tsParseTypeParameter.bind(this, r),
            !1,
            !0,
            l,
          )),
          i.params.length === 0 &&
            this.raise(this.start, j.EmptyTypeParameters),
          l.value !== -1 && this.addExtra(i, "trailingComma", l.value),
          this.finishNode(i, "TSTypeParameterDeclaration")
        );
      }
      tsTryParseTypeParameters(r) {
        if (this.tsMatchLeftRelational()) return this.tsParseTypeParameters(r);
      }
      tsTryParse(r) {
        const i = this.getCurLookaheadState(),
          l = r();
        if (l !== void 0 && l !== !1) return l;
        this.setLookaheadState(i);
      }
      tsTokenCanFollowModifier() {
        return (
          (this.match(n.bracketL) ||
            this.match(n.braceL) ||
            this.match(n.star) ||
            this.match(n.ellipsis) ||
            this.match(n.privateId) ||
            this.isLiteralPropertyName()) &&
          !this.hasPrecedingLineBreak()
        );
      }
      tsNextTokenCanFollowModifier() {
        return (this.next(!0), this.tsTokenCanFollowModifier());
      }
      tsParseModifier(r, i) {
        const l = this.value;
        if (r.indexOf(l) !== -1 && !this.containsEsc) {
          if (i && this.tsIsStartOfStaticBlocks()) return;
          if (this.tsTryParse(this.tsNextTokenCanFollowModifier.bind(this)))
            return l;
        }
      }
      tsParseModifiersByMap({ modified: r, map: i }) {
        for (const l of Object.keys(i)) r[l] = i[l];
      }
      tsParseModifiers({
        modified: r,
        allowedModifiers: i,
        disallowedModifiers: l,
        stopOnStartOfClassStaticBlock: d,
        errorTemplate: v = j.InvalidModifierOnTypeMember,
      }) {
        const P = {},
          w = (N, E, H, X) => {
            E === H &&
              r[X] &&
              this.raise(
                N.column,
                j.InvalidModifiersOrder({ orderedModifiers: [H, X] }),
              );
          },
          D = (N, E, H, X) => {
            ((r[H] && E === X) || (r[X] && E === H)) &&
              this.raise(
                N.column,
                j.IncompatibleModifiers({ modifiers: [H, X] }),
              );
          };
        for (;;) {
          const N = this.startLoc,
            E = this.tsParseModifier(i.concat(l ?? []), d);
          if (!E) break;
          (_l(E)
            ? r.accessibility
              ? this.raise(this.start, j.DuplicateAccessibilityModifier())
              : (w(N, E, E, "override"),
                w(N, E, E, "static"),
                w(N, E, E, "readonly"),
                w(N, E, E, "accessor"),
                (P.accessibility = E),
                (r.accessibility = E))
            : o1(E)
              ? r[E]
                ? this.raise(this.start, j.DuplicateModifier({ modifier: E }))
                : (w(N, E, "in", "out"), (P[E] = E), (r[E] = !0))
              : n1(E)
                ? r[E]
                  ? this.raise(this.start, j.DuplicateModifier({ modifier: E }))
                  : (D(N, E, "accessor", "readonly"),
                    D(N, E, "accessor", "static"),
                    D(N, E, "accessor", "override"),
                    (P[E] = E),
                    (r[E] = !0))
                : E === "const"
                  ? r[E]
                    ? this.raise(
                        this.start,
                        j.DuplicateModifier({ modifier: E }),
                      )
                    : ((P[E] = E), (r[E] = !0))
                  : Object.hasOwnProperty.call(r, E)
                    ? this.raise(
                        this.start,
                        j.DuplicateModifier({ modifier: E }),
                      )
                    : (w(N, E, "static", "readonly"),
                      w(N, E, "static", "override"),
                      w(N, E, "override", "readonly"),
                      w(N, E, "abstract", "override"),
                      D(N, E, "declare", "override"),
                      D(N, E, "static", "abstract"),
                      (P[E] = E),
                      (r[E] = !0)),
            l != null && l.includes(E) && this.raise(this.start, v));
        }
        return P;
      }
      tsParseInOutModifiers(r) {
        this.tsParseModifiers({
          modified: r,
          allowedModifiers: ["in", "out"],
          disallowedModifiers: [
            "public",
            "private",
            "protected",
            "readonly",
            "declare",
            "abstract",
            "override",
          ],
          errorTemplate: j.InvalidModifierOnTypeParameter,
        });
      }
      parseMaybeUnary(r, i, l, d) {
        return this.tsMatchLeftRelational()
          ? this.tsParseTypeAssertion()
          : super.parseMaybeUnary(r, i, l, d);
      }
      tsParseTypeAssertion() {
        const r = this.tryParse(() => {
          const i = this.startNode(),
            l = this.tsTryNextParseConstantContext();
          return (
            (i.typeAnnotation = l || this.tsNextThenParseType()),
            this.expect(n.relational),
            (i.expression = this.parseMaybeUnary()),
            this.finishNode(i, "TSTypeAssertion")
          );
        });
        return r.error
          ? this.tsParseTypeParameters(this.tsParseConstModifier)
          : r.node;
      }
      tsParseTypeArguments() {
        const r = this.startNode();
        return (
          (r.params = this.tsInType(() =>
            this.tsInNoContext(
              () => (
                this.expect(n.relational),
                this.tsParseDelimitedList(
                  "TypeParametersOrArguments",
                  this.tsParseType.bind(this),
                )
              ),
            ),
          )),
          r.params.length === 0 && this.raise(this.start, j.EmptyTypeArguments),
          (this.exprAllowed = !1),
          this.expect(n.relational),
          this.finishNode(r, "TSTypeParameterInstantiation")
        );
      }
      tsParseHeritageClause(r) {
        const i = this.start,
          l = this.tsParseDelimitedList("HeritageClauseElement", () => {
            const d = this.startNode();
            return (
              (d.expression = this.tsParseEntityName()),
              this.tsMatchLeftRelational() &&
                (d.typeParameters = this.tsParseTypeArguments()),
              this.finishNode(d, "TSExpressionWithTypeArguments")
            );
          });
        return (
          l.length || this.raise(i, j.EmptyHeritageClauseType({ token: r })),
          l
        );
      }
      tsParseTypeMemberSemicolon() {
        !this.eat(n.comma) && !this.isLineTerminator() && this.expect(n.semi);
      }
      tsTryParseAndCatch(r) {
        const i = this.tryParse((l) => r() || l());
        if (!(i.aborted || !i.node))
          return (i.error && this.setLookaheadState(i.failState), i.node);
      }
      tsParseSignatureMember(r, i) {
        return (
          this.tsFillSignature(n.colon, i),
          this.tsParseTypeMemberSemicolon(),
          this.finishNode(i, r)
        );
      }
      tsParsePropertyOrMethodSignature(r, i) {
        this.eat(n.question) && (r.optional = !0);
        const l = r;
        if (this.match(n.parenL) || this.tsMatchLeftRelational()) {
          i && this.raise(r.start, j.ReadonlyForMethodSignature);
          const d = l;
          (d.kind &&
            this.tsMatchLeftRelational() &&
            this.raise(this.start, j.AccesorCannotHaveTypeParameters),
            this.tsFillSignature(n.colon, d),
            this.tsParseTypeMemberSemicolon());
          const v = "parameters",
            P = "typeAnnotation";
          if (d.kind === "get")
            d[v].length > 0 &&
              (this.raise(
                this.start,
                "A 'get' accesor must not have any formal parameters.",
              ),
              this.isThisParam(d[v][0]) &&
                this.raise(this.start, j.AccesorCannotDeclareThisParameter));
          else if (d.kind === "set") {
            if (d[v].length !== 1)
              this.raise(
                this.start,
                "A 'get' accesor must not have any formal parameters.",
              );
            else {
              const w = d[v][0];
              (this.isThisParam(w) &&
                this.raise(this.start, j.AccesorCannotDeclareThisParameter),
                w.type === "Identifier" &&
                  w.optional &&
                  this.raise(
                    this.start,
                    j.SetAccesorCannotHaveOptionalParameter,
                  ),
                w.type === "RestElement" &&
                  this.raise(this.start, j.SetAccesorCannotHaveRestParameter));
            }
            d[P] && this.raise(d[P].start, j.SetAccesorCannotHaveReturnType);
          } else d.kind = "method";
          return this.finishNode(d, "TSMethodSignature");
        } else {
          const d = l;
          i && (d.readonly = !0);
          const v = this.tsTryParseTypeAnnotation();
          return (
            v && (d.typeAnnotation = v),
            this.tsParseTypeMemberSemicolon(),
            this.finishNode(d, "TSPropertySignature")
          );
        }
      }
      tsParseTypeMember() {
        const r = this.startNode();
        if (this.match(n.parenL) || this.tsMatchLeftRelational())
          return this.tsParseSignatureMember("TSCallSignatureDeclaration", r);
        if (this.match(n._new)) {
          const l = this.startNode();
          return (
            this.next(),
            this.match(n.parenL) || this.tsMatchLeftRelational()
              ? this.tsParseSignatureMember(
                  "TSConstructSignatureDeclaration",
                  r,
                )
              : ((r.key = this.createIdentifier(l, "new")),
                this.tsParsePropertyOrMethodSignature(r, !1))
          );
        }
        this.tsParseModifiers({
          modified: r,
          allowedModifiers: ["readonly"],
          disallowedModifiers: [
            "declare",
            "abstract",
            "private",
            "protected",
            "public",
            "static",
            "override",
          ],
        });
        const i = this.tsTryParseIndexSignature(r);
        return (
          i ||
          (this.parsePropertyName(r),
          !r.computed &&
            r.key.type === "Identifier" &&
            (r.key.name === "get" || r.key.name === "set") &&
            this.tsTokenCanFollowModifier() &&
            ((r.kind = r.key.name), this.parsePropertyName(r)),
          this.tsParsePropertyOrMethodSignature(r, !!r.readonly))
        );
      }
      tsParseList(r, i) {
        const l = [];
        for (; !this.tsIsListTerminator(r); ) l.push(i());
        return l;
      }
      tsParseObjectTypeMembers() {
        this.expect(n.braceL);
        const r = this.tsParseList(
          "TypeMembers",
          this.tsParseTypeMember.bind(this),
        );
        return (this.expect(n.braceR), r);
      }
      tsParseInterfaceDeclaration(r, i = {}) {
        if (this.hasFollowingLineBreak()) return null;
        (this.expectContextual("interface"),
          i.declare && (r.declare = !0),
          m(this.type)
            ? ((r.id = this.parseIdent()),
              this.checkLValSimple(r.id, Y.BIND_TS_INTERFACE))
            : ((r.id = null), this.raise(this.start, j.MissingInterfaceName)),
          (r.typeParameters = this.tsTryParseTypeParameters(
            this.tsParseInOutModifiers.bind(this),
          )),
          this.eat(n._extends) &&
            (r.extends = this.tsParseHeritageClause("extends")));
        const l = this.startNode();
        return (
          (l.body = this.tsParseInterfaceBody()),
          (r.body = this.finishNode(l, "TSInterfaceBody")),
          this.finishNode(r, "TSInterfaceDeclaration")
        );
      }
      tsParseInterfaceBody() {
        this.expect(n.braceL);
        const r = this.inType;
        this.inType = !0;
        let i = this.tsParseList(
          "TypeMembers",
          this.tsParseTypeMember.bind(this),
        );
        return ((this.inType = r), this.expect(n.braceR), i);
      }
      tsParseAbstractDeclaration(r) {
        if (this.match(n._class))
          return ((r.abstract = !0), this.parseClass(r, !0));
        if (this.ts_isContextual(k.interface)) {
          if (!this.hasFollowingLineBreak())
            return ((r.abstract = !0), this.tsParseInterfaceDeclaration(r));
        } else this.unexpected(r.start);
      }
      tsIsDeclarationStart() {
        return p(this.type);
      }
      tsParseExpressionStatement(r, i) {
        switch (i.name) {
          case "declare": {
            const l = this.tsTryParseDeclare(r);
            if (l) return ((l.declare = !0), l);
            break;
          }
          case "global":
            if (this.match(n.braceL)) {
              this.enterScope(Xe);
              const l = r;
              return (
                (l.global = !0),
                (l.id = i),
                (l.body = this.tsParseModuleBlock()),
                super.exitScope(),
                this.finishNode(l, "TSModuleDeclaration")
              );
            }
            break;
          default:
            return this.tsParseDeclaration(r, i.name, !1);
        }
      }
      tsParseModuleReference() {
        return this.tsIsExternalModuleReference()
          ? this.tsParseExternalModuleReference()
          : this.tsParseEntityName(!1);
      }
      tsIsExportDefaultSpecifier() {
        const { type: r } = this,
          i = this.isAsyncFunction(),
          l = this.isLet();
        if (m(r)) {
          if ((i && !this.containsEsc) || l) return !1;
          if ((r === k.type || r === k.interface) && !this.containsEsc) {
            const P = this.lookahead();
            if (
              (m(P.type) && !this.isContextualWithState("from", P)) ||
              P.type === n.braceL
            )
              return !1;
          }
        } else if (!this.match(n._default)) return !1;
        const d = this.nextTokenStart(),
          v = this.isUnparsedContextual(d, "from");
        if (this.input.charCodeAt(d) === 44 || (m(this.type) && v)) return !0;
        if (this.match(n._default) && v) {
          const P = this.input.charCodeAt(this.nextTokenStartSince(d + 4));
          return P === 34 || P === 39;
        }
        return !1;
      }
      tsInAmbientContext(r) {
        const i = this.isAmbientContext;
        this.isAmbientContext = !0;
        try {
          return r();
        } finally {
          this.isAmbientContext = i;
        }
      }
      tsCheckLineTerminator(r) {
        return r
          ? this.hasFollowingLineBreak()
            ? !1
            : (this.next(), !0)
          : !this.isLineTerminator();
      }
      tsParseModuleOrNamespaceDeclaration(r, i = !1) {
        if (
          ((r.id = this.parseIdent()),
          i || this.checkLValSimple(r.id, Y.BIND_TS_NAMESPACE),
          this.eat(n.dot))
        ) {
          const l = this.startNode();
          (this.tsParseModuleOrNamespaceDeclaration(l, !0), (r.body = l));
        } else
          (this.enterScope(Xe),
            (r.body = this.tsParseModuleBlock()),
            super.exitScope());
        return this.finishNode(r, "TSModuleDeclaration");
      }
      checkLValSimple(r, i = Y.BIND_NONE, l) {
        return (
          (r.type === "TSNonNullExpression" || r.type === "TSAsExpression") &&
            (r = r.expression),
          super.checkLValSimple(r, i, l)
        );
      }
      tsParseTypeAliasDeclaration(r) {
        return (
          (r.id = this.parseIdent()),
          this.checkLValSimple(r.id, Y.BIND_TS_TYPE),
          (r.typeAnnotation = this.tsInType(() => {
            if (
              ((r.typeParameters = this.tsTryParseTypeParameters(
                this.tsParseInOutModifiers.bind(this),
              )),
              this.expect(n.eq),
              this.ts_isContextual(k.interface) &&
                this.lookahead().type !== n.dot)
            ) {
              const i = this.startNode();
              return (this.next(), this.finishNode(i, "TSIntrinsicKeyword"));
            }
            return this.tsParseType();
          })),
          this.semicolon(),
          this.finishNode(r, "TSTypeAliasDeclaration")
        );
      }
      tsParseDeclaration(r, i, l) {
        switch (i) {
          case "abstract":
            if (
              this.tsCheckLineTerminator(l) &&
              (this.match(n._class) || m(this.type))
            )
              return this.tsParseAbstractDeclaration(r);
            break;
          case "module":
            if (this.tsCheckLineTerminator(l)) {
              if (this.match(n.string))
                return this.tsParseAmbientExternalModuleDeclaration(r);
              if (m(this.type))
                return this.tsParseModuleOrNamespaceDeclaration(r);
            }
            break;
          case "namespace":
            if (this.tsCheckLineTerminator(l) && m(this.type))
              return this.tsParseModuleOrNamespaceDeclaration(r);
            break;
          case "type":
            if (this.tsCheckLineTerminator(l) && m(this.type))
              return this.tsParseTypeAliasDeclaration(r);
            break;
        }
      }
      tsTryParseExportDeclaration() {
        return this.tsParseDeclaration(this.startNode(), this.value, !0);
      }
      tsParseImportEqualsDeclaration(r, i) {
        ((r.isExport = i || !1),
          (r.id = this.parseIdent()),
          this.checkLValSimple(r.id, Y.BIND_LEXICAL),
          super.expect(n.eq));
        const l = this.tsParseModuleReference();
        return (
          r.importKind === "type" &&
            l.type !== "TSExternalModuleReference" &&
            this.raise(l.start, j.ImportAliasHasImportType),
          (r.moduleReference = l),
          super.semicolon(),
          this.finishNode(r, "TSImportEqualsDeclaration")
        );
      }
      isExportDefaultSpecifier() {
        if (this.tsIsDeclarationStart()) return !1;
        const { type: r } = this;
        if (m(r)) {
          if (this.isContextual("async") || this.isContextual("let")) return !1;
          if ((r === k.type || r === k.interface) && !this.containsEsc) {
            const d = this.lookahead();
            if (
              (m(d.type) && !this.isContextualWithState("from", d)) ||
              d.type === n.braceL
            )
              return !1;
          }
        } else if (!this.match(n._default)) return !1;
        const i = this.nextTokenStart(),
          l = this.isUnparsedContextual(i, "from");
        if (this.input.charCodeAt(i) === 44 || (m(this.type) && l)) return !0;
        if (this.match(n._default) && l) {
          const d = this.input.charCodeAt(this.nextTokenStartSince(i + 4));
          return d === 34 || d === 39;
        }
        return !1;
      }
      parseTemplate({ isTagged: r = !1 } = {}) {
        let i = this.startNode();
        (this.next(), (i.expressions = []));
        let l = this.parseTemplateElement({ isTagged: r });
        for (i.quasis = [l]; !l.tail; )
          (this.type === n.eof &&
            this.raise(this.pos, "Unterminated template literal"),
            this.expect(n.dollarBraceL),
            i.expressions.push(
              this.inType ? this.tsParseType() : this.parseExpression(),
            ),
            this.expect(n.braceR),
            i.quasis.push((l = this.parseTemplateElement({ isTagged: r }))));
        return (this.next(), this.finishNode(i, "TemplateLiteral"));
      }
      parseFunction(r, i, l, d, v) {
        (this.initFunction(r),
          (this.ecmaVersion >= 9 || (this.ecmaVersion >= 6 && !d)) &&
            (this.type === n.star && i & Cl && this.unexpected(),
            (r.generator = this.eat(n.star))),
          this.ecmaVersion >= 8 && (r.async = !!d),
          i & qn &&
            (r.id = i & l1 && this.type !== n.name ? null : this.parseIdent()));
        let P = this.yieldPos,
          w = this.awaitPos,
          D = this.awaitIdentPos;
        const N = this.maybeInArrowParameters;
        ((this.maybeInArrowParameters = !1),
          (this.yieldPos = 0),
          (this.awaitPos = 0),
          (this.awaitIdentPos = 0),
          this.enterScope(Vo(r.async, r.generator)),
          i & qn || (r.id = this.type === n.name ? this.parseIdent() : null),
          this.parseFunctionParams(r));
        const E = i & qn;
        return (
          this.parseFunctionBody(r, l, !1, v, { isFunctionDeclaration: E }),
          (this.yieldPos = P),
          (this.awaitPos = w),
          (this.awaitIdentPos = D),
          i & qn &&
            r.id &&
            !(i & Cl) &&
            (r.body
              ? this.checkLValSimple(
                  r.id,
                  this.strict || r.generator || r.async
                    ? this.treatFunctionsAsVar
                      ? Y.BIND_VAR
                      : Y.BIND_LEXICAL
                    : Y.BIND_FUNCTION,
                )
              : this.checkLValSimple(r.id, Y.BIND_NONE)),
          (this.maybeInArrowParameters = N),
          this.finishNode(r, E ? "FunctionDeclaration" : "FunctionExpression")
        );
      }
      parseFunctionBody(r, i = !1, l = !1, d = !1, v) {
        this.match(n.colon) &&
          (r.returnType = this.tsParseTypeOrTypePredicateAnnotation(n.colon));
        const P =
          v != null && v.isFunctionDeclaration
            ? "TSDeclareFunction"
            : v != null && v.isClassMethod
              ? "TSDeclareMethod"
              : void 0;
        return P && !this.match(n.braceL) && this.isLineTerminator()
          ? this.finishNode(r, P)
          : P === "TSDeclareFunction" &&
              this.isAmbientContext &&
              (this.raise(r.start, j.DeclareFunctionHasImplementation),
              r.declare)
            ? (super.parseFunctionBody(r, i, l, !1), this.finishNode(r, P))
            : (super.parseFunctionBody(r, i, l, d), r);
      }
      parseNew() {
        var w;
        this.containsEsc &&
          this.raiseRecoverable(this.start, "Escape sequence in keyword new");
        let r = this.startNode(),
          i = this.parseIdent(!0);
        if (this.ecmaVersion >= 6 && this.eat(n.dot)) {
          r.meta = i;
          let D = this.containsEsc;
          return (
            (r.property = this.parseIdent(!0)),
            r.property.name !== "target" &&
              this.raiseRecoverable(
                r.property.start,
                "The only valid meta property for new is 'new.target'",
              ),
            D &&
              this.raiseRecoverable(
                r.start,
                "'new.target' must not contain escaped characters",
              ),
            this.allowNewDotTarget ||
              this.raiseRecoverable(
                r.start,
                "'new.target' can only be used in functions and class static block",
              ),
            this.finishNode(r, "MetaProperty")
          );
        }
        let l = this.start,
          d = this.startLoc,
          v = this.type === n._import;
        ((r.callee = this.parseSubscripts(this.parseExprAtom(), l, d, !0, !1)),
          v &&
            r.callee.type === "ImportExpression" &&
            this.raise(l, "Cannot use new with import()"));
        const { callee: P } = r;
        return (
          P.type === "TSInstantiationExpression" &&
            !((w = P.extra) != null && w.parenthesized) &&
            ((r.typeArguments = P.typeArguments), (r.callee = P.expression)),
          this.eat(n.parenL)
            ? (r.arguments = this.parseExprList(
                n.parenR,
                this.ecmaVersion >= 8,
                !1,
              ))
            : (r.arguments = []),
          this.finishNode(r, "NewExpression")
        );
      }
      parseExprOp(r, i, l, d, v) {
        if (n._in.binop > d && !this.hasPrecedingLineBreak()) {
          let P;
          if (
            (this.isContextual("as") && (P = "TSAsExpression"),
            this.isContextual("satisfies") && (P = "TSSatisfiesExpression"),
            P)
          ) {
            const w = this.startNodeAt(i, l);
            w.expression = r;
            const D = this.tsTryNextParseConstantContext();
            return (
              D
                ? (w.typeAnnotation = D)
                : (w.typeAnnotation = this.tsNextThenParseType()),
              this.finishNode(w, P),
              this.reScan_lt_gt(),
              this.parseExprOp(w, i, l, d, v)
            );
          }
        }
        return super.parseExprOp(r, i, l, d, v);
      }
      parseImportSpecifiers() {
        let r = [],
          i = !0;
        if (
          c.tokenIsIdentifier(this.type) &&
          (r.push(this.parseImportDefaultSpecifier()), !this.eat(n.comma))
        )
          return r;
        if (this.type === n.star)
          return (r.push(this.parseImportNamespaceSpecifier()), r);
        for (this.expect(n.braceL); !this.eat(n.braceR); ) {
          if (i) i = !1;
          else if ((this.expect(n.comma), this.afterTrailingComma(n.braceR)))
            break;
          r.push(this.parseImportSpecifier());
        }
        return r;
      }
      parseImport(r) {
        let i = this.lookahead();
        if (
          ((r.importKind = "value"),
          (this.importOrExportOuterKind = "value"),
          m(i.type) || this.match(n.star) || this.match(n.braceL))
        ) {
          let l = this.lookahead(2);
          if (
            (l.type !== n.comma &&
              !this.isContextualWithState("from", l) &&
              l.type !== n.eq &&
              this.ts_eatContextualWithState("type", 1, i) &&
              ((this.importOrExportOuterKind = "type"),
              (r.importKind = "type"),
              (i = this.lookahead()),
              (l = this.lookahead(2))),
            m(i.type) && l.type === n.eq)
          ) {
            this.next();
            const d = this.tsParseImportEqualsDeclaration(r);
            return ((this.importOrExportOuterKind = "value"), d);
          }
        }
        return (
          this.next(),
          this.type === n.string
            ? ((r.specifiers = []), (r.source = this.parseExprAtom()))
            : ((r.specifiers = this.parseImportSpecifiers()),
              this.expectContextual("from"),
              (r.source =
                this.type === n.string
                  ? this.parseExprAtom()
                  : this.unexpected())),
          this.parseMaybeImportAttributes(r),
          this.semicolon(),
          this.finishNode(r, "ImportDeclaration"),
          (this.importOrExportOuterKind = "value"),
          r.importKind === "type" &&
            r.specifiers.length > 1 &&
            r.specifiers[0].type === "ImportDefaultSpecifier" &&
            this.raise(r.start, j.TypeImportCannotSpecifyDefaultAndNamed),
          r
        );
      }
      parseExportDefaultDeclaration() {
        if (this.isAbstractClass()) {
          const r = this.startNode();
          return (this.next(), (r.abstract = !0), this.parseClass(r, !0));
        }
        if (this.match(k.interface)) {
          const r = this.tsParseInterfaceDeclaration(this.startNode());
          if (r) return r;
        }
        return super.parseExportDefaultDeclaration();
      }
      parseExportAllDeclaration(r, i) {
        return (
          this.ecmaVersion >= 11 &&
            (this.eatContextual("as")
              ? ((r.exported = this.parseModuleExportName()),
                this.checkExport(i, r.exported, this.lastTokStart))
              : (r.exported = null)),
          this.expectContextual("from"),
          this.type !== n.string && this.unexpected(),
          (r.source = this.parseExprAtom()),
          this.parseMaybeImportAttributes(r),
          this.semicolon(),
          this.finishNode(r, "ExportAllDeclaration")
        );
      }
      parseDynamicImport(r) {
        if (
          (this.next(), (r.source = this.parseMaybeAssign()), this.eat(n.comma))
        ) {
          const i = this.parseExpression();
          r.arguments = [i];
        }
        if (!this.eat(n.parenR)) {
          const i = this.start;
          this.eat(n.comma) && this.eat(n.parenR)
            ? this.raiseRecoverable(
                i,
                "Trailing comma is not allowed in import()",
              )
            : this.unexpected(i);
        }
        return this.finishNode(r, "ImportExpression");
      }
      parseExport(r, i) {
        let l = this.lookahead();
        if (this.ts_eatWithState(n._import, 2, l)) {
          this.ts_isContextual(k.type) && this.lookaheadCharCode() !== 61
            ? ((r.importKind = "type"),
              (this.importOrExportOuterKind = "type"),
              this.next())
            : ((r.importKind = "value"),
              (this.importOrExportOuterKind = "value"));
          const d = this.tsParseImportEqualsDeclaration(r, !0);
          return ((this.importOrExportOuterKind = void 0), d);
        } else if (this.ts_eatWithState(n.eq, 2, l)) {
          const d = r;
          return (
            (d.expression = this.parseExpression()),
            this.semicolon(),
            (this.importOrExportOuterKind = void 0),
            this.finishNode(d, "TSExportAssignment")
          );
        } else if (this.ts_eatContextualWithState("as", 2, l)) {
          const d = r;
          return (
            this.expectContextual("namespace"),
            (d.id = this.parseIdent()),
            this.semicolon(),
            (this.importOrExportOuterKind = void 0),
            this.finishNode(d, "TSNamespaceExportDeclaration")
          );
        } else {
          const d = this.lookahead(2).type;
          if (
            (this.ts_isContextualWithState(l, k.type) &&
            (d === n.braceL || d === n.star)
              ? (this.next(),
                (this.importOrExportOuterKind = "type"),
                (r.exportKind = "type"))
              : ((this.importOrExportOuterKind = "value"),
                (r.exportKind = "value")),
            this.next(),
            this.eat(n.star))
          )
            return this.parseExportAllDeclaration(r, i);
          if (this.eat(n._default))
            return (
              this.checkExport(i, "default", this.lastTokStart),
              (r.declaration = this.parseExportDefaultDeclaration()),
              this.finishNode(r, "ExportDefaultDeclaration")
            );
          if (this.shouldParseExportStatement())
            ((r.declaration = this.parseExportDeclaration(r)),
              r.declaration.type === "VariableDeclaration"
                ? this.checkVariableExport(i, r.declaration.declarations)
                : this.checkExport(i, r.declaration.id, r.declaration.id.start),
              (r.specifiers = []),
              (r.source = null));
          else {
            if (
              ((r.declaration = null),
              (r.specifiers = this.parseExportSpecifiers(i)),
              this.eatContextual("from"))
            )
              (this.type !== n.string && this.unexpected(),
                (r.source = this.parseExprAtom()),
                this.parseMaybeImportAttributes(r));
            else {
              for (let v of r.specifiers)
                (this.checkUnreserved(v.local),
                  this.checkLocalExport(v.local),
                  v.local.type === "Literal" &&
                    this.raise(
                      v.local.start,
                      "A string literal cannot be used as an exported binding without `from`.",
                    ));
              r.source = null;
            }
            this.semicolon();
          }
          return this.finishNode(r, "ExportNamedDeclaration");
        }
      }
      checkExport(r, i, l) {
        r &&
          (typeof i != "string" &&
            (i = i.type === "Identifier" ? i.name : i.value),
          (r[i] = !0));
      }
      parseMaybeDefault(r, i, l) {
        const d = super.parseMaybeDefault(r, i, l);
        return (
          d.type === "AssignmentPattern" &&
            d.typeAnnotation &&
            d.right.start < d.typeAnnotation.start &&
            this.raise(d.typeAnnotation.start, j.TypeAnnotationAfterAssign),
          d
        );
      }
      typeCastToParameter(r) {
        var i;
        return (
          (r.expression.typeAnnotation = r.typeAnnotation),
          this.resetEndLocation(
            r.expression,
            r.typeAnnotation.end,
            (i = r.typeAnnotation.loc) == null ? void 0 : i.end,
          ),
          r.expression
        );
      }
      toAssignableList(r, i) {
        r || (r = []);
        for (let l = 0; l < r.length; l++) {
          const d = r[l];
          (d == null ? void 0 : d.type) === "TSTypeCastExpression" &&
            (r[l] = this.typeCastToParameter(d));
        }
        return super.toAssignableList(r, i);
      }
      reportReservedArrowTypeParam(r) {
        var i;
        r.params.length === 1 && (i = r.extra) != null && i.trailingComma;
      }
      parseExprAtom(r, i, l) {
        if (this.type === k.jsxText) return this.jsx_parseText();
        if (this.type === k.jsxTagStart) return this.jsx_parseElement();
        if (this.type === k.at)
          return (this.parseDecorators(), this.parseExprAtom());
        if (m(this.type)) {
          let d = this.potentialArrowAt === this.start,
            v = this.start,
            P = this.startLoc,
            w = this.containsEsc,
            D = this.parseIdent(!1);
          if (
            this.ecmaVersion >= 8 &&
            !w &&
            D.name === "async" &&
            !this.canInsertSemicolon() &&
            this.eat(n._function)
          )
            return (
              this.overrideContext(T.f_expr),
              this.parseFunction(this.startNodeAt(v, P), 0, !1, !0, i)
            );
          if (d && !this.canInsertSemicolon()) {
            if (this.eat(n.arrow))
              return this.parseArrowExpression(
                this.startNodeAt(v, P),
                [D],
                !1,
                i,
              );
            if (
              this.ecmaVersion >= 8 &&
              D.name === "async" &&
              this.type === n.name &&
              !w &&
              (!this.potentialArrowInForAwait ||
                this.value !== "of" ||
                this.containsEsc)
            )
              return (
                (D = this.parseIdent(!1)),
                (this.canInsertSemicolon() || !this.eat(n.arrow)) &&
                  this.unexpected(),
                this.parseArrowExpression(this.startNodeAt(v, P), [D], !0, i)
              );
          }
          return D;
        } else return super.parseExprAtom(r, i, l);
      }
      parseExprAtomDefault() {
        if (m(this.type)) {
          const r = this.potentialArrowAt === this.start,
            i = this.containsEsc,
            l = this.parseIdent();
          if (!i && l.name === "async" && !this.canInsertSemicolon()) {
            const { type: d } = this;
            if (d === n._function)
              return (
                this.next(),
                this.parseFunction(this.startNodeAtNode(l), void 0, !0, !0)
              );
            if (m(d))
              if (this.lookaheadCharCode() === 61) {
                const v = this.parseIdent(!1);
                return (
                  (this.canInsertSemicolon() || !this.eat(n.arrow)) &&
                    this.unexpected(),
                  this.parseArrowExpression(this.startNodeAtNode(l), [v], !0)
                );
              } else return l;
          }
          return r && this.match(n.arrow) && !this.canInsertSemicolon()
            ? (this.next(),
              this.parseArrowExpression(this.startNodeAtNode(l), [l], !1))
            : l;
        } else this.unexpected();
      }
      parseIdentNode() {
        let r = this.startNode();
        if (
          x(this.type) &&
          !(
            (this.type.keyword === "class" ||
              this.type.keyword === "function") &&
            (this.lastTokEnd !== this.lastTokStart + 1 ||
              this.input.charCodeAt(this.lastTokStart) !== 46)
          )
        )
          r.name = this.value;
        else return super.parseIdentNode();
        return r;
      }
      parseVarStatement(r, i, l = !1) {
        const { isAmbientContext: d } = this;
        (this.next(), super.parseVar(r, !1, i, l || d), this.semicolon());
        const v = this.finishNode(r, "VariableDeclaration");
        if (!d) return v;
        for (const { id: P, init: w } of v.declarations)
          w &&
            (i !== "const" || P.typeAnnotation
              ? this.raise(w.start, j.InitializerNotAllowedInAmbientContext)
              : w.type !== "StringLiteral" &&
                w.type !== "BooleanLiteral" &&
                w.type !== "NumericLiteral" &&
                w.type !== "BigIntLiteral" &&
                (w.type !== "TemplateLiteral" || w.expressions.length > 0) &&
                !u1(w) &&
                this.raise(
                  w.start,
                  j.ConstInitiailizerMustBeStringOrNumericLiteralOrLiteralEnumReference,
                ));
        return v;
      }
      parseStatement(r, i, l) {
        if (
          (this.match(k.at) && this.parseDecorators(!0),
          this.match(n._const) && this.isLookaheadContextual("enum"))
        ) {
          const d = this.startNode();
          return (
            this.expect(n._const),
            this.tsParseEnumDeclaration(d, { const: !0 })
          );
        }
        if (this.ts_isContextual(k.enum))
          return this.tsParseEnumDeclaration(this.startNode());
        if (this.ts_isContextual(k.interface)) {
          const d = this.tsParseInterfaceDeclaration(this.startNode());
          if (d) return d;
        }
        return super.parseStatement(r, i, l);
      }
      parseAccessModifier() {
        return this.tsParseModifier(["public", "protected", "private"]);
      }
      parsePostMemberNameModifiers(r) {
        (this.eat(n.question) && (r.optional = !0),
          r.readonly &&
            this.match(n.parenL) &&
            this.raise(r.start, j.ClassMethodHasReadonly),
          r.declare &&
            this.match(n.parenL) &&
            this.raise(r.start, j.ClassMethodHasDeclare));
      }
      parseExpressionStatement(r, i) {
        return (
          (i.type === "Identifier"
            ? this.tsParseExpressionStatement(r, i)
            : void 0) || super.parseExpressionStatement(r, i)
        );
      }
      shouldParseExportStatement() {
        return this.tsIsDeclarationStart() || this.match(k.at)
          ? !0
          : super.shouldParseExportStatement();
      }
      parseConditional(r, i, l, d, v) {
        if (this.eat(n.question)) {
          let P = this.startNodeAt(i, l);
          return (
            (P.test = r),
            (P.consequent = this.parseMaybeAssign()),
            this.expect(n.colon),
            (P.alternate = this.parseMaybeAssign(d)),
            this.finishNode(P, "ConditionalExpression")
          );
        }
        return r;
      }
      parseMaybeConditional(r, i) {
        let l = this.start,
          d = this.startLoc,
          v = this.parseExprOps(r, i);
        if (this.checkExpressionErrors(i)) return v;
        if (!this.maybeInArrowParameters || !this.match(n.question))
          return this.parseConditional(v, l, d, r, i);
        const P = this.tryParse(() => this.parseConditional(v, l, d, r, i));
        return P.node
          ? (P.error && this.setLookaheadState(P.failState), P.node)
          : (P.error && this.setOptionalParametersError(i, P.error), v);
      }
      parseParenItem(r) {
        const i = this.start,
          l = this.startLoc;
        if (
          ((r = super.parseParenItem(r)),
          this.eat(n.question) && ((r.optional = !0), this.resetEndLocation(r)),
          this.match(n.colon))
        ) {
          const d = this.startNodeAt(i, l);
          return (
            (d.expression = r),
            (d.typeAnnotation = this.tsParseTypeAnnotation()),
            this.finishNode(d, "TSTypeCastExpression")
          );
        }
        return r;
      }
      parseExportDeclaration(r) {
        if (!this.isAmbientContext && this.ts_isContextual(k.declare))
          return this.tsInAmbientContext(() => this.parseExportDeclaration(r));
        const i = this.start,
          l = this.startLoc,
          d = this.eatContextual("declare");
        d &&
          (this.ts_isContextual(k.declare) ||
            !this.shouldParseExportStatement()) &&
          this.raise(this.start, j.ExpectedAmbientAfterExportDeclare);
        const P =
          (m(this.type) && this.tsTryParseExportDeclaration()) ||
          this.parseStatement(null);
        return P
          ? ((P.type === "TSInterfaceDeclaration" ||
              P.type === "TSTypeAliasDeclaration" ||
              d) &&
              (r.exportKind = "type"),
            d && (this.resetStartLocation(P, i, l), (P.declare = !0)),
            P)
          : null;
      }
      parseClassId(r, i) {
        if (!i && this.isContextual("implements")) return;
        super.parseClassId(r, i);
        const l = this.tsTryParseTypeParameters(
          this.tsParseInOutModifiers.bind(this),
        );
        l && (r.typeParameters = l);
      }
      parseClassPropertyAnnotation(r) {
        r.optional ||
          (this.value === "!" && this.eat(n.prefix)
            ? (r.definite = !0)
            : this.eat(n.question) && (r.optional = !0));
        const i = this.tsTryParseTypeAnnotation();
        i && (r.typeAnnotation = i);
      }
      parseClassField(r) {
        if (r.key.type === "PrivateIdentifier")
          (r.abstract && this.raise(r.start, j.PrivateElementHasAbstract),
            r.accessibility &&
              this.raise(
                r.start,
                j.PrivateElementHasAccessibility({ modifier: r.accessibility }),
              ),
            this.parseClassPropertyAnnotation(r));
        else if (
          (this.parseClassPropertyAnnotation(r),
          this.isAmbientContext &&
            !(r.readonly && !r.typeAnnotation) &&
            this.match(n.eq) &&
            this.raise(this.start, j.DeclareClassFieldHasInitializer),
          r.abstract && this.match(n.eq))
        ) {
          const { key: l } = r;
          this.raise(
            this.start,
            j.AbstractPropertyHasInitializer({
              propertyName:
                l.type === "Identifier" && !r.computed
                  ? l.name
                  : `[${this.input.slice(l.start, l.end)}]`,
            }),
          );
        }
        return super.parseClassField(r);
      }
      parseClassMethod(r, i, l, d) {
        const v = r.kind === "constructor",
          P = r.key.type === "PrivateIdentifier",
          w = this.tsTryParseTypeParameters(this.tsParseConstModifier);
        P
          ? (w && (r.typeParameters = w),
            r.accessibility &&
              this.raise(
                r.start,
                j.PrivateMethodsHasAccessibility({ modifier: r.accessibility }),
              ))
          : w && v && this.raise(w.start, j.ConstructorHasTypeParameters);
        const { declare: D = !1, kind: N } = r;
        (D &&
          (N === "get" || N === "set") &&
          this.raise(r.start, j.DeclareAccessor({ kind: N })),
          w && (r.typeParameters = w));
        const E = r.key;
        r.kind === "constructor"
          ? (i && this.raise(E.start, "Constructor can't be a generator"),
            l && this.raise(E.start, "Constructor can't be an async method"))
          : r.static &&
            gl(r, "prototype") &&
            this.raise(
              E.start,
              "Classes may not have a static property named prototype",
            );
        const H = (r.value = this.parseMethod(i, l, d, !0, r));
        return (
          r.kind === "get" &&
            H.params.length !== 0 &&
            this.raiseRecoverable(H.start, "getter should have no params"),
          r.kind === "set" &&
            H.params.length !== 1 &&
            this.raiseRecoverable(
              H.start,
              "setter should have exactly one param",
            ),
          r.kind === "set" &&
            H.params[0].type === "RestElement" &&
            this.raiseRecoverable(
              H.params[0].start,
              "Setter cannot use rest params",
            ),
          this.finishNode(r, "MethodDefinition")
        );
      }
      isClassMethod() {
        return this.match(n.relational);
      }
      parseClassElement(r) {
        if (this.eat(n.semi)) return null;
        let i = this.startNode(),
          l = "",
          d = !1,
          v = !1,
          P = "method",
          w = !1;
        const D = [
          "declare",
          "private",
          "public",
          "protected",
          "accessor",
          "override",
          "abstract",
          "readonly",
          "static",
        ];
        w = !!this.tsParseModifiers({
          modified: i,
          allowedModifiers: D,
          disallowedModifiers: ["in", "out"],
          stopOnStartOfClassStaticBlock: !0,
          errorTemplate: j.InvalidModifierOnTypeParameterPositions,
        }).static;
        const E = () => {
          if (this.tsIsStartOfStaticBlocks()) {
            if (
              (this.next(),
              this.next(),
              this.tsHasSomeModifiers(i, D) &&
                this.raise(this.start, j.StaticBlockCannotHaveModifier),
              this.ecmaVersion >= 13)
            )
              return (super.parseClassStaticBlock(i), i);
          } else {
            const H = this.tsTryParseIndexSignature(i);
            if (H)
              return (
                i.abstract && this.raise(i.start, j.IndexSignatureHasAbstract),
                i.accessibility &&
                  this.raise(
                    i.start,
                    j.IndexSignatureHasAccessibility({
                      modifier: i.accessibility,
                    }),
                  ),
                i.declare && this.raise(i.start, j.IndexSignatureHasDeclare),
                i.override && this.raise(i.start, j.IndexSignatureHasOverride),
                H
              );
            if (
              (!this.inAbstractClass &&
                i.abstract &&
                this.raise(i.start, j.NonAbstractClassHasAbstractMethod),
              i.override && (r || this.raise(i.start, j.OverrideNotInSubClass)),
              (i.static = w),
              w &&
                (this.isClassElementNameStart() ||
                  this.type === n.star ||
                  (l = "static")),
              !l &&
                this.ecmaVersion >= 8 &&
                this.eatContextual("async") &&
                ((this.isClassElementNameStart() || this.type === n.star) &&
                !this.canInsertSemicolon()
                  ? (v = !0)
                  : (l = "async")),
              !l &&
                (this.ecmaVersion >= 9 || !v) &&
                this.eat(n.star) &&
                (d = !0),
              !l && !v && !d)
            ) {
              const X = this.value;
              (this.eatContextual("get") || this.eatContextual("set")) &&
                (this.isClassElementNameStart() ? (P = X) : (l = X));
            }
            if (
              (l
                ? ((i.computed = !1),
                  (i.key = this.startNodeAt(
                    this.lastTokStart,
                    this.lastTokStartLoc,
                  )),
                  (i.key.name = l),
                  this.finishNode(i.key, "Identifier"))
                : this.parseClassElementName(i),
              this.parsePostMemberNameModifiers(i),
              this.isClassMethod() ||
                this.ecmaVersion < 13 ||
                this.type === n.parenL ||
                P !== "method" ||
                d ||
                v)
            ) {
              const X = !i.static && gl(i, "constructor"),
                K = X && r;
              (X &&
                P !== "method" &&
                this.raise(
                  i.key.start,
                  "Constructor can't have get/set modifier",
                ),
                (i.kind = X ? "constructor" : P),
                this.parseClassMethod(i, d, v, K));
            } else this.parseClassField(i);
            return i;
          }
        };
        return (i.declare ? this.tsInAmbientContext(E) : E(), i);
      }
      isClassElementNameStart() {
        return this.tsIsIdentifier() ? !0 : super.isClassElementNameStart();
      }
      parseClassSuper(r) {
        (super.parseClassSuper(r),
          r.superClass &&
            (this.tsMatchLeftRelational() || this.match(n.bitShift)) &&
            (r.superTypeParameters = this.tsParseTypeArgumentsInExpression()),
          this.eatContextual("implements") &&
            (r.implements = this.tsParseHeritageClause("implements")));
      }
      parseFunctionParams(r) {
        const i = this.tsTryParseTypeParameters(this.tsParseConstModifier);
        (i && (r.typeParameters = i), super.parseFunctionParams(r));
      }
      parseVarId(r, i) {
        (super.parseVarId(r, i),
          r.id.type === "Identifier" &&
            !this.hasPrecedingLineBreak() &&
            this.value === "!" &&
            this.eat(n.prefix) &&
            (r.definite = !0));
        const l = this.tsTryParseTypeAnnotation();
        l && ((r.id.typeAnnotation = l), this.resetEndLocation(r.id));
      }
      parseArrowExpression(r, i, l, d) {
        this.match(n.colon) && (r.returnType = this.tsParseTypeAnnotation());
        let v = this.yieldPos,
          P = this.awaitPos,
          w = this.awaitIdentPos;
        (this.enterScope(Vo(l, !1) | Y.SCOPE_ARROW), this.initFunction(r));
        const D = this.maybeInArrowParameters;
        return (
          this.ecmaVersion >= 8 && (r.async = !!l),
          (this.yieldPos = 0),
          (this.awaitPos = 0),
          (this.awaitIdentPos = 0),
          (this.maybeInArrowParameters = !0),
          (r.params = this.toAssignableList(i, !0)),
          (this.maybeInArrowParameters = !1),
          this.parseFunctionBody(r, !0, !1, d),
          (this.yieldPos = v),
          (this.awaitPos = P),
          (this.awaitIdentPos = w),
          (this.maybeInArrowParameters = D),
          this.finishNode(r, "ArrowFunctionExpression")
        );
      }
      parseMaybeAssignOrigin(r, i, l) {
        if (this.isContextual("yield")) {
          if (this.inGenerator) return this.parseYield(r);
          this.exprAllowed = !1;
        }
        let d = !1,
          v = -1,
          P = -1,
          w = -1;
        i
          ? ((v = i.parenthesizedAssign),
            (P = i.trailingComma),
            (w = i.doubleProto),
            (i.parenthesizedAssign = i.trailingComma = -1))
          : ((i = new Ye()), (d = !0));
        let D = this.start,
          N = this.startLoc;
        (this.type === n.parenL || m(this.type)) &&
          ((this.potentialArrowAt = this.start),
          (this.potentialArrowInForAwait = r === "await"));
        let E = this.parseMaybeConditional(r, i);
        if ((l && (E = l.call(this, E, D, N)), this.type.isAssign)) {
          let H = this.startNodeAt(D, N);
          return (
            (H.operator = this.value),
            this.type === n.eq && (E = this.toAssignable(E, !0, i)),
            d || (i.parenthesizedAssign = i.trailingComma = i.doubleProto = -1),
            i.shorthandAssign >= E.start && (i.shorthandAssign = -1),
            this.maybeInArrowParameters ||
              (this.type === n.eq
                ? this.checkLValPattern(E)
                : this.checkLValSimple(E)),
            (H.left = E),
            this.next(),
            (H.right = this.parseMaybeAssign(r)),
            w > -1 && (i.doubleProto = w),
            this.finishNode(H, "AssignmentExpression")
          );
        } else d && this.checkExpressionErrors(i, !0);
        return (
          v > -1 && (i.parenthesizedAssign = v),
          P > -1 && (i.trailingComma = P),
          E
        );
      }
      parseMaybeAssign(r, i, l) {
        let d, v;
        if (!this.tsMatchLeftRelational())
          return this.parseMaybeAssignOrigin(r, i, l);
        (!d || this.compareLookaheadState(d, this.getCurLookaheadState())) &&
          (d = this.cloneCurLookaheadState());
        let P;
        const w = this.tryParse((D) => {
          var E;
          P = this.tsParseTypeParameters(this.tsParseConstModifier);
          const N = this.parseMaybeAssignOrigin(r, i, l);
          return (
            (N.type !== "ArrowFunctionExpression" ||
              ((E = N.extra) != null && E.parenthesized)) &&
              D(),
            (P == null ? void 0 : P.params.length) !== 0 &&
              this.resetStartLocationFromNode(N, P),
            (N.typeParameters = P),
            N
          );
        }, d);
        if (!w.error && !w.aborted)
          return (P && this.reportReservedArrowTypeParam(P), w.node);
        if (
          (xl(!0),
          (v = this.tryParse(() => this.parseMaybeAssignOrigin(r, i, l), d)),
          !v.error)
        )
          return v.node;
        if (w.node)
          return (
            this.setLookaheadState(w.failState),
            P && this.reportReservedArrowTypeParam(P),
            w.node
          );
        if (v != null && v.node)
          return (this.setLookaheadState(v.failState), v.node);
        throw w.thrown
          ? w.error
          : v != null && v.thrown
            ? v.error
            : w.error || (v == null ? void 0 : v.error);
      }
      parseAssignableListItem(r) {
        const i = [];
        for (; this.match(k.at); ) i.push(this.parseDecorator());
        const l = this.start,
          d = this.startLoc;
        let v,
          P = !1,
          w = !1;
        if (r !== void 0) {
          const E = {};
          (this.tsParseModifiers({
            modified: E,
            allowedModifiers: [
              "public",
              "private",
              "protected",
              "override",
              "readonly",
            ],
          }),
            (v = E.accessibility),
            (w = E.override),
            (P = E.readonly),
            r === !1 &&
              (v || P || w) &&
              this.raise(d.column, j.UnexpectedParameterModifier));
        }
        const D = this.parseMaybeDefault(l, d);
        this.parseBindingListItem(D);
        const N = this.parseMaybeDefault(D.start, D.loc, D);
        if ((i.length && (N.decorators = i), v || P || w)) {
          const E = this.startNodeAt(l, d);
          return (
            v && (E.accessibility = v),
            P && (E.readonly = P),
            w && (E.override = w),
            N.type !== "Identifier" &&
              N.type !== "AssignmentPattern" &&
              this.raise(E.start, j.UnsupportedParameterPropertyKind),
            (E.parameter = N),
            this.finishNode(E, "TSParameterProperty")
          );
        }
        return N;
      }
      checkLValInnerPattern(r, i = Y.BIND_NONE, l) {
        switch (r.type) {
          case "TSParameterProperty":
            this.checkLValInnerPattern(r.parameter, i, l);
            break;
          default: {
            super.checkLValInnerPattern(r, i, l);
            break;
          }
        }
      }
      parseBindingListItem(r) {
        this.eat(n.question) &&
          (r.type !== "Identifier" &&
            !this.isAmbientContext &&
            !this.inType &&
            this.raise(r.start, j.PatternIsOptional),
          (r.optional = !0));
        const i = this.tsTryParseTypeAnnotation();
        return (i && (r.typeAnnotation = i), this.resetEndLocation(r), r);
      }
      isAssignable(r, i) {
        switch (r.type) {
          case "TSTypeCastExpression":
            return this.isAssignable(r.expression, i);
          case "TSParameterProperty":
            return !0;
          case "Identifier":
          case "ObjectPattern":
          case "ArrayPattern":
          case "AssignmentPattern":
          case "RestElement":
            return !0;
          case "ObjectExpression": {
            const l = r.properties.length - 1;
            return r.properties.every(
              (d, v) =>
                d.type !== "ObjectMethod" &&
                (v === l || d.type !== "SpreadElement") &&
                this.isAssignable(d),
            );
          }
          case "Property":
          case "ObjectProperty":
            return this.isAssignable(r.value);
          case "SpreadElement":
            return this.isAssignable(r.argument);
          case "ArrayExpression":
            return r.elements.every((l) => l === null || this.isAssignable(l));
          case "AssignmentExpression":
            return r.operator === "=";
          case "ParenthesizedExpression":
            return this.isAssignable(r.expression);
          case "MemberExpression":
          case "OptionalMemberExpression":
            return !i;
          default:
            return !1;
        }
      }
      toAssignable(r, i = !1, l = new Ye()) {
        switch (r.type) {
          case "ParenthesizedExpression":
            return this.toAssignableParenthesizedExpression(r, i, l);
          case "TSAsExpression":
          case "TSSatisfiesExpression":
          case "TSNonNullExpression":
          case "TSTypeAssertion":
            return (
              i || this.raise(r.start, j.UnexpectedTypeCastInParameter),
              this.toAssignable(r.expression, i, l)
            );
          case "MemberExpression":
            break;
          case "AssignmentExpression":
            return (
              !i &&
                r.left.type === "TSTypeCastExpression" &&
                (r.left = this.typeCastToParameter(r.left)),
              super.toAssignable(r, i, l)
            );
          case "TSTypeCastExpression":
            return this.typeCastToParameter(r);
          default:
            return super.toAssignable(r, i, l);
        }
        return r;
      }
      toAssignableParenthesizedExpression(r, i, l) {
        switch (r.expression.type) {
          case "TSAsExpression":
          case "TSSatisfiesExpression":
          case "TSNonNullExpression":
          case "TSTypeAssertion":
          case "ParenthesizedExpression":
            return this.toAssignable(r.expression, i, l);
          default:
            return super.toAssignable(r, i, l);
        }
      }
      parseBindingAtom() {
        switch (this.type) {
          case n._this:
            return this.parseIdent(!0);
          default:
            return super.parseBindingAtom();
        }
      }
      shouldParseArrow(r) {
        let i;
        if (
          (this.match(n.colon)
            ? (i = r.every((l) => this.isAssignable(l, !0)))
            : (i = !this.canInsertSemicolon()),
          i)
        ) {
          if (this.match(n.colon)) {
            const l = this.tryParse((d) => {
              const v = this.tsParseTypeOrTypePredicateAnnotation(n.colon);
              return (
                (this.canInsertSemicolon() || !this.match(n.arrow)) && d(),
                v
              );
            });
            if (l.aborted)
              return ((this.shouldParseArrowReturnType = void 0), !1);
            l.thrown ||
              (l.error && this.setLookaheadState(l.failState),
              (this.shouldParseArrowReturnType = l.node));
          }
          return this.match(n.arrow)
            ? !0
            : ((this.shouldParseArrowReturnType = void 0), !1);
        }
        return ((this.shouldParseArrowReturnType = void 0), i);
      }
      parseParenArrowList(r, i, l, d) {
        const v = this.startNodeAt(r, i);
        return (
          (v.returnType = this.shouldParseArrowReturnType),
          (this.shouldParseArrowReturnType = void 0),
          this.parseArrowExpression(v, l, !1, d)
        );
      }
      parseParenAndDistinguishExpression(r, i) {
        let l = this.start,
          d = this.startLoc,
          v,
          P = this.ecmaVersion >= 8;
        if (this.ecmaVersion >= 6) {
          const w = this.maybeInArrowParameters;
          ((this.maybeInArrowParameters = !0), this.next());
          let D = this.start,
            N = this.startLoc,
            E = [],
            H = !0,
            X = !1,
            K = new Ye(),
            ie = this.yieldPos,
            se = this.awaitPos,
            ne;
          for (this.yieldPos = 0, this.awaitPos = 0; this.type !== n.parenR; )
            if (
              (H ? (H = !1) : this.expect(n.comma),
              P && this.afterTrailingComma(n.parenR, !0))
            ) {
              X = !0;
              break;
            } else if (this.type === n.ellipsis) {
              ((ne = this.start),
                E.push(this.parseParenItem(this.parseRestBinding())),
                this.type === n.comma &&
                  this.raise(
                    this.start,
                    "Comma is not permitted after the rest element",
                  ));
              break;
            } else E.push(this.parseMaybeAssign(i, K, this.parseParenItem));
          let V = this.lastTokEnd,
            ae = this.lastTokEndLoc;
          if (
            (this.expect(n.parenR),
            (this.maybeInArrowParameters = w),
            r && this.shouldParseArrow(E) && this.eat(n.arrow))
          )
            return (
              this.checkPatternErrors(K, !1),
              this.checkYieldAwaitInDefaultParams(),
              (this.yieldPos = ie),
              (this.awaitPos = se),
              this.parseParenArrowList(l, d, E, i)
            );
          ((!E.length || X) && this.unexpected(this.lastTokStart),
            ne && this.unexpected(ne),
            this.checkExpressionErrors(K, !0),
            (this.yieldPos = ie || this.yieldPos),
            (this.awaitPos = se || this.awaitPos),
            E.length > 1
              ? ((v = this.startNodeAt(D, N)),
                (v.expressions = E),
                this.finishNodeAt(v, "SequenceExpression", V, ae))
              : (v = E[0]));
        } else v = this.parseParenExpression();
        if (this.options.preserveParens) {
          let w = this.startNodeAt(l, d);
          return (
            (w.expression = v),
            this.finishNode(w, "ParenthesizedExpression")
          );
        } else return v;
      }
      parseTaggedTemplateExpression(r, i, l, d) {
        const v = this.startNodeAt(i, l);
        return (
          (v.tag = r),
          (v.quasi = this.parseTemplate({ isTagged: !0 })),
          d &&
            this.raise(
              i,
              "Tagged Template Literals are not allowed in optionalChain.",
            ),
          this.finishNode(v, "TaggedTemplateExpression")
        );
      }
      shouldParseAsyncArrow() {
        if (this.match(n.colon)) {
          const r = this.tryParse((i) => {
            const l = this.tsParseTypeOrTypePredicateAnnotation(n.colon);
            return (
              (this.canInsertSemicolon() || !this.match(n.arrow)) && i(),
              l
            );
          });
          if (r.aborted)
            return ((this.shouldParseAsyncArrowReturnType = void 0), !1);
          if (!r.thrown)
            return (
              r.error && this.setLookaheadState(r.failState),
              (this.shouldParseAsyncArrowReturnType = r.node),
              !this.canInsertSemicolon() && this.eat(n.arrow)
            );
        } else return !this.canInsertSemicolon() && this.eat(n.arrow);
      }
      parseSubscriptAsyncArrow(r, i, l, d) {
        const v = this.startNodeAt(r, i);
        return (
          (v.returnType = this.shouldParseAsyncArrowReturnType),
          (this.shouldParseAsyncArrowReturnType = void 0),
          this.parseArrowExpression(v, l, !0, d)
        );
      }
      parseExprList(r, i, l, d) {
        let v = [],
          P = !0;
        for (; !this.eat(r); ) {
          if (P) P = !1;
          else if ((this.expect(n.comma), i && this.afterTrailingComma(r)))
            break;
          let w;
          (l && this.type === n.comma
            ? (w = null)
            : this.type === n.ellipsis
              ? ((w = this.parseSpread(d)),
                this.maybeInArrowParameters &&
                  this.match(n.colon) &&
                  (w.typeAnnotation = this.tsParseTypeAnnotation()),
                d &&
                  this.type === n.comma &&
                  d.trailingComma < 0 &&
                  (d.trailingComma = this.start))
              : (w = this.parseMaybeAssign(!1, d, this.parseParenItem)),
            v.push(w));
        }
        return v;
      }
      parseSubscript(r, i, l, d, v, P, w) {
        let D = P;
        if (
          !this.hasPrecedingLineBreak() &&
          this.value === "!" &&
          this.match(n.prefix)
        ) {
          ((this.exprAllowed = !1), this.next());
          const K = this.startNodeAt(i, l);
          return (
            (K.expression = r),
            (r = this.finishNode(K, "TSNonNullExpression")),
            r
          );
        }
        let N = !1;
        if (this.match(n.questionDot) && this.lookaheadCharCode() === 60) {
          if (d) return r;
          ((r.optional = !0), (D = N = !0), this.next());
        }
        if (this.tsMatchLeftRelational() || this.match(n.bitShift)) {
          let K;
          const ie = this.tsTryParseAndCatch(() => {
            if (!d && this.atPossibleAsyncArrow(r)) {
              const ae = this.tsTryParseGenericAsyncArrowFunction(i, l, w);
              if (ae) return ((r = ae), r);
            }
            const se = this.tsParseTypeArgumentsInExpression();
            if (!se) return r;
            if (N && !this.match(n.parenL))
              return ((K = this.curPosition()), r);
            if (h(this.type) || this.type === n.backQuote) {
              const ae = this.parseTaggedTemplateExpression(r, i, l, D);
              return ((ae.typeArguments = se), ae);
            }
            if (!d && this.eat(n.parenL)) {
              let ae = new Ye();
              const te = this.startNodeAt(i, l);
              return (
                (te.callee = r),
                (te.arguments = this.parseExprList(
                  n.parenR,
                  this.ecmaVersion >= 8,
                  !1,
                  ae,
                )),
                this.tsCheckForInvalidTypeCasts(te.arguments),
                (te.typeArguments = se),
                D && (te.optional = N),
                this.checkExpressionErrors(ae, !0),
                (r = this.finishNode(te, "CallExpression")),
                r
              );
            }
            const ne = this.type;
            if (
              this.tsMatchRightRelational() ||
              ne === n.bitShift ||
              (ne !== n.parenL && c1(ne) && !this.hasPrecedingLineBreak())
            )
              return;
            const V = this.startNodeAt(i, l);
            return (
              (V.expression = r),
              (V.typeArguments = se),
              this.finishNode(V, "TSInstantiationExpression")
            );
          });
          if ((K && this.unexpected(K), ie))
            return (
              ie.type === "TSInstantiationExpression" &&
                (this.match(n.dot) ||
                  (this.match(n.questionDot) &&
                    this.lookaheadCharCode() !== 40)) &&
                this.raise(
                  this.start,
                  j.InvalidPropertyAccessAfterInstantiationExpression,
                ),
              (r = ie),
              r
            );
        }
        let E = this.ecmaVersion >= 11,
          H = E && this.eat(n.questionDot);
        d &&
          H &&
          this.raise(
            this.lastTokStart,
            "Optional chaining cannot appear in the callee of new expressions",
          );
        let X = this.eat(n.bracketL);
        if (
          X ||
          (H && this.type !== n.parenL && this.type !== n.backQuote) ||
          this.eat(n.dot)
        ) {
          let K = this.startNodeAt(i, l);
          ((K.object = r),
            X
              ? ((K.property = this.parseExpression()), this.expect(n.bracketR))
              : this.type === n.privateId && r.type !== "Super"
                ? (K.property = this.parsePrivateIdent())
                : (K.property = this.parseIdent(
                    this.options.allowReserved !== "never",
                  )),
            (K.computed = !!X),
            E && (K.optional = H),
            (r = this.finishNode(K, "MemberExpression")));
        } else if (!d && this.eat(n.parenL)) {
          const K = this.maybeInArrowParameters;
          this.maybeInArrowParameters = !0;
          let ie = new Ye(),
            se = this.yieldPos,
            ne = this.awaitPos,
            V = this.awaitIdentPos;
          ((this.yieldPos = 0), (this.awaitPos = 0), (this.awaitIdentPos = 0));
          let ae = this.parseExprList(n.parenR, this.ecmaVersion >= 8, !1, ie);
          if (v && !H && this.shouldParseAsyncArrow())
            (this.checkPatternErrors(ie, !1),
              this.checkYieldAwaitInDefaultParams(),
              this.awaitIdentPos > 0 &&
                this.raise(
                  this.awaitIdentPos,
                  "Cannot use 'await' as identifier inside an async function",
                ),
              (this.yieldPos = se),
              (this.awaitPos = ne),
              (this.awaitIdentPos = V),
              (r = this.parseSubscriptAsyncArrow(i, l, ae, w)));
          else {
            (this.checkExpressionErrors(ie, !0),
              (this.yieldPos = se || this.yieldPos),
              (this.awaitPos = ne || this.awaitPos),
              (this.awaitIdentPos = V || this.awaitIdentPos));
            let te = this.startNodeAt(i, l);
            ((te.callee = r),
              (te.arguments = ae),
              E && (te.optional = H),
              (r = this.finishNode(te, "CallExpression")));
          }
          this.maybeInArrowParameters = K;
        } else if (this.type === n.backQuote) {
          (H || D) &&
            this.raise(
              this.start,
              "Optional chaining cannot appear in the tag of tagged template expressions",
            );
          let K = this.startNodeAt(i, l);
          ((K.tag = r),
            (K.quasi = this.parseTemplate({ isTagged: !0 })),
            (r = this.finishNode(K, "TaggedTemplateExpression")));
        }
        return r;
      }
      parseGetterSetter(r) {
        ((r.kind = r.key.name),
          this.parsePropertyName(r),
          (r.value = this.parseMethod(!1)));
        let i = r.kind === "get" ? 0 : 1;
        const l = r.value.params[0];
        if (
          ((i = l && this.isThisParam(l) ? i + 1 : i),
          r.value.params.length !== i)
        ) {
          let v = r.value.start;
          r.kind === "get"
            ? this.raiseRecoverable(v, "getter should have no params")
            : this.raiseRecoverable(v, "setter should have exactly one param");
        } else
          r.kind === "set" &&
            r.value.params[0].type === "RestElement" &&
            this.raiseRecoverable(
              r.value.params[0].start,
              "Setter cannot use rest params",
            );
      }
      parseProperty(r, i) {
        if (!r) {
          let l = [];
          if (this.match(k.at))
            for (; this.match(k.at); ) l.push(this.parseDecorator());
          const d = super.parseProperty(r, i);
          return (
            d.type === "SpreadElement" &&
              l.length &&
              this.raise(d.start, Sn.SpreadElementDecorator),
            l.length && ((d.decorators = l), (l = [])),
            d
          );
        }
        return super.parseProperty(r, i);
      }
      parseCatchClauseParam() {
        const r = this.parseBindingAtom();
        let i = r.type === "Identifier";
        (this.enterScope(i ? Y.SCOPE_SIMPLE_CATCH : 0),
          this.checkLValPattern(r, i ? Y.BIND_SIMPLE_CATCH : Y.BIND_LEXICAL));
        const l = this.tsTryParseTypeAnnotation();
        return (
          l && ((r.typeAnnotation = l), this.resetEndLocation(r)),
          this.expect(n.parenR),
          r
        );
      }
      parseClass(r, i) {
        const l = this.inAbstractClass;
        this.inAbstractClass = !!r.abstract;
        try {
          (this.next(), this.takeDecorators(r));
          const d = this.strict;
          ((this.strict = !0),
            this.parseClassId(r, i),
            this.parseClassSuper(r));
          const v = this.enterClassBody(),
            P = this.startNode();
          let w = !1;
          P.body = [];
          let D = [];
          for (this.expect(n.braceL); this.type !== n.braceR; ) {
            if (this.match(k.at)) {
              D.push(this.parseDecorator());
              continue;
            }
            const N = this.parseClassElement(r.superClass !== null);
            (D.length &&
              ((N.decorators = D),
              this.resetStartLocationFromNode(N, D[0]),
              (D = [])),
              N &&
                (P.body.push(N),
                N.type === "MethodDefinition" &&
                N.kind === "constructor" &&
                N.value.type === "FunctionExpression"
                  ? (w &&
                      this.raiseRecoverable(
                        N.start,
                        "Duplicate constructor in the same class",
                      ),
                    (w = !0),
                    N.decorators &&
                      N.decorators.length > 0 &&
                      this.raise(N.start, Sn.DecoratorConstructor))
                  : N.key &&
                    N.key.type === "PrivateIdentifier" &&
                    a1(v, N) &&
                    this.raiseRecoverable(
                      N.key.start,
                      `Identifier '#${N.key.name}' has already been declared`,
                    )));
          }
          return (
            (this.strict = d),
            this.next(),
            D.length && this.raise(this.start, Sn.TrailingDecorator),
            (r.body = this.finishNode(P, "ClassBody")),
            this.exitClassBody(),
            this.finishNode(r, i ? "ClassDeclaration" : "ClassExpression")
          );
        } finally {
          this.inAbstractClass = l;
        }
      }
      parseClassFunctionParams() {
        const r = this.tsTryParseTypeParameters();
        let i = this.parseBindingList(n.parenR, !1, this.ecmaVersion >= 8, !0);
        return (r && (i.typeParameters = r), i);
      }
      parseMethod(r, i, l, d, v) {
        let P = this.startNode(),
          w = this.yieldPos,
          D = this.awaitPos,
          N = this.awaitIdentPos;
        if (
          (this.initFunction(P),
          this.ecmaVersion >= 6 && (P.generator = r),
          this.ecmaVersion >= 8 && (P.async = !!i),
          (this.yieldPos = 0),
          (this.awaitPos = 0),
          (this.awaitIdentPos = 0),
          this.enterScope(
            Vo(i, P.generator) | Y.SCOPE_SUPER | (l ? Y.SCOPE_DIRECT_SUPER : 0),
          ),
          this.expect(n.parenL),
          (P.params = this.parseClassFunctionParams()),
          this.checkYieldAwaitInDefaultParams(),
          this.parseFunctionBody(P, !1, !0, !1, { isClassMethod: d }),
          (this.yieldPos = w),
          (this.awaitPos = D),
          (this.awaitIdentPos = N),
          v && v.abstract && !!P.body)
        ) {
          const { key: H } = v;
          this.raise(
            v.start,
            j.AbstractMethodHasImplementation({
              methodName:
                H.type === "Identifier" && !v.computed
                  ? H.name
                  : `[${this.input.slice(H.start, H.end)}]`,
            }),
          );
        }
        return this.finishNode(P, "FunctionExpression");
      }
      static parse(r, i) {
        if (i.locations === !1)
          throw new Error(
            "You have to enable options.locations while using acorn-typescript",
          );
        i.locations = !0;
        const l = new this(i, r);
        return (t && (l.isAmbientContext = !0), l.parse());
      }
      static parseExpressionAt(r, i, l) {
        if (l.locations === !1)
          throw new Error(
            "You have to enable options.locations while using acorn-typescript",
          );
        l.locations = !0;
        const d = new this(l, r, i);
        return (
          t && (d.isAmbientContext = !0),
          d.nextToken(),
          d.parseExpression()
        );
      }
      parseImportSpecifier() {
        if (this.ts_isContextual(k.type)) {
          let i = this.startNode();
          return (
            (i.imported = this.parseModuleExportName()),
            this.parseTypeOnlyImportExportSpecifier(
              i,
              !0,
              this.importOrExportOuterKind === "type",
            ),
            this.finishNode(i, "ImportSpecifier")
          );
        } else {
          const i = super.parseImportSpecifier();
          return ((i.importKind = "value"), i);
        }
      }
      parseExportSpecifier(r) {
        const i = this.ts_isContextual(k.type);
        if (!this.match(n.string) && i) {
          let d = this.startNode();
          return (
            (d.local = this.parseModuleExportName()),
            this.parseTypeOnlyImportExportSpecifier(
              d,
              !1,
              this.importOrExportOuterKind === "type",
            ),
            this.finishNode(d, "ExportSpecifier"),
            this.checkExport(r, d.exported, d.exported.start),
            d
          );
        } else {
          const d = super.parseExportSpecifier(r);
          return ((d.exportKind = "value"), d);
        }
      }
      parseTypeOnlyImportExportSpecifier(r, i, l) {
        const d = i ? "imported" : "local",
          v = i ? "local" : "exported";
        let P = r[d],
          w,
          D = !1,
          N = !0;
        const E = P.start;
        if (this.isContextual("as")) {
          const X = this.parseIdent();
          if (this.isContextual("as")) {
            const K = this.parseIdent();
            x(this.type)
              ? ((D = !0),
                (P = X),
                (w = i ? this.parseIdent() : this.parseModuleExportName()),
                (N = !1))
              : ((w = K), (N = !1));
          } else
            x(this.type)
              ? ((N = !1),
                (w = i ? this.parseIdent() : this.parseModuleExportName()))
              : ((D = !0), (P = X));
        } else
          x(this.type) &&
            ((D = !0),
            i
              ? ((P = super.parseIdent(!0)),
                this.isContextual("as") || this.checkUnreserved(P))
              : (P = this.parseModuleExportName()));
        (D &&
          l &&
          this.raise(
            E,
            i
              ? j.TypeModifierIsUsedInTypeImports
              : j.TypeModifierIsUsedInTypeExports,
          ),
          (r[d] = P),
          (r[v] = w));
        const H = i ? "importKind" : "exportKind";
        ((r[H] = D ? "type" : "value"),
          N &&
            this.eatContextual("as") &&
            (r[v] = i ? this.parseIdent() : this.parseModuleExportName()),
          r[v] || (r[v] = this.copyNode(r[d])),
          i && this.checkLValSimple(r[v], Y.BIND_LEXICAL));
      }
      raiseCommonCheck(r, i, l) {
        switch (i) {
          case "Comma is not permitted after the rest element":
            if (
              this.isAmbientContext &&
              this.match(n.comma) &&
              this.lookaheadCharCode() === 41
            ) {
              this.next();
              return;
            } else return super.raise(r, i);
        }
        return l ? super.raiseRecoverable(r, i) : super.raise(r, i);
      }
      raiseRecoverable(r, i) {
        return this.raiseCommonCheck(r, i, !0);
      }
      raise(r, i) {
        return this.raiseCommonCheck(r, i, !0);
      }
      updateContext(r) {
        const { type: i } = this;
        if (i == n.braceL) {
          var l = this.curContext();
          (l == L.tc_oTag
            ? this.context.push(T.b_expr)
            : l == L.tc_expr
              ? this.context.push(T.b_tmpl)
              : super.updateContext(r),
            (this.exprAllowed = !0));
        } else if (i === n.slash && r === k.jsxTagStart)
          ((this.context.length -= 2),
            this.context.push(L.tc_cTag),
            (this.exprAllowed = !1));
        else return super.updateContext(r);
      }
      jsx_parseOpeningElementAt(r, i) {
        let l = this.startNodeAt(r, i),
          d = this.jsx_parseElementName();
        if (
          (d && (l.name = d),
          this.match(n.relational) || this.match(n.bitShift))
        ) {
          const v = this.tsTryParseAndCatch(() =>
            this.tsParseTypeArgumentsInExpression(),
          );
          v && (l.typeArguments = v);
        }
        for (
          l.attributes = [];
          this.type !== n.slash && this.type !== k.jsxTagEnd;
        )
          l.attributes.push(this.jsx_parseAttribute());
        return (
          (l.selfClosing = this.eat(n.slash)),
          this.expect(k.jsxTagEnd),
          this.finishNode(l, d ? "JSXOpeningElement" : "JSXOpeningFragment")
        );
      }
      enterScope(r) {
        (r === Xe && this.importsStack.push([]), super.enterScope(r));
        const i = super.currentScope();
        ((i.types = []),
          (i.enums = []),
          (i.constEnums = []),
          (i.classes = []),
          (i.exportOnlyBindings = []));
      }
      exitScope() {
        (super.currentScope().flags === Xe && this.importsStack.pop(),
          super.exitScope());
      }
      hasImport(r, i) {
        const l = this.importsStack.length;
        if (this.importsStack[l - 1].indexOf(r) > -1) return !0;
        if (!i && l > 1) {
          for (let d = 0; d < l - 1; d++)
            if (this.importsStack[d].indexOf(r) > -1) return !0;
        }
        return !1;
      }
      maybeExportDefined(r, i) {
        this.inModule &&
          r.flags & Y.SCOPE_TOP &&
          this.undefinedExports.delete(i);
      }
      declareName(r, i, l) {
        if (i & Y.BIND_FLAGS_TS_IMPORT) {
          (this.hasImport(r, !0) &&
            this.raise(l, `Identifier '${r}' has already been declared.`),
            this.importsStack[this.importsStack.length - 1].push(r));
          return;
        }
        const d = this.currentScope();
        if (i & Y.BIND_FLAGS_TS_EXPORT_ONLY) {
          (this.maybeExportDefined(d, r), d.exportOnlyBindings.push(r));
          return;
        }
        (i === Y.BIND_TS_TYPE || i === Y.BIND_TS_INTERFACE
          ? (i === Y.BIND_TS_TYPE &&
              d.types.includes(r) &&
              this.raise(l, `type '${r}' has already been declared.`),
            d.types.push(r))
          : super.declareName(r, i, l),
          i & Y.BIND_FLAGS_TS_ENUM && d.enums.push(r),
          i & Y.BIND_FLAGS_TS_CONST_ENUM && d.constEnums.push(r),
          i & Y.BIND_FLAGS_CLASS && d.classes.push(r));
      }
      checkLocalExport(r) {
        const { name: i } = r;
        if (this.hasImport(i)) return;
        const l = this.scopeStack.length;
        for (let d = l - 1; d >= 0; d--) {
          const v = this.scopeStack[d];
          if (v.types.indexOf(i) > -1 || v.exportOnlyBindings.indexOf(i) > -1)
            return;
        }
        super.checkLocalExport(r);
      }
    }
    return C;
  };
}
ee.extend(h1());
var Oe;
class f1 extends Error {
  constructor(a, s, o) {
    super(s);
    gn(this, "message", "");
    ol(this, Oe);
    ((this.stack = ""),
      ll(this, Oe, new Yh(a, s, o)),
      Object.assign(this, xn(this, Oe)),
      (this.name = "CompileError"));
  }
  toString() {
    return xn(this, Oe).toString();
  }
  toJSON() {
    return xn(this, Oe).toJSON();
  }
}
Oe = new WeakMap();
function el(e, t, a) {
  throw new f1(t, a, void 0);
}
function m1(e, t) {
  el(
    e,
    "options_invalid_value",
    `Invalid compiler option: ${t}
https://svelte.dev/e/options_invalid_value`,
  );
}
function v1(e, t) {
  el(
    e,
    "options_removed",
    `Invalid compiler option: ${t}
https://svelte.dev/e/options_removed`,
  );
}
function b1(e, t) {
  el(
    e,
    "options_unrecognised",
    `Unrecognised compiler option ${t}
https://svelte.dev/e/options_unrecognised`,
  );
}
const y1 = {
  "CounterClockwiseContourIntegral;": 8755,
  "ClockwiseContourIntegral;": 8754,
  "DoubleLongLeftRightArrow;": 10234,
  "NotNestedGreaterGreater;": 10914,
  "DiacriticalDoubleAcute;": 733,
  "NotSquareSupersetEqual;": 8931,
  "CloseCurlyDoubleQuote;": 8221,
  "DoubleContourIntegral;": 8751,
  "FilledVerySmallSquare;": 9642,
  "NegativeVeryThinSpace;": 8203,
  "NotPrecedesSlantEqual;": 8928,
  "NotRightTriangleEqual;": 8941,
  "NotSucceedsSlantEqual;": 8929,
  "CapitalDifferentialD;": 8517,
  "DoubleLeftRightArrow;": 8660,
  "DoubleLongRightArrow;": 10233,
  "EmptyVerySmallSquare;": 9643,
  "NestedGreaterGreater;": 8811,
  "NotDoubleVerticalBar;": 8742,
  "NotGreaterSlantEqual;": 10878,
  "NotLeftTriangleEqual;": 8940,
  "NotSquareSubsetEqual;": 8930,
  "OpenCurlyDoubleQuote;": 8220,
  "ReverseUpEquilibrium;": 10607,
  "DoubleLongLeftArrow;": 10232,
  "DownLeftRightVector;": 10576,
  "LeftArrowRightArrow;": 8646,
  "NegativeMediumSpace;": 8203,
  "NotGreaterFullEqual;": 8807,
  "NotRightTriangleBar;": 10704,
  "RightArrowLeftArrow;": 8644,
  "SquareSupersetEqual;": 8850,
  "leftrightsquigarrow;": 8621,
  "DownRightTeeVector;": 10591,
  "DownRightVectorBar;": 10583,
  "LongLeftRightArrow;": 10231,
  "Longleftrightarrow;": 10234,
  "NegativeThickSpace;": 8203,
  "NotLeftTriangleBar;": 10703,
  "PrecedesSlantEqual;": 8828,
  "ReverseEquilibrium;": 8651,
  "RightDoubleBracket;": 10215,
  "RightDownTeeVector;": 10589,
  "RightDownVectorBar;": 10581,
  "RightTriangleEqual;": 8885,
  "SquareIntersection;": 8851,
  "SucceedsSlantEqual;": 8829,
  "blacktriangleright;": 9656,
  "longleftrightarrow;": 10231,
  "DoubleUpDownArrow;": 8661,
  "DoubleVerticalBar;": 8741,
  "DownLeftTeeVector;": 10590,
  "DownLeftVectorBar;": 10582,
  "FilledSmallSquare;": 9724,
  "GreaterSlantEqual;": 10878,
  "LeftDoubleBracket;": 10214,
  "LeftDownTeeVector;": 10593,
  "LeftDownVectorBar;": 10585,
  "LeftTriangleEqual;": 8884,
  "NegativeThinSpace;": 8203,
  "NotGreaterGreater;": 8811,
  "NotLessSlantEqual;": 10877,
  "NotNestedLessLess;": 10913,
  "NotReverseElement;": 8716,
  "NotSquareSuperset;": 8848,
  "NotTildeFullEqual;": 8775,
  "RightAngleBracket;": 10217,
  "RightUpDownVector;": 10575,
  "SquareSubsetEqual;": 8849,
  "VerticalSeparator;": 10072,
  "blacktriangledown;": 9662,
  "blacktriangleleft;": 9666,
  "leftrightharpoons;": 8651,
  "rightleftharpoons;": 8652,
  "twoheadrightarrow;": 8608,
  "DiacriticalAcute;": 180,
  "DiacriticalGrave;": 96,
  "DiacriticalTilde;": 732,
  "DoubleRightArrow;": 8658,
  "DownArrowUpArrow;": 8693,
  "EmptySmallSquare;": 9723,
  "GreaterEqualLess;": 8923,
  "GreaterFullEqual;": 8807,
  "LeftAngleBracket;": 10216,
  "LeftUpDownVector;": 10577,
  "LessEqualGreater;": 8922,
  "NonBreakingSpace;": 160,
  "NotPrecedesEqual;": 10927,
  "NotRightTriangle;": 8939,
  "NotSucceedsEqual;": 10928,
  "NotSucceedsTilde;": 8831,
  "NotSupersetEqual;": 8841,
  "RightTriangleBar;": 10704,
  "RightUpTeeVector;": 10588,
  "RightUpVectorBar;": 10580,
  "UnderParenthesis;": 9181,
  "UpArrowDownArrow;": 8645,
  "circlearrowright;": 8635,
  "downharpoonright;": 8642,
  "ntrianglerighteq;": 8941,
  "rightharpoondown;": 8641,
  "rightrightarrows;": 8649,
  "twoheadleftarrow;": 8606,
  "vartriangleright;": 8883,
  "CloseCurlyQuote;": 8217,
  "ContourIntegral;": 8750,
  "DoubleDownArrow;": 8659,
  "DoubleLeftArrow;": 8656,
  "DownRightVector;": 8641,
  "LeftRightVector;": 10574,
  "LeftTriangleBar;": 10703,
  "LeftUpTeeVector;": 10592,
  "LeftUpVectorBar;": 10584,
  "LowerRightArrow;": 8600,
  "NotGreaterEqual;": 8817,
  "NotGreaterTilde;": 8821,
  "NotHumpDownHump;": 8782,
  "NotLeftTriangle;": 8938,
  "NotSquareSubset;": 8847,
  "OverParenthesis;": 9180,
  "RightDownVector;": 8642,
  "ShortRightArrow;": 8594,
  "UpperRightArrow;": 8599,
  "bigtriangledown;": 9661,
  "circlearrowleft;": 8634,
  "curvearrowright;": 8631,
  "downharpoonleft;": 8643,
  "leftharpoondown;": 8637,
  "leftrightarrows;": 8646,
  "nLeftrightarrow;": 8654,
  "nleftrightarrow;": 8622,
  "ntrianglelefteq;": 8940,
  "rightleftarrows;": 8644,
  "rightsquigarrow;": 8605,
  "rightthreetimes;": 8908,
  "straightepsilon;": 1013,
  "trianglerighteq;": 8885,
  "vartriangleleft;": 8882,
  "DiacriticalDot;": 729,
  "DoubleRightTee;": 8872,
  "DownLeftVector;": 8637,
  "GreaterGreater;": 10914,
  "HorizontalLine;": 9472,
  "InvisibleComma;": 8291,
  "InvisibleTimes;": 8290,
  "LeftDownVector;": 8643,
  "LeftRightArrow;": 8596,
  "Leftrightarrow;": 8660,
  "LessSlantEqual;": 10877,
  "LongRightArrow;": 10230,
  "Longrightarrow;": 10233,
  "LowerLeftArrow;": 8601,
  "NestedLessLess;": 8810,
  "NotGreaterLess;": 8825,
  "NotLessGreater;": 8824,
  "NotSubsetEqual;": 8840,
  "NotVerticalBar;": 8740,
  "OpenCurlyQuote;": 8216,
  "ReverseElement;": 8715,
  "RightTeeVector;": 10587,
  "RightVectorBar;": 10579,
  "ShortDownArrow;": 8595,
  "ShortLeftArrow;": 8592,
  "SquareSuperset;": 8848,
  "TildeFullEqual;": 8773,
  "UpperLeftArrow;": 8598,
  "ZeroWidthSpace;": 8203,
  "curvearrowleft;": 8630,
  "doublebarwedge;": 8966,
  "downdownarrows;": 8650,
  "hookrightarrow;": 8618,
  "leftleftarrows;": 8647,
  "leftrightarrow;": 8596,
  "leftthreetimes;": 8907,
  "longrightarrow;": 10230,
  "looparrowright;": 8620,
  "nshortparallel;": 8742,
  "ntriangleright;": 8939,
  "rightarrowtail;": 8611,
  "rightharpoonup;": 8640,
  "trianglelefteq;": 8884,
  "upharpoonright;": 8638,
  "ApplyFunction;": 8289,
  "DifferentialD;": 8518,
  "DoubleLeftTee;": 10980,
  "DoubleUpArrow;": 8657,
  "LeftTeeVector;": 10586,
  "LeftVectorBar;": 10578,
  "LessFullEqual;": 8806,
  "LongLeftArrow;": 10229,
  "Longleftarrow;": 10232,
  "NotEqualTilde;": 8770,
  "NotTildeEqual;": 8772,
  "NotTildeTilde;": 8777,
  "Poincareplane;": 8460,
  "PrecedesEqual;": 10927,
  "PrecedesTilde;": 8830,
  "RightArrowBar;": 8677,
  "RightTeeArrow;": 8614,
  "RightTriangle;": 8883,
  "RightUpVector;": 8638,
  "SucceedsEqual;": 10928,
  "SucceedsTilde;": 8831,
  "SupersetEqual;": 8839,
  "UpEquilibrium;": 10606,
  "VerticalTilde;": 8768,
  "VeryThinSpace;": 8202,
  "bigtriangleup;": 9651,
  "blacktriangle;": 9652,
  "divideontimes;": 8903,
  "fallingdotseq;": 8786,
  "hookleftarrow;": 8617,
  "leftarrowtail;": 8610,
  "leftharpoonup;": 8636,
  "longleftarrow;": 10229,
  "looparrowleft;": 8619,
  "measuredangle;": 8737,
  "ntriangleleft;": 8938,
  "shortparallel;": 8741,
  "smallsetminus;": 8726,
  "triangleright;": 9657,
  "upharpoonleft;": 8639,
  "varsubsetneqq;": 10955,
  "varsupsetneqq;": 10956,
  "DownArrowBar;": 10515,
  "DownTeeArrow;": 8615,
  "ExponentialE;": 8519,
  "GreaterEqual;": 8805,
  "GreaterTilde;": 8819,
  "HilbertSpace;": 8459,
  "HumpDownHump;": 8782,
  "Intersection;": 8898,
  "LeftArrowBar;": 8676,
  "LeftTeeArrow;": 8612,
  "LeftTriangle;": 8882,
  "LeftUpVector;": 8639,
  "NotCongruent;": 8802,
  "NotHumpEqual;": 8783,
  "NotLessEqual;": 8816,
  "NotLessTilde;": 8820,
  "Proportional;": 8733,
  "RightCeiling;": 8969,
  "RoundImplies;": 10608,
  "ShortUpArrow;": 8593,
  "SquareSubset;": 8847,
  "UnderBracket;": 9141,
  "VerticalLine;": 124,
  "blacklozenge;": 10731,
  "exponentiale;": 8519,
  "risingdotseq;": 8787,
  "triangledown;": 9663,
  "triangleleft;": 9667,
  "varsubsetneq;": 8842,
  "varsupsetneq;": 8843,
  "CircleMinus;": 8854,
  "CircleTimes;": 8855,
  "Equilibrium;": 8652,
  "GreaterLess;": 8823,
  "LeftCeiling;": 8968,
  "LessGreater;": 8822,
  "MediumSpace;": 8287,
  "NotLessLess;": 8810,
  "NotPrecedes;": 8832,
  "NotSucceeds;": 8833,
  "NotSuperset;": 8835,
  "OverBracket;": 9140,
  "RightVector;": 8640,
  "Rrightarrow;": 8667,
  "RuleDelayed;": 10740,
  "SmallCircle;": 8728,
  "SquareUnion;": 8852,
  "SubsetEqual;": 8838,
  "UpDownArrow;": 8597,
  "Updownarrow;": 8661,
  "VerticalBar;": 8739,
  "backepsilon;": 1014,
  "blacksquare;": 9642,
  "circledcirc;": 8858,
  "circleddash;": 8861,
  "curlyeqprec;": 8926,
  "curlyeqsucc;": 8927,
  "diamondsuit;": 9830,
  "eqslantless;": 10901,
  "expectation;": 8496,
  "nRightarrow;": 8655,
  "nrightarrow;": 8603,
  "preccurlyeq;": 8828,
  "precnapprox;": 10937,
  "quaternions;": 8461,
  "straightphi;": 981,
  "succcurlyeq;": 8829,
  "succnapprox;": 10938,
  "thickapprox;": 8776,
  "updownarrow;": 8597,
  "Bernoullis;": 8492,
  "CirclePlus;": 8853,
  "EqualTilde;": 8770,
  "Fouriertrf;": 8497,
  "ImaginaryI;": 8520,
  "Laplacetrf;": 8466,
  "LeftVector;": 8636,
  "Lleftarrow;": 8666,
  "NotElement;": 8713,
  "NotGreater;": 8815,
  "Proportion;": 8759,
  "RightArrow;": 8594,
  "RightFloor;": 8971,
  "Rightarrow;": 8658,
  "ThickSpace;": 8287,
  "TildeEqual;": 8771,
  "TildeTilde;": 8776,
  "UnderBrace;": 9183,
  "UpArrowBar;": 10514,
  "UpTeeArrow;": 8613,
  "circledast;": 8859,
  "complement;": 8705,
  "curlywedge;": 8911,
  "eqslantgtr;": 10902,
  "gtreqqless;": 10892,
  "lessapprox;": 10885,
  "lesseqqgtr;": 10891,
  "lmoustache;": 9136,
  "longmapsto;": 10236,
  "mapstodown;": 8615,
  "mapstoleft;": 8612,
  "nLeftarrow;": 8653,
  "nleftarrow;": 8602,
  "nsubseteqq;": 10949,
  "nsupseteqq;": 10950,
  "precapprox;": 10935,
  "rightarrow;": 8594,
  "rmoustache;": 9137,
  "sqsubseteq;": 8849,
  "sqsupseteq;": 8850,
  "subsetneqq;": 10955,
  "succapprox;": 10936,
  "supsetneqq;": 10956,
  "upuparrows;": 8648,
  "varepsilon;": 1013,
  "varnothing;": 8709,
  "Backslash;": 8726,
  "CenterDot;": 183,
  "CircleDot;": 8857,
  "Congruent;": 8801,
  "Coproduct;": 8720,
  "DoubleDot;": 168,
  "DownArrow;": 8595,
  "DownBreve;": 785,
  "Downarrow;": 8659,
  "HumpEqual;": 8783,
  "LeftArrow;": 8592,
  "LeftFloor;": 8970,
  "Leftarrow;": 8656,
  "LessTilde;": 8818,
  "Mellintrf;": 8499,
  "MinusPlus;": 8723,
  "NotCupCap;": 8813,
  "NotExists;": 8708,
  "NotSubset;": 8834,
  "OverBrace;": 9182,
  "PlusMinus;": 177,
  "Therefore;": 8756,
  "ThinSpace;": 8201,
  "TripleDot;": 8411,
  "UnionPlus;": 8846,
  "backprime;": 8245,
  "backsimeq;": 8909,
  "bigotimes;": 10754,
  "centerdot;": 183,
  "checkmark;": 10003,
  "complexes;": 8450,
  "dotsquare;": 8865,
  "downarrow;": 8595,
  "gtrapprox;": 10886,
  "gtreqless;": 8923,
  "gvertneqq;": 8809,
  "heartsuit;": 9829,
  "leftarrow;": 8592,
  "lesseqgtr;": 8922,
  "lvertneqq;": 8808,
  "ngeqslant;": 10878,
  "nleqslant;": 10877,
  "nparallel;": 8742,
  "nshortmid;": 8740,
  "nsubseteq;": 8840,
  "nsupseteq;": 8841,
  "pitchfork;": 8916,
  "rationals;": 8474,
  "spadesuit;": 9824,
  "subseteqq;": 10949,
  "subsetneq;": 8842,
  "supseteqq;": 10950,
  "supsetneq;": 8843,
  "therefore;": 8756,
  "triangleq;": 8796,
  "varpropto;": 8733,
  "DDotrahd;": 10513,
  "DotEqual;": 8784,
  "Integral;": 8747,
  "LessLess;": 10913,
  "NotEqual;": 8800,
  "NotTilde;": 8769,
  "PartialD;": 8706,
  "Precedes;": 8826,
  "RightTee;": 8866,
  "Succeeds;": 8827,
  "SuchThat;": 8715,
  "Superset;": 8835,
  "Uarrocir;": 10569,
  "UnderBar;": 95,
  "andslope;": 10840,
  "angmsdaa;": 10664,
  "angmsdab;": 10665,
  "angmsdac;": 10666,
  "angmsdad;": 10667,
  "angmsdae;": 10668,
  "angmsdaf;": 10669,
  "angmsdag;": 10670,
  "angmsdah;": 10671,
  "angrtvbd;": 10653,
  "approxeq;": 8778,
  "awconint;": 8755,
  "backcong;": 8780,
  "barwedge;": 8965,
  "bbrktbrk;": 9142,
  "bigoplus;": 10753,
  "bigsqcup;": 10758,
  "biguplus;": 10756,
  "bigwedge;": 8896,
  "boxminus;": 8863,
  "boxtimes;": 8864,
  "bsolhsub;": 10184,
  "capbrcup;": 10825,
  "circledR;": 174,
  "circledS;": 9416,
  "cirfnint;": 10768,
  "clubsuit;": 9827,
  "cupbrcap;": 10824,
  "curlyvee;": 8910,
  "cwconint;": 8754,
  "doteqdot;": 8785,
  "dotminus;": 8760,
  "drbkarow;": 10512,
  "dzigrarr;": 10239,
  "elinters;": 9191,
  "emptyset;": 8709,
  "eqvparsl;": 10725,
  "fpartint;": 10765,
  "geqslant;": 10878,
  "gesdotol;": 10884,
  "gnapprox;": 10890,
  "hksearow;": 10533,
  "hkswarow;": 10534,
  "imagline;": 8464,
  "imagpart;": 8465,
  "infintie;": 10717,
  "integers;": 8484,
  "intercal;": 8890,
  "intlarhk;": 10775,
  "laemptyv;": 10676,
  "ldrushar;": 10571,
  "leqslant;": 10877,
  "lesdotor;": 10883,
  "llcorner;": 8990,
  "lnapprox;": 10889,
  "lrcorner;": 8991,
  "lurdshar;": 10570,
  "mapstoup;": 8613,
  "multimap;": 8888,
  "naturals;": 8469,
  "ncongdot;": 10861,
  "notindot;": 8949,
  "otimesas;": 10806,
  "parallel;": 8741,
  "plusacir;": 10787,
  "pointint;": 10773,
  "precneqq;": 10933,
  "precnsim;": 8936,
  "profalar;": 9006,
  "profline;": 8978,
  "profsurf;": 8979,
  "raemptyv;": 10675,
  "realpart;": 8476,
  "rppolint;": 10770,
  "rtriltri;": 10702,
  "scpolint;": 10771,
  "setminus;": 8726,
  "shortmid;": 8739,
  "smeparsl;": 10724,
  "sqsubset;": 8847,
  "sqsupset;": 8848,
  "subseteq;": 8838,
  "succneqq;": 10934,
  "succnsim;": 8937,
  "supseteq;": 8839,
  "thetasym;": 977,
  "thicksim;": 8764,
  "timesbar;": 10801,
  "triangle;": 9653,
  "triminus;": 10810,
  "trpezium;": 9186,
  "ulcorner;": 8988,
  "urcorner;": 8989,
  "varkappa;": 1008,
  "varsigma;": 962,
  "vartheta;": 977,
  "Because;": 8757,
  "Cayleys;": 8493,
  "Cconint;": 8752,
  "Cedilla;": 184,
  "Diamond;": 8900,
  "DownTee;": 8868,
  "Element;": 8712,
  "Epsilon;": 917,
  "Implies;": 8658,
  "LeftTee;": 8867,
  "NewLine;": 10,
  "NoBreak;": 8288,
  "NotLess;": 8814,
  "Omicron;": 927,
  "OverBar;": 8254,
  "Product;": 8719,
  "UpArrow;": 8593,
  "Uparrow;": 8657,
  "Upsilon;": 933,
  "alefsym;": 8501,
  "angrtvb;": 8894,
  "angzarr;": 9084,
  "asympeq;": 8781,
  "backsim;": 8765,
  "because;": 8757,
  "bemptyv;": 10672,
  "between;": 8812,
  "bigcirc;": 9711,
  "bigodot;": 10752,
  "bigstar;": 9733,
  "bnequiv;": 8801,
  "boxplus;": 8862,
  "ccupssm;": 10832,
  "cemptyv;": 10674,
  "cirscir;": 10690,
  "coloneq;": 8788,
  "congdot;": 10861,
  "cudarrl;": 10552,
  "cudarrr;": 10549,
  "cularrp;": 10557,
  "curarrm;": 10556,
  "dbkarow;": 10511,
  "ddagger;": 8225,
  "ddotseq;": 10871,
  "demptyv;": 10673,
  "diamond;": 8900,
  "digamma;": 989,
  "dotplus;": 8724,
  "dwangle;": 10662,
  "epsilon;": 949,
  "eqcolon;": 8789,
  "equivDD;": 10872,
  "gesdoto;": 10882,
  "gtquest;": 10876,
  "gtrless;": 8823,
  "harrcir;": 10568,
  "intprod;": 10812,
  "isindot;": 8949,
  "larrbfs;": 10527,
  "larrsim;": 10611,
  "lbrksld;": 10639,
  "lbrkslu;": 10637,
  "ldrdhar;": 10599,
  "lesdoto;": 10881,
  "lessdot;": 8918,
  "lessgtr;": 8822,
  "lesssim;": 8818,
  "lotimes;": 10804,
  "lozenge;": 9674,
  "ltquest;": 10875,
  "luruhar;": 10598,
  "maltese;": 10016,
  "minusdu;": 10794,
  "napprox;": 8777,
  "natural;": 9838,
  "nearrow;": 8599,
  "nexists;": 8708,
  "notinva;": 8713,
  "notinvb;": 8951,
  "notinvc;": 8950,
  "notniva;": 8716,
  "notnivb;": 8958,
  "notnivc;": 8957,
  "npolint;": 10772,
  "npreceq;": 10927,
  "nsqsube;": 8930,
  "nsqsupe;": 8931,
  "nsubset;": 8834,
  "nsucceq;": 10928,
  "nsupset;": 8835,
  "nvinfin;": 10718,
  "nvltrie;": 8884,
  "nvrtrie;": 8885,
  "nwarrow;": 8598,
  "olcross;": 10683,
  "omicron;": 959,
  "orderof;": 8500,
  "orslope;": 10839,
  "pertenk;": 8241,
  "planckh;": 8462,
  "pluscir;": 10786,
  "plussim;": 10790,
  "plustwo;": 10791,
  "precsim;": 8830,
  "quatint;": 10774,
  "questeq;": 8799,
  "rarrbfs;": 10528,
  "rarrsim;": 10612,
  "rbrksld;": 10638,
  "rbrkslu;": 10640,
  "rdldhar;": 10601,
  "realine;": 8475,
  "rotimes;": 10805,
  "ruluhar;": 10600,
  "searrow;": 8600,
  "simplus;": 10788,
  "simrarr;": 10610,
  "subedot;": 10947,
  "submult;": 10945,
  "subplus;": 10943,
  "subrarr;": 10617,
  "succsim;": 8831,
  "supdsub;": 10968,
  "supedot;": 10948,
  "suphsol;": 10185,
  "suphsub;": 10967,
  "suplarr;": 10619,
  "supmult;": 10946,
  "supplus;": 10944,
  "swarrow;": 8601,
  "topfork;": 10970,
  "triplus;": 10809,
  "tritime;": 10811,
  "uparrow;": 8593,
  "upsilon;": 965,
  "uwangle;": 10663,
  "vzigzag;": 10650,
  "zigrarr;": 8669,
  "Aacute;": 193,
  "Abreve;": 258,
  "Agrave;": 192,
  "Assign;": 8788,
  "Atilde;": 195,
  "Barwed;": 8966,
  "Bumpeq;": 8782,
  "Cacute;": 262,
  "Ccaron;": 268,
  "Ccedil;": 199,
  "Colone;": 10868,
  "Conint;": 8751,
  "CupCap;": 8781,
  "Dagger;": 8225,
  "Dcaron;": 270,
  "DotDot;": 8412,
  "Dstrok;": 272,
  "Eacute;": 201,
  "Ecaron;": 282,
  "Egrave;": 200,
  "Exists;": 8707,
  "ForAll;": 8704,
  "Gammad;": 988,
  "Gbreve;": 286,
  "Gcedil;": 290,
  "HARDcy;": 1066,
  "Hstrok;": 294,
  "Iacute;": 205,
  "Igrave;": 204,
  "Itilde;": 296,
  "Jsercy;": 1032,
  "Kcedil;": 310,
  "Lacute;": 313,
  "Lambda;": 923,
  "Lcaron;": 317,
  "Lcedil;": 315,
  "Lmidot;": 319,
  "Lstrok;": 321,
  "Nacute;": 323,
  "Ncaron;": 327,
  "Ncedil;": 325,
  "Ntilde;": 209,
  "Oacute;": 211,
  "Odblac;": 336,
  "Ograve;": 210,
  "Oslash;": 216,
  "Otilde;": 213,
  "Otimes;": 10807,
  "Racute;": 340,
  "Rarrtl;": 10518,
  "Rcaron;": 344,
  "Rcedil;": 342,
  "SHCHcy;": 1065,
  "SOFTcy;": 1068,
  "Sacute;": 346,
  "Scaron;": 352,
  "Scedil;": 350,
  "Square;": 9633,
  "Subset;": 8912,
  "Supset;": 8913,
  "Tcaron;": 356,
  "Tcedil;": 354,
  "Tstrok;": 358,
  "Uacute;": 218,
  "Ubreve;": 364,
  "Udblac;": 368,
  "Ugrave;": 217,
  "Utilde;": 360,
  "Vdashl;": 10982,
  "Verbar;": 8214,
  "Vvdash;": 8874,
  "Yacute;": 221,
  "Zacute;": 377,
  "Zcaron;": 381,
  "aacute;": 225,
  "abreve;": 259,
  "agrave;": 224,
  "andand;": 10837,
  "angmsd;": 8737,
  "angsph;": 8738,
  "apacir;": 10863,
  "approx;": 8776,
  "atilde;": 227,
  "barvee;": 8893,
  "barwed;": 8965,
  "becaus;": 8757,
  "bernou;": 8492,
  "bigcap;": 8898,
  "bigcup;": 8899,
  "bigvee;": 8897,
  "bkarow;": 10509,
  "bottom;": 8869,
  "bowtie;": 8904,
  "boxbox;": 10697,
  "bprime;": 8245,
  "brvbar;": 166,
  "bullet;": 8226,
  "bumpeq;": 8783,
  "cacute;": 263,
  "capand;": 10820,
  "capcap;": 10827,
  "capcup;": 10823,
  "capdot;": 10816,
  "ccaron;": 269,
  "ccedil;": 231,
  "circeq;": 8791,
  "cirmid;": 10991,
  "colone;": 8788,
  "commat;": 64,
  "compfn;": 8728,
  "conint;": 8750,
  "coprod;": 8720,
  "copysr;": 8471,
  "cularr;": 8630,
  "cupcap;": 10822,
  "cupcup;": 10826,
  "cupdot;": 8845,
  "curarr;": 8631,
  "curren;": 164,
  "cylcty;": 9005,
  "dagger;": 8224,
  "daleth;": 8504,
  "dcaron;": 271,
  "dfisht;": 10623,
  "divide;": 247,
  "divonx;": 8903,
  "dlcorn;": 8990,
  "dlcrop;": 8973,
  "dollar;": 36,
  "drcorn;": 8991,
  "drcrop;": 8972,
  "dstrok;": 273,
  "eacute;": 233,
  "easter;": 10862,
  "ecaron;": 283,
  "ecolon;": 8789,
  "egrave;": 232,
  "egsdot;": 10904,
  "elsdot;": 10903,
  "emptyv;": 8709,
  "emsp13;": 8196,
  "emsp14;": 8197,
  "eparsl;": 10723,
  "eqcirc;": 8790,
  "equals;": 61,
  "equest;": 8799,
  "female;": 9792,
  "ffilig;": 64259,
  "ffllig;": 64260,
  "forall;": 8704,
  "frac12;": 189,
  "frac13;": 8531,
  "frac14;": 188,
  "frac15;": 8533,
  "frac16;": 8537,
  "frac18;": 8539,
  "frac23;": 8532,
  "frac25;": 8534,
  "frac34;": 190,
  "frac35;": 8535,
  "frac38;": 8540,
  "frac45;": 8536,
  "frac56;": 8538,
  "frac58;": 8541,
  "frac78;": 8542,
  "gacute;": 501,
  "gammad;": 989,
  "gbreve;": 287,
  "gesdot;": 10880,
  "gesles;": 10900,
  "gtlPar;": 10645,
  "gtrarr;": 10616,
  "gtrdot;": 8919,
  "gtrsim;": 8819,
  "hairsp;": 8202,
  "hamilt;": 8459,
  "hardcy;": 1098,
  "hearts;": 9829,
  "hellip;": 8230,
  "hercon;": 8889,
  "homtht;": 8763,
  "horbar;": 8213,
  "hslash;": 8463,
  "hstrok;": 295,
  "hybull;": 8259,
  "hyphen;": 8208,
  "iacute;": 237,
  "igrave;": 236,
  "iiiint;": 10764,
  "iinfin;": 10716,
  "incare;": 8453,
  "inodot;": 305,
  "intcal;": 8890,
  "iquest;": 191,
  "isinsv;": 8947,
  "itilde;": 297,
  "jsercy;": 1112,
  "kappav;": 1008,
  "kcedil;": 311,
  "kgreen;": 312,
  "lAtail;": 10523,
  "lacute;": 314,
  "lagran;": 8466,
  "lambda;": 955,
  "langle;": 10216,
  "larrfs;": 10525,
  "larrhk;": 8617,
  "larrlp;": 8619,
  "larrpl;": 10553,
  "larrtl;": 8610,
  "latail;": 10521,
  "lbrace;": 123,
  "lbrack;": 91,
  "lcaron;": 318,
  "lcedil;": 316,
  "ldquor;": 8222,
  "lesdot;": 10879,
  "lesges;": 10899,
  "lfisht;": 10620,
  "lfloor;": 8970,
  "lharul;": 10602,
  "llhard;": 10603,
  "lmidot;": 320,
  "lmoust;": 9136,
  "loplus;": 10797,
  "lowast;": 8727,
  "lowbar;": 95,
  "lparlt;": 10643,
  "lrhard;": 10605,
  "lsaquo;": 8249,
  "lsquor;": 8218,
  "lstrok;": 322,
  "lthree;": 8907,
  "ltimes;": 8905,
  "ltlarr;": 10614,
  "ltrPar;": 10646,
  "mapsto;": 8614,
  "marker;": 9646,
  "mcomma;": 10793,
  "midast;": 42,
  "midcir;": 10992,
  "middot;": 183,
  "minusb;": 8863,
  "minusd;": 8760,
  "mnplus;": 8723,
  "models;": 8871,
  "mstpos;": 8766,
  "nVDash;": 8879,
  "nVdash;": 8878,
  "nacute;": 324,
  "nbumpe;": 8783,
  "ncaron;": 328,
  "ncedil;": 326,
  "nearhk;": 10532,
  "nequiv;": 8802,
  "nesear;": 10536,
  "nexist;": 8708,
  "nltrie;": 8940,
  "notinE;": 8953,
  "nparsl;": 11005,
  "nprcue;": 8928,
  "nrarrc;": 10547,
  "nrarrw;": 8605,
  "nrtrie;": 8941,
  "nsccue;": 8929,
  "nsimeq;": 8772,
  "ntilde;": 241,
  "numero;": 8470,
  "nvDash;": 8877,
  "nvHarr;": 10500,
  "nvdash;": 8876,
  "nvlArr;": 10498,
  "nvrArr;": 10499,
  "nwarhk;": 10531,
  "nwnear;": 10535,
  "oacute;": 243,
  "odblac;": 337,
  "odsold;": 10684,
  "ograve;": 242,
  "ominus;": 8854,
  "origof;": 8886,
  "oslash;": 248,
  "otilde;": 245,
  "otimes;": 8855,
  "parsim;": 10995,
  "percnt;": 37,
  "period;": 46,
  "permil;": 8240,
  "phmmat;": 8499,
  "planck;": 8463,
  "plankv;": 8463,
  "plusdo;": 8724,
  "plusdu;": 10789,
  "plusmn;": 177,
  "preceq;": 10927,
  "primes;": 8473,
  "prnsim;": 8936,
  "propto;": 8733,
  "prurel;": 8880,
  "puncsp;": 8200,
  "qprime;": 8279,
  "rAtail;": 10524,
  "racute;": 341,
  "rangle;": 10217,
  "rarrap;": 10613,
  "rarrfs;": 10526,
  "rarrhk;": 8618,
  "rarrlp;": 8620,
  "rarrpl;": 10565,
  "rarrtl;": 8611,
  "ratail;": 10522,
  "rbrace;": 125,
  "rbrack;": 93,
  "rcaron;": 345,
  "rcedil;": 343,
  "rdquor;": 8221,
  "rfisht;": 10621,
  "rfloor;": 8971,
  "rharul;": 10604,
  "rmoust;": 9137,
  "roplus;": 10798,
  "rpargt;": 10644,
  "rsaquo;": 8250,
  "rsquor;": 8217,
  "rthree;": 8908,
  "rtimes;": 8906,
  "sacute;": 347,
  "scaron;": 353,
  "scedil;": 351,
  "scnsim;": 8937,
  "searhk;": 10533,
  "seswar;": 10537,
  "sfrown;": 8994,
  "shchcy;": 1097,
  "sigmaf;": 962,
  "sigmav;": 962,
  "simdot;": 10858,
  "smashp;": 10803,
  "softcy;": 1100,
  "solbar;": 9023,
  "spades;": 9824,
  "sqcaps;": 8851,
  "sqcups;": 8852,
  "sqsube;": 8849,
  "sqsupe;": 8850,
  "square;": 9633,
  "squarf;": 9642,
  "ssetmn;": 8726,
  "ssmile;": 8995,
  "sstarf;": 8902,
  "subdot;": 10941,
  "subset;": 8834,
  "subsim;": 10951,
  "subsub;": 10965,
  "subsup;": 10963,
  "succeq;": 10928,
  "supdot;": 10942,
  "supset;": 8835,
  "supsim;": 10952,
  "supsub;": 10964,
  "supsup;": 10966,
  "swarhk;": 10534,
  "swnwar;": 10538,
  "target;": 8982,
  "tcaron;": 357,
  "tcedil;": 355,
  "telrec;": 8981,
  "there4;": 8756,
  "thetav;": 977,
  "thinsp;": 8201,
  "thksim;": 8764,
  "timesb;": 8864,
  "timesd;": 10800,
  "topbot;": 9014,
  "topcir;": 10993,
  "tprime;": 8244,
  "tridot;": 9708,
  "tstrok;": 359,
  "uacute;": 250,
  "ubreve;": 365,
  "udblac;": 369,
  "ufisht;": 10622,
  "ugrave;": 249,
  "ulcorn;": 8988,
  "ulcrop;": 8975,
  "urcorn;": 8989,
  "urcrop;": 8974,
  "utilde;": 361,
  "vangrt;": 10652,
  "varphi;": 981,
  "varrho;": 1009,
  "veebar;": 8891,
  "vellip;": 8942,
  "verbar;": 124,
  "vsubnE;": 10955,
  "vsubne;": 8842,
  "vsupnE;": 10956,
  "vsupne;": 8843,
  "wedbar;": 10847,
  "wedgeq;": 8793,
  "weierp;": 8472,
  "wreath;": 8768,
  "xoplus;": 10753,
  "xotime;": 10754,
  "xsqcup;": 10758,
  "xuplus;": 10756,
  "xwedge;": 8896,
  "yacute;": 253,
  "zacute;": 378,
  "zcaron;": 382,
  "zeetrf;": 8488,
  "AElig;": 198,
  Aacute: 193,
  "Acirc;": 194,
  Agrave: 192,
  "Alpha;": 913,
  "Amacr;": 256,
  "Aogon;": 260,
  "Aring;": 197,
  Atilde: 195,
  "Breve;": 728,
  Ccedil: 199,
  "Ccirc;": 264,
  "Colon;": 8759,
  "Cross;": 10799,
  "Dashv;": 10980,
  "Delta;": 916,
  Eacute: 201,
  "Ecirc;": 202,
  Egrave: 200,
  "Emacr;": 274,
  "Eogon;": 280,
  "Equal;": 10869,
  "Gamma;": 915,
  "Gcirc;": 284,
  "Hacek;": 711,
  "Hcirc;": 292,
  "IJlig;": 306,
  Iacute: 205,
  "Icirc;": 206,
  Igrave: 204,
  "Imacr;": 298,
  "Iogon;": 302,
  "Iukcy;": 1030,
  "Jcirc;": 308,
  "Jukcy;": 1028,
  "Kappa;": 922,
  Ntilde: 209,
  "OElig;": 338,
  Oacute: 211,
  "Ocirc;": 212,
  Ograve: 210,
  "Omacr;": 332,
  "Omega;": 937,
  Oslash: 216,
  Otilde: 213,
  "Prime;": 8243,
  "RBarr;": 10512,
  "Scirc;": 348,
  "Sigma;": 931,
  "THORN;": 222,
  "TRADE;": 8482,
  "TSHcy;": 1035,
  "Theta;": 920,
  "Tilde;": 8764,
  Uacute: 218,
  "Ubrcy;": 1038,
  "Ucirc;": 219,
  Ugrave: 217,
  "Umacr;": 362,
  "Union;": 8899,
  "Uogon;": 370,
  "UpTee;": 8869,
  "Uring;": 366,
  "VDash;": 8875,
  "Vdash;": 8873,
  "Wcirc;": 372,
  "Wedge;": 8896,
  Yacute: 221,
  "Ycirc;": 374,
  aacute: 225,
  "acirc;": 226,
  "acute;": 180,
  "aelig;": 230,
  agrave: 224,
  "aleph;": 8501,
  "alpha;": 945,
  "amacr;": 257,
  "amalg;": 10815,
  "angle;": 8736,
  "angrt;": 8735,
  "angst;": 197,
  "aogon;": 261,
  "aring;": 229,
  "asymp;": 8776,
  atilde: 227,
  "awint;": 10769,
  "bcong;": 8780,
  "bdquo;": 8222,
  "bepsi;": 1014,
  "blank;": 9251,
  "blk12;": 9618,
  "blk14;": 9617,
  "blk34;": 9619,
  "block;": 9608,
  "boxDL;": 9559,
  "boxDR;": 9556,
  "boxDl;": 9558,
  "boxDr;": 9555,
  "boxHD;": 9574,
  "boxHU;": 9577,
  "boxHd;": 9572,
  "boxHu;": 9575,
  "boxUL;": 9565,
  "boxUR;": 9562,
  "boxUl;": 9564,
  "boxUr;": 9561,
  "boxVH;": 9580,
  "boxVL;": 9571,
  "boxVR;": 9568,
  "boxVh;": 9579,
  "boxVl;": 9570,
  "boxVr;": 9567,
  "boxdL;": 9557,
  "boxdR;": 9554,
  "boxdl;": 9488,
  "boxdr;": 9484,
  "boxhD;": 9573,
  "boxhU;": 9576,
  "boxhd;": 9516,
  "boxhu;": 9524,
  "boxuL;": 9563,
  "boxuR;": 9560,
  "boxul;": 9496,
  "boxur;": 9492,
  "boxvH;": 9578,
  "boxvL;": 9569,
  "boxvR;": 9566,
  "boxvh;": 9532,
  "boxvl;": 9508,
  "boxvr;": 9500,
  "breve;": 728,
  brvbar: 166,
  "bsemi;": 8271,
  "bsime;": 8909,
  "bsolb;": 10693,
  "bumpE;": 10926,
  "bumpe;": 8783,
  "caret;": 8257,
  "caron;": 711,
  "ccaps;": 10829,
  ccedil: 231,
  "ccirc;": 265,
  "ccups;": 10828,
  "cedil;": 184,
  "check;": 10003,
  "clubs;": 9827,
  "colon;": 58,
  "comma;": 44,
  "crarr;": 8629,
  "cross;": 10007,
  "csube;": 10961,
  "csupe;": 10962,
  "ctdot;": 8943,
  "cuepr;": 8926,
  "cuesc;": 8927,
  "cupor;": 10821,
  curren: 164,
  "cuvee;": 8910,
  "cuwed;": 8911,
  "cwint;": 8753,
  "dashv;": 8867,
  "dblac;": 733,
  "ddarr;": 8650,
  "delta;": 948,
  "dharl;": 8643,
  "dharr;": 8642,
  "diams;": 9830,
  "disin;": 8946,
  divide: 247,
  "doteq;": 8784,
  "dtdot;": 8945,
  "dtrif;": 9662,
  "duarr;": 8693,
  "duhar;": 10607,
  "eDDot;": 10871,
  eacute: 233,
  "ecirc;": 234,
  "efDot;": 8786,
  egrave: 232,
  "emacr;": 275,
  "empty;": 8709,
  "eogon;": 281,
  "eplus;": 10865,
  "epsiv;": 1013,
  "eqsim;": 8770,
  "equiv;": 8801,
  "erDot;": 8787,
  "erarr;": 10609,
  "esdot;": 8784,
  "exist;": 8707,
  "fflig;": 64256,
  "filig;": 64257,
  "fjlig;": 102,
  "fllig;": 64258,
  "fltns;": 9649,
  "forkv;": 10969,
  frac12: 189,
  frac14: 188,
  frac34: 190,
  "frasl;": 8260,
  "frown;": 8994,
  "gamma;": 947,
  "gcirc;": 285,
  "gescc;": 10921,
  "gimel;": 8503,
  "gneqq;": 8809,
  "gnsim;": 8935,
  "grave;": 96,
  "gsime;": 10894,
  "gsiml;": 10896,
  "gtcir;": 10874,
  "gtdot;": 8919,
  "harrw;": 8621,
  "hcirc;": 293,
  "hoarr;": 8703,
  iacute: 237,
  "icirc;": 238,
  "iexcl;": 161,
  igrave: 236,
  "iiint;": 8749,
  "iiota;": 8489,
  "ijlig;": 307,
  "imacr;": 299,
  "image;": 8465,
  "imath;": 305,
  "imped;": 437,
  "infin;": 8734,
  "iogon;": 303,
  "iprod;": 10812,
  iquest: 191,
  "isinE;": 8953,
  "isins;": 8948,
  "isinv;": 8712,
  "iukcy;": 1110,
  "jcirc;": 309,
  "jmath;": 567,
  "jukcy;": 1108,
  "kappa;": 954,
  "lAarr;": 8666,
  "lBarr;": 10510,
  "langd;": 10641,
  "laquo;": 171,
  "larrb;": 8676,
  "lates;": 10925,
  "lbarr;": 10508,
  "lbbrk;": 10098,
  "lbrke;": 10635,
  "lceil;": 8968,
  "ldquo;": 8220,
  "lescc;": 10920,
  "lhard;": 8637,
  "lharu;": 8636,
  "lhblk;": 9604,
  "llarr;": 8647,
  "lltri;": 9722,
  "lneqq;": 8808,
  "lnsim;": 8934,
  "loang;": 10220,
  "loarr;": 8701,
  "lobrk;": 10214,
  "lopar;": 10629,
  "lrarr;": 8646,
  "lrhar;": 8651,
  "lrtri;": 8895,
  "lsime;": 10893,
  "lsimg;": 10895,
  "lsquo;": 8216,
  "ltcir;": 10873,
  "ltdot;": 8918,
  "ltrie;": 8884,
  "ltrif;": 9666,
  "mDDot;": 8762,
  "mdash;": 8212,
  "micro;": 181,
  middot: 183,
  "minus;": 8722,
  "mumap;": 8888,
  "nabla;": 8711,
  "napid;": 8779,
  "napos;": 329,
  "natur;": 9838,
  "nbump;": 8782,
  "ncong;": 8775,
  "ndash;": 8211,
  "neArr;": 8663,
  "nearr;": 8599,
  "nedot;": 8784,
  "nesim;": 8770,
  "ngeqq;": 8807,
  "ngsim;": 8821,
  "nhArr;": 8654,
  "nharr;": 8622,
  "nhpar;": 10994,
  "nlArr;": 8653,
  "nlarr;": 8602,
  "nleqq;": 8806,
  "nless;": 8814,
  "nlsim;": 8820,
  "nltri;": 8938,
  "notin;": 8713,
  "notni;": 8716,
  "npart;": 8706,
  "nprec;": 8832,
  "nrArr;": 8655,
  "nrarr;": 8603,
  "nrtri;": 8939,
  "nsime;": 8772,
  "nsmid;": 8740,
  "nspar;": 8742,
  "nsubE;": 10949,
  "nsube;": 8840,
  "nsucc;": 8833,
  "nsupE;": 10950,
  "nsupe;": 8841,
  ntilde: 241,
  "numsp;": 8199,
  "nvsim;": 8764,
  "nwArr;": 8662,
  "nwarr;": 8598,
  oacute: 243,
  "ocirc;": 244,
  "odash;": 8861,
  "oelig;": 339,
  "ofcir;": 10687,
  ograve: 242,
  "ohbar;": 10677,
  "olarr;": 8634,
  "olcir;": 10686,
  "oline;": 8254,
  "omacr;": 333,
  "omega;": 969,
  "operp;": 10681,
  "oplus;": 8853,
  "orarr;": 8635,
  "order;": 8500,
  oslash: 248,
  otilde: 245,
  "ovbar;": 9021,
  "parsl;": 11005,
  "phone;": 9742,
  "plusb;": 8862,
  "pluse;": 10866,
  plusmn: 177,
  "pound;": 163,
  "prcue;": 8828,
  "prime;": 8242,
  "prnap;": 10937,
  "prsim;": 8830,
  "quest;": 63,
  "rAarr;": 8667,
  "rBarr;": 10511,
  "radic;": 8730,
  "rangd;": 10642,
  "range;": 10661,
  "raquo;": 187,
  "rarrb;": 8677,
  "rarrc;": 10547,
  "rarrw;": 8605,
  "ratio;": 8758,
  "rbarr;": 10509,
  "rbbrk;": 10099,
  "rbrke;": 10636,
  "rceil;": 8969,
  "rdquo;": 8221,
  "reals;": 8477,
  "rhard;": 8641,
  "rharu;": 8640,
  "rlarr;": 8644,
  "rlhar;": 8652,
  "rnmid;": 10990,
  "roang;": 10221,
  "roarr;": 8702,
  "robrk;": 10215,
  "ropar;": 10630,
  "rrarr;": 8649,
  "rsquo;": 8217,
  "rtrie;": 8885,
  "rtrif;": 9656,
  "sbquo;": 8218,
  "sccue;": 8829,
  "scirc;": 349,
  "scnap;": 10938,
  "scsim;": 8831,
  "sdotb;": 8865,
  "sdote;": 10854,
  "seArr;": 8664,
  "searr;": 8600,
  "setmn;": 8726,
  "sharp;": 9839,
  "sigma;": 963,
  "simeq;": 8771,
  "simgE;": 10912,
  "simlE;": 10911,
  "simne;": 8774,
  "slarr;": 8592,
  "smile;": 8995,
  "smtes;": 10924,
  "sqcap;": 8851,
  "sqcup;": 8852,
  "sqsub;": 8847,
  "sqsup;": 8848,
  "srarr;": 8594,
  "starf;": 9733,
  "strns;": 175,
  "subnE;": 10955,
  "subne;": 8842,
  "supnE;": 10956,
  "supne;": 8843,
  "swArr;": 8665,
  "swarr;": 8601,
  "szlig;": 223,
  "theta;": 952,
  "thkap;": 8776,
  "thorn;": 254,
  "tilde;": 732,
  "times;": 215,
  "trade;": 8482,
  "trisb;": 10701,
  "tshcy;": 1115,
  "twixt;": 8812,
  uacute: 250,
  "ubrcy;": 1118,
  "ucirc;": 251,
  "udarr;": 8645,
  "udhar;": 10606,
  ugrave: 249,
  "uharl;": 8639,
  "uharr;": 8638,
  "uhblk;": 9600,
  "ultri;": 9720,
  "umacr;": 363,
  "uogon;": 371,
  "uplus;": 8846,
  "upsih;": 978,
  "uring;": 367,
  "urtri;": 9721,
  "utdot;": 8944,
  "utrif;": 9652,
  "uuarr;": 8648,
  "vBarv;": 10985,
  "vDash;": 8872,
  "varpi;": 982,
  "vdash;": 8866,
  "veeeq;": 8794,
  "vltri;": 8882,
  "vnsub;": 8834,
  "vnsup;": 8835,
  "vprop;": 8733,
  "vrtri;": 8883,
  "wcirc;": 373,
  "wedge;": 8743,
  "xcirc;": 9711,
  "xdtri;": 9661,
  "xhArr;": 10234,
  "xharr;": 10231,
  "xlArr;": 10232,
  "xlarr;": 10229,
  "xodot;": 10752,
  "xrArr;": 10233,
  "xrarr;": 10230,
  "xutri;": 9651,
  yacute: 253,
  "ycirc;": 375,
  AElig: 198,
  Acirc: 194,
  "Aopf;": 120120,
  Aring: 197,
  "Ascr;": 119964,
  "Auml;": 196,
  "Barv;": 10983,
  "Beta;": 914,
  "Bopf;": 120121,
  "Bscr;": 8492,
  "CHcy;": 1063,
  "COPY;": 169,
  "Cdot;": 266,
  "Copf;": 8450,
  "Cscr;": 119966,
  "DJcy;": 1026,
  "DScy;": 1029,
  "DZcy;": 1039,
  "Darr;": 8609,
  "Dopf;": 120123,
  "Dscr;": 119967,
  Ecirc: 202,
  "Edot;": 278,
  "Eopf;": 120124,
  "Escr;": 8496,
  "Esim;": 10867,
  "Euml;": 203,
  "Fopf;": 120125,
  "Fscr;": 8497,
  "GJcy;": 1027,
  "Gdot;": 288,
  "Gopf;": 120126,
  "Gscr;": 119970,
  "Hopf;": 8461,
  "Hscr;": 8459,
  "IEcy;": 1045,
  "IOcy;": 1025,
  Icirc: 206,
  "Idot;": 304,
  "Iopf;": 120128,
  "Iota;": 921,
  "Iscr;": 8464,
  "Iuml;": 207,
  "Jopf;": 120129,
  "Jscr;": 119973,
  "KHcy;": 1061,
  "KJcy;": 1036,
  "Kopf;": 120130,
  "Kscr;": 119974,
  "LJcy;": 1033,
  "Lang;": 10218,
  "Larr;": 8606,
  "Lopf;": 120131,
  "Lscr;": 8466,
  "Mopf;": 120132,
  "Mscr;": 8499,
  "NJcy;": 1034,
  "Nopf;": 8469,
  "Nscr;": 119977,
  Ocirc: 212,
  "Oopf;": 120134,
  "Oscr;": 119978,
  "Ouml;": 214,
  "Popf;": 8473,
  "Pscr;": 119979,
  "QUOT;": 34,
  "Qopf;": 8474,
  "Qscr;": 119980,
  "Rang;": 10219,
  "Rarr;": 8608,
  "Ropf;": 8477,
  "Rscr;": 8475,
  "SHcy;": 1064,
  "Sopf;": 120138,
  "Sqrt;": 8730,
  "Sscr;": 119982,
  "Star;": 8902,
  THORN: 222,
  "TScy;": 1062,
  "Topf;": 120139,
  "Tscr;": 119983,
  "Uarr;": 8607,
  Ucirc: 219,
  "Uopf;": 120140,
  "Upsi;": 978,
  "Uscr;": 119984,
  "Uuml;": 220,
  "Vbar;": 10987,
  "Vert;": 8214,
  "Vopf;": 120141,
  "Vscr;": 119985,
  "Wopf;": 120142,
  "Wscr;": 119986,
  "Xopf;": 120143,
  "Xscr;": 119987,
  "YAcy;": 1071,
  "YIcy;": 1031,
  "YUcy;": 1070,
  "Yopf;": 120144,
  "Yscr;": 119988,
  "Yuml;": 376,
  "ZHcy;": 1046,
  "Zdot;": 379,
  "Zeta;": 918,
  "Zopf;": 8484,
  "Zscr;": 119989,
  acirc: 226,
  acute: 180,
  aelig: 230,
  "andd;": 10844,
  "andv;": 10842,
  "ange;": 10660,
  "aopf;": 120146,
  "apid;": 8779,
  "apos;": 39,
  aring: 229,
  "ascr;": 119990,
  "auml;": 228,
  "bNot;": 10989,
  "bbrk;": 9141,
  "beta;": 946,
  "beth;": 8502,
  "bnot;": 8976,
  "bopf;": 120147,
  "boxH;": 9552,
  "boxV;": 9553,
  "boxh;": 9472,
  "boxv;": 9474,
  "bscr;": 119991,
  "bsim;": 8765,
  "bsol;": 92,
  "bull;": 8226,
  "bump;": 8782,
  "caps;": 8745,
  "cdot;": 267,
  cedil: 184,
  "cent;": 162,
  "chcy;": 1095,
  "cirE;": 10691,
  "circ;": 710,
  "cire;": 8791,
  "comp;": 8705,
  "cong;": 8773,
  "copf;": 120148,
  "copy;": 169,
  "cscr;": 119992,
  "csub;": 10959,
  "csup;": 10960,
  "cups;": 8746,
  "dArr;": 8659,
  "dHar;": 10597,
  "darr;": 8595,
  "dash;": 8208,
  "diam;": 8900,
  "djcy;": 1106,
  "dopf;": 120149,
  "dscr;": 119993,
  "dscy;": 1109,
  "dsol;": 10742,
  "dtri;": 9663,
  "dzcy;": 1119,
  "eDot;": 8785,
  "ecir;": 8790,
  ecirc: 234,
  "edot;": 279,
  "emsp;": 8195,
  "ensp;": 8194,
  "eopf;": 120150,
  "epar;": 8917,
  "epsi;": 949,
  "escr;": 8495,
  "esim;": 8770,
  "euml;": 235,
  "euro;": 8364,
  "excl;": 33,
  "flat;": 9837,
  "fnof;": 402,
  "fopf;": 120151,
  "fork;": 8916,
  "fscr;": 119995,
  "gdot;": 289,
  "geqq;": 8807,
  "gesl;": 8923,
  "gjcy;": 1107,
  "gnap;": 10890,
  "gneq;": 10888,
  "gopf;": 120152,
  "gscr;": 8458,
  "gsim;": 8819,
  "gtcc;": 10919,
  "gvnE;": 8809,
  "hArr;": 8660,
  "half;": 189,
  "harr;": 8596,
  "hbar;": 8463,
  "hopf;": 120153,
  "hscr;": 119997,
  icirc: 238,
  "iecy;": 1077,
  iexcl: 161,
  "imof;": 8887,
  "iocy;": 1105,
  "iopf;": 120154,
  "iota;": 953,
  "iscr;": 119998,
  "isin;": 8712,
  "iuml;": 239,
  "jopf;": 120155,
  "jscr;": 119999,
  "khcy;": 1093,
  "kjcy;": 1116,
  "kopf;": 120156,
  "kscr;": 12e4,
  "lArr;": 8656,
  "lHar;": 10594,
  "lang;": 10216,
  laquo: 171,
  "larr;": 8592,
  "late;": 10925,
  "lcub;": 123,
  "ldca;": 10550,
  "ldsh;": 8626,
  "leqq;": 8806,
  "lesg;": 8922,
  "ljcy;": 1113,
  "lnap;": 10889,
  "lneq;": 10887,
  "lopf;": 120157,
  "lozf;": 10731,
  "lpar;": 40,
  "lscr;": 120001,
  "lsim;": 8818,
  "lsqb;": 91,
  "ltcc;": 10918,
  "ltri;": 9667,
  "lvnE;": 8808,
  "macr;": 175,
  "male;": 9794,
  "malt;": 10016,
  micro: 181,
  "mlcp;": 10971,
  "mldr;": 8230,
  "mopf;": 120158,
  "mscr;": 120002,
  "nGtv;": 8811,
  "nLtv;": 8810,
  "nang;": 8736,
  "napE;": 10864,
  "nbsp;": 160,
  "ncap;": 10819,
  "ncup;": 10818,
  "ngeq;": 8817,
  "nges;": 10878,
  "ngtr;": 8815,
  "nisd;": 8954,
  "njcy;": 1114,
  "nldr;": 8229,
  "nleq;": 8816,
  "nles;": 10877,
  "nmid;": 8740,
  "nopf;": 120159,
  "npar;": 8742,
  "npre;": 10927,
  "nsce;": 10928,
  "nscr;": 120003,
  "nsim;": 8769,
  "nsub;": 8836,
  "nsup;": 8837,
  "ntgl;": 8825,
  "ntlg;": 8824,
  "nvap;": 8781,
  "nvge;": 8805,
  "nvgt;": 62,
  "nvle;": 8804,
  "nvlt;": 60,
  "oast;": 8859,
  "ocir;": 8858,
  ocirc: 244,
  "odiv;": 10808,
  "odot;": 8857,
  "ogon;": 731,
  "oint;": 8750,
  "omid;": 10678,
  "oopf;": 120160,
  "opar;": 10679,
  "ordf;": 170,
  "ordm;": 186,
  "oror;": 10838,
  "oscr;": 8500,
  "osol;": 8856,
  "ouml;": 246,
  "para;": 182,
  "part;": 8706,
  "perp;": 8869,
  "phiv;": 981,
  "plus;": 43,
  "popf;": 120161,
  pound: 163,
  "prap;": 10935,
  "prec;": 8826,
  "prnE;": 10933,
  "prod;": 8719,
  "prop;": 8733,
  "pscr;": 120005,
  "qint;": 10764,
  "qopf;": 120162,
  "qscr;": 120006,
  "quot;": 34,
  "rArr;": 8658,
  "rHar;": 10596,
  "race;": 8765,
  "rang;": 10217,
  raquo: 187,
  "rarr;": 8594,
  "rcub;": 125,
  "rdca;": 10551,
  "rdsh;": 8627,
  "real;": 8476,
  "rect;": 9645,
  "rhov;": 1009,
  "ring;": 730,
  "ropf;": 120163,
  "rpar;": 41,
  "rscr;": 120007,
  "rsqb;": 93,
  "rtri;": 9657,
  "scap;": 10936,
  "scnE;": 10934,
  "sdot;": 8901,
  "sect;": 167,
  "semi;": 59,
  "sext;": 10038,
  "shcy;": 1096,
  "sime;": 8771,
  "simg;": 10910,
  "siml;": 10909,
  "smid;": 8739,
  "smte;": 10924,
  "solb;": 10692,
  "sopf;": 120164,
  "spar;": 8741,
  "squf;": 9642,
  "sscr;": 120008,
  "star;": 9734,
  "subE;": 10949,
  "sube;": 8838,
  "succ;": 8827,
  "sung;": 9834,
  "sup1;": 185,
  "sup2;": 178,
  "sup3;": 179,
  "supE;": 10950,
  "supe;": 8839,
  szlig: 223,
  "tbrk;": 9140,
  "tdot;": 8411,
  thorn: 254,
  times: 215,
  "tint;": 8749,
  "toea;": 10536,
  "topf;": 120165,
  "tosa;": 10537,
  "trie;": 8796,
  "tscr;": 120009,
  "tscy;": 1094,
  "uArr;": 8657,
  "uHar;": 10595,
  "uarr;": 8593,
  ucirc: 251,
  "uopf;": 120166,
  "upsi;": 965,
  "uscr;": 120010,
  "utri;": 9653,
  "uuml;": 252,
  "vArr;": 8661,
  "vBar;": 10984,
  "varr;": 8597,
  "vert;": 124,
  "vopf;": 120167,
  "vscr;": 120011,
  "wopf;": 120168,
  "wscr;": 120012,
  "xcap;": 8898,
  "xcup;": 8899,
  "xmap;": 10236,
  "xnis;": 8955,
  "xopf;": 120169,
  "xscr;": 120013,
  "xvee;": 8897,
  "yacy;": 1103,
  "yicy;": 1111,
  "yopf;": 120170,
  "yscr;": 120014,
  "yucy;": 1102,
  "yuml;": 255,
  "zdot;": 380,
  "zeta;": 950,
  "zhcy;": 1078,
  "zopf;": 120171,
  "zscr;": 120015,
  "zwnj;": 8204,
  "AMP;": 38,
  "Acy;": 1040,
  "Afr;": 120068,
  "And;": 10835,
  Auml: 196,
  "Bcy;": 1041,
  "Bfr;": 120069,
  COPY: 169,
  "Cap;": 8914,
  "Cfr;": 8493,
  "Chi;": 935,
  "Cup;": 8915,
  "Dcy;": 1044,
  "Del;": 8711,
  "Dfr;": 120071,
  "Dot;": 168,
  "ENG;": 330,
  "ETH;": 208,
  "Ecy;": 1069,
  "Efr;": 120072,
  "Eta;": 919,
  Euml: 203,
  "Fcy;": 1060,
  "Ffr;": 120073,
  "Gcy;": 1043,
  "Gfr;": 120074,
  "Hat;": 94,
  "Hfr;": 8460,
  "Icy;": 1048,
  "Ifr;": 8465,
  "Int;": 8748,
  Iuml: 207,
  "Jcy;": 1049,
  "Jfr;": 120077,
  "Kcy;": 1050,
  "Kfr;": 120078,
  "Lcy;": 1051,
  "Lfr;": 120079,
  "Lsh;": 8624,
  "Map;": 10501,
  "Mcy;": 1052,
  "Mfr;": 120080,
  "Ncy;": 1053,
  "Nfr;": 120081,
  "Not;": 10988,
  "Ocy;": 1054,
  "Ofr;": 120082,
  Ouml: 214,
  "Pcy;": 1055,
  "Pfr;": 120083,
  "Phi;": 934,
  "Psi;": 936,
  QUOT: 34,
  "Qfr;": 120084,
  "REG;": 174,
  "Rcy;": 1056,
  "Rfr;": 8476,
  "Rho;": 929,
  "Rsh;": 8625,
  "Scy;": 1057,
  "Sfr;": 120086,
  "Sub;": 8912,
  "Sum;": 8721,
  "Sup;": 8913,
  "Tab;": 9,
  "Tau;": 932,
  "Tcy;": 1058,
  "Tfr;": 120087,
  "Ucy;": 1059,
  "Ufr;": 120088,
  Uuml: 220,
  "Vcy;": 1042,
  "Vee;": 8897,
  "Vfr;": 120089,
  "Wfr;": 120090,
  "Xfr;": 120091,
  "Ycy;": 1067,
  "Yfr;": 120092,
  "Zcy;": 1047,
  "Zfr;": 8488,
  "acE;": 8766,
  "acd;": 8767,
  "acy;": 1072,
  "afr;": 120094,
  "amp;": 38,
  "and;": 8743,
  "ang;": 8736,
  "apE;": 10864,
  "ape;": 8778,
  "ast;": 42,
  auml: 228,
  "bcy;": 1073,
  "bfr;": 120095,
  "bne;": 61,
  "bot;": 8869,
  "cap;": 8745,
  cent: 162,
  "cfr;": 120096,
  "chi;": 967,
  "cir;": 9675,
  copy: 169,
  "cup;": 8746,
  "dcy;": 1076,
  "deg;": 176,
  "dfr;": 120097,
  "die;": 168,
  "div;": 247,
  "dot;": 729,
  "ecy;": 1101,
  "efr;": 120098,
  "egs;": 10902,
  "ell;": 8467,
  "els;": 10901,
  "eng;": 331,
  "eta;": 951,
  "eth;": 240,
  euml: 235,
  "fcy;": 1092,
  "ffr;": 120099,
  "gEl;": 10892,
  "gap;": 10886,
  "gcy;": 1075,
  "gel;": 8923,
  "geq;": 8805,
  "ges;": 10878,
  "gfr;": 120100,
  "ggg;": 8921,
  "glE;": 10898,
  "gla;": 10917,
  "glj;": 10916,
  "gnE;": 8809,
  "gne;": 10888,
  "hfr;": 120101,
  "icy;": 1080,
  "iff;": 8660,
  "ifr;": 120102,
  "int;": 8747,
  iuml: 239,
  "jcy;": 1081,
  "jfr;": 120103,
  "kcy;": 1082,
  "kfr;": 120104,
  "lEg;": 10891,
  "lap;": 10885,
  "lat;": 10923,
  "lcy;": 1083,
  "leg;": 8922,
  "leq;": 8804,
  "les;": 10877,
  "lfr;": 120105,
  "lgE;": 10897,
  "lnE;": 8808,
  "lne;": 10887,
  "loz;": 9674,
  "lrm;": 8206,
  "lsh;": 8624,
  macr: 175,
  "map;": 8614,
  "mcy;": 1084,
  "mfr;": 120106,
  "mho;": 8487,
  "mid;": 8739,
  "nGg;": 8921,
  "nGt;": 8811,
  "nLl;": 8920,
  "nLt;": 8810,
  "nap;": 8777,
  nbsp: 160,
  "ncy;": 1085,
  "nfr;": 120107,
  "ngE;": 8807,
  "nge;": 8817,
  "ngt;": 8815,
  "nis;": 8956,
  "niv;": 8715,
  "nlE;": 8806,
  "nle;": 8816,
  "nlt;": 8814,
  "not;": 172,
  "npr;": 8832,
  "nsc;": 8833,
  "num;": 35,
  "ocy;": 1086,
  "ofr;": 120108,
  "ogt;": 10689,
  "ohm;": 937,
  "olt;": 10688,
  "ord;": 10845,
  ordf: 170,
  ordm: 186,
  "orv;": 10843,
  ouml: 246,
  "par;": 8741,
  para: 182,
  "pcy;": 1087,
  "pfr;": 120109,
  "phi;": 966,
  "piv;": 982,
  "prE;": 10931,
  "pre;": 10927,
  "psi;": 968,
  "qfr;": 120110,
  quot: 34,
  "rcy;": 1088,
  "reg;": 174,
  "rfr;": 120111,
  "rho;": 961,
  "rlm;": 8207,
  "rsh;": 8625,
  "scE;": 10932,
  "sce;": 10928,
  "scy;": 1089,
  sect: 167,
  "sfr;": 120112,
  "shy;": 173,
  "sim;": 8764,
  "smt;": 10922,
  "sol;": 47,
  "squ;": 9633,
  "sub;": 8834,
  "sum;": 8721,
  sup1: 185,
  sup2: 178,
  sup3: 179,
  "sup;": 8835,
  "tau;": 964,
  "tcy;": 1090,
  "tfr;": 120113,
  "top;": 8868,
  "ucy;": 1091,
  "ufr;": 120114,
  "uml;": 168,
  uuml: 252,
  "vcy;": 1074,
  "vee;": 8744,
  "vfr;": 120115,
  "wfr;": 120116,
  "xfr;": 120117,
  "ycy;": 1099,
  "yen;": 165,
  "yfr;": 120118,
  yuml: 255,
  "zcy;": 1079,
  "zfr;": 120119,
  "zwj;": 8205,
  AMP: 38,
  "DD;": 8517,
  ETH: 208,
  "GT;": 62,
  "Gg;": 8921,
  "Gt;": 8811,
  "Im;": 8465,
  "LT;": 60,
  "Ll;": 8920,
  "Lt;": 8810,
  "Mu;": 924,
  "Nu;": 925,
  "Or;": 10836,
  "Pi;": 928,
  "Pr;": 10939,
  REG: 174,
  "Re;": 8476,
  "Sc;": 10940,
  "Xi;": 926,
  "ac;": 8766,
  "af;": 8289,
  amp: 38,
  "ap;": 8776,
  "dd;": 8518,
  deg: 176,
  "ee;": 8519,
  "eg;": 10906,
  "el;": 10905,
  eth: 240,
  "gE;": 8807,
  "ge;": 8805,
  "gg;": 8811,
  "gl;": 8823,
  "gt;": 62,
  "ic;": 8291,
  "ii;": 8520,
  "in;": 8712,
  "it;": 8290,
  "lE;": 8806,
  "le;": 8804,
  "lg;": 8822,
  "ll;": 8810,
  "lt;": 60,
  "mp;": 8723,
  "mu;": 956,
  "ne;": 8800,
  "ni;": 8715,
  not: 172,
  "nu;": 957,
  "oS;": 9416,
  "or;": 8744,
  "pi;": 960,
  "pm;": 177,
  "pr;": 8826,
  reg: 174,
  "rx;": 8478,
  "sc;": 8827,
  shy: 173,
  uml: 168,
  "wp;": 8472,
  "wr;": 8768,
  "xi;": 958,
  yen: 165,
  GT: 62,
  LT: 60,
  gt: 62,
  lt: 60,
};
function R1(e, t) {
  return t && !e.endsWith(";") ? `${e}\\b(?!=)` : e;
}
function Lf(e) {
  const t = "#(?:x[a-fA-F\\d]+|\\d+)(?:;)?",
    a = Object.keys(y1).map((o) => R1(o, e));
  return new RegExp(`&(${t}|${a.join("|")})`, "g");
}
Lf(!1);
Lf(!0);
const g1 = new Map([
  ["svelte:head", "SvelteHead"],
  ["svelte:options", "SvelteOptions"],
  ["svelte:window", "SvelteWindow"],
  ["svelte:document", "SvelteDocument"],
  ["svelte:body", "SvelteBody"],
]);
new Map([
  ...g1,
  ["svelte:element", "SvelteElement"],
  ["svelte:component", "SvelteComponent"],
  ["svelte:self", "SvelteSelf"],
  ["svelte:fragment", "SvelteFragment"],
  ["svelte:boundary", "SvelteBoundary"],
]);
var me = {},
  Qe = {},
  Tn = {},
  Je = {},
  Pl;
function x1() {
  if (Pl) return Je;
  ((Pl = 1),
    Object.defineProperty(Je, "__esModule", { value: !0 }),
    (Je.default = void 0));
  function e() {
    var t = this,
      a = 0,
      s = {
        "@@iterator": function () {
          return s;
        },
        next: function () {
          if (a < t.length) {
            var c = t[a];
            return ((a = a + 1), { done: !1, value: c });
          } else return { done: !0 };
        },
      };
    return s;
  }
  return ((Je.default = e), Je);
}
var ql;
function bn() {
  if (ql) return Tn;
  ((ql = 1),
    Object.defineProperty(Tn, "__esModule", { value: !0 }),
    (Tn.default = s));
  var e = t(x1());
  function t(o) {
    return o && o.__esModule ? o : { default: o };
  }
  function a(o) {
    "@babel/helpers - typeof";
    return (
      (a =
        typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
          ? function (c) {
              return typeof c;
            }
          : function (c) {
              return c &&
                typeof Symbol == "function" &&
                c.constructor === Symbol &&
                c !== Symbol.prototype
                ? "symbol"
                : typeof c;
            }),
      a(o)
    );
  }
  function s(o, c) {
    return (
      typeof Symbol == "function" &&
        a(Symbol.iterator) === "symbol" &&
        Object.defineProperty(o, Symbol.iterator, { value: e.default.bind(c) }),
      o
    );
  }
  return Tn;
}
var Tl;
function C1() {
  if (Tl) return Qe;
  ((Tl = 1),
    Object.defineProperty(Qe, "__esModule", { value: !0 }),
    (Qe.default = void 0));
  var e = t(bn());
  function t(f) {
    return f && f.__esModule ? f : { default: f };
  }
  function a(f, T) {
    return b(f) || n(f, T) || o(f, T) || s();
  }
  function s() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function o(f, T) {
    if (f) {
      if (typeof f == "string") return c(f, T);
      var A = {}.toString.call(f).slice(8, -1);
      return (
        A === "Object" && f.constructor && (A = f.constructor.name),
        A === "Map" || A === "Set"
          ? Array.from(f)
          : A === "Arguments" ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(A)
            ? c(f, T)
            : void 0
      );
    }
  }
  function c(f, T) {
    (T == null || T > f.length) && (T = f.length);
    for (var A = 0, k = Array(T); A < T; A++) k[A] = f[A];
    return k;
  }
  function n(f, T) {
    var A =
      f == null
        ? null
        : (typeof Symbol < "u" && f[Symbol.iterator]) || f["@@iterator"];
    if (A != null) {
      var k,
        L,
        I,
        y,
        h = [],
        p = !0,
        m = !1;
      try {
        if (((I = (A = A.call(f)).next), T === 0)) {
          if (Object(A) !== A) return;
          p = !1;
        } else
          for (
            ;
            !(p = (k = I.call(A)).done) && (h.push(k.value), h.length !== T);
            p = !0
          );
      } catch (x) {
        ((m = !0), (L = x));
      } finally {
        try {
          if (!p && A.return != null && ((y = A.return()), Object(y) !== y))
            return;
        } finally {
          if (m) throw L;
        }
      }
      return h;
    }
  }
  function b(f) {
    if (Array.isArray(f)) return f;
  }
  var g = [
      ["aria-activedescendant", { type: "id" }],
      ["aria-atomic", { type: "boolean" }],
      [
        "aria-autocomplete",
        { type: "token", values: ["inline", "list", "both", "none"] },
      ],
      ["aria-braillelabel", { type: "string" }],
      ["aria-brailleroledescription", { type: "string" }],
      ["aria-busy", { type: "boolean" }],
      ["aria-checked", { type: "tristate" }],
      ["aria-colcount", { type: "integer" }],
      ["aria-colindex", { type: "integer" }],
      ["aria-colspan", { type: "integer" }],
      ["aria-controls", { type: "idlist" }],
      [
        "aria-current",
        {
          type: "token",
          values: ["page", "step", "location", "date", "time", !0, !1],
        },
      ],
      ["aria-describedby", { type: "idlist" }],
      ["aria-description", { type: "string" }],
      ["aria-details", { type: "id" }],
      ["aria-disabled", { type: "boolean" }],
      [
        "aria-dropeffect",
        {
          type: "tokenlist",
          values: ["copy", "execute", "link", "move", "none", "popup"],
        },
      ],
      ["aria-errormessage", { type: "id" }],
      ["aria-expanded", { type: "boolean", allowundefined: !0 }],
      ["aria-flowto", { type: "idlist" }],
      ["aria-grabbed", { type: "boolean", allowundefined: !0 }],
      [
        "aria-haspopup",
        {
          type: "token",
          values: [!1, !0, "menu", "listbox", "tree", "grid", "dialog"],
        },
      ],
      ["aria-hidden", { type: "boolean", allowundefined: !0 }],
      [
        "aria-invalid",
        { type: "token", values: ["grammar", !1, "spelling", !0] },
      ],
      ["aria-keyshortcuts", { type: "string" }],
      ["aria-label", { type: "string" }],
      ["aria-labelledby", { type: "idlist" }],
      ["aria-level", { type: "integer" }],
      ["aria-live", { type: "token", values: ["assertive", "off", "polite"] }],
      ["aria-modal", { type: "boolean" }],
      ["aria-multiline", { type: "boolean" }],
      ["aria-multiselectable", { type: "boolean" }],
      [
        "aria-orientation",
        { type: "token", values: ["vertical", "undefined", "horizontal"] },
      ],
      ["aria-owns", { type: "idlist" }],
      ["aria-placeholder", { type: "string" }],
      ["aria-posinset", { type: "integer" }],
      ["aria-pressed", { type: "tristate" }],
      ["aria-readonly", { type: "boolean" }],
      [
        "aria-relevant",
        { type: "tokenlist", values: ["additions", "all", "removals", "text"] },
      ],
      ["aria-required", { type: "boolean" }],
      ["aria-roledescription", { type: "string" }],
      ["aria-rowcount", { type: "integer" }],
      ["aria-rowindex", { type: "integer" }],
      ["aria-rowspan", { type: "integer" }],
      ["aria-selected", { type: "boolean", allowundefined: !0 }],
      ["aria-setsize", { type: "integer" }],
      [
        "aria-sort",
        { type: "token", values: ["ascending", "descending", "none", "other"] },
      ],
      ["aria-valuemax", { type: "number" }],
      ["aria-valuemin", { type: "number" }],
      ["aria-valuenow", { type: "number" }],
      ["aria-valuetext", { type: "string" }],
    ],
    q = {
      entries: function () {
        return g;
      },
      forEach: function (T) {
        for (
          var A =
              arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : null,
            k = 0,
            L = g;
          k < L.length;
          k++
        ) {
          var I = a(L[k], 2),
            y = I[0],
            h = I[1];
          T.call(A, h, y, g);
        }
      },
      get: function (T) {
        var A = g.filter(function (k) {
          return k[0] === T;
        })[0];
        return A && A[1];
      },
      has: function (T) {
        return !!q.get(T);
      },
      keys: function () {
        return g.map(function (T) {
          var A = a(T, 1),
            k = A[0];
          return k;
        });
      },
      values: function () {
        return g.map(function (T) {
          var A = a(T, 2),
            k = A[1];
          return k;
        });
      },
    };
  return ((Qe.default = (0, e.default)(q, q.entries())), Qe);
}
var Ze = {},
  Al;
function _1() {
  if (Al) return Ze;
  ((Al = 1),
    Object.defineProperty(Ze, "__esModule", { value: !0 }),
    (Ze.default = void 0));
  var e = t(bn());
  function t(f) {
    return f && f.__esModule ? f : { default: f };
  }
  function a(f, T) {
    return b(f) || n(f, T) || o(f, T) || s();
  }
  function s() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function o(f, T) {
    if (f) {
      if (typeof f == "string") return c(f, T);
      var A = {}.toString.call(f).slice(8, -1);
      return (
        A === "Object" && f.constructor && (A = f.constructor.name),
        A === "Map" || A === "Set"
          ? Array.from(f)
          : A === "Arguments" ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(A)
            ? c(f, T)
            : void 0
      );
    }
  }
  function c(f, T) {
    (T == null || T > f.length) && (T = f.length);
    for (var A = 0, k = Array(T); A < T; A++) k[A] = f[A];
    return k;
  }
  function n(f, T) {
    var A =
      f == null
        ? null
        : (typeof Symbol < "u" && f[Symbol.iterator]) || f["@@iterator"];
    if (A != null) {
      var k,
        L,
        I,
        y,
        h = [],
        p = !0,
        m = !1;
      try {
        if (((I = (A = A.call(f)).next), T === 0)) {
          if (Object(A) !== A) return;
          p = !1;
        } else
          for (
            ;
            !(p = (k = I.call(A)).done) && (h.push(k.value), h.length !== T);
            p = !0
          );
      } catch (x) {
        ((m = !0), (L = x));
      } finally {
        try {
          if (!p && A.return != null && ((y = A.return()), Object(y) !== y))
            return;
        } finally {
          if (m) throw L;
        }
      }
      return h;
    }
  }
  function b(f) {
    if (Array.isArray(f)) return f;
  }
  var g = [
      ["a", { reserved: !1 }],
      ["abbr", { reserved: !1 }],
      ["acronym", { reserved: !1 }],
      ["address", { reserved: !1 }],
      ["applet", { reserved: !1 }],
      ["area", { reserved: !1 }],
      ["article", { reserved: !1 }],
      ["aside", { reserved: !1 }],
      ["audio", { reserved: !1 }],
      ["b", { reserved: !1 }],
      ["base", { reserved: !0 }],
      ["bdi", { reserved: !1 }],
      ["bdo", { reserved: !1 }],
      ["big", { reserved: !1 }],
      ["blink", { reserved: !1 }],
      ["blockquote", { reserved: !1 }],
      ["body", { reserved: !1 }],
      ["br", { reserved: !1 }],
      ["button", { reserved: !1 }],
      ["canvas", { reserved: !1 }],
      ["caption", { reserved: !1 }],
      ["center", { reserved: !1 }],
      ["cite", { reserved: !1 }],
      ["code", { reserved: !1 }],
      ["col", { reserved: !0 }],
      ["colgroup", { reserved: !0 }],
      ["content", { reserved: !1 }],
      ["data", { reserved: !1 }],
      ["datalist", { reserved: !1 }],
      ["dd", { reserved: !1 }],
      ["del", { reserved: !1 }],
      ["details", { reserved: !1 }],
      ["dfn", { reserved: !1 }],
      ["dialog", { reserved: !1 }],
      ["dir", { reserved: !1 }],
      ["div", { reserved: !1 }],
      ["dl", { reserved: !1 }],
      ["dt", { reserved: !1 }],
      ["em", { reserved: !1 }],
      ["embed", { reserved: !1 }],
      ["fieldset", { reserved: !1 }],
      ["figcaption", { reserved: !1 }],
      ["figure", { reserved: !1 }],
      ["font", { reserved: !1 }],
      ["footer", { reserved: !1 }],
      ["form", { reserved: !1 }],
      ["frame", { reserved: !1 }],
      ["frameset", { reserved: !1 }],
      ["h1", { reserved: !1 }],
      ["h2", { reserved: !1 }],
      ["h3", { reserved: !1 }],
      ["h4", { reserved: !1 }],
      ["h5", { reserved: !1 }],
      ["h6", { reserved: !1 }],
      ["head", { reserved: !0 }],
      ["header", { reserved: !1 }],
      ["hgroup", { reserved: !1 }],
      ["hr", { reserved: !1 }],
      ["html", { reserved: !0 }],
      ["i", { reserved: !1 }],
      ["iframe", { reserved: !1 }],
      ["img", { reserved: !1 }],
      ["input", { reserved: !1 }],
      ["ins", { reserved: !1 }],
      ["kbd", { reserved: !1 }],
      ["keygen", { reserved: !1 }],
      ["label", { reserved: !1 }],
      ["legend", { reserved: !1 }],
      ["li", { reserved: !1 }],
      ["link", { reserved: !0 }],
      ["main", { reserved: !1 }],
      ["map", { reserved: !1 }],
      ["mark", { reserved: !1 }],
      ["marquee", { reserved: !1 }],
      ["menu", { reserved: !1 }],
      ["menuitem", { reserved: !1 }],
      ["meta", { reserved: !0 }],
      ["meter", { reserved: !1 }],
      ["nav", { reserved: !1 }],
      ["noembed", { reserved: !0 }],
      ["noscript", { reserved: !0 }],
      ["object", { reserved: !1 }],
      ["ol", { reserved: !1 }],
      ["optgroup", { reserved: !1 }],
      ["option", { reserved: !1 }],
      ["output", { reserved: !1 }],
      ["p", { reserved: !1 }],
      ["param", { reserved: !0 }],
      ["picture", { reserved: !0 }],
      ["pre", { reserved: !1 }],
      ["progress", { reserved: !1 }],
      ["q", { reserved: !1 }],
      ["rp", { reserved: !1 }],
      ["rt", { reserved: !1 }],
      ["rtc", { reserved: !1 }],
      ["ruby", { reserved: !1 }],
      ["s", { reserved: !1 }],
      ["samp", { reserved: !1 }],
      ["script", { reserved: !0 }],
      ["section", { reserved: !1 }],
      ["select", { reserved: !1 }],
      ["small", { reserved: !1 }],
      ["source", { reserved: !0 }],
      ["spacer", { reserved: !1 }],
      ["span", { reserved: !1 }],
      ["strike", { reserved: !1 }],
      ["strong", { reserved: !1 }],
      ["style", { reserved: !0 }],
      ["sub", { reserved: !1 }],
      ["summary", { reserved: !1 }],
      ["sup", { reserved: !1 }],
      ["table", { reserved: !1 }],
      ["tbody", { reserved: !1 }],
      ["td", { reserved: !1 }],
      ["textarea", { reserved: !1 }],
      ["tfoot", { reserved: !1 }],
      ["th", { reserved: !1 }],
      ["thead", { reserved: !1 }],
      ["time", { reserved: !1 }],
      ["title", { reserved: !0 }],
      ["tr", { reserved: !1 }],
      ["track", { reserved: !0 }],
      ["tt", { reserved: !1 }],
      ["u", { reserved: !1 }],
      ["ul", { reserved: !1 }],
      ["var", { reserved: !1 }],
      ["video", { reserved: !1 }],
      ["wbr", { reserved: !1 }],
      ["xmp", { reserved: !1 }],
    ],
    q = {
      entries: function () {
        return g;
      },
      forEach: function (T) {
        for (
          var A =
              arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : null,
            k = 0,
            L = g;
          k < L.length;
          k++
        ) {
          var I = a(L[k], 2),
            y = I[0],
            h = I[1];
          T.call(A, h, y, g);
        }
      },
      get: function (T) {
        var A = g.filter(function (k) {
          return k[0] === T;
        })[0];
        return A && A[1];
      },
      has: function (T) {
        return !!q.get(T);
      },
      keys: function () {
        return g.map(function (T) {
          var A = a(T, 1),
            k = A[0];
          return k;
        });
      },
      values: function () {
        return g.map(function (T) {
          var A = a(T, 2),
            k = A[1];
          return k;
        });
      },
    };
  return ((Ze.default = (0, e.default)(q, q.entries())), Ze);
}
var et = {},
  tt = {},
  rt = {},
  wl;
function P1() {
  if (wl) return rt;
  ((wl = 1),
    Object.defineProperty(rt, "__esModule", { value: !0 }),
    (rt.default = void 0));
  var e = {
    abstract: !0,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget"]],
  };
  return ((rt.default = e), rt);
}
var at = {},
  Sl;
function q1() {
  if (Sl) return at;
  ((Sl = 1),
    Object.defineProperty(at, "__esModule", { value: !0 }),
    (at.default = void 0));
  var e = {
    abstract: !0,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: { "aria-activedescendant": null, "aria-disabled": null },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget"]],
  };
  return ((at.default = e), at);
}
var it = {},
  kl;
function T1() {
  if (kl) return it;
  ((kl = 1),
    Object.defineProperty(it, "__esModule", { value: !0 }),
    (it.default = void 0));
  var e = {
    abstract: !0,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: { "aria-disabled": null },
    relatedConcepts: [{ concept: { name: "input" }, module: "XForms" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget"]],
  };
  return ((it.default = e), it);
}
var st = {},
  El;
function A1() {
  if (El) return st;
  ((El = 1),
    Object.defineProperty(st, "__esModule", { value: !0 }),
    (st.default = void 0));
  var e = {
    abstract: !0,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((st.default = e), st);
}
var nt = {},
  Il;
function w1() {
  if (Il) return nt;
  ((Il = 1),
    Object.defineProperty(nt, "__esModule", { value: !0 }),
    (nt.default = void 0));
  var e = {
    abstract: !0,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-valuemax": null,
      "aria-valuemin": null,
      "aria-valuenow": null,
    },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure"]],
  };
  return ((nt.default = e), nt);
}
var ot = {},
  Ml;
function S1() {
  if (Ml) return ot;
  ((Ml = 1),
    Object.defineProperty(ot, "__esModule", { value: !0 }),
    (ot.default = void 0));
  var e = {
    abstract: !0,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: [],
    prohibitedProps: [],
    props: {
      "aria-atomic": null,
      "aria-busy": null,
      "aria-controls": null,
      "aria-current": null,
      "aria-describedby": null,
      "aria-details": null,
      "aria-dropeffect": null,
      "aria-flowto": null,
      "aria-grabbed": null,
      "aria-hidden": null,
      "aria-keyshortcuts": null,
      "aria-label": null,
      "aria-labelledby": null,
      "aria-live": null,
      "aria-owns": null,
      "aria-relevant": null,
      "aria-roledescription": null,
    },
    relatedConcepts: [
      { concept: { name: "role" }, module: "XHTML" },
      { concept: { name: "type" }, module: "Dublin Core" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [],
  };
  return ((ot.default = e), ot);
}
var lt = {},
  Ll;
function k1() {
  if (Ll) return lt;
  ((Ll = 1),
    Object.defineProperty(lt, "__esModule", { value: !0 }),
    (lt.default = void 0));
  var e = {
    abstract: !0,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: [],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [
      { concept: { name: "frontmatter" }, module: "DTB" },
      { concept: { name: "level" }, module: "DTB" },
      { concept: { name: "level" }, module: "SMIL" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure"]],
  };
  return ((lt.default = e), lt);
}
var ut = {},
  Ol;
function E1() {
  if (Ol) return ut;
  ((Ol = 1),
    Object.defineProperty(ut, "__esModule", { value: !0 }),
    (ut.default = void 0));
  var e = {
    abstract: !0,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure"]],
  };
  return ((ut.default = e), ut);
}
var ct = {},
  Nl;
function I1() {
  if (Nl) return ct;
  ((Nl = 1),
    Object.defineProperty(ct, "__esModule", { value: !0 }),
    (ct.default = void 0));
  var e = {
    abstract: !0,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: { "aria-orientation": null },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [
      ["roletype", "widget", "composite"],
      ["roletype", "structure", "section", "group"],
    ],
  };
  return ((ct.default = e), ct);
}
var dt = {},
  Dl;
function M1() {
  if (Dl) return dt;
  ((Dl = 1),
    Object.defineProperty(dt, "__esModule", { value: !0 }),
    (dt.default = void 0));
  var e = {
    abstract: !0,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: [],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype"]],
  };
  return ((dt.default = e), dt);
}
var pt = {},
  Bl;
function L1() {
  if (Bl) return pt;
  ((Bl = 1),
    Object.defineProperty(pt, "__esModule", { value: !0 }),
    (pt.default = void 0));
  var e = {
    abstract: !0,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: [],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype"]],
  };
  return ((pt.default = e), pt);
}
var ht = {},
  Fl;
function O1() {
  if (Fl) return ht;
  ((Fl = 1),
    Object.defineProperty(ht, "__esModule", { value: !0 }),
    (ht.default = void 0));
  var e = {
    abstract: !0,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: { "aria-modal": null },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype"]],
  };
  return ((ht.default = e), ht);
}
var jl;
function N1() {
  if (jl) return tt;
  ((jl = 1),
    Object.defineProperty(tt, "__esModule", { value: !0 }),
    (tt.default = void 0));
  var e = A(P1()),
    t = A(q1()),
    a = A(T1()),
    s = A(A1()),
    o = A(w1()),
    c = A(S1()),
    n = A(k1()),
    b = A(E1()),
    g = A(I1()),
    q = A(M1()),
    f = A(L1()),
    T = A(O1());
  function A(L) {
    return L && L.__esModule ? L : { default: L };
  }
  var k = [
    ["command", e.default],
    ["composite", t.default],
    ["input", a.default],
    ["landmark", s.default],
    ["range", o.default],
    ["roletype", c.default],
    ["section", n.default],
    ["sectionhead", b.default],
    ["select", g.default],
    ["structure", q.default],
    ["widget", f.default],
    ["window", T.default],
  ];
  return ((tt.default = k), tt);
}
var ft = {},
  mt = {},
  Vl;
function D1() {
  if (Vl) return mt;
  ((Vl = 1),
    Object.defineProperty(mt, "__esModule", { value: !0 }),
    (mt.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: { "aria-atomic": "true", "aria-live": "assertive" },
    relatedConcepts: [{ concept: { name: "alert" }, module: "XForms" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((mt.default = e), mt);
}
var vt = {},
  $l;
function B1() {
  if ($l) return vt;
  (($l = 1),
    Object.defineProperty(vt, "__esModule", { value: !0 }),
    (vt.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{ concept: { name: "alert" }, module: "XForms" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [
      ["roletype", "structure", "section", "alert"],
      ["roletype", "window", "dialog"],
    ],
  };
  return ((vt.default = e), vt);
}
var bt = {},
  Hl;
function F1() {
  if (Hl) return bt;
  ((Hl = 1),
    Object.defineProperty(bt, "__esModule", { value: !0 }),
    (bt.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-activedescendant": null,
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { concept: { name: "Device Independence Delivery Unit" } },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure"]],
  };
  return ((bt.default = e), bt);
}
var yt = {},
  Ul;
function j1() {
  if (Ul) return yt;
  ((Ul = 1),
    Object.defineProperty(yt, "__esModule", { value: !0 }),
    (yt.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: { "aria-posinset": null, "aria-setsize": null },
    relatedConcepts: [{ concept: { name: "article" }, module: "HTML" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "document"]],
  };
  return ((yt.default = e), yt);
}
var Rt = {},
  Gl;
function V1() {
  if (Gl) return Rt;
  ((Gl = 1),
    Object.defineProperty(Rt, "__esModule", { value: !0 }),
    (Rt.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [
      {
        concept: {
          constraints: ["scoped to the body element"],
          name: "header",
        },
        module: "HTML",
      },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]],
  };
  return ((Rt.default = e), Rt);
}
var gt = {},
  Wl;
function $1() {
  if (Wl) return gt;
  ((Wl = 1),
    Object.defineProperty(gt, "__esModule", { value: !0 }),
    (gt.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{ concept: { name: "blockquote" }, module: "HTML" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((gt.default = e), gt);
}
var xt = {},
  zl;
function H1() {
  if (zl) return xt;
  ((zl = 1),
    Object.defineProperty(xt, "__esModule", { value: !0 }),
    (xt.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !0,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-pressed": null,
    },
    relatedConcepts: [
      {
        concept: {
          attributes: [{ name: "type", value: "button" }],
          name: "input",
        },
        module: "HTML",
      },
      {
        concept: {
          attributes: [{ name: "type", value: "image" }],
          name: "input",
        },
        module: "HTML",
      },
      {
        concept: {
          attributes: [{ name: "type", value: "reset" }],
          name: "input",
        },
        module: "HTML",
      },
      {
        concept: {
          attributes: [{ name: "type", value: "submit" }],
          name: "input",
        },
        module: "HTML",
      },
      { concept: { name: "button" }, module: "HTML" },
      { concept: { name: "trigger" }, module: "XForms" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "command"]],
  };
  return ((xt.default = e), xt);
}
var Ct = {},
  Kl;
function U1() {
  if (Kl) return Ct;
  ((Kl = 1),
    Object.defineProperty(Ct, "__esModule", { value: !0 }),
    (Ct.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [{ concept: { name: "caption" }, module: "HTML" }],
    requireContextRole: ["figure", "grid", "table"],
    requiredContextRole: ["figure", "grid", "table"],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((Ct.default = e), Ct);
}
var _t = {},
  Xl;
function G1() {
  if (Xl) return _t;
  ((Xl = 1),
    Object.defineProperty(_t, "__esModule", { value: !0 }),
    (_t.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-colindex": null,
      "aria-colspan": null,
      "aria-rowindex": null,
      "aria-rowspan": null,
    },
    relatedConcepts: [
      {
        concept: {
          constraints: ["ancestor table element has table role"],
          name: "td",
        },
        module: "HTML",
      },
    ],
    requireContextRole: ["row"],
    requiredContextRole: ["row"],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((_t.default = e), _t);
}
var Pt = {},
  Yl;
function W1() {
  if (Yl) return Pt;
  ((Yl = 1),
    Object.defineProperty(Pt, "__esModule", { value: !0 }),
    (Pt.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !0,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-checked": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-invalid": null,
      "aria-readonly": null,
      "aria-required": null,
    },
    relatedConcepts: [
      {
        concept: {
          attributes: [{ name: "type", value: "checkbox" }],
          name: "input",
        },
        module: "HTML",
      },
      { concept: { name: "option" }, module: "ARIA" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: { "aria-checked": null },
    superClass: [["roletype", "widget", "input"]],
  };
  return ((Pt.default = e), Pt);
}
var qt = {},
  Ql;
function z1() {
  if (Ql) return qt;
  ((Ql = 1),
    Object.defineProperty(qt, "__esModule", { value: !0 }),
    (qt.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [{ concept: { name: "code" }, module: "HTML" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((qt.default = e), qt);
}
var Tt = {},
  Jl;
function K1() {
  if (Jl) return Tt;
  ((Jl = 1),
    Object.defineProperty(Tt, "__esModule", { value: !0 }),
    (Tt.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: { "aria-sort": null },
    relatedConcepts: [
      { concept: { name: "th" }, module: "HTML" },
      {
        concept: { attributes: [{ name: "scope", value: "col" }], name: "th" },
        module: "HTML",
      },
      {
        concept: {
          attributes: [{ name: "scope", value: "colgroup" }],
          name: "th",
        },
        module: "HTML",
      },
    ],
    requireContextRole: ["row"],
    requiredContextRole: ["row"],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [
      ["roletype", "structure", "section", "cell"],
      ["roletype", "structure", "section", "cell", "gridcell"],
      ["roletype", "widget", "gridcell"],
      ["roletype", "structure", "sectionhead"],
    ],
  };
  return ((Tt.default = e), Tt);
}
var At = {},
  Zl;
function X1() {
  if (Zl) return At;
  ((Zl = 1),
    Object.defineProperty(At, "__esModule", { value: !0 }),
    (At.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-activedescendant": null,
      "aria-autocomplete": null,
      "aria-errormessage": null,
      "aria-invalid": null,
      "aria-readonly": null,
      "aria-required": null,
      "aria-expanded": "false",
      "aria-haspopup": "listbox",
    },
    relatedConcepts: [
      {
        concept: {
          attributes: [
            { constraints: ["set"], name: "list" },
            { name: "type", value: "email" },
          ],
          name: "input",
        },
        module: "HTML",
      },
      {
        concept: {
          attributes: [
            { constraints: ["set"], name: "list" },
            { name: "type", value: "search" },
          ],
          name: "input",
        },
        module: "HTML",
      },
      {
        concept: {
          attributes: [
            { constraints: ["set"], name: "list" },
            { name: "type", value: "tel" },
          ],
          name: "input",
        },
        module: "HTML",
      },
      {
        concept: {
          attributes: [
            { constraints: ["set"], name: "list" },
            { name: "type", value: "text" },
          ],
          name: "input",
        },
        module: "HTML",
      },
      {
        concept: {
          attributes: [
            { constraints: ["set"], name: "list" },
            { name: "type", value: "url" },
          ],
          name: "input",
        },
        module: "HTML",
      },
      {
        concept: {
          attributes: [
            { constraints: ["set"], name: "list" },
            { name: "type", value: "url" },
          ],
          name: "input",
        },
        module: "HTML",
      },
      {
        concept: {
          attributes: [
            { constraints: ["undefined"], name: "multiple" },
            { constraints: ["undefined"], name: "size" },
          ],
          constraints: [
            "the multiple attribute is not set and the size attribute does not have a value greater than 1",
          ],
          name: "select",
        },
        module: "HTML",
      },
      { concept: { name: "select" }, module: "XForms" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: { "aria-controls": null, "aria-expanded": "false" },
    superClass: [["roletype", "widget", "input"]],
  };
  return ((At.default = e), At);
}
var wt = {},
  eu;
function Y1() {
  if (eu) return wt;
  ((eu = 1),
    Object.defineProperty(wt, "__esModule", { value: !0 }),
    (wt.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [
      {
        concept: {
          constraints: [
            "scoped to the body element",
            "scoped to the main element",
          ],
          name: "aside",
        },
        module: "HTML",
      },
      {
        concept: {
          attributes: [{ constraints: ["set"], name: "aria-label" }],
          constraints: [
            "scoped to a sectioning content element",
            "scoped to a sectioning root element other than body",
          ],
          name: "aside",
        },
        module: "HTML",
      },
      {
        concept: {
          attributes: [{ constraints: ["set"], name: "aria-labelledby" }],
          constraints: [
            "scoped to a sectioning content element",
            "scoped to a sectioning root element other than body",
          ],
          name: "aside",
        },
        module: "HTML",
      },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]],
  };
  return ((wt.default = e), wt);
}
var St = {},
  tu;
function Q1() {
  if (tu) return St;
  ((tu = 1),
    Object.defineProperty(St, "__esModule", { value: !0 }),
    (St.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [
      {
        concept: {
          constraints: ["scoped to the body element"],
          name: "footer",
        },
        module: "HTML",
      },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]],
  };
  return ((St.default = e), St);
}
var kt = {},
  ru;
function J1() {
  if (ru) return kt;
  ((ru = 1),
    Object.defineProperty(kt, "__esModule", { value: !0 }),
    (kt.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{ concept: { name: "dd" }, module: "HTML" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((kt.default = e), kt);
}
var Et = {},
  au;
function Z1() {
  if (au) return Et;
  ((au = 1),
    Object.defineProperty(Et, "__esModule", { value: !0 }),
    (Et.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [{ concept: { name: "del" }, module: "HTML" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((Et.default = e), Et);
}
var It = {},
  iu;
function eb() {
  if (iu) return It;
  ((iu = 1),
    Object.defineProperty(It, "__esModule", { value: !0 }),
    (It.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{ concept: { name: "dialog" }, module: "HTML" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "window"]],
  };
  return ((It.default = e), It);
}
var Mt = {},
  su;
function tb() {
  if (su) return Mt;
  ((su = 1),
    Object.defineProperty(Mt, "__esModule", { value: !0 }),
    (Mt.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{ module: "DAISY Guide" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "list"]],
  };
  return ((Mt.default = e), Mt);
}
var Lt = {},
  nu;
function rb() {
  if (nu) return Lt;
  ((nu = 1),
    Object.defineProperty(Lt, "__esModule", { value: !0 }),
    (Lt.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [
      { concept: { name: "Device Independence Delivery Unit" } },
      { concept: { name: "html" }, module: "HTML" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure"]],
  };
  return ((Lt.default = e), Lt);
}
var Ot = {},
  ou;
function ab() {
  if (ou) return Ot;
  ((ou = 1),
    Object.defineProperty(Ot, "__esModule", { value: !0 }),
    (Ot.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [{ concept: { name: "em" }, module: "HTML" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((Ot.default = e), Ot);
}
var Nt = {},
  lu;
function ib() {
  if (lu) return Nt;
  ((lu = 1),
    Object.defineProperty(Nt, "__esModule", { value: !0 }),
    (Nt.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["article"]],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "list"]],
  };
  return ((Nt.default = e), Nt);
}
var Dt = {},
  uu;
function sb() {
  if (uu) return Dt;
  ((uu = 1),
    Object.defineProperty(Dt, "__esModule", { value: !0 }),
    (Dt.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{ concept: { name: "figure" }, module: "HTML" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((Dt.default = e), Dt);
}
var Bt = {},
  cu;
function nb() {
  if (cu) return Bt;
  ((cu = 1),
    Object.defineProperty(Bt, "__esModule", { value: !0 }),
    (Bt.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [
      {
        concept: {
          attributes: [{ constraints: ["set"], name: "aria-label" }],
          name: "form",
        },
        module: "HTML",
      },
      {
        concept: {
          attributes: [{ constraints: ["set"], name: "aria-labelledby" }],
          name: "form",
        },
        module: "HTML",
      },
      {
        concept: {
          attributes: [{ constraints: ["set"], name: "name" }],
          name: "form",
        },
        module: "HTML",
      },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]],
  };
  return ((Bt.default = e), Bt);
}
var Ft = {},
  du;
function ob() {
  if (du) return Ft;
  ((du = 1),
    Object.defineProperty(Ft, "__esModule", { value: !0 }),
    (Ft.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [
      { concept: { name: "a" }, module: "HTML" },
      { concept: { name: "area" }, module: "HTML" },
      { concept: { name: "aside" }, module: "HTML" },
      { concept: { name: "b" }, module: "HTML" },
      { concept: { name: "bdo" }, module: "HTML" },
      { concept: { name: "body" }, module: "HTML" },
      { concept: { name: "data" }, module: "HTML" },
      { concept: { name: "div" }, module: "HTML" },
      {
        concept: {
          constraints: [
            "scoped to the main element",
            "scoped to a sectioning content element",
            "scoped to a sectioning root element other than body",
          ],
          name: "footer",
        },
        module: "HTML",
      },
      {
        concept: {
          constraints: [
            "scoped to the main element",
            "scoped to a sectioning content element",
            "scoped to a sectioning root element other than body",
          ],
          name: "header",
        },
        module: "HTML",
      },
      { concept: { name: "hgroup" }, module: "HTML" },
      { concept: { name: "i" }, module: "HTML" },
      { concept: { name: "pre" }, module: "HTML" },
      { concept: { name: "q" }, module: "HTML" },
      { concept: { name: "samp" }, module: "HTML" },
      { concept: { name: "section" }, module: "HTML" },
      { concept: { name: "small" }, module: "HTML" },
      { concept: { name: "span" }, module: "HTML" },
      { concept: { name: "u" }, module: "HTML" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure"]],
  };
  return ((Ft.default = e), Ft);
}
var jt = {},
  pu;
function lb() {
  if (pu) return jt;
  ((pu = 1),
    Object.defineProperty(jt, "__esModule", { value: !0 }),
    (jt.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: { "aria-multiselectable": null, "aria-readonly": null },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["row"], ["row", "rowgroup"]],
    requiredProps: {},
    superClass: [
      ["roletype", "widget", "composite"],
      ["roletype", "structure", "section", "table"],
    ],
  };
  return ((jt.default = e), jt);
}
var Vt = {},
  hu;
function ub() {
  if (hu) return Vt;
  ((hu = 1),
    Object.defineProperty(Vt, "__esModule", { value: !0 }),
    (Vt.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
      "aria-readonly": null,
      "aria-required": null,
      "aria-selected": null,
    },
    relatedConcepts: [
      {
        concept: {
          constraints: [
            "ancestor table element has grid role",
            "ancestor table element has treegrid role",
          ],
          name: "td",
        },
        module: "HTML",
      },
    ],
    requireContextRole: ["row"],
    requiredContextRole: ["row"],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [
      ["roletype", "structure", "section", "cell"],
      ["roletype", "widget"],
    ],
  };
  return ((Vt.default = e), Vt);
}
var $t = {},
  fu;
function cb() {
  if (fu) return $t;
  ((fu = 1),
    Object.defineProperty($t, "__esModule", { value: !0 }),
    ($t.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: { "aria-activedescendant": null, "aria-disabled": null },
    relatedConcepts: [
      { concept: { name: "details" }, module: "HTML" },
      { concept: { name: "fieldset" }, module: "HTML" },
      { concept: { name: "optgroup" }, module: "HTML" },
      { concept: { name: "address" }, module: "HTML" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return (($t.default = e), $t);
}
var Ht = {},
  mu;
function db() {
  if (mu) return Ht;
  ((mu = 1),
    Object.defineProperty(Ht, "__esModule", { value: !0 }),
    (Ht.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: { "aria-level": "2" },
    relatedConcepts: [
      { concept: { name: "h1" }, module: "HTML" },
      { concept: { name: "h2" }, module: "HTML" },
      { concept: { name: "h3" }, module: "HTML" },
      { concept: { name: "h4" }, module: "HTML" },
      { concept: { name: "h5" }, module: "HTML" },
      { concept: { name: "h6" }, module: "HTML" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: { "aria-level": "2" },
    superClass: [["roletype", "structure", "sectionhead"]],
  };
  return ((Ht.default = e), Ht);
}
var Ut = {},
  vu;
function pb() {
  if (vu) return Ut;
  ((vu = 1),
    Object.defineProperty(Ut, "__esModule", { value: !0 }),
    (Ut.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !0,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [
      {
        concept: {
          attributes: [{ constraints: ["set"], name: "alt" }],
          name: "img",
        },
        module: "HTML",
      },
      {
        concept: {
          attributes: [{ constraints: ["undefined"], name: "alt" }],
          name: "img",
        },
        module: "HTML",
      },
      { concept: { name: "imggroup" }, module: "DTB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((Ut.default = e), Ut);
}
var Gt = {},
  bu;
function hb() {
  if (bu) return Gt;
  ((bu = 1),
    Object.defineProperty(Gt, "__esModule", { value: !0 }),
    (Gt.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [{ concept: { name: "ins" }, module: "HTML" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((Gt.default = e), Gt);
}
var Wt = {},
  yu;
function fb() {
  if (yu) return Wt;
  ((yu = 1),
    Object.defineProperty(Wt, "__esModule", { value: !0 }),
    (Wt.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-expanded": null,
      "aria-haspopup": null,
    },
    relatedConcepts: [
      {
        concept: {
          attributes: [{ constraints: ["set"], name: "href" }],
          name: "a",
        },
        module: "HTML",
      },
      {
        concept: {
          attributes: [{ constraints: ["set"], name: "href" }],
          name: "area",
        },
        module: "HTML",
      },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "command"]],
  };
  return ((Wt.default = e), Wt);
}
var zt = {},
  Ru;
function mb() {
  if (Ru) return zt;
  ((Ru = 1),
    Object.defineProperty(zt, "__esModule", { value: !0 }),
    (zt.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [
      { concept: { name: "menu" }, module: "HTML" },
      { concept: { name: "ol" }, module: "HTML" },
      { concept: { name: "ul" }, module: "HTML" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["listitem"]],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((zt.default = e), zt);
}
var Kt = {},
  gu;
function vb() {
  if (gu) return Kt;
  ((gu = 1),
    Object.defineProperty(Kt, "__esModule", { value: !0 }),
    (Kt.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-invalid": null,
      "aria-multiselectable": null,
      "aria-readonly": null,
      "aria-required": null,
      "aria-orientation": "vertical",
    },
    relatedConcepts: [
      {
        concept: {
          attributes: [{ constraints: [">1"], name: "size" }],
          constraints: ["the size attribute value is greater than 1"],
          name: "select",
        },
        module: "HTML",
      },
      {
        concept: { attributes: [{ name: "multiple" }], name: "select" },
        module: "HTML",
      },
      { concept: { name: "datalist" }, module: "HTML" },
      { concept: { name: "list" }, module: "ARIA" },
      { concept: { name: "select" }, module: "XForms" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["option", "group"], ["option"]],
    requiredProps: {},
    superClass: [
      ["roletype", "widget", "composite", "select"],
      ["roletype", "structure", "section", "group", "select"],
    ],
  };
  return ((Kt.default = e), Kt);
}
var Xt = {},
  xu;
function bb() {
  if (xu) return Xt;
  ((xu = 1),
    Object.defineProperty(Xt, "__esModule", { value: !0 }),
    (Xt.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: { "aria-level": null, "aria-posinset": null, "aria-setsize": null },
    relatedConcepts: [
      {
        concept: {
          constraints: [
            "direct descendant of ol",
            "direct descendant of ul",
            "direct descendant of menu",
          ],
          name: "li",
        },
        module: "HTML",
      },
      { concept: { name: "item" }, module: "XForms" },
    ],
    requireContextRole: ["directory", "list"],
    requiredContextRole: ["directory", "list"],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((Xt.default = e), Xt);
}
var Yt = {},
  Cu;
function yb() {
  if (Cu) return Yt;
  ((Cu = 1),
    Object.defineProperty(Yt, "__esModule", { value: !0 }),
    (Yt.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: { "aria-live": "polite" },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((Yt.default = e), Yt);
}
var Qt = {},
  _u;
function Rb() {
  if (_u) return Qt;
  ((_u = 1),
    Object.defineProperty(Qt, "__esModule", { value: !0 }),
    (Qt.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{ concept: { name: "main" }, module: "HTML" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]],
  };
  return ((Qt.default = e), Qt);
}
var Jt = {},
  Pu;
function gb() {
  if (Pu) return Jt;
  ((Pu = 1),
    Object.defineProperty(Jt, "__esModule", { value: !0 }),
    (Jt.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["prohibited"],
    prohibitedProps: [],
    props: {
      "aria-braillelabel": null,
      "aria-brailleroledescription": null,
      "aria-description": null,
    },
    relatedConcepts: [{ concept: { name: "mark" }, module: "HTML" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((Jt.default = e), Jt);
}
var Zt = {},
  qu;
function xb() {
  if (qu) return Zt;
  ((qu = 1),
    Object.defineProperty(Zt, "__esModule", { value: !0 }),
    (Zt.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((Zt.default = e), Zt);
}
var er = {},
  Tu;
function Cb() {
  if (Tu) return er;
  ((Tu = 1),
    Object.defineProperty(er, "__esModule", { value: !0 }),
    (er.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{ concept: { name: "math" }, module: "HTML" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((er.default = e), er);
}
var tr = {},
  Au;
function _b() {
  if (Au) return tr;
  ((Au = 1),
    Object.defineProperty(tr, "__esModule", { value: !0 }),
    (tr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: { "aria-orientation": "vertical" },
    relatedConcepts: [
      { concept: { name: "MENU" }, module: "JAPI" },
      { concept: { name: "list" }, module: "ARIA" },
      { concept: { name: "select" }, module: "XForms" },
      { concept: { name: "sidebar" }, module: "DTB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [
      ["menuitem", "group"],
      ["menuitemradio", "group"],
      ["menuitemcheckbox", "group"],
      ["menuitem"],
      ["menuitemcheckbox"],
      ["menuitemradio"],
    ],
    requiredProps: {},
    superClass: [
      ["roletype", "widget", "composite", "select"],
      ["roletype", "structure", "section", "group", "select"],
    ],
  };
  return ((tr.default = e), tr);
}
var rr = {},
  wu;
function Pb() {
  if (wu) return rr;
  ((wu = 1),
    Object.defineProperty(rr, "__esModule", { value: !0 }),
    (rr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: { "aria-orientation": "horizontal" },
    relatedConcepts: [{ concept: { name: "toolbar" }, module: "ARIA" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [
      ["menuitem", "group"],
      ["menuitemradio", "group"],
      ["menuitemcheckbox", "group"],
      ["menuitem"],
      ["menuitemcheckbox"],
      ["menuitemradio"],
    ],
    requiredProps: {},
    superClass: [
      ["roletype", "widget", "composite", "select", "menu"],
      ["roletype", "structure", "section", "group", "select", "menu"],
    ],
  };
  return ((rr.default = e), rr);
}
var ar = {},
  Su;
function qb() {
  if (Su) return ar;
  ((Su = 1),
    Object.defineProperty(ar, "__esModule", { value: !0 }),
    (ar.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-posinset": null,
      "aria-setsize": null,
    },
    relatedConcepts: [
      { concept: { name: "MENU_ITEM" }, module: "JAPI" },
      { concept: { name: "listitem" }, module: "ARIA" },
      { concept: { name: "option" }, module: "ARIA" },
    ],
    requireContextRole: ["group", "menu", "menubar"],
    requiredContextRole: ["group", "menu", "menubar"],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "command"]],
  };
  return ((ar.default = e), ar);
}
var ir = {},
  ku;
function Tb() {
  if (ku) return ir;
  ((ku = 1),
    Object.defineProperty(ir, "__esModule", { value: !0 }),
    (ir.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !0,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{ concept: { name: "menuitem" }, module: "ARIA" }],
    requireContextRole: ["group", "menu", "menubar"],
    requiredContextRole: ["group", "menu", "menubar"],
    requiredOwnedElements: [],
    requiredProps: { "aria-checked": null },
    superClass: [
      ["roletype", "widget", "input", "checkbox"],
      ["roletype", "widget", "command", "menuitem"],
    ],
  };
  return ((ir.default = e), ir);
}
var sr = {},
  Eu;
function Ab() {
  if (Eu) return sr;
  ((Eu = 1),
    Object.defineProperty(sr, "__esModule", { value: !0 }),
    (sr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !0,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{ concept: { name: "menuitem" }, module: "ARIA" }],
    requireContextRole: ["group", "menu", "menubar"],
    requiredContextRole: ["group", "menu", "menubar"],
    requiredOwnedElements: [],
    requiredProps: { "aria-checked": null },
    superClass: [
      ["roletype", "widget", "input", "checkbox", "menuitemcheckbox"],
      ["roletype", "widget", "command", "menuitem", "menuitemcheckbox"],
      ["roletype", "widget", "input", "radio"],
    ],
  };
  return ((sr.default = e), sr);
}
var nr = {},
  Iu;
function wb() {
  if (Iu) return nr;
  ((Iu = 1),
    Object.defineProperty(nr, "__esModule", { value: !0 }),
    (nr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !0,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-valuetext": null,
      "aria-valuemax": "100",
      "aria-valuemin": "0",
    },
    relatedConcepts: [{ concept: { name: "meter" }, module: "HTML" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: { "aria-valuenow": null },
    superClass: [["roletype", "structure", "range"]],
  };
  return ((nr.default = e), nr);
}
var or = {},
  Mu;
function Sb() {
  if (Mu) return or;
  ((Mu = 1),
    Object.defineProperty(or, "__esModule", { value: !0 }),
    (or.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{ concept: { name: "nav" }, module: "HTML" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]],
  };
  return ((or.default = e), or);
}
var lr = {},
  Lu;
function kb() {
  if (Lu) return lr;
  ((Lu = 1),
    Object.defineProperty(lr, "__esModule", { value: !0 }),
    (lr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: [],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [],
  };
  return ((lr.default = e), lr);
}
var ur = {},
  Ou;
function Eb() {
  if (Ou) return ur;
  ((Ou = 1),
    Object.defineProperty(ur, "__esModule", { value: !0 }),
    (ur.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((ur.default = e), ur);
}
var cr = {},
  Nu;
function Ib() {
  if (Nu) return cr;
  ((Nu = 1),
    Object.defineProperty(cr, "__esModule", { value: !0 }),
    (cr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !0,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-checked": null,
      "aria-posinset": null,
      "aria-setsize": null,
      "aria-selected": "false",
    },
    relatedConcepts: [
      { concept: { name: "item" }, module: "XForms" },
      { concept: { name: "listitem" }, module: "ARIA" },
      { concept: { name: "option" }, module: "HTML" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: { "aria-selected": "false" },
    superClass: [["roletype", "widget", "input"]],
  };
  return ((cr.default = e), cr);
}
var dr = {},
  Du;
function Mb() {
  if (Du) return dr;
  ((Du = 1),
    Object.defineProperty(dr, "__esModule", { value: !0 }),
    (dr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [{ concept: { name: "p" }, module: "HTML" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((dr.default = e), dr);
}
var pr = {},
  Bu;
function Lb() {
  if (Bu) return pr;
  ((Bu = 1),
    Object.defineProperty(pr, "__esModule", { value: !0 }),
    (pr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [
      {
        concept: { attributes: [{ name: "alt", value: "" }], name: "img" },
        module: "HTML",
      },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure"]],
  };
  return ((pr.default = e), pr);
}
var hr = {},
  Fu;
function Ob() {
  if (Fu) return hr;
  ((Fu = 1),
    Object.defineProperty(hr, "__esModule", { value: !0 }),
    (hr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !0,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: { "aria-valuetext": null },
    relatedConcepts: [
      { concept: { name: "progress" }, module: "HTML" },
      { concept: { name: "status" }, module: "ARIA" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [
      ["roletype", "structure", "range"],
      ["roletype", "widget"],
    ],
  };
  return ((hr.default = e), hr);
}
var fr = {},
  ju;
function Nb() {
  if (ju) return fr;
  ((ju = 1),
    Object.defineProperty(fr, "__esModule", { value: !0 }),
    (fr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !0,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-checked": null,
      "aria-posinset": null,
      "aria-setsize": null,
    },
    relatedConcepts: [
      {
        concept: {
          attributes: [{ name: "type", value: "radio" }],
          name: "input",
        },
        module: "HTML",
      },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: { "aria-checked": null },
    superClass: [["roletype", "widget", "input"]],
  };
  return ((fr.default = e), fr);
}
var mr = {},
  Vu;
function Db() {
  if (Vu) return mr;
  ((Vu = 1),
    Object.defineProperty(mr, "__esModule", { value: !0 }),
    (mr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-errormessage": null,
      "aria-invalid": null,
      "aria-readonly": null,
      "aria-required": null,
    },
    relatedConcepts: [{ concept: { name: "list" }, module: "ARIA" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["radio"]],
    requiredProps: {},
    superClass: [
      ["roletype", "widget", "composite", "select"],
      ["roletype", "structure", "section", "group", "select"],
    ],
  };
  return ((mr.default = e), mr);
}
var vr = {},
  $u;
function Bb() {
  if ($u) return vr;
  (($u = 1),
    Object.defineProperty(vr, "__esModule", { value: !0 }),
    (vr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [
      {
        concept: {
          attributes: [{ constraints: ["set"], name: "aria-label" }],
          name: "section",
        },
        module: "HTML",
      },
      {
        concept: {
          attributes: [{ constraints: ["set"], name: "aria-labelledby" }],
          name: "section",
        },
        module: "HTML",
      },
      { concept: { name: "Device Independence Glossart perceivable unit" } },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]],
  };
  return ((vr.default = e), vr);
}
var br = {},
  Hu;
function Fb() {
  if (Hu) return br;
  ((Hu = 1),
    Object.defineProperty(br, "__esModule", { value: !0 }),
    (br.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-colindex": null,
      "aria-expanded": null,
      "aria-level": null,
      "aria-posinset": null,
      "aria-rowindex": null,
      "aria-selected": null,
      "aria-setsize": null,
    },
    relatedConcepts: [{ concept: { name: "tr" }, module: "HTML" }],
    requireContextRole: ["grid", "rowgroup", "table", "treegrid"],
    requiredContextRole: ["grid", "rowgroup", "table", "treegrid"],
    requiredOwnedElements: [
      ["cell"],
      ["columnheader"],
      ["gridcell"],
      ["rowheader"],
    ],
    requiredProps: {},
    superClass: [
      ["roletype", "structure", "section", "group"],
      ["roletype", "widget"],
    ],
  };
  return ((br.default = e), br);
}
var yr = {},
  Uu;
function jb() {
  if (Uu) return yr;
  ((Uu = 1),
    Object.defineProperty(yr, "__esModule", { value: !0 }),
    (yr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [
      { concept: { name: "tbody" }, module: "HTML" },
      { concept: { name: "tfoot" }, module: "HTML" },
      { concept: { name: "thead" }, module: "HTML" },
    ],
    requireContextRole: ["grid", "table", "treegrid"],
    requiredContextRole: ["grid", "table", "treegrid"],
    requiredOwnedElements: [["row"]],
    requiredProps: {},
    superClass: [["roletype", "structure"]],
  };
  return ((yr.default = e), yr);
}
var Rr = {},
  Gu;
function Vb() {
  if (Gu) return Rr;
  ((Gu = 1),
    Object.defineProperty(Rr, "__esModule", { value: !0 }),
    (Rr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: { "aria-sort": null },
    relatedConcepts: [
      {
        concept: { attributes: [{ name: "scope", value: "row" }], name: "th" },
        module: "HTML",
      },
      {
        concept: {
          attributes: [{ name: "scope", value: "rowgroup" }],
          name: "th",
        },
        module: "HTML",
      },
    ],
    requireContextRole: ["row", "rowgroup"],
    requiredContextRole: ["row", "rowgroup"],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [
      ["roletype", "structure", "section", "cell"],
      ["roletype", "structure", "section", "cell", "gridcell"],
      ["roletype", "widget", "gridcell"],
      ["roletype", "structure", "sectionhead"],
    ],
  };
  return ((Rr.default = e), Rr);
}
var gr = {},
  Wu;
function $b() {
  if (Wu) return gr;
  ((Wu = 1),
    Object.defineProperty(gr, "__esModule", { value: !0 }),
    (gr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !0,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-valuetext": null,
      "aria-orientation": "vertical",
      "aria-valuemax": "100",
      "aria-valuemin": "0",
    },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: { "aria-controls": null, "aria-valuenow": null },
    superClass: [
      ["roletype", "structure", "range"],
      ["roletype", "widget"],
    ],
  };
  return ((gr.default = e), gr);
}
var xr = {},
  zu;
function Hb() {
  if (zu) return xr;
  ((zu = 1),
    Object.defineProperty(xr, "__esModule", { value: !0 }),
    (xr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]],
  };
  return ((xr.default = e), xr);
}
var Cr = {},
  Ku;
function Ub() {
  if (Ku) return Cr;
  ((Ku = 1),
    Object.defineProperty(Cr, "__esModule", { value: !0 }),
    (Cr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [
      {
        concept: {
          attributes: [
            { constraints: ["undefined"], name: "list" },
            { name: "type", value: "search" },
          ],
          constraints: ["the list attribute is not set"],
          name: "input",
        },
        module: "HTML",
      },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "input", "textbox"]],
  };
  return ((Cr.default = e), Cr);
}
var _r = {},
  Xu;
function Gb() {
  if (Xu) return _r;
  ((Xu = 1),
    Object.defineProperty(_r, "__esModule", { value: !0 }),
    (_r.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !0,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-orientation": "horizontal",
      "aria-valuemax": "100",
      "aria-valuemin": "0",
      "aria-valuenow": null,
      "aria-valuetext": null,
    },
    relatedConcepts: [{ concept: { name: "hr" }, module: "HTML" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure"]],
  };
  return ((_r.default = e), _r);
}
var Pr = {},
  Yu;
function Wb() {
  if (Yu) return Pr;
  ((Yu = 1),
    Object.defineProperty(Pr, "__esModule", { value: !0 }),
    (Pr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !0,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-errormessage": null,
      "aria-haspopup": null,
      "aria-invalid": null,
      "aria-readonly": null,
      "aria-valuetext": null,
      "aria-orientation": "horizontal",
      "aria-valuemax": "100",
      "aria-valuemin": "0",
    },
    relatedConcepts: [
      {
        concept: {
          attributes: [{ name: "type", value: "range" }],
          name: "input",
        },
        module: "HTML",
      },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: { "aria-valuenow": null },
    superClass: [
      ["roletype", "widget", "input"],
      ["roletype", "structure", "range"],
    ],
  };
  return ((Pr.default = e), Pr);
}
var qr = {},
  Qu;
function zb() {
  if (Qu) return qr;
  ((Qu = 1),
    Object.defineProperty(qr, "__esModule", { value: !0 }),
    (qr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-errormessage": null,
      "aria-invalid": null,
      "aria-readonly": null,
      "aria-required": null,
      "aria-valuetext": null,
      "aria-valuenow": "0",
    },
    relatedConcepts: [
      {
        concept: {
          attributes: [{ name: "type", value: "number" }],
          name: "input",
        },
        module: "HTML",
      },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [
      ["roletype", "widget", "composite"],
      ["roletype", "widget", "input"],
      ["roletype", "structure", "range"],
    ],
  };
  return ((qr.default = e), qr);
}
var Tr = {},
  Ju;
function Kb() {
  if (Ju) return Tr;
  ((Ju = 1),
    Object.defineProperty(Tr, "__esModule", { value: !0 }),
    (Tr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: { "aria-atomic": "true", "aria-live": "polite" },
    relatedConcepts: [{ concept: { name: "output" }, module: "HTML" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((Tr.default = e), Tr);
}
var Ar = {},
  Zu;
function Xb() {
  if (Zu) return Ar;
  ((Zu = 1),
    Object.defineProperty(Ar, "__esModule", { value: !0 }),
    (Ar.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [{ concept: { name: "strong" }, module: "HTML" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((Ar.default = e), Ar);
}
var wr = {},
  ec;
function Yb() {
  if (ec) return wr;
  ((ec = 1),
    Object.defineProperty(wr, "__esModule", { value: !0 }),
    (wr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [{ concept: { name: "sub" }, module: "HTML" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((wr.default = e), wr);
}
var Sr = {},
  tc;
function Qb() {
  if (tc) return Sr;
  ((tc = 1),
    Object.defineProperty(Sr, "__esModule", { value: !0 }),
    (Sr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [{ concept: { name: "sup" }, module: "HTML" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((Sr.default = e), Sr);
}
var kr = {},
  rc;
function Jb() {
  if (rc) return kr;
  ((rc = 1),
    Object.defineProperty(kr, "__esModule", { value: !0 }),
    (kr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !0,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{ concept: { name: "button" }, module: "ARIA" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: { "aria-checked": null },
    superClass: [["roletype", "widget", "input", "checkbox"]],
  };
  return ((kr.default = e), kr);
}
var Er = {},
  ac;
function Zb() {
  if (ac) return Er;
  ((ac = 1),
    Object.defineProperty(Er, "__esModule", { value: !0 }),
    (Er.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !0,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-posinset": null,
      "aria-setsize": null,
      "aria-selected": "false",
    },
    relatedConcepts: [],
    requireContextRole: ["tablist"],
    requiredContextRole: ["tablist"],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [
      ["roletype", "structure", "sectionhead"],
      ["roletype", "widget"],
    ],
  };
  return ((Er.default = e), Er);
}
var Ir = {},
  ic;
function ey() {
  if (ic) return Ir;
  ((ic = 1),
    Object.defineProperty(Ir, "__esModule", { value: !0 }),
    (Ir.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: { "aria-colcount": null, "aria-rowcount": null },
    relatedConcepts: [{ concept: { name: "table" }, module: "HTML" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["row"], ["row", "rowgroup"]],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((Ir.default = e), Ir);
}
var Mr = {},
  sc;
function ty() {
  if (sc) return Mr;
  ((sc = 1),
    Object.defineProperty(Mr, "__esModule", { value: !0 }),
    (Mr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-level": null,
      "aria-multiselectable": null,
      "aria-orientation": "horizontal",
    },
    relatedConcepts: [{ module: "DAISY", concept: { name: "guide" } }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["tab"]],
    requiredProps: {},
    superClass: [["roletype", "widget", "composite"]],
  };
  return ((Mr.default = e), Mr);
}
var Lr = {},
  nc;
function ry() {
  if (nc) return Lr;
  ((nc = 1),
    Object.defineProperty(Lr, "__esModule", { value: !0 }),
    (Lr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((Lr.default = e), Lr);
}
var Or = {},
  oc;
function ay() {
  if (oc) return Or;
  ((oc = 1),
    Object.defineProperty(Or, "__esModule", { value: !0 }),
    (Or.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [
      { concept: { name: "dfn" }, module: "HTML" },
      { concept: { name: "dt" }, module: "HTML" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((Or.default = e), Or);
}
var Nr = {},
  lc;
function iy() {
  if (lc) return Nr;
  ((lc = 1),
    Object.defineProperty(Nr, "__esModule", { value: !0 }),
    (Nr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-activedescendant": null,
      "aria-autocomplete": null,
      "aria-errormessage": null,
      "aria-haspopup": null,
      "aria-invalid": null,
      "aria-multiline": null,
      "aria-placeholder": null,
      "aria-readonly": null,
      "aria-required": null,
    },
    relatedConcepts: [
      {
        concept: {
          attributes: [
            { constraints: ["undefined"], name: "type" },
            { constraints: ["undefined"], name: "list" },
          ],
          constraints: ["the list attribute is not set"],
          name: "input",
        },
        module: "HTML",
      },
      {
        concept: {
          attributes: [
            { constraints: ["undefined"], name: "list" },
            { name: "type", value: "email" },
          ],
          constraints: ["the list attribute is not set"],
          name: "input",
        },
        module: "HTML",
      },
      {
        concept: {
          attributes: [
            { constraints: ["undefined"], name: "list" },
            { name: "type", value: "tel" },
          ],
          constraints: ["the list attribute is not set"],
          name: "input",
        },
        module: "HTML",
      },
      {
        concept: {
          attributes: [
            { constraints: ["undefined"], name: "list" },
            { name: "type", value: "text" },
          ],
          constraints: ["the list attribute is not set"],
          name: "input",
        },
        module: "HTML",
      },
      {
        concept: {
          attributes: [
            { constraints: ["undefined"], name: "list" },
            { name: "type", value: "url" },
          ],
          constraints: ["the list attribute is not set"],
          name: "input",
        },
        module: "HTML",
      },
      { concept: { name: "input" }, module: "XForms" },
      { concept: { name: "textarea" }, module: "HTML" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "input"]],
  };
  return ((Nr.default = e), Nr);
}
var Dr = {},
  uc;
function sy() {
  if (uc) return Dr;
  ((uc = 1),
    Object.defineProperty(Dr, "__esModule", { value: !0 }),
    (Dr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{ concept: { name: "time" }, module: "HTML" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((Dr.default = e), Dr);
}
var Br = {},
  cc;
function ny() {
  if (cc) return Br;
  ((cc = 1),
    Object.defineProperty(Br, "__esModule", { value: !0 }),
    (Br.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "status"]],
  };
  return ((Br.default = e), Br);
}
var Fr = {},
  dc;
function oy() {
  if (dc) return Fr;
  ((dc = 1),
    Object.defineProperty(Fr, "__esModule", { value: !0 }),
    (Fr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: { "aria-orientation": "horizontal" },
    relatedConcepts: [{ concept: { name: "menubar" }, module: "ARIA" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "group"]],
  };
  return ((Fr.default = e), Fr);
}
var jr = {},
  pc;
function ly() {
  if (pc) return jr;
  ((pc = 1),
    Object.defineProperty(jr, "__esModule", { value: !0 }),
    (jr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((jr.default = e), jr);
}
var Vr = {},
  hc;
function uy() {
  if (hc) return Vr;
  ((hc = 1),
    Object.defineProperty(Vr, "__esModule", { value: !0 }),
    (Vr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-errormessage": null,
      "aria-invalid": null,
      "aria-multiselectable": null,
      "aria-required": null,
      "aria-orientation": "vertical",
    },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["treeitem", "group"], ["treeitem"]],
    requiredProps: {},
    superClass: [
      ["roletype", "widget", "composite", "select"],
      ["roletype", "structure", "section", "group", "select"],
    ],
  };
  return ((Vr.default = e), Vr);
}
var $r = {},
  fc;
function cy() {
  if (fc) return $r;
  ((fc = 1),
    Object.defineProperty($r, "__esModule", { value: !0 }),
    ($r.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["row"], ["row", "rowgroup"]],
    requiredProps: {},
    superClass: [
      ["roletype", "widget", "composite", "grid"],
      ["roletype", "structure", "section", "table", "grid"],
      ["roletype", "widget", "composite", "select", "tree"],
      ["roletype", "structure", "section", "group", "select", "tree"],
    ],
  };
  return (($r.default = e), $r);
}
var Hr = {},
  mc;
function dy() {
  if (mc) return Hr;
  ((mc = 1),
    Object.defineProperty(Hr, "__esModule", { value: !0 }),
    (Hr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: { "aria-expanded": null, "aria-haspopup": null },
    relatedConcepts: [],
    requireContextRole: ["group", "tree"],
    requiredContextRole: ["group", "tree"],
    requiredOwnedElements: [],
    requiredProps: { "aria-selected": null },
    superClass: [
      ["roletype", "structure", "section", "listitem"],
      ["roletype", "widget", "input", "option"],
    ],
  };
  return ((Hr.default = e), Hr);
}
var vc;
function py() {
  if (vc) return ft;
  ((vc = 1),
    Object.defineProperty(ft, "__esModule", { value: !0 }),
    (ft.default = void 0));
  var e = O(D1()),
    t = O(B1()),
    a = O(F1()),
    s = O(j1()),
    o = O(V1()),
    c = O($1()),
    n = O(H1()),
    b = O(U1()),
    g = O(G1()),
    q = O(W1()),
    f = O(z1()),
    T = O(K1()),
    A = O(X1()),
    k = O(Y1()),
    L = O(Q1()),
    I = O(J1()),
    y = O(Z1()),
    h = O(eb()),
    p = O(tb()),
    m = O(rb()),
    x = O(ab()),
    R = O(ib()),
    _ = O(sb()),
    C = O(nb()),
    M = O(ob()),
    r = O(lb()),
    i = O(ub()),
    l = O(cb()),
    d = O(db()),
    v = O(pb()),
    P = O(hb()),
    w = O(fb()),
    D = O(mb()),
    N = O(vb()),
    E = O(bb()),
    H = O(yb()),
    X = O(Rb()),
    K = O(gb()),
    ie = O(xb()),
    se = O(Cb()),
    ne = O(_b()),
    V = O(Pb()),
    ae = O(qb()),
    te = O(Tb()),
    Un = O(Ab()),
    Gn = O(wb()),
    Wn = O(Sb()),
    zn = O(kb()),
    Kn = O(Eb()),
    Xn = O(Ib()),
    Yn = O(Mb()),
    Qn = O(Lb()),
    Jn = O(Ob()),
    Zn = O(Nb()),
    eo = O(Db()),
    to = O(Bb()),
    ro = O(Fb()),
    ao = O(jb()),
    io = O(Vb()),
    so = O($b()),
    no = O(Hb()),
    oo = O(Ub()),
    lo = O(Gb()),
    uo = O(Wb()),
    co = O(zb()),
    po = O(Kb()),
    ho = O(Xb()),
    fo = O(Yb()),
    mo = O(Qb()),
    vo = O(Jb()),
    bo = O(Zb()),
    yo = O(ey()),
    Ro = O(ty()),
    go = O(ry()),
    xo = O(ay()),
    Co = O(iy()),
    _o = O(sy()),
    Po = O(ny()),
    qo = O(oy()),
    To = O(ly()),
    Ao = O(uy()),
    wo = O(cy()),
    So = O(dy());
  function O(Fe) {
    return Fe && Fe.__esModule ? Fe : { default: Fe };
  }
  var ko = [
    ["alert", e.default],
    ["alertdialog", t.default],
    ["application", a.default],
    ["article", s.default],
    ["banner", o.default],
    ["blockquote", c.default],
    ["button", n.default],
    ["caption", b.default],
    ["cell", g.default],
    ["checkbox", q.default],
    ["code", f.default],
    ["columnheader", T.default],
    ["combobox", A.default],
    ["complementary", k.default],
    ["contentinfo", L.default],
    ["definition", I.default],
    ["deletion", y.default],
    ["dialog", h.default],
    ["directory", p.default],
    ["document", m.default],
    ["emphasis", x.default],
    ["feed", R.default],
    ["figure", _.default],
    ["form", C.default],
    ["generic", M.default],
    ["grid", r.default],
    ["gridcell", i.default],
    ["group", l.default],
    ["heading", d.default],
    ["img", v.default],
    ["insertion", P.default],
    ["link", w.default],
    ["list", D.default],
    ["listbox", N.default],
    ["listitem", E.default],
    ["log", H.default],
    ["main", X.default],
    ["mark", K.default],
    ["marquee", ie.default],
    ["math", se.default],
    ["menu", ne.default],
    ["menubar", V.default],
    ["menuitem", ae.default],
    ["menuitemcheckbox", te.default],
    ["menuitemradio", Un.default],
    ["meter", Gn.default],
    ["navigation", Wn.default],
    ["none", zn.default],
    ["note", Kn.default],
    ["option", Xn.default],
    ["paragraph", Yn.default],
    ["presentation", Qn.default],
    ["progressbar", Jn.default],
    ["radio", Zn.default],
    ["radiogroup", eo.default],
    ["region", to.default],
    ["row", ro.default],
    ["rowgroup", ao.default],
    ["rowheader", io.default],
    ["scrollbar", so.default],
    ["search", no.default],
    ["searchbox", oo.default],
    ["separator", lo.default],
    ["slider", uo.default],
    ["spinbutton", co.default],
    ["status", po.default],
    ["strong", ho.default],
    ["subscript", fo.default],
    ["superscript", mo.default],
    ["switch", vo.default],
    ["tab", bo.default],
    ["table", yo.default],
    ["tablist", Ro.default],
    ["tabpanel", go.default],
    ["term", xo.default],
    ["textbox", Co.default],
    ["time", _o.default],
    ["timer", Po.default],
    ["toolbar", qo.default],
    ["tooltip", To.default],
    ["tree", Ao.default],
    ["treegrid", wo.default],
    ["treeitem", So.default],
  ];
  return ((ft.default = ko), ft);
}
var Ur = {},
  Gr = {},
  bc;
function hy() {
  if (bc) return Gr;
  ((bc = 1),
    Object.defineProperty(Gr, "__esModule", { value: !0 }),
    (Gr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { concept: { name: "abstract [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((Gr.default = e), Gr);
}
var Wr = {},
  yc;
function fy() {
  if (yc) return Wr;
  ((yc = 1),
    Object.defineProperty(Wr, "__esModule", { value: !0 }),
    (Wr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { concept: { name: "acknowledgments [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]],
  };
  return ((Wr.default = e), Wr);
}
var zr = {},
  Rc;
function my() {
  if (Rc) return zr;
  ((Rc = 1),
    Object.defineProperty(zr, "__esModule", { value: !0 }),
    (zr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { concept: { name: "afterword [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]],
  };
  return ((zr.default = e), zr);
}
var Kr = {},
  gc;
function vy() {
  if (gc) return Kr;
  ((gc = 1),
    Object.defineProperty(Kr, "__esModule", { value: !0 }),
    (Kr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { concept: { name: "appendix [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]],
  };
  return ((Kr.default = e), Kr);
}
var Xr = {},
  xc;
function by() {
  if (xc) return Xr;
  ((xc = 1),
    Object.defineProperty(Xr, "__esModule", { value: !0 }),
    (Xr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: { "aria-errormessage": null, "aria-invalid": null },
    relatedConcepts: [
      { concept: { name: "referrer [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "command", "link"]],
  };
  return ((Xr.default = e), Xr);
}
var Yr = {},
  Cc;
function yy() {
  if (Cc) return Yr;
  ((Cc = 1),
    Object.defineProperty(Yr, "__esModule", { value: !0 }),
    (Yr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { concept: { name: "EPUB biblioentry [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: ["doc-bibliography"],
    requiredContextRole: ["doc-bibliography"],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "listitem"]],
  };
  return ((Yr.default = e), Yr);
}
var Qr = {},
  _c;
function Ry() {
  if (_c) return Qr;
  ((_c = 1),
    Object.defineProperty(Qr, "__esModule", { value: !0 }),
    (Qr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { concept: { name: "bibliography [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["doc-biblioentry"]],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]],
  };
  return ((Qr.default = e), Qr);
}
var Jr = {},
  Pc;
function gy() {
  if (Pc) return Jr;
  ((Pc = 1),
    Object.defineProperty(Jr, "__esModule", { value: !0 }),
    (Jr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: { "aria-errormessage": null, "aria-invalid": null },
    relatedConcepts: [
      { concept: { name: "biblioref [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "command", "link"]],
  };
  return ((Jr.default = e), Jr);
}
var Zr = {},
  qc;
function xy() {
  if (qc) return Zr;
  ((qc = 1),
    Object.defineProperty(Zr, "__esModule", { value: !0 }),
    (Zr.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { concept: { name: "chapter [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]],
  };
  return ((Zr.default = e), Zr);
}
var ea = {},
  Tc;
function Cy() {
  if (Tc) return ea;
  ((Tc = 1),
    Object.defineProperty(ea, "__esModule", { value: !0 }),
    (ea.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { concept: { name: "colophon [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((ea.default = e), ea);
}
var ta = {},
  Ac;
function _y() {
  if (Ac) return ta;
  ((Ac = 1),
    Object.defineProperty(ta, "__esModule", { value: !0 }),
    (ta.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { concept: { name: "conclusion [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]],
  };
  return ((ta.default = e), ta);
}
var ra = {},
  wc;
function Py() {
  if (wc) return ra;
  ((wc = 1),
    Object.defineProperty(ra, "__esModule", { value: !0 }),
    (ra.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { concept: { name: "cover [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "img"]],
  };
  return ((ra.default = e), ra);
}
var aa = {},
  Sc;
function qy() {
  if (Sc) return aa;
  ((Sc = 1),
    Object.defineProperty(aa, "__esModule", { value: !0 }),
    (aa.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { concept: { name: "credit [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((aa.default = e), aa);
}
var ia = {},
  kc;
function Ty() {
  if (kc) return ia;
  ((kc = 1),
    Object.defineProperty(ia, "__esModule", { value: !0 }),
    (ia.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { concept: { name: "credits [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]],
  };
  return ((ia.default = e), ia);
}
var sa = {},
  Ec;
function Ay() {
  if (Ec) return sa;
  ((Ec = 1),
    Object.defineProperty(sa, "__esModule", { value: !0 }),
    (sa.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { concept: { name: "dedication [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((sa.default = e), sa);
}
var na = {},
  Ic;
function wy() {
  if (Ic) return na;
  ((Ic = 1),
    Object.defineProperty(na, "__esModule", { value: !0 }),
    (na.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { concept: { name: "rearnote [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: ["doc-endnotes"],
    requiredContextRole: ["doc-endnotes"],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "listitem"]],
  };
  return ((na.default = e), na);
}
var oa = {},
  Mc;
function Sy() {
  if (Mc) return oa;
  ((Mc = 1),
    Object.defineProperty(oa, "__esModule", { value: !0 }),
    (oa.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { concept: { name: "rearnotes [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["doc-endnote"]],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]],
  };
  return ((oa.default = e), oa);
}
var la = {},
  Lc;
function ky() {
  if (Lc) return la;
  ((Lc = 1),
    Object.defineProperty(la, "__esModule", { value: !0 }),
    (la.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { concept: { name: "epigraph [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((la.default = e), la);
}
var ua = {},
  Oc;
function Ey() {
  if (Oc) return ua;
  ((Oc = 1),
    Object.defineProperty(ua, "__esModule", { value: !0 }),
    (ua.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { concept: { name: "epilogue [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]],
  };
  return ((ua.default = e), ua);
}
var ca = {},
  Nc;
function Iy() {
  if (Nc) return ca;
  ((Nc = 1),
    Object.defineProperty(ca, "__esModule", { value: !0 }),
    (ca.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { concept: { name: "errata [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]],
  };
  return ((ca.default = e), ca);
}
var da = {},
  Dc;
function My() {
  if (Dc) return da;
  ((Dc = 1),
    Object.defineProperty(da, "__esModule", { value: !0 }),
    (da.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((da.default = e), da);
}
var pa = {},
  Bc;
function Ly() {
  if (Bc) return pa;
  ((Bc = 1),
    Object.defineProperty(pa, "__esModule", { value: !0 }),
    (pa.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { concept: { name: "footnote [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((pa.default = e), pa);
}
var ha = {},
  Fc;
function Oy() {
  if (Fc) return ha;
  ((Fc = 1),
    Object.defineProperty(ha, "__esModule", { value: !0 }),
    (ha.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { concept: { name: "foreword [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]],
  };
  return ((ha.default = e), ha);
}
var fa = {},
  jc;
function Ny() {
  if (jc) return fa;
  ((jc = 1),
    Object.defineProperty(fa, "__esModule", { value: !0 }),
    (fa.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { concept: { name: "glossary [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["definition"], ["term"]],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]],
  };
  return ((fa.default = e), fa);
}
var ma = {},
  Vc;
function Dy() {
  if (Vc) return ma;
  ((Vc = 1),
    Object.defineProperty(ma, "__esModule", { value: !0 }),
    (ma.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: { "aria-errormessage": null, "aria-invalid": null },
    relatedConcepts: [
      { concept: { name: "glossref [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "command", "link"]],
  };
  return ((ma.default = e), ma);
}
var va = {},
  $c;
function By() {
  if ($c) return va;
  (($c = 1),
    Object.defineProperty(va, "__esModule", { value: !0 }),
    (va.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { concept: { name: "index [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [
      ["roletype", "structure", "section", "landmark", "navigation"],
    ],
  };
  return ((va.default = e), va);
}
var ba = {},
  Hc;
function Fy() {
  if (Hc) return ba;
  ((Hc = 1),
    Object.defineProperty(ba, "__esModule", { value: !0 }),
    (ba.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { concept: { name: "introduction [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]],
  };
  return ((ba.default = e), ba);
}
var ya = {},
  Uc;
function jy() {
  if (Uc) return ya;
  ((Uc = 1),
    Object.defineProperty(ya, "__esModule", { value: !0 }),
    (ya.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: { "aria-errormessage": null, "aria-invalid": null },
    relatedConcepts: [
      { concept: { name: "noteref [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "command", "link"]],
  };
  return ((ya.default = e), ya);
}
var Ra = {},
  Gc;
function Vy() {
  if (Gc) return Ra;
  ((Gc = 1),
    Object.defineProperty(Ra, "__esModule", { value: !0 }),
    (Ra.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { concept: { name: "notice [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "note"]],
  };
  return ((Ra.default = e), Ra);
}
var ga = {},
  Wc;
function $y() {
  if (Wc) return ga;
  ((Wc = 1),
    Object.defineProperty(ga, "__esModule", { value: !0 }),
    (ga.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !0,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { concept: { name: "pagebreak [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "separator"]],
  };
  return ((ga.default = e), ga);
}
var xa = {},
  zc;
function Hy() {
  if (zc) return xa;
  ((zc = 1),
    Object.defineProperty(xa, "__esModule", { value: !0 }),
    (xa.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["prohibited"],
    prohibitedProps: [],
    props: {
      "aria-braillelabel": null,
      "aria-brailleroledescription": null,
      "aria-description": null,
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((xa.default = e), xa);
}
var Ca = {},
  Kc;
function Uy() {
  if (Kc) return Ca;
  ((Kc = 1),
    Object.defineProperty(Ca, "__esModule", { value: !0 }),
    (Ca.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["prohibited"],
    prohibitedProps: [],
    props: {
      "aria-braillelabel": null,
      "aria-brailleroledescription": null,
      "aria-description": null,
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((Ca.default = e), Ca);
}
var _a = {},
  Xc;
function Gy() {
  if (Xc) return _a;
  ((Xc = 1),
    Object.defineProperty(_a, "__esModule", { value: !0 }),
    (_a.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { concept: { name: "page-list [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [
      ["roletype", "structure", "section", "landmark", "navigation"],
    ],
  };
  return ((_a.default = e), _a);
}
var Pa = {},
  Yc;
function Wy() {
  if (Yc) return Pa;
  ((Yc = 1),
    Object.defineProperty(Pa, "__esModule", { value: !0 }),
    (Pa.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [{ concept: { name: "part [EPUB-SSV]" }, module: "EPUB" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]],
  };
  return ((Pa.default = e), Pa);
}
var qa = {},
  Qc;
function zy() {
  if (Qc) return qa;
  ((Qc = 1),
    Object.defineProperty(qa, "__esModule", { value: !0 }),
    (qa.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { concept: { name: "preface [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]],
  };
  return ((qa.default = e), qa);
}
var Ta = {},
  Jc;
function Ky() {
  if (Jc) return Ta;
  ((Jc = 1),
    Object.defineProperty(Ta, "__esModule", { value: !0 }),
    (Ta.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { concept: { name: "prologue [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]],
  };
  return ((Ta.default = e), Ta);
}
var Aa = {},
  Zc;
function Xy() {
  if (Zc) return Aa;
  ((Zc = 1),
    Object.defineProperty(Aa, "__esModule", { value: !0 }),
    (Aa.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [
      { concept: { name: "pullquote [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["none"]],
  };
  return ((Aa.default = e), Aa);
}
var wa = {},
  ed;
function Yy() {
  if (ed) return wa;
  ((ed = 1),
    Object.defineProperty(wa, "__esModule", { value: !0 }),
    (wa.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [{ concept: { name: "qna [EPUB-SSV]" }, module: "EPUB" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]],
  };
  return ((wa.default = e), wa);
}
var Sa = {},
  td;
function Qy() {
  if (td) return Sa;
  ((td = 1),
    Object.defineProperty(Sa, "__esModule", { value: !0 }),
    (Sa.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { concept: { name: "subtitle [EPUB-SSV]" }, module: "EPUB" },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "sectionhead"]],
  };
  return ((Sa.default = e), Sa);
}
var ka = {},
  rd;
function Jy() {
  if (rd) return ka;
  ((rd = 1),
    Object.defineProperty(ka, "__esModule", { value: !0 }),
    (ka.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [{ concept: { name: "help [EPUB-SSV]" }, module: "EPUB" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "note"]],
  };
  return ((ka.default = e), ka);
}
var Ea = {},
  ad;
function Zy() {
  if (ad) return Ea;
  ((ad = 1),
    Object.defineProperty(Ea, "__esModule", { value: !0 }),
    (Ea.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [{ concept: { name: "toc [EPUB-SSV]" }, module: "EPUB" }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [
      ["roletype", "structure", "section", "landmark", "navigation"],
    ],
  };
  return ((Ea.default = e), Ea);
}
var id;
function e0() {
  if (id) return Ur;
  ((id = 1),
    Object.defineProperty(Ur, "__esModule", { value: !0 }),
    (Ur.default = void 0));
  var e = V(hy()),
    t = V(fy()),
    a = V(my()),
    s = V(vy()),
    o = V(by()),
    c = V(yy()),
    n = V(Ry()),
    b = V(gy()),
    g = V(xy()),
    q = V(Cy()),
    f = V(_y()),
    T = V(Py()),
    A = V(qy()),
    k = V(Ty()),
    L = V(Ay()),
    I = V(wy()),
    y = V(Sy()),
    h = V(ky()),
    p = V(Ey()),
    m = V(Iy()),
    x = V(My()),
    R = V(Ly()),
    _ = V(Oy()),
    C = V(Ny()),
    M = V(Dy()),
    r = V(By()),
    i = V(Fy()),
    l = V(jy()),
    d = V(Vy()),
    v = V($y()),
    P = V(Hy()),
    w = V(Uy()),
    D = V(Gy()),
    N = V(Wy()),
    E = V(zy()),
    H = V(Ky()),
    X = V(Xy()),
    K = V(Yy()),
    ie = V(Qy()),
    se = V(Jy()),
    ne = V(Zy());
  function V(te) {
    return te && te.__esModule ? te : { default: te };
  }
  var ae = [
    ["doc-abstract", e.default],
    ["doc-acknowledgments", t.default],
    ["doc-afterword", a.default],
    ["doc-appendix", s.default],
    ["doc-backlink", o.default],
    ["doc-biblioentry", c.default],
    ["doc-bibliography", n.default],
    ["doc-biblioref", b.default],
    ["doc-chapter", g.default],
    ["doc-colophon", q.default],
    ["doc-conclusion", f.default],
    ["doc-cover", T.default],
    ["doc-credit", A.default],
    ["doc-credits", k.default],
    ["doc-dedication", L.default],
    ["doc-endnote", I.default],
    ["doc-endnotes", y.default],
    ["doc-epigraph", h.default],
    ["doc-epilogue", p.default],
    ["doc-errata", m.default],
    ["doc-example", x.default],
    ["doc-footnote", R.default],
    ["doc-foreword", _.default],
    ["doc-glossary", C.default],
    ["doc-glossref", M.default],
    ["doc-index", r.default],
    ["doc-introduction", i.default],
    ["doc-noteref", l.default],
    ["doc-notice", d.default],
    ["doc-pagebreak", v.default],
    ["doc-pagefooter", P.default],
    ["doc-pageheader", w.default],
    ["doc-pagelist", D.default],
    ["doc-part", N.default],
    ["doc-preface", E.default],
    ["doc-prologue", H.default],
    ["doc-pullquote", X.default],
    ["doc-qna", K.default],
    ["doc-subtitle", ie.default],
    ["doc-tip", se.default],
    ["doc-toc", ne.default],
  ];
  return ((Ur.default = ae), Ur);
}
var Ia = {},
  Ma = {},
  sd;
function t0() {
  if (sd) return Ma;
  ((sd = 1),
    Object.defineProperty(Ma, "__esModule", { value: !0 }),
    (Ma.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { module: "GRAPHICS", concept: { name: "graphics-object" } },
      { module: "ARIA", concept: { name: "img" } },
      { module: "ARIA", concept: { name: "article" } },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "document"]],
  };
  return ((Ma.default = e), Ma);
}
var La = {},
  nd;
function r0() {
  if (nd) return La;
  ((nd = 1),
    Object.defineProperty(La, "__esModule", { value: !0 }),
    (La.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !1,
    baseConcepts: [],
    childrenPresentational: !1,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [
      { module: "GRAPHICS", concept: { name: "graphics-document" } },
      { module: "ARIA", concept: { name: "group" } },
      { module: "ARIA", concept: { name: "img" } },
      { module: "GRAPHICS", concept: { name: "graphics-symbol" } },
    ],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "group"]],
  };
  return ((La.default = e), La);
}
var Oa = {},
  od;
function a0() {
  if (od) return Oa;
  ((od = 1),
    Object.defineProperty(Oa, "__esModule", { value: !0 }),
    (Oa.default = void 0));
  var e = {
    abstract: !1,
    accessibleNameRequired: !0,
    baseConcepts: [],
    childrenPresentational: !0,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
    },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "img"]],
  };
  return ((Oa.default = e), Oa);
}
var ld;
function i0() {
  if (ld) return Ia;
  ((ld = 1),
    Object.defineProperty(Ia, "__esModule", { value: !0 }),
    (Ia.default = void 0));
  var e = s(t0()),
    t = s(r0()),
    a = s(a0());
  function s(c) {
    return c && c.__esModule ? c : { default: c };
  }
  var o = [
    ["graphics-document", e.default],
    ["graphics-object", t.default],
    ["graphics-symbol", a.default],
  ];
  return ((Ia.default = o), Ia);
}
var ud;
function tl() {
  if (ud) return et;
  ((ud = 1),
    Object.defineProperty(et, "__esModule", { value: !0 }),
    (et.default = void 0));
  var e = c(N1()),
    t = c(py()),
    a = c(e0()),
    s = c(i0()),
    o = c(bn());
  function c(I) {
    return I && I.__esModule ? I : { default: I };
  }
  function n(I, y) {
    var h = (typeof Symbol < "u" && I[Symbol.iterator]) || I["@@iterator"];
    if (!h) {
      if (Array.isArray(I) || (h = q(I)) || y) {
        h && (I = h);
        var p = 0,
          m = function () {};
        return {
          s: m,
          n: function () {
            return p >= I.length ? { done: !0 } : { done: !1, value: I[p++] };
          },
          e: function (M) {
            throw M;
          },
          f: m,
        };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var x,
      R = !0,
      _ = !1;
    return {
      s: function () {
        h = h.call(I);
      },
      n: function () {
        var M = h.next();
        return ((R = M.done), M);
      },
      e: function (M) {
        ((_ = !0), (x = M));
      },
      f: function () {
        try {
          R || h.return == null || h.return();
        } finally {
          if (_) throw x;
        }
      },
    };
  }
  function b(I, y) {
    return A(I) || T(I, y) || q(I, y) || g();
  }
  function g() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function q(I, y) {
    if (I) {
      if (typeof I == "string") return f(I, y);
      var h = {}.toString.call(I).slice(8, -1);
      return (
        h === "Object" && I.constructor && (h = I.constructor.name),
        h === "Map" || h === "Set"
          ? Array.from(I)
          : h === "Arguments" ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(h)
            ? f(I, y)
            : void 0
      );
    }
  }
  function f(I, y) {
    (y == null || y > I.length) && (y = I.length);
    for (var h = 0, p = Array(y); h < y; h++) p[h] = I[h];
    return p;
  }
  function T(I, y) {
    var h =
      I == null
        ? null
        : (typeof Symbol < "u" && I[Symbol.iterator]) || I["@@iterator"];
    if (h != null) {
      var p,
        m,
        x,
        R,
        _ = [],
        C = !0,
        M = !1;
      try {
        if (((x = (h = h.call(I)).next), y === 0)) {
          if (Object(h) !== h) return;
          C = !1;
        } else
          for (
            ;
            !(C = (p = x.call(h)).done) && (_.push(p.value), _.length !== y);
            C = !0
          );
      } catch (r) {
        ((M = !0), (m = r));
      } finally {
        try {
          if (!C && h.return != null && ((R = h.return()), Object(R) !== R))
            return;
        } finally {
          if (M) throw m;
        }
      }
      return _;
    }
  }
  function A(I) {
    if (Array.isArray(I)) return I;
  }
  var k = [].concat(e.default, t.default, a.default, s.default);
  k.forEach(function (I) {
    var y = b(I, 2),
      h = y[1],
      p = n(h.superClass),
      m;
    try {
      for (p.s(); !(m = p.n()).done; ) {
        var x = m.value,
          R = n(x),
          _;
        try {
          var C = function () {
            var r = _.value,
              i = k.filter(function (w) {
                var D = b(w, 1),
                  N = D[0];
                return N === r;
              })[0];
            if (i)
              for (
                var l = i[1], d = 0, v = Object.keys(l.props);
                d < v.length;
                d++
              ) {
                var P = v[d];
                Object.prototype.hasOwnProperty.call(h.props, P) ||
                  (h.props[P] = l.props[P]);
              }
          };
          for (R.s(); !(_ = R.n()).done; ) C();
        } catch (M) {
          R.e(M);
        } finally {
          R.f();
        }
      }
    } catch (M) {
      p.e(M);
    } finally {
      p.f();
    }
  });
  var L = {
    entries: function () {
      return k;
    },
    forEach: function (y) {
      var h =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null,
        p = n(k),
        m;
      try {
        for (p.s(); !(m = p.n()).done; ) {
          var x = b(m.value, 2),
            R = x[0],
            _ = x[1];
          y.call(h, _, R, k);
        }
      } catch (C) {
        p.e(C);
      } finally {
        p.f();
      }
    },
    get: function (y) {
      var h = k.filter(function (p) {
        return p[0] === y;
      })[0];
      return h && h[1];
    },
    has: function (y) {
      return !!L.get(y);
    },
    keys: function () {
      return k.map(function (y) {
        var h = b(y, 1),
          p = h[0];
        return p;
      });
    },
    values: function () {
      return k.map(function (y) {
        var h = b(y, 2),
          p = h[1];
        return p;
      });
    },
  };
  return ((et.default = (0, o.default)(L, L.entries())), et);
}
var Na = {},
  cd;
function s0() {
  if (cd) return Na;
  ((cd = 1),
    Object.defineProperty(Na, "__esModule", { value: !0 }),
    (Na.default = void 0));
  var e = a(bn()),
    t = a(tl());
  function a(R) {
    return R && R.__esModule ? R : { default: R };
  }
  function s(R, _) {
    return g(R) || b(R, _) || c(R, _) || o();
  }
  function o() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function c(R, _) {
    if (R) {
      if (typeof R == "string") return n(R, _);
      var C = {}.toString.call(R).slice(8, -1);
      return (
        C === "Object" && R.constructor && (C = R.constructor.name),
        C === "Map" || C === "Set"
          ? Array.from(R)
          : C === "Arguments" ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(C)
            ? n(R, _)
            : void 0
      );
    }
  }
  function n(R, _) {
    (_ == null || _ > R.length) && (_ = R.length);
    for (var C = 0, M = Array(_); C < _; C++) M[C] = R[C];
    return M;
  }
  function b(R, _) {
    var C =
      R == null
        ? null
        : (typeof Symbol < "u" && R[Symbol.iterator]) || R["@@iterator"];
    if (C != null) {
      var M,
        r,
        i,
        l,
        d = [],
        v = !0,
        P = !1;
      try {
        if (((i = (C = C.call(R)).next), _ === 0)) {
          if (Object(C) !== C) return;
          v = !1;
        } else
          for (
            ;
            !(v = (M = i.call(C)).done) && (d.push(M.value), d.length !== _);
            v = !0
          );
      } catch (w) {
        ((P = !0), (r = w));
      } finally {
        try {
          if (!v && C.return != null && ((l = C.return()), Object(l) !== l))
            return;
        } finally {
          if (P) throw r;
        }
      }
      return d;
    }
  }
  function g(R) {
    if (Array.isArray(R)) return R;
  }
  for (var q = [], f = t.default.keys(), T = 0; T < f.length; T++) {
    var A = f[T],
      k = t.default.get(A);
    if (k)
      for (
        var L = [].concat(k.baseConcepts, k.relatedConcepts),
          I = function () {
            var _ = L[y];
            if (_.module === "HTML") {
              var C = _.concept;
              if (C) {
                var M = q.filter(function (d) {
                    return p(d[0], C);
                  })[0],
                  r;
                M ? (r = M[1]) : (r = []);
                for (var i = !0, l = 0; l < r.length; l++)
                  if (r[l] === A) {
                    i = !1;
                    break;
                  }
                (i && r.push(A), M || q.push([C, r]));
              }
            }
          },
          y = 0;
        y < L.length;
        y++
      )
        I();
  }
  var h = {
    entries: function () {
      return q;
    },
    forEach: function (_) {
      for (
        var C =
            arguments.length > 1 && arguments[1] !== void 0
              ? arguments[1]
              : null,
          M = 0,
          r = q;
        M < r.length;
        M++
      ) {
        var i = s(r[M], 2),
          l = i[0],
          d = i[1];
        _.call(C, d, l, q);
      }
    },
    get: function (_) {
      var C = q.filter(function (M) {
        return _.name === M[0].name && x(_.attributes, M[0].attributes);
      })[0];
      return C && C[1];
    },
    has: function (_) {
      return !!h.get(_);
    },
    keys: function () {
      return q.map(function (_) {
        var C = s(_, 1),
          M = C[0];
        return M;
      });
    },
    values: function () {
      return q.map(function (_) {
        var C = s(_, 2),
          M = C[1];
        return M;
      });
    },
  };
  function p(R, _) {
    return (
      R.name === _.name &&
      m(R.constraints, _.constraints) &&
      x(R.attributes, _.attributes)
    );
  }
  function m(R, _) {
    if ((R === void 0 && _ !== void 0) || (R !== void 0 && _ === void 0))
      return !1;
    if (R !== void 0 && _ !== void 0) {
      if (R.length !== _.length) return !1;
      for (var C = 0; C < R.length; C++) if (R[C] !== _[C]) return !1;
    }
    return !0;
  }
  function x(R, _) {
    if ((R === void 0 && _ !== void 0) || (R !== void 0 && _ === void 0))
      return !1;
    if (R !== void 0 && _ !== void 0) {
      if (R.length !== _.length) return !1;
      for (var C = 0; C < R.length; C++) {
        if (
          R[C].name !== _[C].name ||
          R[C].value !== _[C].value ||
          (R[C].constraints === void 0 && _[C].constraints !== void 0) ||
          (R[C].constraints !== void 0 && _[C].constraints === void 0)
        )
          return !1;
        if (R[C].constraints !== void 0 && _[C].constraints !== void 0) {
          if (R[C].constraints.length !== _[C].constraints.length) return !1;
          for (var M = 0; M < R[C].constraints.length; M++)
            if (R[C].constraints[M] !== _[C].constraints[M]) return !1;
        }
      }
    }
    return !0;
  }
  return ((Na.default = (0, e.default)(h, h.entries())), Na);
}
var Da = {},
  dd;
function n0() {
  if (dd) return Da;
  ((dd = 1),
    Object.defineProperty(Da, "__esModule", { value: !0 }),
    (Da.default = void 0));
  var e = a(bn()),
    t = a(tl());
  function a(x) {
    return x && x.__esModule ? x : { default: x };
  }
  function s(x, R) {
    return g(x) || b(x, R) || c(x, R) || o();
  }
  function o() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function c(x, R) {
    if (x) {
      if (typeof x == "string") return n(x, R);
      var _ = {}.toString.call(x).slice(8, -1);
      return (
        _ === "Object" && x.constructor && (_ = x.constructor.name),
        _ === "Map" || _ === "Set"
          ? Array.from(x)
          : _ === "Arguments" ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(_)
            ? n(x, R)
            : void 0
      );
    }
  }
  function n(x, R) {
    (R == null || R > x.length) && (R = x.length);
    for (var _ = 0, C = Array(R); _ < R; _++) C[_] = x[_];
    return C;
  }
  function b(x, R) {
    var _ =
      x == null
        ? null
        : (typeof Symbol < "u" && x[Symbol.iterator]) || x["@@iterator"];
    if (_ != null) {
      var C,
        M,
        r,
        i,
        l = [],
        d = !0,
        v = !1;
      try {
        if (((r = (_ = _.call(x)).next), R === 0)) {
          if (Object(_) !== _) return;
          d = !1;
        } else
          for (
            ;
            !(d = (C = r.call(_)).done) && (l.push(C.value), l.length !== R);
            d = !0
          );
      } catch (P) {
        ((v = !0), (M = P));
      } finally {
        try {
          if (!d && _.return != null && ((i = _.return()), Object(i) !== i))
            return;
        } finally {
          if (v) throw M;
        }
      }
      return l;
    }
  }
  function g(x) {
    if (Array.isArray(x)) return x;
  }
  for (var q = [], f = t.default.keys(), T = 0; T < f.length; T++) {
    var A = f[T],
      k = t.default.get(A),
      L = [];
    if (k) {
      for (
        var I = [].concat(k.baseConcepts, k.relatedConcepts), y = 0;
        y < I.length;
        y++
      ) {
        var h = I[y];
        if (h.module === "HTML") {
          var p = h.concept;
          p != null && L.push(p);
        }
      }
      L.length > 0 && q.push([A, L]);
    }
  }
  var m = {
    entries: function () {
      return q;
    },
    forEach: function (R) {
      for (
        var _ =
            arguments.length > 1 && arguments[1] !== void 0
              ? arguments[1]
              : null,
          C = 0,
          M = q;
        C < M.length;
        C++
      ) {
        var r = s(M[C], 2),
          i = r[0],
          l = r[1];
        R.call(_, l, i, q);
      }
    },
    get: function (R) {
      var _ = q.filter(function (C) {
        return C[0] === R;
      })[0];
      return _ && _[1];
    },
    has: function (R) {
      return !!m.get(R);
    },
    keys: function () {
      return q.map(function (R) {
        var _ = s(R, 1),
          C = _[0];
        return C;
      });
    },
    values: function () {
      return q.map(function (R) {
        var _ = s(R, 2),
          C = _[1];
        return C;
      });
    },
  };
  return ((Da.default = (0, e.default)(m, m.entries())), Da);
}
var pd;
function o0() {
  if (pd) return me;
  ((pd = 1),
    Object.defineProperty(me, "__esModule", { value: !0 }),
    (me.roles = me.roleElements = me.elementRoles = me.dom = me.aria = void 0));
  var e = c(C1()),
    t = c(_1()),
    a = c(tl()),
    s = c(s0()),
    o = c(n0());
  function c(n) {
    return n && n.__esModule ? n : { default: n };
  }
  return (
    (me.aria = e.default),
    (me.dom = t.default),
    (me.roles = a.default),
    (me.elementRoles = s.default),
    (me.roleElements = o.default),
    me
  );
}
var Vn = o0(),
  ge = {},
  Ba = {},
  An = {},
  Fa = {},
  hd;
function l0() {
  if (hd) return Fa;
  ((hd = 1),
    Object.defineProperty(Fa, "__esModule", { value: !0 }),
    (Fa.default = void 0));
  function e() {
    var a = this,
      s = 0,
      o = {
        "@@iterator": function () {
          return o;
        },
        next: function () {
          if (s < a.length) {
            var n = a[s];
            return ((s = s + 1), { done: !1, value: n });
          } else return { done: !0 };
        },
      };
    return o;
  }
  var t = e;
  return ((Fa.default = t), Fa);
}
var fd;
function $n() {
  if (fd) return An;
  ((fd = 1),
    Object.defineProperty(An, "__esModule", { value: !0 }),
    (An.default = s));
  var e = t(l0());
  function t(o) {
    return o && o.__esModule ? o : { default: o };
  }
  function a(o) {
    "@babel/helpers - typeof";
    return (
      (a =
        typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
          ? function (c) {
              return typeof c;
            }
          : function (c) {
              return c &&
                typeof Symbol == "function" &&
                c.constructor === Symbol &&
                c !== Symbol.prototype
                ? "symbol"
                : typeof c;
            }),
      a(o)
    );
  }
  function s(o, c) {
    return (
      typeof Symbol == "function" &&
        a(Symbol.iterator) === "symbol" &&
        Object.defineProperty(o, Symbol.iterator, { value: e.default.bind(c) }),
      o
    );
  }
  return An;
}
var ja = {},
  Va = {},
  md;
function u0() {
  if (md) return Va;
  ((md = 1),
    Object.defineProperty(Va, "__esModule", { value: !0 }),
    (Va.default = void 0));
  var e = {
      relatedConcepts: [{ module: "HTML", concept: { name: "abbr" } }],
      type: "structure",
    },
    t = e;
  return ((Va.default = t), Va);
}
var $a = {},
  vd;
function c0() {
  if (vd) return $a;
  ((vd = 1),
    Object.defineProperty($a, "__esModule", { value: !0 }),
    ($a.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "alertdialog" } }],
      type: "window",
    },
    t = e;
  return (($a.default = t), $a);
}
var Ha = {},
  bd;
function d0() {
  if (bd) return Ha;
  ((bd = 1),
    Object.defineProperty(Ha, "__esModule", { value: !0 }),
    (Ha.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "alert" } }],
      type: "structure",
    },
    t = e;
  return ((Ha.default = t), Ha);
}
var Ua = {},
  yd;
function p0() {
  if (yd) return Ua;
  ((yd = 1),
    Object.defineProperty(Ua, "__esModule", { value: !0 }),
    (Ua.default = void 0));
  var e = { relatedConcepts: [], type: "structure" },
    t = e;
  return ((Ua.default = t), Ua);
}
var Ga = {},
  Rd;
function h0() {
  if (Rd) return Ga;
  ((Rd = 1),
    Object.defineProperty(Ga, "__esModule", { value: !0 }),
    (Ga.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "application" } }],
      type: "window",
    },
    t = e;
  return ((Ga.default = t), Ga);
}
var Wa = {},
  gd;
function f0() {
  if (gd) return Wa;
  ((gd = 1),
    Object.defineProperty(Wa, "__esModule", { value: !0 }),
    (Wa.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "article" } },
        { module: "HTML", concept: { name: "article" } },
      ],
      type: "structure",
    },
    t = e;
  return ((Wa.default = t), Wa);
}
var za = {},
  xd;
function m0() {
  if (xd) return za;
  ((xd = 1),
    Object.defineProperty(za, "__esModule", { value: !0 }),
    (za.default = void 0));
  var e = {
      relatedConcepts: [{ module: "HTML", concept: { name: "audio" } }],
      type: "widget",
    },
    t = e;
  return ((za.default = t), za);
}
var Ka = {},
  Cd;
function v0() {
  if (Cd) return Ka;
  ((Cd = 1),
    Object.defineProperty(Ka, "__esModule", { value: !0 }),
    (Ka.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "banner" } }],
      type: "structure",
    },
    t = e;
  return ((Ka.default = t), Ka);
}
var Xa = {},
  _d;
function b0() {
  if (_d) return Xa;
  ((_d = 1),
    Object.defineProperty(Xa, "__esModule", { value: !0 }),
    (Xa.default = void 0));
  var e = {
      relatedConcepts: [{ module: "HTML", concept: { name: "blockquote" } }],
      type: "structure",
    },
    t = e;
  return ((Xa.default = t), Xa);
}
var Ya = {},
  Pd;
function y0() {
  if (Pd) return Ya;
  ((Pd = 1),
    Object.defineProperty(Ya, "__esModule", { value: !0 }),
    (Ya.default = void 0));
  var e = {
      relatedConcepts: [
        {
          module: "ARIA",
          concept: { attributes: [{ name: "aria-busy", value: "true" }] },
        },
      ],
      type: "widget",
    },
    t = e;
  return ((Ya.default = t), Ya);
}
var Qa = {},
  qd;
function R0() {
  if (qd) return Qa;
  ((qd = 1),
    Object.defineProperty(Qa, "__esModule", { value: !0 }),
    (Qa.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "button" } },
        { module: "HTML", concept: { name: "button" } },
      ],
      type: "widget",
    },
    t = e;
  return ((Qa.default = t), Qa);
}
var Ja = {},
  Td;
function g0() {
  if (Td) return Ja;
  ((Td = 1),
    Object.defineProperty(Ja, "__esModule", { value: !0 }),
    (Ja.default = void 0));
  var e = {
      relatedConcepts: [{ module: "HTML", concept: { name: "canvas" } }],
      type: "widget",
    },
    t = e;
  return ((Ja.default = t), Ja);
}
var Za = {},
  Ad;
function x0() {
  if (Ad) return Za;
  ((Ad = 1),
    Object.defineProperty(Za, "__esModule", { value: !0 }),
    (Za.default = void 0));
  var e = {
      relatedConcepts: [{ module: "HTML", concept: { name: "caption" } }],
      type: "structure",
    },
    t = e;
  return ((Za.default = t), Za);
}
var ei = {},
  wd;
function C0() {
  if (wd) return ei;
  ((wd = 1),
    Object.defineProperty(ei, "__esModule", { value: !0 }),
    (ei.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "cell" } },
        { module: "ARIA", concept: { name: "gridcell" } },
        { module: "HTML", concept: { name: "td" } },
      ],
      type: "widget",
    },
    t = e;
  return ((ei.default = t), ei);
}
var ti = {},
  Sd;
function _0() {
  if (Sd) return ti;
  ((Sd = 1),
    Object.defineProperty(ti, "__esModule", { value: !0 }),
    (ti.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "checkbox" } },
        {
          module: "HTML",
          concept: {
            name: "input",
            attributes: [{ name: "type", value: "checkbox" }],
          },
        },
      ],
      type: "widget",
    },
    t = e;
  return ((ti.default = t), ti);
}
var ri = {},
  kd;
function P0() {
  if (kd) return ri;
  ((kd = 1),
    Object.defineProperty(ri, "__esModule", { value: !0 }),
    (ri.default = void 0));
  var e = {
      relatedConcepts: [
        {
          module: "HTML",
          concept: {
            name: "input",
            attributes: [{ name: "type", value: "color" }],
          },
        },
      ],
      type: "widget",
    },
    t = e;
  return ((ri.default = t), ri);
}
var ai = {},
  Ed;
function q0() {
  if (Ed) return ai;
  ((Ed = 1),
    Object.defineProperty(ai, "__esModule", { value: !0 }),
    (ai.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "columnheader" } },
        { module: "HTML", concept: { name: "th" } },
      ],
      type: "widget",
    },
    t = e;
  return ((ai.default = t), ai);
}
var ii = {},
  Id;
function T0() {
  if (Id) return ii;
  ((Id = 1),
    Object.defineProperty(ii, "__esModule", { value: !0 }),
    (ii.default = void 0));
  var e = { relatedConcepts: [], type: "structure" },
    t = e;
  return ((ii.default = t), ii);
}
var si = {},
  Md;
function A0() {
  if (Md) return si;
  ((Md = 1),
    Object.defineProperty(si, "__esModule", { value: !0 }),
    (si.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "combobox" } },
        { module: "HTML", concept: { name: "select" } },
      ],
      type: "widget",
    },
    t = e;
  return ((si.default = t), si);
}
var ni = {},
  Ld;
function w0() {
  if (Ld) return ni;
  ((Ld = 1),
    Object.defineProperty(ni, "__esModule", { value: !0 }),
    (ni.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "complementary" } }],
      type: "structure",
    },
    t = e;
  return ((ni.default = t), ni);
}
var oi = {},
  Od;
function S0() {
  if (Od) return oi;
  ((Od = 1),
    Object.defineProperty(oi, "__esModule", { value: !0 }),
    (oi.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "structureinfo" } }],
      type: "structure",
    },
    t = e;
  return ((oi.default = t), oi);
}
var li = {},
  Nd;
function k0() {
  if (Nd) return li;
  ((Nd = 1),
    Object.defineProperty(li, "__esModule", { value: !0 }),
    (li.default = void 0));
  var e = {
      relatedConcepts: [
        {
          module: "HTML",
          concept: {
            name: "input",
            attributes: [{ name: "type", value: "date" }],
          },
        },
      ],
      type: "widget",
    },
    t = e;
  return ((li.default = t), li);
}
var ui = {},
  Dd;
function E0() {
  if (Dd) return ui;
  ((Dd = 1),
    Object.defineProperty(ui, "__esModule", { value: !0 }),
    (ui.default = void 0));
  var e = {
      relatedConcepts: [
        {
          module: "HTML",
          concept: {
            name: "input",
            attributes: [{ name: "type", value: "datetime" }],
          },
        },
      ],
      type: "widget",
    },
    t = e;
  return ((ui.default = t), ui);
}
var ci = {},
  Bd;
function I0() {
  if (Bd) return ci;
  ((Bd = 1),
    Object.defineProperty(ci, "__esModule", { value: !0 }),
    (ci.default = void 0));
  var e = {
      relatedConcepts: [{ module: "HTML", concept: { name: "dfn" } }],
      type: "structure",
    },
    t = e;
  return ((ci.default = t), ci);
}
var di = {},
  Fd;
function M0() {
  if (Fd) return di;
  ((Fd = 1),
    Object.defineProperty(di, "__esModule", { value: !0 }),
    (di.default = void 0));
  var e = {
      relatedConcepts: [{ module: "HTML", concept: { name: "dd" } }],
      type: "structure",
    },
    t = e;
  return ((di.default = t), di);
}
var pi = {},
  jd;
function L0() {
  if (jd) return pi;
  ((jd = 1),
    Object.defineProperty(pi, "__esModule", { value: !0 }),
    (pi.default = void 0));
  var e = {
      relatedConcepts: [{ module: "HTML", concept: { name: "dl" } }],
      type: "structure",
    },
    t = e;
  return ((pi.default = t), pi);
}
var hi = {},
  Vd;
function O0() {
  if (Vd) return hi;
  ((Vd = 1),
    Object.defineProperty(hi, "__esModule", { value: !0 }),
    (hi.default = void 0));
  var e = {
      relatedConcepts: [{ module: "HTML", concept: { name: "dt" } }],
      type: "structure",
    },
    t = e;
  return ((hi.default = t), hi);
}
var fi = {},
  $d;
function N0() {
  if ($d) return fi;
  (($d = 1),
    Object.defineProperty(fi, "__esModule", { value: !0 }),
    (fi.default = void 0));
  var e = {
      relatedConcepts: [{ module: "HTML", concept: { name: "details" } }],
      type: "structure",
    },
    t = e;
  return ((fi.default = t), fi);
}
var mi = {},
  Hd;
function D0() {
  if (Hd) return mi;
  ((Hd = 1),
    Object.defineProperty(mi, "__esModule", { value: !0 }),
    (mi.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "dialog" } },
        { module: "HTML", concept: { name: "dialog" } },
      ],
      type: "window",
    },
    t = e;
  return ((mi.default = t), mi);
}
var vi = {},
  Ud;
function B0() {
  if (Ud) return vi;
  ((Ud = 1),
    Object.defineProperty(vi, "__esModule", { value: !0 }),
    (vi.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "directory" } },
        { module: "HTML", concept: { name: "dir" } },
      ],
      type: "structure",
    },
    t = e;
  return ((vi.default = t), vi);
}
var bi = {},
  Gd;
function F0() {
  if (Gd) return bi;
  ((Gd = 1),
    Object.defineProperty(bi, "__esModule", { value: !0 }),
    (bi.default = void 0));
  var e = {
      relatedConcepts: [
        {
          module: "HTML",
          concept: {
            constraints: ["scoped to a details element"],
            name: "summary",
          },
        },
      ],
      type: "widget",
    },
    t = e;
  return ((bi.default = t), bi);
}
var yi = {},
  Wd;
function j0() {
  if (Wd) return yi;
  ((Wd = 1),
    Object.defineProperty(yi, "__esModule", { value: !0 }),
    (yi.default = void 0));
  var e = {
      relatedConcepts: [{ module: "HTML", concept: { name: "div" } }],
      type: "generic",
    },
    t = e;
  return ((yi.default = t), yi);
}
var Ri = {},
  zd;
function V0() {
  if (zd) return Ri;
  ((zd = 1),
    Object.defineProperty(Ri, "__esModule", { value: !0 }),
    (Ri.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "document" } }],
      type: "structure",
    },
    t = e;
  return ((Ri.default = t), Ri);
}
var gi = {},
  Kd;
function $0() {
  if (Kd) return gi;
  ((Kd = 1),
    Object.defineProperty(gi, "__esModule", { value: !0 }),
    (gi.default = void 0));
  var e = {
      relatedConcepts: [{ module: "HTML", concept: { name: "embed" } }],
      type: "widget",
    },
    t = e;
  return ((gi.default = t), gi);
}
var xi = {},
  Xd;
function H0() {
  if (Xd) return xi;
  ((Xd = 1),
    Object.defineProperty(xi, "__esModule", { value: !0 }),
    (xi.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "feed" } }],
      type: "structure",
    },
    t = e;
  return ((xi.default = t), xi);
}
var Ci = {},
  Yd;
function U0() {
  if (Yd) return Ci;
  ((Yd = 1),
    Object.defineProperty(Ci, "__esModule", { value: !0 }),
    (Ci.default = void 0));
  var e = {
      relatedConcepts: [{ module: "HTML", concept: { name: "figcaption" } }],
      type: "structure",
    },
    t = e;
  return ((Ci.default = t), Ci);
}
var _i = {},
  Qd;
function G0() {
  if (Qd) return _i;
  ((Qd = 1),
    Object.defineProperty(_i, "__esModule", { value: !0 }),
    (_i.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "figure" } },
        { module: "HTML", concept: { name: "figure" } },
      ],
      type: "structure",
    },
    t = e;
  return ((_i.default = t), _i);
}
var Pi = {},
  Jd;
function W0() {
  if (Jd) return Pi;
  ((Jd = 1),
    Object.defineProperty(Pi, "__esModule", { value: !0 }),
    (Pi.default = void 0));
  var e = {
      relatedConcepts: [{ module: "HTML", concept: { name: "footer" } }],
      type: "structure",
    },
    t = e;
  return ((Pi.default = t), Pi);
}
var qi = {},
  Zd;
function z0() {
  if (Zd) return qi;
  ((Zd = 1),
    Object.defineProperty(qi, "__esModule", { value: !0 }),
    (qi.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "form" } },
        { module: "HTML", concept: { name: "form" } },
      ],
      type: "structure",
    },
    t = e;
  return ((qi.default = t), qi);
}
var Ti = {},
  ep;
function K0() {
  if (ep) return Ti;
  ((ep = 1),
    Object.defineProperty(Ti, "__esModule", { value: !0 }),
    (Ti.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "grid" } }],
      type: "widget",
    },
    t = e;
  return ((Ti.default = t), Ti);
}
var Ai = {},
  tp;
function X0() {
  if (tp) return Ai;
  ((tp = 1),
    Object.defineProperty(Ai, "__esModule", { value: !0 }),
    (Ai.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "group" } }],
      type: "structure",
    },
    t = e;
  return ((Ai.default = t), Ai);
}
var wi = {},
  rp;
function Y0() {
  if (rp) return wi;
  ((rp = 1),
    Object.defineProperty(wi, "__esModule", { value: !0 }),
    (wi.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "heading" } },
        { module: "HTML", concept: { name: "h1" } },
        { module: "HTML", concept: { name: "h2" } },
        { module: "HTML", concept: { name: "h3" } },
        { module: "HTML", concept: { name: "h4" } },
        { module: "HTML", concept: { name: "h5" } },
        { module: "HTML", concept: { name: "h6" } },
      ],
      type: "structure",
    },
    t = e;
  return ((wi.default = t), wi);
}
var Si = {},
  ap;
function Q0() {
  if (ap) return Si;
  ((ap = 1),
    Object.defineProperty(Si, "__esModule", { value: !0 }),
    (Si.default = void 0));
  var e = { relatedConcepts: [], type: "window" },
    t = e;
  return ((Si.default = t), Si);
}
var ki = {},
  ip;
function J0() {
  if (ip) return ki;
  ((ip = 1),
    Object.defineProperty(ki, "__esModule", { value: !0 }),
    (ki.default = void 0));
  var e = {
      relatedConcepts: [{ module: "HTML", concept: { name: "iframe" } }],
      type: "window",
    },
    t = e;
  return ((ki.default = t), ki);
}
var Ei = {},
  sp;
function Z0() {
  if (sp) return Ei;
  ((sp = 1),
    Object.defineProperty(Ei, "__esModule", { value: !0 }),
    (Ei.default = void 0));
  var e = { relatedConcepts: [], type: "structure" },
    t = e;
  return ((Ei.default = t), Ei);
}
var Ii = {},
  np;
function eR() {
  if (np) return Ii;
  ((np = 1),
    Object.defineProperty(Ii, "__esModule", { value: !0 }),
    (Ii.default = void 0));
  var e = { relatedConcepts: [], type: "widget" },
    t = e;
  return ((Ii.default = t), Ii);
}
var Mi = {},
  op;
function tR() {
  if (op) return Mi;
  ((op = 1),
    Object.defineProperty(Mi, "__esModule", { value: !0 }),
    (Mi.default = void 0));
  var e = {
      relatedConcepts: [
        {
          module: "HTML",
          concept: { name: "img", attributes: [{ name: "usemap" }] },
        },
      ],
      type: "structure",
    },
    t = e;
  return ((Mi.default = t), Mi);
}
var Li = {},
  lp;
function rR() {
  if (lp) return Li;
  ((lp = 1),
    Object.defineProperty(Li, "__esModule", { value: !0 }),
    (Li.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "img" } },
        { module: "HTML", concept: { name: "img" } },
      ],
      type: "structure",
    },
    t = e;
  return ((Li.default = t), Li);
}
var Oi = {},
  up;
function aR() {
  if (up) return Oi;
  ((up = 1),
    Object.defineProperty(Oi, "__esModule", { value: !0 }),
    (Oi.default = void 0));
  var e = {
      relatedConcepts: [{ module: "HTML", concept: { name: "input" } }],
      type: "widget",
    },
    t = e;
  return ((Oi.default = t), Oi);
}
var Ni = {},
  cp;
function iR() {
  if (cp) return Ni;
  ((cp = 1),
    Object.defineProperty(Ni, "__esModule", { value: !0 }),
    (Ni.default = void 0));
  var e = {
      relatedConcepts: [
        {
          module: "HTML",
          concept: {
            name: "input",
            attributes: [{ name: "type", value: "time" }],
          },
        },
      ],
      type: "widget",
    },
    t = e;
  return ((Ni.default = t), Ni);
}
var Di = {},
  dp;
function sR() {
  if (dp) return Di;
  ((dp = 1),
    Object.defineProperty(Di, "__esModule", { value: !0 }),
    (Di.default = void 0));
  var e = {
      relatedConcepts: [{ module: "HTML", concept: { name: "label" } }],
      type: "structure",
    },
    t = e;
  return ((Di.default = t), Di);
}
var Bi = {},
  pp;
function nR() {
  if (pp) return Bi;
  ((pp = 1),
    Object.defineProperty(Bi, "__esModule", { value: !0 }),
    (Bi.default = void 0));
  var e = {
      relatedConcepts: [{ module: "HTML", concept: { name: "legend" } }],
      type: "structure",
    },
    t = e;
  return ((Bi.default = t), Bi);
}
var Fi = {},
  hp;
function oR() {
  if (hp) return Fi;
  ((hp = 1),
    Object.defineProperty(Fi, "__esModule", { value: !0 }),
    (Fi.default = void 0));
  var e = {
      relatedConcepts: [{ module: "HTML", concept: { name: "br" } }],
      type: "structure",
    },
    t = e;
  return ((Fi.default = t), Fi);
}
var ji = {},
  fp;
function lR() {
  if (fp) return ji;
  ((fp = 1),
    Object.defineProperty(ji, "__esModule", { value: !0 }),
    (ji.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "link" } },
        {
          module: "HTML",
          concept: { name: "a", attributes: [{ name: "href" }] },
        },
      ],
      type: "widget",
    },
    t = e;
  return ((ji.default = t), ji);
}
var Vi = {},
  mp;
function uR() {
  if (mp) return Vi;
  ((mp = 1),
    Object.defineProperty(Vi, "__esModule", { value: !0 }),
    (Vi.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "option" } },
        { module: "HTML", concept: { name: "option" } },
      ],
      type: "widget",
    },
    t = e;
  return ((Vi.default = t), Vi);
}
var $i = {},
  vp;
function cR() {
  if (vp) return $i;
  ((vp = 1),
    Object.defineProperty($i, "__esModule", { value: !0 }),
    ($i.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "listbox" } },
        { module: "HTML", concept: { name: "datalist" } },
        { module: "HTML", concept: { name: "select" } },
      ],
      type: "widget",
    },
    t = e;
  return (($i.default = t), $i);
}
var Hi = {},
  bp;
function dR() {
  if (bp) return Hi;
  ((bp = 1),
    Object.defineProperty(Hi, "__esModule", { value: !0 }),
    (Hi.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "listitem" } },
        { module: "HTML", concept: { name: "li" } },
      ],
      type: "structure",
    },
    t = e;
  return ((Hi.default = t), Hi);
}
var Ui = {},
  yp;
function pR() {
  if (yp) return Ui;
  ((yp = 1),
    Object.defineProperty(Ui, "__esModule", { value: !0 }),
    (Ui.default = void 0));
  var e = { relatedConcepts: [], type: "structure" },
    t = e;
  return ((Ui.default = t), Ui);
}
var Gi = {},
  Rp;
function hR() {
  if (Rp) return Gi;
  ((Rp = 1),
    Object.defineProperty(Gi, "__esModule", { value: !0 }),
    (Gi.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "list" } },
        { module: "HTML", concept: { name: "ul" } },
        { module: "HTML", concept: { name: "ol" } },
      ],
      type: "structure",
    },
    t = e;
  return ((Gi.default = t), Gi);
}
var Wi = {},
  gp;
function fR() {
  if (gp) return Wi;
  ((gp = 1),
    Object.defineProperty(Wi, "__esModule", { value: !0 }),
    (Wi.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "log" } }],
      type: "structure",
    },
    t = e;
  return ((Wi.default = t), Wi);
}
var zi = {},
  xp;
function mR() {
  if (xp) return zi;
  ((xp = 1),
    Object.defineProperty(zi, "__esModule", { value: !0 }),
    (zi.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "main" } },
        { module: "HTML", concept: { name: "main" } },
      ],
      type: "structure",
    },
    t = e;
  return ((zi.default = t), zi);
}
var Ki = {},
  Cp;
function vR() {
  if (Cp) return Ki;
  ((Cp = 1),
    Object.defineProperty(Ki, "__esModule", { value: !0 }),
    (Ki.default = void 0));
  var e = {
      relatedConcepts: [{ module: "HTML", concept: { name: "mark" } }],
      type: "structure",
    },
    t = e;
  return ((Ki.default = t), Ki);
}
var Xi = {},
  _p;
function bR() {
  if (_p) return Xi;
  ((_p = 1),
    Object.defineProperty(Xi, "__esModule", { value: !0 }),
    (Xi.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "marquee" } },
        { module: "HTML", concept: { name: "marquee" } },
      ],
      type: "structure",
    },
    t = e;
  return ((Xi.default = t), Xi);
}
var Yi = {},
  Pp;
function yR() {
  if (Pp) return Yi;
  ((Pp = 1),
    Object.defineProperty(Yi, "__esModule", { value: !0 }),
    (Yi.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "math" } }],
      type: "structure",
    },
    t = e;
  return ((Yi.default = t), Yi);
}
var Qi = {},
  qp;
function RR() {
  if (qp) return Qi;
  ((qp = 1),
    Object.defineProperty(Qi, "__esModule", { value: !0 }),
    (Qi.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "menubar" } }],
      type: "structure",
    },
    t = e;
  return ((Qi.default = t), Qi);
}
var Ji = {},
  Tp;
function gR() {
  if (Tp) return Ji;
  ((Tp = 1),
    Object.defineProperty(Ji, "__esModule", { value: !0 }),
    (Ji.default = void 0));
  var e = { relatedConcepts: [], type: "widget" },
    t = e;
  return ((Ji.default = t), Ji);
}
var Zi = {},
  Ap;
function xR() {
  if (Ap) return Zi;
  ((Ap = 1),
    Object.defineProperty(Zi, "__esModule", { value: !0 }),
    (Zi.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "menuitem" } },
        { module: "HTML", concept: { name: "menuitem" } },
      ],
      type: "widget",
    },
    t = e;
  return ((Zi.default = t), Zi);
}
var es = {},
  wp;
function CR() {
  if (wp) return es;
  ((wp = 1),
    Object.defineProperty(es, "__esModule", { value: !0 }),
    (es.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "menuitemcheckbox" } },
      ],
      type: "widget",
    },
    t = e;
  return ((es.default = t), es);
}
var ts = {},
  Sp;
function _R() {
  if (Sp) return ts;
  ((Sp = 1),
    Object.defineProperty(ts, "__esModule", { value: !0 }),
    (ts.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "menuitemradio" } }],
      type: "widget",
    },
    t = e;
  return ((ts.default = t), ts);
}
var rs = {},
  kp;
function PR() {
  if (kp) return rs;
  ((kp = 1),
    Object.defineProperty(rs, "__esModule", { value: !0 }),
    (rs.default = void 0));
  var e = { relatedConcepts: [], type: "widget" },
    t = e;
  return ((rs.default = t), rs);
}
var as = {},
  Ep;
function qR() {
  if (Ep) return as;
  ((Ep = 1),
    Object.defineProperty(as, "__esModule", { value: !0 }),
    (as.default = void 0));
  var e = { relatedConcepts: [], type: "widget" },
    t = e;
  return ((as.default = t), as);
}
var is = {},
  Ip;
function TR() {
  if (Ip) return is;
  ((Ip = 1),
    Object.defineProperty(is, "__esModule", { value: !0 }),
    (is.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "menu" } },
        { module: "HTML", concept: { name: "menu" } },
      ],
      type: "structure",
    },
    t = e;
  return ((is.default = t), is);
}
var ss = {},
  Mp;
function AR() {
  if (Mp) return ss;
  ((Mp = 1),
    Object.defineProperty(ss, "__esModule", { value: !0 }),
    (ss.default = void 0));
  var e = {
      relatedConcepts: [{ module: "HTML", concept: { name: "meter" } }],
      type: "structure",
    },
    t = e;
  return ((ss.default = t), ss);
}
var ns = {},
  Lp;
function wR() {
  if (Lp) return ns;
  ((Lp = 1),
    Object.defineProperty(ns, "__esModule", { value: !0 }),
    (ns.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "navigation" } },
        { module: "HTML", concept: { name: "nav" } },
      ],
      type: "structure",
    },
    t = e;
  return ((ns.default = t), ns);
}
var os = {},
  Op;
function SR() {
  if (Op) return os;
  ((Op = 1),
    Object.defineProperty(os, "__esModule", { value: !0 }),
    (os.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "none" } }],
      type: "structure",
    },
    t = e;
  return ((os.default = t), os);
}
var ls = {},
  Np;
function kR() {
  if (Np) return ls;
  ((Np = 1),
    Object.defineProperty(ls, "__esModule", { value: !0 }),
    (ls.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "note" } }],
      type: "structure",
    },
    t = e;
  return ((ls.default = t), ls);
}
var us = {},
  Dp;
function ER() {
  if (Dp) return us;
  ((Dp = 1),
    Object.defineProperty(us, "__esModule", { value: !0 }),
    (us.default = void 0));
  var e = { relatedConcepts: [], type: "structure" },
    t = e;
  return ((us.default = t), us);
}
var cs = {},
  Bp;
function IR() {
  if (Bp) return cs;
  ((Bp = 1),
    Object.defineProperty(cs, "__esModule", { value: !0 }),
    (cs.default = void 0));
  var e = {
      relatedConcepts: [{ module: "HTML", concept: { name: "p" } }],
      type: "structure",
    },
    t = e;
  return ((cs.default = t), cs);
}
var ds = {},
  Fp;
function MR() {
  if (Fp) return ds;
  ((Fp = 1),
    Object.defineProperty(ds, "__esModule", { value: !0 }),
    (ds.default = void 0));
  var e = { relatedConcepts: [], type: "widget" },
    t = e;
  return ((ds.default = t), ds);
}
var ps = {},
  jp;
function LR() {
  if (jp) return ps;
  ((jp = 1),
    Object.defineProperty(ps, "__esModule", { value: !0 }),
    (ps.default = void 0));
  var e = {
      relatedConcepts: [{ module: "HTML", concept: { name: "pre" } }],
      type: "structure",
    },
    t = e;
  return ((ps.default = t), ps);
}
var hs = {},
  Vp;
function OR() {
  if (Vp) return hs;
  ((Vp = 1),
    Object.defineProperty(hs, "__esModule", { value: !0 }),
    (hs.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "presentation" } }],
      type: "structure",
    },
    t = e;
  return ((hs.default = t), hs);
}
var fs = {},
  $p;
function NR() {
  if ($p) return fs;
  (($p = 1),
    Object.defineProperty(fs, "__esModule", { value: !0 }),
    (fs.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "progressbar" } },
        { module: "HTML", concept: { name: "progress" } },
      ],
      type: "structure",
    },
    t = e;
  return ((fs.default = t), fs);
}
var ms = {},
  Hp;
function DR() {
  if (Hp) return ms;
  ((Hp = 1),
    Object.defineProperty(ms, "__esModule", { value: !0 }),
    (ms.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "radio" } },
        {
          module: "HTML",
          concept: {
            name: "input",
            attributes: [{ name: "type", value: "radio" }],
          },
        },
      ],
      type: "widget",
    },
    t = e;
  return ((ms.default = t), ms);
}
var vs = {},
  Up;
function BR() {
  if (Up) return vs;
  ((Up = 1),
    Object.defineProperty(vs, "__esModule", { value: !0 }),
    (vs.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "radiogroup" } }],
      type: "structure",
    },
    t = e;
  return ((vs.default = t), vs);
}
var bs = {},
  Gp;
function FR() {
  if (Gp) return bs;
  ((Gp = 1),
    Object.defineProperty(bs, "__esModule", { value: !0 }),
    (bs.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "region" } }],
      type: "structure",
    },
    t = e;
  return ((bs.default = t), bs);
}
var ys = {},
  Wp;
function jR() {
  if (Wp) return ys;
  ((Wp = 1),
    Object.defineProperty(ys, "__esModule", { value: !0 }),
    (ys.default = void 0));
  var e = { relatedConcepts: [], type: "structure" },
    t = e;
  return ((ys.default = t), ys);
}
var Rs = {},
  zp;
function VR() {
  if (zp) return Rs;
  ((zp = 1),
    Object.defineProperty(Rs, "__esModule", { value: !0 }),
    (Rs.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "rowheader" } },
        {
          module: "HTML",
          concept: {
            name: "th",
            attributes: [{ name: "scope", value: "row" }],
          },
        },
      ],
      type: "widget",
    },
    t = e;
  return ((Rs.default = t), Rs);
}
var gs = {},
  Kp;
function $R() {
  if (Kp) return gs;
  ((Kp = 1),
    Object.defineProperty(gs, "__esModule", { value: !0 }),
    (gs.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "row" } },
        { module: "HTML", concept: { name: "tr" } },
      ],
      type: "structure",
    },
    t = e;
  return ((gs.default = t), gs);
}
var xs = {},
  Xp;
function HR() {
  if (Xp) return xs;
  ((Xp = 1),
    Object.defineProperty(xs, "__esModule", { value: !0 }),
    (xs.default = void 0));
  var e = {
      relatedConcepts: [{ module: "HTML", concept: { name: "ruby" } }],
      type: "structure",
    },
    t = e;
  return ((xs.default = t), xs);
}
var Cs = {},
  Yp;
function UR() {
  if (Yp) return Cs;
  ((Yp = 1),
    Object.defineProperty(Cs, "__esModule", { value: !0 }),
    (Cs.default = void 0));
  var e = { relatedConcepts: [], type: "structure" },
    t = e;
  return ((Cs.default = t), Cs);
}
var _s = {},
  Qp;
function GR() {
  if (Qp) return _s;
  ((Qp = 1),
    Object.defineProperty(_s, "__esModule", { value: !0 }),
    (_s.default = void 0));
  var e = { relatedConcepts: [], type: "structure" },
    t = e;
  return ((_s.default = t), _s);
}
var Ps = {},
  Jp;
function WR() {
  if (Jp) return Ps;
  ((Jp = 1),
    Object.defineProperty(Ps, "__esModule", { value: !0 }),
    (Ps.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "scrollbar" } }],
      type: "widget",
    },
    t = e;
  return ((Ps.default = t), Ps);
}
var qs = {},
  Zp;
function zR() {
  if (Zp) return qs;
  ((Zp = 1),
    Object.defineProperty(qs, "__esModule", { value: !0 }),
    (qs.default = void 0));
  var e = { relatedConcepts: [], type: "structure" },
    t = e;
  return ((qs.default = t), qs);
}
var Ts = {},
  eh;
function KR() {
  if (eh) return Ts;
  ((eh = 1),
    Object.defineProperty(Ts, "__esModule", { value: !0 }),
    (Ts.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "search" } }],
      type: "structure",
    },
    t = e;
  return ((Ts.default = t), Ts);
}
var As = {},
  th;
function XR() {
  if (th) return As;
  ((th = 1),
    Object.defineProperty(As, "__esModule", { value: !0 }),
    (As.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "searchbox" } },
        {
          module: "HTML",
          concept: {
            name: "input",
            attributes: [{ name: "type", value: "search" }],
          },
        },
      ],
      type: "widget",
    },
    t = e;
  return ((As.default = t), As);
}
var ws = {},
  rh;
function YR() {
  if (rh) return ws;
  ((rh = 1),
    Object.defineProperty(ws, "__esModule", { value: !0 }),
    (ws.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "slider" } },
        {
          module: "HTML",
          concept: {
            name: "input",
            attributes: [{ name: "type", value: "range" }],
          },
        },
      ],
      type: "widget",
    },
    t = e;
  return ((ws.default = t), ws);
}
var Ss = {},
  ah;
function QR() {
  if (ah) return Ss;
  ((ah = 1),
    Object.defineProperty(Ss, "__esModule", { value: !0 }),
    (Ss.default = void 0));
  var e = { relatedConcepts: [], type: "structure" },
    t = e;
  return ((Ss.default = t), Ss);
}
var ks = {},
  ih;
function JR() {
  if (ih) return ks;
  ((ih = 1),
    Object.defineProperty(ks, "__esModule", { value: !0 }),
    (ks.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "spinbutton" } },
        {
          module: "HTML",
          concept: {
            name: "input",
            attributes: [{ name: "type", value: "number" }],
          },
        },
      ],
      type: "widget",
    },
    t = e;
  return ((ks.default = t), ks);
}
var Es = {},
  sh;
function ZR() {
  if (sh) return Es;
  ((sh = 1),
    Object.defineProperty(Es, "__esModule", { value: !0 }),
    (Es.default = void 0));
  var e = { relatedConcepts: [], type: "structure" },
    t = e;
  return ((Es.default = t), Es);
}
var Is = {},
  nh;
function eg() {
  if (nh) return Is;
  ((nh = 1),
    Object.defineProperty(Is, "__esModule", { value: !0 }),
    (Is.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "separator" } }],
      type: "widget",
    },
    t = e;
  return ((Is.default = t), Is);
}
var Ms = {},
  oh;
function tg() {
  if (oh) return Ms;
  ((oh = 1),
    Object.defineProperty(Ms, "__esModule", { value: !0 }),
    (Ms.default = void 0));
  var e = { relatedConcepts: [], type: "structure" },
    t = e;
  return ((Ms.default = t), Ms);
}
var Ls = {},
  lh;
function rg() {
  if (lh) return Ls;
  ((lh = 1),
    Object.defineProperty(Ls, "__esModule", { value: !0 }),
    (Ls.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "status" } }],
      type: "structure",
    },
    t = e;
  return ((Ls.default = t), Ls);
}
var Os = {},
  uh;
function ag() {
  if (uh) return Os;
  ((uh = 1),
    Object.defineProperty(Os, "__esModule", { value: !0 }),
    (Os.default = void 0));
  var e = { relatedConcepts: [], type: "structure" },
    t = e;
  return ((Os.default = t), Os);
}
var Ns = {},
  ch;
function ig() {
  if (ch) return Ns;
  ((ch = 1),
    Object.defineProperty(Ns, "__esModule", { value: !0 }),
    (Ns.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "switch" } },
        {
          module: "HTML",
          concept: {
            name: "input",
            attributes: [{ name: "type", value: "checkbox" }],
          },
        },
      ],
      type: "widget",
    },
    t = e;
  return ((Ns.default = t), Ns);
}
var Ds = {},
  dh;
function sg() {
  if (dh) return Ds;
  ((dh = 1),
    Object.defineProperty(Ds, "__esModule", { value: !0 }),
    (Ds.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "tablist" } }],
      type: "structure",
    },
    t = e;
  return ((Ds.default = t), Ds);
}
var Bs = {},
  ph;
function ng() {
  if (ph) return Bs;
  ((ph = 1),
    Object.defineProperty(Bs, "__esModule", { value: !0 }),
    (Bs.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "tab" } }],
      type: "widget",
    },
    t = e;
  return ((Bs.default = t), Bs);
}
var Fs = {},
  hh;
function og() {
  if (hh) return Fs;
  ((hh = 1),
    Object.defineProperty(Fs, "__esModule", { value: !0 }),
    (Fs.default = void 0));
  var e = { relatedConcepts: [], type: "structure" },
    t = e;
  return ((Fs.default = t), Fs);
}
var js = {},
  fh;
function lg() {
  if (fh) return js;
  ((fh = 1),
    Object.defineProperty(js, "__esModule", { value: !0 }),
    (js.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "table" } },
        { module: "HTML", concept: { name: "table" } },
      ],
      type: "structure",
    },
    t = e;
  return ((js.default = t), js);
}
var Vs = {},
  mh;
function ug() {
  if (mh) return Vs;
  ((mh = 1),
    Object.defineProperty(Vs, "__esModule", { value: !0 }),
    (Vs.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "tablist" } }],
      type: "structure",
    },
    t = e;
  return ((Vs.default = t), Vs);
}
var $s = {},
  vh;
function cg() {
  if (vh) return $s;
  ((vh = 1),
    Object.defineProperty($s, "__esModule", { value: !0 }),
    ($s.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "tabpanel" } }],
      type: "structure",
    },
    t = e;
  return (($s.default = t), $s);
}
var Hs = {},
  bh;
function dg() {
  if (bh) return Hs;
  ((bh = 1),
    Object.defineProperty(Hs, "__esModule", { value: !0 }),
    (Hs.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "term" } }],
      type: "structure",
    },
    t = e;
  return ((Hs.default = t), Hs);
}
var Us = {},
  yh;
function pg() {
  if (yh) return Us;
  ((yh = 1),
    Object.defineProperty(Us, "__esModule", { value: !0 }),
    (Us.default = void 0));
  var e = {
      relatedConcepts: [
        {
          module: "ARIA",
          concept: {
            attributes: [{ name: "aria-multiline", value: "true" }],
            name: "textbox",
          },
        },
        { module: "HTML", concept: { name: "textarea" } },
      ],
      type: "widget",
    },
    t = e;
  return ((Us.default = t), Us);
}
var Gs = {},
  Rh;
function hg() {
  if (Rh) return Gs;
  ((Rh = 1),
    Object.defineProperty(Gs, "__esModule", { value: !0 }),
    (Gs.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { name: "textbox" } },
        { module: "HTML", concept: { name: "input" } },
        {
          module: "HTML",
          concept: {
            name: "input",
            attributes: [{ name: "type", value: "text" }],
          },
        },
      ],
      type: "widget",
    },
    t = e;
  return ((Gs.default = t), Gs);
}
var Ws = {},
  gh;
function fg() {
  if (gh) return Ws;
  ((gh = 1),
    Object.defineProperty(Ws, "__esModule", { value: !0 }),
    (Ws.default = void 0));
  var e = {
      relatedConcepts: [{ module: "HTML", concept: { name: "time" } }],
      type: "structure",
    },
    t = e;
  return ((Ws.default = t), Ws);
}
var zs = {},
  xh;
function mg() {
  if (xh) return zs;
  ((xh = 1),
    Object.defineProperty(zs, "__esModule", { value: !0 }),
    (zs.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "timer" } }],
      type: "structure",
    },
    t = e;
  return ((zs.default = t), zs);
}
var Ks = {},
  Ch;
function vg() {
  if (Ch) return Ks;
  ((Ch = 1),
    Object.defineProperty(Ks, "__esModule", { value: !0 }),
    (Ks.default = void 0));
  var e = {
      relatedConcepts: [
        { module: "ARIA", concept: { attributes: [{ name: "aria-pressed" }] } },
      ],
      type: "widget",
    },
    t = e;
  return ((Ks.default = t), Ks);
}
var Xs = {},
  _h;
function bg() {
  if (_h) return Xs;
  ((_h = 1),
    Object.defineProperty(Xs, "__esModule", { value: !0 }),
    (Xs.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "toolbar" } }],
      type: "structure",
    },
    t = e;
  return ((Xs.default = t), Xs);
}
var Ys = {},
  Ph;
function yg() {
  if (Ph) return Ys;
  ((Ph = 1),
    Object.defineProperty(Ys, "__esModule", { value: !0 }),
    (Ys.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "tree" } }],
      type: "widget",
    },
    t = e;
  return ((Ys.default = t), Ys);
}
var Qs = {},
  qh;
function Rg() {
  if (qh) return Qs;
  ((qh = 1),
    Object.defineProperty(Qs, "__esModule", { value: !0 }),
    (Qs.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "treegrid" } }],
      type: "widget",
    },
    t = e;
  return ((Qs.default = t), Qs);
}
var Js = {},
  Th;
function gg() {
  if (Th) return Js;
  ((Th = 1),
    Object.defineProperty(Js, "__esModule", { value: !0 }),
    (Js.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "treeitem" } }],
      type: "widget",
    },
    t = e;
  return ((Js.default = t), Js);
}
var Zs = {},
  Ah;
function xg() {
  if (Ah) return Zs;
  ((Ah = 1),
    Object.defineProperty(Zs, "__esModule", { value: !0 }),
    (Zs.default = void 0));
  var e = {
      relatedConcepts: [{ module: "ARIA", concept: { name: "tooltip" } }],
      type: "structure",
    },
    t = e;
  return ((Zs.default = t), Zs);
}
var en = {},
  wh;
function Cg() {
  if (wh) return en;
  ((wh = 1),
    Object.defineProperty(en, "__esModule", { value: !0 }),
    (en.default = void 0));
  var e = {
      relatedConcepts: [{ module: "HTML", concept: { name: "video" } }],
      type: "widget",
    },
    t = e;
  return ((en.default = t), en);
}
var tn = {},
  Sh;
function _g() {
  if (Sh) return tn;
  ((Sh = 1),
    Object.defineProperty(tn, "__esModule", { value: !0 }),
    (tn.default = void 0));
  var e = { relatedConcepts: [], type: "structure" },
    t = e;
  return ((tn.default = t), tn);
}
var rn = {},
  kh;
function Pg() {
  if (kh) return rn;
  ((kh = 1),
    Object.defineProperty(rn, "__esModule", { value: !0 }),
    (rn.default = void 0));
  var e = { relatedConcepts: [], type: "window" },
    t = e;
  return ((rn.default = t), rn);
}
var Eh;
function Hn() {
  if (Eh) return ja;
  ((Eh = 1),
    Object.defineProperty(ja, "__esModule", { value: !0 }),
    (ja.default = void 0));
  var e = S($n()),
    t = S(u0()),
    a = S(c0()),
    s = S(d0()),
    o = S(p0()),
    c = S(h0()),
    n = S(f0()),
    b = S(m0()),
    g = S(v0()),
    q = S(b0()),
    f = S(y0()),
    T = S(R0()),
    A = S(g0()),
    k = S(x0()),
    L = S(C0()),
    I = S(_0()),
    y = S(P0()),
    h = S(q0()),
    p = S(T0()),
    m = S(A0()),
    x = S(w0()),
    R = S(S0()),
    _ = S(k0()),
    C = S(E0()),
    M = S(I0()),
    r = S(M0()),
    i = S(L0()),
    l = S(O0()),
    d = S(N0()),
    v = S(D0()),
    P = S(B0()),
    w = S(F0()),
    D = S(j0()),
    N = S(V0()),
    E = S($0()),
    H = S(H0()),
    X = S(U0()),
    K = S(G0()),
    ie = S(W0()),
    se = S(z0()),
    ne = S(K0()),
    V = S(X0()),
    ae = S(Y0()),
    te = S(Q0()),
    Un = S(J0()),
    Gn = S(Z0()),
    Wn = S(eR()),
    zn = S(tR()),
    Kn = S(rR()),
    Xn = S(aR()),
    Yn = S(iR()),
    Qn = S(sR()),
    Jn = S(nR()),
    Zn = S(oR()),
    eo = S(lR()),
    to = S(uR()),
    ro = S(cR()),
    ao = S(dR()),
    io = S(pR()),
    so = S(hR()),
    no = S(fR()),
    oo = S(mR()),
    lo = S(vR()),
    uo = S(bR()),
    co = S(yR()),
    po = S(RR()),
    ho = S(gR()),
    fo = S(xR()),
    mo = S(CR()),
    vo = S(_R()),
    bo = S(PR()),
    yo = S(qR()),
    Ro = S(TR()),
    go = S(AR()),
    xo = S(wR()),
    Co = S(SR()),
    _o = S(kR()),
    Po = S(ER()),
    qo = S(IR()),
    To = S(MR()),
    Ao = S(LR()),
    wo = S(OR()),
    So = S(NR()),
    O = S(DR()),
    ko = S(BR()),
    Fe = S(FR()),
    Vf = S(jR()),
    $f = S(VR()),
    Hf = S($R()),
    Uf = S(HR()),
    Gf = S(UR()),
    Wf = S(GR()),
    zf = S(WR()),
    Kf = S(zR()),
    Xf = S(KR()),
    Yf = S(XR()),
    Qf = S(YR()),
    Jf = S(QR()),
    Zf = S(JR()),
    em = S(ZR()),
    tm = S(eg()),
    rm = S(tg()),
    am = S(rg()),
    im = S(ag()),
    sm = S(ig()),
    nm = S(sg()),
    om = S(ng()),
    lm = S(og()),
    um = S(lg()),
    cm = S(ug()),
    dm = S(cg()),
    pm = S(dg()),
    hm = S(pg()),
    fm = S(hg()),
    mm = S(fg()),
    vm = S(mg()),
    bm = S(vg()),
    ym = S(bg()),
    Rm = S(yg()),
    gm = S(Rg()),
    xm = S(gg()),
    Cm = S(xg()),
    _m = S(Cg()),
    Pm = S(_g()),
    qm = S(Pg());
  function S(W) {
    return W && W.__esModule ? W : { default: W };
  }
  function Eo(W, Z) {
    return Sm(W) || wm(W, Z) || Am(W, Z) || Tm();
  }
  function Tm() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function Am(W, Z) {
    if (W) {
      if (typeof W == "string") return il(W, Z);
      var Q = Object.prototype.toString.call(W).slice(8, -1);
      if (
        (Q === "Object" && W.constructor && (Q = W.constructor.name),
        Q === "Map" || Q === "Set")
      )
        return Array.from(W);
      if (
        Q === "Arguments" ||
        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(Q)
      )
        return il(W, Z);
    }
  }
  function il(W, Z) {
    (Z == null || Z > W.length) && (Z = W.length);
    for (var Q = 0, oe = new Array(Z); Q < Z; Q++) oe[Q] = W[Q];
    return oe;
  }
  function wm(W, Z) {
    var Q =
      W == null
        ? null
        : (typeof Symbol < "u" && W[Symbol.iterator]) || W["@@iterator"];
    if (Q != null) {
      var oe = [],
        Ve = !0,
        Ke = !1,
        yn,
        Rn;
      try {
        for (
          Q = Q.call(W);
          !(Ve = (yn = Q.next()).done) &&
          (oe.push(yn.value), !(Z && oe.length === Z));
          Ve = !0
        );
      } catch (Em) {
        ((Ke = !0), (Rn = Em));
      } finally {
        try {
          !Ve && Q.return != null && Q.return();
        } finally {
          if (Ke) throw Rn;
        }
      }
      return oe;
    }
  }
  function Sm(W) {
    if (Array.isArray(W)) return W;
  }
  var je = [
      ["AbbrRole", t.default],
      ["AlertDialogRole", a.default],
      ["AlertRole", s.default],
      ["AnnotationRole", o.default],
      ["ApplicationRole", c.default],
      ["ArticleRole", n.default],
      ["AudioRole", b.default],
      ["BannerRole", g.default],
      ["BlockquoteRole", q.default],
      ["BusyIndicatorRole", f.default],
      ["ButtonRole", T.default],
      ["CanvasRole", A.default],
      ["CaptionRole", k.default],
      ["CellRole", L.default],
      ["CheckBoxRole", I.default],
      ["ColorWellRole", y.default],
      ["ColumnHeaderRole", h.default],
      ["ColumnRole", p.default],
      ["ComboBoxRole", m.default],
      ["ComplementaryRole", x.default],
      ["ContentInfoRole", R.default],
      ["DateRole", _.default],
      ["DateTimeRole", C.default],
      ["DefinitionRole", M.default],
      ["DescriptionListDetailRole", r.default],
      ["DescriptionListRole", i.default],
      ["DescriptionListTermRole", l.default],
      ["DetailsRole", d.default],
      ["DialogRole", v.default],
      ["DirectoryRole", P.default],
      ["DisclosureTriangleRole", w.default],
      ["DivRole", D.default],
      ["DocumentRole", N.default],
      ["EmbeddedObjectRole", E.default],
      ["FeedRole", H.default],
      ["FigcaptionRole", X.default],
      ["FigureRole", K.default],
      ["FooterRole", ie.default],
      ["FormRole", se.default],
      ["GridRole", ne.default],
      ["GroupRole", V.default],
      ["HeadingRole", ae.default],
      ["IframePresentationalRole", te.default],
      ["IframeRole", Un.default],
      ["IgnoredRole", Gn.default],
      ["ImageMapLinkRole", Wn.default],
      ["ImageMapRole", zn.default],
      ["ImageRole", Kn.default],
      ["InlineTextBoxRole", Xn.default],
      ["InputTimeRole", Yn.default],
      ["LabelRole", Qn.default],
      ["LegendRole", Jn.default],
      ["LineBreakRole", Zn.default],
      ["LinkRole", eo.default],
      ["ListBoxOptionRole", to.default],
      ["ListBoxRole", ro.default],
      ["ListItemRole", ao.default],
      ["ListMarkerRole", io.default],
      ["ListRole", so.default],
      ["LogRole", no.default],
      ["MainRole", oo.default],
      ["MarkRole", lo.default],
      ["MarqueeRole", uo.default],
      ["MathRole", co.default],
      ["MenuBarRole", po.default],
      ["MenuButtonRole", ho.default],
      ["MenuItemRole", fo.default],
      ["MenuItemCheckBoxRole", mo.default],
      ["MenuItemRadioRole", vo.default],
      ["MenuListOptionRole", bo.default],
      ["MenuListPopupRole", yo.default],
      ["MenuRole", Ro.default],
      ["MeterRole", go.default],
      ["NavigationRole", xo.default],
      ["NoneRole", Co.default],
      ["NoteRole", _o.default],
      ["OutlineRole", Po.default],
      ["ParagraphRole", qo.default],
      ["PopUpButtonRole", To.default],
      ["PreRole", Ao.default],
      ["PresentationalRole", wo.default],
      ["ProgressIndicatorRole", So.default],
      ["RadioButtonRole", O.default],
      ["RadioGroupRole", ko.default],
      ["RegionRole", Fe.default],
      ["RootWebAreaRole", Vf.default],
      ["RowHeaderRole", $f.default],
      ["RowRole", Hf.default],
      ["RubyRole", Uf.default],
      ["RulerRole", Gf.default],
      ["ScrollAreaRole", Wf.default],
      ["ScrollBarRole", zf.default],
      ["SeamlessWebAreaRole", Kf.default],
      ["SearchRole", Xf.default],
      ["SearchBoxRole", Yf.default],
      ["SliderRole", Qf.default],
      ["SliderThumbRole", Jf.default],
      ["SpinButtonRole", Zf.default],
      ["SpinButtonPartRole", em.default],
      ["SplitterRole", tm.default],
      ["StaticTextRole", rm.default],
      ["StatusRole", am.default],
      ["SVGRootRole", im.default],
      ["SwitchRole", sm.default],
      ["TabGroupRole", nm.default],
      ["TabRole", om.default],
      ["TableHeaderContainerRole", lm.default],
      ["TableRole", um.default],
      ["TabListRole", cm.default],
      ["TabPanelRole", dm.default],
      ["TermRole", pm.default],
      ["TextAreaRole", hm.default],
      ["TextFieldRole", fm.default],
      ["TimeRole", mm.default],
      ["TimerRole", vm.default],
      ["ToggleButtonRole", bm.default],
      ["ToolbarRole", ym.default],
      ["TreeRole", Rm.default],
      ["TreeGridRole", gm.default],
      ["TreeItemRole", xm.default],
      ["UserInterfaceTooltipRole", Cm.default],
      ["VideoRole", _m.default],
      ["WebAreaRole", Pm.default],
      ["WindowRole", qm.default],
    ],
    Io = {
      entries: function () {
        return je;
      },
      forEach: function (Z) {
        for (
          var Q =
              arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : null,
            oe = 0,
            Ve = je;
          oe < Ve.length;
          oe++
        ) {
          var Ke = Eo(Ve[oe], 2),
            yn = Ke[0],
            Rn = Ke[1];
          Z.call(Q, Rn, yn, je);
        }
      },
      get: function (Z) {
        var Q = je.find(function (oe) {
          return oe[0] === Z;
        });
        return Q && Q[1];
      },
      has: function (Z) {
        return !!Io.get(Z);
      },
      keys: function () {
        return je.map(function (Z) {
          var Q = Eo(Z, 1),
            oe = Q[0];
          return oe;
        });
      },
      values: function () {
        return je.map(function (Z) {
          var Q = Eo(Z, 2),
            oe = Q[1];
          return oe;
        });
      },
    },
    km = (0, e.default)(Io, Io.entries());
  return ((ja.default = km), ja);
}
var Ih;
function qg() {
  if (Ih) return Ba;
  ((Ih = 1),
    Object.defineProperty(Ba, "__esModule", { value: !0 }),
    (Ba.default = void 0));
  var e = a($n()),
    t = a(Hn());
  function a(y) {
    return y && y.__esModule ? y : { default: y };
  }
  function s(y, h) {
    return n(y) || c(y, h) || g(y, h) || o();
  }
  function o() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function c(y, h) {
    var p =
      y == null
        ? null
        : (typeof Symbol < "u" && y[Symbol.iterator]) || y["@@iterator"];
    if (p != null) {
      var m = [],
        x = !0,
        R = !1,
        _,
        C;
      try {
        for (
          p = p.call(y);
          !(x = (_ = p.next()).done) &&
          (m.push(_.value), !(h && m.length === h));
          x = !0
        );
      } catch (M) {
        ((R = !0), (C = M));
      } finally {
        try {
          !x && p.return != null && p.return();
        } finally {
          if (R) throw C;
        }
      }
      return m;
    }
  }
  function n(y) {
    if (Array.isArray(y)) return y;
  }
  function b(y, h) {
    var p = (typeof Symbol < "u" && y[Symbol.iterator]) || y["@@iterator"];
    if (!p) {
      if (Array.isArray(y) || (p = g(y)) || h) {
        p && (y = p);
        var m = 0,
          x = function () {};
        return {
          s: x,
          n: function () {
            return m >= y.length ? { done: !0 } : { done: !1, value: y[m++] };
          },
          e: function (r) {
            throw r;
          },
          f: x,
        };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var R = !0,
      _ = !1,
      C;
    return {
      s: function () {
        p = p.call(y);
      },
      n: function () {
        var r = p.next();
        return ((R = r.done), r);
      },
      e: function (r) {
        ((_ = !0), (C = r));
      },
      f: function () {
        try {
          !R && p.return != null && p.return();
        } finally {
          if (_) throw C;
        }
      },
    };
  }
  function g(y, h) {
    if (y) {
      if (typeof y == "string") return q(y, h);
      var p = Object.prototype.toString.call(y).slice(8, -1);
      if (
        (p === "Object" && y.constructor && (p = y.constructor.name),
        p === "Map" || p === "Set")
      )
        return Array.from(y);
      if (
        p === "Arguments" ||
        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(p)
      )
        return q(y, h);
    }
  }
  function q(y, h) {
    (h == null || h > y.length) && (h = y.length);
    for (var p = 0, m = new Array(h); p < h; p++) m[p] = y[p];
    return m;
  }
  var f = [],
    T = b(t.default.entries()),
    A;
  try {
    var k = function () {
      var h = s(A.value, 2),
        p = h[0],
        m = h[1],
        x = m.relatedConcepts;
      Array.isArray(x) &&
        x.forEach(function (R) {
          if (R.module === "HTML") {
            var _ = R.concept;
            if (_) {
              var C = f.findIndex(function (M) {
                var r = s(M, 1),
                  i = r[0];
                return i === p;
              });
              (C === -1 && (f.push([p, []]), (C = f.length - 1)),
                f[C][1].push(_));
            }
          }
        });
    };
    for (T.s(); !(A = T.n()).done; ) k();
  } catch (y) {
    T.e(y);
  } finally {
    T.f();
  }
  var L = {
      entries: function () {
        return f;
      },
      forEach: function (h) {
        for (
          var p =
              arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : null,
            m = 0,
            x = f;
          m < x.length;
          m++
        ) {
          var R = s(x[m], 2),
            _ = R[0],
            C = R[1];
          h.call(p, C, _, f);
        }
      },
      get: function (h) {
        var p = f.find(function (m) {
          return m[0] === h;
        });
        return p && p[1];
      },
      has: function (h) {
        return !!L.get(h);
      },
      keys: function () {
        return f.map(function (h) {
          var p = s(h, 1),
            m = p[0];
          return m;
        });
      },
      values: function () {
        return f.map(function (h) {
          var p = s(h, 2),
            m = p[1];
          return m;
        });
      },
    },
    I = (0, e.default)(L, L.entries());
  return ((Ba.default = I), Ba);
}
var an = {},
  Mh;
function Tg() {
  if (Mh) return an;
  ((Mh = 1),
    Object.defineProperty(an, "__esModule", { value: !0 }),
    (an.default = void 0));
  var e = a($n()),
    t = a(Hn());
  function a(y) {
    return y && y.__esModule ? y : { default: y };
  }
  function s(y, h) {
    return n(y) || c(y, h) || g(y, h) || o();
  }
  function o() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function c(y, h) {
    var p =
      y == null
        ? null
        : (typeof Symbol < "u" && y[Symbol.iterator]) || y["@@iterator"];
    if (p != null) {
      var m = [],
        x = !0,
        R = !1,
        _,
        C;
      try {
        for (
          p = p.call(y);
          !(x = (_ = p.next()).done) &&
          (m.push(_.value), !(h && m.length === h));
          x = !0
        );
      } catch (M) {
        ((R = !0), (C = M));
      } finally {
        try {
          !x && p.return != null && p.return();
        } finally {
          if (R) throw C;
        }
      }
      return m;
    }
  }
  function n(y) {
    if (Array.isArray(y)) return y;
  }
  function b(y, h) {
    var p = (typeof Symbol < "u" && y[Symbol.iterator]) || y["@@iterator"];
    if (!p) {
      if (Array.isArray(y) || (p = g(y)) || h) {
        p && (y = p);
        var m = 0,
          x = function () {};
        return {
          s: x,
          n: function () {
            return m >= y.length ? { done: !0 } : { done: !1, value: y[m++] };
          },
          e: function (r) {
            throw r;
          },
          f: x,
        };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var R = !0,
      _ = !1,
      C;
    return {
      s: function () {
        p = p.call(y);
      },
      n: function () {
        var r = p.next();
        return ((R = r.done), r);
      },
      e: function (r) {
        ((_ = !0), (C = r));
      },
      f: function () {
        try {
          !R && p.return != null && p.return();
        } finally {
          if (_) throw C;
        }
      },
    };
  }
  function g(y, h) {
    if (y) {
      if (typeof y == "string") return q(y, h);
      var p = Object.prototype.toString.call(y).slice(8, -1);
      if (
        (p === "Object" && y.constructor && (p = y.constructor.name),
        p === "Map" || p === "Set")
      )
        return Array.from(y);
      if (
        p === "Arguments" ||
        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(p)
      )
        return q(y, h);
    }
  }
  function q(y, h) {
    (h == null || h > y.length) && (h = y.length);
    for (var p = 0, m = new Array(h); p < h; p++) m[p] = y[p];
    return m;
  }
  var f = [],
    T = b(t.default.entries()),
    A;
  try {
    var k = function () {
      var h = s(A.value, 2),
        p = h[0],
        m = h[1],
        x = m.relatedConcepts;
      Array.isArray(x) &&
        x.forEach(function (R) {
          if (R.module === "ARIA") {
            var _ = R.concept;
            if (_) {
              var C = f.findIndex(function (M) {
                var r = s(M, 1),
                  i = r[0];
                return i === p;
              });
              (C === -1 && (f.push([p, []]), (C = f.length - 1)),
                f[C][1].push(_));
            }
          }
        });
    };
    for (T.s(); !(A = T.n()).done; ) k();
  } catch (y) {
    T.e(y);
  } finally {
    T.f();
  }
  var L = {
      entries: function () {
        return f;
      },
      forEach: function (h) {
        for (
          var p =
              arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : null,
            m = 0,
            x = f;
          m < x.length;
          m++
        ) {
          var R = s(x[m], 2),
            _ = R[0],
            C = R[1];
          h.call(p, C, _, f);
        }
      },
      get: function (h) {
        var p = f.find(function (m) {
          return m[0] === h;
        });
        return p && p[1];
      },
      has: function (h) {
        return !!L.get(h);
      },
      keys: function () {
        return f.map(function (h) {
          var p = s(h, 1),
            m = p[0];
          return m;
        });
      },
      values: function () {
        return f.map(function (h) {
          var p = s(h, 2),
            m = p[1];
          return m;
        });
      },
    },
    I = (0, e.default)(L, L.entries());
  return ((an.default = I), an);
}
var sn = {},
  Lh;
function Ag() {
  if (Lh) return sn;
  ((Lh = 1),
    Object.defineProperty(sn, "__esModule", { value: !0 }),
    (sn.default = void 0));
  var e = a(Hn()),
    t = a($n());
  function a(h) {
    return h && h.__esModule ? h : { default: h };
  }
  function s(h, p) {
    return n(h) || c(h, p) || g(h, p) || o();
  }
  function o() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function c(h, p) {
    var m =
      h == null
        ? null
        : (typeof Symbol < "u" && h[Symbol.iterator]) || h["@@iterator"];
    if (m != null) {
      var x = [],
        R = !0,
        _ = !1,
        C,
        M;
      try {
        for (
          m = m.call(h);
          !(R = (C = m.next()).done) &&
          (x.push(C.value), !(p && x.length === p));
          R = !0
        );
      } catch (r) {
        ((_ = !0), (M = r));
      } finally {
        try {
          !R && m.return != null && m.return();
        } finally {
          if (_) throw M;
        }
      }
      return x;
    }
  }
  function n(h) {
    if (Array.isArray(h)) return h;
  }
  function b(h, p) {
    var m = (typeof Symbol < "u" && h[Symbol.iterator]) || h["@@iterator"];
    if (!m) {
      if (Array.isArray(h) || (m = g(h)) || p) {
        m && (h = m);
        var x = 0,
          R = function () {};
        return {
          s: R,
          n: function () {
            return x >= h.length ? { done: !0 } : { done: !1, value: h[x++] };
          },
          e: function (i) {
            throw i;
          },
          f: R,
        };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var _ = !0,
      C = !1,
      M;
    return {
      s: function () {
        m = m.call(h);
      },
      n: function () {
        var i = m.next();
        return ((_ = i.done), i);
      },
      e: function (i) {
        ((C = !0), (M = i));
      },
      f: function () {
        try {
          !_ && m.return != null && m.return();
        } finally {
          if (C) throw M;
        }
      },
    };
  }
  function g(h, p) {
    if (h) {
      if (typeof h == "string") return q(h, p);
      var m = Object.prototype.toString.call(h).slice(8, -1);
      if (
        (m === "Object" && h.constructor && (m = h.constructor.name),
        m === "Map" || m === "Set")
      )
        return Array.from(h);
      if (
        m === "Arguments" ||
        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(m)
      )
        return q(h, p);
    }
  }
  function q(h, p) {
    (p == null || p > h.length) && (p = h.length);
    for (var m = 0, x = new Array(p); m < p; m++) x[m] = h[m];
    return x;
  }
  var f = [],
    T = b(e.default.entries()),
    A;
  try {
    var k = function () {
      var p = s(A.value, 2),
        m = p[0],
        x = p[1],
        R = x.relatedConcepts;
      Array.isArray(R) &&
        R.forEach(function (_) {
          if (_.module === "HTML") {
            var C = _.concept;
            if (C != null) {
              for (var M = JSON.stringify(C), r, i = 0; i < f.length; i++) {
                var l = f[i][0];
                if (JSON.stringify(l) === M) {
                  r = f[i][1];
                  break;
                }
              }
              Array.isArray(r) || (r = []);
              var d = r.findIndex(function (v) {
                return v === m;
              });
              (d === -1 && r.push(m),
                i < f.length ? f.splice(i, 1, [C, r]) : f.push([C, r]));
            }
          }
        });
    };
    for (T.s(); !(A = T.n()).done; ) k();
  } catch (h) {
    T.e(h);
  } finally {
    T.f();
  }
  function L(h, p) {
    if ((h === void 0 && p !== void 0) || (h !== void 0 && p === void 0))
      return !1;
    if (h !== void 0 && p !== void 0) {
      if (h.length != p.length) return !1;
      for (var m = 0; m < h.length; m++)
        if (p[m].name !== h[m].name || p[m].value !== h[m].value) return !1;
    }
    return !0;
  }
  var I = {
      entries: function () {
        return f;
      },
      forEach: function (p) {
        for (
          var m =
              arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : null,
            x = 0,
            R = f;
          x < R.length;
          x++
        ) {
          var _ = s(R[x], 2),
            C = _[0],
            M = _[1];
          p.call(m, M, C, f);
        }
      },
      get: function (p) {
        var m = f.find(function (x) {
          return p.name === x[0].name && L(p.attributes, x[0].attributes);
        });
        return m && m[1];
      },
      has: function (p) {
        return !!I.get(p);
      },
      keys: function () {
        return f.map(function (p) {
          var m = s(p, 1),
            x = m[0];
          return x;
        });
      },
      values: function () {
        return f.map(function (p) {
          var m = s(p, 2),
            x = m[1];
          return x;
        });
      },
    },
    y = (0, t.default)(I, I.entries());
  return ((sn.default = y), sn);
}
var Oh;
function wg() {
  if (Oh) return ge;
  ((Oh = 1),
    Object.defineProperty(ge, "__esModule", { value: !0 }),
    (ge.elementAXObjects =
      ge.AXObjects =
      ge.AXObjectRoles =
      ge.AXObjectElements =
        void 0));
  var e = o(qg()),
    t = o(Tg()),
    a = o(Hn()),
    s = o(Ag());
  function o(q) {
    return q && q.__esModule ? q : { default: q };
  }
  var c = e.default;
  ge.AXObjectElements = c;
  var n = t.default;
  ge.AXObjectRoles = n;
  var b = a.default;
  ge.AXObjects = b;
  var g = s.default;
  return ((ge.elementAXObjects = g), ge);
}
var cn = wg();
const Of = Vn.roles.keys(),
  Sg = Of.filter((e) => {
    var t;
    return (t = Vn.roles.get(e)) == null ? void 0 : t.abstract;
  }),
  Nf = Of.filter((e) => !Sg.includes(e)),
  Df = Nf.filter((e) => {
    const t = Vn.roles.get(e);
    return (
      !["toolbar", "tabpanel", "generic", "cell"].includes(e) &&
      !(
        t != null &&
        t.superClass.some((a) => a.includes("widget") || a.includes("window"))
      )
    );
  }).concat("progressbar"),
  kg = Nf.filter((e) => !Df.includes(e) && e !== "generic");
for (const [e, t] of Vn.elementRoles.entries())
  ([...t].every((a) => a !== "generic" && Df.includes(a)),
    [...t].every((a) => kg.includes(a)));
const Eg = [...cn.AXObjects.keys()].filter(
    (e) => cn.AXObjects.get(e).type === "widget",
  ),
  Ig = [...cn.AXObjects.keys()].filter((e) =>
    ["windows", "structure"].includes(cn.AXObjects.get(e).type),
  );
for (const [e, t] of cn.elementAXObjects.entries())
  ([...t].every((a) => Eg.includes(a)), [...t].every((a) => Ig.includes(a)));
var Nh = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  Mg = new Uint8Array(64),
  Lg = new Uint8Array(128);
for (let e = 0; e < Nh.length; e++) {
  const t = Nh.charCodeAt(e);
  ((Mg[e] = t), (Lg[t] = e));
}
var kn = { exports: {} },
  Og = kn.exports,
  Dh;
function Ng() {
  return (
    Dh ||
      ((Dh = 1),
      (function (e, t) {
        (function (a, s) {
          e.exports = s();
        })(Og, function () {
          const a = /^[\w+.-]+:\/\//,
            s =
              /^([\w+.-]+:)\/\/([^@/#?]*@)?([^:/#?]*)(:\d+)?(\/[^#?]*)?(\?[^#]*)?(#.*)?/,
            o =
              /^file:(?:\/\/((?![a-z]:)[^/#?]*)?)?(\/?[^#?]*)(\?[^#]*)?(#.*)?/i;
          function c(p) {
            return a.test(p);
          }
          function n(p) {
            return p.startsWith("//");
          }
          function b(p) {
            return p.startsWith("/");
          }
          function g(p) {
            return p.startsWith("file:");
          }
          function q(p) {
            return /^[.?#]/.test(p);
          }
          function f(p) {
            const m = s.exec(p);
            return A(
              m[1],
              m[2] || "",
              m[3],
              m[4] || "",
              m[5] || "/",
              m[6] || "",
              m[7] || "",
            );
          }
          function T(p) {
            const m = o.exec(p),
              x = m[2];
            return A(
              "file:",
              "",
              m[1] || "",
              "",
              b(x) ? x : "/" + x,
              m[3] || "",
              m[4] || "",
            );
          }
          function A(p, m, x, R, _, C, M) {
            return {
              scheme: p,
              user: m,
              host: x,
              port: R,
              path: _,
              query: C,
              hash: M,
              type: 7,
            };
          }
          function k(p) {
            if (n(p)) {
              const x = f("http:" + p);
              return ((x.scheme = ""), (x.type = 6), x);
            }
            if (b(p)) {
              const x = f("http://foo.com" + p);
              return ((x.scheme = ""), (x.host = ""), (x.type = 5), x);
            }
            if (g(p)) return T(p);
            if (c(p)) return f(p);
            const m = f("http://foo.com/" + p);
            return (
              (m.scheme = ""),
              (m.host = ""),
              (m.type = p
                ? p.startsWith("?")
                  ? 3
                  : p.startsWith("#")
                    ? 2
                    : 4
                : 1),
              m
            );
          }
          function L(p) {
            if (p.endsWith("/..")) return p;
            const m = p.lastIndexOf("/");
            return p.slice(0, m + 1);
          }
          function I(p, m) {
            (y(m, m.type),
              p.path === "/"
                ? (p.path = m.path)
                : (p.path = L(m.path) + p.path));
          }
          function y(p, m) {
            const x = m <= 4,
              R = p.path.split("/");
            let _ = 1,
              C = 0,
              M = !1;
            for (let i = 1; i < R.length; i++) {
              const l = R[i];
              if (!l) {
                M = !0;
                continue;
              }
              if (((M = !1), l !== ".")) {
                if (l === "..") {
                  C ? ((M = !0), C--, _--) : x && (R[_++] = l);
                  continue;
                }
                ((R[_++] = l), C++);
              }
            }
            let r = "";
            for (let i = 1; i < _; i++) r += "/" + R[i];
            ((!r || (M && !r.endsWith("/.."))) && (r += "/"), (p.path = r));
          }
          function h(p, m) {
            if (!p && !m) return "";
            const x = k(p);
            let R = x.type;
            if (m && R !== 7) {
              const C = k(m),
                M = C.type;
              switch (R) {
                case 1:
                  x.hash = C.hash;
                case 2:
                  x.query = C.query;
                case 3:
                case 4:
                  I(x, C);
                case 5:
                  ((x.user = C.user), (x.host = C.host), (x.port = C.port));
                case 6:
                  x.scheme = C.scheme;
              }
              M > R && (R = M);
            }
            y(x, R);
            const _ = x.query + x.hash;
            switch (R) {
              case 2:
              case 3:
                return _;
              case 4: {
                const C = x.path.slice(1);
                return C
                  ? q(m || p) && !q(C)
                    ? "./" + C + _
                    : C + _
                  : _ || ".";
              }
              case 5:
                return x.path + _;
              default:
                return x.scheme + "//" + x.user + x.host + x.port + x.path + _;
            }
          }
          return h;
        });
      })(kn)),
    kn.exports
  );
}
Ng();
const Dg =
    "accent-height accumulate additive alignment-baseline allowReorder alphabetic amplitude arabic-form ascent attributeName attributeType autoReverse azimuth baseFrequency baseline-shift baseProfile bbox begin bias by calcMode cap-height class clip clipPathUnits clip-path clip-rule color color-interpolation color-interpolation-filters color-profile color-rendering contentScriptType contentStyleType cursor cx cy d decelerate descent diffuseConstant direction display divisor dominant-baseline dur dx dy edgeMode elevation enable-background end exponent externalResourcesRequired fill fill-opacity fill-rule filter filterRes filterUnits flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight format from fr fx fy g1 g2 glyph-name glyph-orientation-horizontal glyph-orientation-vertical glyphRef gradientTransform gradientUnits hanging height href horiz-adv-x horiz-origin-x id ideographic image-rendering in in2 intercept k k1 k2 k3 k4 kernelMatrix kernelUnitLength kerning keyPoints keySplines keyTimes lang lengthAdjust letter-spacing lighting-color limitingConeAngle local marker-end marker-mid marker-start markerHeight markerUnits markerWidth mask maskContentUnits maskUnits mathematical max media method min mode name numOctaves offset onabort onactivate onbegin onclick onend onerror onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup onrepeat onresize onscroll onunload opacity operator order orient orientation origin overflow overline-position overline-thickness panose-1 paint-order pathLength patternContentUnits patternTransform patternUnits pointer-events points pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits r radius refX refY rendering-intent repeatCount repeatDur requiredExtensions requiredFeatures restart result rotate rx ry scale seed shape-rendering slope spacing specularConstant specularExponent speed spreadMethod startOffset stdDeviation stemh stemv stitchTiles stop-color stop-opacity strikethrough-position strikethrough-thickness string stroke stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width style surfaceScale systemLanguage tabindex tableValues target targetX targetY text-anchor text-decoration text-rendering textLength to transform type u1 u2 underline-position underline-thickness unicode unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical values version vert-adv-y vert-origin-x vert-origin-y viewBox viewTarget visibility width widths word-spacing writing-mode x x-height x1 x2 xChannelSelector xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y y1 y2 yChannelSelector z zoomAndPan".split(
      " ",
    ),
  Bg = new Map();
Dg.forEach((e) => {
  Bg.set(e.toLowerCase(), e);
});
var $h;
const Fg = {
    filename: ln("(unknown)"),
    rootDir: ln(
      typeof process < "u"
        ? ($h = process.cwd) == null
          ? void 0
          : $h.call(process)
        : typeof Deno < "u"
          ? Deno.cwd()
          : void 0,
    ),
    dev: xe(!1),
    generate: Ne("client", (e, t) =>
      e === "dom" || e === "ssr"
        ? (rl(lv), e === "dom" ? "client" : "server")
        : (e !== "client" &&
            e !== "server" &&
            e !== !1 &&
            Pe(`${t} must be "client", "server" or false`),
          e),
    ),
    warningFilter: Bf(() => !0),
    experimental: al({ async: xe(!1) }),
  },
  jg = {
    accessors: Fh(av, xe(!1)),
    css: Ne(
      "external",
      (e) => (
        (e === !0 || e === !1) &&
          Pe(
            'The boolean options have been removed from the css option. Use "external" instead of false and "injected" instead of true',
          ),
        e === "none" &&
          Pe(
            'css: "none" is no longer a valid option. If this was crucial for you, please open an issue on GitHub with your use case.',
          ),
        e !== "external" &&
          e !== "injected" &&
          Pe(
            'css should be either "external" (default, recommended) or "injected"',
          ),
        e
      ),
    ),
    cssHash: Bf(
      ({ css: e, filename: t, hash: a }) =>
        `svelte-${a(t === "(unknown)" ? e : (t ?? e))}`,
    ),
    cssOutputFilename: ln(void 0),
    customElement: xe(!1),
    discloseVersion: xe(!0),
    immutable: Fh(iv, xe(!1)),
    legacy: $e(
      "The legacy option has been removed. If you are using this because of legacy.componentApi, use compatibility.componentApi instead",
    ),
    compatibility: al({ componentApi: Ho([4, 5], 5) }),
    loopGuardTimeout: $o(ov),
    name: ln(void 0),
    namespace: Ho(["html", "mathml", "svg"]),
    modernAst: xe(!1),
    outputFilename: ln(void 0),
    preserveComments: xe(!1),
    fragments: Ho(["html", "tree"]),
    preserveWhitespace: xe(!1),
    runes: xe(void 0),
    hmr: xe(!1),
    sourcemap: Ne(void 0, (e) => e),
    enableSourcemap: $o(sv),
    hydratable: $o(nv),
    format: $e(
      'The format option has been removed in Svelte 4, the compiler only outputs ESM now. Remove "format" from your compiler options. If you did not set this yourself, bump the version of your bundler plugin (vite-plugin-svelte/rollup-plugin-svelte/svelte-loader)',
    ),
    tag: $e(
      'The tag option has been removed in Svelte 5. Use `<svelte:options customElement="tag-name" />` inside the component instead. If that does not solve your use case, please open an issue on GitHub with details.',
    ),
    sveltePath: $e(
      "The sveltePath option has been removed in Svelte 5. If this option was crucial for you, please open an issue on GitHub with your use case.",
    ),
    errorMode: $e(
      "The errorMode option has been removed. If you are using this through svelte-preprocess with TypeScript, use the https://www.typescriptlang.org/tsconfig#verbatimModuleSyntax setting instead",
    ),
    varsReport: $e(
      "The vars option has been removed. If you are using this through svelte-preprocess with TypeScript, use the https://www.typescriptlang.org/tsconfig#verbatimModuleSyntax setting instead",
    ),
  };
al({ ...Fg, ...Object.fromEntries(Object.keys(jg).map((e) => [e, () => {}])) });
function $e(e) {
  return (t) => {
    t !== void 0 && v1(null, e);
  };
}
const Bh = new Set();
function rl(e) {
  Bh.has(e) || (Bh.add(e), e(null));
}
function $o(e) {
  return (t) => {
    t !== void 0 && rl(e);
  };
}
function Fh(e, t) {
  return (a, s) => (a !== void 0 && rl(e), t(a, s));
}
function al(e, t = !1) {
  return (a, s) => {
    const o = {};
    ((a && typeof a != "object") || Array.isArray(a)) &&
      Pe(`${s} should be an object`);
    for (const c in a)
      c in e || (t ? (o[c] = a[c]) : b1(null, `${s ? `${s}.${c}` : c}`));
    for (const c in e) {
      const n = e[c];
      o[c] = n(a && a[c], s ? `${s}.${c}` : c);
    }
    return o;
  };
}
function Ne(e, t) {
  return (a, s) => (a === void 0 ? e : t(a, s));
}
function ln(e, t = !0) {
  return Ne(
    e,
    (a, s) => (
      typeof a != "string" && Pe(`${s} should be a string, if specified`),
      !t && a === "" && Pe(`${s} cannot be empty`),
      a
    ),
  );
}
function xe(e) {
  return Ne(
    e,
    (t, a) => (
      typeof t != "boolean" && Pe(`${a} should be true or false, if specified`),
      t
    ),
  );
}
function Ho(e, t = e[0]) {
  return Ne(t, (a, s) => {
    if (!e.includes(a)) {
      const o =
        e.length > 2
          ? `${s} should be one of ${e
              .slice(0, -1)
              .map((c) => `"${c}"`)
              .join(", ")} or "${e[e.length - 1]}"`
          : `${s} should be either "${e[0]}" or "${e[1]}"`;
      Pe(o);
    }
    return a;
  });
}
function Bf(e) {
  return Ne(
    e,
    (t, a) => (
      typeof t != "function" && Pe(`${a} should be a function, if specified`),
      t
    ),
  );
}
function Pe(e) {
  m1(null, e);
}
function Ff(e, t) {
  Gh(t, !1);
  let a = _e(t, "decorator", 8, void 0),
    s = _e(t, "Component", 8),
    o = _e(t, "props", 24, () => ({})),
    c = _e(t, "on", 8, void 0),
    n = _e(t, "argTypes", 8, void 0),
    b = Le(),
    g = Le();
  const q = Hh[0];
  let f = Le();
  if (n() && q < 5) {
    const I = Object.fromEntries(
      Object.entries(n())
        .filter(([y, h]) => h.action && o()[y] != null)
        .map(([y, h]) => [h.action, o()[y]]),
    );
    Gm(() => {
      Object.entries({ ...I, ...c() }).forEach(([y, h]) => {
        var m;
        const p = re(b) ?? re(g);
        (m = p == null ? void 0 : p.$on) == null || m.call(p, y, h);
      });
    });
  }
  (Wh(
    () => Xh(o()),
    () => {
      Ee(
        f,
        Object.fromEntries(
          Object.entries(o()).filter(([I]) => !I.startsWith("event_")),
        ),
      );
    },
  ),
    zh(),
    Uh());
  var T = Cn(),
    A = Pn(T);
  {
    var k = (I) => {
        var y = Cn(),
          h = Pn(y);
        (Lo(
          h,
          () => a().Component,
          (p, m) => {
            Oo(
              m(
                p,
                Mo(() => a().props, {
                  children: (x, R) => {
                    var _ = Cn(),
                      C = Pn(_);
                    (Lo(C, s, (M, r) => {
                      Oo(
                        r(
                          M,
                          Mo(() => re(f), { $$legacy: !0 }),
                        ),
                        (i) => Ee(b, i),
                        () => re(b),
                      );
                    }),
                      _n(x, _));
                  },
                  $$slots: { default: !0 },
                  $$legacy: !0,
                }),
              ),
              (x) => Ee(g, x),
              () => re(g),
            );
          },
        ),
          _n(I, y));
      },
      L = (I) => {
        var y = Cn(),
          h = Pn(y);
        (Lo(h, s, (p, m) => {
          Oo(
            m(
              p,
              Mo(() => re(f), { $$legacy: !0 }),
            ),
            (x) => Ee(b, x),
            () => re(b),
          );
        }),
          _n(I, y));
      };
    zm(A, (I) => {
      a() ? I(k) : I(L, !1);
    });
  }
  (_n(e, T), Kh());
}
function jf(e, t) {
  Gh(t, !1);
  let a = _e(t, "name", 8),
    s = _e(t, "title", 8),
    o = _e(t, "storyFn", 8),
    c = _e(t, "showError", 8);
  _e(t, "storyContext", 8);
  let n = o()(),
    b = Le(n.Component),
    g = Le(ul(n.props, () => ({}), !0)),
    q = Le(n.on),
    f = Le(n.argTypes),
    T = !0;
  function A(k) {
    return T
      ? ((T = !1),
        { Component: re(b), props: re(g), on: re(q), argTypes: re(f) })
      : k();
  }
  (re(b) ||
    c()({
      title: `Expecting a Svelte component from the story: "${a()}" of "${s()}".`,
      description: Wm`
        Did you forget to return the Svelte component configuration from the story?
        Use "() => ({ Component: YourComponent, props: {} })"
        when defining the story.
      `,
    }),
    Wh(
      () => (re(b), re(g), re(q), re(f), Xh(o())),
      () => {
        ((k) => {
          (Ee(b, k.Component),
            Ee(
              g,
              ul(k.props, () => ({}), !0),
            ),
            Ee(q, k.on),
            Ee(f, k.argTypes));
        })(A(o()));
      },
    ),
    zh(),
    Uh(),
    Ff(e, {
      get Component() {
        return re(b);
      },
      get props() {
        return re(g);
      },
      get on() {
        return re(q);
      },
      get argTypes() {
        return re(f);
      },
    }),
    Kh());
}
const Vg = (e) => Hm(e),
  { RESET_STORY_ARGS: $g } = __STORYBOOK_MODULE_CORE_EVENTS__,
  { addons: Hg, sanitizeStoryContextUpdate: Ug } =
    __STORYBOOK_MODULE_PREVIEW_API__;
var Gg = {};
Xm(Gg, {
  applyDecorators: () => Qg,
  mount: () => Jg,
  parameters: () => Zg,
  render: () => Yg,
  renderToCanvas: () => zg,
});
var Wg = Number(Hh[0]) <= 4;
function zg(e, t) {
  return Wg ? Kg(e, t) : Xg(e, t);
}
var dn = new Set();
Hg.getChannel().on($g, ({ storyId: e }) => {
  dn.add(e);
});
var nn = new Map();
function Kg(
  {
    storyFn: e,
    title: t,
    name: a,
    showMain: s,
    showError: o,
    storyContext: c,
    forceRemount: n,
  },
  b,
) {
  function g(T) {
    nn.has(T) && (nn.get(T).$destroy(), nn.delete(T), (T.innerHTML = ""));
  }
  let q = nn.get(b),
    f = n;
  if ((dn.has(c.id) && ((f = !0), dn.delete(c.id)), f && g(b), !q || f)) {
    let T = new jf({
      target: b,
      props: { storyFn: e, storyContext: c, name: a, title: t, showError: o },
    });
    nn.set(b, T);
  } else
    q.$set({ storyFn: e, storyContext: c, name: a, title: t, showError: o });
  return (
    s(),
    () => {
      g(b);
    }
  );
}
var wn = new Map();
function Xg(
  {
    storyFn: e,
    title: t,
    name: a,
    showMain: s,
    showError: o,
    storyContext: c,
    forceRemount: n,
  },
  b,
) {
  function g(T) {
    let { mountedComponent: A } = wn.get(T) ?? {};
    A && (Om(A), wn.delete(T));
  }
  let q = wn.get(b),
    f = n;
  if ((dn.has(c.id) && ((f = !0), dn.delete(c.id)), f && g(b), !q || f)) {
    let T = Vg({
        storyFn: e,
        storyContext: c,
        name: a,
        title: t,
        showError: o,
      }),
      A = Lm(jf, { target: b, props: T });
    wn.set(b, { mountedComponent: A, props: T });
  } else
    Object.assign(q.props, {
      storyFn: e,
      storyContext: c,
      name: a,
      title: t,
      showError: o,
    });
  return (
    s(),
    () => {
      g(b);
    }
  );
}
var Yg = (e, t) => {
  let { id: a, component: s } = t;
  if (!s)
    throw new Error(
      `Unable to render story ${a} as the component annotation is missing from the default export`,
    );
  return { Component: s, props: e };
};
function jh(e) {
  return e && typeof e == "object" && "default" in e ? e.default : e;
}
function Vh(e, t, a) {
  let s = jh(t),
    o = a && jh(a),
    c;
  return (
    !s || Object.keys(s).length === 0
      ? (c = { Component: e.component })
      : s.Component
        ? (c = s)
        : (c = { Component: s }),
    o
      ? { Component: Ff, props: { ...o, decorator: c } }
      : { ...c, argTypes: e.argTypes }
  );
}
function Qg(e, t) {
  return t.reduce(
    (a, s) => (o) => {
      let c,
        n = s((b) => ((c = a({ ...o, ...Ug(b) })), c), o);
      return (c || (c = a(o)), n === c ? c : Vh(o, n, c));
    },
    (a) => Vh(a, e(a)),
  );
}
var Jg = (e) => async (t, a) => (
    t &&
      (e.originalStoryFn = () => ({
        Component: t,
        props: a && "props" in a ? (a == null ? void 0 : a.props) : a,
      })),
    await e.renderToCanvas(),
    e.canvas
  ),
  Zg = { renderer: "svelte" };
export {
  Qg as applyDecorators,
  Jg as mount,
  Zg as parameters,
  Yg as render,
  zg as renderToCanvas,
};
