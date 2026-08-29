import { Mermaid } from "@/components/mermaid";

const layersDiagram = `
graph TD
  DB[("PostgreSQL\n(source of truth)")]
  ORM["Prisma / Drizzle\n(query layer)"]
  REPO["Repository\n(business logic)"]
  API["tRPC / REST API\n(transport layer)"]
  CACHE["React Query\n(client cache)"]
  UI["React Component\n(display layer)"]

  DB -->|"rows"| ORM
  ORM -->|"typed objects"| REPO
  REPO -->|"domain objects"| API
  API -->|"JSON response"| CACHE
  CACHE -->|"React state"| UI
`;

const bugLocationDiagram = `
pie title Where Bugs Actually Live
  "Data shape mismatch between layers" : 35
  "Missing null / loading states in UI" : 25
  "Wrong cache invalidation" : 20
  "Business logic mixed into API handler" : 15
  "Actual algorithm errors" : 5
`;

const requestDiagram = `
sequenceDiagram
  participant Browser
  participant CDN
  participant Server
  participant DB

  Browser->>CDN: GET /dashboard
  CDN-->>Browser: HTML + JS (cached)
  Browser->>Server: trpc.dashboard.query()
  Server->>DB: SELECT ... WHERE user_id = ?
  DB-->>Server: rows[]
  Server-->>Browser: { data: DashboardData }
  Note over Browser: React Query caches response
  Browser->>Browser: re-render with data
`;

export default function FullstackMentalModel() {
  return (
    <>
      <h2>The lie I told myself for two years</h2>
      <p>
        I called myself a full-stack developer. I could build a React frontend and a Node.js API.
        But for a long time, I was really just writing the same code twice — once on each side of
        the network boundary — without a coherent model for how the pieces connected.
      </p>
      <p>
        The bugs I struggled with were almost always at the seams: the place where frontend
        assumptions about data shape met the actual shape coming from the API. The place where I
        changed a database schema but forgot which API response it touched. The place where a
        loading state existed on one path but not another.
      </p>
      <p>
        The mental model that fixed this is simple, but it took me embarrassingly long to find it.
      </p>

      <h2>Think in layers, not in files</h2>
      <p>
        A full-stack application is a pipeline. Data starts in a database with one shape, passes
        through several transformation layers, and ends up in a UI component with a completely
        different shape. Each layer is responsible for a specific transformation.
      </p>

      <Mermaid chart={layersDiagram} />

      <p>
        When you think about your app this way, a few things become immediately clear:
      </p>
      <ul>
        <li>
          <strong>Each layer has a contract with the layer above and below it.</strong> The ORM
          produces typed objects from the database. The repository transforms those into domain
          objects your business logic understands. The API serializes domain objects into JSON. The
          client cache deserializes JSON back into typed objects. Any mismatch in these contracts
          is a bug.
        </li>
        <li>
          <strong>Types should flow in one direction.</strong> Your database schema drives your ORM
          types. Your ORM types drive your domain objects. Your domain objects drive your API
          response types. Your API response types drive your frontend types. If your frontend type
          is drifting from the API response type, something is wrong.
        </li>
        <li>
          <strong>State lives in exactly one place.</strong> The database is the source of truth.
          The React Query cache is a projection of that truth. Your component state is a projection
          of the cache. When they diverge, you have a stale cache problem — not a state management
          problem.
        </li>
      </ul>

      <h2>The actual request lifecycle</h2>
      <p>
        Let me trace a real request so this isn&apos;t abstract. User navigates to their dashboard:
      </p>

      <Mermaid chart={requestDiagram} />

      <p>
        Notice a few things about this flow:
      </p>
      <p>
        The CDN serves the static HTML and JS bundle. This is not your server&apos;s job and should
        happen before your server ever gets involved. If your server is involved in serving JS
        files, you&apos;re paying for latency you don&apos;t need to pay.
      </p>
      <p>
        The data fetch is a separate request — typed end-to-end if you&apos;re using tRPC, loosely
        coupled if you&apos;re using REST. The server does the DB query, transforms the result, and
        returns JSON. The client doesn&apos;t know how the data was fetched, and it doesn&apos;t need to.
      </p>
      <p>
        React Query caches the response. Next time the user visits this page (or if another
        component on the same page requests the same data), it comes from the cache. The
        cache-invalidation question becomes: when do I tell React Query this data is stale? Usually
        the answer is: after a mutation succeeds.
      </p>

      <h2>Where bugs actually live</h2>
      <p>
        Here&apos;s what I&apos;ve noticed after debugging hundreds of full-stack issues:
      </p>

      <Mermaid chart={bugLocationDiagram} />

      <p>
        Most bugs are data shape mismatches between layers. Your API returns <code>user.name</code>,
        but your frontend expects <code>user.fullName</code>. Your database has a <code>created_at</code>
        timestamp as a string, but your frontend treats it as a Date object. Your API returns an
        empty array, but your component expects <code>null</code> for the empty state.
      </p>
      <p>
        TypeScript catches a lot of these, but only if your types flow end-to-end. A hand-written
        frontend type that doesn&apos;t come from your API schema is a lie — it will drift. Use code
        generation (tRPC, OpenAPI codegen, GraphQL codegen) to keep types synchronized.
      </p>

      <h2>The practical rules I follow now</h2>
      <p>
        <strong>One source of truth per data concept.</strong> If <code>user.role</code> is
        checked in the API handler, the middleware, and the frontend component, you have three
        places to update when roles change. Put it in the API, derive everywhere else.
      </p>
      <p>
        <strong>Don&apos;t put business logic in API handlers.</strong> An API handler should validate
        input, call a repository method, and serialize the response. If there&apos;s business logic in
        the handler, it can&apos;t be reused by other handlers, can&apos;t be easily tested, and tends to
        grow into a monster. Repository layer is where logic lives.
      </p>
      <p>
        <strong>Handle all three states: loading, error, data.</strong> Every data fetch has
        three possible outcomes. Components that only handle the &quot;data&quot; case will crash or show
        nothing in the other two. Handling loading and error states isn&apos;t optional — it&apos;s the
        majority of the user experience for slow connections.
      </p>
      <p>
        <strong>Invalidate aggressively after mutations.</strong> It&apos;s better to refetch data you
        didn&apos;t need to than to show stale data. The cost of an extra network request is almost
        always lower than the cost of a user trusting a number that&apos;s wrong.
      </p>

      <h2>The shift that changed things</h2>
      <p>
        The shift isn&apos;t technical — it&apos;s conceptual. Once I started thinking about my app as a
        data pipeline with clear layer responsibilities, I stopped asking &quot;where should I put this
        code?&quot; and started asking &quot;at which layer does this transformation belong?&quot; Those are
        different questions, and the second one has a much more obvious answer.
      </p>
      <p>
        The bugs didn&apos;t disappear, but they got easier to find. When something goes wrong, you
        trace the data from the layer where it breaks back toward the source. Most of the time
        you&apos;ll find a contract violation somewhere in the middle.
      </p>
    </>
  );
}
