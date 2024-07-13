import axios from "axios";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline, IoPlay } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { IoPause } from "react-icons/io5";
import { cn } from "../lib/utils";

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
  const [isShow, setIsShow] = useState(false);
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
      return;
    }
    if (isLoading) {
      return;
    } else {
      return (
        <audio ref={audioRef} controls autoPlay className="hidden">
          {/* <source src="/speech.mp3" type="audio/mp3" /> */}
          <source src={data?.loging_audio} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      );
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setIsShow(true);
    }, 3000);
  }, []);

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
      <div className="relative flex w-full justify-start">
        <IoArrowBackOutline
          className="left-0 top-0 cursor-pointer"
          size={30}
          onClick={() => navigate(-1)}
        />
      </div>
      <h1 className="absolute left-1/2 -translate-x-1/2 text-3xl lg:text-5xl">
        AI盤中即時監控
      </h1>
      <img
        src="./mid.svg"
        alt="AI盤中即時監控"
        className="hover:shadow-3xl aspect-auto w-full cursor-pointer rounded-xl pt-10 transition-transform duration-300 hover:scale-105 hover:brightness-110 hover:grayscale-0 lg:w-1/3 lg:pt-0"
        onClick={() => handleImageClick("/in-time")}
      />

      {view()}
      {data?.bot_response && (
        <div
          className={cn(
            "absolute bottom-10 left-1/2 -translate-x-1/2 rounded-xl bg-white p-5 text-black shadow-2xl transition-opacity duration-500 ease-in-out",
            isShow ? "opacity-100" : "opacity-0",
          )}
        >
          <p>{data.bot_response}</p>
        </div>
      )}

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
