export interface CommunicationType {
  id: string;
  name: string;
  custom_name: string | null;
  description: string;
  what_to_inform: string;
  deadlines: number[];
  selected_months: string[];
  created_at?: string;
  updated_at?: string;
  requires_pdf: boolean;
  pdf_template: string | null;
}