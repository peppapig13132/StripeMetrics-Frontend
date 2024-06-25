import React from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { Home } from "./pages/home/Home";
// import { Signup } from "./pages/signup/Signup";
import { Login } from "./pages/login/Login";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { CustomPage } from "./components/custom-page/CustomPage";
import { ProtectedComponent } from "./components/protected-component/ProtectedComponent";
import { StripeOldData } from "./pages/stripe-old-data/StripeOldData";
import { DashboardProvider } from "./context/DashboardContext";
import { Signup } from './pages/signup/Signup';

const App: React.FC = () => {  
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedComponent>
              <DashboardProvider>
                <Dashboard />
              </DashboardProvider>
            </ProtectedComponent>}
          />
          <Route path="/stripe-old-data" element={
            <ProtectedComponent>
              <StripeOldData />
            </ProtectedComponent>}
          />
          <Route path="/404" element={<CustomPage title="404" description="Page not found" time={3000} redirectPath="/" redirectPageTitle="Home" />} />
          <Route path="/*" element={<Navigate to='/404' />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
