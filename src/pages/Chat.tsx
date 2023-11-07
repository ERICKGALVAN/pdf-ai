import { Box, Skeleton, Stack } from "@mui/material";
import { useContext } from "react";
import PdfContext from "../context/PdfContext";

function Chat() {
  const pdfContext = useContext(PdfContext) as {
    file: File | null;
    changeFile: (file: File) => void;
    isLoading: boolean;
    upLoadPdf: (file: File) => void;
    text: string | null;
  };
  return (
    <Box sx={{ bgcolor: "primary.main", width: "50%", overflowY: "auto" }}>
      {pdfContext.isLoading ? (
        <Stack
          spacing={1}
          sx={{
            p: 2,
          }}
        >
          <Skeleton variant="rectangular" width={"100%"} height={80} />
          <Skeleton variant="rectangular" width={"90%"} height={100} />
          <Skeleton variant="rectangular" width={"100%"} height={80} />
          <Skeleton variant="rectangular" width={"100%"} height={80} />
          <Skeleton variant="rectangular" width={"90%"} height={100} />
          <Skeleton variant="rounded" width={"80%"} height={30} />
          <Skeleton variant="rectangular" width={"100%"} height={80} />
          <Skeleton variant="rectangular" width={"100%"} height={60} />
        </Stack>
      ) : (
        pdfContext.text ?? ""
      )}
    </Box>
  );
}

export default Chat;
