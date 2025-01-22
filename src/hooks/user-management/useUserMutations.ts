import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { UserFormData } from "@/types/user";

const RATE_LIMIT_ERROR = "over_email_send_rate_limit";
const DB_ERROR = "unexpected_failure";

export function useUserMutations(notaryOfficeId: string | undefined, onSuccess: () => void) {
  const handleAddUser = async (data: UserFormData) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password!,
      });

      if (authError) {
        if (authError.message.includes(RATE_LIMIT_ERROR)) {
          throw new Error("Por favor, aguarde alguns segundos antes de tentar novamente");
        }
        if (authError.message.includes(DB_ERROR)) {
          throw new Error("Erro ao criar usuário. Por favor, tente novamente");
        }
        throw authError;
      }

      if (!authData.user) throw new Error("No user data returned");

      console.log("Created auth user:", authData.user);

      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: authData.user.id,
          full_name: data.fullName,
          notary_office_id: notaryOfficeId,
          role: data.role,
          email: data.email
        });

      if (profileError) {
        console.error("Error creating profile:", profileError);
        throw profileError;
      }

      toast.success("Usuário cadastrado com sucesso!");
      onSuccess();
    } catch (error: any) {
      console.error("Error adding user:", error);
      toast.error(error.message || "Erro ao cadastrar usuário");
    }
  };

  const handleEditUser = async (userId: string, data: UserFormData) => {
    try {
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: data.fullName,
          role: data.role
        })
        .eq('id', userId);

      if (profileError) throw profileError;

      toast.success("Usuário atualizado com sucesso!");
      onSuccess();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Erro ao atualizar usuário");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const { error: profileError } = await supabase
        .from("profiles")
        .delete()
        .eq('id', userId);

      if (profileError) throw profileError;

      toast.success("Usuário excluído com sucesso!");
      onSuccess();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Erro ao excluir usuário");
    }
  };

  return {
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
  };
}