import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { NotaryOfficeForm, NotaryOfficeFormData } from "@/components/notary-registration/NotaryOfficeForm";
import { UserRegistrationForm, UserFormData } from "@/components/notary-registration/UserRegistrationForm";

const NotaryOfficeRegistration = () => {
  const navigate = useNavigate();
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [notaryOfficeId, setNotaryOfficeId] = useState<string | null>(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleNotarySubmit = async (values: NotaryOfficeFormData) => {
    try {
      if (!session) {
        toast.error("Você precisa estar logado para cadastrar um cartório");
        return;
      }

      const { data, error } = await supabase
        .from("notary_offices")
        .insert({
          name: values.name,
          address: values.address,
          city: values.city,
          institutional_email: values.institutional_email,
        })
        .select()
        .single();

      if (error) throw error;

      setNotaryOfficeId(data.id);
      toast.success("Cartório cadastrado com sucesso!");
      setIsAddingUser(true);
    } catch (error) {
      toast.error("Erro ao cadastrar cartório");
      console.error(error);
    }
  };

  const handleUserSubmit = async (values: UserFormData) => {
    try {
      if (!session) {
        toast.error("Você precisa estar logado para cadastrar usuários");
        return;
      }

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password!,
      });

      if (authError) throw authError;

      const { error: profileError } = await supabase.from("profiles").insert({
        id: authData.user!.id,
        notary_office_id: notaryOfficeId,
        full_name: values.fullName,
        role: values.role,
        email: values.email // Adicionando o campo email
      });

      if (profileError) throw profileError;

      toast.success("Usuário cadastrado com sucesso!");
    } catch (error) {
      toast.error("Erro ao cadastrar usuário");
      console.error(error);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-display font-bold text-gray-900">
              Acesso Restrito
            </h1>
            <p className="text-gray-600">
              Você precisa estar logado para acessar esta página
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-display font-bold text-gray-900">
            Cadastro de Cartório
          </h1>
          <p className="text-gray-600">
            Registre seu cartório e adicione usuários
          </p>
        </div>

        <Card className="p-6">
          {!isAddingUser ? (
            <NotaryOfficeForm 
              onSubmit={handleNotarySubmit}
              onBack={() => navigate("/")}
            />
          ) : (
            <UserRegistrationForm
              onSubmit={handleUserSubmit}
              onBack={() => navigate("/")}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default NotaryOfficeRegistration;