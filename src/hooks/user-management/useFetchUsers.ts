import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types/user";

export function useFetchUsers(notaryOfficeId: string | undefined) {
  return useQuery({
    queryKey: ["users", notaryOfficeId],
    queryFn: async () => {
      if (!notaryOfficeId) return [];
      
      console.log("Fetching users for notary office:", notaryOfficeId);
      
      // Get all profiles for the notary office
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          id,
          full_name,
          role,
          notary_office_id,
          created_at,
          updated_at
        `)
        .eq('notary_office_id', notaryOfficeId);

      if (profilesError) {
        console.error("Error fetching profiles:", profilesError);
        toast.error("Erro ao carregar usuários");
        throw profilesError;
      }

      // Get auth data for these profiles
      const { data: authData, error: authError } = await supabase
        .auth.admin.listUsers();

      if (authError) {
        console.error("Error fetching auth users:", authError);
        toast.error("Erro ao carregar dados de autenticação");
        throw authError;
      }

      // Map auth data to profiles
      const transformedData = profiles.map(profile => {
        const authUser = authData.users.find(user => user.id === profile.id);
        return {
          id: profile.id,
          full_name: profile.full_name,
          role: profile.role,
          email: authUser?.email || '',
          notary_office_id: profile.notary_office_id,
          created_at: profile.created_at,
          updated_at: profile.updated_at
        };
      });

      console.log("Fetched users:", transformedData);
      return transformedData;
    },
    enabled: !!notaryOfficeId,
    retry: 1,
    refetchOnWindowFocus: false
  });
}