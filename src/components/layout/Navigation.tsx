import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, FileText, Building2, MessageSquare, Settings2, BarChart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
        <Link to="/monthly-report">
          <Button 
            variant={isActive("/monthly-report") ? "default" : "ghost"}
            className="gap-2"
          >
            <BarChart className="h-4 w-4" />
            Relatório Mensal
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant={
                isActive("/notary-registration") || 
                isActive("/notary-offices") ||
                isActive("/communication-types")
                  ? "default" 
                  : "ghost"
              }
              className="gap-2"
            >
              <Settings2 className="h-4 w-4" />
              Administração
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link to="/notary-registration">
              <DropdownMenuItem>
                <Building2 className="h-4 w-4 mr-2" />
                Editar Cartório
              </DropdownMenuItem>
            </Link>
            <Link to="/notary-offices">
              <DropdownMenuItem>
                <Building2 className="h-4 w-4 mr-2" />
                Listar Cartórios
              </DropdownMenuItem>
            </Link>
            <Link to="/communication-types">
              <DropdownMenuItem>
                <FileText className="h-4 w-4 mr-2" />
                Cadastro de Comunicações
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};