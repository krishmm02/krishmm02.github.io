import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data/content";
import Folder from "@/components/shell/Folder";
import { Quill, WaxSeal } from "@/components/art/Doodles";

const inline =
  "mx-1 inline-block min-w-[9ch] max-w-full border-b-[1.5px] border-dashed border-[var(--rule-2)] bg-transparent px-1 font-display text-[1.15em] italic text-lapis outline-none transition placeholder:text-[var(--rule-2)] focus:border-[var(--lapis)]";

export default function Contact() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [sealed, setSealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  const send = (e?: React.FormEvent) => {
    e?.preventDefault();
    setSealed(true);
    const subject = `Hello from ${name || "a reader of your portfolio"}${company ? `, ${company}` : ""}`;
    const body = `Dear Krish,\n\n${message || "I'd like to talk about a role."}\n\nYours,\n${name}${company ? `\n${company}` : ""}`;
    setTimeout(() => {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }, 650);
  };

  const copy = () =>
    navigator.clipboard?.writeText(profile.email).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1600); }).catch(() => {});

  const links = [
    { k: "Email", v: profile.email, href: `mailto:${profile.email}` },
    { k: "LinkedIn", v: "in/krish-mehta", href: profile.linkedin },
    { k: "GitHub", v: `@${profile.handle}`, href: profile.github },
    { k: "Phone", v: profile.phone, href: profile.phoneHref },
  ];

  return (
    <>
      <Folder
        id="contact"
        index={6}
        numeral="VII"
        label="Correspondence"
        code="POST /hire"
        title={<>Write to me. <em className="text-sanguine">Let's talk about the role.</em></>}
        doodle={<Quill className="w-20" />}
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-14">
          <form
            onSubmit={send}
            className="relative rotate-[-0.4deg] rounded-[3px] border border-rule bg-[var(--vellum)] px-6 py-8 shadow-[0_30px_50px_-30px_rgba(30,32,45,.6)] sm:px-10 sm:py-10"
            style={{ backgroundImage: "repeating-linear-gradient(transparent 0 35px, rgba(43,74,139,.08) 35px 36px)" }}
          >
            <p className="text-right font-display text-lg italic text-muted-ink">Baltimore, {today}</p>
            <p className="mt-6 font-display text-[28px] font-semibold italic text-ink">Dear Krish,</p>
            <div className="mt-4 text-[17px] leading-[2.2] text-ink-2">
              My name is
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="your name" className={inline} aria-label="Your name" size={Math.max(9, name.length)} />
              and I'm writing from
              <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="your company" className={inline} aria-label="Your company" size={Math.max(11, company.length)} />.
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="We're hiring for a role that fits your background…"
              aria-label="Message"
              className="mt-3 w-full resize-none bg-transparent font-display text-[21px] italic leading-[36px] text-lapis outline-none placeholder:text-[var(--rule-2)]"
            />
            <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
              <p className="font-display text-xl italic text-ink-2">
                Yours,
                <br />
                <span className="text-lapis">{name || "………"}</span>
              </p>
              <button type="submit" className="group flex items-center gap-3" aria-label="Seal and send the letter">
                <span className="text-[14px] font-semibold text-ink transition group-hover:text-sanguine">Seal &amp; send</span>
                <motion.span
                  animate={sealed ? { scale: [1.6, 0.9, 1], rotate: [-30, 6, -10] } : { scale: 1, rotate: -10 }}
                  transition={{ duration: 0.5 }}
                  className="block w-16 drop-shadow-[0_6px_6px_rgba(90,20,0,.35)]"
                >
                  <WaxSeal className="w-16" />
                </motion.span>
              </button>
            </div>
            <AnimatePresence>
              {sealed && (
                <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-[13.5px] text-verdigris">
                  Sealed. Your mail app should open with the letter ready to send.
                </motion.p>
              )}
            </AnimatePresence>
          </form>

          <div>
            <p className="eyebrow mb-3">Or reach me directly</p>
            <ul className="divide-y divide-[var(--rule-2)] border-y border-rule-2">
              {links.map((l) => (
                <li key={l.k}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-baseline justify-between gap-4 py-4"
                  >
                    <span className="text-[13px] font-semibold uppercase tracking-[0.1em] text-muted-ink">{l.k}</span>
                    <span className="truncate font-display text-[22px] font-semibold text-ink transition group-hover:text-lapis">
                      {l.v} <span className="inline-block transition group-hover:translate-x-1">→</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <button onClick={copy} className="ink-link mt-4 text-[14px] font-semibold">
              {copied ? "✓ Email copied" : "Copy email address"}
            </button>
            <p className="mt-8 font-hand text-[22px] leading-7 text-muted-ink">
              Based in {profile.location}, open to SWE, ML and full-stack roles.
            </p>
          </div>
        </div>
      </Folder>

    </>
  );
}
