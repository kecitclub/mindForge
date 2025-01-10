import {
  ChevronLeft,
  ChevronRight,
  Home,
  Settings,
  Users,
  BarChart,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import mainLogo from "../../assets/mainlogo.png";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);

  const navItems = [
    { icon: Home, label: "Dashboard", href: "#" },
    { icon: Users, label: "Users", href: "#" },
    { icon: BarChart, label: "Analytics", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
    { icon: HelpCircle, label: "Help", href: "#" },
  ];

  return (
    <aside
      className={`
        hidden
        md:flex flex-col
        h-screen
        bg-background
        border-r
        transition-all
        duration-300
        relative
        ${expanded ? "w-60" : "w-16"}
      `}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-6 h-6 w-6 rounded-full border bg-background"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>

      {/* Logo Section */}
      <div className="p-4 h-16 flex items-center justify-center border-b">
        {expanded ? (
          <span className="w-12 h-12">
            <img src={mainLogo} alt="logo" />
          </span>
        ) : (
          <span className="font-bold text-xl">L</span>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`
              flex items-center
              rounded-lg
              p-2
              text-foreground/60
              transition-colors
              hover:bg-accent
              hover:text-foreground
              group
              ${expanded ? "justify-start" : "justify-center"}
            `}
          >
            <item.icon className="h-5 w-5" />
            {expanded && <span className="ml-3">{item.label}</span>}
            {!expanded && (
              <span className="absolute left-full rounded-md px-2 py-1 ml-6 bg-foreground text-background text-sm invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
                {item.label}
              </span>
            )}
          </a>
        ))}
      </nav>

      {/* User Profile Section */}
      <div className="border-t p-4">
        <Link to="/police/profile">
          <div
            className={`flex ${
              expanded ? "items-center" : "justify-center"
            } gap-3`}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="/api/placeholder/32/32" alt="User avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            {expanded && (
              <div className="flex flex-col">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-foreground/60">
                  john@example.com
                </span>
              </div>
            )}
          </div>
        </Link>
      </div>
    </aside>
  );
}
