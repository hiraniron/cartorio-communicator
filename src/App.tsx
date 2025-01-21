import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import NotaryOfficeRegistration from "@/pages/NotaryOfficeRegistration";
import RegisteredCommunications from "@/pages/RegisteredCommunications";
import Auth from "@/pages/Auth";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NotaryOfficeRegistration />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/registered-communications"
            element={<RegisteredCommunications />}
          />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;