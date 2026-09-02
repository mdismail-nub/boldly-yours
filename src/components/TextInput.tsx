import { useId } from "react";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function TextInput({ value, onChange }: TextInputProps) {
  const id = useId();
  const count = Array.from(value).length;

  return (
    <div className="rounded-3xl border border-border bg-surface/60 transition-colors focus-within:border-foreground/30 dark:bg-surface">
      <label htmlFor={id} className="sr-only">
        Text to convert
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type or paste your text here..."
        rows={4}
        autoComplete="off"
        spellCheck={false}
        className="block w-full resize-none bg-transparent px-5 pt-5 pb-2 text-lg leading-relaxed outline-none placeholder:text-muted-foreground/70 sm:px-6 sm:pt-6 sm:text-xl"
      />
      <div className="flex items-center justify-between px-5 pb-4 sm:px-6">
        <span className="text-xs font-medium text-muted-foreground tabular-nums" aria-live="polite">
          {count} {count === 1 ? "character" : "characters"}
        </span>
        <button
          type="button"
          onClick={() => onChange("")}
          disabled={!value}
          className="rounded-full px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
