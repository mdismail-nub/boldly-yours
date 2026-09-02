import { StyleCard } from "./StyleCard";
import type { TextStyle } from "@/lib/unicode";

interface StyleGridProps {
  styles: TextStyle[];
  text: string;
}

export function StyleGrid({ styles, text }: StyleGridProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2" role="list" aria-label="Generated text styles">
      {styles.map((style, i) => (
        <div role="listitem" key={style.id}>
          <StyleCard name={style.name} output={style.convert(text)} index={i} />
        </div>
      ))}
    </div>
  );
}
