import React, { FC, ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  changeCurrentMediaRunning,
  changeStateMediaRunning,
  MediaRunningState,
  addNewListPostAudio,
  selectCurrentMediaRunning,
} from "./mediaRunning";
import LoadingVideo from "components/LoadingVideo/LoadingVideo";
import iconPlaying from "images/icon-playing.gif";
import PostTypeFeaturedIcon from "components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import { PostDataType } from "data/types";
import isSafariBrowser from "utils/isSafariBrowser";
import { useSelector } from "react-redux";

const ButtonPlayMusic = ({
  className = "",
  resource,
  renderChildren,
  renderDefaultBtn,
  renderLoadingBtn,
  renderPlayingBtn,
}) => {
  const currentMediaRunning = useSelector(
    (state) => state.ResourceAudioRunningState
  );
  const dispatch = useAppDispatch();

  // STATE
  const mediaState = currentMediaRunning.state;

  //
  useEffect(() => {
    // check safari
    if (!resource || !isSafariBrowser()) {
      return;
    }
    dispatch(addNewListPostAudio(resource));
  }, [resource]);
  useEffect(() => {
    console.log(resource);
    console.log(currentMediaRunning.state);
  }, []);
  //

  const handleClickNewAudio = () => {
    return dispatch(
      changeCurrentMediaRunning({
        postData: resource,
        state: "loading",
      })
    );
  };

  const handleClickNewAudioWhenMediaRunning = () => {
    if (resource.path === currentMediaRunning.resource.path) {
      return dispatch(
        changeCurrentMediaRunning({
          resourceData: resource,
          state: "playing",
        })
      );
    }
    return dispatch(
      changeCurrentMediaRunning({
        resourceData: resource,
        state: "loading",
      })
    );
  };

  const handleClickButton = () => {
    // IF NOT EXIST MEDIA
    if (!currentMediaRunning.resource || !currentMediaRunning.state) {
      return handleClickNewAudio();
    }

    // IF MEDIA RUNNING AND CLICK OTHER POST
    if (currentMediaRunning.resourceData._id !== resource._id) {
      return handleClickNewAudioWhenMediaRunning();
    }

    if (currentMediaRunning.state === "playing") {
      return dispatch(changeStateMediaRunning("paused"));
    }

    if (currentMediaRunning.state === "loading") {
      return;
    }

    return dispatch(changeStateMediaRunning("playing"));
  };

  const _renderDefaultBtn = () => {
    if (renderDefaultBtn) {
      return renderDefaultBtn();
    }
    return (
      <PostTypeFeaturedIcon
        className="z-20 hover:scale-105 transform cursor-pointer transition-transform nc-will-change-transform"
        postType="audio"
      />
    );
  };

  const _renderLoadingBtn = () => {
    // RENDER DEFAULT IF IT NOT CURRENT
    if (currentMediaRunning.resource?._id !== resource._id) {
      return _renderDefaultBtn();
    }

    if (renderLoadingBtn) {
      return renderLoadingBtn();
    }
    return <LoadingVideo />;
  };

  const _renderPlayingBtn = () => {
    // RENDER DEFAULT IF IT NOT CURRENT
    if (currentMediaRunning.resource?._id !== resource._id) {
      return _renderDefaultBtn();
    }

    // RENDER WHEN IS CURRENT
    if (renderPlayingBtn) {
      return renderPlayingBtn();
    }

    return (
      <span className="z-10 bg-neutral-900 bg-opacity-60 rounded-full flex  items-center justify-center text-xl text-white border border-white w-11 h-11 cursor-pointer">
        <img className="w-5" src={iconPlaying} alt="paused" />
      </span>
    );
  };

  return (
    <div
      className={`nc-ButtonPlayMusicRunningContainer ${className}`}
      data-nc-id="ButtonPlayMusicRunningContainer"
      onClick={handleClickButton}
    >
      {renderChildren ? (
        renderChildren(
          currentMediaRunning.resource?._id === resource._id,
          mediaState
        )
      ) : (
        <>
          {(!mediaState || mediaState === "paused" || mediaState === "ended") &&
            _renderDefaultBtn()}

          {/* LOADDING ICON */}
          {mediaState === "loading" && _renderLoadingBtn()}

          {/* PLAYING ICON */}
          {mediaState === "playing" && _renderPlayingBtn()}
        </>
      )}
    </div>
  );
};

export default ButtonPlayMusic;
