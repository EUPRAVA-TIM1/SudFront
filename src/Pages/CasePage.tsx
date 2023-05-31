import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Predmet,
  StatusPredmeta,
  Rociste,
  IshodRocista,
} from "../Data/interfaces.ts";
import { getCaseById } from "../Services/CaseService.ts";
import { getHearingsByCase } from "../Services/HearingService.ts";

const CasePage = () => {
  const { predmetId } = useParams();
  const [activeHearingExist, setActiveHearingExist] = useState(true);
  const [caseDate, setCaseDate] = useState();
  const [courtCase, setCourtCase] = useState<Predmet>();
  const [hearings, setHearings] = useState<Rociste[]>([]);
  useEffect(() => {
    getCaseById(predmetId)
      .then((res) => {
        setCourtCase(res);
        var date = new Date(res.datum);
        setCaseDate(date.toLocaleDateString());
      })
      .catch((err) => console.log(err));

    getHearingsByCase(predmetId)
      .then((res) => {
        setHearings(res);
        const hasActiveHearing = res.some(
          (hearing) => hearing.ishodRocista === 0
        );
        setActiveHearingExist(hasActiveHearing);
      })
      .catch((err) => console.log(err));
  }, [predmetId]);

  const getActiveHearingId = () => {
    return hearings
      .filter((hearing) => hearing.ishodRocista === 0)
      .map((hearing) => hearing.rocisteId)[0];
  };

  return (
    <div className="d-flex justify-content-center row  ">
      <div className="card text-bg-success mb-4">
        <div className="card-header">
          <h3>{courtCase?.naslov}</h3>
          <h4>
            {caseDate} - {StatusPredmeta[courtCase?.status]}
          </h4>
        </div>
        <div className="card-body">
          <h5 className="card-title">Opis: {courtCase?.opis}</h5>
          <h5 className="card-title">
            Optuzeni jmbg: {courtCase?.optuzeniJmbg}
          </h5>
          <h5 className="card-title">
            Advokat (jmbg): {courtCase?.advokatJmbg}
          </h5>
          <h5 className="card-title">Sudija (jmbg): {courtCase?.sudijaJmbg}</h5>
        </div>
      </div>
      <div className="d-flex justify-content-center row col-2 ">
        {activeHearingExist ? (
          <Link
            to={`/rociste/${getActiveHearingId()}`}
            className="btn btn-outline-success"
          >
            Pogledaj zakazano rociste
          </Link>
        ) : (
          <Link
            to={`/rociste/create/${courtCase?.predmetId}`}
            className="btn btn-outline-success"
          >
            Kreiraj rociste
          </Link>
        )}
      </div>
      <div className="d-flex justify-content-center row  ">
        {hearings.length !== 0 ? (
          <>
            <h3 className="card-title">Pregled istorije rocista</h3>
            <hr></hr>
          </>
        ) : (
          ""
        )}
        {hearings.length !== 0 ? (
          hearings.map((hearing) => {
            var date = new Date(hearing.datumRocista);
            const formattedDate = date.toLocaleDateString();
            return (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Datum: {formattedDate}</h5>
                  <p className="card-text">Sudija: {hearing?.sudijaJmbg}</p>
                  <p className="card-text">Advokat: {hearing?.advokatJmbg}</p>
                  <p className="card-text">
                    Ishod rocista: {IshodRocista[hearing?.ishodRocista]}
                  </p>
                  <Link
                    to={`/rociste/${hearing.rocisteId}`}
                    className="btn btn-outline-success"
                  >
                    Pogledaj rociste
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <h3 className="card-title">Nema kreiranih rocista</h3>
        )}
      </div>
    </div>
  );
};

export default CasePage;
