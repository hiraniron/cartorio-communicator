import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
      }
    };

    checkSession();
  }, [navigate]);

  const handleStartCommunications = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#403E43]">
      <div className="max-w-4xl mx-auto pt-12 px-4">
        <Card className="glass-card p-8 space-y-6 animate-in">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-display font-bold text-gray-100">
              Bem-vindo ao Sistema de Comunicações
            </h1>
            <p className="text-xl text-gray-300">
              Gerencie todas as suas comunicações legais em um só lugar
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleStartCommunications}
              className="text-xl px-8 py-6 hover-scale bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#8b5cf6] hover:to-[#6366f1] text-white shadow-lg border-0"
              size="lg"
            >
              Iniciar Comunicações
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="glass-card p-6 space-y-3 hover-scale">
              <h3 className="text-lg font-semibold text-gray-200">Gestão Simplificada</h3>
              <p className="text-gray-300">
                Acompanhe todas as suas comunicações de forma organizada
              </p>
            </Card>
            
            <Card className="glass-card p-6 space-y-3 hover-scale">
              <h3 className="text-lg font-semibold text-gray-200">Prazos em Dia</h3>
              <p className="text-gray-300">
                Receba lembretes e nunca perca um prazo importante
              </p>
            </Card>
            
            <Card className="glass-card p-6 space-y-3 hover-scale">
              <h3 className="text-lg font-semibold text-gray-200">Documentação Segura</h3>
              <p className="text-gray-300">
                Armazene seus documentos de forma segura e organizada
              </p>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;