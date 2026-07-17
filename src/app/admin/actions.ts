"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAdmin(formData: FormData) {
  const password = formData.get("password");
  const secret = process.env.ADMIN_SECRET || "tie-admin-123";

  if (password === secret) {
    cookies().set("admin_token", secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    redirect("/admin/destinations");
  } else {
    return { error: "Invalid password" };
  }
}

export async function logoutAdmin() {
  cookies().delete("admin_token");
  redirect("/admin");
}
