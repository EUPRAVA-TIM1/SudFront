import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavLayout from "./Components/NavLayout.tsx";
import HomePage from "./Pages/HomePage.tsx";
import CourtsPage from "./Pages/CourtsPage.tsx";
import JudgeMainPage from "./Pages/JudgeMainPage.tsx";
import JudgesPage from "./Pages/JudgesPage.tsx";
import AuthorisePage from "./Pages/AuthorisePage.tsx";
import CourtPage from "./Pages/CourtPage.tsx";
import JudgePage from "./Pages/JudgePage.tsx";
import ReportsPage from "./Pages/ReportsPage.tsx";
import ReportPage from "./Pages/ReportPage.tsx";
import CaseCreatePage from "./Pages/CaseCreatePage.tsx";
import CasePage from "./Pages/CasePage.tsx";
import CasesPage from "./Pages/CasesPage.tsx";
import HearingCreatePage from "./Pages/HearingCreatePage.tsx";

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
          path="/redirekcija/:jwt"
          element={
            <NavLayout body={<AuthorisePage></AuthorisePage>}></NavLayout>
          }
        ></Route>
        <Route
          path="/Sud"
          element={<NavLayout body={<CourtsPage></CourtsPage>} />}
        ></Route>
        <Route
          path="/Sud/:sudId"
          element={<NavLayout body={<CourtPage></CourtPage>} />}
        ></Route>
        <Route
          path="/sudija"
          element={<NavLayout body={<JudgesPage></JudgesPage>} />}
        ></Route>
        <Route
          path="/sudija/:sudijaJmbg"
          element={<NavLayout body={<JudgePage></JudgePage>} />}
        ></Route>
        <Route
          path="/prekrsajnaprijava/sudija"
          element={<NavLayout body={<ReportsPage></ReportsPage>} />}
        ></Route>
        <Route
          path="/prekrsajnaprijava/:reportId"
          element={<NavLayout body={<ReportPage></ReportPage>} />}
        ></Route>
        <Route
          path="/predmet/sudija"
          element={<NavLayout body={<CasesPage></CasesPage>} />}
        ></Route>
        <Route
          path="/predmet/create/:reportId"
          element={<NavLayout body={<CaseCreatePage></CaseCreatePage>} />}
        ></Route>
        <Route
          path="/predmet/:predmetId"
          element={<NavLayout body={<CasePage></CasePage>} />}
        ></Route>
        <Route
          path="/rociste/create/:caseId"
          element={<NavLayout body={<HearingCreatePage></HearingCreatePage>} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
