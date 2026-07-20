import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";
import { 
  updateCountry, 
  addUniversity, 
  deleteUniversity, 
  addScholarship, 
  deleteScholarship,
  addFAQ, 
  deleteFAQ,
  addTestimonial,
  deleteTestimonial
} from "@/lib/actions";

export default async function EditCountryPage({
  params,
}: {
  params: { id: string };
}) {
  const country = await prisma.country.findUnique({
    where: { id: params.id },
    include: {
      universities: true,
      countryScholarships: true,
      faqs: true,
      testimonials: true,
    },
  });

  if (!country) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-5">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
              <span>{country.flag}</span> Edit {country.name}
            </h1>
            <p className="text-sm text-gray-500">ID: {country.id}</p>
          </div>
          <Link
            href="/admin/destinations"
            className="rounded bg-white px-3.5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Two Column Layout: Main Info & Nested Lists */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Main Info Form (2 columns wide) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">General Details</h2>
            <form action={updateCountry.bind(null, country.id)} className="space-y-6">
              <input type="hidden" name="slug" value={country.slug} />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Country Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={country.name}
                    required
                    className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Flag Emoji</label>
                  <input
                    type="text"
                    name="flag"
                    defaultValue={country.flag}
                    required
                    className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Tagline</label>
                <textarea
                  name="tagline"
                  rows={2}
                  defaultValue={country.tagline}
                  required
                  className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Average Tuition Fee</label>
                  <input
                    type="text"
                    name="tuition"
                    defaultValue={country.tuition}
                    className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
                    placeholder="e.g. $20,000 - $45,000 / yr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Intakes</label>
                  <input
                    type="text"
                    name="intake"
                    defaultValue={country.intake}
                    className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
                    placeholder="e.g. Feb & Jul"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Language Requirement</label>
                  <input
                    type="text"
                    name="language"
                    defaultValue={country.language}
                    className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
                    placeholder="e.g. English (IELTS/PTE)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Accent Color</label>
                  <input
                    type="text"
                    name="accent"
                    defaultValue={country.accent}
                    className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Work While Studying</label>
                  <input
                    type="text"
                    name="workWhileStudying"
                    defaultValue={country.workWhileStudying}
                    className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Post Study Work rights</label>
                  <input
                    type="text"
                    name="postStudyWork"
                    defaultValue={country.postStudyWork}
                    className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Scholarship Description</label>
                <textarea
                  name="scholarships"
                  rows={2}
                  defaultValue={country.scholarships}
                  className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Visa Pathway</label>
                <textarea
                  name="visaPathway"
                  rows={2}
                  defaultValue={country.visaPathway}
                  className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Hero Image URL</label>
                <input
                  type="text"
                  name="image"
                  defaultValue={country.image}
                  className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    name="lat"
                    defaultValue={country.lat || ""}
                    className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    name="lng"
                    defaultValue={country.lng || ""}
                    className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
                  />
                </div>
              </div>

              <div className="border-t pt-5">
                <button
                  type="submit"
                  className="rounded-md bg-ocean px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-ocean-deep"
                >
                  Save General Changes
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar: Nested Relational Lists */}
          <div className="space-y-8">
            
            {/* Top Universities */}
            <div className="bg-white p-6 rounded-2xl shadow space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Top Universities</h3>
              <ul className="divide-y divide-gray-100 max-h-48 overflow-y-auto space-y-2">
                {country.universities.map((uni) => (
                  <li key={uni.id} className="flex items-center justify-between py-2 text-sm text-gray-800">
                    <span>{uni.name}</span>
                    <form action={deleteUniversity.bind(null, uni.id, country.id)}>
                      <button type="submit" className="text-xs text-red-500 hover:text-red-700">
                        Remove
                      </button>
                    </form>
                  </li>
                ))}
              </ul>
              <form action={addUniversity.bind(null, country.id)} className="pt-2 flex gap-2">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="New University"
                  className="flex-1 rounded-md border-0 py-1 px-2 text-xs text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-ocean"
                />
                <button type="submit" className="rounded bg-ocean px-2.5 py-1 text-xs font-semibold text-white hover:bg-ocean-deep">
                  Add
                </button>
              </form>
            </div>

            {/* Scholarships */}
            <div className="bg-white p-6 rounded-2xl shadow space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Scholarships</h3>
              <ul className="divide-y divide-gray-100 max-h-48 overflow-y-auto space-y-2">
                {country.countryScholarships.map((sch) => (
                  <li key={sch.id} className="flex items-center justify-between py-2 text-sm text-gray-800">
                    <span>{sch.name}</span>
                    <form action={deleteScholarship.bind(null, sch.id, country.id)}>
                      <button type="submit" className="text-xs text-red-500 hover:text-red-700">
                        Remove
                      </button>
                    </form>
                  </li>
                ))}
              </ul>
              <form action={addScholarship.bind(null, country.id)} className="pt-2 flex gap-2">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="New Scholarship"
                  className="flex-1 rounded-md border-0 py-1 px-2 text-xs text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-ocean"
                />
                <button type="submit" className="rounded bg-ocean px-2.5 py-1 text-xs font-semibold text-white hover:bg-ocean-deep">
                  Add
                </button>
              </form>
            </div>

            {/* FAQs */}
            <div className="bg-white p-6 rounded-2xl shadow space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">FAQs</h3>
              <ul className="divide-y divide-gray-100 max-h-48 overflow-y-auto space-y-2">
                {country.faqs.map((faq) => (
                  <li key={faq.id} className="py-2 text-sm text-gray-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{faq.question}</span>
                      <form action={deleteFAQ.bind(null, faq.id, country.id)}>
                        <button type="submit" className="text-xs text-red-500 hover:text-red-700">
                          Remove
                        </button>
                      </form>
                    </div>
                  </li>
                ))}
              </ul>
              <form action={addFAQ.bind(null, country.id)} className="pt-2 space-y-2">
                <input
                  type="text"
                  name="question"
                  required
                  placeholder="Question"
                  className="w-full rounded-md border-0 py-1 px-2 text-xs text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-ocean"
                />
                <textarea
                  name="answer"
                  required
                  rows={2}
                  placeholder="Answer"
                  className="w-full rounded-md border-0 py-1 px-2 text-xs text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-ocean"
                />
                <button type="submit" className="w-full rounded bg-ocean px-2.5 py-1 text-xs font-semibold text-white hover:bg-ocean-deep">
                  Add FAQ
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}