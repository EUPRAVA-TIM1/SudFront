import React, { useEffect, useState } from "react";
import HearingListComponent from "../Components/HearingListComponent.tsx";
import { Rociste } from "../Data/interfaces.ts";
import { getHearingsByLawyer } from "../Services/HearingService.ts";

const LawyersHearingsPage = () => {
  const [hearings, setHearings] = useState<Rociste>([]);
  useEffect(() => {
    getHearingsByLawyer()
      .then((res) => {
        setHearings(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <h3>Pretraga rocista klijenata</h3>
      <HearingListComponent hearings={hearings}></HearingListComponent>
    </>
  );
};

export default LawyersHearingsPage;
