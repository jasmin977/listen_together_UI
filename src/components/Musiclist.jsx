import React, { useState } from "react";
import DragMove from "./DragMove";
import "../styles/scrollbar.css";

function Musiclist({ tracks, setTrackIndex }) {
  const [translate, setTranslate] = useState({
    x: 950,
    y: 0,
  });

  const handleDragMove = (e) => {
    setTranslate({
      x: translate.x + e.movementX,
      y: translate.y + e.movementY,
    });
  };

  return (
    <DragMove onDragMove={handleDragMove}>
      <div
        style={{
          transform: `translateX(${translate.x}px) translateY(${translate.y}px)`,
        }}
        className="flex flex-col absolute w-1/4 pt-8 p-2 overflow-y-scroll bg-black bg-opacity-5 backdrop-blur-md hover:cursor-move  h-3/4 "
      >
        {tracks.map((music, idx) => (
          <div
            className=" flex w-full p-1"
            key={idx}
            onClick={() => setTrackIndex(idx)}
          >
            <div className="bg-white flex bg-opacity-10 backdrop-blur-sm  w-full p-2  text-white py-3 hover:bg-[#58075f]  hover:bg-opacity-10 hover:backdrop-blur-sm hover:cursor-pointer">
              <div className="flex md:flex-row flex-col w-full">
                <div className="w-1/3 h-full">
                  <img
                    src={music.cover}
                    alt="img"
                    className="w-full bg-contain"
                  />
                </div>
                <div className="w-2/3 px-1">
                  <p className="font-semibold text-xs pb-1">{music.title}</p>

                  <div className="bg-opacity-20 backdrop-blur-md w-fit p-0.5 rounded-sm ">
                    {" "}
                    <p className="text-xs font-medium text-white">
                      {new Audio(music.src).duration || "0:00"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DragMove>
  );
}

export default Musiclist;
