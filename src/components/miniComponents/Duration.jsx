import React from "react";

function Duration({ trackProgress, duration }) {
  const seconds_to_min = (time) => {
    if (!time) return "0:00";
    return `${Math.floor(time / 60)}:${("0" + Math.floor(time % 60)).slice(
      -2
    )}`;
  };

  return (
    <div className="font-medium text-sm text-[#8C90FE] px-1">
      {seconds_to_min(trackProgress)} / {seconds_to_min(duration)}
    </div>
  );
}

export default Duration;
