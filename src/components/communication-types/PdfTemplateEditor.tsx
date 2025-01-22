import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Editor } from "@tinymce/tinymce-react";

interface PdfTemplateEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (content: string) => void;
  initialContent?: string;
}

export const PdfTemplateEditor = ({
  isOpen,
  onClose,
  onSave,
  initialContent = "",
}: PdfTemplateEditorProps) => {
  const handleEditorChange = (content: string) => {
    onSave(content);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] h-[600px]">
        <DialogHeader>
          <DialogTitle>Editor de Ofício</DialogTitle>
        </DialogHeader>
        <div className="flex-1 min-h-[500px]">
          <Editor
            apiKey="no-api-key"
            initialValue={initialContent}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
                "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
                "insertdatetime", "media", "table", "code", "help", "wordcount"
              ],
              toolbar: "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};