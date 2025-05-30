"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ExerciseCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  links: {
    github?: string
  }
}

export default function ExerciseCard({ id, title, description, image, techStack, links }: ExerciseCardProps) {
  return (
    <div className="group relative bg-gradient-to-br from-zinc-950 to-zinc-800 rounded-xl overflow-hidden border border-accent/20 hover:border-accent shadow-xl">
      <Link href={`/projects/CMPUT412/${id}`}>
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              width={800}
              height={1000}
            />
          </div>
          <div className="p-4 sm:p-6 space-y-2 sm:space-y-4">
            <h2 className="font-primary text-xl sm:text-2xl">{title}</h2>
            <p className="text-gray-400 text-sm sm:text-base">{description}</p>

            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span key={tech} className="px-2 py-1 text-xs sm:text-sm bg-accent/10 text-accent rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </Link>
      
      <div className="flex gap-2 p-2 sm:p-3 pt-0">
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
      </div>
    </div>
    
  );
}
