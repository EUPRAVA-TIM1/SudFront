import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { StatusPrekrsajnePrijave, OpisiKrivica } from "../Data/interfaces.ts";
import { isSudija } from "../Data/data.ts";

const DecisionsListComponent = ({ decisions }) => {
  const [isSudijaSigned, setIsSudijaSigned] = useState(false);

  useEffect(() => {
    setIsSudijaSigned(localStorage.getItem(isSudija) === "True");
  }, []);
  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>Datum</th>
            {isSudijaSigned && <th>Optuzeni Jmbg</th>}
            {isSudijaSigned && <th>Advokat Jmbg</th>}
            <th>Sudija</th>
            {isSudijaSigned && <th>Predmet</th>}
            <th>Prekrsaj</th>
            <th>Datum rocista</th>
            <th>Od vozacka</th>
            <th>Od bodovi</th>
            <th>Novcana kazna</th>
            <th>Status odluke</th>
          </tr>
        </thead>
        <tbody>
          {decisions?.length !== 0 ? (
            decisions.map((decision) => {
              var date = new Date(decision.datum);
              const formattedDate = date.toLocaleDateString();

              var dateRociste = new Date(decision.rociste?.datumRocista);
              const formattedDateRociste = dateRociste.toLocaleDateString();

              return (
                <tr key={decision.odlukaSudijeId}>
                  <td>{formattedDate}</td>
                  {isSudijaSigned && <td>{decision.optuzeniJmbg}</td>}
                  {isSudijaSigned && <td>{decision.advokatJmbg}</td>}
                  <td>
                    {decision.sudija?.ime} {decision.sudija?.prezime}
                  </td>
                  {isSudijaSigned && <td>{decision?.predmet?.naslov}</td>}
                  <td>
                    {
                      OpisiKrivica[
                        decision?.predmet?.prekrsajnaPrijava?.prekrsaj
                      ]
                    }
                  </td>
                  <td>{formattedDateRociste}</td>
                  <td>{decision.oduzimanjeVozacke ? "Oduzeta" : "Nije"}</td>
                  <td>{decision.oduzimanjeBodova}</td>
                  <td>{decision.novcanaKazna}</td>
                  <td>{StatusPrekrsajnePrijave[decision.status]}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="text-monospace">
                <h2>Nema kreiranih sudskih odluka.</h2>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default DecisionsListComponent;
