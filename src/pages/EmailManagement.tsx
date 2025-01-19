import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { UserPlus, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

// Create Supabase client
const supabase = createClient(
  "https://your-supabase-project-url.supabase.co",  // This will be replaced with your actual URL
  "your-anon-key"  // This will be replaced with your actual key
);

const EmailManagement = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Você precisa estar logado para acessar esta página");
        navigate("/login");
        return;
      }

      const { data: userData, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error || userData?.role !== 'admin_master') {
        toast.error("Acesso não autorizado");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Erro ao verificar acesso:", error);
      toast.error("Erro ao verificar permissões");
      navigate("/login");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Criar usuário no Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: Math.random().toString(36).slice(-8), // Senha temporária aleatória
      });

      if (authError) throw authError;

      // Adicionar informações adicionais na tabela de usuários
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: authData.user.id,
              name,
              email,
              role: 'user'
            }
          ]);

        if (profileError) throw profileError;
      }

      toast.success("Usuário cadastrado com sucesso!");
      setEmail("");
      setName("");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      toast.error("Erro ao cadastrar usuário");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-8 animate-in">
        <header className="space-y-2">
          <h1 className="text-4xl font-display font-bold">Gerenciamento de Usuários</h1>
          <p className="text-gray-500">Cadastre novos usuários no sistema</p>
        </header>

        <Card className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome do Usuário</label>
              <div className="relative">
                <UserPlus className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="email@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button type="submit" className="w-full hover-scale" disabled={isLoading}>
              {isLoading ? "Cadastrando..." : "Cadastrar Usuário"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EmailManagement;