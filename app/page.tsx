import Link from "next/link";
import Image from "next/image";

const chapters = [
  {
    label: "Amazon Alexa",
    detail: "Four years building AI software trusted by millions.",
  },
  {
    label: "Darktrace",
    detail: "Two years in cybersecurity, where reliability isn’t optional.",
  },
  {
    label: "Independent",
    detail: "Now building and shipping software end to end.",
  },
];

export default function Home() {
  return (
    <div className="bg-zinc-50 dark:bg-black">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-6 py-24 sm:py-32">
        <div className="flex items-center gap-4">
          <Image
            src="/charlie.jpg"
            alt="Charlie Allen"
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover ring-1 ring-zinc-200 dark:ring-zinc-800"
            priority
          />
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
            Charlie Allen
          </p>
        </div>

        <h1 className="mt-8 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl md:text-6xl">
          I build software people can rely on.
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Four years building AI at Amazon Alexa. Two years in cybersecurity at
          Darktrace. Now I bring that same standard to building products for the
          people who need them.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-7 py-3 text-base font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Start a conversation
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-full px-7 py-3 text-base font-medium text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
          >
            Read my story →
          </Link>
        </div>
      </div>

      <div className="border-t border-zinc-200 dark:border-zinc-900">
        <div className="mx-auto grid max-w-3xl gap-px px-6 py-16 sm:grid-cols-3">
          {chapters.map((chapter) => (
            <div key={chapter.label} className="sm:px-6 sm:first:pl-0">
              <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                {chapter.label}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                {chapter.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
