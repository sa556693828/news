import axios from "axios";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import { IoPlay } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { IoPause } from "react-icons/io5";

export interface DataType {
  Scores: { Neutral: number; Optimistic: number; Pessimistic: number };
  Sentiment: {
    Compound: number;
    Neutral: number;
    Optimistic: number;
    Pessimistic: number;
  };
  Title: string;
  URL: string;
  audio_file: string;
  bot_response: string;
  loging_audio: string;
}

export default function Agent() {
  const navigate = useNavigate();
  const handleImageClick = (path: string) => {
    navigate(path);
  };
  const fetcher = (url: string) =>
    axios.get(url).then((res) => res.data as DataType);
  const url = "http://140.113.87.82:5014/api/data";
  const { data, error, isLoading } = useSWR(url, fetcher);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    audioRef.current?.play();
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const view = () => {
    if (error) {
      return <div>Error loading audio</div>;
    }
    if (isLoading) {
      return <div>Loading...</div>;
    } else {
      return (
        <audio ref={audioRef} controls autoPlay>
          {/* <source src="/speech.mp3" type="audio/mp3" /> */}
          <source src={data?.audio_file} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      );
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.5;
    audioRef.current.addEventListener("play", () => setIsPlaying(true));
    audioRef.current.addEventListener("pause", () => setIsPlaying(false));
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("play", () => setIsPlaying(true));
        audioRef.current.removeEventListener("pause", () =>
          setIsPlaying(false),
        );
      }
    };
  }, []);

  return (
    <div className="relative flex h-full min-h-[100vh] w-full flex-col items-center gap-10 p-10">
      <h1 className="text-5xl">AI盤中即時監控</h1>
      <img
        src="./mid.png"
        alt="AI盤中即時監控"
        className="hover:shadow-3xl aspect-auto w-4/5 cursor-pointer rounded-xl shadow-2xl transition-transform duration-300 hover:scale-105 hover:brightness-110 hover:grayscale-0 lg:w-1/3"
        onClick={() => handleImageClick("/in-time")}
      />

      <button onClick={playAudio}>Play</button>
      <button onClick={pauseAudio}>Pause</button>
      {view()}
      {isPlaying ? (
        <IoPause
          onClick={pauseAudio}
          className="fixed bottom-10 right-10 flex size-16 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-greenF to-greenT py-3 pl-[2px] text-black/80"
        />
      ) : (
        <IoPlay
          onClick={playAudio}
          className="fixed bottom-10 right-10 flex size-16 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-greenF to-greenT py-3 pl-2 text-black/80"
        />
      )}
    </div>
  );
}
