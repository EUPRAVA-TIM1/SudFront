import axios from "axios";
import { backend_url, courtStorageKey, userJmbg } from "../Data/data.ts";

const url = backend_url + "odlukasudije";

export function postDecision(dto) {
  return axios
    .post(url, dto, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(courtStorageKey),
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
