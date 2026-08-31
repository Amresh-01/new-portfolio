import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Amresh Chaurasiya',
    default: 'Projects',
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
