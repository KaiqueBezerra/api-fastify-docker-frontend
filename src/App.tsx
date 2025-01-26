import { BrowserRouter, Route, Routes } from "react-router";
import { Register } from "./pages/register";
import { Index } from "./pages";
import { Login } from "./pages/login";
import ProtectedRoute from "./helper/protected";
import "./App.css";
import { Profile } from "./pages/profile";
import { ContextProvider } from "./useContext";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/perfil/:id" element={<Profile />} />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
