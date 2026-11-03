import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./client-DQIuQ6oh.mjs";
import { a as ShoppingBag, c as Minus, d as ArrowRight, f as ArrowLeft, i as Sun, l as Menu, n as UserCheck, o as Plus, p as ArrowDown, r as TrendingUp, s as Moon, t as X, u as Dumbbell } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as useInView } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BwAruMF-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var packages_default = [
	{
		"id": "pkg-starter",
		"name": "Starter",
		"price": 29,
		"period": "month",
		"summary": "Three guided sessions a week to build the habit.",
		"features": [
			"12-week beginner program",
			"Video form library",
			"Monthly check-in call"
		],
		"highlighted": false
	},
	{
		"id": "pkg-strength",
		"name": "Strength",
		"price": 59,
		"period": "month",
		"summary": "Progressive lifting plan that adjusts to your numbers.",
		"features": [
			"Adaptive 4-day split",
			"Weekly coach feedback",
			"Nutrition targets",
			"Priority gear shipping"
		],
		"highlighted": true
	},
	{
		"id": "pkg-coached",
		"name": "Coached",
		"price": 149,
		"period": "month",
		"summary": "A dedicated coach who writes every session for you.",
		"features": [
			"Fully custom programming",
			"Two video calls a month",
			"Daily messaging access",
			"Form reviews within 24 hours"
		],
		"highlighted": false
	}
];
var products_default = [
	{
		"id": "prd-hex-dumbbells",
		"name": "Hex Dumbbell Pair",
		"category": "Weights",
		"price": 89,
		"detail": "Rubber-coated, 15 lb each",
		"image": "dumbbells"
	},
	{
		"id": "prd-kettlebell",
		"name": "Cast Iron Kettlebell",
		"category": "Weights",
		"price": 64,
		"detail": "16 kg, powder-coated grip",
		"image": "kettlebell"
	},
	{
		"id": "prd-bands",
		"name": "Loop Band Set",
		"category": "Accessories",
		"price": 34,
		"detail": "Light, medium and heavy",
		"image": "bands"
	},
	{
		"id": "prd-mat",
		"name": "Grip Training Mat",
		"category": "Recovery",
		"price": 48,
		"detail": "6 mm, non-slip both sides",
		"image": "mat"
	},
	{
		"id": "prd-rope",
		"name": "Speed Jump Rope",
		"category": "Accessories",
		"price": 22,
		"detail": "Ball-bearing handles, adjustable",
		"image": "rope"
	},
	{
		"id": "prd-roller",
		"name": "Firm Foam Roller",
		"category": "Recovery",
		"price": 29,
		"detail": "45 cm, high-density core",
		"image": "roller"
	}
];
/** Every sellable item, keyed by id, built from the JSON data files. */
var catalog = Object.fromEntries([...packages_default.map((p) => [p.id, {
	id: p.id,
	name: `${p.name} plan`,
	price: p.price,
	kind: "package"
}]), ...products_default.map((p) => [p.id, {
	id: p.id,
	name: p.name,
	price: p.price,
	kind: "product"
}])]);
/** Pure cart rules, kept separate so they can be tested. */
function addLine(lines, id) {
	const item = catalog[id];
	if (!item) return lines;
	if (lines.find((l) => l.id === id)) return item.kind === "package" ? lines : lines.map((l) => l.id === id ? {
		...l,
		qty: l.qty + 1
	} : l);
	return [...lines, {
		id,
		qty: 1
	}];
}
function setQty(lines, id, qty) {
	if (qty <= 0) return lines.filter((l) => l.id !== id);
	const max = catalog[id]?.kind === "package" ? 1 : 99;
	return lines.map((l) => l.id === id ? {
		...l,
		qty: Math.min(qty, max)
	} : l);
}
function subtotal(lines) {
	return lines.reduce((sum, l) => sum + (catalog[l.id]?.price ?? 0) * l.qty, 0);
}
var Ctx = (0, import_react.createContext)(null);
var KEY = "jodlem-cart";
function CartProvider({ children }) {
	const [lines, setLines] = (0, import_react.useState)([]);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(KEY);
			if (raw) setLines(JSON.parse(raw).filter((l) => catalog[l.id]));
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		localStorage.setItem(KEY, JSON.stringify(lines));
	}, [lines]);
	const value = (0, import_react.useMemo)(() => ({
		lines,
		count: lines.reduce((n, l) => n + l.qty, 0),
		total: subtotal(lines),
		open,
		setOpen,
		add: (id) => {
			setLines((ls) => addLine(ls, id));
			setOpen(true);
		},
		update: (id, qty) => setLines((ls) => setQty(ls, id, qty)),
		clear: () => setLines([])
	}), [lines, open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value,
		children
	});
}
function useCart() {
	const c = (0, import_react.useContext)(Ctx);
	if (!c) throw new Error("useCart must be used inside CartProvider");
	return c;
}
var money = (n) => `$${n.toFixed(n % 1 ? 2 : 0)}`;
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
/**
* Liquid glass surface. A Snell's-law displacement map bends whatever sits
* behind the element through an SVG filter used as `backdrop-filter`.
* Chromium refracts; Safari, Firefox and reduced-transparency fall back to
* frosted glass.
*/
function LiquidGlass({ children, className, contentClassName, radius = 999, bevelDepth = 14, scale = 48, aberration = 4, frost = .4, tint = .12, style, ...rest }) {
	const reactId = (0, import_react.useId)().replace(/:/g, "");
	const rootRef = (0, import_react.useRef)(null);
	const blobRef = (0, import_react.useRef)(null);
	const [size, setSize] = (0, import_react.useState)({
		w: 0,
		h: 0
	});
	const [filter, setFilter] = (0, import_react.useState)(null);
	const [mode, setMode] = (0, import_react.useState)("pending");
	(0, import_react.useEffect)(() => {
		if (prefersReducedTransparency()) setMode("opaque");
		else if (isSafariLike() || !supportsUrlBackdropFilter()) setMode("simple");
	}, []);
	(0, import_react.useEffect)(() => {
		const el = rootRef.current;
		if (!el || mode !== "pending") return;
		const ro = new ResizeObserver(([entry]) => {
			if (!entry) return;
			const box = entry.borderBoxSize?.[0];
			const width = box?.inlineSize ?? entry.contentRect.width;
			const height = box?.blockSize ?? entry.contentRect.height;
			setSize({
				w: Math.max(1, Math.round(width)),
				h: Math.max(1, Math.round(height))
			});
		});
		ro.observe(el);
		return () => ro.disconnect();
	}, [mode]);
	(0, import_react.useEffect)(() => {
		if (mode !== "pending" || size.w <= 1 || size.h <= 1) return;
		let cancelled = false;
		(async () => {
			const mapUrl = await generateDisplacementBlobUrl({
				width: size.w,
				height: size.h,
				radius: Math.min(radius, size.w / 2, size.h / 2),
				bevelDepth: Math.min(bevelDepth, Math.min(size.w, size.h) / 2),
				dpr: Math.min(window.devicePixelRatio || 1, 2)
			});
			await new Promise((resolve) => {
				const img = new Image();
				img.onload = img.onerror = () => resolve();
				img.src = mapUrl;
			});
			if (cancelled) {
				URL.revokeObjectURL(mapUrl);
				return;
			}
			if (blobRef.current) URL.revokeObjectURL(blobRef.current);
			blobRef.current = mapUrl;
			const id = `lg-${reactId}-${size.w}x${size.h}-${Date.now().toString(36)}`;
			setFilter({
				id,
				svg: buildFilterSvg({
					id,
					mapUrl,
					width: size.w,
					height: size.h,
					scale,
					aberration,
					frost
				})
			});
		})();
		return () => {
			cancelled = true;
		};
	}, [
		mode,
		size.w,
		size.h,
		radius,
		bevelDepth,
		scale,
		aberration,
		frost,
		reactId
	]);
	(0, import_react.useEffect)(() => () => {
		if (blobRef.current) URL.revokeObjectURL(blobRef.current);
	}, []);
	const backdrop = mode === "opaque" ? "none" : mode === "simple" ? "blur(20px) saturate(1.4)" : filter ? `url(#${filter.id}) blur(0.5px) saturate(1.85) brightness(1.02)` : "blur(10px) saturate(1.6) brightness(1.04)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: rootRef,
		"data-refract": mode === "pending" && filter ? "true" : "false",
		className: cn("relative overflow-hidden", mode === "simple" && "bg-white/70 dark:bg-neutral-900/60", mode === "opaque" && "bg-white dark:bg-neutral-900", className),
		style: {
			borderRadius: radius,
			backgroundColor: mode === "pending" ? `rgb(255 255 255 / ${tint})` : void 0,
			backdropFilter: backdrop,
			WebkitBackdropFilter: backdrop,
			...style
		},
		...rest,
		children: [filter ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": true,
			className: "pointer-events-none absolute size-0 overflow-hidden",
			dangerouslySetInnerHTML: { __html: filter.svg }
		}, filter.id) : null, contentClassName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: contentClassName,
			children
		}) : children]
	});
}
function supportsUrlBackdropFilter() {
	if (typeof CSS === "undefined" || !CSS.supports) return false;
	return CSS.supports("backdrop-filter", "url(#x)") || CSS.supports("-webkit-backdrop-filter", "url(#x)");
}
function prefersReducedTransparency() {
	if (typeof window === "undefined" || !window.matchMedia) return false;
	return window.matchMedia("(prefers-reduced-transparency: reduce)").matches;
}
function isSafariLike() {
	if (typeof navigator === "undefined") return false;
	const ua = navigator.userAgent;
	return /Safari/.test(ua) && !/Chrome|Chromium|Edg|OPR/.test(ua);
}
/** Signed distance to a rounded box centred at the origin. <0 inside. */
function sdRoundedBox(px, py, halfW, halfH, r) {
	const qx = Math.abs(px) - halfW + r;
	const qy = Math.abs(py) - halfH + r;
	return Math.min(Math.max(qx, qy), 0) + Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) - r;
}
/** Squircle-dome slope → Snell's-law bend. `x` = 0 at the rim, 1 at centre. */
function bendFromDepth(x) {
	const u = 1 - Math.min(1, Math.max(0, x));
	const denom = (1 - u ** 4) ** .75;
	if (denom < 1e-6) return 0;
	const thetaI = Math.atan(Math.min(u ** 3 / denom, 8));
	const sinT = Math.sin(thetaI) / 1.5;
	if (sinT >= 1) return Math.sin(thetaI);
	return Math.sin(thetaI - Math.asin(sinT));
}
/** φ(d) = ∫ bend along the distance from the rim. */
function buildPhiTable(bevelPx) {
	const n = Math.max(1, Math.ceil(bevelPx));
	const phi = new Float32Array(n + 1);
	for (let d = 1; d <= n; d++) phi[d] = phi[d - 1] + bendFromDepth(d / n);
	return phi;
}
function samplePhi(phi, depth) {
	const max = phi.length - 1;
	if (depth <= 0) return phi[0];
	if (depth >= max) return phi[max];
	const i = Math.floor(depth);
	const f = depth - i;
	return phi[i] * (1 - f) + phi[i + 1] * f;
}
function computeDisplacementData(opts) {
	const dpr = opts.dpr ?? 1;
	const gain = opts.gain ?? 1.35;
	const light = opts.light ?? {
		x: -.55,
		y: -.85
	};
	const lightLen = Math.hypot(light.x, light.y) || 1;
	const lx = light.x / lightLen;
	const ly = light.y / lightLen;
	const W = Math.max(1, Math.round(opts.width * dpr));
	const H = Math.max(1, Math.round(opts.height * dpr));
	const halfW = W / 2;
	const halfH = H / 2;
	const r = Math.min(opts.radius * dpr, halfW, halfH);
	const bevel = Math.max(1, opts.bevelDepth * dpr);
	const phi = buildPhiTable(bevel);
	const field = new Float32Array(W * H);
	for (let y = 0; y < H; y++) {
		const py = y - halfH + .5;
		for (let x = 0; x < W; x++) {
			const d = sdRoundedBox(x - halfW + .5, py, halfW, halfH, r);
			field[y * W + x] = d > 0 ? 0 : samplePhi(phi, Math.min(bevel, -d));
		}
	}
	const data = new Uint8ClampedArray(W * H * 4);
	for (let y = 0; y < H; y++) {
		const py = y - halfH + .5;
		for (let x = 0; x < W; x++) {
			const px = x - halfW + .5;
			const i = y * W + x << 2;
			const d = sdRoundedBox(px, py, halfW, halfH, r);
			if (d > 0) {
				data[i] = data[i + 1] = data[i + 2] = 128;
				data[i + 3] = 0;
				continue;
			}
			const x0 = Math.max(0, x - 1);
			const x1 = Math.min(W - 1, x + 1);
			const y0 = Math.max(0, y - 1);
			const y1 = Math.min(H - 1, y + 1);
			const dPhiX = (field[y * W + x1] - field[y * W + x0]) / (x1 - x0 || 1);
			const dPhiY = (field[y1 * W + x] - field[y0 * W + x]) / (y1 - y0 || 1);
			const dx = Math.max(-1, Math.min(1, dPhiX * gain));
			const dy = Math.max(-1, Math.min(1, dPhiY * gain));
			let specular = 0;
			if (d >= -bevel) {
				const gx = sdRoundedBox(px + 1, py, halfW, halfH, r) - sdRoundedBox(px - 1, py, halfW, halfH, r);
				const gy = sdRoundedBox(px, py + 1, halfW, halfH, r) - sdRoundedBox(px, py - 1, halfW, halfH, r);
				const len = Math.hypot(gx, gy) || 1;
				const dot = gx / len * lx + gy / len * ly;
				const rim = 1 - Math.min(1, -d / bevel);
				specular = (Math.max(0, dot) + Math.max(0, -dot) * .35) * rim;
			}
			data[i] = 128 + dx * 127;
			data[i + 1] = 128 + dy * 127;
			data[i + 2] = Math.round(specular * 255);
			data[i + 3] = 255;
		}
	}
	return {
		data,
		width: W,
		height: H
	};
}
/** PNG blob URL for feImage (WebKit rejects data: URIs inside feImage). */
async function generateDisplacementBlobUrl(opts) {
	const { data, width, height } = computeDisplacementData(opts);
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("2d context unavailable");
	ctx.putImageData(new ImageData(data, width, height), 0, 0);
	const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
	if (!blob) throw new Error("Failed to encode displacement map");
	return URL.createObjectURL(blob);
}
function buildFilterSvg({ id, mapUrl, width, height, scale, aberration, frost }) {
	const pad = Math.ceil(scale + aberration + 4);
	const px = pad / Math.max(1, width) * 100;
	const py = pad / Math.max(1, height) * 100;
	const region = `x="-${px.toFixed(3)}%" y="-${py.toFixed(3)}%" width="${(100 + 2 * px).toFixed(3)}%" height="${(100 + 2 * py).toFixed(3)}%"`;
	const map = `<feImage href="${mapUrl}" xlink:href="${mapUrl}" x="0" y="0" width="${width}" height="${height}" result="map" preserveAspectRatio="none"/>`;
	const displace = (s, result) => `<feDisplacementMap in="SourceGraphic" in2="map" scale="${s}" xChannelSelector="R" yChannelSelector="G" result="${result}"/>`;
	return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden"><filter id="${id}" color-interpolation-filters="sRGB" ${region}>
  ${map}
  ${aberration <= 0 ? `${displace(scale, "rgb")}` : `${displace(scale + aberration, "dispR")}
  <feColorMatrix in="dispR" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red"/>
  ${displace(scale, "dispG")}
  <feColorMatrix in="dispG" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green"/>
  ${displace(Math.max(0, scale - aberration), "dispB")}
  <feColorMatrix in="dispB" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue"/>
  <feBlend in="red" in2="green" mode="screen" result="rg"/>
  <feBlend in="rg" in2="blue" mode="screen" result="rgb"/>`}
  <feGaussianBlur in="rgb" stdDeviation="${frost}"/>
</filter></svg>`;
}
var links = [
	{
		href: "#packages",
		label: "Packages"
	},
	{
		href: "#shop",
		label: "Shop"
	},
	{
		href: "#why",
		label: "Why JODLEM"
	},
	{
		href: "#contact",
		label: "Contact"
	}
];
function Navbar() {
	const { count, setOpen } = useCart();
	const [menu, setMenu] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [light, setLight] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setLight(document.documentElement.classList.contains("light")), []);
	const toggleTheme = () => {
		const next = !light;
		setLight(next);
		document.documentElement.classList.toggle("light", next);
		try {
			localStorage.setItem("jodlem-theme", next ? "light" : "dark");
		} catch {}
	};
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = menu ? "hidden" : "";
		const onKey = (e) => e.key === "Escape" && setMenu(false);
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [menu]);
	const closeMenu = () => setMenu(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "nav-header safe-top",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "nav-shell",
			"data-scrolled": scrolled || void 0,
			"data-menu-open": menu || void 0,
			children: [
				scrolled || menu ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiquidGlass, {
					radius: menu ? 20 : 9999,
					scale: 28,
					aberration: 6,
					bevelDepth: 16,
					frost: .35,
					tint: .06,
					"aria-hidden": true,
					className: "nav-liquid-glass pointer-events-none absolute inset-0 rounded-[inherit] border border-[color:var(--glass-border)] shadow-[var(--glass-shadow),inset_0_1px_0_var(--glass-highlight)]"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "nav-bar relative z-[2]",
					"aria-label": "Main",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#top",
							className: "navbar-logo",
							"aria-label": "JODLEM home",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "navbar-logo-text condensed font-black uppercase",
								children: "JODLEM"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "nav-links hidden items-center gap-1 md:flex",
							children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: l.href,
								className: "nav-link",
								children: l.label
							}) }, l.href))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "nav-actions",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#shop",
									className: "btn btn-secondary nav-cta nav-cta-secondary hidden lg:inline-flex",
									children: "Shop gear"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#packages",
									className: "btn btn-primary nav-cta hidden lg:inline-flex",
									children: "Start now"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "btn btn-secondary btn-icon nav-icon-btn",
									onClick: toggleTheme,
									"aria-label": light ? "Switch to night mode" : "Switch to day mode",
									children: light ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "btn btn-secondary btn-icon nav-icon-btn relative",
									onClick: () => setOpen(true),
									"aria-label": `Open cart, ${count} items`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-5" }), count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-accent text-xs font-bold text-accent-foreground",
										children: count
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "btn btn-secondary btn-icon nav-icon-btn md:hidden",
									onClick: () => setMenu((o) => !o),
									"aria-label": menu ? "Close menu" : "Open menu",
									"aria-expanded": menu,
									"aria-controls": "nav-mobile-panel",
									children: menu ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					id: "nav-mobile-panel",
					className: "nav-mobile-panel relative z-[2] md:hidden",
					role: "region",
					"aria-label": "Mobile navigation",
					"aria-hidden": !menu,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "nav-mobile-panel-inner",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "flex flex-col gap-1",
							children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: l.href,
								onClick: closeMenu,
								className: "nav-mobile-link",
								children: l.label
							}) }, l.href))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-col gap-2 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#shop",
								onClick: closeMenu,
								className: "btn btn-secondary w-full sm:flex-1",
								children: "Shop gear"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#packages",
								onClick: closeMenu,
								className: "btn btn-primary w-full sm:flex-1",
								children: "Start now"
							})]
						})]
					})
				})
			]
		}), menu && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "nav-mobile-backdrop md:hidden",
			"aria-label": "Close menu",
			onClick: closeMenu
		})]
	});
}
var site_default = {
	hero: {
		"name": "JODLEM",
		"punchline": "You are in good hands.",
		"typewriterLines": [
			"You are in good hands.",
			"Real coaches. Real results.",
			"Plans that progress.",
			"Show up. Get stronger.",
			"Gear that earns its place."
		],
		"subline": "Real coaches, tested gear and plans that progress — everything you need to get stronger and stay that way."
	},
	why: [
		{
			"title": "Plans that progress",
			"body": "Every program adds load or volume on a schedule, so you always know what next week asks of you."
		},
		{
			"title": "Gear we train with",
			"body": "Each item in the shop is used daily by our coaches before it goes on sale."
		},
		{
			"title": "Real coaches",
			"body": "Questions go to a certified coach, not a bot. Most replies arrive the same day."
		}
	],
	testimonials: [
		{
			"quote": "I followed the Strength plan for four months and my deadlift went from 80 to 120 kg. The weekly feedback kept me honest.",
			"name": "Priya Nair",
			"role": "Strength member"
		},
		{
			"quote": "My coach rebuilt my program around a bad shoulder. I train pain-free for the first time in years.",
			"name": "Marcus Hale",
			"role": "Coached member"
		},
		{
			"quote": "The kettlebell and bands cover almost everything I do at home. Solid quality and quick delivery.",
			"name": "Elena Ruiz",
			"role": "Shop customer"
		}
	],
	cta: {
		"title": "Your first week is on us.",
		"body": "Start any plan today and cancel within seven days at no cost."
	}
};
var hero_athlete_cutout_default = "/assets/hero-athlete-cutout-Ctn17ysN.png";
var TYPE_MS = 52;
var DELETE_MS = 32;
var PAUSE_TYPED_MS = 2400;
var PAUSE_DELETED_MS = 360;
function HeroTypewriter({ lines, className }) {
	const phrases = (0, import_react.useMemo)(() => lines.filter((line) => line.trim().length > 0), [lines]);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [text, setText] = (0, import_react.useState)("");
	const [deleting, setDeleting] = (0, import_react.useState)(false);
	const [reducedMotion, setReducedMotion] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => setReducedMotion(mq.matches);
		update();
		mq.addEventListener("change", update);
		return () => mq.removeEventListener("change", update);
	}, []);
	(0, import_react.useEffect)(() => {
		if (phrases.length === 0) return void 0;
		if (reducedMotion) {
			setText(phrases[index % phrases.length] ?? "");
			const t = setInterval(() => setIndex((i) => (i + 1) % phrases.length), 4e3);
			return () => clearInterval(t);
		}
		const full = phrases[index % phrases.length] ?? "";
		let timer = 0;
		if (!deleting && text === full) timer = window.setTimeout(() => setDeleting(true), PAUSE_TYPED_MS);
		else if (deleting && text.length === 0) timer = window.setTimeout(() => {
			setDeleting(false);
			setIndex((i) => (i + 1) % phrases.length);
		}, PAUSE_DELETED_MS);
		else timer = window.setTimeout(() => {
			setText((current) => {
				if (deleting) return full.slice(0, Math.max(0, current.length - 1));
				return full.slice(0, current.length + 1);
			});
		}, deleting ? DELETE_MS : TYPE_MS);
		return () => window.clearTimeout(timer);
	}, [
		text,
		deleting,
		index,
		phrases,
		reducedMotion
	]);
	(0, import_react.useEffect)(() => {
		if (reducedMotion) return;
		setText("");
		setDeleting(false);
	}, [index, reducedMotion]);
	const display = reducedMotion ? phrases[index] ?? "" : text;
	const liveLabel = phrases[index] ?? display;
	if (phrases.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: cn("hero-punch hero-typewriter text-[clamp(1.05rem,4.2vw,1.35rem)] font-black uppercase leading-snug text-foreground sm:text-2xl md:text-3xl", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hero-typewriter__line",
				"aria-hidden": "true",
				children: display
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hero-typewriter__cursor",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				"aria-live": "polite",
				"aria-atomic": "true",
				children: liveLabel
			})
		]
	});
}
var MAX_DPR = 2;
var REF_WIDTH$1 = 1200;
var MAX_TEX = 4096;
var HANDLES = 3;
var CELL_ASPECT = .6;
var DRIFT_X = .08;
var DRIFT_Y = .04;
var DRIFT_RATE = 1.3;
var DRIFT_RATE_Y = 1.3 * 1.3;
var SWEEP_RATE = .5;
var SWEEP_BAND = .28;
var RESNAP = .2;
var DAMP_REF = 20;
var SPEED_REF = 50;
var LABEL_MAX = .6;
var DOT_DIAMETER = 4 / 440;
var DOT_PITCH = 12 / 440;
var clamp = (x, a, b) => x < a ? a : x > b ? b : x;
var fract = (x) => x - Math.floor(x);
function parseColor(input, fallback) {
	if (!input) return fallback;
	let s = String(input).trim();
	if (s.slice(0, 4).toLowerCase() === "var(") {
		const comma = s.indexOf(",");
		const close = s.lastIndexOf(")");
		if (comma < 0 || close < comma) return fallback;
		s = s.slice(comma + 1, close).trim();
	}
	if (s[0] === "#") {
		let h = s.slice(1);
		if (h.length === 3 || h.length === 4) {
			let x = "";
			for (const c of h) x += c + c;
			h = x;
		}
		if (h.length === 6) h += "ff";
		if (h.length !== 8 || /[^0-9a-f]/i.test(h)) return fallback;
		return [
			parseInt(h.slice(0, 2), 16) / 255,
			parseInt(h.slice(2, 4), 16) / 255,
			parseInt(h.slice(4, 6), 16) / 255,
			parseInt(h.slice(6, 8), 16) / 255
		];
	}
	const m = s.match(/^(rgba?|hsla?)\(([^)]*)\)$/i);
	if (!m) return fallback;
	const parts = m[2].split(/[\s,/]+/).filter((p) => p.length > 0);
	if (parts.length < 3) return fallback;
	const num = (t, scale) => {
		const v = parseFloat(t);
		if (!Number.isFinite(v)) return 0;
		return t.indexOf("%") >= 0 ? v / 100 * scale : v;
	};
	const alpha = parts.length > 3 ? clamp(num(parts[3], 1), 0, 1) : 1;
	if (m[1].toLowerCase().slice(0, 3) === "rgb") return [
		clamp(num(parts[0], 255) / 255, 0, 1),
		clamp(num(parts[1], 255) / 255, 0, 1),
		clamp(num(parts[2], 255) / 255, 0, 1),
		alpha
	];
	const hh = fract(parseFloat(parts[0]) / 360);
	const sat = clamp(num(parts[1], 1), 0, 1);
	const li = clamp(num(parts[2], 1), 0, 1);
	const q = li < .5 ? li * (1 + sat) : li + sat - li * sat;
	const p = 2 * li - q;
	const chan = (t) => {
		let u = fract(t);
		if (u < 1 / 6) return p + (q - p) * 6 * u;
		if (u < 1 / 2) return q;
		if (u < 2 / 3) return p + (q - p) * (2 / 3 - u) * 6;
		return p;
	};
	return [
		chan(hh + 1 / 3),
		chan(hh),
		chan(hh - 1 / 3),
		alpha
	];
}
var VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
    vUv = aPos * 0.5 + 0.5;
    gl_Position = vec4(aPos, 0.0, 1.0);
}`;
var FRAG = `
precision highp float;

uniform sampler2D uMap;
uniform vec2 uRes;
uniform vec2 uAtlas;
uniform vec2 uPtr;
uniform float uReach;
uniform vec3 uText;
uniform vec3 uShade;
uniform vec4 uAccent;
uniform vec2 uV0;
uniform vec2 uV1;
uniform vec2 uV2;
uniform float uHalf;

varying vec2 vUv;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

vec2 blurRG(vec2 uv, float e) {
    vec4 sum = vec4(0.0);
    for (int i = 0; i < 6; i++) {
        float fi = float(i);
        float th = radians(fi / 6.0 * 360.0);
        vec2 dir = vec2(cos(th), sin(th));
        vec2 off = dir * (hash(vec2(fi, uv.x + uv.y)) + e);
        sum += texture2D(uMap, uv + off * e);
    }
    return (sum / 6.0).rg;
}

vec2 segment(vec2 p, vec2 a, vec2 b) {
    vec2 ab = b - a;
    vec2 ap = p - a;
    float t = clamp(dot(ap, ab) / max(dot(ab, ab), 1e-8), 0.0, 1.0);
    return vec2(length(ap - ab * t), t);
}

float stroke(float d, float lw, float px) {
    return 1.0 - smoothstep(lw, lw + px, d);
}

float dashedLine(vec2 p, vec2 a, vec2 b, float lw, float px) {
    vec2 s = segment(p, a, b);
    float dash = step(0.5, fract(s.y * length(b - a) * 100.0));
    return stroke(s.x, lw, px) * dash;
}

float boxEdge(vec2 p, vec2 c, float h, float lw, float px) {
    vec2 q = abs(p - c) - vec2(h);
    float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0);
    return stroke(abs(d), lw, px);
}

void main() {
    float aspect = uRes.x / uRes.y;

    vec2 E = (vUv * uRes - (uRes - uAtlas) * 0.5) / uAtlas;
    float inside = step(0.0, E.x) * step(E.x, 1.0) * step(0.0, E.y) * step(E.y, 1.0);
    vec2 safeUv = clamp(E, 0.0, 1.0);

    float b = clamp(1.0 - E.y * 3.5, 0.0, 1.0) * 0.008;
    vec2 soft = blurRG(safeUv, b);
    vec2 sharp = blurRG(safeUv, b * 0.1);

    float d = length((vUv - uPtr) / vec2(1.0, aspect));
    float k = 1.0 - pow(smoothstep(0.0, max(uReach, 1e-4), d), 3.0);

    float mask = mix(soft.r, sharp.g, k) * inside;
    vec3 fill = mix(uShade, uText, smoothstep(0.0, 1.0, E.y));

    vec2 P = vec2(vUv.x * aspect, vUv.y);
    float px = 1.0 / uRes.y;
    float lw = px * 0.2;
    float lines = max(
        max(dashedLine(P, uV0, uV1, lw, px), dashedLine(P, uV1, uV2, lw, px)),
        dashedLine(P, uV2, uV0, lw, px)
    );
    float boxes = max(
        max(boxEdge(P, uV0, uHalf, lw, px), boxEdge(P, uV1, uHalf, lw, px)),
        boxEdge(P, uV2, uHalf, lw, px)
    );
    float A = max(lines, boxes) * uAccent.a * (1.0 - vUv.y);

    vec4 card = vec4(fill * mask, mask);
    vec4 comp = vec4(uAccent.rgb * A, A) + card * (1.0 - A);

    gl_FragColor = comp * pow(clamp(E.y, 0.0, 1.0), 0.7);
}`;
function compile(gl, vs, fs) {
	const make = (type, src) => {
		const sh = gl.createShader(type);
		gl.shaderSource(sh, src);
		gl.compileShader(sh);
		return sh;
	};
	const p = gl.createProgram();
	gl.attachShader(p, make(gl.VERTEX_SHADER, vs));
	gl.attachShader(p, make(gl.FRAGMENT_SHADER, fs));
	gl.bindAttribLocation(p, 0, "aPos");
	gl.linkProgram(p);
	return p;
}
function fontString(f, px) {
	return `${f.style} ${f.weight} ${px}px ${f.family}`;
}
function buildAtlas(text, f, drawFontPx, dpr) {
	const probe = document.createElement("canvas").getContext("2d");
	if (!probe) return null;
	const setFont = (ctx, px) => {
		ctx.font = fontString(f, px);
		try {
			if ("letterSpacing" in ctx) ctx.letterSpacing = f.letterSpacing;
		} catch {}
	};
	const measure = (px) => {
		setFont(probe, px);
		const m = probe.measureText(text);
		const asc = m.actualBoundingBoxAscent || px * .8;
		const desc = m.actualBoundingBoxDescent || px * .22;
		return {
			w: Math.max(1, m.width),
			asc,
			desc
		};
	};
	let fpx = Math.max(8, drawFontPx * dpr);
	let m = measure(fpx);
	let pad = fpx * .12;
	const over = Math.max((m.w + pad * 2) / MAX_TEX, (m.asc + m.desc + pad * 2) / MAX_TEX);
	if (over > 1) {
		fpx = Math.max(8, fpx / over);
		m = measure(fpx);
		pad = fpx * .12;
	}
	const w = Math.max(1, Math.ceil(m.w + pad * 2));
	const h = Math.max(1, Math.ceil(m.asc + m.desc + pad * 2));
	const canvas = document.createElement("canvas");
	canvas.width = w;
	canvas.height = h;
	const ctx = canvas.getContext("2d");
	if (!ctx) return null;
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, w, h);
	setFont(ctx, fpx);
	ctx.textBaseline = "alphabetic";
	ctx.textAlign = "left";
	ctx.globalCompositeOperation = "lighter";
	ctx.fillStyle = "#ff0000";
	ctx.fillText(text, pad, pad + m.asc);
	const block = m.asc + m.desc;
	ctx.strokeStyle = "#00ff00";
	ctx.lineCap = "round";
	ctx.lineJoin = "round";
	ctx.lineWidth = Math.max(1, block * DOT_DIAMETER);
	ctx.setLineDash([0, Math.max(2, block * DOT_PITCH)]);
	ctx.strokeText(text, pad, pad + m.asc);
	const cssPerPx = drawFontPx / fpx;
	return {
		canvas,
		cssW: w * cssPerPx,
		cssH: h * cssPerPx
	};
}
var HANDLE_DEFAULTS = {
	size: 109,
	spread: 27,
	labels: true
};
function VectorWordmarkBase(props) {
	const { text = "VECTOR", font = {
		fontFamily: "Inter",
		fontWeight: 800,
		fontSize: "200px",
		lineHeight: "1em",
		letterSpacing: "-0.02em",
		textAlign: "left"
	}, background = "transparent", textColor = "#FFFFFF", shade = "#FFFFFF", accent = "#FFFFFF", reach = 290, speed = 50, damping = 60, handles, className, style } = props;
	const hg = {
		...HANDLE_DEFAULTS,
		...handles ?? {}
	};
	const hostRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const labelRefs = (0, import_react.useRef)([
		null,
		null,
		null
	]);
	const rawSize = font?.fontSize;
	const fontSpec = {
		family: font?.fontFamily || "Inter, system-ui, sans-serif",
		weight: String(font?.fontWeight ?? 500),
		style: font?.fontStyle === "italic" ? "italic" : "normal",
		size: Math.max(8, parseFloat(String(rawSize ?? 240)) || 240),
		letterSpacing: String(font?.letterSpacing ?? "0px")
	};
	const accentRGBA = parseColor(accent, [
		1,
		1,
		1,
		.4
	]);
	const labelColor = `rgb(${Math.round(accentRGBA[0] * 255)}, ${Math.round(accentRGBA[1] * 255)}, ${Math.round(accentRGBA[2] * 255)})`;
	const live = (0, import_react.useRef)({
		text,
		fontSpec,
		textColor,
		shade,
		background,
		accentRGBA,
		reach,
		speed,
		damping,
		hg
	});
	live.current.text = text;
	live.current.fontSpec = fontSpec;
	live.current.textColor = textColor;
	live.current.shade = shade;
	live.current.background = background;
	live.current.accentRGBA = accentRGBA;
	live.current.reach = reach;
	live.current.speed = speed;
	live.current.damping = damping;
	live.current.hg = hg;
	(0, import_react.useEffect)(() => {
		const host = hostRef.current;
		const canvas = canvasRef.current;
		if (!host || !canvas) return;
		const attrs = {
			alpha: true,
			antialias: false,
			depth: false,
			stencil: false,
			premultipliedAlpha: true,
			powerPreference: "high-performance"
		};
		const gl = canvas.getContext("webgl2", attrs) || canvas.getContext("webgl", attrs);
		if (!gl) return;
		const isGL2 = typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext;
		const prog = compile(gl, VERT, FRAG);
		const U = {
			map: gl.getUniformLocation(prog, "uMap"),
			res: gl.getUniformLocation(prog, "uRes"),
			atlas: gl.getUniformLocation(prog, "uAtlas"),
			ptr: gl.getUniformLocation(prog, "uPtr"),
			reach: gl.getUniformLocation(prog, "uReach"),
			text: gl.getUniformLocation(prog, "uText"),
			shade: gl.getUniformLocation(prog, "uShade"),
			accent: gl.getUniformLocation(prog, "uAccent"),
			v0: gl.getUniformLocation(prog, "uV0"),
			v1: gl.getUniformLocation(prog, "uV1"),
			v2: gl.getUniformLocation(prog, "uV2"),
			half: gl.getUniformLocation(prog, "uHalf")
		};
		const quad = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, quad);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
			-1,
			-1,
			1,
			-1,
			-1,
			1,
			1,
			1
		]), gl.STATIC_DRAW);
		gl.enableVertexAttribArray(0);
		gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
		gl.disable(gl.BLEND);
		const tex = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, tex);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([
			0,
			0,
			0,
			255
		]));
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		let alive = true;
		let boxW = Math.max(1, host.offsetWidth);
		let boxH = Math.max(1, host.offsetHeight);
		let boxDirty = true;
		let dpr = 1;
		let bufW = 0;
		let bufH = 0;
		let atlasRatioW = 1;
		let atlasRatioH = 1;
		let atlasKey = "";
		function drawFontPx() {
			return live.current.fontSpec.size * (boxW / REF_WIDTH$1);
		}
		function resize() {
			boxW = Math.max(1, host.offsetWidth);
			boxH = Math.max(1, host.offsetHeight);
			dpr = Math.min(MAX_DPR, window.devicePixelRatio || 1);
			const w = Math.max(1, Math.round(boxW * dpr));
			const h = Math.max(1, Math.round(boxH * dpr));
			if (w === bufW && h === bufH) return;
			bufW = w;
			bufH = h;
			canvas.width = w;
			canvas.height = h;
		}
		function rebuildAtlas() {
			const L = live.current;
			const f = L.fontSpec;
			const px = Math.max(8, drawFontPx());
			const atlas = buildAtlas(L.text || " ", f, px, dpr);
			if (!atlas) return;
			atlasRatioW = Math.max(1e-4, atlas.cssW / px);
			atlasRatioH = Math.max(1e-4, atlas.cssH / px);
			if (typeof document !== "undefined" && document.fonts) try {
				const probe = fontString(f, 64);
				if (!document.fonts.check(probe)) {
					const again = () => {
						if (alive) atlasKey = "";
					};
					document.fonts.load(probe, L.text).then(again, again);
				}
			} catch {}
			gl.bindTexture(gl.TEXTURE_2D, tex);
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlas.canvas);
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
			const cw = atlas.canvas.width;
			const ch = atlas.canvas.height;
			const pot = (cw & cw - 1) === 0 && (ch & ch - 1) === 0;
			if (isGL2 || pot) {
				gl.generateMipmap(gl.TEXTURE_2D);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
			} else gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		}
		const target = {
			x: -.5,
			y: .5
		};
		const eased = {
			x: -.5,
			y: .5
		};
		const cells = [];
		const verts = [];
		for (let i = 0; i < HANDLES; i += 1) {
			cells.push({
				x: -.5,
				y: .5
			});
			verts.push({
				x: -.5,
				y: .5
			});
		}
		let hasPointer = false;
		let sweepClock = 0;
		let driftT = 0;
		function snap(x, y, cw, ch) {
			const cx = Math.floor(x / cw);
			const cy = Math.floor(y / ch);
			const found = [];
			for (let i = -1; i <= 1; i += 1) for (let j = -1; j <= 1; j += 1) {
				const px = (cx + i + .5) * cw;
				const py = (cy + j + .5) * ch;
				found.push({
					x: px,
					y: py,
					d: Math.hypot(px - x, py - y)
				});
			}
			found.sort((a, b) => a.d - b.d);
			for (let i = 0; i < HANDLES; i += 1) {
				cells[i].x = found[i + 1].x;
				cells[i].y = found[i + 1].y;
			}
		}
		const onMove = (e) => {
			hasPointer = true;
			const r = host.getBoundingClientRect();
			if (r.width <= 0 || r.height <= 0) return;
			target.x = (e.clientX - r.left) / r.width;
			target.y = 1 - (e.clientY - r.top) / r.height;
		};
		host.addEventListener("pointermove", onMove);
		let raf = 0;
		let last = 0;
		let running = true;
		function sync() {
			if (boxDirty) {
				boxDirty = false;
				resize();
			}
			const L = live.current;
			const f = L.fontSpec;
			const key = [
				L.text,
				f.family,
				f.weight,
				f.style,
				f.letterSpacing,
				dpr,
				Math.ceil(Math.max(8, drawFontPx()) / 64)
			].join("|");
			if (key !== atlasKey) {
				atlasKey = key;
				rebuildAtlas();
			}
		}
		function step(dt) {
			const L = live.current;
			const rate = Math.max(0, L.speed) / SPEED_REF;
			const cw = Math.max(.01, L.hg.spread / 100);
			const ch = cw * CELL_ASPECT;
			const aspect = boxW / boxH;
			if (!hasPointer) {
				const band = atlasRatioH * Math.max(8, drawFontPx()) / boxH;
				target.x += dt * SWEEP_RATE * rate;
				target.y = (1 - band) / 2 + SWEEP_BAND * band;
				if (target.x > 1.5) {
					target.x = -.5;
					eased.x = -.5;
				}
				sweepClock += dt;
				if (sweepClock >= RESNAP) {
					sweepClock = 0;
					snap(target.x * aspect, target.y, cw, ch);
				}
			} else snap(target.x * aspect, target.y, cw, ch);
			const damp = clamp(L.damping / 100 * DAMP_REF * dt, 0, 1);
			eased.x += (target.x - eased.x) * damp;
			eased.y += (target.y - eased.y) * damp;
			driftT += dt * rate;
			for (let i = 0; i < HANDLES; i += 1) {
				const c = cells[i];
				const sx = Math.round(c.x / cw - .5);
				const sy = Math.round(c.y / ch - .5);
				const h1 = fract(Math.sin(sx * 127.1 + sy * 311.7) * 43758.5453);
				const h2 = fract(Math.sin(sx * 269.5 + sy * 183.3) * 43758.5453);
				verts[i].x = c.x + DRIFT_X * cw * Math.sin(driftT * DRIFT_RATE + h1 * Math.PI * 2);
				verts[i].y = c.y + DRIFT_Y * ch * Math.sin(driftT * DRIFT_RATE_Y + h2 * Math.PI * 2);
			}
		}
		function writeLabels() {
			const L = live.current;
			const aspect = boxW / boxH;
			const half = L.hg.size / 2;
			for (let i = 0; i < HANDLES; i += 1) {
				const el = labelRefs.current[i];
				if (!el) continue;
				const bx = verts[i].x / aspect;
				const by = verts[i].y;
				const gx = Math.round(clamp(bx * 100, 0, 100));
				const gy = Math.round(clamp(by * 100, 0, 100));
				el.style.transform = `translate(${bx * boxW - half}px, ${(1 - by) * boxH - half}px)`;
				el.style.opacity = String(LABEL_MAX);
				el.textContent = `${gx}, ${gy}`;
			}
		}
		function draw() {
			const L = live.current;
			const tc = parseColor(L.textColor, [
				.859,
				.918,
				.992,
				1
			]);
			const sc = parseColor(L.shade, [
				.035,
				.063,
				.102,
				1
			]);
			const ac = L.accentRGBA;
			gl.viewport(0, 0, bufW, bufH);
			gl.useProgram(prog);
			gl.uniform1i(U.map, 0);
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, tex);
			gl.uniform2f(U.res, boxW, boxH);
			const px = Math.max(8, drawFontPx());
			gl.uniform2f(U.atlas, atlasRatioW * px, atlasRatioH * px);
			gl.uniform2f(U.ptr, eased.x, eased.y);
			gl.uniform1f(U.reach, Math.max(1, L.reach) / boxW);
			gl.uniform3f(U.text, tc[0], tc[1], tc[2]);
			gl.uniform3f(U.shade, sc[0], sc[1], sc[2]);
			gl.uniform4f(U.accent, ac[0], ac[1], ac[2], ac[3]);
			gl.uniform2f(U.v0, verts[0].x, verts[0].y);
			gl.uniform2f(U.v1, verts[1].x, verts[1].y);
			gl.uniform2f(U.v2, verts[2].x, verts[2].y);
			gl.uniform1f(U.half, L.hg.size / 2 / boxH);
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
		}
		const frame = (now) => {
			if (!alive || !running) return;
			const dt = last ? Math.min(.1, (now - last) / 1e3) : 0;
			last = now;
			sync();
			step(dt);
			writeLabels();
			draw();
			raf = requestAnimationFrame(frame);
		};
		const gate = () => {
			if (running && !document.hidden) {
				if (!raf) {
					last = 0;
					raf = requestAnimationFrame(frame);
				}
			} else if (raf) {
				cancelAnimationFrame(raf);
				raf = 0;
			}
		};
		const ro = new ResizeObserver(() => {
			boxDirty = true;
		});
		ro.observe(host);
		document.addEventListener("visibilitychange", gate);
		if (typeof document !== "undefined" && document.fonts) document.fonts.ready.then(() => {
			if (alive) atlasKey = "";
		}, () => {});
		gate();
		return () => {
			alive = false;
			running = false;
			if (raf) cancelAnimationFrame(raf);
			ro.disconnect();
			host.removeEventListener("pointermove", onMove);
			document.removeEventListener("visibilitychange", gate);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: hostRef,
		className,
		style: {
			position: "relative",
			overflow: "hidden",
			background,
			width: "100%",
			height: "100%",
			...style
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			style: {
				position: "absolute",
				inset: 0,
				width: "100%",
				height: "100%",
				display: "block"
			}
		}), hg.labels ? [
			0,
			1,
			2
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: (el) => {
				labelRefs.current[i] = el;
			},
			style: {
				position: "absolute",
				left: 0,
				top: 0,
				opacity: LABEL_MAX,
				pointerEvents: "none",
				whiteSpace: "nowrap",
				fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
				fontSize: 11,
				letterSpacing: "0.08em",
				color: labelColor
			}
		}, i)) : null]
	});
}
var originkitPresetProps = { handles: {
	size: 109,
	labels: true,
	spread: 27
} };
function VectorWordmark(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VectorWordmarkBase, {
		...originkitPresetProps,
		...props
	});
}
var REF_WIDTH = 1200;
function horizontalInset(viewportWidth) {
	if (viewportWidth < 640) return 18;
	if (viewportWidth < 1024) return 18;
	return 28;
}
function readThemeRgb(cssVar, fallback) {
	if (typeof document === "undefined") return fallback;
	const probe = document.createElement("span");
	probe.style.color = `var(${cssVar})`;
	probe.style.position = "absolute";
	probe.style.visibility = "hidden";
	document.body.appendChild(probe);
	const resolved = getComputedStyle(probe).color;
	document.body.removeChild(probe);
	return resolved && resolved !== "rgba(0, 0, 0, 0)" ? resolved : fallback;
}
function measureWordWidth(text, drawFontPx, letterSpacing, family, weight) {
	const ctx = document.createElement("canvas").getContext("2d");
	if (!ctx) return drawFontPx * text.length;
	ctx.font = `${weight} ${drawFontPx}px ${family}`;
	try {
		if ("letterSpacing" in ctx) ctx.letterSpacing = letterSpacing;
	} catch {}
	const m = ctx.measureText(text);
	const pad = drawFontPx * .24;
	return m.width + pad;
}
/** fontSpec.size at REF_WIDTH so the baked word fits `availCssPx` at current host width */
function fitFontSpecSize(hostWidth, hostHeight, text, letterSpacing, family, weight) {
	const inset = horizontalInset(hostWidth);
	const widthFill = hostWidth < 640 ? .9 : .96;
	const availW = Math.max(120, (hostWidth - inset * 2) * widthFill);
	const availH = Math.max(72, hostHeight * .88);
	let lo = 60;
	let hi = 640;
	for (let i = 0; i < 16; i += 1) {
		const spec = (lo + hi) / 2;
		const drawPx = spec * (hostWidth / REF_WIDTH);
		const w = measureWordWidth(text, drawPx, letterSpacing, family, weight);
		const h = drawPx * 1.06;
		if (w > availW || h > availH) hi = spec;
		else lo = spec;
	}
	return Math.floor(lo * (hostWidth < 640 ? .94 : .98));
}
function HeroVectorWordmark({ text, className, style }) {
	const hostWrapRef = (0, import_react.useRef)(null);
	const [fontSizePx, setFontSizePx] = (0, import_react.useState)(280);
	const [colors, setColors] = (0, import_react.useState)({
		text: "rgb(247, 247, 247)",
		shade: "rgb(120, 120, 120)",
		accent: "rgba(196, 255, 69, 0.42)"
	});
	const letterSpacing = (0, import_react.useMemo)(() => {
		const chars = text.trim().length;
		if (chars <= 6) return "0.04em";
		if (chars <= 8) return "0.03em";
		return "0.02em";
	}, [text]);
	const fontFamily = "\"Archivo\", ui-sans-serif, system-ui, sans-serif";
	const fontWeight = 900;
	(0, import_react.useEffect)(() => {
		const fit = () => {
			const host = hostWrapRef.current?.parentElement;
			if (!host) return;
			const w = host.clientWidth;
			const h = host.clientHeight;
			if (w < 1 || h < 1) return;
			setFontSizePx(fitFontSpecSize(w, h, text.trim(), letterSpacing, fontFamily, fontWeight));
		};
		fit();
		const ro = new ResizeObserver(fit);
		const host = hostWrapRef.current?.parentElement;
		if (host) ro.observe(host);
		window.addEventListener("resize", fit);
		return () => {
			ro.disconnect();
			window.removeEventListener("resize", fit);
		};
	}, [text, letterSpacing]);
	(0, import_react.useEffect)(() => {
		const sync = () => {
			const fg = readThemeRgb("--foreground", "rgb(247, 247, 247)");
			const muted = readThemeRgb("--muted-foreground", "rgb(120, 120, 120)");
			const acc = readThemeRgb("--accent", "rgb(196, 255, 69)");
			const accentAlpha = window.innerWidth < 640 ? .52 : .38;
			const accent = acc.startsWith("rgba") ? acc : acc.replace(/^rgb\(/, "rgba(").replace(/\)$/, `, ${accentAlpha})`);
			setColors({
				text: fg,
				shade: muted,
				accent
			});
		};
		sync();
		const obs = new MutationObserver(sync);
		obs.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"]
		});
		window.addEventListener("resize", sync);
		return () => {
			obs.disconnect();
			window.removeEventListener("resize", sync);
		};
	}, []);
	const [reach, setReach] = (0, import_react.useState)(290);
	const [reduced, setReduced] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const onMotion = () => setReduced(mq.matches);
		onMotion();
		mq.addEventListener("change", onMotion);
		const onResize = () => setReach(window.innerWidth < 640 ? 260 : 290);
		onResize();
		window.addEventListener("resize", onResize);
		return () => {
			mq.removeEventListener("change", onMotion);
			window.removeEventListener("resize", onResize);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: hostWrapRef,
		className: "hero-wordmark-fill h-full w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VectorWordmark, {
			text,
			background: "transparent",
			textColor: colors.text,
			shade: colors.shade,
			accent: colors.accent,
			reach,
			speed: reduced ? 28 : 50,
			damping: reduced ? 85 : 60,
			handles: {
				size: 109,
				spread: 27,
				labels: false
			},
			font: {
				fontFamily,
				fontWeight,
				fontSize: `${fontSizePx}px`,
				letterSpacing
			},
			className,
			style: {
				minWidth: 0,
				minHeight: 0,
				width: "100%",
				height: "100%",
				...style
			}
		})
	});
}
var OFFSET = {
	top: {
		x: 0,
		y: "1.1em"
	},
	bottom: {
		x: 0,
		y: "-1.1em"
	},
	left: {
		x: "0.35em",
		y: 0
	},
	right: {
		x: "-0.35em",
		y: 0
	}
};
function splitSegments(text, segmentBy, separator) {
	const lines = separator ? text.split(separator) : [text];
	const out = [];
	for (const line of lines) {
		if (segmentBy === "lines") {
			out.push(line);
			continue;
		}
		if (segmentBy === "chars") {
			out.push(...[...line]);
			continue;
		}
		const words = line.trim() ? line.match(/\S+|\s+/g) ?? [] : [];
		for (const w of words) out.push(w);
	}
	return out.filter((s) => s.length > 0);
}
function staggerIndex(index, total, mode) {
	if (mode === "reverse") return total - 1 - index;
	if (mode === "center") {
		const mid = (total - 1) / 2;
		return Math.round(Math.abs(index - mid));
	}
	return index;
}
function prefersReducedMotion() {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function StaggeredText({ text, className, as: Tag = "p", segmentBy = "words", separator, delay = 80, duration = .6, easing = [
	.22,
	1,
	.36,
	1
], threshold = .1, rootMargin = "0px", direction = "top", blur = true, staggerDirection = "forward", respectReducedMotion = true, exitOnScrollOut = false, from, to, onAnimationComplete }) {
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, {
		amount: threshold,
		margin: rootMargin,
		once: !exitOnScrollOut
	});
	const reduced = respectReducedMotion && prefersReducedMotion();
	const segments = (0, import_react.useMemo)(() => splitSegments(text, segmentBy, separator), [
		text,
		segmentBy,
		separator
	]);
	const offset = OFFSET[direction];
	const MotionTag = motion.create(Tag);
	const defaultHidden = {
		opacity: 0,
		x: offset.x,
		y: offset.y,
		filter: blur ? "blur(10px)" : "blur(0px)"
	};
	const defaultVisible = {
		opacity: 1,
		x: 0,
		y: 0,
		filter: "blur(0px)"
	};
	const hidden = from ?? defaultHidden;
	const visible = to ?? defaultVisible;
	if (reduced) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		ref,
		className,
		children: text
	});
	let completed = 0;
	const onSegmentDone = () => {
		completed += 1;
		if (completed >= segments.length) onAnimationComplete?.();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MotionTag, {
		ref,
		className: cn(className),
		"aria-label": text,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: text
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": true,
			className: segmentBy === "lines" ? "flex flex-col" : "inline",
			children: segments.map((segment, index) => {
				if (/^\s+$/.test(segment)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: segment }, `ws-${index}`);
				const order = staggerIndex(index, segments.length, staggerDirection);
				const animate = inView ? visible : hidden;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
					className: cn(segmentBy === "lines" ? "block" : "inline-block", segmentBy === "words" && index < segments.length - 1 && !/^\s+$/.test(segments[index + 1] ?? "") ? "mr-[0.28em]" : void 0),
					initial: hidden,
					animate,
					transition: {
						duration,
						delay: order * delay / 1e3,
						ease: easing
					},
					onAnimationComplete: onSegmentDone,
					children: segment
				}, `${segment}-${index}`);
			})
		})]
	});
}
function Hero() {
	const nameRef = (0, import_react.useRef)(null);
	const imgRef = (0, import_react.useRef)(null);
	const copyRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let raf = 0;
		const update = () => {
			raf = 0;
			if (!nameRef.current || !imgRef.current || !copyRef.current) return;
			const p = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1);
			const wordBase = window.innerWidth < 640 ? .5 : .26;
			imgRef.current.style.transform = `translateY(${p * -22}%) scale(${1 - p * .08})`;
			imgRef.current.style.opacity = `${1 - p * .5}`;
			nameRef.current.style.opacity = `${wordBase + p * (.94 - wordBase)}`;
			copyRef.current.style.opacity = `${1 - p}`;
		};
		const onScroll = () => {
			if (!raf) raf = requestAnimationFrame(update);
		};
		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
			if (raf) cancelAnimationFrame(raf);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative h-[112svh] max-h-[920px] min-h-[100svh] sm:h-[118svh] sm:max-h-none lg:h-[130svh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "top",
			className: "hero-section sticky top-0 flex h-svh min-h-0 flex-col overflow-hidden bg-background",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "sr-only",
					children: site_default.hero.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hero-visual",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						ref: nameRef,
						className: "hero-wordmark-layer",
						style: { opacity: .5 },
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroVectorWordmark, { text: site_default.hero.name })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hero-character-stage",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							ref: imgRef,
							src: hero_athlete_cutout_default,
							alt: "",
							width: 1024,
							height: 1536,
							className: "hero-athlete-layer"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hero-ground-line",
							"aria-hidden": "true"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: copyRef,
					className: "hero-copy container-x relative z-30 mt-auto grid shrink-0 gap-8 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 md:grid-cols-[1fr_auto] md:items-end md:gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroTypewriter, { lines: site_default.hero.typewriterLines ?? [site_default.hero.punchline] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggeredText, {
								text: site_default.hero.subline,
								as: "p",
								className: "hero-sub mt-3 text-lg text-muted-foreground md:text-xl",
								segmentBy: "words",
								direction: "top",
								delay: 35,
								blur: false,
								threshold: .15
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-7 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#packages",
									className: "btn btn-primary",
									children: "Start now"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#shop",
									className: "btn btn-secondary",
									children: "Shop gear"
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#packages",
						className: "scroll-cue hidden items-center gap-2 text-muted-foreground md:flex",
						"aria-label": "Scroll to packages",
						children: ["Scroll ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-4" })]
					})]
				})
			]
		})
	});
}
/** Fade-and-rise on scroll: sets data-visible on the element once it enters view. */
function useReveal() {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(([e]) => {
			if (e?.isIntersecting) {
				el.dataset["visible"] = "true";
				io.disconnect();
			}
		}, { threshold: .15 });
		io.observe(el);
		return () => io.disconnect();
	}, []);
	return ref;
}
/** 3D hover tilt, only on devices that can hover and don't prefer reduced motion. */
function tiltHandlers(max = 8) {
	const canTilt = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches;
	return {
		onPointerMove: (e) => {
			if (!canTilt()) return;
			const r = e.currentTarget.getBoundingClientRect();
			const x = (e.clientX - r.left) / r.width - .5;
			const y = (e.clientY - r.top) / r.height - .5;
			e.currentTarget.style.transform = `perspective(900px) rotateX(${-y * max}deg) rotateY(${x * max}deg)`;
		},
		onPointerLeave: (e) => {
			e.currentTarget.style.transform = "";
		}
	};
}
var MouseEnterContext = (0, import_react.createContext)(void 0);
var CardContainer = ({ children, className, containerClassName }) => {
	const containerRef = (0, import_react.useRef)(null);
	const [isMouseEntered, setIsMouseEntered] = (0, import_react.useState)(false);
	const handleMouseMove = (e) => {
		if (!containerRef.current) return;
		const { left, top, width, height } = containerRef.current.getBoundingClientRect();
		const x = (e.clientX - left - width / 2) / 25;
		const y = (e.clientY - top - height / 2) / 25;
		containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
	};
	const handleMouseEnter = (e) => {
		setIsMouseEntered(true);
		if (!containerRef.current) return;
	};
	const handleMouseLeave = (e) => {
		if (!containerRef.current) return;
		setIsMouseEntered(false);
		containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MouseEnterContext.Provider, {
		value: [isMouseEntered, setIsMouseEntered],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("py-20 flex items-center justify-center", containerClassName),
			style: { perspective: "1000px" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: containerRef,
				onMouseEnter: handleMouseEnter,
				onMouseMove: handleMouseMove,
				onMouseLeave: handleMouseLeave,
				className: cn("flex items-center justify-center relative transition-all duration-200 ease-linear", className),
				style: { transformStyle: "preserve-3d" },
				children
			})
		})
	});
};
var CardBody = ({ children, className }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("h-96 w-96 [transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]", className),
		children
	});
};
var CardItem = ({ as: Tag = "div", children, className, translateX = 0, translateY = 0, translateZ = 0, rotateX = 0, rotateY = 0, rotateZ = 0, ...rest }) => {
	const ref = (0, import_react.useRef)(null);
	const [isMouseEntered] = useMouseEnter();
	(0, import_react.useEffect)(() => {
		handleAnimations();
	}, [isMouseEntered]);
	const handleAnimations = () => {
		if (!ref.current) return;
		if (isMouseEntered) ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
		else ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		ref,
		className: cn("w-fit transition duration-200 ease-linear", className),
		...rest,
		children
	});
};
var useMouseEnter = () => {
	const context = (0, import_react.useContext)(MouseEnterContext);
	if (context === void 0) throw new Error("useMouseEnter must be used within a MouseEnterProvider");
	return context;
};
var METRIC_LABELS = [
	"Program",
	"Coaching",
	"Extras",
	"Support",
	"Access"
];
function ArrowIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		className: "lp-arrow-icon",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M5 12H19M14 7L19 12L14 17",
			stroke: "currentColor",
			strokeWidth: "1.6",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function ChevronIcon({ open }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 20 20",
		fill: "none",
		"aria-hidden": "true",
		className: `lp-chevron ${open ? "is-open" : ""}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M6.5 8L10 11.5L13.5 8",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function PackageCard({ pkg, index }) {
	const { add, lines } = useCart();
	const inCart = lines.some((l) => l.id === pkg.id);
	const [expanded, setExpanded] = (0, import_react.useState)(false);
	const featured = pkg.highlighted;
	const metrics = pkg.features.slice(0, 3).map((value, i) => ({
		label: METRIC_LABELS[i] ?? "Included",
		value
	}));
	const extraMetrics = pkg.features.slice(3).map((value, i) => ({
		label: METRIC_LABELS[i + 3] ?? "Also includes",
		value
	}));
	const hasExtra = extraMetrics.length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: `lp-card-shell ${featured ? "is-featured" : ""}`,
		style: { "--card-delay": `${index * 100}ms` },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContainer, {
			containerClassName: "py-0 w-full",
			className: "w-full max-w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardBody, {
				className: "group/card lp-card relative h-auto w-full min-w-0 max-w-full",
				children: [
					featured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lp-popular-label",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "lp-popular-dot" }), "Most popular"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardItem, {
						translateZ: 50,
						className: "w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "lp-card-header",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "lp-plan-name",
								children: pkg.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "lp-price-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "lp-price",
									children: money(pkg.price)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "lp-month",
									children: ["/ ", pkg.period]
								})]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardItem, {
						translateZ: 55,
						className: "w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "lp-plan-description",
							children: pkg.summary
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardItem, {
						translateZ: 70,
						className: "mt-4 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: `lp-choose-button ${featured ? "is-featured" : ""}`,
							onClick: () => add(pkg.id),
							disabled: inCart,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: inCart ? "Added to cart" : `Choose ${pkg.name}` }), !inCart && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowIcon, {})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardItem, {
						translateZ: 40,
						className: "w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "lp-divider",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lp-details",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "lp-details-title",
									children: "What's included:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "lp-metrics",
									children: metrics.map((metric) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "lp-metric",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: metric.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: metric.value })]
									}, metric.label))
								}),
								hasExtra && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `lp-extra-metrics ${expanded ? "is-visible" : ""}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "lp-extra-inner",
										children: extraMetrics.map((metric) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "lp-metric",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: metric.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: metric.value })]
										}, metric.value))
									})
								})
							]
						})]
					}),
					hasExtra && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardItem, {
						translateZ: 45,
						className: "w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "lp-view-more",
							onClick: () => setExpanded((current) => !current),
							"aria-expanded": expanded,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: expanded ? "View less" : "View more" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronIcon, { open: expanded })]
						})
					})
				]
			})
		})
	});
}
function Packages() {
	const ref = useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "packages",
		className: "section scroll-mt-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref,
			className: "reveal container-x",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-10 max-w-2xl md:mb-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggeredText, {
					text: "Pick a plan. Show up. Get stronger.",
					as: "h2",
					className: "h2",
					segmentBy: "words",
					direction: "top",
					delay: 55
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-muted-foreground",
					children: "Monthly plans, no contracts. Switch or cancel any time from your account."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "jodlem-pricing lp-root",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lp-content",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lp-cards",
						children: packages_default.map((p, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageCard, {
							pkg: p,
							index
						}, p.id))
					})
				})
			})]
		})
	});
}
var PRESETS = {
	nav: {
		scale: 28,
		aberration: 6,
		bevelDepth: 16,
		frost: .35,
		tint: .06,
		radius: 9999
	},
	panel: {
		scale: 34,
		aberration: 9,
		bevelDepth: 20,
		frost: .38,
		tint: .09,
		radius: 0
	},
	card: {
		scale: 26,
		aberration: 5,
		bevelDepth: 14,
		frost: .32,
		tint: .08,
		radius: 16
	},
	strong: {
		scale: 38,
		aberration: 11,
		bevelDepth: 24,
		frost: .42,
		tint: .1,
		radius: 0
	}
};
var surfaceStyles = "pointer-events-none absolute inset-0 border border-[color:var(--glass-border)] shadow-[var(--glass-shadow),inset_0_1px_0_var(--glass-highlight)]";
/** LiquidGlass refractor behind content — use instead of `.glass` where refraction helps. */
function SiteGlassShell({ variant = "card", className, surfaceClassName, contentClassName, children, radius, scale, aberration, bevelDepth, frost, tint, ...shellRest }) {
	const preset = PRESETS[variant];
	const resolvedRadius = radius ?? preset.radius;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("site-glass-shell relative isolate", className),
		...shellRest,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiquidGlass, {
			scale: scale ?? preset.scale,
			aberration: aberration ?? preset.aberration,
			bevelDepth: bevelDepth ?? preset.bevelDepth,
			frost: frost ?? preset.frost,
			tint: tint ?? preset.tint,
			radius: resolvedRadius,
			"aria-hidden": true,
			className: cn(surfaceStyles, variant === "nav" && "rounded-[inherit]", surfaceClassName)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("relative z-[1]", contentClassName),
			children
		})]
	});
}
var images = {
	dumbbells: "/assets/p-dumbbells-D0LafSYU.jpg",
	kettlebell: "/assets/p-kettlebell-Bo_mp1uI.jpg",
	bands: "/assets/p-bands-CmGVEs83.jpg",
	mat: "/assets/p-mat-BiTHbTle.jpg",
	rope: "/assets/p-rope-DFuEwkx9.jpg",
	roller: "/assets/p-roller-CqkXcsa3.jpg"
};
function ProductCard({ p }) {
	const { add } = useCart();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		...tiltHandlers(7),
		className: "tilt shop-product-card relative overflow-hidden rounded-xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteGlassShell, {
			variant: "card",
			radius: 14,
			className: "size-full",
			contentClassName: "flex h-full flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: images[p.image],
				alt: p.name,
				loading: "lazy",
				width: 816,
				height: 816,
				className: "shop-product-media relative z-[2] aspect-square w-full object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shop-product-body relative z-[2] flex flex-1 items-end justify-between gap-4 p-5 sm:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-bold",
						children: p.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: p.detail
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xl font-bold",
						children: money(p.price)
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-primary btn-icon shrink-0",
					onClick: () => add(p.id),
					"aria-label": `Add ${p.name} to cart`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-5" })
				})]
			})]
		})
	});
}
function Shop() {
	const ref = useReveal();
	const categories = (0, import_react.useMemo)(() => ["All", ...new Set(products_default.map((p) => p.category))], []);
	const [cat, setCat] = (0, import_react.useState)("All");
	const shown = cat === "All" ? products_default : products_default.filter((p) => p.category === cat);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "shop",
		className: "shop-section section scroll-mt-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref,
			className: "reveal container-x",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggeredText, {
					text: "Gear that earns its place.",
					as: "h2",
					className: "h2 max-w-xl",
					segmentBy: "words",
					direction: "top",
					delay: 55
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					role: "group",
					"aria-label": "Filter by category",
					className: "flex flex-wrap gap-2",
					children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setCat(c),
						"aria-pressed": cat === c,
						className: `shop-filter ${cat === c ? "is-active" : ""}`,
						children: c
					}, c))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: shown.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, p.id))
			})]
		})
	});
}
var icons = [
	TrendingUp,
	Dumbbell,
	UserCheck
];
function Why() {
	const ref = useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "why",
		className: "section scroll-mt-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref,
			className: "reveal container-x",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggeredText, {
				text: "Why JODLEM",
				as: "h2",
				className: "why-section-title h2",
				segmentBy: "words",
				direction: "top",
				delay: 55
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-10 sm:mt-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3",
				children: site_default.why.map((b, i) => {
					const Icon = icons[i % icons.length] ?? TrendingUp;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-14 place-items-center rounded-lg bg-accent text-accent-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-6",
								"aria-hidden": "true"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-6 text-[length:var(--text-h3)]",
							children: b.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-muted-foreground",
							children: b.body
						})
					] }, b.title);
				})
			})]
		})
	});
}
function Testimonials() {
	const ref = useReveal();
	const items = site_default.testimonials;
	const [i, setI] = (0, import_react.useState)(0);
	const [paused, setPaused] = (0, import_react.useState)(false);
	const go = (d) => setI((n) => (n + d + items.length) % items.length);
	(0, import_react.useEffect)(() => {
		if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const t = setInterval(() => go(1), 7e3);
		return () => clearInterval(t);
	}, [paused, i]);
	const t = items[i];
	if (!t) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "section section-surface",
		"aria-roledescription": "carousel",
		"aria-label": "What members say",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref,
			className: "reveal container-x",
			onMouseEnter: () => setPaused(true),
			onMouseLeave: () => setPaused(false),
			onFocus: () => setPaused(true),
			onBlur: () => setPaused(false),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggeredText, {
					text: "What members say",
					as: "h2",
					className: "h2 mb-10 max-w-xl",
					segmentBy: "words",
					direction: "top",
					delay: 50
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteGlassShell, {
					variant: "card",
					radius: 20,
					className: "max-w-4xl animate-in fade-in slide-in-from-bottom-4 rounded-2xl duration-500",
					contentClassName: "p-6 sm:p-10",
					"aria-live": "polite",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
						className: "text-[length:clamp(1.6rem,3.6vw,3rem)] font-bold leading-tight",
						children: [
							"\"",
							t.quote,
							"\""
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
						className: "mt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold",
							children: t.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [" · ", t.role]
						})]
					})] })
				}, i),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn btn-on-surface btn-icon",
							onClick: () => go(-1),
							"aria-label": "Previous testimonial",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn btn-on-surface btn-icon",
							onClick: () => go(1),
							"aria-label": "Next testimonial",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-3 text-muted-foreground",
							"aria-hidden": "true",
							children: [
								i + 1,
								" / ",
								items.length
							]
						})
					]
				})
			]
		})
	});
}
var contactSchema = objectType({
	name: stringType().trim().min(1, "Please enter your name").max(100, "Keep it under 100 characters"),
	email: stringType().trim().email("Enter a valid email").max(255),
	message: stringType().trim().min(10, "Tell us a little more (10+ characters)").max(1e3, "Keep it under 1000 characters")
});
function Contact() {
	const ref = useReveal();
	const [errors, setErrors] = (0, import_react.useState)({});
	const [status, setStatus] = (0, import_react.useState)("idle");
	async function onSubmit(e) {
		e.preventDefault();
		const form = e.currentTarget;
		const parsed = contactSchema.safeParse(Object.fromEntries(new FormData(form)));
		if (!parsed.success) {
			const errs = {};
			for (const issue of parsed.error.issues) errs[issue.path[0]] ??= issue.message;
			setErrors(errs);
			return;
		}
		setErrors({});
		setStatus("sending");
		const { error } = await supabase.from("contact_submissions").insert(parsed.data);
		if (error) {
			setStatus("error");
			return;
		}
		form.reset();
		setStatus("sent");
	}
	const field = (name, label, el, type = "text") => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			htmlFor: name,
			className: "mb-2 block font-medium",
			children: label
		}),
		el === "input" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			id: name,
			name,
			type,
			className: "field",
			"aria-invalid": !!errors[name],
			"aria-describedby": `${name}-err`
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			id: name,
			name,
			rows: 5,
			className: "field resize-y",
			"aria-invalid": !!errors[name],
			"aria-describedby": `${name}-err`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			id: `${name}-err`,
			className: "mt-2 min-h-5 text-sm text-destructive",
			children: errors[name]
		})
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "contact",
		className: "section scroll-mt-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref,
			className: "reveal container-x grid gap-14 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggeredText, {
					text: site_default.cta.title,
					as: "h2",
					className: "h2",
					segmentBy: "words",
					direction: "top",
					delay: 55
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-md text-muted-foreground",
					children: site_default.cta.body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#packages",
					className: "btn btn-primary mt-8",
					children: "See plans"
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteGlassShell, {
				variant: "card",
				className: "rounded-xl",
				contentClassName: "p-6 md:p-10",
				children: status === "sent" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					role: "status",
					className: "flex min-h-80 flex-col justify-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-3xl",
							children: "Message received."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-muted-foreground",
							children: "A coach will reply to your email within one working day."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn btn-on-surface mt-8 self-start",
							onClick: () => setStatus("idle"),
							children: "Send another"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					noValidate: true,
					className: "grid gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-4 text-[length:var(--text-h3)]",
							children: "Questions? Ask a coach."
						}),
						field("name", "Name", "input"),
						field("email", "Email", "input", "email"),
						field("message", "Message", "textarea"),
						status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-destructive",
							role: "alert",
							children: "Something went wrong. Please try again."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "btn btn-primary mt-2",
							disabled: status === "sending",
							children: status === "sending" ? "Sending..." : "Send message"
						})
					]
				})
			})]
		})
	});
}
var emailSchema = stringType().trim().email().max(255);
function Footer() {
	const [state, setState] = (0, import_react.useState)("idle");
	async function onSubmit(e) {
		e.preventDefault();
		const form = e.currentTarget;
		const parsed = emailSchema.safeParse(new FormData(form).get("email"));
		if (!parsed.success) {
			setState("invalid");
			return;
		}
		setState("sending");
		const { error } = await supabase.from("newsletter_signups").insert({ email: parsed.data.toLowerCase() });
		if (error && error.code !== "23505") {
			setState("error");
			return;
		}
		form.reset();
		setState("done");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "footer-root section-surface pb-0 pt-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-x pb-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-12 md:grid-cols-2 md:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggeredText, {
						text: "One email a week. Training tips and new gear.",
						as: "h2",
						className: "text-3xl font-extrabold",
						segmentBy: "words",
						direction: "top",
						delay: 45
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteGlassShell, {
						variant: "card",
						className: "mt-6 max-w-md rounded-xl",
						contentClassName: "flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:p-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit,
							noValidate: true,
							className: "contents",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "nl-email",
									className: "sr-only",
									children: "Email address"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "nl-email",
									name: "email",
									type: "email",
									placeholder: "you@email.com",
									className: "field min-w-0 flex-1"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn btn-primary shrink-0",
									disabled: state === "sending",
									children: state === "sending" ? "Joining..." : "Subscribe"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 min-h-6 text-sm",
						role: "status",
						children: [
							state === "done" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-accent",
								children: "You're on the list."
							}),
							state === "invalid" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-destructive",
								children: "Enter a valid email address."
							}),
							state === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-destructive",
								children: "Couldn't subscribe. Try again."
							})
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					"aria-label": "Footer",
					className: "flex flex-wrap gap-x-8 gap-y-3 md:justify-end",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#packages",
							className: "hover:text-accent",
							children: "Packages"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#shop",
							className: "hover:text-accent",
							children: "Shop"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#why",
							className: "hover:text-accent",
							children: "Why JODLEM"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#contact",
							className: "hover:text-accent",
							children: "Contact"
						})
					]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "footer-brand-band",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("picture", {
					className: "footer-brand-band__photo",
					"aria-hidden": "true",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
						type: "image/webp",
						srcSet: "/bg/footer-fists-640.webp 640w, /bg/footer-fists-768.webp 768w, /bg/footer-fists-1200.webp 1200w, /bg/footer-fists-1920.webp 1920w, /bg/footer-fists-2560.webp 2560w",
						sizes: "100vw"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/bg/footer-fists-1920.webp",
						alt: "",
						width: 1920,
						height: 1280,
						decoding: "async"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "footer-brand-band__scrim",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-x footer-brand-band__content",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "display select-none text-center text-[clamp(5rem,22vw,22rem)] text-background",
						"aria-hidden": "true",
						children: "JODLEM"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 pb-10 text-sm text-muted-foreground",
						children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" JODLEM Fitness"
						]
					})]
				})
			]
		})]
	});
}
function CartDrawer() {
	const { open, setOpen, lines, total, update } = useCart();
	const panel = (0, import_react.useRef)(null);
	const [note, setNote] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!open) {
			setNote(false);
			return;
		}
		const prev = document.activeElement;
		document.body.style.overflow = "hidden";
		panel.current?.querySelector("button")?.focus();
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(false);
			if (e.key === "Tab" && panel.current) {
				const f = panel.current.querySelectorAll("button:not([disabled]), a");
				if (!f.length) return;
				const first = f[0], last = f[f.length - 1];
				if (!first || !last) return;
				if (e.shiftKey && document.activeElement === first) {
					e.preventDefault();
					last.focus();
				} else if (!e.shiftKey && document.activeElement === last) {
					e.preventDefault();
					first.focus();
				}
			}
		};
		window.addEventListener("keydown", onKey);
		return () => {
			window.removeEventListener("keydown", onKey);
			document.body.style.overflow = "";
			prev?.focus();
		};
	}, [open, setOpen]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "glass-overlay absolute inset-0 h-full w-full cursor-default",
			"aria-label": "Close cart",
			tabIndex: -1,
			onClick: () => setOpen(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: panel,
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Your cart",
			className: "safe-bottom absolute inset-y-0 right-0 w-full max-w-[min(100%,28rem)] animate-in slide-in-from-right duration-300",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteGlassShell, {
				variant: "strong",
				className: "size-full",
				contentClassName: "flex h-full flex-col p-6 md:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-extrabold",
						children: "Your cart"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn btn-on-surface btn-icon",
						onClick: () => setOpen(false),
						"aria-label": "Close cart",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					})]
				}), lines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-col items-start justify-center gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "Your cart is empty."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#shop",
						className: "btn btn-primary",
						onClick: () => setOpen(false),
						children: "Browse gear"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-8 flex flex-1 flex-col gap-3 overflow-y-auto",
					children: lines.map((l) => {
						const item = catalog[l.id];
						if (!item) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteGlassShell, {
							variant: "card",
							radius: 12,
							className: "rounded-lg",
							contentClassName: "flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold",
								children: item.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: [money(item.price), item.kind === "package" ? " / month" : ""]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "btn btn-secondary btn-icon size-9 min-h-9",
										onClick: () => update(l.id, l.qty - 1),
										"aria-label": `Remove one ${item.name}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-6 text-center font-bold",
										"aria-label": "Quantity",
										children: l.qty
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "btn btn-secondary btn-icon size-9 min-h-9",
										onClick: () => update(l.id, l.qty + 1),
										disabled: item.kind === "package",
										"aria-label": `Add one ${item.name}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
									})
								]
							})]
						}) }, l.id);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-lg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold",
								children: money(total)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn btn-primary mt-5 w-full",
							onClick: () => setNote(true),
							children: "Checkout"
						}),
						note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							role: "status",
							children: "Online checkout opens soon. Use the contact form to order now."
						})
					]
				})] })]
			})
		})]
	});
}
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CartProvider, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "#packages",
			className: "btn btn-primary sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50",
			children: "Skip to content"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "site-content-bg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Packages, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shop, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "site-discipline-stack",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Why, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contact, {})
					]
				})
			]
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "site-content-bg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartDrawer, {})
	] });
}
//#endregion
export { Index as component };
