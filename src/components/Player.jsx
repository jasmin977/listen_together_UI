import React, { useState } from "react";
import DragMove from "./DragMove";

import AudioPlayer from "./AudioPlayer";

function Player({ tracks, setTrackIndex, trackIndex }) {
  const [translate, setTranslate] = useState({
    x: 400,
    y: 500,
  });

  const handleDragMove = (e) => {
    setTranslate({
      x: translate.x + e.movementX,
      y: translate.y + e.movementY,
    });
  };

  return (
    <div
      style={{
        transform: `translateX(${translate.x}px) translateY(${translate.y}px)`,
      }}
      className="flex flex-col absolute w-1/3 p-2  bg-black bg-opacity-5 backdrop-blur-md h-1/6 "
    >
      <AudioPlayer
        tracks={tracks}
        trackIndex={trackIndex}
        setTrackIndex={setTrackIndex}
      />
    </div>
  );
}

export default Player;
