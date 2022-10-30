import React, { useEffect, useState } from "react";
import { bg2, bg4, bg5, bg6, bg7, bg8, bg10, bg11 } from "../bg_images/index";
import bg from "../bg_images/jpg/bg.jpg";
const backgroundImages = [bg2, bg4, bg5, bg6, bg7, bg8, bg10, bg11];
function Background({ children }) {
  const [bgValue, setBgValue] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setBgValue((v) => {
        return v === backgroundImages.length - 1 ? 0 : v + 1;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        transition: "all 1.5s ease-in-out",
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        padding: "10px",
      }}
    >
      {children}
    </div>
  );
}

export default Background;
