'use client';

import { useState, useEffect, useRef } from 'react';
import { Download, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const RESUME_PDF = '/Amresh_resume_new.pdf';
const RESUME_FILENAME = 'Amresh_resume_new.pdf';

export function ResumeActions({ className }: { className?: string }) {
  return (
    <div
      className={cn('flex shrink-0 flex-wrap items-center gap-2', className)}
    >
      <a
        href={RESUME_PDF}
        download={RESUME_FILENAME}
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
  const [width, setWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setWidth(entries[0].contentRect.width);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <figure className="mx-auto w-full">
      <div
        ref={containerRef}
        className={cn(
          'relative overflow-hidden rounded-sm bg-background',
          'shadow-[0_1px_0_rgba(47,52,55,0.04),0_18px_50px_-28px_rgba(47,52,55,0.35)]'
        )}
      >
        {!loaded && (
          <div
            className="absolute inset-0 z-[1] animate-pulse bg-canvas-muted"
            style={{ aspectRatio: '160/207' }}
            aria-hidden
          />
        )}
        <Document
          file={RESUME_PDF}
          onLoadSuccess={() => setLoaded(true)}
          className={cn(
            'flex flex-col items-center transition-opacity duration-300 w-full',
            loaded ? 'opacity-100' : 'opacity-0'
          )}
        >
          <Page 
            pageNumber={1} 
            width={width || undefined}
            renderTextLayer={false} 
            renderAnnotationLayer={false} 
            className="w-full"
          />
        </Document>
      </div>
    </figure>
  );
}

export const ResumeViewer = {
  Actions: ResumeActions,
  Preview: ResumePreview,
};
