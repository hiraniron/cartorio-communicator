import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
      } else {
        // If user is authenticated, redirect to notary registration
        navigate("/notary-registration");
      }
    };

    checkSession();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse">
        Carregando...
      </div>
    </div>
  );
};

export default Index;