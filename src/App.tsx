import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { Signup } from "./pages/signup/Signup";
import { Login } from "./pages/login/Login";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { CustomPage } from "./components/custom-page/CustomPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/404" element={<CustomPage title="404" description="Page not found" time={3000} redirectPath="/dashboard" redirectPageTitle="Dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
