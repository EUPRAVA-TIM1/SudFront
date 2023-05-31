import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { Predmet, OpisiKrivica } from "../Data/interfaces.ts";
import { getCaseById } from "../Services/CaseService.ts";
import { postHearing } from "../Services/HearingService.ts";

function HearingCreatePage() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const { caseId } = useParams();
  const [courtCase, setCourtCase] = useState<Predmet>();
  const [caseDate, setCaseDate] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    getCaseById(caseId)
      .then((res) => {
        setCourtCase(res);

        var date = new Date(res.datum);
        setCaseDate(date.toLocaleDateString());
      })
      .catch((err) => console.log(err));
  }, [caseId]);

  const onSubmit = () => {
    const dto = {
      DatumRocista: getValues("datum"),
      PredmetId: courtCase.predmetId,
      AdvokatJmbg: courtCase.advokatJmbg,
    };
    postHearing(dto)
      .then((res) => {
        navigate("/rociste/" + res.rocisteId);
      })
      .catch((err) => console.log(err));
  };

  const currentDate = new Date();
  const minDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split(".")[0];

  return (
    <>
      <h1 className="mb-5">Zakazi rociste za sudski predmet:</h1>
      <ul className="list-group list-group-flush fs-4">
        <li className="list-group-item">
          <strong>Sudski predmet:</strong> {courtCase?.naslov}
          <br></br>
          <strong>Prekrsaj:</strong>{" "}
          {OpisiKrivica[courtCase?.prekrsajnaPrijava?.prekrsaj]}
        </li>
        <li className="list-group-item">
          <strong>Opis predmeta:</strong> {courtCase?.opis} <br></br>
          <strong>Optuzeni jmbg:</strong> {courtCase?.optuzeniJmbg}
          <br></br>
          <strong>Advokat jmbg:</strong> {courtCase?.advokatJmbg}
          <br></br>
          <strong>Datum kreiranja predmeta:</strong> {caseDate}
        </li>
      </ul>
      <hr></hr>
      <form>
        {errors.datum && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <p className="fs-5">
              Morate uneti datum (datum rocista mora biti najmanje 7 dana posle
              trenutka zakazivanja)
            </p>
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
            Izaberite datum rocista:
          </label>
          <input
            type="datetime-local"
            className="form-control mb-4 border-primary-subtle"
            {...register("datum", { required: true, min: minDate })}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-lg"
          style={{ minWidth: "50%", marginLeft: "25%" }}
          onClick={handleSubmit(onSubmit)}
        >
          Kreiraj
        </button>
      </form>
    </>
  );
}

export default HearingCreatePage;
