import AvailabilityBooking from "@/app/_components/booking/AvailabilityBooking";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ freelancerId: string }>;
  searchParams: Promise<{ courseId?: string }>;
}) {
  const { freelancerId } = await params;
  const { courseId } = await searchParams;

  if (!courseId) {
    return <div className="flex justify-center py-20">Course ID олдсонгүй</div>;
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb] py-10">
      <div className="mx-auto max-w-[700px] px-4">
        <AvailabilityBooking freelancerId={freelancerId} courseId={courseId} />
      </div>
    </div>
  );
}
