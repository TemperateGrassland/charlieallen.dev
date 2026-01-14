import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:text-left">
          {/* Profile Image Placeholder */}
          <div className="flex-shrink-0">
            <div className="h-40 w-40 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 md:h-48 md:w-48" />
          </div>

          {/* Hero Content */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl md:text-6xl">
              Charlie Allen
            </h1>
            <p className="mt-4 text-xl text-zinc-600 dark:text-zinc-400 sm:text-2xl">
              Freelance Software Engineer
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
              I build fast, scalable applications and Shopify integrations that help businesses grow.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                View My Work
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-zinc-300 bg-white px-6 py-3 text-base font-semibold text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats or Highlights */}
        <div className="mt-20 grid gap-8 sm:grid-cols-3">
          <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Six years of industry experience 
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Design, development and maintenance of production grade software.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Full-Stack Developer
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              From REST APIs to responsive mobile frontends — I build end-to-end solutions.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Fast Turnaround
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              I prioritise clean code, clear communication, and on-time delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
