export interface ProfilesTable {
  Row: {
    created_at: string
    email: string
    full_name: string
    id: string
    notary_office_id: string | null
    role: "admin" | "staff"
    updated_at: string
  }
  Insert: {
    created_at?: string
    email: string
    full_name: string
    id: string
    notary_office_id?: string | null
    role: "admin" | "staff"
    updated_at?: string
  }
  Update: {
    created_at?: string
    email?: string
    full_name?: string
    id?: string
    notary_office_id?: string | null
    role?: "admin" | "staff"
    updated_at?: string
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