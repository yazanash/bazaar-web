"use client";
import { useState, useRef } from "react";
import { Images, Loader2, X, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { uploadImage } from "@/lib/actions/ads";
import { getImageUrl } from "@/lib/utils";

export function ImageUploadSection({ form }: { form: any }) {
  const [isUploading, setIsUploading] = useState(false);
  const gallery = form.watch("gallery") || [];
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. تحسين الرفع المتوازي
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);

    try {
      // نأخذ نسخة الحالية من الجاليري
      let currentGallery = [...gallery];

      for (const file of files) {
        const formData = new FormData();
        formData.append("Image", file);

        const response = await uploadImage(formData);

        if (response.success && response.data?.imageUrl) {
          currentGallery = [
            ...currentGallery,
            {
              id: 0,
              imageUrl: response.data.imageUrl,
              order: currentGallery.length,
            },
          ];

          form.setValue("gallery", reorderImages(currentGallery));
        } else {
          console.error("فشل رفع إحدى الصور:", file.name);
        }
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const reorderImages = (imgs: any[]) => {
    return imgs.map((img, index) => ({ ...img, order: index }));
  };

  // 2. منطق السحب والإفلات البسيط
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const newImages = [...gallery];
      const draggedItemContent = newImages.splice(dragItem.current, 1)[0];
      newImages.splice(dragOverItem.current, 0, draggedItemContent);

      dragItem.current = null;
      dragOverItem.current = null;
      form.setValue("gallery", reorderImages(newImages));
    }
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
        <span className="text-xs text-slate-500 font-bold italic">
          اسحب الصور لترتيبها (الأولى هي الأساسية)
        </span>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x items-start">
        {/* زر الإضافة المحسن */}
        <label className="relative shrink-0 w-32 h-40 border-2 border-dashed border-blue-200 rounded-3xl flex flex-col items-center justify-center bg-blue-50/50 hover:bg-blue-100 transition-all cursor-pointer snap-start active:scale-95">
          {isUploading ? (
            <Loader2 className="animate-spin text-blue-500" />
          ) : (
            <Images className="text-blue-400" size={30} />
          )}
          <span className="text-[10px] font-black mt-2 text-blue-600">
            أضف صور
          </span>
          <Input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden" // إخفاء حقيقي
            onChange={handleFileChange}
            disabled={isUploading}
            accept="image/*"
          />
        </label>

        {/* عرض الصور مع السحب والإفلات */}
        {gallery.map((img: any, index: number) => (
          <div
            key={index}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => e.preventDefault()}
            className={`relative shrink-0 w-32 h-40 rounded-3xl overflow-hidden group border-2 cursor-move transition-all snap-start
              ${index === 0 ? "border-blue-600 ring-4 ring-blue-100" : "border-slate-100"}`}
          >
            <img
              src={getImageUrl(`${img.imageUrl}`)}
              className="w-full h-full object-cover pointer-events-none" // منع تداخل صورة المتصفح مع السحب
              alt="Vehicle"
            />

            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="bg-red-500/90 text-white rounded-full p-1.5 shadow-xl hover:bg-red-600"
              >
                <X size={14} />
              </button>
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
