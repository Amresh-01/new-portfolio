const techs = [
  { name: "React", icon: "https://cdn.simpleicons.org/react/ffffff", darkIcon: "https://cdn.simpleicons.org/react/ffffff", url: "https://react.dev" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/ffffff", darkIcon: "https://cdn.simpleicons.org/nextdotjs/ffffff", url: "https://nextjs.org" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/ffffff", darkIcon: "https://cdn.simpleicons.org/nodedotjs/ffffff", url: "https://nodejs.org" },
  { name: "Express", icon: "https://cdn.simpleicons.org/express/ffffff", darkIcon: "https://cdn.simpleicons.org/express/ffffff", url: "https://expressjs.com" },
  { name: "Bun", icon: "https://cdn.simpleicons.org/bun/ffffff", darkIcon: "https://cdn.simpleicons.org/bun/ffffff", url: "https://bun.sh" },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/ffffff", darkIcon: "https://cdn.simpleicons.org/postgresql/ffffff", url: "https://www.postgresql.org" },
  { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/ffffff", darkIcon: "https://cdn.simpleicons.org/mongodb/ffffff", url: "https://www.mongodb.com" },
  { name: "Redis", icon: "https://cdn.simpleicons.org/redis/ffffff", darkIcon: "https://cdn.simpleicons.org/redis/ffffff", url: "https://redis.io" },
  { name: "Prisma", icon: "https://cdn.simpleicons.org/prisma/ffffff", darkIcon: "https://cdn.simpleicons.org/prisma/ffffff", url: "https://www.prisma.io" },
  { name: "Tanstack Query", icon: "https://cdn.simpleicons.org/reactquery/ffffff", darkIcon: "https://cdn.simpleicons.org/reactquery/ffffff", url: "https://tanstack.com/query" },
  { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/ffffff", darkIcon: "https://cdn.simpleicons.org/tailwindcss/ffffff", url: "https://tailwindcss.com" },
  { name: "shadcn", icon: "https://cdn.simpleicons.org/shadcnui/ffffff", darkIcon: "https://cdn.simpleicons.org/shadcnui/ffffff", url: "https://ui.shadcn.com" },
  { name: "Motion", icon: "https://cdn.simpleicons.org/framer/ffffff", darkIcon: "https://cdn.simpleicons.org/framer/ffffff", url: "https://motion.dev" },
  { name: "GSAP", icon: "https://cdn.simpleicons.org/greensock/ffffff", darkIcon: "https://cdn.simpleicons.org/greensock/ffffff", url: "https://gsap.com" },
  { name: "Postman", icon: "https://cdn.simpleicons.org/postman/ffffff", darkIcon: "https://cdn.simpleicons.org/postman/ffffff", url: "https://www.postman.com" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/ffffff", darkIcon: "https://cdn.simpleicons.org/typescript/ffffff", url: "https://www.typescriptlang.org" },
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/ffffff", darkIcon: "https://cdn.simpleicons.org/javascript/ffffff", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/ffffff", darkIcon: "https://cdn.simpleicons.org/python/ffffff", url: "https://www.python.org" },
  { name: "Rust", icon: "https://cdn.simpleicons.org/rust/ffffff", darkIcon: "https://cdn.simpleicons.org/rust/ffffff", url: "https://www.rust-lang.org" },
  { name: "Solana", icon: "https://cdn.simpleicons.org/solana/ffffff", darkIcon: "https://cdn.simpleicons.org/solana/ffffff", url: "https://solana.com" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/ffffff", darkIcon: "https://cdn.simpleicons.org/git/ffffff", url: "https://git-scm.com" },
  { name: "GitHub", icon: "https://cdn.simpleicons.org/github/ffffff", darkIcon: "https://cdn.simpleicons.org/github/ffffff", url: "https://github.com" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/ffffff", darkIcon: "https://cdn.simpleicons.org/docker/ffffff", url: "https://www.docker.com" },
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma/ffffff", darkIcon: "https://cdn.simpleicons.org/figma/ffffff", url: "https://www.figma.com" },
];

export function TechStack() {
  return (
    <section className="tech-stack-section">
      <span className="section-title">Skills</span>
      <h2 className="section-heading">Technologies</h2>
      <div className="tech-pill-grid">
        {techs.map((tech) => (
          <a
            key={tech.name}
            href={tech.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tech-pill"
          >
            <img
              src={tech.icon}
              alt={tech.name}
              className={tech.darkIcon ? "tech-pill-icon light-only" : "tech-pill-icon"}
              width={16}
              height={16}
            />
            {tech.darkIcon && (
              <img
                src={tech.darkIcon}
                alt={tech.name}
                className="tech-pill-icon dark-only"
                width={16}
                height={16}
              />
            )}
            <span>{tech.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
