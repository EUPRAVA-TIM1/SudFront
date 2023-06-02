import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavLayout from "./Components/NavLayout.tsx";
import HomePage from "./Pages/HomePage.tsx";
import CourtsPage from "./Pages/CourtsPage.tsx";
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
import HearingPage from "./Pages/HearingPage.tsx";
import CourtDecisionCreatePage from "./Pages/CourtDecisionCreatePage.tsx";
import JudgeHearingsPage from "./Pages/JudgeHearingsPage.tsx";
import CitizensHearingsPage from "./Pages/CitizensHearingsPage.tsx";
import LawyersHearingsPage from "./Pages/LawyersHearingsPage.tsx";
import JudgesDecisionsPage from "./Pages/JudgesDecisionsPage.tsx";
import LawyersDecisionsPage from "./Pages/LawyersDecisionsPage.tsx";
import CitizensDecisionsPage from "./Pages/CitizensDecisionsPage.tsx";

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
        <Route
          path="/rocista/sudija"
          element={<NavLayout body={<JudgeHearingsPage></JudgeHearingsPage>} />}
        ></Route>
        <Route
          path="/rocista/gradjanin"
          element={
            <NavLayout body={<CitizensHearingsPage></CitizensHearingsPage>} />
          }
        ></Route>
        <Route
          path="/rocista/advokat"
          element={
            <NavLayout body={<LawyersHearingsPage></LawyersHearingsPage>} />
          }
        ></Route>
        <Route
          path="/rociste/:hearingId"
          element={<NavLayout body={<HearingPage></HearingPage>} />}
        ></Route>
        <Route
          path="/odlukasudije/create/:hearingId"
          element={
            <NavLayout
              body={<CourtDecisionCreatePage></CourtDecisionCreatePage>}
            />
          }
        ></Route>
        <Route
          path="/odlukasudije/sudija"
          element={
            <NavLayout body={<JudgesDecisionsPage></JudgesDecisionsPage>} />
          }
        ></Route>
        <Route
          path="/odlukasudije/advokat"
          element={
            <NavLayout body={<LawyersDecisionsPage></LawyersDecisionsPage>} />
          }
        ></Route>
        <Route
          path="/odlukasudije/gradjanin"
          element={
            <NavLayout body={<CitizensDecisionsPage></CitizensDecisionsPage>} />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
