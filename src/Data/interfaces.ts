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
  ZAKAZANO: 0,
  ODLOZENO: 1,
  ZAVRSENO: 2,
  ARHIVA: 3,
};

export const opisiKrivica = {
  POJAS: 0,
  PREKORACENJE_BRZINE: 1,
  PIJANA_VOZNJA: 2,
  TEHNICKA_NEISPRAVNOST: 3,
  PRVA_POMOC: 4,
  NEMA_VOZACKU: 5,
  REGISTRACIJA: 6,
};

export const StatusPredmeta = {
  OTVOREN: 0,
  ZATVOREN: 1,
  ARHIVA: 2,
};

export const StatusPrekrsajnePrijave = {
  AKTIVAN: 0,
  PRIHVACEN: 1,
  ODBIJEN: 2,
  ARHIVA: 3,
};
