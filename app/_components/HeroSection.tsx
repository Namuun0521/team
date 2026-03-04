export const HeroSection = () => {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-700 to-teal-500">
          <div className="relative z-10 flex items-center justify-between px-12 py-16">
            <div className="max-w-lg text-white">
              <h1 className="text-5xl font-bold leading-tight">
                Монголын
                <br />
                залуучуудын ур
                <br />
                чадварын нэгдэл
              </h1>

              <p className="mt-6 text-lg text-white/80">
                Өөрийн мэддэг зүйлээ бусдад зааж, эсвэл шинэ ур чадвар
                эзэмшээрэй.
              </p>

              <button className="mt-8 rounded-lg bg-white px-6 py-3 text-blue-700 font-medium hover:bg-blue-50">
                Хичээл хайх
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
