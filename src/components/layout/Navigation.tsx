import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  FileText,
  Home,
  Settings,
  Users,
} from "lucide-react";

export const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigationItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: Home,
    },
    {
      name: "Relatórios",
      path: "/reports",
      icon: BarChart3,
    },
    {
      name: "Administração",
      path: "/communication-types",
      icon: Settings,
    },
    {
      name: "Cartórios",
      path: "/notary-offices",
      icon: FileText,
    },
    {
      name: "Usuários",
      path: "/notary-users",
      icon: Users,
    },
  ];

  return (
    <nav className="space-y-2">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isActive(item.path)
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};