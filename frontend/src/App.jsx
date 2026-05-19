import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

// PAGES

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ComplaintList from "./pages/ComplaintList";
import ComplaintForm from "./pages/ComplaintForm";

// COMPONENTS

import ProtectedRoute
from "./components/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* DEFAULT ROUTE */}

        <Route
          path="/"
          element={
            <Navigate to="/login" />
          }
        />

        {/* AUTH ROUTES */}

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        {/* PROTECTED ROUTES */}

        <Route
          path="/complaints"
          element={
            <ProtectedRoute>

              <ComplaintList />

            </ProtectedRoute>
          }
        />

        <Route
          path="/add-complaint"
          element={
            <ProtectedRoute>

              <ComplaintForm />

            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;