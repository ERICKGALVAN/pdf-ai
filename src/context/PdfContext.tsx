import { createContext, useState } from "react";
import pdfService from "../services/pdf";

const PdfContext = createContext(
  {} as {
    file: File | null;
    changeFile: (file?: File | null) => void;
    isLoading: boolean;
    upLoadPdf: (file: File) => void;
    text: string | null;
  }
);

export function PdfProvider({ children }: { children: React.ReactNode }) {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [text, setText] = useState<string | null>("");

  const uploadPdf = async (file: File) => {
    setIsLoading(true);
    const data = await pdfService.upLoadPdf(file);
    setText(data.text);
    setIsLoading(false);
  };
  return (
    <PdfContext.Provider
      value={{
        file,
        changeFile: (file?: File | null) => setFile(file ?? null),
        isLoading: isLoading,
        upLoadPdf: uploadPdf,
        text,
      }}
    >
      {children}
    </PdfContext.Provider>
  );
}

export default PdfContext;
