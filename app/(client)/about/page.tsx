export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
            Freelancer.mn
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Бидний тухай
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-gray-600">
            Монголын чадварлаг фрилансерууд болон ажил олгогчдыг нэг дор
            холбосон найдвартай платформ.
          </p>
        </div>

        <div className="mb-10 rounded-3xl border border-blue-100 bg-white p-8 shadow-sm md:p-10">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Freelancer.mn гэж юу вэ?
              </h2>
              <p className="mb-4 leading-8 text-gray-600">
                Freelancer.mn нь Монголын фрилансерууд болон ажил олгогчдыг
                холбох зорилготой платформ юм. Манай платформоор дамжуулан
                дизайнер, программист, маркетер болон бусад олон төрлийн
                мэргэжилтнүүд өөрсдийн ур чадвараа санал болгож, хэрэглэгчид
                богино хугацаанд өөрт тохирох чадварлаг freelancer-ийг олох
                боломжтой.
              </p>
              <p className="leading-8 text-gray-600">
                Бидний зорилго бол Монголд фриланс ажиллах боломжийг өргөжүүлж,
                илүү уян хатан, хүртээмжтэй, орчин үеийн ажлын орчныг бий болгох
                юм.
              </p>
            </div>

            <div className="rounded-3xl bg-blue-600 p-8 text-white shadow-lg">
              <h3 className="mb-4 text-2xl font-bold">Бидний эрхэм зорилго</h3>
              <p className="leading-8 text-blue-50">
                Хүн бүр өөрийн ур чадвараа ашиглан орлого олох, харин бизнесүүд
                хэрэгтэй мэргэжилтнээ хурдан бөгөөд хялбараар олох боломжтой
                экосистемийг бүрдүүлэх.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-xl text-blue-600">
              💼
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Боломж</h3>
            <p className="leading-7 text-gray-600">
              Фрилансерууд өөрсдийн ур чадвараа олон хүнд хүргэж, илүү өргөн
              боломж авах нөхцөлийг бүрдүүлнэ.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-xl text-blue-600">
              ⚡
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Хурд</h3>
            <p className="leading-7 text-gray-600">
              Ажил олгогчид өөрт хэрэгтэй мэргэжилтнээ богино хугацаанд олж,
              ажлаа хурдан эхлүүлэх боломжтой.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-xl text-blue-600">
              🤝
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Найдвартай байдал
            </h3>
            <p className="leading-7 text-gray-600">
              Хоёр талын хэрэгцээг нэг дор холбож, илүү ойлгомжтой, итгэлтэй
              хамтын ажиллагааг бий болгоно.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-3xl bg-gray-900 px-8 py-10 text-center text-white">
          <h2 className="mb-3 text-2xl font-bold md:text-3xl">
            Ирээдүйн ажлын орчныг хамтдаа бүтээе
          </h2>
          <p className="mx-auto max-w-2xl text-gray-300">
            Freelancer.mn нь Монголын хөдөлмөрийн зах зээлийг илүү уян хатан,
            орчин үеийн, боломж дүүрэн болгохын төлөө ажиллаж байна.
          </p>
        </div>
      </div>
    </div>
  );
}
