"use client";
import Image from 'next/image';

export default function Exercise1() {
  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold">Exercise 1 - Duckiebot Operation Basics</h2>
      <p>This exercise involved implementing A* pathfinding for the Duckiebot.</p>
      <Image src="/ex1-demo.gif" alt="Exercise 1 Demo" className="mt-4 w-full rounded-lg shadow-lg" width={800} height={450} />
      <p className="mt-4">Technologies used: Python, DuckieTown Shell, Docker</p>
    </div>
  );
}
