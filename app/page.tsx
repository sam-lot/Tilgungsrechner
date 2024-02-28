"use client";

import { Container, Grid } from "@mui/material";
import Header from "@/components/Header";
import DarlehenForm from "@/components/DarlehenForm";
import ResultCard from "@/components/ResultCard";
import AnnualInstallments from "@/components/AnnualInstallments";
import { useState } from "react";
import { TTilgungsPlan } from "@/lib/types";

export default function Home() {
  const [formData, setFormData] = useState({
    darlehensbetrag: "250000",
    zinssatz: "2",
    tilgungsrate: "2",
  });
  const [resultData, setResultData] = useState({
    einzahlung: "0",
    zinsen: "0",
    tilgung: "0",
    restschuld: "0",
    monatsrate: "0",
  });
  const [tilgungsplan, setTilgungsplan] = useState<TTilgungsPlan[] | null>(
    null
  );
  const [zinsbindungsdauer, setZinsbindungsdauer] = useState(0);

  return (
    <main>
      <Container sx={{ mb: 10 }}>
        {/* Header Component */}
        <Header />
        {/* Darlehen Form Component */}
        <Grid container>
          <DarlehenForm
            formData={formData}
            zinsbindungsdauer={zinsbindungsdauer}
            setFormData={setFormData}
            setResultData={setResultData}
            setTilgungsplan={setTilgungsplan}
            setZinsbindungsdauer={setZinsbindungsdauer}
          />
          {/* Ergebnis Component */}
          <ResultCard resultData={resultData} />
        </Grid>
        {/* Jährliche Raten Component */}
        <AnnualInstallments tilgungsplan={tilgungsplan} />
      </Container>
    </main>
  );
}
