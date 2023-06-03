import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import TimeLinePage from "./pages/TimeLinePage/TimeLinePage";
import UserProvider from "./contexts/UserContext";
import UserPage from "./pages/UserPage/UserPage";

export default function App() {
  return (
    <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/timeline" element={<TimeLinePage />} />
        <Route path="/user/:id" element={<UserPage />} />
      </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}
