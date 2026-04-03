import { useState } from "react";
import Icon from "@/components/ui/icon";

const activities = [
  { id: 1, title: "Турнир по Counter-Strike", category: "Киберспорт", participants: 32, date: "05.04.2026", status: "upcoming", organizer: "Алексей К.", color: "#a855f7" },
  { id: 2, title: "Командная встреча Q2", category: "Встреча", participants: 18, date: "03.04.2026", status: "active", organizer: "Мария С.", color: "#22c55e" },
  { id: 3, title: "Обучение новых участников", category: "Обучение", participants: 7, date: "01.04.2026", status: "active", organizer: "Дмитрий П.", color: "#3b82f6" },
  { id: 4, title: "Стратегическое планирование", category: "Планирование", participants: 12, date: "28.03.2026", status: "completed", organizer: "Ольга В.", color: "#06b6d4" },
  { id: 5, title: "Соревнование по Valorant", category: "Киберспорт", participants: 24, date: "25.03.2026", status: "completed", organizer: "Сергей Н.", color: "#f97316" },
  { id: 6, title: "Онлайн-конференция", category: "Встреча", participants: 45, date: "10.04.2026", status: "upcoming", organizer: "Алексей К.", color: "#ec4899" },
];

const statusConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  upcoming: { label: "Предстоит", color: "text-blue-400", bg: "rgba(59,130,246,0.15)", border: "rgba(59,130,246,0.4)" },
  active: { label: "Идёт сейчас", color: "text-green-400", bg: "rgba(34,197,94,0.15)", border: "rgba(34,197,94,0.4)" },
  completed: { label: "Завершено", color: "text-muted-foreground", bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.1)" },
};

export default function ActivitiesPage() {
  const [filter, setFilter] = useState("all");

  const filters = [
    { id: "all", label: "Все" },
    { id: "active", label: "Активные" },
    { id: "upcoming", label: "Предстоящие" },
    { id: "completed", label: "Завершённые" },
  ];

  const filtered = filter === "all" ? activities : activities.filter((a) => a.status === filter);

  return (
    <div className="p-6">
      <div className="animate-fade-in mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold gradient-text">Активности</h1>
          <p className="text-muted-foreground text-sm mt-1">{activities.length} событий в системе</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white neon-glow-blue transition-all hover:scale-105"
          style={{ background: "linear-gradient(135deg, #3b82f6, #06b6d4)" }}
        >
          <Icon name="Plus" size={16} />
          Создать
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-5 animate-fade-in stagger-1 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${filter === f.id
                ? "text-white"
                : "glass text-muted-foreground hover:text-white"
              }`}
            style={filter === f.id ? {
              background: "linear-gradient(135deg, rgba(168,85,247,0.4), rgba(236,72,153,0.3))",
              border: "1px solid rgba(168,85,247,0.5)",
            } : {}}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((act, i) => {
          const st = statusConfig[act.status];
          return (
            <div
              key={act.id}
              className="glass glass-hover rounded-xl overflow-hidden cursor-pointer animate-fade-in"
              style={{ animationDelay: `${0.05 * i}s` }}
            >
              {/* Color bar */}
              <div
                className="h-1"
                style={{ background: `linear-gradient(90deg, ${act.color}, transparent)` }}
              />
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <span
                    className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{ background: st.bg, border: `1px solid ${st.border}`, color: st.color.replace("text-", "") === "muted-foreground" ? undefined : undefined }}
                  >
                    <span className={st.color}>{st.label}</span>
                  </span>
                  <span className="text-xs text-muted-foreground glass rounded-full px-2 py-1">{act.category}</span>
                </div>
                <h3 className="font-semibold text-white text-base mb-1 leading-tight">{act.title}</h3>
                <p className="text-xs text-muted-foreground mb-4">{act.organizer}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Icon name="Users" size={13} />
                    <span>{act.participants} участников</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Icon name="Calendar" size={13} />
                    <span>{act.date}</span>
                  </div>
                </div>
                {act.status === "active" && (
                  <div className="mt-3 pt-3 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full animate-pulse-slow"
                          style={{ width: "60%", background: `linear-gradient(90deg, ${act.color}, transparent)` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">60%</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
