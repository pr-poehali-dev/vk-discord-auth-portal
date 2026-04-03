import { useState } from "react";
import Icon from "@/components/ui/icon";

const deputies = [
  { id: 1, name: "Андрей Волков", email: "a.volkov@corp.ru", leader: "Виктор Громов", department: "Отдел A", status: "active", since: "10.01.2026", avatar: "АВ" },
  { id: 2, name: "Юлия Козлова", email: "u.kozlova@corp.ru", leader: "Наталья Орлова", department: "Отдел B", status: "active", since: "15.01.2026", avatar: "ЮК" },
  { id: 3, name: "Павел Соловьёв", email: "p.solovev@corp.ru", leader: "Роман Кузнецов", department: "Отдел A", status: "away", since: "20.02.2026", avatar: "ПС" },
  { id: 4, name: "Алина Зайцева", email: "a.zaitseva@corp.ru", leader: "Елена Морозова", department: "Отдел C", status: "active", since: "01.03.2026", avatar: "АЗ" },
  { id: 5, name: "Николай Попов", email: "n.popov@corp.ru", leader: "Игорь Белов", department: "Отдел B", status: "inactive", since: "05.02.2026", avatar: "НП" },
  { id: 6, name: "Вера Лебедева", email: "v.lebedeva@corp.ru", leader: "Татьяна Лазарева", department: "Отдел D", status: "active", since: "12.03.2026", avatar: "ВЛ" },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  active: { label: "Активен", color: "text-green-400", bg: "bg-green-400" },
  away: { label: "Отошёл", color: "text-yellow-400", bg: "bg-yellow-400" },
  inactive: { label: "Неактивен", color: "text-red-400", bg: "bg-red-400" },
};

const colors = ["#a855f7", "#ec4899", "#3b82f6", "#06b6d4", "#f97316", "#22c55e"];

export default function DeputiesPage() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="p-6">
      <div className="animate-fade-in mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold gradient-text">Заместители</h1>
          <p className="text-muted-foreground text-sm mt-1">{deputies.length} заместителей в системе</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex glass rounded-lg p-1 gap-1">
            <button
              onClick={() => setView("grid")}
              className={`p-1.5 rounded-md transition-all ${view === "grid" ? "bg-purple-500/30 text-purple-300" : "text-muted-foreground hover:text-white"}`}
            >
              <Icon name="LayoutGrid" size={16} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-1.5 rounded-md transition-all ${view === "list" ? "bg-purple-500/30 text-purple-300" : "text-muted-foreground hover:text-white"}`}
            >
              <Icon name="List" size={16} />
            </button>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white neon-glow transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #3b82f6, #a855f7)" }}
          >
            <Icon name="Plus" size={16} />
            Добавить
          </button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {deputies.map((dep, i) => {
            const st = statusConfig[dep.status];
            return (
              <div
                key={dep.id}
                className={`glass glass-hover rounded-xl p-5 cursor-pointer animate-fade-in`}
                style={{ animationDelay: `${0.05 * i}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ background: `${colors[i % colors.length]}22`, border: `1px solid ${colors[i % colors.length]}44`, color: colors[i % colors.length] }}
                    >
                      {dep.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{dep.name}</p>
                      <p className="text-xs text-muted-foreground">{dep.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${st.bg} animate-pulse-slow`} />
                    <span className={`text-xs ${st.color}`}>{st.label}</span>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Mail" size={12} />
                    <span className="truncate">{dep.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Crown" size={12} />
                    <span>{dep.leader}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Calendar" size={12} />
                    <span>с {dep.since}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 pt-3 border-t border-white/5">
                  <button className="flex-1 py-1.5 text-xs font-medium text-white rounded-lg transition-all hover:scale-105"
                    style={{ background: "rgba(168,85,247,0.2)", border: "1px solid rgba(168,85,247,0.3)" }}>
                    Профиль
                  </button>
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-all">
                    <Icon name="Trash2" size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass rounded-xl overflow-hidden">
          {deputies.map((dep, i) => {
            const st = statusConfig[dep.status];
            return (
              <div key={dep.id} className="flex items-center gap-4 px-5 py-4 border-b border-white/5 last:border-0 hover:bg-white/3 transition-all">
                <div
                  className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
                  style={{ background: `${colors[i % colors.length]}22`, border: `1px solid ${colors[i % colors.length]}44`, color: colors[i % colors.length] }}
                >
                  {dep.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{dep.name}</p>
                  <p className="text-xs text-muted-foreground">{dep.email}</p>
                </div>
                <span className="text-xs text-muted-foreground hidden md:block">{dep.leader}</span>
                <span className="text-xs text-muted-foreground hidden lg:block">{dep.department}</span>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${st.bg}`} />
                  <span className={`text-xs ${st.color}`}>{st.label}</span>
                </div>
                <div className="flex gap-1">
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 transition-all">
                    <Icon name="Edit" size={14} />
                  </button>
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-all">
                    <Icon name="Trash2" size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
