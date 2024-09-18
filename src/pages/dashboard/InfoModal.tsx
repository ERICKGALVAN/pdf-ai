import { Box, Link, Modal, Typography } from "@mui/material";

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

function InfoModal({ openModal, toggleModal }: TestInfoProps) {
  return (
    <>
      <Modal
        open={openModal}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>Information</Typography>
          <Box sx={{ height: "1rem" }} />
          <Typography>
            This is a preview of Erick Galvan's thesis: 'Qualitative and
            Quantitative Comparison of Responses Generated by Pre-trained
            Language Models,' which aims to compare the responses and texts
            generated by selected models and determine the characteristics that
            make them better or worse.
          </Typography>
          <Box sx={{ height: "1rem" }} />
          <Typography>
            In this preview it is possible only to use the GPT 3.5 Model, but if
            you want to use the other models, you can download the full version
            of the thesis and read more about the methodology and results.
          </Typography>
          <Box sx={{ height: "1rem" }} />
          <Link
            href="https://github.com/ERICKGALVAN/pdf-ai"
            target="_blank"
            underline="hover"
          >
            Github project{" "}
          </Link>

          <Box sx={{ height: "1rem" }} />
          <Link
            href="https://www.erickgalvan.com/src/pages/thesis.html"
            target="_blank"
            underline="hover"
          >
            Full version of the thesis{" "}
          </Link>
          <Box sx={{ height: "1rem" }} />
          <Typography>
            Thank you for using this application, if you have any questions or
            suggestions, please contact me at
          </Typography>
          <Link
            href="https://www.erickgalvan.com"
            target="_blank"
            underline="hover"
          >
            erickgalvan.com
          </Link>
        </Box>
      </Modal>
    </>
  );
}

export default InfoModal;
