import { styled, Box, Button } from "@mui/material";
import { useContext } from "react";
import PdfContext from "../context/PdfContext";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function ChoosePdf() {
  const pdfContext = useContext(PdfContext) as {
    file: File | null;
    changeFile: (file?: File | null) => void;
  };
  return (
    <Box
      sx={{
        backgroundColor: "grey.400",
        height: "100vh",
        width: "50%",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        border: "1px solid black",
      }}
    >
      <Button component="label" variant="contained">
        Upload file
        <VisuallyHiddenInput
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              pdfContext.changeFile(e.target.files[0]);
            }
          }}
        />
      </Button>
    </Box>
  );
}

export default ChoosePdf;
