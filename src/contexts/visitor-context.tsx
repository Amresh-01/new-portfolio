"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface Visitor {
  lat: number;
  lng: number;
  city: string;
  country: string;
}

export interface CountryEntry {
  name: string;
  flag: string;
  count: number;
  cities: string[];
}

interface VisitorContextValue {
  count: number | null;
  visitors: Visitor[];
  countryCount: number;
  countries: Record<string, CountryEntry>;
}

const VisitorContext = createContext<VisitorContextValue>({
  count: null,
  visitors: [],
  countryCount: 0,
  countries: {},
});

export function VisitorProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState<number | null>(null);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [countryCount, setCountryCount] = useState(0);
  const [countries, setCountries] = useState<Record<string, CountryEntry>>({});

  useEffect(() => {
    const apply = (d: {
      count?: number;
      visitors?: Visitor[];
      countryCount?: number;
      countries?: Record<string, CountryEntry>;
    }) => {
      if (typeof d.count === "number") setCount(d.count);
      if (Array.isArray(d.visitors)) setVisitors(d.visitors);
      if (d.countryCount !== undefined) setCountryCount(d.countryCount);
      if (d.countries) setCountries(d.countries);
    };

    const load = async () => {
      try {
        const post = await fetch("/api/visitors/record", { method: "POST" });
        if (post.ok) {
          apply(await post.json());
          return;
        }
      } catch (err) {
        if (process.env.NODE_ENV === "development") console.error("[visitors] POST", err);
      }

      try {
        const get = await fetch("/api/visitors/record");
        if (get.ok) apply(await get.json());
      } catch (err) {
        if (process.env.NODE_ENV === "development") console.error("[visitors] GET", err);
      }
    };

    void load();
  }, []);

  return (
    <VisitorContext.Provider value={{ count, visitors, countryCount, countries }}>
      {children}
    </VisitorContext.Provider>
  );
}

export function useVisitors() {
  return useContext(VisitorContext);
}
