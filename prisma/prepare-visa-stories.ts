import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const columns = await prisma.$queryRawUnsafe<{name:string}[]>('PRAGMA table_info("Testimonial")');
  if (!columns.some(c=>c.name==='visaGranted')) await prisma.$executeRawUnsafe('ALTER TABLE "Testimonial" ADD COLUMN "visaGranted" BOOLEAN NOT NULL DEFAULT false');
  if (!columns.some(c=>c.name==='sourceUrl')) await prisma.$executeRawUnsafe('ALTER TABLE "Testimonial" ADD COLUMN "sourceUrl" TEXT');
  console.log('Visa story fields ready; existing rows preserved.');
}
main().finally(()=>prisma.$disconnect());
