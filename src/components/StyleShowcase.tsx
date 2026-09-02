import { Reveal } from "./Reveal";
import { getStyle } from "@/lib/unicode";

const FEATURED = [
  { id: "bold-sans", word: "Louder", note: "For headlines and bios" },
  { id: "script", word: "Softer", note: "For captions with charm" },
  { id: "double-struck", word: "Sharper", note: "For technical flair" },
  { id: "fraktur", word: "Darker", note: "For moody statements" },
  { id: "monospace", word: "Cleaner", note: "For code and lists" },
  { id: "circled", word: "Playful", note: "For light-hearted posts" },
  { id: "small-caps", word: "Quieter", note: "For elegant sign-offs" },
  { id: "fullwidth", word: "Wider", note: "For spacious aesthetics" },
];

export function StyleShowcase() {
  return (
    <section id="styles" className="scroll-mt-28 border-t border-border py-24 sm:py-32">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Text styles</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            Find your <span className="display-serif">style.</span>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            From clean and professional to bold and expressive, turn ordinary text into
            something worth noticing.
          </p>
        </Reveal>
      </div>

      <Reveal delay={100} className="mt-12">
        <div className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-[max(2.5rem,calc((100vw-76rem)/2+2.5rem))]">
          {FEATURED.map((item) => {
            const style = getStyle(item.id)!;
            return (
              <a
                key={item.id}
                href="#generator"
                className="hover-lift flex aspect-[4/5] w-[72vw] shrink-0 snap-start flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-soft sm:w-72"
              >
                <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  {style.name}
                </span>
                <span className="text-[2.75rem] leading-none tracking-tight break-words sm:text-5xl">
                  {style.convert(item.word)}
                </span>
                <span className="text-sm text-muted-foreground">{item.note}</span>
              </a>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
