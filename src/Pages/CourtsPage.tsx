import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Form } from "react-bootstrap";
import { Opstina, Sud } from "../Data/interfaces.ts";
import { getAllCourts } from "../Services/CourtService.ts";
import { getAllMunicipalities } from "../Services/MunicipalityService.ts";

function CourtsPage() {
  const [opstinaName, setOpstinaName] = useState("");
  const [filteredCourts, setFilteredCourts] = useState<Sud[]>([]);
  const [courts, setCourts] = useState<Sud[]>([]);
  const [municipalities, setMunicipalities] = useState<Opstina[]>([]);

  useEffect(() => {
    getAllCourts()
      .then((res) => {
        setCourts(res);
      })
      .catch((err) => console.log(err));
    getAllMunicipalities()
      .then((res) => {
        setMunicipalities(res);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    filterCourtsByOpstinaName();
  }, [opstinaName]);

  const filterCourtsByOpstinaName = () => {
    const filtered = courts.filter((court) =>
      court.opstina.opstinaId.match(opstinaName)
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
          {municipalities.map((mun) => (
            <option key={mun.opstinaId} value={mun.opstinaId}>
              {mun.naziv}
            </option>
          ))}
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
          {opstinaName === ""
            ? courts.map((court) => {
                return (
                  <tr key={court.sudId}>
                    <td>{court.naziv}</td>
                    <td>{court.opstina.naziv}</td>
                    <td>
                      <Link
                        className="btn btn-outline-success"
                        to={`/sud/${court.sudId}`}
                      >
                        Show
                      </Link>
                    </td>
                  </tr>
                );
              })
            : filteredCourts.map((court) => {
                return (
                  <tr key={court.sudId}>
                    <td>{court.naziv}</td>
                    <td>{court.opstina.naziv}</td>
                    <td>
                      <Link className="outline-success" to={`/${court.sudId}`}>
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

export default CourtsPage;
