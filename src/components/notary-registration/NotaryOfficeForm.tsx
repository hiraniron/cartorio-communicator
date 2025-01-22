import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Building2 } from "lucide-react";
import { useEffect } from "react";
import { NotaryOffice } from "@/types/notary";

const notaryOfficeSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  address: z.string().min(1, "Endereço é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  institutional_email: z.string().email("Email institucional inválido").min(1, "Email institucional é obrigatório"),
});

export type NotaryOfficeFormData = z.infer<typeof notaryOfficeSchema>;

interface NotaryOfficeFormProps {
  onSubmit: (data: NotaryOfficeFormData) => void;
  onBack: () => void;
  initialData?: NotaryOffice;
}

export function NotaryOfficeForm({ onSubmit, onBack, initialData }: NotaryOfficeFormProps) {
  const form = useForm<NotaryOfficeFormData>({
    resolver: zodResolver(notaryOfficeSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      institutional_email: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        address: initialData.address,
        city: initialData.city,
        institutional_email: initialData.institutional_email || "",
      });
    }
  }, [initialData, form]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Building2 className="h-5 w-5 text-gray-700" />
        <h2 className="text-xl font-semibold">
          {initialData ? "Editar Cartório" : "Informações do Cartório"}
        </h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Cartório</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="institutional_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Institucional</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onBack}>
              Voltar
            </Button>
            <Button type="submit">
              {initialData ? "Salvar Alterações" : "Cadastrar Cartório"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}