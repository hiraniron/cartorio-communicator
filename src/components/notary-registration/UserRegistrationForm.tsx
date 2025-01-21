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
import { Users } from "lucide-react";

const userSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres").optional(),
  fullName: z.string().min(1, "Nome completo é obrigatório"),
  role: z.enum(["admin", "staff"]),
});

export type UserFormData = z.infer<typeof userSchema>;

interface UserRegistrationFormProps {
  onSubmit: (data: UserFormData) => void;
  onBack: () => void;
  initialData?: {
    email?: string;
    fullName?: string;
    role?: "admin" | "staff";
  };
}

export function UserRegistrationForm({ onSubmit, onBack, initialData }: UserRegistrationFormProps) {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: initialData?.email || "",
      password: "",
      fullName: initialData?.fullName || "",
      role: initialData?.role || "staff" as const,
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="h-5 w-5 text-gray-700" />
        <h2 className="text-xl font-semibold">
          {initialData ? "Editar Usuário" : "Cadastro de Usuários"}
        </h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    {...field} 
                    disabled={!!initialData}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!initialData && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Função</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="admin">Administrador</option>
                    <option value="staff">Funcionário</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onBack}>
              {initialData ? "Cancelar" : "Concluir"}
            </Button>
            <Button type="submit">
              {initialData ? "Salvar Alterações" : "Adicionar Usuário"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}