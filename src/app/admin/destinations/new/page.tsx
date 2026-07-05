import { createCountry } from "@/lib/actions";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function NewCountryPage() {
  async function action(formData: FormData) {
    "use server";
    const country = await createCountry(formData);
    redirect(`/admin/destinations/${country.id}/edit`);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl bg-white p-8 rounded-2xl shadow">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Add New Country</h1>
          <Link
            href="/admin/destinations"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Cancel
          </Link>
        </div>

        <form action={action} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Country Name</label>
            <input
              type="text"
              name="name"
              required
              className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
              placeholder="e.g. Australia"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Flag Emoji</label>
              <input
                type="text"
                name="flag"
                defaultValue="🌍"
                className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Accent Color</label>
              <input
                type="text"
                name="accent"
                defaultValue="#5B8CFF"
                className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tagline</label>
            <textarea
              name="tagline"
              rows={2}
              className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm"
              placeholder="Short catchy tagline..."
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-ocean px-4 py-2 text-sm font-semibold text-white shadow hover:bg-ocean-deep"
            >
              Create & Edit Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
