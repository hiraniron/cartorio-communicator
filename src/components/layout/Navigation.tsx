import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, FileText, Building2, MessageSquare } from "lucide-react";

export const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-white/50 backdrop-blur-sm border-b py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex gap-2">
        <Link to="/">
          <Button 
            variant={isActive("/") ? "default" : "ghost"}
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            Início
          </Button>
        </Link>
        <Link to="/registered-communications">
          <Button 
            variant={isActive("/registered-communications") ? "default" : "ghost"}
            className="gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Comunicações
          </Button>
        </Link>
        <Link to="/communication-types">
          <Button 
            variant={isActive("/communication-types") ? "default" : "ghost"}
            className="gap-2"
          >
            <FileText className="h-4 w-4" />
            Tipos de Comunicação
          </Button>
        </Link>
        <Link to="/notary-registration">
          <Button 
            variant={isActive("/notary-registration") ? "default" : "ghost"}
            className="gap-2"
          >
            <Building2 className="h-4 w-4" />
            Cartório
          </Button>
        </Link>
      </div>
    </nav>
  );
};