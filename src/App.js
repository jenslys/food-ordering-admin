import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import "./App.css";

const App = () => (
  <KindeProvider
    clientId={process.env.REACT_APP_KINDE_CLIENT_ID}
    domain="https://lystad.kinde.com"
    redirectUri="http://localhost:3000"
    logoutUri="http://localhost:3000">
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </KindeProvider>
);

export default App;
