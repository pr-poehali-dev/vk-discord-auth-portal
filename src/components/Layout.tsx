import Icon from "@/components/ui/icon";

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: "home", label: "Главная" },
  { id: "register", label: "Регистрация" },
  { id: "admins", label: "Администраторы" },
  { id: "leaders", label: "Лидеры" },
  { id: "deputies", label: "Заместители" },
  { id: "requests", label: "Заявки" },
  { id: "profile", label: "Профиль" },
];

export default function Layout({ children, activePage, onNavigate }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "hsl(222 47% 6%)" }}>
      {/* Navbar */}
      <header
        className="flex-shrink-0 border-b"
        style={{
          background: "hsl(222 45% 8%)",
          borderColor: "hsl(222 30% 14%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-6">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2.5 flex-shrink-0 mr-4"
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white"
              style={{ background: "linear-gradient(135deg, #6d5acd, #5b47b8)" }}
            >
              G
            </div>
            <span className="font-display font-bold text-sm text-white tracking-wide">
              GERLIX<span style={{ color: "#8b7ee8" }}>CORE</span>
            </span>
          </button>

          {/* Nav links */}
          <nav className="flex items-center gap-1 flex-1 overflow-x-auto scrollbar-dark">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`nav-link whitespace-nowrap flex-shrink-0 ${activePage === item.id ? "active" : ""}`}
                style={activePage === item.id ? {
                  color: "#e2e8f0",
                  background: "hsl(222 35% 14%)",
                } : {}}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3 flex-shrink-0 ml-auto">
            <button
              onClick={() => onNavigate("profile")}
              className="nav-link"
            >
              Профиль
            </button>
            <button
              onClick={() => onNavigate("register")}
              className="btn-purple text-sm px-4 py-2"
            >
              Регистрация
            </button>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 overflow-auto scrollbar-dark">
        {children}
      </main>
    </div>
  );
}
