"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ExerciseCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
}

export default function ExerciseCard({ id, title, description, image, techStack }: ExerciseCardProps) {
  return (
    <Link href={`/projects/CMPUT412/${id}`}>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className="group relative bg-black rounded-xl overflow-hidden border border-accent/20 hover:border-accent cursor-pointer"
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
  );
}
