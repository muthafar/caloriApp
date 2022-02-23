import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";

import { useSelector } from "react-redux";

import SignUpPage from "./pages/SignUpPage";
import ReportPage from "./pages/ReportPage";
import EditPage from "./pages/EditPage";
import DeletePage from "./pages/DeletePage";
import FoodListPage from "./pages/FoodListPage";
import Homepage from "./pages/Homepage";

function App() {
  const { token, isAdmin } = useSelector((state) => state.user);

  return (
    <Routes>
      {!token && (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </>
      )}
      {token && <Route path="/home" element={<Homepage />} />}
      {isAdmin && (
        <>
          <Route path="/foodlist" element={<FoodListPage />} />
          <Route path="/food/delete/:id" element={<DeletePage />} />
          <Route path="/food/edit/:id" element={<EditPage />} />
          <Route path="/admin/reports" element={<ReportPage />} />
        </>
      )}
      <Route
        path="*"
        element={
          <Navigate
            to={token && isAdmin ? "/foodlist" : token ? "/home" : "/login"}
          />
        }
      />
    </Routes>
  );
}

export default App;
