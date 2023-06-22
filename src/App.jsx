import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "@/layouts";
import { SignIn } from "./pages/auth";
import { Dashboard, Auth } from "@/layouts";

function App() {
  const { user } = useUser();
  const isAuthenticated = !!user;

  return (
    <Routes>
      {isAuthenticated ? (
        <Route path="/dashboard/*" element={<Dashboard />} />
      ) : (
        <Route path="/sign-in" element={<SignIn />} />
      )}
      <Route
        path="*"
        element={
          <Navigate
            to={isAuthenticated ? "/dashboard/home" : "/sign-in"}
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;
