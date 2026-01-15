import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const projects = [
    {
      title: "never forget",
      description:
        "never forget is a reminder service built on Whatsapp. It helps people stay on top of what matters—without complexity or friction.\n\nIt's designed around real-world use: fast to load, easy to understand, and intuitive to use across devices. Every interaction is intentional, from creating reminders to checking off tasks, ensuring users can focus on their day rather than the tool itself.\n\nBehind the scenes, the platform is built to be dependable and scalable, making it well-suited for individuals, teams, and organisations that value clarity, consistency, and a strong customer experience.",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      githubUrl: "https://github.com/TemperateGrassland/never-forget",
      demoUrl: "https://neverforget.one",
    },
    {
      title: "Years of professional experience",
      description:
        "My experience spans designing backend APIs, building responsive user interfaces, and running software in live environments where downtime isn’t an option. \n\nI’ve worked closely with product, platform, and data teams to turn requirements into dependable systems that are easy to use and easy to maintain.\n\nThis background shapes how I approach freelance work: clear communication, sensible technical decisions, and a strong focus on the people who will actually use the software—whether that’s customers, internal teams, or volunteers.",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    },
  ];

  return (
    <div className="bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            My Projects
          </h1>
          <p className="mt-4 text-lg text-zinc-700 dark:text-zinc-300">
            A collection of my recent work
          </p>
          <div className="mt-4 h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600" />
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              githubUrl={project.githubUrl}
              demoUrl={project.demoUrl}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 rounded-lg border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            More Projects Coming Soon
          </h2>
          <p className="mb-6 text-zinc-700 dark:text-zinc-300">
            I'm constantly working on new projects and exploring innovative
            solutions. Check back regularly for updates!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Discuss Your Project
          </a>
        </div>
      </div>
    </div>
  );
}
