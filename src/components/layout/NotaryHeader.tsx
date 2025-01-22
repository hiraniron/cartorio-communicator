import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const NotaryHeader = () => {
  const { data: profile } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data: profile } = await supabase
        .from("profiles")
        .select(`
          *,
          notary_office:notary_offices(
            name
          )
        `)
        .eq("id", user.id)
        .single();

      return profile;
    },
  });

  if (!profile?.notary_office?.name) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-6">
      <h1 className="text-2xl font-bold text-center">
        {profile.notary_office.name}
      </h1>
    </div>
  );
};