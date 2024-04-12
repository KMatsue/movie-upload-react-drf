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
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
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
        <div className="text-center px-8">
          <h2 className="text-xl">Video Upload</h2>
          <br />
          <div className="text-left">
            <label htmlFor="video-title" className="">
              title
            </label>
            <input
              type="text"
              name="video-title"
              onChange={(event) => setTitle(event.target.value)}
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primeColor sm:text-sm sm:leading-6"
            />
          </div>
          <br />

          <div
            onClick={handleEditVideo}
            className="flex items-center mx-2 bg-transparent text-gray-500 hover:bg-gray-200 cursor-pointer"
          >
            <input
              type="file"
              id="videoInput"
              hidden="hidden"
              onChange={(event) => setVideo(event.target.files[0])}
            />
            <FaVideo className="bg-transparent text-xl text-gray-500 mr-2" />
            <p className="">動画ファイルを選択</p>
          </div>
          <br />
          {/* <div
            onClick={handleEditPicture}
            className="flex items-center mx-2 bg-transparent text-gray-500 hover:bg-gray-200 cursor-pointer"
          >
            <input
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={(event) => setThum(event.target.files[0])}
            />
            <button className="bg-transparent text-gray-500 hover:bg-gray-200 cursor-pointer">
              <BsImages className="bg-transparent text-xl text-gray-500 mr-2" />
            </button>
            <p className="">画像ファイルを選択</p>
            <br />
          </div>
          <br /> */}
          {/* {title && video && thum && ( */}
          {title && video && (
            <div
              onClick={() => newVideo()}
              className="flex items-center mx-2 bg-transparent text-gray-500 hover:bg-gray-200 cursor-pointer"
            >
              <button className="bg-transparent text-xl mr-2 cursor-pointer">
                <RiUploadCloud2Line />
              </button>
              <p>アップロード</p>
            </div>
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
