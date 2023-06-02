import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DecisionsListComponent from "../Components/DecisionsListComponent.tsx";
import { OdlukaSudije } from "../Data/interfaces.ts";
import { getDecisionByLawyer } from "../Services/CourtDecisionService.ts";

const LawyersDecisionsPage = () => {
  const [decisions, setDecisions] = useState<OdlukaSudije[]>([]);
  useEffect(() => {
    getDecisionByLawyer().then((res) => {
      setDecisions(res);
    });
  }, []);
  return (
    <>
      <h3>Pretraga sudskih odluka</h3>
      <DecisionsListComponent decisions={decisions}></DecisionsListComponent>
    </>
  );
};

export default LawyersDecisionsPage;
