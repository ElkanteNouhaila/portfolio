import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./pages/home";
import Dashboard from "./pages/dashboard";
import Navbar from "./components/navbar";
import { Footer } from "./components/footer";

function Layout() {
  const location = useLocation();

  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="flex flex-col min-h-screen w-full">

      {/* SHOW ONLY OUTSIDE DASHBOARD */}
      {!isDashboard && <Navbar />}

      <main className="flex-1 w-full bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      {/* SHOW ONLY OUTSIDE DASHBOARD */}
      {!isDashboard && <Footer />}

    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;