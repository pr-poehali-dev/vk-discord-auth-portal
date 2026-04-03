import { useState } from "react";
import Icon from "@/components/ui/icon";
import Notification from "@/components/Notification";

interface Request {
  id: number;
  from: string;
  email: string;
  type: string;
  message: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

const initialRequests: Request[] = [
  { id: 1042, from: "Михаил Рябов", email: "m.ryabov@mail.ru", type: "Вступление", message: "Хочу присоединиться к команде. Имею опыт администрирования 3 года.", date: "03.04.2026", status: "pending" },
  { id: 1041, from: "Екатерина Ильина", email: "e.ilina@gmail.com", type: "Повышение", message: "Прошу рассмотреть мою кандидатуру на позицию лидера отдела.", date: "02.04.2026", status: "pending" },
  { id: 1040, from: "Артём Громов", email: "a.gromov@yandex.ru", type: "Вступление", message: "Хочу стать частью команды. Готов участвовать в мероприятиях.", date: "01.04.2026", status: "approved" },
  { id: 1039, from: "Полина Тихонова", email: "p.tihonova@corp.ru", type: "Исключение", message: "Прошу рассмотреть исключение участника Козлов В.", date: "31.03.2026", status: "rejected" },
  { id: 1038, from: "Денис Лукьянов", email: "d.lukyanov@mail.ru", type: "Вступление", message: "Хочу присоединиться к клану. Опыт 5 лет.", date: "30.03.2026", status: "approved" },
];

const statusCfg = {
  pending:  { label: "На рассмотрении", color: "#f59e0b", bg: "#f59e0b15", border: "#f59e0b30" },
  approved: { label: "Одобрено",         color: "#22c55e", bg: "#22c55e15", border: "#22c55e30" },
  rejected: { label: "Отклонено",        color: "#ef4444", bg: "#ef444415", border: "#ef444430" },
};

const typeCfg: Record<string, string> = {
  "Вступление": "#22c55e",
  "Повышение":  "#6d5acd",
  "Исключение": "#ef4444",
};

interface NotifState { message: string; type: "success" | "error" | "info" }

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");
  const [notif, setNotif] = useState<NotifState | null>(null);

  const showNotif = (message: string, type: NotifState["type"] = "success") => {
    setNotif({ message, type });
  };

  const handleAction = (id: number, action: "approved" | "rejected") => {
    const req = requests.find((r) => r.id === id);
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: action } : r));
    setSelected(null);
    if (action === "approved") {
      showNotif(`Заявка #${id} от ${req?.from} — одобрена`, "success");
    } else {
      showNotif(`Заявка #${id} от ${req?.from} — отклонена`, "error");
    }
  };

  const filtered = filter === "all" ? requests : requests.filter((r) => r.status === filter);
  const pending = requests.filter((r) => r.status === "pending").length;

  const tabs = [
    { id: "all",      label: "Все",            count: requests.length },
    { id: "pending",  label: "Ожидание",        count: pending },
    { id: "approved", label: "Одобренные",      count: requests.filter((r) => r.status === "approved").length },
    { id: "rejected", label: "Отклонённые",     count: requests.filter((r) => r.status === "rejected").length },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {notif && (
        <Notification message={notif.message} type={notif.type} onClose={() => setNotif(null)} />
      )}

      <div className="flex items-center justify-between mb-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Montserrat, sans-serif" }}>Заявки</h1>
          {pending > 0 && (
            <p className="text-sm text-slate-400 mt-0.5">
              <span style={{ color: "#f59e0b" }} className="font-semibold">{pending}</span> ожидают решения
            </p>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 animate-fade-in stagger-1" style={{ animationFillMode: "forwards" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={filter === tab.id ? {
              background: "#6d5acd25",
              border: "1px solid #6d5acd50",
              color: "#c4b5fd",
            } : {
              background: "hsl(222 35% 12%)",
              border: "1px solid hsl(222 30% 18%)",
              color: "#64748b",
            }}
          >
            {tab.label}
            <span
              className="text-xs px-1.5 py-0.5 rounded-full"
              style={{ background: filter === tab.id ? "#6d5acd40" : "hsl(222 30% 16%)", color: filter === tab.id ? "#c4b5fd" : "#475569" }}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <div className="space-y-2.5">
        {filtered.map((req, i) => {
          const st = statusCfg[req.status];
          const isOpen = selected === req.id;
          return (
            <div
              key={req.id}
              className="card-dark overflow-hidden transition-all duration-200 cursor-pointer animate-fade-in"
              style={{
                animationDelay: `${0.04 * i}s`,
                animationFillMode: "forwards",
                ...(isOpen ? { border: "1px solid #6d5acd40" } : {}),
              }}
              onClick={() => setSelected(isOpen ? null : req.id)}
            >
              <div className="flex items-center gap-4 px-5 py-4">
                {/* Avatar */}
                <div
                  className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
                  style={{ background: "#6d5acd22", color: "#a78bfa", border: "1px solid #6d5acd35" }}
                >
                  {req.from.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-slate-100">{req.from}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: `${typeCfg[req.type]}18`, color: typeCfg[req.type], border: `1px solid ${typeCfg[req.type]}35` }}
                    >
                      {req.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{req.message}</p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-slate-600 hidden sm:block">{req.date}</span>
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: st.bg, border: `1px solid ${st.border}`, color: st.color }}
                  >
                    {st.label}
                  </span>
                  <span className="text-xs text-slate-600">#{req.id}</span>
                  <Icon
                    name={isOpen ? "ChevronUp" : "ChevronDown"}
                    size={15}
                    className="text-slate-600"
                  />
                </div>
              </div>

              {isOpen && (
                <div
                  className="px-5 pb-5 pt-0 animate-fade-in"
                  style={{ borderTop: "1px solid hsl(222 30% 14%)" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="pt-4 space-y-2 mb-4">
                    <p className="text-xs text-slate-500">Email: <span className="text-slate-300">{req.email}</span></p>
                    <p className="text-sm text-slate-300 leading-relaxed">{req.message}</p>
                  </div>
                  {req.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAction(req.id, "approved")}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
                        style={{ background: "linear-gradient(135deg, #16a34a, #15803d)" }}
                      >
                        <Icon name="Check" size={14} /> Одобрить
                      </button>
                      <button
                        onClick={() => handleAction(req.id, "rejected")}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
                        style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)" }}
                      >
                        <Icon name="X" size={14} /> Отклонить
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
