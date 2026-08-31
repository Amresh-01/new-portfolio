import {
  generateOgImage,
  ogImageContentType,
  ogImageSize,
} from '@/lib/og-image';

export const runtime = 'nodejs';
export const alt =
  'Amresh Chaurasiya — AI Native Full Stack Developer at Valoron Consulting.';
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function TwitterImage() {
  return generateOgImage();
}
