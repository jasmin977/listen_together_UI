import React from "react";
import { IoMdPlay, IoMdPause } from "react-icons/io";
import { ImLoop } from "react-icons/im";
import { FaRandom } from "react-icons/fa";

import { IoPlayBackSharp, IoPlayForwardSharp } from "react-icons/io5";
import AudioLevel from "./AudioLevel";
import Duration from "./Duration";

const AudioControls = ({
  isPlaying,
  track,
  isLoopTrack,
  isRandomTrack,
  trackProgress,
  duration,
  onPlayPauseClick,
  onPrevClick,
  onRandomClick,
  onLoopClick,
  onChangeClick,
  onNextClick,
}) => (
  <div className="flex items-center justify-center px-4 ">
    <Duration trackProgress={trackProgress} duration={duration} />
    <button
      style={{ borderWidth: "2.8px" }}
      className={`border-[#8C90FE]  p-1 mx-1 hover:cursor-pointer 
      hover:bg-[#8c90fe21] ${isLoopTrack ? "bg-[#8c90fe42]" : ""}`}
      id="loop"
      onClick={onLoopClick}
    >
      {" "}
      <ImLoop color="#8C90FE" size={15} className="self-center" />
    </button>

    <button
      style={{ borderWidth: "2.8px" }}
      className=" border-[#8C90FE]  p-1 mx-2 hover:cursor-pointer hover:bg-[#8c90fe42]"
      id="prev"
      onClick={onPrevClick}
    >
      <IoPlayBackSharp color="#8C90FE" size={20} className="self-center" />
    </button>

    {isPlaying ? (
      <button
        style={{ borderWidth: "3px" }}
        className=" border-[#D070FE]  p-1 hover:cursor-pointer hover:bg-[#c532a534]"
        // id="toggle_play"
        onClick={() => onPlayPauseClick(false)}
        aria-label="Pause"
      >
        <IoMdPause color="#D070FE" size={30} className="self-center" />
      </button>
    ) : (
      <button
        style={{ borderWidth: "3px" }}
        className=" border-[#D070FE]  p-1 hover:cursor-pointer hover:bg-[#c532a534]"
        onClick={() => onPlayPauseClick(true)}
        aria-label="Play"
      >
        <IoMdPlay color="#D070FE" size={30} className="self-center" />
      </button>
    )}
    <button
      style={{ borderWidth: "2.8px" }}
      className=" border-[#8C90FE] p-1 mx-2 hover:cursor-pointer hover:bg-[#8c90fe42]"
      id="next"
      aria-label="Next"
      onClick={onNextClick}
    >
      <IoPlayForwardSharp color="#8C90FE" size={20} className="self-center" />
    </button>
    <button
      style={{ borderWidth: "2.8px" }}
      className={` border-[#8C90FE]  p-1 mx-1 hover:cursor-pointer hover:bg-[#8c90fe2c] ${
        isRandomTrack ? "bg-[#8c90fe42]" : ""
      }`}
      id="random"
      onClick={onRandomClick}
    >
      <FaRandom color="#8C90FE" size={15} className="self-center" />
    </button>
    <AudioLevel track={track} onChangeClick={onChangeClick} />
  </div>
);

export default AudioControls;
