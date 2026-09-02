import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

const Icon = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
    {children}
  </svg>
);

const PLATFORMS: { name: string; use: string; icon: ReactNode }[] = [
  {
    name: "Instagram",
    use: "Bios, captions, comments",
    icon: (
      <Icon>
        <path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5.9-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM12 2c-2.7 0-3 0-4.1.1-1.1 0-1.8.2-2.4.5a5 5 0 0 0-1.8 1.1A5 5 0 0 0 2.6 5.5c-.3.6-.4 1.4-.5 2.4C2 9 2 9.3 2 12s0 3 .1 4.1c0 1.1.2 1.8.5 2.4a5 5 0 0 0 1.1 1.8 5 5 0 0 0 1.8 1.1c.6.3 1.4.4 2.4.5H12c2.7 0 3 0 4.1-.1 1.1 0 1.8-.2 2.4-.5a5 5 0 0 0 1.8-1.1 5 5 0 0 0 1.1-1.8c.3-.6.4-1.4.5-2.4.1-1.1.1-1.4.1-4.1s0-3-.1-4.1c0-1.1-.2-1.8-.5-2.4a5 5 0 0 0-1.1-1.8 5 5 0 0 0-1.8-1.1c-.6-.3-1.4-.4-2.4-.5C15 2 14.7 2 12 2Zm0 1.8c2.7 0 3 0 4 .1 1 0 1.5.2 1.9.3.5.2.8.4 1.1.8.4.3.6.7.8 1.1.1.4.3.9.3 1.9.1 1 .1 1.3.1 4s0 3-.1 4c0 1-.2 1.5-.3 1.9-.2.5-.4.8-.8 1.1-.3.4-.7.6-1.1.8-.4.1-.9.3-1.9.3-1 .1-1.3.1-4 .1s-3 0-4-.1c-1 0-1.5-.2-1.9-.3a3 3 0 0 1-1.1-.8 3 3 0 0 1-.8-1.1c-.1-.4-.3-.9-.3-1.9-.1-1-.1-1.3-.1-4s0-3 .1-4c0-1 .2-1.5.3-1.9.2-.5.4-.8.8-1.1.3-.4.7-.6 1.1-.8.4-.1.9-.3 1.9-.3 1-.1 1.3-.1 4-.1Z" />
      </Icon>
    ),
  },
  {
    name: "Facebook",
    use: "Posts, groups, pages",
    icon: (
      <Icon>
        <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.5 2.9h-2.3v7A10 10 0 0 0 22 12Z" />
      </Icon>
    ),
  },
  {
    name: "WhatsApp",
    use: "Status, group names, chats",
    icon: (
      <Icon>
        <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5.3-.5v-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4ZM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8Zm8.4-18.2A11.8 11.8 0 0 0 1.5 17.8L0 24l6.3-1.7a11.8 11.8 0 0 0 5.7 1.4A11.8 11.8 0 0 0 20.4 3.6Z" />
      </Icon>
    ),
  },
  {
    name: "Discord",
    use: "Usernames, channels, messages",
    icon: (
      <Icon>
        <path d="M19.3 5.3A17 17 0 0 0 15 4l-.2.4a15.7 15.7 0 0 1 3.9 2 14.2 14.2 0 0 0-13.4 0 15.7 15.7 0 0 1 3.9-2L9 4a17 17 0 0 0-4.3 1.3C2 9.4 1.3 13.4 1.6 17.3A17.2 17.2 0 0 0 6.9 20l1.1-1.8a11 11 0 0 1-1.8-.8l.4-.3a12.2 12.2 0 0 0 10.8 0l.4.3-1.8.8 1.1 1.8a17.1 17.1 0 0 0 5.3-2.7c.4-4.5-.7-8.5-3.1-12ZM8.7 15c-1 0-1.9-1-1.9-2.2s.8-2.2 1.9-2.2 1.9 1 1.9 2.2S9.7 15 8.7 15Zm6.6 0c-1 0-1.9-1-1.9-2.2s.8-2.2 1.9-2.2 1.9 1 1.9 2.2-.8 2.2-1.9 2.2Z" />
      </Icon>
    ),
  },
  {
    name: "X",
    use: "Posts, display names, bios",
    icon: (
      <Icon>
        <path d="M18.2 2h3.4l-7.4 8.5L23 22h-6.8l-5.3-7-6.1 7H1.4l7.9-9L1 2h7l4.8 6.4L18.2 2Zm-1.2 18h1.9L7.1 3.9H5.1L17 20Z" />
      </Icon>
    ),
  },
  {
    name: "YouTube",
    use: "Titles, descriptions, comments",
    icon: (
      <Icon>
        <path d="M23.5 6.5a3 3 0 0 0-2.1-2.1C19.5 4 12 4 12 4s-7.5 0-9.4.5A3 3 0 0 0 .5 6.5C0 8.4 0 12 0 12s0 3.6.5 5.5a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.5.5-5.5s0-3.6-.5-5.5ZM9.6 15.4V8.6l6.2 3.4-6.2 3.4Z" />
      </Icon>
    ),
  },
  {
    name: "Reddit",
    use: "Titles, flair, comments",
    icon: (
      <Icon>
        <path d="M24 11.8a2.6 2.6 0 0 0-4.5-1.8 12.9 12.9 0 0 0-6.9-2.2l1.2-5.5 3.8.8a1.9 1.9 0 1 0 .2-.9l-4.3-.9a.5.5 0 0 0-.5.3L11.6 7.8a13 13 0 0 0-7 2.2 2.6 2.6 0 1 0-2.9 4.3v.8c0 4 4.6 7.2 10.3 7.2s10.3-3.2 10.3-7.2v-.8a2.6 2.6 0 0 0 1.7-2.5ZM6 13.6a1.9 1.9 0 1 1 3.7 0 1.9 1.9 0 0 1-3.7 0Zm10.4 4.9c-1.3 1.3-3.7 1.4-4.4 1.4s-3.1-.1-4.4-1.4a.5.5 0 0 1 .7-.7c.8.8 2.5 1.1 3.7 1.1s2.9-.3 3.7-1.1a.5.5 0 0 1 .7.7Zm-.3-3a1.9 1.9 0 1 1 0-3.7 1.9 1.9 0 0 1 0 3.7Z" />
      </Icon>
    ),
  },
  {
    name: "LinkedIn",
    use: "Headlines, posts, about",
    icon: (
      <Icon>
        <path d="M20.4 20.5h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6a3.7 3.7 0 0 1 3.4-1.9c3.6 0 4.3 2.4 4.3 5.5v6.3ZM5.3 7.4a2.1 2.1 0 1 1 0-4.1 2.1 2.1 0 0 1 0 4.1ZM7.1 20.5H3.6V9h3.5v11.5ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0Z" />
      </Icon>
    ),
  },
];

export function PlatformSection() {
  return (
    <section className="border-t border-border py-24 sm:py-32">
      <div className="container-page">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Works everywhere</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl">
              Made for the places you{" "}
              <span className="display-serif">already use.</span>
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg lg:col-span-4 lg:col-start-9">
            Unicode travels with your text, so styles survive wherever plain text is accepted.
            Copy once. Paste anywhere.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {PLATFORMS.map((p, i) => (
            <Reveal key={p.name} delay={(i % 4) * 60}>
              <div className="hover-lift flex h-full flex-col justify-between gap-8 rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
                <span className="flex size-10 items-center justify-center rounded-xl bg-surface text-foreground dark:bg-accent">
                  {p.icon}
                </span>
                <div>
                  <h3 className="text-base font-semibold tracking-tight">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.use}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
