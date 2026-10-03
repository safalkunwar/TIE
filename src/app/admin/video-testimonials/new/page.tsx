import { addVideoTestimonial } from "@/lib/actions";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function NewVideoTestimonialPage() {
  async function action(formData: FormData) {
    "use server";
    await addVideoTestimonial(formData);
    redirect("/admin/video-testimonials");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl bg-white p-8 rounded-2xl shadow">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Add New Video Testimonial</h1>
          <Link
            href="/admin/video-testimonials"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Cancel
          </Link>
        </div>

        <form action={action} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Person Name</label>
            <input
              type="text"
              name="name"
              required
              className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
              placeholder="e.g. Sarah Johnson"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Person Type</label>
            <select
              name="personType"
              defaultValue="student"
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
              className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
              placeholder="e.g. USA, Australia"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">University (optional)</label>
            <input
              type="text"
              name="university"
              className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
              placeholder="e.g. University of British Columbia"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Result / Status (optional)</label>
            <input
              type="text"
              name="result"
              className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
              placeholder="e.g. Visa Granted, Scholarship Accepted"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Short Testimonial Quote (optional)</label>
            <textarea
              name="quote"
              rows={2}
              className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
              placeholder="One sentence testimonial..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Video URL *</label>
            <input
              type="url"
              name="videoUrl"
              required
              className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
              placeholder="e.g. /gallery/video1.mp4 or https://..."
            />
            <p className="mt-1 text-xs text-gray-500">
              Use /gallery/ for local videos or an external URL.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Thumbnail Image URL *</label>
            <input
              type="url"
              name="thumbnailUrl"
              required
              className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
              placeholder="e.g. /gallery/team.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Additional Photos (URLs separated by commas)</label>
            <textarea
              name="photos"
              rows={2}
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
                defaultValue={0}
                className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
              />
            </div>
            <div className="flex items-end gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" name="featured" />
                Featured
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" name="published" defaultChecked />
                Published
              </label>
            </div>
          </div>

          <div className="border-t pt-5">
            <button
              type="submit"
              className="w-full rounded-md bg-ocean px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-ocean-deep"
            >
              Add Video Testimonial
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
