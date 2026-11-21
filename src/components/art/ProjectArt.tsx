/* A small generative "painting" for each project, drawn in the codex palette. */

const P = { paper: "#f1efe8", ink: "#1b1d24", lapis: "#2a4597", sanguine: "#7b2340", ochre: "#b8932f", verd: "#2f6b55", plum: "#5b3a8c" };

const rng = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

function Diamonds() {
  const facets: [string, string][] = [
    ["200,60 260,110 200,110", P.lapis], ["200,60 140,110 200,110", "#3d5fa3"],
    ["140,110 200,110 170,150", "#22407d"], ["200,110 260,110 230,150", "#4a6cb3"],
    ["170,150 200,110 230,150", "#1b3466"], ["140,110 170,150 200,250", "#2f4f91"],
    ["170,150 230,150 200,250", "#3a5ca0"], ["230,150 260,110 200,250", "#203b75"],
  ];
  return (
    <g>
      {facets.map(([pts, c], i) => <polygon key={i} points={pts} fill={c} stroke={P.paper} strokeWidth="1" opacity="0.95" />)}
      <path d="M 120 250 H 280" stroke={P.ochre} strokeWidth="1.5" />
      <text x="200" y="272" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill={P.ink} opacity=".6">price ≈ f(carat, cut, clarity)</text>
      {[0, 1, 2, 3, 4, 5].map((i) => <circle key={i} cx={70 + i * 52} cy={40 + (i % 2) * 14} r="2" fill={P.ochre} />)}
    </g>
  );
}

function Waves() {
  // sound flowing into an ear: the music is shaped for the listener
  const ink = { stroke: P.ink, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <g>
      {Array.from({ length: 7 }, (_, i) => {
        let d = "";
        for (let x = 24; x <= 262; x += 5) {
          const env = Math.sin(((x - 24) / 238) * Math.PI * 0.92 + 0.12);
          const conv = 1 - ((x - 24) / 238) * 0.55; // waves converge toward the ear canal
          const y = 150 + (i - 3) * 13 * conv + Math.sin(x / (14 + i * 2.5) + i * 0.8) * (8 + i * 2) * env;
          d += (x === 24 ? "M" : "L") + ` ${x} ${y.toFixed(1)} `;
        }
        return <path key={i} d={d} stroke={i === 3 ? P.sanguine : P.ink} strokeOpacity={i === 3 ? 0.95 : 0.3} strokeWidth={i === 3 ? 1.8 : 1} fill="none" />;
      })}
      <text x="70" y="96" fontFamily="Cormorant Garamond, serif" fontSize="26" fill={P.sanguine} opacity=".8">♪</text>
      <text x="150" y="212" fontFamily="Cormorant Garamond, serif" fontSize="22" fill={P.ink} opacity=".45">♫</text>
      {/* the ear, in ink, facing the incoming sound */}
      <g transform="translate(286 70)">
        <path {...ink} strokeWidth="2.2" d="M 14 46 C 10 12, 44 -6, 72 8 C 100 22, 104 62, 86 86 C 76 100, 70 108, 70 124 C 70 146, 52 160, 36 152 C 26 147, 22 138, 24 130" />
        <path {...ink} strokeWidth="1.6" d="M 30 44 C 34 24, 60 18, 74 34 C 86 48, 80 66, 66 76 C 58 82, 56 92, 58 102" />
        <path {...ink} strokeWidth="1.6" d="M 40 62 C 46 50, 62 52, 62 64 C 62 74, 50 78, 46 88" />
        <path {...ink} strokeWidth="1.8" d="M 18 82 C 26 76, 34 84, 30 94 C 27 101, 20 102, 16 98" />
        <path {...ink} strokeWidth="1.4" d="M 36 132 C 44 136, 52 132, 54 124" opacity=".7" />
        <path d="M 4 76 l -8 -4 M 4 86 l -10 0 M 4 96 l -8 4" stroke={P.sanguine} strokeWidth="1.6" strokeLinecap="round" />
      </g>
    </g>
  );
}

function Routes() {
  // a stable-matching map on the left, the swipe-to-match phone on the right
  const r = rng(7);
  const pts = Array.from({ length: 7 }, () => [30 + r() * 170, 40 + r() * 220]);
  return (
    <g>
      {[70, 130, 190, 250].map((y) => <path key={y} d={`M 0 ${y} Q 120 ${y - 16} 240 ${y}`} stroke={P.ink} strokeOpacity=".1" fill="none" />)}
      <path d="M 34 230 C 70 150, 120 230, 150 150 S 200 80, 222 70" stroke={P.plum} strokeWidth="2" strokeDasharray="6 6" fill="none" />
      <path d="M 50 70 C 90 140, 140 60, 190 210" stroke={P.sanguine} strokeWidth="2" strokeDasharray="2 6" strokeLinecap="round" fill="none" />
      {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 3 ? 3 : 5.5} fill={i % 3 ? P.ink : P.plum} opacity={i % 3 ? 0.45 : 0.9} />)}

      <g transform="translate(250 28)">
        <rect x="0" y="0" width="124" height="246" rx="20" fill={P.ink} />
        <rect x="6" y="6" width="112" height="234" rx="15" fill="#faf8f2" />
        <rect x="46" y="12" width="32" height="6" rx="3" fill={P.ink} opacity=".85" />
        <text x="62" y="36" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontWeight="700" fontSize="14" fill={P.plum}>VoyagR</text>

        <rect x="20" y="52" width="84" height="122" rx="9" fill="#ece8dd" transform="rotate(-5 62 113)" />
        <g>
          <animateTransform attributeName="transform" type="rotate" values="-7 62 200; 7 62 200; -7 62 200" dur="5s" repeatCount="indefinite" />
          <rect x="18" y="48" width="88" height="128" rx="10" fill="#fff" stroke="#d9d6cd" />
          <rect x="24" y="54" width="76" height="62" rx="7" fill={P.lapis} opacity=".16" />
          <circle cx="62" cy="78" r="13" fill={P.lapis} opacity=".55" />
          <path d="M 40 112 C 46 96, 78 96, 84 112" fill={P.lapis} opacity=".55" />
          <rect x="26" y="124" width="48" height="6" rx="3" fill={P.ink} opacity=".75" />
          <rect x="26" y="136" width="66" height="4" rx="2" fill={P.ink} opacity=".3" />
          <rect x="26" y="146" width="40" height="4" rx="2" fill={P.ink} opacity=".3" />
          <text x="26" y="166" fontFamily="JetBrains Mono, monospace" fontSize="7" fill={P.verd}>Lisbon · $800</text>
        </g>

        <g transform="translate(36 206)">
          <circle r="15" fill="#fff" stroke={P.sanguine} strokeWidth="1.6" />
          <path d="M -5 -5 L 5 5 M 5 -5 L -5 5" stroke={P.sanguine} strokeWidth="2.2" strokeLinecap="round" />
        </g>
        <g transform="translate(88 206)">
          <circle r="15" fill="#fff" stroke={P.verd} strokeWidth="1.6" />
          <path d="M -6 0 L -2 5 L 6 -5" stroke={P.verd} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
      <path d="M 238 120 q -10 10 0 20" stroke={P.sanguine} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M 386 120 q 10 10 0 20" stroke={P.verd} strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </g>
  );
}

function Stars() {
  // twin suns over the dunes, sabers crossed, in the same ink-on-paper hand as the rest
  const r = rng(42);
  return (
    <g>
      <defs>
        <filter id="sw-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      {Array.from({ length: 34 }, (_, i) => (
        <circle key={i} cx={r() * 400} cy={r() * 110} r={r() * 1 + 0.4} fill={P.ink} opacity={0.15 + r() * 0.3} />
      ))}
      <circle cx="262" cy="150" r="30" fill={P.ochre} opacity=".28" />
      <circle cx="262" cy="150" r="30" fill="none" stroke={P.ochre} strokeWidth="1.4" />
      <circle cx="318" cy="170" r="17" fill={P.ochre} opacity=".42" />
      <circle cx="318" cy="170" r="17" fill="none" stroke={P.ochre} strokeWidth="1.4" />
      <path d="M 0 196 C 60 176, 120 190, 180 200 S 300 180, 400 194" stroke={P.ink} strokeOpacity=".55" strokeWidth="1.4" fill="none" />
      <path d="M 0 222 C 80 206, 150 226, 230 220 S 340 210, 400 224" stroke={P.ink} strokeOpacity=".4" strokeWidth="1.2" fill="none" />
      <path d="M 0 250 C 90 240, 190 258, 280 248 S 360 244, 400 252" stroke={P.ink} strokeOpacity=".28" strokeWidth="1" fill="none" />
      {Array.from({ length: 22 }, (_, i) => (
        <path key={i} d={`M ${20 + i * 17} ${232 + (i % 3) * 8} l 8 0`} stroke={P.ink} strokeOpacity=".18" strokeLinecap="round" />
      ))}
      <path d="M 54 202 a 20 13 0 0 1 40 0" stroke={P.ink} strokeOpacity=".7" strokeWidth="1.4" fill="none" />
      <path d="M 118 200 v -36 M 113 172 h 10 M 111 182 h 14 M 114 166 h 8" stroke={P.ink} strokeOpacity=".7" strokeWidth="1.6" strokeLinecap="round" />
      <g strokeLinecap="round">
        <path d="M 132 262 L 262 92" stroke={P.lapis} strokeWidth="9" filter="url(#sw-glow)" opacity=".45" />
        <path d="M 132 262 L 262 92" stroke={P.lapis} strokeWidth="2.6" />
        <path d="M 288 262 L 158 92" stroke={P.sanguine} strokeWidth="9" filter="url(#sw-glow)" opacity=".45" />
        <path d="M 288 262 L 158 92" stroke={P.sanguine} strokeWidth="2.6" />
        <path d="M 118 280 L 134 260" stroke={P.ink} strokeWidth="7" />
        <path d="M 302 280 L 286 260" stroke={P.ink} strokeWidth="7" />
        <path d="M 129 264 l 8 6 M 291 264 l -8 6" stroke={P.ochre} strokeWidth="2" />
      </g>
      <circle cx="210" cy="160" r="6" fill="#fff" filter="url(#sw-glow)" />
    </g>
  );
}

function Ledger() {
  const bars = [60, 90, 70, 120, 100, 150, 130, 175];
  return (
    <g>
      {[80, 130, 180, 230].map((y) => <path key={y} d={`M 40 ${y} H 360`} stroke={P.ink} strokeOpacity=".12" />)}
      {bars.map((h, i) => <rect key={i} x={52 + i * 38} y={250 - h} width="22" height={h} fill={i === bars.length - 1 ? P.verd : P.ink} opacity={i === bars.length - 1 ? 1 : 0.18 + i * 0.05} />)}
      <path d={"M " + bars.map((h, i) => `${i ? "L " : ""}${63 + i * 38} ${250 - h - 18}`).join(" ")} stroke={P.verd} strokeWidth="2" fill="none" />
      <circle cx={63 + 7 * 38} cy={250 - 175 - 18} r="5" fill={P.verd} />
    </g>
  );
}

function FeatureMap() {
  const r = rng(11);
  return (
    <g>
      {Array.from({ length: 6 }, (_, row) =>
        Array.from({ length: 10 }, (_, col) => {
          const v = r();
          return <rect key={`${row}-${col}`} x={50 + col * 30} y={50 + row * 30} width="26" height="26" fill={v > 0.7 ? P.sanguine : v > 0.4 ? P.ochre : P.ink} opacity={v > 0.7 ? 0.9 : v > 0.4 ? 0.55 : 0.12} />;
        }),
      )}
      <text x="200" y="272" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill={P.ink} opacity=".6">conv2d → pool → 92% acc</text>
    </g>
  );
}

const ART: Record<string, () => JSX.Element> = {
  superbDiamonds: Diamonds,
  melodyMind: Waves,
  voyagr: Routes,
  starWars: Stars,
  moneyTrack: Ledger,
  anodeClassifier: FeatureMap,
};

export default function ProjectArt({ id, className }: { id: string; className?: string }) {
  const A = ART[id] ?? Waves;
  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill={P.paper} />
      <A />
    </svg>
  );
}
