import { createContext, useState, useEffect } from "react";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import axios from "axios";
import PropTypes from "prop-types";

export const ApiContext = createContext();

const ApiContextProvider = (props) => {
  const token = props.cookies.get("jwt-token");
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState(null);
  const [thum, setThum] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/videos/", {
          headers: {
            Authorization: `JWT ${token}`,
          },
        });
        setVideos(res.data);
      } catch {
        console.log("error");
      }
    };
    getVideos();
  }, [token]);

  const newVideo = async () => {
    const uploadData = new FormData();
    uploadData.append("title", title);
    uploadData.append("video", video, video.name);
    uploadData.append("size", video.size);
    // uploadData.append("thumbnail", thum, thum.name);
    console.log(
      `title:${title},video:${video},size:${video.size},`,
      typeof video.size
    );
    console.log(uploadData);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/videos/",
        uploadData,
        {
          headers: {
            // "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `JWT ${token}`,
          },
        }
      );
      setVideos([...videos, res.data]);
      setModalIsOpen(false);
      setTitle("");
      setVideo(null);
      setThum(null);
    } catch (e) {
      console.log(`error:${e}`);
    }
  };

  const deleteVideo = async () => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/videos/${selectedVideo.id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        }
      );
      setSelectedVideo(null);
      setVideos(videos.filter((item) => item.id !== selectedVideo.id));
    } catch {
      console.log("error");
    }
  };

  const incrementLike = async () => {
    try {
      const uploadData = new FormData();
      uploadData.append("like", selectedVideo.like + 1);

      const res = await axios.patch(
        `http://127.0.0.1:8000/api/videos/${selectedVideo.id}/`,
        uploadData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        }
      );
      setSelectedVideo({ ...selectedVideo, like: res.data.like });
      setVideos(
        videos.map((item) => (item.id === selectedVideo.id ? res.data : item))
      );
    } catch {
      console.log("error");
    }
  };

  const incrementDislike = async () => {
    try {
      const uploadData = new FormData();
      uploadData.append("dislike", selectedVideo.dislike + 1);
      const res = await axios.patch(
        `http://127.0.0.1:8000/api/videos/${selectedVideo.id}/`,
        uploadData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        }
      );
      setSelectedVideo({ ...selectedVideo, dislike: res.data.dislike });
      setVideos(
        videos.map((item) => (item.id === selectedVideo.id ? res.data : item))
      );
    } catch {
      console.log("error");
    }
  };

  return (
    <ApiContext.Provider
      value={{
        videos,
        title,
        setTitle,
        video,
        setVideo,
        thum,
        setThum,
        selectedVideo,
        setSelectedVideo,
        modalIsOpen,
        setModalIsOpen,
        newVideo,
        deleteVideo,
        incrementLike,
        incrementDislike,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
};

ApiContextProvider.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
  children: PropTypes.object,
};

export default withCookies(ApiContextProvider);
