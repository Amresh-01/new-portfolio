import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Resume for Amresh Chaurasiya — full stack engineer, TypeScript, AI and ML.',
  openGraph: {
    title: 'Resume · Amresh Chaurasiya',
    description:
      'One-page resume — Insforge , Robocurve , Twenty , and open source.',
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
