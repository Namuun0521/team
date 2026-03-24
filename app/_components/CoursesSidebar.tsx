"use client";

type Props = {
  categoryLabel: string;
  subcats: string[];
  activeSub: string | null;
  onSelectSub: (v: string | null) => void;
  priceRange: [number, number];
  onPriceChange: (v: [number, number]) => void;
  priceMin: number;
  priceMax: number;
  minRating: number | null;
  onRatingChange: (v: number | null) => void;
};

function formatMNT(n: number) {
  return n.toLocaleString("mn-MN");
}

const RATINGS = [
  { value: 5, stars: "★★★★★", label: "5.0" },
  { value: 4, stars: "★★★★☆", label: "4.0 - 4.9" },
  { value: 3, stars: "★★★☆☆", label: "3.0 - 3.9" },
  { value: 2, stars: "★★☆☆☆", label: "2.0 - 2.9" },
  { value: 1, stars: "★☆☆☆☆", label: "1.0 - 1.9" },
];

export const CoursesSidebar = ({
  categoryLabel,
  subcats,
  activeSub,
  onSelectSub,
  priceRange,
  onPriceChange,
  priceMin,
  priceMax,
  minRating,
  onRatingChange,
}: Props) => {
  const [low, high] = priceRange;

  const lowPct = ((low - priceMin) / (priceMax - priceMin)) * 100;
  const highPct = ((high - priceMin) / (priceMax - priceMin)) * 100;

  const thumbClass =
    "absolute inset-x-0 h-1.5 w-full appearance-none bg-transparent pointer-events-none " +
    "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none " +
    "[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full " +
    "[&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white " +
    "[&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer";

  return (
    <aside className="rounded-xl bg-white p-5 shadow-sm lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:self-start lg:overflow-hidden">
      <h3 className="text-sm font-semibold text-gray-900">Дэд ангилал</h3>

      <div className="mt-4 space-y-2 lg:max-h-[min(45vh,28rem)] lg:overflow-y-auto lg:pr-1">
        <button
          onClick={() => onSelectSub(null)}
          className={[
            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm",
            !activeSub
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-gray-100",
          ].join(" ")}
        >
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/20">
            ▦
          </span>
          <span className="min-w-0 wrap-break-words">
            {categoryLabel} - Бүгд
          </span>
        </button>

        {subcats.map((s) => {
          const active = s === activeSub;
          return (
            <button
              key={s}
              onClick={() => onSelectSub(s)}
              className={[
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm",
                active
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100",
              ].join(" ")}
            >
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/20">
                ▦
              </span>
              <span className="min-w-0 wrap-break-words">{s}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <h4 className="text-sm font-semibold text-gray-900">Үнийн хүрээ (₮)</h4>
        <div className="mt-4 px-1">
          <div className="relative h-5 flex items-center">
            <div className="absolute inset-x-0 h-1.5 rounded-full bg-gray-200" />
            <div
              className="absolute h-1.5 rounded-full bg-blue-500"
              style={{ left: `${lowPct}%`, right: `${100 - highPct}%` }}
            />
            <input
              type="range"
              min={priceMin}
              max={priceMax}
              step={1000}
              value={low}
              onChange={(e) => {
                const val = Math.min(Number(e.target.value), high - 1000);
                onPriceChange([val, high]);
              }}
              style={{ zIndex: low >= high - 1000 ? 5 : 3 }}
              className={thumbClass}
            />
            <input
              type="range"
              min={priceMin}
              max={priceMax}
              step={1000}
              value={high}
              onChange={(e) => {
                const val = Math.max(Number(e.target.value), low + 1000);
                onPriceChange([low, val]);
              }}
              style={{ zIndex: 4 }}
              className={thumbClass}
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="font-medium text-blue-600">{formatMNT(low)}₮</span>
            <span className="font-medium text-blue-600">
              {formatMNT(high)}₮
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-gray-900">Үнэлгээ</h4>
          {minRating !== null && (
            <button
              onClick={() => onRatingChange(null)}
              className="text-xs text-blue-500 hover:underline"
            >
              Цэвэрлэх
            </button>
          )}
        </div>
        <div className="mt-3 space-y-2">
          {RATINGS.map(({ value, stars, label }) => (
            <button
              key={value}
              onClick={() => onRatingChange(minRating === value ? null : value)}
              className={[
                "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition",
                minRating === value
                  ? "bg-blue-50 border border-blue-200 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100",
              ].join(" ")}
            >
              <span className="text-yellow-500 text-base">{stars}</span>
              <span className="text-gray-500 text-xs">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};
