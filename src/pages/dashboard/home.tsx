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
  Switch,
  IconButton,
} from "@mui/material";
import PDFViewer from "../../components/pdf/PdfViewer";
import ChoosePdf from "../../components/pdf/ChoosePdf";
import { useContext, useState } from "react";
import PdfContext from "../../context/PdfContext";
import Chat from "../Chat";
import BarChartIcon from "@mui/icons-material/BarChart";
import Modal from "@mui/material/Modal";
import { TestInterface } from "../../interfaces/test_interface";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: "80%",
  overflow: "scroll",
};

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
    testMode: boolean;
    setTestMode: (testMode: boolean) => void;
    testInfo: Array<TestInterface> | null;
    numberTest: number;
  };

  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const toggleModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <>
      <Modal
        open={openModal}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack>
            <Typography id="modal-modal-title" variant="h4" component="h2">
              {pdfContext.testInfo
                ? "Métricas"
                : "No hay información de la prueba"}
            </Typography>
            <Typography>
              {pdfContext.testInfo
                ? `Número de pruebas: ${pdfContext.numberTest}`
                : ""}
            </Typography>
          </Stack>
          {pdfContext.testInfo &&
            pdfContext.testInfo.map((test) => {
              return (
                <Box key={test.llm}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    {test.llm}
                  </Typography>
                  <Typography variant="h6">Bleu</Typography>
                  <Box
                    sx={{
                      pl: "1rem",
                    }}
                  >
                    <Typography> Bleu: {test.bleu.bleu}</Typography>
                    <Typography>
                      Brevity penalty: {test.bleu.brevity_penalty}
                    </Typography>
                    <Typography>
                      Length ratio: {test.bleu.length_ratio}
                    </Typography>
                    <Typography> Precisions: </Typography>

                    <Box
                      sx={{
                        pl: "1rem",
                      }}
                    >
                      {test.bleu.precisions.map((precision, index) => {
                        return (
                          <Typography key={index}>
                            Precision {index + 1}: {precision}
                          </Typography>
                        );
                      })}
                    </Box>

                    <Typography>
                      Reference length: {test.bleu.reference_length}
                    </Typography>
                    <Typography>
                      Translation length: {test.bleu.translation_length}
                    </Typography>
                  </Box>
                  <Typography variant="h6">Rouge</Typography>
                  <Box
                    sx={{
                      pl: "1rem",
                    }}
                  >
                    <Typography>Rouge1: {test.rouge.rouge1}</Typography>
                    <Typography>Rouge2: {test.rouge.rouge2}</Typography>
                    <Typography>RougeL: {test.rouge.rougeL}</Typography>
                    <Typography>RougeLSum: {test.rouge.rougeLsum}</Typography>
                  </Box>
                  <Typography variant="h6">Bert</Typography>
                  <Box
                    sx={{
                      pl: "1rem",
                    }}
                  >
                    <Typography>F1:</Typography>
                    <Box
                      sx={{
                        pl: "1rem",
                      }}
                    >
                      {test.bert.f1.map((f1, index) => {
                        return (
                          <Typography key={index}>
                            F1 {index + 1}: {f1}
                          </Typography>
                        );
                      })}
                    </Box>
                    <Typography>Hashcode: {test.bert.hashcode}</Typography>
                    <Typography>Precision: </Typography>
                    <Box
                      sx={{
                        pl: "1rem",
                      }}
                    >
                      {test.bert.precision.map((precision, index) => {
                        return (
                          <Typography key={index}>
                            Precision {index + 1}: {precision}
                          </Typography>
                        );
                      })}
                    </Box>
                    <Typography>Recall:</Typography>
                    <Box
                      sx={{
                        pl: "1rem",
                      }}
                    >
                      {test.bert.recall.map((recall, index) => {
                        return (
                          <Typography key={index}>
                            Recall {index + 1}: {recall}
                          </Typography>
                        );
                      })}
                    </Box>
                  </Box>
                </Box>
              );
            })}
        </Box>
      </Modal>

      <AppBar
        position="static"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "white",
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          sx={{
            color: "black",
          }}
        >
          <Button onClick={toggleDrawer(true)}>Open Drawer</Button>
          <Stack direction={"row"}>
            {pdfContext.testMode ? (
              <IconButton onClick={toggleModal}>
                <BarChartIcon />
              </IconButton>
            ) : null}
            <Switch
              checked={pdfContext.testMode}
              onChange={() => pdfContext.setTestMode(!pdfContext.testMode)}
            />
          </Stack>
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
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            Cerrar Sesión
          </Button>
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
