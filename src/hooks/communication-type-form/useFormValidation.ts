import { toast } from "sonner";

export const validateCommunicationTypeForm = ({
  name,
  description,
  whatToInform,
  deadlines,
  selectedMonths,
}: {
  name: string;
  description: string;
  whatToInform: string;
  deadlines: string[];
  selectedMonths: Date[];
}) => {
  if (!name || !description || !whatToInform || deadlines.some(d => !d) || selectedMonths.length === 0) {
    toast.error("Por favor, preencha todos os campos");
    return false;
  }

  const invalidDeadlines = deadlines.some(deadline => {
    const deadlineNumber = parseInt(deadline);
    return deadlineNumber < 1 || deadlineNumber > 31;
  });

  if (invalidDeadlines) {
    toast.error("Por favor, insira dias válidos (entre 1 e 31)");
    return false;
  }

  return true;
};