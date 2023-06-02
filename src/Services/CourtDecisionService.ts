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

export function getDecisionByHearing(hearingId: string) {
  return axios
    .get(url + "/rociste/" + hearingId, {
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

export function getDecisionByJudge() {
  return axios
    .get(url + "/sudija/" + localStorage.getItem(userJmbg), {
      // .get(url + "/sudija/1234567890123", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(courtStorageKey),
      },
    })
    .then((res) => {
      return res.data.$values;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getDecisionByUser() {
  return axios
    .get(url + "/optuzeni/" + localStorage.getItem(userJmbg), {
      // .get(url + "/optuzeni/2012995175033", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(courtStorageKey),
      },
    })
    .then((res) => {
      return res.data.$values;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getDecisionByLawyer() {
  return axios
    .get(url + "/advokat/" + localStorage.getItem(userJmbg), {
      // .get(url + "/advokat/123123", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(courtStorageKey),
      },
    })
    .then((res) => {
      return res.data.$values;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getDecisionByJudgeSearch(judgeJmbg, violation) {
  var urlSearch =
    url +
    "/search/" +
    judgeJmbg +
    "/prekrsaj/" +
    (violation !== undefined ? violation : "");
  return axios
    .get(urlSearch, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(courtStorageKey),
      },
    })
    .then((res) => {
      return res.data.$values;
    })
    .catch((err) => {
      console.log(err);
    });
}
