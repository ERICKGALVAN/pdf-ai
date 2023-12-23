import { Stack, Box } from "@mui/material";
import PDFViewer from "../../components/pdf/PdfViewer";
import ChoosePdf from "../../components/pdf/ChoosePdf";
import { useContext } from "react";
import PdfContext from "../../context/PdfContext";
import Chat from "../Chat";

function Home() {
  const pdfContext = useContext(PdfContext) as {
    file: File | null;
    changeFile: (file: File) => void;
    isLoading: boolean;
    upLoadPdf: (file: File) => void;
    text: string | null;
  };
  return (
    <Stack
      direction={"row"}
      spacing={2}
      sx={{
        overflow: "hidden",
      }}
    >
      {pdfContext.file ? (
        <Box sx={{ width: "50%", height: "100vh", overflowY: "auto" }}>
          <PDFViewer />
        </Box>
      ) : (
        <ChoosePdf />
      )}
      <Box sx={{ width: "50%", height: "100vh", overflowY: "auto" }}>
        <Chat />
      </Box>
    </Stack>
  );
}

export default Home;
