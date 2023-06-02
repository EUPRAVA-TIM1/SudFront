import React, { useEffect, useState } from "react";
import HearingListComponent from "../Components/HearingListComponent.tsx";
import { Rociste } from "../Data/interfaces.ts";
import { getHearingsByUser } from "../Services/HearingService.ts";

const CitizensHearingsPage = () => {
  const [hearings, setHearings] = useState<Rociste>([]);
  useEffect(() => {
    getHearingsByUser()
      .then((res) => {
        setHearings(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <h3>Pretraga rocista</h3>
      <HearingListComponent hearings={hearings}></HearingListComponent>
    </>
  );
};

export default CitizensHearingsPage;
