import { createContext, useState } from "react";

const PdfContext = createContext(
  {} as {
    file: File | null;
    changeFile: (file?: File | null) => void;
  }
);

export function PdfProvider({ children }: { children: React.ReactNode }) {
  const [file, setFile] = useState<File | null>(null);
  return (
    <PdfContext.Provider
      value={{
        file,
        changeFile: (file?: File | null) => setFile(file ?? null),
      }}
    >
      {children}
    </PdfContext.Provider>
  );
}

export default PdfContext;
