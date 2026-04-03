import Icon from "@/components/ui/icon";

const stats = [
  { label: "Администраторы", value: "12", icon: "Shield", color: "#a855f7", glow: "rgba(168,85,247,0.3)" },
  { label: "Лидеры", value: "8", icon: "Crown", color: "#ec4899", glow: "rgba(236,72,153,0.3)" },
  { label: "Заместители", value: "24", icon: "Users", color: "#3b82f6", glow: "rgba(59,130,246,0.3)" },
  { label: "Активности", value: "156", icon: "Activity", color: "#06b6d4", glow: "rgba(6,182,212,0.3)" },
];

const auditLog = [
  { user: "Алексей К.", action: "Добавил администратора Иванов А.", time: "2 мин назад", type: "create", icon: "UserPlus" },
  { user: "Мария С.", action: "Одобрила заявку #1042", time: "15 мин назад", type: "approve", icon: "CheckCircle" },
  { user: "Дмитрий П.", action: "Изменил права лидера", time: "1 час назад", type: "edit", icon: "Edit" },
  { user: "Система", action: "Резервная копия базы данных", time: "3 часа назад", type: "system", icon: "Database" },
  { user: "Алексей К.", action: "Удалил заявку #988", time: "5 часов назад", type: "delete", icon: "Trash2" },
  { user: "Ольга В.", action: "Вошла в систему", time: "вчера", type: "auth", icon: "LogIn" },
];

const typeColors: Record<string, string> = {
  create: "#22c55e",
  approve: "#a855f7",
  edit: "#3b82f6",
  system: "#f97316",
  delete: "#ef4444",
  auth: "#06b6d4",
};

const quickLinks = [
  { label: "Новый администратор", icon: "UserPlus", page: "admins" },
  { label: "Принять заявку", icon: "FileCheck", page: "requests" },
  { label: "Добавить активность", icon: "Plus", page: "activities" },
];

export default function HomePage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow" />
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Система активна</span>
        </div>
        <h1 className="font-display text-3xl font-bold gradient-text">Панель управления</h1>
        <p className="text-muted-foreground text-sm mt-1">Добро пожаловать, Администратор — 3 апреля 2026</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`glass glass-hover rounded-xl p-4 cursor-pointer animate-fade-in stagger-${i + 1}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${s.glow}`, boxShadow: `0 0 16px ${s.glow}` }}
              >
                <Icon name={s.icon} fallback="Circle" size={20} style={{ color: s.color }} />
              </div>
              <span className="text-xs text-muted-foreground glass rounded-full px-2 py-0.5">↑ 12%</span>
            </div>
            <p className="font-display text-3xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Audit log */}
        <div className="lg:col-span-2 glass rounded-xl p-5 animate-fade-in stagger-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Icon name="ScrollText" fallback="List" size={18} className="text-purple-400" />
              <h2 className="font-display text-lg font-semibold text-white">Аудит-лог</h2>
            </div>
            <span className="text-xs text-purple-400 glass rounded-full px-3 py-1 cursor-pointer hover:text-purple-300 transition-colors">
              Все записи →
            </span>
          </div>
          <div className="space-y-2">
            {auditLog.map((entry, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-200 cursor-default
                  hover:bg-white/5 animate-fade-in`}
                style={{ animationDelay: `${0.05 * i}s` }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: `${typeColors[entry.type]}22`,
                    border: `1px solid ${typeColors[entry.type]}44`,
                  }}
                >
                  <Icon name={entry.icon} fallback="Circle" size={13} style={{ color: typeColors[entry.type] }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium truncate">{entry.action}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{entry.user}</p>
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">{entry.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Quick actions */}
          <div className="glass rounded-xl p-5 animate-fade-in stagger-6">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Zap" size={18} className="text-yellow-400" />
              <h2 className="font-display text-lg font-semibold text-white">Быстрые действия</h2>
            </div>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <button
                  key={link.label}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white font-medium
                    transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(236,72,153,0.1))",
                    border: "1px solid rgba(168,85,247,0.2)",
                  }}
                >
                  <Icon name={link.icon} fallback="Circle" size={16} className="text-purple-400" />
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* System status */}
          <div className="glass rounded-xl p-5 animate-fade-in stagger-7">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Server" size={18} className="text-cyan-400" />
              <h2 className="font-display text-lg font-semibold text-white">Состояние системы</h2>
            </div>
            <div className="space-y-3">
              {[
                { label: "База данных", status: "Онлайн", ok: true },
                { label: "API сервер", status: "Онлайн", ok: true },
                { label: "Резервные копии", status: "Обновлено", ok: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.ok ? "bg-green-400" : "bg-red-400"} animate-pulse-slow`} />
                    <span className={`text-xs font-medium ${item.ok ? "text-green-400" : "text-red-400"}`}>{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
