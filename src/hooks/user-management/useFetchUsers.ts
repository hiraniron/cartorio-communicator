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
      
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select(`
          id,
          full_name,
          role,
          email,
          notary_office_id,
          created_at,
          updated_at
        `)
        .eq('notary_office_id', notaryOfficeId);

      if (error) {
        console.error("Error fetching profiles:", error);
        toast.error("Erro ao carregar usuários");
        throw error;
      }

      console.log("Fetched users:", profiles);
      return profiles as User[];
    },
    enabled: !!notaryOfficeId,
    retry: 1,
    refetchOnWindowFocus: false
  });
}