import {
  Grid,
  Typography,
  Box,
  Stack,
  Container,
  Divider,
} from "@mui/material";
import IsoSharpIcon from "@mui/icons-material/IsoSharp";
import CalendarMonthSharpIcon from "@mui/icons-material/CalendarMonthSharp";
import RequestQuoteSharpIcon from "@mui/icons-material/RequestQuoteSharp";
import { ResultDataProps } from "@/lib/types";
import { NumericFormat } from "react-number-format";

const ResultCard = ({ resultData }: ResultDataProps) => {
  return (
    // erstellen des grids, welches das gesamte rechte Ergebniskärtchen zeigt
    <Grid item xs={12} md={6}>
      <Stack sx={{ mt: 8, p: 2 }} direction="column" spacing={5}>
        <Box>
          <Typography variant="h5">Ihr Ergebnis</Typography>
        </Box>
        <Container
          sx={{ border: "1px solid #eaeaea", borderRadius: "8px", p: 5 }}
        >
          <Grid container spacing={3}>
            <Grid item xs={6} sx={{ mb: 2 }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  fontSize: {
                    xs: "0.9rem",
                    sm: "1.5rem",
                  },
                }}
              >
                Einzahlung gesamt
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "end" }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  fontSize: {
                    xs: "0.9rem",
                    sm: "1.5rem",
                  },
                }}
              >
                {/* numeric format component, welche dafür sorgt, dass an tausenderstellen ein punkt, und an dezimalstellen ein komma gesetzt wird */}
                <NumericFormat
                  value={resultData.einzahlung}
                  displayType={"text"}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  decimalScale={2}
                  fixedDecimalScale={true}
                />{" "}
                €
              </Typography>
            </Grid>

            <Grid item md={1} xs={2}>
              <RequestQuoteSharpIcon color="secondary"></RequestQuoteSharpIcon>
            </Grid>
            <Grid item md={3} xs={4} sx={{ textAlign: "start" }}>
              <Typography
                variant="subtitle1"
                fontWeight="light"
                sx={{
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1rem",
                  },
                }}
              >
                davon Zinsen
              </Typography>
            </Grid>
            <Grid item md={8} xs={6} sx={{ textAlign: "end" }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1rem",
                  },
                }}
              >
                {/* numeric format component, welche dafür sorgt, dass an tausenderstellen ein punkt, und an dezimalstellen ein komma gesetzt wird */}
                <NumericFormat
                  value={resultData.zinsen}
                  displayType={"text"}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  decimalScale={2}
                  fixedDecimalScale={true}
                />{" "}
                €
              </Typography>
            </Grid>

            <Grid item md={1} xs={2}>
              <RequestQuoteSharpIcon color="secondary"></RequestQuoteSharpIcon>
            </Grid>
            <Grid item md={3} xs={4} sx={{ textAlign: "start" }}>
              <Typography
                variant="subtitle1"
                fontWeight="light"
                sx={{
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1rem",
                  },
                }}
              >
                davon Tilgung
              </Typography>
            </Grid>
            <Grid item md={8} xs={6} sx={{ textAlign: "end" }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1rem",
                  },
                }}
              >
                {/* numeric format component, welche dafür sorgt, dass an tausenderstellen ein punkt, und an dezimalstellen ein komma gesetzt wird */}
                <NumericFormat
                  value={resultData.tilgung}
                  displayType={"text"}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  decimalScale={2}
                  fixedDecimalScale={true}
                />{" "}
                €
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ mt: 3, mb: 3, bgcolor: "#ffced4" }} />

          <Grid container spacing={3}>
            <Grid item md={1} xs={2}>
              <IsoSharpIcon color="secondary"></IsoSharpIcon>
            </Grid>
            <Grid item md={8} xs={6} sx={{ textAlign: "start" }}>
              <Typography
                variant="subtitle1"
                fontWeight="light"
                sx={{
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1rem",
                  },
                }}
              >
                Restschuld am Ende der Zinsbindung
              </Typography>
            </Grid>
            <Grid item md={3} xs={4} sx={{ textAlign: "end" }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1rem",
                  },
                }}
              >
                {/* numeric format component, welche dafür sorgt, dass an tausenderstellen ein punkt, und an dezimalstellen ein komma gesetzt wird */}
                <NumericFormat
                  value={resultData.restschuld}
                  displayType={"text"}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  decimalScale={2}
                  fixedDecimalScale={true}
                />{" "}
                €
              </Typography>
            </Grid>

            <Grid item md={1} xs={2}>
              <CalendarMonthSharpIcon color="secondary"></CalendarMonthSharpIcon>
            </Grid>
            <Grid item md={8} xs={6} sx={{ textAlign: "start" }}>
              <Typography
                variant="subtitle1"
                fontWeight="light"
                sx={{
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1rem",
                  },
                }}
              >
                Monatliche Rate
              </Typography>
            </Grid>
            <Grid item md={3} xs={4} sx={{ textAlign: "end" }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1rem",
                  },
                }}
              >
                {/* numeric format component, welche dafür sorgt, dass an tausenderstellen ein punkt, und an dezimalstellen ein komma gesetzt wird */}
                <NumericFormat
                  value={resultData.monatsrate}
                  displayType={"text"}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  decimalScale={2}
                  fixedDecimalScale={true}
                />{" "}
                €
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Stack>
    </Grid>
  );
};

export default ResultCard;
