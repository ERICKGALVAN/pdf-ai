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

async function makeQuestion(question: String) {
  try {
    console.log(question);
    const response = await api.post("/pdf/makeQuestion", {
      question,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

async function test() {
  try {
    const response = await api.post("/pdf/test", {
      conversation_id: "1",
      message: "mi nombre es erick",
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

const pdfService = {
  upLoadPdf,
  test,
  makeQuestion,
};

export default pdfService;
