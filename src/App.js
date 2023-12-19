import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/custom.css";
import { useEffect, useState } from "react";
import { UserContext } from "./context";

const App = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          {routes.map(({ element, path }, key) => (
            <Route
              element={
                path === "/profile" && !user.email ? (
                  <Navigate to="/" />
                ) : (
                  element
                )
              }
              path={path}
              key={key}
            />
          ))}
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
