export interface NotaryOfficesTable {
  Row: {
    id: string;
    name: string;
    address: string;
    city: string;
    institutional_email: string;
    created_at: string;
    updated_at: string;
  }
  Insert: {
    id?: string;
    name: string;
    address: string;
    city: string;
    institutional_email?: string;
    created_at?: string;
    updated_at?: string;
  }
  Update: {
    id?: string;
    name?: string;
    address?: string;
    city?: string;
    institutional_email?: string;
    created_at?: string;
    updated_at?: string;
  }
  Relationships: []
}