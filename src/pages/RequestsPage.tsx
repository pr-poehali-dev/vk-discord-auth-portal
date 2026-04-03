import { useState } from "react";
import Icon from "@/components/ui/icon";

const requests = [
  { id: 1042, from: "Михаил Рябов", email: "m.ryabov@mail.ru", type: "Вступление", message: "Хочу присоединиться к команде. Имею опыт администрирования 3 года.", date: "03.04.2026", status: "pending" },
  { id: 1041, from: "Екатерина Ильина", email: "e.ilina@gmail.com", type: "Повышение", message: "Прошу рассмотреть мою кандидатуру на позицию лидера отдела.", date: "02.04.2026", status: "pending" },
  { id: 1040, from: "Артём Громов", email: "a.gromov@yandex.ru", type: "Вступление", message: "Хочу стать частью команды. Готов участвовать в активностях.", date: "01.04.2026", status: "approved" },
  { id: 1039, from: "Полина Тихонова", email: "p.tihonova@corp.ru", type: "Исключение", message: "Прошу рассмотреть исключение участника Козлов В.", date: "31.03.2026", status: "rejected" },
  { id: 1038, from: "Денис Лукьянов", email: "d.lukyanov@mail.ru", type: "Вступление", message: "Хочу присоединиться к клану. Опыт 5 лет.", date: "30.03.2026", status: "approved" },
];

const statusConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  pending: { label: "На рассмотрении", color: "text-yellow-400", bg: "rgba(234,179,8,0.1)", border: "rgba(234,179,8,0.3)" },
  approved: { label: "Одобрено", color: "text-green-400", bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.3)" },
  rejected: { label: "Отклонено", color: "text-red-400", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.3)" },
};

const typeColors: Record<string, string> = {
  "Вступление": "#22c55e",
  "Повышение": "#a855f7",
  "Исключение": "#ef4444",
};

export default function RequestsPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? requests : requests.filter((r) => r.status === filter);

  const pending = requests.filter((r) => r.status === "pending").length;

  return (
    <div className="p-6">
      <div className="animate-fade-in mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold gradient-text">Заявки</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {pending > 0 && (
              <span className="text-yellow-400 font-semibold">{pending} ожидают решения · </span>
            )}
            Всего {requests.length} заявок
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5 animate-fade-in stagger-1">
        {[
          { id: "all", label: "Все", count: requests.length },
          { id: "pending", label: "Ожидание", count: requests.filter((r) => r.status === "pending").length },
          { id: "approved", label: "Одобренные", count: requests.filter((r) => r.status === "approved").length },
          { id: "rejected", label: "Отклонённые", count: requests.filter((r) => r.status === "rejected").length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${filter === tab.id ? "text-white" : "glass text-muted-foreground hover:text-white"}`}
            style={filter === tab.id ? {
              background: "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(236,72,153,0.2))",
              border: "1px solid rgba(168,85,247,0.4)",
            } : {}}
          >
            {tab.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${filter === tab.id ? "bg-white/20" : "bg-white/5"}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((req, i) => {
          const st = statusConfig[req.status];
          const isOpen = selected === req.id;
          return (
            <div
              key={req.id}
              className={`glass rounded-xl overflow-hidden transition-all duration-300 animate-fade-in ${req.status === "pending" ? "glass-hover cursor-pointer" : "cursor-pointer"}`}
              style={{ animationDelay: `${0.05 * i}s`, ...(isOpen ? { border: "1px solid rgba(168,85,247,0.3)" } : {}) }}
              onClick={() => setSelected(isOpen ? null : req.id)}
            >
              <div className="flex items-center gap-4 px-5 py-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}>
                  {req.from.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-white">{req.from}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: `${typeColors[req.type]}22`, color: typeColors[req.type], border: `1px solid ${typeColors[req.type]}44` }}
                    >
                      {req.type}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{req.message}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-muted-foreground hidden sm:block">{req.date}</span>
                  <span
                    className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{ background: st.bg, border: `1px solid ${st.border}` }}
                  >
                    <span className={st.color}>{st.label}</span>
                  </span>
                  <span className="text-xs text-muted-foreground">#{req.id}</span>
                  <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={16} className="text-muted-foreground" />
                </div>
              </div>

              {isOpen && (
                <div className="px-5 pb-4 border-t border-white/5 pt-4 animate-fade-in">
                  <p className="text-sm text-muted-foreground mb-1">Email: <span className="text-white">{req.email}</span></p>
                  <p className="text-sm text-foreground mb-4">{req.message}</p>
                  {req.status === "pending" && (
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:scale-105"
                        style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)", boxShadow: "0 0 16px rgba(34,197,94,0.3)" }}
                      >
                        <Icon name="Check" size={15} />
                        Одобрить
                      </button>
                      <button
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:scale-105"
                        style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)", boxShadow: "0 0 16px rgba(239,68,68,0.3)" }}
                      >
                        <Icon name="X" size={15} />
                        Отклонить
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
