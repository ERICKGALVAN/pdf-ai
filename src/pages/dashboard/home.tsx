import {
  Stack,
  Box,
  Drawer,
  AppBar,
  Button,
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
import { TestInterface } from "../../interfaces/test_interface";
import MenuIcon from "@mui/icons-material/Menu";
import TestInfo from "./TestInfo";
import CustomDrawer from "./CustomDrawer";

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
      <TestInfo openModal={openModal} toggleModal={toggleModal} />
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
          <IconButton onClick={toggleDrawer(true)}>
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
          </Stack>
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
