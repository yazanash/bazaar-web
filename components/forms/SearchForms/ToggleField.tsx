export const ToggleField = ({ label, value, onChange, icon: Icon }: any) => (
  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
    <div className="flex items-center gap-2">
      {Icon && <Icon size={18} className="text-slate-400" />}
      <span className="font-bold text-slate-700">{label}</span>
    </div>
    <button
      onClick={() => onChange(!value)}
      className={`w-12 h-6 rounded-full transition-colors relative ${value ? "bg-blue-600" : "bg-slate-300"}`}
    >
      <div
        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${value ? "right-7" : "right-1"}`}
      />
    </button>
  </div>
);
