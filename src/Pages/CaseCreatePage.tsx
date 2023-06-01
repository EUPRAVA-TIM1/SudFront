import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PrekrsajnaPrijava, OpisiKrivica } from "../Data/interfaces.ts";
import { getReportById } from "../Services/ReportService.ts";
import { useForm } from "react-hook-form";
import { postCase } from "../Services/CaseService.ts";

function CaseCreatePage() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [reportDate, setReportDate] = useState();
  const { reportId } = useParams();
  const [report, setReport] = useState<PrekrsajnaPrijava>();
  const navigate = useNavigate();
  useEffect(() => {
    getReportById(reportId)
      .then((res) => {
        setReport(res);
        var date = new Date(res.datum);
        setReportDate(date.toLocaleDateString());
      })
      .catch((err) => console.log(err));
  }, [reportId]);

  const onSubmit = () => {
    const dto = {
      Naslov: getValues("naslov"),
      Opis: getValues("opis"),
      advokatJmbg: getValues("advokatJmbg"),
      prekrsajnaPrijavaId: report.prekrsajnaPrijavaId,
    };

    postCase(dto)
      .then((res) => {
        navigate("/predmet/" + res.predmetId);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1 className="mb-5">Kreiraj sudski predmet:</h1>
      <ul className="list-group list-group-flush fs-4">
        <li className="list-group-item">
          <strong>Datum:</strong> {reportDate} <br></br>
          <strong>Optuzeni:</strong> {report?.jmbgOptuzenog}
          <br></br>
          <strong>Prekrsaj:</strong> {OpisiKrivica[report?.prekrsaj]}
        </li>
        <li className="list-group-item">
          <strong>Izdato od:</strong> {report?.jmbgSluzbenika} <br></br>
          <strong>Komentar:</strong> {report?.komentar}
        </li>
      </ul>
      <hr></hr>
      <form>
        {errors.naslov && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <p className="fs-5">Morate uneti ovo polje</p>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        )}
        <div className="form-group">
          <label className="fs-4 mb-2" htmlFor="opis">
            Unesite naslov:
          </label>
          <input
            type="text"
            className="form-control mb-4 border-primary-subtle"
            {...register("naslov", { required: true, maxLength: 100 })}
          />
        </div>
        {errors.opis && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <p className="fs-5">Morate uneti ovo polje</p>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        )}
        <div className="form-group">
          <label className="fs-4 mb-2" htmlFor="opis">
            Unesite opis:
          </label>
          <input
            type="text"
            className="form-control mb-4 border-primary-subtle"
            {...register("opis", { required: true, maxLength: 300 })}
          />
        </div>
        <div className="form-group">
          <label className="fs-4 mb-2" htmlFor="opis">
            Unesite JMBG advokata:
          </label>
          <input
            type="text"
            className="form-control mb-4 border-primary-subtle"
            {...register("advokatJmbg", { required: false, maxLength: 15 })}
          />
        </div>
        <button
          type="submit"
          className="btn btn-outline-success btn-lg"
          style={{ minWidth: "50%", marginLeft: "25%" }}
          onClick={handleSubmit(onSubmit)}
        >
          Kreiraj
        </button>
      </form>
    </>
  );
}

export default CaseCreatePage;
