export interface Component {
  title: string;
  desc: string;
  url: string;
}

export interface ComponentCardProps {
  component: Component;
}

export interface Dokument {
  DokumentId: string;
  URLDokumenta: string;
}

export interface Gradjanin {
  Jmbg: string;
  Password?: string;
  Ime: string;
  Prezime: string;
  Mail: string;
  Broj: string;
  Adresa: string;
  OpstinaId: string;
  Opstina?: Opstina;
}

export interface Sudija extends Gradjanin {
  Sud?: Sud;
  SudId: string;
  PrekrsajnePrijave?: PrekrsajnaPrijava[];
}

export interface Sud {
  SudId: string;
  Naziv: string;
  OpstinaId: string;
  Opstina: Opstina;
  Rocista?: Rociste;
}

export interface OdlukaSudije {
  OdlukaSudijeId: string;
  OduzimanjeVozacke: boolean;
  OduzimanjeBodova: number;
  NovcanaKazna: number;
  Resenje: string;
  Sudija: Sudija | null;
  SudijaJmbg: string | null;
  OptuzeniJmbg: string | null;
  AdvokatJmbg: string | null;
  Rociste: Rociste | null;
  RocisteId: string;
  Predmet: Predmet | null;
  PredmetId: string;
  Status: number;
  Datum: Date;
}

export interface Opstina {
  OpstinaId: string;
  PTT: number;
  Naziv: string;
}

export interface Predmet {
  PredmetId: string;
  Datum: string;
  Naslov: string;
  Opis: string;
  Sudija: Sudija | null;
  SudijaJmbg: string | null;
  OptuzeniJmbg: string | null;
  Advokat: Gradjanin | null;
  AdvokatJmbg: string | null;
  Status: number;
  PrekrsajnaPrijava: PrekrsajnaPrijava | null;
  PrekrsajnaPrijavaId: string;
}

export interface PrekrsajnaPrijava {
  PrekrsajnaPrijavaId: string;
  Datum: string;
  Komentar: string;
  OptuzeniJmbg: string;
  PrijavljenoOdJmbg?: string;
  Sudija: Sudija | null;
  SudijaJmbg: string | null;
  Opstina: Opstina | null;
  OpstinaId: string | null;
  Prekrsaj: number;
  Dokumenti: Dokument[];
  StatusPrekrsajnePrijave: number;
}

export interface Rociste {
  RocisteId: string;
  DatumRocista: string;
  OptuzeniJmbg: string;
  AdvokatJmbg?: string;
  Predmet?: Predmet;
  PredmetId: string;
  Sudija?: Sudija;
  SudijaJmbg: string;
  Sud?: Sud;
  SudId: string;
}

export const IshodRocista = {
  0: "ZAKAZANO",
  1: "ODLOZENO",
  2: "ZAVRSENO",
  3: "ARHIVA",
};

export const OpisiKrivica = {
  0: "PREKORACENJE_BRZINE",
  1: "VOZNJA_POD_DEJSTVOM_ALKOHOLA",
  2: "POJAS",
  3: "TEHNICKA_NEISPRAVNOST_VOZILA",
  4: "PRVA_POMOC",
  5: "VOZNJA_BEZ_VOZACKE_DOZVOLE",
  6: "VOZNJA_NEREGISTROVANOG_VOZILA",
};

export const StatusPredmeta = {
  0: "OTVOREN",
  1: "ZATVOREN",
  2: "ARHIVA",
};

export const StatusPrekrsajnePrijave = {
  0: "AKTIVAN",
  1: "PRIHVACEN",
  2: "ODBIJEN",
  3: "ARHIVA",
};
