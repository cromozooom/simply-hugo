(() => {
	var Ye = !1,
		Ze = !1,
		V = [],
		Qe = -1;
	function Bt(e) {
		hn(e);
	}
	function hn(e) {
		V.includes(e) || V.push(e), _n();
	}
	function ye(e) {
		let t = V.indexOf(e);
		t !== -1 && t > Qe && V.splice(t, 1);
	}
	function _n() {
		!Ze && !Ye && ((Ye = !0), queueMicrotask(gn));
	}
	function gn() {
		(Ye = !1), (Ze = !0);
		for (let e = 0; e < V.length; e++) V[e](), (Qe = e);
		(V.length = 0), (Qe = -1), (Ze = !1);
	}
	var C,
		P,
		L,
		et,
		Xe = !0;
	function Kt(e) {
		(Xe = !1), e(), (Xe = !0);
	}
	function zt(e) {
		(C = e.reactive),
			(L = e.release),
			(P = (t) =>
				e.effect(t, {
					scheduler: (r) => {
						Xe ? Bt(r) : r();
					},
				})),
			(et = e.raw);
	}
	function tt(e) {
		P = e;
	}
	function Vt(e) {
		let t = () => {};
		return [
			(n) => {
				let i = P(n);
				return (
					e._x_effects ||
						((e._x_effects = new Set()),
						(e._x_runEffects = () => {
							e._x_effects.forEach((o) => o());
						})),
					e._x_effects.add(i),
					(t = () => {
						i !== void 0 && (e._x_effects.delete(i), L(i));
					}),
					i
				);
			},
			() => {
				t();
			},
		];
	}
	var Ht = [],
		qt = [],
		Ut = [];
	function Wt(e) {
		Ut.push(e);
	}
	function we(e, t) {
		typeof t == 'function' ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t)) : ((t = e), qt.push(t));
	}
	function Gt(e) {
		Ht.push(e);
	}
	function Jt(e, t, r) {
		e._x_attributeCleanups || (e._x_attributeCleanups = {}),
			e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []),
			e._x_attributeCleanups[t].push(r);
	}
	function nt(e, t) {
		e._x_attributeCleanups &&
			Object.entries(e._x_attributeCleanups).forEach(([r, n]) => {
				(t === void 0 || t.includes(r)) && (n.forEach((i) => i()), delete e._x_attributeCleanups[r]);
			});
	}
	var it = new MutationObserver(ct),
		ot = !1;
	function se() {
		it.observe(document, { subtree: !0, childList: !0, attributes: !0, attributeOldValue: !0 }), (ot = !0);
	}
	function st() {
		xn(), it.disconnect(), (ot = !1);
	}
	var oe = [],
		rt = !1;
	function xn() {
		(oe = oe.concat(it.takeRecords())),
			oe.length &&
				!rt &&
				((rt = !0),
				queueMicrotask(() => {
					yn(), (rt = !1);
				}));
	}
	function yn() {
		ct(oe), (oe.length = 0);
	}
	function h(e) {
		if (!ot) return e();
		st();
		let t = e();
		return se(), t;
	}
	var at = !1,
		be = [];
	function Yt() {
		at = !0;
	}
	function Zt() {
		(at = !1), ct(be), (be = []);
	}
	function ct(e) {
		if (at) {
			be = be.concat(e);
			return;
		}
		let t = [],
			r = [],
			n = new Map(),
			i = new Map();
		for (let o = 0; o < e.length; o++)
			if (
				!e[o].target._x_ignoreMutationObserver &&
				(e[o].type === 'childList' &&
					(e[o].addedNodes.forEach((s) => s.nodeType === 1 && t.push(s)),
					e[o].removedNodes.forEach((s) => s.nodeType === 1 && r.push(s))),
				e[o].type === 'attributes')
			) {
				let s = e[o].target,
					a = e[o].attributeName,
					c = e[o].oldValue,
					l = () => {
						n.has(s) || n.set(s, []), n.get(s).push({ name: a, value: s.getAttribute(a) });
					},
					u = () => {
						i.has(s) || i.set(s, []), i.get(s).push(a);
					};
				s.hasAttribute(a) && c === null ? l() : s.hasAttribute(a) ? (u(), l()) : u();
			}
		i.forEach((o, s) => {
			nt(s, o);
		}),
			n.forEach((o, s) => {
				Ht.forEach((a) => a(s, o));
			});
		for (let o of r)
			if (!t.includes(o) && (qt.forEach((s) => s(o)), o._x_cleanups))
				for (; o._x_cleanups.length; ) o._x_cleanups.pop()();
		t.forEach((o) => {
			(o._x_ignoreSelf = !0), (o._x_ignore = !0);
		});
		for (let o of t)
			r.includes(o) ||
				(o.isConnected &&
					(delete o._x_ignoreSelf,
					delete o._x_ignore,
					Ut.forEach((s) => s(o)),
					(o._x_ignore = !0),
					(o._x_ignoreSelf = !0)));
		t.forEach((o) => {
			delete o._x_ignoreSelf, delete o._x_ignore;
		}),
			(t = null),
			(r = null),
			(n = null),
			(i = null);
	}
	function Ee(e) {
		return j($(e));
	}
	function R(e, t, r) {
		return (
			(e._x_dataStack = [t, ...$(r || e)]),
			() => {
				e._x_dataStack = e._x_dataStack.filter((n) => n !== t);
			}
		);
	}
	function lt(e, t) {
		let r = e._x_dataStack[0];
		Object.entries(t).forEach(([n, i]) => {
			r[n] = i;
		});
	}
	function $(e) {
		return e._x_dataStack
			? e._x_dataStack
			: typeof ShadowRoot == 'function' && e instanceof ShadowRoot
			? $(e.host)
			: e.parentNode
			? $(e.parentNode)
			: [];
	}
	function j(e) {
		let t = new Proxy(
			{},
			{
				ownKeys: () => Array.from(new Set(e.flatMap((r) => Object.keys(r)))),
				has: (r, n) => e.some((i) => i.hasOwnProperty(n)),
				get: (r, n) =>
					(e.find((i) => {
						if (i.hasOwnProperty(n)) {
							let o = Object.getOwnPropertyDescriptor(i, n);
							if ((o.get && o.get._x_alreadyBound) || (o.set && o.set._x_alreadyBound)) return !0;
							if ((o.get || o.set) && o.enumerable) {
								let s = o.get,
									a = o.set,
									c = o;
								(s = s && s.bind(t)),
									(a = a && a.bind(t)),
									s && (s._x_alreadyBound = !0),
									a && (a._x_alreadyBound = !0),
									Object.defineProperty(i, n, { ...c, get: s, set: a });
							}
							return !0;
						}
						return !1;
					}) || {})[n],
				set: (r, n, i) => {
					let o = e.find((s) => s.hasOwnProperty(n));
					return o ? (o[n] = i) : (e[e.length - 1][n] = i), !0;
				},
			}
		);
		return t;
	}
	function ve(e) {
		let t = (n) => typeof n == 'object' && !Array.isArray(n) && n !== null,
			r = (n, i = '') => {
				Object.entries(Object.getOwnPropertyDescriptors(n)).forEach(([o, { value: s, enumerable: a }]) => {
					if (a === !1 || s === void 0) return;
					let c = i === '' ? o : `${i}.${o}`;
					typeof s == 'object' && s !== null && s._x_interceptor
						? (n[o] = s.initialize(e, c, o))
						: t(s) && s !== n && !(s instanceof Element) && r(s, c);
				});
			};
		return r(e);
	}
	function Se(e, t = () => {}) {
		let r = {
			initialValue: void 0,
			_x_interceptor: !0,
			initialize(n, i, o) {
				return e(
					this.initialValue,
					() => bn(n, i),
					(s) => ut(n, i, s),
					i,
					o
				);
			},
		};
		return (
			t(r),
			(n) => {
				if (typeof n == 'object' && n !== null && n._x_interceptor) {
					let i = r.initialize.bind(r);
					r.initialize = (o, s, a) => {
						let c = n.initialize(o, s, a);
						return (r.initialValue = c), i(o, s, a);
					};
				} else r.initialValue = n;
				return r;
			}
		);
	}
	function bn(e, t) {
		return t.split('.').reduce((r, n) => r[n], e);
	}
	function ut(e, t, r) {
		if ((typeof t == 'string' && (t = t.split('.')), t.length === 1)) e[t[0]] = r;
		else {
			if (t.length === 0) throw error;
			return e[t[0]] || (e[t[0]] = {}), ut(e[t[0]], t.slice(1), r);
		}
	}
	var Qt = {};
	function y(e, t) {
		Qt[e] = t;
	}
	function ae(e, t) {
		return (
			Object.entries(Qt).forEach(([r, n]) => {
				Object.defineProperty(e, `$${r}`, {
					get() {
						let [i, o] = ft(t);
						return (i = { interceptor: Se, ...i }), we(t, o), n(t, i);
					},
					enumerable: !1,
				});
			}),
			e
		);
	}
	function Xt(e, t, r, ...n) {
		try {
			return r(...n);
		} catch (i) {
			Z(i, e, t);
		}
	}
	function Z(e, t, r = void 0) {
		Object.assign(e, { el: t, expression: r }),
			console.warn(
				`Alpine Expression Error: ${e.message}

${
	r
		? 'Expression: "' +
		  r +
		  `"

`
		: ''
}`,
				t
			),
			setTimeout(() => {
				throw e;
			}, 0);
	}
	var Ae = !0;
	function er(e) {
		let t = Ae;
		(Ae = !1), e(), (Ae = t);
	}
	function I(e, t, r = {}) {
		let n;
		return x(e, t)((i) => (n = i), r), n;
	}
	function x(...e) {
		return tr(...e);
	}
	var tr = pt;
	function rr(e) {
		tr = e;
	}
	function pt(e, t) {
		let r = {};
		ae(r, e);
		let n = [r, ...$(e)],
			i = typeof t == 'function' ? wn(n, t) : vn(n, t, e);
		return Xt.bind(null, e, t, i);
	}
	function wn(e, t) {
		return (r = () => {}, { scope: n = {}, params: i = [] } = {}) => {
			let o = t.apply(j([n, ...e]), i);
			Oe(r, o);
		};
	}
	var dt = {};
	function En(e, t) {
		if (dt[e]) return dt[e];
		let r = Object.getPrototypeOf(async function () {}).constructor,
			n = /^[\n\s]*if.*\(.*\)/.test(e) || /^(let|const)\s/.test(e) ? `(async()=>{ ${e} })()` : e,
			o = (() => {
				try {
					return new r(
						['__self', 'scope'],
						`with (scope) { __self.result = ${n} }; __self.finished = true; return __self.result;`
					);
				} catch (s) {
					return Z(s, t, e), Promise.resolve();
				}
			})();
		return (dt[e] = o), o;
	}
	function vn(e, t, r) {
		let n = En(t, r);
		return (i = () => {}, { scope: o = {}, params: s = [] } = {}) => {
			(n.result = void 0), (n.finished = !1);
			let a = j([o, ...e]);
			if (typeof n == 'function') {
				let c = n(n, a).catch((l) => Z(l, r, t));
				n.finished
					? (Oe(i, n.result, a, s, r), (n.result = void 0))
					: c
							.then((l) => {
								Oe(i, l, a, s, r);
							})
							.catch((l) => Z(l, r, t))
							.finally(() => (n.result = void 0));
			}
		};
	}
	function Oe(e, t, r, n, i) {
		if (Ae && typeof t == 'function') {
			let o = t.apply(r, n);
			o instanceof Promise ? o.then((s) => Oe(e, s, r, n)).catch((s) => Z(s, i, t)) : e(o);
		} else typeof t == 'object' && t instanceof Promise ? t.then((o) => e(o)) : e(t);
	}
	var gt = 'x-';
	function S(e = '') {
		return gt + e;
	}
	function nr(e) {
		gt = e;
	}
	var mt = {};
	function p(e, t) {
		return (
			(mt[e] = t),
			{
				before(r) {
					if (!mt[r]) {
						console.warn('Cannot find directive `${directive}`. `${name}` will use the default order of execution');
						return;
					}
					let n = H.indexOf(r);
					H.splice(n >= 0 ? n : H.indexOf('DEFAULT'), 0, e);
				},
			}
		);
	}
	function le(e, t, r) {
		if (((t = Array.from(t)), e._x_virtualDirectives)) {
			let o = Object.entries(e._x_virtualDirectives).map(([a, c]) => ({ name: a, value: c })),
				s = xt(o);
			(o = o.map((a) => (s.find((c) => c.name === a.name) ? { name: `x-bind:${a.name}`, value: `"${a.value}"` } : a))),
				(t = t.concat(o));
		}
		let n = {};
		return t
			.map(sr((o, s) => (n[o] = s)))
			.filter(cr)
			.map(An(n, r))
			.sort(On)
			.map((o) => Sn(e, o));
	}
	function xt(e) {
		return Array.from(e)
			.map(sr())
			.filter((t) => !cr(t));
	}
	var ht = !1,
		ce = new Map(),
		ir = Symbol();
	function or(e) {
		ht = !0;
		let t = Symbol();
		(ir = t), ce.set(t, []);
		let r = () => {
				for (; ce.get(t).length; ) ce.get(t).shift()();
				ce.delete(t);
			},
			n = () => {
				(ht = !1), r();
			};
		e(r), n();
	}
	function ft(e) {
		let t = [],
			r = (a) => t.push(a),
			[n, i] = Vt(e);
		return (
			t.push(i),
			[
				{ Alpine: F, effect: n, cleanup: r, evaluateLater: x.bind(x, e), evaluate: I.bind(I, e) },
				() => t.forEach((a) => a()),
			]
		);
	}
	function Sn(e, t) {
		let r = () => {},
			n = mt[t.type] || r,
			[i, o] = ft(e);
		Jt(e, t.original, o);
		let s = () => {
			e._x_ignore ||
				e._x_ignoreSelf ||
				(n.inline && n.inline(e, t, i), (n = n.bind(n, e, t, i)), ht ? ce.get(ir).push(n) : n());
		};
		return (s.runCleanups = o), s;
	}
	var Ce =
			(e, t) =>
			({ name: r, value: n }) => (r.startsWith(e) && (r = r.replace(e, t)), { name: r, value: n }),
		Te = (e) => e;
	function sr(e = () => {}) {
		return ({ name: t, value: r }) => {
			let { name: n, value: i } = ar.reduce((o, s) => s(o), { name: t, value: r });
			return n !== t && e(n, t), { name: n, value: i };
		};
	}
	var ar = [];
	function Q(e) {
		ar.push(e);
	}
	function cr({ name: e }) {
		return lr().test(e);
	}
	var lr = () => new RegExp(`^${gt}([^:^.]+)\\b`);
	function An(e, t) {
		return ({ name: r, value: n }) => {
			let i = r.match(lr()),
				o = r.match(/:([a-zA-Z0-9\-:]+)/),
				s = r.match(/\.[^.\]]+(?=[^\]]*$)/g) || [],
				a = t || e[r] || r;
			return {
				type: i ? i[1] : null,
				value: o ? o[1] : null,
				modifiers: s.map((c) => c.replace('.', '')),
				expression: n,
				original: a,
			};
		};
	}
	var _t = 'DEFAULT',
		H = [
			'ignore',
			'ref',
			'data',
			'id',
			'bind',
			'init',
			'for',
			'model',
			'modelable',
			'transition',
			'show',
			'if',
			_t,
			'teleport',
		];
	function On(e, t) {
		let r = H.indexOf(e.type) === -1 ? _t : e.type,
			n = H.indexOf(t.type) === -1 ? _t : t.type;
		return H.indexOf(r) - H.indexOf(n);
	}
	function q(e, t, r = {}) {
		e.dispatchEvent(new CustomEvent(t, { detail: r, bubbles: !0, composed: !0, cancelable: !0 }));
	}
	function A(e, t) {
		if (typeof ShadowRoot == 'function' && e instanceof ShadowRoot) {
			Array.from(e.children).forEach((i) => A(i, t));
			return;
		}
		let r = !1;
		if ((t(e, () => (r = !0)), r)) return;
		let n = e.firstElementChild;
		for (; n; ) A(n, t, !1), (n = n.nextElementSibling);
	}
	function T(e, ...t) {
		console.warn(`Alpine Warning: ${e}`, ...t);
	}
	function ur() {
		document.body ||
			T(
				"Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"
			),
			q(document, 'alpine:init'),
			q(document, 'alpine:initializing'),
			se(),
			Wt((t) => v(t, A)),
			we((t) => bt(t)),
			Gt((t, r) => {
				le(t, r).forEach((n) => n());
			});
		let e = (t) => !U(t.parentElement, !0);
		Array.from(document.querySelectorAll(pr()))
			.filter(e)
			.forEach((t) => {
				v(t);
			}),
			q(document, 'alpine:initialized');
	}
	var yt = [],
		fr = [];
	function dr() {
		return yt.map((e) => e());
	}
	function pr() {
		return yt.concat(fr).map((e) => e());
	}
	function Me(e) {
		yt.push(e);
	}
	function Re(e) {
		fr.push(e);
	}
	function U(e, t = !1) {
		return X(e, (r) => {
			if ((t ? pr() : dr()).some((i) => r.matches(i))) return !0;
		});
	}
	function X(e, t) {
		if (e) {
			if (t(e)) return e;
			if ((e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement)) return X(e.parentElement, t);
		}
	}
	function mr(e) {
		return dr().some((t) => e.matches(t));
	}
	var hr = [];
	function _r(e) {
		hr.push(e);
	}
	function v(e, t = A, r = () => {}) {
		or(() => {
			t(e, (n, i) => {
				r(n, i), hr.forEach((o) => o(n, i)), le(n, n.attributes).forEach((o) => o()), n._x_ignore && i();
			});
		});
	}
	function bt(e) {
		A(e, (t) => nt(t));
	}
	var wt = [],
		Et = !1;
	function ee(e = () => {}) {
		return (
			queueMicrotask(() => {
				Et ||
					setTimeout(() => {
						Ne();
					});
			}),
			new Promise((t) => {
				wt.push(() => {
					e(), t();
				});
			})
		);
	}
	function Ne() {
		for (Et = !1; wt.length; ) wt.shift()();
	}
	function gr() {
		Et = !0;
	}
	function ue(e, t) {
		return Array.isArray(t)
			? xr(e, t.join(' '))
			: typeof t == 'object' && t !== null
			? Cn(e, t)
			: typeof t == 'function'
			? ue(e, t())
			: xr(e, t);
	}
	function xr(e, t) {
		let r = (o) => o.split(' ').filter(Boolean),
			n = (o) =>
				o
					.split(' ')
					.filter((s) => !e.classList.contains(s))
					.filter(Boolean),
			i = (o) => (
				e.classList.add(...o),
				() => {
					e.classList.remove(...o);
				}
			);
		return (t = t === !0 ? (t = '') : t || ''), i(n(t));
	}
	function Cn(e, t) {
		let r = (a) => a.split(' ').filter(Boolean),
			n = Object.entries(t)
				.flatMap(([a, c]) => (c ? r(a) : !1))
				.filter(Boolean),
			i = Object.entries(t)
				.flatMap(([a, c]) => (c ? !1 : r(a)))
				.filter(Boolean),
			o = [],
			s = [];
		return (
			i.forEach((a) => {
				e.classList.contains(a) && (e.classList.remove(a), s.push(a));
			}),
			n.forEach((a) => {
				e.classList.contains(a) || (e.classList.add(a), o.push(a));
			}),
			() => {
				s.forEach((a) => e.classList.add(a)), o.forEach((a) => e.classList.remove(a));
			}
		);
	}
	function W(e, t) {
		return typeof t == 'object' && t !== null ? Tn(e, t) : Mn(e, t);
	}
	function Tn(e, t) {
		let r = {};
		return (
			Object.entries(t).forEach(([n, i]) => {
				(r[n] = e.style[n]), n.startsWith('--') || (n = Rn(n)), e.style.setProperty(n, i);
			}),
			setTimeout(() => {
				e.style.length === 0 && e.removeAttribute('style');
			}),
			() => {
				W(e, r);
			}
		);
	}
	function Mn(e, t) {
		let r = e.getAttribute('style', t);
		return (
			e.setAttribute('style', t),
			() => {
				e.setAttribute('style', r || '');
			}
		);
	}
	function Rn(e) {
		return e.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	}
	function fe(e, t = () => {}) {
		let r = !1;
		return function () {
			r ? t.apply(this, arguments) : ((r = !0), e.apply(this, arguments));
		};
	}
	p('transition', (e, { value: t, modifiers: r, expression: n }, { evaluate: i }) => {
		typeof n == 'function' && (n = i(n)), n ? Nn(e, n, t) : Dn(e, r, t);
	});
	function Nn(e, t, r) {
		yr(e, ue, ''),
			{
				enter: (i) => {
					e._x_transition.enter.during = i;
				},
				'enter-start': (i) => {
					e._x_transition.enter.start = i;
				},
				'enter-end': (i) => {
					e._x_transition.enter.end = i;
				},
				leave: (i) => {
					e._x_transition.leave.during = i;
				},
				'leave-start': (i) => {
					e._x_transition.leave.start = i;
				},
				'leave-end': (i) => {
					e._x_transition.leave.end = i;
				},
			}[r](t);
	}
	function Dn(e, t, r) {
		yr(e, W);
		let n = !t.includes('in') && !t.includes('out') && !r,
			i = n || t.includes('in') || ['enter'].includes(r),
			o = n || t.includes('out') || ['leave'].includes(r);
		t.includes('in') && !n && (t = t.filter((_, b) => b < t.indexOf('out'))),
			t.includes('out') && !n && (t = t.filter((_, b) => b > t.indexOf('out')));
		let s = !t.includes('opacity') && !t.includes('scale'),
			a = s || t.includes('opacity'),
			c = s || t.includes('scale'),
			l = a ? 0 : 1,
			u = c ? de(t, 'scale', 95) / 100 : 1,
			d = de(t, 'delay', 0),
			m = de(t, 'origin', 'center'),
			w = 'opacity, transform',
			k = de(t, 'duration', 150) / 1e3,
			ge = de(t, 'duration', 75) / 1e3,
			f = 'cubic-bezier(0.4, 0.0, 0.2, 1)';
		i &&
			((e._x_transition.enter.during = {
				transformOrigin: m,
				transitionDelay: d,
				transitionProperty: w,
				transitionDuration: `${k}s`,
				transitionTimingFunction: f,
			}),
			(e._x_transition.enter.start = { opacity: l, transform: `scale(${u})` }),
			(e._x_transition.enter.end = { opacity: 1, transform: 'scale(1)' })),
			o &&
				((e._x_transition.leave.during = {
					transformOrigin: m,
					transitionDelay: d,
					transitionProperty: w,
					transitionDuration: `${ge}s`,
					transitionTimingFunction: f,
				}),
				(e._x_transition.leave.start = { opacity: 1, transform: 'scale(1)' }),
				(e._x_transition.leave.end = { opacity: l, transform: `scale(${u})` }));
	}
	function yr(e, t, r = {}) {
		e._x_transition ||
			(e._x_transition = {
				enter: { during: r, start: r, end: r },
				leave: { during: r, start: r, end: r },
				in(n = () => {}, i = () => {}) {
					De(e, t, { during: this.enter.during, start: this.enter.start, end: this.enter.end }, n, i);
				},
				out(n = () => {}, i = () => {}) {
					De(e, t, { during: this.leave.during, start: this.leave.start, end: this.leave.end }, n, i);
				},
			});
	}
	window.Element.prototype._x_toggleAndCascadeWithTransitions = function (e, t, r, n) {
		let i = document.visibilityState === 'visible' ? requestAnimationFrame : setTimeout,
			o = () => i(r);
		if (t) {
			e._x_transition && (e._x_transition.enter || e._x_transition.leave)
				? e._x_transition.enter &&
				  (Object.entries(e._x_transition.enter.during).length ||
						Object.entries(e._x_transition.enter.start).length ||
						Object.entries(e._x_transition.enter.end).length)
					? e._x_transition.in(r)
					: o()
				: e._x_transition
				? e._x_transition.in(r)
				: o();
			return;
		}
		(e._x_hidePromise = e._x_transition
			? new Promise((s, a) => {
					e._x_transition.out(
						() => {},
						() => s(n)
					),
						e._x_transitioning.beforeCancel(() => a({ isFromCancelledTransition: !0 }));
			  })
			: Promise.resolve(n)),
			queueMicrotask(() => {
				let s = br(e);
				s
					? (s._x_hideChildren || (s._x_hideChildren = []), s._x_hideChildren.push(e))
					: i(() => {
							let a = (c) => {
								let l = Promise.all([c._x_hidePromise, ...(c._x_hideChildren || []).map(a)]).then(([u]) => u());
								return delete c._x_hidePromise, delete c._x_hideChildren, l;
							};
							a(e).catch((c) => {
								if (!c.isFromCancelledTransition) throw c;
							});
					  });
			});
	};
	function br(e) {
		let t = e.parentNode;
		if (t) return t._x_hidePromise ? t : br(t);
	}
	function De(e, t, { during: r, start: n, end: i } = {}, o = () => {}, s = () => {}) {
		if (
			(e._x_transitioning && e._x_transitioning.cancel(),
			Object.keys(r).length === 0 && Object.keys(n).length === 0 && Object.keys(i).length === 0)
		) {
			o(), s();
			return;
		}
		let a, c, l;
		Pn(e, {
			start() {
				a = t(e, n);
			},
			during() {
				c = t(e, r);
			},
			before: o,
			end() {
				a(), (l = t(e, i));
			},
			after: s,
			cleanup() {
				c(), l();
			},
		});
	}
	function Pn(e, t) {
		let r,
			n,
			i,
			o = fe(() => {
				h(() => {
					(r = !0),
						n || t.before(),
						i || (t.end(), Ne()),
						t.after(),
						e.isConnected && t.cleanup(),
						delete e._x_transitioning;
				});
			});
		(e._x_transitioning = {
			beforeCancels: [],
			beforeCancel(s) {
				this.beforeCancels.push(s);
			},
			cancel: fe(function () {
				for (; this.beforeCancels.length; ) this.beforeCancels.shift()();
				o();
			}),
			finish: o,
		}),
			h(() => {
				t.start(), t.during();
			}),
			gr(),
			requestAnimationFrame(() => {
				if (r) return;
				let s = Number(getComputedStyle(e).transitionDuration.replace(/,.*/, '').replace('s', '')) * 1e3,
					a = Number(getComputedStyle(e).transitionDelay.replace(/,.*/, '').replace('s', '')) * 1e3;
				s === 0 && (s = Number(getComputedStyle(e).animationDuration.replace('s', '')) * 1e3),
					h(() => {
						t.before();
					}),
					(n = !0),
					requestAnimationFrame(() => {
						r ||
							(h(() => {
								t.end();
							}),
							Ne(),
							setTimeout(e._x_transitioning.finish, s + a),
							(i = !0));
					});
			});
	}
	function de(e, t, r) {
		if (e.indexOf(t) === -1) return r;
		let n = e[e.indexOf(t) + 1];
		if (!n || (t === 'scale' && isNaN(n))) return r;
		if (t === 'duration') {
			let i = n.match(/([0-9]+)ms/);
			if (i) return i[1];
		}
		return t === 'origin' && ['top', 'right', 'left', 'center', 'bottom'].includes(e[e.indexOf(t) + 2])
			? [n, e[e.indexOf(t) + 2]].join(' ')
			: n;
	}
	var te = !1;
	function N(e, t = () => {}) {
		return (...r) => (te ? t(...r) : e(...r));
	}
	function wr(e) {
		return (...t) => te && e(...t);
	}
	function Er(e, t) {
		t._x_dataStack || (t._x_dataStack = e._x_dataStack),
			(te = !0),
			kn(() => {
				In(t);
			}),
			(te = !1);
	}
	function In(e) {
		let t = !1;
		v(e, (n, i) => {
			A(n, (o, s) => {
				if (t && mr(o)) return s();
				(t = !0), i(o, s);
			});
		});
	}
	function kn(e) {
		let t = P;
		tt((r, n) => {
			let i = t(r);
			return L(i), () => {};
		}),
			e(),
			tt(t);
	}
	function pe(e, t, r, n = []) {
		switch (
			(e._x_bindings || (e._x_bindings = C({})), (e._x_bindings[t] = r), (t = n.includes('camel') ? zn(t) : t), t)
		) {
			case 'value':
				Ln(e, r);
				break;
			case 'style':
				jn(e, r);
				break;
			case 'class':
				$n(e, r);
				break;
			default:
				Fn(e, t, r);
				break;
		}
	}
	function Ln(e, t) {
		if (e.type === 'radio')
			e.attributes.value === void 0 && (e.value = t), window.fromModel && (e.checked = vr(e.value, t));
		else if (e.type === 'checkbox')
			Number.isInteger(t)
				? (e.value = t)
				: !Number.isInteger(t) && !Array.isArray(t) && typeof t != 'boolean' && ![null, void 0].includes(t)
				? (e.value = String(t))
				: Array.isArray(t)
				? (e.checked = t.some((r) => vr(r, e.value)))
				: (e.checked = !!t);
		else if (e.tagName === 'SELECT') Kn(e, t);
		else {
			if (e.value === t) return;
			e.value = t;
		}
	}
	function $n(e, t) {
		e._x_undoAddedClasses && e._x_undoAddedClasses(), (e._x_undoAddedClasses = ue(e, t));
	}
	function jn(e, t) {
		e._x_undoAddedStyles && e._x_undoAddedStyles(), (e._x_undoAddedStyles = W(e, t));
	}
	function Fn(e, t, r) {
		[null, void 0, !1].includes(r) && Vn(t) ? e.removeAttribute(t) : (Sr(t) && (r = t), Bn(e, t, r));
	}
	function Bn(e, t, r) {
		e.getAttribute(t) != r && e.setAttribute(t, r);
	}
	function Kn(e, t) {
		let r = [].concat(t).map((n) => n + '');
		Array.from(e.options).forEach((n) => {
			n.selected = r.includes(n.value);
		});
	}
	function zn(e) {
		return e.toLowerCase().replace(/-(\w)/g, (t, r) => r.toUpperCase());
	}
	function vr(e, t) {
		return e == t;
	}
	function Sr(e) {
		return [
			'disabled',
			'checked',
			'required',
			'readonly',
			'hidden',
			'open',
			'selected',
			'autofocus',
			'itemscope',
			'multiple',
			'novalidate',
			'allowfullscreen',
			'allowpaymentrequest',
			'formnovalidate',
			'autoplay',
			'controls',
			'loop',
			'muted',
			'playsinline',
			'default',
			'ismap',
			'reversed',
			'async',
			'defer',
			'nomodule',
		].includes(e);
	}
	function Vn(e) {
		return !['aria-pressed', 'aria-checked', 'aria-expanded', 'aria-selected'].includes(e);
	}
	function Ar(e, t, r) {
		if (e._x_bindings && e._x_bindings[t] !== void 0) return e._x_bindings[t];
		let n = e.getAttribute(t);
		return n === null ? (typeof r == 'function' ? r() : r) : n === '' ? !0 : Sr(t) ? !![t, 'true'].includes(n) : n;
	}
	function Pe(e, t) {
		var r;
		return function () {
			var n = this,
				i = arguments,
				o = function () {
					(r = null), e.apply(n, i);
				};
			clearTimeout(r), (r = setTimeout(o, t));
		};
	}
	function Ie(e, t) {
		let r;
		return function () {
			let n = this,
				i = arguments;
			r || (e.apply(n, i), (r = !0), setTimeout(() => (r = !1), t));
		};
	}
	function Or(e) {
		e(F);
	}
	var G = {},
		Cr = !1;
	function Tr(e, t) {
		if ((Cr || ((G = C(G)), (Cr = !0)), t === void 0)) return G[e];
		(G[e] = t),
			typeof t == 'object' && t !== null && t.hasOwnProperty('init') && typeof t.init == 'function' && G[e].init(),
			ve(G[e]);
	}
	function Mr() {
		return G;
	}
	var Rr = {};
	function Nr(e, t) {
		let r = typeof t != 'function' ? () => t : t;
		e instanceof Element ? vt(e, r()) : (Rr[e] = r);
	}
	function Dr(e) {
		return (
			Object.entries(Rr).forEach(([t, r]) => {
				Object.defineProperty(e, t, {
					get() {
						return (...n) => r(...n);
					},
				});
			}),
			e
		);
	}
	function vt(e, t, r) {
		let n = [];
		for (; n.length; ) n.pop()();
		let i = Object.entries(t).map(([s, a]) => ({ name: s, value: a })),
			o = xt(i);
		(i = i.map((s) => (o.find((a) => a.name === s.name) ? { name: `x-bind:${s.name}`, value: `"${s.value}"` } : s))),
			le(e, i, r).map((s) => {
				n.push(s.runCleanups), s();
			});
	}
	var Pr = {};
	function Ir(e, t) {
		Pr[e] = t;
	}
	function kr(e, t) {
		return (
			Object.entries(Pr).forEach(([r, n]) => {
				Object.defineProperty(e, r, {
					get() {
						return (...i) => n.bind(t)(...i);
					},
					enumerable: !1,
				});
			}),
			e
		);
	}
	var Hn = {
			get reactive() {
				return C;
			},
			get release() {
				return L;
			},
			get effect() {
				return P;
			},
			get raw() {
				return et;
			},
			version: '3.12.0',
			flushAndStopDeferringMutations: Zt,
			dontAutoEvaluateFunctions: er,
			disableEffectScheduling: Kt,
			startObservingMutations: se,
			stopObservingMutations: st,
			setReactivityEngine: zt,
			closestDataStack: $,
			skipDuringClone: N,
			onlyDuringClone: wr,
			addRootSelector: Me,
			addInitSelector: Re,
			addScopeToNode: R,
			deferMutations: Yt,
			mapAttributes: Q,
			evaluateLater: x,
			interceptInit: _r,
			setEvaluator: rr,
			mergeProxies: j,
			findClosest: X,
			closestRoot: U,
			destroyTree: bt,
			interceptor: Se,
			transition: De,
			setStyles: W,
			mutateDom: h,
			directive: p,
			throttle: Ie,
			debounce: Pe,
			evaluate: I,
			initTree: v,
			nextTick: ee,
			prefixed: S,
			prefix: nr,
			plugin: Or,
			magic: y,
			store: Tr,
			start: ur,
			clone: Er,
			bound: Ar,
			$data: Ee,
			walk: A,
			data: Ir,
			bind: Nr,
		},
		F = Hn;
	function St(e, t) {
		let r = Object.create(null),
			n = e.split(',');
		for (let i = 0; i < n.length; i++) r[n[i]] = !0;
		return t ? (i) => !!r[i.toLowerCase()] : (i) => !!r[i];
	}
	var qn = 'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly';
	var cs = St(
		qn +
			',async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected'
	);
	var Lr = Object.freeze({}),
		ls = Object.freeze([]);
	var At = Object.assign;
	var Un = Object.prototype.hasOwnProperty,
		me = (e, t) => Un.call(e, t),
		B = Array.isArray,
		re = (e) => $r(e) === '[object Map]';
	var Wn = (e) => typeof e == 'string',
		ke = (e) => typeof e == 'symbol',
		he = (e) => e !== null && typeof e == 'object';
	var Gn = Object.prototype.toString,
		$r = (e) => Gn.call(e),
		Ot = (e) => $r(e).slice(8, -1);
	var Le = (e) => Wn(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e;
	var $e = (e) => {
			let t = Object.create(null);
			return (r) => t[r] || (t[r] = e(r));
		},
		Jn = /-(\w)/g,
		us = $e((e) => e.replace(Jn, (t, r) => (r ? r.toUpperCase() : ''))),
		Yn = /\B([A-Z])/g,
		fs = $e((e) => e.replace(Yn, '-$1').toLowerCase()),
		Ct = $e((e) => e.charAt(0).toUpperCase() + e.slice(1)),
		ds = $e((e) => (e ? `on${Ct(e)}` : '')),
		Tt = (e, t) => e !== t && (e === e || t === t);
	var Mt = new WeakMap(),
		_e = [],
		D,
		J = Symbol('iterate'),
		Rt = Symbol('Map key iterate');
	function Zn(e) {
		return e && e._isEffect === !0;
	}
	function jr(e, t = Lr) {
		Zn(e) && (e = e.raw);
		let r = Xn(e, t);
		return t.lazy || r(), r;
	}
	function Fr(e) {
		e.active && (Br(e), e.options.onStop && e.options.onStop(), (e.active = !1));
	}
	var Qn = 0;
	function Xn(e, t) {
		let r = function () {
			if (!r.active) return e();
			if (!_e.includes(r)) {
				Br(r);
				try {
					return ti(), _e.push(r), (D = r), e();
				} finally {
					_e.pop(), Kr(), (D = _e[_e.length - 1]);
				}
			}
		};
		return (
			(r.id = Qn++),
			(r.allowRecurse = !!t.allowRecurse),
			(r._isEffect = !0),
			(r.active = !0),
			(r.raw = e),
			(r.deps = []),
			(r.options = t),
			r
		);
	}
	function Br(e) {
		let { deps: t } = e;
		if (t.length) {
			for (let r = 0; r < t.length; r++) t[r].delete(e);
			t.length = 0;
		}
	}
	var ne = !0,
		Dt = [];
	function ei() {
		Dt.push(ne), (ne = !1);
	}
	function ti() {
		Dt.push(ne), (ne = !0);
	}
	function Kr() {
		let e = Dt.pop();
		ne = e === void 0 ? !0 : e;
	}
	function M(e, t, r) {
		if (!ne || D === void 0) return;
		let n = Mt.get(e);
		n || Mt.set(e, (n = new Map()));
		let i = n.get(r);
		i || n.set(r, (i = new Set())),
			i.has(D) ||
				(i.add(D), D.deps.push(i), D.options.onTrack && D.options.onTrack({ effect: D, target: e, type: t, key: r }));
	}
	function z(e, t, r, n, i, o) {
		let s = Mt.get(e);
		if (!s) return;
		let a = new Set(),
			c = (u) => {
				u &&
					u.forEach((d) => {
						(d !== D || d.allowRecurse) && a.add(d);
					});
			};
		if (t === 'clear') s.forEach(c);
		else if (r === 'length' && B(e))
			s.forEach((u, d) => {
				(d === 'length' || d >= n) && c(u);
			});
		else
			switch ((r !== void 0 && c(s.get(r)), t)) {
				case 'add':
					B(e) ? Le(r) && c(s.get('length')) : (c(s.get(J)), re(e) && c(s.get(Rt)));
					break;
				case 'delete':
					B(e) || (c(s.get(J)), re(e) && c(s.get(Rt)));
					break;
				case 'set':
					re(e) && c(s.get(J));
					break;
			}
		let l = (u) => {
			u.options.onTrigger &&
				u.options.onTrigger({ effect: u, target: e, key: r, type: t, newValue: n, oldValue: i, oldTarget: o }),
				u.options.scheduler ? u.options.scheduler(u) : u();
		};
		a.forEach(l);
	}
	var ri = St('__proto__,__v_isRef,__isVue'),
		zr = new Set(
			Object.getOwnPropertyNames(Symbol)
				.map((e) => Symbol[e])
				.filter(ke)
		),
		ni = Be(),
		ii = Be(!1, !0),
		oi = Be(!0),
		si = Be(!0, !0),
		Fe = {};
	['includes', 'indexOf', 'lastIndexOf'].forEach((e) => {
		let t = Array.prototype[e];
		Fe[e] = function (...r) {
			let n = g(this);
			for (let o = 0, s = this.length; o < s; o++) M(n, 'get', o + '');
			let i = t.apply(n, r);
			return i === -1 || i === !1 ? t.apply(n, r.map(g)) : i;
		};
	});
	['push', 'pop', 'shift', 'unshift', 'splice'].forEach((e) => {
		let t = Array.prototype[e];
		Fe[e] = function (...r) {
			ei();
			let n = t.apply(this, r);
			return Kr(), n;
		};
	});
	function Be(e = !1, t = !1) {
		return function (n, i, o) {
			if (i === '__v_isReactive') return !e;
			if (i === '__v_isReadonly') return e;
			if (i === '__v_raw' && o === (e ? (t ? _i : rn) : t ? hi : tn).get(n)) return n;
			let s = B(n);
			if (!e && s && me(Fe, i)) return Reflect.get(Fe, i, o);
			let a = Reflect.get(n, i, o);
			return (ke(i) ? zr.has(i) : ri(i)) || (e || M(n, 'get', i), t)
				? a
				: Nt(a)
				? !s || !Le(i)
					? a.value
					: a
				: he(a)
				? e
					? nn(a)
					: We(a)
				: a;
		};
	}
	var ai = Vr(),
		ci = Vr(!0);
	function Vr(e = !1) {
		return function (r, n, i, o) {
			let s = r[n];
			if (!e && ((i = g(i)), (s = g(s)), !B(r) && Nt(s) && !Nt(i))) return (s.value = i), !0;
			let a = B(r) && Le(n) ? Number(n) < r.length : me(r, n),
				c = Reflect.set(r, n, i, o);
			return r === g(o) && (a ? Tt(i, s) && z(r, 'set', n, i, s) : z(r, 'add', n, i)), c;
		};
	}
	function li(e, t) {
		let r = me(e, t),
			n = e[t],
			i = Reflect.deleteProperty(e, t);
		return i && r && z(e, 'delete', t, void 0, n), i;
	}
	function ui(e, t) {
		let r = Reflect.has(e, t);
		return (!ke(t) || !zr.has(t)) && M(e, 'has', t), r;
	}
	function fi(e) {
		return M(e, 'iterate', B(e) ? 'length' : J), Reflect.ownKeys(e);
	}
	var Hr = { get: ni, set: ai, deleteProperty: li, has: ui, ownKeys: fi },
		qr = {
			get: oi,
			set(e, t) {
				return console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
			},
			deleteProperty(e, t) {
				return console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
			},
		},
		xs = At({}, Hr, { get: ii, set: ci }),
		ys = At({}, qr, { get: si }),
		Pt = (e) => (he(e) ? We(e) : e),
		It = (e) => (he(e) ? nn(e) : e),
		kt = (e) => e,
		Ke = (e) => Reflect.getPrototypeOf(e);
	function ze(e, t, r = !1, n = !1) {
		e = e.__v_raw;
		let i = g(e),
			o = g(t);
		t !== o && !r && M(i, 'get', t), !r && M(i, 'get', o);
		let { has: s } = Ke(i),
			a = n ? kt : r ? It : Pt;
		if (s.call(i, t)) return a(e.get(t));
		if (s.call(i, o)) return a(e.get(o));
		e !== i && e.get(t);
	}
	function Ve(e, t = !1) {
		let r = this.__v_raw,
			n = g(r),
			i = g(e);
		return e !== i && !t && M(n, 'has', e), !t && M(n, 'has', i), e === i ? r.has(e) : r.has(e) || r.has(i);
	}
	function He(e, t = !1) {
		return (e = e.__v_raw), !t && M(g(e), 'iterate', J), Reflect.get(e, 'size', e);
	}
	function Ur(e) {
		e = g(e);
		let t = g(this);
		return Ke(t).has.call(t, e) || (t.add(e), z(t, 'add', e, e)), this;
	}
	function Wr(e, t) {
		t = g(t);
		let r = g(this),
			{ has: n, get: i } = Ke(r),
			o = n.call(r, e);
		o ? en(r, n, e) : ((e = g(e)), (o = n.call(r, e)));
		let s = i.call(r, e);
		return r.set(e, t), o ? Tt(t, s) && z(r, 'set', e, t, s) : z(r, 'add', e, t), this;
	}
	function Gr(e) {
		let t = g(this),
			{ has: r, get: n } = Ke(t),
			i = r.call(t, e);
		i ? en(t, r, e) : ((e = g(e)), (i = r.call(t, e)));
		let o = n ? n.call(t, e) : void 0,
			s = t.delete(e);
		return i && z(t, 'delete', e, void 0, o), s;
	}
	function Jr() {
		let e = g(this),
			t = e.size !== 0,
			r = re(e) ? new Map(e) : new Set(e),
			n = e.clear();
		return t && z(e, 'clear', void 0, void 0, r), n;
	}
	function qe(e, t) {
		return function (n, i) {
			let o = this,
				s = o.__v_raw,
				a = g(s),
				c = t ? kt : e ? It : Pt;
			return !e && M(a, 'iterate', J), s.forEach((l, u) => n.call(i, c(l), c(u), o));
		};
	}
	function je(e, t, r) {
		return function (...n) {
			let i = this.__v_raw,
				o = g(i),
				s = re(o),
				a = e === 'entries' || (e === Symbol.iterator && s),
				c = e === 'keys' && s,
				l = i[e](...n),
				u = r ? kt : t ? It : Pt;
			return (
				!t && M(o, 'iterate', c ? Rt : J),
				{
					next() {
						let { value: d, done: m } = l.next();
						return m ? { value: d, done: m } : { value: a ? [u(d[0]), u(d[1])] : u(d), done: m };
					},
					[Symbol.iterator]() {
						return this;
					},
				}
			);
		};
	}
	function K(e) {
		return function (...t) {
			{
				let r = t[0] ? `on key "${t[0]}" ` : '';
				console.warn(`${Ct(e)} operation ${r}failed: target is readonly.`, g(this));
			}
			return e === 'delete' ? !1 : this;
		};
	}
	var Yr = {
			get(e) {
				return ze(this, e);
			},
			get size() {
				return He(this);
			},
			has: Ve,
			add: Ur,
			set: Wr,
			delete: Gr,
			clear: Jr,
			forEach: qe(!1, !1),
		},
		Zr = {
			get(e) {
				return ze(this, e, !1, !0);
			},
			get size() {
				return He(this);
			},
			has: Ve,
			add: Ur,
			set: Wr,
			delete: Gr,
			clear: Jr,
			forEach: qe(!1, !0),
		},
		Qr = {
			get(e) {
				return ze(this, e, !0);
			},
			get size() {
				return He(this, !0);
			},
			has(e) {
				return Ve.call(this, e, !0);
			},
			add: K('add'),
			set: K('set'),
			delete: K('delete'),
			clear: K('clear'),
			forEach: qe(!0, !1),
		},
		Xr = {
			get(e) {
				return ze(this, e, !0, !0);
			},
			get size() {
				return He(this, !0);
			},
			has(e) {
				return Ve.call(this, e, !0);
			},
			add: K('add'),
			set: K('set'),
			delete: K('delete'),
			clear: K('clear'),
			forEach: qe(!0, !0),
		},
		di = ['keys', 'values', 'entries', Symbol.iterator];
	di.forEach((e) => {
		(Yr[e] = je(e, !1, !1)), (Qr[e] = je(e, !0, !1)), (Zr[e] = je(e, !1, !0)), (Xr[e] = je(e, !0, !0));
	});
	function Ue(e, t) {
		let r = t ? (e ? Xr : Zr) : e ? Qr : Yr;
		return (n, i, o) =>
			i === '__v_isReactive'
				? !e
				: i === '__v_isReadonly'
				? e
				: i === '__v_raw'
				? n
				: Reflect.get(me(r, i) && i in n ? r : n, i, o);
	}
	var pi = { get: Ue(!1, !1) },
		bs = { get: Ue(!1, !0) },
		mi = { get: Ue(!0, !1) },
		ws = { get: Ue(!0, !0) };
	function en(e, t, r) {
		let n = g(r);
		if (n !== r && t.call(e, n)) {
			let i = Ot(e);
			console.warn(
				`Reactive ${i} contains both the raw and reactive versions of the same object${
					i === 'Map' ? ' as keys' : ''
				}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
			);
		}
	}
	var tn = new WeakMap(),
		hi = new WeakMap(),
		rn = new WeakMap(),
		_i = new WeakMap();
	function gi(e) {
		switch (e) {
			case 'Object':
			case 'Array':
				return 1;
			case 'Map':
			case 'Set':
			case 'WeakMap':
			case 'WeakSet':
				return 2;
			default:
				return 0;
		}
	}
	function xi(e) {
		return e.__v_skip || !Object.isExtensible(e) ? 0 : gi(Ot(e));
	}
	function We(e) {
		return e && e.__v_isReadonly ? e : on(e, !1, Hr, pi, tn);
	}
	function nn(e) {
		return on(e, !0, qr, mi, rn);
	}
	function on(e, t, r, n, i) {
		if (!he(e)) return console.warn(`value cannot be made reactive: ${String(e)}`), e;
		if (e.__v_raw && !(t && e.__v_isReactive)) return e;
		let o = i.get(e);
		if (o) return o;
		let s = xi(e);
		if (s === 0) return e;
		let a = new Proxy(e, s === 2 ? n : r);
		return i.set(e, a), a;
	}
	function g(e) {
		return (e && g(e.__v_raw)) || e;
	}
	function Nt(e) {
		return Boolean(e && e.__v_isRef === !0);
	}
	y('nextTick', () => ee);
	y('dispatch', (e) => q.bind(q, e));
	y('watch', (e, { evaluateLater: t, effect: r }) => (n, i) => {
		let o = t(n),
			s = !0,
			a,
			c = r(() =>
				o((l) => {
					JSON.stringify(l),
						s
							? (a = l)
							: queueMicrotask(() => {
									i(l, a), (a = l);
							  }),
						(s = !1);
				})
			);
		e._x_effects.delete(c);
	});
	y('store', Mr);
	y('data', (e) => Ee(e));
	y('root', (e) => U(e));
	y('refs', (e) => (e._x_refs_proxy || (e._x_refs_proxy = j(yi(e))), e._x_refs_proxy));
	function yi(e) {
		let t = [],
			r = e;
		for (; r; ) r._x_refs && t.push(r._x_refs), (r = r.parentNode);
		return t;
	}
	var Lt = {};
	function $t(e) {
		return Lt[e] || (Lt[e] = 0), ++Lt[e];
	}
	function sn(e, t) {
		return X(e, (r) => {
			if (r._x_ids && r._x_ids[t]) return !0;
		});
	}
	function an(e, t) {
		e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = $t(t));
	}
	y('id', (e) => (t, r = null) => {
		let n = sn(e, t),
			i = n ? n._x_ids[t] : $t(t);
		return r ? `${t}-${i}-${r}` : `${t}-${i}`;
	});
	y('el', (e) => e);
	cn('Focus', 'focus', 'focus');
	cn('Persist', 'persist', 'persist');
	function cn(e, t, r) {
		y(t, (n) =>
			T(
				`You can't use [$${directiveName}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${r}`,
				n
			)
		);
	}
	function ln({ get: e, set: t }, { get: r, set: n }) {
		let i = !0,
			o,
			s,
			a,
			c,
			l = P(() => {
				let u, d;
				i
					? ((u = e()), n(u), (d = r()), (i = !1))
					: ((u = e()),
					  (d = r()),
					  (a = JSON.stringify(u)),
					  (c = JSON.stringify(d)),
					  a !== o ? ((d = r()), n(u), (d = u)) : (t(d), (u = d))),
					(o = JSON.stringify(u)),
					(s = JSON.stringify(d));
			});
		return () => {
			L(l);
		};
	}
	p('modelable', (e, { expression: t }, { effect: r, evaluateLater: n, cleanup: i }) => {
		let o = n(t),
			s = () => {
				let u;
				return o((d) => (u = d)), u;
			},
			a = n(`${t} = __placeholder`),
			c = (u) => a(() => {}, { scope: { __placeholder: u } }),
			l = s();
		c(l),
			queueMicrotask(() => {
				if (!e._x_model) return;
				e._x_removeModelListeners.default();
				let u = e._x_model.get,
					d = e._x_model.set,
					m = ln(
						{
							get() {
								return u();
							},
							set(w) {
								d(w);
							},
						},
						{
							get() {
								return s();
							},
							set(w) {
								c(w);
							},
						}
					);
				i(m);
			});
	});
	var bi = document.createElement('div');
	p('teleport', (e, { modifiers: t, expression: r }, { cleanup: n }) => {
		e.tagName.toLowerCase() !== 'template' && T('x-teleport can only be used on a <template> tag', e);
		let i = N(
			() => document.querySelector(r),
			() => bi
		)();
		i || T(`Cannot find x-teleport element for selector: "${r}"`);
		let o = e.content.cloneNode(!0).firstElementChild;
		(e._x_teleport = o),
			(o._x_teleportBack = e),
			e._x_forwardEvents &&
				e._x_forwardEvents.forEach((s) => {
					o.addEventListener(s, (a) => {
						a.stopPropagation(), e.dispatchEvent(new a.constructor(a.type, a));
					});
				}),
			R(o, {}, e),
			h(() => {
				t.includes('prepend')
					? i.parentNode.insertBefore(o, i)
					: t.includes('append')
					? i.parentNode.insertBefore(o, i.nextSibling)
					: i.appendChild(o),
					v(o),
					(o._x_ignore = !0);
			}),
			n(() => o.remove());
	});
	var un = () => {};
	un.inline = (e, { modifiers: t }, { cleanup: r }) => {
		t.includes('self') ? (e._x_ignoreSelf = !0) : (e._x_ignore = !0),
			r(() => {
				t.includes('self') ? delete e._x_ignoreSelf : delete e._x_ignore;
			});
	};
	p('ignore', un);
	p('effect', (e, { expression: t }, { effect: r }) => r(x(e, t)));
	function ie(e, t, r, n) {
		let i = e,
			o = (c) => n(c),
			s = {},
			a = (c, l) => (u) => l(c, u);
		if (
			(r.includes('dot') && (t = wi(t)),
			r.includes('camel') && (t = Ei(t)),
			r.includes('passive') && (s.passive = !0),
			r.includes('capture') && (s.capture = !0),
			r.includes('window') && (i = window),
			r.includes('document') && (i = document),
			r.includes('prevent') &&
				(o = a(o, (c, l) => {
					l.preventDefault(), c(l);
				})),
			r.includes('stop') &&
				(o = a(o, (c, l) => {
					l.stopPropagation(), c(l);
				})),
			r.includes('self') &&
				(o = a(o, (c, l) => {
					l.target === e && c(l);
				})),
			(r.includes('away') || r.includes('outside')) &&
				((i = document),
				(o = a(o, (c, l) => {
					e.contains(l.target) ||
						(l.target.isConnected !== !1 &&
							((e.offsetWidth < 1 && e.offsetHeight < 1) || (e._x_isShown !== !1 && c(l))));
				}))),
			r.includes('once') &&
				(o = a(o, (c, l) => {
					c(l), i.removeEventListener(t, o, s);
				})),
			(o = a(o, (c, l) => {
				(Si(t) && Ai(l, r)) || c(l);
			})),
			r.includes('debounce'))
		) {
			let c = r[r.indexOf('debounce') + 1] || 'invalid-wait',
				l = Ge(c.split('ms')[0]) ? Number(c.split('ms')[0]) : 250;
			o = Pe(o, l);
		}
		if (r.includes('throttle')) {
			let c = r[r.indexOf('throttle') + 1] || 'invalid-wait',
				l = Ge(c.split('ms')[0]) ? Number(c.split('ms')[0]) : 250;
			o = Ie(o, l);
		}
		return (
			i.addEventListener(t, o, s),
			() => {
				i.removeEventListener(t, o, s);
			}
		);
	}
	function wi(e) {
		return e.replace(/-/g, '.');
	}
	function Ei(e) {
		return e.toLowerCase().replace(/-(\w)/g, (t, r) => r.toUpperCase());
	}
	function Ge(e) {
		return !Array.isArray(e) && !isNaN(e);
	}
	function vi(e) {
		return [' ', '_'].includes(e)
			? e
			: e
					.replace(/([a-z])([A-Z])/g, '$1-$2')
					.replace(/[_\s]/, '-')
					.toLowerCase();
	}
	function Si(e) {
		return ['keydown', 'keyup'].includes(e);
	}
	function Ai(e, t) {
		let r = t.filter((o) => !['window', 'document', 'prevent', 'stop', 'once', 'capture'].includes(o));
		if (r.includes('debounce')) {
			let o = r.indexOf('debounce');
			r.splice(o, Ge((r[o + 1] || 'invalid-wait').split('ms')[0]) ? 2 : 1);
		}
		if (r.includes('throttle')) {
			let o = r.indexOf('throttle');
			r.splice(o, Ge((r[o + 1] || 'invalid-wait').split('ms')[0]) ? 2 : 1);
		}
		if (r.length === 0 || (r.length === 1 && fn(e.key).includes(r[0]))) return !1;
		let i = ['ctrl', 'shift', 'alt', 'meta', 'cmd', 'super'].filter((o) => r.includes(o));
		return (
			(r = r.filter((o) => !i.includes(o))),
			!(
				i.length > 0 &&
				i.filter((s) => ((s === 'cmd' || s === 'super') && (s = 'meta'), e[`${s}Key`])).length === i.length &&
				fn(e.key).includes(r[0])
			)
		);
	}
	function fn(e) {
		if (!e) return [];
		e = vi(e);
		let t = {
			ctrl: 'control',
			slash: '/',
			space: ' ',
			spacebar: ' ',
			cmd: 'meta',
			esc: 'escape',
			up: 'arrow-up',
			down: 'arrow-down',
			left: 'arrow-left',
			right: 'arrow-right',
			period: '.',
			equal: '=',
			minus: '-',
			underscore: '_',
		};
		return (
			(t[e] = e),
			Object.keys(t)
				.map((r) => {
					if (t[r] === e) return r;
				})
				.filter((r) => r)
		);
	}
	p('model', (e, { modifiers: t, expression: r }, { effect: n, cleanup: i }) => {
		let o = e;
		t.includes('parent') && (o = e.parentNode);
		let s = x(o, r),
			a;
		typeof r == 'string'
			? (a = x(o, `${r} = __placeholder`))
			: typeof r == 'function' && typeof r() == 'string'
			? (a = x(o, `${r()} = __placeholder`))
			: (a = () => {});
		let c = () => {
				let m;
				return s((w) => (m = w)), dn(m) ? m.get() : m;
			},
			l = (m) => {
				let w;
				s((k) => (w = k)), dn(w) ? w.set(m) : a(() => {}, { scope: { __placeholder: m } });
			};
		t.includes('fill') && e.hasAttribute('value') && (c() === null || c() === '') && l(e.value),
			typeof r == 'string' &&
				e.type === 'radio' &&
				h(() => {
					e.hasAttribute('name') || e.setAttribute('name', r);
				});
		var u =
			e.tagName.toLowerCase() === 'select' || ['checkbox', 'radio'].includes(e.type) || t.includes('lazy')
				? 'change'
				: 'input';
		let d = te
			? () => {}
			: ie(e, u, t, (m) => {
					l(Oi(e, t, m, c()));
			  });
		if (
			(e._x_removeModelListeners || (e._x_removeModelListeners = {}),
			(e._x_removeModelListeners.default = d),
			i(() => e._x_removeModelListeners.default()),
			e.form)
		) {
			let m = ie(e.form, 'reset', [], (w) => {
				ee(() => e._x_model && e._x_model.set(e.value));
			});
			i(() => m());
		}
		(e._x_model = {
			get() {
				return c();
			},
			set(m) {
				l(m);
			},
		}),
			(e._x_forceModelUpdate = (m) => {
				(m = m === void 0 ? c() : m),
					m === void 0 && typeof r == 'string' && r.match(/\./) && (m = ''),
					(window.fromModel = !0),
					h(() => pe(e, 'value', m)),
					delete window.fromModel;
			}),
			n(() => {
				let m = c();
				(t.includes('unintrusive') && document.activeElement.isSameNode(e)) || e._x_forceModelUpdate(m);
			});
	});
	function Oi(e, t, r, n) {
		return h(() => {
			if (r instanceof CustomEvent && r.detail !== void 0) return typeof r.detail < 'u' ? r.detail : r.target.value;
			if (e.type === 'checkbox')
				if (Array.isArray(n)) {
					let i = t.includes('number') ? jt(r.target.value) : r.target.value;
					return r.target.checked ? n.concat([i]) : n.filter((o) => !Ci(o, i));
				} else return r.target.checked;
			else {
				if (e.tagName.toLowerCase() === 'select' && e.multiple)
					return t.includes('number')
						? Array.from(r.target.selectedOptions).map((i) => {
								let o = i.value || i.text;
								return jt(o);
						  })
						: Array.from(r.target.selectedOptions).map((i) => i.value || i.text);
				{
					let i = r.target.value;
					return t.includes('number') ? jt(i) : t.includes('trim') ? i.trim() : i;
				}
			}
		});
	}
	function jt(e) {
		let t = e ? parseFloat(e) : null;
		return Ti(t) ? t : e;
	}
	function Ci(e, t) {
		return e == t;
	}
	function Ti(e) {
		return !Array.isArray(e) && !isNaN(e);
	}
	function dn(e) {
		return e !== null && typeof e == 'object' && typeof e.get == 'function' && typeof e.set == 'function';
	}
	p('cloak', (e) => queueMicrotask(() => h(() => e.removeAttribute(S('cloak')))));
	Re(() => `[${S('init')}]`);
	p(
		'init',
		N((e, { expression: t }, { evaluate: r }) => (typeof t == 'string' ? !!t.trim() && r(t, {}, !1) : r(t, {}, !1)))
	);
	p('text', (e, { expression: t }, { effect: r, evaluateLater: n }) => {
		let i = n(t);
		r(() => {
			i((o) => {
				h(() => {
					e.textContent = o;
				});
			});
		});
	});
	p('html', (e, { expression: t }, { effect: r, evaluateLater: n }) => {
		let i = n(t);
		r(() => {
			i((o) => {
				h(() => {
					(e.innerHTML = o), (e._x_ignoreSelf = !0), v(e), delete e._x_ignoreSelf;
				});
			});
		});
	});
	Q(Ce(':', Te(S('bind:'))));
	p('bind', (e, { value: t, modifiers: r, expression: n, original: i }, { effect: o }) => {
		if (!t) {
			let a = {};
			Dr(a),
				x(e, n)(
					(l) => {
						vt(e, l, i);
					},
					{ scope: a }
				);
			return;
		}
		if (t === 'key') return Mi(e, n);
		let s = x(e, n);
		o(() =>
			s((a) => {
				a === void 0 && typeof n == 'string' && n.match(/\./) && (a = ''), h(() => pe(e, t, a, r));
			})
		);
	});
	function Mi(e, t) {
		e._x_keyExpression = t;
	}
	Me(() => `[${S('data')}]`);
	p(
		'data',
		N((e, { expression: t }, { cleanup: r }) => {
			t = t === '' ? '{}' : t;
			let n = {};
			ae(n, e);
			let i = {};
			kr(i, n);
			let o = I(e, t, { scope: i });
			(o === void 0 || o === !0) && (o = {}), ae(o, e);
			let s = C(o);
			ve(s);
			let a = R(e, s);
			s.init && I(e, s.init),
				r(() => {
					s.destroy && I(e, s.destroy), a();
				});
		})
	);
	p('show', (e, { modifiers: t, expression: r }, { effect: n }) => {
		let i = x(e, r);
		e._x_doHide ||
			(e._x_doHide = () => {
				h(() => {
					e.style.setProperty('display', 'none', t.includes('important') ? 'important' : void 0);
				});
			}),
			e._x_doShow ||
				(e._x_doShow = () => {
					h(() => {
						e.style.length === 1 && e.style.display === 'none'
							? e.removeAttribute('style')
							: e.style.removeProperty('display');
					});
				});
		let o = () => {
				e._x_doHide(), (e._x_isShown = !1);
			},
			s = () => {
				e._x_doShow(), (e._x_isShown = !0);
			},
			a = () => setTimeout(s),
			c = fe(
				(d) => (d ? s() : o()),
				(d) => {
					typeof e._x_toggleAndCascadeWithTransitions == 'function'
						? e._x_toggleAndCascadeWithTransitions(e, d, s, o)
						: d
						? a()
						: o();
				}
			),
			l,
			u = !0;
		n(() =>
			i((d) => {
				(!u && d === l) || (t.includes('immediate') && (d ? a() : o()), c(d), (l = d), (u = !1));
			})
		);
	});
	p('for', (e, { expression: t }, { effect: r, cleanup: n }) => {
		let i = Ni(t),
			o = x(e, i.items),
			s = x(e, e._x_keyExpression || 'index');
		(e._x_prevKeys = []),
			(e._x_lookup = {}),
			r(() => Ri(e, i, o, s)),
			n(() => {
				Object.values(e._x_lookup).forEach((a) => a.remove()), delete e._x_prevKeys, delete e._x_lookup;
			});
	});
	function Ri(e, t, r, n) {
		let i = (s) => typeof s == 'object' && !Array.isArray(s),
			o = e;
		r((s) => {
			Di(s) && s >= 0 && (s = Array.from(Array(s).keys(), (f) => f + 1)), s === void 0 && (s = []);
			let a = e._x_lookup,
				c = e._x_prevKeys,
				l = [],
				u = [];
			if (i(s))
				s = Object.entries(s).map(([f, _]) => {
					let b = pn(t, _, f, s);
					n((E) => u.push(E), { scope: { index: f, ...b } }), l.push(b);
				});
			else
				for (let f = 0; f < s.length; f++) {
					let _ = pn(t, s[f], f, s);
					n((b) => u.push(b), { scope: { index: f, ..._ } }), l.push(_);
				}
			let d = [],
				m = [],
				w = [],
				k = [];
			for (let f = 0; f < c.length; f++) {
				let _ = c[f];
				u.indexOf(_) === -1 && w.push(_);
			}
			c = c.filter((f) => !w.includes(f));
			let ge = 'template';
			for (let f = 0; f < u.length; f++) {
				let _ = u[f],
					b = c.indexOf(_);
				if (b === -1) c.splice(f, 0, _), d.push([ge, f]);
				else if (b !== f) {
					let E = c.splice(f, 1)[0],
						O = c.splice(b - 1, 1)[0];
					c.splice(f, 0, O), c.splice(b, 0, E), m.push([E, O]);
				} else k.push(_);
				ge = _;
			}
			for (let f = 0; f < w.length; f++) {
				let _ = w[f];
				a[_]._x_effects && a[_]._x_effects.forEach(ye), a[_].remove(), (a[_] = null), delete a[_];
			}
			for (let f = 0; f < m.length; f++) {
				let [_, b] = m[f],
					E = a[_],
					O = a[b],
					Y = document.createElement('div');
				h(() => {
					O.after(Y),
						E.after(O),
						O._x_currentIfEl && O.after(O._x_currentIfEl),
						Y.before(E),
						E._x_currentIfEl && E.after(E._x_currentIfEl),
						Y.remove();
				}),
					lt(O, l[u.indexOf(b)]);
			}
			for (let f = 0; f < d.length; f++) {
				let [_, b] = d[f],
					E = _ === 'template' ? o : a[_];
				E._x_currentIfEl && (E = E._x_currentIfEl);
				let O = l[b],
					Y = u[b],
					xe = document.importNode(o.content, !0).firstElementChild;
				R(xe, C(O), o),
					h(() => {
						E.after(xe), v(xe);
					}),
					typeof Y == 'object' && T('x-for key cannot be an object, it must be a string or an integer', o),
					(a[Y] = xe);
			}
			for (let f = 0; f < k.length; f++) lt(a[k[f]], l[u.indexOf(k[f])]);
			o._x_prevKeys = u;
		});
	}
	function Ni(e) {
		let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
			r = /^\s*\(|\)\s*$/g,
			n = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
			i = e.match(n);
		if (!i) return;
		let o = {};
		o.items = i[2].trim();
		let s = i[1].replace(r, '').trim(),
			a = s.match(t);
		return (
			a
				? ((o.item = s.replace(t, '').trim()), (o.index = a[1].trim()), a[2] && (o.collection = a[2].trim()))
				: (o.item = s),
			o
		);
	}
	function pn(e, t, r, n) {
		let i = {};
		return (
			/^\[.*\]$/.test(e.item) && Array.isArray(t)
				? e.item
						.replace('[', '')
						.replace(']', '')
						.split(',')
						.map((s) => s.trim())
						.forEach((s, a) => {
							i[s] = t[a];
						})
				: /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == 'object'
				? e.item
						.replace('{', '')
						.replace('}', '')
						.split(',')
						.map((s) => s.trim())
						.forEach((s) => {
							i[s] = t[s];
						})
				: (i[e.item] = t),
			e.index && (i[e.index] = r),
			e.collection && (i[e.collection] = n),
			i
		);
	}
	function Di(e) {
		return !Array.isArray(e) && !isNaN(e);
	}
	function mn() {}
	mn.inline = (e, { expression: t }, { cleanup: r }) => {
		let n = U(e);
		n._x_refs || (n._x_refs = {}), (n._x_refs[t] = e), r(() => delete n._x_refs[t]);
	};
	p('ref', mn);
	p('if', (e, { expression: t }, { effect: r, cleanup: n }) => {
		let i = x(e, t),
			o = () => {
				if (e._x_currentIfEl) return e._x_currentIfEl;
				let a = e.content.cloneNode(!0).firstElementChild;
				return (
					R(a, {}, e),
					h(() => {
						e.after(a), v(a);
					}),
					(e._x_currentIfEl = a),
					(e._x_undoIf = () => {
						A(a, (c) => {
							c._x_effects && c._x_effects.forEach(ye);
						}),
							a.remove(),
							delete e._x_currentIfEl;
					}),
					a
				);
			},
			s = () => {
				e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf);
			};
		r(() =>
			i((a) => {
				a ? o() : s();
			})
		),
			n(() => e._x_undoIf && e._x_undoIf());
	});
	p('id', (e, { expression: t }, { evaluate: r }) => {
		r(t).forEach((i) => an(e, i));
	});
	Q(Ce('@', Te(S('on:'))));
	p(
		'on',
		N((e, { value: t, modifiers: r, expression: n }, { cleanup: i }) => {
			let o = n ? x(e, n) : () => {};
			e.tagName.toLowerCase() === 'template' &&
				(e._x_forwardEvents || (e._x_forwardEvents = []), e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
			let s = ie(e, t, r, (a) => {
				o(() => {}, { scope: { $event: a }, params: [a] });
			});
			i(() => s());
		})
	);
	Je('Collapse', 'collapse', 'collapse');
	Je('Intersect', 'intersect', 'intersect');
	Je('Focus', 'trap', 'focus');
	Je('Mask', 'mask', 'mask');
	function Je(e, t, r) {
		p(t, (n) =>
			T(`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${r}`, n)
		);
	}
	F.setEvaluator(pt);
	F.setReactivityEngine({ reactive: We, effect: jr, release: Fr, raw: g });
	var Ft = F;
	window.Alpine = Ft;
	queueMicrotask(() => {
		Ft.start();
	});
})();
