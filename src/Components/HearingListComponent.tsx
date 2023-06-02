import React from "react";
import { IshodRocista } from "../Data/interfaces.ts";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

function HearingListComponent({ hearings }) {
  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>Datum</th>
            <th>Optuzeni Jmbg</th>
            <th>Advokat Jmbg</th>
            <th>Sudija</th>
            <th>Predmet</th>
            <th>Sud</th>
            <th>Status rocista</th>
          </tr>
        </thead>
        <tbody>
          {hearings?.length !== 0 ? (
            hearings.map((hearing) => {
              var date = new Date(hearing.datumRocista);
              const formattedDate = date.toLocaleDateString();

              return (
                <tr key={hearing.prekrsajnaPrijavaId}>
                  <td>{formattedDate}</td>
                  <td>{hearing.predmet?.optuzeniJmbg}</td>
                  <td>{hearing.advokatJmbg}</td>
                  <td>
                    {hearing.predmet?.sudija?.ime}{" "}
                    {hearing.predmet?.sudija?.prezime}
                  </td>
                  <td>{hearing?.predmet?.naslov}</td>
                  <td>{hearing?.predmet?.sudija?.sud?.naziv}</td>
                  <td>{IshodRocista[hearing.ishodRocista]}</td>
                  <td>
                    <Link
                      className="btn btn-outline-success"
                      to={`/rociste/${hearing?.rocisteId}`}
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
                <h2>Nema kreiranih sudskih rocista.</h2>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}

export default HearingListComponent;
