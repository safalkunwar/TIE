import prisma from "@/lib/db";
import { deleteCountry } from "@/lib/actions";
import Link from "next/link";
import { logoutAdmin } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminDestinationsPage() {
  const countries = await prisma.country.findMany({
    orderBy: { createdAt: 'asc' }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Manage Destinations
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
            <h2 className="text-xl font-semibold text-gray-800">All Countries</h2>
            <Link
              href="/admin/destinations/new"
              className="rounded-md bg-ocean px-4 py-2 text-sm font-medium text-white hover:bg-ocean-deep"
            >
              Add New Country
            </Link>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow">
            <ul role="list" className="divide-y divide-gray-200">
              {countries.map((country) => (
                <li key={country.id} className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{country.flag}</span>
                    <div className="flex flex-col">
                      <span className="text-lg font-medium text-gray-900">
                        {country.name}
                      </span>
                      <span className="text-sm text-gray-500">/{country.slug}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/destinations/${country.id}/edit`}
                      className="rounded bg-sky-50 px-3 py-1.5 text-sm font-medium text-ocean hover:bg-sky-100"
                    >
                      Edit
                    </Link>
                    <form action={async () => {
                      "use server";
                      await deleteCountry(country.id);
                    }}>
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
              {countries.length === 0 && (
                <li className="px-6 py-8 text-center text-gray-500">
                  No destinations found.
                </li>
              )}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
