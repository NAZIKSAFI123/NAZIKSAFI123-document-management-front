import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import DocumentDetails from "./pages/DocumentDetails";
import Documents from "./pages/Documents";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Documents />} />
        <Route path="/document/:id" element={<DocumentDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
