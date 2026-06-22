import Link from "next/link";

const chapters = [
  {
    period: "Amazon Alexa · 4 years",
    title: "I learned to build at scale.",
    body: "I started with a four-year apprenticeship inside Amazon’s Alexa AI organisation. I worked on software used by millions of people every day, where a small mistake reaches a very large audience. It taught me how production systems are really built — and how much care it takes to keep them dependable.",
  },
  {
    period: "Darktrace · 2 years",
    title: "I learned to build it properly.",
    body: "I then spent two years in cybersecurity at Darktrace. Thinking like an attacker changes how you build: you design for the edge cases, assume things will go wrong, and earn trust through rigour rather than hope. That mindset is now part of everything I ship.",
  },
  {
    period: "Now · Independent",
    title: "I build and ship my own software.",
    body: "Today I build software end to end — from the first conversation to a product running in the real world. I’ve learned what it takes to launch something people actually use, not just write the code. That’s the standard I bring to building for other people.",
  },
];

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Python", "REST APIs"] },
  { category: "Infrastructure", items: ["AWS", "Docker", "PostgreSQL"] },
  { category: "Foundations", items: ["AI systems", "Security", "Production reliability"] },
];

export default function About() {
  return (
    <div className="bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
          My story
        </p>
        <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Six years building software that has to work.
        </h1>

        <div className="mt-16 space-y-16">
          {chapters.map((chapter) => (
            <section key={chapter.period}>
              <p className="text-sm font-medium uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-500">
                {chapter.period}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                {chapter.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                {chapter.body}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-24 border-t border-zinc-200 pt-16 dark:border-zinc-900">
          <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
            Tools I work with
          </h2>
          <div className="mt-8 grid gap-10 sm:grid-cols-2">
            {skills.map((group) => (
              <div key={group.category}>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                  {group.category}
                </h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  {group.items.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 border-t border-zinc-200 pt-16 dark:border-zinc-900">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Let’s build something.
          </h2>
          <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
            If you need software built to a high standard, I’d like to hear about it.
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
