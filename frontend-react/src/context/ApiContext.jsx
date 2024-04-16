import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ApiContext = createContext();

const ApiContextProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState(null);
  const [thum, setThum] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
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

export default ApiContextProvider;
