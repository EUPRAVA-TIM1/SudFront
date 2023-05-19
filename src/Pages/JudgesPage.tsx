import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { Sudija } from "../Data/interfaces";

function JudgesPage() {
  const [courtId, setCourtId] = useState("");
  const [judgeName, setJudgeName] = useState("");
  const [judgeLastName, setJudgeLastName] = useState("");
  var [filteredJudges, setFilteredJudges] = useState<Sudija[]>([]);
  const [judges, setJudges] = useState<Sudija[]>([
    {
      Adresa: "Prvi Sudija",
      Broj: "1323123",
      Ime: "Marko",
      Jmbg: "1",
      Mail: "marko@gmail.com",
      OpstinaId: "12312",
      Opstina: { OpstinaId: "123", Naziv: "Novi Sad", PTT: 2100 },
      Prezime: "Markovic",
      SudId: "123",
      Sud: {
        SudId: "123",
        Naziv: "Prvi Sud",
        Opstina: { OpstinaId: "123", Naziv: "Novi Sad", PTT: 2100 },
        OpstinaId: "123",
      },
    },
    {
      Adresa: "Drugi Sudija",
      Broj: "1323123",
      Ime: "Petar",
      Jmbg: "2",
      Mail: "marko@gmail.com",
      OpstinaId: "12312",
      Opstina: { OpstinaId: "123", Naziv: "Novi Sad", PTT: 2100 },
      Prezime: "Petrovic",
      SudId: "123",
      Sud: {
        SudId: "123",
        Naziv: "Prvi Sud",
        Opstina: { OpstinaId: "123", Naziv: "Novi Sad", PTT: 2100 },
        OpstinaId: "123",
      },
    },
    {
      Adresa: "Treci Sudija",
      Broj: "1323123",
      Ime: "Milos",
      Jmbg: "3",
      Mail: "marko@gmail.com",
      OpstinaId: "12312",
      Opstina: { OpstinaId: "234", Naziv: "Novi Sad", PTT: 2100 },
      Prezime: "Milosevic",
      SudId: "234",
      Sud: {
        SudId: "123",
        Naziv: "Drugi Sud",
        Opstina: { OpstinaId: "234", Naziv: "Novi Sad", PTT: 2100 },
        OpstinaId: "123",
      },
    },
  ]);

  useEffect(() => {
    filterJudges();
  }, [judgeName, judgeLastName, courtId]);

  function filterJudges() {
    console.log("judges" + judges);
    var judgess = judges;
    setFilteredJudges(judgess);
    console.log("filtered" + filteredJudges);

    if (judgeName !== "") {
      setFilteredJudges(
        judges.filter((judge) => judge.Ime.includes(judgeName))
      );
    }

    if (judgeName !== "" && judgeLastName != "") {
      setFilteredJudges(
        filteredJudges.filter((judge) => judge.Prezime.includes(judgeLastName))
      );
    } else if (judgeName === "" && judgeLastName !== "") {
      console.log("izmena");
      setFilteredJudges(
        judges.filter((judge) => judge.Prezime.includes(judgeLastName))
      );
    }

    if (courtId !== "") {
      if (judgeName !== "" || judgeLastName !== "") {
        console.log("calles");
        setFilteredJudges(
          filteredJudges.filter((judge) => judge.SudId.match(courtId))
        );
      } else {
        setFilteredJudges(judges.filter((judge) => judge.SudId.match(courtId)));
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
          <option value="123">Prvi Sud</option>
          <option value="234">Drugi Sud</option>
          <option value="345">Treci Sud</option>
          {/* Add options for available Opstina names */}
        </Form.Select>
      </label>
      <Table striped>
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Opstina</th>
          </tr>
        </thead>
        <tbody>
          {judgeName === "" && judgeLastName === "" && courtId === ""
            ? judges.map((judge) => {
                return (
                  <tr key={judge.Jmbg}>
                    <td>{judge.Ime}</td>
                    <td>{judge.Prezime}</td>
                    <td>{judge.Mail}</td>
                    <td>{judge.Sud?.Naziv}</td>
                    <td>
                      <Button
                        variant="outline-success"
                        onClick={() => showJudge(judge.Jmbg)}
                      >
                        Show
                      </Button>
                    </td>
                  </tr>
                );
              })
            : filteredJudges.map((judge) => {
                return (
                  <tr key={judge.Jmbg}>
                    <td>{judge.Ime}</td>
                    <td>{judge.Prezime}</td>
                    <td>{judge.Mail}</td>
                    <td>{judge.Sud?.Naziv}</td>
                    <td>
                      <Button
                        variant="outline-success"
                        onClick={() => showJudge(judge.Jmbg)}
                      >
                        Show
                      </Button>
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
