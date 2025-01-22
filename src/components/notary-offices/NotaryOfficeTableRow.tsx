import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit, Users } from "lucide-react";
import { NotaryOffice } from "@/types/notary";

interface NotaryOfficeTableRowProps {
  notary: NotaryOffice;
  onEdit: (id: string) => void;
}

export const NotaryOfficeTableRow = ({ notary, onEdit }: NotaryOfficeTableRowProps) => {
  return (
    <TableRow key={notary.id}>
      <TableCell>{notary.name}</TableCell>
      <TableCell>{notary.city}</TableCell>
      <TableCell>{notary.institutional_email}</TableCell>
      <TableCell className="space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onEdit(notary.id)}
        >
          <Edit className="h-4 w-4" />
        </Button>

        <Link to={`/notary-offices/${notary.id}/users`}>
          <Button variant="outline" size="icon">
            <Users className="h-4 w-4" />
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  );
};