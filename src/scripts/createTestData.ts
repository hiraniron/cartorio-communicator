import { supabase } from "@/integrations/supabase/client";

async function createTestData() {
  try {
    // 1. Create notary office
    const { data: notaryOffice, error: notaryError } = await supabase
      .from('notary_offices')
      .insert({
        name: 'Cartório Teste',
        address: 'Rua dos Testes, 123',
        city: 'São Paulo',
        phone: '(11) 99999-9999'
      })
      .select()
      .single();

    if (notaryError) throw notaryError;
    console.log('Cartório criado:', notaryOffice);

    // 2. Create user account
    const { data: auth, error: authError } = await supabase.auth.signUp({
      email: 'teste@cartorio.com',
      password: 'teste123'
    });

    if (authError) throw authError;
    console.log('Usuário auth criado:', auth);

    // 3. Create user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: auth.user!.id,
        full_name: 'Usuário Teste',
        notary_office_id: notaryOffice.id,
        role: 'staff'
      })
      .select()
      .single();

    if (profileError) throw profileError;
    console.log('Perfil criado:', profile);

    return {
      notaryOffice,
      auth,
      profile
    };
  } catch (error) {
    console.error('Erro ao criar dados de teste:', error);
    throw error;
  }
}

createTestData();