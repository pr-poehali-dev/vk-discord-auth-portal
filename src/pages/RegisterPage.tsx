import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", role: "admin", password: "" });

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="animate-fade-in mb-6">
        <h1 className="font-display text-3xl font-bold gradient-text">Регистрация</h1>
        <p className="text-muted-foreground text-sm mt-1">Добавьте нового участника в систему</p>
      </div>

      <div className="glass rounded-2xl p-8 animate-fade-in stagger-1">
        {/* Avatar placeholder */}
        <div className="flex justify-center mb-6">
          <div className="relative cursor-pointer group">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #a855f7, #ec4899, #3b82f6)" }}
            >
              <Icon name="User" size={36} className="text-white" />
            </div>
            <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
              <Icon name="Camera" size={20} className="text-white" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Имя и фамилия</label>
              <input
                type="text"
                placeholder="Иванов Иван"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-muted-foreground
                  focus:outline-none focus:border-purple-500/60 focus:bg-white/7 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</label>
              <input
                type="email"
                placeholder="email@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-muted-foreground
                  focus:outline-none focus:border-purple-500/60 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Роль</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "admin", label: "Администратор", icon: "Shield", color: "#a855f7" },
                { value: "leader", label: "Лидер", icon: "Crown", color: "#ec4899" },
                { value: "deputy", label: "Заместитель", icon: "Users", color: "#3b82f6" },
              ].map((role) => (
                <button
                  key={role.value}
                  onClick={() => setForm({ ...form, role: role.value })}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all duration-200
                    ${form.role === role.value
                      ? "border-transparent text-white"
                      : "border-white/10 text-muted-foreground hover:border-white/20 hover:text-white"
                    }`}
                  style={form.role === role.value ? {
                    background: `${role.color}22`,
                    border: `1px solid ${role.color}66`,
                    boxShadow: `0 0 16px ${role.color}22`,
                  } : {}}
                >
                  <Icon name={role.icon} fallback="Circle" size={22} style={{ color: form.role === role.value ? role.color : undefined }} />
                  <span className="text-xs font-medium">{role.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Пароль</label>
            <input
              type="password"
              placeholder="Минимум 8 символов"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-muted-foreground
                focus:outline-none focus:border-purple-500/60 transition-all"
            />
          </div>

          <button
            className="w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-200
              hover:scale-[1.02] active:scale-[0.98] neon-glow mt-2"
            style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}
          >
            Зарегистрировать участника
          </button>
        </div>
      </div>
    </div>
  );
}
