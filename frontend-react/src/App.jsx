import "./App.css";
import { Button } from "@material-tailwind/react";

function App() {
  return (
    <>
      <button className="w-32 h-8 bg-black text-white rounded-md hover:bg-slate-700 duration-300">
        連絡する
      </button>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <h1 className="mt-10  underline underline-offset-4">Hello world!</h1>
      <div className="flex  mx-auto w-max gap-4 mt-8 ">
        <Button>Button</Button>
        <Button color="green" className="text-xl text-yellow-500">
          Button
        </Button>
        <Button variant="filled">filled</Button>
        <Button variant="gradient">gradient</Button>
        <Button variant="outlined">outlined</Button>
        <Button variant="text">text</Button>
      </div>
    </>
  );
}

export default App;
