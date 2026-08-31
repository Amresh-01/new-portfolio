import {
  generateOgImage,
  ogImageContentType,
  ogImageSize,
} from '@/lib/og-image';

export const runtime = 'nodejs';
export const alt = 'Writing — Amresh Chaurasiya';
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function BlogOpenGraphImage() {
  return generateOgImage({
    eyebrow: 'Writing',
    title: 'Thoughts',
    titleItalic: '& learnings',
    subtitle: 'Open source, developer tools, and lessons from the field.',
    body: 'Essays and notes from Insforge, Robocurve, Twentyt, and beyond.',
    stats: [
      { value: '30+', label: 'Merged PRs' },
      { value: '6+', label: 'Orgs' },
      { value: '1.5+', label: 'Shipping' },
    ],
    showPortrait: false,
    footer: 'amreshdev.me/blog',
  });
}
