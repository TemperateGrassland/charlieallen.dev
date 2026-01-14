export default function About() {
  const skills = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"] },
    { category: "Backend", items: ["Node.js", "Python", "REST APIs"] },
    { category: "E-commerce", items: ["Shopify", "Shopify Themes", "Shopify Apps", "WhatsApp Integration"] },
    { category: "Tools", items: ["Git", "GitHub", "VS Code", "AWS", "Docker"] },
  ];

  return (
    <div className="bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            About Me
          </h1>
          <div className="mt-2 h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600" />
        </div>

        {/* Bio Section */}
        <div className="mb-16 rounded-lg border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Hi, I'm Charlie.
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            <p>
              I'm a freelance software engineer specialising in building modern,
              high-performance web applications. With a focus on creating
              exceptional user experiences, I help businesses establish their
              online presence and grow through technology.
            </p>
            <p>
              My expertise spans across full-stack development, with a particular
              passion for React, Next.js, and backend API integration. I
              also specialise in Shopify development, helping e-commerce businesses
              create fast, conversion-optimized stores.
            </p>
            <p>
              When I'm not coding, I'm exploring new technologies.
            </p>
          </div>
        </div>

        {/* Technical Skills */}
        <div>
          <h2 className="mb-8 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Technical Skills
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {skills.map((skillGroup) => (
              <div
                key={skillGroup.category}
                className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <h3 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center text-zinc-700 dark:text-zinc-300"
                    >
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 rounded-lg border border-zinc-200 bg-gradient-to-r from-blue-50 to-purple-50 p-8 text-center dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-900">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Let's Work Together
          </h2>
          <p className="mb-6 text-lg text-zinc-700 dark:text-zinc-300">
            Have a project in mind? I'd love to hear about it.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
