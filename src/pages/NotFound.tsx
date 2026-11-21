import { useLocation } from "react-router-dom";

const NotFound = () => {
  const { pathname } = useLocation();
  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="card-paper w-full max-w-md p-8 text-center">
        <p className="eyebrow">Folio missing</p>
        <p className="mt-3 font-display text-8xl font-semibold italic text-sanguine">404</p>
        <p className="mt-3 text-ink-2">
          There is no page at <span className="font-mono text-[14px] text-ink">{pathname}</span>.
        </p>
        <a href="/" className="mt-6 inline-block rounded-full bg-[var(--ink)] px-5 py-2.5 font-semibold text-[var(--vellum)]">
          Return to the codex
        </a>
      </div>
    </div>
  );
};

export default NotFound;
