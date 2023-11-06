import { Route, Routes } from "react-router-dom";
import Home from "./pages/dashboard/home";
import PDFViewer from "./components/pdf/PdfViewer";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<PDFViewer />} />
    </Routes>
  );
}

export default App;
