import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Home}  from "./pages/home";
// import  Dashboard  from "./pages/dashboard";
import  Navbar  from "./components/navbar";
import { Footer } from "./components/footer";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />

        <main className="flex-1 w-full bg-gray-100">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

