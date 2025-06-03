"use client";
import { useEffect, useState } from "react"
import ProjectCard from "@/components/ProjectCard"
import { ProjectHero } from "@/components/ProjectHero"
import { projects } from "./projectsData"

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div 
        className={`transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <ProjectHero />
      </div>
      
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`transition-all duration-1000 ease-out hover:scale-102 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-5'
              }`}
              style={{
                transitionDelay: `${(index * 100) + 300}ms`
              }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Projects