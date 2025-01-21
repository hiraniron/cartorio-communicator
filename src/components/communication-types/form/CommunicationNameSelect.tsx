import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CommunicationNameSelectProps {
  name: string;
  customName: string;
  onNameChange: (value: string) => void;
  onCustomNameChange: (value: string) => void;
}

export const CommunicationNameSelect = ({
  name,
  customName,
  onNameChange,
  onCustomNameChange,
}: CommunicationNameSelectProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Nome da Comunicação</Label>
        <Select value={name} onValueChange={onNameChange}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo de comunicação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="defensoria">Defensoria</SelectItem>
            <SelectItem value="sirc-inss-pfb">SIRC-INSS/PFB</SelectItem>
            <SelectItem value="fecom">FECOM</SelectItem>
            <SelectItem value="ibge">IBGE</SelectItem>
            <SelectItem value="crc">CRC</SelectItem>
            <SelectItem value="justica-federal">Justiça Federal</SelectItem>
            <SelectItem value="cni">CNJ</SelectItem>
            <SelectItem value="policia-federal">Polícia Federal</SelectItem>
            <SelectItem value="justica-militar">Justiça Militar</SelectItem>
            <SelectItem value="funai">FUNAI</SelectItem>
            <SelectItem value="ssp-estadual">SSP Estadual</SelectItem>
            <SelectItem value="juiz-direito">Juiz de Direito</SelectItem>
            <SelectItem value="corregedoria-geral">Corregedoria Geral de Justiça</SelectItem>
            <SelectItem value="corregedoria-permanente">Juiz Corregedor Permanente</SelectItem>
            <SelectItem value="malote-digital">Malote Digital</SelectItem>
            <SelectItem value="sedemaf">SEDEMAF</SelectItem>
            <SelectItem value="cgj">CGJ</SelectItem>
            <SelectItem value="detran-municipio">DETRAN/MUNICÍPIO</SelectItem>
            <SelectItem value="dgi">DGI</SelectItem>
            <SelectItem value="censec">CENSEC</SelectItem>
            <SelectItem value="outros">Outros</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {name === "outros" && (
        <div className="space-y-2">
          <Label htmlFor="customName">Especifique o nome da comunicação</Label>
          <Input
            id="customName"
            value={customName}
            onChange={(e) => onCustomNameChange(e.target.value)}
            placeholder="Digite o nome da comunicação"
          />
        </div>
      )}
    </>
  );
};