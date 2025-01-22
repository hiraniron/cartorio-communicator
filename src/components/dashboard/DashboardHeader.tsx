import React from "react";

const months = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

interface DashboardHeaderProps {
  month?: string;
  year?: string;
}

export const DashboardHeader = ({ month, year }: DashboardHeaderProps) => {
  const monthName = month ? months[parseInt(month) - 1] : '';
  
  return (
    <header className="space-y-2">
      <h1 className="text-4xl font-display font-bold text-center">
        Comunicações {monthName} de {year}
      </h1>
      <p className="text-gray-500 text-center">Gerencie suas comunicações legais</p>
    </header>
  );
};