import axios from "axios";
import { saobracajna_url, storageKey, mup_url } from "../Data/data.ts";

export function updateTrafficUnitData(dto, prekrsajId) {
  return axios
    .put(saobracajna_url + prekrsajId, dto, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(storageKey),
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function updateMupData(dto, userJmbg) {
  return axios
    .put(mup_url + userJmbg, dto, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(storageKey),
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
