import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { isAuthenticated } from "./api/authService";
import Header from "./components/Header";
import DocumentDetails from "./pages/DocumentDetails";
import Documents from "./pages/Documents";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Router>
      {isAuthenticated() && <Header />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/document/:id"
          element={<PrivateRoute Component={DocumentDetails} />}
        />
        <Route path="/" element={<PrivateRoute Component={Documents} />} />
      </Routes>
    </Router>
  );
}

export default App;
