"use client";

import { useState } from "react";
import { loginAdmin } from "./actions";

export default function AdminLoginPage() {
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    const res = await loginAdmin(formData);
    if (res?.error) {
      setError(res.error);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-card">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Admin Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" action={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-ocean sm:text-sm sm:leading-6"
                placeholder="Enter Admin Password"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-ocean px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-ocean-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
