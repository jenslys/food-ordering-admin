import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, SignIn } from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Orders from "./pages/Orders";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Edit from "./pages/Edit";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();

  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SignedIn>
                <Orders />
              </SignedIn>
              <SignedOut>
                <Home />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/sign-in/*"
          element={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh"
              }}>
              {" "}
              <SignIn
                routing="path"
                path="/sign-in"
                appearance={{
                  elements: { footerAction: { display: "none" } }
                }}
              />
            </div>
          }
        />
        <Route
          path="/orders"
          element={
            <>
              <SignedIn>
                <Orders />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/edit"
          element={
            <>
              <SignedIn>
                <Edit />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </ClerkProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ClerkProviderWithRoutes />
    </BrowserRouter>
  );
}

export default App;
