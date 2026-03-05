import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/prisma";

export async function requireAuthUser() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const cu = await currentUser();
  const email = cu?.emailAddresses?.[0]?.emailAddress;

  if (!email) throw new Error("No email");

  const dbUser = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, role: "USER" },
  });

  return dbUser;
}

export async function requireFreelancerUser() {
  const user = await requireAuthUser();

  if (user.role !== "FREELANCER") {
    throw new Error("Forbidden");
  }

  return user;
}
