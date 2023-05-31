import React, { useEffect, useState } from "react";
import HearingListComponent from "../Components/HearingListComponent.tsx";
import { Rociste } from "../Data/interfaces.ts";
import {
  getHearingsByJudge,
  getHearingsByUser,
} from "../Services/HearingService.ts";

function JudgeHearingsPage() {
  const [hearings, setHearings] = useState<Rociste>([]);
  useEffect(() => {
    getHearingsByUser()
      .then((res) => {
        console.log(res);
        setHearings(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <h3>Pretraga sudskih rocista</h3>
      <HearingListComponent hearings={hearings}></HearingListComponent>
    </>
  );
}

export default JudgeHearingsPage;
