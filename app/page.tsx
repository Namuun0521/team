import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";
import { HeroSection } from "./_components/HeroSection";

type Course = {
  id: string;
  category: string;
  title: string;
  teacher: string;
  rating: number;
  pricePerHour: number;
  image?: string; // optional
};

const suggestedCourses: Course[] = [
  {
    id: "1",
    category: "КОД БИЧИХ",
    title: "ReactJS болон Tailwind CSS ашиглан веб сайт хийх нь",
    teacher: "Бат-Эрдэнэ",
    rating: 4.9,
    pricePerHour: 45000,
  },
  {
    id: "2",
    category: "МАРКЕТИНГ",
    title: "Social media контент бэлтгэх мастер класс",
    teacher: "Номин",
    rating: 5.0,
    pricePerHour: 35000,
  },
  {
    id: "3",
    category: "ФИТНЕС",
    title: "Гэрээр хийх йог болон бясалгал",
    teacher: "Туяа",
    rating: 4.8,
    pricePerHour: 20000,
  },
  {
    id: "4",
    category: "ИНЖЕНЕР",
    title: "AutoCAD 2D/3D анхан шатны сургалт",
    teacher: "Болд",
    rating: 4.7,
    pricePerHour: 50000,
  },
];

const newCourses: Course[] = [
  {
    id: "5",
    category: "ДИЗАЙН",
    title: "Figma ашиглан App-ны UI/UX дизайн гаргах",
    teacher: "Сараа",
    rating: 4.9,
    pricePerHour: 40000,
  },
  {
    id: "6",
    category: "ХЭЛ СУРАХ",
    title: "Англи хэлний ярианы дадлага (Intermediate)",
    teacher: "Сараа",
    rating: 5.0,
    pricePerHour: 25000,
  },
];

function formatMNT(n: number) {
  return n.toLocaleString("mn-MN");
}

const CourseCard = ({ c }: { c: Course }) => {
  return (
    <div className="w-[240px] shrink-0 overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md">
      {/* image placeholder */}
      <div className="h-[130px] bg-gradient-to-br from-gray-100 to-gray-200" />

      <div className="p-4">
        <span className="inline-flex rounded-full bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700">
          {c.category}
        </span>

        <h3 className="mt-2 line-clamp-2 text-sm font-semibold text-gray-900">
          {c.title}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-100">
            👤
          </span>
          <span>{c.teacher}</span>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-gray-700">
            <span className="text-yellow-500">★</span>
            <span className="font-medium">{c.rating.toFixed(1)}</span>
          </div>

          <div className="text-right">
            <div className="text-sm font-semibold text-blue-700">
              {formatMNT(c.pricePerHour)}₮/цаг
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseRow = ({ title, items }: { title: string; items: Course[] }) => {
  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          Бүгдийг үзэх →
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {items.map((c) => (
          <CourseCard key={c.id} c={c} />
        ))}
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="mt-12">
      <div className="relative overflow-hidden rounded-2xl bg-blue-600 px-10 py-12 text-white">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-2xl bg-white/10" />
        <div className="pointer-events-none absolute right-10 top-10 h-24 w-24 rounded-2xl bg-white/10" />

        <h3 className="text-3xl font-bold leading-tight">
          Та өөрийн ур чадвараараа орлого
          <br />
          олохыг хүсэж байна уу?
        </h3>

        <p className="mt-4 max-w-2xl text-white/80">
          Манай платформд нэгдэж, өөрийн хичээл болон үйлчилгээгээ санал болгоод
          Монголын шилдэг залуучуудын нэг болоорой.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-blue-700 hover:bg-white/90">
            Freelancer болох
          </button>
          <button className="rounded-lg border border-white/60 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">
            Дэлгэрэнгүй
          </button>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />

      <main className="mx-auto max-w-6xl px-4 py-6">
        <CourseRow
          title="Санал болгож буй хичээлүүд"
          items={suggestedCourses}
        />
        <CourseRow title="Шинээр нэмэгдсэн үйлчилгээнүүд" items={newCourses} />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
