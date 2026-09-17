import { PrismaClient } from '@prisma/client';
import { destinations } from '../src/data/destinations';
import { testimonials as staticTestimonials } from '../src/data/testimonials';
import { getDestinationDetail } from '../src/data/destinationDetail';

const prisma = new PrismaClient();

/**
 * Supplementary seed for nested relations that the base `seed.ts` does not
 * create (heroes, FAQs, testimonials, scholarships). Idempotent: skips rows
 * that already exist for a country, so re-running is safe.
 */
async function main() {
  console.log('Seeding nested relations (heroes, FAQs, testimonials, scholarships)...');

  for (const d of destinations) {
    const country = await prisma.country.findUnique({ where: { slug: d.slug } });
    if (!country) {
      console.log(`  SKIP ${d.name} — country row missing (run base seed first)`);
      continue;
    }

    const detail = getDestinationDetail(d.slug);

    // Hero
    const heroCount = await prisma.hero.count({ where: { countryId: country.id } });
    if (heroCount === 0) {
      await prisma.hero.create({
        data: {
          title: `Study in ${d.name}`,
          subtitle: d.tagline,
          image: d.image,
          countryId: country.id,
        },
      });
      console.log(`  Hero created for ${d.name}`);
    }

    // FAQs (from destinationDetail.faqs)
    const existingFaqCount = await prisma.fAQ.count({ where: { countryId: country.id } });
    if (existingFaqCount === 0 && detail) {
      for (let i = 0; i < detail.faqs.length; i++) {
        const f = detail.faqs[i];
        await prisma.fAQ.create({
          data: {
            question: f.question,
            answer: f.answer,
            countryId: country.id,
            sortOrder: i,
            published: true,
          },
        });
      }
      console.log(`  ${detail.faqs.length} FAQs created for ${d.name}`);
    }

    // Scholarships (seed a single record per country from the static
    // `scholarships` string so the DB has data the admin can refine).
    const existingSchCount = await prisma.countryScholarship.count({
      where: { countryId: country.id },
    });
    if (existingSchCount === 0 && d.scholarships) {
      await prisma.countryScholarship.create({
        data: {
          name: `${d.name} Scholarships`,
          description: d.scholarships,
          countryId: country.id,
          sortOrder: 0,
          published: true,
        },
      });
      console.log(`  Scholarship created for ${d.name}`);
    }

    // Testimonials (from static testimonials.ts, matched by destination name)
    const existingTestCount = await prisma.testimonial.count({
      where: { countryId: country.id },
    });
    if (existingTestCount === 0) {
      const matching = staticTestimonials.filter(
        (t) => t.destination.toLowerCase() === d.name.toLowerCase(),
      );
      for (let i = 0; i < matching.length; i++) {
        const t = matching[i];
        await prisma.testimonial.create({
          data: {
            studentName: t.name,
            quote: t.quote,
            avatar: t.image,
            countryId: country.id,
            sortOrder: i,
            published: true,
          },
        });
      }
      if (matching.length > 0) {
        console.log(`  ${matching.length} testimonials created for ${d.name}`);
      }
    }
  }

  console.log('Nested seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });