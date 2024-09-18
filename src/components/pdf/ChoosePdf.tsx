import { Box } from "@mui/material";
import { useContext } from "react";
import PdfContext from "../../context/PdfContext";
import { FileUploader } from "react-drag-drop-files";
import "../../index.css";

function ChoosePdf() {
  const pdfContext = useContext(PdfContext) as {
    file: File | null;
    changeFile: (file?: File | null) => void;
    getDocuments: () => void;
    setIsNew: (isNew: boolean) => void;
  };
  return (
    <Box
      sx={{
        backgroundColor: "grey.400",
        height: "91vh",
        width: "50%",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        border: "1px solid black",
      }}
    >
      <FileUploader
        label="Upload PDF"
        classes="drop-button"
        name="file-uploader"
        types={["pdf"]}
        handleChange={(file: File) => {
          pdfContext.changeFile(file);
          // pdfContext.getDocuments();
        }}
      />
      {/* <button
        onClick={() => {
          pdfService.test();
        }}
      >
        dsjkfjks
      </button> */}
    </Box>
  );
}

export default ChoosePdf;
