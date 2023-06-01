import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import TimeLinePage from "./pages/TimeLinePage/TimeLinePage";
import UserContext from "./contexts/UserContext";
import { useState } from "react";

export default function App() {
  const [user, setUser] = useState({})
  return (
    <BrowserRouter>
    <UserContext.Provider value={[user, setUser]}>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/timeline" element={<TimeLinePage />} />
      </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
