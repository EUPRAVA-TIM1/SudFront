import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Sudija } from "../Data/interfaces.ts";
import { getJudgeByJmbg } from "../Services/JudgeService.ts";

function JudgePage() {
  const { sudijaJmbg } = useParams();
  const [judge, setJudge] = useState<Sudija>();
  useEffect(() => {
    getJudgeByJmbg(sudijaJmbg)
      .then((res) => {
        setJudge(res);
      })
      .catch((err) => console.log(err));
  }, [sudijaJmbg]);
  return (
    <div className="d-flex justify-content-center row  ">
      <div className="card text-bg-success mb-4">
        <div className="card-header">
          <h5>
            {judge?.ime} {judge?.prezime}
          </h5>
        </div>
        <div className="card-body">
          {judge?.sud != null ? (
            <h5 className="card-title">Sud: {judge?.sud?.naziv}</h5>
          ) : (
            ""
          )}
          <h5 className="card-title">Jmbg: {judge?.jmbg}</h5>
          <h5 className="card-title">
            Opstina: {judge?.opstina?.ptt},{judge?.opstina?.naziv}
          </h5>
          <h5 className="card-title">Mail: {judge?.mail}</h5>
        </div>
      </div>
    </div>
  );
}

export default JudgePage;
