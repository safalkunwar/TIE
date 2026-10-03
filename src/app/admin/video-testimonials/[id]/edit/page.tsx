import prisma from "@/lib/db";
import { updateVideoTestimonial } from "@/lib/actions";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function EditVideoTestimonialPage({
  params,
}: {
  params: { id: string };
}) {
  const token = requireAdmin();
  if (!token) {
    redirect("/admin");
  }

  const videoTestimonial = await prisma.videoTestimonial.findUnique({
    where: { id: params.id },
  });

  if (!videoTestimonial) {
    notFound();
  }

  async function action(formData: FormData) {
    "use server";
    await updateVideoTestimonial(params.id, formData);
    redirect(`/admin/video-testimonials/${params.id}/edit?saved=1`);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="flex items-center justify-between border-b pb-5">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
              Edit Video Testimonial
            </h1>
            <p className="text-sm text-gray-500">ID: {videoTestimonial.id}</p>
          </div>
          <Link
            href="/admin/video-testimonials"
            className="rounded bg-white px-3.5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Back to Dashboard
          </Link>
        </div>

        <form action={action} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Person Name</label>
            <input
              type="text"
              name="name"
              defaultValue={videoTestimonial.name}
              required
              className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Person Type</label>
            <select
              name="personType"
              defaultValue={videoTestimonial.personType}
              className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
            >
              <option value="student">Student</option>
              <option value="parent">Parent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Country/Destination</label>
            <input
              type="text"
              name="country"
              defaultValue={videoTestimonial.country || ""}
              className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">University (optional)</label>
            <input
              type="text"
              name="university"
              defaultValue={videoTestimonial.university || ""}
              className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Result / Status (optional)</label>
            <input
              type="text"
              name="result"
              defaultValue={videoTestimonial.result || ""}
              className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Short Testimonial Quote (optional)</label>
            <textarea
              name="quote"
              rows={2}
              defaultValue={videoTestimonial.quote || ""}
              className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Video URL *</label>
            <input
              type="url"
              name="videoUrl"
              defaultValue={videoTestimonial.videoUrl}
              required
              className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Thumbnail Image URL *</label>
            <input
              type="url"
              name="thumbnailUrl"
              defaultValue={videoTestimonial.thumbnailUrl}
              required
              className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Additional Photos (URLs separated by commas)</label>
            <textarea
              name="photos"
              rows={2}
              defaultValue={(() => {
                if (!videoTestimonial.photos) return "";
                try {
                  const parsed = JSON.parse(videoTestimonial.photos);
                  return Array.isArray(parsed) ? parsed.join(", ") : "";
                } catch {
                  return videoTestimonial.photos;
                }
              })()}
              className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
              placeholder="e.g. /gallery/photo1.jpg, /gallery/photo2.jpg, /gallery/photo3.jpg"
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter URLs for additional photos that will appear in the carousel. Separate multiple URLs with commas.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Display Order</label>
              <input
                type="number"
                name="displayOrder"
                defaultValue={videoTestimonial.displayOrder}
                className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
              />
            </div>
            <div className="flex items-end gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" name="featured" defaultChecked={videoTestimonial.featured} />
                Featured
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" name="published" defaultChecked={videoTestimonial.published} />
                Published
              </label>
            </div>
          </div>

          <div className="border-t pt-5">
            <button
              type="submit"
              className="w-full rounded-md bg-ocean px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-ocean-deep"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}