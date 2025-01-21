import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/layout/Navigation";
import "./App.css";

import Index from "@/pages/Index";
import NotaryOfficeRegistration from "@/pages/NotaryOfficeRegistration";
import NotaryOfficesList from "@/pages/NotaryOfficesList";
import NotaryOfficeUsers from "@/pages/NotaryOfficeUsers";
import RegisteredCommunications from "@/pages/RegisteredCommunications";
import CommunicationTypes from "@/pages/CommunicationTypes";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import { PeriodSelector } from "@/components/dashboard/PeriodSelector";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<PeriodSelector />} />
            <Route path="/dashboard/:year/:month" element={<Dashboard />} />
            <Route
              path="*"
              element={
                <>
                  <Navigation />
                  <div className="p-6">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/notary-registration" element={<NotaryOfficeRegistration />} />
                      <Route path="/notary-offices" element={<NotaryOfficesList />} />
                      <Route path="/notary-offices/:id/users" element={<NotaryOfficeUsers />} />
                      <Route path="/communication-types" element={<CommunicationTypes />} />
                      <Route
                        path="/registered-communications"
                        element={<RegisteredCommunications />}
                      />
                    </Routes>
                  </div>
                </>
              }
            />
          </Routes>
        </div>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;