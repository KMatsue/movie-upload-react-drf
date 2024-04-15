import { createContext, useState, useEffect } from "react";
import { instanceOf } from "prop-types";
import { withCookies, Cookies, useCookies } from "react-cookie";
import axios from "axios";
// import PropTypes from "prop-types";

export const ApiContext = createContext();

const ApiContextProvider = ({ children }) => {
  // const [cookies, setCookie, removeCookie] = useCookies(["access"]);
  // const token = props.cookies.get("access");
  // const token = cookies.access;
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState(null);
  const [thum, setThum] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const axios_instance = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
  });

  // console.log(token);
  useEffect(() => {
    // console.log(token);
    const getVideos = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/videos/", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setVideos(res.data);
      } catch (e) {
        console.log("error", e);
      }
    };
    getVideos();
  }, []);

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
        "http://127.0.0.1:8000/api/videos/",
        uploadData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
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
            // Authorization: `JWT ${token}`,
          },
          withCredentials: true,
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
            // Authorization: `JWT ${token}`,
          },
          withCredentials: true,
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
            // Authorization: `JWT ${token}`,
          },
          withCredentials: true,
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
      {children}
    </ApiContext.Provider>
  );
};

// ApiContextProvider.propTypes = {
//   cookies: instanceOf(Cookies).isRequired,
//   children: PropTypes.object,
// };

export default ApiContextProvider;
