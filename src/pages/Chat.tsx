import { Box, Input, Skeleton, Stack, Button } from "@mui/material";
import { useContext, useState } from "react";
import PdfContext from "../context/PdfContext";

function Chat() {
  const pdfContext = useContext(PdfContext) as {
    file: File | null;
    changeFile: (file: File) => void;
    isLoading: boolean;
    upLoadPdf: (file: File) => void;
    text: string | null;
    makeQuestion: (question: string) => void;
  };

  const [question, setQuestion] = useState<string>("");

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
      ) : (
        <Stack direction={"row"}>
          <Input
            placeholder="Type in here…"
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Button onClick={() => pdfContext.makeQuestion(question)}>
            Send
          </Button>
        </Stack>
      )}
    </Box>
  );
}

export default Chat;
