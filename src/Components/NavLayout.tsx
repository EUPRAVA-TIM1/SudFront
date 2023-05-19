import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { base_url, storageKey } from "../Data/data.ts";
import logo from "../Images/Grb.png";

function NavLayout({ body }) {
  const location = useLocation();
  const navigate = useNavigate();

  const home = () => {
    navigate("/Home");
  };

  const logOut = () => {
    localStorage.removeItem(storageKey);
    window.location.replace(base_url);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-success mb-4">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center" onClick={home}>
            <img
              src={logo}
              className="img-fluid"
              style={{ maxHeight: "12vh" }}
            ></img>
            <h3 className="text-light">Portal pravosudja Srbije</h3>
          </div>
          <button className="btn btn-light  btn-lg ml-auto" onClick={logOut}>
            Izlogujte se
          </button>
        </div>
      </nav>
      <section className="bg-body-color h-max container">{body}</section>
    </>
  );
}

export default NavLayout;
