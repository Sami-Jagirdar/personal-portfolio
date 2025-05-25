interface ProjectHeroProps {
    title?: string
  }
  
  export function ProjectHero({ title = "Project Exhibition" }: ProjectHeroProps) {
    return (
      <section className="py-4 sm:py-8 bg-primary border-b border-accent">
        <div className="container mx-auto px-4">
          <h1 className="font-primary text-4xl sm:text-5xl md:text-6xl text-center text-white">{title}</h1>
        </div>
      </section>
    )
  }
  
  