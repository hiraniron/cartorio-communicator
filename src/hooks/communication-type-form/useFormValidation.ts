interface FormValidationData {
  name: string;
  description: string;
  whatToInform: string;
  deadlines: string[];
  selectedMonths: Date[];
  requiresPdf?: boolean;
  pdfTemplate?: string;
}

export const validateCommunicationTypeForm = (data: FormValidationData): boolean => {
  if (!data.name.trim()) {
    toast.error("O nome da comunicação é obrigatório");
    return false;
  }

  if (!data.description.trim()) {
    toast.error("A descrição é obrigatória");
    return false;
  }

  if (!data.whatToInform.trim()) {
    toast.error("O campo 'O que informar' é obrigatório");
    return false;
  }

  if (data.deadlines.length === 0 || data.deadlines.some(d => !d)) {
    toast.error("Pelo menos um dia deve ser informado");
    return false;
  }

  if (data.selectedMonths.length === 0) {
    toast.error("Pelo menos um mês deve ser selecionado");
    return false;
  }

  if (data.requiresPdf && !data.pdfTemplate?.trim()) {
    toast.error("O template do PDF é obrigatório quando a geração de PDF está ativada");
    return false;
  }

  return true;
};