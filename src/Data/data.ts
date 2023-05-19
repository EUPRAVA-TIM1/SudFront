import { Component } from "./interfaces"

export const base_url = "http://localhost:3000"
export const storageKey = "sud-token"

export const judgeComponents : Component[] = [
    {
        title: "Pregled sudskih odluka - sudija",
        desc: "Pregled sudskih odluka za zaposlene sudije",
        url: "/sudija/"
    },
    {
        title: "Pregled rocista - sudija",
        desc: "Pregled svih aktivnih rocista",
        url: "/rociste/sudija/"
    },
    {
        title: "Pregled prekrsajnih prijava",
        desc: "Pregled svih dodeljenih prekrsajnih prijava",
        url: "/prekrsajnaprijava/sudija/"
    },
    {
        title: "Pregled sudskih predmeta",
        desc: "Pregled svih sudskih predmeta",
        url: "/predmet/sudija/"
    }
]

export const allComponents : Component[] = [
    {
        title: "Pretraga sudija",
        desc: "Pretraga zaposlenih sudija",
        url: "/sudija"
    },
    {
        title: "Pretraga sudova",
        desc: "Pretraga svih sudova u Srbiji",
        url: "/sud"
    },
    {
        title: "Pregled sudskih odluka - fizicka lica",
        desc: "Pregled sudskih odluka za fizicka lica",
        url: "/optuzeni/"
    },
    {
        title: "Pregled sudskih odluka - pravna lica",
        desc: "Pregled sudskih odluka za pravna lica",
        url: "/advokat/"
    },
    {
        title: "Pregled rocista - fizicka lica",
        desc: "Pregled svih rocista za fizicka lica",
        url: "/rociste/gradjanin/"
    },
    {
        title: "Pregled rocista - pravna lica",
        desc: "Pregled svih rocista za pravna lica",
        url: "/rociste/advokat/"
    }
]