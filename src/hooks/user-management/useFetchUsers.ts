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
      
      // Get all profiles with their auth data for the notary office
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          id,
          full_name,
          role,
          notary_office_id,
          auth_users:id (
            email
          )
        `)
        .eq('notary_office_id', notaryOfficeId);

      if (profilesError) {
        console.error("Error fetching profiles:", profilesError);
        toast.error("Erro ao carregar usuários");
        throw profilesError;
      }

      // Transform the data to match the User type
      const transformedData = profiles
        .filter((profile): profile is (typeof profile & { auth_users: { email: string } }) => {
          if (!profile.auth_users?.email) {
            console.warn(`User ${profile.id} has no email address`);
            return false;
          }
          return true;
        })
        .map(profile => ({
          id: profile.id,
          full_name: profile.full_name,
          role: profile.role,
          email: profile.auth_users.email,
          notary_office_id: profile.notary_office_id,
          created_at: profile.created_at,
          updated_at: profile.updated_at
        }));

      console.log("Fetched users:", transformedData);
      return transformedData;
    },
    enabled: !!notaryOfficeId,
    retry: 1,
    refetchOnWindowFocus: false
  });
}