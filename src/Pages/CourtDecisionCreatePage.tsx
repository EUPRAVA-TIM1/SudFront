import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Rociste, OpisiKrivica } from "../Data/interfaces.ts";
import { getHearingById } from "../Services/HearingService.ts";
import { postDecision } from "../Services/CourtDecisionService.ts";

function CourtDecisionCreatePage() {
  const [hearing, setHearing] = useState<Rociste>();
  const [hearingDate, setHearingDate] = useState();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const { hearingId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getHearingById(hearingId)
      .then((res) => {
        setHearing(res);
        var date = new Date(res.datumRocista);
        setHearingDate(date.toLocaleDateString());
      })
      .catch((err) => console.log(err));
  }, [hearingId]);

  const onSubmit = () => {
    const dto = {
      Resenje: getValues("resenje"),
      Status: Number(getValues("status")),
      RocisteId: hearing.rocisteId,
      OduzimanjeVozacke: getValues("oduzimanjeVozacke"),
      OduzimanjeBodova: Number(getValues("oduzimanjeBodova")),
      NovcanaKazna: Number(getValues("novcanaKazna")),
    };

    postDecision(dto)
      .then((res) => {
        navigate("/predmet/" + res.predmetId);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1 className="mb-5">Zakazi rociste za sudski predmet:</h1>
      <ul className="list-group list-group-flush fs-4">
        <li className="list-group-item">
          <strong>Sudski predmet:</strong> {hearing?.predmet?.naslov}
          <br></br>
          <strong>Prekrsaj:</strong>{" "}
          {OpisiKrivica[hearing?.predmet?.prekrsajnaPrijava?.prekrsaj]}
        </li>
        <li className="list-group-item">
          <strong>Opis predmeta:</strong> {hearing?.predmet?.opis} <br></br>
          <strong>Optuzeni jmbg:</strong> {hearing?.optuzeniJmbg}
          <br></br>
          <strong>Advokat jmbg:</strong> {hearing?.advokatJmbg}
          <br></br>
          <strong>Datum rocista:</strong> {hearingDate}
        </li>
      </ul>
      <hr></hr>
      <form>
        {errors.resenje && (
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
            Resenje sudske odluke:
          </label>
          <input
            type="text"
            className="form-control mb-4 border-primary-subtle"
            {...register("resenje", { required: true, maxLength: 100 })}
          />
        </div>

        {errors.status && (
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
            Status sudske odluke:
          </label>
          <select
            {...register("status", { required: true })}
            className="form-control mb-4 border-primary-subtle"
          >
            <option value="">Izaberi status</option>
            <option value="0">Aktivan</option>
            <option value="1">Prihvacen</option>
            <option value="2">Odbijen</option>
            <option value="3">Arhiva</option>
          </select>
        </div>

        {errors.oduzimanjeVozacke && (
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
            Oduzimanje vozacke:
          </label>
          <input
            type="checkbox"
            {...register("oduzimanjeVozacke")}
            style={{ width: "30px", marginLeft: "5%" }}
          />
        </div>

        {errors.oduzimanjeBodova && (
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
            Oduzimanje bodova:
          </label>
          <input
            type="number"
            defaultValue={0}
            className="form-control mb-4 border-primary-subtle"
            {...register("oduzimanjeBodova")}
          />
        </div>

        {errors.novcanaKazna && (
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
            Novcana kazna:
          </label>
          <input
            type="number"
            defaultValue={0}
            className="form-control mb-4 border-primary-subtle"
            {...register("novcanaKazna")}
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

export default CourtDecisionCreatePage;
