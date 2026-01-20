import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddConfession from "./pages/AddConfession";
import ConfessionDetail from "./pages/ConfessionDetail";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AdminProtected from "./components/AdminProtected";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddConfession />} />
        <Route path="/confession/:id" element={<ConfessionDetail />} />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <AdminProtected>
              <Admin />
            </AdminProtected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
