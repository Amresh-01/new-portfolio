'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const RESUME_PDF = '/Amresh_resume_new.pdf';

export default function ResumePreviewPDF() {
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
          onLoadError={(error) => console.error('Error while loading document!', error)}
          onSourceError={(error) => console.error('Error while loading document source!', error)}
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
