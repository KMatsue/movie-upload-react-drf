import { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import VideoItem from "./VideoItem";
const VideoList = () => {
  const { videos } = useContext(ApiContext);
  // console.log(videos);
  const listOfVideos = videos.map((video) => (
    <VideoItem key={video.id} video={video} />
  ));

  return (
    <div className="grid ">
      <div className="bg-gray-800 h-[80vh] p-2 shadow-sm overflow-hidden overflow-y-auto">
        {listOfVideos}
      </div>
    </div>
  );
};

export default VideoList;
