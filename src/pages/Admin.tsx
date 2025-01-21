import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Building2, Users } from "lucide-react";

export default function Admin() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Administração</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/notary-registration">
          <Card className="p-6 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-4">
              <Building2 className="h-8 w-8" />
              <div>
                <h2 className="text-lg font-semibold">Editar Cartório</h2>
                <p className="text-muted-foreground">
                  Gerencie as informações do seu cartório
                </p>
              </div>
            </div>
          </Card>
        </Link>
        
        <Link to="/notary-offices">
          <Card className="p-6 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-4">
              <Users className="h-8 w-8" />
              <div>
                <h2 className="text-lg font-semibold">Listar Cartórios</h2>
                <p className="text-muted-foreground">
                  Visualize e gerencie todos os cartórios
                </p>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}