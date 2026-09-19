'use client';

import { useState } from 'react';
import { Download, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const RESUME_PDF = '/Amresh_resume_new.pdf';
const RESUME_FILENAME = 'Amresh_resume_new.pdf';

export function ResumeActions({ className }: { className?: string }) {
  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(RESUME_PDF);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = RESUME_FILENAME;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download resume:', error);
      window.open(RESUME_PDF, '_blank');
    }
  };

  return (
    <div
      className={cn('flex shrink-0 flex-wrap items-center gap-2', className)}
    >
      <a
        href={RESUME_PDF}
        download={RESUME_FILENAME}
        onClick={handleDownload}
        className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-foreground px-3 py-1.5 text-xs font-semibold text-background transition-[transform,background-color,color,border-color] hover:-translate-y-px hover:border-foreground hover:bg-background hover:text-foreground active:translate-y-0 active:scale-[0.98] sm:px-3.5 sm:text-sm"
      >
        <Download className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
        Download
      </a>
      <a
        href={RESUME_PDF}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full border border-line/90 bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition-[transform,background-color,border-color] hover:-translate-y-px hover:border-foreground/30 hover:bg-muted active:translate-y-0 active:scale-[0.98] sm:px-3.5 sm:text-sm"
      >
        <ExternalLink className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
        Open
      </a>
    </div>
  );
}

export function ResumePreview() {
  const [loaded, setLoaded] = useState(false);

  return (
    <figure className="mx-auto w-full">
      <div
        className={cn(
          'relative overflow-hidden rounded-sm bg-background',
          'shadow-[0_1px_0_rgba(47,52,55,0.04),0_18px_50px_-28px_rgba(47,52,55,0.35)]'
        )}
        style={{ aspectRatio: '160/207' }}
      >
        {!loaded && (
          <div
            className="absolute inset-0 z-[1] animate-pulse bg-canvas-muted"
            aria-hidden
          />
        )}
        <div className="absolute inset-[-4px] md:inset-[-6px]">
          <iframe
            src={`${RESUME_PDF}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            title="Amresh Chaurasiya resume"
            className={cn(
              'w-full h-full border-none transition-opacity duration-300 pointer-events-none',
              loaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>
    </figure>
  );
}

export const ResumeViewer = {
  Actions: ResumeActions,
  Preview: ResumePreview,
};
