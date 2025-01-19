import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xtqzpqfkbxjqvxqjwxmz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0cXpwcWZrYnhqcXZ4cWp3eG16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc0MjU1NzAsImV4cCI6MjAyMzAwMTU3MH0.Pu_IqTlDYBsqnXJvfGVfD0Hy9sQk_P0-oZFGDB3n6Qw"
);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Tentando fazer login com:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Erro de autenticação:", error);
        throw error;
      }

      if (data.user) {
        console.log("Usuário autenticado:", data.user);
        const { data: userData, error: roleError } = await supabase
          .from('users')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (roleError) {
          console.error("Erro ao buscar role:", roleError);
          throw roleError;
        }

        console.log("Role do usuário:", userData?.role);
        toast.success("Login realizado com sucesso!");
        
        if (userData?.role === 'admin_master') {
          navigate("/email-management");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error: any) {
      console.error("Erro no login:", error);
      toast.error(error.message || "Credenciais inválidas");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md animate-in">
        <div className="glass-card rounded-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-display font-bold">Bem-vindo</h1>
            <p className="text-gray-500">Faça login para continuar</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Senha</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full hover-scale" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;