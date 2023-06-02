import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DecisionsListComponent from "../Components/DecisionsListComponent.tsx";
import { OdlukaSudije } from "../Data/interfaces.ts";
import { getDecisionByUser } from "../Services/CourtDecisionService.ts";

const CitizensDecisionsPage = () => {
  const [decisions, setDecisions] = useState<OdlukaSudije[]>([]);
  useEffect(() => {
    getDecisionByUser().then((res) => {
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

export default CitizensDecisionsPage;
