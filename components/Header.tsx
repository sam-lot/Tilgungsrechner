import { Stack, Typography } from "@mui/material";
import CalculateIcon from "@mui/icons-material/Calculate";
import theme from "@/themes/theme";

const Header = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        mt: 10,
        p: 5,
        borderBottom: `2px solid ${theme.palette.secondary.light}`,
      }}
    >
      <CalculateIcon color="primary" fontSize="large"></CalculateIcon>
      <Typography
        sx={{
          fontSize: {
            xs: "2.25rem",
            sm: "2.5rem",
          },
        }}
      >
        Tilgungsrechner
      </Typography>
    </Stack>
  );
};

export default Header;
