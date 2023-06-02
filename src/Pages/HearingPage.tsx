import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Rociste } from "../Data/interfaces.ts";
import { Button } from "react-bootstrap";
import { userJmbg } from "../Data/data.ts";
import { getHearingById, putHearing } from "../Services/HearingService.ts";
import { useForm } from "react-hook-form";
import { getDecisionByHearing } from "../Services/CourtDecisionService.ts";

function HearingPage() {
  const { hearingId } = useParams();
  const [isEditable, setIsEditable] = useState(false);
  const [hearing, setHearing] = useState<Rociste>();
  const [hearingDate, setHearingDate] = useState();
  const [isJudgeSigned, setIsJudgeSigned] = useState(false);
  const [decisionExist, setDecisionExist] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const currentDate = new Date();
  const minDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split(".")[0];
  const navigate = useNavigate();

  const onSubmit = () => {
    const dto = {
      rocisteId: hearing.rocisteId,
      DatumRocista: getValues("datum"),
      optuzeniJmbg: hearing.optuzeniJmbg,
      sudijaJmbg: localStorage.getItem(userJmbg),
      sudId: hearing.sudId,
      PredmetId: hearing.predmet.predmetId,
      AdvokatJmbg: hearing.predmet.advokatJmbg,
      ishodRocista: Number(getValues("ishodRocista")),
    };

    putHearing(dto)
      .then((res) => {
        navigate("/rociste/" + res.rocisteId);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getHearingById(hearingId)
      .then((res) => {
        setHearing(res);
        setIsJudgeSigned(localStorage.getItem(userJmbg) === res.sudijaJmbg);
        var date = new Date(res.datumRocista);
        setHearingDate(date.toLocaleDateString());
      })
      .catch((err) => console.log(err));

    getDecisionByHearing(hearingId)
      .then((res) => setDecisionExist(res !== ""))
      .catch((err) => console.log(err));
  }, [hearingId]);

  return isEditable ? (
    <>
      <h1 className="mb-5">Izmeni rociste za sudski predmet:</h1>
      <ul className="list-group list-group-flush fs-4">
        <li className="list-group-item">
          <strong>Sudski predmet:</strong> {hearing?.predmet?.naslov}
        </li>
        <li className="list-group-item">
          <strong>Opis predmeta:</strong> {hearing?.predmet?.opis} <br></br>
          <strong>Optuzeni jmbg:</strong> {hearing?.optuzeniJmbg}
          <br></br>
          <strong>Advokat jmbg:</strong> {hearing?.advokatJmbg}
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
            defaultValue={hearing.datumRocista}
          />
        </div>

        {errors.ishodRocista && (
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
            Status rocista:
          </label>
          <select
            {...register("ishodRocista", { required: true })}
            className="form-control mb-4 border-primary-subtle"
            defaultValue={hearing.ishodRocista}
          >
            <option value="">Izaberi status</option>
            <option value="0">Zakazano</option>
            <option value="1">Odlozeno</option>
            <option value="2">Zavrseno</option>
            <option value="3">Arhiva</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-outline-success btn-lg"
          style={{ minWidth: "50%", marginLeft: "25%" }}
          onClick={handleSubmit(onSubmit)}
        >
          Sacuvaj
        </button>
      </form>
      <Button
        style={{ margin: "5px" }}
        className="btn btn-success"
        onClick={() => setIsEditable(!isEditable)}
      >
        {isEditable ? "Otkazi izmenu" : "Izmena rocista"}
      </Button>
    </>
  ) : (
    <>
      <div className="d-flex justify-content-center row  ">
        <div className="card text-bg-success mb-4">
          <div className="card-header">
            <h3>{hearing?.naslov}</h3>
            <h4>
              {hearingDate} - {hearing?.predmet?.naslov}
            </h4>
          </div>
          <div className="card-body">
            <h5 className="card-title">Opis: {hearing?.predmet?.opis}</h5>
            <h5 className="card-title">
              Optuzeni jmbg: {hearing?.optuzeniJmbg}
            </h5>
            <h5 className="card-title">
              Advokat (jmbg): {hearing?.advokatJmbg}
            </h5>
            <h5 className="card-title">
              Sudija: {hearing?.predmet?.sudija?.ime}{" "}
              {hearing?.predmet?.sudija?.prezime}
            </h5>
          </div>
        </div>
        <div className="d-flex  col-4 ">
          {isJudgeSigned && !decisionExist ? (
            <>
              <Button
                style={{ margin: "5px" }}
                className="btn btn-success"
                onClick={() => setIsEditable(!isEditable)}
              >
                {isEditable ? "Otkazi izmenu" : "Izmena rocista"}
              </Button>

              <Link
                style={{ margin: "5px" }}
                to={`/odlukasudije/create/${hearing?.rocisteId}`}
                className="btn btn-outline-success"
              >
                Kreiranje sudske odluke
              </Link>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default HearingPage;
