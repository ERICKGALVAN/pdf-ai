import { Route, Routes } from "react-router-dom";
import Home from "./pages/dashboard/home";

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
