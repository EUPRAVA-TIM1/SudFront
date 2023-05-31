import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Rociste } from "../Data/interfaces.ts";
import { userJmbg } from "../Data/data.ts";
import { getHearingById } from "../Services/HearingService.ts";

function HearingPage() {
  const { hearingId } = useParams();
  const [hearing, setHearing] = useState<Rociste>();
  const [hearingDate, setHearingDate] = useState();
  const [isJudgeSigned, setIsJudgeSigned] = useState(false);

  useEffect(() => {
    getHearingById(hearingId)
      .then((res) => {
        setHearing(res);
        setIsJudgeSigned(localStorage.getItem(userJmbg) === res.sudijaJmbg);
        var date = new Date(res.datumRocista);
        setHearingDate(date.toLocaleDateString());
      })
      .catch((err) => console.log(err));
  }, [hearingId]);

  return (
    <div className="d-flex justify-content-center row  ">
      <div className="card text-bg-success mb-4">
        <div className="card-header">
          <h3>{hearing?.naslov}</h3>
          <h4>
            {hearingDate} - {hearing?.predmet?.naslov}
          </h4>
        </div>
        <div className="card-body">
          <h5 className="card-title">Opis: {hearing?.predmet?.opis}</h5>
          <h5 className="card-title">Optuzeni jmbg: {hearing?.optuzeniJmbg}</h5>
          <h5 className="card-title">Advokat (jmbg): {hearing?.advokatJmbg}</h5>
          <h5 className="card-title">
            Sudija: {hearing?.predmet?.sudija?.ime}{" "}
            {hearing?.predmet?.sudija?.prezime}
          </h5>
        </div>
      </div>
      <div className="d-flex  col-4 ">
        {isJudgeSigned ? (
          <>
            <Link
              style={{ margin: "5px" }}
              to={`/odlukasudije/update/${hearing?.rocisteId}`}
              className="btn btn-outline-success "
            >
              Izmena rocista
            </Link>

            <Link
              style={{ margin: "5px" }}
              to={`/odlukasudije/create/${hearing?.rocisteId}`}
              className="btn btn-outline-success"
            >
              Kreiranje sudske odluke
            </Link>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default HearingPage;
