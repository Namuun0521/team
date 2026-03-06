import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const router = useRouter();

  return (
    <motion.section
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="py-10"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src="/hero.jpg"
            alt="Hero"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-blue-900/60" />

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

              <button
                onClick={() => router.push("/courses")}
                className="mt-8 rounded-lg bg-white px-6 py-3 font-medium text-blue-700 hover:bg-blue-50"
              >
                Хичээл хайх
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
