import axios from "axios";
import { backend_url, courtStorageKey } from "../Data/data.ts";

const url = backend_url + "sudija";

export function getAllJudges() {
  return axios
    .get(url, {
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
