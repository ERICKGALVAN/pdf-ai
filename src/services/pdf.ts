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
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

async function makeQuestion(question: String, id: string) {
  try {
    const response = await api.post("/pdf/makeQuestion", {
      question,
      id,
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

async function getDocuments() {
  try {
    const response = await api.get("/pdf/documents");
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

async function getBytes(id: string) {
  try {
    const response = await api.get("/pdf/bytes/" + id, {
      responseType: "blob",
    });
    return response.data;
  } catch (err) {}
}

const pdfService = {
  upLoadPdf,
  test,
  makeQuestion,
  getDocuments,
  getBytes,
};

export default pdfService;
