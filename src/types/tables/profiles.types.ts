export interface ProfilesTable {
  Row: {
    id: string;
    notary_office_id: string | null;
    full_name: string;
    email: string;
    role: "admin" | "staff";
    created_at: string;
    updated_at: string;
  }
  Insert: {
    id: string;
    notary_office_id?: string | null;
    full_name: string;
    email: string;
    role: "admin" | "staff";
    created_at?: string;
    updated_at?: string;
  }
  Update: {
    id?: string;
    notary_office_id?: string | null;
    full_name?: string;
    email?: string;
    role?: "admin" | "staff";
    created_at?: string;
    updated_at?: string;
  }
  Relationships: [
    {
      foreignKeyName: "profiles_notary_office_id_fkey"
      columns: ["notary_office_id"]
      isOneToOne: false
      referencedRelation: "notary_offices"
      referencedColumns: ["id"]
    }
  ]
}