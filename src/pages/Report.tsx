import axios from "axios";
import { useState } from "react";
import useSWR from "swr";
import Check from "../components/reportPage/check";

export default function Report() {
  const [tabIndex, setTabIndex] = useState(0);
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
    }
    if (tabIndex === 0) {
      return <Check data={data} />;
    }
    if (tabIndex === 1) {
      return <div>多空細節</div>;
    } else {
      return <div>456</div>;
    }
  };
  return (
    <div className="flex h-full min-h-[100vh] w-full flex-col items-center gap-10 p-10">
      <h1 className="text-5xl">AI盤前籌碼報告</h1>
      <div role="tablist" className="tabs tabs-bordered w-full">
        <a
          role="tab"
          className={`tab text-2xl ${tabIndex === 0 ? "tab-active" : ""}`}
          onClick={() => setTabIndex(0)}
        >
          大盤檢查表
        </a>
        <a
          role="tab"
          className={`tab text-2xl ${tabIndex === 1 ? "tab-active" : ""}`}
          onClick={() => setTabIndex(1)}
        >
          多空指標細節
        </a>
      </div>
      {view()}
    </div>
  );
}
