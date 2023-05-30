import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import {
  PrekrsajnaPrijava,
  OpisiKrivica,
  StatusPrekrsajnePrijave,
} from "../Data/interfaces.ts";
import { getAllReportsByJudge } from "../Services/ReportService.ts";

function ReportsPage() {
  const [reports, setReports] = useState<PrekrsajnaPrijava[]>([]);
  useEffect(() => {
    getAllReportsByJudge()
      .then((res) => {
        setReports(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h3>Pretraga prekrsajnih prijava</h3>
      <Table striped>
        <thead>
          <tr>
            <th>Datum</th>
            <th>Opis</th>
            <th>Optuzeni</th>
            <th>Prekrsaj</th>
            <th>Status prijave</th>
          </tr>
        </thead>
        <tbody>
          {reports?.length !== 0 ? (
            reports.map((report) => {
              var date = new Date(report.datum);
              const formattedDate = date.toLocaleDateString();
              return (
                <tr key={report.prekrsajnaPrijavaId}>
                  <td>{formattedDate}</td>
                  <td>{report.komentar}</td>
                  <td>{report.optuzeniJmbg}</td>
                  <td>{OpisiKrivica[report.prekrsaj]}</td>
                  <td>
                    {StatusPrekrsajnePrijave[report.statusPrekrsajnePrijave]}
                  </td>
                  <td>
                    <Link
                      className="btn btn-outline-success"
                      to={`/prekrsajnaprijava/${report?.prekrsajnaPrijavaId}`}
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
                <h2>Nema dodeljenih prekrsajnih prijava.</h2>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}

export default ReportsPage;
