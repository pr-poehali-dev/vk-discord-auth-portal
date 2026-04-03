import { useState } from "react";
import Icon from "@/components/ui/icon";

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: "home", label: "Главная", icon: "LayoutDashboard" },
  { id: "register", label: "Регистрация", icon: "UserPlus" },
  { id: "admins", label: "Администраторы", icon: "Shield" },
  { id: "leaders", label: "Лидеры", icon: "Crown" },
  { id: "deputies", label: "Заместители", icon: "Users" },
  { id: "activities", label: "Активности", icon: "Activity" },
  { id: "requests", label: "Заявки", icon: "FileText" },
  { id: "profile", label: "Профиль", icon: "User" },
];

export default function Layout({ children, activePage, onNavigate }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${collapsed ? "w-16" : "w-64"} flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out relative z-10`}
        style={{
          background: "linear-gradient(180deg, hsl(240 15% 5%) 0%, hsl(240 12% 7%) 100%)",
          borderRight: "1px solid rgba(168, 85, 247, 0.15)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 neon-glow"
            style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}
          >
            <Icon name="Zap" size={16} className="text-white" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in overflow-hidden">
              <p className="font-display text-sm font-bold text-white leading-none">ADMINPANEL</p>
              <p className="text-xs text-muted-foreground mt-0.5">Панель управления</p>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto text-muted-foreground hover:text-white transition-colors"
          >
            <Icon name={collapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-1 scrollbar-dark overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative
                  ${isActive
                    ? "text-white"
                    : "text-muted-foreground hover:text-white"
                  }`}
                style={isActive ? {
                  background: "linear-gradient(135deg, rgba(168,85,247,0.25), rgba(236,72,153,0.15))",
                  borderLeft: "2px solid #a855f7",
                  boxShadow: "inset 0 0 20px rgba(168,85,247,0.1)",
                } : {}}
              >
                {!isActive && (
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "rgba(168,85,247,0.07)" }}
                  />
                )}
                <Icon name={item.icon} fallback="Circle" size={18} className="flex-shrink-0 relative z-10" />
                {!collapsed && (
                  <span className="relative z-10 truncate">{item.label}</span>
                )}
                {isActive && !collapsed && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse-slow" />
                )}
              </button>
            );
          })}
        </nav>

        {/* User badge */}
        <div className="p-3 border-t border-white/5">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg glass">
            <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
              style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}>
              А
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-white truncate">Администратор</p>
                <p className="text-xs text-muted-foreground truncate">Онлайн</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto scrollbar-dark bg-grid">
        {children}
      </main>
    </div>
  );
}