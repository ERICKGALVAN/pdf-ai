import api from "../utils/api";

async function upLoadPdf(pdf: File) {
  try {
    const formData = new FormData();
    formData.append("file", pdf);
    const response = await api.post("/pdf/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

const pdfService = {
  upLoadPdf,
};

export default pdfService;
