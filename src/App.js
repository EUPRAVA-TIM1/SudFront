import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavLayout from "./Components/NavLayout.tsx";
import HomePage from "./Pages/HomePage.tsx";
import CourtsPage from "./Pages/CourtsPage.tsx";
import JudgeMainPage from "./Pages/JudgeMainPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<NavLayout body={<HomePage></HomePage>} />}
        ></Route>
        <Route
          path="/Home"
          element={<NavLayout body={<HomePage></HomePage>} />}
        ></Route>
        <Route
          path="/Courts"
          element={<NavLayout body={<CourtsPage></CourtsPage>} />}
        ></Route>
        <Route
          path="/Judge"
          element={<NavLayout body={<JudgeMainPage></JudgeMainPage>} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
