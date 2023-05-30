import axios from "axios";
import { backend_url, courtStorageKey, userJmbg } from "../Data/data.ts";

const url = backend_url + "prekrsajnaprijava";

export function getAllReportsByJudge() {
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

export function getReportById(reportId: string) {
  return axios
    .get(url + "/" + reportId, {
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
