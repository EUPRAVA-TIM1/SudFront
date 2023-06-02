import React, { useState, useEffect } from "react";
import { Sud, Sudija } from "../Data/interfaces";
import { useParams, Link } from "react-router-dom";
import { Form, Table } from "react-bootstrap";
import { getAllJudgesByCourt, getCourtById } from "../Services/CourtService.ts";

function CourtPage() {
  const { sudId } = useParams();
  const [court, setCourt] = useState<Sud>();
  const [judges, setJudges] = useState<Sudija[]>([]);

  const [judgeName, setJudgeName] = useState("");
  const [judgeLastName, setJudgeLastName] = useState("");
  var [filteredJudges, setFilteredJudges] = useState<Sudija[]>([]);
  useEffect(() => {
    getCourtById(sudId)
      .then((res) => {
        setCourt(res);
      })
      .catch((err) => console.log(err));

    getAllJudgesByCourt(sudId)
      .then((res) => {
        setJudges(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [sudId]);

  useEffect(() => {
    var retVal = judges;
    if (judgeName !== "") {
      retVal = retVal.filter((c) => c.ime.includes(judgeName));
    }
    if (judgeLastName !== "") {
      retVal = retVal.filter((c) => c.prezime.includes(judgeLastName));
    }
    setFilteredJudges(retVal);
  }, [judgeName, judgeLastName]);

  return (
    <div className="d-flex justify-content-center row ">
      <div className="card text-bg-success mb-4">
        <div className="card-header">
          <h5>{court?.naziv}</h5>
        </div>
        <div className="card-body">
          <h5 className="card-title">
            Opstina: {court?.opstina?.ptt},{court?.opstina?.naziv}
          </h5>
        </div>
        <>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Ime</Form.Label>
            <Form.Control
              onChange={(e) => setJudgeName(e.target.value)}
              type="text"
              placeholder="Unesite ime za pretragu"
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-2" controlId="formBasicLastName">
            <Form.Label>Prezime</Form.Label>
            <Form.Control
              onChange={(e) => setJudgeLastName(e.target.value)}
              type="text"
              placeholder="Unesite ime za pretragu"
            />
          </Form.Group>
          <Table striped>
            <thead>
              <tr>
                <th>Naziv</th>
                <th>Opstina</th>
                <th>Mail</th>
              </tr>
            </thead>
            <tbody>
              {judgeName === "" && judgeLastName === ""
                ? judges.map((judge) => {
                    return (
                      <tr key={judge.jmbg}>
                        <td>{judge.ime}</td>
                        <td>{judge.prezime}</td>
                        <td>{judge.mail}</td>
                        <td>{judge.sud?.naziv}</td>
                        <td>
                          <Link
                            className="btn btn-outline-light"
                            to={`/sudija/${judge?.jmbg}`}
                          >
                            Show
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                : filteredJudges.map((judge) => {
                    return (
                      <tr key={judge.jmbg}>
                        <td>{judge.ime}</td>
                        <td>{judge.prezime}</td>
                        <td>{judge.mail}</td>
                        <td>{judge.sud?.naziv}</td>
                        <td>
                          <Link
                            className="btn btn-outline-light"
                            to={`/sudija/${judge?.jmbg}`}
                          >
                            Show
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </Table>
        </>
      </div>
    </div>
  );
}

export default CourtPage;
