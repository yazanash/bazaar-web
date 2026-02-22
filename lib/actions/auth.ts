"use server";

import { api } from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requestOtpAction(email: string) {
  await api.requestOtp(email);
  return { success: true, message: "تم إرسال الرمز بنجاح" };
}

export async function loginAction(email: string, otp: string) {
  const response = await api.verifyOtp(email, otp);

  if (response.data?.token) {
    const cookieStore = await cookies();
    cookieStore.set("session_token", response.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }
  if (response.success) {
    redirect("/");
  }
  return response;
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("session_token");
  redirect("/login");
}
