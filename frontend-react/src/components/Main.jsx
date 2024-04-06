import { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import Modal from "react-modal";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import FabIcon from "../assets/fab.svg";
import { IoMdClose } from "react-icons/io";
import { RiUploadCloud2Line } from "react-icons/ri";
import { FaVideo } from "react-icons/fa";
import { BsImages } from "react-icons/bs";
const Main = () => {
  Modal.setAppElement("#root");
  const customStyles = {
    content: {
      top: "30%",
      left: "43%",
      right: "auto",
      bottom: "auto",
    },
  };
  const {
    title,
    setTitle,
    video,
    setVideo,
    thum,
    setThum,
    modalIsOpen,
    setModalIsOpen,
    newVideo,
  } = useContext(ApiContext);

  return (
    <main className="text-center">
      <div className="grid grid-cols-12 justify-center">
        <div className="col-span-12 bg-blue-gray-200">12</div>
        <div className="col-span-1 bg-brown-300">
          <button
            onClick={() => setModalIsOpen(true)}
            className="p-0 w-12 h-12 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
          >
            <img src={FabIcon} alt="" />
          </button>
        </div>

        <div className="col-span-8 bg-brown-400">8</div>

        <div className="col-span-3 bg-brown-500">3</div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <div className="text-center">
          <Typography>Movie title</Typography>
          <br />
          <input
            type="text"
            onChange={(event) => setTitle(event.target.value)}
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primeColor sm:text-sm sm:leading-6"
          />
          <br />
          <br />
          <input
            type="file"
            id="mp4Input"
            hidden="hidden"
            onChange={(event) => setVideo(event.target.files[0])}
          />

          <IconButton variant="text" onClick={() => {}}>
            <FaVideo className="bg-transparent text-xl text-gray-500 m-2 cursor-pointer" />
          </IconButton>
          <input
            type="file"
            id="imageInput"
            hidden="hidden"
            onChange={(event) => setThum(event.target.files[0])}
          />

          <IconButton variant="text" onClick={() => {}}>
            <BsImages className="bg-transparent text-xl text-gray-500 m-2 cursor-pointer" />
          </IconButton>
          <br />

          {title && video && thum && (
            <button
              onClick={() => newVideo()}
              className="bg-transparent text-gray-500 m-2 cursor-pointer"
            >
              <RiUploadCloud2Line />
            </button>
          )}
          <button
            onClick={() => setModalIsOpen(false)}
            className="bg-transparent text-gray-500 m-2 cursor-pointer"
          >
            <IoMdClose />
          </button>
        </div>
      </Modal>

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
