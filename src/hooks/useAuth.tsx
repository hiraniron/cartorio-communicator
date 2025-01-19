import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xtqzpqfkbxjqvxqjwxmz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0cXpwcWZrYnhqcXZ4cWp3eG16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc0MjU1NzAsImV4cCI6MjAyMzAwMTU3MH0.Pu_IqTlDYBsqnXJvfGVfD0Hy9sQk_P0-oZFGDB3n6Qw",
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true
    }
  }
);

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      console.log("Iniciando processo de login para:", email);
      
      let { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.log("Erro no login inicial, tentando criar usuário:", signInError);
        
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) {
          console.error("Erro ao criar usuário:", signUpError);
          throw signUpError;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.error("Erro no segundo login:", error);
          throw error;
        }

        signInData = data;
      }

      if (signInData?.user) {
        console.log("Usuário autenticado com sucesso:", signInData.user);
        
        const { error: insertError } = await supabase
          .from('users')
          .upsert({ 
            id: signInData.user.id,
            email: signInData.user.email,
            role: 'admin_master'
          }, { 
            onConflict: 'id'
          });

        if (insertError) {
          console.error("Erro ao inserir usuário na tabela:", insertError);
          throw insertError;
        }

        const { data: userData, error: roleError } = await supabase
          .from('users')
          .select('role')
          .eq('id', signInData.user.id)
          .single();

        if (roleError) {
          console.error("Erro ao buscar role do usuário:", roleError);
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
      console.error("Erro no processo de login:", error);
      toast.error(error.message || "Erro ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleLogin
  };
};