interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export function Section({ title, children }: SectionProps) {
  return (
    <section className="section-minimal">
      <h2 className="section-heading">{title}</h2>
      <div className="section-content">
        {children}
      </div>
    </section>
  );
}
