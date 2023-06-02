
import React, { useEffect, useState } from "react";
import ComponentCard from "../Components/ComponentCard.tsx";
import { allComponents, judgeComponents, isSudija } from "../Data/data.ts";

function HomePage() {
  const [isJudge, setIsJudge] = useState(false);
  const [judgeMode, setJudgeMode] = useState(false);

  useEffect(() => {
    setIsJudge(localStorage.getItem(isSudija) === "True");
  }, []);

  return (
    <>
      {(!isJudge || (isJudge && !judgeMode)) && (
        <>
          {isJudge && (
            <button
              className="btn btn-success  btn-lg ml-auto mb-5"
              onClick={() => setJudgeMode(true)}
            >
              Pogledaj opcije za sudiju
            </button>
          )}
          <div className="row row-cols-2 g-4">
            {allComponents.map((component) => {
              return (
                <div className="col" key={component.title}>
                  <ComponentCard component={component}></ComponentCard>
                </div>
              );
            })}
          </div>
        </>
      )}
      {isJudge && judgeMode && (
        <>
          <button
            className="btn btn-success  btn-lg ml-auto mb-5"
            onClick={() => setJudgeMode(false)}
          >
            Pogledaj opcije za gradjanina
          </button>
          <div className="row row-cols-2 g-4">
            {judgeComponents.map((component) => {
              return (
                <div className="col" key={component.title}>
                  <ComponentCard component={component}></ComponentCard>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default HomePage;
