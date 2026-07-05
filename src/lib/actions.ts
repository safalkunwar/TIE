"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db";

// General Country CRUD
export async function createCountry(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  
  const country = await prisma.country.create({
    data: {
      name,
      slug,
      flag: formData.get("flag") as string || "🌍",
      tagline: formData.get("tagline") as string || "",
      tuition: formData.get("tuition") as string || "",
      intake: formData.get("intake") as string || "",
      language: formData.get("language") as string || "",
      workWhileStudying: formData.get("workWhileStudying") as string || "",
      postStudyWork: formData.get("postStudyWork") as string || "",
      scholarships: formData.get("scholarships") as string || "",
      visaPathway: formData.get("visaPathway") as string || "",
      image: formData.get("image") as string || "",
      accent: formData.get("accent") as string || "#000000",
      lat: formData.get("lat") ? parseFloat(formData.get("lat") as string) : null,
      lng: formData.get("lng") ? parseFloat(formData.get("lng") as string) : null,
    },
  });

  revalidatePath("/admin/destinations");
  return country;
}

export async function updateCountry(id: string, formData: FormData) {
  await prisma.country.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      flag: formData.get("flag") as string,
      tagline: formData.get("tagline") as string,
      tuition: formData.get("tuition") as string,
      intake: formData.get("intake") as string,
      language: formData.get("language") as string,
      workWhileStudying: formData.get("workWhileStudying") as string,
      postStudyWork: formData.get("postStudyWork") as string,
      scholarships: formData.get("scholarships") as string,
      visaPathway: formData.get("visaPathway") as string,
      image: formData.get("image") as string,
      accent: formData.get("accent") as string,
      lat: formData.get("lat") ? parseFloat(formData.get("lat") as string) : null,
      lng: formData.get("lng") ? parseFloat(formData.get("lng") as string) : null,
    },
  });

  revalidatePath("/admin/destinations");
  revalidatePath(`/country/${formData.get("slug")}`);
  revalidatePath("/");
}

export async function deleteCountry(id: string) {
  const country = await prisma.country.findUnique({ where: { id } });
  if (country) {
    await prisma.country.delete({ where: { id } });
    revalidatePath("/admin/destinations");
    revalidatePath(`/country/${country.slug}`);
    revalidatePath("/");
  }
}

// Universities
export async function addUniversity(countryId: string, formData: FormData) {
  await prisma.university.create({
    data: {
      name: formData.get("name") as string,
      ranking: formData.get("ranking") as string || null,
      description: formData.get("description") as string || null,
      countryId,
    },
  });
  revalidatePath(`/admin/destinations/${countryId}/edit`);
}

export async function deleteUniversity(id: string, countryId: string) {
  await prisma.university.delete({ where: { id } });
  revalidatePath(`/admin/destinations/${countryId}/edit`);
}

// Scholarships
export async function addScholarship(countryId: string, formData: FormData) {
  await prisma.countryScholarship.create({
    data: {
      name: formData.get("name") as string,
      amount: formData.get("amount") as string || null,
      deadline: formData.get("deadline") as string || null,
      description: formData.get("description") as string || null,
      countryId,
    },
  });
  revalidatePath(`/admin/destinations/${countryId}/edit`);
}

export async function deleteScholarship(id: string, countryId: string) {
  await prisma.countryScholarship.delete({ where: { id } });
  revalidatePath(`/admin/destinations/${countryId}/edit`);
}

// FAQs
export async function addFAQ(countryId: string, formData: FormData) {
  await prisma.fAQ.create({
    data: {
      question: formData.get("question") as string,
      answer: formData.get("answer") as string,
      countryId,
    },
  });
  revalidatePath(`/admin/destinations/${countryId}/edit`);
}

export async function deleteFAQ(id: string, countryId: string) {
  await prisma.fAQ.delete({ where: { id } });
  revalidatePath(`/admin/destinations/${countryId}/edit`);
}

// Testimonials
export async function addTestimonial(countryId: string, formData: FormData) {
  await prisma.testimonial.create({
    data: {
      studentName: formData.get("studentName") as string,
      quote: formData.get("quote") as string,
      avatar: formData.get("avatar") as string || null,
      countryId,
    },
  });
  revalidatePath(`/admin/destinations/${countryId}/edit`);
}

export async function deleteTestimonial(id: string, countryId: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath(`/admin/destinations/${countryId}/edit`);
}
