import { clsx, type ClassValue } from "clsx";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

export function getImageUrl(path: string | null): string {
  if (!path) return "/placeholder-car.png";
  if (path.startsWith("http")) return path;
  return `${BASE_IMAGE_URL}${path}`;
}

export function createUrl(
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;
  return `${pathname}${queryString}`;
}

export interface ApiResponse<T> {
  data: T | null;
  status: number;
  message: string | null;
  success: boolean;
}