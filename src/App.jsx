import Header from "./components/Header";
import DetailsFile from "./pages/DetailsFile";
import Documents from "./pages/Documents";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Documents />}/>
        <Route path="/document/:id" element={<DetailsFile/>} />
      </Routes>
    </Router>
  );
}

export default App;
