import Icon from "@/components/ui/icon";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const stats = [
  { label: "Администраторов", value: "12", icon: "Shield", color: "#6d5acd" },
  { label: "Лидеров", value: "8", icon: "Crown", color: "#3b82f6" },
  { label: "Заместителей", value: "24", icon: "Users", color: "#06b6d4" },
  { label: "Заявок в ожидании", value: "3", icon: "FileText", color: "#22c55e" },
];

const auditLog = [
  { user: "Алексей К.", action: "Одобрил заявку #1042", time: "2 мин назад", icon: "CheckCircle", color: "#22c55e" },
  { user: "Мария С.", action: "Добавила заместителя Козлов В.", time: "18 мин назад", icon: "UserPlus", color: "#6d5acd" },
  { user: "Дмитрий П.", action: "Изменил права лидера Орлова Н.", time: "1 час назад", icon: "Edit", color: "#3b82f6" },
  { user: "Система", action: "Резервная копия создана", time: "3 часа назад", icon: "Database", color: "#f97316" },
  { user: "Алексей К.", action: "Отклонил заявку #1039", time: "5 часов назад", icon: "XCircle", color: "#ef4444" },
  { user: "Ольга В.", action: "Вошла в систему", time: "вчера", icon: "LogIn", color: "#06b6d4" },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      {/* Hero */}
      <section className="text-center py-12 animate-slide-up">
        <h1
          className="mb-4 text-white font-display"
          style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "clamp(2rem,5vw,3.5rem)", lineHeight: 1.1 }}
        >
          Твой путь начинается здесь
        </h1>
        <p className="text-slate-400 text-base max-w-xl mx-auto mb-8 leading-relaxed">
          Присоединяйся к лучшему игровому сообществу. Управляй своими достижениями, следи за активностью и стань легендой.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={() => onNavigate("register")}
            className="btn-purple flex items-center gap-2 text-sm px-5 py-2.5"
          >
            <Icon name="UserPlus" size={15} />
            Присоединиться
          </button>
          <button className="btn-outline-dark flex items-center gap-2 text-sm px-5 py-2.5">
            <Icon name="MessageSquare" size={15} />
            Discord
          </button>
          <button className="btn-outline-dark flex items-center gap-2 text-sm px-5 py-2.5">
            <Icon name="ExternalLink" size={15} />
            VK
          </button>
        </div>
      </section>

      <div style={{ borderTop: "1px solid hsl(222 30% 14%)" }} />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`card-dark p-5 animate-fade-in stagger-${i + 1}`}
            style={{ animationFillMode: "forwards" }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
              style={{ background: `${s.color}20` }}
            >
              <Icon name={s.icon} fallback="Circle" size={18} style={{ color: s.color }} />
            </div>
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Audit log */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-white">Лог действий</h2>
          <span className="text-xs text-slate-600">Обновлено только что</span>
        </div>
        <div className="card-dark overflow-hidden">
          {auditLog.map((entry, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.025] transition-colors"
              style={{ borderBottom: i < auditLog.length - 1 ? "1px solid hsl(222 30% 14%)" : "none" }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: `${entry.color}18`, border: `1px solid ${entry.color}35` }}
              >
                <Icon name={entry.icon} fallback="Circle" size={13} style={{ color: entry.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm text-slate-200">{entry.action}</span>
                <span className="text-xs text-slate-600 ml-2">{entry.user}</span>
              </div>
              <span className="text-xs text-slate-600 flex-shrink-0">{entry.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6">
        <div
          className="card-dark p-6 cursor-pointer transition-all hover:border-purple-700/40"
          onClick={() => onNavigate("register")}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "#6d5acd22" }}>
              <Icon name="UserPlus" size={18} style={{ color: "#6d5acd" }} />
            </div>
            <div>
              <p className="font-bold text-white">Регистрация</p>
              <p className="text-xs text-slate-500">Создайте новый аккаунт</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className="btn-outline-dark text-xs py-2 flex items-center justify-center gap-1.5">
              <Icon name="MessageSquare" size={13} /> Discord
            </button>
            <button className="btn-outline-dark text-xs py-2 flex items-center justify-center gap-1.5">
              <Icon name="ExternalLink" size={13} /> VK
            </button>
          </div>
          <p className="text-center text-xs text-slate-600 mt-2">или</p>
        </div>

        <div
          className="card-dark p-6 cursor-pointer transition-all hover:border-blue-700/40"
          onClick={() => onNavigate("requests")}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "#3b82f622" }}>
              <Icon name="LogIn" size={18} style={{ color: "#3b82f6" }} />
            </div>
            <div>
              <p className="font-bold text-white">Заявки</p>
              <p className="text-xs text-slate-500">С возвращением в систему</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className="btn-outline-dark text-xs py-2 flex items-center justify-center gap-1.5">
              <Icon name="MessageSquare" size={13} /> Discord
            </button>
            <button className="btn-outline-dark text-xs py-2 flex items-center justify-center gap-1.5">
              <Icon name="ExternalLink" size={13} /> VK
            </button>
          </div>
          <p className="text-center text-xs text-slate-600 mt-2">или</p>
        </div>
      </div>
    </div>
  );
}
