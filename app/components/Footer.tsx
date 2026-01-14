export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            © {currentYear} Charlie Allen. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="https://github.com/TemperateGrassland"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/charlie-allen-52147110a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              LinkedIn
            </a>
            <a
              href="mailto:hello@charlieallen.dev"
              className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
