import { Stack, Box } from "@mui/material";
import PDFViewer from "../../components/pdf/PdfViewer";
import ChoosePdf from "../../components/ChoosePdf";
import { useContext } from "react";
import PdfContext from "../../context/PdfContext";

function Home() {
  const pdfContext = useContext(PdfContext) as {
    file: File | null;
    changeFile: (file: File) => void;
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

      <Box sx={{ bgcolor: "primary.main", width: "50%", overflowY: "auto" }}>
        ffggffg
      </Box>
    </Stack>
  );
}

export default Home;
