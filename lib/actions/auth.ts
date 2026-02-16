"use server";

import { api } from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requestOtpAction(email: string) {
  try {
    await api.requestOtp(email);
    return { success: true, message: "تم إرسال الرمز بنجاح" };
  } catch (error: any) {
    return { success: false, message: error.message || "فشل إرسال الرمز" };
  }
}

export async function loginAction(email: string, otp: string) {
  try {
    const data = await api.verifyOtp(email, otp);

    if (data.token) {
      const cookieStore = await cookies();
      cookieStore.set("session_token", data.token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production", 
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

  } catch (error: any) {
    return { success: false, message: error.message || "الرمز غير صحيح" };
  }

  redirect("/"); 
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("session_token");
  redirect("/login");
}