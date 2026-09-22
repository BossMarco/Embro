"use server";

import { redirect } from "next/navigation";
import {
  clearAdminSession,
  createAdminSession,
  passwordMatches,
} from "@/lib/admin-auth";

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) redirect("/admin/login?error=1");
  await createAdminSession();
  redirect("/admin");
}

export async function logout() {
  await clearAdminSession();
  redirect("/admin/login");
}
