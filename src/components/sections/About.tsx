import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import portrait from "@/assets/portrait.jpg";
import { profile } from "@/data/content";
import Folder from "@/components/shell/Folder";
import { Gears, Sparkle } from "@/components/art/Doodles";

const RAMP = " .,:;-=+*cox%#&@";

/** Renders the portrait as ink characters: darker pixels get denser glyphs. */
function AsciiCanvas({ src }: { src: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const img = new Image();
    img.src = src;
    let cancelled = false;

    const draw = () => {
      if (cancelled || !img.complete) return;
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      const ctx = canvas.getContext("2d")!;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = w < 360 ? 62 : 84;
      const cell = w / cols;
      const rows = Math.floor(h / (cell * 1.6));
      const sample = document.createElement("canvas");
      sample.width = cols;
      sample.height = rows;
      const sctx = sample.getContext("2d")!;
      sctx.drawImage(img, 0, 0, cols, rows);
      const px = sctx.getImageData(0, 0, cols, rows).data;
      const lum = new Float32Array(cols * rows);
      let lo = 1, hi = 0;
      for (let k = 0; k < cols * rows; k++) {
        const v = (0.299 * px[k * 4] + 0.587 * px[k * 4 + 1] + 0.114 * px[k * 4 + 2]) / 255;
        lum[k] = v;
        lo = Math.min(lo, v);
        hi = Math.max(hi, v);
      }
      const span = Math.max(0.05, hi - lo);
      ctx.clearRect(0, 0, w, h);
      ctx.font = `600 ${cell * 1.3}px "JetBrains Mono", monospace`;
      ctx.textBaseline = "top";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const dark = 1 - Math.pow((lum[y * cols + x] - lo) / span, 0.9);
          const ch = RAMP[Math.min(RAMP.length - 1, Math.floor(dark * RAMP.length))];
          if (ch === " ") continue;
          ctx.fillStyle = dark > 0.82 ? `rgba(42,69,151,${0.55 + dark * 0.4})` : `rgba(33,28,23,${0.2 + dark * 0.75})`;
          ctx.fillText(ch, x * cell, y * cell * 1.6);
        }
      }
    };
    img.onload = draw;
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => { cancelled = true; ro.disconnect(); };
  }, [src]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}

const facts = [
  ["Based in", profile.location],
  ["Studying", "M.S. Computer Science, UMBC · 4.0 GPA"],
  ["Shipping since", "2023 · four companies"],
  ["Strongest in", "Python, PyTorch, Flask & FastAPI, AWS, PostgreSQL, Redis, React"],
  ["Researching", "LLM routing and ensembles, with Dr. Lara Martin"],
  ["Looking for", "Software, ML and AI engineering roles"],
];

export default function About() {
  const frame = useRef<HTMLDivElement>(null);
  const inView = useInView(frame, { once: true, margin: "-120px" });
  const [mode, setMode] = useState<"ascii" | "photo">("ascii");
  const toggle = () => setMode((m) => (m === "ascii" ? "photo" : "ascii"));

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setMode("photo"), 1500);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <Folder
      id="about"
      index={0}
      numeral="I"
      label="Portrait"
      code="about.md"
      title={<>An engineer who works <em className="text-sanguine">between the API and the model.</em></>}
      doodle={<Gears className="w-44" />}
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
        <figure className="mx-auto w-full max-w-[400px]">
          <div ref={frame} className="gilt">
            <div className="gilt-inner">
              <div
                className="relative aspect-[4/5] cursor-pointer overflow-hidden bg-[var(--vellum)]"
                onClick={toggle}
                role="button"
                tabIndex={0}
                aria-label="Toggle between ASCII and photo portrait"
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } }}
              >
                <AsciiCanvas src={portrait} />
                <img
                  src={portrait}
                  alt="Portrait of Krish Mehta"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    filter: "sepia(.28) contrast(1.02)",
                    clipPath: mode === "photo" ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
                    transition: "clip-path 1.2s cubic-bezier(0.65,0,0.35,1)",
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-x-0 h-[2px] bg-[var(--sanguine)] shadow-[0_0_12px_rgba(42,69,151,.6)]"
                  style={{ top: mode === "photo" ? "100%" : "0%", opacity: mode === "photo" ? 0 : 1, transition: "top 1.2s cubic-bezier(0.65,0,0.35,1), opacity 1.2s" }}
                />
              </div>
            </div>
          </div>
          <figcaption className="mx-auto mt-6 w-[86%] border border-rule-2 bg-[var(--vellum)] px-5 py-4 text-center shadow-[0_10px_20px_-16px_rgba(30,32,45,.6)]">
            <p className="font-display text-xl font-semibold italic text-ink">Portrait of the Engineer</p>
            <p className="mt-1 text-[12.5px] text-muted-ink">Ink on silicon, then silver on paper · 2026</p>
            <div className="mt-3 flex justify-center gap-1 text-[12px]">
              {(["ascii", "photo"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  aria-pressed={mode === m}
                  className={`rounded-full px-3 py-0.5 font-mono transition ${mode === m ? "bg-[var(--ink)] text-[var(--vellum)]" : "text-muted-ink hover:text-ink"}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </figcaption>
        </figure>

        <div className="min-w-0">
          <div className="space-y-5 text-[17px] leading-[1.75] text-ink-2 md:text-[18px]">
            {profile.about.map((p, i) => (
              <p
                key={i}
                className={i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[4.6rem] first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-sanguine" : ""}
              >
                {p}
              </p>
            ))}
          </div>

          <dl className="mt-10 divide-y divide-[var(--rule-2)] border-y border-rule-2">
            {facts.map(([k, v]) => (
              <div key={k} className="grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-[150px_1fr] sm:gap-6">
                <dt className="eyebrow pt-1">{k}</dt>
                <dd className="text-[16px] font-medium text-ink">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex items-start gap-3 text-muted-ink">
            <Sparkle className="mt-1 w-5 shrink-0 text-[var(--ochre)]" />
            <p className="font-hand text-[22px] leading-7">
              Click the portrait. It starts as thousands of characters, the way I like to start most things: from the raw data.
            </p>
          </div>
        </div>
      </div>
    </Folder>
  );
}
