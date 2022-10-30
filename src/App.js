import { useState, useEffect } from "react";
import "./styles/App.css";
import Background from "./components/backgound_imgs";
import Musiclist from "./components/Musiclist";
import Player from "./components/Player";

function App() {
  const [trackIndex, setTrackIndex] = useState(0);
  const [tracks, setTracks] = useState([]);
  useEffect(() => {
    fetch("http://192.168.6.95:5000/api/music")
      .then((data) => data.json())
      .then(({ music }) => {
        setTracks(music);
        console.log(music);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Background>
      <Musiclist
        tracks={tracks}
        trackIndex={trackIndex}
        setTrackIndex={setTrackIndex}
      />
      {tracks.length !== 0 && (
        <Player
          tracks={tracks}
          trackIndex={trackIndex}
          setTrackIndex={setTrackIndex}
        />
      )}
    </Background>
  );
}
export default App;
