import {
  Box,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useContext } from "react";
import PdfContext from "../../context/PdfContext";

interface CostumDrawerProps {
  open: boolean;
  toggleDrawer: (open: boolean) => () => void;
}
function CostumDrawer({ open, toggleDrawer }: CostumDrawerProps) {
  const pdfContext = useContext(PdfContext) as {
    llms: string[];
    currentLlm: string | null;
    changeLLM: (llm: string) => void;
  };

  return (
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
        {/* enable select to change between llms (must have huggingface credentials) */}
        {pdfContext.llms && (
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-filled-label">LLM</InputLabel>
            <Select
              disabled
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
        {/* {pdfContext.documents?.map((doc: any) => {
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
          })} */}
        {/* <Button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          Cerrar Sesión
        </Button> */}
      </Box>
    </Drawer>
  );
}

export default CostumDrawer;
