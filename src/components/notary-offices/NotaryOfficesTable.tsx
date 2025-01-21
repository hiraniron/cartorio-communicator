import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NotaryOffice } from "@/types/notary";
import { NotaryOfficeTableRow } from "./NotaryOfficeTableRow";

interface NotaryOfficesTableProps {
  notaryOffices: NotaryOffice[];
  onEdit: (id: string) => void;
}

export const NotaryOfficesTable = ({ notaryOffices, onEdit }: NotaryOfficesTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Cidade</TableHead>
          <TableHead>Telefone</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {notaryOffices?.map((notary) => (
          <NotaryOfficeTableRow 
            key={notary.id} 
            notary={notary} 
            onEdit={onEdit}
          />
        ))}
      </TableBody>
    </Table>
  );
};