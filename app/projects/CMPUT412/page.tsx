"use client"

import { ProjectHero } from "@/components/ProjectHero"
import ExerciseCard from "@/components/Exercise412Card"
import { exercises } from "./exerciseData"

export default function CMPUT412Page() {


  return (
    <main className="min-h-screen bg-primary text-white">
      <ProjectHero title="CMPUT 412 Exercises" />
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} {...exercise} />
          ))}
        </div>
      </section>
    </main>
  )
}

