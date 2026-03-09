type Props = {
  image: string;
  category: string;
  title: string;
  subtitle: string;
};

export function CourseHero({ image, category, title, subtitle }: Props) {
  return (
    <div className="relative overflow-hidden rounded-3xl min-h-[360px]">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex h-full flex-col justify-end p-8 text-white">
        <div className="mb-4 inline-flex w-fit rounded-full bg-blue-600/80 px-4 py-2 text-sm font-semibold tracking-wide">
          {category}
        </div>

        <h1 className="max-w-2xl text-4xl md:text-5xl font-bold leading-tight">
          {title}
        </h1>

        <p className="mt-4 text-lg text-white/90">{subtitle}</p>
      </div>
    </div>
  );
}
