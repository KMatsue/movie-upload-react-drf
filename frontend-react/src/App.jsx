import "./App.css";
import { Button } from "@material-tailwind/react";
import NavBar from "./components/NavBar";
import { ThemeProvider } from "@material-tailwind/react";
import ApiContextProvider from "./context/ApiContext";

function App() {
  return (
    <ApiContextProvider>
      <ThemeProvider>
        <main className="text-center">
          <NavBar />
          <button className="w-32 h-8 bg-black text-white rounded-md hover:bg-slate-700 duration-300">
            連絡する
          </button>
          <h1 className="font-comic text-3xl font-bold underline">
            Hello world!
          </h1>
          <div>
            <Button variant="filled" className="bg-primeColor">
              filled
            </Button>
            <Button variant="gradient">gradient</Button>
            <Button variant="outlined">outlined</Button>
            <Button variant="text">text</Button>
          </div>
        </main>
      </ThemeProvider>
    </ApiContextProvider>
  );
}

export default App;
