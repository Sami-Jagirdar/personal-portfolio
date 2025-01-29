"use client";
import Image from 'next/image';

export default function Exercise1() {
  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold">Exercise 1 - Duckiebot Operation Basics</h2>
      <p>This exercise involved learning the basic skills and knowledge required to operate a Duckiebot.</p>
      <p className="mt-4">Technologies used: Python, DuckieTown Shell, Docker</p>

      <h3 className="text-xl font-semibold mt-6">Duckiebot Setup</h3>
      <p className="mt-2">The first step was to set up the Duckiebot. This involved connecting to the Duckiebot&apos;s Wi-Fi network and running the DuckieTown Shell.</p>
      <Image src="/ex1-demo.gif" alt="Exercise 1 Demo" className="mt-4 w-full rounded-lg shadow-lg" width={800} height={450} />
      
    </div>
  );
}
