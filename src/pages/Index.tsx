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
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Video */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://player.vimeo.com/external/517090081.hd.mp4?s=88cdcc5d5c9e56696fa49f5568300089b8450e5f&profile_id=175&oauth2_token_id=57447761"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      
      <div className="relative z-20 max-w-4xl mx-auto mt-12">
        <Card className="p-8 space-y-6 bg-white/80 backdrop-blur-sm border border-white/20">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-display font-bold text-gray-900 animate-fade-in">
              Bem-vindo ao Sistema de Comunicações
            </h1>
            <p className="text-xl text-gray-600 animate-fade-in" style={{ animationDelay: "200ms" }}>
              Gerencie todas as suas comunicações legais em um só lugar
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleStartCommunications}
              className="text-xl px-8 py-6 hover-scale bg-[#1EAEDB] hover:bg-[#0FA0CE] shadow-lg animate-fade-in"
              style={{ animationDelay: "400ms" }}
              size="lg"
            >
              Iniciar Comunicações
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="p-6 space-y-3 hover-scale glass-card animate-fade-in" style={{ animationDelay: "600ms" }}>
              <h3 className="text-lg font-semibold">Gestão Simplificada</h3>
              <p className="text-gray-600">
                Acompanhe todas as suas comunicações de forma organizada
              </p>
            </Card>
            
            <Card className="p-6 space-y-3 hover-scale glass-card animate-fade-in" style={{ animationDelay: "800ms" }}>
              <h3 className="text-lg font-semibold">Prazos em Dia</h3>
              <p className="text-gray-600">
                Receba lembretes e nunca perca um prazo importante
              </p>
            </Card>
            
            <Card className="p-6 space-y-3 hover-scale glass-card animate-fade-in" style={{ animationDelay: "1000ms" }}>
              <h3 className="text-lg font-semibold">Documentação Segura</h3>
              <p className="text-gray-600">
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