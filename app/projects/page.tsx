import ProjectCard from "@/components/ProjectCard"
import { ProjectHero } from "@/components/ProjectHero"
import { projects } from "./projectsData"

const Projects = () => {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <ProjectHero />
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default Projects