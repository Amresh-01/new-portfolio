import { ExperienceItem } from "@/data/experience";

interface ExperienceProps {
  items: ExperienceItem[];
}

export function Experience({ items }: ExperienceProps) {
  return (
    <div className="experience-list">
      {items.map((item) => (
        <div key={`${item.company}-${item.period}`} className="experience-item">
          <div className="experience-header">
            <div>
              <span className="experience-role">{item.role}</span>
              <span className="experience-separator"> — </span>
              <span className="experience-company">{item.company}</span>
            </div>
            <div className="experience-meta">
              {item.period}
              {item.location ? ` · ${item.location}` : ""}
            </div>
          </div>
          <ul className="experience-bullets">
            {item.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
