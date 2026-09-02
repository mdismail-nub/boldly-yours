import { useDeferredValue, useState } from "react";
import { TextInput } from "./TextInput";
import { StyleGrid } from "./StyleGrid";
import { STYLES, type TextStyle } from "@/lib/unicode";

interface TextGeneratorProps {
  title?: string;
  styles?: TextStyle[];
  defaultText?: string;
}

const SAMPLE = "Hello World";

export function TextGenerator({
  title = "Type something. Make it stand out.",
  styles = STYLES,
  defaultText = "",
}: TextGeneratorProps) {
  const [text, setText] = useState(defaultText);
  const deferred = useDeferredValue(text);
  const preview = deferred.trim() ? deferred : SAMPLE;
  const isSample = !deferred.trim();

  return (
    <section id="generator" className="scroll-mt-28 pb-24 sm:pb-32">
      <div className="container-page">
        <div className="animate-rise rounded-[2rem] border border-border bg-card p-4 shadow-card sm:p-8 lg:p-10" style={{ animationDelay: "420ms" }}>
          <div className="mb-5 flex flex-col gap-1 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
            <p className="text-xs text-muted-foreground">
              {styles.length} styles · updates as you type
            </p>
          </div>

          <TextInput value={text} onChange={setText} />

          <div className="mt-8 flex items-center gap-4 sm:mt-10">
            <span className="eyebrow whitespace-nowrap">
              {isSample ? "Preview" : "Your styles"}
            </span>
            <span className="hairline w-full" aria-hidden />
          </div>

          <div className="mt-5">
            <StyleGrid styles={styles} text={preview} />
          </div>
        </div>
      </div>
    </section>
  );
}
