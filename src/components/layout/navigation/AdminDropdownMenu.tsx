import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Building2, MessageSquare, Settings2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminDropdownMenuProps {
  isActive: boolean;
}

export const AdminDropdownMenu = ({ isActive }: AdminDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={isActive ? "default" : "ghost"}
          className="gap-2"
        >
          <Settings2 className="h-4 w-4" />
          Configurações
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};