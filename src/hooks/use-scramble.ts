import { useEffect, useRef, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01ABCDEFabcdef$%&";

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Decodes `text` from random glyphs once `start` turns true. */
export function useScramble(text: string, start = true, duration = 900) {
  const [out, setOut] = useState(() => (reduced() ? text : text.replace(/\S/g, " ")));
  const raf = useRef(0);

  useEffect(() => {
    if (!start) return;
    if (reduced()) { setOut(text); return; }
    const t0 = performance.now();
    const order = text.split("").map(() => Math.random());
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " ") { s += " "; continue; }
        if (order[i] * 0.7 + 0.3 * (i / text.length) < p) s += ch;
        else s += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      setOut(s);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [text, start, duration]);

  return out;
}

/** Types through a list of words, deleting and retyping. */
export function useTypeCycle(words: string[], speed = 70, hold = 1600) {
  const [text, setText] = useState(reduced() ? words[0] : "");
  useEffect(() => {
    if (reduced()) return;
    let i = 0, j = 0, del = false;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      const w = words[i];
      if (!del) {
        j++;
        setText(w.slice(0, j));
        if (j === w.length) { del = true; timer = setTimeout(step, hold); return; }
      } else {
        j--;
        setText(w.slice(0, j));
        if (j === 0) { del = false; i = (i + 1) % words.length; }
      }
      timer = setTimeout(step, del ? speed / 2 : speed);
    };
    timer = setTimeout(step, 400);
    return () => clearTimeout(timer);
  }, [words, speed, hold]);
  return text;
}
