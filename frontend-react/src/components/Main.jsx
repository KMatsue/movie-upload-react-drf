import { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import Modal from "react-modal";
import VideoUploadModal from "./VideoUploadModal";
import VideoDetails from "./VideoDetails";
import VideoList from "./VideoList";
const Main = () => {
  Modal.setAppElement("#root");

  const { setModalIsOpen } = useContext(ApiContext);

  return (
    <main className="text-center">
      <div className="grid grid-cols-12 justify-center">
        <div className="col-span-12 bg-blue-gray-200"></div>
        {/* <div className="col-span-1">
          <button onClick={() => setModalIsOpen(true)} className="">
            <IoIosAddCircle className="w-12 h-12 rounded-full text-red-700 hover:text-red-300 active:shadow-lg mouse  " />
          </button>
        </div> */}

        <div className="col-span-9 bg-brown-200 bg-opacity-20">
          <VideoDetails />
        </div>

        <div className="col-span-3 ">
          <VideoList />
        </div>
      </div>
      <VideoUploadModal />

      <button
        onClick={() => setModalIsOpen(true)}
        className="font-comic text-lg py-1 px-2 mt-3 bg-black text-white rounded-md hover:bg-gray-700 duration-300"
      >
        動画アップロード
      </button>

      {/* <div>
        <Button variant="filled" className="bg-primeColor">
          filled
        </Button>
        <Button variant="gradient">gradient</Button>
        <Button variant="outlined">outlined</Button>
        <Button variant="text">text</Button>
      </div> */}
    </main>
  );
};

export default Main;
