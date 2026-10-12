import { PrismaClient } from '@prisma/client';
import { destinations } from '../src/data/destinations';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with initial destinations...');
  
  for (const d of destinations) {
    const existing = await prisma.country.findUnique({ where: { slug: d.slug } });
    
    if (!existing) {
      await prisma.country.create({
        data: {
          slug: d.slug,
          name: d.name,
          flag: d.flag,
          tagline: d.tagline,
 //this is in thetesting phase
              name: u,
            })),
          },
        },
      });
      console.log(`Created country: ${d.name}`);
    } else {
      console.log(`Country already exists: ${d.name}`);
    }
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
