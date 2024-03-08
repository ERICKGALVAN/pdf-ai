import { createContext, useEffect, useState } from "react";
import pdfService from "../services/pdf";

const PdfContext = createContext(
  {} as {
    isNew: boolean;
    setIsNew: (isNew: boolean) => void;
    file: File | null;
    changeFile: (file?: File | null) => void;
    isLoading: boolean;
    upLoadPdf: (file: File) => void;
    makeQuestion: (question: string) => void;
    documents: any[] | null;
    getDocuments: () => void;
    chooseFile: (id: string) => void;
    currentDocument: any | null;
    chat: Chat[];
    isThinking: boolean;
    getLlms: () => void;
    llms: string[];
    currentLlm: string | null;
    changeLLM: (llm: string) => void;
  }
);

interface Chat {
  by: string;
  text: string;
}

export function PdfProvider({ children }: { children: React.ReactNode }) {
  const [file, setFile] = useState<File | null>(null);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [documents, setDocuments] = useState<any[] | null>(null);
  const [currentDocument, setCurrentDocument] = useState<any | null>(null);
  const [chat, setChat] = useState<Chat[]>([]);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [llms, setLlms] = useState<string[]>([]);
  const [currentLlm, setCurrentLlm] = useState<string | null>(null);

  useEffect(() => {
    getDocuments();
    getLlms();
  }, []);

  const uploadPdf = async (file: File) => {
    setIsLoading(true);
    const doc = await pdfService.upLoadPdf(file);
    setCurrentDocument(doc);
    setChat([]);
    setIsLoading(false);
  };

  const makeQuestion = async (question: string) => {
    setChat((prevChat) => [...prevChat, { by: "user", text: question }]);
    setIsThinking(true);
    const data = await pdfService.makeQuestion(
      question,
      currentDocument.id,
      currentLlm!
    );
    setIsThinking(false);
    const aiMessage = data["chat_history"][data["chat_history"].length - 1];
    setChat((prevChat) => [...prevChat, { by: "ai", text: aiMessage["text"] }]);
    console.log(chat);
  };

  const getDocuments = async () => {
    const data = await pdfService.getDocuments();
    setDocuments(data.documents);
  };

  const changeFile = (file?: File | null) => {
    setIsNew(true);
    setFile(file ?? null);
  };

  const chooseFile = async (id: string) => {
    setIsNew(false);
    const bytes = await pdfService.getBytes(id);
    console.log(bytes);
    const blob = new Blob([bytes], { type: "application/pdf" });
    const file = new File([blob], "file.pdf", { type: "application/pdf" });
    setFile(file);
  };

  const getLlms = async () => {
    const data = await pdfService.getLlms();
    setLlms(data.llms);
    setCurrentLlm(data.llms[0]);
  };

  const changeLLM = (llm: string) => {
    setCurrentLlm(llm);
  };

  return (
    <PdfContext.Provider
      value={{
        isNew,
        setIsNew,
        file,
        changeFile,
        isLoading: isLoading,
        upLoadPdf: uploadPdf,
        makeQuestion,
        documents: documents ?? [],
        getDocuments,
        chooseFile,
        currentDocument,
        chat,
        isThinking,
        getLlms,
        llms,
        currentLlm,
        changeLLM,
      }}
    >
      {children}
    </PdfContext.Provider>
  );
}

export default PdfContext;
