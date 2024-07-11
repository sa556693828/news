import axios from "axios";
import useSWR from "swr";
import Check from "../components/reportPage/check";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Report() {
  const navigate = useNavigate();
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const url = "http://140.113.87.82:5004/api/data";

  // 使用 useSWR 获取数据
  const { data, error, isLoading } = useSWR(url, fetcher);
  const view = () => {
    if (error) {
      return <div>error</div>;
    }
    if (isLoading) {
      return <div>loading...</div>;
    } else {
      return <Check data={data} />;
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
        AI盤前籌碼報告
      </h1>
      <h2 className="w-full text-start text-xl text-white lg:text-3xl">
        大盤檢查表 -{" "}
        {`${new Date().getFullYear()} / ${new Date().getMonth() + 1} / ${new Date().getDate()}`}
      </h2>
      {view()}
    </div>
  );
}
