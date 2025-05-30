interface ProjectHeroProps {
    title?: string
  }
  
  export function ProjectHero({ title = "Project Exhibition" }: ProjectHeroProps) {
    return (
      <section className="py-2 sm:py-6 bg-zinc-950 border-b border-accent">
        <div className="container mx-auto px-4">
          <h1 className="font-primary text-4xl sm:text-5xl md:text-6xl text-center text-white">{title}</h1>
        </div>
      </section>
    )
  }
  
  