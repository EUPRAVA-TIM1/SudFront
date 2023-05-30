import axios from "axios";
import { backend_url, courtStorageKey, userJmbg } from "../Data/data.ts";

const url = backend_url + "rociste";

export function getHearingsByCase(caseId: string) {
  return axios
    .get(url + "/predmet/" + caseId, {
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

export function postHearing(dto) {
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
