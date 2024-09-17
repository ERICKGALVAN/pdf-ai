import { Route, Routes } from "react-router-dom";
import Home from "./pages/dashboard/home";
import { pdfjs } from "react-pdf";
import LoginScreen from "./components/auth/LoginScreen";
import RegisterScreen from "./components/auth/RegisterScreen";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function App() {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
    </Routes>
  );
  // return (
  //   <Routes>
  //     <Route path="/" element={<PrivateRoute />}>
  //       <Route path="/" element={<Home />} />
  //     </Route>
  //     <Route path="/login" element={<PublicRoute />}>
  //       <Route path="/login" element={<LoginScreen />} />
  //     </Route>
  //     <Route path="/register" element={<PublicRoute />}>
  //       <Route path="/register" element={<RegisterScreen />} />
  //     </Route>
  //     <Route
  //       path="*"
  //       element={localStorage.getItem("token") ? <Home /> : <LoginScreen />}
  //     />
  //   </Routes>
  // );
}

export default App;
