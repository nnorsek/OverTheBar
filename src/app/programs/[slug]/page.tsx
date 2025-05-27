import { notFound } from "next/navigation";
import Program from "../../components/Program";

// Simulated DB or backend fetch logic
const programSections = [
  { label: "Warm-Up", time: 0 },
  { label: "Skill Explanation", time: 60 },
  { label: "Workout Routine", time: 120 },
  { label: "Cooldown", time: 180 },
];

const programData = {
  beginner: {
    title: "Beginner Program",
    description: "Start your journey with foundational calisthenics.",
    videoSrc: "https://www.youtube.com/embed/kuUZYUBHryw",
    level: "Beginner",
    sections: programSections,
  },
};

export default async function ProgramPage({
  params,
}: {
  params: { slug: string };
}) {
  // Simulate backend call delay
  const slug = params.slug;
  const program = programData[slug as keyof typeof programData];

  if (!program) return notFound();

  return <Program {...program} />;
}
