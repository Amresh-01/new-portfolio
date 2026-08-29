export function AboutSection() {
  return (
    <section className="about-section">
      <h2 className="section-heading">About</h2>

      <div className="about-body">
        <p className="about-para">
          I am a <span className="about-highlight">Full-Stack Engineer</span> focused on{" "}
          <span className="about-highlight">performance</span>,{" "}
          <span className="about-highlight">scalability</span>, and shipping{" "}
          <span className="about-highlight">production-grade software</span>.
        </p>

        <p className="about-para">
          Currently building tools and platforms that make developers&apos; lives easier.
          I work across the stack, specializing in{" "}
          <span className="about-highlight">TypeScript</span>,{" "}
          <span className="about-highlight">React</span>, and{" "}
          <span className="about-highlight">Solana</span> development.
        </p>

        <ul className="about-list">
          <li className="about-list-item">
            <span className="about-bullet">•</span>
            <span>
              Built interactive developer tools like{" "}
              <span className="about-highlight">Solana Atlas</span> — making blockchain mechanics visible, testable, and understandable.
            </span>
          </li>
          <li className="about-list-item">
            <span className="about-bullet">•</span>
            <span>
              Developed{" "}
              <span className="about-highlight">real-time systems</span> using{" "}
              <span className="about-highlight">WebSockets</span>,{" "}
              <span className="about-highlight">Canvas API</span>, and{" "}
              <span className="about-highlight">Node.js</span> for low-latency collaborative experiences.
            </span>
          </li>
          <li className="about-list-item">
            <span className="about-bullet">•</span>
            <span>
              Specialized in building scalable full-stack applications using{" "}
              <span className="about-highlight">Next.js</span>,{" "}
              <span className="about-highlight">Node.js</span>, and{" "}
              <span className="about-highlight">PostgreSQL</span>, bridging the gap between heavy backend logic and fluid UI.
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
