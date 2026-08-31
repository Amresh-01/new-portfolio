'use client';

import Image from 'next/image';

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const TECH_ICONS = {
  typescript: `${DEVICON}/typescript/typescript-original.svg`,
  nextjs: `${DEVICON}/nextjs/nextjs-original.svg`,
  python: `${DEVICON}/python/python-original.svg`,
  postgres: `${DEVICON}/postgresql/postgresql-original.svg`,
} as const;

function TechMention({
  name,
  iconSrc,
  invert = false,
}: {
  name: string;
  iconSrc: string;
  invert?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-1 align-baseline font-medium text-foreground">
      <Image
        src={iconSrc}
        alt=""
        width={18}
        height={18}
        className={`h-[1.05em] w-[1.05em] shrink-0 ${invert ? 'invert' : ''}`}
        aria-hidden
      />
      <span>{name}</span>
    </span>
  );
}

const PROOF_POINTS: { idx: string; body: React.ReactNode }[] = [
  {
    idx: '01',
    body: (
      <>
        Currently engineering{' '}
        <span className="font-medium text-foreground">Fanito</span>, an AI-powered social platform, utilizing{' '}
        <span className="font-mono tabular-nums text-foreground">Supabase</span> and PostgreSQL for high-scale data workflows.
      </>
    ),
  },
  {
    idx: '02',
    body: (
      <>
        Architected and built{' '}
        <span className="font-medium text-foreground">AgentOS</span>, a self-hosted AI agent operating system for orchestrating autonomous workflows using a Planner/Supervisor architecture.
      </>
    ),
  },
  {
    idx: '03',
    body: (
      <>
        Built robust observability platforms like{' '}
        <span className="font-medium text-foreground">LoadForge</span> and{' '}
        <span className="font-medium text-foreground">PulseWatch</span>, mastering distributed job processing and state machines.
      </>
    ),
  },
  {
    idx: '04',
    body: (
      <>
        Contributed to open source projects including{' '}
        <span className="font-medium text-foreground">Robocurve</span>,{' '}
        <span className="font-medium text-foreground">InsForge</span>, and{' '}
        <span className="font-medium text-foreground">API Dash</span>, ensuring stability and performance.
      </>
    ),
  },
];

export const About = () => {
  return (
    <section
      className="mb-16 md:mb-20 section-rise"
      aria-labelledby="about-heading"
    >
      <div className="mb-10 flex items-baseline gap-4">
        <span className="type-numeral shrink-0 text-[1.6rem] text-accent">
          01
        </span>
        <h2
          id="about-heading"
          className="font-display flex items-baseline gap-3 text-[1.875rem] font-bold tracking-tight text-foreground md:text-[2.5rem]"
          style={{ letterSpacing: '-0.03em' }}
        >
          History
          <span className="block h-px flex-1 self-center bg-foreground/15" />
        </h2>
      </div>

      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-12 lg:gap-14">
        <div className="min-w-0 space-y-4 text-base leading-relaxed text-muted-foreground">
          <p className="text-pretty">
            I am an{' '}
            <span className="font-medium text-foreground">
              AI Native Full Stack Developer
            </span>{' '}
            currently working at Valoron Consulting. I specialize in building complex applications that leverage{' '}
            <TechMention name="Next.js" iconSrc={TECH_ICONS.nextjs} invert />{' '}
            for robust frontends and{' '}
            <TechMention name="Python" iconSrc={TECH_ICONS.python} /> with{' '}
            <TechMention name="PostgreSQL" iconSrc={TECH_ICONS.postgres} /> for powerful data-driven backends.
          </p>
          <p className="text-pretty">
            My engineering philosophy centers around deeply integrating AI directly into product architectures, orchestrating autonomous multi-step agents, and maintaining high observability across distributed systems.
          </p>
        </div>

        <div className="min-w-0">
          <ul className="divide-y divide-line/80 border-y border-line/80">
            {PROOF_POINTS.map(p => (
              <li
                key={p.idx}
                className="flex gap-4 py-3.5 text-sm leading-relaxed text-muted-foreground"
              >
                <span className="type-numeral shrink-0 text-[1.1rem] text-accent leading-none pt-[2px]">
                  {p.idx}
                </span>
                <span className="min-w-0 text-pretty">{p.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
