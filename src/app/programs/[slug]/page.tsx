import { notFound } from "next/navigation";
import Program from "../../components/Program"; // Adjust path if needed

export default async function ProgramPage({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch(`http://localhost:8080/api/program/${params.slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const program = await res.json();

  return <Program {...program} />;
}
