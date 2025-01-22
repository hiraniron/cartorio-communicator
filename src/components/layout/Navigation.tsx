import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, FileText, Building2, MessageSquare, Settings2, BarChart, LogOut } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logout realizado com sucesso");
      navigate("/auth");
    } catch (error) {
      toast.error("Erro ao realizar logout");
    }
  };
  
  return (
    <nav className="bg-white border-b py-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex justify-between">
        <div className="flex gap-2">
          <Link to="/">
            <Button 
              variant={isActive("/") ? "default" : "ghost"}
              className="gap-2"
            >
              <Home className="h-4 w-4" />
              Início
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
                  isActive("/communication-types") ||
                  isActive("/registered-communications")
                    ? "default" 
                    : "ghost"
                }
                className="gap-2"
              >
                <Settings2 className="h-4 w-4" />
                Administração
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              <Link to="/communication-types">
                <DropdownMenuItem>
                  <FileText className="h-4 w-4 mr-2" />
                  Cadastro de Comunicações
                </DropdownMenuItem>
              </Link>
              <Link to="/registered-communications">
                <DropdownMenuItem>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Comunicações Cadastradas
                </DropdownMenuItem>
              </Link>
              <Link to="/notary-offices">
                <DropdownMenuItem>
                  <Building2 className="h-4 w-4 mr-2" />
                  Listar Cartórios
                </DropdownMenuItem>
              </Link>
              <Link to="/notary-registration">
                <DropdownMenuItem>
                  <Building2 className="h-4 w-4 mr-2" />
                  Editar Cartório
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button 
          variant="ghost" 
          className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
      </div>
    </nav>
  );
};