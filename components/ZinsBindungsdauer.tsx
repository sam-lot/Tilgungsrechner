import { Stack, Button } from "@mui/material";
import { ZinsbindungsdauerProps } from "@/lib/types";
import { useMediaQuery } from "@mui/material";
import theme from "@/themes/theme";

const ZinsBindungsdauer = ({
  zinsbindungsdauerArray,
  setZinsbindungsdauer,
}: ZinsbindungsdauerProps) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack direction="row" justifyContent="space-between" sx={{ mt: 3 }}>
      {zinsbindungsdauerArray.map((zButton) => {
        return (
          <Button
            onClick={(e) => {
              setZinsbindungsdauer(zButton);
            }}
            sx={{
              ...(isMobile && {
                minWidth: "50px",
              }),
            }}
            key={zButton}
            variant="contained"
            color="secondary"
            size={isMobile ? "small" : isMedium ? "medium" : "large"}
          >
            {zButton}
          </Button>
        );
      })}
    </Stack>
  );
};

export default ZinsBindungsdauer;
