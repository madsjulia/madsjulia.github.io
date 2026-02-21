import { createTheme } from "@mui/material/styles";

export const DEFAULT_PRIMARY = "#6a1b9a";
export const DEFAULT_SECONDARY = "#1fb6ff";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: DEFAULT_PRIMARY },
    secondary: { main: DEFAULT_SECONDARY },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: [
      "Rubik",
      "ui-sans-serif",
      "system-ui",
      "-apple-system",
      "Segoe UI",
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 800 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 700,
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: "inherit",
        elevation: 0,
      },
    },
  },
});
