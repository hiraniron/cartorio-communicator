import { useLocation } from "react-router-dom";
import { Home, BarChart, Send } from "lucide-react";
import { NavButton } from "./navigation/NavButton";
import { AdminDropdownMenu } from "./navigation/AdminDropdownMenu";
import { LogoutButton } from "./navigation/LogoutButton";

export const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  const isAdminActive = () => {
    const adminPaths = [
      "/notary-registration",
      "/notary-offices",
      "/communication-types",
      "/registered-communications"
    ];
    return adminPaths.includes(location.pathname);
  };
  
  return (
    <nav className="bg-white border-b py-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex justify-between">
        <div className="flex gap-2">
          <NavButton 
            to="/"
            icon={Home}
            label="Início"
            isActive={isActive("/")}
          />
          <NavButton 
            to="/dashboard"
            icon={Send}
            label="Comunicações"
            isActive={isActive("/dashboard")}
          />
          <NavButton 
            to="/monthly-report"
            icon={BarChart}
            label="Relatório Mensal"
            isActive={isActive("/monthly-report")}
          />
          <AdminDropdownMenu isActive={isAdminActive()} />
        </div>
        <LogoutButton />
      </div>
    </nav>
  );
};