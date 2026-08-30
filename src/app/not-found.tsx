import Link from "next/link";
import { SiteNav } from "@/components/site-nav";

export default function NotFound() {
  return (
    <main>
      <SiteNav />
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        textAlign: "center",
        padding: "0 1.5rem"
      }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: "var(--color-text-primary)" }}>
          404 - Page Not Found
        </h1>
        <p style={{ color: "var(--color-text-secondary)", marginBottom: "2rem", maxWidth: "500px", lineHeight: "1.6" }}>
          The page you are looking for doesn't exist or has been moved. Check the URL or navigate back to safety.
        </p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link href="/" style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "var(--color-text-primary)",
            color: "var(--color-bg-primary)",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "500"
          }}>
            Return Home
          </Link>
          <Link href="/projects" style={{
            padding: "0.75rem 1.5rem",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-primary)",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "500"
          }}>
            View Projects
          </Link>
        </div>
      </div>
    </main>
  );
}
