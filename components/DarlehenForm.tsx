"use client";

import {
  Grid,
  Stack,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";

import { useEffect, useState, useMemo } from "react";
import { FormDataProps, APIData } from "@/lib/types";
import ZinsBindungsdauer from "./ZinsBindungsdauer";
import { ZINSBUTTON_ARRAY } from "@/lib/constants";

const DarlehenForm = ({
  formData,
  zinsbindungsdauer,
  setFormData,
  setResultData,
  setTilgungsplan,
  setZinsbindungsdauer,
}: FormDataProps) => {
  //frontend validation constants
  //useMemo, weil wir nur kalkulieren wollen, wenn sich auch wirklich die dazugehörigen inputs geändert haben
  const validInputDarlehen = useMemo(() => {
    const darlehensbetrag = parseFloat(formData.darlehensbetrag);
    return darlehensbetrag >= 10000 && darlehensbetrag <= 1000000;
  }, [formData.darlehensbetrag]);

  const validInputZinssatz = useMemo(() => {
    const zinssatz = parseFloat(formData.zinssatz);
    return zinssatz >= 1 && zinssatz <= 10;
  }, [formData.zinssatz]);

  const validInputTilgungssatz = useMemo(() => {
    const tilgungsrate = parseFloat(formData.tilgungsrate);
    return tilgungsrate >= 1 && tilgungsrate <= 15;
  }, [formData.tilgungsrate]);

  //frontend validation states
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [isInputValid, setIsInputValid] = useState({
    inputDarlehen: true,
    inputZinssatz: true,
    inputTilgungssatz: true,
  });

  //submitHandler, schickt die fetch request an unsere API, wenn der "Berechnen" Button geklickt wird (eigentlich redundant, da automatisch bei input changes neu kalkuliert wird)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //input validation, um keine "verbotenen werte" an unsere API schicken zu lassen
    if (
      !formData.zinssatz ||
      !formData.darlehensbetrag ||
      !formData.tilgungsrate
    ) {
      setIsInputEmpty(true);
      return;
    }
    setIsInputEmpty(false);

    setIsInputValid({
      inputDarlehen: validInputDarlehen,
      inputZinssatz: validInputZinssatz,
      inputTilgungssatz: validInputTilgungssatz,
    });

    if (!validInputDarlehen || !validInputZinssatz || !validInputTilgungssatz) {
      return;
    }

    try {
      const response = await fetch("/api/darlehen", {
        method: "POST",
        body: JSON.stringify({
          darlehensbetrag: parseFloat(formData.darlehensbetrag),
          zinssatz: parseFloat(formData.zinssatz),
          tilgungsrate: parseFloat(formData.tilgungsrate),
          zinsbindungsdauer,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Response was OK! :)");
      }

      const data: APIData = await response.json();
      setResultData(data); //state wert für ResultData setten, welcher dann in ResultCard.tsx angezeigt wird
      setTilgungsplan(data.tilgungsplan); //state wert für Tilgungsplan setten, welcher dann in AnnualInstallments.tsx angezeigt wird
    } catch (error) {
      console.log(error);
    }
  };

  //changeHandler, schickt die fetch request an usnere API, sobald sich irgendwo ein eingetippter Wert ändert
  const handleChange = async () => {
    //input validation, um keine "verbotenen werte" an unsere API schicken zu lassen
    if (
      !formData.zinssatz ||
      !formData.darlehensbetrag ||
      !formData.tilgungsrate
    ) {
      setIsInputEmpty(true);
      return;
    }
    setIsInputEmpty(false);

    setIsInputValid({
      inputDarlehen: validInputDarlehen,
      inputZinssatz: validInputZinssatz,
      inputTilgungssatz: validInputTilgungssatz,
    });

    if (!validInputDarlehen || !validInputZinssatz || !validInputTilgungssatz) {
      return;
    }

    try {
      const response = await fetch("/api/darlehen", {
        method: "POST",
        body: JSON.stringify({
          darlehensbetrag: parseFloat(formData.darlehensbetrag),
          zinssatz: parseFloat(formData.zinssatz),
          tilgungsrate: parseFloat(formData.tilgungsrate),
          zinsbindungsdauer,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Response was OK! :)");
      }

      const data: APIData = await response.json();
      setResultData(data); //state wert für ResultData setten, welcher dann in ResultCard.tsx angezeigt wird
      setTilgungsplan(data.tilgungsplan); //state wert für Tilgungsplan setten, welcher dann in AnnualInstallments.tsx angezeigt wird
    } catch (error) {
      console.log(error);
    }
  };

  //useEffect hook kalkuliert neu, sobald irgendwo ein neuer zugelassener Wert eingetippt wird
  useEffect(() => {
    handleChange();
  }, [formData, zinsbindungsdauer]);

  return (
    // erstellung des Grids, welches das gesamte linke formular beinhaltet
    <Grid item xs={12} md={6}>
      <form onSubmit={handleSubmit}>
        <Stack sx={{ mt: 8, p: 2 }} direction="column" spacing={5}>
          <Box>
            <Typography variant="h5">Ihre Berechnung</Typography>
          </Box>

          {/* input validation für darlehen */}
          {!isInputValid.inputDarlehen ? (
            <Box>
              <Typography variant="caption" color="primary">
                Darlehen muss zwischen 10.000 & 1.000.000 liegen!
              </Typography>
            </Box>
          ) : null}
          <TextField
            value={formData.darlehensbetrag}
            onChange={(e) => {
              setFormData({
                ...formData,
                darlehensbetrag: e.target.value,
              });
            }}
            label="Darlehensbetrag"
            helperText="Ihr gesamter Darlehensbetrag"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">€</InputAdornment>
              ),
            }}
          ></TextField>
          {/* input validation für zinssatz */}
          {!isInputValid.inputZinssatz ? (
            <Box>
              <Typography variant="caption" color="primary">
                Zinssatz muss zwischen 1 & 10 liegen!
              </Typography>
            </Box>
          ) : null}
          <TextField
            value={formData.zinssatz}
            onChange={(e) => {
              setFormData({
                ...formData,
                zinssatz: e.target.value,
              });
            }}
            label="Sollzinssatz"
            helperText="Vereinbarter Sollzinssatz"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">%</InputAdornment>
              ),
            }}
          ></TextField>

          {/* input validation für tilgungssatz */}
          {!isInputValid.inputTilgungssatz ? (
            <Box>
              <Typography variant="caption" color="primary">
                Tilgungssatz muss zwischen 1 & 15 liegen!
              </Typography>
            </Box>
          ) : null}

          <TextField
            value={formData.tilgungsrate}
            onChange={(e) => {
              setFormData({
                ...formData,
                tilgungsrate: e.target.value,
              });
            }}
            label="Anfängliche Tilgung"
            helperText="Anfänglicher Tilgungssatz in %"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">%</InputAdornment>
              ),
            }}
          ></TextField>
          {/* input validation, falls irgendein feld leer sein sollte */}
          {isInputEmpty ? (
            <Typography variant="caption" color="primary">
              Bitte füllen Sie alle Felder aus!
            </Typography>
          ) : null}
          <Box sx={{ border: "1px solid #eaeaea", borderRadius: "8px", p: 3 }}>
            <Typography variant="caption" color="error">
              Zinsbindungsdauer:{" "}
              {zinsbindungsdauer && `${zinsbindungsdauer} Jahre`}
            </Typography>
            {/* rendern der component, welche die zinsbindungsbuttons beinhaltet */}
            <ZinsBindungsdauer
              zinsbindungsdauerArray={ZINSBUTTON_ARRAY}
              setZinsbindungsdauer={setZinsbindungsdauer}
            />
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              type="submit"
              sx={{ width: "50%" }}
              variant="contained"
              size="large"
            >
              Berechnen
            </Button>
          </Box>
        </Stack>
      </form>
    </Grid>
  );
};

export default DarlehenForm;
