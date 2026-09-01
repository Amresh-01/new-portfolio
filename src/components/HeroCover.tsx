import Image from 'next/image';
import { Baby, Code, Database, Cpu } from 'lucide-react';
import { AskAiAboutMe } from '@/components/AskAiAboutMe';

/**
 * HeroCover — full-bleed magazine-cover first view.
 */
export function HeroCover() {
  return (
    <section
      id="home"
      aria-labelledby="hero-cover-name"
      className="relative isolate -mt-[3.25rem] flex min-h-screen min-h-[100svh] flex-col overflow-hidden text-foreground sm:-mt-14"
      style={{
        backgroundImage: "url('/hero-cover.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'hsl(38 32% 96%)',
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[1] bg-[hsl(38_32%_96%/0.35)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[1] bg-gradient-to-br from-[hsl(15_68%_55%/0.06)] via-transparent to-[hsl(38_50%_70%/0.06)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-background"
      />

      <div className="relative mx-auto flex w-full max-w-[1200px] flex-1 flex-col px-6 pb-24 pt-[4.5rem] md:px-10 md:pb-28 md:pt-[5.25rem] lg:px-12">
        <div className="flex items-center justify-between gap-4">
          <p className="type-meta text-accent">
            <span className="inline-flex items-center gap-2 align-middle">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
              />
              <span>Full Stack Developer</span>
              <span className="text-muted-foreground/60">·</span>
              <span className="text-muted-foreground">AI Integration</span>
              <span className="text-muted-foreground/60">·</span>
              <span className="text-muted-foreground">Open Source</span>
            </span>
          </p>
          <p className="type-meta hidden text-muted-foreground sm:block">
            India · IST · 2026
          </p>
        </div>

        <div className="mt-12 grid flex-1 grid-cols-1 items-center gap-12 md:mt-16 lg:mt-0 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="order-2 min-w-0 lg:order-1">
            <p className="type-meta text-accent">
              <span className="inline-flex items-center gap-2 align-middle">
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
                />
                <span className="text-muted-foreground">About me</span>
              </span>
            </p>

            <h1
              id="hero-cover-name"
              className="font-display mt-4 max-w-[14ch] text-balance text-[3rem] font-extrabold leading-[0.94] text-foreground sm:text-[3.75rem] lg:text-[5rem]"
              style={{
                letterSpacing: '-0.04em',
                fontVariationSettings: "'opsz' 144, 'SOFT' 30",
              }}
            >
              hey, I&apos;m{' '}
              <span
                className="font-light italic text-foreground"
                style={{
                  fontVariationSettings: "'opsz' 144, 'SOFT' 100",
                }}
              >
                Amresh
              </span>{' '}
              <span
                aria-hidden
                className="font-light not-italic text-foreground/85"
              >
                👋
              </span>
            </h1>

            <div className="mt-7 max-w-[42rem] border-l-2 border-accent pl-5 md:mt-8 md:pl-6">
              <ul className="space-y-3.5 text-[1.125rem] leading-[1.45] text-foreground/90 sm:space-y-4 sm:text-[1.25rem] sm:leading-[1.5] md:text-[1.35rem] md:leading-[1.45]">
                <li className="flex gap-3.5">
                  <span
                    aria-hidden
                    className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span className="text-pretty">
                    AI Native Full Stack Developer at{' '}
                    <span className="font-medium text-foreground decoration-accent decoration-2 underline-offset-[6px]">
                      Valoron Consulting
                    </span>
                  </span>
                </li>
                <li className="flex gap-3.5">
                  <span
                    aria-hidden
                    className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span className="min-w-0 text-pretty">
                    <span className="font-mono text-[0.95em] tabular-nums text-foreground">
                      1
                    </span>{' '}
                    years across contract engineering and open source.
                  </span>
                </li>
                <li className="flex gap-3.5">
                  <span
                    aria-hidden
                    className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span className="min-w-0 text-pretty">
                    More than{' '}
                    <span className="font-mono text-[0.95em] tabular-nums text-foreground">
                      30+
                    </span>{' '}
                    merged pull requests at{' '}
                    <span className="font-mono text-[0.95em] tabular-nums text-foreground">
                      5
                    </span>{' '}
                    organizations.
                  </span>
                </li>
              </ul>
            </div>

            <AskAiAboutMe className="mt-9 max-w-[34rem]" />

            <p className="type-meta mt-16 text-muted-foreground sm:mt-20 lg:mt-24">
              <span aria-hidden className="text-accent">
                ↓
              </span>
              &nbsp;&nbsp;Scroll for the rest
            </p>
          </div>

          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <div className="relative aspect-[4/5] w-[14rem] overflow-hidden rounded-2xl ring-1 ring-foreground/10 sm:w-[16rem] md:w-[18rem] lg:w-[22rem] xl:w-[24rem]">
              {/* Note: Update the avatar.jpg image later if Amresh has one */}
              <Image
                src="/avatar.jpg"
                alt="Portrait of Amresh"
                fill
                priority
                sizes="(max-width: 640px) 14rem, (max-width: 1024px) 18rem, (max-width: 1280px) 22rem, 24rem"
                className="object-cover object-[center_28%]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                style={{
                  background:
                    'radial-gradient(ellipse 80% 60% at 80% 10%, hsl(28 90% 55% / 0.30), transparent 65%)',
                }}
              />
              <span
                aria-hidden
                className="type-meta pointer-events-none absolute bottom-3 left-3 rounded bg-background/75 px-2 py-0.5 text-foreground/75"
              >
                India · IST
              </span>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-10">
          <div className="border-t border-foreground/15 pt-4">
            <ul className="type-meta grid grid-cols-2 gap-y-3 text-muted-foreground lg:grid-cols-4 lg:gap-0">
              <li className="flex items-baseline gap-2 lg:justify-start">
                <Code
                  aria-hidden
                  className="h-3 w-3 shrink-0 text-accent"
                  strokeWidth={1.5}
                />
                <span className="text-foreground normal-case">
                  Frontend
                </span>
              </li>
              <li className="flex items-baseline gap-2 lg:justify-center">
                <Database aria-hidden className="h-3 w-3 shrink-0 text-accent" strokeWidth={1.5} />
                <span>Backend Architecture</span>
              </li>
              <li className="flex items-baseline gap-2 lg:justify-center">
                <Cpu aria-hidden className="h-3 w-3 shrink-0 text-accent" strokeWidth={1.5} />
                <span>AI Infrastructure</span>
              </li>
              <li className="flex items-baseline gap-2 lg:justify-end">
                <span aria-hidden className="text-accent">
                  ◎
                </span>
                <span className="tabular-nums text-foreground">Next.js / Python</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
