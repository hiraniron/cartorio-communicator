export interface CommunicationType {
  id: string;
  name: string;
  custom_name: string | null;
  description: string;
  what_to_inform: string;
  deadlines: number[];
  selected_months: string[];
  year: number;
  created_at?: string;
  updated_at?: string;
}