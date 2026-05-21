import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./pages/home";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Navbar from "./components/navbar";
import { Footer } from "./components/footer";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";


function Layout() {
  const location = useLocation();

  const hideChrome =
    location.pathname.startsWith("/dashboard") ||
    location.pathname === "/login";

  return (
    <div className="flex min-h-screen w-full flex-col">
      {!hideChrome && <Navbar />}

      <main className="w-full flex-1 bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/messages"
            element={
              <ProtectedRoute>
                <div>Messages Page (to be built)</div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/settings"
            element={
              <ProtectedRoute>
                <div>Settings Page (to be built)</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {!hideChrome && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}

export default App;
