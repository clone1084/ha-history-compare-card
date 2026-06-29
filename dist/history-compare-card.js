var Do = Object.defineProperty;
var Eo = (i, t, e) => t in i ? Do(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var A = (i, t, e) => Eo(i, typeof t != "symbol" ? t + "" : t, e);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const je = globalThis, Fi = je.ShadowRoot && (je.ShadyCSS === void 0 || je.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, zi = Symbol(), is = /* @__PURE__ */ new WeakMap();
let Dn = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== zi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Fi && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = is.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && is.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const $o = (i) => new Dn(typeof i == "string" ? i : i + "", void 0, zi), En = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, n, o) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + i[o + 1], i[0]);
  return new Dn(e, i, zi);
}, Lo = (i, t) => {
  if (Fi) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), n = je.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = e.cssText, i.appendChild(s);
  }
}, ss = Fi ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return $o(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Io, defineProperty: Ro, getOwnPropertyDescriptor: Fo, getOwnPropertyNames: zo, getOwnPropertySymbols: Ho, getPrototypeOf: Bo } = Object, gt = globalThis, ns = gt.trustedTypes, No = ns ? ns.emptyScript : "", Wo = gt.reactiveElementPolyfillSupport, re = (i, t) => i, qe = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? No : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, Hi = (i, t) => !Io(i, t), os = { attribute: !0, type: String, converter: qe, reflect: !1, useDefault: !1, hasChanged: Hi };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), gt.litPropertyMetadata ?? (gt.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let zt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = os) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(t, s, e);
      n !== void 0 && Ro(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: n, set: o } = Fo(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: n, set(r) {
      const a = n?.call(this);
      o?.call(this, r), this.requestUpdate(t, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? os;
  }
  static _$Ei() {
    if (this.hasOwnProperty(re("elementProperties"))) return;
    const t = Bo(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(re("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(re("properties"))) {
      const e = this.properties, s = [...zo(e), ...Ho(e)];
      for (const n of s) this.createProperty(n, e[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, n] of e) this.elementProperties.set(s, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const n = this._$Eu(e, s);
      n !== void 0 && this._$Eh.set(n, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const n of s) e.unshift(ss(n));
    } else t !== void 0 && e.push(ss(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Lo(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    const s = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, s);
    if (n !== void 0 && s.reflect === !0) {
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : qe).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = s.getPropertyOptions(n), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : qe;
      this._$Em = n;
      const a = r.fromAttribute(e, o.type);
      this[n] = a ?? this._$Ej?.get(n) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, n = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (n === !1 && (o = this[t]), s ?? (s = r.getPropertyOptions(t)), !((s.hasChanged ?? Hi)(o, e) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: n, wrapped: o }, r) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), n === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [n, o] of s) {
        const { wrapped: r } = o, a = this[n];
        r !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, o, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
zt.elementStyles = [], zt.shadowRootOptions = { mode: "open" }, zt[re("elementProperties")] = /* @__PURE__ */ new Map(), zt[re("finalized")] = /* @__PURE__ */ new Map(), Wo?.({ ReactiveElement: zt }), (gt.reactiveElementVersions ?? (gt.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ae = globalThis, rs = (i) => i, Ke = ae.trustedTypes, as = Ke ? Ke.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, $n = "$lit$", ct = `lit$${Math.random().toFixed(9).slice(2)}$`, Ln = "?" + ct, jo = `<${Ln}>`, Et = document, pe = () => Et.createComment(""), me = (i) => i === null || typeof i != "object" && typeof i != "function", Bi = Array.isArray, Vo = (i) => Bi(i) || typeof i?.[Symbol.iterator] == "function", fi = `[ 	
\f\r]`, Zt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ls = /-->/g, cs = />/g, vt = RegExp(`>|${fi}(?:([^\\s"'>=/]+)(${fi}*=${fi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), hs = /'/g, ds = /"/g, In = /^(?:script|style|textarea|title)$/i, Uo = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), Pt = Uo(1), Wt = Symbol.for("lit-noChange"), R = Symbol.for("lit-nothing"), fs = /* @__PURE__ */ new WeakMap(), Ct = Et.createTreeWalker(Et, 129);
function Rn(i, t) {
  if (!Bi(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return as !== void 0 ? as.createHTML(t) : t;
}
const Yo = (i, t) => {
  const e = i.length - 1, s = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = Zt;
  for (let a = 0; a < e; a++) {
    const l = i[a];
    let c, h, d = -1, f = 0;
    for (; f < l.length && (r.lastIndex = f, h = r.exec(l), h !== null); ) f = r.lastIndex, r === Zt ? h[1] === "!--" ? r = ls : h[1] !== void 0 ? r = cs : h[2] !== void 0 ? (In.test(h[2]) && (n = RegExp("</" + h[2], "g")), r = vt) : h[3] !== void 0 && (r = vt) : r === vt ? h[0] === ">" ? (r = n ?? Zt, d = -1) : h[1] === void 0 ? d = -2 : (d = r.lastIndex - h[2].length, c = h[1], r = h[3] === void 0 ? vt : h[3] === '"' ? ds : hs) : r === ds || r === hs ? r = vt : r === ls || r === cs ? r = Zt : (r = vt, n = void 0);
    const u = r === vt && i[a + 1].startsWith("/>") ? " " : "";
    o += r === Zt ? l + jo : d >= 0 ? (s.push(c), l.slice(0, d) + $n + l.slice(d) + ct + u) : l + ct + (d === -2 ? a : u);
  }
  return [Rn(i, o + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class _e {
  constructor({ strings: t, _$litType$: e }, s) {
    let n;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, l = this.parts, [c, h] = Yo(t, e);
    if (this.el = _e.createElement(c, s), Ct.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = Ct.nextNode()) !== null && l.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const d of n.getAttributeNames()) if (d.endsWith($n)) {
          const f = h[r++], u = n.getAttribute(d).split(ct), p = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: o, name: p[2], strings: u, ctor: p[1] === "." ? qo : p[1] === "?" ? Ko : p[1] === "@" ? Go : oi }), n.removeAttribute(d);
        } else d.startsWith(ct) && (l.push({ type: 6, index: o }), n.removeAttribute(d));
        if (In.test(n.tagName)) {
          const d = n.textContent.split(ct), f = d.length - 1;
          if (f > 0) {
            n.textContent = Ke ? Ke.emptyScript : "";
            for (let u = 0; u < f; u++) n.append(d[u], pe()), Ct.nextNode(), l.push({ type: 2, index: ++o });
            n.append(d[f], pe());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Ln) l.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = n.data.indexOf(ct, d + 1)) !== -1; ) l.push({ type: 7, index: o }), d += ct.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = Et.createElement("template");
    return s.innerHTML = t, s;
  }
}
function jt(i, t, e = i, s) {
  if (t === Wt) return t;
  let n = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const o = me(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(i), n._$AT(i, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = n : e._$Cl = n), n !== void 0 && (t = jt(i, n._$AS(i, t.values), n, s)), t;
}
class Xo {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, n = (t?.creationScope ?? Et).importNode(e, !0);
    Ct.currentNode = n;
    let o = Ct.nextNode(), r = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let c;
        l.type === 2 ? c = new ke(o, o.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (c = new Zo(o, this, t)), this._$AV.push(c), l = s[++a];
      }
      r !== l?.index && (o = Ct.nextNode(), r++);
    }
    return Ct.currentNode = Et, n;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class ke {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, n) {
    this.type = 2, this._$AH = R, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = n, this._$Cv = n?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = jt(this, t, e), me(t) ? t === R || t == null || t === "" ? (this._$AH !== R && this._$AR(), this._$AH = R) : t !== this._$AH && t !== Wt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Vo(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== R && me(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Et.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = _e.createElement(Rn(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const o = new Xo(n, this), r = o.u(this.options);
      o.p(e), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = fs.get(t.strings);
    return e === void 0 && fs.set(t.strings, e = new _e(t)), e;
  }
  k(t) {
    Bi(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, n = 0;
    for (const o of t) n === e.length ? e.push(s = new ke(this.O(pe()), this.O(pe()), this, this.options)) : s = e[n], s._$AI(o), n++;
    n < e.length && (this._$AR(s && s._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = rs(t).nextSibling;
      rs(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class oi {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, n, o) {
    this.type = 1, this._$AH = R, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = R;
  }
  _$AI(t, e = this, s, n) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = jt(this, t, e, 0), r = !me(t) || t !== this._$AH && t !== Wt, r && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = o[0], l = 0; l < o.length - 1; l++) c = jt(this, a[s + l], e, l), c === Wt && (c = this._$AH[l]), r || (r = !me(c) || c !== this._$AH[l]), c === R ? t = R : t !== R && (t += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    r && !n && this.j(t);
  }
  j(t) {
    t === R ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class qo extends oi {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === R ? void 0 : t;
  }
}
class Ko extends oi {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== R);
  }
}
class Go extends oi {
  constructor(t, e, s, n, o) {
    super(t, e, s, n, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = jt(this, t, e, 0) ?? R) === Wt) return;
    const s = this._$AH, n = t === R && s !== R || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== R && (s === R || n);
    n && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Zo {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    jt(this, t);
  }
}
const Qo = ae.litHtmlPolyfillSupport;
Qo?.(_e, ke), (ae.litHtmlVersions ?? (ae.litHtmlVersions = [])).push("3.3.3");
const Jo = (i, t, e) => {
  const s = e?.renderBefore ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const o = e?.renderBefore ?? null;
    s._$litPart$ = n = new ke(t.insertBefore(pe(), o), o, void 0, e ?? {});
  }
  return n._$AI(i), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const le = globalThis;
class Bt extends zt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Jo(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Wt;
  }
}
Bt._$litElement$ = !0, Bt.finalized = !0, le.litElementHydrateSupport?.({ LitElement: Bt });
const tr = le.litElementPolyfillSupport;
tr?.({ LitElement: Bt });
(le.litElementVersions ?? (le.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Fn = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const er = { attribute: !0, type: String, converter: qe, reflect: !1, hasChanged: Hi }, ir = (i = er, t, e) => {
  const { kind: s, metadata: n } = e;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), o.set(e.name, i), s === "accessor") {
    const { name: r } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, l, i, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, i, a), a;
    } };
  }
  if (s === "setter") {
    const { name: r } = e;
    return function(a) {
      const l = this[r];
      t.call(this, a), this.requestUpdate(r, l, i, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function Ni(i) {
  return (t, e) => typeof e == "object" ? ir(i, t, e) : ((s, n, o) => {
    const r = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, s), r ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(i, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Me(i) {
  return Ni({ ...i, state: !0, attribute: !1 });
}
/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */
function Ae(i) {
  return i + 0.5 | 0;
}
const ht = (i, t, e) => Math.max(Math.min(i, e), t);
function se(i) {
  return ht(Ae(i * 2.55), 0, 255);
}
function pt(i) {
  return ht(Ae(i * 255), 0, 255);
}
function at(i) {
  return ht(Ae(i / 2.55) / 100, 0, 1);
}
function us(i) {
  return ht(Ae(i * 100), 0, 100);
}
const q = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, ki = [..."0123456789ABCDEF"], sr = (i) => ki[i & 15], nr = (i) => ki[(i & 240) >> 4] + ki[i & 15], Te = (i) => (i & 240) >> 4 === (i & 15), or = (i) => Te(i.r) && Te(i.g) && Te(i.b) && Te(i.a);
function rr(i) {
  var t = i.length, e;
  return i[0] === "#" && (t === 4 || t === 5 ? e = {
    r: 255 & q[i[1]] * 17,
    g: 255 & q[i[2]] * 17,
    b: 255 & q[i[3]] * 17,
    a: t === 5 ? q[i[4]] * 17 : 255
  } : (t === 7 || t === 9) && (e = {
    r: q[i[1]] << 4 | q[i[2]],
    g: q[i[3]] << 4 | q[i[4]],
    b: q[i[5]] << 4 | q[i[6]],
    a: t === 9 ? q[i[7]] << 4 | q[i[8]] : 255
  })), e;
}
const ar = (i, t) => i < 255 ? t(i) : "";
function lr(i) {
  var t = or(i) ? sr : nr;
  return i ? "#" + t(i.r) + t(i.g) + t(i.b) + ar(i.a, t) : void 0;
}
const cr = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function zn(i, t, e) {
  const s = t * Math.min(e, 1 - e), n = (o, r = (o + i / 30) % 12) => e - s * Math.max(Math.min(r - 3, 9 - r, 1), -1);
  return [n(0), n(8), n(4)];
}
function hr(i, t, e) {
  const s = (n, o = (n + i / 60) % 6) => e - e * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [s(5), s(3), s(1)];
}
function dr(i, t, e) {
  const s = zn(i, 1, 0.5);
  let n;
  for (t + e > 1 && (n = 1 / (t + e), t *= n, e *= n), n = 0; n < 3; n++)
    s[n] *= 1 - t - e, s[n] += t;
  return s;
}
function fr(i, t, e, s, n) {
  return i === n ? (t - e) / s + (t < e ? 6 : 0) : t === n ? (e - i) / s + 2 : (i - t) / s + 4;
}
function Wi(i) {
  const e = i.r / 255, s = i.g / 255, n = i.b / 255, o = Math.max(e, s, n), r = Math.min(e, s, n), a = (o + r) / 2;
  let l, c, h;
  return o !== r && (h = o - r, c = a > 0.5 ? h / (2 - o - r) : h / (o + r), l = fr(e, s, n, h, o), l = l * 60 + 0.5), [l | 0, c || 0, a];
}
function ji(i, t, e, s) {
  return (Array.isArray(t) ? i(t[0], t[1], t[2]) : i(t, e, s)).map(pt);
}
function Vi(i, t, e) {
  return ji(zn, i, t, e);
}
function ur(i, t, e) {
  return ji(dr, i, t, e);
}
function gr(i, t, e) {
  return ji(hr, i, t, e);
}
function Hn(i) {
  return (i % 360 + 360) % 360;
}
function pr(i) {
  const t = cr.exec(i);
  let e = 255, s;
  if (!t)
    return;
  t[5] !== s && (e = t[6] ? se(+t[5]) : pt(+t[5]));
  const n = Hn(+t[2]), o = +t[3] / 100, r = +t[4] / 100;
  return t[1] === "hwb" ? s = ur(n, o, r) : t[1] === "hsv" ? s = gr(n, o, r) : s = Vi(n, o, r), {
    r: s[0],
    g: s[1],
    b: s[2],
    a: e
  };
}
function mr(i, t) {
  var e = Wi(i);
  e[0] = Hn(e[0] + t), e = Vi(e), i.r = e[0], i.g = e[1], i.b = e[2];
}
function _r(i) {
  if (!i)
    return;
  const t = Wi(i), e = t[0], s = us(t[1]), n = us(t[2]);
  return i.a < 255 ? `hsla(${e}, ${s}%, ${n}%, ${at(i.a)})` : `hsl(${e}, ${s}%, ${n}%)`;
}
const gs = {
  x: "dark",
  Z: "light",
  Y: "re",
  X: "blu",
  W: "gr",
  V: "medium",
  U: "slate",
  A: "ee",
  T: "ol",
  S: "or",
  B: "ra",
  C: "lateg",
  D: "ights",
  R: "in",
  Q: "turquois",
  E: "hi",
  P: "ro",
  O: "al",
  N: "le",
  M: "de",
  L: "yello",
  F: "en",
  K: "ch",
  G: "arks",
  H: "ea",
  I: "ightg",
  J: "wh"
}, ps = {
  OiceXe: "f0f8ff",
  antiquewEte: "faebd7",
  aqua: "ffff",
  aquamarRe: "7fffd4",
  azuY: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "0",
  blanKedOmond: "ffebcd",
  Xe: "ff",
  XeviTet: "8a2be2",
  bPwn: "a52a2a",
  burlywood: "deb887",
  caMtXe: "5f9ea0",
  KartYuse: "7fff00",
  KocTate: "d2691e",
  cSO: "ff7f50",
  cSnflowerXe: "6495ed",
  cSnsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "ffff",
  xXe: "8b",
  xcyan: "8b8b",
  xgTMnPd: "b8860b",
  xWay: "a9a9a9",
  xgYF: "6400",
  xgYy: "a9a9a9",
  xkhaki: "bdb76b",
  xmagFta: "8b008b",
  xTivegYF: "556b2f",
  xSange: "ff8c00",
  xScEd: "9932cc",
  xYd: "8b0000",
  xsOmon: "e9967a",
  xsHgYF: "8fbc8f",
  xUXe: "483d8b",
  xUWay: "2f4f4f",
  xUgYy: "2f4f4f",
  xQe: "ced1",
  xviTet: "9400d3",
  dAppRk: "ff1493",
  dApskyXe: "bfff",
  dimWay: "696969",
  dimgYy: "696969",
  dodgerXe: "1e90ff",
  fiYbrick: "b22222",
  flSOwEte: "fffaf0",
  foYstWAn: "228b22",
  fuKsia: "ff00ff",
  gaRsbSo: "dcdcdc",
  ghostwEte: "f8f8ff",
  gTd: "ffd700",
  gTMnPd: "daa520",
  Way: "808080",
  gYF: "8000",
  gYFLw: "adff2f",
  gYy: "808080",
  honeyMw: "f0fff0",
  hotpRk: "ff69b4",
  RdianYd: "cd5c5c",
  Rdigo: "4b0082",
  ivSy: "fffff0",
  khaki: "f0e68c",
  lavFMr: "e6e6fa",
  lavFMrXsh: "fff0f5",
  lawngYF: "7cfc00",
  NmoncEffon: "fffacd",
  ZXe: "add8e6",
  ZcSO: "f08080",
  Zcyan: "e0ffff",
  ZgTMnPdLw: "fafad2",
  ZWay: "d3d3d3",
  ZgYF: "90ee90",
  ZgYy: "d3d3d3",
  ZpRk: "ffb6c1",
  ZsOmon: "ffa07a",
  ZsHgYF: "20b2aa",
  ZskyXe: "87cefa",
  ZUWay: "778899",
  ZUgYy: "778899",
  ZstAlXe: "b0c4de",
  ZLw: "ffffe0",
  lime: "ff00",
  limegYF: "32cd32",
  lRF: "faf0e6",
  magFta: "ff00ff",
  maPon: "800000",
  VaquamarRe: "66cdaa",
  VXe: "cd",
  VScEd: "ba55d3",
  VpurpN: "9370db",
  VsHgYF: "3cb371",
  VUXe: "7b68ee",
  VsprRggYF: "fa9a",
  VQe: "48d1cc",
  VviTetYd: "c71585",
  midnightXe: "191970",
  mRtcYam: "f5fffa",
  mistyPse: "ffe4e1",
  moccasR: "ffe4b5",
  navajowEte: "ffdead",
  navy: "80",
  Tdlace: "fdf5e6",
  Tive: "808000",
  TivedBb: "6b8e23",
  Sange: "ffa500",
  SangeYd: "ff4500",
  ScEd: "da70d6",
  pOegTMnPd: "eee8aa",
  pOegYF: "98fb98",
  pOeQe: "afeeee",
  pOeviTetYd: "db7093",
  papayawEp: "ffefd5",
  pHKpuff: "ffdab9",
  peru: "cd853f",
  pRk: "ffc0cb",
  plum: "dda0dd",
  powMrXe: "b0e0e6",
  purpN: "800080",
  YbeccapurpN: "663399",
  Yd: "ff0000",
  Psybrown: "bc8f8f",
  PyOXe: "4169e1",
  saddNbPwn: "8b4513",
  sOmon: "fa8072",
  sandybPwn: "f4a460",
  sHgYF: "2e8b57",
  sHshell: "fff5ee",
  siFna: "a0522d",
  silver: "c0c0c0",
  skyXe: "87ceeb",
  UXe: "6a5acd",
  UWay: "708090",
  UgYy: "708090",
  snow: "fffafa",
  sprRggYF: "ff7f",
  stAlXe: "4682b4",
  tan: "d2b48c",
  teO: "8080",
  tEstN: "d8bfd8",
  tomato: "ff6347",
  Qe: "40e0d0",
  viTet: "ee82ee",
  JHt: "f5deb3",
  wEte: "ffffff",
  wEtesmoke: "f5f5f5",
  Lw: "ffff00",
  LwgYF: "9acd32"
};
function br() {
  const i = {}, t = Object.keys(ps), e = Object.keys(gs);
  let s, n, o, r, a;
  for (s = 0; s < t.length; s++) {
    for (r = a = t[s], n = 0; n < e.length; n++)
      o = e[n], a = a.replace(o, gs[o]);
    o = parseInt(ps[r], 16), i[a] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return i;
}
let De;
function yr(i) {
  De || (De = br(), De.transparent = [0, 0, 0, 0]);
  const t = De[i.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const xr = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function vr(i) {
  const t = xr.exec(i);
  let e = 255, s, n, o;
  if (t) {
    if (t[7] !== s) {
      const r = +t[7];
      e = t[8] ? se(r) : ht(r * 255, 0, 255);
    }
    return s = +t[1], n = +t[3], o = +t[5], s = 255 & (t[2] ? se(s) : ht(s, 0, 255)), n = 255 & (t[4] ? se(n) : ht(n, 0, 255)), o = 255 & (t[6] ? se(o) : ht(o, 0, 255)), {
      r: s,
      g: n,
      b: o,
      a: e
    };
  }
}
function wr(i) {
  return i && (i.a < 255 ? `rgba(${i.r}, ${i.g}, ${i.b}, ${at(i.a)})` : `rgb(${i.r}, ${i.g}, ${i.b})`);
}
const ui = (i) => i <= 31308e-7 ? i * 12.92 : Math.pow(i, 1 / 2.4) * 1.055 - 0.055, Ft = (i) => i <= 0.04045 ? i / 12.92 : Math.pow((i + 0.055) / 1.055, 2.4);
function Sr(i, t, e) {
  const s = Ft(at(i.r)), n = Ft(at(i.g)), o = Ft(at(i.b));
  return {
    r: pt(ui(s + e * (Ft(at(t.r)) - s))),
    g: pt(ui(n + e * (Ft(at(t.g)) - n))),
    b: pt(ui(o + e * (Ft(at(t.b)) - o))),
    a: i.a + e * (t.a - i.a)
  };
}
function Ee(i, t, e) {
  if (i) {
    let s = Wi(i);
    s[t] = Math.max(0, Math.min(s[t] + s[t] * e, t === 0 ? 360 : 1)), s = Vi(s), i.r = s[0], i.g = s[1], i.b = s[2];
  }
}
function Bn(i, t) {
  return i && Object.assign(t || {}, i);
}
function ms(i) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(i) ? i.length >= 3 && (t = { r: i[0], g: i[1], b: i[2], a: 255 }, i.length > 3 && (t.a = pt(i[3]))) : (t = Bn(i, { r: 0, g: 0, b: 0, a: 1 }), t.a = pt(t.a)), t;
}
function kr(i) {
  return i.charAt(0) === "r" ? vr(i) : pr(i);
}
class be {
  constructor(t) {
    if (t instanceof be)
      return t;
    const e = typeof t;
    let s;
    e === "object" ? s = ms(t) : e === "string" && (s = rr(t) || yr(t) || kr(t)), this._rgb = s, this._valid = !!s;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Bn(this._rgb);
    return t && (t.a = at(t.a)), t;
  }
  set rgb(t) {
    this._rgb = ms(t);
  }
  rgbString() {
    return this._valid ? wr(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? lr(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? _r(this._rgb) : void 0;
  }
  mix(t, e) {
    if (t) {
      const s = this.rgb, n = t.rgb;
      let o;
      const r = e === o ? 0.5 : e, a = 2 * r - 1, l = s.a - n.a, c = ((a * l === -1 ? a : (a + l) / (1 + a * l)) + 1) / 2;
      o = 1 - c, s.r = 255 & c * s.r + o * n.r + 0.5, s.g = 255 & c * s.g + o * n.g + 0.5, s.b = 255 & c * s.b + o * n.b + 0.5, s.a = r * s.a + (1 - r) * n.a, this.rgb = s;
    }
    return this;
  }
  interpolate(t, e) {
    return t && (this._rgb = Sr(this._rgb, t._rgb, e)), this;
  }
  clone() {
    return new be(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = pt(t), this;
  }
  clearer(t) {
    const e = this._rgb;
    return e.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, e = Ae(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
    return t.r = t.g = t.b = e, this;
  }
  opaquer(t) {
    const e = this._rgb;
    return e.a *= 1 + t, this;
  }
  negate() {
    const t = this._rgb;
    return t.r = 255 - t.r, t.g = 255 - t.g, t.b = 255 - t.b, this;
  }
  lighten(t) {
    return Ee(this._rgb, 2, t), this;
  }
  darken(t) {
    return Ee(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return Ee(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return Ee(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return mr(this._rgb, t), this;
  }
}
/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
function nt() {
}
const Mr = /* @__PURE__ */ (() => {
  let i = 0;
  return () => i++;
})();
function $(i) {
  return i == null;
}
function z(i) {
  if (Array.isArray && Array.isArray(i))
    return !0;
  const t = Object.prototype.toString.call(i);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function O(i) {
  return i !== null && Object.prototype.toString.call(i) === "[object Object]";
}
function N(i) {
  return (typeof i == "number" || i instanceof Number) && isFinite(+i);
}
function tt(i, t) {
  return N(i) ? i : t;
}
function C(i, t) {
  return typeof i > "u" ? t : i;
}
const Ar = (i, t) => typeof i == "string" && i.endsWith("%") ? parseFloat(i) / 100 * t : +i;
function L(i, t, e) {
  if (i && typeof i.call == "function")
    return i.apply(e, t);
}
function E(i, t, e, s) {
  let n, o, r;
  if (z(i))
    for (o = i.length, n = 0; n < o; n++)
      t.call(e, i[n], n);
  else if (O(i))
    for (r = Object.keys(i), o = r.length, n = 0; n < o; n++)
      t.call(e, i[r[n]], r[n]);
}
function Ge(i, t) {
  let e, s, n, o;
  if (!i || !t || i.length !== t.length)
    return !1;
  for (e = 0, s = i.length; e < s; ++e)
    if (n = i[e], o = t[e], n.datasetIndex !== o.datasetIndex || n.index !== o.index)
      return !1;
  return !0;
}
function Ze(i) {
  if (z(i))
    return i.map(Ze);
  if (O(i)) {
    const t = /* @__PURE__ */ Object.create(null), e = Object.keys(i), s = e.length;
    let n = 0;
    for (; n < s; ++n)
      t[e[n]] = Ze(i[e[n]]);
    return t;
  }
  return i;
}
function Nn(i) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(i) === -1;
}
function Pr(i, t, e, s) {
  if (!Nn(i))
    return;
  const n = t[i], o = e[i];
  O(n) && O(o) ? ye(n, o, s) : t[i] = Ze(o);
}
function ye(i, t, e) {
  const s = z(t) ? t : [
    t
  ], n = s.length;
  if (!O(i))
    return i;
  e = e || {};
  const o = e.merger || Pr;
  let r;
  for (let a = 0; a < n; ++a) {
    if (r = s[a], !O(r))
      continue;
    const l = Object.keys(r);
    for (let c = 0, h = l.length; c < h; ++c)
      o(l[c], i, r, e);
  }
  return i;
}
function ce(i, t) {
  return ye(i, t, {
    merger: Cr
  });
}
function Cr(i, t, e) {
  if (!Nn(i))
    return;
  const s = t[i], n = e[i];
  O(s) && O(n) ? ce(s, n) : Object.prototype.hasOwnProperty.call(t, i) || (t[i] = Ze(n));
}
const _s = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (i) => i,
  // default resolvers
  x: (i) => i.x,
  y: (i) => i.y
};
function Or(i) {
  const t = i.split("."), e = [];
  let s = "";
  for (const n of t)
    s += n, s.endsWith("\\") ? s = s.slice(0, -1) + "." : (e.push(s), s = "");
  return e;
}
function Tr(i) {
  const t = Or(i);
  return (e) => {
    for (const s of t) {
      if (s === "")
        break;
      e = e && e[s];
    }
    return e;
  };
}
function Qe(i, t) {
  return (_s[t] || (_s[t] = Tr(t)))(i);
}
function Ui(i) {
  return i.charAt(0).toUpperCase() + i.slice(1);
}
const Je = (i) => typeof i < "u", mt = (i) => typeof i == "function", bs = (i, t) => {
  if (i.size !== t.size)
    return !1;
  for (const e of i)
    if (!t.has(e))
      return !1;
  return !0;
};
function Dr(i) {
  return i.type === "mouseup" || i.type === "click" || i.type === "contextmenu";
}
const B = Math.PI, Z = 2 * B, Er = Z + B, ti = Number.POSITIVE_INFINITY, $r = B / 180, G = B / 2, wt = B / 4, ys = B * 2 / 3, Wn = Math.log10, Vt = Math.sign;
function he(i, t, e) {
  return Math.abs(i - t) < e;
}
function xs(i) {
  const t = Math.round(i);
  i = he(i, t, i / 1e3) ? t : i;
  const e = Math.pow(10, Math.floor(Wn(i))), s = i / e;
  return (s <= 1 ? 1 : s <= 2 ? 2 : s <= 5 ? 5 : 10) * e;
}
function Lr(i) {
  const t = [], e = Math.sqrt(i);
  let s;
  for (s = 1; s < e; s++)
    i % s === 0 && (t.push(s), t.push(i / s));
  return e === (e | 0) && t.push(e), t.sort((n, o) => n - o).pop(), t;
}
function Ir(i) {
  return typeof i == "symbol" || typeof i == "object" && i !== null && !(Symbol.toPrimitive in i || "toString" in i || "valueOf" in i);
}
function xe(i) {
  return !Ir(i) && !isNaN(parseFloat(i)) && isFinite(i);
}
function Rr(i, t) {
  const e = Math.round(i);
  return e - t <= i && e + t >= i;
}
function Fr(i, t, e) {
  let s, n, o;
  for (s = 0, n = i.length; s < n; s++)
    o = i[s][e], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function Ot(i) {
  return i * (B / 180);
}
function zr(i) {
  return i * (180 / B);
}
function vs(i) {
  if (!N(i))
    return;
  let t = 1, e = 0;
  for (; Math.round(i * t) / t !== i; )
    t *= 10, e++;
  return e;
}
function Hr(i, t) {
  const e = t.x - i.x, s = t.y - i.y, n = Math.sqrt(e * e + s * s);
  let o = Math.atan2(s, e);
  return o < -0.5 * B && (o += Z), {
    angle: o,
    distance: n
  };
}
function Mi(i, t) {
  return Math.sqrt(Math.pow(t.x - i.x, 2) + Math.pow(t.y - i.y, 2));
}
function Br(i, t) {
  return (i - t + Er) % Z - B;
}
function st(i) {
  return (i % Z + Z) % Z;
}
function jn(i, t, e, s) {
  const n = st(i), o = st(t), r = st(e), a = st(o - n), l = st(r - n), c = st(n - o), h = st(n - r);
  return n === o || n === r || s && o === r || a > l && c < h;
}
function K(i, t, e) {
  return Math.max(t, Math.min(e, i));
}
function Nr(i) {
  return K(i, -32768, 32767);
}
function Ht(i, t, e, s = 1e-6) {
  return i >= Math.min(t, e) - s && i <= Math.max(t, e) + s;
}
function Yi(i, t, e) {
  e = e || ((r) => i[r] < t);
  let s = i.length - 1, n = 0, o;
  for (; s - n > 1; )
    o = n + s >> 1, e(o) ? n = o : s = o;
  return {
    lo: n,
    hi: s
  };
}
const Tt = (i, t, e, s) => Yi(i, e, s ? (n) => {
  const o = i[n][t];
  return o < e || o === e && i[n + 1][t] === e;
} : (n) => i[n][t] < e), Wr = (i, t, e) => Yi(i, e, (s) => i[s][t] >= e);
function jr(i, t, e) {
  let s = 0, n = i.length;
  for (; s < n && i[s] < t; )
    s++;
  for (; n > s && i[n - 1] > e; )
    n--;
  return s > 0 || n < i.length ? i.slice(s, n) : i;
}
const Vn = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function Vr(i, t) {
  if (i._chartjs) {
    i._chartjs.listeners.push(t);
    return;
  }
  Object.defineProperty(i, "_chartjs", {
    configurable: !0,
    enumerable: !1,
    value: {
      listeners: [
        t
      ]
    }
  }), Vn.forEach((e) => {
    const s = "_onData" + Ui(e), n = i[e];
    Object.defineProperty(i, e, {
      configurable: !0,
      enumerable: !1,
      value(...o) {
        const r = n.apply(this, o);
        return i._chartjs.listeners.forEach((a) => {
          typeof a[s] == "function" && a[s](...o);
        }), r;
      }
    });
  });
}
function ws(i, t) {
  const e = i._chartjs;
  if (!e)
    return;
  const s = e.listeners, n = s.indexOf(t);
  n !== -1 && s.splice(n, 1), !(s.length > 0) && (Vn.forEach((o) => {
    delete i[o];
  }), delete i._chartjs);
}
function Ur(i) {
  const t = new Set(i);
  return t.size === i.length ? i : Array.from(t);
}
const Un = function() {
  return typeof window > "u" ? function(i) {
    return i();
  } : window.requestAnimationFrame;
}();
function Yn(i, t) {
  let e = [], s = !1;
  return function(...n) {
    e = n, s || (s = !0, Un.call(window, () => {
      s = !1, i.apply(t, e);
    }));
  };
}
function Yr(i, t) {
  let e;
  return function(...s) {
    return t ? (clearTimeout(e), e = setTimeout(i, t, s)) : i.apply(this, s), t;
  };
}
const Xn = (i) => i === "start" ? "left" : i === "end" ? "right" : "center", Y = (i, t, e) => i === "start" ? t : i === "end" ? e : (t + e) / 2, Xr = (i, t, e, s) => i === (s ? "left" : "right") ? e : i === "center" ? (t + e) / 2 : t;
function qr(i, t, e) {
  const s = t.length;
  let n = 0, o = s;
  if (i._sorted) {
    const { iScale: r, vScale: a, _parsed: l } = i, c = i.dataset && i.dataset.options ? i.dataset.options.spanGaps : null, h = r.axis, { min: d, max: f, minDefined: u, maxDefined: p } = r.getUserBounds();
    if (u) {
      if (n = Math.min(
        // @ts-expect-error Need to type _parsed
        Tt(l, h, d).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        e ? s : Tt(t, h, r.getPixelForValue(d)).lo
      ), c) {
        const g = l.slice(0, n + 1).reverse().findIndex((m) => !$(m[a.axis]));
        n -= Math.max(0, g);
      }
      n = K(n, 0, s - 1);
    }
    if (p) {
      let g = Math.max(
        // @ts-expect-error Need to type _parsed
        Tt(l, r.axis, f, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        e ? 0 : Tt(t, h, r.getPixelForValue(f), !0).hi + 1
      );
      if (c) {
        const m = l.slice(g - 1).findIndex((_) => !$(_[a.axis]));
        g += Math.max(0, m);
      }
      o = K(g, n, s) - n;
    } else
      o = s - n;
  }
  return {
    start: n,
    count: o
  };
}
function Kr(i) {
  const { xScale: t, yScale: e, _scaleRanges: s } = i, n = {
    xmin: t.min,
    xmax: t.max,
    ymin: e.min,
    ymax: e.max
  };
  if (!s)
    return i._scaleRanges = n, !0;
  const o = s.xmin !== t.min || s.xmax !== t.max || s.ymin !== e.min || s.ymax !== e.max;
  return Object.assign(s, n), o;
}
const $e = (i) => i === 0 || i === 1, Ss = (i, t, e) => -(Math.pow(2, 10 * (i -= 1)) * Math.sin((i - t) * Z / e)), ks = (i, t, e) => Math.pow(2, -10 * i) * Math.sin((i - t) * Z / e) + 1, de = {
  linear: (i) => i,
  easeInQuad: (i) => i * i,
  easeOutQuad: (i) => -i * (i - 2),
  easeInOutQuad: (i) => (i /= 0.5) < 1 ? 0.5 * i * i : -0.5 * (--i * (i - 2) - 1),
  easeInCubic: (i) => i * i * i,
  easeOutCubic: (i) => (i -= 1) * i * i + 1,
  easeInOutCubic: (i) => (i /= 0.5) < 1 ? 0.5 * i * i * i : 0.5 * ((i -= 2) * i * i + 2),
  easeInQuart: (i) => i * i * i * i,
  easeOutQuart: (i) => -((i -= 1) * i * i * i - 1),
  easeInOutQuart: (i) => (i /= 0.5) < 1 ? 0.5 * i * i * i * i : -0.5 * ((i -= 2) * i * i * i - 2),
  easeInQuint: (i) => i * i * i * i * i,
  easeOutQuint: (i) => (i -= 1) * i * i * i * i + 1,
  easeInOutQuint: (i) => (i /= 0.5) < 1 ? 0.5 * i * i * i * i * i : 0.5 * ((i -= 2) * i * i * i * i + 2),
  easeInSine: (i) => -Math.cos(i * G) + 1,
  easeOutSine: (i) => Math.sin(i * G),
  easeInOutSine: (i) => -0.5 * (Math.cos(B * i) - 1),
  easeInExpo: (i) => i === 0 ? 0 : Math.pow(2, 10 * (i - 1)),
  easeOutExpo: (i) => i === 1 ? 1 : -Math.pow(2, -10 * i) + 1,
  easeInOutExpo: (i) => $e(i) ? i : i < 0.5 ? 0.5 * Math.pow(2, 10 * (i * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (i * 2 - 1)) + 2),
  easeInCirc: (i) => i >= 1 ? i : -(Math.sqrt(1 - i * i) - 1),
  easeOutCirc: (i) => Math.sqrt(1 - (i -= 1) * i),
  easeInOutCirc: (i) => (i /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - i * i) - 1) : 0.5 * (Math.sqrt(1 - (i -= 2) * i) + 1),
  easeInElastic: (i) => $e(i) ? i : Ss(i, 0.075, 0.3),
  easeOutElastic: (i) => $e(i) ? i : ks(i, 0.075, 0.3),
  easeInOutElastic(i) {
    return $e(i) ? i : i < 0.5 ? 0.5 * Ss(i * 2, 0.1125, 0.45) : 0.5 + 0.5 * ks(i * 2 - 1, 0.1125, 0.45);
  },
  easeInBack(i) {
    return i * i * ((1.70158 + 1) * i - 1.70158);
  },
  easeOutBack(i) {
    return (i -= 1) * i * ((1.70158 + 1) * i + 1.70158) + 1;
  },
  easeInOutBack(i) {
    let t = 1.70158;
    return (i /= 0.5) < 1 ? 0.5 * (i * i * (((t *= 1.525) + 1) * i - t)) : 0.5 * ((i -= 2) * i * (((t *= 1.525) + 1) * i + t) + 2);
  },
  easeInBounce: (i) => 1 - de.easeOutBounce(1 - i),
  easeOutBounce(i) {
    return i < 1 / 2.75 ? 7.5625 * i * i : i < 2 / 2.75 ? 7.5625 * (i -= 1.5 / 2.75) * i + 0.75 : i < 2.5 / 2.75 ? 7.5625 * (i -= 2.25 / 2.75) * i + 0.9375 : 7.5625 * (i -= 2.625 / 2.75) * i + 0.984375;
  },
  easeInOutBounce: (i) => i < 0.5 ? de.easeInBounce(i * 2) * 0.5 : de.easeOutBounce(i * 2 - 1) * 0.5 + 0.5
};
function Xi(i) {
  if (i && typeof i == "object") {
    const t = i.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Ms(i) {
  return Xi(i) ? i : new be(i);
}
function gi(i) {
  return Xi(i) ? i : new be(i).saturate(0.5).darken(0.1).hexString();
}
const Gr = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], Zr = [
  "color",
  "borderColor",
  "backgroundColor"
];
function Qr(i) {
  i.set("animation", {
    delay: void 0,
    duration: 1e3,
    easing: "easeOutQuart",
    fn: void 0,
    from: void 0,
    loop: void 0,
    to: void 0,
    type: void 0
  }), i.describe("animation", {
    _fallback: !1,
    _indexable: !1,
    _scriptable: (t) => t !== "onProgress" && t !== "onComplete" && t !== "fn"
  }), i.set("animations", {
    colors: {
      type: "color",
      properties: Zr
    },
    numbers: {
      type: "number",
      properties: Gr
    }
  }), i.describe("animations", {
    _fallback: "animation"
  }), i.set("transitions", {
    active: {
      animation: {
        duration: 400
      }
    },
    resize: {
      animation: {
        duration: 0
      }
    },
    show: {
      animations: {
        colors: {
          from: "transparent"
        },
        visible: {
          type: "boolean",
          duration: 0
        }
      }
    },
    hide: {
      animations: {
        colors: {
          to: "transparent"
        },
        visible: {
          type: "boolean",
          easing: "linear",
          fn: (t) => t | 0
        }
      }
    }
  });
}
function Jr(i) {
  i.set("layout", {
    autoPadding: !0,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });
}
const As = /* @__PURE__ */ new Map();
function ta(i, t) {
  t = t || {};
  const e = i + JSON.stringify(t);
  let s = As.get(e);
  return s || (s = new Intl.NumberFormat(i, t), As.set(e, s)), s;
}
function qn(i, t, e) {
  return ta(t, e).format(i);
}
const ea = {
  values(i) {
    return z(i) ? i : "" + i;
  },
  numeric(i, t, e) {
    if (i === 0)
      return "0";
    const s = this.chart.options.locale;
    let n, o = i;
    if (e.length > 1) {
      const c = Math.max(Math.abs(e[0].value), Math.abs(e[e.length - 1].value));
      (c < 1e-4 || c > 1e15) && (n = "scientific"), o = ia(i, e);
    }
    const r = Wn(Math.abs(o)), a = isNaN(r) ? 1 : Math.max(Math.min(-1 * Math.floor(r), 20), 0), l = {
      notation: n,
      minimumFractionDigits: a,
      maximumFractionDigits: a
    };
    return Object.assign(l, this.options.ticks.format), qn(i, s, l);
  }
};
function ia(i, t) {
  let e = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(e) >= 1 && i !== Math.floor(i) && (e = i - Math.floor(i)), e;
}
var Kn = {
  formatters: ea
};
function sa(i) {
  i.set("scale", {
    display: !0,
    offset: !1,
    reverse: !1,
    beginAtZero: !1,
    bounds: "ticks",
    clip: !0,
    grace: 0,
    grid: {
      display: !0,
      lineWidth: 1,
      drawOnChartArea: !0,
      drawTicks: !0,
      tickLength: 8,
      tickWidth: (t, e) => e.lineWidth,
      tickColor: (t, e) => e.color,
      offset: !1
    },
    border: {
      display: !0,
      dash: [],
      dashOffset: 0,
      width: 1
    },
    title: {
      display: !1,
      text: "",
      padding: {
        top: 4,
        bottom: 4
      }
    },
    ticks: {
      minRotation: 0,
      maxRotation: 50,
      mirror: !1,
      textStrokeWidth: 0,
      textStrokeColor: "",
      padding: 3,
      display: !0,
      autoSkip: !0,
      autoSkipPadding: 3,
      labelOffset: 0,
      callback: Kn.formatters.values,
      minor: {},
      major: {},
      align: "center",
      crossAlign: "near",
      showLabelBackdrop: !1,
      backdropColor: "rgba(255, 255, 255, 0.75)",
      backdropPadding: 2
    }
  }), i.route("scale.ticks", "color", "", "color"), i.route("scale.grid", "color", "", "borderColor"), i.route("scale.border", "color", "", "borderColor"), i.route("scale.title", "color", "", "color"), i.describe("scale", {
    _fallback: !1,
    _scriptable: (t) => !t.startsWith("before") && !t.startsWith("after") && t !== "callback" && t !== "parser",
    _indexable: (t) => t !== "borderDash" && t !== "tickBorderDash" && t !== "dash"
  }), i.describe("scales", {
    _fallback: "scale"
  }), i.describe("scale.ticks", {
    _scriptable: (t) => t !== "backdropPadding" && t !== "callback",
    _indexable: (t) => t !== "backdropPadding"
  });
}
const $t = /* @__PURE__ */ Object.create(null), Ai = /* @__PURE__ */ Object.create(null);
function fe(i, t) {
  if (!t)
    return i;
  const e = t.split(".");
  for (let s = 0, n = e.length; s < n; ++s) {
    const o = e[s];
    i = i[o] || (i[o] = /* @__PURE__ */ Object.create(null));
  }
  return i;
}
function pi(i, t, e) {
  return typeof t == "string" ? ye(fe(i, t), e) : ye(fe(i, ""), t);
}
class na {
  constructor(t, e) {
    this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (s) => s.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = [
      "mousemove",
      "mouseout",
      "click",
      "touchstart",
      "touchmove"
    ], this.font = {
      family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      size: 12,
      style: "normal",
      lineHeight: 1.2,
      weight: null
    }, this.hover = {}, this.hoverBackgroundColor = (s, n) => gi(n.backgroundColor), this.hoverBorderColor = (s, n) => gi(n.borderColor), this.hoverColor = (s, n) => gi(n.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(e);
  }
  set(t, e) {
    return pi(this, t, e);
  }
  get(t) {
    return fe(this, t);
  }
  describe(t, e) {
    return pi(Ai, t, e);
  }
  override(t, e) {
    return pi($t, t, e);
  }
  route(t, e, s, n) {
    const o = fe(this, t), r = fe(this, s), a = "_" + e;
    Object.defineProperties(o, {
      [a]: {
        value: o[e],
        writable: !0
      },
      [e]: {
        enumerable: !0,
        get() {
          const l = this[a], c = r[n];
          return O(l) ? Object.assign({}, c, l) : C(l, c);
        },
        set(l) {
          this[a] = l;
        }
      }
    });
  }
  apply(t) {
    t.forEach((e) => e(this));
  }
}
var F = /* @__PURE__ */ new na({
  _scriptable: (i) => !i.startsWith("on"),
  _indexable: (i) => i !== "events",
  hover: {
    _fallback: "interaction"
  },
  interaction: {
    _scriptable: !1,
    _indexable: !1
  }
}, [
  Qr,
  Jr,
  sa
]);
function oa(i) {
  return !i || $(i.size) || $(i.family) ? null : (i.style ? i.style + " " : "") + (i.weight ? i.weight + " " : "") + i.size + "px " + i.family;
}
function Ps(i, t, e, s, n) {
  let o = t[n];
  return o || (o = t[n] = i.measureText(n).width, e.push(n)), o > s && (s = o), s;
}
function St(i, t, e) {
  const s = i.currentDevicePixelRatio, n = e !== 0 ? Math.max(e / 2, 0.5) : 0;
  return Math.round((t - n) * s) / s + n;
}
function Cs(i, t) {
  !t && !i || (t = t || i.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, i.width, i.height), t.restore());
}
function Pi(i, t, e, s) {
  Gn(i, t, e, s, null);
}
function Gn(i, t, e, s, n) {
  let o, r, a, l, c, h, d, f;
  const u = t.pointStyle, p = t.rotation, g = t.radius;
  let m = (p || 0) * $r;
  if (u && typeof u == "object" && (o = u.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    i.save(), i.translate(e, s), i.rotate(m), i.drawImage(u, -u.width / 2, -u.height / 2, u.width, u.height), i.restore();
    return;
  }
  if (!(isNaN(g) || g <= 0)) {
    switch (i.beginPath(), u) {
      default:
        n ? i.ellipse(e, s, n / 2, g, 0, 0, Z) : i.arc(e, s, g, 0, Z), i.closePath();
        break;
      case "triangle":
        h = n ? n / 2 : g, i.moveTo(e + Math.sin(m) * h, s - Math.cos(m) * g), m += ys, i.lineTo(e + Math.sin(m) * h, s - Math.cos(m) * g), m += ys, i.lineTo(e + Math.sin(m) * h, s - Math.cos(m) * g), i.closePath();
        break;
      case "rectRounded":
        c = g * 0.516, l = g - c, r = Math.cos(m + wt) * l, d = Math.cos(m + wt) * (n ? n / 2 - c : l), a = Math.sin(m + wt) * l, f = Math.sin(m + wt) * (n ? n / 2 - c : l), i.arc(e - d, s - a, c, m - B, m - G), i.arc(e + f, s - r, c, m - G, m), i.arc(e + d, s + a, c, m, m + G), i.arc(e - f, s + r, c, m + G, m + B), i.closePath();
        break;
      case "rect":
        if (!p) {
          l = Math.SQRT1_2 * g, h = n ? n / 2 : l, i.rect(e - h, s - l, 2 * h, 2 * l);
          break;
        }
        m += wt;
      case "rectRot":
        d = Math.cos(m) * (n ? n / 2 : g), r = Math.cos(m) * g, a = Math.sin(m) * g, f = Math.sin(m) * (n ? n / 2 : g), i.moveTo(e - d, s - a), i.lineTo(e + f, s - r), i.lineTo(e + d, s + a), i.lineTo(e - f, s + r), i.closePath();
        break;
      case "crossRot":
        m += wt;
      case "cross":
        d = Math.cos(m) * (n ? n / 2 : g), r = Math.cos(m) * g, a = Math.sin(m) * g, f = Math.sin(m) * (n ? n / 2 : g), i.moveTo(e - d, s - a), i.lineTo(e + d, s + a), i.moveTo(e + f, s - r), i.lineTo(e - f, s + r);
        break;
      case "star":
        d = Math.cos(m) * (n ? n / 2 : g), r = Math.cos(m) * g, a = Math.sin(m) * g, f = Math.sin(m) * (n ? n / 2 : g), i.moveTo(e - d, s - a), i.lineTo(e + d, s + a), i.moveTo(e + f, s - r), i.lineTo(e - f, s + r), m += wt, d = Math.cos(m) * (n ? n / 2 : g), r = Math.cos(m) * g, a = Math.sin(m) * g, f = Math.sin(m) * (n ? n / 2 : g), i.moveTo(e - d, s - a), i.lineTo(e + d, s + a), i.moveTo(e + f, s - r), i.lineTo(e - f, s + r);
        break;
      case "line":
        r = n ? n / 2 : Math.cos(m) * g, a = Math.sin(m) * g, i.moveTo(e - r, s - a), i.lineTo(e + r, s + a);
        break;
      case "dash":
        i.moveTo(e, s), i.lineTo(e + Math.cos(m) * (n ? n / 2 : g), s + Math.sin(m) * g);
        break;
      case !1:
        i.closePath();
        break;
    }
    i.fill(), t.borderWidth > 0 && i.stroke();
  }
}
function ve(i, t, e) {
  return e = e || 0.5, !t || i && i.x > t.left - e && i.x < t.right + e && i.y > t.top - e && i.y < t.bottom + e;
}
function ri(i, t) {
  i.save(), i.beginPath(), i.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), i.clip();
}
function ai(i) {
  i.restore();
}
function ra(i, t, e, s, n) {
  if (!t)
    return i.lineTo(e.x, e.y);
  if (n === "middle") {
    const o = (t.x + e.x) / 2;
    i.lineTo(o, t.y), i.lineTo(o, e.y);
  } else n === "after" != !!s ? i.lineTo(t.x, e.y) : i.lineTo(e.x, t.y);
  i.lineTo(e.x, e.y);
}
function aa(i, t, e, s) {
  if (!t)
    return i.lineTo(e.x, e.y);
  i.bezierCurveTo(s ? t.cp1x : t.cp2x, s ? t.cp1y : t.cp2y, s ? e.cp2x : e.cp1x, s ? e.cp2y : e.cp1y, e.x, e.y);
}
function la(i, t) {
  t.translation && i.translate(t.translation[0], t.translation[1]), $(t.rotation) || i.rotate(t.rotation), t.color && (i.fillStyle = t.color), t.textAlign && (i.textAlign = t.textAlign), t.textBaseline && (i.textBaseline = t.textBaseline);
}
function ca(i, t, e, s, n) {
  if (n.strikethrough || n.underline) {
    const o = i.measureText(s), r = t - o.actualBoundingBoxLeft, a = t + o.actualBoundingBoxRight, l = e - o.actualBoundingBoxAscent, c = e + o.actualBoundingBoxDescent, h = n.strikethrough ? (l + c) / 2 : c;
    i.strokeStyle = i.fillStyle, i.beginPath(), i.lineWidth = n.decorationWidth || 2, i.moveTo(r, h), i.lineTo(a, h), i.stroke();
  }
}
function ha(i, t) {
  const e = i.fillStyle;
  i.fillStyle = t.color, i.fillRect(t.left, t.top, t.width, t.height), i.fillStyle = e;
}
function ei(i, t, e, s, n, o = {}) {
  const r = z(t) ? t : [
    t
  ], a = o.strokeWidth > 0 && o.strokeColor !== "";
  let l, c;
  for (i.save(), i.font = n.string, la(i, o), l = 0; l < r.length; ++l)
    c = r[l], o.backdrop && ha(i, o.backdrop), a && (o.strokeColor && (i.strokeStyle = o.strokeColor), $(o.strokeWidth) || (i.lineWidth = o.strokeWidth), i.strokeText(c, e, s, o.maxWidth)), i.fillText(c, e, s, o.maxWidth), ca(i, e, s, c, o), s += Number(n.lineHeight);
  i.restore();
}
function Ci(i, t) {
  const { x: e, y: s, w: n, h: o, radius: r } = t;
  i.arc(e + r.topLeft, s + r.topLeft, r.topLeft, 1.5 * B, B, !0), i.lineTo(e, s + o - r.bottomLeft), i.arc(e + r.bottomLeft, s + o - r.bottomLeft, r.bottomLeft, B, G, !0), i.lineTo(e + n - r.bottomRight, s + o), i.arc(e + n - r.bottomRight, s + o - r.bottomRight, r.bottomRight, G, 0, !0), i.lineTo(e + n, s + r.topRight), i.arc(e + n - r.topRight, s + r.topRight, r.topRight, 0, -G, !0), i.lineTo(e + r.topLeft, s);
}
const da = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, fa = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function ua(i, t) {
  const e = ("" + i).match(da);
  if (!e || e[1] === "normal")
    return t * 1.2;
  switch (i = +e[2], e[3]) {
    case "px":
      return i;
    case "%":
      i /= 100;
      break;
  }
  return t * i;
}
const ga = (i) => +i || 0;
function Zn(i, t) {
  const e = {}, s = O(t), n = s ? Object.keys(t) : t, o = O(i) ? s ? (r) => C(i[r], i[t[r]]) : (r) => i[r] : () => i;
  for (const r of n)
    e[r] = ga(o(r));
  return e;
}
function pa(i) {
  return Zn(i, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function ue(i) {
  return Zn(i, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function Q(i) {
  const t = pa(i);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function U(i, t) {
  i = i || {}, t = t || F.font;
  let e = C(i.size, t.size);
  typeof e == "string" && (e = parseInt(e, 10));
  let s = C(i.style, t.style);
  s && !("" + s).match(fa) && (console.warn('Invalid font style specified: "' + s + '"'), s = void 0);
  const n = {
    family: C(i.family, t.family),
    lineHeight: ua(C(i.lineHeight, t.lineHeight), e),
    size: e,
    style: s,
    weight: C(i.weight, t.weight),
    string: ""
  };
  return n.string = oa(n), n;
}
function Le(i, t, e, s) {
  let n, o, r;
  for (n = 0, o = i.length; n < o; ++n)
    if (r = i[n], r !== void 0 && r !== void 0)
      return r;
}
function ma(i, t, e) {
  const { min: s, max: n } = i, o = Ar(t, (n - s) / 2), r = (a, l) => e && a === 0 ? 0 : a + l;
  return {
    min: r(s, -Math.abs(o)),
    max: r(n, o)
  };
}
function Lt(i, t) {
  return Object.assign(Object.create(i), t);
}
function qi(i, t = [
  ""
], e, s, n = () => i[0]) {
  const o = e || i;
  typeof s > "u" && (s = eo("_fallback", i));
  const r = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: i,
    _rootScopes: o,
    _fallback: s,
    _getTarget: n,
    override: (a) => qi([
      a,
      ...i
    ], t, o, s)
  };
  return new Proxy(r, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(a, l) {
      return delete a[l], delete a._keys, delete i[0][l], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(a, l) {
      return Jn(a, l, () => ka(l, t, i, a));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(a, l) {
      return Reflect.getOwnPropertyDescriptor(a._scopes[0], l);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(i[0]);
    },
    /**
    * A trap for the in operator.
    */
    has(a, l) {
      return Ts(a).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(a) {
      return Ts(a);
    },
    /**
    * A trap for setting property values.
    */
    set(a, l, c) {
      const h = a._storage || (a._storage = n());
      return a[l] = h[l] = c, delete a._keys, !0;
    }
  });
}
function Ut(i, t, e, s) {
  const n = {
    _cacheable: !1,
    _proxy: i,
    _context: t,
    _subProxy: e,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: Qn(i, s),
    setContext: (o) => Ut(i, o, e, s),
    override: (o) => Ut(i.override(o), t, e, s)
  };
  return new Proxy(n, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(o, r) {
      return delete o[r], delete i[r], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(o, r, a) {
      return Jn(o, r, () => ba(o, r, a));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(o, r) {
      return o._descriptors.allKeys ? Reflect.has(i, r) ? {
        enumerable: !0,
        configurable: !0
      } : void 0 : Reflect.getOwnPropertyDescriptor(i, r);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(i);
    },
    /**
    * A trap for the in operator.
    */
    has(o, r) {
      return Reflect.has(i, r);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys() {
      return Reflect.ownKeys(i);
    },
    /**
    * A trap for setting property values.
    */
    set(o, r, a) {
      return i[r] = a, delete o[r], !0;
    }
  });
}
function Qn(i, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: e = t.scriptable, _indexable: s = t.indexable, _allKeys: n = t.allKeys } = i;
  return {
    allKeys: n,
    scriptable: e,
    indexable: s,
    isScriptable: mt(e) ? e : () => e,
    isIndexable: mt(s) ? s : () => s
  };
}
const _a = (i, t) => i ? i + Ui(t) : t, Ki = (i, t) => O(t) && i !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Jn(i, t, e) {
  if (Object.prototype.hasOwnProperty.call(i, t) || t === "constructor")
    return i[t];
  const s = e();
  return i[t] = s, s;
}
function ba(i, t, e) {
  const { _proxy: s, _context: n, _subProxy: o, _descriptors: r } = i;
  let a = s[t];
  return mt(a) && r.isScriptable(t) && (a = ya(t, a, i, e)), z(a) && a.length && (a = xa(t, a, i, r.isIndexable)), Ki(t, a) && (a = Ut(a, n, o && o[t], r)), a;
}
function ya(i, t, e, s) {
  const { _proxy: n, _context: o, _subProxy: r, _stack: a } = e;
  if (a.has(i))
    throw new Error("Recursion detected: " + Array.from(a).join("->") + "->" + i);
  a.add(i);
  let l = t(o, r || s);
  return a.delete(i), Ki(i, l) && (l = Gi(n._scopes, n, i, l)), l;
}
function xa(i, t, e, s) {
  const { _proxy: n, _context: o, _subProxy: r, _descriptors: a } = e;
  if (typeof o.index < "u" && s(i))
    return t[o.index % t.length];
  if (O(t[0])) {
    const l = t, c = n._scopes.filter((h) => h !== l);
    t = [];
    for (const h of l) {
      const d = Gi(c, n, i, h);
      t.push(Ut(d, o, r && r[i], a));
    }
  }
  return t;
}
function to(i, t, e) {
  return mt(i) ? i(t, e) : i;
}
const va = (i, t) => i === !0 ? t : typeof i == "string" ? Qe(t, i) : void 0;
function wa(i, t, e, s, n) {
  for (const o of t) {
    const r = va(e, o);
    if (r) {
      i.add(r);
      const a = to(r._fallback, e, n);
      if (typeof a < "u" && a !== e && a !== s)
        return a;
    } else if (r === !1 && typeof s < "u" && e !== s)
      return null;
  }
  return !1;
}
function Gi(i, t, e, s) {
  const n = t._rootScopes, o = to(t._fallback, e, s), r = [
    ...i,
    ...n
  ], a = /* @__PURE__ */ new Set();
  a.add(s);
  let l = Os(a, r, e, o || e, s);
  return l === null || typeof o < "u" && o !== e && (l = Os(a, r, o, l, s), l === null) ? !1 : qi(Array.from(a), [
    ""
  ], n, o, () => Sa(t, e, s));
}
function Os(i, t, e, s, n) {
  for (; e; )
    e = wa(i, t, e, s, n);
  return e;
}
function Sa(i, t, e) {
  const s = i._getTarget();
  t in s || (s[t] = {});
  const n = s[t];
  return z(n) && O(e) ? e : n || {};
}
function ka(i, t, e, s) {
  let n;
  for (const o of t)
    if (n = eo(_a(o, i), e), typeof n < "u")
      return Ki(i, n) ? Gi(e, s, i, n) : n;
}
function eo(i, t) {
  for (const e of t) {
    if (!e)
      continue;
    const s = e[i];
    if (typeof s < "u")
      return s;
  }
}
function Ts(i) {
  let t = i._keys;
  return t || (t = i._keys = Ma(i._scopes)), t;
}
function Ma(i) {
  const t = /* @__PURE__ */ new Set();
  for (const e of i)
    for (const s of Object.keys(e).filter((n) => !n.startsWith("_")))
      t.add(s);
  return Array.from(t);
}
const Aa = Number.EPSILON || 1e-14, Yt = (i, t) => t < i.length && !i[t].skip && i[t], io = (i) => i === "x" ? "y" : "x";
function Pa(i, t, e, s) {
  const n = i.skip ? t : i, o = t, r = e.skip ? t : e, a = Mi(o, n), l = Mi(r, o);
  let c = a / (a + l), h = l / (a + l);
  c = isNaN(c) ? 0 : c, h = isNaN(h) ? 0 : h;
  const d = s * c, f = s * h;
  return {
    previous: {
      x: o.x - d * (r.x - n.x),
      y: o.y - d * (r.y - n.y)
    },
    next: {
      x: o.x + f * (r.x - n.x),
      y: o.y + f * (r.y - n.y)
    }
  };
}
function Ca(i, t, e) {
  const s = i.length;
  let n, o, r, a, l, c = Yt(i, 0);
  for (let h = 0; h < s - 1; ++h)
    if (l = c, c = Yt(i, h + 1), !(!l || !c)) {
      if (he(t[h], 0, Aa)) {
        e[h] = e[h + 1] = 0;
        continue;
      }
      n = e[h] / t[h], o = e[h + 1] / t[h], a = Math.pow(n, 2) + Math.pow(o, 2), !(a <= 9) && (r = 3 / Math.sqrt(a), e[h] = n * r * t[h], e[h + 1] = o * r * t[h]);
    }
}
function Oa(i, t, e = "x") {
  const s = io(e), n = i.length;
  let o, r, a, l = Yt(i, 0);
  for (let c = 0; c < n; ++c) {
    if (r = a, a = l, l = Yt(i, c + 1), !a)
      continue;
    const h = a[e], d = a[s];
    r && (o = (h - r[e]) / 3, a[`cp1${e}`] = h - o, a[`cp1${s}`] = d - o * t[c]), l && (o = (l[e] - h) / 3, a[`cp2${e}`] = h + o, a[`cp2${s}`] = d + o * t[c]);
  }
}
function Ta(i, t = "x") {
  const e = io(t), s = i.length, n = Array(s).fill(0), o = Array(s);
  let r, a, l, c = Yt(i, 0);
  for (r = 0; r < s; ++r)
    if (a = l, l = c, c = Yt(i, r + 1), !!l) {
      if (c) {
        const h = c[t] - l[t];
        n[r] = h !== 0 ? (c[e] - l[e]) / h : 0;
      }
      o[r] = a ? c ? Vt(n[r - 1]) !== Vt(n[r]) ? 0 : (n[r - 1] + n[r]) / 2 : n[r - 1] : n[r];
    }
  Ca(i, n, o), Oa(i, o, t);
}
function Ie(i, t, e) {
  return Math.max(Math.min(i, e), t);
}
function Da(i, t) {
  let e, s, n, o, r, a = ve(i[0], t);
  for (e = 0, s = i.length; e < s; ++e)
    r = o, o = a, a = e < s - 1 && ve(i[e + 1], t), o && (n = i[e], r && (n.cp1x = Ie(n.cp1x, t.left, t.right), n.cp1y = Ie(n.cp1y, t.top, t.bottom)), a && (n.cp2x = Ie(n.cp2x, t.left, t.right), n.cp2y = Ie(n.cp2y, t.top, t.bottom)));
}
function Ea(i, t, e, s, n) {
  let o, r, a, l;
  if (t.spanGaps && (i = i.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    Ta(i, n);
  else {
    let c = s ? i[i.length - 1] : i[0];
    for (o = 0, r = i.length; o < r; ++o)
      a = i[o], l = Pa(c, a, i[Math.min(o + 1, r - (s ? 0 : 1)) % r], t.tension), a.cp1x = l.previous.x, a.cp1y = l.previous.y, a.cp2x = l.next.x, a.cp2y = l.next.y, c = a;
  }
  t.capBezierPoints && Da(i, e);
}
function Zi() {
  return typeof window < "u" && typeof document < "u";
}
function Qi(i) {
  let t = i.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function ii(i, t, e) {
  let s;
  return typeof i == "string" ? (s = parseInt(i, 10), i.indexOf("%") !== -1 && (s = s / 100 * t.parentNode[e])) : s = i, s;
}
const li = (i) => i.ownerDocument.defaultView.getComputedStyle(i, null);
function $a(i, t) {
  return li(i).getPropertyValue(t);
}
const La = [
  "top",
  "right",
  "bottom",
  "left"
];
function Dt(i, t, e) {
  const s = {};
  e = e ? "-" + e : "";
  for (let n = 0; n < 4; n++) {
    const o = La[n];
    s[o] = parseFloat(i[t + "-" + o + e]) || 0;
  }
  return s.width = s.left + s.right, s.height = s.top + s.bottom, s;
}
const Ia = (i, t, e) => (i > 0 || t > 0) && (!e || !e.shadowRoot);
function Ra(i, t) {
  const e = i.touches, s = e && e.length ? e[0] : i, { offsetX: n, offsetY: o } = s;
  let r = !1, a, l;
  if (Ia(n, o, i.target))
    a = n, l = o;
  else {
    const c = t.getBoundingClientRect();
    a = s.clientX - c.left, l = s.clientY - c.top, r = !0;
  }
  return {
    x: a,
    y: l,
    box: r
  };
}
function Mt(i, t) {
  if ("native" in i)
    return i;
  const { canvas: e, currentDevicePixelRatio: s } = t, n = li(e), o = n.boxSizing === "border-box", r = Dt(n, "padding"), a = Dt(n, "border", "width"), { x: l, y: c, box: h } = Ra(i, e), d = r.left + (h && a.left), f = r.top + (h && a.top);
  let { width: u, height: p } = t;
  return o && (u -= r.width + a.width, p -= r.height + a.height), {
    x: Math.round((l - d) / u * e.width / s),
    y: Math.round((c - f) / p * e.height / s)
  };
}
function Fa(i, t, e) {
  let s, n;
  if (t === void 0 || e === void 0) {
    const o = i && Qi(i);
    if (!o)
      t = i.clientWidth, e = i.clientHeight;
    else {
      const r = o.getBoundingClientRect(), a = li(o), l = Dt(a, "border", "width"), c = Dt(a, "padding");
      t = r.width - c.width - l.width, e = r.height - c.height - l.height, s = ii(a.maxWidth, o, "clientWidth"), n = ii(a.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: e,
    maxWidth: s || ti,
    maxHeight: n || ti
  };
}
const dt = (i) => Math.round(i * 10) / 10;
function za(i, t, e, s) {
  const n = li(i), o = Dt(n, "margin"), r = ii(n.maxWidth, i, "clientWidth") || ti, a = ii(n.maxHeight, i, "clientHeight") || ti, l = Fa(i, t, e);
  let { width: c, height: h } = l;
  if (n.boxSizing === "content-box") {
    const f = Dt(n, "border", "width"), u = Dt(n, "padding");
    c -= u.width + f.width, h -= u.height + f.height;
  }
  return c = Math.max(0, c - o.width), h = Math.max(0, s ? c / s : h - o.height), c = dt(Math.min(c, r, l.maxWidth)), h = dt(Math.min(h, a, l.maxHeight)), c && !h && (h = dt(c / 2)), (t !== void 0 || e !== void 0) && s && l.height && h > l.height && (h = l.height, c = dt(Math.floor(h * s))), {
    width: c,
    height: h
  };
}
function Ds(i, t, e) {
  const s = t || 1, n = dt(i.height * s), o = dt(i.width * s);
  i.height = dt(i.height), i.width = dt(i.width);
  const r = i.canvas;
  return r.style && (e || !r.style.height && !r.style.width) && (r.style.height = `${i.height}px`, r.style.width = `${i.width}px`), i.currentDevicePixelRatio !== s || r.height !== n || r.width !== o ? (i.currentDevicePixelRatio = s, r.height = n, r.width = o, i.ctx.setTransform(s, 0, 0, s, 0, 0), !0) : !1;
}
const Ha = function() {
  let i = !1;
  try {
    const t = {
      get passive() {
        return i = !0, !1;
      }
    };
    Zi() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return i;
}();
function Es(i, t) {
  const e = $a(i, t), s = e && e.match(/^(\d+)(\.\d+)?px$/);
  return s ? +s[1] : void 0;
}
function At(i, t, e, s) {
  return {
    x: i.x + e * (t.x - i.x),
    y: i.y + e * (t.y - i.y)
  };
}
function Ba(i, t, e, s) {
  return {
    x: i.x + e * (t.x - i.x),
    y: s === "middle" ? e < 0.5 ? i.y : t.y : s === "after" ? e < 1 ? i.y : t.y : e > 0 ? t.y : i.y
  };
}
function Na(i, t, e, s) {
  const n = {
    x: i.cp2x,
    y: i.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, r = At(i, n, e), a = At(n, o, e), l = At(o, t, e), c = At(r, a, e), h = At(a, l, e);
  return At(c, h, e);
}
const Wa = function(i, t) {
  return {
    x(e) {
      return i + i + t - e;
    },
    setWidth(e) {
      t = e;
    },
    textAlign(e) {
      return e === "center" ? e : e === "right" ? "left" : "right";
    },
    xPlus(e, s) {
      return e - s;
    },
    leftForLtr(e, s) {
      return e - s;
    }
  };
}, ja = function() {
  return {
    x(i) {
      return i;
    },
    setWidth(i) {
    },
    textAlign(i) {
      return i;
    },
    xPlus(i, t) {
      return i + t;
    },
    leftForLtr(i, t) {
      return i;
    }
  };
};
function Nt(i, t, e) {
  return i ? Wa(t, e) : ja();
}
function so(i, t) {
  let e, s;
  (t === "ltr" || t === "rtl") && (e = i.canvas.style, s = [
    e.getPropertyValue("direction"),
    e.getPropertyPriority("direction")
  ], e.setProperty("direction", t, "important"), i.prevTextDirection = s);
}
function no(i, t) {
  t !== void 0 && (delete i.prevTextDirection, i.canvas.style.setProperty("direction", t[0], t[1]));
}
function oo(i) {
  return i === "angle" ? {
    between: jn,
    compare: Br,
    normalize: st
  } : {
    between: Ht,
    compare: (t, e) => t - e,
    normalize: (t) => t
  };
}
function $s({ start: i, end: t, count: e, loop: s, style: n }) {
  return {
    start: i % e,
    end: t % e,
    loop: s && (t - i + 1) % e === 0,
    style: n
  };
}
function Va(i, t, e) {
  const { property: s, start: n, end: o } = e, { between: r, normalize: a } = oo(s), l = t.length;
  let { start: c, end: h, loop: d } = i, f, u;
  if (d) {
    for (c += l, h += l, f = 0, u = l; f < u && r(a(t[c % l][s]), n, o); ++f)
      c--, h--;
    c %= l, h %= l;
  }
  return h < c && (h += l), {
    start: c,
    end: h,
    loop: d,
    style: i.style
  };
}
function ro(i, t, e) {
  if (!e)
    return [
      i
    ];
  const { property: s, start: n, end: o } = e, r = t.length, { compare: a, between: l, normalize: c } = oo(s), { start: h, end: d, loop: f, style: u } = Va(i, t, e), p = [];
  let g = !1, m = null, _, y, v;
  const w = () => l(n, v, _) && a(n, v) !== 0, b = () => a(o, _) === 0 || l(o, v, _), k = () => g || w(), S = () => !g || b();
  for (let x = h, M = h; x <= d; ++x)
    y = t[x % r], !y.skip && (_ = c(y[s]), _ !== v && (g = l(_, n, o), m === null && k() && (m = a(_, n) === 0 ? x : M), m !== null && S() && (p.push($s({
      start: m,
      end: x,
      loop: f,
      count: r,
      style: u
    })), m = null), M = x, v = _));
  return m !== null && p.push($s({
    start: m,
    end: d,
    loop: f,
    count: r,
    style: u
  })), p;
}
function ao(i, t) {
  const e = [], s = i.segments;
  for (let n = 0; n < s.length; n++) {
    const o = ro(s[n], i.points, t);
    o.length && e.push(...o);
  }
  return e;
}
function Ua(i, t, e, s) {
  let n = 0, o = t - 1;
  if (e && !s)
    for (; n < t && !i[n].skip; )
      n++;
  for (; n < t && i[n].skip; )
    n++;
  for (n %= t, e && (o += n); o > n && i[o % t].skip; )
    o--;
  return o %= t, {
    start: n,
    end: o
  };
}
function Ya(i, t, e, s) {
  const n = i.length, o = [];
  let r = t, a = i[t], l;
  for (l = t + 1; l <= e; ++l) {
    const c = i[l % n];
    c.skip || c.stop ? a.skip || (s = !1, o.push({
      start: t % n,
      end: (l - 1) % n,
      loop: s
    }), t = r = c.stop ? l : null) : (r = l, a.skip && (t = l)), a = c;
  }
  return r !== null && o.push({
    start: t % n,
    end: r % n,
    loop: s
  }), o;
}
function Xa(i, t) {
  const e = i.points, s = i.options.spanGaps, n = e.length;
  if (!n)
    return [];
  const o = !!i._loop, { start: r, end: a } = Ua(e, n, o, s);
  if (s === !0)
    return Ls(i, [
      {
        start: r,
        end: a,
        loop: o
      }
    ], e, t);
  const l = a < r ? a + n : a, c = !!i._fullLoop && r === 0 && a === n - 1;
  return Ls(i, Ya(e, r, l, c), e, t);
}
function Ls(i, t, e, s) {
  return !s || !s.setContext || !e ? t : qa(i, t, e, s);
}
function qa(i, t, e, s) {
  const n = i._chart.getContext(), o = Is(i.options), { _datasetIndex: r, options: { spanGaps: a } } = i, l = e.length, c = [];
  let h = o, d = t[0].start, f = d;
  function u(p, g, m, _) {
    const y = a ? -1 : 1;
    if (p !== g) {
      for (p += l; e[p % l].skip; )
        p -= y;
      for (; e[g % l].skip; )
        g += y;
      p % l !== g % l && (c.push({
        start: p % l,
        end: g % l,
        loop: m,
        style: _
      }), h = _, d = g % l);
    }
  }
  for (const p of t) {
    d = a ? d : p.start;
    let g = e[d % l], m;
    for (f = d + 1; f <= p.end; f++) {
      const _ = e[f % l];
      m = Is(s.setContext(Lt(n, {
        type: "segment",
        p0: g,
        p1: _,
        p0DataIndex: (f - 1) % l,
        p1DataIndex: f % l,
        datasetIndex: r
      }))), Ka(m, h) && u(d, f - 1, p.loop, h), g = _, h = m;
    }
    d < f - 1 && u(d, f - 1, p.loop, h);
  }
  return c;
}
function Is(i) {
  return {
    backgroundColor: i.backgroundColor,
    borderCapStyle: i.borderCapStyle,
    borderDash: i.borderDash,
    borderDashOffset: i.borderDashOffset,
    borderJoinStyle: i.borderJoinStyle,
    borderWidth: i.borderWidth,
    borderColor: i.borderColor
  };
}
function Ka(i, t) {
  if (!t)
    return !1;
  const e = [], s = function(n, o) {
    return Xi(o) ? (e.includes(o) || e.push(o), e.indexOf(o)) : o;
  };
  return JSON.stringify(i, s) !== JSON.stringify(t, s);
}
function Re(i, t, e) {
  return i.options.clip ? i[e] : t[e];
}
function Ga(i, t) {
  const { xScale: e, yScale: s } = i;
  return e && s ? {
    left: Re(e, t, "left"),
    right: Re(e, t, "right"),
    top: Re(s, t, "top"),
    bottom: Re(s, t, "bottom")
  } : t;
}
function lo(i, t) {
  const e = t._clip;
  if (e.disabled)
    return !1;
  const s = Ga(t, i.chartArea);
  return {
    left: e.left === !1 ? 0 : s.left - (e.left === !0 ? 0 : e.left),
    right: e.right === !1 ? i.width : s.right + (e.right === !0 ? 0 : e.right),
    top: e.top === !1 ? 0 : s.top - (e.top === !0 ? 0 : e.top),
    bottom: e.bottom === !1 ? i.height : s.bottom + (e.bottom === !0 ? 0 : e.bottom)
  };
}
/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
class Za {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, e, s, n) {
    const o = e.listeners[n], r = e.duration;
    o.forEach((a) => a({
      chart: t,
      initial: e.initial,
      numSteps: r,
      currentStep: Math.min(s - e.start, r)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = Un.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let e = 0;
    this._charts.forEach((s, n) => {
      if (!s.running || !s.items.length)
        return;
      const o = s.items;
      let r = o.length - 1, a = !1, l;
      for (; r >= 0; --r)
        l = o[r], l._active ? (l._total > s.duration && (s.duration = l._total), l.tick(t), a = !0) : (o[r] = o[o.length - 1], o.pop());
      a && (n.draw(), this._notify(n, s, t, "progress")), o.length || (s.running = !1, this._notify(n, s, t, "complete"), s.initial = !1), e += o.length;
    }), this._lastDate = t, e === 0 && (this._running = !1);
  }
  _getAnims(t) {
    const e = this._charts;
    let s = e.get(t);
    return s || (s = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, e.set(t, s)), s;
  }
  listen(t, e, s) {
    this._getAnims(t).listeners[e].push(s);
  }
  add(t, e) {
    !e || !e.length || this._getAnims(t).items.push(...e);
  }
  has(t) {
    return this._getAnims(t).items.length > 0;
  }
  start(t) {
    const e = this._charts.get(t);
    e && (e.running = !0, e.start = Date.now(), e.duration = e.items.reduce((s, n) => Math.max(s, n._duration), 0), this._refresh());
  }
  running(t) {
    if (!this._running)
      return !1;
    const e = this._charts.get(t);
    return !(!e || !e.running || !e.items.length);
  }
  stop(t) {
    const e = this._charts.get(t);
    if (!e || !e.items.length)
      return;
    const s = e.items;
    let n = s.length - 1;
    for (; n >= 0; --n)
      s[n].cancel();
    e.items = [], this._notify(t, e, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var ot = /* @__PURE__ */ new Za();
const Rs = "transparent", Qa = {
  boolean(i, t, e) {
    return e > 0.5 ? t : i;
  },
  color(i, t, e) {
    const s = Ms(i || Rs), n = s.valid && Ms(t || Rs);
    return n && n.valid ? n.mix(s, e).hexString() : t;
  },
  number(i, t, e) {
    return i + (t - i) * e;
  }
};
class Ja {
  constructor(t, e, s, n) {
    const o = e[s];
    n = Le([
      t.to,
      n,
      o,
      t.from
    ]);
    const r = Le([
      t.from,
      o,
      n
    ]);
    this._active = !0, this._fn = t.fn || Qa[t.type || typeof r], this._easing = de[t.easing] || de.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = e, this._prop = s, this._from = r, this._to = n, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, e, s) {
    if (this._active) {
      this._notify(!1);
      const n = this._target[this._prop], o = s - this._start, r = this._duration - o;
      this._start = s, this._duration = Math.floor(Math.max(r, t.duration)), this._total += o, this._loop = !!t.loop, this._to = Le([
        t.to,
        e,
        n,
        t.from
      ]), this._from = Le([
        t.from,
        n,
        e
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const e = t - this._start, s = this._duration, n = this._prop, o = this._from, r = this._loop, a = this._to;
    let l;
    if (this._active = o !== a && (r || e < s), !this._active) {
      this._target[n] = a, this._notify(!0);
      return;
    }
    if (e < 0) {
      this._target[n] = o;
      return;
    }
    l = e / s % 2, l = r && l > 1 ? 2 - l : l, l = this._easing(Math.min(1, Math.max(0, l))), this._target[n] = this._fn(o, a, l);
  }
  wait() {
    const t = this._promises || (this._promises = []);
    return new Promise((e, s) => {
      t.push({
        res: e,
        rej: s
      });
    });
  }
  _notify(t) {
    const e = t ? "res" : "rej", s = this._promises || [];
    for (let n = 0; n < s.length; n++)
      s[n][e]();
  }
}
class co {
  constructor(t, e) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(e);
  }
  configure(t) {
    if (!O(t))
      return;
    const e = Object.keys(F.animation), s = this._properties;
    Object.getOwnPropertyNames(t).forEach((n) => {
      const o = t[n];
      if (!O(o))
        return;
      const r = {};
      for (const a of e)
        r[a] = o[a];
      (z(o.properties) && o.properties || [
        n
      ]).forEach((a) => {
        (a === n || !s.has(a)) && s.set(a, r);
      });
    });
  }
  _animateOptions(t, e) {
    const s = e.options, n = el(t, s);
    if (!n)
      return [];
    const o = this._createAnimations(n, s);
    return s.$shared && tl(t.options.$animations, s).then(() => {
      t.options = s;
    }, () => {
    }), o;
  }
  _createAnimations(t, e) {
    const s = this._properties, n = [], o = t.$animations || (t.$animations = {}), r = Object.keys(e), a = Date.now();
    let l;
    for (l = r.length - 1; l >= 0; --l) {
      const c = r[l];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        n.push(...this._animateOptions(t, e));
        continue;
      }
      const h = e[c];
      let d = o[c];
      const f = s.get(c);
      if (d)
        if (f && d.active()) {
          d.update(f, h, a);
          continue;
        } else
          d.cancel();
      if (!f || !f.duration) {
        t[c] = h;
        continue;
      }
      o[c] = d = new Ja(f, t, c, h), n.push(d);
    }
    return n;
  }
  update(t, e) {
    if (this._properties.size === 0) {
      Object.assign(t, e);
      return;
    }
    const s = this._createAnimations(t, e);
    if (s.length)
      return ot.add(this._chart, s), !0;
  }
}
function tl(i, t) {
  const e = [], s = Object.keys(t);
  for (let n = 0; n < s.length; n++) {
    const o = i[s[n]];
    o && o.active() && e.push(o.wait());
  }
  return Promise.all(e);
}
function el(i, t) {
  if (!t)
    return;
  let e = i.options;
  if (!e) {
    i.options = t;
    return;
  }
  return e.$shared && (i.options = e = Object.assign({}, e, {
    $shared: !1,
    $animations: {}
  })), e;
}
function Fs(i, t) {
  const e = i && i.options || {}, s = e.reverse, n = e.min === void 0 ? t : 0, o = e.max === void 0 ? t : 0;
  return {
    start: s ? o : n,
    end: s ? n : o
  };
}
function il(i, t, e) {
  if (e === !1)
    return !1;
  const s = Fs(i, e), n = Fs(t, e);
  return {
    top: n.end,
    right: s.end,
    bottom: n.start,
    left: s.start
  };
}
function sl(i) {
  let t, e, s, n;
  return O(i) ? (t = i.top, e = i.right, s = i.bottom, n = i.left) : t = e = s = n = i, {
    top: t,
    right: e,
    bottom: s,
    left: n,
    disabled: i === !1
  };
}
function ho(i, t) {
  const e = [], s = i._getSortedDatasetMetas(t);
  let n, o;
  for (n = 0, o = s.length; n < o; ++n)
    e.push(s[n].index);
  return e;
}
function zs(i, t, e, s = {}) {
  const n = i.keys, o = s.mode === "single";
  let r, a, l, c;
  if (t === null)
    return;
  let h = !1;
  for (r = 0, a = n.length; r < a; ++r) {
    if (l = +n[r], l === e) {
      if (h = !0, s.all)
        continue;
      break;
    }
    c = i.values[l], N(c) && (o || t === 0 || Vt(t) === Vt(c)) && (t += c);
  }
  return !h && !s.all ? 0 : t;
}
function nl(i, t) {
  const { iScale: e, vScale: s } = t, n = e.axis === "x" ? "x" : "y", o = s.axis === "x" ? "x" : "y", r = Object.keys(i), a = new Array(r.length);
  let l, c, h;
  for (l = 0, c = r.length; l < c; ++l)
    h = r[l], a[l] = {
      [n]: h,
      [o]: i[h]
    };
  return a;
}
function mi(i, t) {
  const e = i && i.options.stacked;
  return e || e === void 0 && t.stack !== void 0;
}
function ol(i, t, e) {
  return `${i.id}.${t.id}.${e.stack || e.type}`;
}
function rl(i) {
  const { min: t, max: e, minDefined: s, maxDefined: n } = i.getUserBounds();
  return {
    min: s ? t : Number.NEGATIVE_INFINITY,
    max: n ? e : Number.POSITIVE_INFINITY
  };
}
function al(i, t, e) {
  const s = i[t] || (i[t] = {});
  return s[e] || (s[e] = {});
}
function Hs(i, t, e, s) {
  for (const n of t.getMatchingVisibleMetas(s).reverse()) {
    const o = i[n.index];
    if (e && o > 0 || !e && o < 0)
      return n.index;
  }
  return null;
}
function Bs(i, t) {
  const { chart: e, _cachedMeta: s } = i, n = e._stacks || (e._stacks = {}), { iScale: o, vScale: r, index: a } = s, l = o.axis, c = r.axis, h = ol(o, r, s), d = t.length;
  let f;
  for (let u = 0; u < d; ++u) {
    const p = t[u], { [l]: g, [c]: m } = p, _ = p._stacks || (p._stacks = {});
    f = _[c] = al(n, h, g), f[a] = m, f._top = Hs(f, r, !0, s.type), f._bottom = Hs(f, r, !1, s.type);
    const y = f._visualValues || (f._visualValues = {});
    y[a] = m;
  }
}
function _i(i, t) {
  const e = i.scales;
  return Object.keys(e).filter((s) => e[s].axis === t).shift();
}
function ll(i, t) {
  return Lt(i, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function cl(i, t, e) {
  return Lt(i, {
    active: !1,
    dataIndex: t,
    parsed: void 0,
    raw: void 0,
    element: e,
    index: t,
    mode: "default",
    type: "data"
  });
}
function Qt(i, t) {
  const e = i.controller.index, s = i.vScale && i.vScale.axis;
  if (s) {
    t = t || i._parsed;
    for (const n of t) {
      const o = n._stacks;
      if (!o || o[s] === void 0 || o[s][e] === void 0)
        return;
      delete o[s][e], o[s]._visualValues !== void 0 && o[s]._visualValues[e] !== void 0 && delete o[s]._visualValues[e];
    }
  }
}
const bi = (i) => i === "reset" || i === "none", Ns = (i, t) => t ? i : Object.assign({}, i), hl = (i, t, e) => i && !t.hidden && t._stacked && {
  keys: ho(e, !0),
  values: null
};
class ge {
  constructor(t, e) {
    this.chart = t, this._ctx = t.ctx, this.index = e, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = mi(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && Qt(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, e = this._cachedMeta, s = this.getDataset(), n = (d, f, u, p) => d === "x" ? f : d === "r" ? p : u, o = e.xAxisID = C(s.xAxisID, _i(t, "x")), r = e.yAxisID = C(s.yAxisID, _i(t, "y")), a = e.rAxisID = C(s.rAxisID, _i(t, "r")), l = e.indexAxis, c = e.iAxisID = n(l, o, r, a), h = e.vAxisID = n(l, r, o, a);
    e.xScale = this.getScaleForId(o), e.yScale = this.getScaleForId(r), e.rScale = this.getScaleForId(a), e.iScale = this.getScaleForId(c), e.vScale = this.getScaleForId(h);
  }
  getDataset() {
    return this.chart.data.datasets[this.index];
  }
  getMeta() {
    return this.chart.getDatasetMeta(this.index);
  }
  getScaleForId(t) {
    return this.chart.scales[t];
  }
  _getOtherScale(t) {
    const e = this._cachedMeta;
    return t === e.iScale ? e.vScale : e.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const t = this._cachedMeta;
    this._data && ws(this._data, this), t._stacked && Qt(t);
  }
  _dataCheck() {
    const t = this.getDataset(), e = t.data || (t.data = []), s = this._data;
    if (O(e)) {
      const n = this._cachedMeta;
      this._data = nl(e, n);
    } else if (s !== e) {
      if (s) {
        ws(s, this);
        const n = this._cachedMeta;
        Qt(n), n._parsed = [];
      }
      e && Object.isExtensible(e) && Vr(e, this), this._syncList = [], this._data = e;
    }
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const e = this._cachedMeta, s = this.getDataset();
    let n = !1;
    this._dataCheck();
    const o = e._stacked;
    e._stacked = mi(e.vScale, e), e.stack !== s.stack && (n = !0, Qt(e), e.stack = s.stack), this._resyncElements(t), (n || o !== e._stacked) && (Bs(this, e._parsed), e._stacked = mi(e.vScale, e));
  }
  configure() {
    const t = this.chart.config, e = t.datasetScopeKeys(this._type), s = t.getOptionScopes(this.getDataset(), e, !0);
    this.options = t.createResolver(s, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, e) {
    const { _cachedMeta: s, _data: n } = this, { iScale: o, _stacked: r } = s, a = o.axis;
    let l = t === 0 && e === n.length ? !0 : s._sorted, c = t > 0 && s._parsed[t - 1], h, d, f;
    if (this._parsing === !1)
      s._parsed = n, s._sorted = !0, f = n;
    else {
      z(n[t]) ? f = this.parseArrayData(s, n, t, e) : O(n[t]) ? f = this.parseObjectData(s, n, t, e) : f = this.parsePrimitiveData(s, n, t, e);
      const u = () => d[a] === null || c && d[a] < c[a];
      for (h = 0; h < e; ++h)
        s._parsed[h + t] = d = f[h], l && (u() && (l = !1), c = d);
      s._sorted = l;
    }
    r && Bs(this, f);
  }
  parsePrimitiveData(t, e, s, n) {
    const { iScale: o, vScale: r } = t, a = o.axis, l = r.axis, c = o.getLabels(), h = o === r, d = new Array(n);
    let f, u, p;
    for (f = 0, u = n; f < u; ++f)
      p = f + s, d[f] = {
        [a]: h || o.parse(c[p], p),
        [l]: r.parse(e[p], p)
      };
    return d;
  }
  parseArrayData(t, e, s, n) {
    const { xScale: o, yScale: r } = t, a = new Array(n);
    let l, c, h, d;
    for (l = 0, c = n; l < c; ++l)
      h = l + s, d = e[h], a[l] = {
        x: o.parse(d[0], h),
        y: r.parse(d[1], h)
      };
    return a;
  }
  parseObjectData(t, e, s, n) {
    const { xScale: o, yScale: r } = t, { xAxisKey: a = "x", yAxisKey: l = "y" } = this._parsing, c = new Array(n);
    let h, d, f, u;
    for (h = 0, d = n; h < d; ++h)
      f = h + s, u = e[f], c[h] = {
        x: o.parse(Qe(u, a), f),
        y: r.parse(Qe(u, l), f)
      };
    return c;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, e, s) {
    const n = this.chart, o = this._cachedMeta, r = e[t.axis], a = {
      keys: ho(n, !0),
      values: e._stacks[t.axis]._visualValues
    };
    return zs(a, r, o.index, {
      mode: s
    });
  }
  updateRangeFromParsed(t, e, s, n) {
    const o = s[e.axis];
    let r = o === null ? NaN : o;
    const a = n && s._stacks[e.axis];
    n && a && (n.values = a, r = zs(n, o, this._cachedMeta.index)), t.min = Math.min(t.min, r), t.max = Math.max(t.max, r);
  }
  getMinMax(t, e) {
    const s = this._cachedMeta, n = s._parsed, o = s._sorted && t === s.iScale, r = n.length, a = this._getOtherScale(t), l = hl(e, s, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: h, max: d } = rl(a);
    let f, u;
    function p() {
      u = n[f];
      const g = u[a.axis];
      return !N(u[t.axis]) || h > g || d < g;
    }
    for (f = 0; f < r && !(!p() && (this.updateRangeFromParsed(c, t, u, l), o)); ++f)
      ;
    if (o) {
      for (f = r - 1; f >= 0; --f)
        if (!p()) {
          this.updateRangeFromParsed(c, t, u, l);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const e = this._cachedMeta._parsed, s = [];
    let n, o, r;
    for (n = 0, o = e.length; n < o; ++n)
      r = e[n][t.axis], N(r) && s.push(r);
    return s;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, s = e.iScale, n = e.vScale, o = this.getParsed(t);
    return {
      label: s ? "" + s.getLabelForValue(o[s.axis]) : "",
      value: n ? "" + n.getLabelForValue(o[n.axis]) : ""
    };
  }
  _update(t) {
    const e = this._cachedMeta;
    this.update(t || "default"), e._clip = sl(C(this.options.clip, il(e.xScale, e.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, e = this.chart, s = this._cachedMeta, n = s.data || [], o = e.chartArea, r = [], a = this._drawStart || 0, l = this._drawCount || n.length - a, c = this.options.drawActiveElementsOnTop;
    let h;
    for (s.dataset && s.dataset.draw(t, o, a, l), h = a; h < a + l; ++h) {
      const d = n[h];
      d.hidden || (d.active && c ? r.push(d) : d.draw(t, o));
    }
    for (h = 0; h < r.length; ++h)
      r[h].draw(t, o);
  }
  getStyle(t, e) {
    const s = e ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(s) : this.resolveDataElementOptions(t || 0, s);
  }
  getContext(t, e, s) {
    const n = this.getDataset();
    let o;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const r = this._cachedMeta.data[t];
      o = r.$context || (r.$context = cl(this.getContext(), t, r)), o.parsed = this.getParsed(t), o.raw = n.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = ll(this.chart.getContext(), this.index)), o.dataset = n, o.index = o.datasetIndex = this.index;
    return o.active = !!e, o.mode = s, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, e) {
    return this._resolveElementOptions(this.dataElementType.id, e, t);
  }
  _resolveElementOptions(t, e = "default", s) {
    const n = e === "active", o = this._cachedDataOpts, r = t + "-" + e, a = o[r], l = this.enableOptionSharing && Je(s);
    if (a)
      return Ns(a, l);
    const c = this.chart.config, h = c.datasetElementScopeKeys(this._type, t), d = n ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], f = c.getOptionScopes(this.getDataset(), h), u = Object.keys(F.elements[t]), p = () => this.getContext(s, n, e), g = c.resolveNamedOptions(f, u, p, d);
    return g.$shared && (g.$shared = l, o[r] = Object.freeze(Ns(g, l))), g;
  }
  _resolveAnimations(t, e, s) {
    const n = this.chart, o = this._cachedDataOpts, r = `animation-${e}`, a = o[r];
    if (a)
      return a;
    let l;
    if (n.options.animation !== !1) {
      const h = this.chart.config, d = h.datasetAnimationScopeKeys(this._type, e), f = h.getOptionScopes(this.getDataset(), d);
      l = h.createResolver(f, this.getContext(t, s, e));
    }
    const c = new co(n, l && l.animations);
    return l && l._cacheable && (o[r] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, e) {
    return !e || bi(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, e) {
    const s = this.resolveDataElementOptions(t, e), n = this._sharedOptions, o = this.getSharedOptions(s), r = this.includeOptions(e, o) || o !== n;
    return this.updateSharedOptions(o, e, s), {
      sharedOptions: o,
      includeOptions: r
    };
  }
  updateElement(t, e, s, n) {
    bi(n) ? Object.assign(t, s) : this._resolveAnimations(e, n).update(t, s);
  }
  updateSharedOptions(t, e, s) {
    t && !bi(e) && this._resolveAnimations(void 0, e).update(t, s);
  }
  _setStyle(t, e, s, n) {
    t.active = n;
    const o = this.getStyle(e, n);
    this._resolveAnimations(e, s, n).update(t, {
      options: !n && this.getSharedOptions(o) || o
    });
  }
  removeHoverStyle(t, e, s) {
    this._setStyle(t, s, "active", !1);
  }
  setHoverStyle(t, e, s) {
    this._setStyle(t, s, "active", !0);
  }
  _removeDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !1);
  }
  _setDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !0);
  }
  _resyncElements(t) {
    const e = this._data, s = this._cachedMeta.data;
    for (const [a, l, c] of this._syncList)
      this[a](l, c);
    this._syncList = [];
    const n = s.length, o = e.length, r = Math.min(o, n);
    r && this.parse(0, r), o > n ? this._insertElements(n, o - n, t) : o < n && this._removeElements(o, n - o);
  }
  _insertElements(t, e, s = !0) {
    const n = this._cachedMeta, o = n.data, r = t + e;
    let a;
    const l = (c) => {
      for (c.length += e, a = c.length - 1; a >= r; a--)
        c[a] = c[a - e];
    };
    for (l(o), a = t; a < r; ++a)
      o[a] = new this.dataElementType();
    this._parsing && l(n._parsed), this.parse(t, e), s && this.updateElements(o, t, e, "reset");
  }
  updateElements(t, e, s, n) {
  }
  _removeElements(t, e) {
    const s = this._cachedMeta;
    if (this._parsing) {
      const n = s._parsed.splice(t, e);
      s._stacked && Qt(s, n);
    }
    s.data.splice(t, e);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [e, s, n] = t;
      this[e](s, n);
    }
    this.chart._dataChanges.push([
      this.index,
      ...t
    ]);
  }
  _onDataPush() {
    const t = arguments.length;
    this._sync([
      "_insertElements",
      this.getDataset().data.length - t,
      t
    ]);
  }
  _onDataPop() {
    this._sync([
      "_removeElements",
      this._cachedMeta.data.length - 1,
      1
    ]);
  }
  _onDataShift() {
    this._sync([
      "_removeElements",
      0,
      1
    ]);
  }
  _onDataSplice(t, e) {
    e && this._sync([
      "_removeElements",
      t,
      e
    ]);
    const s = arguments.length - 2;
    s && this._sync([
      "_insertElements",
      t,
      s
    ]);
  }
  _onDataUnshift() {
    this._sync([
      "_insertElements",
      0,
      arguments.length
    ]);
  }
}
A(ge, "defaults", {}), A(ge, "datasetElementType", null), A(ge, "dataElementType", null);
class Ve extends ge {
  initialize() {
    this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
  }
  update(t) {
    const e = this._cachedMeta, { dataset: s, data: n = [], _dataset: o } = e, r = this.chart._animationsDisabled;
    let { start: a, count: l } = qr(e, n, r);
    this._drawStart = a, this._drawCount = l, Kr(e) && (a = 0, l = n.length), s._chart = this.chart, s._datasetIndex = this.index, s._decimated = !!o._decimated, s.points = n;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(s, void 0, {
      animated: !r,
      options: c
    }, t), this.updateElements(n, a, l, t);
  }
  updateElements(t, e, s, n) {
    const o = n === "reset", { iScale: r, vScale: a, _stacked: l, _dataset: c } = this._cachedMeta, { sharedOptions: h, includeOptions: d } = this._getSharedOptions(e, n), f = r.axis, u = a.axis, { spanGaps: p, segment: g } = this.options, m = xe(p) ? p : Number.POSITIVE_INFINITY, _ = this.chart._animationsDisabled || o || n === "none", y = e + s, v = t.length;
    let w = e > 0 && this.getParsed(e - 1);
    for (let b = 0; b < v; ++b) {
      const k = t[b], S = _ ? k : {};
      if (b < e || b >= y) {
        S.skip = !0;
        continue;
      }
      const x = this.getParsed(b), M = $(x[u]), T = S[f] = r.getPixelForValue(x[f], b), P = S[u] = o || M ? a.getBasePixel() : a.getPixelForValue(l ? this.applyStack(a, x, l) : x[u], b);
      S.skip = isNaN(T) || isNaN(P) || M, S.stop = b > 0 && Math.abs(x[f] - w[f]) > m, g && (S.parsed = x, S.raw = c.data[b]), d && (S.options = h || this.resolveDataElementOptions(b, k.active ? "active" : n)), _ || this.updateElement(k, b, S, n), w = x;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, e = t.dataset, s = e.options && e.options.borderWidth || 0, n = t.data || [];
    if (!n.length)
      return s;
    const o = n[0].size(this.resolveDataElementOptions(0)), r = n[n.length - 1].size(this.resolveDataElementOptions(n.length - 1));
    return Math.max(s, o, r) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
A(Ve, "id", "line"), A(Ve, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  showLine: !0,
  spanGaps: !1
}), A(Ve, "overrides", {
  scales: {
    _index_: {
      type: "category"
    },
    _value_: {
      type: "linear"
    }
  }
});
function kt() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class Ji {
  constructor(t) {
    A(this, "options");
    this.options = t || {};
  }
  /**
  * Override default date adapter methods.
  * Accepts type parameter to define options type.
  * @example
  * Chart._adapters._date.override<{myAdapterOption: string}>({
  *   init() {
  *     console.log(this.options.myAdapterOption);
  *   }
  * })
  */
  static override(t) {
    Object.assign(Ji.prototype, t);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return kt();
  }
  parse() {
    return kt();
  }
  format() {
    return kt();
  }
  add() {
    return kt();
  }
  diff() {
    return kt();
  }
  startOf() {
    return kt();
  }
  endOf() {
    return kt();
  }
}
var dl = {
  _date: Ji
};
function fl(i, t, e, s) {
  const { controller: n, data: o, _sorted: r } = i, a = n._cachedMeta.iScale, l = i.dataset && i.dataset.options ? i.dataset.options.spanGaps : null;
  if (a && t === a.axis && t !== "r" && r && o.length) {
    const c = a._reversePixels ? Wr : Tt;
    if (s) {
      if (n._sharedOptions) {
        const h = o[0], d = typeof h.getRange == "function" && h.getRange(t);
        if (d) {
          const f = c(o, t, e - d), u = c(o, t, e + d);
          return {
            lo: f.lo,
            hi: u.hi
          };
        }
      }
    } else {
      const h = c(o, t, e);
      if (l) {
        const { vScale: d } = n._cachedMeta, { _parsed: f } = i, u = f.slice(0, h.lo + 1).reverse().findIndex((g) => !$(g[d.axis]));
        h.lo -= Math.max(0, u);
        const p = f.slice(h.hi).findIndex((g) => !$(g[d.axis]));
        h.hi += Math.max(0, p);
      }
      return h;
    }
  }
  return {
    lo: 0,
    hi: o.length - 1
  };
}
function ci(i, t, e, s, n) {
  const o = i.getSortedVisibleDatasetMetas(), r = e[t];
  for (let a = 0, l = o.length; a < l; ++a) {
    const { index: c, data: h } = o[a], { lo: d, hi: f } = fl(o[a], t, r, n);
    for (let u = d; u <= f; ++u) {
      const p = h[u];
      p.skip || s(p, c, u);
    }
  }
}
function ul(i) {
  const t = i.indexOf("x") !== -1, e = i.indexOf("y") !== -1;
  return function(s, n) {
    const o = t ? Math.abs(s.x - n.x) : 0, r = e ? Math.abs(s.y - n.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(r, 2));
  };
}
function yi(i, t, e, s, n) {
  const o = [];
  return !n && !i.isPointInArea(t) || ci(i, e, t, function(a, l, c) {
    !n && !ve(a, i.chartArea, 0) || a.inRange(t.x, t.y, s) && o.push({
      element: a,
      datasetIndex: l,
      index: c
    });
  }, !0), o;
}
function gl(i, t, e, s) {
  let n = [];
  function o(r, a, l) {
    const { startAngle: c, endAngle: h } = r.getProps([
      "startAngle",
      "endAngle"
    ], s), { angle: d } = Hr(r, {
      x: t.x,
      y: t.y
    });
    jn(d, c, h) && n.push({
      element: r,
      datasetIndex: a,
      index: l
    });
  }
  return ci(i, e, t, o), n;
}
function pl(i, t, e, s, n, o) {
  let r = [];
  const a = ul(e);
  let l = Number.POSITIVE_INFINITY;
  function c(h, d, f) {
    const u = h.inRange(t.x, t.y, n);
    if (s && !u)
      return;
    const p = h.getCenterPoint(n);
    if (!(!!o || i.isPointInArea(p)) && !u)
      return;
    const m = a(t, p);
    m < l ? (r = [
      {
        element: h,
        datasetIndex: d,
        index: f
      }
    ], l = m) : m === l && r.push({
      element: h,
      datasetIndex: d,
      index: f
    });
  }
  return ci(i, e, t, c), r;
}
function xi(i, t, e, s, n, o) {
  return !o && !i.isPointInArea(t) ? [] : e === "r" && !s ? gl(i, t, e, n) : pl(i, t, e, s, n, o);
}
function Ws(i, t, e, s, n) {
  const o = [], r = e === "x" ? "inXRange" : "inYRange";
  let a = !1;
  return ci(i, e, t, (l, c, h) => {
    l[r] && l[r](t[e], n) && (o.push({
      element: l,
      datasetIndex: c,
      index: h
    }), a = a || l.inRange(t.x, t.y, n));
  }), s && !a ? [] : o;
}
var ml = {
  modes: {
    index(i, t, e, s) {
      const n = Mt(t, i), o = e.axis || "x", r = e.includeInvisible || !1, a = e.intersect ? yi(i, n, o, s, r) : xi(i, n, o, !1, s, r), l = [];
      return a.length ? (i.getSortedVisibleDatasetMetas().forEach((c) => {
        const h = a[0].index, d = c.data[h];
        d && !d.skip && l.push({
          element: d,
          datasetIndex: c.index,
          index: h
        });
      }), l) : [];
    },
    dataset(i, t, e, s) {
      const n = Mt(t, i), o = e.axis || "xy", r = e.includeInvisible || !1;
      let a = e.intersect ? yi(i, n, o, s, r) : xi(i, n, o, !1, s, r);
      if (a.length > 0) {
        const l = a[0].datasetIndex, c = i.getDatasetMeta(l).data;
        a = [];
        for (let h = 0; h < c.length; ++h)
          a.push({
            element: c[h],
            datasetIndex: l,
            index: h
          });
      }
      return a;
    },
    point(i, t, e, s) {
      const n = Mt(t, i), o = e.axis || "xy", r = e.includeInvisible || !1;
      return yi(i, n, o, s, r);
    },
    nearest(i, t, e, s) {
      const n = Mt(t, i), o = e.axis || "xy", r = e.includeInvisible || !1;
      return xi(i, n, o, e.intersect, s, r);
    },
    x(i, t, e, s) {
      const n = Mt(t, i);
      return Ws(i, n, "x", e.intersect, s);
    },
    y(i, t, e, s) {
      const n = Mt(t, i);
      return Ws(i, n, "y", e.intersect, s);
    }
  }
};
const fo = [
  "left",
  "top",
  "right",
  "bottom"
];
function Jt(i, t) {
  return i.filter((e) => e.pos === t);
}
function js(i, t) {
  return i.filter((e) => fo.indexOf(e.pos) === -1 && e.box.axis === t);
}
function te(i, t) {
  return i.sort((e, s) => {
    const n = t ? s : e, o = t ? e : s;
    return n.weight === o.weight ? n.index - o.index : n.weight - o.weight;
  });
}
function _l(i) {
  const t = [];
  let e, s, n, o, r, a;
  for (e = 0, s = (i || []).length; e < s; ++e)
    n = i[e], { position: o, options: { stack: r, stackWeight: a = 1 } } = n, t.push({
      index: e,
      box: n,
      pos: o,
      horizontal: n.isHorizontal(),
      weight: n.weight,
      stack: r && o + r,
      stackWeight: a
    });
  return t;
}
function bl(i) {
  const t = {};
  for (const e of i) {
    const { stack: s, pos: n, stackWeight: o } = e;
    if (!s || !fo.includes(n))
      continue;
    const r = t[s] || (t[s] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    r.count++, r.weight += o;
  }
  return t;
}
function yl(i, t) {
  const e = bl(i), { vBoxMaxWidth: s, hBoxMaxHeight: n } = t;
  let o, r, a;
  for (o = 0, r = i.length; o < r; ++o) {
    a = i[o];
    const { fullSize: l } = a.box, c = e[a.stack], h = c && a.stackWeight / c.weight;
    a.horizontal ? (a.width = h ? h * s : l && t.availableWidth, a.height = n) : (a.width = s, a.height = h ? h * n : l && t.availableHeight);
  }
  return e;
}
function xl(i) {
  const t = _l(i), e = te(t.filter((c) => c.box.fullSize), !0), s = te(Jt(t, "left"), !0), n = te(Jt(t, "right")), o = te(Jt(t, "top"), !0), r = te(Jt(t, "bottom")), a = js(t, "x"), l = js(t, "y");
  return {
    fullSize: e,
    leftAndTop: s.concat(o),
    rightAndBottom: n.concat(l).concat(r).concat(a),
    chartArea: Jt(t, "chartArea"),
    vertical: s.concat(n).concat(l),
    horizontal: o.concat(r).concat(a)
  };
}
function Vs(i, t, e, s) {
  return Math.max(i[e], t[e]) + Math.max(i[s], t[s]);
}
function uo(i, t) {
  i.top = Math.max(i.top, t.top), i.left = Math.max(i.left, t.left), i.bottom = Math.max(i.bottom, t.bottom), i.right = Math.max(i.right, t.right);
}
function vl(i, t, e, s) {
  const { pos: n, box: o } = e, r = i.maxPadding;
  if (!O(n)) {
    e.size && (i[n] -= e.size);
    const d = s[e.stack] || {
      size: 0,
      count: 1
    };
    d.size = Math.max(d.size, e.horizontal ? o.height : o.width), e.size = d.size / d.count, i[n] += e.size;
  }
  o.getPadding && uo(r, o.getPadding());
  const a = Math.max(0, t.outerWidth - Vs(r, i, "left", "right")), l = Math.max(0, t.outerHeight - Vs(r, i, "top", "bottom")), c = a !== i.w, h = l !== i.h;
  return i.w = a, i.h = l, e.horizontal ? {
    same: c,
    other: h
  } : {
    same: h,
    other: c
  };
}
function wl(i) {
  const t = i.maxPadding;
  function e(s) {
    const n = Math.max(t[s] - i[s], 0);
    return i[s] += n, n;
  }
  i.y += e("top"), i.x += e("left"), e("right"), e("bottom");
}
function Sl(i, t) {
  const e = t.maxPadding;
  function s(n) {
    const o = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return n.forEach((r) => {
      o[r] = Math.max(t[r], e[r]);
    }), o;
  }
  return s(i ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function ne(i, t, e, s) {
  const n = [];
  let o, r, a, l, c, h;
  for (o = 0, r = i.length, c = 0; o < r; ++o) {
    a = i[o], l = a.box, l.update(a.width || t.w, a.height || t.h, Sl(a.horizontal, t));
    const { same: d, other: f } = vl(t, e, a, s);
    c |= d && n.length, h = h || f, l.fullSize || n.push(a);
  }
  return c && ne(n, t, e, s) || h;
}
function Fe(i, t, e, s, n) {
  i.top = e, i.left = t, i.right = t + s, i.bottom = e + n, i.width = s, i.height = n;
}
function Us(i, t, e, s) {
  const n = e.padding;
  let { x: o, y: r } = t;
  for (const a of i) {
    const l = a.box, c = s[a.stack] || {
      placed: 0,
      weight: 1
    }, h = a.stackWeight / c.weight || 1;
    if (a.horizontal) {
      const d = t.w * h, f = c.size || l.height;
      Je(c.start) && (r = c.start), l.fullSize ? Fe(l, n.left, r, e.outerWidth - n.right - n.left, f) : Fe(l, t.left + c.placed, r, d, f), c.start = r, c.placed += d, r = l.bottom;
    } else {
      const d = t.h * h, f = c.size || l.width;
      Je(c.start) && (o = c.start), l.fullSize ? Fe(l, o, n.top, f, e.outerHeight - n.bottom - n.top) : Fe(l, o, t.top + c.placed, f, d), c.start = o, c.placed += d, o = l.right;
    }
  }
  t.x = o, t.y = r;
}
var ft = {
  addBox(i, t) {
    i.boxes || (i.boxes = []), t.fullSize = t.fullSize || !1, t.position = t.position || "top", t.weight = t.weight || 0, t._layers = t._layers || function() {
      return [
        {
          z: 0,
          draw(e) {
            t.draw(e);
          }
        }
      ];
    }, i.boxes.push(t);
  },
  removeBox(i, t) {
    const e = i.boxes ? i.boxes.indexOf(t) : -1;
    e !== -1 && i.boxes.splice(e, 1);
  },
  configure(i, t, e) {
    t.fullSize = e.fullSize, t.position = e.position, t.weight = e.weight;
  },
  update(i, t, e, s) {
    if (!i)
      return;
    const n = Q(i.options.layout.padding), o = Math.max(t - n.width, 0), r = Math.max(e - n.height, 0), a = xl(i.boxes), l = a.vertical, c = a.horizontal;
    E(i.boxes, (g) => {
      typeof g.beforeLayout == "function" && g.beforeLayout();
    });
    const h = l.reduce((g, m) => m.box.options && m.box.options.display === !1 ? g : g + 1, 0) || 1, d = Object.freeze({
      outerWidth: t,
      outerHeight: e,
      padding: n,
      availableWidth: o,
      availableHeight: r,
      vBoxMaxWidth: o / 2 / h,
      hBoxMaxHeight: r / 2
    }), f = Object.assign({}, n);
    uo(f, Q(s));
    const u = Object.assign({
      maxPadding: f,
      w: o,
      h: r,
      x: n.left,
      y: n.top
    }, n), p = yl(l.concat(c), d);
    ne(a.fullSize, u, d, p), ne(l, u, d, p), ne(c, u, d, p) && ne(l, u, d, p), wl(u), Us(a.leftAndTop, u, d, p), u.x += u.w, u.y += u.h, Us(a.rightAndBottom, u, d, p), i.chartArea = {
      left: u.left,
      top: u.top,
      right: u.left + u.w,
      bottom: u.top + u.h,
      height: u.h,
      width: u.w
    }, E(a.chartArea, (g) => {
      const m = g.box;
      Object.assign(m, i.chartArea), m.update(u.w, u.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class go {
  acquireContext(t, e) {
  }
  releaseContext(t) {
    return !1;
  }
  addEventListener(t, e, s) {
  }
  removeEventListener(t, e, s) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(t, e, s, n) {
    return e = Math.max(0, e || t.width), s = s || t.height, {
      width: e,
      height: Math.max(0, n ? Math.floor(e / n) : s)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class kl extends go {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const Ue = "$chartjs", Ml = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, Ys = (i) => i === null || i === "";
function Al(i, t) {
  const e = i.style, s = i.getAttribute("height"), n = i.getAttribute("width");
  if (i[Ue] = {
    initial: {
      height: s,
      width: n,
      style: {
        display: e.display,
        height: e.height,
        width: e.width
      }
    }
  }, e.display = e.display || "block", e.boxSizing = e.boxSizing || "border-box", Ys(n)) {
    const o = Es(i, "width");
    o !== void 0 && (i.width = o);
  }
  if (Ys(s))
    if (i.style.height === "")
      i.height = i.width / (t || 2);
    else {
      const o = Es(i, "height");
      o !== void 0 && (i.height = o);
    }
  return i;
}
const po = Ha ? {
  passive: !0
} : !1;
function Pl(i, t, e) {
  i && i.addEventListener(t, e, po);
}
function Cl(i, t, e) {
  i && i.canvas && i.canvas.removeEventListener(t, e, po);
}
function Ol(i, t) {
  const e = Ml[i.type] || i.type, { x: s, y: n } = Mt(i, t);
  return {
    type: e,
    chart: t,
    native: i,
    x: s !== void 0 ? s : null,
    y: n !== void 0 ? n : null
  };
}
function si(i, t) {
  for (const e of i)
    if (e === t || e.contains(t))
      return !0;
}
function Tl(i, t, e) {
  const s = i.canvas, n = new MutationObserver((o) => {
    let r = !1;
    for (const a of o)
      r = r || si(a.addedNodes, s), r = r && !si(a.removedNodes, s);
    r && e();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
function Dl(i, t, e) {
  const s = i.canvas, n = new MutationObserver((o) => {
    let r = !1;
    for (const a of o)
      r = r || si(a.removedNodes, s), r = r && !si(a.addedNodes, s);
    r && e();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
const we = /* @__PURE__ */ new Map();
let Xs = 0;
function mo() {
  const i = window.devicePixelRatio;
  i !== Xs && (Xs = i, we.forEach((t, e) => {
    e.currentDevicePixelRatio !== i && t();
  }));
}
function El(i, t) {
  we.size || window.addEventListener("resize", mo), we.set(i, t);
}
function $l(i) {
  we.delete(i), we.size || window.removeEventListener("resize", mo);
}
function Ll(i, t, e) {
  const s = i.canvas, n = s && Qi(s);
  if (!n)
    return;
  const o = Yn((a, l) => {
    const c = n.clientWidth;
    e(a, l), c < n.clientWidth && e();
  }, window), r = new ResizeObserver((a) => {
    const l = a[0], c = l.contentRect.width, h = l.contentRect.height;
    c === 0 && h === 0 || o(c, h);
  });
  return r.observe(n), El(i, o), r;
}
function vi(i, t, e) {
  e && e.disconnect(), t === "resize" && $l(i);
}
function Il(i, t, e) {
  const s = i.canvas, n = Yn((o) => {
    i.ctx !== null && e(Ol(o, i));
  }, i);
  return Pl(s, t, n), n;
}
class Rl extends go {
  acquireContext(t, e) {
    const s = t && t.getContext && t.getContext("2d");
    return s && s.canvas === t ? (Al(t, e), s) : null;
  }
  releaseContext(t) {
    const e = t.canvas;
    if (!e[Ue])
      return !1;
    const s = e[Ue].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const r = s[o];
      $(r) ? e.removeAttribute(o) : e.setAttribute(o, r);
    });
    const n = s.style || {};
    return Object.keys(n).forEach((o) => {
      e.style[o] = n[o];
    }), e.width = e.width, delete e[Ue], !0;
  }
  addEventListener(t, e, s) {
    this.removeEventListener(t, e);
    const n = t.$proxies || (t.$proxies = {}), r = {
      attach: Tl,
      detach: Dl,
      resize: Ll
    }[e] || Il;
    n[e] = r(t, e, s);
  }
  removeEventListener(t, e) {
    const s = t.$proxies || (t.$proxies = {}), n = s[e];
    if (!n)
      return;
    ({
      attach: vi,
      detach: vi,
      resize: vi
    }[e] || Cl)(t, e, n), s[e] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, e, s, n) {
    return za(t, e, s, n);
  }
  isAttached(t) {
    const e = t && Qi(t);
    return !!(e && e.isConnected);
  }
}
function Fl(i) {
  return !Zi() || typeof OffscreenCanvas < "u" && i instanceof OffscreenCanvas ? kl : Rl;
}
class _t {
  constructor() {
    A(this, "x");
    A(this, "y");
    A(this, "active", !1);
    A(this, "options");
    A(this, "$animations");
  }
  tooltipPosition(t) {
    const { x: e, y: s } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: e,
      y: s
    };
  }
  hasValue() {
    return xe(this.x) && xe(this.y);
  }
  getProps(t, e) {
    const s = this.$animations;
    if (!e || !s)
      return this;
    const n = {};
    return t.forEach((o) => {
      n[o] = s[o] && s[o].active() ? s[o]._to : this[o];
    }), n;
  }
}
A(_t, "defaults", {}), A(_t, "defaultRoutes");
function zl(i, t) {
  const e = i.options.ticks, s = Hl(i), n = Math.min(e.maxTicksLimit || s, s), o = e.major.enabled ? Nl(t) : [], r = o.length, a = o[0], l = o[r - 1], c = [];
  if (r > n)
    return Wl(t, c, o, r / n), c;
  const h = Bl(o, t, n);
  if (r > 0) {
    let d, f;
    const u = r > 1 ? Math.round((l - a) / (r - 1)) : null;
    for (ze(t, c, h, $(u) ? 0 : a - u, a), d = 0, f = r - 1; d < f; d++)
      ze(t, c, h, o[d], o[d + 1]);
    return ze(t, c, h, l, $(u) ? t.length : l + u), c;
  }
  return ze(t, c, h), c;
}
function Hl(i) {
  const t = i.options.offset, e = i._tickSize(), s = i._length / e + (t ? 0 : 1), n = i._maxLength / e;
  return Math.floor(Math.min(s, n));
}
function Bl(i, t, e) {
  const s = jl(i), n = t.length / e;
  if (!s)
    return Math.max(n, 1);
  const o = Lr(s);
  for (let r = 0, a = o.length - 1; r < a; r++) {
    const l = o[r];
    if (l > n)
      return l;
  }
  return Math.max(n, 1);
}
function Nl(i) {
  const t = [];
  let e, s;
  for (e = 0, s = i.length; e < s; e++)
    i[e].major && t.push(e);
  return t;
}
function Wl(i, t, e, s) {
  let n = 0, o = e[0], r;
  for (s = Math.ceil(s), r = 0; r < i.length; r++)
    r === o && (t.push(i[r]), n++, o = e[n * s]);
}
function ze(i, t, e, s, n) {
  const o = C(s, 0), r = Math.min(C(n, i.length), i.length);
  let a = 0, l, c, h;
  for (e = Math.ceil(e), n && (l = n - s, e = l / Math.floor(l / e)), h = o; h < 0; )
    a++, h = Math.round(o + a * e);
  for (c = Math.max(o, 0); c < r; c++)
    c === h && (t.push(i[c]), a++, h = Math.round(o + a * e));
}
function jl(i) {
  const t = i.length;
  let e, s;
  if (t < 2)
    return !1;
  for (s = i[0], e = 1; e < t; ++e)
    if (i[e] - i[e - 1] !== s)
      return !1;
  return s;
}
const Vl = (i) => i === "left" ? "right" : i === "right" ? "left" : i, qs = (i, t, e) => t === "top" || t === "left" ? i[t] + e : i[t] - e, Ks = (i, t) => Math.min(t || i, i);
function Gs(i, t) {
  const e = [], s = i.length / t, n = i.length;
  let o = 0;
  for (; o < n; o += s)
    e.push(i[Math.floor(o)]);
  return e;
}
function Ul(i, t, e) {
  const s = i.ticks.length, n = Math.min(t, s - 1), o = i._startPixel, r = i._endPixel, a = 1e-6;
  let l = i.getPixelForTick(n), c;
  if (!(e && (s === 1 ? c = Math.max(l - o, r - l) : t === 0 ? c = (i.getPixelForTick(1) - l) / 2 : c = (l - i.getPixelForTick(n - 1)) / 2, l += n < t ? c : -c, l < o - a || l > r + a)))
    return l;
}
function Yl(i, t) {
  E(i, (e) => {
    const s = e.gc, n = s.length / 2;
    let o;
    if (n > t) {
      for (o = 0; o < n; ++o)
        delete e.data[s[o]];
      s.splice(0, n);
    }
  });
}
function ee(i) {
  return i.drawTicks ? i.tickLength : 0;
}
function Zs(i, t) {
  if (!i.display)
    return 0;
  const e = U(i.font, t), s = Q(i.padding);
  return (z(i.text) ? i.text.length : 1) * e.lineHeight + s.height;
}
function Xl(i, t) {
  return Lt(i, {
    scale: t,
    type: "scale"
  });
}
function ql(i, t, e) {
  return Lt(i, {
    tick: e,
    index: t,
    type: "tick"
  });
}
function Kl(i, t, e) {
  let s = Xn(i);
  return (e && t !== "right" || !e && t === "right") && (s = Vl(s)), s;
}
function Gl(i, t, e, s) {
  const { top: n, left: o, bottom: r, right: a, chart: l } = i, { chartArea: c, scales: h } = l;
  let d = 0, f, u, p;
  const g = r - n, m = a - o;
  if (i.isHorizontal()) {
    if (u = Y(s, o, a), O(e)) {
      const _ = Object.keys(e)[0], y = e[_];
      p = h[_].getPixelForValue(y) + g - t;
    } else e === "center" ? p = (c.bottom + c.top) / 2 + g - t : p = qs(i, e, t);
    f = a - o;
  } else {
    if (O(e)) {
      const _ = Object.keys(e)[0], y = e[_];
      u = h[_].getPixelForValue(y) - m + t;
    } else e === "center" ? u = (c.left + c.right) / 2 - m + t : u = qs(i, e, t);
    p = Y(s, r, n), d = e === "left" ? -G : G;
  }
  return {
    titleX: u,
    titleY: p,
    maxWidth: f,
    rotation: d
  };
}
class Xt extends _t {
  constructor(t) {
    super(), this.id = t.id, this.type = t.type, this.options = void 0, this.ctx = t.ctx, this.chart = t.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = !1, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = !1, this.$context = void 0;
  }
  init(t) {
    this.options = t.setContext(this.getContext()), this.axis = t.axis, this._userMin = this.parse(t.min), this._userMax = this.parse(t.max), this._suggestedMin = this.parse(t.suggestedMin), this._suggestedMax = this.parse(t.suggestedMax);
  }
  parse(t, e) {
    return t;
  }
  getUserBounds() {
    let { _userMin: t, _userMax: e, _suggestedMin: s, _suggestedMax: n } = this;
    return t = tt(t, Number.POSITIVE_INFINITY), e = tt(e, Number.NEGATIVE_INFINITY), s = tt(s, Number.POSITIVE_INFINITY), n = tt(n, Number.NEGATIVE_INFINITY), {
      min: tt(t, s),
      max: tt(e, n),
      minDefined: N(t),
      maxDefined: N(e)
    };
  }
  getMinMax(t) {
    let { min: e, max: s, minDefined: n, maxDefined: o } = this.getUserBounds(), r;
    if (n && o)
      return {
        min: e,
        max: s
      };
    const a = this.getMatchingVisibleMetas();
    for (let l = 0, c = a.length; l < c; ++l)
      r = a[l].controller.getMinMax(this, t), n || (e = Math.min(e, r.min)), o || (s = Math.max(s, r.max));
    return e = o && e > s ? s : e, s = n && e > s ? e : s, {
      min: tt(e, tt(s, e)),
      max: tt(s, tt(e, s))
    };
  }
  getPadding() {
    return {
      left: this.paddingLeft || 0,
      top: this.paddingTop || 0,
      right: this.paddingRight || 0,
      bottom: this.paddingBottom || 0
    };
  }
  getTicks() {
    return this.ticks;
  }
  getLabels() {
    const t = this.chart.data;
    return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels || [];
  }
  getLabelItems(t = this.chart.chartArea) {
    return this._labelItems || (this._labelItems = this._computeLabelItems(t));
  }
  beforeLayout() {
    this._cache = {}, this._dataLimitsCached = !1;
  }
  beforeUpdate() {
    L(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, e, s) {
    const { beginAtZero: n, grace: o, ticks: r } = this.options, a = r.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = e, this._margins = s = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, s), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + s.left + s.right : this.height + s.top + s.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = ma(this, o, n), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = a < this.ticks.length;
    this._convertTicksToLabels(l ? Gs(this.ticks, a) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), r.display && (r.autoSkip || r.source === "auto") && (this.ticks = zl(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, e, s;
    this.isHorizontal() ? (e = this.left, s = this.right) : (e = this.top, s = this.bottom, t = !t), this._startPixel = e, this._endPixel = s, this._reversePixels = t, this._length = s - e, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    L(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    L(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    L(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), L(this.options[t], [
      this
    ]);
  }
  beforeDataLimits() {
    this._callHooks("beforeDataLimits");
  }
  determineDataLimits() {
  }
  afterDataLimits() {
    this._callHooks("afterDataLimits");
  }
  beforeBuildTicks() {
    this._callHooks("beforeBuildTicks");
  }
  buildTicks() {
    return [];
  }
  afterBuildTicks() {
    this._callHooks("afterBuildTicks");
  }
  beforeTickToLabelConversion() {
    L(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const e = this.options.ticks;
    let s, n, o;
    for (s = 0, n = t.length; s < n; s++)
      o = t[s], o.label = L(e.callback, [
        o.value,
        s,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    L(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    L(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, e = t.ticks, s = Ks(this.ticks.length, t.ticks.maxTicksLimit), n = e.minRotation || 0, o = e.maxRotation;
    let r = n, a, l, c;
    if (!this._isVisible() || !e.display || n >= o || s <= 1 || !this.isHorizontal()) {
      this.labelRotation = n;
      return;
    }
    const h = this._getLabelSizes(), d = h.widest.width, f = h.highest.height, u = K(this.chart.width - d, 0, this.maxWidth);
    a = t.offset ? this.maxWidth / s : u / (s - 1), d + 6 > a && (a = u / (s - (t.offset ? 0.5 : 1)), l = this.maxHeight - ee(t.grid) - e.padding - Zs(t.title, this.chart.options.font), c = Math.sqrt(d * d + f * f), r = zr(Math.min(Math.asin(K((h.highest.height + 6) / a, -1, 1)), Math.asin(K(l / c, -1, 1)) - Math.asin(K(f / c, -1, 1)))), r = Math.max(n, Math.min(o, r))), this.labelRotation = r;
  }
  afterCalculateLabelRotation() {
    L(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    L(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: e, options: { ticks: s, title: n, grid: o } } = this, r = this._isVisible(), a = this.isHorizontal();
    if (r) {
      const l = Zs(n, e.options.font);
      if (a ? (t.width = this.maxWidth, t.height = ee(o) + l) : (t.height = this.maxHeight, t.width = ee(o) + l), s.display && this.ticks.length) {
        const { first: c, last: h, widest: d, highest: f } = this._getLabelSizes(), u = s.padding * 2, p = Ot(this.labelRotation), g = Math.cos(p), m = Math.sin(p);
        if (a) {
          const _ = s.mirror ? 0 : m * d.width + g * f.height;
          t.height = Math.min(this.maxHeight, t.height + _ + u);
        } else {
          const _ = s.mirror ? 0 : g * d.width + m * f.height;
          t.width = Math.min(this.maxWidth, t.width + _ + u);
        }
        this._calculatePadding(c, h, m, g);
      }
    }
    this._handleMargins(), a ? (this.width = this._length = e.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = e.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, e, s, n) {
    const { ticks: { align: o, padding: r }, position: a } = this.options, l = this.labelRotation !== 0, c = a !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const h = this.getPixelForTick(0) - this.left, d = this.right - this.getPixelForTick(this.ticks.length - 1);
      let f = 0, u = 0;
      l ? c ? (f = n * t.width, u = s * e.height) : (f = s * t.height, u = n * e.width) : o === "start" ? u = e.width : o === "end" ? f = t.width : o !== "inner" && (f = t.width / 2, u = e.width / 2), this.paddingLeft = Math.max((f - h + r) * this.width / (this.width - h), 0), this.paddingRight = Math.max((u - d + r) * this.width / (this.width - d), 0);
    } else {
      let h = e.height / 2, d = t.height / 2;
      o === "start" ? (h = 0, d = t.height) : o === "end" && (h = e.height, d = 0), this.paddingTop = h + r, this.paddingBottom = d + r;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    L(this.options.afterFit, [
      this
    ]);
  }
  isHorizontal() {
    const { axis: t, position: e } = this.options;
    return e === "top" || e === "bottom" || t === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(t) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(t);
    let e, s;
    for (e = 0, s = t.length; e < s; e++)
      $(t[e].label) && (t.splice(e, 1), s--, e--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const e = this.options.ticks.sampleSize;
      let s = this.ticks;
      e < s.length && (s = Gs(s, e)), this._labelSizes = t = this._computeLabelSizes(s, s.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, e, s) {
    const { ctx: n, _longestTextCache: o } = this, r = [], a = [], l = Math.floor(e / Ks(e, s));
    let c = 0, h = 0, d, f, u, p, g, m, _, y, v, w, b;
    for (d = 0; d < e; d += l) {
      if (p = t[d].label, g = this._resolveTickFontOptions(d), n.font = m = g.string, _ = o[m] = o[m] || {
        data: {},
        gc: []
      }, y = g.lineHeight, v = w = 0, !$(p) && !z(p))
        v = Ps(n, _.data, _.gc, v, p), w = y;
      else if (z(p))
        for (f = 0, u = p.length; f < u; ++f)
          b = p[f], !$(b) && !z(b) && (v = Ps(n, _.data, _.gc, v, b), w += y);
      r.push(v), a.push(w), c = Math.max(v, c), h = Math.max(w, h);
    }
    Yl(o, e);
    const k = r.indexOf(c), S = a.indexOf(h), x = (M) => ({
      width: r[M] || 0,
      height: a[M] || 0
    });
    return {
      first: x(0),
      last: x(e - 1),
      widest: x(k),
      highest: x(S),
      widths: r,
      heights: a
    };
  }
  getLabelForValue(t) {
    return t;
  }
  getPixelForValue(t, e) {
    return NaN;
  }
  getValueForPixel(t) {
  }
  getPixelForTick(t) {
    const e = this.ticks;
    return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value);
  }
  getPixelForDecimal(t) {
    this._reversePixels && (t = 1 - t);
    const e = this._startPixel + t * this._length;
    return Nr(this._alignToPixels ? St(this.chart, e, 0) : e);
  }
  getDecimalForPixel(t) {
    const e = (t - this._startPixel) / this._length;
    return this._reversePixels ? 1 - e : e;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: t, max: e } = this;
    return t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0;
  }
  getContext(t) {
    const e = this.ticks || [];
    if (t >= 0 && t < e.length) {
      const s = e[t];
      return s.$context || (s.$context = ql(this.getContext(), t, s));
    }
    return this.$context || (this.$context = Xl(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, e = Ot(this.labelRotation), s = Math.abs(Math.cos(e)), n = Math.abs(Math.sin(e)), o = this._getLabelSizes(), r = t.autoSkipPadding || 0, a = o ? o.widest.width + r : 0, l = o ? o.highest.height + r : 0;
    return this.isHorizontal() ? l * s > a * n ? a / s : l / n : l * n < a * s ? l / s : a / n;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const e = this.axis, s = this.chart, n = this.options, { grid: o, position: r, border: a } = n, l = o.offset, c = this.isHorizontal(), d = this.ticks.length + (l ? 1 : 0), f = ee(o), u = [], p = a.setContext(this.getContext()), g = p.display ? p.width : 0, m = g / 2, _ = function(H) {
      return St(s, H, g);
    };
    let y, v, w, b, k, S, x, M, T, P, D, W;
    if (r === "top")
      y = _(this.bottom), S = this.bottom - f, M = y - m, P = _(t.top) + m, W = t.bottom;
    else if (r === "bottom")
      y = _(this.top), P = t.top, W = _(t.bottom) - m, S = y + m, M = this.top + f;
    else if (r === "left")
      y = _(this.right), k = this.right - f, x = y - m, T = _(t.left) + m, D = t.right;
    else if (r === "right")
      y = _(this.left), T = t.left, D = _(t.right) - m, k = y + m, x = this.left + f;
    else if (e === "x") {
      if (r === "center")
        y = _((t.top + t.bottom) / 2 + 0.5);
      else if (O(r)) {
        const H = Object.keys(r)[0], X = r[H];
        y = _(this.chart.scales[H].getPixelForValue(X));
      }
      P = t.top, W = t.bottom, S = y + m, M = S + f;
    } else if (e === "y") {
      if (r === "center")
        y = _((t.left + t.right) / 2);
      else if (O(r)) {
        const H = Object.keys(r)[0], X = r[H];
        y = _(this.chart.scales[H].getPixelForValue(X));
      }
      k = y - m, x = k - f, T = t.left, D = t.right;
    }
    const J = C(n.ticks.maxTicksLimit, d), I = Math.max(1, Math.ceil(d / J));
    for (v = 0; v < d; v += I) {
      const H = this.getContext(v), X = o.setContext(H), Pe = a.setContext(H), Ce = X.lineWidth, It = X.color, Oe = Pe.dash || [], Rt = Pe.dashOffset, Kt = X.tickWidth, yt = X.tickColor, Gt = X.tickBorderDash || [], xt = X.tickBorderDashOffset;
      w = Ul(this, v, l), w !== void 0 && (b = St(s, w, Ce), c ? k = x = T = D = b : S = M = P = W = b, u.push({
        tx1: k,
        ty1: S,
        tx2: x,
        ty2: M,
        x1: T,
        y1: P,
        x2: D,
        y2: W,
        width: Ce,
        color: It,
        borderDash: Oe,
        borderDashOffset: Rt,
        tickWidth: Kt,
        tickColor: yt,
        tickBorderDash: Gt,
        tickBorderDashOffset: xt
      }));
    }
    return this._ticksLength = d, this._borderValue = y, u;
  }
  _computeLabelItems(t) {
    const e = this.axis, s = this.options, { position: n, ticks: o } = s, r = this.isHorizontal(), a = this.ticks, { align: l, crossAlign: c, padding: h, mirror: d } = o, f = ee(s.grid), u = f + h, p = d ? -h : u, g = -Ot(this.labelRotation), m = [];
    let _, y, v, w, b, k, S, x, M, T, P, D, W = "middle";
    if (n === "top")
      k = this.bottom - p, S = this._getXAxisLabelAlignment();
    else if (n === "bottom")
      k = this.top + p, S = this._getXAxisLabelAlignment();
    else if (n === "left") {
      const I = this._getYAxisLabelAlignment(f);
      S = I.textAlign, b = I.x;
    } else if (n === "right") {
      const I = this._getYAxisLabelAlignment(f);
      S = I.textAlign, b = I.x;
    } else if (e === "x") {
      if (n === "center")
        k = (t.top + t.bottom) / 2 + u;
      else if (O(n)) {
        const I = Object.keys(n)[0], H = n[I];
        k = this.chart.scales[I].getPixelForValue(H) + u;
      }
      S = this._getXAxisLabelAlignment();
    } else if (e === "y") {
      if (n === "center")
        b = (t.left + t.right) / 2 - u;
      else if (O(n)) {
        const I = Object.keys(n)[0], H = n[I];
        b = this.chart.scales[I].getPixelForValue(H);
      }
      S = this._getYAxisLabelAlignment(f).textAlign;
    }
    e === "y" && (l === "start" ? W = "top" : l === "end" && (W = "bottom"));
    const J = this._getLabelSizes();
    for (_ = 0, y = a.length; _ < y; ++_) {
      v = a[_], w = v.label;
      const I = o.setContext(this.getContext(_));
      x = this.getPixelForTick(_) + o.labelOffset, M = this._resolveTickFontOptions(_), T = M.lineHeight, P = z(w) ? w.length : 1;
      const H = P / 2, X = I.color, Pe = I.textStrokeColor, Ce = I.textStrokeWidth;
      let It = S;
      r ? (b = x, S === "inner" && (_ === y - 1 ? It = this.options.reverse ? "left" : "right" : _ === 0 ? It = this.options.reverse ? "right" : "left" : It = "center"), n === "top" ? c === "near" || g !== 0 ? D = -P * T + T / 2 : c === "center" ? D = -J.highest.height / 2 - H * T + T : D = -J.highest.height + T / 2 : c === "near" || g !== 0 ? D = T / 2 : c === "center" ? D = J.highest.height / 2 - H * T : D = J.highest.height - P * T, d && (D *= -1), g !== 0 && !I.showLabelBackdrop && (b += T / 2 * Math.sin(g))) : (k = x, D = (1 - P) * T / 2);
      let Oe;
      if (I.showLabelBackdrop) {
        const Rt = Q(I.backdropPadding), Kt = J.heights[_], yt = J.widths[_];
        let Gt = D - Rt.top, xt = 0 - Rt.left;
        switch (W) {
          case "middle":
            Gt -= Kt / 2;
            break;
          case "bottom":
            Gt -= Kt;
            break;
        }
        switch (S) {
          case "center":
            xt -= yt / 2;
            break;
          case "right":
            xt -= yt;
            break;
          case "inner":
            _ === y - 1 ? xt -= yt : _ > 0 && (xt -= yt / 2);
            break;
        }
        Oe = {
          left: xt,
          top: Gt,
          width: yt + Rt.width,
          height: Kt + Rt.height,
          color: I.backdropColor
        };
      }
      m.push({
        label: w,
        font: M,
        textOffset: D,
        options: {
          rotation: g,
          color: X,
          strokeColor: Pe,
          strokeWidth: Ce,
          textAlign: It,
          textBaseline: W,
          translation: [
            b,
            k
          ],
          backdrop: Oe
        }
      });
    }
    return m;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: e } = this.options;
    if (-Ot(this.labelRotation))
      return t === "top" ? "left" : "right";
    let n = "center";
    return e.align === "start" ? n = "left" : e.align === "end" ? n = "right" : e.align === "inner" && (n = "inner"), n;
  }
  _getYAxisLabelAlignment(t) {
    const { position: e, ticks: { crossAlign: s, mirror: n, padding: o } } = this.options, r = this._getLabelSizes(), a = t + o, l = r.widest.width;
    let c, h;
    return e === "left" ? n ? (h = this.right + o, s === "near" ? c = "left" : s === "center" ? (c = "center", h += l / 2) : (c = "right", h += l)) : (h = this.right - a, s === "near" ? c = "right" : s === "center" ? (c = "center", h -= l / 2) : (c = "left", h = this.left)) : e === "right" ? n ? (h = this.left + o, s === "near" ? c = "right" : s === "center" ? (c = "center", h -= l / 2) : (c = "left", h -= l)) : (h = this.left + a, s === "near" ? c = "left" : s === "center" ? (c = "center", h += l / 2) : (c = "right", h = this.right)) : c = "right", {
      textAlign: c,
      x: h
    };
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror)
      return;
    const t = this.chart, e = this.options.position;
    if (e === "left" || e === "right")
      return {
        top: 0,
        left: this.left,
        bottom: t.height,
        right: this.right
      };
    if (e === "top" || e === "bottom")
      return {
        top: this.top,
        left: 0,
        bottom: this.bottom,
        right: t.width
      };
  }
  drawBackground() {
    const { ctx: t, options: { backgroundColor: e }, left: s, top: n, width: o, height: r } = this;
    e && (t.save(), t.fillStyle = e, t.fillRect(s, n, o, r), t.restore());
  }
  getLineWidthForValue(t) {
    const e = this.options.grid;
    if (!this._isVisible() || !e.display)
      return 0;
    const n = this.ticks.findIndex((o) => o.value === t);
    return n >= 0 ? e.setContext(this.getContext(n)).lineWidth : 0;
  }
  drawGrid(t) {
    const e = this.options.grid, s = this.ctx, n = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let o, r;
    const a = (l, c, h) => {
      !h.width || !h.color || (s.save(), s.lineWidth = h.width, s.strokeStyle = h.color, s.setLineDash(h.borderDash || []), s.lineDashOffset = h.borderDashOffset, s.beginPath(), s.moveTo(l.x, l.y), s.lineTo(c.x, c.y), s.stroke(), s.restore());
    };
    if (e.display)
      for (o = 0, r = n.length; o < r; ++o) {
        const l = n[o];
        e.drawOnChartArea && a({
          x: l.x1,
          y: l.y1
        }, {
          x: l.x2,
          y: l.y2
        }, l), e.drawTicks && a({
          x: l.tx1,
          y: l.ty1
        }, {
          x: l.tx2,
          y: l.ty2
        }, {
          color: l.tickColor,
          width: l.tickWidth,
          borderDash: l.tickBorderDash,
          borderDashOffset: l.tickBorderDashOffset
        });
      }
  }
  drawBorder() {
    const { chart: t, ctx: e, options: { border: s, grid: n } } = this, o = s.setContext(this.getContext()), r = s.display ? o.width : 0;
    if (!r)
      return;
    const a = n.setContext(this.getContext(0)).lineWidth, l = this._borderValue;
    let c, h, d, f;
    this.isHorizontal() ? (c = St(t, this.left, r) - r / 2, h = St(t, this.right, a) + a / 2, d = f = l) : (d = St(t, this.top, r) - r / 2, f = St(t, this.bottom, a) + a / 2, c = h = l), e.save(), e.lineWidth = o.width, e.strokeStyle = o.color, e.beginPath(), e.moveTo(c, d), e.lineTo(h, f), e.stroke(), e.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const s = this.ctx, n = this._computeLabelArea();
    n && ri(s, n);
    const o = this.getLabelItems(t);
    for (const r of o) {
      const a = r.options, l = r.font, c = r.label, h = r.textOffset;
      ei(s, c, 0, h, l, a);
    }
    n && ai(s);
  }
  drawTitle() {
    const { ctx: t, options: { position: e, title: s, reverse: n } } = this;
    if (!s.display)
      return;
    const o = U(s.font), r = Q(s.padding), a = s.align;
    let l = o.lineHeight / 2;
    e === "bottom" || e === "center" || O(e) ? (l += r.bottom, z(s.text) && (l += o.lineHeight * (s.text.length - 1))) : l += r.top;
    const { titleX: c, titleY: h, maxWidth: d, rotation: f } = Gl(this, l, e, a);
    ei(t, s.text, 0, 0, o, {
      color: s.color,
      maxWidth: d,
      rotation: f,
      textAlign: Kl(a, e, n),
      textBaseline: "middle",
      translation: [
        c,
        h
      ]
    });
  }
  draw(t) {
    this._isVisible() && (this.drawBackground(), this.drawGrid(t), this.drawBorder(), this.drawTitle(), this.drawLabels(t));
  }
  _layers() {
    const t = this.options, e = t.ticks && t.ticks.z || 0, s = C(t.grid && t.grid.z, -1), n = C(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== Xt.prototype.draw ? [
      {
        z: e,
        draw: (o) => {
          this.draw(o);
        }
      }
    ] : [
      {
        z: s,
        draw: (o) => {
          this.drawBackground(), this.drawGrid(o), this.drawTitle();
        }
      },
      {
        z: n,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: e,
        draw: (o) => {
          this.drawLabels(o);
        }
      }
    ];
  }
  getMatchingVisibleMetas(t) {
    const e = this.chart.getSortedVisibleDatasetMetas(), s = this.axis + "AxisID", n = [];
    let o, r;
    for (o = 0, r = e.length; o < r; ++o) {
      const a = e[o];
      a[s] === this.id && (!t || a.type === t) && n.push(a);
    }
    return n;
  }
  _resolveTickFontOptions(t) {
    const e = this.options.ticks.setContext(this.getContext(t));
    return U(e.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class He {
  constructor(t, e, s) {
    this.type = t, this.scope = e, this.override = s, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const e = Object.getPrototypeOf(t);
    let s;
    Jl(e) && (s = this.register(e));
    const n = this.items, o = t.id, r = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in n || (n[o] = t, Zl(t, r, s), this.override && F.override(t.id, t.overrides)), r;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const e = this.items, s = t.id, n = this.scope;
    s in e && delete e[s], n && s in F[n] && (delete F[n][s], this.override && delete $t[s]);
  }
}
function Zl(i, t, e) {
  const s = ye(/* @__PURE__ */ Object.create(null), [
    e ? F.get(e) : {},
    F.get(t),
    i.defaults
  ]);
  F.set(t, s), i.defaultRoutes && Ql(t, i.defaultRoutes), i.descriptors && F.describe(t, i.descriptors);
}
function Ql(i, t) {
  Object.keys(t).forEach((e) => {
    const s = e.split("."), n = s.pop(), o = [
      i
    ].concat(s).join("."), r = t[e].split("."), a = r.pop(), l = r.join(".");
    F.route(o, n, l, a);
  });
}
function Jl(i) {
  return "id" in i && "defaults" in i;
}
class tc {
  constructor() {
    this.controllers = new He(ge, "datasets", !0), this.elements = new He(_t, "elements"), this.plugins = new He(Object, "plugins"), this.scales = new He(Xt, "scales"), this._typedRegistries = [
      this.controllers,
      this.scales,
      this.elements
    ];
  }
  add(...t) {
    this._each("register", t);
  }
  remove(...t) {
    this._each("unregister", t);
  }
  addControllers(...t) {
    this._each("register", t, this.controllers);
  }
  addElements(...t) {
    this._each("register", t, this.elements);
  }
  addPlugins(...t) {
    this._each("register", t, this.plugins);
  }
  addScales(...t) {
    this._each("register", t, this.scales);
  }
  getController(t) {
    return this._get(t, this.controllers, "controller");
  }
  getElement(t) {
    return this._get(t, this.elements, "element");
  }
  getPlugin(t) {
    return this._get(t, this.plugins, "plugin");
  }
  getScale(t) {
    return this._get(t, this.scales, "scale");
  }
  removeControllers(...t) {
    this._each("unregister", t, this.controllers);
  }
  removeElements(...t) {
    this._each("unregister", t, this.elements);
  }
  removePlugins(...t) {
    this._each("unregister", t, this.plugins);
  }
  removeScales(...t) {
    this._each("unregister", t, this.scales);
  }
  _each(t, e, s) {
    [
      ...e
    ].forEach((n) => {
      const o = s || this._getRegistryForType(n);
      s || o.isForType(n) || o === this.plugins && n.id ? this._exec(t, o, n) : E(n, (r) => {
        const a = s || this._getRegistryForType(r);
        this._exec(t, a, r);
      });
    });
  }
  _exec(t, e, s) {
    const n = Ui(t);
    L(s["before" + n], [], s), e[t](s), L(s["after" + n], [], s);
  }
  _getRegistryForType(t) {
    for (let e = 0; e < this._typedRegistries.length; e++) {
      const s = this._typedRegistries[e];
      if (s.isForType(t))
        return s;
    }
    return this.plugins;
  }
  _get(t, e, s) {
    const n = e.get(t);
    if (n === void 0)
      throw new Error('"' + t + '" is not a registered ' + s + ".");
    return n;
  }
}
var it = /* @__PURE__ */ new tc();
class ec {
  constructor() {
    this._init = void 0;
  }
  notify(t, e, s, n) {
    if (e === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install")), this._init === void 0)
      return;
    const o = n ? this._descriptors(t).filter(n) : this._descriptors(t), r = this._notify(o, t, e, s);
    return e === "afterDestroy" && (this._notify(o, t, "stop"), this._notify(this._init, t, "uninstall"), this._init = void 0), r;
  }
  _notify(t, e, s, n) {
    n = n || {};
    for (const o of t) {
      const r = o.plugin, a = r[s], l = [
        e,
        n,
        o.options
      ];
      if (L(a, l, r) === !1 && n.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    $(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const e = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), e;
  }
  _createDescriptors(t, e) {
    const s = t && t.config, n = C(s.options && s.options.plugins, {}), o = ic(s);
    return n === !1 && !e ? [] : nc(t, o, n, e);
  }
  _notifyStateChanges(t) {
    const e = this._oldCache || [], s = this._cache, n = (o, r) => o.filter((a) => !r.some((l) => a.plugin.id === l.plugin.id));
    this._notify(n(e, s), t, "stop"), this._notify(n(s, e), t, "start");
  }
}
function ic(i) {
  const t = {}, e = [], s = Object.keys(it.plugins.items);
  for (let o = 0; o < s.length; o++)
    e.push(it.getPlugin(s[o]));
  const n = i.plugins || [];
  for (let o = 0; o < n.length; o++) {
    const r = n[o];
    e.indexOf(r) === -1 && (e.push(r), t[r.id] = !0);
  }
  return {
    plugins: e,
    localIds: t
  };
}
function sc(i, t) {
  return !t && i === !1 ? null : i === !0 ? {} : i;
}
function nc(i, { plugins: t, localIds: e }, s, n) {
  const o = [], r = i.getContext();
  for (const a of t) {
    const l = a.id, c = sc(s[l], n);
    c !== null && o.push({
      plugin: a,
      options: oc(i.config, {
        plugin: a,
        local: e[l]
      }, c, r)
    });
  }
  return o;
}
function oc(i, { plugin: t, local: e }, s, n) {
  const o = i.pluginScopeKeys(t), r = i.getOptionScopes(s, o);
  return e && t.defaults && r.push(t.defaults), i.createResolver(r, n, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Oi(i, t) {
  const e = F.datasets[i] || {};
  return ((t.datasets || {})[i] || {}).indexAxis || t.indexAxis || e.indexAxis || "x";
}
function rc(i, t) {
  let e = i;
  return i === "_index_" ? e = t : i === "_value_" && (e = t === "x" ? "y" : "x"), e;
}
function ac(i, t) {
  return i === t ? "_index_" : "_value_";
}
function Qs(i) {
  if (i === "x" || i === "y" || i === "r")
    return i;
}
function lc(i) {
  if (i === "top" || i === "bottom")
    return "x";
  if (i === "left" || i === "right")
    return "y";
}
function Ti(i, ...t) {
  if (Qs(i))
    return i;
  for (const e of t) {
    const s = e.axis || lc(e.position) || i.length > 1 && Qs(i[0].toLowerCase());
    if (s)
      return s;
  }
  throw new Error(`Cannot determine type of '${i}' axis. Please provide 'axis' or 'position' option.`);
}
function Js(i, t, e) {
  if (e[t + "AxisID"] === i)
    return {
      axis: t
    };
}
function cc(i, t) {
  if (t.data && t.data.datasets) {
    const e = t.data.datasets.filter((s) => s.xAxisID === i || s.yAxisID === i);
    if (e.length)
      return Js(i, "x", e[0]) || Js(i, "y", e[0]);
  }
  return {};
}
function hc(i, t) {
  const e = $t[i.type] || {
    scales: {}
  }, s = t.scales || {}, n = Oi(i.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(s).forEach((r) => {
    const a = s[r];
    if (!O(a))
      return console.error(`Invalid scale configuration for scale: ${r}`);
    if (a._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${r}`);
    const l = Ti(r, a, cc(r, i), F.scales[a.type]), c = ac(l, n), h = e.scales || {};
    o[r] = ce(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      a,
      h[l],
      h[c]
    ]);
  }), i.data.datasets.forEach((r) => {
    const a = r.type || i.type, l = r.indexAxis || Oi(a, t), h = ($t[a] || {}).scales || {};
    Object.keys(h).forEach((d) => {
      const f = rc(d, l), u = r[f + "AxisID"] || f;
      o[u] = o[u] || /* @__PURE__ */ Object.create(null), ce(o[u], [
        {
          axis: f
        },
        s[u],
        h[d]
      ]);
    });
  }), Object.keys(o).forEach((r) => {
    const a = o[r];
    ce(a, [
      F.scales[a.type],
      F.scale
    ]);
  }), o;
}
function _o(i) {
  const t = i.options || (i.options = {});
  t.plugins = C(t.plugins, {}), t.scales = hc(i, t);
}
function bo(i) {
  return i = i || {}, i.datasets = i.datasets || [], i.labels = i.labels || [], i;
}
function dc(i) {
  return i = i || {}, i.data = bo(i.data), _o(i), i;
}
const tn = /* @__PURE__ */ new Map(), yo = /* @__PURE__ */ new Set();
function Be(i, t) {
  let e = tn.get(i);
  return e || (e = t(), tn.set(i, e), yo.add(e)), e;
}
const ie = (i, t, e) => {
  const s = Qe(t, e);
  s !== void 0 && i.add(s);
};
class fc {
  constructor(t) {
    this._config = dc(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
  }
  get platform() {
    return this._config.platform;
  }
  get type() {
    return this._config.type;
  }
  set type(t) {
    this._config.type = t;
  }
  get data() {
    return this._config.data;
  }
  set data(t) {
    this._config.data = bo(t);
  }
  get options() {
    return this._config.options;
  }
  set options(t) {
    this._config.options = t;
  }
  get plugins() {
    return this._config.plugins;
  }
  update() {
    const t = this._config;
    this.clearCache(), _o(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return Be(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, e) {
    return Be(`${t}.transition.${e}`, () => [
      [
        `datasets.${t}.transitions.${e}`,
        `transitions.${e}`
      ],
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetElementScopeKeys(t, e) {
    return Be(`${t}-${e}`, () => [
      [
        `datasets.${t}.elements.${e}`,
        `datasets.${t}`,
        `elements.${e}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(t) {
    const e = t.id, s = this.type;
    return Be(`${s}-plugin-${e}`, () => [
      [
        `plugins.${e}`,
        ...t.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(t, e) {
    const s = this._scopeCache;
    let n = s.get(t);
    return (!n || e) && (n = /* @__PURE__ */ new Map(), s.set(t, n)), n;
  }
  getOptionScopes(t, e, s) {
    const { options: n, type: o } = this, r = this._cachedScopes(t, s), a = r.get(e);
    if (a)
      return a;
    const l = /* @__PURE__ */ new Set();
    e.forEach((h) => {
      t && (l.add(t), h.forEach((d) => ie(l, t, d))), h.forEach((d) => ie(l, n, d)), h.forEach((d) => ie(l, $t[o] || {}, d)), h.forEach((d) => ie(l, F, d)), h.forEach((d) => ie(l, Ai, d));
    });
    const c = Array.from(l);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), yo.has(e) && r.set(e, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: e } = this;
    return [
      t,
      $t[e] || {},
      F.datasets[e] || {},
      {
        type: e
      },
      F,
      Ai
    ];
  }
  resolveNamedOptions(t, e, s, n = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: r, subPrefixes: a } = en(this._resolverCache, t, n);
    let l = r;
    if (gc(r, e)) {
      o.$shared = !1, s = mt(s) ? s() : s;
      const c = this.createResolver(t, s, a);
      l = Ut(r, s, c);
    }
    for (const c of e)
      o[c] = l[c];
    return o;
  }
  createResolver(t, e, s = [
    ""
  ], n) {
    const { resolver: o } = en(this._resolverCache, t, s);
    return O(e) ? Ut(o, e, void 0, n) : o;
  }
}
function en(i, t, e) {
  let s = i.get(t);
  s || (s = /* @__PURE__ */ new Map(), i.set(t, s));
  const n = e.join();
  let o = s.get(n);
  return o || (o = {
    resolver: qi(t, e),
    subPrefixes: e.filter((a) => !a.toLowerCase().includes("hover"))
  }, s.set(n, o)), o;
}
const uc = (i) => O(i) && Object.getOwnPropertyNames(i).some((t) => mt(i[t]));
function gc(i, t) {
  const { isScriptable: e, isIndexable: s } = Qn(i);
  for (const n of t) {
    const o = e(n), r = s(n), a = (r || o) && i[n];
    if (o && (mt(a) || uc(a)) || r && z(a))
      return !0;
  }
  return !1;
}
var pc = "4.5.1";
const mc = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function sn(i, t) {
  return i === "top" || i === "bottom" || mc.indexOf(i) === -1 && t === "x";
}
function nn(i, t) {
  return function(e, s) {
    return e[i] === s[i] ? e[t] - s[t] : e[i] - s[i];
  };
}
function on(i) {
  const t = i.chart, e = t.options.animation;
  t.notifyPlugins("afterRender"), L(e && e.onComplete, [
    i
  ], t);
}
function _c(i) {
  const t = i.chart, e = t.options.animation;
  L(e && e.onProgress, [
    i
  ], t);
}
function xo(i) {
  return Zi() && typeof i == "string" ? i = document.getElementById(i) : i && i.length && (i = i[0]), i && i.canvas && (i = i.canvas), i;
}
const Ye = {}, rn = (i) => {
  const t = xo(i);
  return Object.values(Ye).filter((e) => e.canvas === t).pop();
};
function bc(i, t, e) {
  const s = Object.keys(i);
  for (const n of s) {
    const o = +n;
    if (o >= t) {
      const r = i[n];
      delete i[n], (e > 0 || o > t) && (i[o + e] = r);
    }
  }
}
function yc(i, t, e, s) {
  return !e || i.type === "mouseout" ? null : s ? t : i;
}
class lt {
  static register(...t) {
    it.add(...t), an();
  }
  static unregister(...t) {
    it.remove(...t), an();
  }
  constructor(t, e) {
    const s = this.config = new fc(e), n = xo(t), o = rn(n);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const r = s.createResolver(s.chartOptionScopes(), this.getContext());
    this.platform = new (s.platform || Fl(n))(), this.platform.updateConfig(s);
    const a = this.platform.acquireContext(n, r.aspectRatio), l = a && a.canvas, c = l && l.height, h = l && l.width;
    if (this.id = Mr(), this.ctx = a, this.canvas = l, this.width = h, this.height = c, this._options = r, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new ec(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Yr((d) => this.update(d), r.resizeDelay || 0), this._dataChanges = [], Ye[this.id] = this, !a || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    ot.listen(this, "complete", on), ot.listen(this, "progress", _c), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: e }, width: s, height: n, _aspectRatio: o } = this;
    return $(t) ? e && o ? o : n ? s / n : null : t;
  }
  get data() {
    return this.config.data;
  }
  set data(t) {
    this.config.data = t;
  }
  get options() {
    return this._options;
  }
  set options(t) {
    this.config.options = t;
  }
  get registry() {
    return it;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Ds(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Cs(this.canvas, this.ctx), this;
  }
  stop() {
    return ot.stop(this), this;
  }
  resize(t, e) {
    ot.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: e
    } : this._resize(t, e);
  }
  _resize(t, e) {
    const s = this.options, n = this.canvas, o = s.maintainAspectRatio && this.aspectRatio, r = this.platform.getMaximumSize(n, t, e, o), a = s.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = r.width, this.height = r.height, this._aspectRatio = this.aspectRatio, Ds(this, a, !0) && (this.notifyPlugins("resize", {
      size: r
    }), L(s.onResize, [
      this,
      r
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const e = this.options.scales || {};
    E(e, (s, n) => {
      s.id = n;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, e = t.scales, s = this.scales, n = Object.keys(s).reduce((r, a) => (r[a] = !1, r), {});
    let o = [];
    e && (o = o.concat(Object.keys(e).map((r) => {
      const a = e[r], l = Ti(r, a), c = l === "r", h = l === "x";
      return {
        options: a,
        dposition: c ? "chartArea" : h ? "bottom" : "left",
        dtype: c ? "radialLinear" : h ? "category" : "linear"
      };
    }))), E(o, (r) => {
      const a = r.options, l = a.id, c = Ti(l, a), h = C(a.type, r.dtype);
      (a.position === void 0 || sn(a.position, c) !== sn(r.dposition)) && (a.position = r.dposition), n[l] = !0;
      let d = null;
      if (l in s && s[l].type === h)
        d = s[l];
      else {
        const f = it.getScale(h);
        d = new f({
          id: l,
          type: h,
          ctx: this.ctx,
          chart: this
        }), s[d.id] = d;
      }
      d.init(a, t);
    }), E(n, (r, a) => {
      r || delete s[a];
    }), E(s, (r) => {
      ft.configure(this, r, r.options), ft.addBox(this, r);
    });
  }
  _updateMetasets() {
    const t = this._metasets, e = this.data.datasets.length, s = t.length;
    if (t.sort((n, o) => n.index - o.index), s > e) {
      for (let n = e; n < s; ++n)
        this._destroyDatasetMeta(n);
      t.splice(e, s - e);
    }
    this._sortedMetasets = t.slice(0).sort(nn("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: e } } = this;
    t.length > e.length && delete this._stacks, t.forEach((s, n) => {
      e.filter((o) => o === s._dataset).length === 0 && this._destroyDatasetMeta(n);
    });
  }
  buildOrUpdateControllers() {
    const t = [], e = this.data.datasets;
    let s, n;
    for (this._removeUnreferencedMetasets(), s = 0, n = e.length; s < n; s++) {
      const o = e[s];
      let r = this.getDatasetMeta(s);
      const a = o.type || this.config.type;
      if (r.type && r.type !== a && (this._destroyDatasetMeta(s), r = this.getDatasetMeta(s)), r.type = a, r.indexAxis = o.indexAxis || Oi(a, this.options), r.order = o.order || 0, r.index = s, r.label = "" + o.label, r.visible = this.isDatasetVisible(s), r.controller)
        r.controller.updateIndex(s), r.controller.linkScales();
      else {
        const l = it.getController(a), { datasetElementType: c, dataElementType: h } = F.datasets[a];
        Object.assign(l, {
          dataElementType: it.getElement(h),
          datasetElementType: c && it.getElement(c)
        }), r.controller = new l(this, s), t.push(r.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    E(this.data.datasets, (t, e) => {
      this.getDatasetMeta(e).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const e = this.config;
    e.update();
    const s = this._options = e.createResolver(e.chartOptionScopes(), this.getContext()), n = this._animationsDisabled = !s.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: t,
      cancelable: !0
    }) === !1)
      return;
    const o = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let r = 0;
    for (let c = 0, h = this.data.datasets.length; c < h; c++) {
      const { controller: d } = this.getDatasetMeta(c), f = !n && o.indexOf(d) === -1;
      d.buildOrUpdateElements(f), r = Math.max(+d.getMaxOverflow(), r);
    }
    r = this._minPadding = s.layout.autoPadding ? r : 0, this._updateLayout(r), n || E(o, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(nn("z", "_idx"));
    const { _active: a, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : a.length && this._updateHoverStyles(a, a, !0), this.render();
  }
  _updateScales() {
    E(this.scales, (t) => {
      ft.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, e = new Set(Object.keys(this._listeners)), s = new Set(t.events);
    (!bs(e, s) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, e = this._getUniformDataChanges() || [];
    for (const { method: s, start: n, count: o } of e) {
      const r = s === "_removeElements" ? -o : o;
      bc(t, n, r);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const e = this.data.datasets.length, s = (o) => new Set(t.filter((r) => r[0] === o).map((r, a) => a + "," + r.splice(1).join(","))), n = s(0);
    for (let o = 1; o < e; o++)
      if (!bs(n, s(o)))
        return;
    return Array.from(n).map((o) => o.split(",")).map((o) => ({
      method: o[1],
      start: +o[2],
      count: +o[3]
    }));
  }
  _updateLayout(t) {
    if (this.notifyPlugins("beforeLayout", {
      cancelable: !0
    }) === !1)
      return;
    ft.update(this, this.width, this.height, t);
    const e = this.chartArea, s = e.width <= 0 || e.height <= 0;
    this._layers = [], E(this.boxes, (n) => {
      s && n.position === "chartArea" || (n.configure && n.configure(), this._layers.push(...n._layers()));
    }, this), this._layers.forEach((n, o) => {
      n._idx = o;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(t) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode: t,
      cancelable: !0
    }) !== !1) {
      for (let e = 0, s = this.data.datasets.length; e < s; ++e)
        this.getDatasetMeta(e).controller.configure();
      for (let e = 0, s = this.data.datasets.length; e < s; ++e)
        this._updateDataset(e, mt(t) ? t({
          datasetIndex: e
        }) : t);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: t
      });
    }
  }
  _updateDataset(t, e) {
    const s = this.getDatasetMeta(t), n = {
      meta: s,
      index: t,
      mode: e,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", n) !== !1 && (s.controller._update(e), n.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", n));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (ot.has(this) ? this.attached && !ot.running(this) && ot.start(this) : (this.draw(), on({
      chart: this
    })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: s, height: n } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(s, n);
    }
    if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", {
      cancelable: !0
    }) === !1)
      return;
    const e = this._layers;
    for (t = 0; t < e.length && e[t].z <= 0; ++t)
      e[t].draw(this.chartArea);
    for (this._drawDatasets(); t < e.length; ++t)
      e[t].draw(this.chartArea);
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(t) {
    const e = this._sortedMetasets, s = [];
    let n, o;
    for (n = 0, o = e.length; n < o; ++n) {
      const r = e[n];
      (!t || r.visible) && s.push(r);
    }
    return s;
  }
  getSortedVisibleDatasetMetas() {
    return this._getSortedDatasetMetas(!0);
  }
  _drawDatasets() {
    if (this.notifyPlugins("beforeDatasetsDraw", {
      cancelable: !0
    }) === !1)
      return;
    const t = this.getSortedVisibleDatasetMetas();
    for (let e = t.length - 1; e >= 0; --e)
      this._drawDataset(t[e]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(t) {
    const e = this.ctx, s = {
      meta: t,
      index: t.index,
      cancelable: !0
    }, n = lo(this, t);
    this.notifyPlugins("beforeDatasetDraw", s) !== !1 && (n && ri(e, n), t.controller.draw(), n && ai(e), s.cancelable = !1, this.notifyPlugins("afterDatasetDraw", s));
  }
  isPointInArea(t) {
    return ve(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, e, s, n) {
    const o = ml.modes[e];
    return typeof o == "function" ? o(this, t, s, n) : [];
  }
  getDatasetMeta(t) {
    const e = this.data.datasets[t], s = this._metasets;
    let n = s.filter((o) => o && o._dataset === e).pop();
    return n || (n = {
      type: null,
      data: [],
      dataset: null,
      controller: null,
      hidden: null,
      xAxisID: null,
      yAxisID: null,
      order: e && e.order || 0,
      index: t,
      _dataset: e,
      _parsed: [],
      _sorted: !1
    }, s.push(n)), n;
  }
  getContext() {
    return this.$context || (this.$context = Lt(null, {
      chart: this,
      type: "chart"
    }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(t) {
    const e = this.data.datasets[t];
    if (!e)
      return !1;
    const s = this.getDatasetMeta(t);
    return typeof s.hidden == "boolean" ? !s.hidden : !e.hidden;
  }
  setDatasetVisibility(t, e) {
    const s = this.getDatasetMeta(t);
    s.hidden = !e;
  }
  toggleDataVisibility(t) {
    this._hiddenIndices[t] = !this._hiddenIndices[t];
  }
  getDataVisibility(t) {
    return !this._hiddenIndices[t];
  }
  _updateVisibility(t, e, s) {
    const n = s ? "show" : "hide", o = this.getDatasetMeta(t), r = o.controller._resolveAnimations(void 0, n);
    Je(e) ? (o.data[e].hidden = !s, this.update()) : (this.setDatasetVisibility(t, s), r.update(o, {
      visible: s
    }), this.update((a) => a.datasetIndex === t ? n : void 0));
  }
  hide(t, e) {
    this._updateVisibility(t, e, !1);
  }
  show(t, e) {
    this._updateVisibility(t, e, !0);
  }
  _destroyDatasetMeta(t) {
    const e = this._metasets[t];
    e && e.controller && e.controller._destroy(), delete this._metasets[t];
  }
  _stop() {
    let t, e;
    for (this.stop(), ot.remove(this), t = 0, e = this.data.datasets.length; t < e; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: e } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Cs(t, e), this.platform.releaseContext(e), this.canvas = null, this.ctx = null), delete Ye[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, e = this.platform, s = (o, r) => {
      e.addEventListener(this, o, r), t[o] = r;
    }, n = (o, r, a) => {
      o.offsetX = r, o.offsetY = a, this._eventHandler(o);
    };
    E(this.options.events, (o) => s(o, n));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, e = this.platform, s = (l, c) => {
      e.addEventListener(this, l, c), t[l] = c;
    }, n = (l, c) => {
      t[l] && (e.removeEventListener(this, l, c), delete t[l]);
    }, o = (l, c) => {
      this.canvas && this.resize(l, c);
    };
    let r;
    const a = () => {
      n("attach", a), this.attached = !0, this.resize(), s("resize", o), s("detach", r);
    };
    r = () => {
      this.attached = !1, n("resize", o), this._stop(), this._resize(0, 0), s("attach", a);
    }, e.isAttached(this.canvas) ? a() : r();
  }
  unbindEvents() {
    E(this._listeners, (t, e) => {
      this.platform.removeEventListener(this, e, t);
    }), this._listeners = {}, E(this._responsiveListeners, (t, e) => {
      this.platform.removeEventListener(this, e, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, e, s) {
    const n = s ? "set" : "remove";
    let o, r, a, l;
    for (e === "dataset" && (o = this.getDatasetMeta(t[0].datasetIndex), o.controller["_" + n + "DatasetHoverStyle"]()), a = 0, l = t.length; a < l; ++a) {
      r = t[a];
      const c = r && this.getDatasetMeta(r.datasetIndex).controller;
      c && c[n + "HoverStyle"](r.element, r.datasetIndex, r.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const e = this._active || [], s = t.map(({ datasetIndex: o, index: r }) => {
      const a = this.getDatasetMeta(o);
      if (!a)
        throw new Error("No dataset found at index " + o);
      return {
        datasetIndex: o,
        element: a.data[r],
        index: r
      };
    });
    !Ge(s, e) && (this._active = s, this._lastEvent = null, this._updateHoverStyles(s, e));
  }
  notifyPlugins(t, e, s) {
    return this._plugins.notify(this, t, e, s);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((e) => e.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, e, s) {
    const n = this.options.hover, o = (l, c) => l.filter((h) => !c.some((d) => h.datasetIndex === d.datasetIndex && h.index === d.index)), r = o(e, t), a = s ? t : o(t, e);
    r.length && this.updateHoverStyle(r, n.mode, !1), a.length && n.mode && this.updateHoverStyle(a, n.mode, !0);
  }
  _eventHandler(t, e) {
    const s = {
      event: t,
      replay: e,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, n = (r) => (r.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", s, n) === !1)
      return;
    const o = this._handleEvent(t, e, s.inChartArea);
    return s.cancelable = !1, this.notifyPlugins("afterEvent", s, n), (o || s.changed) && this.render(), this;
  }
  _handleEvent(t, e, s) {
    const { _active: n = [], options: o } = this, r = e, a = this._getActiveElements(t, n, s, r), l = Dr(t), c = yc(t, this._lastEvent, s, l);
    s && (this._lastEvent = null, L(o.onHover, [
      t,
      a,
      this
    ], this), l && L(o.onClick, [
      t,
      a,
      this
    ], this));
    const h = !Ge(a, n);
    return (h || e) && (this._active = a, this._updateHoverStyles(a, n, e)), this._lastEvent = c, h;
  }
  _getActiveElements(t, e, s, n) {
    if (t.type === "mouseout")
      return [];
    if (!s)
      return e;
    const o = this.options.hover;
    return this.getElementsAtEventForMode(t, o.mode, o, n);
  }
}
A(lt, "defaults", F), A(lt, "instances", Ye), A(lt, "overrides", $t), A(lt, "registry", it), A(lt, "version", pc), A(lt, "getChart", rn);
function an() {
  return E(lt.instances, (i) => i._plugins.invalidate());
}
function vo(i, t, e = t) {
  i.lineCap = C(e.borderCapStyle, t.borderCapStyle), i.setLineDash(C(e.borderDash, t.borderDash)), i.lineDashOffset = C(e.borderDashOffset, t.borderDashOffset), i.lineJoin = C(e.borderJoinStyle, t.borderJoinStyle), i.lineWidth = C(e.borderWidth, t.borderWidth), i.strokeStyle = C(e.borderColor, t.borderColor);
}
function xc(i, t, e) {
  i.lineTo(e.x, e.y);
}
function vc(i) {
  return i.stepped ? ra : i.tension || i.cubicInterpolationMode === "monotone" ? aa : xc;
}
function wo(i, t, e = {}) {
  const s = i.length, { start: n = 0, end: o = s - 1 } = e, { start: r, end: a } = t, l = Math.max(n, r), c = Math.min(o, a), h = n < r && o < r || n > a && o > a;
  return {
    count: s,
    start: l,
    loop: t.loop,
    ilen: c < l && !h ? s + c - l : c - l
  };
}
function wc(i, t, e, s) {
  const { points: n, options: o } = t, { count: r, start: a, loop: l, ilen: c } = wo(n, e, s), h = vc(o);
  let { move: d = !0, reverse: f } = s || {}, u, p, g;
  for (u = 0; u <= c; ++u)
    p = n[(a + (f ? c - u : u)) % r], !p.skip && (d ? (i.moveTo(p.x, p.y), d = !1) : h(i, g, p, f, o.stepped), g = p);
  return l && (p = n[(a + (f ? c : 0)) % r], h(i, g, p, f, o.stepped)), !!l;
}
function Sc(i, t, e, s) {
  const n = t.points, { count: o, start: r, ilen: a } = wo(n, e, s), { move: l = !0, reverse: c } = s || {};
  let h = 0, d = 0, f, u, p, g, m, _;
  const y = (w) => (r + (c ? a - w : w)) % o, v = () => {
    g !== m && (i.lineTo(h, m), i.lineTo(h, g), i.lineTo(h, _));
  };
  for (l && (u = n[y(0)], i.moveTo(u.x, u.y)), f = 0; f <= a; ++f) {
    if (u = n[y(f)], u.skip)
      continue;
    const w = u.x, b = u.y, k = w | 0;
    k === p ? (b < g ? g = b : b > m && (m = b), h = (d * h + w) / ++d) : (v(), i.lineTo(w, b), p = k, d = 0, g = m = b), _ = b;
  }
  v();
}
function Di(i) {
  const t = i.options, e = t.borderDash && t.borderDash.length;
  return !i._decimated && !i._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !e ? Sc : wc;
}
function kc(i) {
  return i.stepped ? Ba : i.tension || i.cubicInterpolationMode === "monotone" ? Na : At;
}
function Mc(i, t, e, s) {
  let n = t._path;
  n || (n = t._path = new Path2D(), t.path(n, e, s) && n.closePath()), vo(i, t.options), i.stroke(n);
}
function Ac(i, t, e, s) {
  const { segments: n, options: o } = t, r = Di(t);
  for (const a of n)
    vo(i, o, a.style), i.beginPath(), r(i, t, a, {
      start: e,
      end: e + s - 1
    }) && i.closePath(), i.stroke();
}
const Pc = typeof Path2D == "function";
function Cc(i, t, e, s) {
  Pc && !t.options.segment ? Mc(i, t, e, s) : Ac(i, t, e, s);
}
class ut extends _t {
  constructor(t) {
    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, t && Object.assign(this, t);
  }
  updateControlPoints(t, e) {
    const s = this.options;
    if ((s.tension || s.cubicInterpolationMode === "monotone") && !s.stepped && !this._pointsUpdated) {
      const n = s.spanGaps ? this._loop : this._fullLoop;
      Ea(this._points, s, t, n, e), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = Xa(this, this.options.segment));
  }
  first() {
    const t = this.segments, e = this.points;
    return t.length && e[t[0].start];
  }
  last() {
    const t = this.segments, e = this.points, s = t.length;
    return s && e[t[s - 1].end];
  }
  interpolate(t, e) {
    const s = this.options, n = t[e], o = this.points, r = ao(this, {
      property: e,
      start: n,
      end: n
    });
    if (!r.length)
      return;
    const a = [], l = kc(s);
    let c, h;
    for (c = 0, h = r.length; c < h; ++c) {
      const { start: d, end: f } = r[c], u = o[d], p = o[f];
      if (u === p) {
        a.push(u);
        continue;
      }
      const g = Math.abs((n - u[e]) / (p[e] - u[e])), m = l(u, p, g, s.stepped);
      m[e] = t[e], a.push(m);
    }
    return a.length === 1 ? a[0] : a;
  }
  pathSegment(t, e, s) {
    return Di(this)(t, this, e, s);
  }
  path(t, e, s) {
    const n = this.segments, o = Di(this);
    let r = this._loop;
    e = e || 0, s = s || this.points.length - e;
    for (const a of n)
      r &= o(t, this, a, {
        start: e,
        end: e + s - 1
      });
    return !!r;
  }
  draw(t, e, s, n) {
    const o = this.options || {};
    (this.points || []).length && o.borderWidth && (t.save(), Cc(t, this, s, n), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
A(ut, "id", "line"), A(ut, "defaults", {
  borderCapStyle: "butt",
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: "miter",
  borderWidth: 3,
  capBezierPoints: !0,
  cubicInterpolationMode: "default",
  fill: !1,
  spanGaps: !1,
  stepped: !1,
  tension: 0
}), A(ut, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
}), A(ut, "descriptors", {
  _scriptable: !0,
  _indexable: (t) => t !== "borderDash" && t !== "fill"
});
function ln(i, t, e, s) {
  const n = i.options, { [e]: o } = i.getProps([
    e
  ], s);
  return Math.abs(t - o) < n.radius + n.hitRadius;
}
class Xe extends _t {
  constructor(e) {
    super();
    A(this, "parsed");
    A(this, "skip");
    A(this, "stop");
    this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, e && Object.assign(this, e);
  }
  inRange(e, s, n) {
    const o = this.options, { x: r, y: a } = this.getProps([
      "x",
      "y"
    ], n);
    return Math.pow(e - r, 2) + Math.pow(s - a, 2) < Math.pow(o.hitRadius + o.radius, 2);
  }
  inXRange(e, s) {
    return ln(this, e, "x", s);
  }
  inYRange(e, s) {
    return ln(this, e, "y", s);
  }
  getCenterPoint(e) {
    const { x: s, y: n } = this.getProps([
      "x",
      "y"
    ], e);
    return {
      x: s,
      y: n
    };
  }
  size(e) {
    e = e || this.options || {};
    let s = e.radius || 0;
    s = Math.max(s, s && e.hoverRadius || 0);
    const n = s && e.borderWidth || 0;
    return (s + n) * 2;
  }
  draw(e, s) {
    const n = this.options;
    this.skip || n.radius < 0.1 || !ve(this, s, this.size(n) / 2) || (e.strokeStyle = n.borderColor, e.lineWidth = n.borderWidth, e.fillStyle = n.backgroundColor, Pi(e, n, this.x, this.y));
  }
  getRange() {
    const e = this.options || {};
    return e.radius + e.hitRadius;
  }
}
A(Xe, "id", "point"), /**
* @type {any}
*/
A(Xe, "defaults", {
  borderWidth: 1,
  hitRadius: 1,
  hoverBorderWidth: 1,
  hoverRadius: 4,
  pointStyle: "circle",
  radius: 3,
  rotation: 0
}), /**
* @type {any}
*/
A(Xe, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
function Oc(i, t, e) {
  const s = i.segments, n = i.points, o = t.points, r = [];
  for (const a of s) {
    let { start: l, end: c } = a;
    c = hi(l, c, n);
    const h = Ei(e, n[l], n[c], a.loop);
    if (!t.segments) {
      r.push({
        source: a,
        target: h,
        start: n[l],
        end: n[c]
      });
      continue;
    }
    const d = ao(t, h);
    for (const f of d) {
      const u = Ei(e, o[f.start], o[f.end], f.loop), p = ro(a, n, u);
      for (const g of p)
        r.push({
          source: g,
          target: f,
          start: {
            [e]: cn(h, u, "start", Math.max)
          },
          end: {
            [e]: cn(h, u, "end", Math.min)
          }
        });
    }
  }
  return r;
}
function Ei(i, t, e, s) {
  if (s)
    return;
  let n = t[i], o = e[i];
  return i === "angle" && (n = st(n), o = st(o)), {
    property: i,
    start: n,
    end: o
  };
}
function Tc(i, t) {
  const { x: e = null, y: s = null } = i || {}, n = t.points, o = [];
  return t.segments.forEach(({ start: r, end: a }) => {
    a = hi(r, a, n);
    const l = n[r], c = n[a];
    s !== null ? (o.push({
      x: l.x,
      y: s
    }), o.push({
      x: c.x,
      y: s
    })) : e !== null && (o.push({
      x: e,
      y: l.y
    }), o.push({
      x: e,
      y: c.y
    }));
  }), o;
}
function hi(i, t, e) {
  for (; t > i; t--) {
    const s = e[t];
    if (!isNaN(s.x) && !isNaN(s.y))
      break;
  }
  return t;
}
function cn(i, t, e, s) {
  return i && t ? s(i[e], t[e]) : i ? i[e] : t ? t[e] : 0;
}
function So(i, t) {
  let e = [], s = !1;
  return z(i) ? (s = !0, e = i) : e = Tc(i, t), e.length ? new ut({
    points: e,
    options: {
      tension: 0
    },
    _loop: s,
    _fullLoop: s
  }) : null;
}
function hn(i) {
  return i && i.fill !== !1;
}
function Dc(i, t, e) {
  let n = i[t].fill;
  const o = [
    t
  ];
  let r;
  if (!e)
    return n;
  for (; n !== !1 && o.indexOf(n) === -1; ) {
    if (!N(n))
      return n;
    if (r = i[n], !r)
      return !1;
    if (r.visible)
      return n;
    o.push(n), n = r.fill;
  }
  return !1;
}
function Ec(i, t, e) {
  const s = Rc(i);
  if (O(s))
    return isNaN(s.value) ? !1 : s;
  let n = parseFloat(s);
  return N(n) && Math.floor(n) === n ? $c(s[0], t, n, e) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(s) >= 0 && s;
}
function $c(i, t, e, s) {
  return (i === "-" || i === "+") && (e = t + e), e === t || e < 0 || e >= s ? !1 : e;
}
function Lc(i, t) {
  let e = null;
  return i === "start" ? e = t.bottom : i === "end" ? e = t.top : O(i) ? e = t.getPixelForValue(i.value) : t.getBasePixel && (e = t.getBasePixel()), e;
}
function Ic(i, t, e) {
  let s;
  return i === "start" ? s = e : i === "end" ? s = t.options.reverse ? t.min : t.max : O(i) ? s = i.value : s = t.getBaseValue(), s;
}
function Rc(i) {
  const t = i.options, e = t.fill;
  let s = C(e && e.target, e);
  return s === void 0 && (s = !!t.backgroundColor), s === !1 || s === null ? !1 : s === !0 ? "origin" : s;
}
function Fc(i) {
  const { scale: t, index: e, line: s } = i, n = [], o = s.segments, r = s.points, a = zc(t, e);
  a.push(So({
    x: null,
    y: t.bottom
  }, s));
  for (let l = 0; l < o.length; l++) {
    const c = o[l];
    for (let h = c.start; h <= c.end; h++)
      Hc(n, r[h], a);
  }
  return new ut({
    points: n,
    options: {}
  });
}
function zc(i, t) {
  const e = [], s = i.getMatchingVisibleMetas("line");
  for (let n = 0; n < s.length; n++) {
    const o = s[n];
    if (o.index === t)
      break;
    o.hidden || e.unshift(o.dataset);
  }
  return e;
}
function Hc(i, t, e) {
  const s = [];
  for (let n = 0; n < e.length; n++) {
    const o = e[n], { first: r, last: a, point: l } = Bc(o, t, "x");
    if (!(!l || r && a)) {
      if (r)
        s.unshift(l);
      else if (i.push(l), !a)
        break;
    }
  }
  i.push(...s);
}
function Bc(i, t, e) {
  const s = i.interpolate(t, e);
  if (!s)
    return {};
  const n = s[e], o = i.segments, r = i.points;
  let a = !1, l = !1;
  for (let c = 0; c < o.length; c++) {
    const h = o[c], d = r[h.start][e], f = r[h.end][e];
    if (Ht(n, d, f)) {
      a = n === d, l = n === f;
      break;
    }
  }
  return {
    first: a,
    last: l,
    point: s
  };
}
class ko {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, e, s) {
    const { x: n, y: o, radius: r } = this;
    return e = e || {
      start: 0,
      end: Z
    }, t.arc(n, o, r, e.end, e.start, !0), !s.bounds;
  }
  interpolate(t) {
    const { x: e, y: s, radius: n } = this, o = t.angle;
    return {
      x: e + Math.cos(o) * n,
      y: s + Math.sin(o) * n,
      angle: o
    };
  }
}
function Nc(i) {
  const { chart: t, fill: e, line: s } = i;
  if (N(e))
    return Wc(t, e);
  if (e === "stack")
    return Fc(i);
  if (e === "shape")
    return !0;
  const n = jc(i);
  return n instanceof ko ? n : So(n, s);
}
function Wc(i, t) {
  const e = i.getDatasetMeta(t);
  return e && i.isDatasetVisible(t) ? e.dataset : null;
}
function jc(i) {
  return (i.scale || {}).getPointPositionForValue ? Uc(i) : Vc(i);
}
function Vc(i) {
  const { scale: t = {}, fill: e } = i, s = Lc(e, t);
  if (N(s)) {
    const n = t.isHorizontal();
    return {
      x: n ? s : null,
      y: n ? null : s
    };
  }
  return null;
}
function Uc(i) {
  const { scale: t, fill: e } = i, s = t.options, n = t.getLabels().length, o = s.reverse ? t.max : t.min, r = Ic(e, t, o), a = [];
  if (s.grid.circular) {
    const l = t.getPointPositionForValue(0, o);
    return new ko({
      x: l.x,
      y: l.y,
      radius: t.getDistanceFromCenterForValue(r)
    });
  }
  for (let l = 0; l < n; ++l)
    a.push(t.getPointPositionForValue(l, r));
  return a;
}
function wi(i, t, e) {
  const s = Nc(t), { chart: n, index: o, line: r, scale: a, axis: l } = t, c = r.options, h = c.fill, d = c.backgroundColor, { above: f = d, below: u = d } = h || {}, p = n.getDatasetMeta(o), g = lo(n, p);
  s && r.points.length && (ri(i, e), Yc(i, {
    line: r,
    target: s,
    above: f,
    below: u,
    area: e,
    scale: a,
    axis: l,
    clip: g
  }), ai(i));
}
function Yc(i, t) {
  const { line: e, target: s, above: n, below: o, area: r, scale: a, clip: l } = t, c = e._loop ? "angle" : t.axis;
  i.save();
  let h = o;
  o !== n && (c === "x" ? (dn(i, s, r.top), Si(i, {
    line: e,
    target: s,
    color: n,
    scale: a,
    property: c,
    clip: l
  }), i.restore(), i.save(), dn(i, s, r.bottom)) : c === "y" && (fn(i, s, r.left), Si(i, {
    line: e,
    target: s,
    color: o,
    scale: a,
    property: c,
    clip: l
  }), i.restore(), i.save(), fn(i, s, r.right), h = n)), Si(i, {
    line: e,
    target: s,
    color: h,
    scale: a,
    property: c,
    clip: l
  }), i.restore();
}
function dn(i, t, e) {
  const { segments: s, points: n } = t;
  let o = !0, r = !1;
  i.beginPath();
  for (const a of s) {
    const { start: l, end: c } = a, h = n[l], d = n[hi(l, c, n)];
    o ? (i.moveTo(h.x, h.y), o = !1) : (i.lineTo(h.x, e), i.lineTo(h.x, h.y)), r = !!t.pathSegment(i, a, {
      move: r
    }), r ? i.closePath() : i.lineTo(d.x, e);
  }
  i.lineTo(t.first().x, e), i.closePath(), i.clip();
}
function fn(i, t, e) {
  const { segments: s, points: n } = t;
  let o = !0, r = !1;
  i.beginPath();
  for (const a of s) {
    const { start: l, end: c } = a, h = n[l], d = n[hi(l, c, n)];
    o ? (i.moveTo(h.x, h.y), o = !1) : (i.lineTo(e, h.y), i.lineTo(h.x, h.y)), r = !!t.pathSegment(i, a, {
      move: r
    }), r ? i.closePath() : i.lineTo(e, d.y);
  }
  i.lineTo(e, t.first().y), i.closePath(), i.clip();
}
function Si(i, t) {
  const { line: e, target: s, property: n, color: o, scale: r, clip: a } = t, l = Oc(e, s, n);
  for (const { source: c, target: h, start: d, end: f } of l) {
    const { style: { backgroundColor: u = o } = {} } = c, p = s !== !0;
    i.save(), i.fillStyle = u, Xc(i, r, a, p && Ei(n, d, f)), i.beginPath();
    const g = !!e.pathSegment(i, c);
    let m;
    if (p) {
      g ? i.closePath() : un(i, s, f, n);
      const _ = !!s.pathSegment(i, h, {
        move: g,
        reverse: !0
      });
      m = g && _, m || un(i, s, d, n);
    }
    i.closePath(), i.fill(m ? "evenodd" : "nonzero"), i.restore();
  }
}
function Xc(i, t, e, s) {
  const n = t.chart.chartArea, { property: o, start: r, end: a } = s || {};
  if (o === "x" || o === "y") {
    let l, c, h, d;
    o === "x" ? (l = r, c = n.top, h = a, d = n.bottom) : (l = n.left, c = r, h = n.right, d = a), i.beginPath(), e && (l = Math.max(l, e.left), h = Math.min(h, e.right), c = Math.max(c, e.top), d = Math.min(d, e.bottom)), i.rect(l, c, h - l, d - c), i.clip();
  }
}
function un(i, t, e, s) {
  const n = t.interpolate(e, s);
  n && i.lineTo(n.x, n.y);
}
var qc = {
  id: "filler",
  afterDatasetsUpdate(i, t, e) {
    const s = (i.data.datasets || []).length, n = [];
    let o, r, a, l;
    for (r = 0; r < s; ++r)
      o = i.getDatasetMeta(r), a = o.dataset, l = null, a && a.options && a instanceof ut && (l = {
        visible: i.isDatasetVisible(r),
        index: r,
        fill: Ec(a, r, s),
        chart: i,
        axis: o.controller.options.indexAxis,
        scale: o.vScale,
        line: a
      }), o.$filler = l, n.push(l);
    for (r = 0; r < s; ++r)
      l = n[r], !(!l || l.fill === !1) && (l.fill = Dc(n, r, e.propagate));
  },
  beforeDraw(i, t, e) {
    const s = e.drawTime === "beforeDraw", n = i.getSortedVisibleDatasetMetas(), o = i.chartArea;
    for (let r = n.length - 1; r >= 0; --r) {
      const a = n[r].$filler;
      a && (a.line.updateControlPoints(o, a.axis), s && a.fill && wi(i.ctx, a, o));
    }
  },
  beforeDatasetsDraw(i, t, e) {
    if (e.drawTime !== "beforeDatasetsDraw")
      return;
    const s = i.getSortedVisibleDatasetMetas();
    for (let n = s.length - 1; n >= 0; --n) {
      const o = s[n].$filler;
      hn(o) && wi(i.ctx, o, i.chartArea);
    }
  },
  beforeDatasetDraw(i, t, e) {
    const s = t.meta.$filler;
    !hn(s) || e.drawTime !== "beforeDatasetDraw" || wi(i.ctx, s, i.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const gn = (i, t) => {
  let { boxHeight: e = t, boxWidth: s = t } = i;
  return i.usePointStyle && (e = Math.min(e, t), s = i.pointStyleWidth || Math.min(s, t)), {
    boxWidth: s,
    boxHeight: e,
    itemHeight: Math.max(t, e)
  };
}, Kc = (i, t) => i !== null && t !== null && i.datasetIndex === t.datasetIndex && i.index === t.index;
class pn extends _t {
  constructor(t) {
    super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, e, s) {
    this.maxWidth = t, this.maxHeight = e, this._margins = s, this.setDimensions(), this.buildLabels(), this.fit();
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
  }
  buildLabels() {
    const t = this.options.labels || {};
    let e = L(t.generateLabels, [
      this.chart
    ], this) || [];
    t.filter && (e = e.filter((s) => t.filter(s, this.chart.data))), t.sort && (e = e.sort((s, n) => t.sort(s, n, this.chart.data))), this.options.reverse && e.reverse(), this.legendItems = e;
  }
  fit() {
    const { options: t, ctx: e } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const s = t.labels, n = U(s.font), o = n.size, r = this._computeTitleHeight(), { boxWidth: a, itemHeight: l } = gn(s, o);
    let c, h;
    e.font = n.string, this.isHorizontal() ? (c = this.maxWidth, h = this._fitRows(r, o, a, l) + 10) : (h = this.maxHeight, c = this._fitCols(r, n, a, l) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(h, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, e, s, n) {
    const { ctx: o, maxWidth: r, options: { labels: { padding: a } } } = this, l = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], h = n + a;
    let d = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let f = -1, u = -h;
    return this.legendItems.forEach((p, g) => {
      const m = s + e / 2 + o.measureText(p.text).width;
      (g === 0 || c[c.length - 1] + m + 2 * a > r) && (d += h, c[c.length - (g > 0 ? 0 : 1)] = 0, u += h, f++), l[g] = {
        left: 0,
        top: u,
        row: f,
        width: m,
        height: n
      }, c[c.length - 1] += m + a;
    }), d;
  }
  _fitCols(t, e, s, n) {
    const { ctx: o, maxHeight: r, options: { labels: { padding: a } } } = this, l = this.legendHitBoxes = [], c = this.columnSizes = [], h = r - t;
    let d = a, f = 0, u = 0, p = 0, g = 0;
    return this.legendItems.forEach((m, _) => {
      const { itemWidth: y, itemHeight: v } = Gc(s, e, o, m, n);
      _ > 0 && u + v + 2 * a > h && (d += f + a, c.push({
        width: f,
        height: u
      }), p += f + a, g++, f = u = 0), l[_] = {
        left: p,
        top: u,
        col: g,
        width: y,
        height: v
      }, f = Math.max(f, y), u += v + a;
    }), d += f, c.push({
      width: f,
      height: u
    }), d;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: e, options: { align: s, labels: { padding: n }, rtl: o } } = this, r = Nt(o, this.left, this.width);
    if (this.isHorizontal()) {
      let a = 0, l = Y(s, this.left + n, this.right - this.lineWidths[a]);
      for (const c of e)
        a !== c.row && (a = c.row, l = Y(s, this.left + n, this.right - this.lineWidths[a])), c.top += this.top + t + n, c.left = r.leftForLtr(r.x(l), c.width), l += c.width + n;
    } else {
      let a = 0, l = Y(s, this.top + t + n, this.bottom - this.columnSizes[a].height);
      for (const c of e)
        c.col !== a && (a = c.col, l = Y(s, this.top + t + n, this.bottom - this.columnSizes[a].height)), c.top = l, c.left += this.left + n, c.left = r.leftForLtr(r.x(c.left), c.width), l += c.height + n;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      ri(t, this), this._draw(), ai(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: e, lineWidths: s, ctx: n } = this, { align: o, labels: r } = t, a = F.color, l = Nt(t.rtl, this.left, this.width), c = U(r.font), { padding: h } = r, d = c.size, f = d / 2;
    let u;
    this.drawTitle(), n.textAlign = l.textAlign("left"), n.textBaseline = "middle", n.lineWidth = 0.5, n.font = c.string;
    const { boxWidth: p, boxHeight: g, itemHeight: m } = gn(r, d), _ = function(k, S, x) {
      if (isNaN(p) || p <= 0 || isNaN(g) || g < 0)
        return;
      n.save();
      const M = C(x.lineWidth, 1);
      if (n.fillStyle = C(x.fillStyle, a), n.lineCap = C(x.lineCap, "butt"), n.lineDashOffset = C(x.lineDashOffset, 0), n.lineJoin = C(x.lineJoin, "miter"), n.lineWidth = M, n.strokeStyle = C(x.strokeStyle, a), n.setLineDash(C(x.lineDash, [])), r.usePointStyle) {
        const T = {
          radius: g * Math.SQRT2 / 2,
          pointStyle: x.pointStyle,
          rotation: x.rotation,
          borderWidth: M
        }, P = l.xPlus(k, p / 2), D = S + f;
        Gn(n, T, P, D, r.pointStyleWidth && p);
      } else {
        const T = S + Math.max((d - g) / 2, 0), P = l.leftForLtr(k, p), D = ue(x.borderRadius);
        n.beginPath(), Object.values(D).some((W) => W !== 0) ? Ci(n, {
          x: P,
          y: T,
          w: p,
          h: g,
          radius: D
        }) : n.rect(P, T, p, g), n.fill(), M !== 0 && n.stroke();
      }
      n.restore();
    }, y = function(k, S, x) {
      ei(n, x.text, k, S + m / 2, c, {
        strikethrough: x.hidden,
        textAlign: l.textAlign(x.textAlign)
      });
    }, v = this.isHorizontal(), w = this._computeTitleHeight();
    v ? u = {
      x: Y(o, this.left + h, this.right - s[0]),
      y: this.top + h + w,
      line: 0
    } : u = {
      x: this.left + h,
      y: Y(o, this.top + w + h, this.bottom - e[0].height),
      line: 0
    }, so(this.ctx, t.textDirection);
    const b = m + h;
    this.legendItems.forEach((k, S) => {
      n.strokeStyle = k.fontColor, n.fillStyle = k.fontColor;
      const x = n.measureText(k.text).width, M = l.textAlign(k.textAlign || (k.textAlign = r.textAlign)), T = p + f + x;
      let P = u.x, D = u.y;
      l.setWidth(this.width), v ? S > 0 && P + T + h > this.right && (D = u.y += b, u.line++, P = u.x = Y(o, this.left + h, this.right - s[u.line])) : S > 0 && D + b > this.bottom && (P = u.x = P + e[u.line].width + h, u.line++, D = u.y = Y(o, this.top + w + h, this.bottom - e[u.line].height));
      const W = l.x(P);
      if (_(W, D, k), P = Xr(M, P + p + f, v ? P + T : this.right, t.rtl), y(l.x(P), D, k), v)
        u.x += T + h;
      else if (typeof k.text != "string") {
        const J = c.lineHeight;
        u.y += Mo(k, J) + h;
      } else
        u.y += b;
    }), no(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, e = t.title, s = U(e.font), n = Q(e.padding);
    if (!e.display)
      return;
    const o = Nt(t.rtl, this.left, this.width), r = this.ctx, a = e.position, l = s.size / 2, c = n.top + l;
    let h, d = this.left, f = this.width;
    if (this.isHorizontal())
      f = Math.max(...this.lineWidths), h = this.top + c, d = Y(t.align, d, this.right - f);
    else {
      const p = this.columnSizes.reduce((g, m) => Math.max(g, m.height), 0);
      h = c + Y(t.align, this.top, this.bottom - p - t.labels.padding - this._computeTitleHeight());
    }
    const u = Y(a, d, d + f);
    r.textAlign = o.textAlign(Xn(a)), r.textBaseline = "middle", r.strokeStyle = e.color, r.fillStyle = e.color, r.font = s.string, ei(r, e.text, u, h, s);
  }
  _computeTitleHeight() {
    const t = this.options.title, e = U(t.font), s = Q(t.padding);
    return t.display ? e.lineHeight + s.height : 0;
  }
  _getLegendItemAt(t, e) {
    let s, n, o;
    if (Ht(t, this.left, this.right) && Ht(e, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, s = 0; s < o.length; ++s)
        if (n = o[s], Ht(t, n.left, n.left + n.width) && Ht(e, n.top, n.top + n.height))
          return this.legendItems[s];
    }
    return null;
  }
  handleEvent(t) {
    const e = this.options;
    if (!Jc(t.type, e))
      return;
    const s = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const n = this._hoveredItem, o = Kc(n, s);
      n && !o && L(e.onLeave, [
        t,
        n,
        this
      ], this), this._hoveredItem = s, s && !o && L(e.onHover, [
        t,
        s,
        this
      ], this);
    } else s && L(e.onClick, [
      t,
      s,
      this
    ], this);
  }
}
function Gc(i, t, e, s, n) {
  const o = Zc(s, i, t, e), r = Qc(n, s, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: r
  };
}
function Zc(i, t, e, s) {
  let n = i.text;
  return n && typeof n != "string" && (n = n.reduce((o, r) => o.length > r.length ? o : r)), t + e.size / 2 + s.measureText(n).width;
}
function Qc(i, t, e) {
  let s = i;
  return typeof t.text != "string" && (s = Mo(t, e)), s;
}
function Mo(i, t) {
  const e = i.text ? i.text.length : 0;
  return t * e;
}
function Jc(i, t) {
  return !!((i === "mousemove" || i === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (i === "click" || i === "mouseup"));
}
var th = {
  id: "legend",
  _element: pn,
  start(i, t, e) {
    const s = i.legend = new pn({
      ctx: i.ctx,
      options: e,
      chart: i
    });
    ft.configure(i, s, e), ft.addBox(i, s);
  },
  stop(i) {
    ft.removeBox(i, i.legend), delete i.legend;
  },
  beforeUpdate(i, t, e) {
    const s = i.legend;
    ft.configure(i, s, e), s.options = e;
  },
  afterUpdate(i) {
    const t = i.legend;
    t.buildLabels(), t.adjustHitBoxes();
  },
  afterEvent(i, t) {
    t.replay || i.legend.handleEvent(t.event);
  },
  defaults: {
    display: !0,
    position: "top",
    align: "center",
    fullSize: !0,
    reverse: !1,
    weight: 1e3,
    onClick(i, t, e) {
      const s = t.datasetIndex, n = e.chart;
      n.isDatasetVisible(s) ? (n.hide(s), t.hidden = !0) : (n.show(s), t.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (i) => i.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(i) {
        const t = i.data.datasets, { labels: { usePointStyle: e, pointStyle: s, textAlign: n, color: o, useBorderRadius: r, borderRadius: a } } = i.legend.options;
        return i._getSortedDatasetMetas().map((l) => {
          const c = l.controller.getStyle(e ? 0 : void 0), h = Q(c.borderWidth);
          return {
            text: t[l.index].label,
            fillStyle: c.backgroundColor,
            fontColor: o,
            hidden: !l.visible,
            lineCap: c.borderCapStyle,
            lineDash: c.borderDash,
            lineDashOffset: c.borderDashOffset,
            lineJoin: c.borderJoinStyle,
            lineWidth: (h.width + h.height) / 4,
            strokeStyle: c.borderColor,
            pointStyle: s || c.pointStyle,
            rotation: c.rotation,
            textAlign: n || c.textAlign,
            borderRadius: r && (a || c.borderRadius),
            datasetIndex: l.index
          };
        }, this);
      }
    },
    title: {
      color: (i) => i.chart.options.color,
      display: !1,
      position: "center",
      text: ""
    }
  },
  descriptors: {
    _scriptable: (i) => !i.startsWith("on"),
    labels: {
      _scriptable: (i) => ![
        "generateLabels",
        "filter",
        "sort"
      ].includes(i)
    }
  }
};
const oe = {
  average(i) {
    if (!i.length)
      return !1;
    let t, e, s = /* @__PURE__ */ new Set(), n = 0, o = 0;
    for (t = 0, e = i.length; t < e; ++t) {
      const a = i[t].element;
      if (a && a.hasValue()) {
        const l = a.tooltipPosition();
        s.add(l.x), n += l.y, ++o;
      }
    }
    return o === 0 || s.size === 0 ? !1 : {
      x: [
        ...s
      ].reduce((a, l) => a + l) / s.size,
      y: n / o
    };
  },
  nearest(i, t) {
    if (!i.length)
      return !1;
    let e = t.x, s = t.y, n = Number.POSITIVE_INFINITY, o, r, a;
    for (o = 0, r = i.length; o < r; ++o) {
      const l = i[o].element;
      if (l && l.hasValue()) {
        const c = l.getCenterPoint(), h = Mi(t, c);
        h < n && (n = h, a = l);
      }
    }
    if (a) {
      const l = a.tooltipPosition();
      e = l.x, s = l.y;
    }
    return {
      x: e,
      y: s
    };
  }
};
function et(i, t) {
  return t && (z(t) ? Array.prototype.push.apply(i, t) : i.push(t)), i;
}
function rt(i) {
  return (typeof i == "string" || i instanceof String) && i.indexOf(`
`) > -1 ? i.split(`
`) : i;
}
function eh(i, t) {
  const { element: e, datasetIndex: s, index: n } = t, o = i.getDatasetMeta(s).controller, { label: r, value: a } = o.getLabelAndValue(n);
  return {
    chart: i,
    label: r,
    parsed: o.getParsed(n),
    raw: i.data.datasets[s].data[n],
    formattedValue: a,
    dataset: o.getDataset(),
    dataIndex: n,
    datasetIndex: s,
    element: e
  };
}
function mn(i, t) {
  const e = i.chart.ctx, { body: s, footer: n, title: o } = i, { boxWidth: r, boxHeight: a } = t, l = U(t.bodyFont), c = U(t.titleFont), h = U(t.footerFont), d = o.length, f = n.length, u = s.length, p = Q(t.padding);
  let g = p.height, m = 0, _ = s.reduce((w, b) => w + b.before.length + b.lines.length + b.after.length, 0);
  if (_ += i.beforeBody.length + i.afterBody.length, d && (g += d * c.lineHeight + (d - 1) * t.titleSpacing + t.titleMarginBottom), _) {
    const w = t.displayColors ? Math.max(a, l.lineHeight) : l.lineHeight;
    g += u * w + (_ - u) * l.lineHeight + (_ - 1) * t.bodySpacing;
  }
  f && (g += t.footerMarginTop + f * h.lineHeight + (f - 1) * t.footerSpacing);
  let y = 0;
  const v = function(w) {
    m = Math.max(m, e.measureText(w).width + y);
  };
  return e.save(), e.font = c.string, E(i.title, v), e.font = l.string, E(i.beforeBody.concat(i.afterBody), v), y = t.displayColors ? r + 2 + t.boxPadding : 0, E(s, (w) => {
    E(w.before, v), E(w.lines, v), E(w.after, v);
  }), y = 0, e.font = h.string, E(i.footer, v), e.restore(), m += p.width, {
    width: m,
    height: g
  };
}
function ih(i, t) {
  const { y: e, height: s } = t;
  return e < s / 2 ? "top" : e > i.height - s / 2 ? "bottom" : "center";
}
function sh(i, t, e, s) {
  const { x: n, width: o } = s, r = e.caretSize + e.caretPadding;
  if (i === "left" && n + o + r > t.width || i === "right" && n - o - r < 0)
    return !0;
}
function nh(i, t, e, s) {
  const { x: n, width: o } = e, { width: r, chartArea: { left: a, right: l } } = i;
  let c = "center";
  return s === "center" ? c = n <= (a + l) / 2 ? "left" : "right" : n <= o / 2 ? c = "left" : n >= r - o / 2 && (c = "right"), sh(c, i, t, e) && (c = "center"), c;
}
function _n(i, t, e) {
  const s = e.yAlign || t.yAlign || ih(i, e);
  return {
    xAlign: e.xAlign || t.xAlign || nh(i, t, e, s),
    yAlign: s
  };
}
function oh(i, t) {
  let { x: e, width: s } = i;
  return t === "right" ? e -= s : t === "center" && (e -= s / 2), e;
}
function rh(i, t, e) {
  let { y: s, height: n } = i;
  return t === "top" ? s += e : t === "bottom" ? s -= n + e : s -= n / 2, s;
}
function bn(i, t, e, s) {
  const { caretSize: n, caretPadding: o, cornerRadius: r } = i, { xAlign: a, yAlign: l } = e, c = n + o, { topLeft: h, topRight: d, bottomLeft: f, bottomRight: u } = ue(r);
  let p = oh(t, a);
  const g = rh(t, l, c);
  return l === "center" ? a === "left" ? p += c : a === "right" && (p -= c) : a === "left" ? p -= Math.max(h, f) + n : a === "right" && (p += Math.max(d, u) + n), {
    x: K(p, 0, s.width - t.width),
    y: K(g, 0, s.height - t.height)
  };
}
function Ne(i, t, e) {
  const s = Q(e.padding);
  return t === "center" ? i.x + i.width / 2 : t === "right" ? i.x + i.width - s.right : i.x + s.left;
}
function yn(i) {
  return et([], rt(i));
}
function ah(i, t, e) {
  return Lt(i, {
    tooltip: t,
    tooltipItems: e,
    type: "tooltip"
  });
}
function xn(i, t) {
  const e = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return e ? i.override(e) : i;
}
const Ao = {
  beforeTitle: nt,
  title(i) {
    if (i.length > 0) {
      const t = i[0], e = t.chart.data.labels, s = e ? e.length : 0;
      if (this && this.options && this.options.mode === "dataset")
        return t.dataset.label || "";
      if (t.label)
        return t.label;
      if (s > 0 && t.dataIndex < s)
        return e[t.dataIndex];
    }
    return "";
  },
  afterTitle: nt,
  beforeBody: nt,
  beforeLabel: nt,
  label(i) {
    if (this && this.options && this.options.mode === "dataset")
      return i.label + ": " + i.formattedValue || i.formattedValue;
    let t = i.dataset.label || "";
    t && (t += ": ");
    const e = i.formattedValue;
    return $(e) || (t += e), t;
  },
  labelColor(i) {
    const e = i.chart.getDatasetMeta(i.datasetIndex).controller.getStyle(i.dataIndex);
    return {
      borderColor: e.borderColor,
      backgroundColor: e.backgroundColor,
      borderWidth: e.borderWidth,
      borderDash: e.borderDash,
      borderDashOffset: e.borderDashOffset,
      borderRadius: 0
    };
  },
  labelTextColor() {
    return this.options.bodyColor;
  },
  labelPointStyle(i) {
    const e = i.chart.getDatasetMeta(i.datasetIndex).controller.getStyle(i.dataIndex);
    return {
      pointStyle: e.pointStyle,
      rotation: e.rotation
    };
  },
  afterLabel: nt,
  afterBody: nt,
  beforeFooter: nt,
  footer: nt,
  afterFooter: nt
};
function j(i, t, e, s) {
  const n = i[t].call(e, s);
  return typeof n > "u" ? Ao[t].call(e, s) : n;
}
class $i extends _t {
  constructor(t) {
    super(), this.opacity = 0, this._active = [], this._eventPosition = void 0, this._size = void 0, this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, this.$context = void 0, this.chart = t.chart, this.options = t.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, this.labelTextColors = void 0;
  }
  initialize(t) {
    this.options = t, this._cachedAnimations = void 0, this.$context = void 0;
  }
  _resolveAnimations() {
    const t = this._cachedAnimations;
    if (t)
      return t;
    const e = this.chart, s = this.options.setContext(this.getContext()), n = s.enabled && e.options.animation && s.animations, o = new co(this.chart, n);
    return n._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = ah(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, e) {
    const { callbacks: s } = e, n = j(s, "beforeTitle", this, t), o = j(s, "title", this, t), r = j(s, "afterTitle", this, t);
    let a = [];
    return a = et(a, rt(n)), a = et(a, rt(o)), a = et(a, rt(r)), a;
  }
  getBeforeBody(t, e) {
    return yn(j(e.callbacks, "beforeBody", this, t));
  }
  getBody(t, e) {
    const { callbacks: s } = e, n = [];
    return E(t, (o) => {
      const r = {
        before: [],
        lines: [],
        after: []
      }, a = xn(s, o);
      et(r.before, rt(j(a, "beforeLabel", this, o))), et(r.lines, j(a, "label", this, o)), et(r.after, rt(j(a, "afterLabel", this, o))), n.push(r);
    }), n;
  }
  getAfterBody(t, e) {
    return yn(j(e.callbacks, "afterBody", this, t));
  }
  getFooter(t, e) {
    const { callbacks: s } = e, n = j(s, "beforeFooter", this, t), o = j(s, "footer", this, t), r = j(s, "afterFooter", this, t);
    let a = [];
    return a = et(a, rt(n)), a = et(a, rt(o)), a = et(a, rt(r)), a;
  }
  _createItems(t) {
    const e = this._active, s = this.chart.data, n = [], o = [], r = [];
    let a = [], l, c;
    for (l = 0, c = e.length; l < c; ++l)
      a.push(eh(this.chart, e[l]));
    return t.filter && (a = a.filter((h, d, f) => t.filter(h, d, f, s))), t.itemSort && (a = a.sort((h, d) => t.itemSort(h, d, s))), E(a, (h) => {
      const d = xn(t.callbacks, h);
      n.push(j(d, "labelColor", this, h)), o.push(j(d, "labelPointStyle", this, h)), r.push(j(d, "labelTextColor", this, h));
    }), this.labelColors = n, this.labelPointStyles = o, this.labelTextColors = r, this.dataPoints = a, a;
  }
  update(t, e) {
    const s = this.options.setContext(this.getContext()), n = this._active;
    let o, r = [];
    if (!n.length)
      this.opacity !== 0 && (o = {
        opacity: 0
      });
    else {
      const a = oe[s.position].call(this, n, this._eventPosition);
      r = this._createItems(s), this.title = this.getTitle(r, s), this.beforeBody = this.getBeforeBody(r, s), this.body = this.getBody(r, s), this.afterBody = this.getAfterBody(r, s), this.footer = this.getFooter(r, s);
      const l = this._size = mn(this, s), c = Object.assign({}, a, l), h = _n(this.chart, s, c), d = bn(s, c, h, this.chart);
      this.xAlign = h.xAlign, this.yAlign = h.yAlign, o = {
        opacity: 1,
        x: d.x,
        y: d.y,
        width: l.width,
        height: l.height,
        caretX: a.x,
        caretY: a.y
      };
    }
    this._tooltipItems = r, this.$context = void 0, o && this._resolveAnimations().update(this, o), t && s.external && s.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: e
    });
  }
  drawCaret(t, e, s, n) {
    const o = this.getCaretPosition(t, s, n);
    e.lineTo(o.x1, o.y1), e.lineTo(o.x2, o.y2), e.lineTo(o.x3, o.y3);
  }
  getCaretPosition(t, e, s) {
    const { xAlign: n, yAlign: o } = this, { caretSize: r, cornerRadius: a } = s, { topLeft: l, topRight: c, bottomLeft: h, bottomRight: d } = ue(a), { x: f, y: u } = t, { width: p, height: g } = e;
    let m, _, y, v, w, b;
    return o === "center" ? (w = u + g / 2, n === "left" ? (m = f, _ = m - r, v = w + r, b = w - r) : (m = f + p, _ = m + r, v = w - r, b = w + r), y = m) : (n === "left" ? _ = f + Math.max(l, h) + r : n === "right" ? _ = f + p - Math.max(c, d) - r : _ = this.caretX, o === "top" ? (v = u, w = v - r, m = _ - r, y = _ + r) : (v = u + g, w = v + r, m = _ + r, y = _ - r), b = v), {
      x1: m,
      x2: _,
      x3: y,
      y1: v,
      y2: w,
      y3: b
    };
  }
  drawTitle(t, e, s) {
    const n = this.title, o = n.length;
    let r, a, l;
    if (o) {
      const c = Nt(s.rtl, this.x, this.width);
      for (t.x = Ne(this, s.titleAlign, s), e.textAlign = c.textAlign(s.titleAlign), e.textBaseline = "middle", r = U(s.titleFont), a = s.titleSpacing, e.fillStyle = s.titleColor, e.font = r.string, l = 0; l < o; ++l)
        e.fillText(n[l], c.x(t.x), t.y + r.lineHeight / 2), t.y += r.lineHeight + a, l + 1 === o && (t.y += s.titleMarginBottom - a);
    }
  }
  _drawColorBox(t, e, s, n, o) {
    const r = this.labelColors[s], a = this.labelPointStyles[s], { boxHeight: l, boxWidth: c } = o, h = U(o.bodyFont), d = Ne(this, "left", o), f = n.x(d), u = l < h.lineHeight ? (h.lineHeight - l) / 2 : 0, p = e.y + u;
    if (o.usePointStyle) {
      const g = {
        radius: Math.min(c, l) / 2,
        pointStyle: a.pointStyle,
        rotation: a.rotation,
        borderWidth: 1
      }, m = n.leftForLtr(f, c) + c / 2, _ = p + l / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, Pi(t, g, m, _), t.strokeStyle = r.borderColor, t.fillStyle = r.backgroundColor, Pi(t, g, m, _);
    } else {
      t.lineWidth = O(r.borderWidth) ? Math.max(...Object.values(r.borderWidth)) : r.borderWidth || 1, t.strokeStyle = r.borderColor, t.setLineDash(r.borderDash || []), t.lineDashOffset = r.borderDashOffset || 0;
      const g = n.leftForLtr(f, c), m = n.leftForLtr(n.xPlus(f, 1), c - 2), _ = ue(r.borderRadius);
      Object.values(_).some((y) => y !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, Ci(t, {
        x: g,
        y: p,
        w: c,
        h: l,
        radius: _
      }), t.fill(), t.stroke(), t.fillStyle = r.backgroundColor, t.beginPath(), Ci(t, {
        x: m,
        y: p + 1,
        w: c - 2,
        h: l - 2,
        radius: _
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(g, p, c, l), t.strokeRect(g, p, c, l), t.fillStyle = r.backgroundColor, t.fillRect(m, p + 1, c - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[s];
  }
  drawBody(t, e, s) {
    const { body: n } = this, { bodySpacing: o, bodyAlign: r, displayColors: a, boxHeight: l, boxWidth: c, boxPadding: h } = s, d = U(s.bodyFont);
    let f = d.lineHeight, u = 0;
    const p = Nt(s.rtl, this.x, this.width), g = function(x) {
      e.fillText(x, p.x(t.x + u), t.y + f / 2), t.y += f + o;
    }, m = p.textAlign(r);
    let _, y, v, w, b, k, S;
    for (e.textAlign = r, e.textBaseline = "middle", e.font = d.string, t.x = Ne(this, m, s), e.fillStyle = s.bodyColor, E(this.beforeBody, g), u = a && m !== "right" ? r === "center" ? c / 2 + h : c + 2 + h : 0, w = 0, k = n.length; w < k; ++w) {
      for (_ = n[w], y = this.labelTextColors[w], e.fillStyle = y, E(_.before, g), v = _.lines, a && v.length && (this._drawColorBox(e, t, w, p, s), f = Math.max(d.lineHeight, l)), b = 0, S = v.length; b < S; ++b)
        g(v[b]), f = d.lineHeight;
      E(_.after, g);
    }
    u = 0, f = d.lineHeight, E(this.afterBody, g), t.y -= o;
  }
  drawFooter(t, e, s) {
    const n = this.footer, o = n.length;
    let r, a;
    if (o) {
      const l = Nt(s.rtl, this.x, this.width);
      for (t.x = Ne(this, s.footerAlign, s), t.y += s.footerMarginTop, e.textAlign = l.textAlign(s.footerAlign), e.textBaseline = "middle", r = U(s.footerFont), e.fillStyle = s.footerColor, e.font = r.string, a = 0; a < o; ++a)
        e.fillText(n[a], l.x(t.x), t.y + r.lineHeight / 2), t.y += r.lineHeight + s.footerSpacing;
    }
  }
  drawBackground(t, e, s, n) {
    const { xAlign: o, yAlign: r } = this, { x: a, y: l } = t, { width: c, height: h } = s, { topLeft: d, topRight: f, bottomLeft: u, bottomRight: p } = ue(n.cornerRadius);
    e.fillStyle = n.backgroundColor, e.strokeStyle = n.borderColor, e.lineWidth = n.borderWidth, e.beginPath(), e.moveTo(a + d, l), r === "top" && this.drawCaret(t, e, s, n), e.lineTo(a + c - f, l), e.quadraticCurveTo(a + c, l, a + c, l + f), r === "center" && o === "right" && this.drawCaret(t, e, s, n), e.lineTo(a + c, l + h - p), e.quadraticCurveTo(a + c, l + h, a + c - p, l + h), r === "bottom" && this.drawCaret(t, e, s, n), e.lineTo(a + u, l + h), e.quadraticCurveTo(a, l + h, a, l + h - u), r === "center" && o === "left" && this.drawCaret(t, e, s, n), e.lineTo(a, l + d), e.quadraticCurveTo(a, l, a + d, l), e.closePath(), e.fill(), n.borderWidth > 0 && e.stroke();
  }
  _updateAnimationTarget(t) {
    const e = this.chart, s = this.$animations, n = s && s.x, o = s && s.y;
    if (n || o) {
      const r = oe[t.position].call(this, this._active, this._eventPosition);
      if (!r)
        return;
      const a = this._size = mn(this, t), l = Object.assign({}, r, this._size), c = _n(e, t, l), h = bn(t, l, c, e);
      (n._to !== h.x || o._to !== h.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = a.width, this.height = a.height, this.caretX = r.x, this.caretY = r.y, this._resolveAnimations().update(this, h));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(t) {
    const e = this.options.setContext(this.getContext());
    let s = this.opacity;
    if (!s)
      return;
    this._updateAnimationTarget(e);
    const n = {
      width: this.width,
      height: this.height
    }, o = {
      x: this.x,
      y: this.y
    };
    s = Math.abs(s) < 1e-3 ? 0 : s;
    const r = Q(e.padding), a = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    e.enabled && a && (t.save(), t.globalAlpha = s, this.drawBackground(o, t, n, e), so(t, e.textDirection), o.y += r.top, this.drawTitle(o, t, e), this.drawBody(o, t, e), this.drawFooter(o, t, e), no(t, e.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, e) {
    const s = this._active, n = t.map(({ datasetIndex: a, index: l }) => {
      const c = this.chart.getDatasetMeta(a);
      if (!c)
        throw new Error("Cannot find a dataset at index " + a);
      return {
        datasetIndex: a,
        element: c.data[l],
        index: l
      };
    }), o = !Ge(s, n), r = this._positionChanged(n, e);
    (o || r) && (this._active = n, this._eventPosition = e, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, e, s = !0) {
    if (e && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const n = this.options, o = this._active || [], r = this._getActiveElements(t, o, e, s), a = this._positionChanged(r, t), l = e || !Ge(r, o) || a;
    return l && (this._active = r, (n.enabled || n.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, e))), l;
  }
  _getActiveElements(t, e, s, n) {
    const o = this.options;
    if (t.type === "mouseout")
      return [];
    if (!n)
      return e.filter((a) => this.chart.data.datasets[a.datasetIndex] && this.chart.getDatasetMeta(a.datasetIndex).controller.getParsed(a.index) !== void 0);
    const r = this.chart.getElementsAtEventForMode(t, o.mode, o, s);
    return o.reverse && r.reverse(), r;
  }
  _positionChanged(t, e) {
    const { caretX: s, caretY: n, options: o } = this, r = oe[o.position].call(this, t, e);
    return r !== !1 && (s !== r.x || n !== r.y);
  }
}
A($i, "positioners", oe);
var lh = {
  id: "tooltip",
  _element: $i,
  positioners: oe,
  afterInit(i, t, e) {
    e && (i.tooltip = new $i({
      chart: i,
      options: e
    }));
  },
  beforeUpdate(i, t, e) {
    i.tooltip && i.tooltip.initialize(e);
  },
  reset(i, t, e) {
    i.tooltip && i.tooltip.initialize(e);
  },
  afterDraw(i) {
    const t = i.tooltip;
    if (t && t._willRender()) {
      const e = {
        tooltip: t
      };
      if (i.notifyPlugins("beforeTooltipDraw", {
        ...e,
        cancelable: !0
      }) === !1)
        return;
      t.draw(i.ctx), i.notifyPlugins("afterTooltipDraw", e);
    }
  },
  afterEvent(i, t) {
    if (i.tooltip) {
      const e = t.replay;
      i.tooltip.handleEvent(t.event, e, t.inChartArea) && (t.changed = !0);
    }
  },
  defaults: {
    enabled: !0,
    external: null,
    position: "average",
    backgroundColor: "rgba(0,0,0,0.8)",
    titleColor: "#fff",
    titleFont: {
      weight: "bold"
    },
    titleSpacing: 2,
    titleMarginBottom: 6,
    titleAlign: "left",
    bodyColor: "#fff",
    bodySpacing: 2,
    bodyFont: {},
    bodyAlign: "left",
    footerColor: "#fff",
    footerSpacing: 2,
    footerMarginTop: 6,
    footerFont: {
      weight: "bold"
    },
    footerAlign: "left",
    padding: 6,
    caretPadding: 2,
    caretSize: 5,
    cornerRadius: 6,
    boxHeight: (i, t) => t.bodyFont.size,
    boxWidth: (i, t) => t.bodyFont.size,
    multiKeyBackground: "#fff",
    displayColors: !0,
    boxPadding: 0,
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    animation: {
      duration: 400,
      easing: "easeOutQuart"
    },
    animations: {
      numbers: {
        type: "number",
        properties: [
          "x",
          "y",
          "width",
          "height",
          "caretX",
          "caretY"
        ]
      },
      opacity: {
        easing: "linear",
        duration: 200
      }
    },
    callbacks: Ao
  },
  defaultRoutes: {
    bodyFont: "font",
    footerFont: "font",
    titleFont: "font"
  },
  descriptors: {
    _scriptable: (i) => i !== "filter" && i !== "itemSort" && i !== "external",
    _indexable: !1,
    callbacks: {
      _scriptable: !1,
      _indexable: !1
    },
    animation: {
      _fallback: !1
    },
    animations: {
      _fallback: "animation"
    }
  },
  additionalOptionScopes: [
    "interaction"
  ]
};
const ch = (i, t, e, s) => (typeof t == "string" ? (e = i.push(t) - 1, s.unshift({
  index: e,
  label: t
})) : isNaN(t) && (e = null), e);
function hh(i, t, e, s) {
  const n = i.indexOf(t);
  if (n === -1)
    return ch(i, t, e, s);
  const o = i.lastIndexOf(t);
  return n !== o ? e : n;
}
const dh = (i, t) => i === null ? null : K(Math.round(i), 0, t);
function vn(i) {
  const t = this.getLabels();
  return i >= 0 && i < t.length ? t[i] : i;
}
class Li extends Xt {
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const e = this._addedLabels;
    if (e.length) {
      const s = this.getLabels();
      for (const { index: n, label: o } of e)
        s[n] === o && s.splice(n, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, e) {
    if ($(t))
      return null;
    const s = this.getLabels();
    return e = isFinite(e) && s[e] === t ? e : hh(s, t, C(e, t), this._addedLabels), dh(e, s.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: e } = this.getUserBounds();
    let { min: s, max: n } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (s = 0), e || (n = this.getLabels().length - 1)), this.min = s, this.max = n;
  }
  buildTicks() {
    const t = this.min, e = this.max, s = this.options.offset, n = [];
    let o = this.getLabels();
    o = t === 0 && e === o.length - 1 ? o : o.slice(t, e + 1), this._valueRange = Math.max(o.length - (s ? 0 : 1), 1), this._startValue = this.min - (s ? 0.5 : 0);
    for (let r = t; r <= e; r++)
      n.push({
        value: r
      });
    return n;
  }
  getLabelForValue(t) {
    return vn.call(this, t);
  }
  configure() {
    super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
  }
  getPixelForValue(t) {
    return typeof t != "number" && (t = this.parse(t)), t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getPixelForTick(t) {
    const e = this.ticks;
    return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value);
  }
  getValueForPixel(t) {
    return Math.round(this._startValue + this.getDecimalForPixel(t) * this._valueRange);
  }
  getBasePixel() {
    return this.bottom;
  }
}
A(Li, "id", "category"), A(Li, "defaults", {
  ticks: {
    callback: vn
  }
});
function fh(i, t) {
  const e = [], { bounds: n, step: o, min: r, max: a, precision: l, count: c, maxTicks: h, maxDigits: d, includeBounds: f } = i, u = o || 1, p = h - 1, { min: g, max: m } = t, _ = !$(r), y = !$(a), v = !$(c), w = (m - g) / (d + 1);
  let b = xs((m - g) / p / u) * u, k, S, x, M;
  if (b < 1e-14 && !_ && !y)
    return [
      {
        value: g
      },
      {
        value: m
      }
    ];
  M = Math.ceil(m / b) - Math.floor(g / b), M > p && (b = xs(M * b / p / u) * u), $(l) || (k = Math.pow(10, l), b = Math.ceil(b * k) / k), n === "ticks" ? (S = Math.floor(g / b) * b, x = Math.ceil(m / b) * b) : (S = g, x = m), _ && y && o && Rr((a - r) / o, b / 1e3) ? (M = Math.round(Math.min((a - r) / b, h)), b = (a - r) / M, S = r, x = a) : v ? (S = _ ? r : S, x = y ? a : x, M = c - 1, b = (x - S) / M) : (M = (x - S) / b, he(M, Math.round(M), b / 1e3) ? M = Math.round(M) : M = Math.ceil(M));
  const T = Math.max(vs(b), vs(S));
  k = Math.pow(10, $(l) ? T : l), S = Math.round(S * k) / k, x = Math.round(x * k) / k;
  let P = 0;
  for (_ && (f && S !== r ? (e.push({
    value: r
  }), S < r && P++, he(Math.round((S + P * b) * k) / k, r, wn(r, w, i)) && P++) : S < r && P++); P < M; ++P) {
    const D = Math.round((S + P * b) * k) / k;
    if (y && D > a)
      break;
    e.push({
      value: D
    });
  }
  return y && f && x !== a ? e.length && he(e[e.length - 1].value, a, wn(a, w, i)) ? e[e.length - 1].value = a : e.push({
    value: a
  }) : (!y || x === a) && e.push({
    value: x
  }), e;
}
function wn(i, t, { horizontal: e, minRotation: s }) {
  const n = Ot(s), o = (e ? Math.sin(n) : Math.cos(n)) || 1e-3, r = 0.75 * t * ("" + i).length;
  return Math.min(t / o, r);
}
class uh extends Xt {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, e) {
    return $(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: e, maxDefined: s } = this.getUserBounds();
    let { min: n, max: o } = this;
    const r = (l) => n = e ? n : l, a = (l) => o = s ? o : l;
    if (t) {
      const l = Vt(n), c = Vt(o);
      l < 0 && c < 0 ? a(0) : l > 0 && c > 0 && r(0);
    }
    if (n === o) {
      let l = o === 0 ? 1 : Math.abs(o * 0.05);
      a(o + l), t || r(n - l);
    }
    this.min = n, this.max = o;
  }
  getTickLimit() {
    const t = this.options.ticks;
    let { maxTicksLimit: e, stepSize: s } = t, n;
    return s ? (n = Math.ceil(this.max / s) - Math.floor(this.min / s) + 1, n > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${s} would result generating up to ${n} ticks. Limiting to 1000.`), n = 1e3)) : (n = this.computeTickLimit(), e = e || 11), e && (n = Math.min(e, n)), n;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, e = t.ticks;
    let s = this.getTickLimit();
    s = Math.max(2, s);
    const n = {
      maxTicks: s,
      bounds: t.bounds,
      min: t.min,
      max: t.max,
      precision: e.precision,
      step: e.stepSize,
      count: e.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: e.minRotation || 0,
      includeBounds: e.includeBounds !== !1
    }, o = this._range || this, r = fh(n, o);
    return t.bounds === "ticks" && Fr(r, this, "value"), t.reverse ? (r.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), r;
  }
  configure() {
    const t = this.ticks;
    let e = this.min, s = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const n = (s - e) / Math.max(t.length - 1, 1) / 2;
      e -= n, s += n;
    }
    this._startValue = e, this._endValue = s, this._valueRange = s - e;
  }
  getLabelForValue(t) {
    return qn(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Ii extends uh {
  determineDataLimits() {
    const { min: t, max: e } = this.getMinMax(!0);
    this.min = N(t) ? t : 0, this.max = N(e) ? e : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), e = t ? this.width : this.height, s = Ot(this.options.ticks.minRotation), n = (t ? Math.sin(s) : Math.cos(s)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(e / Math.min(40, o.lineHeight / n));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
A(Ii, "id", "linear"), A(Ii, "defaults", {
  ticks: {
    callback: Kn.formatters.numeric
  }
});
const di = {
  millisecond: {
    common: !0,
    size: 1,
    steps: 1e3
  },
  second: {
    common: !0,
    size: 1e3,
    steps: 60
  },
  minute: {
    common: !0,
    size: 6e4,
    steps: 60
  },
  hour: {
    common: !0,
    size: 36e5,
    steps: 24
  },
  day: {
    common: !0,
    size: 864e5,
    steps: 30
  },
  week: {
    common: !1,
    size: 6048e5,
    steps: 4
  },
  month: {
    common: !0,
    size: 2628e6,
    steps: 12
  },
  quarter: {
    common: !1,
    size: 7884e6,
    steps: 4
  },
  year: {
    common: !0,
    size: 3154e7
  }
}, V = /* @__PURE__ */ Object.keys(di);
function Sn(i, t) {
  return i - t;
}
function kn(i, t) {
  if ($(t))
    return null;
  const e = i._adapter, { parser: s, round: n, isoWeekday: o } = i._parseOpts;
  let r = t;
  return typeof s == "function" && (r = s(r)), N(r) || (r = typeof s == "string" ? e.parse(r, s) : e.parse(r)), r === null ? null : (n && (r = n === "week" && (xe(o) || o === !0) ? e.startOf(r, "isoWeek", o) : e.startOf(r, n)), +r);
}
function Mn(i, t, e, s) {
  const n = V.length;
  for (let o = V.indexOf(i); o < n - 1; ++o) {
    const r = di[V[o]], a = r.steps ? r.steps : Number.MAX_SAFE_INTEGER;
    if (r.common && Math.ceil((e - t) / (a * r.size)) <= s)
      return V[o];
  }
  return V[n - 1];
}
function gh(i, t, e, s, n) {
  for (let o = V.length - 1; o >= V.indexOf(e); o--) {
    const r = V[o];
    if (di[r].common && i._adapter.diff(n, s, r) >= t - 1)
      return r;
  }
  return V[e ? V.indexOf(e) : 0];
}
function ph(i) {
  for (let t = V.indexOf(i) + 1, e = V.length; t < e; ++t)
    if (di[V[t]].common)
      return V[t];
}
function An(i, t, e) {
  if (!e)
    i[t] = !0;
  else if (e.length) {
    const { lo: s, hi: n } = Yi(e, t), o = e[s] >= t ? e[s] : e[n];
    i[o] = !0;
  }
}
function mh(i, t, e, s) {
  const n = i._adapter, o = +n.startOf(t[0].value, s), r = t[t.length - 1].value;
  let a, l;
  for (a = o; a <= r; a = +n.add(a, 1, s))
    l = e[a], l >= 0 && (t[l].major = !0);
  return t;
}
function Pn(i, t, e) {
  const s = [], n = {}, o = t.length;
  let r, a;
  for (r = 0; r < o; ++r)
    a = t[r], n[a] = r, s.push({
      value: a,
      major: !1
    });
  return o === 0 || !e ? s : mh(i, s, n, e);
}
class ni extends Xt {
  constructor(t) {
    super(t), this._cache = {
      data: [],
      labels: [],
      all: []
    }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
  }
  init(t, e = {}) {
    const s = t.time || (t.time = {}), n = this._adapter = new dl._date(t.adapters.date);
    n.init(e), ce(s.displayFormats, n.formats()), this._parseOpts = {
      parser: s.parser,
      round: s.round,
      isoWeekday: s.isoWeekday
    }, super.init(t), this._normalized = e.normalized;
  }
  parse(t, e) {
    return t === void 0 ? null : kn(this, t);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const t = this.options, e = this._adapter, s = t.time.unit || "day";
    let { min: n, max: o, minDefined: r, maxDefined: a } = this.getUserBounds();
    function l(c) {
      !r && !isNaN(c.min) && (n = Math.min(n, c.min)), !a && !isNaN(c.max) && (o = Math.max(o, c.max));
    }
    (!r || !a) && (l(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && l(this.getMinMax(!1))), n = N(n) && !isNaN(n) ? n : +e.startOf(Date.now(), s), o = N(o) && !isNaN(o) ? o : +e.endOf(Date.now(), s) + 1, this.min = Math.min(n, o - 1), this.max = Math.max(n + 1, o);
  }
  _getLabelBounds() {
    const t = this.getLabelTimestamps();
    let e = Number.POSITIVE_INFINITY, s = Number.NEGATIVE_INFINITY;
    return t.length && (e = t[0], s = t[t.length - 1]), {
      min: e,
      max: s
    };
  }
  buildTicks() {
    const t = this.options, e = t.time, s = t.ticks, n = s.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && n.length && (this.min = this._userMin || n[0], this.max = this._userMax || n[n.length - 1]);
    const o = this.min, r = this.max, a = jr(n, o, r);
    return this._unit = e.unit || (s.autoSkip ? Mn(e.minUnit, this.min, this.max, this._getLabelCapacity(o)) : gh(this, a.length, e.minUnit, this.min, this.max)), this._majorUnit = !s.major.enabled || this._unit === "year" ? void 0 : ph(this._unit), this.initOffsets(n), t.reverse && a.reverse(), Pn(this, a, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let e = 0, s = 0, n, o;
    this.options.offset && t.length && (n = this.getDecimalForValue(t[0]), t.length === 1 ? e = 1 - n : e = (this.getDecimalForValue(t[1]) - n) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? s = o : s = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const r = t.length < 3 ? 0.5 : 0.25;
    e = K(e, 0, r), s = K(s, 0, r), this._offsets = {
      start: e,
      end: s,
      factor: 1 / (e + 1 + s)
    };
  }
  _generate() {
    const t = this._adapter, e = this.min, s = this.max, n = this.options, o = n.time, r = o.unit || Mn(o.minUnit, e, s, this._getLabelCapacity(e)), a = C(n.ticks.stepSize, 1), l = r === "week" ? o.isoWeekday : !1, c = xe(l) || l === !0, h = {};
    let d = e, f, u;
    if (c && (d = +t.startOf(d, "isoWeek", l)), d = +t.startOf(d, c ? "day" : r), t.diff(s, e, r) > 1e5 * a)
      throw new Error(e + " and " + s + " are too far apart with stepSize of " + a + " " + r);
    const p = n.ticks.source === "data" && this.getDataTimestamps();
    for (f = d, u = 0; f < s; f = +t.add(f, a, r), u++)
      An(h, f, p);
    return (f === s || n.bounds === "ticks" || u === 1) && An(h, f, p), Object.keys(h).sort(Sn).map((g) => +g);
  }
  getLabelForValue(t) {
    const e = this._adapter, s = this.options.time;
    return s.tooltipFormat ? e.format(t, s.tooltipFormat) : e.format(t, s.displayFormats.datetime);
  }
  format(t, e) {
    const n = this.options.time.displayFormats, o = this._unit, r = e || n[o];
    return this._adapter.format(t, r);
  }
  _tickFormatFunction(t, e, s, n) {
    const o = this.options, r = o.ticks.callback;
    if (r)
      return L(r, [
        t,
        e,
        s
      ], this);
    const a = o.time.displayFormats, l = this._unit, c = this._majorUnit, h = l && a[l], d = c && a[c], f = s[e], u = c && d && f && f.major;
    return this._adapter.format(t, n || (u ? d : h));
  }
  generateTickLabels(t) {
    let e, s, n;
    for (e = 0, s = t.length; e < s; ++e)
      n = t[e], n.label = this._tickFormatFunction(n.value, e, t);
  }
  getDecimalForValue(t) {
    return t === null ? NaN : (t - this.min) / (this.max - this.min);
  }
  getPixelForValue(t) {
    const e = this._offsets, s = this.getDecimalForValue(t);
    return this.getPixelForDecimal((e.start + s) * e.factor);
  }
  getValueForPixel(t) {
    const e = this._offsets, s = this.getDecimalForPixel(t) / e.factor - e.end;
    return this.min + s * (this.max - this.min);
  }
  _getLabelSize(t) {
    const e = this.options.ticks, s = this.ctx.measureText(t).width, n = Ot(this.isHorizontal() ? e.maxRotation : e.minRotation), o = Math.cos(n), r = Math.sin(n), a = this._resolveTickFontOptions(0).size;
    return {
      w: s * o + a * r,
      h: s * r + a * o
    };
  }
  _getLabelCapacity(t) {
    const e = this.options.time, s = e.displayFormats, n = s[e.unit] || s.millisecond, o = this._tickFormatFunction(t, 0, Pn(this, [
      t
    ], this._majorUnit), n), r = this._getLabelSize(o), a = Math.floor(this.isHorizontal() ? this.width / r.w : this.height / r.h) - 1;
    return a > 0 ? a : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], e, s;
    if (t.length)
      return t;
    const n = this.getMatchingVisibleMetas();
    if (this._normalized && n.length)
      return this._cache.data = n[0].controller.getAllParsedValues(this);
    for (e = 0, s = n.length; e < s; ++e)
      t = t.concat(n[e].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let e, s;
    if (t.length)
      return t;
    const n = this.getLabels();
    for (e = 0, s = n.length; e < s; ++e)
      t.push(kn(this, n[e]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Ur(t.sort(Sn));
  }
}
A(ni, "id", "time"), A(ni, "defaults", {
  bounds: "data",
  adapters: {},
  time: {
    parser: !1,
    unit: !1,
    round: !1,
    isoWeekday: !1,
    minUnit: "millisecond",
    displayFormats: {}
  },
  ticks: {
    source: "auto",
    callback: !1,
    major: {
      enabled: !1
    }
  }
});
function We(i, t, e) {
  let s = 0, n = i.length - 1, o, r, a, l;
  e ? (t >= i[s].pos && t <= i[n].pos && ({ lo: s, hi: n } = Tt(i, "pos", t)), { pos: o, time: a } = i[s], { pos: r, time: l } = i[n]) : (t >= i[s].time && t <= i[n].time && ({ lo: s, hi: n } = Tt(i, "time", t)), { time: o, pos: a } = i[s], { time: r, pos: l } = i[n]);
  const c = r - o;
  return c ? a + (l - a) * (t - o) / c : a;
}
class Cn extends ni {
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), e = this._table = this.buildLookupTable(t);
    this._minPos = We(e, this.min), this._tableRange = We(e, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: e, max: s } = this, n = [], o = [];
    let r, a, l, c, h;
    for (r = 0, a = t.length; r < a; ++r)
      c = t[r], c >= e && c <= s && n.push(c);
    if (n.length < 2)
      return [
        {
          time: e,
          pos: 0
        },
        {
          time: s,
          pos: 1
        }
      ];
    for (r = 0, a = n.length; r < a; ++r)
      h = n[r + 1], l = n[r - 1], c = n[r], Math.round((h + l) / 2) !== c && o.push({
        time: c,
        pos: r / (a - 1)
      });
    return o;
  }
  _generate() {
    const t = this.min, e = this.max;
    let s = super.getDataTimestamps();
    return (!s.includes(t) || !s.length) && s.splice(0, 0, t), (!s.includes(e) || s.length === 1) && s.push(e), s.sort((n, o) => n - o);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const e = this.getDataTimestamps(), s = this.getLabelTimestamps();
    return e.length && s.length ? t = this.normalize(e.concat(s)) : t = e.length ? e : s, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (We(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const e = this._offsets, s = this.getDecimalForPixel(t) / e.factor - e.end;
    return We(this._table, s * this._tableRange + this._minPos, !0);
  }
}
A(Cn, "id", "timeseries"), A(Cn, "defaults", ni.defaults);
const Po = [
  { name: "Now", color: "#00bcd4", offset: { hours: 0, days: 0, years: 0 } },
  { name: "Yesterday", color: "#4caf50", offset: { hours: 0, days: 1, years: 0 } },
  { name: "Last Year", color: "#ff9800", offset: { hours: 0, days: 0, years: 1 } }
], Co = 24, ts = "History Compare", Ri = "#3f51b5";
function _h(i, t) {
  return {
    hours: t ?? i?.hours ?? 0,
    days: i?.days ?? 0,
    years: i?.years ?? 0
  };
}
function bh(i) {
  return {
    name: i.name,
    color: i.color,
    offset: { ...i.offset }
  };
}
function Oo(i) {
  return (i?.length ? i : Po).map((t) => ({
    name: t.name,
    color: t.color ?? Ri,
    offset: _h(t.offset, t.offset_hours)
  }));
}
function yh(i) {
  const t = { hours: Math.max(1, Number(i.range?.hours ?? Co)) };
  return {
    type: i.type,
    entity: i.entity,
    title: i.title?.trim() || ts,
    range: t,
    series: Oo(i.series)
  };
}
function xh() {
  return {
    type: "custom:history-compare-card",
    entity: "",
    title: ts,
    range: { hours: Co },
    series: Po.map((i) => ({ ...i, offset: { ...i.offset } }))
  };
}
function On(i, t) {
  const e = new Date(i);
  return t.years && e.setFullYear(e.getFullYear() - t.years), t.days && e.setDate(e.getDate() - t.days), t.hours && e.setHours(e.getHours() - t.hours), e;
}
function To(i) {
  const t = Math.max(1, Math.round(i));
  return Array.from({ length: t + 1 }, (e, s) => s);
}
function vh(i) {
  return Object.entries(i).filter(([t, e]) => {
    const s = t.split(".")[0], n = e.attributes?.unit_of_measurement, o = e.attributes?.state_class;
    return ["sensor", "input_number", "number"].includes(s) || typeof n == "string" || typeof o == "string";
  }).map(([t]) => t).sort((t, e) => t.localeCompare(e));
}
async function wh(i, t, e, s) {
  const n = encodeURIComponent(e.toISOString()), o = encodeURIComponent(s.toISOString()), r = `history/period/${n}?filter_entity_id=${encodeURIComponent(t)}&end_time=${o}&minimal_response`, a = await i.callApi("GET", r), l = Array.isArray(a) ? a[0] : [];
  return Array.isArray(l) ? l : [];
}
function Sh(i, t) {
  return i.map((e) => ({
    x: (new Date(e.last_changed).getTime() - t.getTime()) / (60 * 60 * 1e3),
    y: Number.isFinite(Number(e.state)) ? Number(e.state) : null
  })).filter((e) => e.x >= 0).sort((e, s) => e.x - s.x);
}
function kh(i, t) {
  const e = To(t);
  let s = 0, n = null;
  return e.map((o) => {
    for (; s < i.length && i[s].x <= o; )
      n = i[s].y, s += 1;
    return {
      x: o,
      y: n
    };
  });
}
const Mh = 10 * 24 * 60 * 60 * 1e3;
async function Ah(i, t, e, s) {
  try {
    return (await i.callApi(
      "POST",
      "recorder/statistics_during_period",
      {
        start_time: e.toISOString(),
        end_time: s.toISOString(),
        statistic_ids: [t],
        period: "hour",
        types: ["mean", "state"]
      }
    ))?.[t] ?? [];
  } catch {
    return [];
  }
}
function Ph(i, t) {
  return i.map((e) => ({
    x: (new Date(e.start).getTime() - t.getTime()) / (60 * 60 * 1e3),
    y: e.mean ?? e.state ?? null
  })).filter((e) => e.x >= 0).sort((e, s) => e.x - s.x);
}
async function Ch(i, t, e, s) {
  const n = /* @__PURE__ */ new Date(), o = n, r = new Date(n.getTime() - e * 60 * 60 * 1e3);
  return (await Promise.allSettled(
    s.map(async (l) => {
      const c = On(r, l.offset), h = On(o, l.offset), d = n.getTime() - c.getTime() > Mh;
      let f;
      if (d) {
        const p = await Ah(i, t, c, h);
        f = Ph(p, c);
      } else {
        const p = await wh(i, t, c, h);
        f = Sh(p, c);
      }
      const u = kh(f, e);
      return {
        name: l.name,
        color: l.color,
        points: u
      };
    })
  )).map(
    (l, c) => l.status === "fulfilled" ? l.value : { name: s[c].name, color: s[c].color, points: [] }
  );
}
var Oh = Object.defineProperty, Th = Object.getOwnPropertyDescriptor, es = (i, t, e, s) => {
  for (var n = s > 1 ? void 0 : s ? Th(t, e) : t, o = i.length - 1, r; o >= 0; o--)
    (r = i[o]) && (n = (s ? r(t, e, n) : r(n)) || n);
  return s && n && Oh(t, e, n), n;
};
let Se = class extends Bt {
  setConfig(i) {
    const t = xh();
    this._config = {
      ...t,
      ...i,
      title: i.title ?? ts,
      range: i.range ?? t.range,
      series: Oo(i.series).map(bh)
    };
  }
  render() {
    if (!this._config)
      return Pt``;
    const i = vh(this.hass?.states ?? {});
    return Pt`
      <div class="grid">
        <label>
          Entity
          <select .value=${this._config.entity} @change=${this._onEntityChange}>
            <option value="">Select entity</option>
            ${i.map((t) => Pt`<option value=${t}>${t}</option>`)}
          </select>
        </label>

        <label>
          Title
          <input .value=${this._config.title ?? ""} @input=${this._onTitleChange} />
        </label>

        <label>
          Range hours
          <input type="number" min="1" .value=${String(this._config.range?.hours ?? 24)} @input=${this._onRangeChange} />
        </label>

        ${(this._config.series ?? []).map((t, e) => this._renderSeries(t, e))}

        <button type="button" @click=${this._addSeries}>Add comparison period</button>
      </div>
    `;
  }
  _renderSeries(i, t) {
    return Pt`
      <div class="series">
        <div class="series-header">
          <strong>Series ${t + 1}</strong>
          <button type="button" @click=${() => this._removeSeries(t)}>Remove</button>
        </div>
        <label>
          Name
          <input .value=${i.name} @input=${(e) => this._updateSeries(t, "name", e.target.value)} />
        </label>
        <label>
          Color
          <input type="color" .value=${i.color ?? Ri} @input=${(e) => this._updateSeries(t, "color", e.target.value)} />
        </label>
        <label>
          Offset hours
          <input type="number" .value=${String(i.offset?.hours ?? i.offset_hours ?? 0)} @input=${(e) => this._updateSeriesOffset(t, "hours", Number(e.target.value))} />
        </label>
        <label>
          Offset days
          <input type="number" .value=${String(i.offset?.days ?? 0)} @input=${(e) => this._updateSeriesOffset(t, "days", Number(e.target.value))} />
        </label>
        <label>
          Offset years
          <input type="number" .value=${String(i.offset?.years ?? 0)} @input=${(e) => this._updateSeriesOffset(t, "years", Number(e.target.value))} />
        </label>
      </div>
    `;
  }
  _onEntityChange(i) {
    this._emit({ entity: i.target.value });
  }
  _onTitleChange(i) {
    this._emit({ title: i.target.value });
  }
  _onRangeChange(i) {
    const t = Math.max(1, Number(i.target.value) || 24);
    this._emit({ range: { hours: t } });
  }
  _addSeries() {
    const i = [
      ...this._config?.series ?? [],
      { name: "Comparison", color: Ri, offset: { hours: 0, days: 0, years: 0 } }
    ];
    this._emit({ series: i });
  }
  _removeSeries(i) {
    const t = [...this._config?.series ?? []];
    t.splice(i, 1), this._emit({ series: t });
  }
  _updateSeries(i, t, e) {
    const s = [...this._config?.series ?? []];
    s[i] = { ...s[i], [t]: e }, this._emit({ series: s });
  }
  _updateSeriesOffset(i, t, e) {
    const s = [...this._config?.series ?? []];
    s[i] = {
      ...s[i],
      offset: {
        hours: s[i].offset?.hours ?? s[i].offset_hours ?? 0,
        days: s[i].offset?.days ?? 0,
        years: s[i].offset?.years ?? 0,
        [t]: Number.isFinite(e) ? e : 0
      },
      offset_hours: void 0
    }, this._emit({ series: s });
  }
  _emit(i) {
    this._config = {
      ...this._config,
      ...i
    }, this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: this._config }
    }));
  }
};
Se.styles = En`
    .grid {
      display: grid;
      gap: 12px;
    }
    .series {
      border: 1px solid var(--divider-color);
      padding: 12px;
      border-radius: 8px;
      display: grid;
      gap: 8px;
    }
    .series-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    label {
      display: grid;
      gap: 4px;
      font-size: 0.9rem;
    }
    input, select, button {
      font: inherit;
      padding: 8px;
    }
    button {
      cursor: pointer;
    }
  `;
es([
  Ni({ attribute: !1 })
], Se.prototype, "hass", 2);
es([
  Me()
], Se.prototype, "_config", 2);
Se = es([
  Fn("history-compare-card-editor")
], Se);
var Dh = Object.defineProperty, Eh = Object.getOwnPropertyDescriptor, qt = (i, t, e, s) => {
  for (var n = s > 1 ? void 0 : s ? Eh(t, e) : t, o = i.length - 1, r; o >= 0; o--)
    (r = i[o]) && (n = (s ? r(t, e, n) : r(n)) || n);
  return s && n && Dh(t, e, n), n;
};
lt.register(Ve, ut, Xe, Ii, Li, lh, th, qc);
const Tn = 5 * 60 * 1e3;
let bt = class extends Bt {
  constructor() {
    super(...arguments), this._loading = !1, this._series = [], this._lastLoadedAt = 0;
  }
  static async getConfigElement() {
    return document.createElement("history-compare-card-editor");
  }
  static getStubConfig() {
    return {
      type: "custom:history-compare-card",
      entity: "sensor.temperature"
    };
  }
  setConfig(i) {
    if (!i.entity)
      throw new Error("Entity is required");
    this._config = yh(i), this._lastLoadedAt = 0, this._load(!0);
  }
  getCardSize() {
    return 4;
  }
  render() {
    return this._config ? Pt`
      <ha-card header=${this._config.title}>
        <div class="wrapper">
          <div class="meta">Entity: ${this._config.entity} · Range: ${this._config.range.hours}h</div>
          ${this._loading ? Pt`<div class="status">Loading history…</div>` : R}
          ${this._error ? Pt`<div class="status">${this._error}</div>` : R}
          <div class="chart-shell">
            <canvas id="chart"></canvas>
          </div>
        </div>
      </ha-card>
    ` : R;
  }
  firstUpdated() {
    this._scheduleRefresh();
  }
  updated(i) {
    i.has("hass") && this._config && this._load(!1), this._series.length && this._renderChart();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._chart?.destroy(), this._refreshTimer && (window.clearInterval(this._refreshTimer), this._refreshTimer = void 0);
  }
  _scheduleRefresh() {
    this._refreshTimer && window.clearInterval(this._refreshTimer), this._refreshTimer = window.setInterval(() => {
      this._load(!0);
    }, Tn);
  }
  async _load(i) {
    if (!this.hass || !this._config)
      return;
    const t = Date.now();
    if (!(!i && t - this._lastLoadedAt < Tn)) {
      this._loading = !0, this._error = void 0;
      try {
        this._series = await Ch(
          this.hass,
          this._config.entity,
          this._config.range.hours,
          this._config.series
        ), this._lastLoadedAt = t;
      } catch (e) {
        this._error = e instanceof Error ? e.message : "Unable to load history", this._series = [];
      } finally {
        this._loading = !1;
      }
    }
  }
  _renderChart() {
    const i = this.renderRoot.querySelector("#chart");
    if (!i || !this._config)
      return;
    const t = /* @__PURE__ */ new Date(), e = new Date(t.getTime() - this._config.range.hours * 60 * 60 * 1e3), s = To(this._config.range.hours).map((n) => `${new Date(e.getTime() + n * 60 * 60 * 1e3).getHours().toString().padStart(2, "0")}:00`);
    this._chart?.destroy(), this._chart = new lt(i, {
      type: "line",
      data: {
        labels: s,
        datasets: this._series.map((n) => ({
          label: n.name,
          data: n.points.map((o) => o.y),
          borderColor: n.color,
          backgroundColor: `${n.color}33`,
          pointRadius: 0,
          pointHoverRadius: 4,
          borderWidth: 2,
          spanGaps: !0,
          fill: !1,
          stepped: !0,
          tension: 0
        }))
      },
      options: {
        responsive: !0,
        maintainAspectRatio: !1,
        interaction: {
          mode: "index",
          intersect: !1
        },
        plugins: {
          legend: {
            position: "bottom"
          },
          tooltip: {
            callbacks: {
              title: (n) => n[0]?.label ?? ""
            }
          }
        },
        scales: {
          y: {
            beginAtZero: !1
          }
        }
      }
    });
  }
};
bt.styles = En`
    ha-card {
      display: block;
      padding: 16px;
    }
    .wrapper {
      display: grid;
      gap: 16px;
    }
    .meta {
      color: var(--secondary-text-color);
      font-size: 0.9rem;
    }
    .status {
      padding: 12px;
      border-radius: 8px;
      background: var(--secondary-background-color);
    }
    .chart-shell {
      position: relative;
      min-height: 360px;
    }
    canvas {
      width: 100% !important;
      height: 360px !important;
    }
  `;
qt([
  Ni({ attribute: !1 })
], bt.prototype, "hass", 2);
qt([
  Me()
], bt.prototype, "_config", 2);
qt([
  Me()
], bt.prototype, "_loading", 2);
qt([
  Me()
], bt.prototype, "_error", 2);
qt([
  Me()
], bt.prototype, "_series", 2);
bt = qt([
  Fn("history-compare-card")
], bt);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "history-compare-card",
  name: "History Compare Card",
  description: "Compare an entity history over multiple periods"
});
export {
  bt as HistoryCompareCard
};
//# sourceMappingURL=history-compare-card.js.map
