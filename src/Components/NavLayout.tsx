import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../Images/Grb.png";
import axios from "axios";
import jwt from "jwt-decode";
import {
  backend_url,
  courtStorageKey,
  base_url,
  storageKey,
  isSudija,
  userJmbg,
} from "../Data/data.ts";
import jwtDecode from "jwt-decode";

function NavLayout({ body }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    var courtJwt = localStorage.getItem(courtStorageKey);
    if (courtJwt === null) {
      axios
        .get(backend_url + "authorise/" + localStorage.getItem(storageKey))
        .then((res) => {
          localStorage.setItem(courtStorageKey, res.data);
          var jwt = jwtDecode(res.data);
          localStorage.setItem(isSudija, jwt.isSudija);
          localStorage.setItem(userJmbg, jwt.Jmbg);
        })
        .catch((err) => {
          navigate("/Home");
        });
    }
  }, [location]);

  const home = () => {
    navigate("/Home");
  };

  const logOut = () => {
    localStorage.removeItem(storageKey);
    localStorage.removeItem(courtStorageKey);
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
