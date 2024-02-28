export type TFormData = {
  darlehensbetrag: string;
  zinssatz: string;
  tilgungsrate: string;
};

export type FormDataProps = {
  formData: TFormData;
  zinsbindungsdauer: number;
  setFormData: (formData: TFormData) => void;
  setResultData: (resultData: TResultData) => void;
  setTilgungsplan: (tilgungsplan: TTilgungsPlan[] | null) => void;
  setZinsbindungsdauer: (zinsbindungsdauer: number) => void;
};

export type TResultData = {
  einzahlung: string;
  zinsen: string;
  tilgung: string;
  restschuld: string;
  monatsrate: string;
};

export type ResultDataProps = {
  resultData: TResultData;
};

export type TTilgungsPlan = {
  jahr: number;
  jahresRate: number;
  zinsanteil: number;
  tilgungsanteil: number;
  restschuld: number;
};

export type TilgungsPlanProps = {
  tilgungsplan: TTilgungsPlan[] | null;
};

export type APIData = TResultData & TilgungsPlanProps

export type ZinsbindungsdauerProps = {
  zinsbindungsdauerArray: number[];
  setZinsbindungsdauer: (zinsbindungsdauer: number) => void;
}
