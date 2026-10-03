type Props = {
  id: string;
  index: number;
  kicker: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
};

/** Shared section frame: numbered like a terminal function key. */
export default function Section({ id, index, kicker, title, lede, children }: Props) {
  return (
    <section id={id} className="border-b border-line py-16 sm:py-24">
      <div className="mx-auto max-w-[1240px] px-4">
        <header className="mb-8 max-w-2xl sm:mb-10" data-reveal>
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
            <span className="mr-2 inline-grid h-5 w-5 place-items-center border border-line-2 text-up">
              {index}
            </span>
            {kicker}
          </p>
          <h2 className="mt-4 font-serif text-[2.25rem] leading-[1.05] font-normal tracking-[-0.02em] text-balance sm:text-6xl">{title}</h2>
          {lede && <p className="mt-4 text-muted sm:text-lg">{lede}</p>}
        </header>
        <div data-reveal style={{ "--i": 1 } as React.CSSProperties}>
          {children}
        </div>
      </div>
    </section>
  );
}
