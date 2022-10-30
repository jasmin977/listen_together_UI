import React, { useState, useEffect, useRef } from "react";
import AudioControls from "./miniComponents/AudioControls";

import "../styles/audioRange.css";

const AudioPlayer = ({ tracks, setTrackIndex, trackIndex }) => {
  // State
  //const [trackIndex, setTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isRandomTrack, setIsRandomTrack] = useState(false);
  const [isLoopTrack, setIsLoopTrack] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Destructure for conciseness
  const { src, title } = tracks[trackIndex];
  console.log(src);
  // Refs
  const audioRef = useRef(new Audio(src));
  console.log(audioRef);
  const intervalRef = useRef();
  const isReady = useRef(false);

  // Destructure for conciseness
  const { duration } = audioRef.current;
  // eslint-disable-next-line
  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #D070FE), color-stop(${currentPercentage}, #c532a52d))
  `;

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        if (isRandomTrack) {
          toRandomTrack();
        } else if (isLoopTrack) {
          toLoopTrack();
        } else {
          toNextTrack();
        }
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const toRandomTrack = () => {
    setTrackIndex(Math.floor(Math.random() * tracks.length));
  };

  const toLoopTrack = () => {
    setTrackIndex(trackIndex);
  };

  const onChangeClick = (value) => {
    audioRef.current.volume = value;
    setVolume(audioRef.current.volume);
  };

  const toNextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handles cleanup and setup when changing tracks
  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(src);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.volume = volume;
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [trackIndex]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="audio-player">
      <div className="track-info">
        <h3 className="font-medium text-xs text-white">{title}</h3>

        <input
          id="audioPlayerRange"
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration ? duration : `${duration}`}
          className="progress"
          onChange={(e) => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          style={{ background: trackStyling }}
        />
        <AudioControls
          trackProgress={trackProgress}
          duration={duration}
          track={tracks[trackIndex]}
          isPlaying={isPlaying}
          onPrevClick={toPrevTrack}
          onNextClick={toNextTrack}
          onPlayPauseClick={setIsPlaying}
          onChangeClick={onChangeClick}
          isLoopTrack={isLoopTrack}
          isRandomTrack={isRandomTrack}
          onLoopClick={() => {
            setIsLoopTrack(!isLoopTrack);
            setIsRandomTrack(false);
          }}
          onRandomClick={() => {
            setIsRandomTrack(!isRandomTrack);
            setIsLoopTrack(false);
          }}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
