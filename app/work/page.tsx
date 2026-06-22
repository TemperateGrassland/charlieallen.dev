import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How I Work",
  description:
    "How I approach building software — from the first conversation to a product running in the real world.",
};

const principles = [
  {
    title: "Understand before building",
    body: "Most software fails because it solves the wrong problem. I start with the people who’ll use it and the outcome you’re actually after, then work backwards to the simplest thing that gets there.",
  },
  {
    title: "Build for the real world",
    body: "Coming from AI at scale and from security, I design for the cases that go wrong, not just the happy path. The result is software that holds up once real people start using it.",
  },
  {
    title: "Ship, then improve",
    body: "I’d rather get something dependable in front of users early than disappear for months. We launch, learn from how it’s used, and refine — with clear communication the whole way.",
  },
  {
    title: "Own the whole thing",
    body: "I build my own products end to end, so I’m comfortable across the stack — frontend, backend, infrastructure, and the unglamorous details of getting something live and keeping it running.",
  },
];

const offerings = [
  "Web applications, built from scratch or improved",
  "APIs and backend systems",
  "Integrations between the tools you already use",
  "Turning an idea or prototype into a real product",
];

export default function Work() {
  return (
    <div className="bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
          How I work
        </p>
        <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          A way of working, not a portfolio.
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          What matters isn’t a gallery of past projects — it’s whether your
          software gets built properly and actually ships. Here’s how I approach
          that.
        </p>

        <div className="mt-16 space-y-14">
          {principles.map((principle, index) => (
            <section key={principle.title} className="flex gap-6">
              <span className="text-sm font-semibold tabular-nums text-zinc-400 dark:text-zinc-600">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {principle.title}
                </h2>
                <p className="mt-3 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {principle.body}
                </p>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-24 border-t border-zinc-200 pt-16 dark:border-zinc-900">
          <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
            What I can build
          </h2>
          <ul className="mt-8 space-y-4">
            {offerings.map((offering) => (
              <li
                key={offering}
                className="flex items-start gap-3 text-lg text-zinc-700 dark:text-zinc-300"
              >
                <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                {offering}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-24 border-t border-zinc-200 pt-16 dark:border-zinc-900">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Have something in mind?
          </h2>
          <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
            Tell me what you’re trying to build and I’ll tell you honestly how I
            can help.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-zinc-900 px-7 py-3 text-base font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Start a conversation
          </Link>
        </div>
      </div>
    </div>
  );
}
