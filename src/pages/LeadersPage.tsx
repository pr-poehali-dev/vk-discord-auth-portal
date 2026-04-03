import Icon from "@/components/ui/icon";

const leaders = [
  { id: 1, name: "Виктор Громов", rank: 1, score: 9840, department: "Отдел A", badge: "Легенда", avatar: "ВГ", trend: "+12%" },
  { id: 2, name: "Наталья Орлова", rank: 2, score: 8720, department: "Отдел B", badge: "Эксперт", avatar: "НО", trend: "+8%" },
  { id: 3, name: "Роман Кузнецов", rank: 3, score: 7560, department: "Отдел A", badge: "Мастер", avatar: "РК", trend: "+5%" },
  { id: 4, name: "Елена Морозова", rank: 4, score: 6430, department: "Отдел C", badge: "Про", avatar: "ЕМ", trend: "+3%" },
  { id: 5, name: "Игорь Белов", rank: 5, score: 5210, department: "Отдел B", badge: "Опытный", avatar: "ИБ", trend: "+1%" },
  { id: 6, name: "Татьяна Лазарева", rank: 6, score: 4180, department: "Отдел D", badge: "Активный", avatar: "ТЛ", trend: "-2%" },
  { id: 7, name: "Кирилл Макаров", rank: 7, score: 3720, department: "Отдел C", badge: "Активный", avatar: "КМ", trend: "+4%" },
  { id: 8, name: "Светлана Фёдорова", rank: 8, score: 2950, department: "Отдел A", badge: "Новичок", avatar: "СФ", trend: "+15%" },
];

const rankColors: Record<number, { bg: string; text: string; glow: string }> = {
  1: { bg: "linear-gradient(135deg, #f59e0b, #f97316)", text: "#f59e0b", glow: "rgba(245,158,11,0.4)" },
  2: { bg: "linear-gradient(135deg, #94a3b8, #cbd5e1)", text: "#94a3b8", glow: "rgba(148,163,184,0.3)" },
  3: { bg: "linear-gradient(135deg, #cd7c2c, #b45309)", text: "#cd7c2c", glow: "rgba(205,124,44,0.3)" },
};

const avatarColors = ["#a855f7", "#ec4899", "#3b82f6", "#06b6d4", "#f97316", "#22c55e", "#8b5cf6", "#14b8a6"];

export default function LeadersPage() {
  return (
    <div className="p-6">
      <div className="animate-fade-in mb-6">
        <h1 className="font-display text-3xl font-bold gradient-text">Лидеры</h1>
        <p className="text-muted-foreground text-sm mt-1">Рейтинг участников по активности</p>
      </div>

      {/* Top 3 podium */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[leaders[1], leaders[0], leaders[2]].map((leader, idx) => {
          const realRank = idx === 0 ? 2 : idx === 1 ? 1 : 3;
          const rc = rankColors[realRank];
          const isFirst = realRank === 1;
          return (
            <div
              key={leader.id}
              className={`glass glass-hover rounded-2xl p-5 text-center animate-fade-in cursor-pointer ${isFirst ? "stagger-2" : "stagger-1"}`}
              style={isFirst ? { border: "1px solid rgba(245,158,11,0.3)", boxShadow: "0 0 30px rgba(245,158,11,0.1)" } : {}}
            >
              {isFirst && (
                <div className="flex justify-center mb-2">
                  <Icon name="Crown" size={20} style={{ color: "#f59e0b" }} />
                </div>
              )}
              <div
                className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center text-lg font-bold mb-3 ${isFirst ? "w-16 h-16 text-xl" : ""}`}
                style={{
                  background: `${avatarColors[leader.rank - 1]}33`,
                  border: `2px solid ${avatarColors[leader.rank - 1]}`,
                  color: avatarColors[leader.rank - 1],
                }}
              >
                {leader.avatar}
              </div>
              <div
                className="w-7 h-7 rounded-full mx-auto flex items-center justify-center text-xs font-bold mb-2 -mt-5 relative z-10"
                style={{ background: rc.bg, boxShadow: `0 0 12px ${rc.glow}` }}
              >
                {realRank}
              </div>
              <p className="font-semibold text-white text-sm">{leader.name}</p>
              <p className="text-xs text-muted-foreground mb-2">{leader.department}</p>
              <p className="font-display text-2xl font-bold" style={{ color: rc.text }}>{leader.score.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">очков</p>
            </div>
          );
        })}
      </div>

      {/* Full list */}
      <div className="glass rounded-xl overflow-hidden animate-fade-in stagger-3">
        {leaders.slice(3).map((leader, i) => (
          <div
            key={leader.id}
            className="flex items-center gap-4 px-5 py-4 border-b border-white/5 last:border-0 hover:bg-white/3 transition-all cursor-pointer"
            style={{ animationDelay: `${0.05 * i}s` }}
          >
            <span className="w-6 text-center text-muted-foreground font-display font-bold text-sm">{leader.rank}</span>
            <div
              className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
              style={{
                background: `${avatarColors[leader.rank - 1]}22`,
                border: `1px solid ${avatarColors[leader.rank - 1]}44`,
                color: avatarColors[leader.rank - 1],
              }}
            >
              {leader.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">{leader.name}</p>
              <p className="text-xs text-muted-foreground">{leader.department}</p>
            </div>
            <span className="text-xs glass rounded-full px-2 py-1 text-muted-foreground">{leader.badge}</span>
            <span className={`text-xs font-semibold ${leader.trend.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
              {leader.trend}
            </span>
            <span className="font-display font-bold text-white text-sm w-16 text-right">{leader.score.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
