import { Mermaid } from "@/components/mermaid";

const rscPipelineDiagram = `
graph TD
  Req["HTTP Request"]
  RSC["React Server Component\n(runs on server)"]
  CC["Client Component\n('use client')"]
  Stream["React Stream\n(chunked HTML)"]
  Hydrate["Client Hydration\n(JS takes over)"]
  FRC["Full Route Cache\n(static output)"]
  DC["Data Cache\n(fetch() results)"]

  Req --> RSC
  RSC -->|"static route"| FRC
  RSC -->|"dynamic route"| Stream
  RSC -->|"client islands"| CC
  RSC -->|"fetch calls"| DC
  Stream --> Hydrate
  FRC --> Hydrate
`;

const renderingDecisionDiagram = `
graph TD
  Q1{"Does it need\nuser interaction?"}
  Q2{"Does it fetch\ndata at request time?"}
  Q3{"Does it use\nbrowser APIs?"}
  RSC["Server Component\n(default, best perf)"]
  CC["Client Component\n('use client')"]
  Static["Static (generateStaticParams)\n+ ISR"]
  Dynamic["Dynamic\n(force-dynamic)"]

  Q1 -->|"No"| Q2
  Q1 -->|"Yes"| CC
  Q2 -->|"No"| Static
  Q2 -->|"Yes (cookies, headers)"| Dynamic
  Q3 -->|"Yes"| CC
  Q3 -->|"No"| RSC
`;

const bundleWaterfallDiagram = `
sequenceDiagram
  participant Browser
  participant CDN
  participant Server

  Browser->>CDN: GET /dashboard (HTML)
  CDN-->>Browser: HTML shell (from cache)
  Browser->>CDN: GET /_next/static/chunks/page.js
  CDN-->>Browser: JS bundle
  Note over Browser: Parse + execute JS
  Browser->>Server: fetch /api/data
  Server-->>Browser: JSON
  Note over Browser: Re-render with data
`;

export default function NextjsPerformance() {
  return (
    <>
      <h2>The problem with most Next.js performance advice</h2>
      <p>
        Most of the "optimize your Next.js app" content I&apos;ve read focuses on things that don&apos;t
        actually move the needle: adding <code>next/image</code> to images that are already
        off-screen, tweaking Lighthouse scores in ways users never notice, or server-rendering
        pages that don&apos;t need server rendering.
      </p>
      <p>
        After profiling three production Next.js apps — one with 100k MAU, two in the 5-20k range
        — I found the same patterns showing up every time. The wins that actually made users notice
        came from a small set of decisions. Here they are.
      </p>

      <h2>Understand the rendering pipeline first</h2>
      <p>
        Before you can optimize anything, you need a clear model of what Next.js is actually doing.
        The RSC (React Server Components) pipeline introduced in Next.js 13+ is genuinely different
        from the old pages router, and the mental model matters.
      </p>

      <Mermaid chart={rscPipelineDiagram} />

      <p>
        Two things that aren&apos;t obvious until you see them:
      </p>
      <ul>
        <li>
          <strong>Server Components run only on the server and never ship to the client.</strong>{" "}
          Their code doesn&apos;t appear in your JS bundle. A 200-line RSC that renders a blog post
          adds zero bytes to the browser download. This is the primary reason to default to RSC.
        </li>
        <li>
          <strong>The Full Route Cache is your biggest lever for static content.</strong> If a
          route doesn&apos;t depend on request-time data (cookies, headers, dynamic segments that vary),
          Next.js can cache the entire rendered HTML output. That request never hits your server
          again — it serves from CDN in ~10ms.
        </li>
      </ul>

      <h2>The Server vs Client Component decision</h2>
      <p>
        The single highest-impact habit in Next.js is getting this decision right for every
        component. The rule is simple but easy to get backwards:
      </p>

      <Mermaid chart={renderingDecisionDiagram} />

      <p>
        The default answer should always be Server Component. You only reach for <code>&quot;use client&quot;</code>{" "}
        when you specifically need interactivity, browser APIs (<code>window</code>,{" "}
        <code>localStorage</code>), or React hooks (<code>useState</code>, <code>useEffect</code>).
      </p>
      <p>
        The mistake I see most often: wrapping large sections of a page in <code>&quot;use client&quot;</code>{" "}
        because one small part of it needs a click handler. Instead, push the client boundary
        down as far as it can go. A page can be a Server Component while containing a{" "}
        <code>&quot;use client&quot;</code> button buried three levels deep — and that&apos;s exactly right.
      </p>
      <pre>{`// ❌ Wrong: entire section is client-side for one interactive element
"use client";
export function ProjectSection({ projects }) {
  const [selected, setSelected] = useState(null);
  return (
    <section>
      {projects.map(p => <ProjectCard key={p.id} project={p} />)}
      <ProjectModal project={selected} />
    </section>
  );
}

// ✅ Right: only the interactive bit is client
// ProjectSection stays as a Server Component
// Only the modal needs client state
"use client";
export function ProjectModal({ project }) {
  const [open, setOpen] = useState(false);
  // ...
}`}</pre>

      <h2>The waterfall problem nobody talks about enough</h2>
      <p>
        The biggest performance killer I&apos;ve found in production Next.js apps isn&apos;t render strategy
        — it&apos;s request waterfalls. This is where the browser has to wait for one thing before it
        can start the next.
      </p>

      <Mermaid chart={bundleWaterfallDiagram} />

      <p>
        The classic waterfall: page loads HTML, HTML triggers JS bundle download, JS executes and
        then fires the actual data fetch. The user sees a loading spinner while all three of those
        things happen sequentially. On a slow connection, that&apos;s easily 2-3 seconds before any
        real content.
      </p>
      <p>
        Server Components eliminate this entirely for data that doesn&apos;t need client interaction.
        The data fetch happens on the server during render — the HTML that arrives in the browser
        already has the content. Zero waterfall.
      </p>
      <p>
        When you do need client-side fetches, parallel them aggressively. React Query&apos;s{" "}
        <code>useQueries</code>, or Promise.all on the server, is often the difference between
        100ms and 400ms:
      </p>
      <pre>{`// ❌ Sequential — each waits for the previous
const user = await getUser(id);
const posts = await getPosts(user.id);
const comments = await getComments(posts[0].id);

// ✅ Parallel — all fire at once, ~3x faster
const [user, posts] = await Promise.all([
  getUser(id),
  getPosts(id),
]);
const comments = await getComments(posts[0].id); // this one genuinely depends on posts`}</pre>

      <h2>Image optimization — the part people get wrong</h2>
      <p>
        <code>next/image</code> is good and you should use it. But the reason most people use it
        (automatic WebP conversion) isn&apos;t the main reason it helps. The main reason is{" "}
        <code>sizes</code>.
      </p>
      <p>
        If you add <code>next/image</code> without setting <code>sizes</code>, the browser
        downloads a full-resolution image for every viewport. A 2400px hero image gets sent to a
        375px phone. <code>sizes</code> tells the browser which image size to download based on
        viewport:
      </p>
      <pre>{`// ❌ Missing sizes — always downloads the largest image
<Image src="/hero.jpg" width={1200} height={600} alt="Hero" />

// ✅ Correct — browser picks the right size for the viewport
<Image
  src="/hero.jpg"
  width={1200}
  height={600}
  alt="Hero"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
/>`}</pre>
      <p>
        On a mobile device, this is often a 4-8x reduction in image download size. Nothing else
        you do will save as much bandwidth.
      </p>
      <p>
        One more: use <code>priority</code> on the largest above-the-fold image. Without it, the
        browser discovers the image late (after parsing JS) and LCP tanks. With it, the image
        preload starts with the HTML.
      </p>

      <h2>Bundle size — what actually matters</h2>
      <p>
        Run <code>@next/bundle-analyzer</code> and look at the output seriously. The things I
        consistently find:
      </p>
      <ul>
        <li>
          <strong>Date libraries.</strong> <code>moment.js</code> is 67KB gzipped. <code>date-fns</code>{" "}
          is tree-shakeable. <code>dayjs</code> is 2KB. If you&apos;re formatting dates, you don&apos;t need
          moment.
        </li>
        <li>
          <strong>Icon libraries imported wrong.</strong>{" "}
          <code>import {"{ ArrowRight }"} from &apos;lucide-react&apos;</code> is fine (tree-shaken).{" "}
          <code>import * as Icons from &apos;lucide-react&apos;</code> pulls in all 1000+ icons.
        </li>
        <li>
          <strong>Importing from index files.</strong> Some packages don&apos;t tree-shake from the
          index. Import directly from the subpath (<code>lodash/debounce</code> instead of{" "}
          <code>lodash</code>).
        </li>
        <li>
          <strong>Unused dependencies staying in the client bundle.</strong> Any import in a{" "}
          <code>&quot;use client&quot;</code> file lands in the browser bundle. Move heavy logic to Server
          Components or API routes.
        </li>
      </ul>

      <h2>The metrics that actually tell you if it&apos;s working</h2>
      <p>
        Lighthouse scores are useful for finding obvious problems but terrible for measuring
        real-world improvement. The metrics I track in production:
      </p>
      <ul>
        <li>
          <strong>LCP (Largest Contentful Paint)</strong> — the render time of the biggest visible
          element. Target &lt;2.5s. This is what users actually perceive as "page loaded."
        </li>
        <li>
          <strong>TTFB (Time to First Byte)</strong> — how long the server takes to start
          responding. If this is &gt;800ms, you have a server-side problem (slow DB query, cold
          start, no caching). No amount of frontend optimization fixes high TTFB.
        </li>
        <li>
          <strong>INP (Interaction to Next Paint)</strong> — replaced FID as the interaction
          metric. Measures how long the browser takes to respond to clicks/taps. &gt;200ms feels
          sluggish.
        </li>
      </ul>
      <p>
        Use Vercel Analytics or a Real User Monitoring (RUM) tool to capture these from actual
        users, not a synthetic test environment. Lighthouse on your M3 MacBook tells you what
        your MacBook experiences. RUM tells you what your users in slower markets experience.
        They&apos;re often very different numbers.
      </p>

      <h2>The one thing that moves the needle most</h2>
      <p>
        After all of this: if you have to pick one thing, get your static/dynamic caching story
        right. A page that serves from the Full Route Cache loads in ~10ms from CDN. A page that
        hits your database on every request takes 200-800ms minimum. That gap is larger than any
        frontend optimization you could possibly do.
      </p>
      <p>
        Figure out which parts of your app change on every request (user-specific data, real-time
        prices) and which parts change rarely (blog posts, product listings, marketing pages).
        Cache the latter aggressively. Personalize only what genuinely needs it.
      </p>
    </>
  );
}
