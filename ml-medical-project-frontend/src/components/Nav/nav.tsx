import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./nav.css";
import ModelPage from "../Model/ModelPage";
import Home from "../Home/Home";
import Info from "../talk/talk-gpt";

function nav() {
  return (
    <Router>
      <div className="header">
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/use">Use</Link>
          <Link to="/info">let's talk</Link>
        </nav>
      </div>
      <div className="main">
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/use" Component={ModelPage} />
          <Route path="/info" Component={Info} />
        </Routes>
      </div>
    </Router>
  );
}
export default nav;
