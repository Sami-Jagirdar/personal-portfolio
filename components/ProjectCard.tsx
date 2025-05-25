"use client"

import { Github, Globe } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"

interface ProjectCardProps {
  id: string
  title: string
  description: string
  image: string
  techStack: string[]
  links: {
    github?: string
    live?: string
  }
}

export default function ProjectCard({ id, title, description, image, techStack, links }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-card rounded-xl overflow-hidden border border-accent/20 hover:border-accent shadow-xl"
    >
      <Link href={`/projects/${id}`} className="block">
        <div className="aspect-video relative overflow-hidden">
            <Image
            src={image || "/logo.png"}
            alt={title}
            className="object-fit object-top w-full h-full transition-transform duration-300 group-hover:scale-110"
            width={800}
            height={1000}
            />
        </div>
        <div className="p-6 space-y-4">
            <h2 className="font-primary text-2xl h-8 overflow-hidden text-ellipsis whitespace-nowrap">{title}</h2>
            <p className="text-gray-400 h-24 overflow-auto card-scroll">{description}</p>
              <div className="h-16">
                  <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                      <span key={tech} className="px-3 py-1 text-sm bg-accent/10 text-accent rounded-full">
                      {tech}
                      </span>
                  ))}
                  </div>
                </div>
            </div>
        </Link>
        

        <div className="flex gap-4 p-4 sm:p-6 pt-0">
          {links.github && (
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-accent transition-colors"
              aria-label={`View ${title} on GitHub`}
            >
              <Github className="w-6 h-6 sm:w-6 sm:h-6" />
            </a>
          )}
          {links.live && (
            <a
              href={links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-accent transition-colors"
              aria-label={`Visit ${title} website`}
            >
              <Globe className="w-6 h-6 sm:w-6 sm:h-6" />
            </a>
          )}
        </div>
    </motion.div>
  )
}

