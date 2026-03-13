-- CreateTable
CREATE TABLE "AvailabilityDateTime" (
    "id" TEXT NOT NULL,
    "freelancerId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AvailabilityDateTime_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AvailabilityDateTime_freelancerId_idx" ON "AvailabilityDateTime"("freelancerId");

-- CreateIndex
CREATE INDEX "AvailabilityDateTime_date_idx" ON "AvailabilityDateTime"("date");

-- CreateIndex
CREATE UNIQUE INDEX "AvailabilityDateTime_freelancerId_date_time_key" ON "AvailabilityDateTime"("freelancerId", "date", "time");

-- AddForeignKey
ALTER TABLE "AvailabilityDateTime" ADD CONSTRAINT "AvailabilityDateTime_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "FreelancerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
