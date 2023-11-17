import { ThemeProvider } from "@mui/material/styles";
import AppRouter from "./router/AppRouter";
import { Provider } from "react-redux";
import store from "./app/store";
import { ToastContainer } from "react-toastify";
import { darkTheme, lightTheme } from "./themes";
import { CssBaseline } from "@mui/material";

function App() {
  const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={lightTheme}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
      <CssBaseline />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
