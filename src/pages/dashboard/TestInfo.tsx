import { Box, Modal, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import PdfContext from "../../context/PdfContext";
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

interface TestInfoProps {
  openModal: boolean;
  toggleModal: () => void;
}

function TestInfo({ openModal, toggleModal }: TestInfoProps) {
  const pdfContext = useContext(PdfContext) as {
    testInfo: Array<TestInterface> | null;
    numberTest: number;
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
    </>
  );
}

export default TestInfo;
