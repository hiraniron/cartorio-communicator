export interface NotaryOfficesTable {
  Row: {
    address: string
    city: string
    created_at: string
    id: string
    institutional_email: string
    name: string
    updated_at: string
  }
  Insert: {
    address: string
    city: string
    created_at?: string
    id?: string
    institutional_email?: string
    name: string
    updated_at?: string
  }
  Update: {
    address?: string
    city?: string
    created_at?: string
    id?: string
    institutional_email?: string
    name?: string
    updated_at?: string
  }
  Relationships: []
}