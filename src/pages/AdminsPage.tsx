import { useState } from "react";
import Icon from "@/components/ui/icon";

const admins = [
  { id: 1, name: "Алексей Карпов", email: "a.karpov@admin.ru", status: "active", joined: "01.01.2026", actions: 247, avatar: "АК" },
  { id: 2, name: "Мария Соколова", email: "m.sokolova@admin.ru", status: "active", joined: "15.02.2026", actions: 183, avatar: "МС" },
  { id: 3, name: "Дмитрий Петров", email: "d.petrov@admin.ru", status: "away", joined: "10.01.2026", actions: 92, avatar: "ДП" },
  { id: 4, name: "Ольга Васильева", email: "o.vasil@admin.ru", status: "inactive", joined: "20.03.2026", actions: 31, avatar: "ОВ" },
  { id: 5, name: "Сергей Новиков", email: "s.novikov@admin.ru", status: "active", joined: "05.02.2026", actions: 164, avatar: "СН" },
];

const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
  active: { label: "Активен", color: "text-green-400", dot: "bg-green-400" },
  away: { label: "Отошёл", color: "text-yellow-400", dot: "bg-yellow-400" },
  inactive: { label: "Неактивен", color: "text-red-400", dot: "bg-red-400" },
};

const colors = ["#a855f7", "#ec4899", "#3b82f6", "#06b6d4", "#f97316"];

export default function AdminsPage() {
  const [search, setSearch] = useState("");

  const filtered = admins.filter(
    (a) => a.name.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="animate-fade-in mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold gradient-text">Администраторы</h1>
          <p className="text-muted-foreground text-sm mt-1">{admins.length} участников в системе</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white neon-glow transition-all hover:scale-105"
          style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}
        >
          <Icon name="Plus" size={16} />
          Добавить
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4 animate-fade-in stagger-1">
        <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Поиск администратора..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-muted-foreground
            focus:outline-none focus:border-purple-500/50 transition-all"
        />
      </div>

      {/* Table */}
      <div className="glass rounded-xl overflow-hidden animate-fade-in stagger-2">
        <div className="grid grid-cols-[auto_1fr_1fr_auto_auto_auto] items-center gap-4 px-5 py-3 border-b border-white/5">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">#</span>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Участник</span>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Email</span>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Статус</span>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Действий</span>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Действия</span>
        </div>
        {filtered.map((admin, i) => {
          const st = statusConfig[admin.status];
          return (
            <div
              key={admin.id}
              className={`grid grid-cols-[auto_1fr_1fr_auto_auto_auto] items-center gap-4 px-5 py-4
                border-b border-white/5 last:border-0 hover:bg-white/3 transition-all duration-200 animate-fade-in`}
              style={{ animationDelay: `${0.05 * i}s` }}
            >
              <span className="text-xs text-muted-foreground w-5">{admin.id}</span>
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: `${colors[i % colors.length]}33`, border: `1px solid ${colors[i % colors.length]}66`, color: colors[i % colors.length] }}
                >
                  {admin.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">{admin.name}</p>
                  <p className="text-xs text-muted-foreground">с {admin.joined}</p>
                </div>
              </div>
              <span className="text-sm text-muted-foreground truncate">{admin.email}</span>
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${st.dot} animate-pulse-slow`} />
                <span className={`text-xs font-medium ${st.color}`}>{st.label}</span>
              </div>
              <span className="text-sm text-white font-semibold text-center">{admin.actions}</span>
              <div className="flex items-center gap-1">
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
    </div>
  );
}
