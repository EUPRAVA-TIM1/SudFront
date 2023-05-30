import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Predmet } from "../Data/interfaces.ts";
import { getCaseById } from "../Services/CaseService.ts";

const CasePage = () => {
  const { predmetId } = useParams();
  const [courtCase, setCourtCase] = useState<Predmet>();
  useEffect(() => {
    getCaseById(predmetId).then((res) => {
      setCourtCase(res);
    });
  });
  return <div>CasePage - {courtCase?.predmetId}</div>;
};

export default CasePage;
