import { Box, Skeleton, Stack } from "@mui/material";
import { useContext } from "react";
import PdfContext from "../context/PdfContext";
import ChatUI from "./ChatUi";

function Chat() {
  const pdfContext = useContext(PdfContext) as {
    file: File | null;
    changeFile: (file: File) => void;
    isLoading: boolean;
    upLoadPdf: (file: File) => void;
    makeQuestion: (question: string) => void;
  };

  return (
    <Box>
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
      ) : pdfContext.file ? (
        <ChatUI />
      ) : (
        <Box
          sx={{
            backgroundColor: "grey.400",
            height: "100vh",
            width: "100%",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            border: "1px solid black",
          }}
        />
      )}
    </Box>
  );
}

export default Chat;
