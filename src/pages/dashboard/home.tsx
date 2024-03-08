import {
  Stack,
  Box,
  Drawer,
  AppBar,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import PDFViewer from "../../components/pdf/PdfViewer";
import ChoosePdf from "../../components/pdf/ChoosePdf";
import { useContext, useState } from "react";
import PdfContext from "../../context/PdfContext";
import Chat from "../Chat";

function Home() {
  const pdfContext = useContext(PdfContext) as {
    file: File | null;
    changeFile: (file: File) => void;
    isLoading: boolean;
    upLoadPdf: (file: File) => void;
    documents: any[] | null;
    chooseFile: (id: string) => void;
    setIsNew: (isNew: boolean) => void;
    llms: string[];
    currentLlm: string | null;
    changeLLM: (llm: string) => void;
  };

  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  return (
    <>
      <AppBar
        position="static"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "white",
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            color: "black",
          }}
        >
          <Button onClick={toggleDrawer(true)}>Open Drawer</Button>
          PDF
        </Stack>
      </AppBar>
      <Drawer
        anchor={"left"}
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          width: "50%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            overflowY: "auto",
            padding: "1rem",
          }}
        >
          {pdfContext.llms && (
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-filled-label">LLM</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={pdfContext.currentLlm}
                onChange={(e) => pdfContext.changeLLM(e.target.value as string)}
              >
                {pdfContext.llms.map((llm) => {
                  return (
                    <MenuItem key={llm} value={llm}>
                      {llm}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          )}
          {pdfContext.documents?.map((doc: any) => {
            return (
              <Box
                key={doc.id}
                sx={{
                  padding: "1rem",
                  borderBottom: "1px solid black",
                  cursor: "pointer",
                }}
                onClick={() => {
                  pdfContext.setIsNew(false);
                  pdfContext.chooseFile(doc.id);
                }}
              >
                <Typography>{doc.filename}</Typography>
              </Box>
            );
          })}
        </Box>
      </Drawer>

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
    </>
  );
}

export default Home;
