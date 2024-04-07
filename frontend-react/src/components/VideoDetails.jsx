import { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import ReactPlayer from "react-player";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";

const VideoDetails = () => {
  const { selectedVideo, deleteVideo, incrementLike, incrementDislike } =
    useContext(ApiContext);

  if (!selectedVideo)
    return (
      <div className="container">
        <p className="">動画を選択してください</p>
      </div>
    );
  return (
    <>
      <div className="text-center">
        <ReactPlayer
          className="player"
          url={selectedVideo.video}
          width="100%"
          height="100%"
          playing
          controls
          disablePictureInPicture
          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
                disablePictureInPicture: true,
              },
            },
          }}
        />
      </div>
      <div className="grid grid-cols-12 justify-center">
        <h6 className="col-span-10 "> {selectedVideo.title}</h6>
        <div className="col-span-1 bg-blue-gray-200">
          <button className="like" onClick={() => incrementLike()}>
            <AiFillLike />
            {selectedVideo.like}
          </button>
        </div>
        <div className="col-span-1 bg-blue-gray-300">
          <button className="like" onClick={() => incrementDislike()}>
            <AiFillDislike />
            {selectedVideo.dislike}
          </button>
        </div>
      </div>

      <button onClick={() => deleteVideo()} className="">
        <MdDeleteForever className="w-12 h-12 rounded-full text-primeColor hover:text-orange-300 active:shadow-lg mouse" />
      </button>
    </>
  );
};

export default VideoDetails;
