"use client";

type Sort = "new" | "priceAsc" | "priceDesc";

export const CoursesToolbar = ({
  total,
  sort,
  setSort,
}: {
  total: number;
  sort: Sort;
  setSort: (v: Sort) => void;
}) => {
  return (
    <div className="mb-5 flex items-center justify-between">
      <div className="text-sm text-gray-600">
        <span className="font-semibold text-gray-900">{total}</span> илэрц
        олдлоо
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">Эрэмбэлэх:</span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="new">Шинэ</option>
          <option value="priceAsc">Үнэ: өсөх</option>
          <option value="priceDesc">Үнэ: буурах</option>
        </select>
      </div>
    </div>
  );
};
