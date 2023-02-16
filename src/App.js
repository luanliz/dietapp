import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";

//Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//Hooks
import { useAuth } from "./hooks/useAuth";

//Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import EditProfile from "./pages/EditProfile/EditProfile";
import Goal from "./pages/Goal/Goal";

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Carregando</p>;
  }

  return (
    <ChakraProvider>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={auth ? <Home /> : <Navigate to="/login" />}
              />

              <Route
                path="/meta"
                element={auth ? <Goal /> : <Navigate to="/pro/login" />}
              />
              <Route
                path="/login"
                element={!auth ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/register"
                element={!auth ? <Register /> : <Navigate to="/" />}
              />
            </Routes>
          </div>

          <Footer />
        </BrowserRouter>
      </div>
    </ChakraProvider>
  );
}

export default App;
