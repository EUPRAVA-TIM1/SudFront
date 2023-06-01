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

export function getHearingById(hearingId: string) {
  return axios
    .get(url + "/" + hearingId, {
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

export function putHearing(dto) {
  return axios
    .put(url, dto, {
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

export function getHearingsByJudge() {
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

export function getHearingsByUser() {
  return (
    axios
      // .get(url + "/gradjanin/" + localStorage.getItem(userJmbg), {
      .get(url + "/gradjanin/2012995175033", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem(courtStorageKey),
        },
      })
      .then((res) => {
        return res.data.$values;
      })
      .catch((err) => {
        console.log(err);
      })
  );
}

export function getHearingsByLawyer() {
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
