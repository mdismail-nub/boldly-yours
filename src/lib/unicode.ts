/**
 * Unicode text conversion engine.
 *
 * Every style is a pure function from string -> string. Styles are registered
 * in the `STYLES` array so new ones can be added by appending an entry.
 * Conversion runs fully client-side; no network access is needed.
 */

export type StyleCategory =
  | "bold"
  | "italic"
  | "sans"
  | "mono"
  | "decorative"
  | "shapes"
  | "small"
  | "lines";

export interface TextStyle {
  id: string;
  name: string;
  category: StyleCategory;
  description: string;
  convert: (input: string) => string;
}

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";

type RangeSpec = {
  upper?: number;
  lower?: number;
  digits?: number;
  /** Explicit overrides for characters that live outside the contiguous block. */
  overrides?: Record<string, string>;
  /** When lowercase has no glyphs, fall back to uppercase glyphs. */
  lowerAsUpper?: boolean;
};

function buildMap(spec: RangeSpec): Record<string, string> {
  const map: Record<string, string> = {};
  if (spec.upper !== undefined) {
    for (let i = 0; i < 26; i++) map[UPPER[i]] = String.fromCodePoint(spec.upper + i);
  }
  if (spec.lower !== undefined) {
    for (let i = 0; i < 26; i++) map[LOWER[i]] = String.fromCodePoint(spec.lower + i);
  } else if (spec.lowerAsUpper && spec.upper !== undefined) {
    for (let i = 0; i < 26; i++) map[LOWER[i]] = String.fromCodePoint(spec.upper + i);
  }
  if (spec.digits !== undefined) {
    for (let i = 0; i < 10; i++) map[DIGITS[i]] = String.fromCodePoint(spec.digits + i);
  }
  if (spec.overrides) Object.assign(map, spec.overrides);
  return map;
}

function mapper(map: Record<string, string>) {
  return (input: string) => {
    let out = "";
    for (const ch of input) out += map[ch] ?? ch;
    return out;
  };
}

function combining(mark: string) {
  return (input: string) => {
    let out = "";
    for (const ch of input) out += ch === " " || ch === "\n" ? ch : ch + mark;
    return out;
  };
}

function explicit(lowerGlyphs: string, upperGlyphs?: string, digitGlyphs?: string) {
  const map: Record<string, string> = {};
  const lo = Array.from(lowerGlyphs);
  const up = upperGlyphs ? Array.from(upperGlyphs) : lo;
  const dg = digitGlyphs ? Array.from(digitGlyphs) : [];
  for (let i = 0; i < 26; i++) {
    map[LOWER[i]] = lo[i];
    map[UPPER[i]] = up[i];
  }
  for (let i = 0; i < dg.length; i++) map[DIGITS[i]] = dg[i];
  return map;
}

/* ---------- Mathematical alphanumeric blocks ---------- */

const bold = buildMap({ upper: 0x1d400, lower: 0x1d41a, digits: 0x1d7ce });
const italic = buildMap({ upper: 0x1d434, lower: 0x1d44e, overrides: { h: "\u210e" } });
const boldItalic = buildMap({ upper: 0x1d468, lower: 0x1d482 });
const script = buildMap({
  upper: 0x1d49c,
  lower: 0x1d4b6,
  overrides: {
    B: "\u212c", E: "\u2130", F: "\u2131", H: "\u210b", I: "\u2110", L: "\u2112",
    M: "\u2133", R: "\u211b", e: "\u212f", g: "\u210a", o: "\u2134",
  },
});
const boldScript = buildMap({ upper: 0x1d4d0, lower: 0x1d4ea });
const fraktur = buildMap({
  upper: 0x1d504,
  lower: 0x1d51e,
  overrides: { C: "\u212d", H: "\u210c", I: "\u2111", R: "\u211c", Z: "\u2128" },
});
const doubleStruck = buildMap({
  upper: 0x1d538,
  lower: 0x1d552,
  digits: 0x1d7d8,
  overrides: { C: "\u2102", H: "\u210d", N: "\u2115", P: "\u2119", Q: "\u211a", R: "\u211d", Z: "\u2124" },
});
const boldFraktur = buildMap({ upper: 0x1d56c, lower: 0x1d586 });
const sans = buildMap({ upper: 0x1d5a0, lower: 0x1d5ba, digits: 0x1d7e2 });
const sansBold = buildMap({ upper: 0x1d5d4, lower: 0x1d5ee, digits: 0x1d7ec });
const sansItalic = buildMap({ upper: 0x1d608, lower: 0x1d622 });
const sansBoldItalic = buildMap({ upper: 0x1d63c, lower: 0x1d656 });
const mono = buildMap({ upper: 0x1d670, lower: 0x1d68a, digits: 0x1d7f6 });

/* ---------- Enclosed alphanumerics ---------- */

const circled = buildMap({
  upper: 0x24b6,
  lower: 0x24d0,
  overrides: { "0": "\u24ea", "1": "\u2460", "2": "\u2461", "3": "\u2462", "4": "\u2463", "5": "\u2464", "6": "\u2465", "7": "\u2466", "8": "\u2467", "9": "\u2468" },
});
const bubble = buildMap({ upper: 0x24b6, lowerAsUpper: true, overrides: circled });
const circledNegative = buildMap({
  upper: 0x1f150,
  lowerAsUpper: true,
  overrides: { "0": "\u24ff", "1": "\u2776", "2": "\u2777", "3": "\u2778", "4": "\u2779", "5": "\u277a", "6": "\u277b", "7": "\u277c", "8": "\u277d", "9": "\u277e" },
});
const squared = buildMap({ upper: 0x1f130, lowerAsUpper: true });
const squaredNegative = buildMap({ upper: 0x1f170, lowerAsUpper: true });
const fullwidth = buildMap({ upper: 0xff21, lower: 0xff41, digits: 0xff10, overrides: { " ": "\u3000" } });

/* ---------- Explicit maps ---------- */

const smallCaps = explicit("ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ");
const superscript = explicit(
  "ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖᵠʳˢᵗᵘᵛʷˣʸᶻ",
  "ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾQᴿˢᵀᵁⱽᵂˣʸᶻ",
  "⁰¹²³⁴⁵⁶⁷⁸⁹",
);
const subscript = explicit(
  "ₐbcdₑfgₕᵢⱼₖₗₘₙₒₚqᵣₛₜᵤᵥwₓyz",
  "ₐBCDₑFGₕᵢⱼₖₗₘₙₒₚQᵣₛₜᵤᵥWₓYZ",
  "₀₁₂₃₄₅₆₇₈₉",
);
const tiny = explicit("ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖᵠʳˢᵗᵘᵛʷˣʸᶻ", "ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾQᴿˢᵀᵁⱽᵂˣʸᶻ");

/* ---------- Registry ---------- */

export const STYLES: TextStyle[] = [
  { id: "bold", name: "Bold", category: "bold", description: "Classic serif bold from the mathematical alphabet.", convert: mapper(bold) },
  { id: "bold-sans", name: "Bold Sans", category: "bold", description: "Heavy sans-serif bold that reads cleanly on every feed.", convert: mapper(sansBold) },
  { id: "bold-italic", name: "Bold Italic", category: "bold", description: "Bold with an italic slant for expressive emphasis.", convert: mapper(boldItalic) },
  { id: "bold-sans-italic", name: "Bold Sans Italic", category: "bold", description: "Slanted sans-serif bold with a modern feel.", convert: mapper(sansBoldItalic) },
  { id: "italic", name: "Italic", category: "italic", description: "Elegant serif italic for quotes and asides.", convert: mapper(italic) },
  { id: "sans", name: "Sans", category: "sans", description: "Neutral sans-serif that stands apart from default text.", convert: mapper(sans) },
  { id: "sans-italic", name: "Sans Italic", category: "italic", description: "Light, slanted sans-serif.", convert: mapper(sansItalic) },
  { id: "monospace", name: "Monospace", category: "mono", description: "Fixed-width letters with a typewriter rhythm.", convert: mapper(mono) },
  { id: "double-struck", name: "Double Struck", category: "decorative", description: "Outlined blackboard-bold letters.", convert: mapper(doubleStruck) },
  { id: "fraktur", name: "Fraktur", category: "decorative", description: "Gothic blackletter forms.", convert: mapper(fraktur) },
  { id: "bold-fraktur", name: "Bold Fraktur", category: "decorative", description: "Heavier gothic blackletter.", convert: mapper(boldFraktur) },
  { id: "script", name: "Script", category: "decorative", description: "Flowing calligraphic script.", convert: mapper(script) },
  { id: "bold-script", name: "Bold Script", category: "decorative", description: "Calligraphic script with extra weight.", convert: mapper(boldScript) },
  { id: "circled", name: "Circled", category: "shapes", description: "Each character inside a thin circle.", convert: mapper(circled) },
  { id: "circled-negative", name: "Circled Negative", category: "shapes", description: "Inverted letters on solid circles.", convert: mapper(circledNegative) },
  { id: "squared", name: "Squared", category: "shapes", description: "Letters framed in outlined squares.", convert: mapper(squared) },
  { id: "squared-negative", name: "Squared Negative", category: "shapes", description: "Inverted letters on solid squares.", convert: mapper(squaredNegative) },
  { id: "fullwidth", name: "Fullwidth", category: "decorative", description: "Wide-set letters with generous spacing.", convert: mapper(fullwidth) },
  { id: "small-caps", name: "Small Caps", category: "small", description: "Lowercase rendered as compact capitals.", convert: mapper(smallCaps) },
  { id: "superscript", name: "Superscript", category: "small", description: "Raised, miniature letters.", convert: mapper(superscript) },
  { id: "subscript", name: "Subscript", category: "small", description: "Lowered, miniature letters.", convert: mapper(subscript) },
  { id: "underline", name: "Underline", category: "lines", description: "A continuous line beneath every character.", convert: combining("\u0332") },
  { id: "strikethrough", name: "Strikethrough", category: "lines", description: "A line through the middle of each character.", convert: combining("\u0336") },
  { id: "slash-through", name: "Slash-through", category: "lines", description: "A diagonal slash over each character.", convert: combining("\u0338") },
  { id: "bubble", name: "Bubble Text", category: "shapes", description: "Round bubble capitals for playful posts.", convert: mapper(bubble) },
  { id: "tiny", name: "Tiny Text", category: "small", description: "Miniature raised letters that fit anywhere.", convert: mapper(tiny) },
];

export function getStyle(id: string): TextStyle | undefined {
  return STYLES.find((s) => s.id === id);
}

export function convertAll(input: string): { style: TextStyle; output: string }[] {
  return STYLES.map((style) => ({ style, output: style.convert(input) }));
}
