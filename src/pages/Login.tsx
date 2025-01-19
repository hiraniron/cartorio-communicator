import { LoginForm } from "@/components/LoginForm";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const { isLoading, handleLogin } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md animate-in">
        <div className="glass-card rounded-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-display font-bold">Bem-vindo</h1>
            <p className="text-gray-500">Faça login para continuar</p>
          </div>

          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Login;