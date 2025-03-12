"use client";

import { useRouter } from "next/navigation";
import Exercise1 from "../exercises/ex1";
import Exercise2 from "../exercises/ex2";
import Exercise3 from "../exercises/ex3";
import ExerciseModal from "@/components/Exercise412Modal";
import { use } from "react";

const exerciseComponents: Record<string, React.FC> = {
  ex1: Exercise1,
  ex2: Exercise2,
  ex3: Exercise3,
};

export default function ExercisePage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params); // This should now work correctly
    const ExerciseComponent = exerciseComponents[id];

    if (!ExerciseComponent) return <div className="text-white">Exercise not found</div>;

    return (
        <ExerciseModal onClose={() => router.push("/projects/CMPUT412")}>
            <ExerciseComponent />
        </ExerciseModal>
    );
}