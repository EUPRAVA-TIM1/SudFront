import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  PrekrsajnaPrijava,
  StatusPrekrsajnePrijave,
  OpisiKrivica,
  Predmet,
} from "../Data/interfaces.ts";
import { ListGroup } from "react-bootstrap";
import { getReportById } from "../Services/ReportService.ts";
import { getCaseByReport } from "../Services/CaseService.ts";

function ReportPage() {
  const { reportId } = useParams();
  const [reportDate, setReportDate] = useState();
  const [report, setReport] = useState<PrekrsajnaPrijava>();
  const [courtCase, setCourtCase] = useState<Predmet>();
  useEffect(() => {
    getReportById(reportId)
      .then((res) => {
        setReport(res);
        var date = new Date(res.datum);
        setReportDate(date.toLocaleDateString());
        getCaseByReport(res.prekrsajnaPrijavaId)
          .then((cCase) => {
            setCourtCase(cCase);
          })
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err));
  }, [reportId]);

  return (
    <div className="d-flex justify-content-center row  ">
      <div className="card text-bg-success mb-4">
        <div className="card-header">
          <h5>
            {reportDate} -{" "}
            {StatusPrekrsajnePrijave[report?.statusPrekrsajnePrijave]}
          </h5>
        </div>
        <div className="card-body">
          {report?.dokumenti?.$values.length !== 0 ? (
            <>
              <h5 className="card-title">Dokumenti:</h5>

              <ListGroup>
                {report?.dokumenti?.$values.map((doc) => (
                  <ListGroup.Item variant="secondary">
                    {doc.urlDokumenta}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          ) : (
            ""
          )}
          <h5 className="card-title">Opis: {report?.komentar}</h5>
          <h5 className="card-title">Optuzeni jmbg: {report?.optuzeniJmbg}</h5>
          <h5 className="card-title">
            Prijavio (jmbg): {report?.prijavljenoOdJmbg}
          </h5>
          <h5 className="card-title">
            Prekrsaj: {OpisiKrivica[report?.prekrsaj]}
          </h5>
        </div>
      </div>
      <div className="d-flex justify-content-center row col-2 ">
        {courtCase === undefined ? (
          <Link
            to={`/predmet/create/${report?.prekrsajnaPrijavaId}`}
            className="btn btn-outline-success"
          >
            Napravi predmet
          </Link>
        ) : (
          <Link
            to={`/predmet/${courtCase?.predmetId}`}
            className="btn btn-outline-success"
          >
            Pogledaj predmet
          </Link>
        )}
      </div>
    </div>
  );
}

export default ReportPage;
