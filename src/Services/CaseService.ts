import axios from "axios";
import { backend_url, courtStorageKey, userJmbg } from "../Data/data.ts";

const url = backend_url + "predmet";

export function getCaseByReport(reportId: string) {
  return axios
    .get(url + "/prijava/" + reportId, {
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

export function getCaseById(caseId: string) {
  return axios
    .get(url + "/" + caseId, {
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

export function getCaseByJudgeJmbg() {
  return axios
    .get(url + "/sudija/" + localStorage.getItem(userJmbg), {
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

export function postCase(dto) {
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
