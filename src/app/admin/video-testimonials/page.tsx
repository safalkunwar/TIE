import prisma from "@/lib/db";
import {
  deleteVideoTestimonial,
  reorderVideoTestimonials,
  toggleVideoFeatured,
  toggleVideoVisibility,
} from "@/lib/actions";
import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { logoutAdmin } from "../actions";

export const dynamic = "force-dynamic";

function parsePhotos(json: string | null | undefined): string[] {
  if (!json) return [];
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Fallback: split by comma if it's a comma-separated list
    return json.split(",").filter((p) => p.trim()).map((p) => p.trim());
  }
}

export default async function AdminVideoTestimonialsPage() {
  const token = requireAdmin();
  if (!token) {
    redirect("/admin");
  }

  const videoTestimonials = await prisma.videoTestimonial.findMany({
    orderBy: { displayOrder: "asc" },
  });

  const ids = videoTestimonials.map((v) => v.id).join(",");

  async function reorder(formData: FormData) {
    "use server";
    const order = formData.get("order") as string;
    const orderedIds = order.split(",").filter(Boolean);
    await reorderVideoTestimonials(orderedIds);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Video Testimonials
          </h1>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
            >
              Logout
            </button>
          </form>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              All Video Testimonials
            </h2>
            <Link
              href="/admin/video-testimonials/new"
              className="rounded-md bg-ocean px-4 py-2 text-sm font-medium text-white hover:bg-ocean-deep"
            >
              Add New Video
            </Link>
          </div>

          {videoTestimonials.length === 0 ? (
            <div className="rounded-lg bg-white p-8 text-center shadow">
              <p className="text-gray-500">No video testimonials found.</p>
            </div>
          ) : (
            <form action={reorder}>
              <input type="hidden" name="order" value={ids} />
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <ul role="list" className="divide-y divide-gray-200">
                  {videoTestimonials.map((v, index) => (
                    <li
                      key={v.id}
                      className="flex items-center justify-between px-6 py-4"
                    >
                      <div className="flex items-center gap-4">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ocean/10 text-xs font-bold text-ocean">
                          {index + 1}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {v.name}
                        </span>
                        <span className="inline-block rounded-full bg-ocean/10 px-2 py-0.5 text-[11px] font-bold text-ocean">
                          {v.personType}
                        </span>
                        {v.featured && (
                          <span className="inline-block rounded-full bg-gold/20 px-2 py-0.5 text-[11px] font-bold text-gold">
                            Featured
                          </span>
                        )}
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-bold ${
                            v.published
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {v.published ? "Published" : "Draft"}
                        </span>
                        {parsePhotos(v.photos).length > 0 && (
                          <span className="inline-block rounded-full bg-sky-100 px-2 py-0.5 text-[11px] font-bold text-sky-700">
                            {parsePhotos(v.photos).length} photo
                            {parsePhotos(v.photos).length !== 1 ? "s" : ""}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <form
                          action={async () => {
                            "use server";
                            await toggleVideoFeatured(v.id, !v.featured);
                          }}
                        >
                          <button
                            type="submit"
                            className={`text-xs font-semibold ${
                              v.featured ? "text-ocean" : "text-gray-400 hover:text-ocean"
                            }`}
                          >
                            {v.featured ? "★ Featured" : "☆ Feature"}
                          </button>
                        </form>
                        <form
                          action={async () => {
                            "use server";
                            await toggleVideoVisibility(v.id, !v.published);
                          }}
                        >
                          <button
                            type="submit"
                            className={`text-xs ${
                              v.published ? "text-emerald-600" : "text-slate-400"
                            }`}
                          >
                            {v.published ? "Visible" : "Hidden"}
                          </button>
                        </form>
                        <Link
                          href={`/admin/video-testimonials/${v.id}/edit`}
                          className="rounded bg-sky-50 px-3 py-1.5 text-sm font-medium text-ocean hover:bg-sky-100"
                        >
                          Edit
                        </Link>
                        <form
                          action={async () => {
                            "use server";
                            await deleteVideoTestimonial(v.id);
                          }}
                        >
                          <button
                            type="submit"
                            className="rounded bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </form>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="rounded-md bg-ocean px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-ocean-deep"
                >
                  Save Order
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}