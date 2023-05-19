import React, { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { Sud } from "../Data/interfaces";

function CourtsPage() {
  const [opstinaName, setOpstinaName] = useState("");
  const [filteredCourts, setFilteredCourts] = useState<Sud[]>([]);
  const [courts, setCourts] = useState<Sud[]>([
    {
      SudId: "123",
      Naziv: "Prvi Sud",
      Opstina: { OpstinaId: "123", Naziv: "Novi Sad", PTT: 2100 },
      OpstinaId: "123",
    },
    {
      SudId: "234",
      Naziv: "Drugi Sud",
      Opstina: { OpstinaId: "123", Naziv: "Novi Sad", PTT: 2100 },
      OpstinaId: "123",
    },
    {
      SudId: "345",
      Naziv: "Treci Sud",
      Opstina: { OpstinaId: "123", Naziv: "Beograd", PTT: 2100 },
      OpstinaId: "123",
    },
  ]);

  function showCourt(courtId: string) {
    console.log(courtId);
  }

  useEffect(() => {
    filterCourtsByOpstinaName();
  }, [opstinaName]);

  const filterCourtsByOpstinaName = () => {
    const filtered = courts.filter((court) =>
      court.Opstina.Naziv.match(opstinaName)
    );
    setFilteredCourts(filtered);
  };

  const handleOpstinaChange = (e) => {
    setOpstinaName(e.target.value);
  };

  return (
    <>
      <h3>Pretraga sudova</h3>
      <label>
        Izaberi opstinu:
        <Form.Select value={opstinaName} onChange={handleOpstinaChange}>
          <option value="">All</option>
          <option value="Novi Sad">Novi Sad</option>
          <option value="Beograd">Beograd</option>
          <option value="Nis">Nis</option>
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
          {opstinaName == ""
            ? courts.map((court) => {
                return (
                  <tr key={court.SudId}>
                    <td>{court.Naziv}</td>
                    <td>{court.Opstina.Naziv}</td>
                    <td>
                      <Button
                        variant="outline-success"
                        onClick={() => showCourt(court.SudId)}
                      >
                        Show
                      </Button>
                    </td>
                  </tr>
                );
              })
            : filteredCourts.map((court) => {
                return (
                  <tr key={court.SudId}>
                    <td>{court.Naziv}</td>
                    <td>{court.Opstina.Naziv}</td>
                    <td>
                      <Button
                        variant="outline-success"
                        onClick={() => showCourt(court.SudId)}
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

export default CourtsPage;
