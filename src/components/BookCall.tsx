'use client';

import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';

const CAL_LINK = 'amreshdev/engineering';
const CAL_NAMESPACE = 'engineering';

export const BookCall = () => {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal('ui', {
        theme: 'light',
        cssVarsPerTheme: {
          light: { 'cal-brand': '#292929' },
          dark: { 'cal-brand': '#fafafa' },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  return (
    <section className="mb-16" aria-labelledby="contact-heading">
      <div className="mb-6 flex items-baseline gap-4">
        <span className="type-numeral shrink-0 text-[1.6rem] text-accent">
          08
        </span>
        <h2
          id="contact-heading"
          className="font-display flex items-baseline gap-3 text-[1.875rem] font-bold tracking-tight text-foreground md:text-[2.5rem]"
          style={{ letterSpacing: '-0.03em' }}
        >
          Contact
          <span className="block h-px flex-1 self-center bg-foreground/15" />
        </h2>
      </div>

      <div className="border-t border-line/80 pt-5">
        <div className="mb-6 space-y-2 text-center">
          <p className="type-meta text-muted-foreground/80">Book a call</p>
          <p className="font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl">
            Tell me what you are shipping.
          </p>
          <p className="text-sm text-muted-foreground">
            Founders · Engineers · HRs
          </p>
          <div className="mx-auto mt-4 max-w-md rounded-lg border border-line bg-canvas-muted/50 p-3 text-left md:text-center text-[13px] leading-relaxed text-foreground/80">
            <strong>Availability:</strong> 12:00 PM to late night (IST).<br className="hidden md:block" /> 
            <em>The calendar automatically converts all slots to your local time zone.</em> If you are booking from the US, Mexico, or another timezone that doesn't perfectly align with my normal hours, please go ahead and book anyway—I am highly flexible and happy to accommodate!
          </div>
        </div>

        <div className="cal-booking-shell overflow-hidden rounded-lg border border-line bg-card shadow-[0_1px_2px_rgba(47,52,55,0.04)]">
          <Cal
            namespace={CAL_NAMESPACE}
            calLink={CAL_LINK}
            className="cal-embed w-full"
            style={{ width: '100%' }}
            config={{
              layout: 'month_view',
              useSlotsViewOnSmallScreen: 'true',
              theme: 'light',
            }}
          />
        </div>

        <p className="mt-5 text-center font-mono text-[11px] text-muted-foreground">
          Prefer email?{' '}
          <a
            href="mailto:amresh.codes@gmail.com"
            className="text-foreground underline-offset-4 hover:underline"
          >
            amresh.codes@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
};
