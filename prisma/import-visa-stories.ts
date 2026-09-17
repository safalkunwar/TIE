import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// Only import published stories that explicitly describe a visa approval.
// Stable IDs make reruns safe and retain any later admin edits or visibility changes.
const stories = [
  {id:'tie-visa-anish-gurung',studentName:'Anish Gurung',quote:'One of always remembered moments of my life is the day I got VISA approval of Australia.',avatar:'/students/anish-gurung.png',sourceUrl:'https://tienepal.com/testimonials/anish/'},
  {id:'tie-visa-surya-lamichhane',studentName:'Surya Lamichhane',quote:'I was passionate to study in Australia. After excellent services of Target, I got VISA Approval.',avatar:'/students/surya-lamichhane.jpg',sourceUrl:'https://tienepal.com/testimonials/surya-lamichhane-australia/'},
];
async function main() {
  const country=await prisma.country.findUniqueOrThrow({where:{slug:'australia'}});
  for(const [index,story] of stories.entries()) await prisma.testimonial.upsert({where:{id:story.id},update:{},create:{...story,countryId:country.id,visaGranted:true,sortOrder:index}});
  console.log('Imported two published visa approval stories.');
}
main().finally(()=>prisma.$disconnect());
