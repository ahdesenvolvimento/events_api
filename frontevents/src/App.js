import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import styles from "./index.css";
import NewEvent from "./components/pages/NewEvent";
import Events from "./components/pages/Events";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      {/* <h1 className="teste">
        hte
      </h1> */}
      <Router>
        <Header />
        <div className="minHeight container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/newevent" element={<NewEvent />} />
            <Route path="events/" element={<Events />} />
            <Route path="/events/:id/" element={<NewEvent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
