import { CheckCircle2 } from "lucide-react";

export function LearningPoints({ points }: { points: string[] }) {
  return (
    <section className="space-y-6">
      <h3 className="border-l-4 border-blue-600 pl-4 text-4xl font-bold text-slate-900">
        Юу сурах вэ?
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {points.map((point) => (
          <div
            key={point}
            className="rounded-2xl bg-white border p-5 shadow-sm flex items-start gap-3"
          >
            <CheckCircle2 className="mt-1 h-5 w-5 text-blue-600 shrink-0" />
            <p className="text-slate-700 leading-7">{point}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
