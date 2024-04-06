import { useContext } from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { RiUploadCloud2Line } from "react-icons/ri";
import { FaVideo } from "react-icons/fa";
import { BsImages } from "react-icons/bs";
import { ApiContext } from "../context/ApiContext";

const VideoUploadModal = () => {
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

  const handleEditVideo = () => {
    const fileInput = document.getElementById("videoInput");
    fileInput.click();
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <div className="text-center">
          <h2>Video title</h2>
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
            id="videoInput"
            hidden="hidden"
            onChange={(event) => setVideo(event.target.files[0])}
          />

          <button
            onClick={handleEditVideo}
            className="bg-transparent mr-1 text-gray-500 hover:bg-gray-200 cursor-pointer"
          >
            <FaVideo className="bg-transparent text-xl text-gray-500 m-2" />
          </button>

          <input
            type="file"
            id="imageInput"
            hidden="hidden"
            onChange={(event) => setThum(event.target.files[0])}
          />

          <button
            onClick={handleEditPicture}
            className="bg-transparent text-gray-500 hover:bg-gray-200 cursor-pointer"
          >
            <BsImages className="bg-transparent text-xl text-gray-500 m-2" />
          </button>
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
    </>
  );
};

export default VideoUploadModal;
