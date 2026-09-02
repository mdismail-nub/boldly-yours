import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface StyleCardProps {
  name: string;
  output: string;
  index?: number;
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
}

export function StyleCard({ name, output, index = 0 }: StyleCardProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  const onCopy = useCallback(async () => {
    try {
      await copyText(output);
      setCopied(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked */
    }
  }, [output]);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  return (
    <article
      className="hover-lift group flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft animate-rise"
      style={{ animationDelay: `${Math.min(index, 12) * 40}ms` }}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{name}</h3>
        <button
          type="button"
          onClick={onCopy}
          aria-label={`Copy ${name} text`}
          className={cn(
            "inline-flex h-9 min-w-[5.25rem] items-center justify-center gap-1.5 rounded-full border px-3.5 text-xs font-semibold transition-all duration-300 active:scale-95",
            copied
              ? "animate-pop border-success bg-success text-success-foreground"
              : "border-border bg-background text-foreground hover:border-foreground hover:bg-primary hover:text-primary-foreground",
          )}
        >
          {copied ? <Check className="size-3.5" strokeWidth={3} /> : <Copy className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p
        className="min-h-[2rem] text-xl leading-snug break-words [overflow-wrap:anywhere] sm:text-2xl"
        lang="und"
      >
        {output}
      </p>
    </article>
  );
}
