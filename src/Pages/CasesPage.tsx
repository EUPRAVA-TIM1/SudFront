import React, { useState, useEffect } from "react";
import { Predmet, StatusPredmeta } from "../Data/interfaces.ts";
import { getCaseByJudgeJmbg } from "../Services/CaseService.ts";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

function CasesPage() {
  const [cases, setCases] = useState<Predmet[]>([]);
  useEffect(() => {
    getCaseByJudgeJmbg()
      .then((res) => {
        setCases(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h3>Pretraga sudskih predmeta</h3>
      <Table striped>
        <thead>
          <tr>
            <th>Datum</th>
            <th>Naslov</th>
            <th>Optuzeni</th>
            <th>Status prijave</th>
          </tr>
        </thead>
        <tbody>
          {cases?.length !== 0 ? (
            cases.map((courtCase) => {
              var date = new Date(courtCase.datum);
              const formattedDate = date.toLocaleDateString();
              return (
                <tr key={courtCase.prekrsajnaPrijavaId}>
                  <td>{formattedDate}</td>
                  <td>{courtCase.naslov}</td>
                  <td>{courtCase.optuzeniJmbg}</td>
                  <td>{StatusPredmeta[courtCase.status]}</td>
                  <td>
                    <Link
                      className="btn btn-outline-success"
                      to={`/predmet/${courtCase?.predmetId}`}
                    >
                      Show
                    </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="text-monospace">
                <h2>Nema kreiranih sudskih predmeta.</h2>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}

export default CasesPage;
