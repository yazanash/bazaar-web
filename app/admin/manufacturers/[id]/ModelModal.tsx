import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import {
  createManufacturerModel,
  updateManufacturerModel,
} from "@/lib/actions/admin";
import { ModelResponse } from "@/types/admin";
import { ArabicLabels, Category } from "@/types/enums";

export function ModelModal({
  isOpen,
  onClose,
  model,
  manufacturerId,
  onCreated,
  onUpdated,
}: any) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ModelResponse>({
    id: 0,
    manufacturerId: manufacturerId,
    name: "",
    category: "passenger", // قيمة افتراضية
  });

  useEffect(() => {
    if (model) setFormData(model);
    else
      setFormData({
        id: 0,
        manufacturerId: manufacturerId,
        name: "",
        category: "passenger",
      });
  }, [model, isOpen]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (model) {
        const res = await updateManufacturerModel(formData);
        if (res.success) onUpdated(res.data);
          alert("تمت التعديل بنجاح");
      } else {
        const res = await createManufacturerModel(formData);
        if (res.success) onCreated(res.data);
        alert("تمت الاضافة بنجاح");
      }

      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-112.5 rounded-[2rem] p-8" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-slate-800 text-right">
            {model ? "تعديل الموديل" : "إضافة موديل جديد"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-6 text-right">
          <div className="space-y-2">
            <Label className="font-bold">اسم الموديل</Label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="مثلاً: Camry, Land Cruiser..."
              className="h-12 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-bold">الفئة</Label>
            <Select
              onValueChange={(val) => {
                setFormData({ ...formData, category: val });
              }}
              defaultValue={formData.category}
            >
              <SelectTrigger className="h-12 w-full text-center rounded-xl bg-slate-50 border-slate-200">
                <SelectValue placeholder="اختر الفئة" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Category).map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {ArabicLabels.Category[cat]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row-reverse gap-3">
          <Button
            disabled={loading}
            onClick={handleSubmit}
            className="w-full h-12 rounded-xl bg-blue-600 font-bold"
          >
            {loading ? "جاري الحفظ..." : "حفظ البيانات"}
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full h-12 rounded-xl font-bold"
          >
            إلغاء
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
