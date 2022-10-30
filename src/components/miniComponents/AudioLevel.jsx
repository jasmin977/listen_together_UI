import React, { useState, useRef } from "react";
import "../../styles/audioRange.css";
import { IoVolumeOffSharp } from "react-icons/io5";

function AudioLevel({ track, onChangeClick }) {
  const audioRef = useRef(new Audio(track));
  const [volumeProgress, setVolumeProgress] = useState(audioRef.current.volume);

  const currentPercentage = volumeProgress ? `${volumeProgress * 100}%` : "0%";
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #8c90fe), color-stop(${currentPercentage}, #8c90fe3f))
  `;
  const onChangeVol = (value) => {
    onChangeClick(value);
    setVolumeProgress(value);
  };

  return (
    <div className="flex w-1/4 flex-row justify-center items-end">
      <IoVolumeOffSharp color="#8C90FE" size={25} />
      <input
        id="audio"
        type="range"
        value={volumeProgress}
        step="0.1"
        min="0"
        max="1"
        onChange={(e) => onChangeVol(e.target.value)}
        style={{ background: trackStyling }}
      />
    </div>
  );
}

export default AudioLevel;
