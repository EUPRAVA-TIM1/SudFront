import axios from "axios";
import { backend_url, courtStorageKey } from "../Data/data.ts";

const url = backend_url + "opstina";

export function getAllMunicipalities() {
  return axios
    .get(url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(courtStorageKey),
      },
    })
    .then((res) => {
      return res.data.result.$values;
    })
    .catch((err) => {
      console.log(err);
    });
}
