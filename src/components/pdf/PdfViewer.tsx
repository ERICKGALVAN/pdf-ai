import { useState, useContext } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import PdfContext from "../../context/PdfContext";
import DeleteIcon from "@mui/icons-material/Delete";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

function PDFViewer() {
  const pdfContext = useContext(PdfContext) as {
    file: File | null;
    changeFile: (file?: File | null) => void;
    isLoading: boolean;
    upLoadPdf: (file: File) => void;
    isNew: boolean;
    resetTest: () => void;
  };
  const [numPages, setNumPages] = useState<number | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    if (pdfContext.isNew) pdfContext.upLoadPdf(pdfContext.file!);
  }

  return (
    <Box
      sx={{
        backgroundColor: "grey.400",
        width: "100%",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconButton
        aria-label="delete"
        size="large"
        onClick={() => {
          pdfContext.changeFile(null);
          pdfContext.resetTest();
        }}
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>

      <Document
        file={pdfContext.file}
        onLoadSuccess={onDocumentLoadSuccess}
        options={options}
      >
        {Array.apply(null, Array(numPages))
          .map((_x, i) => i + 1)
          .map((page) => (
            <Box
              key={page}
              sx={{
                height: "100%",
                width: "100%",
                mb: page === numPages ? 0 : "50px",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                overflowY: "auto",
              }}
            >
              <Stack direction={"column"}>
                <Typography>
                  {page} / {numPages}
                </Typography>
                <Page
                  key={page}
                  pageNumber={page}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </Stack>
            </Box>
          ))}
      </Document>
    </Box>
  );
}

export default PDFViewer;
