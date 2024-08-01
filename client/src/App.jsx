import { useUser } from "@clerk/clerk-react";
import "./App.css";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import Header from "./components/custom/Header";
import { Toaster } from "@/components/ui/sonner"

function App() {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  if (!isSignedIn && isLoaded) {
    return navigate("/auth/sign-in");
    // return <Navigate to={"/auth/sign-in"} />;
  }
  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
    </>
  );
}

export default App;
