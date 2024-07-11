import axios from "axios";
import ViewCard from "../components/Card/ViewCard";
import useSWR from "swr";
import { Progress } from "../components/ui/progress";
import { TfiFaceSmile } from "react-icons/tfi";
import { PiSmileyMeh } from "react-icons/pi";
import { FaRegFaceSadCry } from "react-icons/fa6";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

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

export default function InTime() {
  const navigate = useNavigate();
  const fetcher = (url: string) =>
    axios.get(url).then((res) => res.data as DataType);
  const url = "http://140.113.87.82:5014/api/data";
  const { data, error, isLoading } = useSWR(url, fetcher);
  console.log(data);
  const view = () => {
    if (error) {
      return <div>error</div>;
    }
    if (isLoading) {
      return <div>loading...</div>;
    } else {
      return (
        <>
          <div className="h-full bg-gradient-to-r from-blueF to-blueT pb-[2px] transition-all">
            <div className="flex h-full w-full flex-col gap-10 bg-[#1E1E1E] px-10 py-6 shadow-greenLi xl:p-10">
              <div className="cursor-pointer bg-gradient-to-r from-blueF to-blueT bg-clip-text text-3xl font-bold text-transparent hover:opacity-80">
                <a href={data?.URL} target="_blank">
                  {data?.Title}
                </a>
              </div>
            </div>
          </div>
          <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
            <ViewCard title="樂觀" color="blue" content="" className="w-full">
              <div className="flex items-center gap-10">
                <TfiFaceSmile color="#4285F4" size={50} />
                <span className="text-lg">{data?.Scores.Optimistic} %</span>
              </div>
              <Progress color="blue" value={data?.Scores.Optimistic} />
            </ViewCard>
            <ViewCard title="中立" color="red" content="" className="w-full">
              <div className="flex items-center gap-10">
                <PiSmileyMeh color="#EA4335" size={50} />
                <span className="text-lg">{data?.Scores.Neutral} %</span>
              </div>
              <Progress color="red" value={data?.Scores.Neutral} />
            </ViewCard>
            <ViewCard title="悲觀" color="green" content="" className="w-full">
              <div className="flex items-center gap-10">
                <FaRegFaceSadCry color="#34A853" size={50} />
                <span className="text-lg">{data?.Scores.Pessimistic} %</span>
              </div>
              <Progress color="green" value={data?.Scores.Pessimistic} />
            </ViewCard>
          </div>
        </>
      );
    }
  };
  return (
    <div className="flex h-full min-h-[100vh] w-full flex-col items-center gap-10 p-10">
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
      {view()}
    </div>
  );
}
