import { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import Modal from "react-modal";
import { Button } from "@material-tailwind/react";
import FabIcon from "../assets/fab.svg";

import VideoUploadModal from "./VideoUploadModal";
const Main = () => {
  Modal.setAppElement("#root");

  const { setModalIsOpen } = useContext(ApiContext);

  return (
    <main className="text-center">
      <div className="grid grid-cols-12 justify-center">
        <div className="col-span-12 bg-blue-gray-200">12</div>
        <div className="col-span-1 bg-brown-300">
          <button
            onClick={() => setModalIsOpen(true)}
            className="p-0 w-12 h-12 bg-red-600 rounded-full  hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
          >
            <img src={FabIcon} alt="" className="" />
          </button>
        </div>

        <div className="col-span-8 bg-brown-400">8</div>

        <div className="col-span-3 bg-brown-500">3</div>
      </div>
      <VideoUploadModal />

      <button className="w-32 h-8 bg-black text-white rounded-md hover:bg-slate-700 duration-300">
        連絡する
      </button>
      <h1 className="font-comic text-3xl font-bold underline">Hello world!</h1>
      <div>
        <Button variant="filled" className="bg-primeColor">
          filled
        </Button>
        <Button variant="gradient">gradient</Button>
        <Button variant="outlined">outlined</Button>
        <Button variant="text">text</Button>
      </div>
    </main>
  );
};

export default Main;
