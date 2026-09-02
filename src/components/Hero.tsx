interface HeroProps {
  eyebrow?: string;
  titleTop: string;
  titleSerif: string;
  description: string;
}

export function Hero({
  eyebrow = "Free online text tool",
  titleTop,
  titleSerif,
  description,
}: HeroProps) {
  return (
    <section className="grain relative pt-36 pb-12 sm:pt-44 sm:pb-16 lg:pt-52">
      <div className="container-page relative text-center">
        <p className="eyebrow animate-rise" style={{ animationDelay: "60ms" }}>
          {eyebrow}
        </p>
        <h1
          className="mx-auto mt-6 max-w-4xl text-[2.75rem] leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl md:text-7xl lg:text-[5.5rem] animate-rise"
          style={{ animationDelay: "160ms" }}
        >
          {titleTop}
          <br />
          <span className="display-serif">{titleSerif}</span>
        </h1>
        <p
          className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg animate-rise"
          style={{ animationDelay: "280ms" }}
        >
          {description}
        </p>
        <p
          className="mt-8 text-xs font-medium tracking-wide text-muted-foreground animate-rise"
          style={{ animationDelay: "380ms" }}
        >
          No signup <span className="mx-2 opacity-50">·</span> No downloads{" "}
          <span className="mx-2 opacity-50">·</span> Works everywhere
        </p>
      </div>
    </section>
  );
}
