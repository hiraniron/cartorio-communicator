import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Paperclip } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { CommunicationType } from "@/types/communication";
import { useState } from "react";

interface CommunicationCardProps {
  communication: CommunicationType;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (id: string) => void;
}

export const CommunicationCard = ({
  communication: comm,
  onFileUpload,
  onSubmit,
}: CommunicationCardProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async () => {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const files = fileInput?.files;

    if (!files || files.length === 0) {
      toast.error("Por favor, selecione pelo menos um arquivo");
      return;
    }

    setIsUploading(true);

    try {
      // First check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Usuário não autenticado");
        return;
      }

      // Get user's profile and notary office
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, notary_office_id')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) {
        throw profileError;
      }

      if (!profile) {
        toast.error("Perfil não encontrado. Por favor, faça login novamente.");
        return;
      }

      if (!profile.notary_office_id) {
        toast.error("Cartório não encontrado para este usuário");
        return;
      }

      const filePaths: string[] = [];
      
      // Upload each file to Supabase Storage
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `${comm.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('communication_files')
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        filePaths.push(filePath);
      }

      // Get current date to compare with deadline
      const currentDate = new Date();
      const deadlineDay = Math.max(...comm.deadlines);
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();
      const deadlineDate = new Date(currentYear, currentMonth - 1, deadlineDay);

      // Determine status based on submission date vs deadline
      const status = currentDate <= deadlineDate ? 'on_time' : 'late';

      // Create submission record
      const { error: submissionError } = await supabase
        .from('communication_submissions')
        .insert({
          communication_type_id: comm.id,
          profile_id: profile.id,
          notary_office_id: profile.notary_office_id,
          status,
          file_paths: filePaths,
          original_deadline: deadlineDate.toISOString(),
          submission_date: new Date().toISOString(),
        });

      if (submissionError) {
        throw submissionError;
      }

      toast.success("Arquivos enviados com sucesso!");
      onSubmit(comm.id);
      
      // Clear the file input
      fileInput.value = '';

    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error("Erro ao enviar arquivos");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="glass-card p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-sm font-medium text-gray-500">
            <span className="text-red-600 bg-red-100 px-2 py-1 rounded-full">
              Pendente
            </span>
          </span>
          <h3 className="text-xl font-semibold mt-2">
            {comm.name}
          </h3>
          <p className="text-gray-500 mt-1">{comm.description}</p>
          <p className="text-gray-500 mt-1">O que informar: {comm.what_to_inform}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Prazo</p>
          <p className="font-medium">
            {comm.deadlines.join(', ')} de cada mês
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-4">
          <Input
            type="file"
            onChange={onFileUpload}
            className="flex-1"
            accept=".pdf,.doc,.docx"
            multiple
          />
          <Button
            onClick={handleSubmit}
            className="hover-scale"
            disabled={isUploading}
          >
            <Paperclip className="w-4 h-4 mr-2" />
            {isUploading ? "Enviando..." : "Enviar"}
          </Button>
        </div>
      </div>
    </Card>
  );
};