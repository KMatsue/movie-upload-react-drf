import { useContext, useRef } from "react";
import { ApiContext } from "../context/ApiContext";
import ReactPlayer from "react-player";
// import { AiFillLike } from "react-icons/ai";
// import { AiFillDislike } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import bytes from "bytes";

const VideoDetails = () => {
  const { selectedVideo, deleteVideo } = useContext(ApiContext);
  const player = useRef(null);

  if (!selectedVideo)
    return (
      <div className="flex h-full justify-center items-center">
        <p className="">動画を選択してください</p>
      </div>
    );
  // console.log(selectedVideo.video);
  return (
    <>
      <div className="text-center m-2">
        <ReactPlayer
          url={selectedVideo.video}
          ref={player}
          volume={0.5}
          width="100%"
          height="100%"
          // playing
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
      <div className="grid grid-cols-12 justify-center m-2">
        <div className="col-span-10 text-left ">
          <h6 className="font-semibold">{selectedVideo.title}</h6>
          <p>動画サイズ:{bytes(selectedVideo.size)}</p>
          <p>アップロード日:{selectedVideo.created_at}</p>
        </div>
        <div className="col-span-2 flex items-center justify-center">
          <button onClick={() => deleteVideo()} className="">
            <MdDeleteForever className="w-12 h-12 rounded-full text-primeColor hover:text-orange-300 active:shadow-lg mouse" />
          </button>
        </div>
        {/* <div className="col-span-1">
          <button
            className="text-primeColor size-5"
            onClick={() => incrementLike()}
          >
            <AiFillLike />
            {selectedVideo.like}
          </button>
        </div>
        <div className="col-span-1 size-5 ">
          <button
            className="text-primeColor"
            onClick={() => incrementDislike()}
          >
            <AiFillDislike />
            {selectedVideo.dislike}
          </button>
        </div> */}
      </div>
    </>
  );
};

export default VideoDetails;
