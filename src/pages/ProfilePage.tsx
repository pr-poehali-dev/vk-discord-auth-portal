import { useState } from "react";
import Icon from "@/components/ui/icon";

const auditHistory = [
  { action: "Одобрил заявку #1038", time: "30.03.2026 14:20", icon: "CheckCircle", color: "#22c55e" },
  { action: "Изменил права участника Петров Д.", time: "28.03.2026 10:05", icon: "Edit", color: "#3b82f6" },
  { action: "Добавил активность «Турнир CS»", time: "25.03.2026 18:30", icon: "Plus", color: "#a855f7" },
  { action: "Отклонил заявку #1031", time: "20.03.2026 09:15", icon: "XCircle", color: "#ef4444" },
  { action: "Вошёл в систему", time: "15.03.2026 08:00", icon: "LogIn", color: "#06b6d4" },
];

const stats = [
  { label: "Одобрено заявок", value: "47", icon: "CheckCircle", color: "#22c55e" },
  { label: "Отклонено", value: "12", icon: "XCircle", color: "#ef4444" },
  { label: "Действий всего", value: "247", icon: "Activity", color: "#a855f7" },
  { label: "Дней в системе", value: "93", icon: "Calendar", color: "#06b6d4" },
];

export default function ProfilePage() {
  const [tab, setTab] = useState<"info" | "log" | "security">("info");

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="animate-fade-in mb-6">
        <h1 className="font-display text-3xl font-bold gradient-text">Профиль</h1>
        <p className="text-muted-foreground text-sm mt-1">Личные данные и история действий</p>
      </div>

      {/* Profile header */}
      <div className="glass rounded-2xl p-6 mb-5 animate-fade-in stagger-1 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ background: "linear-gradient(135deg, #a855f7, #ec4899, #3b82f6)" }}
        />
        <div className="relative flex items-center gap-5">
          <div className="relative">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white neon-glow"
              style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}
            >
              АК
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-background animate-pulse-slow" />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-2xl font-bold text-white">Алексей Карпов</h2>
            <p className="text-purple-400 font-medium text-sm">Главный администратор</p>
            <p className="text-muted-foreground text-xs mt-0.5">a.karpov@admin.ru · в системе с 01.01.2026</p>
          </div>
          <button className="glass glass-hover px-4 py-2 rounded-lg text-sm text-white font-medium flex items-center gap-2 transition-all">
            <Icon name="Edit" size={15} />
            Редактировать
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5 animate-fade-in stagger-2">
        {stats.map((s) => (
          <div key={s.label} className="glass rounded-xl p-4 text-center">
            <Icon name={s.icon} fallback="Circle" size={22} className="mx-auto mb-2" style={{ color: s.color }} />
            <p className="font-display text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 animate-fade-in stagger-3">
        {[
          { id: "info", label: "Данные", icon: "User" },
          { id: "log", label: "Мои действия", icon: "ScrollText" },
          { id: "security", label: "Безопасность", icon: "Lock" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as typeof tab)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
              ${tab === t.id ? "text-white" : "glass text-muted-foreground hover:text-white"}`}
            style={tab === t.id ? {
              background: "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(236,72,153,0.2))",
              border: "1px solid rgba(168,85,247,0.4)",
            } : {}}
          >
            <Icon name={t.icon} fallback="Circle" size={15} />
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="glass rounded-xl p-6 animate-fade-in stagger-4">
        {tab === "info" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Имя и фамилия", value: "Алексей Карпов" },
              { label: "Email", value: "a.karpov@admin.ru" },
              { label: "Телефон", value: "+7 900 123-45-67" },
              { label: "Telegram", value: "@a_karpov" },
              { label: "Отдел", value: "Главный штаб" },
              { label: "Роль", value: "Главный администратор" },
            ].map((field) => (
              <div key={field.label}>
                <label className="text-xs text-muted-foreground uppercase tracking-wider">{field.label}</label>
                <p className="text-sm text-white font-medium mt-1 bg-white/5 rounded-lg px-4 py-2.5 border border-white/8">{field.value}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "log" && (
          <div className="space-y-2">
            <h3 className="font-semibold text-white mb-4">История моих действий</h3>
            {auditHistory.map((entry, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all"
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `${entry.color}22`, border: `1px solid ${entry.color}44` }}
                >
                  <Icon name={entry.icon} fallback="Circle" size={13} style={{ color: entry.color }} />
                </div>
                <span className="flex-1 text-sm text-white">{entry.action}</span>
                <span className="text-xs text-muted-foreground">{entry.time}</span>
              </div>
            ))}
          </div>
        )}

        {tab === "security" && (
          <div className="space-y-4">
            <h3 className="font-semibold text-white mb-4">Безопасность аккаунта</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/3 border border-white/8">
                <div className="flex items-center gap-3">
                  <Icon name="Lock" size={18} className="text-purple-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Пароль</p>
                    <p className="text-xs text-muted-foreground">Последнее изменение: 01.03.2026</p>
                  </div>
                </div>
                <button className="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors">Изменить</button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/3 border border-white/8">
                <div className="flex items-center gap-3">
                  <Icon name="Smartphone" size={18} className="text-blue-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Двухфакторная аутентификация</p>
                    <p className="text-xs text-muted-foreground">Не подключена</p>
                  </div>
                </div>
                <button className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">Подключить</button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/3 border border-white/8">
                <div className="flex items-center gap-3">
                  <Icon name="LogOut" size={18} className="text-red-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Выйти из всех устройств</p>
                    <p className="text-xs text-muted-foreground">Активных сессий: 2</p>
                  </div>
                </div>
                <button className="text-sm text-red-400 hover:text-red-300 font-medium transition-colors">Выйти</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
