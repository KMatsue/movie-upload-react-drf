import { useContext } from "react";
import PropTypes from "prop-types";
import { ApiContext } from "../context/ApiContext";

const VideoItem = ({ video }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mb-2 mx-2 bg-white">
      <img className="w-full" src={video.thumbnail} alt="Sunset" />
      <div className="px-2 py-2">
        <div className="text-left font-bold text-lg">{video.title}</div>
      </div>
    </div>
  );
};
VideoItem.propTypes = {
  video: PropTypes.object,
};
export default VideoItem;
