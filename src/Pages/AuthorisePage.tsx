import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { storageKey } from "../Data/data.ts";

function AuthorisePage() {
  const params = useParams();
  const jwt = params.jwt;
  console.log("JWT:", jwt);
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt && jwt != undefined) {
      localStorage.setItem(storageKey, jwt);
      navigate("/Home");
    } else {
      window.location.replace("http://localhost:3000");
    }
  }, [jwt]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "85vh" }}
    >
      <div
        className="spinner-border text-info mx-4"
        style={{ height: "150px", width: "150px" }}
      ></div>
      <h1 className="text-info text-lg ">Redirectiing...</h1>
    </div>
  );
}

export default AuthorisePage;
