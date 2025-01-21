import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Building2, Users } from "lucide-react";

const notaryOfficeSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  address: z.string().min(1, "Endereço é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  phone: z.string().min(1, "Telefone é obrigatório"),
});

const userSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  fullName: z.string().min(1, "Nome completo é obrigatório"),
  role: z.enum(["admin", "staff"]),
});

const NotaryOfficeRegistration = () => {
  const navigate = useNavigate();
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [notaryOfficeId, setNotaryOfficeId] = useState<string | null>(null);

  const notaryForm = useForm({
    resolver: zodResolver(notaryOfficeSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      phone: "",
    },
  });

  const userForm = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      role: "staff" as const,
    },
  });

  const onNotarySubmit = async (values: z.infer<typeof notaryOfficeSchema>) => {
    try {
      // Ensure all required fields are present
      const notaryData = {
        name: values.name,
        address: values.address,
        city: values.city,
        phone: values.phone,
      };

      const { data, error } = await supabase
        .from("notary_offices")
        .insert(notaryData)
        .select()
        .single();

      if (error) throw error;

      setNotaryOfficeId(data.id);
      toast.success("Cartório cadastrado com sucesso!");
      setIsAddingUser(true);
    } catch (error) {
      toast.error("Erro ao cadastrar cartório");
      console.error(error);
    }
  };

  const onUserSubmit = async (values: z.infer<typeof userSchema>) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (authError) throw authError;

      const { error: profileError } = await supabase.from("profiles").insert({
        id: authData.user!.id,
        notary_office_id: notaryOfficeId,
        full_name: values.fullName,
        role: values.role,
      });

      if (profileError) throw profileError;

      toast.success("Usuário cadastrado com sucesso!");
      userForm.reset();
    } catch (error) {
      toast.error("Erro ao cadastrar usuário");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-display font-bold text-gray-900">
            Cadastro de Cartório
          </h1>
          <p className="text-gray-600">
            Registre seu cartório e adicione usuários
          </p>
        </div>

        {!isAddingUser ? (
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="h-5 w-5 text-gray-700" />
              <h2 className="text-xl font-semibold">Informações do Cartório</h2>
            </div>
            <Form {...notaryForm}>
              <form
                onSubmit={notaryForm.handleSubmit(onNotarySubmit)}
                className="space-y-4"
              >
                <FormField
                  control={notaryForm.control}
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
                  control={notaryForm.control}
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
                  control={notaryForm.control}
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
                  control={notaryForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/")}
                  >
                    Voltar
                  </Button>
                  <Button type="submit">Cadastrar Cartório</Button>
                </div>
              </form>
            </Form>
          </Card>
        ) : (
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Users className="h-5 w-5 text-gray-700" />
              <h2 className="text-xl font-semibold">Cadastro de Usuários</h2>
            </div>
            <Form {...userForm}>
              <form
                onSubmit={userForm.handleSubmit(onUserSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={userForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={userForm.control}
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
                <FormField
                  control={userForm.control}
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
                  control={userForm.control}
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
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/")}
                  >
                    Concluir
                  </Button>
                  <Button type="submit">Adicionar Usuário</Button>
                </div>
              </form>
            </Form>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NotaryOfficeRegistration;