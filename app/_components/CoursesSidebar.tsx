"use client";

type Props = {
  categoryLabel: string;
  subcats: string[];
  activeSub: string | null;
  onSelectSub: (v: string | null) => void;
};

export const CoursesSidebar = ({
  categoryLabel,
  subcats,
  activeSub,
  onSelectSub,
}: Props) => {
  return (
    <aside className="self-start h-fit rounded-xl bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-900">Дэд ангилал</h3>

      <div className="mt-4 space-y-2">
        <button
          onClick={() => onSelectSub(null)}
          className={[
            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm",
            !activeSub
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-gray-100",
          ].join(" ")}
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
            ▦
          </span>
          <span>{categoryLabel} - Бүгд</span>
        </button>

        {subcats.map((s) => {
          const active = s === activeSub;
          return (
            <button
              key={s}
              onClick={() => onSelectSub(s)}
              className={[
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm",
                active
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100",
              ].join(" ")}
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                ▦
              </span>
              <span>{s}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <h4 className="text-sm font-semibold text-gray-900">Үнийн хүрээ (₮)</h4>
        <div className="mt-4">
          <div className="h-1 w-full rounded-full bg-gray-200" />
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
            <span>10,000₮</span>
            <span>500,000₮</span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-sm font-semibold text-gray-900">Үнэлгээ</h4>
        <div className="mt-3 space-y-3 text-sm text-gray-700">
          <label className="flex items-center gap-3">
            <input type="checkbox" className="h-4 w-4" />
            <span>
              <span className="text-yellow-500">★★★★★</span>{" "}
              <span className="text-gray-500">5.0</span>
            </span>
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" className="h-4 w-4" />
            <span>
              <span className="text-yellow-500">★★★★☆</span>{" "}
              <span className="text-gray-500">4.0+</span>
            </span>
          </label>
        </div>
      </div>
    </aside>
  );
};
