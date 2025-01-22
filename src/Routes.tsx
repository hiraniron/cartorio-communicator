import { Routes as RouterRoutes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import { NotaryHeader } from "@/components/layout/NotaryHeader";

export const Routes = () => {
  return (
    <>
      <NotaryHeader />
      <RouterRoutes>
        <Route path="/" element={<Index />} />
      </RouterRoutes>
    </>
  );
};