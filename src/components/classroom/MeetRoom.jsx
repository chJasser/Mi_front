import { Helmet } from "react-helmet";
import Input from "components/Input/Input";
import ButtonCircle from "components/Button/ButtonCircle";
import { useEffect, useRef, useState } from "react";
import image from "images/dance.jpg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axiosInstance";
import ReactPlayer from "react-player";
import NcPlayIcon from "components/NcPlayIcon/NcPlayIcon";
import NcImage from "components/NcImage/NcImage";
import isSafariBrowser from "utils/isSafariBrowser";

import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";

import Badge from "components/Badge/Badge";
import ButtonSecondary from "components/Button/ButtonSecondary";
import DailyIframe from "@daily-co/daily-js";
import { useParams } from "react-router-dom";

/**
 *
 *
 *
 */
function MeetRoom() {
  const dispatch = useDispatch();
  let className = "";
  const [search, setSearch] = useState("");

  const [songs, setSongs] = useState([]);
  const [chosenSong, setChosenSong] = useState({});
  const [isPlay, setIsPlay] = useState(false);

  const getSongFromDb = async (search) => {
    console.log(chosenSong);
    await axios
      .post(`/karaoke/songs`, { song: search })
      .then((res) => {
        setSongs(res.data);
      })
      .catch((err) => {
        setSongs([]);
      });
  };

  let { id } = useParams();

  let { token } = useParams();
  const getStream = async () => {
    const container = document.getElementById("MyContainer");

    const callFrame = DailyIframe.createFrame(container, {
      iframeStyle: {
        position: "relative",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      },
      showLeaveButton: true,
      showFullscreenButton: true,
      customLayout: true,
    });
    const domain = "https://miuniverse.daily.co/";
    await axios
      .get(`/video-call/${id}`)
      .then((res) => {
        if (res.status === 200) {
          callFrame.join({
            url: `${domain}${id}?t=${token}`,
          });
        }
      })
      .catch((err) => console.log(err, "this is the error"));
  };

  useEffect(() => {
    getStream();
  }, [id]);

  return (
    <>
      <div className={`nc-PageSearch ${className}`} data-nc-id="PageSearch">
        <Helmet>
          <title>MI || ClassRom</title>
        </Helmet>
        <BgGlassmorphism />
      </div>

      <div
        className={`nc-PageSingleVideo  ${className}`}
        data-nc-id="PageSingleVideo"
        style={{ height: "80%" }}
      >
        {/* SINGLE HEADER */}
        <div
          className="container-fluid"
          style={{ height: "70vh" }}
          id="MyContainer"
        ></div>
      </div>
      {/* Streaming !!! */}
      <div className="gap-2 my-10"></div>
    </>
  );
}

export default MeetRoom;
