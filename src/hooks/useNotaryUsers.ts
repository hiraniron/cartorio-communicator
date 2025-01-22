import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export function useNotaryUsers(notaryOfficeId: string | undefined) {
  const [editingUser, setEditingUser] = useState<any>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { data: users, isLoading, error, refetch } = useQuery({
    queryKey: ["users", notaryOfficeId],
    queryFn: async () => {
      if (!notaryOfficeId) return [];
      
      console.log("Fetching users for notary office:", notaryOfficeId);
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          user:id (
            email
          )
        `)
        .eq("notary_office_id", notaryOfficeId);

      if (error) {
        console.error("Error fetching users:", error);
        toast.error("Erro ao carregar usuários");
        throw error;
      }

      // Transform the data to include email at the top level
      const transformedData = data?.map(profile => ({
        ...profile,
        email: profile.user?.email
      })) || [];

      console.log("Fetched users:", transformedData);
      return transformedData;
    },
    enabled: !!notaryOfficeId,
    retry: 1,
    refetchOnWindowFocus: false
  });

  const handleAddUser = async (data: any) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("No user data returned");

      console.log("Created auth user:", authData.user);

      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: authData.user.id,
          full_name: data.fullName,
          notary_office_id: notaryOfficeId,
          role: data.role
        });

      if (profileError) {
        console.error("Error creating profile:", profileError);
        throw profileError;
      }

      toast.success("Usuário cadastrado com sucesso!");
      setIsSheetOpen(false);
      refetch();
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Erro ao cadastrar usuário");
    }
  };

  const handleEditUser = async (data: any) => {
    try {
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: data.fullName,
          role: data.role
        })
        .eq('id', editingUser.id);

      if (profileError) throw profileError;

      toast.success("Usuário atualizado com sucesso!");
      setEditingUser(null);
      setIsSheetOpen(false);
      refetch();
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
      refetch();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Erro ao excluir usuário");
    }
  };

  return {
    users,
    isLoading,
    error,
    editingUser,
    setEditingUser,
    isSheetOpen,
    setIsSheetOpen,
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
  };
}