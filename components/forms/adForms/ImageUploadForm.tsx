"use client";
import { useState } from "react";
import {
  Images,
  Loader2,
  X,
  ChevronRight,
  ChevronLeft,
  Star,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { uploadImage } from "@/lib/actions/ads";
import { getImageUrl } from "@/lib/utils";
export function ImageUploadSection({ form }: { form: any }) {
  const [isUploading, setIsUploading] = useState(false);
  const gallery = form.watch("gallery") || [];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newImages = [...gallery];

    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("Image", files[i]);

        const response = await uploadImage(formData);
        if (response.success) {
          const data = response.data;
          newImages.push({
            id: 0,
            imagePath: data?.url,
            order: newImages.length,
          });
        }
      }
      form.setValue("gallery", reorderImages(newImages));
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  const reorderImages = (imgs: any[]) => {
    return imgs.map((img, index) => ({ ...img, order: index }));
  };

  const moveImage = (index: number, direction: "left" | "right") => {
    const newImages = [...gallery];
    const targetIndex = direction === "left" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newImages.length) return;

    [newImages[index], newImages[targetIndex]] = [
      newImages[targetIndex],
      newImages[index],
    ];

    form.setValue("gallery", reorderImages(newImages));
  };

  const removeImage = (index: number) => {
    const filtered = gallery.filter((_: any, i: number) => i !== index);
    form.setValue("gallery", reorderImages(filtered));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-slate-800 border-r-4 border-blue-600 pr-3">
          صور الإعلان
        </h2>
        <span className="text-xs text-slate-500 font-bold">
          أول صورة هي صورة العرض الرئيسية
        </span>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
        <div className="relative shrink-0 w-32 h-40 border-2 border-dashed border-blue-200 rounded-3xl flex flex-col items-center justify-center bg-blue-50/50 hover:bg-blue-50 transition-colors cursor-pointer snap-start">
          {isUploading ? (
            <Loader2 className="animate-spin text-blue-500" />
          ) : (
            <Images className="text-blue-400" size={30} />
          )}
          <span className="text-[10px] font-black mt-2 text-blue-600">
            أضف صور
          </span>
          <Input
            type="file"
            multiple
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </div>

        {gallery.map((img: any, index: number) => (
          <div
            key={index}
            className={`relative shrink-0 w-32 h-40 rounded-3xl overflow-hidden group border-2 transition-all snap-start
              ${index === 0 ? "border-blue-600 ring-4 ring-blue-100" : "border-slate-100"}`}
          >
            <img
              src={getImageUrl(`${img.imagePath}`)}
              className="w-full h-full object-cover"
              alt="Vehicle"
            />

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="self-end bg-red-500 text-white rounded-full p-1"
              >
                <X size={14} />
              </button>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => moveImage(index, "left")}
                  className="bg-white/20 hover:bg-white/40 text-white rounded-lg p-1 disabled:opacity-30"
                >
                  <ChevronRight size={20} />
                </button>
                <button
                  type="button"
                  disabled={index === gallery.length - 1}
                  onClick={() => moveImage(index, "right")}
                  className="bg-white/20 hover:bg-white/40 text-white rounded-lg p-1 disabled:opacity-30"
                >
                  <ChevronLeft size={20} />
                </button>
              </div>
            </div>

            {index === 0 && (
              <div className="absolute top-2 left-2 bg-blue-600 text-white p-1 rounded-full shadow-lg">
                <Star size={12} fill="white" />
              </div>
            )}
          </div>
        ))}
      </div>

      {form.formState.errors.gallery && (
        <p className="text-red-500 text-xs font-bold mt-1">
          يرجى إضافة صورة واحدة على الأقل
        </p>
      )}
    </div>
  );
}
