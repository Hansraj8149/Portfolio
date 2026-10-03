import { note, profile } from "@/content/profile";

/** "About" written as an equity research note. */
export default function Note() {
  return (
    <article className="panel">
      <div className="panel-head">
        <span>
          <span className="text-fg">Research note</span> · Coverage initiated
        </span>
        <span>{profile.symbol}</span>
      </div>
      <div className="grid gap-8 p-4 sm:p-6 lg:grid-cols-[260px_1fr] lg:gap-12">
        <aside className="space-y-5">
          <div>
            <p className="font-mono text-[10px] tracking-wider text-dim uppercase">Rating</p>
            <p className="mt-1 inline-block bg-up px-2 py-1 font-mono text-sm font-bold text-bg">{note.rating}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-wider text-dim uppercase">Key risk</p>
            <p className="mt-1 text-sm text-muted">{note.risks}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-wider text-dim uppercase">Fundamentals</p>
            <p className="mt-1 text-sm text-muted">{note.education}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-wider text-dim uppercase">Trading hours</p>
            <p className="mt-1 text-sm text-muted">{profile.remote}</p>
          </div>
        </aside>
        <div>
          <p className="font-mono text-[11px] tracking-wider text-up uppercase">Investment thesis</p>
          <ol className="mt-4 grid gap-px border border-line bg-line sm:grid-cols-2">
            {note.thesis.map((t, i) => (
              <li key={t.title} className="bg-panel p-5">
                <span className="num font-mono text-[11px] text-dim">0{i + 1}</span>
                <h3 className="mt-2 font-serif text-2xl leading-tight">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </article>
  );
}
