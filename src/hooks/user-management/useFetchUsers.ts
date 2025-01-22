import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types/user";
import { Database } from "@/integrations/supabase/types";

type ProfileWithAuth = Database['public']['Tables']['profiles']['Row'] & {
  auth_user: {
    email: string;
  };
};

export function useFetchUsers(notaryOfficeId: string | undefined) {
  return useQuery({
    queryKey: ["users", notaryOfficeId],
    queryFn: async () => {
      if (!notaryOfficeId) return [];
      
      console.log("Fetching users for notary office:", notaryOfficeId);
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          auth_user:id(
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
      const transformedData = (data as ProfileWithAuth[]).map(profile => ({
        ...profile,
        email: profile.auth_user.email
      }));

      console.log("Fetched users:", transformedData);
      return transformedData;
    },
    enabled: !!notaryOfficeId,
    retry: 1,
    refetchOnWindowFocus: false
  });
}