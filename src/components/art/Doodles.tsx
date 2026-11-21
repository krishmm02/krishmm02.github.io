import { motion, type SVGMotionProps } from "framer-motion";
import type { ReactNode } from "react";

/* Ink doodles in the manner of a Renaissance notebook. Every stroke draws itself in
   when it scrolls into view. Stroke colour follows `currentColor`. */

const ease = [0.65, 0, 0.35, 1] as const;

export function Ink({
  d,
  delay = 0,
  dur = 1.6,
  width = 1.2,
  ...rest
}: { d: string; delay?: number; dur?: number; width?: number } & Omit<SVGMotionProps<SVGPathElement>, "d">) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ pathLength: { duration: dur, delay, ease }, opacity: { duration: 0.2, delay } }}
      {...rest}
    />
  );
}

const Svg = ({ children, className, viewBox }: { children: ReactNode; className?: string; viewBox: string }) => (
  <svg viewBox={viewBox} className={className} aria-hidden fill="none">
    {children}
  </svg>
);

const circle = (cx: number, cy: number, r: number) =>
  `M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${r * 2} 0 a ${r} ${r} 0 1 0 ${-r * 2} 0`;

/** Construction lines behind the hero name: circle, square, diagonals, compass arcs. */
export function Vitruvian({ className }: { className?: string }) {
  return (
    <Svg viewBox="0 0 420 420" className={className}>
      <Ink d={circle(210, 210, 180)} dur={2.4} width={1} />
      <Ink d="M 50 70 H 370 V 390 H 50 Z" dur={2.2} delay={0.3} width={1} />
      <Ink d="M 50 70 L 370 390 M 370 70 L 50 390" dur={1.6} delay={0.8} width={0.7} strokeDasharray="3 5" />
      <Ink d="M 210 20 V 400 M 20 210 H 400" dur={1.4} delay={1} width={0.7} />
      <Ink d={circle(210, 210, 90)} dur={1.8} delay={1.2} width={0.8} />
      <Ink d="M 120 300 A 130 130 0 0 1 300 300" dur={1.2} delay={1.6} width={0.8} />
      <Ink d="M 196 210 h 28 M 210 196 v 28" dur={0.5} delay={2} width={1.2} />
    </Svg>
  );
}

function gearPath(cx: number, cy: number, r: number, teeth: number, depth: number) {
  let d = "";
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const pts = [
      [a, r], [a + step * 0.15, r + depth], [a + step * 0.45, r + depth], [a + step * 0.6, r], [a + step, r],
    ];
    pts.forEach(([ang, rad], j) => {
      const x = cx + Math.cos(ang) * rad, y = cy + Math.sin(ang) * rad;
      d += (i === 0 && j === 0 ? "M" : "L") + ` ${x.toFixed(1)} ${y.toFixed(1)} `;
    });
  }
  return d + "Z";
}

export function Gears({ className }: { className?: string }) {
  return (
    <Svg viewBox="0 0 220 160" className={className}>
      <g className="origin-[70px_80px] animate-[spin_40s_linear_infinite] motion-reduce:animate-none">
        <Ink d={gearPath(70, 80, 46, 14, 9)} dur={2} />
        <Ink d={circle(70, 80, 14)} delay={0.4} />
        <Ink d="M 70 34 V 126 M 24 80 H 116" delay={0.6} width={0.7} />
      </g>
      <g className="origin-[160px_60px] animate-[spin_28s_linear_infinite_reverse] motion-reduce:animate-none">
        <Ink d={gearPath(160, 60, 28, 10, 7)} delay={0.5} dur={1.6} />
        <Ink d={circle(160, 60, 8)} delay={0.9} />
      </g>
    </Svg>
  );
}

export function CompassRose({ className, needle = 0 }: { className?: string; needle?: number }) {
  return (
    <Svg viewBox="0 0 200 200" className={className}>
      <Ink d={circle(100, 100, 88)} dur={1.6} />
      <Ink d={circle(100, 100, 78)} dur={1.6} delay={0.2} width={0.7} />
      <Ink d="M 100 12 L 110 90 L 188 100 L 110 110 L 100 188 L 90 110 L 12 100 L 90 90 Z" dur={2} delay={0.4} width={0.9} />
      <Ink d="M 38 38 L 96 96 M 162 38 L 104 96 M 38 162 L 96 104 M 162 162 L 104 104" dur={1} delay={1} width={0.6} />
      <g
        style={{
          transform: `rotate(${needle}deg)`,
          transformOrigin: "100px 100px",
          transition: "transform 1.1s cubic-bezier(.34,1.56,.64,1)",
        }}
      >
        <path d="M 100 30 L 106 100 L 100 108 L 94 100 Z" fill="var(--wine)" />
        <path d="M 100 170 L 106 100 L 100 92 L 94 100 Z" fill="currentColor" opacity={0.5} />
      </g>
      <circle cx="100" cy="100" r="4" fill="currentColor" />
    </Svg>
  );
}

export function Laurel({ className }: { className?: string }) {
  const leaves = (side: 1 | -1) => {
    let d = "";
    for (let i = 0; i < 8; i++) {
      const t = 0.15 + i * 0.1;
      const a = Math.PI * (0.5 + side * (0.15 + t * 0.85));
      const x = 100 + Math.cos(a) * 70, y = 100 + Math.sin(a) * 70;
      const o = a + side * 0.9;
      const x2 = x + Math.cos(o) * 18, y2 = y + Math.sin(o) * 18;
      d += `M ${x.toFixed(1)} ${y.toFixed(1)} Q ${(x + x2) / 2 + 6 * side} ${(y + y2) / 2 - 6} ${x2.toFixed(1)} ${y2.toFixed(1)} Q ${(x + x2) / 2 - 6 * side} ${(y + y2) / 2 + 6} ${x.toFixed(1)} ${y.toFixed(1)} `;
    }
    return d;
  };
  return (
    <Svg viewBox="0 0 200 200" className={className}>
      <Ink d="M 100 172 A 70 70 0 0 1 40 60" dur={1.2} />
      <Ink d="M 100 172 A 70 70 0 0 0 160 60" dur={1.2} />
      <Ink d={leaves(1)} dur={2} delay={0.4} width={1} />
      <Ink d={leaves(-1)} dur={2} delay={0.4} width={1} />
    </Svg>
  );
}

export function Quill({ className }: { className?: string }) {
  return (
    <Svg viewBox="0 0 120 200" className={className}>
      <Ink d="M 20 190 C 40 140, 60 80, 108 10" dur={1.4} width={1.4} />
      <Ink d="M 108 10 C 80 30, 50 70, 38 130 C 60 110, 86 70, 108 10" dur={1.6} delay={0.3} />
      <Ink d="M 52 92 l 14 -6 M 46 112 l 16 -6 M 60 72 l 12 -6 M 70 54 l 10 -5" dur={0.8} delay={1} width={0.8} />
      <Ink d="M 14 196 q 10 -4 16 -14" dur={0.4} delay={1.6} width={1.6} />
    </Svg>
  );
}

export function Squiggle({ className }: { className?: string }) {
  return (
    <Svg viewBox="0 0 300 20" className={className}>
      <Ink d="M 4 12 C 40 2, 70 18, 110 9 S 180 2, 220 11 S 280 14, 296 6" dur={1} width={2.2} />
    </Svg>
  );
}

export function Arrow({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <Svg viewBox="0 0 120 80" className={className}>
      <g transform={flip ? "translate(120 0) scale(-1 1)" : undefined}>
        <Ink d="M 8 10 C 30 60, 70 70, 108 52" dur={0.9} width={1.4} />
        <Ink d="M 94 42 L 109 52 L 92 62" dur={0.4} delay={0.8} width={1.4} />
      </g>
    </Svg>
  );
}

export function Sparkle({ className }: { className?: string }) {
  return (
    <Svg viewBox="0 0 40 40" className={className}>
      <Ink d="M 20 2 C 21 14, 26 19, 38 20 C 26 21, 21 26, 20 38 C 19 26, 14 21, 2 20 C 14 19, 19 14, 20 2 Z" dur={0.8} width={1} />
    </Svg>
  );
}

export function WaxSeal({ className, label = "KM" }: { className?: string; label?: string }) {
  let d = "";
  for (let i = 0; i <= 36; i++) {
    const a = (i / 36) * Math.PI * 2;
    const r = 44 + Math.sin(i * 2.7) * 2.5 + Math.cos(i * 1.3) * 1.5;
    d += (i ? "L" : "M") + ` ${(50 + Math.cos(a) * r).toFixed(1)} ${(50 + Math.sin(a) * r).toFixed(1)} `;
  }
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path d={d + "Z"} fill="var(--wine)" />
      <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(255,235,220,.35)" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="27" fill="none" stroke="rgba(60,10,0,.25)" strokeWidth="1" />
      <text
        x="50"
        y={label.length > 2 ? 55.5 : 58}
        textAnchor="middle"
        fontFamily="Cormorant Garamond, serif"
        fontWeight="700"
        fontStyle={label.length > 2 ? "normal" : "italic"}
        fontSize={label.length > 3 ? 15 : label.length > 2 ? 18 : 24}
        letterSpacing={label.length > 2 ? 0.6 : 0}
        fill="rgba(255,235,220,.88)"
      >
        {label}
      </text>
    </svg>
  );
}
