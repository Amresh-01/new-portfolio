import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

let _redis: Redis | null = null;

function getRedis(): Redis | null {
  if (_redis) return _redis;
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  _redis = new Redis({ url, token });
  return _redis;
}

const DB_KEY = "portfolio:visitors";
const SEEN_KEY = "portfolio:seen_ips";

const LOCAL_IPS = new Set(["::1", "127.0.0.1", "::ffff:127.0.0.1"]);
const DAY_S = 24 * 60 * 60;

interface GeoData {
  country: string;
  countryCode: string;
  region?: string;
  city: string;
  lat: number;
  lon: number;
  isp?: string;
  flag: string;
}

interface RecentVisitor extends GeoData {
  ip: string;
  time: string;
}

interface CountryEntry {
  name: string;
  flag: string;
  count: number;
  cities: string[];
}

interface VisitorDB {
  totalVisits: number;
  uniqueVisitors: number;
  countries: Record<string, CountryEntry>;
  recentVisitors: RecentVisitor[];
}

const SEED_COUNT = 206;

const EMPTY_DB: VisitorDB = {
  totalVisits: SEED_COUNT,
  uniqueVisitors: SEED_COUNT,
  countries: {},
  recentVisitors: [],
};

function normalizeDB(data: unknown): VisitorDB {
  if (!data || typeof data !== "object") return { ...EMPTY_DB };

  const raw = data as Partial<VisitorDB>;
  return {
    totalVisits:
      typeof raw.totalVisits === "number" ? raw.totalVisits : SEED_COUNT,
    uniqueVisitors:
      typeof raw.uniqueVisitors === "number" ? raw.uniqueVisitors : SEED_COUNT,
    countries:
      raw.countries && typeof raw.countries === "object" ? raw.countries : {},
    recentVisitors: Array.isArray(raw.recentVisitors) ? raw.recentVisitors : [],
  };
}

async function readDB(): Promise<VisitorDB> {
  try {
    const redis = getRedis();
    if (!redis) return EMPTY_DB;
    const data = await redis.get(DB_KEY);
    return normalizeDB(data);
  } catch {
    return EMPTY_DB;
  }
}

async function writeDB(db: VisitorDB): Promise<void> {
  try {
    const redis = getRedis();
    if (!redis) return;
    await redis.set(DB_KEY, db);
  } catch {
    // non-fatal — visitor data is best-effort
  }
}

const COUNTRY_NAMES: Record<string, string> = {
  US: "United States", GB: "United Kingdom", CA: "Canada", AU: "Australia",
  DE: "Germany", FR: "France", IN: "India", JP: "Japan", CN: "China",
  BR: "Brazil", MX: "Mexico", KR: "South Korea", RU: "Russia", IT: "Italy",
  ES: "Spain", NL: "Netherlands", SE: "Sweden", NO: "Norway", DK: "Denmark",
  FI: "Finland", PL: "Poland", CH: "Switzerland", AT: "Austria", BE: "Belgium",
  SG: "Singapore", HK: "Hong Kong", TW: "Taiwan", NZ: "New Zealand", ZA: "South Africa",
  NG: "Nigeria", EG: "Egypt", GH: "Ghana", KE: "Kenya", AR: "Argentina",
  CO: "Colombia", CL: "Chile", PK: "Pakistan", BD: "Bangladesh", ID: "Indonesia",
  PH: "Philippines", VN: "Vietnam", TH: "Thailand", MY: "Malaysia",
  AE: "UAE", SA: "Saudi Arabia", IL: "Israel", TR: "Turkey", UA: "Ukraine",
  CZ: "Czech Republic", HU: "Hungary", RO: "Romania", PT: "Portugal", GR: "Greece",
  IR: "Iran", IQ: "Iraq", SK: "Slovakia", HR: "Croatia",
};

function geoFromVercelHeaders(req: NextRequest): GeoData | null {
  const countryCode = req.headers.get("x-vercel-ip-country") ?? "";
  if (!countryCode) return null;
  const rawCity = req.headers.get("x-vercel-ip-city") ?? "";
  const city = (() => { try { return decodeURIComponent(rawCity); } catch { return rawCity; } })();
  const lat = parseFloat(req.headers.get("x-vercel-ip-latitude") ?? "0");
  const lon = parseFloat(req.headers.get("x-vercel-ip-longitude") ?? "0");
  const country = COUNTRY_NAMES[countryCode] ?? countryCode;
  return {
    country,
    countryCode,
    city,
    lat,
    lon,
    flag: `https://flagcdn.com/24x18/${countryCode.toLowerCase()}.png`,
  };
}

async function geoFromIpApi(ip: string): Promise<GeoData | null> {
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,countryCode,city,lat,lon`, {
      next: { revalidate: 0 },
    });
    if (!res.ok) return null;
    const d = await res.json();
    if (d.status !== "success" || !d.countryCode) return null;
    const countryCode: string = d.countryCode;
    return {
      country: d.country ?? countryCode,
      countryCode,
      city: d.city ?? "",
      lat: d.lat ?? 0,
      lon: d.lon ?? 0,
      flag: `https://flagcdn.com/24x18/${countryCode.toLowerCase()}.png`,
    };
  } catch {
    return null;
  }
}

async function geoLocate(req: NextRequest, ip: string): Promise<GeoData | null> {
  if (LOCAL_IPS.has(ip)) {
    return { country: "Local", countryCode: "LO", city: "localhost", lat: 0, lon: 0, flag: "" };
  }
  return geoFromVercelHeaders(req) ?? await geoFromIpApi(ip);
}

function buildResponse(db: VisitorDB) {
  const publicVisitors = (db.recentVisitors ?? []).map(({ lat, lon, city, country }) => ({
    lat,
    lng: lon,
    city,
    country,
  }));
  return {
    count: db.uniqueVisitors,
    visitors: publicVisitors,
    countryCount: Object.keys(db.countries).length,
    countries: db.countries,
  };
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const forwarded = req.headers.get("x-forwarded-for");
    const ip =
      (forwarded ? forwarded.split(",")[0].trim() : null) ??
      req.headers.get("x-real-ip") ??
      (req as unknown as { ip?: string }).ip ??
      "unknown";

    if (ip === "unknown") {
      const db = await readDB();
      return NextResponse.json(buildResponse(db));
    }

    const seenKey = `${SEEN_KEY}:${ip}`;
    const redis = getRedis();
    const alreadySeen = redis ? await redis.exists(seenKey).catch(() => 0) : 0;
    const isNew = !alreadySeen;

    const db = await readDB();

    const updatedDB: VisitorDB = {
      ...db,
      totalVisits: db.totalVisits + 1,
      uniqueVisitors:
        isNew && !LOCAL_IPS.has(ip) ? db.uniqueVisitors + 1 : db.uniqueVisitors,
      countries: { ...db.countries },
      recentVisitors: [...db.recentVisitors],
    };

    if (isNew && !LOCAL_IPS.has(ip) && redis) {
      await redis.set(seenKey, 1, { ex: DAY_S }).catch(() => {});
    }

    const geo = await geoLocate(req, ip);

    if (geo && !LOCAL_IPS.has(ip)) {
      const code = geo.countryCode;
      const existing = updatedDB.countries[code];
      const cities = existing?.cities ? [...existing.cities] : [];
      if (geo.city && !cities.includes(geo.city)) cities.push(geo.city);

      updatedDB.countries = {
        ...updatedDB.countries,
        [code]: {
          name: geo.country,
          flag: geo.flag,
          count: (existing?.count ?? 0) + 1,
          cities,
        },
      };

      const visitor: RecentVisitor = {
        ip: ip.slice(0, 8) + "***",
        ...geo,
        time: new Date().toISOString(),
      };
      updatedDB.recentVisitors = [visitor, ...updatedDB.recentVisitors].slice(0, 200);
    }

    await writeDB(updatedDB);

    return NextResponse.json(buildResponse(updatedDB));
  } catch {
    const db = await readDB().catch(() => EMPTY_DB);
    return NextResponse.json(buildResponse(db));
  }
}

export async function GET(): Promise<NextResponse> {
  const db = await readDB();
  return NextResponse.json(buildResponse(db));
}
