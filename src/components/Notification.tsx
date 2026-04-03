import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

interface NotificationProps {
  message: string;
  type?: "success" | "info" | "error";
  onClose: () => void;
}

const configs = {
  success: { icon: "CheckCircle", color: "#22c55e", bg: "#22c55e18", border: "#22c55e35" },
  info: { icon: "Bell", color: "#6d5acd", bg: "#6d5acd18", border: "#6d5acd35" },
  error: { icon: "XCircle", color: "#ef4444", bg: "#ef444418", border: "#ef444435" },
};

export default function Notification({ message, type = "success", onClose }: NotificationProps) {
  const [visible, setVisible] = useState(true);
  const cfg = configs[type];

  useEffect(() => {
    const t = setTimeout(() => { setVisible(false); setTimeout(onClose, 300); }, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3.5 rounded-xl shadow-2xl notif-enter"
      style={{
        background: "hsl(222 40% 10%)",
        border: `1px solid ${cfg.border}`,
        maxWidth: 360,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity .25s, transform .25s",
        boxShadow: `0 8px 32px rgba(0,0,0,.5), 0 0 0 1px ${cfg.border}`,
      }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: cfg.bg }}
      >
        <Icon name={cfg.icon} fallback="Bell" size={16} style={{ color: cfg.color }} />
      </div>
      <p className="text-sm text-slate-200 flex-1">{message}</p>
      <button onClick={() => { setVisible(false); setTimeout(onClose, 300); }} className="text-slate-600 hover:text-slate-400 transition-colors ml-1">
        <Icon name="X" size={14} />
      </button>
    </div>
  );
}
