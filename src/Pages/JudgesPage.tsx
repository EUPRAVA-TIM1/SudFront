import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllJudges } from "../Services/JudgeService.ts";
import { Sudija, Sud } from "../Data/interfaces.ts";
import { getAllCourts } from "../Services/CourtService.ts";

function JudgesPage() {
  const [courtId, setCourtId] = useState("");
  const [judgeName, setJudgeName] = useState("");
  const [judgeLastName, setJudgeLastName] = useState("");
  var [filteredJudges, setFilteredJudges] = useState<Sudija[]>([]);
  const [judges, setJudges] = useState<Sudija[]>([]);
  const [courts, setCourts] = useState<Sud[]>([]);

  useEffect(() => {
    getAllJudges()
      .then((res) => {
        setJudges(res);
      })
      .catch((err) => console.log(err));
    getAllCourts()
      .then((res) => {
        setCourts(res);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    filterJudges();
  }, [judgeName, judgeLastName, courtId]);

  function filterJudges() {
    var judgess = judges;
    setFilteredJudges(judgess);

    if (judgeName !== "") {
      setFilteredJudges(
        judges.filter((judge) => judge.ime.includes(judgeName))
      );
    }

    if (judgeName !== "" && judgeLastName !== "") {
      setFilteredJudges(
        filteredJudges.filter((judge) => judge.prezime.includes(judgeLastName))
      );
    } else if (judgeName === "" && judgeLastName !== "") {
      console.log("izmena");
      setFilteredJudges(
        judges.filter((judge) => judge.prezime.includes(judgeLastName))
      );
    }

    if (courtId !== "") {
      if (judgeName !== "" || judgeLastName !== "") {
        console.log("calles");
        setFilteredJudges(
          filteredJudges.filter((judge) => judge.sudId.match(courtId))
        );
      } else {
        setFilteredJudges(judges.filter((judge) => judge.sudId.match(courtId)));
      }
    }
  }

  const handleJudgesChange = (e) => {
    setCourtId(e.target.value);
  };

  function showJudge(jmbg: string) {
    console.log(jmbg);
  }

  return (
    <>
      <h3>Pretraga sudija</h3>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Ime</Form.Label>
        <Form.Control
          onChange={(e) => setJudgeName(e.target.value)}
          type="text"
          placeholder="Unesite ime za pretragu"
        />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>Prezime</Form.Label>
        <Form.Control
          onChange={(e) => setJudgeLastName(e.target.value)}
          type="text"
          placeholder="Unesite ime za pretragu"
        />
        <Form.Text
          onChange={handleJudgesChange}
          className="text-muted"
        ></Form.Text>
      </Form.Group>
      <label>
        Izaberi sud:
        <Form.Select value={courtId} onChange={handleJudgesChange}>
          <option value="">All</option>
          {courts.map((court) => (
            <option key={court.sudId} value={court.sudId}>
              {court.naziv}
            </option>
          ))}
        </Form.Select>
      </label>
      <Table striped>
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Opstina</th>
            <th>Mail</th>
          </tr>
        </thead>
        <tbody>
          {judgeName === "" && judgeLastName === "" && courtId === ""
            ? judges.map((judge) => {
                return (
                  <tr key={judge.jmbg}>
                    <td>{judge.ime}</td>
                    <td>{judge.prezime}</td>
                    <td>{judge.mail}</td>
                    <td>{judge.sud?.naziv}</td>
                    <td>
                      <Link
                        className="btn btn-outline-success"
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
                        className="btn btn-outline-success"
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
  );
}

export default JudgesPage;
