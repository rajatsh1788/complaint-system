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

        {/* COMPLAINT ROUTES */}

        <Route
          path="/complaints"
          element={<ComplaintList />}
        />

        <Route
          path="/add-complaint"
          element={<ComplaintForm />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;