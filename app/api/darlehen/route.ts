import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  const { darlehensbetrag, zinssatz, tilgungsrate, zinsbindungsdauer } = await req.json(); //destructure die daten der fetch request in DarlehenForm.tsx

  const monatsrate = (darlehensbetrag * (tilgungsrate + zinssatz) / 100) / 12; //formel monatsrate festlegen
  let restschuld = darlehensbetrag; //anfangsbetrag restschuld festlegen
  let gesamtEinzahlung = 0; //gesamter betrag, der am ende vom Kunden gezahlt werden müsste
  let gesamtZinsen = 0; //gesamter zinsbetrag

  let zinsbindungMonate = zinsbindungsdauer * 12; //zinsbindungsdauer von jahre in monate konvertieren
  let zinsbindungsCounter = 0; //counter, um zu überprüfen, wann die zinsbindungsdauer endet
  let schuldNachZinsbindung = 0; //übrige schuld nach ende der zinsbindungsdauer

  let monatsCounter = 1; //counter, um zu tracken, der wie vielte monat im jahr ist
  let jahr = new Date().getFullYear(); //aktuelles jahr für beginn des tilgungsplans festlegen
  let jahresRate = 0; // spalte "rate" im tilgungsplan
  let jahresZinsen = 0; //spalte für jährlichen "zinsanteil" im tilgungsplan
  let jahresTilgung = 0; //spalte "tilgungsanteil" im tilgungsplan
  let jahresRestschuld = darlehensbetrag; //spalte "restschuld" im tilgungsplan
  let tilgungsplan = []; //erstellen des arrays, den wir später mit objekten füllen und in AnnualInstallments.tsx auslesen; jedes objekt = 1 zeile im tilgungsplan

  while (restschuld > 0) {
    if (zinsbindungsdauer === 0) schuldNachZinsbindung = 0; //wenn user keine zinsbindungsdauer ausgewählt hat (nur beim ersten rendern der seite, da standard 0 ist)
    if (zinsbindungsCounter === zinsbindungMonate) schuldNachZinsbindung = restschuld; //wenn die zinsbindungsdauer vorbei ist, pack die komplette übrige restschuld in "schuldNachZinsbindung"
    
    //hier erfolgt die erstellung für jede tabellarische zeile des tilgungsplans (für jedes jahr)
    if (monatsCounter % 12 === 0) { //jedes mal, wenn ein ganzes jahr vergangen ist, wollen wir alle infos für das jeweilige jahr als objekt in unseren array pushen
      tilgungsplan.push({
        jahr: jahr,
        jahresRate: jahresRate,
        zinsanteil: jahresZinsen,
        tilgungsanteil: jahresTilgung,
        restschuld: jahresRestschuld,
      });
      jahr += 1; //jahr erhöhen, da das aktuelle vorbei ist
      jahresRate = 0; //zinsen, rate, und tilgung für den tilgungsplan resetten, da wir ab dem nächsten durchlauf wieder für das nächste jahr neu anfangen zu kalkulieren
      jahresZinsen = 0;
      jahresTilgung = 0;
    }

    const zinsAnteil = (restschuld * zinssatz) / 100 / 12; //monatlicher zinsanteil
    const tilgungsAnteil = monatsrate - zinsAnteil; //monatlicher anteil, der getilgt wird

    gesamtZinsen += zinsAnteil; //monatlich den zinsanteil zum gesamtbetrag der zinsen addieren
    restschuld -= tilgungsAnteil; //von der gesamten restschuld wollen wir immer nur den monatlichen anteil abziehen, der getilgt wird

    jahresRate += monatsrate; //in jedem schleifendurchlauf die monatsrate zu der jahresrate addieren (wir fangen die jährliche rate ja oben nach jedem 12. monat ab)
    jahresZinsen += zinsAnteil; //in jedem schleifendurchlauf die monatlichen zinsen zu den jahresZinsen addieren 
    jahresTilgung += tilgungsAnteil; //in jedem schleifendurchlauf den monatlichen Tilgungsanteil zu der jahresTilgung addieren 
    jahresRestschuld -= tilgungsAnteil; //monatlichen tilgungsanteil bei jedem schleifendurchlauf von der jahresRestschuld subtrahieren

    monatsCounter++; 
    zinsbindungsCounter++; 
  }

  gesamtEinzahlung = darlehensbetrag + gesamtZinsen; //endgültigen gesamtbetrag kalkulieren, den der Kunde zahlen müsste

  //response mit allen daten zurück an unser frontend in DarlehenForm.tsx schicken
  return new NextResponse(
    JSON.stringify({
      einzahlung: gesamtEinzahlung,
      zinsen: gesamtZinsen,
      tilgung: darlehensbetrag,
      restschuld: schuldNachZinsbindung,
      monatsrate,
      tilgungsplan,
    })
  );
};