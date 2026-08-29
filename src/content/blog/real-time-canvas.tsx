import { Mermaid } from "@/components/mermaid";

const naiveApproachDiagram = `
sequenceDiagram
  participant A as Client A
  participant S as Server
  participant B as Client B

  A->>S: draw(x:100, y:50, color:red)
  B->>S: draw(x:100, y:50, color:blue)
  S->>A: broadcast(blue)
  S->>B: broadcast(red)
  Note over A,B: A sees blue, B sees red — state diverged ❌
`;

const serverArchDiagram = `
graph TD
  CA["Client A (Browser)"]
  CB["Client B (Browser)"]
  CC["Client C (Browser)"]
  WS["WebSocket Server (Node.js)"]
  OP["Operation Log"]
  STATE["Canvas State"]

  CA <-->|"ws: ops"| WS
  CB <-->|"ws: ops"| WS
  CC <-->|"ws: ops"| WS
  WS -->|"append"| OP
  WS -->|"apply + broadcast"| STATE
  OP -->|"replay for new clients"| STATE
`;

const crdtDiagram = `
graph LR
  A["Op: insert(pos=3, char='x')"]
  B["Op: delete(pos=3)"]
  OT["OT Transform Layer"]
  FA["Final: insert(pos=2, char='x')"]
  FB["Final: delete(pos=3) ✓"]

  A --> OT
  B --> OT
  OT --> FA
  OT --> FB
  FA --> Merge["Merged State"]
  FB --> Merge
`;

export default function RealTimeCanvas() {
  return (
    <>
      <h2>It started with a wrong assumption</h2>
      <p>
        When I set out to build real-time collaborative drawing, I thought the hard part would be
        WebSockets. Setting up a persistent connection, handling reconnects, broadcasting to the
        right room. That stuff has solid libraries. I figured I&apos;d be done with the hard part in a
        day.
      </p>
      <p>
        I was done with WebSockets in a day. Then I spent a week on a problem that didn&apos;t have a
        name yet in my vocabulary: <strong>conflict resolution.</strong>
      </p>

      <h2>The naive approach breaks immediately</h2>
      <p>
        The first version was simple: user draws something, send it to the server, server broadcasts
        to everyone else, everyone applies it. Works great with one user. With two users drawing
        simultaneously, you get this:
      </p>

      <Mermaid chart={naiveApproachDiagram} />

      <p>
        Both clients sent an operation at nearly the same time. The server received them in
        different orders. Each client applied the remote operation on top of a different local
        state. Now Client A shows a blue stroke where Client B shows red. They&apos;ve diverged and
        there&apos;s no automatic way to reconcile.
      </p>
      <p>
        For canvas drawing this might seem minor — who cares which color wins? But for collaborative
        text editing (or any structured data), divergence means your users are staring at completely
        different documents. This is the core problem.
      </p>

      <h2>The architecture that actually works</h2>
      <p>
        Before getting into conflict resolution algorithms, the server architecture matters a lot.
        Here&apos;s what a solid real-time canvas server looks like:
      </p>

      <Mermaid chart={serverArchDiagram} />

      <p>
        Two things to notice:
      </p>
      <ul>
        <li>
          <strong>Operations are logged, not just applied.</strong> Every draw operation gets
          appended to an immutable log before being applied to the canvas state. When a new client
          joins, you replay the log to reconstruct their state. This is how they catch up without
          receiving a potentially huge current-state snapshot.
        </li>
        <li>
          <strong>The server is the source of truth for ordering.</strong> The server sees all
          operations and defines their canonical order. Clients send operations; the server decides
          when (in what sequence) those operations happened. This is the key to solving divergence.
        </li>
      </ul>

      <h2>Operational Transforms vs CRDTs — the real choice</h2>
      <p>
        Once you accept that the server orders operations, you need a way to transform operations
        so they make sense applied to a state that&apos;s different from what the client had when they
        generated the operation. This is called <strong>Operational Transform (OT)</strong>.
      </p>

      <Mermaid chart={crdtDiagram} />

      <p>
        OT says: when Client A&apos;s <code>insert(pos=3)</code> arrives at the server after Client B
        already did a <code>delete(pos=3)</code>, transform A&apos;s operation to account for that
        delete. The position has shifted. The transformed operation is what gets applied and
        broadcast.
      </p>
      <p>
        OT works well but has a nasty problem: the transformation functions are hard to get right.
        For simple operations (insert/delete on a linear document) it&apos;s manageable. For complex
        operations on a 2D canvas (bezier curves, group transforms, layer reordering) the transform
        algebra gets complicated fast.
      </p>
      <p>
        <strong>CRDTs (Conflict-free Replicated Data Types)</strong> take a different approach.
        Instead of transforming operations after the fact, you design your data structure so that
        any two concurrent operations commute — applying them in any order always produces the same
        result. No server coordination needed. This is what Figma uses, and it&apos;s why Figma can work
        offline and sync cleanly when you reconnect.
      </p>
      <p>
        For my canvas app, I ended up using a simpler version: <strong>last-write-wins with
        vector clocks</strong>. Each operation carries a logical timestamp. When two operations
        conflict, the one with the higher timestamp wins. It&apos;s not perfect — you can lose work —
        but for a drawing app where conflicts are rare and stakes are low, it&apos;s the pragmatic
        choice.
      </p>

      <h2>Cursor sync — the detail that makes it feel real</h2>
      <p>
        Here&apos;s something I didn&apos;t appreciate until I saw a demo without it: showing other users&apos;
        cursors is what makes real-time collaboration <em>feel</em> collaborative. Without it, you
        just see strokes appearing. With it, you see someone else&apos;s intention — where they&apos;re
        about to draw.
      </p>
      <p>
        Cursor sync has a different latency budget than drawing sync. For strokes, ~100ms of latency
        is fine — nobody notices. For cursors, anything over 60ms feels laggy because you&apos;re
        watching smooth mouse movement that suddenly teleports. You need either a separate
        high-frequency channel or interpolation on the client side.
      </p>
      <pre>{`// Client-side cursor interpolation
function interpolateCursor(current, target, dt) {
  const speed = 0.15; // tune this
  return {
    x: current.x + (target.x - current.x) * speed * dt,
    y: current.y + (target.y - current.y) * speed * dt,
  };
}

// Called every animation frame, not on each WebSocket message
requestAnimationFrame(function animate(now) {
  const dt = now - lastFrame;
  remoteCursors.forEach(cursor => {
    cursor.rendered = interpolateCursor(cursor.rendered, cursor.target, dt);
  });
  drawCursors();
  lastFrame = now;
  requestAnimationFrame(animate);
});`}</pre>
      <p>
        The cursor positions received over WebSocket become <em>targets</em>. The rendered positions
        chase those targets smoothly every animation frame. 60fps rendering from ~10 WebSocket
        updates per second per user.
      </p>

      <h2>The latency budget</h2>
      <p>
        One thing I didn&apos;t think about until production: what&apos;s the acceptable latency for each
        type of event? They&apos;re different:
      </p>
      <ul>
        <li><strong>Drawing strokes:</strong> &lt;150ms feels live. &gt;300ms feels broken.</li>
        <li><strong>Cursor position:</strong> &lt;80ms ideally, &lt;120ms acceptable.</li>
        <li><strong>Presence (who&apos;s online):</strong> 1-2 second updates are fine.</li>
        <li><strong>Undo/redo:</strong> Must be instant and consistent — sync carefully.</li>
      </ul>
      <p>
        These different tolerances suggest different architectures: draw strokes go through the
        reliable conflict-resolution path, cursor updates go through a lossy-but-fast path,
        presence goes through polling or a much lower-frequency channel.
      </p>

      <h2>What I&apos;d do differently</h2>
      <p>
        I&apos;d use <a href="https://yjs.dev" target="_blank" rel="noopener noreferrer">Yjs</a> from
        the start. It&apos;s a production-grade CRDT library with first-class awareness (cursor sync)
        support and bindings for pretty much every editor framework. Rolling your own conflict
        resolution is a great learning exercise, but it&apos;s not what you want under a product.
      </p>
      <p>
        And I&apos;d instrument latency from day one. p50 WebSocket round-trip time is the metric that
        tells you whether your architecture is working. Everything else is a guess.
      </p>
    </>
  );
}
