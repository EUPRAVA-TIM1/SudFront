import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Sudija, decSudije } from "../Data/interfaces.ts";
import { getDecisionByJudgeSearch } from "../Services/CourtDecisionService.ts";
import { getJudgeByJmbg } from "../Services/JudgeService.ts";
import DecisionsListComponent from "../Components/DecisionsListComponent.tsx";
import { Form } from "react-bootstrap";

function JudgePage() {
  const { sudijaJmbg } = useParams();
  const [judge, setJudge] = useState<Sudija>();
  const [violation, setViolation] = useState();
  const [decisions, setDecisions] = useState<decSudije>([]);

  const [avgLicence, setAvgLicence] = useState(0);
  const [avgPoints, setAvgPoints] = useState(0);
  const [avgPrice, setAvgPrice] = useState(0);
  const [avgStatus, setAvgStatus] = useState(0);

  useEffect(() => {
    getJudgeByJmbg(sudijaJmbg)
      .then((res) => {
        setJudge(res);
      })
      .catch((err) => console.log(err));
    getDecisionByJudgeSearch(sudijaJmbg, violation)
      .then((res) => {
        setDecisions(res);

        //analitics
        let totalOduzimanjeBodova = 0;
        let totalNovcanaKazna = 0;
        let totalOduzimanjeVozacke = 0;
        let totalStatus = 0;
        let count = res?.length;

        for (const dec of res) {
          totalOduzimanjeBodova += dec.oduzimanjeBodova;
          totalNovcanaKazna += dec.novcanaKazna;
          if (dec.status === 1) {
            totalStatus++;
          }
          if (dec.oduzimanjeVozacke) {
            totalOduzimanjeVozacke++;
          }
        }

        setAvgPoints(parseFloat((totalOduzimanjeBodova / count).toFixed(2)));
        setAvgPrice(parseFloat((totalNovcanaKazna / count).toFixed(2)));
        setAvgLicence(
          parseFloat(((totalOduzimanjeVozacke / count) * 100).toFixed(2))
        );
        setAvgStatus(parseFloat(((totalStatus / count) * 100).toFixed(2)));
      })
      .catch((err) => console.log(err));
  }, [sudijaJmbg, violation]);
  const handleViolationChange = (e) => {
    if (e.target.value !== "") setViolation(e.target.value);
    else setViolation(undefined);
  };
  return (
    <>
      <div className="d-flex justify-content-center row  ">
        <div className="card text-bg-success mb-4">
          <div className="card-header">
            <h5>
              {judge?.ime} {judge?.prezime}
            </h5>
          </div>
          <div className="card-body">
            {judge?.sud != null ? (
              <h5 className="card-title">Sud: {judge?.sud?.naziv}</h5>
            ) : (
              ""
            )}
            <h5 className="card-title">Jmbg: {judge?.jmbg}</h5>
            <h5 className="card-title">
              Opstina: {judge?.sud?.opstina?.ptt}, {judge?.sud?.opstina?.naziv}
            </h5>
            <h5 className="card-title">Mail: {judge?.mail}</h5>
          </div>
        </div>
      </div>
      <h3>Analitika sudskih odluka</h3>
      <label>
        Izaberi sud:
        <Form.Select value={violation} onChange={handleViolationChange}>
          <option value="">All</option>

          <option key={0} value={0}>
            Prekoracenje brzine
          </option>
          <option key={1} value={1}>
            Voznja pod dejstvom alkohola
          </option>
          <option key={2} value={2}>
            Voznja bez vezaog pojasa
          </option>
          <option key={3} value={3}>
            Tehnicka neispravnost vozila
          </option>
          <option key={4} value={4}>
            Istekla/Neposedovanje prve pomoci
          </option>
          <option key={5} value={5}>
            Upravljanje vozilom bez vozacke dozvole
          </option>
          <option key={6} value={6}>
            Upravljanje neregistrovanog vozila
          </option>
        </Form.Select>
      </label>
      <div className="circle-container">
        <div className="circle-container-item">
          <div className="circle">{avgLicence}%</div>
        </div>
        <div className="circle-text">Oduzeto vozacki</div>
        <div className="circle-container-item">
          <div className="circle">{avgPoints}</div>
        </div>
        <div className="circle-text">Procenat bodova</div>
        <div className="circle-container-item">
          <div className="circle">{avgPrice}</div>
        </div>
        <div className="circle-text">Novcana kazna</div>
        <div className="circle-container-item">
          <div className="circle">{avgStatus}%</div>
        </div>
        <div className="circle-text">Procenat okrivljenih</div>
      </div>
      <DecisionsListComponent decisions={decisions}></DecisionsListComponent>
    </>
  );
}

export default JudgePage;
