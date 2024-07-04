import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Agent from "./pages/Agent";
import Home from "./pages/Home";
import Report from "./pages/Report";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/agent" element={<Agent />} />
      </Routes>
    </Router>
  );
}

export default App;
