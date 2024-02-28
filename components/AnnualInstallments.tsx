import { Fragment } from "react";
import { Box, Typography, Grid, Divider } from "@mui/material";
import { TilgungsPlanProps } from "@/lib/types";
import { NumericFormat } from "react-number-format";

const AnnualInstallments = ({ tilgungsplan }: TilgungsPlanProps) => {
  return (
    <Fragment>
      <Box sx={{ mt: 12 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ fontSize: { xs: "1.4rem", md: "2rem" } }}
        >
          Jährliche Raten
        </Typography>
      </Box>

      <Grid container sx={{ mt: 8, p: 0 }}>
        <Grid item sm={2.4} xs={2} sx={{ pl: 4 }}>
          <Typography
            sx={{
              fontSize: {
                xs: "0.7rem",
                sm: "0.9rem",
                md: "1rem",
              },
            }}
          >
            Jahr
          </Typography>
        </Grid>
        <Grid item sm={2.4} xs={2} sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              fontSize: {
                xs: "0.7rem",
                sm: "0.9rem",
                md: "1rem",
              },
            }}
          >
            Rate
          </Typography>
        </Grid>
        <Grid item sm={2.4} xs={2.6} sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              fontSize: {
                xs: "0.7rem",
                sm: "0.9rem",
                md: "1rem",
              },
            }}
          >
            Zinsanteil
          </Typography>
        </Grid>
        <Grid item sm={2.4} xs={2.6} sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              fontSize: {
                xs: "0.7rem",
                sm: "0.9rem",
                md: "1rem",
              },
            }}
          >
            Tilgungsanteil
          </Typography>
        </Grid>
        <Grid
          item
          sm={2.4}
          xs={2.6}
          sx={{ textAlign: "end", pr: { xs: 0, md: 4 } }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "0.7rem",
                sm: "0.9rem",
                md: "1rem",
              },
            }}
          >
            Restschuld
          </Typography>
        </Grid>
        <Divider sx={{ width: "100%", mt: 2, mb: 2, bgcolor: "#ffced4" }} />

        {tilgungsplan &&
          tilgungsplan.map((tilgungsplanSpalte) => {
            return (
              <Fragment key={tilgungsplanSpalte.jahr}>
                <Grid item sm={2.4} xs={2} sx={{ pl: 4 }}>
                  <Typography
                    fontWeight="light"
                    sx={{
                      fontSize: {
                        xs: "0.7rem",
                        sm: "0.9rem",
                        md: "1rem",
                      },
                    }}
                  >
                    {tilgungsplanSpalte.jahr}
                  </Typography>
                </Grid>
                <Grid item sm={2.4} xs={2} sx={{ textAlign: "center" }}>
                  <Typography
                    fontWeight="light"
                    sx={{
                      fontSize: {
                        xs: "0.7rem",
                        sm: "0.9rem",
                        md: "1rem",
                      },
                    }}
                  >
                    <NumericFormat
                      value={tilgungsplanSpalte.jahresRate}
                      displayType={"text"}
                      thousandSeparator={"."}
                      decimalSeparator={","}
                      decimalScale={2}
                      fixedDecimalScale={true}
                    />{" "}
                    €
                  </Typography>
                </Grid>
                <Grid item sm={2.4} xs={2.6} sx={{ textAlign: "center" }}>
                  <Typography
                    fontWeight="light"
                    sx={{
                      fontSize: {
                        xs: "0.7rem",
                        sm: "0.9rem",
                        md: "1rem",
                      },
                    }}
                  >
                    <NumericFormat
                      value={tilgungsplanSpalte.zinsanteil}
                      displayType={"text"}
                      thousandSeparator={"."}
                      decimalSeparator={","}
                      decimalScale={2}
                      fixedDecimalScale={true}
                    />{" "}
                    €
                  </Typography>
                </Grid>
                <Grid item sm={2.4} xs={2.6} sx={{ textAlign: "center" }}>
                  <Typography
                    fontWeight="light"
                    sx={{
                      fontSize: {
                        xs: "0.7rem",
                        sm: "0.9rem",
                        md: "1rem",
                      },
                    }}
                  >
                    <NumericFormat
                      value={tilgungsplanSpalte.tilgungsanteil}
                      displayType={"text"}
                      thousandSeparator={"."}
                      decimalSeparator={","}
                      decimalScale={2}
                      fixedDecimalScale={true}
                    />{" "}
                    €
                  </Typography>
                </Grid>
                <Grid
                  item
                  sm={2.4}
                  xs={2.6}
                  sx={{ textAlign: "end", pr: { xs: 0, md: 4 } }}
                >
                  <Typography
                    fontWeight="light"
                    sx={{
                      fontSize: {
                        xs: "0.7rem",
                        sm: "0.9rem",
                        md: "1rem",
                      },
                    }}
                  >
                    <NumericFormat
                      value={tilgungsplanSpalte.restschuld}
                      displayType={"text"}
                      thousandSeparator={"."}
                      decimalSeparator={","}
                      decimalScale={2}
                      fixedDecimalScale={true}
                    />{" "}
                    €
                  </Typography>
                </Grid>
                <Divider
                  sx={{ width: "100%", mt: 2, mb: 2, bgcolor: "#e6e0e1" }}
                />
              </Fragment>
            );
          })}
      </Grid>
    </Fragment>
  );
};

export default AnnualInstallments;
