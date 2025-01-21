import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import CommunicationTypes from "./pages/CommunicationTypes";
import Dashboard from "./pages/Dashboard";
import RegisteredCommunications from "./pages/RegisteredCommunications";
import EditCommunication from "./pages/EditCommunication";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/communication-types" element={<CommunicationTypes />} />
          <Route path="/registered-communications" element={<RegisteredCommunications />} />
          <Route path="/edit-communication/:id" element={<EditCommunication />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;