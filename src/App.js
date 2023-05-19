import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavLayout from "./Components/NavLayout.tsx";
import HomePage from "./Pages/HomePage.tsx";
import CourtsPage from "./Pages/CourtsPage.tsx";
import JudgeMainPage from "./Pages/JudgeMainPage.tsx";
import JudgesPage from "./Pages/JudgesPage.tsx";

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
          path="/Sud"
          element={<NavLayout body={<CourtsPage></CourtsPage>} />}
        ></Route>
        <Route
          path="/sudija"
          element={<NavLayout body={<JudgesPage></JudgesPage>} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
