import "./App.css";

import NavBar from "./components/NavBar";
import { ThemeProvider } from "@material-tailwind/react";
import ApiContextProvider from "./context/ApiContext";
import Main from "./components/Main";

function App() {
  return (
    <ApiContextProvider>
      <ThemeProvider>
        <NavBar />
        <Main />
      </ThemeProvider>
    </ApiContextProvider>
  );
}

export default App;
