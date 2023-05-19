import React from "react";
import { useNavigate } from "react-router-dom";
import { ComponentCardProps } from "../Data/interfaces";

function ComponentCard({ component }: ComponentCardProps) {
  const navigate = useNavigate();
  const redirect = () => {
    navigate(component.url);
  };
  return (
    <div className="card text-center mb-3  h-100 text-bg-secondary p-3">
      <div className="card-body">
        <h3 className="card-title">{component.title}</h3>
        <p className="card-text">{component.desc}</p>
      </div>
      <button className="btn btn-success btn-lg" onClick={redirect}>
        Pređi na stranicu
      </button>
    </div>
  );
}

export default ComponentCard;
