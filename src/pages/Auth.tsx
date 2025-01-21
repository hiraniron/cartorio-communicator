import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import AuthForm from "@/components/auth/AuthForm";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const navigate = useNavigate();

  const handleSubmit = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });

        if (error) {
          if (error.message === "Invalid login credentials") {
            throw new Error("Email ou senha inválidos");
          }
          throw error;
        }
        
        toast.success("Login realizado com sucesso!");
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password.trim(),
        });

        if (error) {
          if (error.message.includes("already registered")) {
            throw new Error("Este email já está cadastrado");
          }
          throw error;
        }
        
        toast.success("Cadastro realizado com sucesso! Você já pode fazer login.");
        setMode("login");
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      toast.error(error.message || "Erro ao realizar operação");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-display font-bold text-gray-900">
            {mode === "login" ? "Login" : "Criar Conta"}
          </h1>
          <p className="text-gray-600">
            {mode === "login"
              ? "Entre com suas credenciais"
              : "Preencha os dados para criar sua conta"}
          </p>
        </div>

        <AuthForm onSubmit={handleSubmit} isLoading={isLoading} />

        <div className="text-center">
          <Button
            variant="link"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
          >
            {mode === "login"
              ? "Não tem uma conta? Cadastre-se"
              : "Já tem uma conta? Faça login"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Auth;