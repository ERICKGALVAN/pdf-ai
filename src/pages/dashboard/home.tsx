import { Stack, Box, AppBar, IconButton } from "@mui/material";
import PDFViewer from "../../components/pdf/PdfViewer";
import ChoosePdf from "../../components/pdf/ChoosePdf";
import { useContext, useState } from "react";
import PdfContext from "../../context/PdfContext";
import Chat from "../Chat";
import { TestInterface } from "../../interfaces/test_interface";
import TestInfo from "./TestInfo";
import CustomDrawer from "./CustomDrawer";
import InfoIcon from "@mui/icons-material/Info";
import InfoModal from "./InfoModal";

function Home() {
  const pdfContext = useContext(PdfContext) as {
    file: File | null;
    changeFile: (file: File) => void;
    isLoading: boolean;
    upLoadPdf: (file: File) => void;
    // documents: any[] | null;
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
  const [openInfo, setOpenInfo] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const toggleInfo = () => {
    setOpenInfo(!openInfo);
  };
  return (
    <>
      <TestInfo openModal={openModal} toggleModal={toggleModal} />
      <InfoModal openModal={openInfo} toggleModal={toggleInfo} />
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
          <IconButton onClick={toggleInfo}>
            <InfoIcon />
          </IconButton>
          {/* uncomment to show test options (must have huggingface credentials) */}

          {/* <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>

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
          </Stack> */}
        </Stack>
      </AppBar>
      <CustomDrawer open={open} toggleDrawer={toggleDrawer} />

      <Stack
        direction={"row"}
        spacing={2}
        sx={{
          overflow: "hidden",
        }}
      >
        {pdfContext.file ? (
          <Box sx={{ width: "50%", height: "91vh", overflowY: "auto" }}>
            <PDFViewer />
          </Box>
        ) : (
          <ChoosePdf />
        )}
        <Box sx={{ width: "50%", height: "91vh", overflowY: "auto" }}>
          <Chat />
        </Box>
      </Stack>
    </>
  );
}

export default Home;
