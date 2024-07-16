import { ConfigProvider, Table, TableProps } from "antd";
import { cn } from "../../lib/utils";
import { IoPlay } from "react-icons/io5";
import { IoPause } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";

interface KeyObject {
  name: string;
  w: number;
}

export default function Check({ data }: { data: any }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  console.log(data);
  const playAudio = () => {
    audioRef.current?.play();
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const keyConfig: { [key: string]: KeyObject } = {
    _id: { name: "編號", w: 0 },
    日期: { name: "日期", w: 150 },
    收盤指數: { name: "加權指數", w: 120 },
    漲跌: { name: "漲跌", w: 120 },
    "成交量(億元)": { name: "今日成交量", w: 120 },
    比較: { name: "比較", w: 70 },
    "五日成交量平均(億元)": { name: "五日成交量平均", w: 150 },
    "外資(億元)": { name: "外資(億元)", w: 150 },
    "投信(億元)": { name: "投信(億元)", w: 150 },
    "自營(億元)": { name: "自營商(億元)", w: 150 },
    "融資(億元)": { name: "融資(億元)", w: 150 },
    "融資增減(億元)": { name: "融資增減(億元)", w: 100 },
    "融券(張張)": { name: "融券(張)", w: 150 },
    "融券增減(張)": { name: "融券增減(張)", w: 100 },
    "外資期貨未平倉多方(口)": { name: "外資期貨未平倉多方(口)", w: 200 },
    "外資期貨未平倉空方(口)": { name: "外資期貨未平倉空方(口)", w: 200 },
    "外資期貨未平倉淨單(口)": { name: "外資期貨未平倉淨單(口)", w: 200 },
    "外資期貨未平倉增減(口)": { name: "外資期貨未平倉增減(口)", w: 200 },
    "外資選擇權買權未平倉(億)": { name: "外資選擇權買權未平倉(億)", w: 100 },
    "外資選擇權賣權未平倉(億)": { name: "外資選擇權賣權未平倉(億)", w: 100 },
    "自營商選擇權買權未平倉(億)": {
      name: "自營商選擇權買權未平倉(億)",
      w: 120,
    },
    "自營商選擇權賣權未平倉(億)": {
      name: "自營商選擇權賣權未平倉(億)",
      w: 120,
    },
    "選擇權未平倉總和(億)": { name: "選擇權未平倉總和(億)", w: 120 },
    "選擇權未平倉總和增減(億)": { name: "選擇權未平倉總和增減(億)", w: 120 },
    "選擇權未平倉總和增減累計(億)": {
      name: "選擇權未平倉總和增減累計(億)",
      w: 120,
    },
    多: { name: "多", w: 70 },
    空: { name: "空", w: 70 },
  };

  const desiredOrder = [
    "日期",
    "收盤指數",
    "漲跌",
    "成交量(億元)",
    "比較",
    "五日成交量平均(億元)",
    "外資(億元)",
    "投信(億元)",
    "自營(億元)",
    "融資(億元)",
    "融資增減(億元)",
    "融券(張張)",
    "融券增減(張)",
    "外資期貨未平倉多方(口)",
    "外資期貨未平倉空方(口)",
    "外資期貨未平倉淨單(口)",
    "外資期貨未平倉增減(口)",
    "外資選擇權買權未平倉(億)",
    "外資選擇權賣權未平倉(億)",
    "自營商選擇權買權未平倉(億)",
    "自營商選擇權賣權未平倉(億)",
    "選擇權未平倉總和(億)",
    "選擇權未平倉總和增減(億)",
    "選擇權未平倉總和增減累計(億)",
    "多",
    "空",
    // Add other keys in desired order
  ];
  // const filterKeys = ["日期"];
  const columns: TableProps<any>["columns"] = desiredOrder.map((key) => {
    return {
      title: (
        <div className={cn("text-wrap text-center")}>{keyConfig[key].name}</div>
      ),
      dataIndex: key,
      key: key,
      ellipsis: true,
      width: keyConfig[key].w,
      className: "text-base h- px-4",
      // sorter: filterKeys.includes(key)
      //   ? (a: any, b: any) => a[key] - b[key]
      //   : false,
      render: (text, record) => {
        const value = record[key];
        if (key === "比較") {
          return (
            <div
              className={cn(
                "flex h-full w-full items-center justify-center",
                record[key] === ">"
                  ? "bg-dataBR text-dataR"
                  : "bg-dataBG text-dataG",
              )}
            >
              {text}
            </div>
          );
        }
        if (key === "漲跌") {
          return (
            <div
              className={cn(
                "text-center font-digital",
                record[key] > 0 ? "text-dataR" : "text-dataG",
              )}
            >
              {Number(Number(text).toFixed(2))}
            </div>
          );
        }
        if (key === "外資(億元)") {
          return (
            <div
              className={cn(
                "h-full w-full items-center justify-center pt-4 text-center font-digital leading-none",
                value > 100
                  ? "bg-dataBR text-dataR"
                  : value < -100
                    ? "bg-dataBG text-dataG"
                    : value < 0
                      ? "text-dataR"
                      : "text-dataG",
              )}
            >
              {value ? value.toFixed(3) : "-"}
            </div>
          );
        }
        if (key === "投信(億元)" || key === "自營(億元)") {
          return (
            <div
              className={cn(
                "flex h-full w-full items-center justify-center font-digital",
                value < 0 ? "text-dataR" : "",
              )}
            >
              {value ? value.toFixed(3) : "-"}
            </div>
          );
        }
        if (
          key === "融券增減(張)" ||
          key === "外資期貨未平倉淨單(口)" ||
          key === "自營商選擇權買權未平倉(億)" ||
          key === "自營商選擇權賣權未平倉(億)"
        ) {
          return (
            <div
              className={cn(
                "flex h-full w-full items-center justify-center font-digital",
                value < 0 ? "text-dataR" : "",
              )}
            >
              {value ? value.toFixed(1) : "-"}
            </div>
          );
        }
        if (key === "外資期貨未平倉增減(口)") {
          return (
            <div
              className={cn(
                "flex h-full w-full items-center justify-center font-digital",
                value > 3000
                  ? "bg-dataBR text-dataR"
                  : value < -3000
                    ? "bg-dataBG text-dataG"
                    : value < 0
                      ? "text-dataR"
                      : "text-dataG",
              )}
            >
              {value ? value.toFixed(1) : "-"}
            </div>
          );
        }
        if (key === "外資選擇權買權未平倉(億)") {
          return (
            <div
              className={cn(
                "flex h-full w-full items-center justify-center font-digital",
                value > 1
                  ? "bg-dataBR text-dataR"
                  : value < -1
                    ? "bg-dataBG text-dataG"
                    : value < 0
                      ? "text-dataR"
                      : "",
              )}
            >
              {value ? value.toFixed(3) : "-"}
            </div>
          );
        }
        if (key === "外資選擇權賣權未平倉(億)") {
          return (
            <div
              className={cn(
                "flex h-full w-full items-center justify-center font-digital",
                value > 1
                  ? "bg-dataBG text-dataG"
                  : value < -1
                    ? "bg-dataBR text-dataR"
                    : value < 0
                      ? "text-dataR"
                      : "",
              )}
            >
              {value ? value.toFixed(3) : "-"}
            </div>
          );
        }
        if (key === "選擇權未平倉總和(億)") {
          return (
            <div
              className={cn(
                "flex h-full w-full items-center justify-center font-digital",
                value >= data.top10Percent
                  ? "bg-dataBR text-dataR"
                  : value <= data.bottom10Percent
                    ? "bg-dataBG text-dataG"
                    : value < 0
                      ? "text-dataR"
                      : "",
              )}
            >
              {value ? value.toFixed(3) : "-"}
            </div>
          );
        }
        if (key === "選擇權未平倉總和增減(億)") {
          return (
            <div
              className={cn(
                "flex h-full w-full items-center justify-center font-digital",
                value >= data.top10Percent_opsum
                  ? "bg-dataBR text-dataR"
                  : value <= data.bottom10Percent_opsum
                    ? "bg-dataBG text-dataG"
                    : value < 0
                      ? "text-dataR"
                      : "",
              )}
            >
              {value ? value.toFixed(3) : "-"}
            </div>
          );
        }
        if (key === "選擇權未平倉總和增減累計(億)") {
          return (
            <div
              className={cn(
                "flex h-full w-full items-center justify-center font-digital",
                -1 <= value && value <= 1
                  ? "bg-dataBY text-dataBlack"
                  : "text-dataR",
              )}
            >
              {value ? value.toFixed(3) : "-"}
            </div>
          );
        }
        if (key === "多" || key === "空") {
          return (
            <div
              className={cn(
                "flex h-full w-full items-center justify-center font-digital",
                value > 2 && "bg-dataBR text-dataR",
              )}
            >
              {text}
            </div>
          );
        }
        if (key === "日期") {
          return <div className="text-center">{text}</div>;
        }
        return text ? (
          <div className="text-center font-digital">
            {Number(Number(text).toFixed(2))}
          </div>
        ) : (
          "-"
        );
      },
    };
  });
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
    <div className="relative flex w-full flex-col items-center gap-10 pt-4">
      <ConfigProvider
        theme={{
          components: {
            Table: {
              cellPaddingInline: 0,
              cellPaddingBlock: 0,
            },
          },
        }}
      >
        <Table
          pagination={false}
          sticky
          scroll={{ x: 1500, y: "calc(100vh - 300px)" }}
          columns={columns}
          dataSource={data.data.map((item: any) => ({
            ...item,
            key: item._id,
          }))}
        />
      </ConfigProvider>

      <div className="flex w-full flex-col gap-2">
        <span className="text-2xl">台指夜盤期貨變動</span>
        <div
          className={cn(
            "mx-auto flex h-20 w-full items-center justify-center border border-white",
            data.night_future > 0
              ? "bg-dataBR text-dataR"
              : "bg-dataBG text-dataG",
          )}
        >
          多空淨單 : {data.night_future}
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex w-full flex-col items-center gap-2">
          <span className="text-2xl">外資買賣超</span>
          <div className="flex w-full items-center justify-center bg-contain bg-top bg-no-repeat">
            <img src={data?.plot1} alt="plot1" className="h-full w-full" />
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          <span className="text-2xl">融資融券變化</span>
          <div className="flex w-full items-center justify-center bg-contain bg-top bg-no-repeat">
            <img src={data?.plot2} alt="plot2" className="h-full w-full" />
          </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex w-full flex-col items-center gap-2">
          <span className="text-2xl">外資期貨部份</span>
          <div className="flex w-full items-center justify-center bg-contain bg-top bg-no-repeat">
            <img src={data?.plot3} alt="plot3" className="h-full w-full" />
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          <span className="text-2xl">外資選擇選</span>
          <div className="flex w-full items-center justify-center bg-contain bg-top bg-no-repeat">
            <img src={data?.plot4} alt="plot4" className="h-full w-full" />
          </div>
        </div>
      </div>
      <audio ref={audioRef} controls autoPlay className="hidden">
        {/* <source src="/speech.mp3" type="audio/mp3" /> */}
        <source src={data?.audio_file} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
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
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex w-full flex-col items-center gap-2">
          <span className="text-2xl">多指標</span>
          <div className="flex w-full items-center justify-center bg-contain bg-top bg-no-repeat">
            <img
              src={data?.gauge_long}
              alt="gauge_long"
              className="h-full w-full"
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          <span className="text-2xl">空指標</span>
          <div className="flex w-full items-center justify-center bg-contain bg-top bg-no-repeat">
            <img
              src={data?.gauge_short}
              alt="gauge_short"
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
